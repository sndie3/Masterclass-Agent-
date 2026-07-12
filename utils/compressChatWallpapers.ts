import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { compressImageFile, formatSize, listImageFiles } from './compressImage.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '..', 'public', 'assets', 'Chat theme');
const DEST_DIR = path.join(__dirname, '..', 'public', 'assets', 'chat-wallpapers');
const WIDTH = 800;
const QUALITY = 80;

async function main() {
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  const files = listImageFiles(SOURCE_DIR);

  for (let i = 0; i < files.length; i++) {
    const inputPath = files[i];
    const outputName = `chat${i + 1}.jpg`;
    const outputPath = path.join(DEST_DIR, outputName);

    console.log(`Compressing ${path.basename(inputPath)} -> ${outputName}`);
    const stats = await compressImageFile(inputPath, outputPath, {
      width: WIDTH,
      quality: QUALITY,
    });

    if (stats.compressedSize > stats.originalSize) {
      fs.copyFileSync(inputPath, outputPath);
      console.log(`  Kept original ${formatSize(stats.originalSize)} (re-encoded was ${formatSize(stats.compressedSize)})`);
    } else {
      console.log(`  ${formatSize(stats.originalSize)} -> ${formatSize(stats.compressedSize)} (${stats.reduction.toFixed(1)}% reduction)`);
    }
  }

  console.log('Done compressing chat wallpapers.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
