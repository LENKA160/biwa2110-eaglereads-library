import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AddBookForm from '../components/AddBookForm';
import BookList from '../components/BookList';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [qty, setQty] = useState(0);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setGenre('');
    setIsbn('');
    setQty(0);
    setEditingBook(null);
  };

  const handleBookSubmit = async (event) => {
    event.preventDefault();
    const bookData = {
      title: title.trim(),
      author: author.trim(),
      genre: genre.trim(),
      isbn: isbn.trim(),
      qty: parseInt(qty, 10)
    };

    try {
      const url = editingBook
        ? `http://localhost:5000/books/${editingBook.id}`
        : 'http://localhost:5000/books';
      const method = editingBook ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });

      if (response.ok) {
        clearForm();
        fetchBooks();
      } else {
        alert('Failed to save book record.');
      }
    } catch (error) {
      alert('Server connection error.');
    }
  };

  const startEditMode = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setIsbn(book.isbn);
    setQty(book.qty);
  };

  const handleDeleteBook = async (book) => {
    if (!window.confirm(`Delete "${book.title}" from the library?`)) return;
    try {
      const response = await fetch(`http://localhost:5000/books/${book.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        if (editingBook && editingBook.id === book.id) clearForm();
        fetchBooks();
      }
    } catch (error) {
      alert('Failed to delete book.');
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="dash-content">
        <section className="dash-section">
          <h3>{editingBook ? '✏️ Update Existing Book Details' : '📝 Add New Book'}</h3>
          <AddBookForm
            title={title} setTitle={setTitle}
            author={author} setAuthor={setAuthor}
            genre={genre} setGenre={setGenre}
            isbn={isbn} setIsbn={setIsbn}
            qty={qty} setQty={setQty}
            editingBook={editingBook}
            onSubmit={handleBookSubmit}
            onCancel={clearForm}
          />

          <h3 style={{ marginTop: '35px' }}>📁 Library Book Catalog</h3>
          <BookList
            books={books}
            mode="manage"
            onEdit={startEditMode}
            onDelete={handleDeleteBook}
          />
        </section>
      </main>
    </div>
  );
};

export default BookManagement;
