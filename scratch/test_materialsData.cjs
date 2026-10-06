const fs = require('fs');

let c = fs.readFileSync('src/data/materialsData.js', 'utf8');
c = c.replace(/import\s+img[A-Za-z0-9_]+\s+from\s+[^;]+;/g, 'var imgDummy = "dummy";');
c = c.replace(/image:\s*img[A-Za-z0-9_]+/g, 'image: "dummy"');
c = c.replace(/heroImage:\s*img[A-Za-z0-9_]+/g, 'heroImage: "dummy"');

// Mock PRODUCT_GROUPS
let catCode = fs.readFileSync('src/data/productCatalogData.js', 'utf8');
catCode = catCode.replace(/import\s+([a-zA-Z0-9_]+)\s+from\s+[^;]+;/g, 'var $1 = "dummy";').replace(/export\s+/g, '');

const fullScript = catCode + '\n' + c.replace(/import\s+{[^}]+}\s+from\s+['"][^'"]+['"];/g, '').replace(/export\s+/g, '') + `
return {
  getAllMaterials,
  getMaterialBySlug,
  getProductsByMaterial,
  getMaterialCategories,
  MATERIALS
};
`;

const fn = new Function(fullScript);
const api = fn();

console.log('Materials defined:', api.MATERIALS.length);
const all = api.getAllMaterials();
all.forEach(m => {
  console.log(`- ${m.name} (${m.slug}): ${m.productCount} products, Grade: ${m.grade}`);
  const cats = api.getMaterialCategories(m.slug);
  console.log(`  Categories (${cats.length}): ${cats.map(c => c.name + '(' + c.count + ')').join(', ')}`);
});
