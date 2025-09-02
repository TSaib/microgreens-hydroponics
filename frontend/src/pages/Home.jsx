import React from 'react';
import benefits from '../assets/benefits.json';

export default function Home() {
  return (
    <div>
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
        <section style={{ background: 'rgba(255,255,255,0.85)', width: '100%', margin: 0, padding: '2.5rem 0', color: '#188040' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.2rem', color: '#23b758', textAlign: 'center' }}>Health Benefits & Why Choose Us</h2>
          <p style={{ marginBottom: '2rem' , textAlign: 'center'}}>Discover the amazing health benefits of our microgreens and hydroponics, and learn why we're the best choice for fresh, organic produce.</p>
          <p style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' , textAlign: 'center'}}>Our microgreens contain upto 40x more nutrients than mature vegetables, while our hydroponic varieties offer pure, pesticide-free nutrition.</p>
          {/* Microgreens Heading */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
            <img src="https://cdn-icons-png.flaticon.com/512/2909/2909769.png" alt="Microgreens" style={{ width: 38, height: 38, background: '#eafff0', borderRadius: '50%', padding: 6, marginRight: 8 }} />
            <h3 style={{ color: '#188040', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>Microgreens</h3>
          </div>
          {/* Microgreens Benefits Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center', marginBottom: 28 }}>
            <BenefitBlock img={benefits[0].img} alt={benefits[0].alt} text={benefits[0].title} />
            <BenefitBlock img={benefits[1].img} alt={benefits[1].alt} text={benefits[1].title} />
            <BenefitBlock img={benefits[2].img} alt={benefits[2].alt} text={benefits[2].title} />
            <BenefitBlock img={benefits[3].img} alt={benefits[3].alt} text={benefits[3].title} />
          </div>
          {/* Hydroponics Heading */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
            <img src="https://cdn-icons-png.flaticon.com/512/728/728093.png" alt="Hydroponics" style={{ width: 38, height: 38, background: '#eafff0', borderRadius: '50%', padding: 6, marginRight: 8 }} />
            <h3 style={{ color: '#188040', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>Hydroponics</h3>
          </div>
          {/* Hydroponics Benefits Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center' }}>
            <BenefitBlock img={benefits[4].img} alt={benefits[4].alt} text={benefits[4].title} />
            <BenefitBlock img={benefits[5].img} alt={benefits[5].alt} text={benefits[5].title} />
            <BenefitBlock img={benefits[6].img} alt={benefits[6].alt} text={benefits[6].title} />
            <BenefitBlock img={benefits[7].img} alt={benefits[7].alt} text={benefits[7].title} />
          </div>
        </section>
      </div>
      <footer style={{ width: '100%', background: '#188040', color: '#fff', padding: '2rem 0 1.2rem 0', marginTop: '2rem', textAlign: 'center', fontSize: '1.1rem', letterSpacing: '0.02em' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            {/* Creative logo: leaf + water drop + sun, styled for inspiration */}
            <span style={{ display: 'flex', alignItems: 'center', fontSize: 0 }}>
              <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Leaf" style={{ width: 32, height: 32, marginRight: -8, zIndex: 2, filter: 'drop-shadow(0 2px 4px #0002)' }} />
              <img src="https://cdn-icons-png.flaticon.com/512/728/728093.png" alt="Water Drop" style={{ width: 28, height: 28, marginRight: -8, zIndex: 1, filter: 'drop-shadow(0 2px 4px #0002)' }} />
              <img src="https://cdn-icons-png.flaticon.com/512/869/869869.png" alt="Sun" style={{ width: 24, height: 24, zIndex: 0, filter: 'drop-shadow(0 2px 4px #0002)' }} />
            </span>
            <span style={{ fontWeight: 700, fontSize: '1.3rem', letterSpacing: '0.04em' }}>S&amp;T's Hydroponics and Microgreens</span>
          </div>
          <div>Email: <a href="mailto:info@microgreenshydroponics.com" style={{ color: '#fff', textDecoration: 'underline' }}>info@microgreenshydroponics.com</a></div>
          <div>Contact: +91-9876543210</div>
          <div>Address: 123 Green Lane, Urban Farms, Bengaluru, India</div>
          <div style={{ fontSize: '0.95rem', marginTop: 8, color: '#e0ffe0' }}>© {new Date().getFullYear()} Microgreens Hydroponics Pvt. Ltd. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

// BenefitBlock component for displaying each benefit with image and text
function BenefitBlock({ img, alt, text }) {
  return (
    <div style={{ background: '#f8fff8', borderRadius: 12, boxShadow: '0 2px 8px #23b75811', padding: '1.1rem 1.2rem', flex: '1 1 180px', minWidth: 160, display: 'flex', alignItems: 'center', gap: 12 }}>
      <img src={img} alt={alt} style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover', background: '#fff' }} />
      <span>{text}</span>
    </div>
  );
}