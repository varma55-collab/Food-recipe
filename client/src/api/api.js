import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('ar_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const getRecipes = (params) => API.get('/recipes', { params });
export const getRecipe = (id) => API.get(`/recipes/${id}`);
export const getFeatured = () => API.get('/recipes/featured');
export const searchRecipes = (q) => API.get('/recipes/search', { params: { q } });
export const getCategories = () => API.get('/categories');
export const getCategoryRecipes = (cat) => API.get(`/recipes/category/${cat}`);
export const toggleFavorite = (id) => API.post(`/auth/favorites/${id}`);
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);

export default API;
