import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('activeSessionUser')) || {};

  const handleLogout = () => {
    localStorage.removeItem('activeSessionUser');
    navigate('/login');
  };

  return (
    <header>
      <div className="dash-header">
        <div>
          <h2>📚 EagleReads Library</h2>
          <p id="user-greeting">
            Welcome, {currentUser.name} ({currentUser.role})
          </p>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>

      <nav className="dash-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? 'nav-tab active' : 'nav-tab')}
        >
          Dashboard
        </NavLink>

        {currentUser.role === 'Librarian' && (
          <>
            <NavLink
              to="/manage-books"
              className={({ isActive }) => (isActive ? 'nav-tab active' : 'nav-tab')}
            >
              Book Management
            </NavLink>
            <NavLink
              to="/manage-clients"
              className={({ isActive }) => (isActive ? 'nav-tab active' : 'nav-tab')}
            >
              User Management
            </NavLink>
          </>
        )}

        <NavLink
          to="/logs"
          className={({ isActive }) => (isActive ? 'nav-tab active' : 'nav-tab')}
        >
          Transactions
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
