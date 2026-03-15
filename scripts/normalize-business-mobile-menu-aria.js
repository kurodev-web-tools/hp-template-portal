const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', 'public', 'templates', 'business');

function listHtmlFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('_backup')) continue;
      files.push(...listHtmlFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function sanitizeId(value) {
  return value
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function deriveMenuId(tag) {
  const idMatch = tag.match(/\bid\s*=\s*["']([^"']+)["']/i);
  if (idMatch) return idMatch[1];

  const classMatch = tag.match(/\bclass\s*=\s*["']([^"']+)["']/i);
  if (classMatch) {
    const menuClass = classMatch[1]
      .split(/\s+/)
      .find((token) => /mobile-menu|menu-overlay|nav-overlay/i.test(token));
    if (menuClass) return sanitizeId(menuClass);
  }

  return 'mobile-menu';
}

function addIdToMenuTag(tag, menuId) {
  if (/\bid\s*=/i.test(tag)) return tag;
  return tag.replace(/^(<\w+\b)/i, `$1 id="${menuId}"`);
}

function addAriaControlsToButtonTag(tag, menuId) {
  let next = tag;
  if (!/\baria-controls\s*=/i.test(next)) {
    next = next.replace(/^(<button\b)/i, `$1 aria-controls="${menuId}"`);
  }
  if (!/\baria-expanded\s*=/i.test(next)) {
    next = next.replace(/^(<button\b)/i, '$1 aria-expanded="false"');
  }
  return next;
}

function normalizeFile(content) {
  const menuMatch = content.match(/<(div|nav)\b[^>]*(?:id|class)\s*=\s*["'][^"']*(?:mobile-menu|menu-overlay|nav-overlay)[^"']*["'][^>]*>/i);
  if (!menuMatch) return { changed: false, content };

  const menuTag = menuMatch[0];
  const menuId = deriveMenuId(menuTag);
  const nextMenuTag = addIdToMenuTag(menuTag, menuId);
  let nextContent = content.replace(menuTag, nextMenuTag);

  const buttonPattern = /<button\b[^>]*(?:id|class)\s*=\s*["'][^"']*(?:mobile[^"']*toggle|menu[^"']*toggle|toggle[^"']*mobile)[^"']*["'][^>]*>/gi;
  let changed = nextContent !== content;

  nextContent = nextContent.replace(buttonPattern, (tag) => {
    const updated = addAriaControlsToButtonTag(tag, menuId);
    if (updated !== tag) changed = true;
    return updated;
  });

  return { changed, content: nextContent };
}

function main() {
  const files = listHtmlFiles(rootDir);
  let updated = 0;

  for (const filePath of files) {
    const original = fs.readFileSync(filePath, 'utf8');
    const result = normalizeFile(original);
    if (!result.changed) continue;

    fs.writeFileSync(filePath, result.content);
    updated += 1;
    console.log(`Updated: ${path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/')}`);
  }

  console.log(`Updated files: ${updated}`);
}

main();
