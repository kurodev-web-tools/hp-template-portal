const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const readTemplate = (file) =>
  fs.readFileSync(path.join(__dirname, '..', 'public', 'templates', 'business', 'z', file), 'utf8');

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
  assert.match(html, /対象者/);
  assert.match(html, /代表プログラム/);
  assert.match(html, /滞在の流れ/);
  assert.doesNotMatch(html, /テンプレート用|差し替えてください|編集してください/);
});

run('service page includes detailed practice guidance', () => {
  const html = readTemplate('service.html');
  assert.match(html, /向いている相談/);
  assert.match(html, /所要イメージ/);
  assert.match(html, /予約前に共有してほしいこと/);
});

run('about page includes judgement, fit, and brand stance', () => {
  const html = readTemplate('about.html');
  assert.match(html, /判断基準/);
  assert.match(html, /向いている滞在/);
  assert.match(html, /ブランドスタンス/);
});

run('contact page includes trust-building guidance and no template notes', () => {
  const html = readTemplate('contact.html');
  assert.match(html, /相談できる内容/);
  assert.match(html, /返信目安/);
  assert.match(html, /初回相談の流れ/);
  assert.match(html, /未確定でも相談/);
  assert.doesNotMatch(html, /テンプレート用|差し替えてください/);
});

run('shared footer includes repeat navigation and reserve CTA', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /quiet practice/);
    assert.match(html, /Home/);
    assert.match(html, /Practice/);
    assert.match(html, /Philosophy/);
    assert.match(html, /Reserve/);
  }
});
