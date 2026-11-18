const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ================= BOOKS ROUTES =================
app.get('/books', async(req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM books ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/books', async(req, res) => {
    const { title, author, genre, isbn, qty } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO books (title, author, genre, isbn, qty) VALUES (?, ?, ?, ?, ?)', [title, author, genre, isbn, qty]
        );
        res.status(201).json({ id: result.insertId, title, author, genre, isbn, qty });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/books/:id', async(req, res) => {
    const { title, author, genre, isbn, qty } = req.body;
    try {
        await db.query(
            'UPDATE books SET title = ?, author = ?, genre = ?, isbn = ?, qty = ? WHERE id = ?', [title, author, genre, isbn, qty, req.params.id]
        );
        res.json({ message: 'Book updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/books/:id', async(req, res) => {
    try {
        await db.query('DELETE FROM books WHERE id = ?', [req.params.id]);
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= USERS ROUTES =================
app.get('/users', async(req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/users/login', async(req, res) => {
    const { cardId, role } = req.body;
    try {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE card_id = ? AND role = ?', [cardId, role]
        );
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid Membership Card ID or role' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/users', async(req, res) => {
    const { name, cardId, role } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO users (name, card_id, role) VALUES (?, ?, ?)', [name, cardId, role || 'Client']
        );
        res.status(201).json({ id: result.insertId, name, card_id: cardId, role });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Membership ID already exists' });
        }
        res.status(500).json({ error: err.message });
    }
});

app.put('/users/:id', async(req, res) => {
    const { name, role } = req.body;
    try {
        await db.query('UPDATE users SET name = ?, role = ? WHERE id = ?', [
            name,
            role,
            req.params.id
        ]);
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/users/:id', async(req, res) => {
    try {
        await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= TRANSACTIONS ROUTES =================
app.get('/transactions', async(req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT t.id, t.user_name, t.type, t.quantity, t.created_at, b.title AS book_title
      FROM transactions t
      JOIN books b ON t.book_id = b.id
      ORDER BY t.created_at DESC
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/transactions', async(req, res) => {
    const { book_id, user_name, type, quantity } = req.body;
    const qtyChange = parseInt(quantity, 10);

    try {
        const [books] = await db.query('SELECT qty FROM books WHERE id = ?', [book_id]);
        if (books.length === 0) return res.status(404).json({ error: 'Book not found' });

        const currentQty = books[0].qty;
        if (type === 'DEDUCT' && currentQty < qtyChange) {
            return res.status(400).json({ error: 'Not enough stock available' });
        }

        const newQty = type === 'ADD' ? currentQty + qtyChange : currentQty - qtyChange;

        await db.query('UPDATE books SET qty = ? WHERE id = ?', [newQty, book_id]);
        await db.query(
            'INSERT INTO transactions (book_id, user_name, type, quantity) VALUES (?, ?, ?, ?)', [book_id, user_name, type, qtyChange]
        );

        res.status(201).json({ message: 'Transaction recorded', newQty });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));