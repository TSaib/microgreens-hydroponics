import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/reset-password`, { email, newPassword });
      const success = res.data.success;
      setMsg(res.data.message || (success ? "Password reset successful, Please login." : "Failed"));
      if (success) {
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      setMsg("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.10)' }}>
      <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 18, boxShadow: '0 8px 32px rgba(0,0,0,0.13)', padding: '2.5rem 2.5rem 2rem 2.5rem', minWidth: 340, maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Inter, Arial, sans-serif' }}>
        <h2 style={{ color: '#23b758', fontFamily: 'Pacifico, cursive', fontWeight: 700, fontSize: '2.2rem', marginBottom: 18, letterSpacing: 1.2 }}>Reset Password</h2>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required style={{ width: '100%', fontSize: '1.15rem', padding: '14px 18px', borderRadius: 10, border: '1.5px solid #23b758', marginBottom: 18, fontFamily: 'Inter, Arial, sans-serif', background: '#f8fff8', color: '#188040', outline: 'none', boxShadow: '0 2px 8px #23b75811' }} />
        <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" placeholder="Enter new password" required style={{ width: '100%', fontSize: '1.15rem', padding: '14px 18px', borderRadius: 10, border: '1.5px solid #23b758', marginBottom: 18, fontFamily: 'Inter, Arial, sans-serif', background: '#f8fff8', color: '#188040', outline: 'none', boxShadow: '0 2px 8px #23b75811' }} />
        <button type="submit" disabled={loading} style={{ width: '100%', background: '#188040', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 0', fontWeight: 700, fontSize: '1.15rem', boxShadow: '0 2px 8px #23b75822', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 6, marginBottom: 2, letterSpacing: 0.5 }}>{loading ? 'Resetting...' : 'Reset Password'}</button>
        {msg && <div style={{ color: msg.includes('successful') ? '#188040' : '#b00', marginTop: 12 }}>{msg}</div>}
      </form>
    </div>
  );
}
