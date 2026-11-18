import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookManagement from './pages/BookManagement';
import ClientManagement from './pages/ClientManagement';
import ActionLogs from './pages/ActionLogs';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/manage-books" element={
          <ProtectedRoute requiredRole="Librarian"><BookManagement /></ProtectedRoute>
        } />

        <Route path="/manage-clients" element={
          <ProtectedRoute requiredRole="Librarian"><ClientManagement /></ProtectedRoute>
        } />

        <Route path="/logs" element={
          <ProtectedRoute><ActionLogs /></ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
