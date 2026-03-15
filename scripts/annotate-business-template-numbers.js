const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', 'public', 'templates', 'business');
const noteText = '<!-- 数値は編集してください: KPI・実績・件数・割合・年数などの値は公開前に自社データへ差し替えてください。 Edit these values for your business. -->';
const notePattern = /数値は編集してください|Edit these values|編集してください|for your business/i;
const numericPattern = /(?:\d{1,3}(?:[.,]\d{1,3})*(?:%|\+|x)|\d+(?:[.,]\d+)?\s?(?:min|ms|h|PB|TB|GB|MB|k|K|M|B|years?|regions?|countries?|clients?|projects?|members?|hours?))/g;

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

function stripHtml(content) {
  return content
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasNumericClaims(content) {
  const text = stripHtml(content);
  return numericPattern.test(text);
}

function insertNote(content) {
  if (notePattern.test(content)) return content;

  const mainMatch = content.match(/<main\b[^>]*>/i);
  if (mainMatch) {
    return content.replace(mainMatch[0], `${mainMatch[0]}\n        ${noteText}`);
  }

  const bodyMatch = content.match(/<body\b[^>]*>/i);
  if (bodyMatch) {
    return content.replace(bodyMatch[0], `${bodyMatch[0]}\n    ${noteText}`);
  }

  return `${noteText}\n${content}`;
}

function main() {
  const htmlFiles = listHtmlFiles(rootDir);
  let updated = 0;

  for (const filePath of htmlFiles) {
    const original = fs.readFileSync(filePath, 'utf8');
    if (!hasNumericClaims(original) || notePattern.test(original)) {
      continue;
    }

    const next = insertNote(original);
    if (next !== original) {
      fs.writeFileSync(filePath, next);
      updated += 1;
      console.log(`Updated: ${path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/')}`);
    }
  }

  console.log(`Updated files: ${updated}`);
}

main();
