import { Link } from 'react-router-dom';
import { GiIndianPalace } from 'react-icons/gi';
import { FiInstagram, FiYoutube, FiTwitter, FiFacebook } from 'react-icons/fi';

const categories = ['Breakfast', 'Rice Dishes', 'Curries', 'Dals', 'Biryanis', 'Sweets', 'Chutneys', 'Street Food'];

export default function Footer() {
    return (
        <footer style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '60px' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', paddingBottom: '48px' }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <span style={{ color: '#f39c12', fontSize: '1.6rem' }}><GiIndianPalace /></span>
                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', background: 'linear-gradient(135deg,#f39c12,#c0392b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Andhra Ruchulu</span>
                        </div>
                        <p style={{ color: '#a8a39c', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: '20px' }}>
                            Celebrating the rich, bold, and authentic flavors of Andhra Pradesh — one recipe at a time.
                        </p>
                        <div style={{ display: 'flex', gap: '14px' }}>
                            {[FiInstagram, FiYoutube, FiTwitter, FiFacebook].map((Icon, i) => (
                                <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a8a39c', transition: 'all 0.3s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(192,57,43,0.3)'; e.currentTarget.style.color = '#e74c3c'; e.currentTarget.style.borderColor = 'rgba(192,57,43,0.5)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#a8a39c'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#f39c12', marginBottom: '18px', fontFamily: 'Poppins, sans-serif' }}>Categories</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {categories.map(c => (
                                <Link key={c} to={`/category/${c}`} style={{ color: '#a8a39c', fontSize: '0.88rem', transition: 'color 0.3s' }}
                                    onMouseEnter={e => e.target.style.color = '#f39c12'}
                                    onMouseLeave={e => e.target.style.color = '#a8a39c'}>
                                    {c}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#f39c12', marginBottom: '18px', fontFamily: 'Poppins, sans-serif' }}>Quick Links</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[['Home', '/'], ['All Recipes', '/recipes'], ['About Us', '/about'], ['Sign In', '/auth']].map(([label, path]) => (
                                <Link key={path} to={path} style={{ color: '#a8a39c', fontSize: '0.88rem', transition: 'color 0.3s' }}
                                    onMouseEnter={e => e.target.style.color = '#f39c12'}
                                    onMouseLeave={e => e.target.style.color = '#a8a39c'}>
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#f39c12', marginBottom: '18px', fontFamily: 'Poppins, sans-serif' }}>Stay Updated</h4>
                        <p style={{ color: '#a8a39c', fontSize: '0.85rem', marginBottom: '14px', lineHeight: 1.7 }}>Get weekly Andhra recipes in your inbox.</p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input className="form-input" placeholder="Your email" style={{ borderRadius: '8px', fontSize: '0.85rem', padding: '10px 14px' }} />
                            <button className="btn btn-primary" style={{ padding: '10px 16px', borderRadius: '8px', whiteSpace: 'nowrap' }}>Join</button>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 0', textAlign: 'center', color: '#6b6560', fontSize: '0.82rem' }}>
                    © 2024 Andhra Ruchulu. Made with ❤️ celebrating authentic Andhra cuisine.
                </div>
            </div>
        </footer>
    );
}
