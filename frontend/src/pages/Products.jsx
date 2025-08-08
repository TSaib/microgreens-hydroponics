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
        console.error(err);
        setError('Failed to fetch products. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [cat]);

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, margin: "0 0 1rem 0" }}>
        {categories.map(c =>
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            style={{ fontWeight: cat === c.key ? "bold" : "normal" }}
          >
            {c.label}
          </button>
        )}
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && products.length === 0 && <p>No products found for "{cat}".</p>}

      <div className="products-grid">
        {products.map(p => (
          <div className="product-card" key={p.id}>
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <div className="price">₹{p.price}</div>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
