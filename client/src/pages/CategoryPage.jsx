import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import RecipeCard from '../components/RecipeCard';
import { getCategoryRecipes } from '../api/api';

const CAT_BANNERS = {
    'Breakfast': { emoji: '🌅', color: '#f39c12', desc: 'Start your day the Andhra way — crispy pesarattu, fluffy idlis and more.' },
    'Rice Dishes': { emoji: '🍚', color: '#27ae60', desc: 'The rice heartland — pulihora, curd rice, bisi bele bath and beyond.' },
    'Curries': { emoji: '🍛', color: '#c0392b', desc: 'Bold, fiery Andhra curries that command attention on any table.' },
    'Biryanis': { emoji: '🍖', color: '#8e44ad', desc: 'Andhra biryani – where spice meets fragrant basmati in perfect harmony.' },
    'Seafood': { emoji: '🦐', color: '#2980b9', desc: 'Fresh from the Andhra coast — prawns, fish and more cooked to perfection.' },
    'Sweets': { emoji: '🍮', color: '#e91e8c', desc: 'Festival sweets and traditional desserts — bobbatlu, payasam and more.' },
    'Chutneys': { emoji: '🫙', color: '#16a085', desc: 'Vibrant chutneys and condiments that complete every Andhra meal.' },
    'Pickles': { emoji: '🫙', color: '#d35400', desc: 'World-famous Andhra pickles — avakaya and more, preserved with tradition.' },
    'Dals': { emoji: '🍲', color: '#2ecc71', desc: 'Nourishing dals and lentil dishes — the everyday backbone of Andhra meals.' },
    'Street Food': { emoji: '🌶️', color: '#e74c3c', desc: 'Andhra street food – bold, spicy and utterly irresistible.' },
    'Non-Vegetarian': { emoji: '🍗', color: '#c0392b', desc: 'Legendary non-veg Andhra dishes for the bold and adventurous.' },
    'Vegetarian': { emoji: '🌿', color: '#27ae60', desc: 'Wholesome and flavorful vegetarian Andhra cooking at its finest.' },
    'Festival Special': { emoji: '🎊', color: '#f39c12', desc: 'Sacred and celebratory recipes made during Ugadi, Sankranti, and more.' },
};

export default function CategoryPage() {
    const { cat } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const info = CAT_BANNERS[cat] || { emoji: '🍽️', color: '#f39c12', desc: 'Explore authentic Andhra recipes in this category.' };

    useEffect(() => {
        setLoading(true);
        getCategoryRecipes(cat)
            .then(r => setRecipes(r.data.recipes))
            .catch(() => setRecipes([]))
            .finally(() => setLoading(false));
    }, [cat]);

    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Banner */}
            <div style={{ background: `linear-gradient(135deg,${info.color}18,${info.color}08)`, borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '60px 0 48px', position: 'relative', overflow: 'hidden' }}>
                <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 6, repeat: Infinity }}
                    style={{ position: 'absolute', top: '-50%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${info.color}30,transparent)`, pointerEvents: 'none' }} />
                <div className="container">
                    <Link to="/recipes" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#a8a39c', fontSize: '0.85rem', marginBottom: '20px', fontFamily: 'Poppins,sans-serif' }}>
                        <FiArrowLeft /> All Recipes
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>{info.emoji}</div>
                        <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', marginBottom: '12px' }}>{cat}</h1>
                        <p style={{ color: '#a8a39c', fontSize: '1.05rem', maxWidth: 560 }}>{info.desc}</p>
                        {!loading && <p style={{ color: info.color, fontFamily: 'Poppins,sans-serif', fontSize: '0.85rem', marginTop: '12px', fontWeight: 600 }}>{recipes.length} recipes found</p>}
                    </motion.div>
                </div>
            </div>

            {/* Recipes */}
            <div className="container" style={{ paddingTop: '44px', paddingBottom: '80px' }}>
                {loading ? (
                    <div className="loader"><div className="spinner" /></div>
                ) : recipes.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: '#6b6560' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🍽️</div>
                        <p style={{ fontSize: '1.1rem' }}>No recipes in this category yet. Check back soon!</p>
                        <Link to="/recipes" className="btn btn-primary" style={{ display: 'inline-flex', marginTop: 24 }}>Browse All Recipes</Link>
                    </div>
                ) : (
                    <div className="recipes-grid">
                        {recipes.map((r, i) => <RecipeCard key={r._id} recipe={r} index={i} />)}
                    </div>
                )}
            </div>
        </div>
    );
}
