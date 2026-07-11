import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { compressImageFile, formatSize } from './compressImage.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_ICON = path.join(__dirname, '..', 'public', 'masterclass logo icon black.png');
const DEST_DIR = path.join(__dirname, '..', 'public');

const SIZES = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
];

async function main() {
  if (!fs.existsSync(SOURCE_ICON)) {
    console.error(`Source icon not found: ${SOURCE_ICON}`);
    process.exit(1);
  }

  for (const { size, name } of SIZES) {
    const outputPath = path.join(DEST_DIR, name);
    console.log(`Compressing to ${size}x${size} -> ${name}`);
    const stats = await compressImageFile(SOURCE_ICON, outputPath, {
      width: size,
      height: size,
      fit: 'cover',
      quality: 90,
      format: 'png',
    });
    console.log(`  ${formatSize(stats.originalSize)} -> ${formatSize(stats.compressedSize)} (${stats.reduction.toFixed(1)}% reduction)`);
  }

  console.log('Done compressing PWA icons.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
