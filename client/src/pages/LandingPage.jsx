import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiSearch, FiArrowRight, FiClock, FiStar } from 'react-icons/fi';
import { GiChiliPepper, GiRiceCooker, GiFishingNet, GiCupcake } from 'react-icons/gi';
import RecipeCard from '../components/RecipeCard';
import { getRecipes } from '../api/api';

const CATEGORIES = [
    { name: 'Breakfast', icon: '🌅', color: '#f39c12', path: '/category/Breakfast' },
    { name: 'Rice Dishes', icon: '🍚', color: '#27ae60', path: '/category/Rice Dishes' },
    { name: 'Curries', icon: '🍛', color: '#c0392b', path: '/category/Curries' },
    { name: 'Biryanis', icon: '🍖', color: '#8e44ad', path: '/category/Biryanis' },
    { name: 'Seafood', icon: '🦐', color: '#2980b9', path: '/category/Seafood' },
    { name: 'Sweets', icon: '🍮', color: '#e91e8c', path: '/category/Sweets' },
    { name: 'Chutneys', icon: '🫙', color: '#16a085', path: '/category/Chutneys' },
    { name: 'Street Food', icon: '🌶️', color: '#d35400', path: '/category/Street Food' },
];

const FACTS = [
    '🌶️ Known for its bold spices & fiery flavors',
    '🍚 Over 165 traditional rice varieties',
    '🦐 Famous coastal seafood traditions',
    '🫙 World-renowned mango pickles',
    '🍛 Biryani capital of South India',
];

function HeroSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const [factIdx, setFactIdx] = useState(0);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    useEffect(() => {
        const t = setInterval(() => setFactIdx(i => (i + 1) % FACTS.length), 3000);
        return () => clearInterval(t);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) navigate(`/recipes?search=${encodeURIComponent(search)}`);
    };

    return (
        <section ref={ref} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            {/* Background */}
            <motion.div style={{ position: 'absolute', inset: 0, y }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600)`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'brightness(0.3) saturate(1.4)',
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(13,13,13,0.7) 0%, rgba(192,57,43,0.15) 50%, rgba(13,13,13,0.8) 100%)' }} />
            </motion.div>

            {/* Floating orbs */}
            <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }}
                style={{ position: 'absolute', top: '15%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,57,43,0.2), transparent)', pointerEvents: 'none' }} />
            <motion.div animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 6, repeat: Infinity }}
                style={{ position: 'absolute', bottom: '20%', left: '5%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(243,156,18,0.15), transparent)', pointerEvents: 'none' }} />

            <motion.div style={{ opacity }} className="container" style2={{ position: 'relative', zIndex: 2 }}>
                <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '100px', paddingBottom: '80px' }}>
                    {/* Tag */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(192,57,43,0.2)', border: '1px solid rgba(192,57,43,0.4)', borderRadius: '50px', padding: '6px 18px', marginBottom: '24px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e74c3c', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'Poppins,sans-serif' }}>
                            🍛 Authentic Andhra Cuisine
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2.8rem,7vw,6rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '24px', maxWidth: 780 }}>
                        The Soul of{' '}
                        <span className="gradient-text">Andhra Pradesh</span>
                        {' '}on Your Plate
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                        style={{ fontSize: '1.15rem', color: '#c0bab4', maxWidth: 560, lineHeight: 1.8, marginBottom: '36px' }}>
                        Explore 165+ authentic recipes — from fiery Gongura Mutton to delicate Bobbatlu — with real-world step-by-step cooking guides.
                    </motion.p>

                    {/* Rotating facts */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                        style={{ marginBottom: '36px', height: '24px', overflow: 'hidden' }}>
                        <motion.p key={factIdx} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                            style={{ color: '#f39c12', fontSize: '0.9rem', fontFamily: 'Poppins,sans-serif' }}>
                            {FACTS[factIdx]}
                        </motion.p>
                    </motion.div>

                    {/* Search */}
                    <motion.form onSubmit={handleSearch} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                        style={{ display: 'flex', gap: '12px', maxWidth: 560, marginBottom: '40px' }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <FiSearch style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#a8a39c', fontSize: '1.1rem' }} />
                            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Pesarattu, Biryani, Gongura..."
                                style={{ width: '100%', padding: '16px 16px 16px 46px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: '50px', color: '#f0ede8', fontSize: '0.95rem', fontFamily: 'Inter,sans-serif' }} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ padding: '16px 28px', borderRadius: '50px' }}>
                            Search
                        </button>
                    </motion.form>

                    {/* CTAs */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <Link to="/recipes" className="btn btn-primary" style={{ fontSize: '1rem', padding: '15px 32px' }}>
                            Explore Recipes <FiArrowRight />
                        </Link>
                        <Link to="/about" className="btn btn-secondary" style={{ fontSize: '1rem', padding: '15px 32px' }}>
                            Our Story
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                        style={{ display: 'flex', gap: '40px', marginTop: '56px', flexWrap: 'wrap' }}>
                        {[['165+', 'Recipes'], ['14', 'Categories'], ['4.8★', 'Avg Rating'], ['100%', 'Authentic']].map(([val, lab]) => (
                            <div key={lab}>
                                <div style={{ fontFamily: 'Playfair Display,serif', fontSize: '2rem', fontWeight: 700, color: '#f39c12' }}>{val}</div>
                                <div style={{ fontSize: '0.8rem', color: '#a8a39c', fontFamily: 'Poppins,sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>{lab}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
                style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', color: '#a8a39c', fontSize: '0.75rem', fontFamily: 'Poppins,sans-serif', letterSpacing: '2px' }}>
                <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom,transparent,rgba(243,156,18,0.6))', margin: '0 auto 8px' }} />
                SCROLL
            </motion.div>
        </section>
    );
}

function CategoriesSection() {
    return (
        <section className="section" style={{ background: 'rgba(26,26,26,0.4)' }}>
            <div className="container">
                <div className="section-heading">
                    <span className="label">Browse By Category</span>
                    <h2>What Are You Craving?</h2>
                    <p>From crispy morning pesarattu to rich biryanis — explore every corner of Andhra cuisine.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: '20px' }}>
                    {CATEGORIES.map((cat, i) => (
                        <motion.div key={cat.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                            <Link to={cat.path}>
                                <motion.div whileHover={{ y: -6, scale: 1.03 }}
                                    style={{ background: 'rgba(26,26,26,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '28px 16px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color + '66'; e.currentTarget.style.boxShadow = `0 8px 30px ${cat.color}22`; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                    <div style={{ fontSize: '2.4rem', marginBottom: '10px' }}>{cat.icon}</div>
                                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f0ede8', fontFamily: 'Poppins,sans-serif' }}>{cat.name}</div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeaturedSection({ recipes, loading }) {
    return (
        <section className="section">
            <div className="container">
                <div className="section-heading">
                    <span className="label">Chef's Picks</span>
                    <h2>Featured Recipes</h2>
                    <p>Hand-picked authentic Andhra dishes that tell the story of this remarkable cuisine.</p>
                </div>
                {loading ? (
                    <div className="loader"><div className="spinner" /></div>
                ) : (
                    <div className="recipes-grid">
                        {recipes.map((r, i) => <RecipeCard key={r._id} recipe={r} index={i} />)}
                    </div>
                )}
                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                    <Link to="/recipes" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
                        View All Recipes <FiArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}

function WhyAndhraSection() {
    const features = [
        { icon: '🌶️', title: 'Bold & Fiery', desc: 'Andhra cuisine is celebrated across India for its fearless use of red chillies and spices.' },
        { icon: '🌿', title: 'Farm to Table', desc: 'Recipes rooted in seasonal local produce — gongura, raw mangoes, drumstick, and more.' },
        { icon: '👨‍🍳', title: 'Real Process', desc: 'Every recipe includes authentic step-by-step real-world cooking techniques passed through generations.' },
        { icon: '🫙', title: 'Preserved Traditions', desc: 'Legendary pickles, chutneys and sun-dried preparations that have survived centuries.' },
    ];
    return (
        <section className="section" style={{ background: 'linear-gradient(135deg,rgba(192,57,43,0.06),rgba(243,156,18,0.04))' }}>
            <div className="container">
                <div className="section-heading">
                    <span className="label">Why Andhra</span>
                    <h2>More Than Just Food</h2>
                    <p>A cuisine that carries the spirit of a land, its people, and centuries of culinary wisdom.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '28px' }}>
                    {features.map((f, i) => (
                        <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card" style={{ padding: '36px 28px', textAlign: 'center' }}>
                            <div style={{ fontSize: '2.8rem', marginBottom: '16px' }}>{f.icon}</div>
                            <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.25rem', marginBottom: '12px', color: '#f0ede8' }}>{f.title}</h3>
                            <p style={{ color: '#a8a39c', fontSize: '0.9rem', lineHeight: 1.7 }}>{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function MarqueeSection() {
    const items = ['Pesarattu', 'Gongura Mutton', 'Pulihora', 'Mirchi Bajji', 'Avakaya', 'Chicken Biryani', 'Bobbatlu', 'Gutti Vankaya', 'Pappu Charu', 'Royyala Iguru', 'Kodi Kura', 'Coconut Chutney'];
    const doubled = [...items, ...items];
    return (
        <div style={{ overflow: 'hidden', padding: '20px 0', background: 'rgba(192,57,43,0.08)', borderTop: '1px solid rgba(192,57,43,0.15)', borderBottom: '1px solid rgba(192,57,43,0.15)' }}>
            <motion.div animate={{ x: '0%' }} style={{ display: 'flex', gap: '0', width: 'max-content' }}>
                <div style={{ display: 'flex', gap: '0', animation: 'marquee 25s linear infinite' }}>
                    {doubled.map((item, i) => (
                        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', padding: '0 24px', color: '#f39c12', fontFamily: 'Poppins,sans-serif', fontWeight: 500, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                            {item} <span style={{ color: 'rgba(192,57,43,0.5)' }}>✦</span>
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default function LandingPage() {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRecipes({ featured: true, limit: 6 })
            .then(r => setFeatured(r.data.recipes))
            .catch(() => setFeatured([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <HeroSection />
            <MarqueeSection />
            <CategoriesSection />
            <FeaturedSection recipes={featured} loading={loading} />
            <WhyAndhraSection />
        </div>
    );
}
