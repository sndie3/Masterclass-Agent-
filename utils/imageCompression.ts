/**
 * Image compression utility for client-side image optimization
 * Supports large files up to 100MB and converts to efficient formats
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.0 to 1.0 (default: 0.85)
  format?: 'image/jpeg' | 'image/webp' | 'image/png';
}

export interface CompressionResult {
  compressedFile: File;
  compressedDataUrl: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

/**
 * Compress an image file on the client side
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns Promise with compression result
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.85,
    format = 'image/jpeg',
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      // Create canvas for resizing
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Draw image on canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob with compression
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to compress image'));
            return;
          }

          // Create new File from blob
          const compressedFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, '') + (format === 'image/webp' ? '.webp' : '.jpg'),
            { type: format }
          );

          // Create data URL for preview
          const compressedDataUrl = canvas.toDataURL(format, quality);

          resolve({
            compressedFile,
            compressedDataUrl,
            originalSize: file.size,
            compressedSize: compressedFile.size,
            compressionRatio: file.size / compressedFile.size,
          });
        },
        format,
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Validate if file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
