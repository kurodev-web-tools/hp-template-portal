const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const readTemplate = (file) =>
  fs.readFileSync(path.join(__dirname, '..', 'public', 'templates', 'business', 'x', file), 'utf8');

const run = (name, fn) => {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
};

run('index page includes richer business sections and no template notes', () => {
  const html = readTemplate('index.html');
  assert.match(html, /導入の流れ/);
  assert.match(html, /代表サービス/);
  assert.match(html, /対象クライアント/);
  assert.doesNotMatch(html, /モック用|編集してください|仮置き|Template/);
});

run('service page includes deliverables and first-step guidance', () => {
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

run('contact page includes trust guidance and required fields', () => {
  const html = readTemplate('contact.html');
  assert.match(html, /相談できる内容/);
  assert.match(html, /返信目安/);
  assert.match(html, /初回相談の流れ/);
  assert.match(html, /required/);
  assert.doesNotMatch(html, /仮置き|Template/);
});

run('shared footer includes repeat navigation and CTA', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /action brand studio/);
    assert.match(html, /Home/);
    assert.match(html, /Programs|Format/);
    assert.match(html, /Crew|About/);
    assert.match(html, /Entry|Contact/);
  }
});
