const mongoose = require('mongoose');
require('dotenv').config();

const Recipe = require('./models/Recipe');

// ─── Real-world Andhra ingredient database by recipe name ───
const REAL_INGREDIENTS = {
    // ─── Biryanis ───
    'Hyderabadi Chicken Biryani': [
        { name: 'Basmati Rice', quantity: '500', unit: 'g' },
        { name: 'Chicken (bone-in)', quantity: '750', unit: 'g' },
        { name: 'Onions (thinly sliced)', quantity: '4', unit: 'large' },
        { name: 'Yogurt / Curd', quantity: '1', unit: 'cup' },
        { name: 'Ginger-Garlic Paste', quantity: '3', unit: 'tbsp' },
        { name: 'Green Chillies', quantity: '6', unit: 'nos' },
        { name: 'Fresh Mint Leaves', quantity: '1', unit: 'cup' },
        { name: 'Fresh Coriander Leaves', quantity: '1', unit: 'cup' },
        { name: 'Biryani Masala Powder', quantity: '2', unit: 'tbsp' },
        { name: 'Saffron Strands', quantity: '1', unit: 'pinch' },
        { name: 'Warm Milk', quantity: '1/4', unit: 'cup' },
        { name: 'Ghee', quantity: '4', unit: 'tbsp' },
        { name: 'Oil', quantity: '4', unit: 'tbsp' },
        { name: 'Red Chilli Powder', quantity: '2', unit: 'tsp' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
        { name: 'Whole Spices (Bay leaf, Cinnamon, Cardamom, Cloves, Star Anise)', quantity: 'as needed', unit: '' },
    ],
    'Mutton Biryani': [
        { name: 'Basmati Rice (aged)', quantity: '500', unit: 'g' },
        { name: 'Mutton (bone-in pieces)', quantity: '750', unit: 'g' },
        { name: 'Onions (fried golden)', quantity: '4', unit: 'large' },
        { name: 'Yogurt', quantity: '1', unit: 'cup' },
        { name: 'Ginger-Garlic Paste', quantity: '3', unit: 'tbsp' },
        { name: 'Green Chillies (slit)', quantity: '8', unit: 'nos' },
        { name: 'Mint Leaves', quantity: '1', unit: 'bunch' },
        { name: 'Coriander Leaves', quantity: '1', unit: 'bunch' },
        { name: 'Biryani Masala', quantity: '2', unit: 'tbsp' },
        { name: 'Saffron in Warm Milk', quantity: '2', unit: 'tbsp' },
        { name: 'Ghee', quantity: '5', unit: 'tbsp' },
        { name: 'Oil', quantity: '4', unit: 'tbsp' },
        { name: 'Shah Jeera (Caraway Seeds)', quantity: '1', unit: 'tsp' },
        { name: 'Bay Leaves', quantity: '3', unit: 'nos' },
        { name: 'Cinnamon Sticks', quantity: '2', unit: 'nos' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],
    'Egg Biryani': [
        { name: 'Basmati Rice', quantity: '400', unit: 'g' },
        { name: 'Eggs (hard boiled)', quantity: '6', unit: 'nos' },
        { name: 'Onions (sliced)', quantity: '3', unit: 'large' },
        { name: 'Tomatoes (chopped)', quantity: '2', unit: 'medium' },
        { name: 'Ginger-Garlic Paste', quantity: '2', unit: 'tbsp' },
        { name: 'Green Chillies', quantity: '4', unit: 'nos' },
        { name: 'Mint Leaves', quantity: '1/2', unit: 'cup' },
        { name: 'Coriander Leaves', quantity: '1/2', unit: 'cup' },
        { name: 'Biryani Masala', quantity: '1.5', unit: 'tbsp' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Red Chilli Powder', quantity: '1.5', unit: 'tsp' },
        { name: 'Ghee', quantity: '3', unit: 'tbsp' },
        { name: 'Oil', quantity: '3', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],
    'Vegetable Biryani': [
        { name: 'Basmati Rice', quantity: '400', unit: 'g' },
        { name: 'Mixed Vegetables (Carrot, Beans, Peas, Cauliflower)', quantity: '300', unit: 'g' },
        { name: 'Onions (sliced)', quantity: '3', unit: 'large' },
        { name: 'Tomatoes', quantity: '2', unit: 'medium' },
        { name: 'Ginger-Garlic Paste', quantity: '2', unit: 'tbsp' },
        { name: 'Green Chillies', quantity: '4', unit: 'nos' },
        { name: 'Mint Leaves', quantity: '1/2', unit: 'cup' },
        { name: 'Coriander Leaves', quantity: '1/2', unit: 'cup' },
        { name: 'Biryani Masala', quantity: '1.5', unit: 'tbsp' },
        { name: 'Ghee', quantity: '3', unit: 'tbsp' },
        { name: 'Paneer (cubed)', quantity: '100', unit: 'g' },
        { name: 'Cashew Nuts', quantity: '10', unit: 'nos' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],

    // ─── Curries ───
    'Gongura Mutton': [
        { name: 'Mutton (bone-in)', quantity: '500', unit: 'g' },
        { name: 'Gongura Leaves (Sorrel)', quantity: '2', unit: 'cups' },
        { name: 'Onions (finely chopped)', quantity: '3', unit: 'medium' },
        { name: 'Tomatoes (chopped)', quantity: '2', unit: 'medium' },
        { name: 'Ginger-Garlic Paste', quantity: '2', unit: 'tbsp' },
        { name: 'Green Chillies', quantity: '4', unit: 'nos' },
        { name: 'Red Chilli Powder', quantity: '2', unit: 'tsp' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Coriander Powder', quantity: '1', unit: 'tsp' },
        { name: 'Cumin Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Mustard Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Fenugreek Seeds', quantity: '1/2', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '1', unit: 'sprig' },
        { name: 'Oil', quantity: '4', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],
    'Gutti Vankaya Kura': [
        { name: 'Small Brinjals / Eggplants', quantity: '250', unit: 'g' },
        { name: 'Peanuts (roasted)', quantity: '2', unit: 'tbsp' },
        { name: 'Sesame Seeds', quantity: '1', unit: 'tbsp' },
        { name: 'Coconut (grated)', quantity: '2', unit: 'tbsp' },
        { name: 'Onions (chopped)', quantity: '2', unit: 'medium' },
        { name: 'Tamarind Paste', quantity: '1', unit: 'tbsp' },
        { name: 'Red Chilli Powder', quantity: '2', unit: 'tsp' },
        { name: 'Coriander Powder', quantity: '1', unit: 'tsp' },
        { name: 'Cumin Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Mustard Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '1', unit: 'sprig' },
        { name: 'Jaggery (grated)', quantity: '1', unit: 'tsp' },
        { name: 'Oil', quantity: '4', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],

    // ─── Breakfast ───
    'Pesarattu': [
        { name: 'Green Moong Dal (whole)', quantity: '1', unit: 'cup' },
        { name: 'Rice', quantity: '1/4', unit: 'cup' },
        { name: 'Green Chillies', quantity: '3', unit: 'nos' },
        { name: 'Ginger (chopped)', quantity: '1', unit: 'inch' },
        { name: 'Cumin Seeds', quantity: '1/2', unit: 'tsp' },
        { name: 'Onion (finely chopped)', quantity: '1', unit: 'small' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
        { name: 'Oil / Ghee', quantity: 'for cooking', unit: '' },
    ],
    'Upma': [
        { name: 'Rava / Semolina (roasted)', quantity: '1', unit: 'cup' },
        { name: 'Onion (chopped)', quantity: '1', unit: 'medium' },
        { name: 'Green Chillies (chopped)', quantity: '2', unit: 'nos' },
        { name: 'Ginger (grated)', quantity: '1', unit: 'tsp' },
        { name: 'Mustard Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Urad Dal', quantity: '1', unit: 'tsp' },
        { name: 'Chana Dal', quantity: '1', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '1', unit: 'sprig' },
        { name: 'Cashew Nuts', quantity: '6', unit: 'nos' },
        { name: 'Water', quantity: '2.5', unit: 'cups' },
        { name: 'Oil / Ghee', quantity: '2', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
        { name: 'Coriander Leaves', quantity: 'for garnish', unit: '' },
        { name: 'Lemon Juice', quantity: '1', unit: 'tsp' },
    ],
    'Idli': [
        { name: 'Idli Rice / Parboiled Rice', quantity: '2', unit: 'cups' },
        { name: 'Urad Dal (split)', quantity: '1', unit: 'cup' },
        { name: 'Fenugreek Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
        { name: 'Water', quantity: 'as needed', unit: '' },
        { name: 'Oil', quantity: 'for greasing', unit: '' },
    ],
    'Dosa': [
        { name: 'Dosa Rice / Raw Rice', quantity: '2', unit: 'cups' },
        { name: 'Urad Dal', quantity: '1/2', unit: 'cup' },
        { name: 'Fenugreek Seeds', quantity: '1/2', unit: 'tsp' },
        { name: 'Poha / Flattened Rice', quantity: '1/4', unit: 'cup' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
        { name: 'Oil', quantity: 'for cooking', unit: '' },
    ],

    // ─── Rice Dishes ───
    'Pulihora': [
        { name: 'Cooked Rice (cooled)', quantity: '3', unit: 'cups' },
        { name: 'Tamarind Paste (thick)', quantity: '3', unit: 'tbsp' },
        { name: 'Jaggery (grated)', quantity: '1', unit: 'tbsp' },
        { name: 'Peanuts (roasted)', quantity: '3', unit: 'tbsp' },
        { name: 'Green Chillies (slit)', quantity: '4', unit: 'nos' },
        { name: 'Dry Red Chillies', quantity: '4', unit: 'nos' },
        { name: 'Mustard Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Urad Dal', quantity: '1', unit: 'tsp' },
        { name: 'Chana Dal', quantity: '1', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '2', unit: 'sprigs' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Asafoetida (Hing)', quantity: '1/4', unit: 'tsp' },
        { name: 'Sesame Oil', quantity: '3', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],
    'Lemon Rice': [
        { name: 'Cooked Rice', quantity: '3', unit: 'cups' },
        { name: 'Lemon Juice', quantity: '3', unit: 'tbsp' },
        { name: 'Peanuts', quantity: '2', unit: 'tbsp' },
        { name: 'Green Chillies (chopped)', quantity: '3', unit: 'nos' },
        { name: 'Mustard Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Urad Dal', quantity: '1', unit: 'tsp' },
        { name: 'Chana Dal', quantity: '1', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '1', unit: 'sprig' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Asafoetida', quantity: '1/4', unit: 'tsp' },
        { name: 'Oil', quantity: '2', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],

    // ─── Seafood ───
    'Royyala Iguru': [
        { name: 'Prawns (cleaned & deveined)', quantity: '500', unit: 'g' },
        { name: 'Onions (finely chopped)', quantity: '3', unit: 'medium' },
        { name: 'Tomatoes (pureed)', quantity: '2', unit: 'medium' },
        { name: 'Ginger-Garlic Paste', quantity: '2', unit: 'tbsp' },
        { name: 'Green Chillies', quantity: '4', unit: 'nos' },
        { name: 'Red Chilli Powder', quantity: '2', unit: 'tsp' },
        { name: 'Coriander Powder', quantity: '1', unit: 'tsp' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Garam Masala', quantity: '1/2', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '1', unit: 'sprig' },
        { name: 'Coriander Leaves (chopped)', quantity: '2', unit: 'tbsp' },
        { name: 'Oil', quantity: '3', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],
    'Chepala Pulusu': [
        { name: 'Fish Pieces (Rohu/Catla)', quantity: '500', unit: 'g' },
        { name: 'Tamarind Paste', quantity: '2', unit: 'tbsp' },
        { name: 'Onions (sliced)', quantity: '2', unit: 'medium' },
        { name: 'Tomatoes (chopped)', quantity: '2', unit: 'medium' },
        { name: 'Ginger-Garlic Paste', quantity: '1.5', unit: 'tbsp' },
        { name: 'Green Chillies (slit)', quantity: '4', unit: 'nos' },
        { name: 'Red Chilli Powder', quantity: '2', unit: 'tsp' },
        { name: 'Fenugreek Seeds', quantity: '1/2', unit: 'tsp' },
        { name: 'Mustard Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '2', unit: 'sprigs' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Oil', quantity: '4', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],

    // ─── Sweets ───
    'Bobbatlu': [
        { name: 'Maida / All Purpose Flour', quantity: '2', unit: 'cups' },
        { name: 'Chana Dal (cooked)', quantity: '1', unit: 'cup' },
        { name: 'Jaggery (grated)', quantity: '1', unit: 'cup' },
        { name: 'Cardamom Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Nutmeg (grated)', quantity: '1/4', unit: 'tsp' },
        { name: 'Ghee', quantity: '4', unit: 'tbsp' },
        { name: 'Turmeric Powder', quantity: '1/4', unit: 'tsp' },
        { name: 'Oil', quantity: '2', unit: 'tbsp' },
        { name: 'Salt', quantity: '1', unit: 'pinch' },
    ],
    'Pootharekulu': [
        { name: 'Rice Starch Sheets', quantity: '10', unit: 'nos' },
        { name: 'Powdered Sugar', quantity: '1', unit: 'cup' },
        { name: 'Ghee (melted)', quantity: '1/2', unit: 'cup' },
        { name: 'Cardamom Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Dry Fruits (chopped cashews, almonds)', quantity: '1/4', unit: 'cup' },
    ],

    // ─── Chutneys & Pickles ───
    'Avakaya': [
        { name: 'Raw Mangoes (cut into pieces)', quantity: '1', unit: 'kg' },
        { name: 'Red Chilli Powder (Guntur Mirchi)', quantity: '250', unit: 'g' },
        { name: 'Mustard Seed Powder', quantity: '100', unit: 'g' },
        { name: 'Fenugreek Seed Powder', quantity: '2', unit: 'tbsp' },
        { name: 'Sesame Oil (Nuvvula Nune)', quantity: '400', unit: 'ml' },
        { name: 'Salt (rock salt preferred)', quantity: '150', unit: 'g' },
        { name: 'Garlic Cloves (optional)', quantity: '10', unit: 'nos' },
        { name: 'Turmeric Powder', quantity: '1', unit: 'tsp' },
    ],
    'Coconut Chutney': [
        { name: 'Fresh Coconut (grated)', quantity: '1', unit: 'cup' },
        { name: 'Roasted Chana Dal', quantity: '2', unit: 'tbsp' },
        { name: 'Green Chillies', quantity: '3', unit: 'nos' },
        { name: 'Ginger', quantity: '1/2', unit: 'inch' },
        { name: 'Coriander Leaves', quantity: '2', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
        { name: 'Mustard Seeds (for tempering)', quantity: '1', unit: 'tsp' },
        { name: 'Urad Dal (for tempering)', quantity: '1', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '6', unit: 'leaves' },
        { name: 'Oil', quantity: '1', unit: 'tsp' },
    ],

    // ─── Chicken ───
    'Kodi Kura': [
        { name: 'Chicken (curry cut)', quantity: '750', unit: 'g' },
        { name: 'Onions (finely sliced)', quantity: '3', unit: 'large' },
        { name: 'Tomatoes (chopped)', quantity: '3', unit: 'medium' },
        { name: 'Ginger-Garlic Paste', quantity: '2', unit: 'tbsp' },
        { name: 'Green Chillies (slit)', quantity: '5', unit: 'nos' },
        { name: 'Red Chilli Powder (Guntur)', quantity: '2', unit: 'tsp' },
        { name: 'Coriander Powder', quantity: '1.5', unit: 'tsp' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Garam Masala', quantity: '1/2', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '2', unit: 'sprigs' },
        { name: 'Coriander Leaves', quantity: '2', unit: 'tbsp' },
        { name: 'Oil', quantity: '4', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],

    // ─── Dals ───
    'Pappu Charu': [
        { name: 'Toor Dal', quantity: '1', unit: 'cup' },
        { name: 'Tomatoes (chopped)', quantity: '2', unit: 'medium' },
        { name: 'Tamarind Paste', quantity: '1', unit: 'tbsp' },
        { name: 'Green Chillies (slit)', quantity: '3', unit: 'nos' },
        { name: 'Red Chilli Powder', quantity: '1', unit: 'tsp' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Cumin Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Mustard Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Dry Red Chillies', quantity: '2', unit: 'nos' },
        { name: 'Curry Leaves', quantity: '1', unit: 'sprig' },
        { name: 'Asafoetida', quantity: '1/4', unit: 'tsp' },
        { name: 'Ghee', quantity: '2', unit: 'tbsp' },
        { name: 'Coriander Leaves', quantity: '2', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],

    // ─── Street Food / Snacks ───
    'Mirchi Bajji': [
        { name: 'Large Green Chillies (Bajji Mirchi)', quantity: '10', unit: 'nos' },
        { name: 'Gram Flour / Besan', quantity: '1', unit: 'cup' },
        { name: 'Rice Flour', quantity: '2', unit: 'tbsp' },
        { name: 'Carom Seeds (Ajwain)', quantity: '1/2', unit: 'tsp' },
        { name: 'Red Chilli Powder', quantity: '1', unit: 'tsp' },
        { name: 'Turmeric Powder', quantity: '1/4', unit: 'tsp' },
        { name: 'Baking Soda', quantity: '1', unit: 'pinch' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
        { name: 'Oil', quantity: 'for deep frying', unit: '' },
        { name: 'Water', quantity: 'as needed', unit: '' },
    ],
    'Punugulu': [
        { name: 'Idli Batter (leftover)', quantity: '2', unit: 'cups' },
        { name: 'Onion (finely chopped)', quantity: '1', unit: 'small' },
        { name: 'Green Chillies (chopped)', quantity: '2', unit: 'nos' },
        { name: 'Ginger (grated)', quantity: '1', unit: 'tsp' },
        { name: 'Cumin Seeds', quantity: '1/2', unit: 'tsp' },
        { name: 'Curry Leaves (chopped)', quantity: '6', unit: 'leaves' },
        { name: 'Coriander Leaves', quantity: '2', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
        { name: 'Oil', quantity: 'for deep frying', unit: '' },
    ],
};

// ─── Category-based fallback ingredients (when exact recipe name not found) ───
const CATEGORY_INGREDIENTS = {
    'Breakfast': [
        { name: 'Rice Flour', quantity: '1', unit: 'cup' },
        { name: 'Urad Dal', quantity: '1/2', unit: 'cup' },
        { name: 'Green Chillies', quantity: '3', unit: 'nos' },
        { name: 'Ginger (grated)', quantity: '1', unit: 'tsp' },
        { name: 'Cumin Seeds', quantity: '1/2', unit: 'tsp' },
        { name: 'Mustard Seeds', quantity: '1/2', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '1', unit: 'sprig' },
        { name: 'Oil / Ghee', quantity: '2', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
        { name: 'Water', quantity: 'as needed', unit: '' },
    ],
    'Rice Dishes': [
        { name: 'Basmati / Sona Masoori Rice', quantity: '2', unit: 'cups' },
        { name: 'Onion (chopped)', quantity: '1', unit: 'medium' },
        { name: 'Green Chillies (slit)', quantity: '3', unit: 'nos' },
        { name: 'Mustard Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Urad Dal', quantity: '1', unit: 'tsp' },
        { name: 'Chana Dal', quantity: '1', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '1', unit: 'sprig' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Peanuts', quantity: '2', unit: 'tbsp' },
        { name: 'Oil / Ghee', quantity: '2', unit: 'tbsp' },
        { name: 'Coriander Leaves', quantity: 'for garnish', unit: '' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],
    'Biryanis': [
        { name: 'Basmati Rice (aged)', quantity: '500', unit: 'g' },
        { name: 'Onions (thinly sliced)', quantity: '3', unit: 'large' },
        { name: 'Yogurt / Curd', quantity: '1', unit: 'cup' },
        { name: 'Ginger-Garlic Paste', quantity: '2', unit: 'tbsp' },
        { name: 'Green Chillies', quantity: '5', unit: 'nos' },
        { name: 'Mint Leaves', quantity: '1/2', unit: 'cup' },
        { name: 'Coriander Leaves', quantity: '1/2', unit: 'cup' },
        { name: 'Biryani Masala', quantity: '2', unit: 'tbsp' },
        { name: 'Ghee', quantity: '4', unit: 'tbsp' },
        { name: 'Saffron in Warm Milk', quantity: '2', unit: 'tbsp' },
        { name: 'Whole Spices (Bay Leaf, Cinnamon, Cardamom, Cloves)', quantity: 'as needed', unit: '' },
        { name: 'Oil', quantity: '3', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],
    'Curries': [
        { name: 'Onions (finely chopped)', quantity: '2', unit: 'medium' },
        { name: 'Tomatoes (chopped)', quantity: '2', unit: 'medium' },
        { name: 'Ginger-Garlic Paste', quantity: '1', unit: 'tbsp' },
        { name: 'Green Chillies', quantity: '3', unit: 'nos' },
        { name: 'Red Chilli Powder (Guntur)', quantity: '1.5', unit: 'tsp' },
        { name: 'Coriander Powder', quantity: '1', unit: 'tsp' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Cumin Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Mustard Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '1', unit: 'sprig' },
        { name: 'Coriander Leaves', quantity: '2', unit: 'tbsp' },
        { name: 'Oil', quantity: '3', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],
    'Dals': [
        { name: 'Toor Dal / Moong Dal', quantity: '1', unit: 'cup' },
        { name: 'Tomatoes (chopped)', quantity: '1', unit: 'medium' },
        { name: 'Green Chillies (slit)', quantity: '2', unit: 'nos' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Red Chilli Powder', quantity: '1', unit: 'tsp' },
        { name: 'Mustard Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Cumin Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Dry Red Chillies', quantity: '2', unit: 'nos' },
        { name: 'Curry Leaves', quantity: '1', unit: 'sprig' },
        { name: 'Asafoetida (Hing)', quantity: '1/4', unit: 'tsp' },
        { name: 'Ghee', quantity: '1', unit: 'tbsp' },
        { name: 'Coriander Leaves', quantity: '2', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],
    'Seafood': [
        { name: 'Fish / Prawns (cleaned)', quantity: '500', unit: 'g' },
        { name: 'Onions (chopped)', quantity: '2', unit: 'medium' },
        { name: 'Tomatoes (chopped)', quantity: '2', unit: 'medium' },
        { name: 'Ginger-Garlic Paste', quantity: '1.5', unit: 'tbsp' },
        { name: 'Green Chillies', quantity: '4', unit: 'nos' },
        { name: 'Red Chilli Powder', quantity: '2', unit: 'tsp' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Coriander Powder', quantity: '1', unit: 'tsp' },
        { name: 'Fenugreek Seeds', quantity: '1/2', unit: 'tsp' },
        { name: 'Mustard Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '2', unit: 'sprigs' },
        { name: 'Tamarind Paste', quantity: '1', unit: 'tbsp' },
        { name: 'Oil', quantity: '4', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],
    'Sweets': [
        { name: 'Sugar / Jaggery', quantity: '1', unit: 'cup' },
        { name: 'Ghee', quantity: '3', unit: 'tbsp' },
        { name: 'Cardamom Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Cashew Nuts (chopped)', quantity: '2', unit: 'tbsp' },
        { name: 'Raisins', quantity: '1', unit: 'tbsp' },
        { name: 'Rice Flour / Gram Flour', quantity: '1', unit: 'cup' },
        { name: 'Milk', quantity: '1/2', unit: 'cup' },
        { name: 'Coconut (grated)', quantity: '1/4', unit: 'cup' },
        { name: 'Salt', quantity: '1', unit: 'pinch' },
    ],
    'Chutneys': [
        { name: 'Fresh Coconut (grated)', quantity: '1/2', unit: 'cup' },
        { name: 'Roasted Chana Dal', quantity: '2', unit: 'tbsp' },
        { name: 'Green Chillies', quantity: '3', unit: 'nos' },
        { name: 'Ginger', quantity: '1/2', unit: 'inch' },
        { name: 'Garlic Cloves', quantity: '2', unit: 'nos' },
        { name: 'Tamarind', quantity: '1', unit: 'tsp' },
        { name: 'Mustard Seeds (for tempering)', quantity: '1', unit: 'tsp' },
        { name: 'Urad Dal (for tempering)', quantity: '1/2', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '6', unit: 'leaves' },
        { name: 'Oil', quantity: '1', unit: 'tsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],
    'Pickles': [
        { name: 'Raw Mango / Vegetables', quantity: '500', unit: 'g' },
        { name: 'Red Chilli Powder (Guntur)', quantity: '100', unit: 'g' },
        { name: 'Mustard Seed Powder', quantity: '50', unit: 'g' },
        { name: 'Fenugreek Seed Powder', quantity: '2', unit: 'tbsp' },
        { name: 'Sesame Oil', quantity: '200', unit: 'ml' },
        { name: 'Salt', quantity: '75', unit: 'g' },
        { name: 'Turmeric Powder', quantity: '1', unit: 'tsp' },
        { name: 'Garlic Cloves (optional)', quantity: '8', unit: 'nos' },
    ],
    'Street Food': [
        { name: 'Gram Flour / Besan', quantity: '1', unit: 'cup' },
        { name: 'Rice Flour', quantity: '1/4', unit: 'cup' },
        { name: 'Onion (chopped)', quantity: '1', unit: 'medium' },
        { name: 'Green Chillies (chopped)', quantity: '3', unit: 'nos' },
        { name: 'Red Chilli Powder', quantity: '1', unit: 'tsp' },
        { name: 'Cumin Seeds', quantity: '1/2', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '6', unit: 'leaves' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
        { name: 'Oil', quantity: 'for frying', unit: '' },
        { name: 'Water', quantity: 'as needed', unit: '' },
    ],
    'Festival Special': [
        { name: 'Rice Flour / Gram Flour', quantity: '1', unit: 'cup' },
        { name: 'Jaggery (grated)', quantity: '3/4', unit: 'cup' },
        { name: 'Ghee', quantity: '3', unit: 'tbsp' },
        { name: 'Cardamom Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Coconut (grated)', quantity: '1/4', unit: 'cup' },
        { name: 'Cashew Nuts', quantity: '8', unit: 'nos' },
        { name: 'Raisins', quantity: '1', unit: 'tbsp' },
        { name: 'Sesame Seeds', quantity: '1', unit: 'tbsp' },
        { name: 'Salt', quantity: '1', unit: 'pinch' },
    ],
    'Non-Vegetarian': [
        { name: 'Meat (Chicken/Mutton)', quantity: '500', unit: 'g' },
        { name: 'Onions (sliced)', quantity: '3', unit: 'medium' },
        { name: 'Tomatoes (chopped)', quantity: '2', unit: 'medium' },
        { name: 'Ginger-Garlic Paste', quantity: '2', unit: 'tbsp' },
        { name: 'Green Chillies', quantity: '4', unit: 'nos' },
        { name: 'Red Chilli Powder', quantity: '2', unit: 'tsp' },
        { name: 'Coriander Powder', quantity: '1', unit: 'tsp' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Garam Masala', quantity: '1/2', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '1', unit: 'sprig' },
        { name: 'Coriander Leaves', quantity: '2', unit: 'tbsp' },
        { name: 'Oil', quantity: '3', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],
    'Vegetarian': [
        { name: 'Mixed Vegetables', quantity: '300', unit: 'g' },
        { name: 'Onion (chopped)', quantity: '1', unit: 'medium' },
        { name: 'Tomatoes', quantity: '1', unit: 'medium' },
        { name: 'Green Chillies', quantity: '2', unit: 'nos' },
        { name: 'Red Chilli Powder', quantity: '1', unit: 'tsp' },
        { name: 'Turmeric Powder', quantity: '1/2', unit: 'tsp' },
        { name: 'Mustard Seeds', quantity: '1', unit: 'tsp' },
        { name: 'Cumin Seeds', quantity: '1/2', unit: 'tsp' },
        { name: 'Curry Leaves', quantity: '1', unit: 'sprig' },
        { name: 'Oil', quantity: '2', unit: 'tbsp' },
        { name: 'Coriander Leaves', quantity: '2', unit: 'tbsp' },
        { name: 'Salt', quantity: 'to taste', unit: '' },
    ],
};

async function updateAllRecipes() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const recipes = await Recipe.find({});
        console.log(`📝 Found ${recipes.length} recipes to update\n`);

        let exactMatch = 0;
        let categoryMatch = 0;

        for (const recipe of recipes) {
            // Try exact name match first
            let newIngredients = REAL_INGREDIENTS[recipe.name];

            if (newIngredients) {
                exactMatch++;
                console.log(`✅ Exact match: ${recipe.name}`);
            } else {
                // Try partial name match
                const nameKey = Object.keys(REAL_INGREDIENTS).find(key =>
                    recipe.name.toLowerCase().includes(key.toLowerCase()) ||
                    key.toLowerCase().includes(recipe.name.toLowerCase())
                );
                if (nameKey) {
                    newIngredients = REAL_INGREDIENTS[nameKey];
                    exactMatch++;
                    console.log(`🔄 Partial match: ${recipe.name} -> ${nameKey}`);
                } else {
                    // Category-based fallback
                    newIngredients = CATEGORY_INGREDIENTS[recipe.category] || CATEGORY_INGREDIENTS['Curries'];
                    categoryMatch++;
                    console.log(`📂 Category fallback: ${recipe.name} (${recipe.category})`);
                }
            }

            await Recipe.findByIdAndUpdate(recipe._id, {
                $set: { ingredients: newIngredients }
            });
        }

        console.log(`\n🎉 Done! Updated ${recipes.length} recipes`);
        console.log(`   ✅ ${exactMatch} exact/partial matches`);
        console.log(`   📂 ${categoryMatch} category-based fallbacks`);

        await mongoose.disconnect();
        console.log('📴 Disconnected from MongoDB');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

updateAllRecipes();
