import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiUsers, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { GiChiliPepper, GiFireBowl, GiMeat, GiCrab, GiSpoon } from 'react-icons/gi';
import { FaBowlRice, FaFish, FaShrimp, FaEgg, FaDrumstickBite, FaBowlFood } from 'react-icons/fa6';
import RecipeCard from '../components/RecipeCard';
import { getRecipe, getRecipes } from '../api/api';
import toast from 'react-hot-toast';

const spiceColors = { 'Mild': '#27ae60', 'Medium': '#f39c12', 'Spicy': '#e67e22', 'Very Spicy': '#c0392b' };

export default function RecipeDetailPage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('ingredients');
    const [checkedIngredients, setCheckedIngredients] = useState([]);
    const [checkedSteps, setCheckedSteps] = useState([]);

    useEffect(() => {
        setLoading(true);
        setCheckedIngredients([]);
        setCheckedSteps([]);
        setActiveTab('ingredients');
        getRecipe(id)
            .then(r => {
                setRecipe(r.data.recipe);
                return getRecipes({ category: r.data.recipe.category, limit: 3 });
            })
            .then(r => setRelated(r.data.recipes.filter(r => r._id !== id)))
            .catch(() => toast.error('Recipe not found'))
            .finally(() => setLoading(false));
    }, [id]);

    const toggleIngredient = (i) => setCheckedIngredients(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
    const toggleStep = (i) => setCheckedSteps(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

    if (loading) return <div style={{ paddingTop: '100px' }} className="loader"><div className="spinner" /></div>;
    if (!recipe) return <div style={{ paddingTop: '120px', textAlign: 'center' }}><p>Recipe not found.</p><Link to="/recipes" className="btn btn-primary" style={{ marginTop: 20 }}>Back to Recipes</Link></div>;

    const totalTime = (recipe.prepTime || 0) + recipe.cookTime;

    // ── Hoist accent/typeColor/icon to component scope so all sections can use them ──
    const CAT_COLOR = { 'Breakfast': '#f39c12', 'Rice Dishes': '#27ae60', 'Curries': '#c0392b', 'Dals': '#d35400', 'Biryanis': '#8e44ad', 'Seafood': '#2980b9', 'Sweets': '#e91e8c', 'Chutneys': '#16a085', 'Pickles': '#e67e22', 'Street Food': '#e74c3c', 'Non-Vegetarian': '#c0392b', 'Vegetarian': '#27ae60', 'Festival Special': '#f1c40f' };
    const accent = CAT_COLOR[recipe.category] || '#c0392b';
    const typeColor = recipe.isVegetarian ? '#27ae60' : '#c0392b';

    let IconComponent = GiSpoon;
    {
        const nameFallback = ((recipe.name || '') + ' ' + (recipe.nameTelugu || '')).toLowerCase();
        if (!recipe.isVegetarian) {
            if (nameFallback.includes('chicken') || nameFallback.includes('kodi')) IconComponent = FaDrumstickBite;
            else if (nameFallback.includes('mutton') || nameFallback.includes('meat')) IconComponent = GiMeat;
            else if (nameFallback.includes('fish') || nameFallback.includes('chepa') || nameFallback.includes('chepalu')) IconComponent = FaFish;
            else if (nameFallback.includes('prawn') || nameFallback.includes('royyalu')) IconComponent = FaShrimp;
            else if (nameFallback.includes('crab') || nameFallback.includes('peetha') || nameFallback.includes('peethalu')) IconComponent = GiCrab;
            else if (nameFallback.includes('egg') || nameFallback.includes('guddu')) IconComponent = FaEgg;
            else IconComponent = GiMeat;
        } else {
            if (recipe.category === 'Rice Dishes' || recipe.category === 'Biryanis') IconComponent = FaBowlRice;
            else if (recipe.category === 'Breakfast') IconComponent = FaBowlFood;
            else IconComponent = GiSpoon;
        }
    }

    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Hero — Gradient Overlay & Cuisine Icon */}
            {(() => {

                // accent, typeColor, IconComponent are now from component scope
                return (
                    <div style={{ position: 'relative', height: '58vh', overflow: 'hidden' }}>
                        {/* Accent top bar */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${accent},${accent}44,transparent)`, zIndex: 5 }} />

                        {/* Gradient Background & Cuisine Icon */}
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${typeColor}15 0%, ${accent}33 100%)` }}>
                            <IconComponent size={250} color={`${typeColor}dd`} style={{ filter: `drop-shadow(0 0 60px ${typeColor}66)`, opacity: 0.8 }} />
                        </div>
                        {/* Cinematic gradient */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.55) 45%, rgba(0,0,0,0.1) 100%)' }} />
                        {/* Text overlay */}
                        <div className="container" style={{ position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
                            <Link to="/recipes" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.6)', fontSize: '0.84rem', marginBottom: '18px', fontFamily: 'Poppins,sans-serif', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                                <FiArrowLeft size={14} /> All Recipes
                            </Link>
                            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                                    <span style={{ padding: '5px 14px', borderRadius: '50px', background: `${accent}33`, backdropFilter: 'blur(10px)', color: accent, fontSize: '0.75rem', fontFamily: 'Poppins,sans-serif', fontWeight: 600, border: `1px solid ${accent}55`, letterSpacing: '0.5px' }}>
                                        {recipe.category}
                                    </span>
                                    {recipe.isVegetarian
                                        ? <span className="badge badge-veg">🌿 Vegetarian</span>
                                        : <span className="badge badge-nonveg">🍖 Non-Veg</span>}
                                </div>
                                <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 900, marginBottom: '8px', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                                    {recipe.name}
                                </h1>
                                {recipe.nameTelugu && <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif', marginBottom: '10px' }}>{recipe.nameTelugu}</p>}
                                <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 580, lineHeight: 1.75, fontSize: '0.95rem' }}>{recipe.description}</p>
                            </motion.div>
                        </div>
                    </div>
                );
            })()}
            {/* Meta Bar */}
            <div style={{
                background: 'rgba(20,20,20,0.85)', borderBottom: '1px solid rgba(255,255,255,0.08)', borderTop: '1px solid rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)', padding: '24px 0', position: 'sticky', top: '70px', zIndex: 50,
                boxShadow: '0 4px 30px rgba(0,0,0,0.4)'
            }}>
                <div className="container" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {[
                        { icon: <FiClock size={16} />, label: `Prep: ${recipe.prepTime || 15}m` },
                        { icon: <FiClock size={16} style={{ color: '#e74c3c' }} />, label: `Cook: ${recipe.cookTime}m` },
                        { icon: <FiClock size={16} style={{ color: '#f39c12' }} />, label: `Total: ${totalTime}m` },
                        { icon: <FiUsers size={16} />, label: `Serves ${recipe.servings}` },
                    ].map(item => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c0bab4', fontSize: '0.9rem', fontFamily: 'Poppins,sans-serif', fontWeight: 500 }}>
                            <span style={{ color: '#f39c12' }}>{item.icon}</span> {item.label}
                        </div>
                    ))}
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '8px 16px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <GiChiliPepper size={16} style={{ color: spiceColors[recipe.spiceLevel] }} />
                        <span style={{ color: spiceColors[recipe.spiceLevel], fontFamily: 'Poppins,sans-serif', fontSize: '0.9rem', fontWeight: 600 }}>{recipe.spiceLevel}</span>
                        <span style={{ color: 'rgba(255,255,255,0.1)', margin: '0 4px' }}>|</span>
                        <span style={{ color: '#f1c40f', fontSize: '0.95rem', fontWeight: 600 }}>★ {recipe.rating?.toFixed(1)}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container" style={{ paddingTop: '48px', paddingBottom: '90px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '48px', alignItems: 'start' }}>
                    {/* Left: Tabs & Content */}
                    <div>
                        {/* Tab Nav */}
                        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '6px', marginBottom: '36px', width: 'fit-content', border: '1px solid rgba(255,255,255,0.05)' }}>
                            {['ingredients', 'steps'].map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)}
                                    style={{
                                        padding: '12px 32px', borderRadius: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        background: activeTab === tab ? `linear-gradient(135deg, ${accent}, ${accent}dd)` : 'transparent',
                                        color: activeTab === tab ? '#fff' : '#a8a39c',
                                        border: 'none',
                                        boxShadow: activeTab === tab ? `0 4px 15px ${accent}40` : 'none'
                                    }}>
                                    {tab === 'ingredients' ? '🛒 Ingredients' : '👨‍🍳 Instructions'}
                                </button>
                            ))}
                        </div>

                        {/* Ingredients — Real-World Shopping List */}
                        {activeTab === 'ingredients' && (
                            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                                {/* Header + Progress */}
                                <div style={{ marginBottom: '28px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6px' }}>
                                        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.8rem', margin: 0 }}>Real-World Ingredients</h2>
                                        <p style={{ color: '#8b8580', fontSize: '0.82rem', fontFamily: 'Poppins,sans-serif', margin: 0 }}>
                                            Tap to check off
                                        </p>
                                    </div>
                                    <p style={{ color: '#6b6560', fontSize: '0.85rem', fontFamily: 'Inter,sans-serif', margin: '4px 0 16px' }}>
                                        {Array.isArray(recipe.ingredients) ? recipe.ingredients.length : 0} items needed for this dish • check off as you gather
                                    </p>

                                    {/* Progress */}
                                    {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (() => {
                                        const pct = Math.round((checkedIngredients.length / recipe.ingredients.length) * 100);
                                        return (
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                                    <span style={{ fontSize: '0.78rem', color: '#8b8580', fontFamily: 'Poppins,sans-serif' }}>
                                                        {checkedIngredients.length} of {recipe.ingredients.length} gathered
                                                    </span>
                                                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: pct === 100 ? '#27ae60' : accent, fontFamily: 'Poppins,sans-serif' }}>
                                                        {pct}%
                                                    </span>
                                                </div>
                                                <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 50, overflow: 'hidden' }}>
                                                    <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.4, ease: 'easeOut' }}
                                                        style={{ height: '100%', background: pct === 100 ? 'linear-gradient(90deg,#27ae60,#2ecc71)' : `linear-gradient(90deg,${accent},${accent}aa)`, borderRadius: 50 }} />
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '10px' }}>
                                    {Array.isArray(recipe.ingredients) && recipe.ingredients.map((ing, i) => {
                                        const isChecked = checkedIngredients.includes(i);
                                        const ingName = (ing?.name || (typeof ing === 'string' ? ing : 'Ingredient')).toLowerCase();

                                        // Auto-detect ingredient type emoji
                                        let emoji = '🧂';
                                        if (/rice|basmati|sona|rava|semolina|maida|flour|besan|poha/i.test(ingName)) emoji = '🌾';
                                        else if (/chicken|mutton|meat|lamb|kodi|mamsam/i.test(ingName)) emoji = '🍖';
                                        else if (/fish|prawn|shrimp|crab|royyala|chepa|seafood/i.test(ingName)) emoji = '🦐';
                                        else if (/egg|guddu/i.test(ingName)) emoji = '🥚';
                                        else if (/milk|cream|yogurt|curd|butter|ghee|paneer|cheese/i.test(ingName)) emoji = '🥛';
                                        else if (/onion|tomato|carrot|potato|beans|peas|cauliflower|brinjal|eggplant|vankaya|gongura|drumstick|vegetable/i.test(ingName)) emoji = '🥬';
                                        else if (/coconut|kobbari/i.test(ingName)) emoji = '🥥';
                                        else if (/lemon|lime|nimma|tamarind|mango/i.test(ingName)) emoji = '🍋';
                                        else if (/chilli|mirchi|pepper|chili/i.test(ingName)) emoji = '🌶️';
                                        else if (/ginger|garlic|allam|vellulli/i.test(ingName)) emoji = '🧄';
                                        else if (/cumin|mustard|coriander|turmeric|masala|cardamom|cinnamon|cloves|fenugreek|asafoetida|spice|saffron|bay|star anise|nutmeg|ajwain/i.test(ingName)) emoji = '✨';
                                        else if (/dal|lentil|moong|toor|chana|urad|pappu|peanut|cashew|almond|sesame|nut/i.test(ingName)) emoji = '🫘';
                                        else if (/jaggery|sugar|honey|bellam/i.test(ingName)) emoji = '🍯';
                                        else if (/oil|nune/i.test(ingName)) emoji = '🫗';
                                        else if (/water/i.test(ingName)) emoji = '💧';
                                        else if (/salt/i.test(ingName)) emoji = '🧂';
                                        else if (/mint|pudina|coriander leaves|curry leaves|leaf/i.test(ingName)) emoji = '🌿';
                                        else if (/raisin|dry fruit|kismis/i.test(ingName)) emoji = '🍇';

                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -12 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.03, duration: 0.3 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => toggleIngredient(i)}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '14px',
                                                    padding: '14px 18px', borderRadius: '16px', cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    background: isChecked ? 'rgba(39,174,96,0.08)' : 'rgba(18,18,18,0.9)',
                                                    border: `1px solid ${isChecked ? '#27ae6044' : 'rgba(255,255,255,0.05)'}`,
                                                    boxShadow: isChecked ? 'none' : '0 4px 16px rgba(0,0,0,0.2)',
                                                    opacity: isChecked ? 0.7 : 1,
                                                }}
                                            >
                                                {/* Checkbox */}
                                                <div style={{
                                                    width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                                                    border: `2px solid ${isChecked ? '#27ae60' : accent}`,
                                                    background: isChecked ? '#27ae60' : `${accent}15`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    transition: 'all 0.25s',
                                                    boxShadow: isChecked ? '0 0 10px #27ae6044' : 'none'
                                                }}>
                                                    {isChecked && <FiCheck size={14} color="white" strokeWidth={3} />}
                                                </div>

                                                {/* Emoji */}
                                                <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{emoji}</span>

                                                {/* Name */}
                                                <span style={{
                                                    flex: 1, fontFamily: 'Inter,sans-serif', fontSize: '0.95rem',
                                                    color: isChecked ? '#666' : '#e8e4de',
                                                    textDecoration: isChecked ? 'line-through' : 'none',
                                                    textDecorationColor: '#555',
                                                    transition: 'all 0.2s'
                                                }}>
                                                    {ing?.name || (typeof ing === 'string' ? ing : 'Ingredient')}
                                                </span>

                                                {/* Quantity Badge */}
                                                {ing?.quantity && (
                                                    <span style={{
                                                        fontFamily: 'Poppins,sans-serif', fontSize: '0.78rem', fontWeight: 600,
                                                        color: isChecked ? '#555' : accent,
                                                        background: isChecked ? 'transparent' : `${accent}12`,
                                                        padding: '4px 12px', borderRadius: 50,
                                                        border: `1px solid ${isChecked ? 'transparent' : `${accent}30`}`,
                                                        whiteSpace: 'nowrap', transition: 'all 0.2s'
                                                    }}>
                                                        {ing.quantity}{ing.unit ? ` ${ing.unit}` : ''}
                                                    </span>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* All gathered celebration */}
                                {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 &&
                                    checkedIngredients.length === recipe.ingredients.length && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, type: 'spring' }}
                                            style={{
                                                marginTop: 24, textAlign: 'center', padding: '28px 24px',
                                                borderRadius: 20,
                                                background: 'linear-gradient(135deg, rgba(39,174,96,0.12), rgba(46,204,113,0.06))',
                                                border: '1px solid rgba(39,174,96,0.3)',
                                            }}
                                        >
                                            <div style={{ fontSize: '2rem', marginBottom: 8 }}>✅</div>
                                            <h3 style={{ fontFamily: 'Playfair Display,serif', color: '#27ae60', fontSize: '1.3rem', marginBottom: 4 }}>
                                                All Ingredients Gathered!
                                            </h3>
                                            <p style={{ color: '#8b8580', fontSize: '0.88rem', fontFamily: 'Inter,sans-serif' }}>
                                                You're ready to start cooking. Switch to the Instructions tab!
                                            </p>
                                        </motion.div>
                                    )}
                            </motion.div>
                        )}

                        {/* Steps — Real World Cooking Process */}
                        {activeTab === 'steps' && (
                            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

                                {/* Header + Progress */}
                                <div style={{ marginBottom: '32px' }}>
                                    <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.8rem', marginBottom: '6px' }}>
                                        Real-World Making Process
                                    </h2>
                                    <p style={{ color: '#8b8580', fontSize: '0.88rem', fontFamily: 'Poppins,sans-serif', marginBottom: '20px' }}>
                                        Follow each step carefully — click a step to mark it done
                                    </p>

                                    {/* Progress Bar */}
                                    {recipe.steps?.length > 0 && (() => {
                                        const pct = Math.round((checkedSteps.length / recipe.steps.length) * 100);
                                        return (
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                    <span style={{ fontSize: '0.8rem', color: '#8b8580', fontFamily: 'Poppins,sans-serif' }}>
                                                        {checkedSteps.length} of {recipe.steps.length} steps done
                                                    </span>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: pct === 100 ? '#27ae60' : accent, fontFamily: 'Poppins,sans-serif' }}>
                                                        {pct}%
                                                    </span>
                                                </div>
                                                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 50, overflow: 'hidden' }}>
                                                    <motion.div
                                                        animate={{ width: `${pct}%` }}
                                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                                        style={{
                                                            height: '100%',
                                                            background: pct === 100
                                                                ? 'linear-gradient(90deg, #27ae60, #2ecc71)'
                                                                : `linear-gradient(90deg, ${accent}, ${accent}aa)`,
                                                            borderRadius: 50,
                                                            boxShadow: `0 0 12px ${accent}66`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>

                                {/* Steps List */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                                    {/* Vertical connecting line */}
                                    <div style={{ position: 'absolute', left: 27, top: 54, bottom: 54, width: 2, background: `linear-gradient(to bottom, ${accent}44, transparent)`, zIndex: 0 }} />

                                    {recipe.steps?.map((step, i) => {
                                        const done = checkedSteps.includes(i);
                                        const totalSteps = recipe.steps.length;
                                        // Determine phase label
                                        const phase = i === 0 ? '🔪 Prep'
                                            : i === totalSteps - 1 ? '🍽️ Finish'
                                                : i < Math.ceil(totalSteps / 3) ? '🌡️ Initial Cook'
                                                    : i < Math.ceil((totalSteps * 2) / 3) ? '🔥 Main Cook'
                                                        : '✨ Final Touch';

                                        // Extract cooking keywords from description
                                        const keywords = [];
                                        const desc = (step.description || '').toLowerCase();
                                        if (desc.includes('fry') || desc.includes('sauté')) keywords.push('Frying');
                                        if (desc.includes('boil') || desc.includes('simmer')) keywords.push('Boiling');
                                        if (desc.includes('grind') || desc.includes('blend') || desc.includes('paste')) keywords.push('Grinding');
                                        if (desc.includes('roast') || desc.includes('toast')) keywords.push('Roasting');
                                        if (desc.includes('marinate') || desc.includes('soak')) keywords.push('Marinating');
                                        if (desc.includes('temper') || desc.includes('mustard') || desc.includes('tadka')) keywords.push('Tempering');
                                        if (desc.includes('mix') || desc.includes('combine') || desc.includes('stir')) keywords.push('Mixing');
                                        if (desc.includes('steam') || desc.includes('pressure')) keywords.push('Steaming');
                                        if (desc.includes('rest') || desc.includes('ferment')) keywords.push('Resting');

                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -16 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, margin: '-40px' }}
                                                transition={{ delay: i * 0.06, duration: 0.4 }}
                                                style={{ position: 'relative', zIndex: 1 }}
                                            >
                                                {/* Phase label badge */}
                                                <div style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: 6,
                                                    marginLeft: 68, marginBottom: 8,
                                                    fontSize: '0.68rem', fontFamily: 'Poppins,sans-serif', fontWeight: 700,
                                                    color: done ? '#555' : accent, letterSpacing: '0.8px', textTransform: 'uppercase',
                                                    opacity: done ? 0.5 : 1
                                                }}>
                                                    {phase}
                                                </div>

                                                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                                    {/* Step Number / Done Button */}
                                                    <motion.button
                                                        whileTap={{ scale: 0.88 }}
                                                        onClick={() => toggleStep(i)}
                                                        style={{
                                                            width: 54, height: 54, borderRadius: '50%', flexShrink: 0,
                                                            border: `2.5px solid ${done ? '#27ae60' : accent}`,
                                                            background: done
                                                                ? 'linear-gradient(135deg, #1a4028, #27ae60aa)'
                                                                : `linear-gradient(135deg, #1a1a1a, ${accent}22)`,
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            cursor: 'pointer', transition: 'all 0.35s',
                                                            boxShadow: done ? `0 0 24px #27ae6055` : `0 0 16px ${accent}33`
                                                        }}
                                                    >
                                                        {done
                                                            ? <FiCheck color="#27ae60" size={22} strokeWidth={3} />
                                                            : <span style={{ fontFamily: 'Playfair Display,serif', fontWeight: 900, color: accent, fontSize: '1.2rem' }}>{step.step || i + 1}</span>
                                                        }
                                                    </motion.button>

                                                    {/* Step Card */}
                                                    <div style={{
                                                        flex: 1,
                                                        background: done ? 'rgba(10,26,10,0.6)' : 'rgba(18,18,18,0.95)',
                                                        border: `1px solid ${done ? '#27ae6033' : `${accent}22`}`,
                                                        borderRadius: 20,
                                                        padding: '22px 26px',
                                                        boxShadow: done ? 'none' : `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`,
                                                        transition: 'all 0.35s ease',
                                                        opacity: done ? 0.65 : 1,
                                                        position: 'relative', overflow: 'hidden'
                                                    }}>
                                                        {/* subtle glow top bar */}
                                                        {!done && <div style={{
                                                            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                                                            background: `linear-gradient(90deg, ${accent}, transparent)`,
                                                            borderRadius: '20px 20px 0 0'
                                                        }} />}

                                                        {/* Title */}
                                                        {step.title && (
                                                            <h3 style={{
                                                                fontFamily: 'Playfair Display,serif',
                                                                fontSize: '1.2rem', color: done ? '#666' : '#f0ede8',
                                                                marginBottom: 10, fontWeight: 700,
                                                                textDecoration: done ? 'line-through' : 'none',
                                                                textDecorationColor: '#555'
                                                            }}>
                                                                {step.title}
                                                            </h3>
                                                        )}

                                                        {/* Description */}
                                                        <p style={{
                                                            color: done ? '#666' : '#c8c4be',
                                                            lineHeight: 1.9, fontSize: '1rem',
                                                            fontFamily: 'Inter,sans-serif', margin: 0
                                                        }}>
                                                            {step.description}
                                                        </p>

                                                        {/* Keywords + Duration Row */}
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16, alignItems: 'center' }}>
                                                            {keywords.map(kw => (
                                                                <span key={kw} style={{
                                                                    fontSize: '0.7rem', fontFamily: 'Poppins,sans-serif',
                                                                    padding: '3px 10px', borderRadius: 50,
                                                                    background: `${accent}18`, color: `${accent}cc`,
                                                                    border: `1px solid ${accent}30`,
                                                                    fontWeight: 600, letterSpacing: '0.3px'
                                                                }}>{kw}</span>
                                                            ))}
                                                            {step.duration && (
                                                                <span style={{
                                                                    display: 'inline-flex', alignItems: 'center', gap: 5,
                                                                    fontSize: '0.75rem', fontFamily: 'Poppins,sans-serif',
                                                                    padding: '3px 12px', borderRadius: 50,
                                                                    background: 'rgba(255,255,255,0.04)', color: '#a8a39c',
                                                                    border: '1px solid rgba(255,255,255,0.08)', marginLeft: 'auto'
                                                                }}>
                                                                    <FiClock size={11} /> {step.duration >= 60 ? `${Math.floor(step.duration / 60)}h ${step.duration % 60 > 0 ? step.duration % 60 + 'm' : ''}` : `${step.duration} min`}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Chef's Tip */}
                                                        {step.tip && !done && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                style={{
                                                                    marginTop: 18,
                                                                    padding: '12px 18px',
                                                                    background: `linear-gradient(135deg, ${accent}0d, rgba(0,0,0,0))`,
                                                                    borderLeft: `3px solid ${accent}`,
                                                                    borderRadius: '0 12px 12px 0',
                                                                    display: 'flex', gap: 10, alignItems: 'flex-start'
                                                                }}
                                                            >
                                                                <span style={{ fontSize: '1rem', flexShrink: 0 }}>💡</span>
                                                                <p style={{ color: '#d0ccc6', fontSize: '0.88rem', lineHeight: 1.65, fontFamily: 'Inter,sans-serif', margin: 0 }}>
                                                                    <strong style={{ color: accent, fontFamily: 'Poppins,sans-serif', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Chef's Tip — </strong>
                                                                    {step.tip}
                                                                </p>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}

                                    {/* Completion Banner */}
                                    {recipe.steps?.length > 0 && checkedSteps.length === recipe.steps.length && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{ duration: 0.5, type: 'spring' }}
                                            style={{
                                                textAlign: 'center', padding: '36px 28px', borderRadius: 24,
                                                background: 'linear-gradient(135deg, rgba(39,174,96,0.15), rgba(46,204,113,0.08))',
                                                border: '1px solid rgba(39,174,96,0.35)',
                                                boxShadow: '0 8px 40px rgba(39,174,96,0.15)'
                                            }}
                                        >
                                            <div style={{ fontSize: '2.8rem', marginBottom: 12 }}>🎉</div>
                                            <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.6rem', color: '#27ae60', marginBottom: 8 }}>
                                                Dish Complete!
                                            </h3>
                                            <p style={{ color: '#a8a39c', fontFamily: 'Inter,sans-serif', fontSize: '0.95rem', lineHeight: 1.7 }}>
                                                You've followed all {recipe.steps.length} steps. Your <strong style={{ color: '#f0ede8' }}>{recipe.name}</strong> is ready to serve. 🍽️
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div style={{ position: 'sticky', top: '160px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Quick Facts */}
                        <div style={{
                            background: 'rgba(20,20,20,0.8)', padding: '28px', borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                            position: 'relative', overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, width: 150, height: 150, background: `radial-gradient(circle, ${accent}30, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />

                            <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ width: 8, height: 24, background: accent, borderRadius: 10 }} /> Recipe Overview
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[['Region', recipe.region || 'Andhra Pradesh'], ['Cuisine', 'South Indian'], ['Course', recipe.category], ['Diet', recipe.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian']].map(([k, v]) => (
                                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px dashed rgba(255,255,255,0.08)' }}>
                                        <span style={{ color: '#8b8580', fontFamily: 'Poppins,sans-serif', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{k}</span>
                                        <span style={{ color: '#f0ede8', fontWeight: 600, fontSize: '0.95rem' }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        {recipe.tags && recipe.tags.length > 0 && (
                            <div style={{
                                background: 'rgba(20,20,20,0.8)', padding: '28px', borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                            }}>
                                <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <span style={{ width: 8, height: 24, background: '#a8a39c', borderRadius: 10 }} /> Tags
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {recipe.tags.map(tag => (
                                        <span key={tag} style={{
                                            padding: '6px 16px', borderRadius: '50px',
                                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                                            color: '#c0bab4', fontSize: '0.82rem', fontFamily: 'Poppins,sans-serif',
                                            transition: 'all 0.2s', cursor: 'default'
                                        }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = '#c0bab4'; }}
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related */}
                {related.length > 0 && (
                    <div style={{ marginTop: '64px' }}>
                        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.8rem', marginBottom: '28px' }}>You May Also Like</h2>
                        <div className="recipes-grid">
                            {related.map((r, i) => <RecipeCard key={r._id} recipe={r} index={i} />)}
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}
