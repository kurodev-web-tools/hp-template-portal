const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', 'public', 'templates', 'business', 'z');

const readTemplate = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const readCss = () => fs.readFileSync(path.join(root, 'assets', 'css', 'style.css'), 'utf8');

const run = (name, fn) => {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
};

run('shared metadata removes placeholder urls and points to z assets', () => {
  for (const file of ['index.html', 'about.html', 'service.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /templates\.kuro-lab\.com\/templates\/business\/z\//);
    assert.match(html, /assets\/images\/z-/);
    assert.match(html, /og:image/);
    assert.match(html, /twitter:image/);
    assert.doesNotMatch(html, /example\.com/);
  }
});

run('index page frames the site as a stay retreat with facilities and stay flow', () => {
  const html = readTemplate('index.html');
  assert.match(html, /宿泊型リトリート/);
  assert.match(html, /客室|離れ/);
  assert.match(html, /貸切風呂|湯処/);
  assert.match(html, /滞在の流れ/);
  assert.match(html, /施設案内|滞在設備/);
  assert.match(html, /お客様の過ごし方|滞在シーン/);
  assert.doesNotMatch(html, /Silence Homepage/);
});

run('about page explains operating philosophy with concrete fit and location cues', () => {
  const html = readTemplate('about.html');
  assert.match(html, /運営方針|空間設計/);
  assert.match(html, /向いている滞在/);
  assert.match(html, /山あい|渓谷|庭/);
  assert.match(html, /客室|共有棟|湯処/);
});

run('service page presents concrete stay plans and facility details', () => {
  const html = readTemplate('service.html');
  assert.match(html, /滞在プラン|宿泊プラン/);
  assert.match(html, /一泊二日|二泊三日/);
  assert.match(html, /少人数貸切|貸切プログラム/);
  assert.match(html, /利用の流れ|予約前に/);
  assert.match(html, /客室設備|含まれるもの/);
  assert.match(html, /class="[^"]*\bz-plan-meta-list\b[^"]*"/);
});

run('contact page provides reservation guidance and accessible form fields', () => {
  const html = readTemplate('contact.html');
  assert.match(html, /予約相談/);
  assert.match(html, /返信目安/);
  assert.match(html, /到着希望日|希望日程/);
  assert.match(html, /参加人数|滞在人数/);
  assert.match(html, /class="[^"]*\bz-contact-detail-grid\b[^"]*"/);
  assert.match(html, /autocomplete="name"/);
  assert.match(html, /autocomplete="email"/);
  assert.match(html, /type="tel"/);
  assert.match(html, /このフォームはデモ表示です。送信は実行されません。/);
});

run('shared css includes image and proof layouts for the richer retreat framing', () => {
  const css = readCss();
  assert.match(css, /\.z-proof-grid\s*\{/);
  assert.match(css, /\.z-stay-grid\s*\{/);
  assert.match(css, /\.z-image-card\s+img\s*\{/);
  assert.match(css, /text-wrap:\s*pretty/);
  assert.match(css, /\.z-plan-meta-list li:nth-child\(2\)\s*\{[\s\S]*min-height:\s*7\.5rem;/);
});

run('hero layout keeps the first view text-first and moves photography below the intro', () => {
  const indexHtml = readTemplate('index.html');
  const aboutHtml = readTemplate('about.html');
  const css = readCss();
  assert.match(indexHtml, /class="[^"]*\bz-text-hero\b[^"]*"/);
  assert.match(indexHtml, /class="[^"]*\bz-hero-proof\b[^"]*"/);
  assert.doesNotMatch(indexHtml, /class="[^"]*\bz-hero-visual\b[^"]*"/);
  assert.match(aboutHtml, /class="[^"]*\bz-text-hero\b[^"]*"/);
  assert.doesNotMatch(aboutHtml, /class="[^"]*\bz-split-hero-media\b[^"]*"/);
  assert.match(indexHtml, /Stay Facilities/);
  assert.match(indexHtml, /assets\/images\/z-hero-retreat\.png/);
  assert.match(aboutHtml, /Space Design/);
  assert.match(aboutHtml, /assets\/images\/z-garden-bath\.png/);
  assert.match(css, /\.z-text-hero\s*\{[\s\S]*max-width:\s*44rem;/);
  assert.match(css, /\.z-text-hero-copy\s*\{[\s\S]*max-width:\s*38rem;/);
  assert.match(css, /\.z-hero-proof\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\);/);
  assert.match(css, /\.z-section-media\s*\{[\s\S]*max-width:\s*32rem;/);
});

run('mobile hero spacing relies on chapter padding instead of double padding on text wrappers', () => {
  const css = readCss();
  assert.match(css, /@media \(max-width: 980px\) \{[\s\S]*\.z-chapter[\s\S]*padding-inline:\s*20px !important;/);
  assert.match(css, /@media \(max-width: 980px\) \{[\s\S]*\.z-text-hero,[\s\S]*\.z-text-hero-copy,[\s\S]*grid-template-columns:\s*1fr !important;/);
  assert.match(css, /\.z-text-hero,[\s\S]*\.z-text-hero-copy,[\s\S]*padding-inline:\s*0 !important;/);
});

run('mobile section spacing uses chapter padding while inner layout wrappers stay flush', () => {
  const css = readCss();
  assert.match(css, /@media \(max-width: 980px\) \{[\s\S]*\.z-header-inner,[\s\S]*\.z-chapter,[\s\S]*\.z-footer-inner,[\s\S]*padding-inline:\s*20px !important;/);
  assert.match(css, /\.z-layout,[\s\S]*\.z-section-stack,[\s\S]*\.z-section-head\s*\{[\s\S]*padding-inline:\s*0 !important;/);
  assert.match(css, /@media \(max-width: 980px\) \{[\s\S]*\.z-panel\s*\{[\s\S]*padding-inline:\s*0 !important;/);
});

run('mobile heading wrapping uses explicit stacked headings instead of forcing all phrases onto separate lines', () => {
  const indexHtml = readTemplate('index.html');
  const aboutHtml = readTemplate('about.html');
  const serviceHtml = readTemplate('service.html');
  const contactHtml = readTemplate('contact.html');
  const css = readCss();
  assert.match(indexHtml, /class="[^"]*\bz-heading-stack-mobile\b[^"]*"/);
  assert.match(aboutHtml, /class="[^"]*\bz-page-title--compact-mobile\b[^"]*"/);
  assert.match(serviceHtml, /class="[^"]*\bz-heading-stack-mobile\b[^"]*"/);
  assert.match(contactHtml, /class="[^"]*\bz-page-title--compact-mobile\b[^"]*"/);
  assert.doesNotMatch(contactHtml, /class="[^"]*\bz-page-title--soft-break-mobile\b[^"]*"/);
  assert.match(contactHtml, /<h1 class="[^"]*\bz-heading-stack-mobile\b[^"]*"/);
  assert.match(contactHtml, /予約相談を、<\/span><span class="u-phrase">静かな案内で<\/span><span class="u-phrase">受け付ける。<\/span>/);
  assert.match(css, /@media \(max-width: 980px\) \{[\s\S]*\.u-phrase\s*\{[\s\S]*display:\s*inline !important;/);
  assert.match(css, /@media \(max-width: 980px\) \{[\s\S]*\.z-heading-stack-mobile \.u-phrase\s*\{[\s\S]*display:\s*block !important;[\s\S]*white-space:\s*nowrap !important;/);
  assert.match(css, /@media \(max-width: 980px\) \{[\s\S]*\.z-page-title--compact-mobile\s*\{[\s\S]*font-size:\s*clamp\(1\.55rem,\s*7vw,\s*2\.35rem\) !important;/);
  assert.match(css, /@media \(max-width: 980px\) \{[\s\S]*\.z-page-title--soft-break-mobile \.u-phrase\s*\{[\s\S]*display:\s*inline !important;[\s\S]*white-space:\s*normal !important;/);
});

run('contact detail cards narrow their mobile padding without changing shared card spacing', () => {
  const css = readCss();
  assert.match(css, /@media \(max-width: 980px\) \{[\s\S]*\.z-contact-detail-grid \.z-detail-card\s*\{[\s\S]*padding:\s*1\.5rem 1\.1rem !important;/);
});

run('mobile footer stacks into a left-aligned single column', () => {
  const css = readCss();
  assert.match(css, /@media \(max-width: 980px\) \{[\s\S]*\.z-footer-inner-rich\s*\{[\s\S]*grid-template-areas:\s*"brand"[\s\S]*"nav"[\s\S]*"cta"[\s\S]*"base";[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\) !important;/);
  assert.match(css, /@media \(max-width: 980px\) \{[\s\S]*\.z-footer-cta\s*\{[\s\S]*justify-content:\s*flex-start !important;[\s\S]*align-items:\s*stretch !important;/);
  assert.match(css, /@media \(max-width: 980px\) \{[\s\S]*\.z-footer-inner\s*\{[\s\S]*align-items:\s*stretch !important;/);
});
