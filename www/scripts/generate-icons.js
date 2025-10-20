// generate-icons.js
// Requires 'sharp' package: npm install sharp
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'assets', 'images', 'Zendo.png');
const outDir = path.join(__dirname, '..', 'assets', 'icons');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function gen() {
  if (!fs.existsSync(src)) {
    console.error('Source logo not found at', src);
    process.exit(1);
  }
  await sharp(src).resize(192,192).png().toFile(path.join(outDir,'icon-192.png'));
  await sharp(src).resize(512,512).png().toFile(path.join(outDir,'icon-512.png'));
  console.log('Generated icon-192.png and icon-512.png in', outDir);
}

gen().catch(e => { console.error(e); process.exit(1); });
