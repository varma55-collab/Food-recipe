const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Recipe name is required'],
        trim: true
    },
    nameTelugu: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Breakfast', 'Rice Dishes', 'Curries', 'Dals', 'Chutneys', 'Pickles', 'Sweets', 'Snacks', 'Biryanis', 'Seafood', 'Non-Vegetarian', 'Vegetarian', 'Festival Special', 'Street Food']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        unit: { type: String }
    }],
    steps: [{
        step: { type: Number, required: true },
        title: { type: String },
        description: { type: String, required: true },
        duration: { type: Number }, // in minutes
        tip: { type: String }
    }],
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800'
    },
    cookTime: {
        type: Number, // in minutes
        required: [true, 'Cooking time is required']
    },
    prepTime: {
        type: Number, // in minutes
        default: 15
    },
    servings: {
        type: Number,
        default: 4
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard', 'Expert'],
        default: 'Medium'
    },
    spiceLevel: {
        type: String,
        enum: ['Mild', 'Medium', 'Spicy', 'Very Spicy'],
        default: 'Medium'
    },
    region: {
        type: String,
        default: 'Andhra Pradesh'
    },
    tags: [String],
    isVegetarian: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 4.5,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

recipeSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);
