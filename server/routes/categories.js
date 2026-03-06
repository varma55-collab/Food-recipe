const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// @route GET /api/categories
router.get('/', async (req, res) => {
    try {
        const categories = await Recipe.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 }, image: { $first: '$image' } } },
            { $sort: { count: -1 } },
            { $project: { _id: 0, name: '$_id', count: 1, image: 1 } }
        ]);
        res.json({ success: true, categories });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
