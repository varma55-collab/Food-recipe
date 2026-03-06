const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });
const Recipe = require('../models/Recipe');

const part1 = require('./recipes_part1');
const part2 = require('./recipes_part2');
const part3 = require('./recipes_part3');

const allRecipes = [...part1, ...part2, ...part3];

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/andhra-ruchulu');
        console.log('✅ Connected to MongoDB');
        await Recipe.deleteMany({});
        console.log('🗑️  Cleared existing recipes');
        const inserted = await Recipe.insertMany(allRecipes);
        console.log(`✅ Seeded ${inserted.length} Andhra recipes!`);
        // Print category breakdown
        const cats = {};
        inserted.forEach(r => { cats[r.category] = (cats[r.category] || 0) + 1; });
        console.log('\n📊 Category Breakdown:');
        Object.entries(cats).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
            console.log(`   ${cat}: ${count} recipes`);
        });
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err.message);
        process.exit(1);
    }
}

seedDB();
