const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', 'public', 'templates', 'business');

function listTemplateDirs() {
  return fs.readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_backup'))
    .map((entry) => path.join(rootDir, entry.name));
}

function listHtmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => path.join(dir, entry.name));
}

function hasDarkClass(content) {
  return /\bclass=["'][^"']*\bdark\b/i.test(content);
}

function addDarkClass(content) {
  return content.replace(/<html([^>]*)>/i, (match, attrs) => {
    if (/\bclass=["']/i.test(attrs)) {
      return `<html${attrs.replace(/\bclass=["']([^"']*)["']/i, (classMatch, classNames) => ` class="${classNames} dark"`)}>`;
    }
    return `<html${attrs} class="dark">`;
  });
}

function main() {
  let updated = 0;

  for (const dir of listTemplateDirs()) {
    const htmlFiles = listHtmlFiles(dir);
    if (htmlFiles.length < 2) {
      continue;
    }

    const states = htmlFiles.map((filePath) => ({
      filePath,
      content: fs.readFileSync(filePath, 'utf8'),
    }));
    const withDark = states.filter((item) => hasDarkClass(item.content));
    const withoutDark = states.filter((item) => !hasDarkClass(item.content));

    if (withDark.length === 0 || withoutDark.length === 0) {
      continue;
    }

    for (const item of withoutDark) {
      const next = addDarkClass(item.content);
      if (next !== item.content) {
        fs.writeFileSync(item.filePath, next);
        updated += 1;
        console.log(`Updated: ${path.relative(path.join(__dirname, '..'), item.filePath).replace(/\\/g, '/')}`);
      }
    }
  }

  console.log(`Updated files: ${updated}`);
}

main();
