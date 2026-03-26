const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const readTemplate = (file) =>
  fs.readFileSync(path.join(__dirname, '..', 'public', 'templates', 'business', 'y', file), 'utf8');
const readStyle = () =>
  fs.readFileSync(path.join(__dirname, '..', 'public', 'templates', 'business', 'y', 'assets', 'css', 'style.css'), 'utf8');

const run = (name, fn) => {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
};

run('global style adds glassmorphism, balanced text, and subtle grain', () => {
  const css = readStyle();
  assert.match(css, /backdrop-filter:\s*blur\(16px\)/i);
  assert.match(css, /text-wrap:\s*balance/i);
  assert.match(css, /\.smooth-hover/);
  assert.match(css, /grain|noise/i);
});

run('brand mark is upgraded to geometric SVG across key pages', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /y-brand-mark-svg/);
    assert.match(html, /polygon|polyline|path/);
  }
});

run('hero and section layouts include decorative meta labels and asymmetrical report grid', () => {
  const css = readStyle();
  assert.match(css, /grid-template-columns:\s*minmax\(0,\s*1\.2fr\)\s+minmax\(320px,\s*0\.8fr\)/i);
  for (const file of ['index.html', 'service.html', 'about.html']) {
    const html = readTemplate(file);
    assert.match(html, /CONFIDENTIAL \/\/ AREA 5|VERIFIED LOGIC/);
  }
});

run('chart pulse and interactive table hover effects are implemented', () => {
  const css = readStyle();
  assert.match(css, /y-report-chart-pulse/);
  assert.match(css, /tbody tr:hover td/);
});

run('shared navigation and advisory CTA remain consistent', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /YIELD_GROWTH/);
    assert.match(html, /Framework/i);
    assert.match(html, /Solutions/i);
    assert.match(html, /Intelligence/i);
    assert.match(html, /Connect/i);
    assert.match(html, /CONSULT ADVISORY/i);
  }
});

run('open editorial layout removes intro outer boxes and stacks framework vertically', () => {
  const css = readStyle();
  assert.match(css, /\.y-section--slab\s*\{/);
  assert.match(css, /\.y-report-intro\s*\{[^}]*background:\s*transparent;[^}]*border:\s*0;[^}]*box-shadow:\s*none;/s);
  assert.match(css, /\.y-report-framework\s*\{[^}]*position:\s*relative;[^}]*grid-template-columns:\s*1fr;[^}]*background:\s*transparent;[^}]*border:\s*0;[^}]*box-shadow:\s*none;/s);
  assert.match(css, /\.y-report-framework::before\s*\{[^}]*left:\s*18px;[^}]*width:\s*1px;/s);
  assert.match(css, /\.y-report-framework-item\s*\{[^}]*padding:\s*40px 0 40px 48px;[^}]*border-left:\s*0;/s);
  assert.match(css, /\.y-report-framework-item:not\(:last-child\)\s*\{[^}]*border-bottom:\s*1px solid/s);
  assert.match(css, /\.y-report-framework-item \.y-card-tag\s*\{[^}]*position:\s*absolute;[^}]*left:\s*0;/s);
  assert.doesNotMatch(css, /\.y-report-framework-item[^}]*grid-column:\s*span\s*2/s);
  assert.match(css, /\.y-report-roadmap-item\s*\{[^}]*background:\s*transparent;[^}]*border:\s*0;[^}]*box-shadow:\s*none;/s);
  assert.match(css, /\.y-report-section\s*\{[^}]*padding:\s*80px 0;/s);
  assert.match(css, /\.y-report-lead\s*\{[^}]*padding-left:\s*0;[^}]*border-left:\s*0;/s);
  const index = readTemplate('index.html');
  assert.match(index, /y-section--slab/);
  assert.match(index, /y-report-framework/);
  assert.match(index, /y-card-tag">0[1-3]</);
});

run('about and service pages introduce differentiated editorial subpage systems', () => {
  const css = readStyle();
  assert.match(css, /\.y-hero--split\b/);
  assert.match(css, /\.y-editorial-stagger\b/);
  assert.match(css, /\.y-process-vertical\b/);
  assert.match(css, /\.y-layered-stack\b/);
  assert.match(css, /\.y-research-ledger\b/);

  const about = readTemplate('about.html');
  assert.match(about, /y-report-hero-grid y-hero--split/);
  assert.match(about, /Judgement Principles Summary|Judgement Principles Snapshot/);
  assert.match(about, /y-editorial-stagger/);
  assert.match(about, /y-editorial-stagger-item/);
  assert.match(about, /y-research-ledger/);
  assert.doesNotMatch(about, /<div class="y-report-framework" data-stagger-group>/);

  const service = readTemplate('service.html');
  assert.match(service, /y-layered-stack/);
  assert.match(service, /y-layered-stack-item/);
  assert.match(service, /y-process-vertical/);
  assert.match(service, /y-process-step/);
  assert.doesNotMatch(service, /<div class="y-report-roadmap" data-stagger-group>/);
});

run('editorial minimalism removes decorative accents and re-centers typography', () => {
  const css = readStyle();
  assert.match(css, /h2\s*\{[^}]*font-weight:\s*950;[^}]*letter-spacing:\s*-0\.05em/s);
  assert.match(css, /\.y-process-vertical::before\s*\{[^}]*width:\s*1px;[^}]*background:\s*rgba\([^)]*0\.12\)/s);
  assert.match(css, /\.y-process-step-card\s*\{[^}]*border:\s*1px solid rgba\(0,\s*0,\s*0,\s*0\.08\);/s);
  assert.match(css, /\.y-process-step-card\s*\{[^}]*box-shadow:\s*none;/s);
  assert.match(css, /\.y-process-step-number\s*\{[^}]*font-size:\s*4rem;[^}]*rgba\(11,\s*42,\s*74,\s*0\.04\)/s);
  assert.match(css, /\.y-dossier-meta\s*\{[^}]*font-family:\s*ui-monospace|\.y-dossier-meta span\s*\{[^}]*font-family:\s*ui-monospace/s);
  assert.match(css, /\.y-editorial-stagger\s*\{[^}]*gap:\s*clamp\(48px,\s*8vw,\s*112px\)/s);
  assert.match(css, /\.y-report-section--grid\s*\{[^}]*background-image:[^}]*rgba\(15,\s*29,\s*46,\s*0\.0[12]\)/s);
  assert.doesNotMatch(css, /@keyframes\s+y-process-pulse/);
  assert.doesNotMatch(css, /\.y-process-step-card\s*\{[^}]*border-left:\s*4px solid var\(--teal\)/s);
  assert.doesNotMatch(css, /\.y-editorial-stagger-copy::before/);
  assert.doesNotMatch(css, /\.y-editorial-stagger-detail::before/);
  assert.doesNotMatch(css, /\.y-layered-stack-item::before/);

  const about = readTemplate('about.html');
  assert.match(about, /\[REF_ID:\s*2403-A\]/);
  assert.match(about, /\[CLASSIFIED:\s*CONFIDENTIAL\]/);
  assert.doesNotMatch(about, /y-card-tag">0[1-3]</);

  const service = readTemplate('service.html');
  assert.doesNotMatch(service, /y-card-tag">0[1-3]</);
  assert.match(service, /y-process-step-number/);
});


run('about readability polish tightens measure and uses monochrome list marks', () => {
  const css = readStyle();
  assert.match(css, /\.y-watermark-number,\s*\.y-process-step-number\s*\{[^}]*color:\s*rgba\(11,\s*42,\s*74,\s*0\.03\)/s);
  assert.match(css, /\.y-editorial-detail-list\s*\{[^}]*list-style:\s*none;[^}]*padding-left:\s*0/s);
  assert.match(css, /\.y-editorial-detail-list li::before\s*\{[^}]*width:\s*4px;[^}]*height:\s*4px;[^}]*background:\s*rgba\(15,\s*29,\s*46,\s*0\.[0-9]+\)/s);
  assert.match(css, /\.y-page-about \.y-report-editorial-copy p,\s*\.y-page-about \.y-report-editorial-note p,\s*\.y-page-about \.y-report-section-head p,\s*\.y-page-about \.y-report-lead\s*\{[^}]*max-width:\s*65ch;[^}]*color:\s*#445160/s);
  assert.match(css, /\.y-page-about \.y-editorial-stagger-copy p,\s*\.y-page-about \.y-editorial-stagger-detail p\s*\{[^}]*max-width:\s*65ch/s);
  assert.match(css, /\.y-main section::after\s*\{[^}]*opacity:\s*0\.05;[^}]*background-size:\s*10px 10px,\s*16px 16px/s);
  assert.match(css, /\.y-page-about \.y-report-hero \+ \.y-report-section\s*\{[^}]*padding-top:\s*68px/s);
  assert.match(css, /\.y-page-about \.y-report-hero \+ \.y-report-section \.y-report-section-head\s*\{[^}]*margin-bottom:\s*40px/s);
  assert.match(css, /\.y-page-about \.y-report-hero \+ \.y-report-section \+ \.y-report-section\s*\{[^}]*padding-top:\s*104px/s);

  const about = readTemplate('about.html');
  assert.match(about, /Long-form Brief/);
  assert.match(about, /y-watermark-number/);

  const service = readTemplate('service.html');
  assert.match(service, /y-watermark-number/);
  assert.match(service, /y-process-step-number/);
});


run('final cleanup removes teal accents, standardizes 4px markers, and fixes summary numbering', () => {
  const css = readStyle();
  assert.match(css, /\.y-report-lead\s*\{[^}]*padding-left:\s*0;[^}]*border-left:\s*0;/s);
  assert.match(css, /\.y-page-service \.y-report-lead,\s*\.y-page-service \.y-report-note p,\s*\.y-page-service \.y-report-section-head p,\s*\.y-page-service \.y-layered-stack-item p,\s*\.y-page-service \.y-process-step-card p\s*\{[^}]*max-width:\s*65ch/s);
  assert.match(css, /\.y-process-step::before\s*\{[^}]*width:\s*4px;[^}]*height:\s*4px;/s);
  assert.match(css, /\.y-editorial-detail-list li::before\s*\{[^}]*width:\s*4px;[^}]*height:\s*4px;/s);
  assert.match(css, /\.y-page-about \.y-report-note-band div\s*\{[^}]*position:\s*relative;[^}]*overflow:\s*hidden/s);
  assert.match(css, /\.y-page-about \.y-report-note-band span\s*\{[^}]*position:\s*absolute;[^}]*font-size:\s*3\.6rem;[^}]*rgba\(11,\s*42,\s*74,\s*0\.03\)/s);
  assert.match(css, /\.y-page-about \.y-report-note-band strong,[\s\S]*?z-index:\s*1/s);
  assert.match(css, /--muted:\s*#4f5d6c|--muted:\s*#51606f/);
  assert.match(css, /\.y-main section::after\s*\{[^}]*opacity:\s*0\.05/s);
  assert.doesNotMatch(css, /border-left:\s*[^;]*(var\(--teal\)|rgba\(36,\s*199,\s*165)/);
  assert.doesNotMatch(css, /border-top:\s*[^;]*(var\(--teal\)|rgba\(36,\s*199,\s*165)/);

  const about = readTemplate('about.html');
  assert.match(about, /<div class="y-report-note-band"/);
  assert.match(about, /<span>01<\/span>/);
  assert.match(about, /<span>02<\/span>/);

  const service = readTemplate('service.html');
  assert.match(service, /class="y-page-service"/);
  assert.match(service, /y-process-step-number/);
});


run('mobile-only 991px polish keeps header, hero, and watermark adjustments scoped to tablet/mobile', () => {
  const css = readStyle();
  const mediaMatch = css.match(/@media \(max-width:\s*991px\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(mediaMatch, 'expected a dedicated 991px media block');
  const mediaCss = mediaMatch[1];

  const headerBlock = mediaCss.match(/\.y-header-inner\s*\{([\s\S]*?)\}/);
  assert.ok(headerBlock, 'expected mobile header block');
  assert.match(headerBlock[1], /display:\s*flex;/);
  assert.match(headerBlock[1], /align-items:\s*center;/);
  assert.match(headerBlock[1], /height:\s*64px;/);
  assert.match(headerBlock[1], /padding:\s*10px 0;/);

  const menuBlock = mediaCss.match(/\.y-menu\s*\{([\s\S]*?)\}/);
  assert.ok(menuBlock, 'expected mobile menu block');
  assert.match(menuBlock[1], /border:\s*1px solid rgba\(11,\s*42,\s*74,\s*0\.2\);/);
  assert.match(menuBlock[1], /border-radius:\s*10px;/);
  assert.match(menuBlock[1], /font-weight:\s*700;/);
  assert.match(menuBlock[1], /letter-spacing:\s*0\.12em;/);
  assert.match(menuBlock[1], /text-transform:\s*uppercase;/);

  assert.match(mediaCss, /\.y-report-hero-grid,\s*\.y-report-hero-grid\.y-hero--split\s*\{[^}]*grid-template-columns:\s*1fr;[^}]*gap:\s*24px;/s);
  assert.match(mediaCss, /\.y-report-chart\s*\{[^}]*order:\s*2;[^}]*margin-top:\s*0;/s);
  assert.match(mediaCss, /\.y-watermark-number\s*\{[^}]*top:\s*10px;[^}]*right:\s*20px;[^}]*font-size:\s*4rem;/s);
  assert.match(mediaCss, /\.y-process-step-number\s*\{[^}]*top:\s*14px;[^}]*right:\s*16px;[^}]*font-size:\s*4rem;[^}]*color:\s*rgba\(11,\s*42,\s*74,\s*0\.024\);/s);
  assert.match(mediaCss, /\.y-page-service \.y-report-lead,\s*\.y-page-service \.y-report-note p,\s*\.y-page-service \.y-report-section-head p,\s*\.y-page-service \.y-layered-stack-item p,\s*\.y-page-service \.y-process-step-card p\s*\{[^}]*max-width:\s*65ch;/s);
  assert.match(css, /\.y-report-matrix-scroll\s*\{[^}]*overflow-x:\s*auto;/s);
});


run('final mobile polish keeps all last-mile fixes inside the 991px block', () => {
  const css = readStyle();
  const mediaMatch = css.match(/@media \(max-width:\s*991px\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(mediaMatch, 'expected a dedicated 991px media block');
  const mediaCss = mediaMatch[1];

  assert.match(mediaCss, /\.y-report-actions \.y-button,\s*\.y-report-actions \.y-button-ghost\s*\{[^}]*box-shadow:\s*none !important;/s);
  assert.match(mediaCss, /\.y-report-chart-band\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*1fr 1fr;[^}]*gap:\s*20px;/s);
  assert.match(mediaCss, /\.y-report-chart-band div:last-child\s*\{[^}]*grid-column:\s*span 2;[^}]*border-top:\s*1px solid rgba\(11,\s*42,\s*74,\s*0\.05\);[^}]*padding-top:\s*10px;/s);
  assert.match(mediaCss, /\.y-watermark-number\s*\{[^}]*top:\s*10px;[^}]*right:\s*20px;[^}]*font-size:\s*4rem;[^}]*opacity:\s*0\.02;[^}]*pointer-events:\s*none;/s);
  assert.match(mediaCss, /\.y-editorial-stagger-copy\s*\{[^}]*padding-top:\s*30px;/s);
  assert.match(mediaCss, /\.y-report-contact-grid\s*\{[^}]*display:\s*flex;[^}]*flex-direction:\s*column;[^}]*width:\s*100%;/s);
  assert.match(mediaCss, /\.y-report-form-card,\s*\.y-report-guide\s*\{[^}]*width:\s*100%;[^}]*margin-bottom:\s*30px;/s);
  assert.match(css, /\.y-report-matrix-scroll\s*\{[^}]*overflow-x:\s*auto;/s);
});

run('contact mobile reorder moves consultation guide above the form inside the 991px block', () => {
  const css = readStyle();
  const mediaMatch = css.match(/@media \(max-width:\s*991px\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(mediaMatch, 'expected a dedicated 991px media block');
  const mediaCss = mediaMatch[1];

  assert.match(mediaCss, /\.y-report-contact-grid\s*\{[^}]*display:\s*flex;[^}]*flex-direction:\s*column;[^}]*width:\s*100%;/s);
  assert.match(mediaCss, /\.y-report-guide\s*\{[^}]*order:\s*-1;/s);
  assert.match(mediaCss, /\.y-report-form-card,\s*\.y-report-guide\s*\{[^}]*margin-bottom:\s*30px;/s);
  assert.match(mediaCss, /\.y-report-contact-grid > :last-child\s*\{[^}]*margin-bottom:\s*0;/s);
});