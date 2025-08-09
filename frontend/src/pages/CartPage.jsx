import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { AuthContext } from "../context/AuthContext";

export default function CartPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper: get auth headers if token exists
  const getAuthHeaders = () =>
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {};

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError("");
    axios
      .get(`${API_URL}/cart`, {
        params: { email: user.email },
        withCredentials: false,
      })
      .then((res) => {
        setCart(res.data || []);
      })
      .catch((err) => {
        setError("Failed to fetch cart.");
        console.error('Cart fetch error:', err);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/cart`, {
        params: { email: user.email },
        withCredentials: false,
      });
  setCart(res.data || []);
    } catch (err) {
      setError("Failed to fetch cart.");
      console.error('Cart fetch error:', err);
    }
  };

  const handleRemove = async (productId) => {
    console.log('Remove clicked. productId:', productId, 'user.email:', user?.email);
    if (!productId) {
      alert('Error: productId is undefined for remove action!');
      return;
    }
    try {
      await axios.delete(`${API_URL}/cart/remove?email=${encodeURIComponent(user.email)}&productId=${productId}`);
      await fetchCart();
    } catch (err) {
      alert('Failed to remove item.');
      console.error('Remove error:', err);
    }
  };

  // + button: always use /add with quantity=1
  const handleAddQty = async (productId) => {
    console.log('Add clicked. productId:', productId, 'user.email:', user?.email);
    if (!productId) {
      alert('Error: productId is undefined for add action!');
      return;
    }
    try {
      await axios.post(`${API_URL}/cart/add?email=${encodeURIComponent(user.email)}&productId=${productId}&quantity=1`);
      await fetchCart();
    } catch (err) {
      alert('Failed to add item.');
      console.error('Add error:', err);
    }
  };

  // - button: if quantity > 1, use /update; if quantity === 1, use /remove
  const handleSubQty = async (productId, currentQty) => {
    console.log('Sub clicked. productId:', productId, 'currentQty:', currentQty, 'user.email:', user?.email);
    if (!productId) {
      alert('Error: productId is undefined for sub action!');
      return;
    }
    if (currentQty <= 1) {
      await handleRemove(productId);
      return;
    }
    try {
      await axios.put(`${API_URL}/cart/update?email=${encodeURIComponent(user.email)}&productId=${productId}&quantity=${currentQty - 1}`);
      await fetchCart();
    } catch (err) {
      alert('Failed to update quantity.');
      console.error('Update error:', err);
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  // DEBUG: Show user object
  if (!user) return <div style={{ padding: 32 }}>Please log in to view your cart.<br/>User: {JSON.stringify(user)}</div>;
  if (loading) return <div style={{ padding: 32 }}>Loading cart...<br/>User: {JSON.stringify(user)}</div>;
  if (error) return <div style={{ padding: 32, color: 'red' }}>{error}<br/>User: {JSON.stringify(user)}</div>;

  // Debug: log cart structure
  console.log('Cart array:', cart);
  return (
    <div style={{ padding: 32, maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 24 }}>Your Cart</h2>
      <button
        onClick={() => navigate("/products")}
        style={{
          marginBottom: 24,
          background: '#23b758',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 28px',
          fontWeight: 600,
          fontSize: '1.1rem',
          cursor: 'pointer',
          boxShadow: '0 2px 8px #0001',
          transition: 'background 0.2s',
        }}
      >
        Continue Shopping
      </button>
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#888', fontSize: '1.2rem', marginTop: 48 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty cart" style={{ width: 120, opacity: 0.5, marginBottom: 16 }} />
          <div>Your cart is empty.</div>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {cart.map((item, idx) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0001', padding: 16, gap: 24 }}>
                <img src={item.product?.imageUrl || 'https://via.placeholder.com/100x80?text=No+Image'} alt={item.product?.name} style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 12, background: '#f4f4f4' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#188040' }}>{item.product?.name}</div>
                  <div style={{ color: '#666', fontSize: '0.98rem', margin: '4px 0' }}>{item.product?.description}</div>
                  <div style={{ color: '#23b758', fontWeight: 600, fontSize: '1rem' }}>₹{item.product?.price || 0}</div>
                  <div style={{ color: '#b00', fontSize: '0.9rem' }}>productId: {item.product?.productId?.toString() ?? 'undefined'}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button onClick={() => { handleSubQty(item.product.productId, item.quantity); }} style={{ fontSize: '1.3rem', width: 32, height: 32, borderRadius: '50%', border: '1px solid #23b758', background: '#fff', color: '#23b758', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                    <span style={{ minWidth: 60, textAlign: 'center', fontWeight: 700, background: '#ffeb3b', color: '#222', borderRadius: 6, padding: '2px 8px' }}>qty: {item.quantity}</span>
                    <button onClick={() => { handleAddQty(item.product.productId); }} style={{ fontSize: '1.3rem', width: 32, height: 32, borderRadius: '50%', border: '1px solid #23b758', background: '#fff', color: '#23b758', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  </div>
                  <div style={{ fontSize: '1rem', color: '#188040', fontWeight: 600, marginTop: 2 }}>
                    Total: ₹{(item.product?.price || 0) * (item.quantity || 0)}
                  </div>
                </div>
                <button onClick={() => { console.log('Remove button clicked for item:', item); handleRemove(item.product.productId); }} style={{ background: '#fff', color: '#23b758', border: '2px solid #23b758', borderRadius: 8, padding: '6px 18px', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', transition: 'background 0.2s' }}>Remove</button>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'right', marginTop: 32, fontSize: '1.3rem', fontWeight: 700, color: '#188040' }}>
            Total: ₹{total}
          </div>
        </>
      )}
    </div>
  );
}
