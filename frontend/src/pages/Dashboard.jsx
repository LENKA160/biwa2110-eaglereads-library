import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LowStockAlert from '../components/LowStockAlert';
import BookList from '../components/BookList';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('activeSessionUser')) || {};

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleRentClick = async (book) => {
    try {
      const response = await fetch('http://localhost:5000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book_id: book.id,
          user_name: currentUser.name,
          type: 'DEDUCT',
          quantity: 1
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Transaction Success! Borrowed 1 copy of "${book.title}".`);
        fetchBooks();
      } else {
        alert(data.error || 'Could not complete transaction.');
      }
    } catch (error) {
      alert('Server error while borrowing book.');
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="dash-content">
        <section className="dash-section">
          <h3>📚 Book Inventory Catalog</h3>
          <LowStockAlert books={books} />
          <BookList books={books} mode="dashboard" onRent={handleRentClick} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
