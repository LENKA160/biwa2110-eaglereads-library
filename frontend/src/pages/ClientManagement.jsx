import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import UserForm from '../components/UserForm';

const ClientManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('activeSessionUser')) || {};

  const [name, setName] = useState('');
  const [cardId, setCardId] = useState('');
  const [role, setRole] = useState('Client');

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const clearForm = () => {
    setName('');
    setCardId('');
    setRole('Client');
    setEditingUser(null);
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = editingUser
        ? `http://localhost:5000/users/${editingUser.id}`
        : 'http://localhost:5000/users';
      const method = editingUser ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          cardId: cardId.trim(),
          role
        })
      });

      const data = await response.json();

      if (response.ok) {
        clearForm();
        fetchUsers();
      } else {
        alert(data.error || 'Failed to save user.');
      }
    } catch (error) {
      alert('Server connection error.');
    }
  };

  const startEditMode = (user) => {
    setEditingUser(user);
    setName(user.name);
    setCardId(user.card_id);
    setRole(user.role);
  };

  const handleDeleteUser = async (user) => {
    if (user.card_id === currentUser.card_id) {
      alert('You cannot delete your own active account.');
      return;
    }
    if (!window.confirm(`Delete user account for ${user.name}?`)) return;

    try {
      const response = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        if (editingUser && editingUser.id === user.id) clearForm();
        fetchUsers();
      }
    } catch (error) {
      alert('Failed to delete user.');
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="dash-content">
        <section className="dash-section">
          <h3>{editingUser ? '✏️ Update User Details' : '👥 Add New Library User'}</h3>
          <UserForm
            name={name} setName={setName}
            cardId={cardId} setCardId={setCardId}
            role={role} setRole={setRole}
            editingUser={editingUser}
            onSubmit={handleUserSubmit}
            onCancel={clearForm}
          />

          <h3 style={{ marginTop: '35px' }}>📁 Registered Users</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Membership Card ID</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td><strong>{user.name}</strong></td>
                  <td><code>{user.card_id}</code></td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      onClick={() => startEditMode(user)}
                      className="btn-sm btn-edit"
                      style={{ marginRight: '8px' }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn-sm btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default ClientManagement;
