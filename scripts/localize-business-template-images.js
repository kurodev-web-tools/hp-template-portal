const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', 'public', 'templates', 'business');
const imageUrlPattern = /https?:\/\/[^\s"'()]+(?:googleusercontent|images\.unsplash|cloudinary)[^\s"'()]*|https?:\/\/[^\s"'()]+\.(?:png|jpe?g|webp|gif|svg)(?:\?[^"'()]*)?/gi;

function listHtmlFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('_backup')) continue;
      files.push(...listHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function toPosix(value) {
  return value.replace(/\\/g, '/');
}

function templateLabel(filePath) {
  const rel = toPosix(path.relative(rootDir, filePath));
  const [first] = rel.split('/');
  return first.endsWith('.html') ? path.basename(first, '.html') : first;
}

function svgPlaceholder(title, subtitle, accent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="${accent}" />
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)" />
  <circle cx="1240" cy="180" r="220" fill="rgba(255,255,255,0.08)" />
  <circle cx="260" cy="760" r="280" fill="rgba(255,255,255,0.06)" />
  <g fill="none" stroke="rgba(255,255,255,0.16)">
    <path d="M120 180h420" />
    <path d="M120 228h300" />
    <path d="M120 276h360" />
  </g>
  <text x="120" y="420" fill="#f8fafc" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="700">${title}</text>
  <text x="120" y="486" fill="#e2e8f0" font-family="Segoe UI, Arial, sans-serif" font-size="28">${subtitle}</text>
  <text x="120" y="812" fill="rgba(248,250,252,0.72)" font-family="Segoe UI, Arial, sans-serif" font-size="24">Local placeholder image</text>
</svg>`;
}

function accentForTemplate(label) {
  const palette = {
    a: '#b68b2f',
    b: '#f97316',
    c: '#0f766e',
    d: '#2563eb',
    e: '#16a34a',
    f: '#7c3aed',
    g: '#0ea5e9',
    h: '#a16207',
    i: '#4f46e5',
    j: '#7c2d12',
    k: '#166534',
    l: '#0891b2',
    m: '#525252',
    n: '#db2777',
    o: '#65a30d',
    p: '#ea580c',
    q: '#c2410c',
    r: '#7f1d1d',
    s: '#2563eb',
    t: '#15803d',
    u: '#ea580c',
    v: '#d946ef',
    w: '#0284c7',
    x: '#dc2626',
    y: '#0f766e',
    z: '#4338ca',
    boilerplate: '#475569',
    'hub-nz': '#0369a1',
  };
  return palette[label] || '#334155';
}

function main() {
  const htmlFiles = listHtmlFiles(rootDir);
  let updatedFiles = 0;
  let generatedAssets = 0;

  for (const filePath of htmlFiles) {
    const original = fs.readFileSync(filePath, 'utf8');
    const urls = [...new Set((original.match(imageUrlPattern) || []).filter((url) => !url.startsWith('data:')))];
    if (urls.length === 0) continue;

    const label = templateLabel(filePath);
    const relDir = path.dirname(path.relative(rootDir, filePath));
    const assetBase = relDir === '.'
      ? path.join(rootDir, 'assets', 'generated')
      : path.join(rootDir, relDir, 'assets', 'generated');
    ensureDir(assetBase);

    let next = original;
    urls.forEach((url, index) => {
      const fileName = `external-image-${String(index + 1).padStart(2, '0')}.svg`;
      const assetPath = path.join(assetBase, fileName);
      if (!fs.existsSync(assetPath)) {
        fs.writeFileSync(
          assetPath,
          svgPlaceholder(
            `Template ${label.toUpperCase()} Visual`,
            `${path.basename(filePath)} / image ${index + 1}`,
            accentForTemplate(label)
          )
        );
        generatedAssets += 1;
      }
      const relativeAsset = toPosix(path.relative(path.dirname(filePath), assetPath));
      next = next.split(url).join(relativeAsset);
    });

    if (next !== original) {
      fs.writeFileSync(filePath, next);
      updatedFiles += 1;
      console.log(`Updated: ${toPosix(path.relative(path.join(__dirname, '..'), filePath))}`);
    }
  }

  console.log(`Updated files: ${updatedFiles}`);
  console.log(`Generated assets: ${generatedAssets}`);
}

main();
