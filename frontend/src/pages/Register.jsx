import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [desiredId, setDesiredId] = useState('');
  const [assignedTier, setAssignedTier] = useState('Client');
  const navigate = useNavigate();

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName.trim(),
          cardId: desiredId.trim(),
          role: assignedTier
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Success! Membership card issued for ${fullName.trim()}. You can now sign in.`);
        navigate('/login');
      } else {
        alert(data.error || 'Registration failed.');
      }
    } catch (error) {
      alert('Cannot connect to server. Make sure your backend is running.');
    }
  };

  return (
    <div className="login-card">
      <h1>Welcome to EagleReads Library</h1>
      <p className="subtitle">Secure a new archive membership card key below</p>

      <form onSubmit={handleRegistrationSubmit}>
        <div className="form-group">
          <label htmlFor="reg-name">Full Legal Name</label>
          <input
            type="text"
            id="reg-name"
            placeholder="E.g., Jane Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reg-id">Desired Membership ID</label>
          <input
            type="text"
            id="reg-id"
            placeholder="Create a unique alpha-numeric card string..."
            value={desiredId}
            onChange={(e) => setDesiredId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reg-role">Assigned Profile Tier</label>
          <select
            id="reg-role"
            value={assignedTier}
            onChange={(e) => setAssignedTier(e.target.value)}
          >
            <option value="Client">Standard Library Client</option>
            <option value="Librarian">Librarian (Administrative Rights)</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">Issue Membership Card</button>

        <div className="card-footer">
          <p>
            Already have a membership key?{' '}
            <a onClick={() => navigate('/login')}>Return to Sign In</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
