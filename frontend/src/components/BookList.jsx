import React from 'react';

const BookList = ({ books, mode, onRent, onEdit, onDelete }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>ISBN</th>
          <th>Stock Qty</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.length === 0 ? (
          <tr>
            <td colSpan="6" style={{ textAlign: 'center', color: '#64748b' }}>
              No books found in the library catalog.
            </td>
          </tr>
        ) : (
          books.map((book) => (
            <tr key={book.id} className={book.qty < 2 ? 'low-stock-row' : ''}>
              <td>
                <strong>{book.title}</strong>
                {book.qty < 2 && (
                  <span style={{ color: '#c53030', fontSize: '0.8rem', marginLeft: '8px', fontWeight: 'bold' }}>
                    (Low Stock)
                  </span>
                )}
              </td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td><code>{book.isbn}</code></td>
              <td>{book.qty}</td>
              <td>
                {mode === 'dashboard' && (
                  <button
                    onClick={() => onRent(book)}
                    className="btn-sm btn-rent"
                    disabled={book.qty === 0}
                  >
                    {book.qty === 0 ? 'Out of Stock' : 'Borrow'}
                  </button>
                )}

                {mode === 'manage' && (
                  <>
                    <button
                      onClick={() => onEdit(book)}
                      className="btn-sm btn-edit"
                      style={{ marginRight: '8px' }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => onDelete(book)}
                      className="btn-sm btn-delete"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default BookList;
