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
});

run('contact page provides reservation guidance and accessible form fields', () => {
  const html = readTemplate('contact.html');
  assert.match(html, /予約相談/);
  assert.match(html, /返信目安/);
  assert.match(html, /到着希望日|希望日程/);
  assert.match(html, /参加人数|滞在人数/);
  assert.match(html, /autocomplete="name"/);
  assert.match(html, /autocomplete="email"/);
  assert.match(html, /type="tel"/);
  assert.match(html, /このフォームはデモ表示です。送信は実行されません。/);
});

run('shared css includes image and proof layouts for the richer retreat framing', () => {
  const css = readCss();
  assert.match(css, /\.z-hero-visual\s*\{/);
  assert.match(css, /\.z-proof-grid\s*\{/);
  assert.match(css, /\.z-stay-grid\s*\{/);
  assert.match(css, /\.z-image-card\s+img\s*\{/);
  assert.match(css, /text-wrap:\s*pretty/);
});
