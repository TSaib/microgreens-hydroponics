import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const categories = [
  { key: 'microgreens', label: 'Microgreens' },
  { key: 'hydroponics', label: 'Hydroponics' }
];

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState('microgreens');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    axios.get(`${API_URL}/products?category=${cat}`)
      .then(res => {
        setProducts(res.data);
        console.log(`[${cat}] products:`, res.data); 
      })
      .catch(err => {
        console.error('Products API error:', err);
        setError('Failed to fetch products. ' + (err?.message || 'Please try again later.'));
      })
      .finally(() => setLoading(false));
  }, [cat]);

  return (
    <div className="main-content" style={{ background: 'transparent', padding: '0 0 2rem 0' }}>
      <header style={{ textAlign: 'center', margin: '2rem 0 1.5rem 0' }}>
        <h1 style={{ color: '#188040', fontWeight: 800, fontSize: '2.5rem', marginBottom: '0.5rem' }}>Our Fresh Products</h1>
        <p style={{ color: '#333', fontSize: '1.2rem', margin: 0 }}>Carefully grown microgreens and hydroponic varieties harvested at peak nutrition for maximum flavor and health benefits.</p>
        <div className="category-toggle-group">
          {categories.map(c =>
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={`category-toggle-btn${cat === c.key ? ' selected' : ''}`}
            >
              {c.label}
            </button>
          )}
        </div>
      </header>

      {loading && <p style={{ textAlign: 'center', color: '#188040' }}>Loading products...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      {!loading && !error && products.length === 0 && <p style={{ textAlign: 'center', color: '#188040' }}>No products found for "{cat}".</p>}

      <div className="products-grid">
        {products.map(p => (
          <div className="product-card" key={p.id} style={{ background: '#fff', color: '#222', borderRadius: '1.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 420 }}>
            <img src={p.imageUrl} alt={p.name} style={{ width: '100%', maxWidth: 180, borderRadius: '1rem', marginBottom: '1rem', boxShadow: '0 2px 8px #0001' }} />
            <h3 style={{ color: '#188040', fontWeight: 700, fontSize: '1.3rem', margin: '0.5rem 0 0.2rem 0', textAlign: 'center' }}>{p.name}</h3>
            <p style={{ fontSize: '1rem', color: '#222', textAlign: 'center', margin: '0 0 0.5rem 0' }}>{p.description}</p>
            {p.nutrients && Array.isArray(p.nutrients) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '0.5rem 0 0.5rem 0', justifyContent: 'center' }}>
                {p.nutrients.map((n, i) => (
                  <span key={i} style={{ background: '#eafff0', color: '#188040', borderRadius: '1rem', padding: '0.2rem 0.8rem', fontSize: '0.9rem', fontWeight: 600 }}>{n}</span>
                ))}
              </div>
            )}
            <div className="price" style={{ color: '#188040', fontWeight: 700, fontSize: '1.2rem', margin: '1rem 0 0.5rem 0' }}>₹{p.price} <span style={{ color: '#888', fontWeight: 400, fontSize: '0.95rem' }}>{p.unit}</span></div>
            <button onClick={() => addToCart(p)} style={{ background: '#23b758', color: '#fff', border: 'none', padding: '0.7rem 2rem', borderRadius: '2rem', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', marginTop: 'auto', boxShadow: '0 2px 8px #0001', transition: 'background 0.2s' }}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
