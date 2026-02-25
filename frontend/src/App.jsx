
import React, { useState, useRef, useEffect } from 'react';
import sLeafLogo from './assets/s-leaf-logo.JPG';
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

// Add modern CSS styles and animations
const modernStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #ffffff;
    overflow-x: hidden;
  }
  
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .main-content {
    flex: 1;
    animation: fadeInUp 0.8s ease-out;
  }
`;

// Inject styles if not already present
if (!document.querySelector('#modern-app-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'modern-app-styles';
  styleSheet.textContent = modernStyles;
  document.head.appendChild(styleSheet);
}

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
    <div className="app-container">
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
      <nav style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 255, 248, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(35, 183, 88, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(35, 183, 88, 0.1)',
        padding: '1rem 2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #23b758, #188040)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 25px rgba(35, 183, 88, 0.2)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img src={sLeafLogo} alt="IRA Logo" style={{ 
                width: 32, 
                height: 32, 
                borderRadius: 8, 
                objectFit: 'cover',
                filter: 'brightness(1.1) contrast(1.1)'
              }} />
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                transform: 'rotate(45deg)',
                animation: 'shimmer 3s ease-in-out infinite'
              }}></div>
            </div>
            <div>
              <h1 style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                fontWeight: 800,
                fontSize: '1.8rem',
                background: 'linear-gradient(135deg, #188040, #23b758)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
                letterSpacing: '-0.01em',
                lineHeight: 1.1
              }}>IRA Foods</h1>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8rem',
                color: '#188040',
                fontWeight: 500,
                margin: 0,
                letterSpacing: '0.5px'
              }}>& HARVESTS</p>
            </div>
          </span>
          
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {[
              { href: '/products?category=harvests', text: 'Harvests' },
              { href: '/products?category=homefoods', text: 'Home Foods' },
              { href: '/products?category=hydroponics', text: 'Hydroponics' },
              { href: '/products?category=microgreens', text: 'Microgreens' }
            ].map((item, index) => (
              <a key={index} href={item.href} style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                color: '#2d3748',
                textDecoration: 'none',
                fontSize: '1.1rem',
                padding: '0.5rem 1.2rem',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                position: 'relative',
                background: 'rgba(35, 183, 88, 0.05)',
                border: '1px solid rgba(35, 183, 88, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #23b758, #188040)';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(35, 183, 88, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(35, 183, 88, 0.05)';
                e.target.style.color = '#2d3748';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
                {item.text}
              </a>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {!user ? (
              <>
                <a href="/login" style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#188040',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  padding: '0.7rem 1.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#23b758';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#188040';
                }}>Login</a>
                
                <a href="/register" style={{
                  fontFamily: 'Inter, sans-serif',
                  background: 'linear-gradient(135deg, #188040, #23b758)',
                  color: 'white',
                  padding: '0.7rem 1.5rem',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: '0 4px 15px rgba(35, 183, 88, 0.3)',
                  transition: 'all 0.3s ease',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(35, 183, 88, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(35, 183, 88, 0.3)';
                }}>Sign Up</a>
              </>
            ) : (
            <>
              <div style={{ position: 'relative' }} ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(v => !v)}
                  style={{
                    background: 'linear-gradient(135deg, rgba(35, 183, 88, 0.1), rgba(24, 128, 64, 0.05))',
                    border: '1px solid rgba(35, 183, 88, 0.2)',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    color: '#188040'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(35, 183, 88, 0.15), rgba(24, 128, 64, 0.08))';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(35, 183, 88, 0.1), rgba(24, 128, 64, 0.05))';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="18" fill="url(#gradient)" />
                    <circle cx="18" cy="14" r="6" fill="white" />
                    <ellipse cx="18" cy="26" rx="8" ry="5" fill="white" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#23b758'}} />
                        <stop offset="100%" style={{stopColor:'#188040'}} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span>{user.email.split('@')[0]}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </button>
                {dropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: '0.5rem',
                    minWidth: 280,
                    background: 'linear-gradient(145deg, #ffffff, #f8fff8)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 20px 60px rgba(35, 183, 88, 0.15)',
                    borderRadius: '20px',
                    padding: '2rem',
                    zIndex: 1000,
                    border: '1px solid rgba(35, 183, 88, 0.1)',
                    animation: 'fadeInUp 0.3s ease-out'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      paddingBottom: '1rem',
                      borderBottom: '1px solid rgba(35, 183, 88, 0.1)'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #23b758, #188040)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 25px rgba(35, 183, 88, 0.2)'
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <circle cx="12" cy="8" r="4"/>
                          <ellipse cx="12" cy="18" rx="7" ry="4"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ 
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 700, 
                          color: '#2d3748', 
                          fontSize: '1.1rem', 
                          marginBottom: '0.25rem'
                        }}>{user.email}</div>
                        <div style={{ 
                          color: '#23b758', 
                          fontWeight: 600, 
                          fontSize: '0.9rem',
                          textTransform: 'capitalize'
                        }}>{user.role}</div>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ 
                        color: '#4a5568', 
                        fontSize: '0.95rem', 
                        marginBottom: '0.5rem',
                        fontFamily: 'Inter, sans-serif'
                      }}>Cart Items: <strong style={{ color: '#188040' }}>{cartCount}</strong></div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      <a href="/cart" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: '#188040',
                        fontWeight: 600,
                        textDecoration: 'none',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        background: 'rgba(35, 183, 88, 0.05)',
                        fontFamily: 'Inter, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(35, 183, 88, 0.1)';
                        e.target.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(35, 183, 88, 0.05)';
                        e.target.style.transform = 'translateX(0)';
                      }}>
                        🛒 View Cart
                      </a>
                      
                      <a href="/orders" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: '#188040',
                        fontWeight: 600,
                        textDecoration: 'none',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        background: 'rgba(35, 183, 88, 0.05)',
                        fontFamily: 'Inter, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(35, 183, 88, 0.1)';
                        e.target.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(35, 183, 88, 0.05)';
                        e.target.style.transform = 'translateX(0)';
                      }}>
                        📋 My Orders
                      </a>
                    </div>
                    
                    <button 
                      onClick={logout} 
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #188040, #23b758)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '0.75rem',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(35, 183, 88, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 25px rgba(35, 183, 88, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(35, 183, 88, 0.3)';
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
      </div>
      </nav>
      <main className="main-content">
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
      </main>
    </div>
  );
}

export default App;
