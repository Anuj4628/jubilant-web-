const fs = require('fs');
const path = require('path');

// Read productCatalogData.js to extract all groups and categories
const catalogContent = fs.readFileSync(path.join(__dirname, '../src/data/productCatalogData.js'), 'utf8');

// Also extract materials
const materialsContent = fs.readFileSync(path.join(__dirname, '../src/data/materialsData.js'), 'utf8');

// Match groups
const groupRegex = /id:\s*["']([^"']+)["'],\s*slug:\s*["']([^"']+)["'],\s*name:\s*["']([^"']+)["'],\s*division:\s*["']([^"']+)["'],\s*divisionSlug:\s*["']([^"']+)["']/g;
const groups = [];
let gm;
while ((gm = groupRegex.exec(catalogContent)) !== null) {
  groups.push({
    id: gm[1],
    slug: gm[2],
    name: gm[3],
    division: gm[4],
    divisionSlug: gm[5]
  });
}

// Function to generate SEO slug matching seoHelper.js
function getLocationIntent(groupSlug, categorySlug, divisionSlug) {
  const g = String(groupSlug || '').toLowerCase();
  const c = String(categorySlug || '').toLowerCase();
  const d = String(divisionSlug || '').toLowerCase();

  const strictlyManufacturedGroups = [
    'butt-weld-fittings',
    'forged-fittings',
    'ferrule-fittings',
    'dairy-pharma-fittings',
    'hose-pipes',
    'wire-mesh',
    'perforated-sheets'
  ];

  if (strictlyManufacturedGroups.includes(g)) {
    return 'manufactured-in-mumbai';
  }

  const strictlyStockistGroups = [
    'sheet-and-plates',
    'coil',
    'flat',
    'circle',
    'ring',
    'patapatti',
    'wires'
  ];

  if (strictlyStockistGroups.includes(g)) {
    return 'stockist-in-mumbai';
  }

  const hash = (g + c).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  if (d === 'supplier') {
    if (hash % 3 === 0 && (g === 'pipes-tubes' || g === 'rods-and-bars')) {
      return 'manufactured-in-mumbai';
    }
    return 'stockist-in-mumbai';
  }

  return hash % 2 === 0 ? 'manufactured-in-mumbai' : 'stockist-in-mumbai';
}

function sanitizeSlug(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateProductSeoSlug(groupSlug, catSlug, grade, divisionSlug) {
  const intentSlug = getLocationIntent(groupSlug, catSlug, divisionSlug);

  let matPrefix = 'steel';
  if (catSlug.includes('stainless')) {
    matPrefix = 'stainless-steel-ss';
  } else if (catSlug.includes('carbon')) {
    matPrefix = 'carbon-steel';
  } else if (catSlug.includes('alloy-steel')) {
    matPrefix = 'alloy-steel';
  } else if (catSlug.includes('super-duplex')) {
    matPrefix = 'super-duplex-steel';
  } else if (catSlug.includes('duplex')) {
    matPrefix = 'duplex-steel';
  } else if (catSlug.includes('nickel')) {
    matPrefix = 'nickel-alloy';
  } else if (catSlug.includes('titanium')) {
    matPrefix = 'titanium-alloy';
  } else if (catSlug.includes('high-alloy')) {
    matPrefix = 'high-alloy';
  } else if (catSlug.includes('exotic')) {
    matPrefix = 'exotic-superalloy';
  }

  let gradePart = '';
  if (grade) {
    if (grade.includes('316') || grade.includes('316L')) {
      gradePart = '316l';
    } else if (grade.includes('304')) {
      gradePart = '304l';
    } else if (grade.includes('2205')) {
      gradePart = '2205';
    } else if (grade.includes('2507')) {
      gradePart = '2507';
    } else if (grade.includes('P11') || grade.includes('P22') || grade.includes('P91')) {
      gradePart = 'p11-p22-p91';
    } else if (grade.includes('A105') || grade.includes('WPB')) {
      gradePart = 'a105-wpb';
    } else if (grade.includes('Inconel') || grade.includes('Hastelloy') || grade.includes('Monel')) {
      gradePart = 'inconel-hastelloy';
    } else if (grade.includes('Grade 2') || grade.includes('Ti-6Al-4V')) {
      gradePart = 'grade-2-5';
    }
  }

  let productPart = sanitizeSlug(groupSlug);
  if (groupSlug === 'flanges' && matPrefix.includes('stainless')) {
    productPart = 'weld-neck-flanges';
  }

  const parts = [matPrefix, gradePart, productPart, intentSlug].filter(Boolean);
  const combined = parts.join('-');
  const deduped = combined
    .split('-')
    .filter((word, idx, arr) => word && (idx === 0 || word !== arr[idx - 1]))
    .join('-');

  return sanitizeSlug(deduped);
}

// Find all categories with their parent group
// We can parse PRODUCT_GROUPS by looking for categories arrays
const groupBlocks = catalogContent.split(/{\s*id:\s*["'](?:manufacturer|supplier)-/);
const productUrls = [];

for (const group of groups) {
  // Find block for this group
  const startIdx = catalogContent.indexOf(`id: "${group.id}"`);
  if (startIdx === -1) continue;
  
  // Find categories array inside
  const catRegex = /{\s*id:\s*["']([^"']+)["'],\s*slug:\s*["']([^"']+)["'],\s*name:\s*["']([^"']+)["'],\s*materialName:\s*["']([^"']+)["'],\s*grade:\s*["']([^"']+)["']/g;
  
  // Search within a 12000 char window after group definition
  const groupChunk = catalogContent.slice(startIdx, startIdx + 15000);
  let cm;
  while ((cm = catRegex.exec(groupChunk)) !== null) {
    // Only until next group
    if (cm.index > 0 && groupChunk.slice(0, cm.index).includes('id: "manufacturer-') && !groupChunk.slice(0, cm.index).startsWith('id: "' + group.id)) break;
    if (cm.index > 0 && groupChunk.slice(0, cm.index).includes('id: "supplier-') && !groupChunk.slice(0, cm.index).startsWith('id: "' + group.id)) break;

    const catSlug = cm[2];
    const catGrade = cm[5];
    const seoSlug = generateProductSeoSlug(group.slug, catSlug, catGrade, group.divisionSlug);
    productUrls.push({
      loc: `https://jubilantsteel.com/products/${group.slug}/${seoSlug}`,
      priority: '0.75',
      changefreq: 'weekly'
    });
  }
}

// Deduplicate product URLs
const uniqueProductUrls = [];
const seenLocs = new Set();
for (const p of productUrls) {
  if (!seenLocs.has(p.loc)) {
    seenLocs.add(p.loc);
    uniqueProductUrls.push(p);
  }
}

console.log('Extracted unique product detail URLs:', uniqueProductUrls.length);

const currentDate = new Date().toISOString().split('T')[0];

const staticUrls = [
  { loc: 'https://jubilantsteel.com/', priority: '1.0', changefreq: 'daily' },
  { loc: 'https://jubilantsteel.com/products', priority: '0.90', changefreq: 'weekly' },
  { loc: 'https://jubilantsteel.com/products/manufacturer', priority: '0.85', changefreq: 'weekly' },
  { loc: 'https://jubilantsteel.com/products/supplier', priority: '0.85', changefreq: 'weekly' },
  { loc: 'https://jubilantsteel.com/materials', priority: '0.90', changefreq: 'weekly' },
  { loc: 'https://jubilantsteel.com/about', priority: '0.80', changefreq: 'monthly' },
  { loc: 'https://jubilantsteel.com/certificate', priority: '0.80', changefreq: 'monthly' },
  { loc: 'https://jubilantsteel.com/contact', priority: '0.80', changefreq: 'monthly' },
  { loc: 'https://jubilantsteel.com/get-code', priority: '0.80', changefreq: 'monthly' },
  { loc: 'https://jubilantsteel.com/export-to', priority: '0.80', changefreq: 'monthly' }
];

const groupUrls = groups.map(g => ({
  loc: `https://jubilantsteel.com/products/${g.slug}`,
  priority: '0.80',
  changefreq: 'weekly'
}));

const materialSlugs = [
  'alloy-steel',
  'carbon',
  'duplex',
  'exotic-alloys',
  'high-alloys',
  'nickel-alloys',
  'stainless-steel',
  'super-duplex',
  'titanium'
];

const materialUrls = materialSlugs.map(slug => ({
  loc: `https://jubilantsteel.com/materials/${slug}`,
  priority: '0.80',
  changefreq: 'weekly'
}));

const allUrls = [...staticUrls, ...groupUrls, ...materialUrls, ...uniqueProductUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml, 'utf8');
console.log('Successfully wrote public/sitemap.xml with', allUrls.length, 'URLs.');

const robotsTxt = `# robots.txt for Jubilant Steels (https://jubilantsteel.com)
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /*?*

# Allow search bots to crawl images and styles
User-agent: Googlebot
Allow: /
Allow: /assets/
Allow: /images/

User-agent: Bingbot
Allow: /

# XML Sitemap
Sitemap: https://jubilantsteel.com/sitemap.xml
`;

fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), robotsTxt, 'utf8');
console.log('Successfully wrote public/robots.txt.');
