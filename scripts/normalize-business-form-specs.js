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

function normalizeFormTag(tag) {
  let next = tag;

  if (!/\baction\s*=/i.test(next)) {
    next = next.replace(/^<form\b/i, '<form action="#"');
  }

  if (!/\bmethod\s*=/i.test(next)) {
    next = next.replace(/^<form\b/i, '<form method="post"');
  }

  if (!/\bonsubmit\s*=/i.test(next)) {
    next = next.replace(/^<form\b/i, '<form onsubmit="event.preventDefault();"');
  }

  if (!/\bdata-demo-form\s*=/i.test(next)) {
    next = next.replace(/^<form\b/i, '<form data-demo-form="true"');
  }

  return next;
}

function main() {
  const files = listHtmlFiles(rootDir);
  let updated = 0;

  for (const filePath of files) {
    const original = fs.readFileSync(filePath, 'utf8');
    if (!/<form\b/i.test(original)) continue;

    let changed = false;
    const next = original.replace(/<form\b[^>]*>/gi, (tag) => {
      const updatedTag = normalizeFormTag(tag);
      if (updatedTag !== tag) changed = true;
      return updatedTag;
    });

    if (!changed) continue;
    fs.writeFileSync(filePath, next);
    updated += 1;
    console.log(`Updated: ${path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/')}`);
  }

  console.log(`Updated files: ${updated}`);
}

main();
