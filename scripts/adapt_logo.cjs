const sharp = require('sharp');
const fs = require('fs');

async function createJubilantSteelsLogo() {
  const inputPath = 'C:/Users/anujm/.gemini/antigravity-ide/brain/54404ac4-204b-4754-9a49-c881e18ddc49/.user_uploaded/media_1791191742789.png';
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  
  // Clone buffer
  const buf = Buffer.from(data);
  
  // Erase 'METAL AND ALLOYS' text: y from 145 to 215, x from 365 to info.width
  for (let y = 145; y < info.height; y++) {
    for (let x = 365; x < info.width; x++) {
      const idx = (y * info.width + x) * 4;
      buf[idx] = 0;
      buf[idx+1] = 0;
      buf[idx+2] = 0;
      buf[idx+3] = 0;
    }
  }
  
  // JUBILANT is from x=375 to x=980 (center is x=678).
  // Baseline was at y=190.
  // In the original, the font was uppercase geometric sans-serif.
  // Let's create: S T E E L S with wide elegant spacing centered under JUBILANT
  const letters = ['S', 'T', 'E', 'E', 'L', 'S'];
  // Let's distribute across 420px (from x=468 to x=888, center=678)
  const startX = 428;
  const endX = 928;
  const step = (endX - startX) / (letters.length - 1);
  
  const textElements = letters.map((letter, i) => {
    const x = Math.round(startX + i * step);
    return `<text x="${x}" y="192" text-anchor="middle" font-family="'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="34" font-weight="700" fill="#5A5B60">${letter}</text>`;
  }).join('\n      ');
  
  const svgText = Buffer.from(`
    <svg width="${info.width}" height="${info.height}" viewBox="0 0 ${info.width} ${info.height}" xmlns="http://www.w3.org/2000/svg">
      ${textElements}
    </svg>
  `);
  
  await sharp(buf, { raw: { width: info.width, height: info.height, channels: 4 } })
    .composite([{ input: svgText, top: 0, left: 0 }])
    .png()
    .toFile('public/assets/jubilant-logo.png');
    
  fs.copyFileSync('public/assets/jubilant-logo.png', 'public/images/jubilant-logo.png');
  fs.copyFileSync('public/assets/jubilant-logo.png', 'src/assets/images/jubilant-logo.png');
  console.log('Successfully created centered-spread jubilant-logo.png with STEELS!');
}

createJubilantSteelsLogo().catch(console.error);
