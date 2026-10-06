const fs = require('fs');

const content = fs.readFileSync('src/data/productCatalogData.js', 'utf8');

// Match all category definitions
const categories = [];
const catRegex = /{\s*id:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*materialName:\s*"([^"]+)",\s*grade:\s*"([^"]+)",\s*image:\s*([a-zA-Z0-9_]+)/g;

let match;
while ((match = catRegex.exec(content)) !== null) {
  categories.push({
    id: match[1],
    slug: match[2],
    name: match[3],
    materialName: match[4],
    grade: match[5],
    imageVar: match[6]
  });
}

console.log('Total categories extracted:', categories.length);

const byMaterial = {};
categories.forEach(c => {
  byMaterial[c.materialName] = (byMaterial[c.materialName] || 0) + 1;
});
console.log('By materialName:', byMaterial);

const bySlug = {};
categories.forEach(c => {
  bySlug[c.slug] = (bySlug[c.slug] || 0) + 1;
});
console.log('By slug:', bySlug);
