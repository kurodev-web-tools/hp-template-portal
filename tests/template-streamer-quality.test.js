const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..', 'public', 'templates', 'streamer');

function read(parts) {
  return fs.readFileSync(path.join(ROOT, ...parts), 'utf8');
}

function listIndexFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(dir, entry.name, 'index.html'))
    .filter((filePath) => fs.existsSync(filePath));
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

run('streamer index pages no longer expose setup comments above body tags', () => {
  for (const filePath of listIndexFiles(ROOT)) {
    const html = fs.readFileSync(filePath, 'utf8');
    assert.doesNotMatch(html, /配信設定/);
    assert.doesNotMatch(html, /書き換えてください/);
    assert.doesNotMatch(html, /data-api-key:\s*\(任意\)/);
  }
});

run('streamer CTA copy is explicit in reviewed landing pages', () => {
  const expectations = [
    { file: ['b', 'index.html'], reject: /class="btn-boss-cta">CONNECT</, expect: /class="btn-boss-cta">視聴ルームへ接続</ },
    { file: ['i', 'index.html'], reject: /class="btn-rpg">CHEER ME</, expect: /class="btn-rpg">ライブを応援する</ },
    { file: ['q', 'index.html'], reject: /Do you want to follow this channel\?/, expect: /冒険ログを受け取りますか\?/ },
    { file: ['q', 'index.html'], reject: /class="rpg-btn primary">YES</, expect: /class="rpg-btn primary">フォローする</ },
    { file: ['q', 'index.html'], reject: /class="rpg-btn">NO</, expect: /class="rpg-btn">あとで見る</ },
    { file: ['u', 'index.html'], reject: /class="btn-spray">JOIN US</, expect: /class="btn-spray">イベントに参加する</ },
    { file: ['x', 'index.html'], reject: /class="btn-xenon">JOIN SQUAD</, expect: /class="btn-xenon">コミュニティへ参加</ },
    { file: ['y', 'index.html'], reject: /class="btn-yield">SUBSCRIBE</, expect: /class="btn-yield">メンバーシップを見る</ },
  ];

  for (const item of expectations) {
    const html = read(item.file);
    assert.doesNotMatch(html, item.reject);
    assert.match(html, item.expect);
  }
});

run('streamer contact forms use themed but specific placeholders in reviewed pages', () => {
  const expectations = [
    {
      file: ['a', 'index.html'],
      rejects: [/placeholder="Your Name"/, /placeholder="email@address\.com"/, /placeholder="Transmit your message\.\.\."/],
      expects: [/placeholder="配信名 \/ Handle"/, /placeholder="contact@neon-grid\.jp"/, /placeholder="出演依頼やコラボ内容を送信してください"/],
    },
    {
      file: ['e', 'contact.html'],
      rejects: [/placeholder="Your Name or Company"/, /placeholder="Details about your inquiry\.\.\."/],
      expects: [/placeholder="チーム名 \/ 会社名"/, /placeholder="スポンサー提案や出演相談の詳細をご記入ください"/],
    },
    {
      file: ['k', 'contact.html'],
      rejects: [/placeholder="Your Name"/, /placeholder="State your purpose\.\.\."/],
      expects: [/placeholder="使者名 \/ Guild Name"/, /placeholder="依頼内容や同盟の目的を記してください"/],
    },
    {
      file: ['s', 'contact.html'],
      rejects: [/placeholder="Mr\. \/ Ms\. \.\.\."/ , /placeholder="Stop\." /],
      expects: [/placeholder="差出人名 \/ Workshop"/, /placeholder="依頼内容や製作相談の要点を記してください"/],
    },
  ];

  for (const item of expectations) {
    const html = read(item.file);
    for (const pattern of item.rejects) {
      assert.doesNotMatch(html, pattern);
    }
    for (const pattern of item.expects) {
      assert.match(html, pattern);
    }
  }
});

run('streamer templates no longer expose placeholder html comments for idol visuals', () => {
  const html = read(['i', 'index.html']);
  assert.doesNotMatch(html, /Placeholder for Idol Image/);
});
