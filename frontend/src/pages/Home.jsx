import React from 'react';

export default function Home() {
  return (
    <div className="main-content" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <section style={{ textAlign: 'center', background: 'transparent', boxShadow: 'none', padding: '3rem 2rem', color: '#188040' }}>
        <div style={{ fontSize: '5.5rem', fontWeight: 400, marginBottom: '1.2rem', color: '#188040', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <span role="img" aria-label="leaf" style={{ fontSize: '4rem', color: '#23b758', marginRight: '0.5rem' }}>🌱</span>
          100% Organic & Fresh
        </div>
        <h1 style={{ color: '#188040', fontSize: '2.8rem', fontWeight: 800, marginBottom: '1.2rem' }}>Fresh • Organic • Delivered</h1>
        <p style={{ color: '#666', fontSize: '1.5rem', fontWeight: 500, marginBottom: '2.2rem' }}>Premium microgreens and hydroponics grown with care and delivered fresh to your door. Packed with nutrients, flavor, and vitality. Grown locally, delivered fast.</p>
        <a href="/products" className="cta" style={{ fontSize: '1.3rem', padding: '1rem 2.5rem' }}>Shop Now </a>
      </section>
    </div>
  );
}