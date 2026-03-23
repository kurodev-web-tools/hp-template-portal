const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const readTemplate = (file) =>
  fs.readFileSync(path.join(__dirname, '..', 'public', 'templates', 'business', 'y', file), 'utf8');

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
  assert.match(html, /対象クライアント/);
  assert.match(html, /代表サービス/);
  assert.match(html, /導入の流れ/);
  assert.doesNotMatch(html, /仮値|差し替えてください|編集してください/);
});

run('service page includes detailed scope and first-step guidance', () => {
  const html = readTemplate('service.html');
  assert.match(html, /主な成果物/);
  assert.match(html, /向いている相談/);
  assert.match(html, /進行フロー/);
  assert.match(html, /初回相談/);
});

run('about page includes judgement, fit, and team stance', () => {
  const html = readTemplate('about.html');
  assert.match(html, /判断基準/);
  assert.match(html, /向いている案件/);
  assert.match(html, /チームスタンス/);
});

run('contact page includes trust-building guidance and no template notes', () => {
  const html = readTemplate('contact.html');
  assert.match(html, /相談できる内容/);
  assert.match(html, /返信目安/);
  assert.match(html, /初回相談の流れ/);
  assert.match(html, /未整理でも/);
  assert.doesNotMatch(html, /差し替えてください|仮値/);
});

run('shared footer includes repeat navigation and contact CTA', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /research-led advisory/);
    assert.match(html, /Overview/);
    assert.match(html, /Services/);
    assert.match(html, /Research Notes/);
    assert.match(html, /Contact/);
  }
});
