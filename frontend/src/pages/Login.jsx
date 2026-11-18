import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('Client');
  const [cardId, setCardId] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: cardId.trim(), role })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('activeSessionUser', JSON.stringify(data));
        navigate('/dashboard');
      } else {
        alert(data.error || 'Access Denied! Invalid Card ID or role.');
      }
    } catch (error) {
      alert('Cannot connect to server. Make sure your backend is running on port 5000.');
    }
  };

  return (
    <div className="login-card">
      <h1>Welcome to EagleReads Library</h1>
      <p className="subtitle">
        {role === 'Librarian'
          ? 'Welcome back, Keeper of Knowledge. Please verify your credentials.'
          : 'May I know who is entering today?'}
      </p>

      <form onSubmit={handleLoginSubmit}>
        <div className="role-toggle-group">
          <div className="role-option">
            <input
              type="radio"
              id="role-librarian"
              name="userRole"
              value="Librarian"
              checked={role === 'Librarian'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="role-librarian" className="role-label">
              <img src="/librarian.webp" className="role-label-img" alt="Librarian" />
              <span>Librarian</span>
            </label>
          </div>

          <div className="role-option">
            <input
              type="radio"
              id="role-client"
              name="userRole"
              value="Client"
              checked={role === 'Client'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="role-client" className="role-label">
              <img src="/guest.webp" className="role-label-img" alt="Client" />
              <span>Client</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="access-id">Membership Card ID</label>
          <input
            type="text"
            id="access-id"
            placeholder="e.g. LIB001 or CLI001"
            value={cardId}
            onChange={(e) => setCardId(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn">Cross The Threshold</button>

        <div className="card-footer">
          <p>
            Don't have an account?{' '}
            <a onClick={() => navigate('/register')}>Create a membership card</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
