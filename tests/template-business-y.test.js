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

run('global style adds glassmorphism, balanced text, smooth hover, grain, and advanced easing', () => {
  const css = readStyle();
  assert.match(css, /backdrop-filter:\s*blur\((2[0-9]|[3-9][0-9])px\)/i);
  assert.match(css, /text-wrap:\s*balance/i);
  assert.match(css, /\.smooth-hover/);
  assert.match(css, /cubic-bezier\(0\.2,\s*0\.8,\s*0\.2,\s*1\)/);
  assert.match(css, /y-noise|grain|noise/i);
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
  assert.match(css, /box-shadow:\s*inset 4px 0 0 var\(--teal\)/);
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
  assert.doesNotMatch(css, /grid-column:\s*span\s*2/s);
  assert.match(css, /\.y-report-roadmap-item\s*\{[^}]*background:\s*transparent;[^}]*border:\s*0;[^}]*box-shadow:\s*none;/s);
  assert.match(css, /\.y-report-section\s*\{[^}]*padding:\s*80px 0;/s);
  assert.match(css, /\.y-report-lead,[^}]*\.y-report-framework-item p\s*\{[^}]*line-height:\s*2/s);
  for (const file of ['index.html', 'service.html', 'about.html']) {
    const html = readTemplate(file);
    assert.match(html, /y-section--slab/);
    assert.match(html, /y-report-framework/);
    assert.match(html, /y-card-tag">0[1-3]</);
  }
});






run('premium visual anchor strengthens checkpoints and axis language', () => {
  const css = readStyle();
  assert.match(css, /\.y-report-framework-item \.y-card-tag\s*\{[^}]*font-size:\s*0\.85rem;[^}]*font-weight:\s*900;[^}]*background:\s*linear-gradient/s);
  assert.match(css, /\.y-report-framework::before\s*\{[^}]*width:\s*2px;[^}]*rgba\(15, 29, 46, 0\.24\)/s);
  assert.match(css, /\.y-report-roadmap::before\s*\{[^}]*height:\s*2px;[^}]*rgba\(15, 29, 46, 0\.24\)/s);
  assert.match(css, /\.y-report-roadmap-item::before\s*\{[^}]*border-color:\s*rgba\(15, 29, 46, 0\.46\)/s);
});

run('matte finish keeps roadmap labels separated and aligned', () => {
  const css = readStyle();
  assert.match(css, /\.y-report-roadmap-meta\s*\{[^}]*display:\s*inline-flex;[^}]*gap:\s*12px;[^}]*margin-bottom:\s*16px;/s);
  assert.match(css, /\.y-report-roadmap-label\s*\{[^}]*letter-spacing:\s*0\.1em/s);
  for (const file of ['index.html', 'service.html']) {
    const html = readTemplate(file);
    assert.match(html, /y-report-roadmap-meta/);
    assert.match(html, /y-report-roadmap-tag/);
    assert.match(html, /y-report-roadmap-label">PHASE 0[1-3]</);
  }
});

