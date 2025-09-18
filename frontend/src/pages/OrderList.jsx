import React, { useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { AuthContext } from "../context/AuthContext";

export default function OrderList() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setOrders(res.data);
    } catch (err) {
      // Enhanced error logging for debugging
      if (err.response) {
        setError(`Failed to fetch orders: ${err.response.status} ${err.response.statusText}`);
        console.error("Order fetch error:", err.response.data);
      } else if (err.request) {
        setError("Failed to fetch orders: No response from server.");
        console.error("Order fetch error: No response", err.request);
      } else {
        setError(`Failed to fetch orders: ${err.message}`);
        console.error("Order fetch error:", err.message);
      }
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
        <button onClick={fetchOrders} style={{ marginTop: 32, background: '#23b758', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 28px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>
          View Orders
        </button>
      )}
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      {loading && <div style={{ marginTop: 32 }}>Loading orders...</div>}
      {orders && Array.isArray(orders) && orders.length === 0 && (
        <div style={{ color: '#888', fontSize: '1.1rem', marginTop: 32 }}>No orders found.</div>
      )}
      {orders && Array.isArray(orders) && orders.length > 0 && (
        <div style={{ marginTop: 32 }}>
          {orders.map((order, idx) => (
            <div key={order.orderId || idx} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px #0002', padding: 24, marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, color: '#188040', fontSize: '1.2rem' }}>Order #{order.orderId}</div>
                <span style={{ background: '#eafff0', color: '#23b758', fontWeight: 600, borderRadius: 8, padding: '4px 14px', fontSize: '0.98rem' }}>{order.status}</span>
              </div>
              <div style={{ color: '#666', fontSize: '1rem', marginBottom: 6 }}>Date: {order.orderTime ? new Date(order.orderTime).toLocaleString() : 'N/A'}</div>
              <div style={{ color: '#23b758', fontWeight: 700, fontSize: '1.1rem', marginBottom: 10 }}>Total: ₹{order.total || 0}</div>
              <div style={{ color: '#222', fontSize: '1.05rem', marginTop: 8, marginBottom: 8, fontWeight: 600 }}>Items:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {(order.items || []).map((item, i) => (
                  <div key={item.id || i} style={{ display: 'flex', alignItems: 'center', background: '#f8fff8', borderRadius: 12, boxShadow: '0 2px 8px #23b75811', padding: 12, gap: 18 }}>
                    <img src={item.product?.imageUrl || 'https://via.placeholder.com/80x60?text=No+Image'} alt={item.product?.name} style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8, background: '#f4f4f4', marginRight: 12 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#188040', fontSize: '1.05rem' }}>{item.product?.name}</div>
                      <div style={{ color: '#666', fontSize: '0.97rem', margin: '2px 0 4px 0' }}>{item.product?.description}</div>
                      <div style={{ color: '#23b758', fontWeight: 600, fontSize: '1rem' }}>₹{item.product?.price} <span style={{ color: '#888', fontWeight: 400, fontSize: '0.95rem' }}>x {item.quantity}</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ color: '#888', fontSize: '0.98rem', marginTop: 14 }}>Delivery Address: {order.address}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
