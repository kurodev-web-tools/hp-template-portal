const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const readTemplate = (file) =>
  fs.readFileSync(path.join(__dirname, '..', 'public', 'templates', 'business', 'z', file), 'utf8');

const readCss = () =>
  fs.readFileSync(
    path.join(__dirname, '..', 'public', 'templates', 'business', 'z', 'assets', 'css', 'style.css'),
    'utf8'
  );

const readScript = () =>
  fs.readFileSync(
    path.join(__dirname, '..', 'public', 'templates', 'business', 'z', 'assets', 'js', 'script.js'),
    'utf8'
  );

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
  assert.match(html, /予約前に[\s\S]*共有してほしいこと/);
  assert.match(html, /<li><strong>対象<\/strong><span class="z-meta-value">一人で過ごす時間を確保したい方<\/span><\/li>/);
  assert.match(html, /<li><strong>1<\/strong><span class="z-meta-value">希望日程の候補<\/span><\/li>/);
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

run('shared style reflects zen garden silence tokens and de-cardified layout', () => {
  const css = readCss();
  assert.match(css, /--z-bg:\s*#f7f7f7;/i);
  assert.match(css, /--z-sage:\s*#768a66;/i);
  assert.match(css, /\.z-nav\s*\{[\s\S]*font-size:\s*0\.88rem;/);
  assert.match(css, /\.z-page-title\s*\{[\s\S]*font-size:\s*clamp\(2\.8rem,\s*7vw,\s*5rem\);/);
  assert.match(css, /\.z-hero h1,\s*[\r\n\s]*\.z-chapter h2,\s*[\r\n\s]*\.z-flow-item h3\s*\{[\s\S]*font-style:\s*italic;[\s\S]*font-weight:\s*300;[\s\S]*letter-spacing:\s*-0\.02em;/);
  assert.match(css, /\.z-kicker\s*\{[\s\S]*margin:\s*0 0 0\.8rem;/);
  assert.match(css, /\.z-hero h1\s*\{[\s\S]*font-size:\s*clamp\(3rem,\s*8vw,\s*6\.4rem\);/);
  assert.match(css, /\.z-chapter h2\s*\{[\s\S]*font-size:\s*clamp\(2\.1rem,\s*5vw,\s*3\.8rem\);/);
  assert.match(css, /\.u-phrase\s*\{[\s\S]*display:\s*inline-block;[\s\S]*white-space:\s*nowrap;/);
  assert.match(css, /\.z-chapter h2\.z-card-title,\s*[\r\n\s]*\.z-chapter h3\.z-card-title,\s*[\r\n\s]*\.z-detail-card h3\s*\{[\s\S]*font-size:\s*clamp\(1\.45rem,\s*2\.4vw,\s*1\.95rem\)\s*!important;[\s\S]*letter-spacing:\s*-0\.015em;[\s\S]*white-space:\s*nowrap;[\s\S]*line-height:\s*1\.2;/);
  assert.match(css, /@media\s*\(max-width:\s*1400px\)\s*\{[\s\S]*\.z-practice-grid\s*\{[\s\S]*gap:\s*2\.5rem;[\s\S]*\}[\s\S]*\.z-detail-grid\s*\{[\s\S]*gap:\s*2\.5rem;[\s\S]*\}/);
  assert.match(css, /\.z-hero p,\s*[\r\n\s]*\.z-chapter p,\s*[\r\n\s]*\.z-list,\s*[\r\n\s]*\.z-form label\s*\{[\s\S]*line-height:\s*2(?:\.0)?;[\s\S]*opacity:\s*0\.7;/);
  assert.match(css, /\.z-chapter\s*\{[\s\S]*padding:\s*15vh 0;/);
  assert.match(css, /\.z-divider\s*\{[\s\S]*width:\s*1px;[\s\S]*height:\s*100px;[\s\S]*opacity:\s*0\.2;[\s\S]*margin:\s*5rem auto;/);
  assert.match(css, /\.z-flow-list\s*\{[\s\S]*gap:\s*6rem;/);
  assert.match(css, /\.z-detail-grid\s*\{[\s\S]*gap:\s*6rem;/);
  assert.match(css, /\.z-flow-item,\s*[\r\n\s]*\.z-detail-card\s*\{[\s\S]*padding:\s*2\.2rem 1\.4rem;[\s\S]*border:\s*0;[\s\S]*background:\s*transparent;/);
  assert.match(css, /\.z-button\s*\{[\s\S]*font-size:\s*0\.94rem;/);
  assert.match(css, /\.z-footer-brand strong\s*\{[\s\S]*font-size:\s*1\.8rem;/);
  assert.match(css, /\.z-footer-nav\s*\{[\s\S]*font-size:\s*0\.88rem;/);
  assert.match(css, /\.z-footer-base\s*\{[\s\S]*font-size:\s*0\.78rem;/);
});

run('index page hero and floating entries avoid boxed list presentation', () => {
  const html = readTemplate('index.html');
  assert.match(html, /<section class="z-chapter z-hero">[\s\S]*<div class="z-hero-intro">[\s\S]*<div class="z-hero-copy">/);
  assert.match(html, /<section class="z-chapter">[\s\S]*<div class="z-flow-list">[\s\S]*<div class="z-divider"><\/div>[\s\S]*<article class="z-flow-item">/);
  assert.match(html, /<section class="z-chapter z-soft-section">[\s\S]*<div class="z-divider"><\/div>[\s\S]*<div class="z-detail-grid">/);
});

run('shared style includes texture, quiet reveal, and motion-safe polish', () => {
  const css = readCss();
  assert.match(css, /body::before\s*\{[\s\S]*position:\s*fixed;[\s\S]*pointer-events:\s*none;[\s\S]*opacity:\s*0\./);
  assert.match(css, /radial-gradient\(/);
  assert.match(css, /\.z-chapter,\s*[\r\n\s]*\.z-flow-item,\s*[\r\n\s]*\.z-detail-card,\s*[\r\n\s]*\.z-divider\s*\{[\s\S]*opacity:\s*0;[\s\S]*transform:\s*translateY\(/);
  assert.match(css, /\.z-divider\s*\{[\s\S]*height:\s*0;[\s\S]*transform-origin:\s*top center;/);
  assert.match(css, /\.z-divider\.is-visible\s*\{[\s\S]*height:\s*100px;[\s\S]*transform:\s*none;/);
  assert.match(css, /\.z-menu\s*\{[\s\S]*background:\s*none;[\s\S]*border:\s*0;/);
  assert.match(css, /\.z-menu::after\s*\{[\s\S]*height:\s*1px;/);
  assert.match(css, /\.z-button\s*\{[\s\S]*transition:\s*[^;]*background-color[^;]*border-color[^;]*color[^;]*transform/s);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*\.z-chapter,\s*[\s\S]*\.z-divider\.is-visible/s);
});

run('shared style balances heading wraps and preserves mobile side padding', () => {
  const css = readCss();
  assert.match(css, /\.z-hero h1,\s*[\r\n\s]*\.z-chapter h2,\s*[\r\n\s]*\.z-chapter h3\s*\{[\s\S]*text-wrap:\s*balance;/);
  assert.match(css, /\.u-phrase\s*\{[\s\S]*display:\s*inline-block;[\s\S]*white-space:\s*nowrap;/);
  assert.match(css, /@media\s*\(max-width:\s*920px\)\s*\{[\s\S]*\.z-practice-grid\s*\{[\s\S]*grid-template-columns:\s*1fr;[\s\S]*\}[\s\S]*\.z-detail-grid\s*\{[\s\S]*grid-template-columns:\s*1fr;[\s\S]*\}[\s\S]*\.z-hero h1,\s*[\s\S]*\.z-page-title,\s*[\s\S]*\.z-chapter h2,\s*[\s\S]*\.z-chapter h3\s*\{[\s\S]*padding-inline:\s*20px;/s);
});

run('all pages wrap heading phrases with u-phrase spans', () => {
  const index = readTemplate('index.html');
  const about = readTemplate('about.html');
  const service = readTemplate('service.html');
  const contact = readTemplate('contact.html');

  assert.match(index, /<h1><span class="u-phrase">静けさを、<\/span><span class="u-phrase">一章ずつ整える。<\/span><\/h1>/);
  assert.match(index, /<h2><span class="u-phrase">音を減らし、<\/span><span class="u-phrase">素材の気配を残す。<\/span><\/h2>/);
  assert.match(index, /<h3><span class="u-phrase">朝は<\/span><span class="u-phrase">呼吸から始める。<\/span><\/h3>/);

  assert.match(about, /<h1 class="z-page-title"><span class="u-phrase">静けさは、<\/span><span class="u-phrase">空白の密度でつくる。<\/span><\/h1>/);
  assert.match(about, /<h2><span class="u-phrase">石、木、布<\/span><\/h2>/);

  assert.match(service, /<h1 class="z-page-title"><span class="u-phrase">体験を、<\/span><span class="u-phrase">静かな章で分ける。<\/span><\/h1>/);
  assert.match(service, /<h2 class="z-card-title"><span class="u-phrase">個人リトリート<\/span><\/h2>/);
  assert.match(service, /<h2 class="z-card-title"><span class="u-phrase">少人数セッション<\/span><\/h2>/);
  assert.match(service, /<h2 class="z-card-title"><span class="u-phrase">季節の実践<\/span><\/h2>/);
  assert.match(service, /<h2><span class="u-phrase">予約前に<\/span><span class="u-phrase">共有してほしいこと<\/span><\/h2>/);

  assert.match(contact, /<h1 class="z-page-title"><span class="u-phrase">静かな滞在の相談を<\/span><span class="u-phrase">受け付けています。<\/span><\/h1>/);
  assert.match(contact, /<h2><span class="u-phrase">初回相談で<\/span><span class="u-phrase">共有いただきたいこと<\/span><\/h2>/);
});

run('service metadata lists use museum label stacks', () => {
  const css = readCss();
  const html = readTemplate('service.html');

  assert.match(css, /\.z-detail-card\s*\{[^}]*display:\s*grid;[^}]*grid-template-rows:\s*2rem 4rem 8\.5rem 1fr;[^}]*align-content:\s*start;[^}]*gap:\s*0;[^}]*padding:\s*2\.2rem 1\.4rem;/);
  assert.match(css, /\.z-detail-card \.z-kicker\s*\{[^}]*grid-row:\s*1;[^}]*margin:\s*0;/);
  assert.match(css, /\.z-detail-card h2,\s*[\r\n\s]*\.z-detail-card h3\s*\{[^}]*grid-row:\s*2;[^}]*margin:\s*0 0 1\.5rem;/);
  assert.match(css, /\.z-detail-card h2 \+ p\s*\{[^}]*grid-row:\s*3;[^}]*margin:\s*0;[^}]*align-self:\s*start;/);
  assert.match(css, /\.z-detail-card \.z-meta-list\s*\{[^}]*grid-row:\s*4;[^}]*margin-top:\s*0;/);
  assert.match(css, /\.z-meta-list\s*\{[^}]*display:\s*flex;[^}]*flex-direction:\s*column;[^}]*gap:\s*1\.5rem;[^}]*margin-top:\s*2rem;[^}]*padding:\s*0;[^}]*list-style:\s*none;/);
  assert.match(css, /\.z-meta-list li\s*\{[^}]*display:\s*flex;[^}]*flex-direction:\s*column;[^}]*gap:\s*0\.5rem;[^}]*min-height:\s*7\.2rem;[^}]*padding-bottom:\s*1rem;/);
  assert.match(css, /\.z-soft-section \.z-meta-list li\s*\{[^}]*min-height:\s*auto;/);
  assert.match(css, /@media\s*\(max-width:\s*920px\)\s*\{[\s\S]*\.z-meta-list li\s*\{[\s\S]*min-height:\s*auto;[\s\S]*margin-bottom:\s*1\.5rem;[\s\S]*\}/s);
  assert.match(css, /\.z-meta-list strong\s*\{[^}]*display:\s*block;[^}]*margin-bottom:\s*0\.4rem;[^}]*font-size:\s*0\.75rem;[^}]*color:\s*var\(--z-sage\);[^}]*letter-spacing:\s*0\.1em;[^}]*border-bottom:\s*1px solid rgba\(0,0,0,0\.08\);[^}]*padding-bottom:\s*0\.2rem;[^}]*width:\s*fit-content;/);
  assert.match(css, /\.z-meta-value\s*\{[^}]*font-size:\s*0\.95rem;[^}]*line-height:\s*1\.8;[^}]*color:\s*var\(--z-ink\);/);
  assert.doesNotMatch(css, /\.z-meta-list li\s*\{[^}]*display:\s*contents;/);
  assert.doesNotMatch(css, /@media\s*\(max-width:\s*920px\)\s*\{[\s\S]*\.z-meta-list\s*\{[^}]*grid-template-columns:/s);

  assert.match(html, /<article class="z-detail-card">[\s\S]*<h2 class="z-card-title"><span class="u-phrase">個人リトリート<\/span><\/h2>\s*<p>[\s\S]*<\/p>\s*<ul class="z-list z-meta-list">/);
  assert.match(html, /<article class="z-detail-card">[\s\S]*<h2 class="z-card-title"><span class="u-phrase">少人数セッション<\/span><\/h2>\s*<p>[\s\S]*<\/p>\s*<ul class="z-list z-meta-list">/);
  assert.match(html, /<article class="z-detail-card">[\s\S]*<h2 class="z-card-title"><span class="u-phrase">季節の実践<\/span><\/h2>\s*<p>[\s\S]*<\/p>\s*<ul class="z-list z-meta-list">/);
  assert.match(html, /<ul class="z-list z-meta-list">[\s\S]*<li><strong>対象<\/strong><span class="z-meta-value">/);
  assert.match(html, /<ul class="z-list z-meta-list">[\s\S]*<li><strong>1<\/strong><span class="z-meta-value">希望日程の候補<\/span><\/li>/);
});

run('shared script reveals zen elements once on intersection', () => {
  const script = readScript();
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /querySelectorAll\("\.z-chapter, \.z-flow-item, \.z-detail-card, \.z-divider"\)/);
  assert.match(script, /entry\.target\.classList\.add\("is-visible"\)/);
  assert.match(script, /observer\.unobserve\(entry\.target\)/);
});









