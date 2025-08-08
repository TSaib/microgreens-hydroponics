import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminUsers from './pages/AdminUsers';
import AdminPanel from './pages/AdminPanel';
import AdminRoute from './components/AdminRoute';
import Products from './pages/products';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
      <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
    </Routes>
  );
}

export default App;
