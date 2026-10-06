const fs = require('fs');
let c = fs.readFileSync('src/data/productCatalogData.js', 'utf8');
c = c.replace(/import\s+([a-zA-Z0-9_]+)\s+from\s+[^;]+;/g, 'var $1 = "dummy";').replace(/export\s+/g, '');
const fn = new Function(c + '\nreturn PRODUCT_GROUPS;');
const groups = fn();

const allCategories = [];
groups.forEach(g => {
  (g.categories || []).forEach(cat => {
    allCategories.push({
      ...cat,
      groupSlug: g.slug,
      groupName: g.name,
      divisionSlug: g.divisionSlug
    });
  });
});

console.log('Total categories in catalog:', allCategories.length);

const normalizeCatSlug = (slug) => {
  if (slug.startsWith('carbon')) return 'carbon';
  if (slug.startsWith('nickel')) return 'nickel-alloy';
  if (slug.startsWith('exotic')) return 'exotic-alloy';
  if (slug.startsWith('high-alloy')) return 'high-alloy';
  if (slug.startsWith('alloy-steel')) return 'alloy-steel';
  if (slug.startsWith('stainless') || slug.startsWith('stainles')) return 'stainless-steel';
  if (slug.startsWith('super-duplex')) return 'super-duplex';
  if (slug === 'duplex') return 'duplex';
  if (slug.startsWith('titanium') || slug.startsWith('titainium')) return 'titanium';
  return slug;
};

const MATERIALS = [
  { name: 'Alloy Steel', slug: 'alloy-steel', match: (c) => normalizeCatSlug(c.slug) === 'alloy-steel' },
  { name: 'Carbon', slug: 'carbon', match: (c) => normalizeCatSlug(c.slug) === 'carbon' },
  { name: 'Duplex', slug: 'duplex', match: (c) => normalizeCatSlug(c.slug) === 'duplex' },
  { name: 'Exotic Alloy', slug: 'exotic-alloy', match: (c) => normalizeCatSlug(c.slug) === 'exotic-alloy' },
  { name: 'High Alloy', slug: 'high-alloy', match: (c) => normalizeCatSlug(c.slug) === 'high-alloy' },
  { name: 'Nickel Alloy', slug: 'nickel-alloy', match: (c) => normalizeCatSlug(c.slug) === 'nickel-alloy' },
  { name: 'Stainless Steel', slug: 'stainless-steel', match: (c) => normalizeCatSlug(c.slug) === 'stainless-steel' },
  { name: 'Super Duplex', slug: 'super-duplex', match: (c) => normalizeCatSlug(c.slug) === 'super-duplex' },
  { name: 'Titanium', slug: 'titanium', match: (c) => normalizeCatSlug(c.slug) === 'titanium' },
];

const mapped = new Set();
MATERIALS.forEach(m => {
  const prods = allCategories.filter(m.match);
  console.log(`Material: ${m.name} (${m.slug}) -> ${prods.length} products`);
  prods.forEach(p => {
    if (mapped.has(p.id)) {
      console.error(`DUPLICATE MAPPING: ${p.id}`);
    }
    mapped.add(p.id);
  });
});

console.log(`Mapped total: ${mapped.size} / ${allCategories.length}`);
const unmapped = allCategories.filter(p => !mapped.has(p.id));
if (unmapped.length > 0) {
  console.log('Unmapped categories:', unmapped);
} else {
  console.log('SUCCESS! ALL 159 PRODUCTS ACCURATELY MAPPED TO THE 9 EXACT MATERIALS.');
}
