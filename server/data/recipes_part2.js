// PART 2: Curries (20) + Dals (15) + Biryanis (10)
const r = (name, nameTelugu, cat, desc, img, cookTime, prepTime, servings, diff, spice, tags, isVeg, rating, ratingCount, featured = false) => ({
    name, nameTelugu, category: cat, description: desc,
    ingredients: [{ name: 'Main ingredient', quantity: '500', unit: 'g' }, { name: 'Onions', quantity: '2', unit: 'nos' }, { name: 'Tomatoes', quantity: '2', unit: 'nos' }, { name: 'Ginger-garlic paste', quantity: '1.5', unit: 'tbsp' }, { name: 'Red chilli powder', quantity: '2', unit: 'tsp' }, { name: 'Oil', quantity: '3', unit: 'tbsp' }, { name: 'Salt', quantity: 'to taste', unit: '' }],
    steps: [{ step: 1, title: 'Prepare', description: 'Marinate main ingredient with spices for 20 minutes.', duration: 20 }, { step: 2, title: 'Cook Base', description: 'Fry onions golden. Add ginger-garlic paste and tomatoes. Cook masala until oil separates.', duration: 15, tip: 'Don\'t rush the masala.' }, { step: 3, title: 'Finish', description: 'Add main ingredient. Cook until tender. Garnish and serve hot with rice or roti.', duration: 20 }],
    image: img, cookTime, prepTime, servings, difficulty: diff, spiceLevel: spice, tags, isVegetarian: isVeg, rating, ratingCount, featured
});

const IMG = {
    curry: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
    veg: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800',
    dal: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
    biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
    meat: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
    seafood: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
};

const part2 = [
    // CURRIES
    r('Gutti Vankaya Kura', 'గుత్తి వంకాయ కూర', 'Curries', 'Stuffed baby brinjal in peanut-sesame masala gravy — Andhra\'s most celebrated vegetarian dish.', IMG.veg, 45, 20, 4, 'Medium', 'Spicy', ['brinjal', 'stuffed', 'curry'], true, 4.7, 312, true),
    r('Bendakaya Kura', 'బెండకాయ కూర', 'Curries', 'Crispy ladies finger (okra) stir-fry with onions and spices — a simple everyday Andhra sabzi.', IMG.veg, 20, 10, 3, 'Easy', 'Medium', ['okra', 'stir-fry', 'everyday'], true, 4.3, 178, false),
    r('Aratikaya Kura', 'అరటికాయ కూర', 'Curries', 'Raw banana curry with mustard and spices — earthy, satisfying and uniquely Andhra.', IMG.veg, 30, 10, 3, 'Easy', 'Medium', ['banana', 'curry', 'traditional'], true, 4.2, 134, false),
    r('Dondakaya Kura', 'దొండకాయ కూర', 'Curries', 'Tindora (ivy gourd) stir-fry with chilli and spices — crunchy and delicious.', IMG.veg, 25, 10, 3, 'Easy', 'Medium', ['tindora', 'stir-fry'], true, 4.1, 98, false),
    r('Sorakaya Kura', 'సొరకాయ కూర', 'Curries', 'Bottle gourd curry with mild spices and chana dal — light and nourishing.', IMG.veg, 30, 10, 4, 'Easy', 'Mild', ['bottle gourd', 'light', 'healthy'], true, 4.0, 78, false),
    r('Munakkada Kura', 'మునక్కాడ కూర', 'Curries', 'Drumstick curry cooked in coconut and spice base — rich and nutritious.', IMG.veg, 35, 15, 3, 'Easy', 'Medium', ['drumstick', 'coconut', 'curry'], true, 4.2, 112, false),
    r('Pesara Pappu Kura', 'పెసర పప్పు కూర', 'Curries', 'Whole moong dal curry with tempering — protein-rich, satisfying and very traditional.', IMG.dal, 40, 10, 4, 'Easy', 'Mild', ['moong', 'dal', 'curry'], true, 4.3, 134, false),
    r('Majjiga Pulusu', 'మజ్జిగ పులుసు', 'Curries', 'Andhra buttermilk curry with vegetables — tangy, light and perfect for summer.', IMG.veg, 25, 10, 4, 'Easy', 'Mild', ['buttermilk', 'tangy', 'summer'], true, 4.5, 189, false),
    r('Chamagadda Kura', 'చామగడ్డ కూర', 'Curries', 'Colocasia (taro root) curry in spicy Andhra masala with tamarind.', IMG.veg, 40, 15, 4, 'Medium', 'Spicy', ['taro', 'spicy', 'traditional'], true, 4.3, 145, false),
    r('Allam Pachadi Kura', 'అల్లం పచ్చడి కూర', 'Curries', 'Ginger-based gravy with vegetables — warming, aromatic and digestive.', IMG.veg, 30, 10, 3, 'Easy', 'Medium', ['ginger', 'aromatic', 'gravy'], true, 4.2, 89, false),
    r('Kodi Kura', 'కోడి కూర', 'Curries', 'Classic Andhra chicken curry with fiery red gravy — bold, deep and utterly satisfying.', IMG.meat, 55, 20, 4, 'Medium', 'Spicy', ['chicken', 'spicy', 'gravy'], false, 4.8, 512, true),
    r('Mamsam Kura', 'మాంసం కూర', 'Curries', 'Village-style mutton curry cooked slow on wood fire — intense flavors and fall-off-the-bone tenderness.', IMG.meat, 90, 30, 4, 'Hard', 'Very Spicy', ['mutton', 'slow cook', 'village'], false, 4.9, 398, true),
    r('Eggurusala', 'ఎగ్గురుసాల', 'Curries', 'Andhra-style egg curry cooked in onion-tomato masala — spicy, comforting and quick.', IMG.meat, 25, 10, 3, 'Easy', 'Spicy', ['egg', 'curry', 'quick'], false, 4.6, 234, false),
    r('Prawn Masala', 'రొయ్యల మసాలా', 'Curries', 'Dry prawn masala with curry leaves and coconut — coastal Andhra at its best.', IMG.seafood, 30, 20, 3, 'Medium', 'Spicy', ['prawn', 'coastal', 'dry curry'], false, 4.7, 198, false),
    r('Karivepaku Kodi', 'కరివేపాకు కోడి', 'Curries', 'Chicken cooked with fresh curry leaves and green chillies — intensely aromatic.', IMG.meat, 45, 20, 4, 'Medium', 'Spicy', ['chicken', 'curry leaves', 'green'], false, 4.6, 156, false),
    r('Natukodi Kura', 'నాటుకోడి కూర', 'Curries', 'Country chicken (village breed) slow-cooked curry — the king of Andhra non-veg dishes.', IMG.meat, 90, 30, 4, 'Hard', 'Very Spicy', ['country chicken', 'village style', 'authentic'], false, 4.9, 445, true),
    r('Keema Kura', 'కీమా కూర', 'Curries', 'Minced meat cooked with whole spices and peas — spicy Andhra mince curry.', IMG.meat, 35, 15, 4, 'Medium', 'Spicy', ['keema', 'minced meat', 'spicy'], false, 4.5, 178, false),
    r('Liver Fry', 'కాలేజీ ఫ్రై', 'Curries', 'Andhra-style mutton liver stir-fry with spices — bold flavors for adventurous palates.', IMG.meat, 25, 10, 3, 'Medium', 'Very Spicy', ['liver', 'fry', 'spicy'], false, 4.4, 134, false),
    r('Kodi Vepudu', 'కోడి వేపుడు', 'Curries', 'Andhra chicken stir-fry (dry) with curry leaves — crispy, spiced and irresistible.', IMG.meat, 35, 20, 3, 'Medium', 'Spicy', ['chicken', 'dry fry', 'appetizer'], false, 4.7, 267, false),
    r('Pesarattu Kura', 'పెసరట్టు కూర', 'Curries', 'Moong raw curry with special Andhra masala paired with roti and rice.', IMG.dal, 40, 15, 4, 'Easy', 'Medium', ['moong', 'curry'], true, 4.2, 89, false),

    // DALS
    r('Pappu Charu', 'పప్పు చారు', 'Dals', 'Soul of Andhra — tamarind lentil soup with drumstick and tomatoes. The ultimate comfort.', IMG.dal, 40, 15, 4, 'Easy', 'Medium', ['dal', 'rasam', 'comfort', 'everyday'], true, 4.8, 445, true),
    r('Tomato Pappu', 'టమాటా పప్పు', 'Dals', 'Toor dal cooked with fresh tomatoes and tempered with ghee — a simple, loved Andhra dal.', IMG.dal, 30, 5, 4, 'Easy', 'Medium', ['dal', 'tomato', 'everyday'], true, 4.7, 389, false),
    r('Gongura Pappu', 'గొంగూర పప్పు', 'Dals', 'Sour gongura leaves cooked with toor dal — unique, tangy dal found only in Andhra homes.', IMG.dal, 35, 10, 4, 'Easy', 'Spicy', ['dal', 'gongura', 'tangy'], true, 4.8, 312, true),
    r('Palakura Pappu', 'పాలకూర పప్పు', 'Dals', 'Spinach toor dal — nutritious, green and lightly spiced. A staple Andhra dal.', IMG.dal, 30, 10, 4, 'Easy', 'Mild', ['dal', 'spinach', 'healthy'], true, 4.5, 234, false),
    r('Dosakaya Pappu', 'దోసకాయ పప్పు', 'Dals', 'Yellow cucumber dal — refreshing, light and a unique Andhra favorite.', IMG.dal, 35, 10, 4, 'Easy', 'Mild', ['dal', 'cucumber', 'light'], true, 4.6, 178, false),
    r('Mudha Pappu', 'ముద్ద పప్పు', 'Dals', 'Thick pressure-cooked toor dal mashed with ghee — simple, pure and deeply satisfying.', IMG.dal, 20, 5, 4, 'Easy', 'Mild', ['dal', 'thick', 'ghee'], true, 4.6, 267, false),
    r('Kandipappu Charu', 'కంది పప్పు చారు', 'Dals', 'Classic toor dal rasam with pepper and tamarind — thin, tangy and deeply warming.', IMG.dal, 35, 10, 4, 'Easy', 'Medium', ['dal', 'rasam', 'pepper'], true, 4.7, 312, false),
    r('Pesara Pappu', 'పెసర పప్పు', 'Dals', 'Yellow moong dal with light seasoning — easy to digest and loved across all ages.', IMG.dal, 25, 5, 4, 'Easy', 'Mild', ['moong', 'light', 'healthy'], true, 4.5, 198, false),
    r('Chana Dal Kura', 'శనగ పప్పు కూర', 'Dals', 'Chana dal cooked with coconut and spices — thick, rich and satisfying.', IMG.dal, 40, 15, 4, 'Easy', 'Medium', ['chana dal', 'coconut'], true, 4.4, 145, false),
    r('Anapa Pappu', 'అనప పప్పు', 'Dals', 'Bottle gourd cooked with toor dal — humble, nourishing and homely Andhra dal.', IMG.dal, 35, 10, 4, 'Easy', 'Mild', ['dal', 'bottle gourd', 'simple'], true, 4.3, 112, false),
    r('Senagapappu Charu', 'శనగపప్పు చారు', 'Dals', 'Andhra chana dal rasam with tamarind and spices — rich and flavorful soup.', IMG.dal, 40, 10, 4, 'Easy', 'Medium', ['chana', 'rasam', 'andhra'], true, 4.4, 89, false),
    r('Menthi Pappu', 'మేంథి పప్పు', 'Dals', 'Bitter fenugreek leaves dal — nutritious, slightly bitter and a classic Andhra comfort.', IMG.dal, 30, 10, 4, 'Easy', 'Medium', ['fenugreek', 'bitter', 'healthy'], true, 4.3, 134, false),
    r('Allam Pappu', 'అల్లం పప్పు', 'Dals', 'Ginger-forward dal — warming, digestive and perfectly seasoned.', IMG.dal, 25, 5, 3, 'Easy', 'Medium', ['ginger', 'dal', 'digestive'], true, 4.3, 78, false),
    r('Vankayi Pappu', 'వంకాయ పప్పు', 'Dals', 'Brinjal and toor dal — classic Andhra combo that pairs perfectly with hot rice.', IMG.dal, 35, 10, 4, 'Easy', 'Medium', ['brinjal', 'dal', 'classic'], true, 4.5, 198, false),

    // BIRYANIS
    r('Kodi Biryani', 'కోడి బిర్యానీ', 'Biryanis', 'Andhra dum chicken biryani — fragrant basmati layered with spicy chicken and saffron.', IMG.biryani, 90, 60, 5, 'Hard', 'Spicy', ['biryani', 'chicken', 'dum'], false, 4.9, 687, true),
    r('Mamsam Biryani', 'మాంసం బిర్యానీ', 'Biryanis', 'Mutton biryani Andhra-style — fall-off-the-bone mutton with aromatic dum-cooked rice.', IMG.biryani, 120, 60, 5, 'Hard', 'Very Spicy', ['biryani', 'mutton', 'dum'], false, 4.9, 534, true),
    r('Royyala Biryani', 'రొయ్యల బిర్యానీ', 'Biryanis', 'Coastal Andhra prawn biryani — fresh prawns with fragrant spiced rice.', IMG.biryani, 60, 45, 4, 'Hard', 'Spicy', ['biryani', 'prawn', 'coastal'], false, 4.8, 312, true),
    r('Veg Biryani', 'వెజ్ బిర్యానీ', 'Biryanis', 'Mixed vegetable dum biryani with whole spices and saffron — fragrant and festive.', IMG.biryani, 60, 30, 4, 'Medium', 'Medium', ['biryani', 'vegetarian', 'dum'], true, 4.5, 234, false),
    r('Egg Biryani', 'గుడ్డు బిర్యానీ', 'Biryanis', 'Spiced egg biryani layered with whole boiled eggs in aromatic rice.', IMG.biryani, 50, 30, 4, 'Medium', 'Medium', ['biryani', 'egg', 'layered'], false, 4.6, 267, false),
    r('Kheema Biryani', 'కీమా బిర్యానీ', 'Biryanis', 'Minced meat biryani — aromatic rice cooked with spiced minced mutton.', IMG.biryani, 60, 30, 4, 'Medium', 'Spicy', ['biryani', 'keema', 'minced'], false, 4.7, 198, false),
    r('Mushroom Biryani', 'పుట్టగొడుగుల బిర్యానీ', 'Biryanis', 'Earthy mushroom biryani with saffron and whole spices — vegetarian luxury.', IMG.biryani, 45, 20, 3, 'Medium', 'Medium', ['biryani', 'mushroom', 'vegetarian'], true, 4.4, 145, false),
    r('Paneer Biryani', 'పనీర్ బిర్యానీ', 'Biryanis', 'Soft paneer cubes layered in spiced basmati rice — rich, indulgent vegetarian biryani.', IMG.biryani, 50, 20, 4, 'Medium', 'Medium', ['biryani', 'paneer', 'rich'], true, 4.5, 178, false),
    r('Fish Biryani', 'చేప బిర్యానీ', 'Biryanis', 'Andhra fish biryani with marinated fish fillets in aromatic rice.', IMG.biryani, 60, 30, 4, 'Hard', 'Spicy', ['biryani', 'fish', 'coastal'], false, 4.7, 156, false),
    r('Crab Biryani', 'పీత బిర్యానీ', 'Biryanis', 'Coastal Andhra crab biryani — intensely flavored and a true seafood lover\'s delight.', IMG.biryani, 75, 45, 3, 'Expert', 'Very Spicy', ['biryani', 'crab', 'coastal', 'special'], false, 4.8, 112, true),
];

module.exports = part2;
