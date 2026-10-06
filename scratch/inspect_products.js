import { getAllProductGroups } from '../src/data/productCatalogData.js';

const groups = getAllProductGroups();
console.log(`Loaded ${groups.length} groups:`);
let total = 0;
groups.forEach(g => {
  console.log(`- [${g.division}] ${g.name} (${g.categories?.length || 0} items)`);
  total += g.categories?.length || 0;
});
console.log(`Total items across groups: ${total}`);
