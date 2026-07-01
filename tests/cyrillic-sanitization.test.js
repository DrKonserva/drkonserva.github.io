const assert = require('assert');
const fs = require('fs');
const path = require('path');

const bundlePaths = [
  path.join(__dirname, '..', 'script-0.js'),
  path.join(__dirname, '..', 'main', '@connect', 'script.js'),
  path.join(__dirname, '..', 'main', '@moderator', 'script.js'),
  path.join(__dirname, '..', 'main', 'pp1', 'drawful', 'script.js'),
  path.join(__dirname, '..', 'main', 'pp11', 'cookies', 'script.js'),
];

for (const bundlePath of bundlePaths) {
  const bundleContent = fs.readFileSync(bundlePath, 'utf8');
  assert.ok(
    bundleContent.includes('/[^\\p{L}\\p{N}\\p{P}\\p{S}\\s’]/gu'),
    `${path.relative(process.cwd(), bundlePath)} should use a Unicode-safe sanitizer pattern`,
  );
  assert.ok(
    !bundleContent.includes('/[^A-Z0-9\\u00A1\\u0020-\\u002F\\u00BF-\\u00FF\\u2026!?*$+\\-\'_ .,]/gi'),
    `${path.relative(process.cwd(), bundlePath)} should no longer use the old Latin-only sanitizer pattern`,
  );
}

console.log('Cyrillic sanitization regression test passed.');
