import React, { useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login, user } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (res.data.success) {
        login(email, res.data.role);
        // Navigation will be handled by <Navigate />
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.error('Login API error:', error);
      setErr("Server error: " + (error?.message || 'Unknown error'));
    }
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {err && <div className="error">{err}</div>}
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}