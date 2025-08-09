import React, { useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../index.css';

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/register`, { email, password, fullName });
      if (res.data.success) {
        setSuccessMsg("You have been successfully registered, please login now to continue shopping.");
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/login");
        }, 2300);
      } else {
        setErr(res.data.message);
      }
    } catch {
      setErr("Server error");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255,255,255,0.10)'
    }}>
      {successMsg && (
        <div style={{
          position: 'fixed',
          top: 32,
          right: 32,
          background: '#23b758',
          color: '#fff',
          padding: '16px 32px',
          borderRadius: 10,
          fontWeight: 600,
          fontSize: '1.1rem',
          zIndex: 2000,
          boxShadow: '0 2px 12px #0002',
        }}>{successMsg}</div>
      )}
      <form onSubmit={handleSubmit} style={{
        background: 'rgba(255,255,255,0.97)',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
        padding: '2.5rem 2.5rem 2rem 2.5rem',
        minWidth: 340,
        maxWidth: 380,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Inter, Arial, sans-serif',
      }}>
        <h2 style={{
          color: '#23b758',
          fontFamily: 'Pacifico, cursive',
          fontWeight: 700,
          fontSize: '2.2rem',
          marginBottom: 18,
          letterSpacing: 1.2
        }}>Register</h2>
        {err && <div className="error" style={{
          color: '#b00',
          background: '#ffeaea',
          borderRadius: 8,
          padding: '8px 16px',
          marginBottom: 16,
          fontWeight: 600,
          fontSize: '1rem',
        }}>{err}</div>}
        <input
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          placeholder="Full Name"
          required
          style={{
            width: '100%',
            fontSize: '1.15rem',
            padding: '14px 18px',
            borderRadius: 10,
            border: '1.5px solid #23b758',
            marginBottom: 18,
            fontFamily: 'Inter, Arial, sans-serif',
            background: '#f8fff8',
            color: '#188040',
            outline: 'none',
            boxShadow: '0 2px 8px #23b75811',
          }}
        />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{
            width: '100%',
            fontSize: '1.15rem',
            padding: '14px 18px',
            borderRadius: 10,
            border: '1.5px solid #23b758',
            marginBottom: 18,
            fontFamily: 'Inter, Arial, sans-serif',
            background: '#f8fff8',
            color: '#188040',
            outline: 'none',
            boxShadow: '0 2px 8px #23b75811',
          }}
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
          style={{
            width: '100%',
            fontSize: '1.15rem',
            padding: '14px 18px',
            borderRadius: 10,
            border: '1.5px solid #23b758',
            marginBottom: 22,
            fontFamily: 'Inter, Arial, sans-serif',
            background: '#f8fff8',
            color: '#188040',
            outline: 'none',
            boxShadow: '0 2px 8px #23b75811',
          }}
        />
        <button type="submit" style={{
          width: '100%',
          background: 'linear-gradient(90deg, #23b758 60%, #188040 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 10,
          padding: '14px 0',
          fontWeight: 700,
          fontSize: '1.15rem',
          boxShadow: '0 2px 8px #23b75822',
          cursor: 'pointer',
          marginTop: 6,
          marginBottom: 2,
          letterSpacing: 0.5
        }}>Register</button>
      </form>
    </div>
  );
}