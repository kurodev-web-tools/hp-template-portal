const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const readTemplate = (file) =>
  fs.readFileSync(path.join(__dirname, '..', 'public', 'templates', 'business', 'x', file), 'utf8');

const readStyle = () =>
  fs.readFileSync(
    path.join(__dirname, '..', 'public', 'templates', 'business', 'x', 'assets', 'css', 'style.css'),
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

run('index page reflects the renewed xtreme visual system and no template notes', () => {
  const html = readTemplate('index.html');
  assert.match(html, /BREAK[\s\S]*LIMITS/i);
  assert.match(html, /Studio Scope/);
  assert.match(html, /Project Modes/);
  assert.match(html, /Services/);
  assert.match(html, /Operating Crew/);
  assert.match(html, /Launch Desk/);
  assert.doesNotMatch(html, /モック用|編集してください|仮置き|Template/);
});

run('service page matches the renewed offer-driven format', () => {
  const html = readTemplate('service.html');
  assert.match(html, /Support Formats/);
  assert.match(html, /Launch Program/);
  assert.match(html, /Deliverables Overview/);
  assert.match(html, /Project Flow/);
  assert.match(html, /Ready To Share The Brief/);
});

run('about page includes studio profile, operating model, and team language', () => {
  const html = readTemplate('about.html');
  assert.match(html, /Studio Profile/);
  assert.match(html, /Operating Principles/);
  assert.match(html, /Engagement Map/);
  assert.match(html, /Operating Crew/);
});

run('contact page includes signal desk guidance and required fields', () => {
  const html = readTemplate('contact.html');
  assert.match(html, /Contact Desk/);
  assert.match(html, /Consultation Window/);
  assert.match(html, /Before You Send/);
  assert.match(html, /Inquiry Checklist/);
  assert.match(html, /required/);
  assert.doesNotMatch(html, /仮置き|Template/);
});

run('contact page has mobile overflow safeguards for heading, note card, and form', () => {
  const css = readStyle();
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*\.xr-section-head-contact[\s\S]*min-width:\s*0/i);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*\.xr-section-head-copy[\s\S]*max-width:\s*100%/i);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*\.xr-note-card \.xr-note-strong-inline[\s\S]*white-space:\s*normal/i);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*\.xr-form(?:\s*,[\s\S]*?)?[\s\S]*min-width:\s*0/i);
});

run('shared footer includes repeat navigation and CTA', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /brand launch \/ campaign \/ event production/i);
    assert.match(html, /Home/);
    assert.match(html, /Format/);
    assert.match(html, /About/);
    assert.match(html, /Contact/);
  }
});
