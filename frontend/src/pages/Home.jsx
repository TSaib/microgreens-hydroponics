import React from 'react';

export default function Home() {
  return (
    <div className="main-content" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <section style={{ textAlign: 'center', background: 'transparent', boxShadow: 'none', padding: '3rem 2rem', color: '#188040' }}>
        <h1 style={{ color: '#188040', fontSize: '2.8rem', fontWeight: 800, marginBottom: '1.2rem' }}>Fresh Microgreens Delivered to Your Doorstep</h1>
        <p style={{ color: '#188040', fontSize: '1.5rem', fontWeight: 500, marginBottom: '2.2rem' }}>India's freshest, healthiest, and most flavorful microgreens. Grown locally, delivered fast.</p>
        <a href="/products" className="cta" style={{ fontSize: '1.3rem', padding: '1rem 2.5rem' }}>Shop Now</a>
      </section>
    </div>
  );
}