const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', 'public', 'templates', 'business');
const canonicalBase = 'https://example.com/templates/business';

function listHtmlFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('_backup')) {
        continue;
      }
      results.push(...listHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

function toPosix(input) {
  return input.replace(/\\/g, '/');
}

function buildCanonical(filePath) {
  const rel = toPosix(path.relative(rootDir, filePath));
  return `${canonicalBase}/${rel}`;
}

function buildPublicRelative(filePath, targetFile) {
  const fromDir = path.dirname(filePath);
  const publicDir = path.join(__dirname, '..', 'public');
  return toPosix(path.relative(fromDir, path.join(publicDir, targetFile)));
}

function absolutizeAssetUrl(filePath, assetUrl) {
  if (!assetUrl || /^(https?:)?\/\//i.test(assetUrl) || assetUrl.startsWith('data:')) {
    return assetUrl;
  }
  const fromDir = path.dirname(filePath);
  const resolved = toPosix(path.relative(rootDir, path.resolve(fromDir, assetUrl)));
  return `${canonicalBase}/${resolved}`;
}

function ensureTag(content, anchorRegex, tagText) {
  if (content.includes(tagText)) {
    return content;
  }
  const match = content.match(anchorRegex);
  if (!match) {
    return content;
  }
  return content.replace(anchorRegex, `${match[0]}    ${tagText}\n`);
}

function updateHtml(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const canonicalUrl = buildCanonical(filePath);

  content = content.replace(
    /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}">`
  );

  content = ensureTag(
    content,
    /<meta\s+property=["']og:type["'][^>]*>\s*/i,
    '<meta property="og:locale" content="ja_JP">'
  );

  content = ensureTag(
    content,
    /<meta\s+name=["']twitter:card["'][^>]*>\s*/i,
    '<meta name="robots" content="index, follow">'
  );

  if (!/<meta\s+name=["']twitter:card["']/i.test(content)) {
    content = ensureTag(
      content,
      /<meta\s+property=["']og:image["'][^>]*>\s*/i,
      '<meta name="twitter:card" content="summary_large_image">'
    );
    content = ensureTag(
      content,
      /<meta\s+name=["']twitter:card["'][^>]*>\s*/i,
      '<meta name="robots" content="index, follow">'
    );
  }

  if (!/<link\s+rel=["']canonical["']/i.test(content)) {
    content = ensureTag(
      content,
      /<title>[\s\S]*?<\/title>\s*/i,
      `<link rel="canonical" href="${canonicalUrl}">`
    );
  } else {
    content = content.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}">`
    );
  }

  const ogImageMatch = content.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  const ogImageUrl = absolutizeAssetUrl(filePath, ogImageMatch ? ogImageMatch[1].trim() : '');

  content = content.replace(/"url"\s*:\s*""/g, `"url": "${canonicalUrl}"`);
  if (ogImageUrl) {
    content = content.replace(/"logo"\s*:\s*""/g, `"logo": "${ogImageUrl}"`);
  }

  const privacyHref = buildPublicRelative(filePath, 'privacy.html');
  const termsHref = buildPublicRelative(filePath, 'terms.html');

  content = content.replace(/<a([^>]*?)href=["']#["']([^>]*?)>\s*Privacy(?: Policy)?\s*<\/a>/gi, `<a$1href="${privacyHref}"$2>Privacy Policy</a>`);
  content = content.replace(/<a([^>]*?)href=["']#["']([^>]*?)>\s*Terms(?: of Service)?\s*<\/a>/gi, `<a$1href="${termsHref}"$2>Terms of Service</a>`);

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

function main() {
  const htmlFiles = listHtmlFiles(rootDir);
  let updated = 0;
  for (const filePath of htmlFiles) {
    if (updateHtml(filePath)) {
      updated += 1;
      console.log(`Updated: ${toPosix(path.relative(path.join(__dirname, '..'), filePath))}`);
    }
  }
  console.log(`Updated files: ${updated}`);
}

main();
