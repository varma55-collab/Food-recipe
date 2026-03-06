const http = require('http');
http.get('http://localhost:5000/api/recipes?limit=200', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const j = JSON.parse(data);
        j.recipes.forEach(r => {
            console.log(`${r.name} | ${r.category} | veg:${r.isVegetarian}`);
        });
        console.log(`\nTotal: ${j.total}`);
    });
});
