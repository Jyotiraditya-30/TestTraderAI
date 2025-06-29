// utils/imageDownloader.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_DIR = path.resolve(__dirname, '../utils/data/images');

/**
 * Download images to disk and name them as postId_A.jpg, postId_B.jpg, etc.
 * @param {string[]} urls - List of image URLs
 * @param {string} postId - Unique postId (used in filenames)
 * @returns {Promise<string[]>} - Local paths of downloaded images
 */
export const downloadImages = async (urls = [], postId = 'unknown') => {
  if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
  }

  const localPaths = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const ext = path.extname(new URL(url).pathname).split('?')[0] || '.jpg';
      const suffix = String.fromCharCode(65 + i); // A, B, C, ...
      const filename = `${postId}_${suffix}${ext}`;
      const fullPath = path.join(IMAGE_DIR, filename);

      const response = await axios.get(url, { responseType: 'arraybuffer' });
      fs.writeFileSync(fullPath, response.data);

      localPaths.push(fullPath);
    } catch (err) {
      console.warn(`⚠️ Failed to download image: ${url}`, err.message);
    }
  }

  return localPaths;
};
