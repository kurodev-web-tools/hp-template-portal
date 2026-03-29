const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const readTemplate = (file) =>
  fs.readFileSync(path.join(__dirname, '..', 'public', 'templates', 'business', 'e', file), 'utf8');

const readStyle = () =>
  fs.readFileSync(
    path.join(__dirname, '..', 'public', 'templates', 'business', 'e', 'assets', 'css', 'style.css'),
    'utf8'
  );

const run = (name, fn) => {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
};

run('shared style centralizes eco component primitives and wrap polish', () => {
  const css = readStyle();
  assert.match(css, /\.eco-panel\s*\{/);
  assert.match(css, /\.eco-primary-button\s*\{/);
  assert.match(css, /\.eco-mobile-link\s*\{/);
  assert.match(css, /\.eco-copy-block\s*\{/);
  assert.match(css, /\.eco-rule-list\s*\{/);
  assert.match(css, /\.eco-feature-block\s*\{/);
  assert.match(css, /\.eco-process-list\s*\{/);
  assert.match(css, /\.eco-compare-card\s*\{/);
  assert.match(css, /\.eco-footer-grid\s*\{/);
  assert.match(css, /eco-about-hero-layout/);
  assert.match(css, /eco-service-process-layout/);
  assert.match(css, /eco-cta-header/);
  assert.match(css, /\.eco-demo-note\s*\{/);
  assert.match(css, /text-wrap:\s*balance/);
  assert.match(css, /text-wrap:\s*pretty/);
});

run('shared heading phrases use dedicated nowrap utilities across pages', () => {
  const css = readStyle();
  assert.match(css, /\.eco-heading\s*\{/);
  assert.match(css, /\.eco-heading-phrase\s*\{/);
  assert.match(css, /white-space:\s*nowrap/);

  for (const file of ['index.html', 'about.html', 'service.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /eco-heading/);
    assert.match(html, /eco-heading-phrase/);
  }

  assert.doesNotMatch(readTemplate('about.html'), /<h[12][^>]*>\s*<span class="ib">/);
  assert.doesNotMatch(readTemplate('service.html'), /<h[12][^>]*>\s*<span class="ib">/);
  assert.doesNotMatch(readTemplate('contact.html'), /<h[12][^>]*>\s*<span class="ib">/);
});

run('body copy uses eco-pretty and avoids legacy inline-block spans in the hero lead', () => {
  const indexHtml = readTemplate('index.html');
  const aboutHtml = readTemplate('about.html');
  const serviceHtml = readTemplate('service.html');
  const contactHtml = readTemplate('contact.html');

  assert.doesNotMatch(indexHtml, /<p class="mt-7 max-w-2xl text-lg leading-8 text-white\/88 md:text-xl">[\s\S]*class="ib"/);
  assert.match(indexHtml, /<p class="mt-7 max-w-2xl eco-pretty text-lg leading-8 text-white\/88 md:text-xl">/);
  assert.match(aboutHtml, /<p class="mt-7 eco-pretty text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">/);
  assert.match(serviceHtml, /<p class="mt-6 eco-pretty text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">/);
  assert.match(contactHtml, /<p class="mt-6 eco-pretty text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">/);
});

run('shared metadata uses production-like verdant global urls across pages', () => {
  for (const file of ['index.html', 'about.html', 'service.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /https:\/\/verdant-global\.jp\/?/);
    assert.doesNotMatch(html, /example\.com/);
  }
  assert.match(readTemplate('about.html'), /application\/ld\+json/);
  assert.match(readTemplate('service.html'), /application\/ld\+json/);
  assert.match(readTemplate('contact.html'), /application\/ld\+json/);
});

run('index page states target sectors, delivery themes, and operational proof', () => {
  const html = readTemplate('index.html');
  assert.match(html, /食品・日用品・小売/);
  assert.match(html, /包装刷新|包装設計/);
  assert.match(html, /回収導線|回収設計/);
  assert.match(html, /導入企業|導入社数/);
  assert.match(html, /eco-feature-block/);
  assert.match(html, /eco-rule-list/);
  assert.doesNotMatch(html, /差し替えてください|編集してください/);
});

run('index hero keeps right-side proof card top-aligned on desktop', () => {
  const html = readTemplate('index.html');
  const css = readStyle();
  assert.match(html, /eco-hero-layout/);
  assert.match(html, /eco-hero-proof/);
  assert.doesNotMatch(html, /lg:grid-cols-\[1\.08fr_0\.92fr\]/);
  assert.match(css, /\.eco-hero-layout\s*\{/);
  assert.match(css, /grid-template-columns:\s*1\.08fr 0\.92fr/);
  assert.match(css, /\.eco-hero-proof\s*\{/);
  assert.match(css, /align-self:\s*start/);
});

run('index custom desktop grids avoid tailwind arbitrary column classes', () => {
  const html = readTemplate('index.html');
  const css = readStyle();
  assert.match(html, /eco-decision-layout/);
  assert.doesNotMatch(html, /lg:grid-cols-\[1\.1fr_0\.9fr\]/);
  assert.match(css, /\.eco-decision-layout\s*\{/);
  assert.match(css, /grid-template-columns:\s*1\.1fr 0\.9fr/);
});

run('index hero title uses dedicated nowrap phrases instead of generic inline blocks', () => {
  const html = readTemplate('index.html');
  const css = readStyle();
  assert.match(html, /eco-hero-copy/);
  assert.match(html, /eco-hero-title/);
  assert.match(html, /eco-hero-phrase/);
  assert.doesNotMatch(html, /<div class="max-w-3xl">/);
  assert.match(css, /\.eco-hero-title \.eco-hero-phrase\s*\{/);
  assert.match(css, /white-space:\s*nowrap/);
});

run('about page introduces project categories and practical selection criteria', () => {
  const html = readTemplate('about.html');
  const css = readStyle();
  assert.match(html, /支援領域|案件カテゴリ/);
  assert.match(html, /食品ブランド|日用品ブランド|小売/);
  assert.match(html, /調達|包装|売場|回収/);
  assert.match(html, /eco-copy-block/);
  assert.match(html, /eco-rule-grid/);
  assert.match(html, /eco-about-hero-layout/);
  assert.doesNotMatch(html, /lg:grid-cols-\[0\.95fr_1\.05fr\]/);
  assert.doesNotMatch(html, /lg:grid-cols-\[1fr_1fr\]/);
  assert.match(css, /eco-about-hero-layout/);
});

run('service page explains deliverables, process, and advisory fit by engagement type', () => {
  const html = readTemplate('service.html');
  const css = readStyle();
  assert.match(html, /成果物|アウトプット/);
  assert.match(html, /現状整理|診断/);
  assert.match(html, /向いている相談/);
  assert.match(html, /期間の目安|支援期間/);
  assert.match(html, /eco-process-list/);
  assert.match(html, /eco-compare-card/);
  assert.match(html, /eco-service-process-layout/);
  assert.match(html, /eco-cta-header/);
  assert.doesNotMatch(html, /lg:grid-cols-\[0\.95fr_1\.05fr\]/);
  assert.doesNotMatch(html, /lg:grid-cols-\[1fr_auto\]/);
  assert.match(css, /eco-service-process-layout/);
  assert.match(css, /eco-cta-header/);
});

run('contact page frames inquiry expectations and concrete consultation themes', () => {
  const html = readTemplate('contact.html');
  const css = readStyle();
  assert.match(html, /初回相談で共有いただきたいこと|共有していただきたいこと/);
  assert.match(html, /包装見直し|売場改善|回収運用/);
  assert.match(html, /2営業日以内/);
  assert.match(html, /相談案内/);
  assert.match(html, /eco-rule-list/);
  assert.match(html, /eco-contact-layout/);
  assert.match(html, /eco-contact-form/);
  assert.match(html, /eco-contact-form-row/);
  assert.match(html, /eco-contact-form-stack/);
  assert.match(html, /eco-contact-heading/);
  assert.match(html, /for="contact-name"/);
  assert.match(html, /id="contact-name"/);
  assert.match(html, /name="name"/);
  assert.match(html, /autocomplete="name"/);
  assert.match(html, /for="contact-email"/);
  assert.match(html, /name="email"/);
  assert.match(html, /autocomplete="email"/);
  assert.match(html, /id="contact-topic"/);
  assert.match(html, /name="topic"/);
  assert.match(html, /id="contact-detail"/);
  assert.match(html, /name="detail"/);
  assert.match(html, /type="submit"/);
  assert.match(html, /このフォームはデモ表示です。送信は実行されません。/);
  assert.doesNotMatch(html, /lg:grid-cols-\[0\.9fr_1\.1fr\]/);
  assert.match(css, /\.eco-contact-layout\s*\{/);
  assert.match(css, /grid-template-columns:\s*minmax\(0,\s*0\.48fr\)\s+minmax\(24rem,\s*0\.52fr\)/);
  assert.match(css, /\.eco-contact-layout\s*>\s*\*\s*\{/);
  assert.match(css, /min-width:\s*0/);
  assert.match(css, /\.eco-contact-heading\s*\{/);
  assert.match(css, /font-size:\s*3\.25rem/);
  assert.match(css, /\.eco-contact-heading \.eco-heading-phrase\s*\{/);
  assert.match(css, /white-space:\s*normal/);
});

run('navigation exposes current page state and footer no longer uses dummy links', () => {
  for (const file of ['index.html', 'about.html', 'service.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /aria-current="page"/);
    assert.doesNotMatch(html, /href="#"/);
  }
});

