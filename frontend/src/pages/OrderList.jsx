import React, { useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { AuthContext } from "../context/AuthContext";

export default function OrderList() {
  const { user } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/orders`, {
        params: { email: user.email, password },
      });
      setOrders(res.data);
    } catch (err) {
      setError("Failed to fetch orders. Please check your password.");
      setOrders(null);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div style={{ padding: 32 }}>Please log in to view your orders.</div>;
  }

  return (
    <div style={{ padding: 32, maxWidth: 800, margin: '0 auto' }}>
      <h2>Your Orders</h2>
      {!orders && (
        <form onSubmit={fetchOrders} style={{ marginTop: 32 }}>
          <label style={{ fontWeight: 600, color: '#188040' }}>
            Enter your password to view orders:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ marginLeft: 12, padding: 8, borderRadius: 6, border: '1px solid #23b758' }}
            />
          </label>
          <button type="submit" style={{ marginLeft: 16, background: '#23b758', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>
            View Orders
          </button>
          {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
        </form>
      )}
      {loading && <div style={{ marginTop: 32 }}>Loading orders...</div>}
      {orders && Array.isArray(orders) && orders.length === 0 && (
        <div style={{ color: '#888', fontSize: '1.1rem', marginTop: 32 }}>No orders found.</div>
      )}
      {orders && Array.isArray(orders) && orders.length > 0 && (
        <div style={{ marginTop: 32 }}>
          {orders.map((order, idx) => (
            <div key={order.id || idx} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 18, marginBottom: 18 }}>
              <div style={{ fontWeight: 700, color: '#188040', fontSize: '1.1rem' }}>Order #{order.id}</div>
              <div style={{ color: '#666', fontSize: '0.98rem', margin: '4px 0' }}>Date: {order.date || order.createdAt || 'N/A'}</div>
              <div style={{ color: '#23b758', fontWeight: 600, fontSize: '1rem' }}>Total: ₹{order.total || order.amount || 0}</div>
              <div style={{ color: '#222', fontSize: '0.98rem', marginTop: 6 }}>
                Items:
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {(order.items || order.orderItems || []).map((item, i) => (
                    <li key={item.id || i}>
                      {item.productName || item.name} x {item.quantity} - ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
