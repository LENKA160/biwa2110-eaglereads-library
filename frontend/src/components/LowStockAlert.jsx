import React from 'react';

const LowStockAlert = ({ books }) => {
  const lowStockBooks = books.filter((book) => book.qty < 2);

  if (lowStockBooks.length === 0) return null;

  return (
    <div className="low-stock-badge">
      ⚠️ <strong>Low Stock Warning:</strong> The following books have fewer than 2 copies available:{' '}
      {lowStockBooks.map((b) => `${b.title} (${b.qty})`).join(', ')}
    </div>
  );
};

export default LowStockAlert;
