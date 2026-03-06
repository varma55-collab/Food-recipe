import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('ar_token'));
    const [loading, setLoading] = useState(true);

    const API = 'http://localhost:5000/api';

    useEffect(() => {
        if (token) {
            axios.get(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
                .then(r => setUser(r.data.user))
                .catch(() => { localStorage.removeItem('ar_token'); setToken(null); })
                .finally(() => setLoading(false));
        } else { setLoading(false); }
    }, [token]);

    const login = async (email, password) => {
        const res = await axios.post(`${API}/auth/login`, { email, password });
        localStorage.setItem('ar_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const register = async (name, email, password) => {
        const res = await axios.post(`${API}/auth/register`, { name, email, password });
        localStorage.setItem('ar_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('ar_token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
