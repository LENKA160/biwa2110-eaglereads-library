import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const ActionLogs = () => {
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const currentUser = JSON.parse(localStorage.getItem('activeSessionUser')) || { name: 'Guest', role: 'Client' };

  const loadData = async () => {
    try {
      const [booksRes, txRes] = await Promise.all([
        fetch('http://localhost:5000/books'),
        fetch('http://localhost:5000/transactions')
      ]);
      const booksData = await booksRes.json();
      const txData = await txRes.json();

      setBooks(booksData);
      setTransactions(txData);
      if (booksData.length > 0 && !selectedBookId) {
        setSelectedBookId(booksData.id);
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStockChange = async (type) => {
    if (!selectedBookId) return;
    try {
      const response = await fetch('http://localhost:5000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book_id: selectedBookId,
          user_name: currentUser.name,
          type,
          quantity: parseInt(quantity, 10)
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Stock ${type === 'ADD' ? 'added' : 'deducted'} successfully! New stock: ${data.newQty}`);
        setQuantity(1);
        loadData();
      } else {
        alert(data.error || 'Transaction failed.');
      }
    } catch (error) {
      alert('Server error while processing stock transaction.');
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="dash-content">
        <section className="dash-section">
          <h3>📦 Manage Book Stock Transactions</h3>

          <div className="form-grid" style={{ alignItems: 'end', marginBottom: '25px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Select Book</label>
              <select value={selectedBookId} onChange={(e) => setSelectedBookId(e.target.value)}>
                {books.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title} (Current Stock: {b.qty})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {currentUser.role === 'Librarian' && (
                <button
                  type="button"
                  onClick={() => handleStockChange('ADD')}
                  className="btn btn-success"
                  style={{ padding: '12px' }}
                >
                  + Add Stock
                </button>
              )}
              <button
                type="button"
                onClick={() => handleStockChange('DEDUCT')}
                className="btn"
                style={{ padding: '12px' }}
              >
                - Deduct / Borrow
              </button>
            </div>
          </div>

          <h3>🕒 Transaction History Log</h3>
          <ul className="log-list">
            {transactions.length === 0 ? (
              <li>No transactions recorded yet.</li>
            ) : (
              transactions.map((tx) => (
                <li key={tx.id}>
                  [{new Date(tx.created_at).toLocaleString()}]{' '}
                  <strong>{tx.user_name}</strong>{' '}
                  {tx.type === 'ADD' ? 'ADDED' : 'DEDUCTED'}{' '}
                  <strong>{tx.quantity}</strong> copy/copies of{' '}
                  <em>"{tx.book_title}"</em>
                </li>
              ))
            )}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default ActionLogs;
