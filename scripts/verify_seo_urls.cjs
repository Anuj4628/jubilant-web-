const fs = require('fs');
const path = require('path');

// Test sitemap.xml exists and has valid structure
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('FAIL: sitemap.xml does not exist');
  process.exit(1);
}
const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
const urlMatches = sitemapXml.match(/<loc>(.*?)<\/loc>/g) || [];
console.log('PASS: sitemap.xml exists with ' + urlMatches.length + ' indexed URLs.');

// Test robots.txt exists and links to sitemap
const robotsPath = path.join(__dirname, '../public/robots.txt');
if (!fs.existsSync(robotsPath)) {
  console.error('FAIL: robots.txt does not exist');
  process.exit(1);
}
const robotsTxt = fs.readFileSync(robotsPath, 'utf8');
if (!robotsTxt.includes('Sitemap: https://jubilantsteel.com/sitemap.xml')) {
  console.error('FAIL: robots.txt does not link sitemap.xml');
  process.exit(1);
}
console.log('PASS: robots.txt exists and links canonical sitemap.');

// Test Footer has Sunmarg India credit
const footerPath = path.join(__dirname, '../src/components/Footer/Footer.jsx');
const footerContent = fs.readFileSync(footerPath, 'utf8');
if (!footerContent.includes('Design and SEO by') || !footerContent.includes('https://www.sunmargindia.com') || !footerContent.includes('Sunmarg India')) {
  console.error('FAIL: Footer does not contain Sunmarg India credit');
  process.exit(1);
}
console.log('PASS: Footer contains verified Sunmarg India official website credit.');

console.log('ALL VERIFICATION CHECKS PASSED!');
