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

run('index page reflects the renewed xtreme visual system and no template notes', () => {
  const html = readTemplate('index.html');
  assert.match(html, /BREAK[\s\S]*LIMITS/i);
  assert.match(html, /Performance Snapshot/);
  assert.match(html, /Services/);
  assert.match(html, /Team Drivers/);
  assert.match(html, /X-Film/);
  assert.doesNotMatch(html, /モック用|編集してください|仮置き|Template/);
});

run('service page matches the renewed offer-driven format', () => {
  const html = readTemplate('service.html');
  assert.match(html, /Offer Stack/);
  assert.match(html, /Launch Shock/);
  assert.match(html, /Delivery Matrix/);
  assert.match(html, /Activation Flow/);
  assert.match(html, /Get the Format/);
});

run('about page includes doctrine, field notes, and team language', () => {
  const html = readTemplate('about.html');
  assert.match(html, /Brand Doctrine/);
  assert.match(html, /Core Principles/);
  assert.match(html, /Field Notes/);
  assert.match(html, /Team Drivers/);
});

run('contact page includes signal desk guidance and required fields', () => {
  const html = readTemplate('contact.html');
  assert.match(html, /Signal Desk/);
  assert.match(html, /Response Timing/);
  assert.match(html, /Project Signals/);
  assert.match(html, /required/);
  assert.doesNotMatch(html, /仮置き|Template/);
});

run('shared footer includes repeat navigation and CTA', () => {
  for (const file of ['index.html', 'service.html', 'about.html', 'contact.html']) {
    const html = readTemplate(file);
    assert.match(html, /action brand studio/);
    assert.match(html, /Home/);
    assert.match(html, /Format/);
    assert.match(html, /About/);
    assert.match(html, /Contact/);
  }
});
