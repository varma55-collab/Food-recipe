import { motion } from 'framer-motion';

const TEAM = [
    { name: 'Andhra Culinary Heritage', role: 'Our Foundation', avatar: '🏺', desc: 'Rooted in centuries of Andhra cooking traditions passed through generations of families.' },
    { name: 'Expert Recipe Curators', role: 'Our Team', avatar: '👨‍🍳', desc: 'Passionate food lovers and experienced cooks who verify every recipe for authenticity.' },
    { name: 'Real Home Cooks', role: 'Our Community', avatar: '🏠', desc: 'Thousands of home cooks who have tested, refined and contributed their family recipes.' },
];

const TIMELINE = [
    { year: 'Ancient', event: 'Andhra culinary traditions established with tamarind, chilli and rice as foundations.' },
    { year: '1600s', event: 'Gongura (sorrel leaves) becomes a signature Andhra ingredient, unique to the region.' },
    { year: '1800s', event: 'Hyderabadi Biryani influence merges with Andhra spice traditions.' },
    { year: '2000s', event: 'Andhra cuisine gains national recognition; Andhra meals become iconic.' },
    { year: '2024', event: 'Andhra Ruchulu — bringing authentic recipes to every home, digitally preserved.' },
];

export default function AboutPage() {
    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Hero */}
            <div style={{ position: 'relative', padding: '100px 0 80px', background: 'linear-gradient(135deg,rgba(192,57,43,0.12),rgba(243,156,18,0.06))', borderBottom: '1px solid rgba(255,255,255,0.06)', textAlign: 'center', overflow: 'hidden' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', top: '-60px', right: '-60px', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(192,57,43,0.1)', pointerEvents: 'none' }} />
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <span style={{ fontSize: '0.78rem', letterSpacing: '3px', color: '#f39c12', textTransform: 'uppercase', fontFamily: 'Poppins,sans-serif' }}>Our Story</span>
                        <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2.5rem,6vw,4.5rem)', margin: '16px 0 20px' }}>
                            The Heart of <span className="gradient-text">Andhra</span>
                        </h1>
                        <p style={{ color: '#a8a39c', maxWidth: 600, margin: '0 auto', lineHeight: 1.8, fontSize: '1.05rem' }}>
                            Andhra Ruchulu is a celebration of one of India's most vibrant, bold and misunderstood cuisines. We are here to tell its real story — through every recipe, every step, every ingredient.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Mission */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <span style={{ fontSize: '0.78rem', letterSpacing: '3px', color: '#f39c12', textTransform: 'uppercase', fontFamily: 'Poppins,sans-serif' }}>Mission</span>
                            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', margin: '12px 0 20px' }}>Preserving Andhra's Culinary Soul</h2>
                            <p style={{ color: '#a8a39c', lineHeight: 1.9, marginBottom: '16px' }}>Andhra cuisine is more than food — it's a living cultural document. Each recipe carries memories of festivals, family gatherings, monsoon evenings, and harvest celebrations.</p>
                            <p style={{ color: '#a8a39c', lineHeight: 1.9 }}>Our mission is to document, preserve and share 165+ authentic Andhra recipes with step-by-step real-world processes, so that this extraordinary culinary heritage is never lost.</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {[['🌶️', 'Bold Spices'], ['🍚', 'Rice Mastery'], ['🫙', 'Pickling Art'], ['🦐', 'Seafood Craft']].map(([icon, label]) => (
                                <div key={label} className="glass-card" style={{ padding: '28px 20px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{icon}</div>
                                    <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#f0ede8' }}>{label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section" style={{ background: 'rgba(26,26,26,0.4)' }}>
                <div className="container">
                    <div className="section-heading">
                        <span className="label">History</span>
                        <h2>Andhra Cuisine Through Time</h2>
                    </div>
                    <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom,transparent,rgba(192,57,43,0.5),transparent)', transform: 'translateX(-50%)' }} />
                        {TIMELINE.map((t, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: '32px', position: 'relative' }}>
                                <div style={{ width: '45%', padding: '20px 24px', background: 'rgba(26,26,26,0.9)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }}>
                                    <div style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.1rem', color: '#f39c12', marginBottom: '8px', fontWeight: 700 }}>{t.year}</div>
                                    <p style={{ color: '#a8a39c', fontSize: '0.88rem', lineHeight: 1.7 }}>{t.event}</p>
                                </div>
                                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 12, height: 12, borderRadius: '50%', background: '#c0392b', border: '2px solid rgba(192,57,43,0.5)', boxShadow: '0 0 16px rgba(192,57,43,0.5)' }} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section">
                <div className="container">
                    <div className="section-heading">
                        <span className="label">Behind the Scenes</span>
                        <h2>Who We Are</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '28px' }}>
                        {TEAM.map((m, i) => (
                            <motion.div key={m.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="glass-card" style={{ padding: '36px 28px', textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{m.avatar}</div>
                                <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.1rem', marginBottom: '4px' }}>{m.name}</h3>
                                <p style={{ color: '#f39c12', fontSize: '0.78rem', fontFamily: 'Poppins,sans-serif', marginBottom: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{m.role}</p>
                                <p style={{ color: '#a8a39c', fontSize: '0.87rem', lineHeight: 1.7 }}>{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
