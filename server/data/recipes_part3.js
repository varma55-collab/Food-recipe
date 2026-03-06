// PART 3: Seafood (15) + Sweets (15) + Chutneys (12) + Pickles (8) + Street Food (15) + Non-Veg specials (10)
const r = (name, nameTelugu, cat, desc, img, cookTime, prepTime, servings, diff, spice, tags, isVeg, rating, ratingCount, featured = false) => ({
    name, nameTelugu, category: cat, description: desc,
    ingredients: [{ name: 'Main ingredient', quantity: '500', unit: 'g' }, { name: 'Onions', quantity: '2', unit: 'nos' }, { name: 'Spices', quantity: 'as needed', unit: '' }, { name: 'Oil', quantity: '3', unit: 'tbsp' }, { name: 'Salt', quantity: 'to taste', unit: '' }],
    steps: [{ step: 1, title: 'Prepare', description: 'Clean and prep the main ingredient.', duration: 15 }, { step: 2, title: 'Cook Masala', description: 'Heat oil, add onions and cook golden. Add spices and cook until aromatic.', duration: 15, tip: 'Build layers of flavor slowly.' }, { step: 3, title: 'Combine & Finish', description: 'Add main ingredient, cook thoroughly. Adjust seasoning and serve hot.', duration: 20 }],
    image: img, cookTime, prepTime, servings, difficulty: diff, spiceLevel: spice, tags, isVegetarian: isVeg, rating, ratingCount, featured
});

const IMG = {
    seafood: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
    sweet: 'https://images.unsplash.com/photo-1598214886806-c5b6f76e8cc8?w=800',
    chutney: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800',
    pickle: 'https://images.unsplash.com/photo-1593967943279-12c20e1de10c?w=800',
    street: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
    meat: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
};

const part3 = [
    // SEAFOOD
    r('Royyala Iguru', 'రొయ్యల ఇగురు', 'Seafood', 'Andhra prawn masala — fresh prawns in a fiery, rich onion-tomato gravy.', IMG.seafood, 40, 20, 3, 'Medium', 'Spicy', ['prawn', 'masala', 'coastal'], false, 4.8, 278, true),
    r('Chepala Pulusu', 'చేపల పులుసు', 'Seafood', 'Andhra tamarind fish curry — sweet, sour and spicy all at once. A coastal classic.', IMG.seafood, 35, 15, 4, 'Medium', 'Spicy', ['fish', 'curry', 'tamarind', 'coastal'], false, 4.9, 423, true),
    r('Karivepaku Fish Fry', 'కరివేపాకు చేప ఫ్రై', 'Seafood', 'Fish fillets fried with curry leaves paste — crispy, aromatic and utterly delicious.', IMG.seafood, 25, 20, 3, 'Easy', 'Spicy', ['fish', 'fry', 'curry leaves'], false, 4.7, 234, false),
    r('Royyala Vepudu', 'రొయ్యల వేపుడు', 'Seafood', 'Dry spiced prawn stir-fry with pepper and curry leaves — an irresistible starter.', IMG.seafood, 25, 15, 3, 'Easy', 'Spicy', ['prawn', 'dry fry', 'starter'], false, 4.7, 189, false),
    r('Nalla Roti Fish Curry', 'నల్ల రొటీ చేప కూర', 'Seafood', 'Black stone flower fish curry — deep, complex spiced gravy unique to coastal Andhra.', IMG.seafood, 45, 20, 4, 'Hard', 'Very Spicy', ['fish', 'black stone flower', 'coastal'], false, 4.8, 145, true),
    r('Chepala Vepudu', 'చేపల వేపుడు', 'Seafood', 'Crispy fried spiced fish — a must-have starter at every Andhra feast.', IMG.seafood, 20, 15, 3, 'Easy', 'Spicy', ['fish', 'fry', 'starter'], false, 4.7, 312, false),
    r('Crab Masala / Peetala Kura', 'పీతల కూర', 'Seafood', 'Andhra crab curry in rich spiced coconut gravy — messy, bold and incredible.', IMG.seafood, 50, 30, 3, 'Hard', 'Very Spicy', ['crab', 'coconut', 'coastal'], false, 4.9, 201, true),
    r('Squid Masala', 'స్క్విడ్ మసాలా', 'Seafood', 'Coastal Andhra squid in spiced masala — tender, chewy and deeply flavorful.', IMG.seafood, 30, 20, 3, 'Medium', 'Spicy', ['squid', 'coastal', 'masala'], false, 4.6, 112, false),
    r('Lobster Masala', 'లాబ్స్టర్ మసాలా', 'Seafood', 'Luxury coastal Andhra lobster in aromatic red masala.', IMG.seafood, 45, 30, 2, 'Expert', 'Spicy', ['lobster', 'luxury', 'coastal'], false, 4.8, 89, true),
    r('Chepala Biryani', 'చేపల బిర్యానీ', 'Seafood', 'Coastal fish layered into fragrant biryani — a rare and spectacular treat.', IMG.seafood, 75, 45, 4, 'Hard', 'Spicy', ['fish', 'biryani', 'coastal'], false, 4.7, 156, false),
    r('Nalla Karam Royyalu', 'నల్లా కారం రొయ్యలు', 'Seafood', 'Blackened spiced prawns — charred edges and deep smoky flavor.', IMG.seafood, 20, 15, 3, 'Easy', 'Very Spicy', ['prawn', 'blackened', 'smoky'], false, 4.6, 134, false),
    r('Meen Kozhambu', 'మీన్ కొళంబు', 'Seafood', 'Tamil-Andhra border fish gravy — tamarind-based bold fish curry with coconut.', IMG.seafood, 40, 15, 4, 'Medium', 'Spicy', ['fish', 'tamarind', 'coconut'], false, 4.7, 178, false),
    r('Baby Shrimp Fry', 'చిన్న రొయ్యల ఫ్రై', 'Seafood', 'Tiny shrimp fried crispy with chilli and lemon — the best drinking snack from coastal Andhra.', IMG.seafood, 20, 10, 3, 'Easy', 'Spicy', ['shrimp', 'crispy', 'snack'], false, 4.6, 145, false),
    r('Fish Pakora', 'చేప పకోడా', 'Seafood', 'Batter-fried fish fritters with Andhra spicing — crispy coating, juicy fish inside.', IMG.seafood, 20, 15, 4, 'Easy', 'Medium', ['fish', 'pakora', 'fried'], false, 4.5, 167, false),
    r('Ennai Kathrikai', 'ఎన్నై కత్తరికాయ', 'Seafood', 'Oil-roasted baby brinjal with prawn stuffing — rich and complex coastal prepration.', IMG.seafood, 40, 20, 3, 'Hard', 'Spicy', ['brinjal', 'prawn', 'coastal', 'stuffed'], false, 4.7, 112, false),

    // SWEETS
    r('Bobbatlu / Puran Poli', 'బొబ్బట్లు', 'Sweets', 'Andhra festival sweet flatbread stuffed with jaggery and chana dal — heavenly.', IMG.sweet, 45, 70, 12, 'Medium', 'Mild', ['sweet', 'festival', 'flatbread'], true, 4.8, 312, true),
    r('Pala Thalikalu', 'పాల తాళికలు', 'Sweets', 'Rice flour drops cooked in sweetened milk — a delicate and festive Andhra dessert.', IMG.sweet, 30, 15, 4, 'Easy', 'Mild', ['sweet', 'milk', 'festival'], true, 4.5, 178, false),
    r('Rava Kesari', 'రవ కేసరి', 'Sweets', 'Semolina halwa with saffron and ghee — glowing orange, rich and fragrant.', IMG.sweet, 20, 10, 4, 'Easy', 'Mild', ['sweet', 'semolina', 'halwa'], true, 4.6, 265, false),
    r('Payasam / Kheer', 'పాయసం', 'Sweets', 'Andhra rice payasam with jaggery and coconut milk — festival sweetness in a bowl.', IMG.sweet, 40, 10, 4, 'Easy', 'Mild', ['sweet', 'payasam', 'festival', 'milk'], true, 4.7, 312, true),
    r('Ariselu', 'అరిసెలు', 'Sweets', 'Deep-fried jaggery rice discs with sesame — a traditional Andhra sweet for festivals.', IMG.sweet, 30, 15, 15, 'Medium', 'Mild', ['sweet', 'fried', 'festival', 'sesame'], true, 4.6, 189, false),
    r('Gavvalu', 'గవ్వలు', 'Sweets', 'Shell-shaped fried sweet dumplings — pretty, crispy and mildly sweet.', IMG.sweet, 30, 30, 20, 'Medium', 'Mild', ['sweet', 'fried', 'traditional'], true, 4.4, 134, false),
    r('Chakki Pongali', 'చక్కి పొంగలి', 'Sweets', 'Sweet jaggery pongal with coconut and ghee — temple prasad that\'s pure comfort.', IMG.sweet, 30, 10, 4, 'Easy', 'Mild', ['sweet', 'pongal', 'temple', 'jaggery'], true, 4.6, 201, false),
    r('Boorelu', 'బూరెలు', 'Sweets', 'Fried coconut-jaggery stuffed sweet puffs dipped in urad batter — a Ugadi specialty.', IMG.sweet, 40, 45, 10, 'Hard', 'Mild', ['sweet', 'fried', 'ugadi', 'festival'], true, 4.7, 156, true),
    r('Kobbari Mithai', 'కొబ్బరి మిఠాయి', 'Sweets', 'Fresh coconut burfi with jaggery — simple, natural and divinely sweet.', IMG.sweet, 20, 10, 16, 'Easy', 'Mild', ['sweet', 'coconut', 'burfi'], true, 4.5, 198, false),
    r('Undrallu', 'ఉండ్రాళ్లు', 'Sweets', 'Steamed rice flour balls with jaggery — offered to Lord Ganesha on Vinayaka Chaturthi.', IMG.sweet, 25, 15, 12, 'Easy', 'Mild', ['sweet', 'steamed', 'ganesh', 'festival'], true, 4.4, 145, false),
    r('Garelu Sweet', 'గారెలు స్వీట్', 'Sweets', 'Sweet urad vadas dipped in jaggery syrup — a less-known Andhra sweet treat.', IMG.sweet, 35, 30, 12, 'Medium', 'Mild', ['sweet', 'vada', 'jaggery'], true, 4.3, 89, false),
    r('Pesara Pappu Halwa', 'పెసర పప్పు హల్వా', 'Sweets', 'Moong dal halwa with ghee and cardamom — rich, nutritious and indulgent.', IMG.sweet, 45, 15, 6, 'Medium', 'Mild', ['sweet', 'halwa', 'moong', 'ghee'], true, 4.5, 167, false),
    r('Thalikalu', 'తాళికాలు', 'Sweets', 'Star-shaped rice flour drops in sweetened milk — playful and traditional festival sweet.', IMG.sweet, 25, 15, 4, 'Easy', 'Mild', ['sweet', 'milk', 'festival', 'rice'], true, 4.4, 112, false),
    r('Nuvvula Laddu', 'నువ్వుల లడ్డు', 'Sweets', 'Sesame jaggery balls — crunchy, nutritious and traditionally offered during Sankranti.', IMG.sweet, 20, 10, 15, 'Easy', 'Mild', ['sweet', 'sesame', 'sankranti', 'laddu'], true, 4.6, 178, false),
    r('Bellam Pongali', 'బెల్లం పొంగలి', 'Sweets', 'Jaggery rice pongal cooked in earthen pot — sacred, warm and deeply traditional.', IMG.sweet, 30, 10, 4, 'Easy', 'Mild', ['sweet', 'pongal', 'jaggery', 'traditional'], true, 4.6, 234, false),

    // CHUTNEYS
    r('Gongura Pachadi', 'గొంగూర పచ్చడి', 'Chutneys', 'Andhra\'s beloved sour sorrel chutney — intensely flavored and irreplaceable.', IMG.chutney, 15, 10, 6, 'Easy', 'Spicy', ['chutney', 'gongura', 'sour', 'iconic'], true, 4.9, 312, true),
    r('Kobbari Pachadi', 'కొబ్బరి పచ్చడి', 'Chutneys', 'Creamy fresh coconut chutney with tempered mustard — perfect with idli and dosa.', IMG.chutney, 10, 5, 4, 'Easy', 'Mild', ['chutney', 'coconut', 'breakfast'], true, 4.7, 267, false),
    r('Allam Pachadi', 'అల్లం పచ్చడి', 'Chutneys', 'Spicy ginger chutney — the traditional accompaniment for pesarattu.', IMG.chutney, 10, 5, 4, 'Easy', 'Spicy', ['chutney', 'ginger', 'pesarattu'], true, 4.7, 198, true),
    r('Pachi Pulusu', 'పచ్చి పులుసు', 'Chutneys', 'Raw tamarind and onion chutney — no cooking, just pure punchy flavors.', IMG.chutney, 5, 5, 4, 'Easy', 'Spicy', ['chutney', 'raw', 'tamarind'], true, 4.5, 134, false),
    r('Tomato Pachadi', 'టమాటా పచ్చడి', 'Chutneys', 'Roasted tomato chutney — charred, smoky and deeply flavorful.', IMG.chutney, 15, 5, 4, 'Easy', 'Medium', ['chutney', 'tomato', 'roasted'], true, 4.6, 189, false),
    r('Peanut Chutney / Verusenaga Pachadi', 'వేరుశనగ పచ్చడి', 'Chutneys', 'Roasted peanut chutney — creamy, nutty and perfect with idli-dosa.', IMG.chutney, 10, 5, 4, 'Easy', 'Medium', ['chutney', 'peanut', 'breakfast'], true, 4.7, 234, false),
    r('Curry Leaves Chutney', 'కరివేపాకు పచ్చడి', 'Chutneys', 'Fresh curry leaves pounded into a pungent spicy chutney — incredibly aromatic.', IMG.chutney, 10, 5, 4, 'Easy', 'Spicy', ['chutney', 'curry leaves', 'aromatic'], true, 4.5, 112, false),
    r('Raw Mango Chutney', 'పచ్చి మామిడి పచ్చడి', 'Chutneys', 'Green raw mango chutney — sour, spicy and totally addictive.', IMG.chutney, 10, 5, 4, 'Easy', 'Spicy', ['chutney', 'mango', 'sour', 'raw'], true, 4.6, 156, false),
    r('Garlic Chutney / Vellulli Pachadi', 'వెల్లుల్లి పచ్చడి', 'Chutneys', 'Raw garlic pounded with chillies and tamarind — pungent, bold and unforgettable.', IMG.chutney, 10, 5, 4, 'Easy', 'Very Spicy', ['chutney', 'garlic', 'bold', 'spicy'], true, 4.6, 145, false),
    r('Mint Chutney / Pudina Pachadi', 'పుదీన పచ్చడి', 'Chutneys', 'Fresh green mint coriander chutney — cooling, bright and versatile.', IMG.chutney, 10, 5, 4, 'Easy', 'Medium', ['chutney', 'mint', 'green', 'cooling'], true, 4.5, 198, false),
    r('Red Chilli Chutney / Mirapakaya Pachadi', 'మిరపకాయ పచ్చడి', 'Chutneys', 'Pure red chilli chutney — fire in a bowl, the ultimate Andhra condiment.', IMG.chutney, 15, 5, 6, 'Easy', 'Very Spicy', ['chutney', 'chilli', 'fiery', 'condiment'], true, 4.7, 178, true),
    r('Sesame Chutney / Nuvvula Pachadi', 'నువ్వుల పచ్చడి', 'Chutneys', 'Roasted sesame chutney — nutty, slightly bitter and deeply satisfying.', IMG.chutney, 10, 5, 4, 'Easy', 'Medium', ['chutney', 'sesame', 'nutty'], true, 4.4, 112, false),

    // PICKLES
    r('Avakaya Pachadi', 'అవకాయ పచ్చడి', 'Pickles', 'World-famous Andhra raw mango pickle — fiery, salty and legendary.', IMG.pickle, 15, 30, 30, 'Medium', 'Very Spicy', ['pickle', 'mango', 'legendary', 'iconic'], true, 4.9, 534, true),
    r('Gongura Mamsam Pickle', 'గొంగూర మాంసం పచ్చడి', 'Pickles', 'Lamb pieces pickled in gongura and spices — a meaty Andhra specialty.', IMG.pickle, 30, 30, 20, 'Medium', 'Very Spicy', ['pickle', 'gongura', 'mutton'], false, 4.8, 234, true),
    r('Nimmakaya Pachadi', 'నిమ్మకాయ పచ్చడి', 'Pickles', 'Andhra lemon pickle — sharp, sour and intensely seasoned.', IMG.pickle, 5, 20, 20, 'Easy', 'Spicy', ['pickle', 'lemon', 'sour'], true, 4.6, 189, false),
    r('Royyala Pachadi', 'రొయ్యల పచ్చడి', 'Pickles', 'Andhra prawn pickle — deeply spiced preserved prawns, a coastal delicacy.', IMG.pickle, 20, 30, 20, 'Medium', 'Very Spicy', ['pickle', 'prawn', 'coastal', 'preserved'], false, 4.7, 156, true),
    r('Tomato Pickle / Tomato Pachadi', 'టమాటా పచ్చడి', 'Pickles', 'Andhra spiced tomato pickle — quick, tangy and great with anything.', IMG.pickle, 30, 10, 15, 'Easy', 'Spicy', ['pickle', 'tomato', 'quick'], true, 4.6, 201, false),
    r('Gongura Pickle', 'గొంగూర పచ్చడి పికిల్', 'Pickles', 'Andhra gongura preserved in oil and spices — the tangiest pickle you\'ll ever taste.', IMG.pickle, 15, 20, 20, 'Easy', 'Spicy', ['pickle', 'gongura', 'tangy'], true, 4.8, 267, true),
    r('Dosakaya Pickle', 'దోసకాయ పచ్చడి', 'Pickles', 'Yellow cucumber pickle — unusual, crunchy and distinctly Andhra.', IMG.pickle, 10, 15, 15, 'Easy', 'Spicy', ['pickle', 'cucumber', 'crunchy'], true, 4.4, 112, false),
    r('Mixed Vegetable Pickle', 'మిక్స్ వెజిటబుల్ పచ్చడి', 'Pickles', 'Andhra mixed vegetable pickle with mustard and fenugreek — bold and addictive.', IMG.pickle, 20, 30, 20, 'Medium', 'Spicy', ['pickle', 'mixed', 'vegetables'], true, 4.5, 145, false),

    // STREET FOOD
    r('Mirchi Bajji', 'మిర్చి బజ్జి', 'Street Food', 'Batter-fried large green chillies stuffed with tamarind — Andhra\'s most loved street snack.', IMG.street, 25, 15, 4, 'Easy', 'Spicy', ['street food', 'chilli', 'fried', 'iconic'], true, 4.9, 534, true),
    r('Punugulu', 'పునుగులు', 'Street Food', 'Deep-fried idli batter balls — hot, crispy and irresistible with ginger chutney.', IMG.street, 20, 5, 4, 'Easy', 'Mild', ['street food', 'fried', 'idli batter'], true, 4.6, 312, false),
    r('Bondalu', 'బొందలు', 'Street Food', 'Fried sweet boondi balls — crunchy little spheres of joy, loved by all ages.', IMG.street, 25, 15, 15, 'Easy', 'Mild', ['street food', 'sweet', 'fried', 'snack'], true, 4.5, 198, false),
    r('Pakodi / Bajji', 'పకోడి / బజ్జి', 'Street Food', 'Crispy vegetable fritters — onion, capsicum and potato fried in spiced chickpea batter.', IMG.street, 20, 10, 4, 'Easy', 'Medium', ['street food', 'fritters', 'crispy'], true, 4.6, 267, false),
    r('Karam Peanuts', 'కారం వేరుశనగలు', 'Street Food', 'Spicy roasted peanuts with red chilli and spices — the ultimate Andhra snack.', IMG.street, 15, 5, 4, 'Easy', 'Spicy', ['street food', 'peanuts', 'snack', 'spicy'], true, 4.5, 198, false),
    r('Gobi 65', 'గోబి 65', 'Street Food', 'Andhra-spiced crispy fried cauliflower — restaurant-style with curry leaves and green chillies.', IMG.street, 25, 15, 3, 'Easy', 'Spicy', ['street food', 'cauliflower', 'fried', '65'], true, 4.6, 234, false),
    r('Chicken 65', 'చికెన్ 65', 'Street Food', 'Iconic Andhra deep-fried chicken — marinated in spices, fried crispy, finished with curry leaves.', IMG.street, 30, 30, 3, 'Easy', 'Very Spicy', ['street food', 'chicken', 'iconic', 'fried'], false, 4.9, 687, true),
    r('Egg Bajji', 'గుడ్డు బజ్జి', 'Street Food', 'Boiled egg dipped in spiced batter and deep fried — a popular Andhra street snack.', IMG.street, 20, 10, 4, 'Easy', 'Spicy', ['street food', 'egg', 'fried', 'snack'], false, 4.5, 178, false),
    r('Sakinalu', 'సాకినాలు', 'Street Food', 'Rice flour crispy rings fried in sesame oil — a traditional Andhra Sankranti snack.', IMG.street, 30, 30, 20, 'Medium', 'Mild', ['street food', 'rice', 'crispy', 'sankranti'], true, 4.4, 134, false),
    r('Kaja', 'కాజా', 'Street Food', 'Multi-layered fried sweet pastry soaked in sugar syrup — a Kakinada specialty.', IMG.street, 40, 45, 12, 'Hard', 'Mild', ['street food', 'sweet', 'pastry', 'kakinada'], true, 4.7, 201, true),
    r('Janthikalu', 'జంతికాలు', 'Street Food', 'Andhra savory murukku-style fried snack — crunchy, spiced and addictive.', IMG.street, 30, 15, 15, 'Medium', 'Mild', ['street food', 'savory', 'crunchy', 'snack'], true, 4.5, 167, false),
    r('Aloo Bajji', 'అలూ బజ్జి', 'Street Food', 'Potato slices dipped in spiced chickpea batter and fried crispy.', IMG.street, 20, 10, 4, 'Easy', 'Medium', ['street food', 'potato', 'bajji', 'crispy'], true, 4.4, 189, false),
    r('Boiled Egg Masala', 'ఉడికిన గుడ్డు మసాలా', 'Street Food', 'Hard-boiled eggs tossed in spicy Andhra masala — quick, fiery and satisfying.', IMG.street, 15, 10, 2, 'Easy', 'Spicy', ['street food', 'egg', 'masala', 'quick'], false, 4.5, 145, false),
    r('Masala Vada', 'మసాలా వడ', 'Street Food', 'Crispy chana dal vadas with onion and chilli — perfect with chai.', IMG.street, 25, 30, 8, 'Medium', 'Medium', ['street food', 'vada', 'crispy', 'dal'], true, 4.7, 267, false),
    r('Murmura Chaat / Borugula Chaat', 'బొరుగుల చాట్', 'Street Food', 'Puffed rice chaat with tamarind, onion and spices — Andhra-style light street snack.', IMG.street, 5, 10, 3, 'Easy', 'Medium', ['street food', 'puffed rice', 'chaat', 'light'], true, 4.4, 156, false),

    // FESTIVAL SPECIAL
    r('Pesara Pappu Payasam', 'పెసర పప్పు పాయసం', 'Festival Special', 'Moong dal payasam with coconut milk and jaggery — a Dasara and Ugadi festival dessert.', IMG.sweet, 35, 10, 4, 'Easy', 'Mild', ['festival', 'sweet', 'payasam', 'moong'], true, 4.6, 167, true),
    r('Ugadi Pachadi', 'ఉగాది పచ్చడి', 'Festival Special', 'The iconic Ugadi dish — six tastes (sweet, sour, salty, bitter, spicy, astringent) in one bowl.', IMG.chutney, 10, 15, 4, 'Easy', 'Medium', ['festival', 'ugadi', 'symbolic', 'traditional'], true, 4.9, 412, true),
    r('Naivedyam Pulihora', 'నైవేద్యం పులిహోర', 'Festival Special', 'Temple prasad tamarind rice offered to deities — sacred and deeply traditional.', IMG.chutney, 30, 25, 6, 'Easy', 'Medium', ['festival', 'temple', 'sacred', 'tamarind'], true, 4.8, 289, true),
    r('Chalimidi', 'చలిమిడి', 'Festival Special', 'Sweet raw rice flour balls with coconut — offered to Lord Ganesha during Vinayaka Chaturthi.', IMG.sweet, 15, 15, 8, 'Easy', 'Mild', ['festival', 'ganesh', 'sweet', 'offering'], true, 4.5, 134, true),
    r('Kobbari Laddu', 'కొబ్బరి లడ్డు', 'Festival Special', 'Coconut jaggery laddu — a simple sweet offered during pujas and festivals.', IMG.sweet, 20, 15, 15, 'Easy', 'Mild', ['festival', 'laddu', 'coconut', 'puja'], true, 4.6, 198, false),
    r('Ksheerannam', 'క్షీరాన్నం', 'Festival Special', 'Sweet milk rice — rice cooked in thickened sweetened milk, a festival offering.', IMG.sweet, 45, 10, 4, 'Easy', 'Mild', ['festival', 'milk', 'sweet', 'rice'], true, 4.7, 156, true),
    r('Garelu / Festival Vada', 'గారెలు', 'Festival Special', 'Urad dal vadas made for Dasara and festivals — crispy outside, soft inside.', IMG.street, 25, 4 * 60, 12, 'Medium', 'Mild', ['festival', 'vada', 'dasara'], true, 4.7, 223, false),
    r('Poornam Boorelu', 'పూర్ణం బూరెలు', 'Festival Special', 'Stuffed jaggery-coconut sweet puffs fried in urad batter — a Diwali and Ugadi delicacy.', IMG.sweet, 45, 45, 10, 'Hard', 'Mild', ['festival', 'sweet', 'fried', 'ugadi'], true, 4.8, 178, true),
    r('Tambittu', 'తంబిట్టు', 'Festival Special', 'Roasted gram flour balls with ghee and jaggery — offered during Navaratri.', IMG.sweet, 15, 10, 10, 'Easy', 'Mild', ['festival', 'navaratri', 'sweet', 'gram'], true, 4.4, 89, false),
    r('Atla Tadde Special', 'అట్ల తద్దె స్పెషల్', 'Festival Special', 'Special dosas and chutneys made for Atla Tadde — women\'s harvest festival tradition.', IMG.chutney, 30, 15, 4, 'Easy', 'Mild', ['festival', 'atla tadde', 'women', 'tradition'], true, 4.5, 112, true),
];

module.exports = part3;
