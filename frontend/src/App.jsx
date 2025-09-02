
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminUsers from './pages/AdminUsers';
import AdminPanel from './pages/AdminPanel';
import AdminRoute from './components/AdminRoute';
import OrderList from './pages/OrderList';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { useAuth } from './context/AuthContext';
import CartPage from './pages/CartPage';


import axios from 'axios';
import { API_URL } from './config';

function App() {
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [cartCount, setCartCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const { user, logout } = useAuth();

  // Add to Cart function
  const addToCart = async (product) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    const headers = user.token ? { Authorization: `Bearer ${user.token}` } : {};
    try {
      if (!product.productId) {
        alert('Product ID is missing!');
        return;
      }
      await axios.post(
        `${API_URL}/cart/add?email=${encodeURIComponent(user.email)}&productId=${product.productId}&quantity=1`,
        {},
        { headers }
      );
      alert('Added to cart!');
    } catch (err) {
      alert('Failed to add to cart.');
      console.error('Add to cart error:', err);
    }
  };

  // Fetch cart and order count when dropdown opens
  useEffect(() => {
    if (user && dropdownOpen) {
      axios.get(`${API_URL}/cart`, { params: { email: user.email } })
        .then(res => setCartCount(res.data?.length || 0));
      axios.get(`${API_URL}/orders`, { params: { email: user.email } })
        .then(res => setOrderCount(res.data?.length || 0));
    }
  }, [dropdownOpen, user]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLoginPromptOk = () => {
    setShowLoginPrompt(false);
    navigate('/login');
  };

  return (
    <>
      {showLoginPrompt && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.18)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 4px 24px #0002',
            padding: '2rem 2.5rem',
            minWidth: 320,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.15rem', color: '#188040', fontWeight: 600, marginBottom: 18 }}>
              Please log in to add items to your cart.
            </div>
            <button
              onClick={handleLoginPromptOk}
              style={{
                background: '#23b758',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 32px',
                fontWeight: 600,
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px #0001',
                marginTop: 8,
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <nav className="navbar" style={{ display: 'flex', alignItems: 'center', padding: '0.7rem 2vw', background: '#fff', boxShadow: '0 2px 8px #0001', minHeight: 64 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Creative logo with S & T letters */}
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, background: 'linear-gradient(135deg, #23b758 60%, #188040 100%)', borderRadius: '50%', boxShadow: '0 2px 8px #23b75822', fontWeight: 900, fontSize: 22, color: '#fff', letterSpacing: '-2px', position: 'relative' }}>
            <span style={{ fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 900, fontSize: 22, marginRight: 2 }}>S</span>
            <span style={{ fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 900, fontSize: 22, marginLeft: -2 }}>T</span>
            <span style={{ position: 'absolute', left: 6, top: 6, fontSize: 13, color: '#eafff0', fontWeight: 700, opacity: 0.7 }}>🌱</span>
          </span>
          <span className="brand" style={{ fontWeight: 800, fontSize: '1.7rem', color: '#188040', letterSpacing: '0.01em', lineHeight: 1.1 }}>S&amp;T's Hydroponics and Microgreens</span>
        </span>
        {/* Category Tabs */}
        <div style={{ marginLeft: 32, display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="/products?category=microgreens" style={{ fontWeight: 600, color: '#23b758', textDecoration: 'none', fontSize: '1.1rem', padding: '0.2rem 0.7rem', borderRadius: 6, transition: 'background 0.2s', background: 'none' }}>Microgreens</a>
          <a href="/products?category=hydroponics" style={{ fontWeight: 600, color: '#23b758', textDecoration: 'none', fontSize: '1.1rem', padding: '0.2rem 0.7rem', borderRadius: 6, transition: 'background 0.2s', background: 'none' }}>Hydroponics</a>
          <a href="/products?category=homefoods" style={{ fontWeight: 600, color: '#23b758', textDecoration: 'none', fontSize: '1.1rem', padding: '0.2rem 0.7rem', borderRadius: 6, transition: 'background 0.2s', background: 'none' }}>Home Foods</a>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', maxWidth: '100vw', marginRight: '2vw' }}>
          {!user ? (
            <>
              <a href="/login" className="cta">Login</a>
              <a href="/register" className="cta signup">Sign Up</a>
            </>
          ) : (
            <>
              <div style={{ position: 'relative' }} ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(v => !v)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    margin: 0,
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  aria-label="User profile"
                >
                  {/* Simple SVG avatar */}
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="18" fill="#eafff0" />
                    <circle cx="18" cy="14" r="7" fill="#23b758" />
                    <ellipse cx="18" cy="27" rx="10" ry="6" fill="#23b758" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 44,
                    minWidth: 220,
                    background: '#fff',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                    borderRadius: 12,
                    padding: '1rem',
                    zIndex: 1000,
                  }}>
                    <div style={{ fontWeight: 700, color: '#188040', fontSize: '1.1rem', marginBottom: 4 }}>{user.email}</div>
                    <div style={{ color: '#23b758', fontWeight: 600, fontSize: '1rem', marginBottom: 8 }}>{user.role}</div>
                    <div style={{ color: '#222', fontSize: '0.98rem', marginBottom: 6 }}>Cart Items: <b>{cartCount}</b></div>
                    {/* <div style={{ color: '#222', fontSize: '0.98rem', marginBottom: 10 }}>Orders: <b>{orderCount}</b></div> */}
                    <a href="/cart" style={{ display: 'block', color: '#23b758', fontWeight: 600, marginBottom: 8, textDecoration: 'none' }}>View Cart</a>
                    <a href="/orders" style={{ display: 'block', color: '#23b758', fontWeight: 600, marginBottom: 8, textDecoration: 'none' }}>My Orders</a>
                    <button 
                      onClick={logout} 
                      className="cta signup" 
                      style={{ 
                        width: '100%', 
                        marginTop: 8, 
                        background: '#fff', 
                        color: '#23b758', 
                        border: '2px solid #23b758', 
                        cursor: 'pointer', 
                        fontWeight: 700, 
                        fontSize: '1.05rem', 
                        borderRadius: 8, 
                        padding: '10px 0', 
                        transition: 'background 0.2s, color 0.2s' 
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
        <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/orders" element={<OrderList />} />
      </Routes>
    </>
  );
}

export default App;
