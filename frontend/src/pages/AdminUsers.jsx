import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { useAuth } from "../context/AuthContext";

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/admin/users`, { headers: { Authorization: `Bearer ${user?.token}` } }).then(res => setUsers(res.data));
  }, [user]);

  const updateRole = (id, role) => {
    axios.put(`${API_URL}/admin/users/${id}/role`, JSON.stringify(role), {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${user?.token}` }
    }).then(() => setUsers(users.map(u => u.id === id ? { ...u, role } : u)));
  };

  const deleteUser = id => {
    axios.delete(`${API_URL}/admin/users/${id}`, { headers: { Authorization: `Bearer ${user?.token}` } })
      .then(() => setUsers(users.filter(u => u.id !== id)));
  };

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map(u =>
          <li key={u.id}>
            {u.email} ({u.role})
            <select value={u.role} onChange={e => updateRole(u.id, e.target.value)}>
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        )}
      </ul>
    </div>
  );
}