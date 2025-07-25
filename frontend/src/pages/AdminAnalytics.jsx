import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { useAuth } from "../context/AuthContext";

export default function AdminAnalytics() {
  const { user } = useAuth();
  const [sales, setSales] = useState(0);
  const [orders, setOrders] = useState(0);
  const [users, setUsers] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/admin/analytics/sales`, { headers: { Authorization: `Bearer ${user?.token}` } }).then(res => setSales(res.data));
    axios.get(`${API_URL}/admin/analytics/orders/count`, { headers: { Authorization: `Bearer ${user?.token}` } }).then(res => setOrders(res.data));
    axios.get(`${API_URL}/admin/analytics/users/count`, { headers: { Authorization: `Bearer ${user?.token}` } }).then(res => setUsers(res.data));
    axios.get(`${API_URL}/admin/analytics/recent-orders`, { headers: { Authorization: `Bearer ${user?.token}` } }).then(res => setRecentOrders(res.data));
    axios.get(`${API_URL}/admin/analytics/top-customers`, { headers: { Authorization: `Bearer ${user?.token}` } }).then(res => setTopCustomers(res.data));
  }, [user]);

  return (
    <div>
      <h2>Analytics</h2>
      <div>Total Sales: ₹{sales}</div>
      <div>Total Orders: {orders}</div>
      <div>Total Users: {users}</div>
      <h3>Recent Orders</h3>
      <ul>
        {recentOrders.map(o => <li key={o.id}>Order #{o.id} - {o.status}</li>)}
      </ul>
      <h3>Top Customers</h3>
      <ul>
        {topCustomers.map(u => <li key={u.id}>{u.email}</li>)}
      </ul>
    </div>
  );
}