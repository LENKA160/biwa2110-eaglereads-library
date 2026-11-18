import React from 'react';

const UserForm = ({
  name, setName,
  cardId, setCardId,
  role, setRole,
  editingUser,
  onSubmit,
  onCancel
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Legal Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Membership Card ID</label>
          <input
            type="text"
            value={cardId}
            onChange={(e) => setCardId(e.target.value)}
            disabled={!!editingUser}
            required
          />
        </div>
        <div className="form-group">
          <label>Profile Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Client">Standard Library Client</option>
            <option value="Librarian">Librarian (Administrative Rights)</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" className="btn btn-success">
          {editingUser ? 'Update User Details' : 'Issue Membership Card'}
        </button>
        {editingUser && (
          <button type="button" className="btn-logout" onClick={onCancel} style={{ borderRadius: '10px' }}>
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
