import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiUsers, FiArrowRight } from 'react-icons/fi';
import { GiChiliPepper, GiFireBowl, GiMeat, GiCrab, GiSpoon } from 'react-icons/gi';
import { FaBowlRice, FaFish, FaShrimp, FaEgg, FaDrumstickBite, FaBowlFood } from 'react-icons/fa6';

// ── Professional curated Unsplash food photo pool ─────────────────────
// Each is a confirmed real food photo — NO duplicates nearby
const PHOTO_POOLS = {
    'Breakfast': ['photo-1567620905732-2d1ec7ab7445', 'photo-1589301760014-d929f3979dbc', 'photo-1565299624946-b28f40a0ae38', 'photo-1596797038530-2c107229654b', 'photo-1546833999-b9f581a1996d', 'photo-1606755962773-d324e0a13086', 'photo-1601050690597-df0568f70950', 'photo-1585409677983-0f6c41ca9c3b', 'photo-1482049016688-2d3e1b311543'],
    'Rice Dishes': ['photo-1596560548464-f010549b84d7', 'photo-1476718406336-bb5a9690ee2a', 'photo-1597481499750-3e6b22637536', 'photo-1606491956689-2ea866880c84'],
    'Biryanis': ['photo-1563379091339-03b21ab4a4f8', 'photo-1563379252-85a4fef9a97e', 'photo-1631452180519-c014fe946bc7'],
    'Curries': ['photo-1585937421612-70a008356fbe', 'photo-1574894709920-11b28e7367e3', 'photo-1603894584373-5ac82b2ae398', 'photo-1588166524941-3bf61a9c41db', 'photo-1547592166-23ac45744acd', 'photo-1565557623262-b51c2513a641'],
    'Seafood': ['photo-1574071318508-1cdbab80d002', 'photo-1559847844-5315695dadae', 'photo-1565557623262-b51c2513a641'],
    'Sweets': ['photo-1551024506-0bccd828d307', 'photo-1568702846914-96b305d2aaeb', 'photo-1598214886806-c5b6f76e8cc8'],
    'Chutneys': ['photo-1505253758473-96b7015fcd40', 'photo-1593967943279-12c20e1de10c'],
    'Street Food': ['photo-1601050690597-df0568f70950', 'photo-1589302168068-964664d93dc0'],
    'Non-Vegetarian': ['photo-1585937421612-70a008356fbe', 'photo-1603894584373-5ac82b2ae398', 'photo-1563379252-85a4fef9a97e', 'photo-1631452180519-c014fe946bc7', 'photo-1574071318508-1cdbab80d002'],
    'Vegetarian': ['photo-1574894709920-11b28e7367e3', 'photo-1547592166-23ac45744acd', 'photo-1606491956689-2ea866880c84'],
    'Default': ['photo-1512058454905-6b841e7ad132', 'photo-1625398407796-82650a8c8eed']
};

export function getRecipePhotoPool(recipe) {
    if (!recipe) return PHOTO_POOLS['Default'];
    const rName = (recipe.name || '').toLowerCase();
    if (recipe.category === 'Seafood' || rName.includes('fish') || rName.includes('prawn') || rName.includes('crab')) return PHOTO_POOLS['Seafood'];
    if (recipe.category === 'Biryanis' || rName.includes('biryani')) return PHOTO_POOLS['Biryanis'];
    if (recipe.category === 'Sweets') return PHOTO_POOLS['Sweets'];
    if (recipe.category === 'Chutneys' || recipe.category === 'Pickles') return PHOTO_POOLS['Chutneys'];
    if (recipe.category === 'Breakfast') return PHOTO_POOLS['Breakfast'];
    if (recipe.category === 'Street Food' || recipe.category === 'Snacks') return PHOTO_POOLS['Street Food'];
    if (recipe.isVegetarian === false) return PHOTO_POOLS['Non-Vegetarian'];
    if (recipe.category === 'Curries' || recipe.category === 'Dals') return PHOTO_POOLS['Vegetarian'];
    const fallbackList = PHOTO_POOLS[recipe.category];
    return fallbackList && fallbackList.length > 0 ? fallbackList : PHOTO_POOLS['Default'];
}

// ── Per-category accent colors ────────────────────────────────────────
const CAT_COLOR = {
    'Breakfast': '#f39c12',
    'Rice Dishes': '#27ae60',
    'Curries': '#c0392b',
    'Dals': '#d35400',
    'Biryanis': '#8e44ad',
    'Seafood': '#2980b9',
    'Sweets': '#e91e8c',
    'Chutneys': '#16a085',
    'Pickles': '#e67e22',
    'Street Food': '#e74c3c',
    'Non-Vegetarian': '#c0392b',
    'Vegetarian': '#27ae60',
    'Festival Special': '#f1c40f',
};

const SPICE_COLOR = { 'Mild': '#27ae60', 'Medium': '#f39c12', 'Spicy': '#e67e22', 'Very Spicy': '#c0392b' };

function nameHash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    return Math.abs(h);
}

function Stars({ rating }) {
    if (!rating || isNaN(rating)) return null;
    const r = Math.max(0, Math.min(5, Number(rating)));
    return (
        <span style={{ color: '#f1c40f', fontSize: '0.72rem', letterSpacing: '1px' }}>
            {'★'.repeat(Math.round(r))}{'☆'.repeat(5 - Math.round(r))}
            <span style={{ color: '#6b6560', marginLeft: 6, fontSize: '0.75rem' }}>{r.toFixed(1)}</span>
        </span>
    );
}

// Pick a unique photo URL deterministically from name hash
function getPhotoUrl(recipe) {
    const h = nameHash(recipe.name);
    const pool = getRecipePhotoPool(recipe);
    const idx = h % pool.length;
    return `https://images.unsplash.com/${pool[idx]}?w=800&fit=crop&q=85&auto=format`;
}

// Fallback photo if first one errors
function getFallbackPhotoUrl(recipe) {
    const h = nameHash(recipe.name);
    const pool = getRecipePhotoPool(recipe);
    const idx = (h + 7) % pool.length;
    return `https://images.unsplash.com/${pool[idx]}?w=800&fit=crop&q=75&auto=format`;
}

export default function RecipeCard({ recipe, index = 0 }) {
    const navigate = useNavigate();
    if (!recipe) return null;

    const color = CAT_COLOR[recipe.category] || '#c0392b';
    const typeColor = recipe.isVegetarian ? '#27ae60' : '#c0392b';

    let IconComponent = GiSpoon;
    let iconSize = 22;
    if (!recipe.isVegetarian) {
        const nameFallback = ((recipe.name || '') + ' ' + (recipe.nameTelugu || '')).toLowerCase();
        if (nameFallback.includes('chicken') || nameFallback.includes('kodi')) { IconComponent = FaDrumstickBite; iconSize = 20; }
        else if (nameFallback.includes('mutton') || nameFallback.includes('meat')) { IconComponent = GiMeat; iconSize = 24; }
        else if (nameFallback.includes('fish') || nameFallback.includes('chepa') || nameFallback.includes('chepalu')) { IconComponent = FaFish; iconSize = 22; }
        else if (nameFallback.includes('prawn') || nameFallback.includes('royyalu')) { IconComponent = FaShrimp; iconSize = 22; }
        else if (nameFallback.includes('crab') || nameFallback.includes('peetha') || nameFallback.includes('peethalu')) { IconComponent = GiCrab; iconSize = 24; }
        else if (nameFallback.includes('egg') || nameFallback.includes('guddu')) { IconComponent = FaEgg; iconSize = 20; }
        else { IconComponent = GiMeat; }
    } else {
        if (recipe.category === 'Rice Dishes' || recipe.category === 'Biryanis') IconComponent = FaBowlRice;
        else if (recipe.category === 'Breakfast') IconComponent = FaBowlFood;
        else IconComponent = GiSpoon;
    }

    const hash = nameHash(recipe.name || 'recipe');

    // Use the recipe's own image URL if available, otherwise pick from pool
    const photoUrl = recipe.image && recipe.image.startsWith('http')
        ? recipe.image
        : getPhotoUrl(recipe);
    const fallbackUrl = getFallbackPhotoUrl(recipe);

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.5) }}
            onClick={() => navigate(`/recipes/${recipe._id}`)}
            style={{
                cursor: 'pointer', borderRadius: 20, overflow: 'hidden', position: 'relative',
                background: `linear-gradient(145deg, #111 0%, ${typeColor}15 100%)`,
                border: `1px solid ${color}33`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
            whileHover={{ y: -7, boxShadow: `0 20px 50px rgba(0,0,0,0.7), 0 0 0 1px ${color}66` }}
        >
            {/* ── Card Hero ─────────────────────────────────── */}
            <div style={{ position: 'relative', height: 210, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${typeColor}22 0%, ${color}44 100%)` }}>

                {/* TEMPORARY: Using cuisine icons instead of real food photos */}
                <IconComponent size={90} color={`${typeColor}ee`} style={{ filter: `drop-shadow(0 0 20px ${typeColor}55)` }} />

                {/* Cinematic gradient overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to top, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.3) 55%, transparent 100%)`
                }} />

                {/* Color-tinted side vignette */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(ellipse at bottom left, ${color}18 0%, transparent 70%)`,
                    pointerEvents: 'none',
                }} />

                {/* Accent bar at top */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, ${color}, ${color}55, transparent)`
                }} />

                {/* Professional UI Element Badge (replaces floating emoji) */}
                <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4 + (hash % 3), repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        bottom: 14,
                        right: 14,
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        background: 'rgba(20, 20, 20, 0.75)',
                        backdropFilter: 'blur(12px)',
                        border: `1px solid ${color}66`,
                        boxShadow: `0 4px 15px rgba(0,0,0,0.6), 0 0 10px ${color}33`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: color,
                        opacity: 0.95,
                    }}>
                    <IconComponent size={iconSize} />
                </motion.div>

                {/* Badges row */}
                <div style={{ position: 'absolute', top: 12, left: 12 }}>
                    {recipe.isVegetarian
                        ? <span className="badge badge-veg">🌿 Veg</span>
                        : <span className="badge badge-nonveg">🍖 Non-Veg</span>}
                </div>
                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <span className={`badge badge-${recipe.difficulty?.toLowerCase() === 'easy' ? 'easy' : ['hard', 'expert'].includes(recipe.difficulty?.toLowerCase()) ? 'hard' : 'medium'}`}>
                        {recipe.difficulty}
                    </span>
                </div>

                {/* Category label at bottom left of image */}
                <div style={{
                    position: 'absolute', bottom: 12, left: 12,
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)',
                    border: `1px solid ${color}55`,
                    borderRadius: 50, padding: '3px 12px',
                    fontSize: '0.68rem', fontFamily: 'Poppins,sans-serif', fontWeight: 600,
                    color: color, letterSpacing: '0.5px',
                }}>
                    {recipe.category}
                </div>
            </div>

            {/* ── Card Body ─────────────────────────────────── */}
            <div style={{ padding: '15px 18px 18px', borderTop: `1px solid ${color}18` }}>

                {/* Title */}
                <h3 style={{
                    fontFamily: 'Playfair Display,serif', fontSize: '1.08rem',
                    lineHeight: 1.3, color: '#f0ede8', marginBottom: recipe.nameTelugu ? 2 : 8
                }}>
                    {recipe.name}
                </h3>
                {recipe.nameTelugu &&
                    <p style={{ fontSize: '0.78rem', color: '#6b6560', marginBottom: 8, fontFamily: 'sans-serif' }}>
                        {recipe.nameTelugu}
                    </p>}

                {/* Description */}
                <p style={{
                    fontSize: '0.81rem', color: '#7a7570', lineHeight: 1.55, marginBottom: 11,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                    {recipe.description}
                </p>

                {/* Ingredients Badges */}
                {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                        {recipe.ingredients.slice(0, 3).map((ing, i) => (
                            <span key={`ing-${i}`} style={{
                                fontSize: '0.65rem', background: `${typeColor}22`, color: typeColor,
                                padding: '3px 8px', borderRadius: 4, border: `1px solid ${typeColor}33`,
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80px'
                            }}>
                                {ing?.name || (typeof ing === 'string' ? ing : 'Ingredient')}
                            </span>
                        ))}
                        {recipe.ingredients.length > 3 && (
                            <span style={{
                                fontSize: '0.65rem', background: '#222', color: '#888',
                                padding: '3px 8px', borderRadius: 4, border: '1px solid #333'
                            }}>
                                +{recipe.ingredients.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Stars */}
                <div style={{ marginBottom: 12 }}>
                    <Stars rating={recipe.rating} />
                </div>

                {/* Meta row */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 11
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: '#6b6560' }}>
                        <FiClock style={{ color: color }} />
                        <span>{recipe.cookTime}m</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: '#6b6560' }}>
                        <FiUsers style={{ color: color }} />
                        <span>{recipe.servings} srv</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto', fontSize: '0.76rem' }}>
                        <GiChiliPepper style={{ color: SPICE_COLOR[recipe.spiceLevel] }} />
                        <span style={{ color: SPICE_COLOR[recipe.spiceLevel], fontFamily: 'Poppins,sans-serif' }}>
                            {recipe.spiceLevel}
                        </span>
                    </div>
                </div>

                {/* CTA button */}
                <motion.div
                    variants={{ hover: { opacity: 1, y: 0, marginTop: 12 }, initial: { opacity: 0, y: 8, marginTop: 0 } }}
                    initial="initial"
                    whileHover="hover"
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                        background: `linear-gradient(135deg, ${color}, ${color}bb)`,
                        borderRadius: 50, padding: '9px 0', marginTop: 12,
                        fontSize: '0.82rem', fontWeight: 600, fontFamily: 'Poppins,sans-serif',
                        color: '#fff', letterSpacing: '0.3px'
                    }}>
                    <GiFireBowl size={14} /> View Recipe <FiArrowRight size={13} />
                </motion.div>
            </div>
        </motion.article>
    );
}
