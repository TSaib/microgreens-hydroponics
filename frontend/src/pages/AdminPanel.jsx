// ...inside your admin panel

import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
    <nav>
      <a href="/admin">Products & Orders</a> |{" "}
      <a href="/admin/analytics">Analytics</a> |{" "}
      <a href="/admin/users">User Management</a>
    </nav>
    <p>Welcome to the admin control panel. Select an option above to manage data.</p>
    </div>
  );
}