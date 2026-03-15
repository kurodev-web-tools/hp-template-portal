const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', 'public', 'templates', 'business');

const groups = {
  k: ['about.html', 'contact.html', 'index.html', 'service.html'],
  m: ['about.html', 'contact.html', 'index.html', 'service.html'],
  s: ['about.html', 'contact.html', 'index.html', 'service.html'],
};

const knowledgeMobileMenu = `
    <div class="knowledge-menu-backdrop fixed inset-0 z-40 bg-stone-950/40 md:hidden"></div>
    <div id="knowledge-mobile-menu" class="knowledge-mobile-menu fixed inset-x-4 top-24 z-50 rounded-[2rem] border border-k-line bg-white/95 p-6 shadow-2xl backdrop-blur md:hidden">
        <nav class="flex flex-col gap-3">
            <a href="index.html" class="k-nav-link">Home</a>
            <a href="about.html" class="k-nav-link">About</a>
            <a href="service.html" class="k-nav-link">Service</a>
            <a href="contact.html" class="k-nav-link">Contact</a>
        </nav>
    </div>
`;

const knowledgeToggle = `
            <button class="knowledge-mobile-toggle flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border border-k-line bg-white/90 md:hidden" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="knowledge-mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>`;

const minimalBackdrop = `
        <div class="mobile-menu-backdrop fixed inset-0 z-40 hidden bg-black/50 md:hidden"></div>`;

const minimalToggle = `
                <button class="mobile-menu-toggle flex h-11 w-11 flex-col items-center justify-center rounded-full md:hidden" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="minimal-mobile-menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>`;

function updateKnowledge(content) {
  let next = content;

  if (!/knowledge-menu-backdrop/.test(next)) {
    next = next.replace('<body class="theme-business">', `<body class="theme-business">\n${knowledgeMobileMenu}`);
  }

  if (!/knowledge-mobile-toggle/.test(next)) {
    next = next.replace(/(\s+<nav class="k-nav-panel hidden md:flex md:items-center md:gap-10">[\s\S]*?<\/nav>)/, `$1${knowledgeToggle}`);
  }

  return next;
}

function updateMinimal(content) {
  let next = content;

  if (!/mobile-menu-backdrop fixed inset-0 z-40 hidden/.test(next)) {
    next = next.replace('<div class="relative min-h-screen overflow-x-hidden">', `<div class="relative min-h-screen overflow-x-hidden">${minimalBackdrop}`);
  }

  if (!/aria-controls="minimal-mobile-menu"/.test(next)) {
    next = next.replace('<nav class="hidden items-center gap-10 md:flex">', '<nav id="minimal-mobile-menu" class="hidden items-center gap-10 md:flex" aria-label="Primary">');
    next = next.replace(/(\s+<nav id="minimal-mobile-menu" class="hidden items-center gap-10 md:flex" aria-label="Primary">[\s\S]*?<\/nav>)/, `$1${minimalToggle}`);
  }

  return next;
}

function updateSaas(content) {
  let next = content;

  next = next.replace(/<button class="saas-mobile-toggle([^>]*)aria-expanded="false"/, '<button class="saas-mobile-toggle$1aria-controls="saas-mobile-menu" aria-expanded="false"');
  next = next.replace(/<aside class="saas-sidebar /, '<aside id="saas-mobile-menu" class="saas-sidebar ');

  return next;
}

function main() {
  let updated = 0;

  for (const [group, files] of Object.entries(groups)) {
    for (const name of files) {
      const filePath = path.join(rootDir, group, name);
      const original = fs.readFileSync(filePath, 'utf8');
      let next = original;

      if (group === 'k') next = updateKnowledge(next);
      if (group === 'm') next = updateMinimal(next);
      if (group === 's') next = updateSaas(next);

      if (next !== original) {
        fs.writeFileSync(filePath, next);
        updated += 1;
        console.log(`Updated: ${path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/')}`);
      }
    }
  }

  console.log(`Updated files: ${updated}`);
}

main();
