const http = require('http');
http.get('http://localhost:5000/api/recipes?limit=6', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const j = JSON.parse(data);
        j.recipes.forEach(r => {
            console.log(`\n=== ${r.name} (${r.category}) ===`);
            (r.ingredients || []).forEach(ing => {
                console.log(`  - ${ing.name}: ${ing.quantity} ${ing.unit || ''}`);
            });
        });
    });
});
