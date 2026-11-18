import React from 'react';

const AddBookForm = ({
  title, setTitle,
  author, setAuthor,
  genre, setGenre,
  isbn, setIsbn,
  qty, setQty,
  editingBook,
  onSubmit,
  onCancel
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>ISBN</label>
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input type="number" min="0" value={qty} onChange={(e) => setQty(e.target.value)} required />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" className="btn btn-success">
          {editingBook ? 'Update Book Details' : 'Add Book to Inventory'}
        </button>
        {editingBook && (
          <button type="button" className="btn-logout" onClick={onCancel} style={{ borderRadius: '10px' }}>
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default AddBookForm;
