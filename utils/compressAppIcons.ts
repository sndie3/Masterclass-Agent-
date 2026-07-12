import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { compressImageFile, formatSize, listImageFiles } from './compressImage.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '..', 'public', 'assets', 'masterclass logo icon');
const DEST_DIR = path.join(__dirname, '..', 'public', 'assets', 'app-icons');
const SIZE = 192;
const QUALITY = 90;

async function main() {
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  const files = listImageFiles(SOURCE_DIR);

  for (let i = 0; i < files.length; i++) {
    const inputPath = files[i];
    const outputName = `icon${i + 1}.png`;
    const outputPath = path.join(DEST_DIR, outputName);

    console.log(`Compressing ${path.basename(inputPath)} -> ${outputName}`);
    const stats = await compressImageFile(inputPath, outputPath, {
      width: SIZE,
      height: SIZE,
      fit: 'inside',
      quality: QUALITY,
      format: 'png',
    });
    console.log(`  ${formatSize(stats.originalSize)} -> ${formatSize(stats.compressedSize)} (${stats.reduction.toFixed(1)}% reduction)`);
  }

  console.log('Done compressing app icons.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
