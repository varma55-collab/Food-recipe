import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { GiIndianPalace } from 'react-icons/gi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AuthPage() {
    const [mode, setMode] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (mode === 'login') {
                const res = await login(form.email, form.password);
                toast.success(res.message || 'Welcome back!');
            } else {
                const res = await register(form.name, form.email, form.password);
                toast.success(res.message || 'Welcome to Andhra Ruchulu!');
            }
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally { setLoading(false); }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Background */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.2) saturate(1.5)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(192,57,43,0.3),rgba(13,13,13,0.9))' }} />

            {/* Floating orbs */}
            <motion.div animate={{ y: [0, -30, 0], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 5, repeat: Infinity }}
                style={{ position: 'absolute', top: '20%', left: '10%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(192,57,43,0.3),transparent)', pointerEvents: 'none' }} />
            <motion.div animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 7, repeat: Infinity }}
                style={{ position: 'absolute', bottom: '15%', right: '8%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(243,156,18,0.2),transparent)', pointerEvents: 'none' }} />

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 460, padding: '0 24px' }}>

                <div className="glass-card" style={{ padding: '44px 40px' }}>
                    {/* Logo */}
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                            style={{ display: 'inline-block', fontSize: '3rem', color: '#f39c12', marginBottom: '10px' }}>
                            <GiIndianPalace />
                        </motion.div>
                        <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.8rem', marginBottom: '4px' }}>
                            <span className="gradient-text">Andhra Ruchulu</span>
                        </h1>
                        <p style={{ color: '#a8a39c', fontSize: '0.85rem' }}>Authentic flavors, real recipes</p>
                    </div>

                    {/* Mode Toggle */}
                    <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: '50px', padding: '4px', marginBottom: '28px' }}>
                        {['login', 'register'].map(m => (
                            <button key={m} onClick={() => setMode(m)}
                                style={{ flex: 1, padding: '10px', borderRadius: '50px', fontFamily: 'Poppins,sans-serif', fontWeight: 500, fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.3s', background: mode === m ? 'linear-gradient(135deg,#c0392b,#96281b)' : 'transparent', color: mode === m ? '#fff' : '#6b6560', border: 'none' }}>
                                {m === 'login' ? 'Sign In' : 'Register'}
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <AnimatePresence>
                            {mode === 'register' && (
                                <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                    <div style={{ position: 'relative' }}>
                                        <FiUser style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#a8a39c' }} />
                                        <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                            placeholder="Your full name" className="form-input" style={{ paddingLeft: '44px' }} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div style={{ position: 'relative' }}>
                            <FiMail style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#a8a39c' }} />
                            <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                placeholder="Email address" className="form-input" style={{ paddingLeft: '44px' }} />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <FiLock style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#a8a39c' }} />
                            <input required type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                                placeholder="Password" className="form-input" style={{ paddingLeft: '44px', paddingRight: '44px' }} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'transparent', color: '#a8a39c', border: 'none', cursor: 'pointer' }}>
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                            className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '1rem', marginTop: '6px', opacity: loading ? 0.7 : 1 }}>
                            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                        </motion.button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.83rem', color: '#6b6560' }}>
                        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ background: 'transparent', border: 'none', color: '#f39c12', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: 600 }}>
                            {mode === 'login' ? 'Register' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
