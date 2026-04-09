const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..', 'public', 'templates', 'portfolio');

function readTemplate(tag) {
  return fs.readFileSync(path.join(ROOT, tag, 'index.html'), 'utf8');
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

run('portfolio contact copy avoids generic placeholders in reviewed templates', () => {
  const expectations = [
    {
      tag: 'e',
      rejects: [/placeholder="Your Name"/, /placeholder="Your Email"/, /placeholder="Tell me about your vision"/],
      expects: [/placeholder="お名前 \/ Studio Name"/, /placeholder="hello@ethereal-design\.jp"/, /placeholder="ブランドの空気感や相談したい体験設計を教えてください"/],
    },
    {
      tag: 'h',
      rejects: [/placeholder="\[ ENTER_DESIGNATION \]"/, /placeholder="\[ SECURE_COMMS_ADDR \]"/, /placeholder="\[ TRANSMIT_PAYLOAD \]"/],
      expects: [/placeholder="\[ CALLSIGN \/ OPERATOR NAME \]"/, /placeholder="\[ uplink@horizon-grid\.jp \]"/, /placeholder="\[ MISSION OUTLINE \/ REQUEST DETAILS \]"/],
    },
    {
      tag: 'j',
      rejects: [/placeholder="Your Name"/, /placeholder="Your Email"/, /placeholder="Message \/ Details"/],
      expects: [/placeholder="お名前 \/ Editorial Name"/, /placeholder="desk@chapter01\.jp"/, /placeholder="掲載企画・執筆相談の概要をお聞かせください"/],
    },
    {
      tag: 'k',
      rejects: [/placeholder="Name"/, /placeholder="Email"/, /placeholder="Message"/, />Template K</, /placeholder="Your Name \/ Studio Alias"/],
      expects: [/placeholder="Takumi Sato \/ Kinetic Lab"/, /placeholder="motion@kinetic-lab\.jp"/, /placeholder="インタラクション案件や展示構想の概要を書いてください"/, />Kinetic Lab</],
    },
    {
      tag: 'p',
      rejects: [/placeholder="Your Name"/, /placeholder="Dear Aoi\.\.\."/],
      expects: [/placeholder="差出人名 \/ Sender"/, /placeholder="展示構成や制作相談の内容を手紙調でどうぞ"/],
    },
    {
      tag: 'q',
      rejects: [/placeholder="John Doe"/, /placeholder="john@quantum-data\.studio"/, /placeholder="Hello Dr\. Chen, I'm interested in collaborating on\.\.\."/],
      expects: [/placeholder="Kei Matsuda"/, /placeholder="kei@graph-labs\.jp"/, /placeholder="需要予測や分析基盤の相談内容を記入してください"/],
    },
    {
      tag: 'r',
      rejects: [/placeholder="PLAYER_NAME"/, /placeholder="player@arcade\.com"/, /placeholder="ENTER YOUR MESSAGE\.\.\."/],
      expects: [/placeholder="HI-SCORE NAME"/, /placeholder="credit@pixel-arcade\.jp"/, /placeholder="STAGE DETAILS OR COLLAB REQUEST\.\.\."/],
    },
    {
      tag: 's',
      rejects: [/placeholder="Enter identification"/, /placeholder="user@domain\.com"/, /placeholder="Enter message data\.\.\."/],
      expects: [/placeholder="Signal ID \/ Operator Name"/, /placeholder="signal@strata-core\.jp"/, /placeholder="Share the brief, launch window, or collaboration context\.\.\."/],
    },
    {
      tag: 'u',
      rejects: [/placeholder="Captain Nemo"/, /placeholder="email@vessel\.com"/, /placeholder="Enter coordinates or message\.\.\."/],
      expects: [/placeholder="Captain \/ Expedition Name"/, /placeholder="hello@tidal-voyage\.jp"/, /placeholder="Share route notes, exhibition plans, or project signals\.\.\."/],
    },
    {
      tag: 'v',
      rejects: [/placeholder="Your Name"/, /placeholder="your@email\.com"/, /placeholder="Your message\.\.\."/],
      expects: [/placeholder="ご氏名 \/ Atelier Name"/, /placeholder="atelier@vintage-post\.jp"/, /placeholder="修復依頼や展示相談の背景をお聞かせください"/],
    },
    {
      tag: 'w',
      rejects: [/placeholder="Your name\.\.\."/i, /placeholder="your@email\.com"/, /placeholder="Tell me about your project\.\.\."/],
      expects: [/placeholder="お名前 \/ Artist Name"/, /placeholder="hello@watercolor-studio\.jp"/, /placeholder="描きたい空気感や依頼内容を教えてください"/],
    },
    {
      tag: 'y',
      rejects: [/placeholder="Jane Doe"/, /placeholder="jane@yarn-studio\.jp"/, /placeholder="Tell me about your project idea\.\.\."/],
      expects: [/placeholder="Haru Ito"/, /placeholder="haru@stitch-note\.jp"/, /placeholder="作りたい作品やコラボ内容を編み物メモ感覚でどうぞ"/],
    },
  ];

  for (const expectation of expectations) {
    const html = readTemplate(expectation.tag);

    for (const pattern of expectation.rejects) {
      assert.doesNotMatch(html, pattern);
    }

    for (const pattern of expectation.expects) {
      assert.match(html, pattern);
    }
  }
});
