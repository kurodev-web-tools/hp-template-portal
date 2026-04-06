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
  assert.match(html, /data-accordion-button/);
  assert.match(html, /data-accordion-panel/);
  assert.match(html, /service-panel-01/);
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
  assert.match(html, /伝える一言を、<br>先に決める。/);
  assert.match(html, /相談できる内容/);
  assert.match(html, /初回相談の流れ/);
  assert.match(html, /返信目安/);
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
    assert.match(html, /fonts\.googleapis\.com\/css2\?family=Archivo\+Black[\s\S]*family=Noto\+Sans\+JP[\s\S]*Material\+Symbols/);
  }
});

run('shared styles include sample cards, intake form polish, and wrap tuning', () => {
  const css = readCss();
  assert.match(css, /--v-display-font:\s*"Archivo Black",\s*"Noto Sans JP",\s*sans-serif/);
  assert.match(css, /body\s*\{[\s\S]*font-family:\s*"Noto Sans JP",\s*sans-serif/);
  assert.match(css, /\.v-stackline\s*\{[\s\S]*font-family:\s*var\(--v-display-font\)/);
  assert.match(css, /\.v-page-title\s*\{[\s\S]*font-family:\s*var\(--v-display-font\)/);
  assert.match(css, /\.v-section-title\s*\{[\s\S]*font-family:\s*var\(--v-display-font\)/);
  assert.match(css, /\.v-manifesto-line\s*\{[\s\S]*font-family:\s*var\(--v-display-font\)/);
  assert.match(css, /\.v-card-title\s*\{[\s\S]*font-family:\s*var\(--v-display-font\)/);
  assert.match(css, /\.v-signal-list\s*\{/);
  assert.match(css, /\.v-sample-card\s*\{/);
  assert.match(css, /\.v-contact-success\s*\{/);
  assert.match(css, /\.v-contact-lead \.v-page-title\s*\{/);
  assert.match(css, /\.v-service-toggle\s*\{/);
  assert.match(css, /\.v-service-toggle-icon\s*\{/);
  assert.match(css, /\.v-detail-grid\s*\{/);
  assert.match(css, /\.v-hidden\s*\{/);
  assert.match(css, /\.v-shell::after\s*\{[\s\S]*content:\s*none/);
  assert.match(css, /\.v-shell::before\s*\{[\s\S]*position:\s*absolute/);
  assert.doesNotMatch(css, /animation:\s*v-noise-shift 0\.2s steps\(2\) infinite;/);
  assert.doesNotMatch(css, /animation:\s*v-glow-pulse 6s ease-in-out infinite alternate;/);
  assert.match(css, /box-shadow:\s*0 10px 28px rgba\(0,0,0,0\.18\)/);
  assert.match(css, /transform:\s*translate\(3px,\s*-3px\)/);
  assert.match(css, /\.sticky\.top-0\s*\{[\s\S]*backdrop-filter:\s*blur\(6px\) !important/);
  assert.match(css, /main > section:first-of-type[\s\S]*opacity:\s*1/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /\.hidden\s*\{\s*display:\s*none\s*!important;/);
  assert.match(css, /text-wrap:\s*balance/);
  assert.match(css, /text-wrap:\s*pretty/);
});

run('shared script validates expanded contact form and toggles the success state', () => {
  const script = readScript();
  assert.match(script, /data-contact-form/);
  assert.match(script, /data-contact-success/);
  assert.match(script, /data-accordion-button/);
  assert.match(script, /syncAccordionState/);
  assert.match(script, /window\.innerWidth < 768/);
  assert.match(script, /checkValidity\(\)/);
  assert.match(script, /classList\.remove\("v-hidden"\)/);
  assert.match(script, /section:not\(:first-of-type\)/);
  assert.match(script, /preventDefault\(\)/);
  assert.match(script, /reset\(\)/);
});
