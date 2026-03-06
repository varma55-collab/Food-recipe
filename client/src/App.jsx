import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import AuthPage from './pages/AuthPage';
import AboutPage from './pages/AboutPage';
import CategoryPage from './pages/CategoryPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Redirect to /auth if not logged in
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ paddingTop: '100px' }} className="loader"><div className="spinner" /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  return children;
}

function AnimatedRoutes() {
  const location = useLocation();
  const { user, loading } = useAuth();

  // If not logged in and not on /auth, redirect
  if (!loading && !user && location.pathname !== '/auth') {
    return <Navigate to="/auth" replace />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth page — always accessible */}
        <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />

        {/* Protected routes — require sign in */}
        <Route path="/" element={<ProtectedRoute><PageTransition><LandingPage /></PageTransition></ProtectedRoute>} />
        <Route path="/recipes" element={<ProtectedRoute><PageTransition><RecipesPage /></PageTransition></ProtectedRoute>} />
        <Route path="/recipes/:id" element={<ProtectedRoute><PageTransition><RecipeDetailPage /></PageTransition></ProtectedRoute>} />
        <Route path="/category/:cat" element={<ProtectedRoute><PageTransition><CategoryPage /></PageTransition></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><PageTransition><AboutPage /></PageTransition></ProtectedRoute>} />

        {/* Catch all — redirect to auth */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const { user } = useAuth();
  return (
    <>
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#1a1a1a', color: '#f0ede8', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontFamily: 'Poppins, sans-serif' },
          success: { iconTheme: { primary: '#27ae60', secondary: '#fff' } },
          error: { iconTheme: { primary: '#c0392b', secondary: '#fff' } },
        }}
      />
      {/* Only show Navbar & Footer when logged in */}
      {user && <Navbar />}
      <main>
        <AnimatedRoutes />
      </main>
      {user && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
