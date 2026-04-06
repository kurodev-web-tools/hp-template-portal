const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', 'public', 'templates', 'business', 't');

const readTemplate = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const readCss = () => fs.readFileSync(path.join(root, 'assets', 'css', 'style.css'), 'utf8');
const readScript = () => fs.readFileSync(path.join(root, 'assets', 'js', 'script.js'), 'utf8');

const run = (name, fn) => {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
};

run('shared metadata and OGP asset are wired for all pages', () => {
  for (const file of ['index.html', 'about.html', 'service.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /templates\.kuro-lab\.com\/templates\/business\/t\//);
    assert.match(html, /assets\/images\/A_premium_corporate_202604011942\.png/);
    assert.match(html, /og:image/);
    assert.match(html, /twitter:image/);
  }
});

run('index page adds concrete support framing and case-like consultation examples', () => {
  const html = readTemplate('index.html');
  assert.match(html, /security_operations_consulting/);
  assert.match(html, /Operational Snapshot/);
  assert.match(html, /5営業日/);
  assert.match(html, /相談が多い/);
  assert.match(html, /監査指摘が増えてきた/);
  assert.match(html, /委託先が増えて境界が曖昧/);
  assert.match(html, /復旧訓練が属人化している/);
  assert.doesNotMatch(html, /72h/);
  assert.doesNotMatch(html, /example\.com/);
});

run('about page includes breadcrumb navigation and fit guidance', () => {
  const html = readTemplate('about.html');
  assert.match(html, /<nav class="t-breadcrumb/);
  assert.match(html, /判断を先にそろえ、運用で更新し続ける。/);
  assert.match(html, /向いている相談と/);
  assert.match(html, /単発の操作代行だけ/);
});

run('service page explains ordering and engagement choice', () => {
  const html = readTemplate('service.html');
  assert.match(html, /<nav class="t-breadcrumb/);
  assert.match(html, /どの順番で/);
  assert.match(html, /現状診断/);
  assert.match(html, /運用整備/);
  assert.match(html, /演習と監査接続/);
});

run('contact page provides preflight guidance and richer form inputs', () => {
  const html = readTemplate('contact.html');
  assert.match(html, /<nav class="t-breadcrumb/);
  assert.match(html, /相談できる内容/);
  assert.match(html, /返信目安/);
  assert.match(html, /事前にあると早い資料/);
  assert.match(html, /autocomplete="name"/);
  assert.match(html, /autocomplete="email"/);
  assert.match(html, /type="tel"/);
  assert.match(html, /企業規模/);
  assert.match(html, /希望時期/);
  assert.match(html, /送信後は営業日ベースで確認し/);
});

run('shared style and script include breadcrumb, accordion, and menu polish', () => {
  const css = readCss();
  const script = readScript();

  assert.match(css, /\.t-breadcrumb\s*\{/);
  assert.match(css, /\.t-breadcrumb a\s*\{/);
  assert.match(css, /\.t-accordion\s*\{/);
  assert.match(css, /\.t-accordion summary::after\s*\{/);
  assert.match(css, /\.t-hero-aside img\s*\{/);
  assert.match(script, /toggleAttribute\("inert", !isOpen\)/);
});
