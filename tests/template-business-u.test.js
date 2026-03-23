const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const readTemplate = (file) =>
  fs.readFileSync(path.join(__dirname, '..', 'public', 'templates', 'business', 'u', file), 'utf8');

const run = (name, fn) => {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
};

run('index page includes richer business sections', () => {
  const html = readTemplate('index.html');
  assert.match(html, /導入実績/);
  assert.match(html, /制作の流れ/);
  assert.match(html, /事例ピックアップ/);
  assert.doesNotMatch(html, /ダミーです|モック用です|差し替えてください|テンプレート用/);
});

run('service page includes detailed service guidance', () => {
  const html = readTemplate('service.html');
  assert.match(html, /依頼パターン/);
  assert.match(html, /制作範囲/);
  assert.match(html, /進行フロー/);
  assert.doesNotMatch(html, /ダミーです|モック用です|差し替えてください|テンプレート用/);
});

run('about page includes concrete team and fit information', () => {
  const html = readTemplate('about.html');
  assert.match(html, /チームスタンス/);
  assert.match(html, /向いている案件/);
  assert.match(html, /判断基準/);
});

run('contact page includes trust-building guidance around the form', () => {
  const html = readTemplate('contact.html');
  assert.match(html, /相談できる内容/);
  assert.match(html, /返信目安/);
  assert.match(html, /初回相談の流れ/);
  assert.doesNotMatch(html, /ダミーです|モック用です|差し替えてください|テンプレート用/);
});

run('service cards use a 2 by 2 desktop grid for readability', () => {
  const html = readTemplate('service.html');
  assert.match(html, /mx-auto max-w-7xl grid gap-6 md:grid-cols-2 lg:grid-cols-2/);
  assert.doesNotMatch(html, /xl:grid-cols-4/);
});

run('font sizing is tuned down for mobile-heavy headings and tightened body copy', () => {
  const indexHtml = readTemplate('index.html');
  const serviceHtml = readTemplate('service.html');
  const aboutHtml = readTemplate('about.html');
  const contactHtml = readTemplate('contact.html');
  const css = readTemplate(path.join('assets', 'css', 'style.css'));

  assert.match(css, /font-size:\s*clamp\(3\.6rem,\s*9\.5vw,\s*9rem\)/);
  assert.match(css, /font-size:\s*clamp\(2\.8rem,\s*17vw,\s*4\.6rem\)/);
  assert.match(indexHtml, /text-2xl lg:text-3xl/);
  assert.match(serviceHtml, /text-4xl[\s\S]*lg:text-7xl/);
  assert.match(aboutHtml, /text-4xl[\s\S]*lg:text-7xl/);
  assert.match(contactHtml, /text-4xl[\s\S]*lg:text-7xl/);
  assert.match(contactHtml, /text-xs leading-5/);
  assert.match(indexHtml, /text-2xl lg:text-3xl font-bold uppercase text-white">Brand Direction/);
});

run('shared footer includes repeat navigation and primary CTA', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /street creative studio/);
    assert.match(html, /相談する/);
    assert.match(html, /Home/);
    assert.match(html, /Services/);
    assert.match(html, /About/);
    assert.match(html, /Contact/);
  }
});

run('image swap slots are present on key pages', () => {
  const indexHtml = readTemplate('index.html');
  const serviceHtml = readTemplate('service.html');
  const aboutHtml = readTemplate('about.html');

  assert.equal((indexHtml.match(/<img[^>]+assets\/images\//g) || []).length, 2);
  assert.equal((serviceHtml.match(/<img[^>]+assets\/images\//g) || []).length, 1);
  assert.equal((aboutHtml.match(/<img[^>]+assets\/images\//g) || []).length, 1);
  assert.match(indexHtml, /<img[^>]+alt=/);
  assert.match(serviceHtml, /<img[^>]+alt=/);
  assert.match(aboutHtml, /<img[^>]+alt=/);
});
