import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import { GiIndianPalace } from 'react-icons/gi';
import { useAuth } from '../context/AuthContext';

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Recipes', path: '/recipes' },
    { label: 'About', path: '/about' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => setMenuOpen(false), [location]);

    const handleLogout = () => { logout(); navigate('/'); };

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                    padding: '14px 32px',
                    background: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    transition: 'all 0.4s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
            >
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <motion.div whileHover={{ rotate: 15 }} style={{ color: '#f39c12', fontSize: '1.8rem' }}>
                        <GiIndianPalace />
                    </motion.div>
                    <div>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', fontWeight: 700, background: 'linear-gradient(135deg,#f39c12,#c0392b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Andhra Ruchulu
                        </div>
                        <div style={{ fontSize: '0.6rem', color: '#a8a39c', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '-2px' }}>Authentic Flavors</div>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
                    {navLinks.map(l => (
                        <Link key={l.path} to={l.path} style={{ position: 'relative', fontSize: '0.9rem', fontWeight: 500, fontFamily: 'Poppins, sans-serif', color: location.pathname === l.path ? '#f39c12' : '#f0ede8', transition: 'color 0.3s' }}>
                            {l.label}
                            {location.pathname === l.path && (
                                <motion.div layoutId="nav-indicator" style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,#f39c12,#c0392b)', borderRadius: 2 }} />
                            )}
                        </Link>
                    ))}
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '0.85rem', color: '#a8a39c' }}>Hi, {user.name.split(' ')[0]}</span>
                            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                                <FiLogOut /> Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/auth" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                            <FiUser /> Sign In
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMenuOpen(!menuOpen)}
                    style={{ display: 'none', background: 'transparent', color: '#f0ede8', fontSize: '1.5rem' }}
                    className="mobile-menu-btn">
                    {menuOpen ? <FiX /> : <FiMenu />}
                </motion.button>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'fixed', top: '70px', left: 0, right: 0, zIndex: 999,
                            background: 'rgba(13,13,13,0.98)', backdropFilter: 'blur(20px)',
                            borderBottom: '1px solid rgba(255,255,255,0.08)',
                            padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '20px'
                        }}
                    >
                        {navLinks.map(l => (
                            <Link key={l.path} to={l.path} style={{ fontSize: '1.1rem', fontFamily: 'Poppins, sans-serif', color: location.pathname === l.path ? '#f39c12' : '#f0ede8' }}>
                                {l.label}
                            </Link>
                        ))}
                        {user ? (
                            <button onClick={handleLogout} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                                <FiLogOut /> Logout
                            </button>
                        ) : (
                            <Link to="/auth" className="btn btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>Sign In</Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </>
    );
}
