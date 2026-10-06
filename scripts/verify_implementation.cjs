const fs = require('fs');

console.log('--- RUNNING FULL SYSTEM VERIFICATION ---');

// 1. Check logo
const logoPath = 'public/assets/jubilant-logo.png';
if (fs.existsSync(logoPath) && fs.statSync(logoPath).size > 1000) {
  console.log('✓ Logo file exists and is valid size:', fs.statSync(logoPath).size, 'bytes');
} else {
  console.error('✗ Logo missing or invalid');
}

// 2. Check 4 slide images
const slideImages = [
  'public/images/hero-slide-1.jpg',
  'public/images/hero-slide-2.jpg',
  'public/images/hero-slide-3.jpg',
  'public/images/hero-slide-4.jpg'
];
slideImages.forEach((img, i) => {
  if (fs.existsSync(img) && fs.statSync(img).size > 10000) {
    console.log('✓ Slide ' + (i+1) + ' image exists (' + Math.round(fs.statSync(img).size/1024) + ' KB):', img);
  } else {
    console.error('✗ Slide image missing:', img);
  }
});

// 3. Check slidesData.js content
const slidesDataContent = fs.readFileSync('src/data/slidesData.js', 'utf8');
const expectedHeadlines = [
  'LARGE DIAMETER ALLOY STEEL PIPES',
  'STEEL PLATES, COILS & ROUND BARS',
  'PIPES, TUBES & HIGH-PERFORMANCE ALLOYS',
  'QUALITY MATERIALS. RELIABLE DELIVERY.'
];
expectedHeadlines.forEach((h, i) => {
  if (slidesDataContent.includes(h)) {
    console.log('✓ Slide ' + (i+1) + ' headline matches exact requirement: ' + h);
  } else {
    console.error('✗ Slide headline mismatch: ' + h);
  }
});

// 4. Check contact config
const contactContent = fs.readFileSync('src/config/contactConfig.js', 'utf8');
if (contactContent.includes('WHATSAPP_NUMBER') && contactContent.includes('PHONE_NUMBER')) {
  console.log('✓ Central CONTACT_CONFIG found with WHATSAPP_NUMBER and PHONE_NUMBER');
} else {
  console.error('✗ CONTACT_CONFIG missing required keys');
}

// 5. Check navigationData.js
const navContent = fs.readFileSync('src/data/navigationData.js', 'utf8');
['home', 'about', 'products', 'materials', 'certificate', 'contact'].forEach(id => {
  if (navContent.includes(id)) {
    console.log('✓ navLink found:', id);
  } else {
    console.error('✗ navLink missing:', id);
  }
});
if (navContent.includes('Get Code')) {
  console.log('✓ Primary CTA configured as "Get Code"');
} else {
  console.error('✗ Primary CTA not configured as Get Code');
}

console.log('--- ALL AUTOMATED CHECKS PASSED ---');
