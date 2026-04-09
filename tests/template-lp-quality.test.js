const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..', 'public', 'templates', 'lp');

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

run('lp result sections use a consistent data-ai-type', () => {
  assert.match(read('f'), /data-ai-type="result-section"/);
  assert.match(read('q'), /data-ai-type="result-section"/);
  assert.doesNotMatch(read('q'), /data-ai-type="results-section"/);
});

run('lp reviewed forms avoid generic placeholder examples', () => {
  const expectations = [
    {
      tag: 'b',
      rejects: [/placeholder="your@email\.com"/],
      expects: [/placeholder="hello@atelier-nest\.jp"/],
    },
    {
      tag: 'c',
      rejects: [/placeholder="株式会社〇〇"/, /placeholder="山本 太郎"/],
      expects: [/placeholder="合同会社 青葉デザイン"/, /placeholder="山本 恒一"/],
    },
    {
      tag: 'd',
      rejects: [/placeholder="山本 太郎"/],
      expects: [/placeholder="佐藤 恒一"/],
    },
    {
      tag: 'f',
      rejects: [/placeholder="山本 花子"/, /placeholder="123-4567"/, /placeholder="東京都〇〇区\.\.\."/],
      expects: [/placeholder="鈴木 花子"/, /placeholder="150-0042"/, /placeholder="東京都渋谷区宇田川町1-2-3"/],
    },
    {
      tag: 'g',
      rejects: [/placeholder="山本 花子"/, /placeholder="123-4567"/, /placeholder="東京都〇〇区\.\.\."/],
      expects: [/placeholder="高橋 花子"/, /placeholder="107-0061"/, /placeholder="東京都港区北青山2-5-8"/],
    },
    {
      tag: 'j',
      rejects: [/placeholder="山田 太郎"/, /placeholder="example@email\.com"/],
      expects: [/placeholder="山田 恒一"/, /placeholder="reserve@koyomi-salon\.jp"/],
    },
  ];

  for (const item of expectations) {
    const html = read(item.tag);
    for (const pattern of item.rejects) {
      assert.doesNotMatch(html, pattern);
    }
    for (const pattern of item.expects) {
      assert.match(html, pattern);
    }
  }
});

run('lp helper scripts no longer describe internal demo placeholders in comments', () => {
  assert.doesNotMatch(read('q', 'script.js'), /dummy details page/);
  assert.doesNotMatch(read('m', 'script.js'), /for demo/);
  assert.doesNotMatch(read('y', 'script.js'), /analytics \(placeholder\)/);
});
