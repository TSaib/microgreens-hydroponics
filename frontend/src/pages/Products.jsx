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

  useEffect(() => {
    axios.get(`${API_URL}/products?category=${cat}`).then(res => setProducts(res.data));
  }, [cat]);

  return (
    <div>
      <div style={{display:'flex',gap:10,margin:"0 0 1rem 0"}}>
        {categories.map(c =>
          <button key={c.key} onClick={()=>setCat(c.key)} style={{fontWeight:cat===c.key?"bold":"normal"}}>
            {c.label}
          </button>
        )}
      </div>
      <div className="products-grid">
        {products.map(p => (
          <div className="product-card" key={p.id}>
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <div className="price">₹{p.price}</div>
            <button onClick={()=>addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}