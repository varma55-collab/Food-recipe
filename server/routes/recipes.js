const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// @route GET /api/recipes
router.get('/', async (req, res) => {
    try {
        const { category, difficulty, vegetarian, search, page = 1, limit = 12, sort = '-createdAt', featured } = req.query;
        const query = {};

        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;
        if (vegetarian !== undefined) query.isVegetarian = vegetarian === 'true';
        if (featured) query.featured = featured === 'true';
        if (search) {
            query.$text = { $search: search };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await Recipe.countDocuments(query);
        const recipes = await Recipe.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit))
            .select('-steps -__v');

        res.json({
            success: true,
            count: recipes.length,
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page),
            recipes
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route GET /api/recipes/featured
router.get('/featured', async (req, res) => {
    try {
        const recipes = await Recipe.find({ featured: true }).limit(6).select('-steps -__v');
        res.json({ success: true, recipes });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route GET /api/recipes/search
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.json({ success: true, recipes: [] });

        const recipes = await Recipe.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { tags: { $in: [new RegExp(q, 'i')] } },
                { category: { $regex: q, $options: 'i' } }
            ]
        }).limit(20).select('-steps -__v');

        res.json({ success: true, count: recipes.length, recipes });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route GET /api/recipes/category/:cat
router.get('/category/:cat', async (req, res) => {
    try {
        const recipes = await Recipe.find({ category: req.params.cat }).select('-steps -__v');
        res.json({ success: true, count: recipes.length, recipes });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route GET /api/recipes/:id
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });
        res.json({ success: true, recipe });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route POST /api/recipes
router.post('/', async (req, res) => {
    try {
        const recipe = await Recipe.create(req.body);
        res.status(201).json({ success: true, recipe });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

module.exports = router;
