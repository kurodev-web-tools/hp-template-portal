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

function ensureTagWithFallback(content, preferredAnchors, fallbackAnchor, tagText) {
  if (content.includes(tagText)) {
    return content;
  }
  for (const anchor of preferredAnchors) {
    const next = ensureTag(content, anchor, tagText);
    if (next !== content) {
      return next;
    }
  }
  return ensureTag(content, fallbackAnchor, tagText);
}

function updateHtml(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const canonicalUrl = buildCanonical(filePath);
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const titleText = titleMatch ? titleMatch[1].trim() : '';
  const descriptionText = descMatch ? descMatch[1].trim() : '';

  if (/<meta\s+property=["']og:url["']/i.test(content)) {
    content = content.replace(
      /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}">`
    );
  } else {
    content = ensureTagWithFallback(
      content,
      [/<meta\s+property=["']og:type["'][^>]*>\s*/i, /<meta\s+property=["']og:description["'][^>]*>\s*/i],
      /<meta\s+name=["']description["'][^>]*>\s*/i,
      `<meta property="og:url" content="${canonicalUrl}">`
    );
  }

  if (!/<meta\s+property=["']og:title["']/i.test(content) && titleText) {
    content = ensureTagWithFallback(
      content,
      [/<meta\s+name=["']description["'][^>]*>\s*/i],
      /<title>[\s\S]*?<\/title>\s*/i,
      `<meta property="og:title" content="${titleText}">`
    );
  }

  if (!/<meta\s+property=["']og:description["']/i.test(content) && descriptionText) {
    content = ensureTagWithFallback(
      content,
      [/<meta\s+property=["']og:title["'][^>]*>\s*/i, /<meta\s+name=["']description["'][^>]*>\s*/i],
      /<title>[\s\S]*?<\/title>\s*/i,
      `<meta property="og:description" content="${descriptionText}">`
    );
  }

  if (!/<meta\s+property=["']og:type["']/i.test(content)) {
    content = ensureTagWithFallback(
      content,
      [/<meta\s+property=["']og:description["'][^>]*>\s*/i, /<meta\s+property=["']og:title["'][^>]*>\s*/i],
      /<meta\s+name=["']description["'][^>]*>\s*/i,
      '<meta property="og:type" content="website">'
    );
  }

  content = ensureTagWithFallback(
    content,
    [/<meta\s+property=["']og:type["'][^>]*>\s*/i, /<meta\s+property=["']og:url["'][^>]*>\s*/i],
    /<meta\s+name=["']description["'][^>]*>\s*/i,
    '<meta property="og:locale" content="ja_JP">'
  );

  content = ensureTagWithFallback(
    content,
    [/<meta\s+property=["']og:url["'][^>]*>\s*/i, /<meta\s+property=["']og:locale["'][^>]*>\s*/i],
    /<meta\s+name=["']description["'][^>]*>\s*/i,
    '<meta name="twitter:card" content="summary_large_image">'
  );

  content = ensureTagWithFallback(
    content,
    [/<meta\s+name=["']twitter:card["'][^>]*>\s*/i],
    /<meta\s+name=["']description["'][^>]*>\s*/i,
    '<meta name="robots" content="index, follow">'
  );

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
