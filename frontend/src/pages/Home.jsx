import React from 'react';
import { Leaf } from "lucide-react";
import benefits from '../assets/benefits.json';
import { Sprout } from "lucide-react";
import sLeafLogo from '../assets/s-t-leaf-logo.jpg';

export default function Home() {
  return (
    <div>
      <div className="main-content" style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* Hero Section */}
        <section style={{
          background: 'transparent',
          minHeight: '80vh',
          padding: '6rem 2rem 4rem 2rem',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ maxWidth: '900px', width: '100%' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <Leaf color="#23b758" size={24} />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                color: '#188040',
                fontSize: '1.1rem',
                fontWeight: 600
              }}>100% Pure & Natural</span>
            </div>
            
            <h1 style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              color: '#2d3748',
              marginBottom: '1rem',
              lineHeight: 1.2,
              letterSpacing: '-0.02em'
            }}>Farm Fresh Harvests & <br/><span style={{ color: '#23b758' }}>Home made Foods</span></h1>
            
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.2rem',
              color: '#4a5568',
              marginBottom: '2.5rem',
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto 2.5rem auto'
            }}>Locally grown, nutrient-rich greens & Home made foods delivered fresh to your doorstep. 
            Experience the taste of pure, pesticide-free nutrition.</p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/products" style={{
                background: '#23b758',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '1.1rem',
                boxShadow: '0 4px 12px rgba(35, 183, 88, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#1fa649';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#23b758';
                e.target.style.transform = 'translateY(0)';
              }}>Shop Fresh Produce</a>
              
              <a href="#about" style={{
                background: 'transparent',
                color: '#23b758',
                padding: '1rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '1.1rem',
                border: '2px solid #23b758',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#23b758';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#23b758';
              }}>Learn More</a>
            </div>
          </div>
        </section>
        {/* Why Choose Us Section */}
        <section id="about" style={{
          background: '#ffffff',
          padding: '5rem 2rem'
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 700,
                color: '#2d3748',
                marginBottom: '1rem'
              }}>Why Choose IRA Foods?</h2>
              
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.1rem',
                color: '#4a5568',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.6
              }}>We're passionate about delivering the freshest, most nutritious produce straight from our farms to your table.</p>
            </div>

            {/* Value Props Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: '#f9fffe',
                borderRadius: '12px',
                border: '1px solid #e2f8e2'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>🌱</div>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: '#2d3748',
                  marginBottom: '0.75rem'
                }}>Farm Fresh Quality</h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#4a5568',
                  lineHeight: 1.5
                }}>Harvested daily and delivered within 24 hours for maximum freshness and nutrition.</p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: '#f9fffe',
                borderRadius: '12px',
                border: '1px solid #e2f8e2'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>🚚</div>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: '#2d3748',
                  marginBottom: '0.75rem'
                }}>Fast Delivery</h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#4a5568',
                  lineHeight: 1.5
                }}>Same-day delivery available. Fresh produce at your doorstep when you need it.</p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: '#f9fffe',
                borderRadius: '12px',
                border: '1px solid #e2f8e2'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>✨</div>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: '#2d3748',
                  marginBottom: '0.75rem'
                }}>Pure & Natural</h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#4a5568',
                  lineHeight: 1.5
                }}>No pesticides, no chemicals. Just pure, natural nutrition grown with care.</p>
              </div>
            </div>
            
            {/* Products Preview */}
            <div style={{
              background: 'linear-gradient(135deg, #f0faf0 0%, #e8f5e8 100%)',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#2d3748',
                marginBottom: '1rem'
              }}>Our Product Range</h3>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '3rem',
                flexWrap: 'wrap',
                marginTop: '2rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: '#23b758',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto',
                    boxShadow: '0 4px 12px rgba(35, 183, 88, 0.3)'
                  }}>
                    <span style={{ color: 'white', fontSize: '2rem' }}>🥬</span>
                  </div>
                  <h4 style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    color: '#2d3748',
                    marginBottom: '0.5rem'
                  }}>Microgreens</h4>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#4a5568',
                    fontSize: '0.9rem'
                  }}>Nutrient-dense baby greens</p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: '#188040',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto',
                    boxShadow: '0 4px 12px rgba(24, 128, 64, 0.3)'
                  }}>
                    <span style={{ color: 'white', fontSize: '2rem' }}>🥒</span>
                  </div>
                  <h4 style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    color: '#2d3748',
                    marginBottom: '0.5rem'
                  }}>Hydroponics</h4>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#4a5568',
                    fontSize: '0.9rem'
                  }}>Soil-free fresh vegetables</p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: '#2ea043',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto',
                    boxShadow: '0 4px 12px rgba(46, 160, 67, 0.3)'
                  }}>
                    <span style={{ color: 'white', fontSize: '2rem' }}>🥗</span>
                  </div>
                  <h4 style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    color: '#2d3748',
                    marginBottom: '0.5rem'
                  }}>Salad Mixes</h4>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#4a5568',
                    fontSize: '0.9rem'
                  }}>Ready-to-eat combinations</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer style={{
        background: '#2d3748',
        color: '#fff',
        padding: '3rem 2rem 2rem 2rem'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <img src={sLeafLogo} alt="IRA Logo" style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  objectFit: 'cover'
                }} />
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  margin: 0
                }}>IRA Foods and Harvests</h3>
              </div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                color: '#a0aec0',
                lineHeight: 1.6,
                fontSize: '0.95rem'
              }}>Fresh, pure, and locally grown produce delivered to your doorstep.</p>
            </div>
            
            <div>
              <h4 style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '1.1rem',
                marginBottom: '1rem',
                color: '#23b758'
              }}>Contact Info</h4>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.8,
                color: '#cbd5e0'
              }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  📧 <a href="mailto:info@irafoodsandharvests.com" style={{
                    color: '#cbd5e0',
                    textDecoration: 'none'
                  }}>info@irafoodsandharvests.com</a>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>📞 +91-9876543210</div>
                <div>📍 123 Green Lane, Urban Farms<br/>Bengaluru, India</div>
              </div>
            </div>
            
            <div>
              <h4 style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '1.1rem',
                marginBottom: '1rem',
                color: '#23b758'
              }}>Quick Links</h4>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.8
              }}>
                <div><a href="/products" style={{ color: '#cbd5e0', textDecoration: 'none' }}>Our Products</a></div>
                <div><a href="#about" style={{ color: '#cbd5e0', textDecoration: 'none' }}>About Us</a></div>
                <div><a href="/cart" style={{ color: '#cbd5e0', textDecoration: 'none' }}>Cart</a></div>
                <div><a href="/orders" style={{ color: '#cbd5e0', textDecoration: 'none' }}>My Orders</a></div>
              </div>
            </div>
          </div>
          
          <div style={{
            borderTop: '1px solid #4a5568',
            paddingTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.9rem',
            color: '#a0aec0',
            fontFamily: 'Inter, sans-serif'
          }}>
            © {new Date().getFullYear()} IRA Foods and Harvests Pvt. Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Modern BenefitCard component with advanced styling
function BenefitCard({ benefit, index }) {
  return (
    <div style={{
      background: 'linear-gradient(145deg, #ffffff, #f8fff8)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 40px rgba(35, 183, 88, 0.1)',
      border: '1px solid rgba(35, 183, 88, 0.1)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      transform: 'translateY(0)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 20px 60px rgba(35, 183, 88, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 10px 40px rgba(35, 183, 88, 0.1)';
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '60px',
        height: '60px',
        background: `linear-gradient(45deg, rgba(35, 183, 88, 0.${3 + index}), rgba(24, 128, 64, 0.${2 + index}))`,
        borderRadius: '50%',
        zIndex: 0
      }}></div>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #23b758, #188040)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          boxShadow: '0 8px 25px rgba(35, 183, 88, 0.2)'
        }}>
          <img src={benefit.img} alt={benefit.alt} style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            objectFit: 'cover',
            filter: 'brightness(0) invert(1)'
          }} />
        </div>
        
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#2d3748',
          lineHeight: 1.4,
          margin: 0
        }}>{benefit.title}</h4>
      </div>
    </div>
  );
}

// Legacy component for compatibility
function BenefitBlock({ img, alt, text }) {
  return (
    <div style={{ background: '#f8fff8', borderRadius: 12, boxShadow: '0 2px 8px #23b75811', padding: '1.1rem 1.2rem', flex: '1 1 180px', minWidth: 160, display: 'flex', alignItems: 'center', gap: 12 }}>
      <img src={img} alt={alt} style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover', background: '#fff' }} />
      <span>{text}</span>
    </div>
  );
}