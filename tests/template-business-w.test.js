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
  const css = readCss();
  assert.match(html, /id="cases"/);
  assert.match(html, /導入事例/);
  assert.match(html, /<h2 class="section-title section-title-sm case-section-title">導入事例<\/h2>/);
  assert.match(html, /<div class="feature-grid target-facilities-grid">/);
  assert.match(html, /<div class="trust-strip trust-strip-light reveal">/);
  assert.match(html, /<article class="trust-item trust-item-light">/);
  assert.match(html, /<p class="section-lead section-lead-desktop">相談背景、整えた導線、公開後の変化を短くまとめています。<br>施設名は掲載用の仮称です。<\/p>/);
  assert.match(html, /<p class="section-lead section-lead-mobile">相談背景、整えた導線、公開後の変化を短くまとめています。施設名は掲載用の仮称です。<\/p>/);
  assert.match(html, /<div class="footer-brand">[\s\S]*<p>宿泊施設の景観導線を、到着前の期待から<br>現地の余韻まで一連の体験として整える<br>landscape stay studio です。<\/p>/);
  assert.match(html, /潮見ヶ浦テラスホテル/);
  assert.match(html, /雨晴別邸 風路/);
  assert.match(html, /すべての事例を見る/);
  assert.match(html, /href="cases\.html"/);
  assert.match(html, /掲載・登壇実績/);
  assert.match(html, /canonical/);
  assert.match(html, /og:title/);
  assert.match(html, /twitter:card/);
  assert.match(html, /https:\/\/wide-horizon\.jp\/templates\/business\/w\//);
  assert.match(css, /\.case-section-title\s*\{[\s\S]*font-size:\s*clamp\(1\.9rem,\s*3vw,\s*3rem\);/);
  assert.doesNotMatch(html, /example\.com/);
  assert.doesNotMatch(html, /\[REPLACE_IMG:/);
});

run('what we do section uses a title-first layout with stable two-line heading on desktop', () => {
  const html = readTemplate('index.html');
  const css = readCss();
  assert.match(html, /<h1 class="hero-title">[\s\S]*<span class="hero-title-line hero-title-line-desktop">景観導線を整え、<\/span>[\s\S]*<span class="hero-title-line hero-title-line-desktop">滞在の記憶を深くする。<\/span>[\s\S]*<span class="hero-title-line hero-title-line-mobile">景観導線を整え、<\/span>[\s\S]*<span class="hero-title-line hero-title-line-mobile">滞在の記憶を深く<\/span>[\s\S]*<span class="hero-title-line hero-title-line-mobile">する。<\/span>[\s\S]*<\/h1>/);
  assert.match(html, /<p class="hero-copy hero-copy-desktop">リゾートホテル、旅館、ヴィラの景観体験を、<br>到着前の期待づくりから現地の余韻まで一連の導線として設計します。<\/p>/);
  assert.match(html, /<p class="hero-copy hero-copy-mobile">リゾートホテル、旅館、ヴィラの景観体験を、到着前の期待づくりから現地の余韻まで一連の導線として設計します。<\/p>/);
  assert.match(html, /<section class="section-white section-pad">[\s\S]*<div class="presence-layout">[\s\S]*<div class="presence-heading reveal">[\s\S]*<h2 class="section-title section-title-md presence-title">/);
  assert.match(html, /<h2 class="section-title section-title-md presence-title"><span class="presence-title-line">宿泊施設の価値を、<\/span><span class="presence-title-line">見える順番から設計する。<\/span><\/h2>/);
  assert.match(html, /<div class="presence-detail-row">[\s\S]*<div class="presence-copy reveal reveal-d1">[\s\S]*<div class="presence-stats reveal reveal-d2">/);
  assert.match(css, /\.presence-layout\s*\{/);
  assert.match(css, /\.presence-title\s*\{[\s\S]*text-wrap:\s*normal;/);
  assert.match(css, /\.presence-title-line\s*\{[\s\S]*display:\s*block;/);
  assert.match(css, /\.hero-title-line-mobile\s*\{\s*display:\s*none;\s*\}/);
  assert.match(css, /\.hero-title-line-desktop\s*\{\s*display:\s*block;\s*\}/);
  assert.match(css, /\.hero-copy-mobile\s*\{\s*display:\s*none;\s*\}/);
  assert.match(css, /\.hero-copy-desktop\s*\{\s*display:\s*block;\s*\}/);
  assert.match(css, /\.presence-detail-row\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1\.3fr\)\s*fit-content\(33rem\);/);
  assert.match(css, /\.presence-stats\s*\{[\s\S]*display:\s*grid;[\s\S]*grid-template-columns:\s*repeat\(3,\s*max-content\);[\s\S]*gap:\s*1\.6rem;[\s\S]*width:\s*auto;[\s\S]*justify-content:\s*flex-start;[\s\S]*justify-self:\s*start;[\s\S]*margin-left:\s*-0\.9rem;/);
  assert.match(css, /\.presence-stats \.stat-item\s*\{[\s\S]*width:\s*auto;[\s\S]*max-width:\s*none;[\s\S]*min-width:\s*6\.8rem;/);
  assert.match(css, /\.stat-number\s*\{[\s\S]*white-space:\s*nowrap;/);
});

run('support scope section on index locks the heading to two lines on desktop', () => {
  const html = readTemplate('index.html');
  const css = readCss();
  assert.match(html, /<h2 class="section-title section-title-md split-title"><span class="split-title-line">設計・運営・発信を<\/span><span class="split-title-line">ひとつの流れに<\/span><span class="split-title-line">そろえる。<\/span><\/h2>/);
  assert.match(css, /\.split-title\s*\{[\s\S]*width:\s*fit-content;[\s\S]*max-width:\s*none;[\s\S]*font-size:\s*clamp\(1\.9rem,\s*3vw,\s*3rem\);[\s\S]*text-wrap:\s*normal;/);
  assert.match(css, /\.split-title-line\s*\{[\s\S]*display:\s*block;/);
});

run('target facilities section on index locks the heading to two lines on desktop', () => {
  const html = readTemplate('index.html');
  const css = readCss();
  assert.match(html, /<h2 class="section-title section-title-sm facility-title">[\s\S]*<span class="facility-title-line facility-title-line-desktop">対象施設ごとに、<\/span>[\s\S]*<span class="facility-title-line facility-title-line-desktop">設計の起点を変えます。<\/span>[\s\S]*<span class="facility-title-line facility-title-line-mobile">対象施設ごとに、<\/span>[\s\S]*<span class="facility-title-line facility-title-line-mobile">設計の起点を<\/span>[\s\S]*<span class="facility-title-line facility-title-line-mobile">変えます。<\/span>[\s\S]*<\/h2>/);
  assert.match(html, /<p class="section-lead section-lead-desktop">業態が変われば、整えるべき見せ場も変わります。<br>施設タイプごとに相談テーマを整理しています。<\/p>/);
  assert.match(html, /<p class="section-lead section-lead-mobile">業態が変われば、整えるべき見せ場も変わります。施設タイプごとに相談テーマを整理しています。<\/p>/);
  assert.match(css, /\.facility-title\s*\{[\s\S]*width:\s*fit-content;[\s\S]*max-width:\s*none;[\s\S]*font-size:\s*clamp\(1\.9rem,\s*3vw,\s*3rem\);[\s\S]*text-wrap:\s*normal;/);
  assert.match(css, /\.facility-title-line\s*\{[\s\S]*display:\s*block;/);
  assert.match(css, /\.facility-title-line-mobile\s*\{\s*display:\s*none;\s*\}/);
  assert.match(css, /\.facility-title-line-desktop\s*\{\s*display:\s*block;\s*\}/);
  assert.match(css, /\.target-facilities-grid\s*\{[\s\S]*gap:\s*0;[\s\S]*border-top:\s*1px solid var\(--line\);/);
  assert.match(css, /\.target-facility-item\s*\{[\s\S]*border:\s*0;[\s\S]*border-radius:\s*0;[\s\S]*box-shadow:\s*none;[\s\S]*background:\s*transparent;[\s\S]*padding:\s*1\.75rem 1\.75rem 1\.9rem;[\s\S]*border-bottom:\s*1px solid var\(--line\);/);
  assert.match(css, /\.target-facility-item:nth-child\(odd\)\s*\{[\s\S]*padding-right:\s*2\.5rem;[\s\S]*padding-left:\s*1\.75rem;/);
  assert.match(css, /@media \(max-width:\s*1100px\)\s*\{[\s\S]*\.target-facility-item,\s*[\s\S]*\.target-facility-item:nth-child\(odd\),\s*[\s\S]*\.target-facility-item:nth-child\(even\)\s*\{\s*padding:\s*1\.5rem 1\.25rem;\s*\}/);
  assert.match(css, /\.section-lead-mobile\s*\{\s*display:\s*none;\s*\}/);
  assert.match(css, /\.section-lead-desktop\s*\{\s*display:\s*block;\s*\}/);
});

run('stay sequence de-emphasizes heading and enlarges imagery', () => {
  const html = readTemplate('index.html');
  const css = readCss();
  assert.match(html, /<h2 class="section-title section-title-sm gallery-title"><span class="gallery-title-line">滞在の流れで見る<\/span><span class="gallery-title-line">景観導線の整理<\/span><\/h2>/);
  assert.match(css, /\.gallery-header\s*\{[\s\S]*padding:\s*0 4rem 1\.5rem;/);
  assert.match(css, /\.gallery-copy\s*\{[\s\S]*max-width:\s*32rem;/);
  assert.match(css, /\.gallery-copy \.section-title\s*\{[\s\S]*font-size:\s*clamp\(1\.7rem,\s*2\.6vw,\s*2\.75rem\);/);
  assert.match(css, /\.gallery-title-line\s*\{\s*display:\s*block;/);
  assert.match(css, /\.snap-gallery\s*\{[\s\S]*padding:\s*0\.5rem clamp\(3rem,\s*6vw,\s*5rem\) 2rem;[\s\S]*scroll-padding-inline:\s*clamp\(3rem,\s*6vw,\s*5rem\);/);
  assert.match(css, /\.snap-card\s*\{[\s\S]*flex:\s*0 0 82vw;[\s\S]*max-width:\s*1100px;[\s\S]*aspect-ratio:\s*18 \/ 10;/);
  assert.match(css, /\.gallery-btn\s*\{[\s\S]*border:\s*1px solid rgba\(26,\s*37,\s*53,\s*0\.08\);[\s\S]*background:\s*rgba\(255,\s*255,\s*255,\s*0\.72\);/);
});

run('index mobile styles relax heading wraps and reflow presence stats', () => {
  const html = readTemplate('index.html');
  const css = readCss();
  assert.match(html, /<h3 class="intro-panel-title">[\s\S]*<span class="intro-panel-title-line intro-panel-title-line-desktop">景色は良いのに、予約前に<\/span>[\s\S]*<span class="intro-panel-title-line intro-panel-title-line-desktop">伝わらない。<\/span>[\s\S]*<span class="intro-panel-title-line intro-panel-title-line-mobile">景色は良いのに、<\/span>[\s\S]*<span class="intro-panel-title-line intro-panel-title-line-mobile">予約前に<\/span>[\s\S]*<span class="intro-panel-title-line intro-panel-title-line-mobile">伝わらない。<\/span>[\s\S]*<\/h3>/);
  assert.match(html, /<h3 class="intro-panel-title">[\s\S]*<span class="intro-panel-title-line intro-panel-title-line-desktop">運営視点と設計視点を<\/span>[\s\S]*<span class="intro-panel-title-line intro-panel-title-line-desktop">同じ図面で扱う。<\/span>[\s\S]*<span class="intro-panel-title-line intro-panel-title-line-mobile">運営視点と設計視点を<\/span>[\s\S]*<span class="intro-panel-title-line intro-panel-title-line-mobile">同じ図面で<\/span>[\s\S]*<span class="intro-panel-title-line intro-panel-title-line-mobile">扱う。<\/span>[\s\S]*<\/h3>/);
  assert.match(html, /<h2 class="section-title white cta-title">[\s\S]*<span class="cta-title-line cta-title-line-desktop">まずは、施設の景観課題を<\/span>[\s\S]*<span class="cta-title-line cta-title-line-desktop">短く共有してください。<\/span>[\s\S]*<span class="cta-title-line cta-title-line-mobile">まずは、施設の<\/span>[\s\S]*<span class="cta-title-line cta-title-line-mobile">景観課題を<\/span>[\s\S]*<span class="cta-title-line cta-title-line-mobile">短く共有してください。<\/span>[\s\S]*<\/h2>/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.section-title\s*\{[\s\S]*font-size:\s*clamp\(1\.75rem,\s*6\.6vw,\s*2\.35rem\);[\s\S]*line-height:\s*1\.2;/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.presence-title,\s*[\s\S]*\.gallery-copy \.section-title,\s*[\s\S]*\.split-title,\s*[\s\S]*\.facility-title,\s*[\s\S]*\.case-section-title,\s*[\s\S]*\.section-cta \.section-title,\s*[\s\S]*\.intro-panel h3\s*\{[\s\S]*font-size:\s*clamp\(1\.75rem,\s*6\.6vw,\s*2\.35rem\);/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.presence-title,\s*[\s\S]*\.split-title,\s*[\s\S]*\.facility-title\s*\{[\s\S]*text-wrap:\s*normal;/);
  assert.match(css, /\.hero-title-line\s*\{\s*display:\s*block;/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.hero-title\s*\{[\s\S]*font-size:\s*2rem;[\s\S]*line-height:\s*1\.14;/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.hero-title-line-desktop\s*\{\s*display:\s*none;\s*\}[\s\S]*\.hero-title-line-mobile\s*\{\s*display:\s*block;\s*\}/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.presence-title-line,\s*[\s\S]*\.split-title-line,\s*[\s\S]*\.facility-title-line,\s*[\s\S]*\.hero-title-line\s*\{\s*display:\s*block;/);
  assert.match(css, /\.intro-panel-title-line,\s*[\s\S]*\.cta-title-line\s*\{\s*display:\s*block;/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.gallery-title,\s*[\s\S]*\.cta-title,\s*[\s\S]*\.intro-panel-title\s*\{\s*text-wrap:\s*normal;/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.gallery-title-line,\s*[\s\S]*\.cta-title-line,\s*[\s\S]*\.intro-panel-title-line\s*\{\s*display:\s*block;/);
  assert.match(css, /\.intro-panel-title-line-mobile,\s*[\s\S]*\.cta-title-line-mobile,\s*[\s\S]*\.facility-title-line-mobile\s*\{\s*display:\s*none;\s*\}/);
  assert.match(css, /\.intro-panel-title-line-desktop,\s*[\s\S]*\.cta-title-line-desktop,\s*[\s\S]*\.facility-title-line-desktop\s*\{\s*display:\s*block;\s*\}/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.cta-title\s*\{[\s\S]*font-size:\s*clamp\(1\.48rem,\s*5\.45vw,\s*1\.95rem\);[\s\S]*line-height:\s*1\.16;/);
  assert.match(css, /\.cta-lead-mobile\s*\{\s*display:\s*none;\s*\}/);
  assert.match(css, /\.cta-lead-desktop\s*\{\s*display:\s*block;\s*\}/);
  assert.match(css, /\.cta-lead\s*\{[\s\S]*text-align:\s*center;[\s\S]*margin:\s*1\.5rem auto 0;[\s\S]*max-width:\s*52ch;/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.hero-copy-desktop,\s*[\s\S]*\.section-lead-desktop\s*\{\s*display:\s*none;\s*\}[\s\S]*\.hero-copy-mobile,\s*[\s\S]*\.section-lead-mobile\s*\{\s*display:\s*block;\s*\}/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.facility-title-line-desktop,\s*[\s\S]*\.intro-panel-title-line-desktop,\s*[\s\S]*\.cta-title-line-desktop,\s*[\s\S]*\.cta-lead-desktop\s*\{\s*display:\s*none;\s*\}[\s\S]*\.facility-title-line-mobile,\s*[\s\S]*\.intro-panel-title-line-mobile,\s*[\s\S]*\.cta-title-line-mobile,\s*[\s\S]*\.cta-lead-mobile\s*\{\s*display:\s*block;\s*\}/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.presence-stats\s*\{[\s\S]*display:\s*grid;[\s\S]*grid-template-columns:\s*1fr;[\s\S]*width:\s*100%;[\s\S]*justify-items:\s*center;[\s\S]*margin-left:\s*0;/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.presence-stats \.stat-item\s*\{[\s\S]*max-width:\s*10\.5rem;[\s\S]*place-self:\s*center;/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.stat-number\s*\{[\s\S]*font-size:\s*clamp\(2\.2rem,\s*10vw,\s*2\.7rem\);/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.gallery-header\s*\{[\s\S]*display:\s*grid;[\s\S]*grid-template-columns:\s*1fr;/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.gallery-controls\s*\{\s*justify-self:\s*end;/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.section-cta \.container\s*\{\s*padding:\s*0 1\.35rem;/);
});

run('shared navigation and footer link case studies to cases.html', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html', 'cases.html']) {
    const html = readTemplate(file);
    assert.match(html, /<a href="cases\.html">事例<\/a>/);
    assert.doesNotMatch(html, /<a href="cases\.html">導入事例<\/a>/);
    assert.doesNotMatch(html, /index\.html#cases/);
    assert.doesNotMatch(html, /href="#"/);
  }
});

run('cases page expands the archive beyond the index excerpt', () => {
  const html = readTemplate('cases.html');
  const css = readCss();
  assert.match(html, /事例一覧/);
  assert.match(html, /<div class="section-head case-archive-head reveal">[\s\S]*<h2 class="section-title section-title-sm case-archive-title"><span class="case-archive-title-line">相談背景と対応内容、<\/span><span class="case-archive-title-line">公開後の変化を一覧で見る。<\/span><\/h2>/);
  assert.match(html, /<p class="section-lead case-archive-lead">トップページの抜粋事例に加えて、施設タイプごとの相談背景と、<br>整えた導線、公開後の変化をまとめています。施設名は掲載用の仮称です。<\/p>/);
  assert.match(html, /潮見ヶ浦テラスホテル/);
  assert.match(html, /雨晴別邸 風路/);
  assert.match(html, /森音渓谷リトリート/);
  assert.match(html, /海映え湯宿 汐景/);
  assert.match(html, /課題/);
  assert.match(html, /対応内容/);
  assert.match(html, /変化/);
  assert.match(html, /<h2 class="section-title white cta-title"><span class="cta-title-line">自施設に近い<\/span><span class="cta-title-line">事例がなくても、<\/span><span class="cta-title-line">整理の起点は一緒です。<\/span><\/h2>/);
  assert.match(css, /\.case-archive-head\s*\{[\s\S]*max-width:\s*none;/);
  assert.match(css, /\.case-archive-title\s*\{[\s\S]*text-wrap:\s*normal;/);
  assert.match(css, /\.case-archive-title-line\s*\{[\s\S]*display:\s*block;/);
  assert.match(css, /\.case-archive-lead\s*\{[\s\S]*max-width:\s*56ch;/);
  assert.match(css, /\.case-archive-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\);/);
});

run('service page explains support scope, deliverables, and schedule', () => {
  const html = readTemplate('service.html');
  const css = readCss();
  assert.match(html, /支援範囲/);
  assert.match(html, /成果物/);
  assert.match(html, /標準スケジュール/);
  assert.match(html, /現地確認と導線整理/);
  assert.match(html, /予約導線と公開導線の調整/);
  assert.match(html, /<div class="section-head service-scope-head reveal">[\s\S]*<h2 class="section-title section-title-sm service-scope-title">景観だけでなく、<br>運営と発信まで整えます。<\/h2>/);
  assert.match(css, /\.service-scope-head\s*\{[\s\S]*max-width:\s*none;/);
  assert.match(css, /\.service-scope-title\s*\{[\s\S]*width:\s*fit-content;[\s\S]*max-width:\s*none;[\s\S]*text-wrap:\s*normal;/);
  assert.match(css, /\.service-scope-head \.section-lead\s*\{[\s\S]*max-width:\s*44ch;/);
  assert.match(css, /\.service-detail-grid,\s*[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/);
  assert.match(css, /\.service-detail-card\s*\{[\s\S]*display:\s*flex;[\s\S]*flex-direction:\s*column;/);
  assert.match(css, /\.service-detail-card \.detail-list\s*\{[\s\S]*margin-top:\s*auto;[\s\S]*padding-top:\s*1\.5rem;/);
});

run('about page includes team structure, judgement criteria, and fit guidance', () => {
  const html = readTemplate('about.html');
  const css = readCss();
  assert.match(html, /<h2 class="section-title section-title-md about-stance-title">[\s\S]*<span class="about-stance-title-line about-stance-title-line-desktop">運営・設計・撮影の三者で、<\/span>[\s\S]*<span class="about-stance-title-line about-stance-title-line-desktop">現場に無理のない改善を組む。<\/span>[\s\S]*<span class="about-stance-title-line about-stance-title-line-mobile">運営・設計・撮影の<\/span>[\s\S]*<span class="about-stance-title-line about-stance-title-line-mobile">三者で、現場に<\/span>[\s\S]*<span class="about-stance-title-line about-stance-title-line-mobile">無理のない改善を組む。<\/span>[\s\S]*<\/h2>/);
  assert.match(html, /<section class="section-cta about-cta">[\s\S]*<h2 class="section-title white cta-title about-cta-title">[\s\S]*<span class="about-cta-line-desktop">今ある景観のどこが<\/span>[\s\S]*<span class="about-cta-line-desktop">伝わっていないかを整理します。<\/span>[\s\S]*<span class="about-cta-line-mobile">まずは、<\/span>[\s\S]*<span class="about-cta-line-mobile">今ある景観の<\/span>[\s\S]*<span class="about-cta-line-mobile">どこが伝わって<\/span>[\s\S]*<span class="about-cta-line-mobile">いないかを整理します。<\/span>[\s\S]*<\/h2>/);
  assert.match(html, /<div class="feature-grid team-structure-grid">/);
  assert.match(html, /<div class="timeline working-principle-timeline">/);
  assert.match(html, /<article class="timeline-item working-principle-item reveal">/);
  assert.match(html, /<p class="section-lead white cta-lead">運営視点の悩みから入っても構いません。<br>現地写真やサイト URL があれば、初回相談の精度を上げられます。<\/p>/);
  assert.match(css, /\.about-stance-title\s*\{[\s\S]*width:\s*fit-content;[\s\S]*max-width:\s*none;[\s\S]*font-size:\s*clamp\(1\.65rem,\s*2\.25vw,\s*2\.35rem\);[\s\S]*line-height:\s*1\.16;[\s\S]*text-wrap:\s*normal;/);
  assert.match(css, /\.about-stance-title-line\s*\{\s*display:\s*block;/);
  assert.match(css, /\.about-stance-title-line-mobile\s*\{\s*display:\s*none;\s*\}/);
  assert.match(css, /\.about-stance-title-line-desktop\s*\{\s*display:\s*block;\s*\}/);
  assert.match(css, /\.about-stance-title-line-desktop\s*\{\s*white-space:\s*nowrap;\s*\}/);
  assert.match(css, /\.about-cta-line-mobile\s*\{\s*display:\s*none;\s*\}/);
  assert.match(css, /\.about-cta-line-desktop\s*\{\s*display:\s*block;\s*\}/);
  assert.match(css, /\.team-structure-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/);
  assert.match(css, /\.working-principle-timeline\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);[\s\S]*gap:\s*2rem;/);
  assert.match(css, /\.working-principle-item\s*\{[\s\S]*border:\s*0;[\s\S]*border-radius:\s*0;[\s\S]*box-shadow:\s*none;[\s\S]*background:\s*transparent;/);
  assert.match(css, /\.working-principle-item::before\s*\{[\s\S]*width:\s*1px;[\s\S]*background:\s*var\(--line\);/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.about-cta \.container\s*\{\s*padding:\s*0 1\.05rem;/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.about-cta-title\s*\{[\s\S]*width:\s*100%;[\s\S]*max-width:\s*none;[\s\S]*margin-left:\s*auto;[\s\S]*margin-right:\s*auto;[\s\S]*font-size:\s*clamp\(1\.4rem,\s*5\.05vw,\s*1\.82rem\);[\s\S]*line-height:\s*1\.14;/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.team-structure-grid\s*\{\s*grid-template-columns:\s*1fr;\s*\}/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.about-stance-title-line-desktop\s*\{\s*display:\s*none;\s*\}[\s\S]*\.about-stance-title-line-mobile\s*\{\s*display:\s*block;\s*\}/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.about-cta-line-desktop\s*\{\s*display:\s*none;\s*\}[\s\S]*\.about-cta-line-mobile\s*\{\s*display:\s*block;\s*\}/);
  assert.match(css, /@media \(max-width:\s*1100px\)\s*\{[\s\S]*\.team-structure-grid\s*\{\s*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\);\s*\}/);
  assert.match(css, /@media \(max-width:\s*1100px\)\s*\{[\s\S]*\.working-principle-timeline\s*\{[\s\S]*grid-template-columns:\s*1fr;[\s\S]*gap:\s*1\.5rem;/);
  assert.match(html, /チーム体制/);
  assert.match(html, /判断基準/);
  assert.match(html, /向いている案件/);
  assert.match(html, /運営・設計・撮影の三者で/);
});

run('contact page includes static completion UI and consultation guidance', () => {
  const html = readTemplate('contact.html');
  const css = readCss();
  assert.match(html, /相談できる内容/);
  assert.match(html, /返信目安/);
  assert.match(html, /初回相談の流れ/);
  assert.match(html, /<h2 class="section-title section-title-sm contact-title">整理前でも、<br>相談できます。<\/h2>/);
  assert.match(css, /\.contact-title\s*\{[\s\S]*font-size:\s*clamp\(2\.4rem,\s*4vw,\s*3\.55rem\);[\s\S]*text-wrap:\s*normal;/);
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
  assert.match(css, /\.trust-strip-light\s*\{[\s\S]*border-top:\s*1px solid var\(--line\);[\s\S]*border-bottom:\s*1px solid var\(--line\);/);
  assert.match(css, /\.trust-item-light \+ \.trust-item-light\s*\{[\s\S]*border-left:\s*1px solid var\(--line\);/);
  assert.match(css, /\.contact-success\s*\{/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.footer-inner\s*\{[\s\S]*display:\s*grid;[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\);/);
  assert.match(css, /@media \(max-width:\s*600px\)\s*\{[\s\S]*\.footer-brand\s*\{[\s\S]*grid-column:\s*1 \/ -1;[\s\S]*max-width:\s*none;/);
  assert.match(css, /\.footer-inner\s*\{[\s\S]*display:\s*flex;[\s\S]*justify-content:\s*space-between;[\s\S]*gap:\s*4rem;[\s\S]*padding-bottom:\s*4rem;[\s\S]*flex-wrap:\s*wrap;/);
  assert.match(css, /\.footer-brand\s*\{\s*max-width:\s*22rem;\s*\}/);
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
