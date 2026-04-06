const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const templateRoot = path.join(__dirname, '..', 'public', 'templates', 'business', 'y');
const readTemplate = (file) => fs.readFileSync(path.join(templateRoot, file), 'utf8');
const readStyle = () => fs.readFileSync(path.join(templateRoot, 'assets', 'css', 'style.css'), 'utf8');

const run = (name, fn) => {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
};

run('all pages use branded metadata instead of example placeholders', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /https:\/\/yieldgrowth\.jp\/templates\/business\/y\//);
    assert.doesNotMatch(html, /example\.com|you@example\.com/i);
  }
});

run('index page explains committee advisory, deliverables, and anonymous case evidence', () => {
  const html = readTemplate('index.html');
  assert.match(html, /投資委員会・経営会議向け/i);
  assert.match(html, /Committee Briefing Advisory/);
  assert.match(html, /Primary Deliverables/);
  assert.match(html, /Anonymous Case Notes/);
  assert.match(html, /Investment Committee Pack/);
  assert.match(html, /アセット配分委員会/);
  assert.match(html, /y-evidence-grid--plain/);
  assert.match(html, /y-evidence-card--plain/);
  assert.match(html, /Strategic Roadmap/);
  assert.match(html, /PHASE 01/);
  assert.match(html, /PHASE 02/);
  assert.match(html, /PHASE 03/);
  assert.doesNotMatch(html, /\+\d+\.\d+%\s*PERFORMANCE/i);
});

run('service page describes outputs, meeting types, and delivery flow', () => {
  const html = readTemplate('service.html');
  assert.match(html, /Advisory Scope/);
  assert.match(html, /Outputs by Engagement/);
  assert.match(html, /Representative Deliverables/);
  assert.match(html, /Decision Memo/);
  assert.match(html, /Committee Reset/);
  assert.match(html, /Review Cadence/);
  assert.match(html, /y-deliverables-grid--plain/);
  assert.match(html, /y-deliverable-card--plain/);
  assert.match(html, /y-mobile-line/);
  assert.match(html, /投資委員会|経営会議|事業投資審査/);
});

run('about page ties judgement principles to retained records and accountability', () => {
  const html = readTemplate('about.html');
  assert.match(html, /Documentation Principles/);
  assert.match(html, /Meeting Record Flow/);
  assert.match(html, /Research Ledger/);
  assert.match(html, /判断理由と更新条件/);
  assert.match(html, /会議後に参照できる/);
  assert.match(html, /y-editorial-stagger-detail--plain/);
  assert.match(html, /y-report-matrix-scroll--ledger/);
  assert.match(html, /y-mobile-line/);
});

run('contact page acts as a briefing intake with realistic fields and confidentiality notes', () => {
  const html = readTemplate('contact.html');
  assert.match(html, /Briefing Reservation/);
  assert.match(html, /Initial Briefing Request/);
  assert.match(html, /守秘前提/);
  assert.match(html, /次回開催予定/);
  assert.match(html, /対象資産/);
  assert.match(html, /現行資料の有無/);
  assert.match(html, /input id="meeting"/);
  assert.match(html, /select id="assets"/);
  assert.match(html, /select id="materials"/);
  assert.match(html, /y-report-guide--plain/);
  assert.match(html, /y-contact-points--plain/);
  assert.match(html, /y-mobile-line/);
});

run('shared navigation and footer keep the advisory positioning consistent', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /Framework/i);
    assert.match(html, /Solutions/i);
    assert.match(html, /Intelligence/i);
    assert.match(html, /Connect/i);
    assert.match(html, /BOOK A BRIEFING/i);
    assert.match(html, /Tokyo Advisory Desk/i);
    assert.match(html, /Mon-Fri 09:00-18:00 JST/i);
  }
});

run('styles include the new evidence and intake layouts plus text-wrap finishing', () => {
  const css = readStyle();
  assert.match(css, /\.y-evidence-grid\b/);
  assert.match(css, /\.y-evidence-grid--plain\b/);
  assert.match(css, /\.y-deliverables-grid\b/);
  assert.match(css, /\.y-deliverables-grid--plain\b/);
  assert.match(css, /\.y-contact-points\b/);
  assert.match(css, /\.y-contact-points--plain\b/);
  assert.match(css, /\.y-note-stack\b/);
  assert.match(css, /\.y-editorial-stagger-detail--plain\b/);
  assert.match(css, /\.y-report-guide--plain\b/);
  assert.match(css, /\.y-report-matrix-scroll--ledger\b/);
  assert.match(css, /\.y-mobile-line\b/);
  assert.match(css, /@media\s*\(max-width:\s*991px\)[\s\S]*\.y-page-service \.y-report-table\s*\{[\s\S]*min-width:\s*640px/i);
  assert.match(css, /@media\s*\(max-width:\s*991px\)[\s\S]*\.y-page-about \.y-research-ledger \.y-report-table\s*\{[\s\S]*min-width:\s*660px/i);
  assert.match(css, /@media\s*\(max-width:\s*991px\)[\s\S]*\.y-page-about \.y-editorial-stagger-item:nth-child\(even\) \.y-editorial-stagger-copy[\s\S]*order:\s*initial/i);
  assert.match(css, /@media\s*\(max-width:\s*991px\)[\s\S]*\.y-report-actions \.y-button,\s*\.y-report-actions \.y-button-ghost[\s\S]*filter:\s*none !important/i);
  assert.match(css, /@keyframes\s+y-roadmap-phase-cycle/);
  assert.match(css, /\.y-report-roadmap-tag\s*\{[\s\S]*animation:\s*y-roadmap-phase-cycle/i);
  assert.match(css, /\.y-report-roadmap-item:nth-child\(2\)\s+\.y-report-roadmap-tag\s*\{[\s\S]*animation-delay:\s*2\.8s/i);
  assert.match(css, /\.y-report-roadmap-item:nth-child\(3\)\s+\.y-report-roadmap-tag\s*\{[\s\S]*animation-delay:\s*5\.6s/i);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/i);
  assert.match(css, /text-wrap:\s*pretty/i);
  assert.match(css, /word-break:\s*auto-phrase/i);
});
