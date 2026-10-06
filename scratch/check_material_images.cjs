const fs = require('fs');

const content = fs.readFileSync('src/data/productCatalogData.js', 'utf8');

// Match imports
const imports = {};
const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+["'](\.\.\/assets\/[^"']+)["']/g;
let m;
while ((m = importRegex.exec(content)) !== null) {
  imports[m[1]] = m[2];
}

// Find categories with their imageVar and materialName
const catRegex = /{\s*id:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*materialName:\s*"([^"]+)",\s*grade:\s*"([^"]+)",\s*image:\s*([a-zA-Z0-9_]+)/g;
const samples = {};
while ((m = catRegex.exec(content)) !== null) {
  const mat = m[4];
  if (!samples[mat]) samples[mat] = [];
  samples[mat].push({
    name: m[3],
    imageVar: m[6],
    imagePath: imports[m[6]]
  });
}

console.log(JSON.stringify(samples, null, 2));
