const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const readTemplate = (file) =>
  fs.readFileSync(path.join(__dirname, '..', 'public', 'templates', 'business', 'v', file), 'utf8');

const run = (name, fn) => {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
};

run('index page includes business-facing sections and no template notes', () => {
  const html = readTemplate('index.html');
  assert.match(html, /導入実績/);
  assert.match(html, /代表サービス/);
  assert.match(html, /flow/);
  assert.match(html, /case summary/);
  assert.doesNotMatch(html, /デモ用|テンプレート用|差し替えてください/);
});

run('service page includes detailed service guidance and consult entry points', () => {
  const html = readTemplate('service.html');
  assert.match(html, /engagement patterns/);
  assert.match(html, /scope/);
  assert.match(html, /first step/);
  assert.match(html, /向いている相談/);
});

run('about page includes judgement, team stance, and fit details', () => {
  const html = readTemplate('about.html');
  assert.match(html, /judgement/);
  assert.match(html, /team stance/);
  assert.match(html, /fit/);
  assert.match(html, /working with us/);
});

run('contact page includes trust-building guidance and required form fields', () => {
  const html = readTemplate('contact.html');
  assert.match(html, /相談できる内容/);
  assert.match(html, /返信目安/);
  assert.match(html, /初回相談の流れ/);
  assert.match(html, /required/);
  assert.doesNotMatch(html, /テンプレート用|デモ用/);
});

run('shared footer includes repeat navigation and CTA', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /brand message studio/);
    assert.match(html, /相談する/);
    assert.match(html, /Home/);
    assert.match(html, /Services/);
    assert.match(html, /Manifesto/);
    assert.match(html, /Contact/);
  }
});

run('font tuning classes and values are present', () => {
  const css = readTemplate(path.join('assets', 'css', 'style.css'));
  const contactHtml = readTemplate('contact.html');
  assert.match(css, /font-size:\s*clamp\(3\.6rem,\s*9\.5vw,\s*9rem\)/);
  assert.match(css, /font-size:\s*clamp\(3rem,\s*15\.5vw,\s*4rem\)/);
  assert.match(css, /\.v-page-title/);
  assert.match(css, /\.v-card-copy/);
  assert.match(contactHtml, /font-\['Noto_Sans_JP'\]/);
});