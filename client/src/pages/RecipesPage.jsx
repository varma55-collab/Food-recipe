import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import RecipeCard from '../components/RecipeCard';
import { getRecipes } from '../api/api';

const CATEGORIES = ['All', 'Breakfast', 'Rice Dishes', 'Curries', 'Dals', 'Biryanis', 'Seafood', 'Sweets', 'Chutneys', 'Pickles', 'Street Food', 'Non-Vegetarian', 'Vegetarian', 'Festival Special'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];
const SORTS = [{ label: 'Newest', val: '-createdAt' }, { label: 'Top Rated', val: '-rating' }, { label: 'Quick Cook', val: 'cookTime' }];

export default function RecipesPage() {
    const [searchParams] = useSearchParams();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState('All');
    const [difficulty, setDifficulty] = useState('All');
    const [sort, setSort] = useState('-createdAt');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const params = { page, limit: 9, sort };
            if (category !== 'All') {
                if (category === 'Vegetarian') {
                    params.vegetarian = 'true';
                } else if (category === 'Non-Vegetarian') {
                    params.vegetarian = 'false';
                } else {
                    params.category = category;
                }
            }
            if (difficulty !== 'All') params.difficulty = difficulty;
            if (search) params.search = search;
            const res = await getRecipes(params);
            setRecipes(res.data.recipes);
            setTotalPages(res.data.totalPages);
            setTotal(res.data.total);
        } catch { setRecipes([]); }
        finally { setLoading(false); }
    };

    useEffect(() => { setPage(1); }, [category, difficulty, sort, search]);
    useEffect(() => { fetchRecipes(); }, [category, difficulty, sort, search, page]);

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg,rgba(192,57,43,0.12),rgba(243,156,18,0.06))', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '48px 0 36px' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span style={{ fontSize: '0.8rem', letterSpacing: '3px', color: '#f39c12', textTransform: 'uppercase', fontFamily: 'Poppins,sans-serif' }}>Andhra Ruchulu</span>
                        <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', margin: '8px 0 12px' }}>All Recipes</h1>
                        <p style={{ color: '#a8a39c', fontSize: '1rem' }}>{total} authentic Andhra recipes — filtered and ready to cook.</p>
                    </motion.div>
                </div>
            </div>

            <div className="container" style={{ paddingTop: '36px', paddingBottom: '60px' }}>
                {/* Search + Sort */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
                        <FiSearch style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#a8a39c' }} />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search recipes..." className="form-input" style={{ paddingLeft: '44px', borderRadius: '50px' }} />
                        {search && <FiX onClick={() => setSearch('')} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: '#a8a39c', cursor: 'pointer' }} />}
                    </div>
                    <select value={sort} onChange={e => setSort(e.target.value)} className="form-input" style={{ width: 'auto', borderRadius: '50px', paddingLeft: '16px' }}>
                        {SORTS.map(s => <option key={s.val} value={s.val} style={{ background: '#1a1a1a' }}>{s.label}</option>)}
                    </select>
                </div>

                {/* Category Chips */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    {CATEGORIES.map(c => (
                        <motion.button key={c} whileTap={{ scale: 0.95 }} onClick={() => setCategory(c)}
                            style={{ padding: '8px 18px', borderRadius: '50px', fontSize: '0.82rem', fontFamily: 'Poppins,sans-serif', fontWeight: 500, cursor: 'pointer', transition: 'all 0.25s', background: category === c ? 'linear-gradient(135deg,#c0392b,#96281b)' : 'rgba(255,255,255,0.05)', color: category === c ? '#fff' : '#a8a39c', border: category === c ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
                            {c}
                        </motion.button>
                    ))}
                </div>

                {/* Difficulty */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '36px' }}>
                    {DIFFICULTIES.map(d => (
                        <button key={d} onClick={() => setDifficulty(d)}
                            style={{ padding: '6px 16px', borderRadius: '50px', fontSize: '0.8rem', fontFamily: 'Poppins,sans-serif', cursor: 'pointer', transition: 'all 0.25s', background: difficulty === d ? 'rgba(243,156,18,0.2)' : 'transparent', color: difficulty === d ? '#f39c12' : '#6b6560', border: `1px solid ${difficulty === d ? 'rgba(243,156,18,0.4)' : 'rgba(255,255,255,0.06)'}` }}>
                            {d}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="loader"><div className="spinner" /></div>
                ) : recipes.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: '#6b6560' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🍽️</div>
                        <p style={{ fontSize: '1.1rem' }}>No recipes found. Try a different search.</p>
                    </div>
                ) : (
                    <div className="recipes-grid">
                        {recipes.map((r, i) => <RecipeCard key={r._id} recipe={r} index={i} />)}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '48px' }}>
                        <button className="btn btn-secondary" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ opacity: page === 1 ? 0.4 : 1 }}>← Prev</button>
                        <span style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', color: '#a8a39c', fontFamily: 'Poppins,sans-serif', fontSize: '0.85rem' }}>
                            {page} / {totalPages}
                        </span>
                        <button className="btn btn-secondary" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ opacity: page === totalPages ? 0.4 : 1 }}>Next →</button>
                    </div>
                )}
            </div>
        </div>
    );
}
