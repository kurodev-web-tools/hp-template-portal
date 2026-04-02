const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const templateRoot = path.join(__dirname, '..', 'public', 'templates', 'business', 'w');

const readTemplate = (file) => fs.readFileSync(path.join(templateRoot, file), 'utf8');
const readCss = () => readTemplate(path.join('assets', 'css', 'style.css'));
const readScript = () => readTemplate(path.join('assets', 'js', 'script.js'));

const run = (name, fn) => {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
};

run('index page includes case studies, trust signals, and cleaned metadata', () => {
  const html = readTemplate('index.html');
  assert.match(html, /id="cases"/);
  assert.match(html, /導入事例/);
  assert.match(html, /潮見ヶ浦テラスホテル/);
  assert.match(html, /雨晴別邸 風路/);
  assert.match(html, /掲載・登壇実績/);
  assert.match(html, /canonical/);
  assert.match(html, /og:title/);
  assert.match(html, /twitter:card/);
  assert.match(html, /https:\/\/wide-horizon\.jp\/templates\/business\/w\//);
  assert.doesNotMatch(html, /example\.com/);
  assert.doesNotMatch(html, /\[REPLACE_IMG:/);
});

run('shared navigation and footer link case studies back to the index anchor', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /<a href="index\.html#cases">事例<\/a>/);
    assert.match(html, /<a href="index\.html#cases">導入事例<\/a>|<a href="index\.html#cases">事例<\/a>/);
    assert.doesNotMatch(html, /href="#"/);
  }
});

run('service page explains support scope, deliverables, and schedule', () => {
  const html = readTemplate('service.html');
  assert.match(html, /支援範囲/);
  assert.match(html, /成果物/);
  assert.match(html, /標準スケジュール/);
  assert.match(html, /現地確認と導線整理/);
  assert.match(html, /予約導線と公開導線の調整/);
});

run('about page includes team structure, judgement criteria, and fit guidance', () => {
  const html = readTemplate('about.html');
  assert.match(html, /チーム体制/);
  assert.match(html, /判断基準/);
  assert.match(html, /向いている案件/);
  assert.match(html, /運営・設計・撮影の三者で/);
});

run('contact page includes static completion UI and consultation guidance', () => {
  const html = readTemplate('contact.html');
  assert.match(html, /相談できる内容/);
  assert.match(html, /返信目安/);
  assert.match(html, /初回相談の流れ/);
  assert.match(html, /data-contact-form/);
  assert.match(html, /data-contact-success/);
  assert.match(html, /お問い合わせありがとうございました/);
  assert.doesNotMatch(html, /action="#"/);
});

run('shared styles include case-study and form-success sections with wrap polish', () => {
  const css = readCss();
  assert.match(css, /\.case-studies\s*\{/);
  assert.match(css, /\.case-card\s*\{/);
  assert.match(css, /\.trust-strip\s*\{/);
  assert.match(css, /\.contact-success\s*\{/);
  assert.match(css, /text-wrap:\s*balance/);
  assert.match(css, /text-wrap:\s*pretty/);
});

run('shared script handles static contact completion without navigation', () => {
  const script = readScript();
  assert.match(script, /data-contact-form/);
  assert.match(script, /preventDefault\(\)/);
  assert.match(script, /data-contact-success/);
  assert.match(script, /reset\(\)/);
});
