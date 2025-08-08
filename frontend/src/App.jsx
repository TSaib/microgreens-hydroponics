import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminUsers from './pages/AdminUsers';
import AdminPanel from './pages/AdminPanel';
import AdminRoute from './components/AdminRoute';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <nav className="navbar">
        <span className="brand">S&amp;T's Hydroponics and Microgreens</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
          <a href="/login" className="cta" style={{ padding: '0.5rem 1.5rem', fontSize: '1rem', margin: 0 }}>Login</a>
          <a href="/register" className="cta" style={{ padding: '0.5rem 1.5rem', fontSize: '1rem', margin: 0, background: '#fff', color: '#23b758', border: '2px solid #23b758' }}>Sign Up</a>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
        <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
      </Routes>
    </>
  );
}

export default App;
