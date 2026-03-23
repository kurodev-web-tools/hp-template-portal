const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const readTemplate = (file) =>
  fs.readFileSync(path.join(__dirname, '..', 'public', 'templates', 'business', 'w', file), 'utf8');

const run = (name, fn) => {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
};

run('index page includes real-site sections and no template notes', () => {
  const html = readTemplate('index.html');
  assert.match(html, /対象施設/);
  assert.match(html, /代表サービス/);
  assert.match(html, /導入の流れ/);
  assert.match(html, /相談する/);
  assert.doesNotMatch(html, /差し替え前提|静的レビュー上|Template/);
});

run('service page includes detailed phases and consult guidance', () => {
  const html = readTemplate('service.html');
  assert.match(html, /主な設計対象/);
  assert.match(html, /向いている相談/);
  assert.match(html, /進行フロー/);
  assert.match(html, /初回相談/);
});

run('about page includes judgement, fit, and team stance details', () => {
  const html = readTemplate('about.html');
  assert.match(html, /判断基準/);
  assert.match(html, /向いている案件/);
  assert.match(html, /チームスタンス/);
});

run('contact page includes trust-building guidance and no placeholder notes', () => {
  const html = readTemplate('contact.html');
  assert.match(html, /相談できる内容/);
  assert.match(html, /返信目安/);
  assert.match(html, /初回相談の流れ/);
  assert.match(html, /要件がまだ固まっていなくても/);
  assert.doesNotMatch(html, /仮置き|差し替えてください|Template/);
});

run('shared footer includes repeat navigation and CTA', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /landscape stay studio/);
    assert.match(html, /Home/);
    assert.match(html, /About/);
    assert.match(html, /Stay Flow/);
    assert.match(html, /Contact/);
    assert.match(html, /相談する/);
  }
});
