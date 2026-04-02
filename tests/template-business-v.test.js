const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const templateRoot = path.join(__dirname, '..', 'public', 'templates', 'business', 'v');

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

run('index page includes deliverables, case output samples, and cleaned brand metadata', () => {
  const html = readTemplate('index.html');
  assert.match(html, /支援領域/);
  assert.match(html, /納品イメージ/);
  assert.match(html, /成果サンプル/);
  assert.match(html, /案件の進め方/);
  assert.match(html, /Nexa Teamwork Cloud/);
  assert.match(html, /採用LP見出し案/);
  assert.match(html, /https:\/\/vivid-impact\.jp\/business\/v\//);
  assert.doesNotMatch(html, /example\.com/);
});

run('service page explains support modules, outputs, and production scenes', () => {
  const html = readTemplate('service.html');
  assert.match(html, /支援メニュー/);
  assert.match(html, /納品物の例/);
  assert.match(html, /進行イメージ/);
  assert.match(html, /よくある依頼の組み合わせ/);
  assert.match(html, /ブランドメッセージ設計書/);
  assert.match(html, /公開前72時間の導線調整/);
});

run('about page includes team setup, working rhythm, and fit guidance', () => {
  const html = readTemplate('about.html');
  assert.match(html, /チーム体制/);
  assert.match(html, /制作の進み方/);
  assert.match(html, /判断基準/);
  assert.match(html, /向いている相談/);
  assert.match(html, /ストラテジスト/);
  assert.match(html, /コピーと構成の両方を同時に確認/);
});

run('contact page includes deal-intake fields, static success panel, and no placeholder metadata', () => {
  const html = readTemplate('contact.html');
  assert.match(html, /data-contact-form/);
  assert.match(html, /相談テーマ/);
  assert.match(html, /公開予定時期/);
  assert.match(html, /想定予算/);
  assert.match(html, /参考URL/);
  assert.match(html, /data-contact-success/);
  assert.match(html, /初回整理メモをお送りします/);
  assert.doesNotMatch(html, /example\.com/);
  assert.doesNotMatch(html, /hello@example\.com/);
});

run('shared layout keeps business navigation and live-feeling contact entry points', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /VIVID IMPACT/);
    assert.match(html, /Home/);
    assert.match(html, /Services/);
    assert.match(html, /Manifesto/);
    assert.match(html, /Contact/);
    assert.match(html, /相談する/);
  }
});

run('shared styles include sample cards, intake form polish, and wrap tuning', () => {
  const css = readCss();
  assert.match(css, /\.v-signal-list\s*\{/);
  assert.match(css, /\.v-sample-card\s*\{/);
  assert.match(css, /\.v-contact-success\s*\{/);
  assert.match(css, /\.v-detail-grid\s*\{/);
  assert.match(css, /text-wrap:\s*balance/);
  assert.match(css, /text-wrap:\s*pretty/);
});

run('shared script validates expanded contact form and toggles the success state', () => {
  const script = readScript();
  assert.match(script, /data-contact-form/);
  assert.match(script, /data-contact-success/);
  assert.match(script, /checkValidity\(\)/);
  assert.match(script, /classList\.remove\("hidden"\)/);
  assert.match(script, /preventDefault\(\)/);
  assert.match(script, /reset\(\)/);
});
