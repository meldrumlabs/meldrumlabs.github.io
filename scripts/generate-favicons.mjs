import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// Run from the repo root: node scripts/generate-favicons.mjs
// The SVG contains only the symbol from the supplied full logo, in site brand colours.
const source = 'public/favicon.svg';
const assets = [
  ['public/favicon-16x16.png', 16],
  ['public/favicon-32x32.png', 32],
  ['public/favicon-48x48.png', 48],
  ['public/apple-touch-icon.png', 180],
  ['public/android-chrome-192x192.png', 192],
  ['public/android-chrome-512x512.png', 512],
  ['src/app/icon.png', 192],
  ['src/app/apple-icon.png', 180],
];

async function render(size, opaque = false) {
  let image = sharp(source, { density: 384 }).resize(size, size);
  if (opaque) image = image.flatten({ background: '#18181b' });
  return image.png().toBuffer();
}

for (const [path, size] of assets) {
  await writeFile(path, await render(size, path.includes('apple')));
}

// ICO directory with PNG frames; no extra image-conversion dependency needed.
const sizes = [48, 32, 16];
const frames = await Promise.all(sizes.map((size) => render(size)));
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
frames.forEach((frame, i) => {
  const entry = 6 + i * 16;
  directory[entry] = directory[entry + 1] = sizes[i];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(frame.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
const ico = Buffer.concat([directory, ...frames]);
await writeFile('src/app/favicon.ico', ico);

// Check every output, including each embedded ICO frame.
for (const [path, size] of assets) {
  const metadata = await sharp(path).metadata();
  assert.equal(metadata.width, size, path);
  assert.equal(metadata.height, size, path);
}
for (let i = 0; i < sizes.length; i++) {
  const entry = 6 + i * 16;
  const start = ico.readUInt32LE(entry + 12);
  const length = ico.readUInt32LE(entry + 8);
  const metadata = await sharp(ico.subarray(start, start + length)).metadata();
  assert.equal(metadata.width, sizes[i]);
  assert.equal(metadata.height, sizes[i]);
}
// Keep browser icons transparent without shrinking the artwork.
const { data } = await sharp('public/favicon-32x32.png').ensureAlpha().raw()
  .toBuffer({ resolveWithObject: true });
assert.equal(data[(16 * 32) * 4 + 3], 0, 'Browser favicon background must be transparent');
const orange = [];
for (let i = 0; i < data.length; i += 4) {
  if (data[i + 3] > 128 && data[i] > 150 && data[i + 1] > 70 && data[i + 2] < 80) orange.push(i / 4);
}
const xs = orange.map((pixel) => pixel % 32);
const ys = orange.map((pixel) => Math.floor(pixel / 32));
assert.ok(Math.max(...xs) - Math.min(...xs) >= 24, 'Symbol should fill the icon width');
assert.ok(Math.max(...ys) - Math.min(...ys) >= 15, 'Symbol should remain legible');
console.log('Generated and checked all favicon sizes.');
