const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..', 'public', 'templates', 'business');

function read(tag, file = 'index.html') {
  return fs.readFileSync(path.join(ROOT, tag, file), 'utf8');
}

function run(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

run('business reviewed contact forms avoid generic company placeholders and demo-only labels', () => {
  const expectations = [
    {
      tag: 'a',
      file: 'contact.html',
      rejects: [/placeholder="株式会社サンプル"/, /Form Submit Handler \(demo\)/],
      expects: [/placeholder="桔梗アセットマネジメント"/],
    },
    {
      tag: 'd',
      file: 'contact.html',
      rejects: [/Map Placeholder/],
      expects: [/東京オペレーションセンター周辺イメージ/],
    },
    {
      tag: 'f',
      file: 'contact.html',
      rejects: [/株式会社 Example/, /initialising inquiry form/],
      expects: [/株式会社ネオシンク/, /inquiry form ready/],
    },
    {
      tag: 'l',
      file: 'contact.html',
      rejects: [/placeholder="株式会社サンプル"/],
      expects: [/placeholder="株式会社ロジカルシステムズ"/],
    },
  ];

  for (const item of expectations) {
    const html = read(item.tag, item.file);
    for (const pattern of item.rejects) {
      assert.doesNotMatch(html, pattern);
    }
    for (const pattern of item.expects) {
      assert.match(html, pattern);
    }
  }
});

run('business k pages do not expose a dummy search ui', () => {
  for (const file of ['index.html', 'about.html', 'service.html', 'contact.html']) {
    const html = read('k', file);
    assert.doesNotMatch(html, /type="search"/);
    assert.doesNotMatch(html, /placeholder=".*検索/);
    assert.doesNotMatch(html, /search bar/i);
  }
});
