import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import type { ResizeOptions } from 'sharp';

export interface CompressOptions {
  width?: number;
  height?: number;
  quality?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  progressive?: boolean;
  format?: 'jpeg' | 'png' | 'webp';
}

export interface CompressionStats {
  originalSize: number;
  compressedSize: number;
  reduction: number;
}

export async function compressImageFile(
  inputPath: string,
  outputPath: string,
  options: CompressOptions = {}
): Promise<CompressionStats> {
  const {
    width,
    height,
    quality = 80,
    fit = 'cover',
    progressive = true,
    format = 'jpeg',
  } = options;

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const stats = fs.statSync(inputPath);
  const originalSize = stats.size;

  const resizeOptions: ResizeOptions = { fit, withoutEnlargement: true };
  if (width !== undefined) resizeOptions.width = width;
  if (height !== undefined) resizeOptions.height = height;

  const pipeline = sharp(inputPath).resize(resizeOptions);

  if (format === 'png') {
    pipeline.png({ quality, progressive });
  } else if (format === 'webp') {
    pipeline.webp({ quality });
  } else {
    pipeline.jpeg({ quality, progressive });
  }

  await pipeline.toFile(outputPath);

  const newStats = fs.statSync(outputPath);
  const compressedSize = newStats.size;
  const reduction = originalSize > 0 ? ((1 - compressedSize / originalSize) * 100) : 0;

  return {
    originalSize,
    compressedSize,
    reduction,
  };
}

export function listImageFiles(directory: string): string[] {
  return fs
    .readdirSync(directory)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map((file) => path.join(directory, file))
    .sort();
}

export function formatSize(bytes: number): string {
  const mb = bytes / 1024 / 1024;
  return `${mb.toFixed(2)}MB`;
}
