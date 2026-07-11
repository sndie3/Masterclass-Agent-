import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { compressImageFile, formatSize, listImageFiles } from './compressImage.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const THEMES_DIR = path.join(__dirname, '..', 'public', 'assets', 'masterclass theme');
const WIDTH = 1080;
const HEIGHT = 1920;
const QUALITY = 75;

async function main() {
  const files = listImageFiles(THEMES_DIR);

  console.log(`Found ${files.length} images to compress...`);

  for (const inputPath of files) {
    const file = path.basename(inputPath);
    const tempPath = `${inputPath}.tmp`;

    try {
      const stats = await compressImageFile(inputPath, tempPath, {
        width: WIDTH,
        height: HEIGHT,
        fit: 'cover',
        quality: QUALITY,
      });

      fs.unlinkSync(inputPath);
      fs.renameSync(tempPath, inputPath);

      console.log(`${file}: ${formatSize(stats.originalSize)} -> ${formatSize(stats.compressedSize)} (${stats.reduction.toFixed(1)}% reduction)`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Error compressing ${file}:`, message);
    }
  }

  console.log('Compression complete!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
