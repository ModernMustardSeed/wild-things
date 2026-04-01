/**
 * Upload gallery assets to Vercel Blob
 *
 * Prerequisites:
 *   1. Create a Blob store in Vercel Dashboard (Storage tab)
 *   2. Copy the BLOB_READ_WRITE_TOKEN
 *   3. Run: BLOB_READ_WRITE_TOKEN=your_token node scripts/upload-gallery.mjs
 */

import { put } from '@vercel/blob';
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, basename } from 'path';

const GALLERY_DIR = join(import.meta.dirname, '..', 'public', 'gallery');
const VIDEOS_DIR = join(import.meta.dirname, '..', 'public', 'videos');

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('ERROR: BLOB_READ_WRITE_TOKEN is required');
  console.error('Create a Blob store in Vercel Dashboard → Storage → Create → Blob');
  console.error('Then run: BLOB_READ_WRITE_TOKEN=your_token node scripts/upload-gallery.mjs');
  process.exit(1);
}

async function uploadFile(filePath, folder) {
  const name = basename(filePath);
  const data = readFileSync(filePath);
  const contentType = name.endsWith('.mp4') ? 'video/mp4'
    : name.endsWith('.webm') ? 'video/webm'
    : 'image/png';

  const blob = await put(`${folder}/${name}`, data, {
    access: 'public',
    contentType,
    addRandomSuffix: false,
  });

  return { name, url: blob.url };
}

async function main() {
  const results = { gallery: {}, videos: {} };

  // Upload gallery images
  const galleryFiles = readdirSync(GALLERY_DIR)
    .filter(f => f.match(/\.(png|mp4|webm)$/))
    .sort();

  console.log(`Uploading ${galleryFiles.length} gallery files...`);

  const BATCH_SIZE = 10;
  for (let i = 0; i < galleryFiles.length; i += BATCH_SIZE) {
    const batch = galleryFiles.slice(i, i + BATCH_SIZE);
    const uploads = await Promise.all(
      batch.map(f => uploadFile(join(GALLERY_DIR, f), 'gallery'))
    );
    uploads.forEach(u => { results.gallery[u.name] = u.url; });
    console.log(`  ${Math.min(i + BATCH_SIZE, galleryFiles.length)}/${galleryFiles.length}`);
  }

  // Upload hero videos
  const videoFiles = readdirSync(VIDEOS_DIR)
    .filter(f => f.match(/\.(mp4|webm)$/))
    .sort();

  console.log(`Uploading ${videoFiles.length} hero videos...`);
  for (const f of videoFiles) {
    const result = await uploadFile(join(VIDEOS_DIR, f), 'videos');
    results.videos[result.name] = result.url;
    console.log(`  ${f} ✓`);
  }

  // Write manifest
  const manifestPath = join(import.meta.dirname, '..', 'src', 'lib', 'blob-manifest.json');
  writeFileSync(manifestPath, JSON.stringify(results, null, 2));
  console.log(`\nManifest written to ${manifestPath}`);

  // Extract the base URL pattern
  const firstUrl = Object.values(results.gallery)[0];
  const baseUrl = firstUrl.replace(/\/gallery\/.*$/, '');
  console.log(`\nBlob base URL: ${baseUrl}`);
  console.log('Update BLOB_BASE in your gallery page and main page to this URL.');
}

main().catch(console.error);
