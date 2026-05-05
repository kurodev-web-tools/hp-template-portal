import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const detailRoot = path.join(root, 'docs', 'template-renewal-details', 'streamer');
const outputRoot = path.join(detailRoot, 'mock-prompts');
const { PORTAL_DATA } = await import(pathToFileURL(path.join(root, 'public', 'assets', 'js', 'data.js')).href);

const today = '2026-05-03';

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function normalize(value) {
  return String(value || '').trim();
}

function extractLine(content, label) {
  const pattern = new RegExp(`^- ${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*(.+)$`, 'm');
  return normalize(content.match(pattern)?.[1]);
}

function extractSection(content, heading) {
  const marker = `## ${heading}`;
  const start = content.indexOf(marker);
  if (start === -1) return '';
  const sectionStart = content.indexOf('\n', start);
  if (sectionStart === -1) return '';
  const rest = content.slice(sectionStart + 1);
  const nextHeading = rest.indexOf('\n## ');
  return normalize(nextHeading === -1 ? rest : rest.slice(0, nextHeading));
}

async function listMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'mock-prompts') continue;
      files.push(...await listMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function degreeFromDetailPath(filePath) {
  return path.basename(path.dirname(filePath));
}

function typographyFor(theme, features = []) {
  const keywords = `${theme} ${features.join(' ')}`.toLowerCase();
  if (keywords.includes('pixel') || keywords.includes('8-bit')) {
    return {
      h1: 'Press Start 2P or DotGothic16, 40px, 700, line-height 1.15',
      body: 'Noto Sans JP, 15px, 500, line-height 1.7',
      label: 'DotGothic16, 12px, 700, uppercase tracking 0.04em',
    };
  }
  if (keywords.includes('jazz') || keywords.includes('lounge') || keywords.includes('boss') || keywords.includes('horror')) {
    return {
      h1: 'Cinzel or Noto Serif JP, 64px, 700, line-height 1.05',
      body: 'Noto Sans JP, 16px, 500, line-height 1.7',
      label: 'Inter, 12px, 700, uppercase tracking 0.06em',
    };
  }
  return {
    h1: 'Inter or Noto Sans JP, 64px, 800, line-height 1.02',
    body: 'Noto Sans JP, 16px, 500, line-height 1.7',
    label: 'Inter, 12px, 700, uppercase tracking 0.06em',
  };
}

function imageryFor(theme, visualHook, audience) {
  const lower = `${theme} ${visualHook} ${audience}`.toLowerCase();
  if (lower.includes('abyss')) return '深海の水圧計、ソナー円、潜水艇コンソール、青/ピンクのネオン。情報は深度UIとビーコンとして配置する。';
  if (lower.includes('digital ghost')) return '暗い端末UI、アクセスログ、匿名プロフィール、幽霊のようなシルエット。情報はログ/端末ウィンドウとして配置する。';
  if (lower.includes('e-sports')) return '大会配信HUD、スコアボード、ブラケット、チームカード、マッチ開始パネル。案件導線はscrim/contactとして分ける。';
  if (lower.includes('future')) return 'AIラボ/未来の研究デッキ、プロトタイプ展示、円弧HUD、透明パネル。問い合わせは研究依頼ドックとして分ける。';
  if (lower.includes('jazz')) return '夜のラウンジ、ステージ、レコード、予約メニュー、落ち着いた金色アクセント。配信予定は公演表として扱う。';
  if (lower.includes('lunar')) return '月相ダイヤル、夜空、静かな天文UI、月明かり。配信予定は月齢カレンダーとして配置する。';
  if (lower.includes('metallic')) return 'クロームのショールーム、反射する金属パネル、センター展示台、プロダクト発表風の情報配置。';
  if (lower.includes('neon night')) return '夜景、クラブの看板、路地サイン、イベントフライヤー。配信予定は街のサインボードとして扱う。';
  if (lower.includes('pixel')) return 'ドットUI、セーブスロット、カセット風カード、8-bit frame。本文は読みやすい通常フォントも併用。';
  if (lower.includes('quest')) return '羊皮紙のクエストログ、掲示板、地図、依頼票、パーティ募集。次回配信はactive questとして扱う。';
  if (lower.includes('rogue')) return '潜入マップ、暗号化されたミッションカード、暗い影、ステルスHUD。Contactはsecure dropとして分離する。';
  if (lower.includes('tech logic')) return '論理回路、ノード図、検証パネル、開発者向けダッシュボード。配信予定はbuild queueとして扱う。';
  if (lower.includes('urban')) return 'ストリート壁面、ステッカー、ポスター、落書きタグ、イベント告知。情報は貼り紙/ステッカーとして配置する。';
  if (lower.includes('vivid')) return 'ポップなグリッチステッカー、重なったウィンドウ、強い色面。文字を壊さず、UIのレイヤーで勢いを出す。';
  if (lower.includes('xtreme')) return 'アクションカメラUI、レース/スポーツ計測HUD、斜めのタイムライン、スポンサー枠。';
  if (lower.includes('yield')) return '配信成長チャート、分析パネル、KPIカード、スポンサー向け資料感。ファン導線と案件導線を分ける。';
  if (lower.includes('knight')) return '騎士団の誓約書、盾、紋章、作戦卓。配信予定は遠征予定、Contactは謁見/依頼として扱う。';
  if (lower.includes('steampunk')) return '歯車、真鍮パネル、圧力計、工房の制御盤。配信予定は運行表/実験ログとして扱う。';
  if (lower.includes('wide')) return '横長シネマフレーム、配信シーンのパノラマ、タイムライン帯。カードを積まず横方向に情報を流す。';
  if (lower.includes('horror')) return '暗い館内、窓の薄明かり、赤いLive badge、読める範囲の霧。怖さより配信導線の可読性を優先。';
  if (lower.includes('idol')) return 'ステージ照明、ピンク/白のスポットライト、ファンライト、配信予定カード。きらめきはHero周辺に限定。';
  if (lower.includes('boss') || lower.includes('rpg')) return '玉座、HPバー、ステータスカード、暗金の重厚感。ファン向け導線と案件導線を明確に分離。';
  if (lower.includes('space') || lower.includes('orbit')) return '星図、軌道線、ミッションカード、深い宇宙背景。情報カードは高コントラストにする。';
  if (lower.includes('cyber') || lower.includes('glitch') || lower.includes('tech')) return 'HUD、scan line、端末UI、ネオンアクセント。グリッチはHeroの装飾に限定し、文字を壊さない。';
  if (lower.includes('zen') || lower.includes('brush')) return '筆跡、余白、和紙に近い静かな背景、落ち着いた配信予定カード。';
  return 'キャラクター立ち絵がなくても成立するよう、ロゴ、シルエット、配信UI、背景レイヤーで世界観を作る。';
}

function layoutSignatureFor(tag) {
  const signatures = {
    A: {
      archetype: 'deep-sea neon sonar cockpit',
      density: 'medium density with a vertical depth hierarchy.',
      placement: 'left vertical depth meter/nav, center submerged hero identity, right sonar Live/Next Stream beacon, bottom dock for Follow and Contact.',
      implementation: 'CSS grid with a depth rail, radial sonar rings, static abyss background, and compact dock panels.',
      layout: [
        'PC composition: 深海のコックピットとして構成する。左に深度メーター型nav、中央に沈むようなHero、右にソナー型Live / Next Stream、下部にFollow / Contact dockを置く。',
        'Header: full-width top navを避け、深度メーターや潜水艇HUDにナビを埋め込む。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名は中央の水圧レイヤー内に置き、短い一言はソナー波形や深度ラベルに沿わせる。',
        'Visual hook: 深度メーター、ソナー円、青/ピンクのネオン、水圧の暗さ。右カード積みではなく、潜水艇UIとして見せる。',
        'Primary actions: Live通知、Schedule、Follow、Contactを4つ以内に整理する。Contactは下部dockの業務連絡として分離する。',
      ],
      composition: 'use the Abyss Neon layout signature exactly. Make the first viewport feel like a deep-sea neon sonar cockpit, not a standard two-column streamer dashboard. Use a left vertical depth meter/nav, a central submerged hero identity, a right sonar Live/Next Stream beacon, and a bottom dock for Follow and Contact.',
      negatives: ['No generic hero-left/cards-right layout, no light top navigation bar, no repeated right-side card stack, no unrelated cyberpunk city poster.'],
    },
    B: {
      archetype: 'asymmetric boss-control room',
      density: 'high density, but the hierarchy is throne -> boss name -> next stream -> contact.',
      placement: 'side rail for navigation, lower-left for status/Follow, mid-right for Next Raid/Schedule, lower-right for Contract/Contact.',
      implementation: 'CSS grid, side rail, bordered panels, HP bars, and static throne background layers.',
      layout: [
        'PC composition: 画面全体を「ボス部屋の管理UI」として扱う。左端に紋章付きside rail、中央に玉座とキャラクター、下部にBoss Status / HP bar、右端にNext Raid / Schedule / Contractを縦ではなく玉座UIの一部として差し込む。',
        'Header: PCはfull-width top navを避け、左side rail + 玉座内のworld-in-UI labelにする。SPはtop compact header + sticky CTA。',
        'Hero copy: キャラ名は玉座下または中央下に大きく置き、配信ジャンルと短い一言はステータスUIの近くに置く。',
        'Visual hook: 玉座、紋章、HPバー、討伐予定、契約書風Contact。右カラムカード積みではなく、支配者のステータス画面として見せる。',
        'Primary actions: Live通知、Schedule、Follow、Contactを4つ以内に整理する。Contactはファン導線とは別の「契約/依頼」ブロックとして赤金系で分離する。',
      ],
      composition: 'use the Boss Room layout signature exactly. Make the first viewport feel like an asymmetric boss-control room, not a generic streamer dashboard. Use a left side rail with crest/navigation, a central throne and boss identity, a lower-left Boss Status / HP bar area, a mid-right Next Raid or Next Stream command panel, and a lower-right Contract / Contact block. Keep Follow near the status area, not grouped with Contact.',
      negatives: ['No generic top navigation with identical right-side stacked cards, no light top header, no balanced two-column card grid, no pastel floating cards.'],
    },
    C: {
      archetype: 'airy floating prism hub',
      density: 'low density with generous negative space and soft rhythm.',
      placement: 'hero identity upper-left to center, Next Stream as a floating prism near center-right, Song Archive as a waveform panel near lower-left or lower-center, Follow as small icon crystals, Contact as a quiet lower-right glass chip.',
      implementation: 'absolute-positioned glass panels, CSS gradients, static prism layers, and accessible text blocks.',
      layout: [
        'PC composition: 中央に淡いシルエット/ロゴ/音波を置き、情報は右カラムに積まず、プリズム片のような浮遊パネルとして画面四隅と中景に分散する。余白を大きく取り、Cは3案の中で最も低密度にする。',
        'Header: PCは薄いtop fixed headerまたは右上の小さなfloating nav。太い白いナビバーは避ける。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名は左上から中央寄りに静かに置き、歌枠/癒し/透明感の短い一言を音波や光の線と並べる。',
        'Visual hook: プリズムの反射面、音波、淡い光、浮遊するSong Archive。カードは「面」ではなく、透明な結晶片に情報が乗っている印象にする。',
        'Primary actions: Live / Song Archive / Follow / Contactを4つ以内に整理する。Contactは右下に小さく静かな相談導線として置き、ファン導線より目立たせすぎない。',
      ],
      composition: 'use the Crystal Prism layout signature exactly. Make the first viewport an airy floating prism hub, not a standard two-column dashboard. Use a soft central silhouette or prism logo, large negative space, floating glass-shard panels around the composition, a subtle Next Stream panel, a Song Archive waveform panel, small Follow icon crystals, and a quiet lower-right Business / Contact glass chip.',
      negatives: ['No dense dashboard layout, no heavy white navigation bar, no symmetrical two-column split, no identical right-side card stack.'],
    },
    D: {
      archetype: 'anonymous terminal breach console',
      density: 'medium-high density with strong terminal hierarchy.',
      placement: 'top command prompt/nav, left access log timeline, center ghost identity glitch silhouette, right encrypted Live/Schedule terminal, bottom secure channel for Follow/Contact.',
      implementation: 'terminal panels, monospace labels, scanline overlays, static noise texture, and accessible high-contrast text.',
      layout: [
        'PC composition: 匿名端末の侵入ログとして構成する。上部にcommand prompt nav、左にaccess log、中央にghost identity、右にencrypted Live / Schedule terminal、下部にsecure channelを置く。',
        'Header: 通常のtop navではなく、CLI入力欄やアクセスログの行として扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名は端末の大きな識別子として置き、活動内容は短いログ行に分解する。',
        'Visual hook: 暗い端末UI、ノイズ、アクセスログ、匿名性ガイド。情報はカードではなくterminal windowsとして見せる。',
        'Primary actions: Live通知、Schedule、Follow、Contactを4つ以内に整理する。Contactはsecure channelとして分離する。',
      ],
      composition: 'use the Digital Ghost layout signature exactly. Make the first viewport an anonymous terminal breach console, not a generic cyber dashboard. Use a command prompt nav, access log timeline, central ghost identity, encrypted Live/Schedule terminal, and a bottom secure channel for Follow/Contact.',
      negatives: ['No generic cyber city poster, no bright top navigation bar, no clean corporate dashboard, no repeated right-side cards.'],
    },
    E: {
      archetype: 'e-sports broadcast match room',
      density: 'high density, broadcast-like, with clear match hierarchy.',
      placement: 'top scoreboard header, center match/map hero, left roster/platform panel, right Next Match bracket, bottom sponsor/contact strip.',
      implementation: 'scoreboard header, bracket grid, stat cards, platform buttons, and separated sponsor/contact area.',
      layout: [
        'PC composition: eスポーツ大会配信のbroadcast roomとして構成する。上部にscoreboard header、中央にmatch/map hero、左にroster/platform、右にNext Match bracket、下部にsponsor/contact stripを置く。',
        'Header: 通常ナビではなく、試合スコアボードや大会HUDとして見せる。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名はチームタグ/プレイヤーカードとして置き、配信ジャンルはmatch labelで示す。',
        'Visual hook: スコア、ブラケット、キルログ風Schedule。ただし文字は壊さず読みやすくする。',
        'Primary actions: Watch Live、Schedule、Follow、Scrim/Contactを整理する。企業/案件導線はsponsor/contactとして分離する。',
      ],
      composition: 'use the E-Sports Pro layout signature exactly. Make the first viewport feel like an e-sports broadcast match room with a top scoreboard, center match hero, right bracket/Next Match panel, left roster/platform panel, and bottom sponsor/contact strip.',
      negatives: ['No fantasy RPG layout, no pastel floating cards, no generic streamer profile dashboard, no identical right-side card stack.'],
    },
    F: {
      archetype: 'future lab command deck',
      density: 'medium density with technical clarity.',
      placement: 'top minimal lab nav, center prototype/AI core hero, left module nav, right Live demo/Schedule panels, bottom inquiry dock.',
      implementation: 'CSS grid, radial HUD, module tiles, static lab background, and restrained glow.',
      layout: [
        'PC composition: 未来研究ラボのcommand deckとして構成する。中央にAI core/prototype、左にmodule nav、右にLive demo / Schedule、下部にinquiry dockを置く。',
        'Header: 細いlab navまたはmodule labelsにし、通常の白いヘッダーは避ける。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名はプロトタイプ名のように置き、活動内容は機能モジュールとして短く表示する。',
        'Visual hook: AIラボ、円弧HUD、透明パネル、検証ステータス。右カード積みではなく研究デッキとして見せる。',
        'Primary actions: Live demo、Schedule、Follow、Project Contactを整理する。Contactは研究依頼dockとして分離する。',
      ],
      composition: 'use the Future Tech layout signature exactly. Make the first viewport a future lab command deck with a central AI core/prototype hero, module nav, Live demo/Schedule panels, and a separated project inquiry dock.',
      negatives: ['No generic SaaS corporate dashboard, no fantasy status UI, no repeated streamer card stack, no unrelated cyber city background.'],
    },
    G: {
      archetype: 'broken glitch zine interface',
      density: 'medium-high density with intentional offset panels.',
      placement: 'fragmented top ticker, center broken hero identity, diagonal Live/Clip/Schedule shards, lower contact as stable rescue panel.',
      implementation: 'offset CSS panels, clipped shapes, static glitch accents, and stable readable text blocks.',
      layout: [
        'PC composition: 壊れた配信zine/ブラウザ断片として構成する。上部にfragmented ticker、中央にbroken hero、斜めにLive / Clip / Schedule shard、下部に安定したContact panelを置く。',
        'Header: 通常ナビではなく、欠けたtickerや断片化したタブとして扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名は大胆にずらして置くが、読める輪郭を残す。本文やCTAは壊さない。',
        'Visual hook: グリッチ、断片、色ズレ、ノイズ。情報配置そのものを斜め/ずらしで差別化する。',
        'Primary actions: Live、Clip、Schedule、Contactを整理する。Contactはノイズの少ない安定パネルとして分離する。',
      ],
      composition: 'use the Glitch Core layout signature exactly. Make the first viewport a broken glitch zine interface with fragmented ticker nav, offset hero identity, diagonal Live/Clip/Schedule shards, and a stable Contact panel.',
      negatives: ['No clean symmetric dashboard, no normal top nav, no unreadable broken CTA text, no identical right-side card stack.'],
    },
    H: {
      archetype: 'haunted mansion invitation map',
      density: 'medium density with suspenseful spacing.',
      placement: 'left mansion floor map/nav, center hallway/portrait hero, right candlelit Next Stream invitation, bottom sealed Contact letter.',
      implementation: 'floorplan nav, portrait frame, candlelit panels, invitation card, and restrained mist.',
      layout: [
        'PC composition: 洋館の招待状/見取り図として構成する。左にmansion floor map nav、中央に廊下/肖像画Hero、右にcandlelit Next Stream、下部にsealed Contact letterを置く。',
        'Header: side railまたは館内案内板にし、明るいtop navは避ける。SPはtop compact header + sticky CTA。',
        'Hero copy: キャラ名は肖像画や招待状の題字として置き、配信予定は部屋番号/開演時間のように見せる。',
        'Visual hook: 暗い館内、窓明かり、赤いLive badge、読める範囲の霧。怖さより導線の可読性を優先する。',
        'Primary actions: Enter Live、Schedule、Follow、Contactを整理する。Contactは封蝋付き依頼状として分離する。',
      ],
      composition: 'use the Horror Mansion layout signature exactly. Make the first viewport a haunted mansion invitation map with floorplan side navigation, central hallway/portrait hero, candlelit Next Stream invitation, and sealed Contact letter.',
      negatives: ['No generic horror poster without UI, no bright top header, no boss throne layout, no identical right-side cards.'],
    },
    I: {
      archetype: 'idol live venue and ticket strip',
      density: 'medium-high density, event-like, with clear commercial paths.',
      placement: 'top venue-sign header, center stage/performer, right large Next Live timetable, bottom horizontal ticket strip for Live / Fan Club / Goods, Backstage Contact as a separate dark block.',
      implementation: 'header marquee, stage background image, ticket-strip CTA row, timetable card, goods/fanclub panels, and a separated contact block.',
      layout: [
        'PC composition: 画面を「ライブ会場の興行ページ」として組む。上部はチケットカウンター/会場看板風header、中央奥にステージと performer silhouette、下部に横長のticket stripとしてLive / Fan Club / Goodsを並べ、右側にNext Liveの大きなタイムテーブルを置く。',
        'Header: PCはtop fixed headerでもよいが、通常の白いナビバーではなく、会場サイン/チケットカウンター風にする。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名はステージ看板または光るマーキーとして見せ、配信ジャンルと一言はチケット半券やリボン状ラベルに置く。',
        'Visual hook: ステージ照明、客席のペンライト、ライブ日程、Fan Club / Goods導線。Cの透明余白ではなく、イベント告知として明るく商業的にする。',
        'Primary actions: Live視聴、Next Live、Fan Club、Goods、Contactを整理する。Contactは黒/濃色のBackstage Inquiryブロックとして、ファン向け購入導線と分ける。',
      ],
      composition: 'use the Idol Stage layout signature exactly. Make the first viewport feel like a live venue event page, not a generic streamer dashboard. Use a venue-sign or ticket-counter style top header, a central stage and performer silhouette, a large right-side Next Live timetable, a bottom horizontal ticket strip for Live / Fan Club / Goods, and a separate dark Backstage Contact block for business inquiries.',
      negatives: ['No airy crystal layout, no boss status UI, no identical right-side stacked card layout, no generic concert poster without UI.'],
    },
    J: {
      archetype: 'night jazz lounge reservation menu',
      density: 'medium-low density with premium spacing.',
      placement: 'left vertical lounge menu/nav, center stage or record-cover hero, right Tonight set list/Next Stream, bottom reservation-style Contact.',
      implementation: 'split lounge menu, album-cover hero, set-list card, warm panels, and low-motion lighting.',
      layout: [
        'PC composition: 夜のjazz loungeの予約メニューとして構成する。左に縦型lounge menu、中央にstage/record-cover hero、右にTonight set list / Next Stream、下部にreservation Contactを置く。',
        'Header: top navではなく、クラブのメニュー表や席札として扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名はレコードジャケット/ネオンサイン風に置き、活動ジャンルはset listに近い粒度で見せる。',
        'Visual hook: 暖色照明、レコード、カウンター、スモーキーな余白。派手なカード密度を避ける。',
        'Primary actions: Tonight Live、Schedule、Follow、Reservation/Contactを整理する。Contactは予約/出演相談として分離する。',
      ],
      composition: 'use the Jazz Lounge layout signature exactly. Make the first viewport a night jazz lounge reservation menu with a vertical lounge menu, record-cover hero, Tonight set list/Next Stream panel, and reservation-style Contact.',
      negatives: ['No idol ticket strip, no cyber HUD, no generic two-column dashboard, no bright corporate header.'],
    },
    K: {
      archetype: 'knight order command table',
      density: 'medium density with formal hierarchy.',
      placement: 'left shield/nav, center oath/hero crest, right expedition schedule, bottom audience hall Contact.',
      implementation: 'shield rail, parchment cards, crest hero, expedition rows, and formal CTA blocks.',
      layout: [
        'PC composition: 騎士団の作戦卓として構成する。左にshield rail、中央に誓約/紋章Hero、右にexpedition schedule、下部にaudience hall Contactを置く。',
        'Header: side railまたはworld-in-UIの紋章ナビにし、通常top navは避ける。SPはtop compact header + sticky CTA。',
        'Hero copy: キャラ名は誓約書/紋章の中心に置き、配信予定は遠征予定として見せる。',
        'Visual hook: 盾、旗、羊皮紙、作戦卓。過度なファンタジー装飾よりUIの読みやすさを優先する。',
        'Primary actions: Pledge Live、Schedule、Follow、Audience/Contactを整理する。Contactは謁見/依頼として分離する。',
      ],
      composition: 'use the Knight Honor layout signature exactly. Make the first viewport a knight order command table with shield navigation, crest hero, expedition schedule, and an audience/Contact block.',
      negatives: ['No boss throne layout, no idol stage, no pastel prism panels, no identical card stack.'],
    },
    L: {
      archetype: 'moon phase observatory',
      density: 'low-medium density with celestial rhythm.',
      placement: 'top or side lunar phase dial, center moonlit hero, orbiting Next Stream/Schedule panels, lower quiet Contact.',
      implementation: 'phase dial, orbit lines, static sky layers, compact readable panels, and soft contrast.',
      layout: [
        'PC composition: 月相観測室として構成する。上部または左にlunar phase dial、中央に月明かりHero、軌道上にNext Stream / Schedule、下部に静かなContactを置く。',
        'Header: top fixedでもよいが、月相ダイヤルや星図ラベルとして薄く扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名は月光の中心に置き、短い一言は月齢/観測メモに寄せる。',
        'Visual hook: 月相、星図、軌道線、夜空。情報はカード積みではなく軌道上の観測パネルとして配置する。',
        'Primary actions: Moon Live、Schedule、Follow、Contactを整理する。Contactは静かな観測依頼として分離する。',
      ],
      composition: 'use the Lunar Phase layout signature exactly. Make the first viewport a moon phase observatory with a lunar phase dial, moonlit hero, orbiting Next Stream/Schedule panels, and a quiet Contact block.',
      negatives: ['No dense dashboard, no cyber terminal, no idol ticket strip, no identical right-side stacked cards.'],
    },
    M: {
      archetype: 'chrome showroom command display',
      density: 'medium density with product-showcase clarity.',
      placement: 'center chrome hero pedestal, left spec/navigation strip, right live demo/schedule display, bottom polished contact dock.',
      implementation: 'reflective panels, pedestal layout, spec strips, demo card, and restrained gradients.',
      layout: [
        'PC composition: クロームのショールームとして構成する。中央にchrome hero pedestal、左にspec/nav strip、右にLive demo / Schedule display、下部にpolished contact dockを置く。',
        'Header: 通常top navよりも展示ラベル/スペックバーとして扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名は金属ロゴ/展示名として置き、活動内容はspec labelに分ける。',
        'Visual hook: 反射する金属、展示台、製品発表感。カードを並べすぎず、面の美しさを優先する。',
        'Primary actions: Watch Demo、Schedule、Follow、Contactを整理する。Contactはshowroom inquiryとして分離する。',
      ],
      composition: 'use the Metallic Chrome layout signature exactly. Make the first viewport a chrome showroom command display with a central hero pedestal, spec/navigation strip, live demo/schedule display, and polished contact dock.',
      negatives: ['No fantasy UI, no pastel prism layout, no generic corporate SaaS dashboard, no repeated right-side card stack.'],
    },
    N: {
      archetype: 'neon nightlife sign street',
      density: 'medium-high density with street signage.',
      placement: 'top club sign/nav, center street hero, right event board schedule, bottom flyer stickers for Follow/Contact.',
      implementation: 'signboard nav, poster/flyer CTA blocks, dark street background, and readable neon panels.',
      layout: [
        'PC composition: ネオン街の看板通りとして構成する。上部にclub sign nav、中央にstreet hero、右にevent board schedule、下部にflyer/sticker型Follow / Contactを置く。',
        'Header: 通常ナビではなく、店舗看板や路地サインとして扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名は大きなネオンサインとして置き、配信ジャンルはイベント告知ポスターに寄せる。',
        'Visual hook: 夜景、ネオン看板、イベントフライヤー。情報は街のサインボードとして分散する。',
        'Primary actions: Enter Live、Schedule、Follow、Contactを整理する。Contactは出演/案件相談ポスターとして分離する。',
      ],
      composition: 'use the Neon Night layout signature exactly. Make the first viewport a neon nightlife sign street with club-sign navigation, central street hero, event board schedule, and flyer/sticker Follow/Contact blocks.',
      negatives: ['No generic cyber grid, no clean two-column dashboard, no idol stage ticket strip, no identical right card stack.'],
    },
    O: {
      archetype: 'orbital mission control',
      density: 'medium density with radial orbit hierarchy.',
      placement: 'center planet/avatar orbit, circular nav, right mission schedule, left telemetry/live status, bottom contact as ground control channel.',
      implementation: 'radial layout, orbit lines, telemetry panels, static starfield, and readable mission cards.',
      layout: [
        'PC composition: 宇宙ミッション管制として構成する。中央にplanet/avatar orbit、円形nav、右にmission schedule、左にtelemetry/live status、下部にground control Contactを置く。',
        'Header: top navではなく、軌道リングやmission tabsとして扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名はミッション名/コールサインとして置き、配信予定はmission timelineにする。',
        'Visual hook: 星図、軌道線、深い宇宙、ミッションカード。情報は放射状に整理する。',
        'Primary actions: Launch Live、Schedule、Follow、Ground Contactを整理する。Contactは管制通信として分離する。',
      ],
      composition: 'use the Orbit Space layout signature exactly. Make the first viewport orbital mission control with a central orbit hero, circular navigation, telemetry/live status, mission schedule, and ground-control Contact channel.',
      negatives: ['No rectangular dashboard grid, no fantasy throne, no pastel prism layout, no identical right-side stacked cards.'],
    },
    P: {
      archetype: 'retro game save-select screen',
      density: 'medium density with playful clear choices.',
      placement: 'top pixel title bar, center character/save-slot hero, left menu commands, right next stage/schedule, bottom cartridge Contact.',
      implementation: 'pixel frames, save slots, command menu, readable mixed typography, and low-cost CSS blocks.',
      layout: [
        'PC composition: レトロゲームのsave-select画面として構成する。上部にpixel title bar、中央にcharacter/save-slot hero、左にcommand menu、右にnext stage/schedule、下部にcartridge Contactを置く。',
        'Header: 通常ナビではなく、ゲームのコマンドメニューとして扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名はセーブデータ名として置き、活動内容はステータス/ステージ名にする。',
        'Visual hook: ドットUI、カセット、セーブスロット、8-bit frame。本文は読みやすい通常フォントも併用する。',
        'Primary actions: Continue Live、Stage Schedule、Follow、Contactを整理する。Contactはカセット/説明書の相談欄として分離する。',
      ],
      composition: 'use the Pixel Retro layout signature exactly. Make the first viewport a retro game save-select screen with pixel title bar, command menu, save-slot hero, next stage schedule, and cartridge Contact.',
      negatives: ['No modern glass dashboard, no idol stage, no unreadable pixel paragraphs, no identical right-side cards.'],
    },
    Q: {
      archetype: 'adventurer quest board',
      density: 'medium density with parchment hierarchy.',
      placement: 'left quest category tabs, center active quest/hero parchment, right party schedule, bottom guild contact notice.',
      implementation: 'quest board grid, parchment cards, category tabs, active quest highlight, and guild notice CTA.',
      layout: [
        'PC composition: 冒険者ギルドのquest boardとして構成する。左にquest category tabs、中央にactive quest/hero parchment、右にparty schedule、下部にguild contact noticeを置く。',
        'Header: side railまたは掲示板のタブとして扱い、通常top navは避ける。SPはtop compact header + sticky CTA。',
        'Hero copy: キャラ名はactive questの依頼主/冒険者名として置き、次回配信は受注中クエストとして見せる。',
        'Visual hook: 羊皮紙、地図、依頼票、パーティ募集。Boss Roomの玉座/HPバーとは明確に分ける。',
        'Primary actions: Accept Live、Schedule、Join Community、Contactを整理する。Contactはギルド依頼票として分離する。',
      ],
      composition: 'use the Quest Log layout signature exactly. Make the first viewport an adventurer quest board with quest category tabs, active quest parchment hero, party schedule, and guild contact notice.',
      negatives: ['No boss throne, no HP boss status UI, no modern right card stack, no generic fantasy poster without website UI.'],
    },
    R: {
      archetype: 'stealth mission dossier',
      density: 'medium density with dark tactical focus.',
      placement: 'left mission nav, center masked hero/dossier, right encrypted schedule, bottom secure drop Contact.',
      implementation: 'tactical grid, dossier cards, map overlays, dark panels, and high-contrast CTA.',
      layout: [
        'PC composition: 潜入任務のdossierとして構成する。左にmission nav、中央にmasked hero/dossier、右にencrypted schedule、下部にsecure drop Contactを置く。',
        'Header: top navではなく、ミッション番号/暗号タブとして扱う。SPはtop compact header + sticky CTA。',
        'Hero copy: キャラ名はコードネームとして置き、活動内容はmission objectiveに分ける。',
        'Visual hook: ステルスHUD、暗号、潜入マップ。情報は暗く絞るがCTAは明確にする。',
        'Primary actions: Start Mission、Schedule、Follow、Secure Contactを整理する。Contactは安全な投函口として分離する。',
      ],
      composition: 'use the Rogue Stealth layout signature exactly. Make the first viewport a stealth mission dossier with mission nav, masked hero dossier, encrypted schedule, and secure drop Contact.',
      negatives: ['No boss throne layout, no bright idol signage, no pastel prism panels, no repeated right-side card stack.'],
    },
    S: {
      archetype: 'steampunk workshop control bench',
      density: 'medium-high density with mechanical panels.',
      placement: 'left gear nav, center engine/character hero, right pressure-gauge schedule, bottom brass contact work order.',
      implementation: 'gear rail, brass panels, gauge cards, workshop background, and static mechanical accents.',
      layout: [
        'PC composition: スチームパンク工房のcontrol benchとして構成する。左にgear nav、中央にengine/character hero、右にpressure-gauge schedule、下部にbrass contact work orderを置く。',
        'Header: side railまたは計器盤にし、通常top navは避ける。SPはtop compact header + sticky CTA。',
        'Hero copy: キャラ名は機械銘板として置き、次回配信は運行表/実験ログとして見せる。',
        'Visual hook: 歯車、真鍮、圧力計、工房。装飾は機械UIに寄せ、読みにくい蒸気を抑える。',
        'Primary actions: Start Engine Live、Schedule、Follow、Work Order Contactを整理する。Contactは発注書として分離する。',
      ],
      composition: 'use the Steampunk Gear layout signature exactly. Make the first viewport a steampunk workshop control bench with gear navigation, engine hero, pressure-gauge schedule, and brass work-order Contact.',
      negatives: ['No clean tech dashboard, no fantasy boss throne, no pastel prism layout, no identical card stack.'],
    },
    T: {
      archetype: 'logic circuit operations board',
      density: 'medium-high density with analytic structure.',
      placement: 'top compact command bar, center node graph hero, left build queue, right live/schedule verification panel, bottom API-like contact.',
      implementation: 'node graph, circuit lines, command bar, verification cards, and structured labels.',
      layout: [
        'PC composition: 論理回路のoperations boardとして構成する。上部にcompact command bar、中央にnode graph hero、左にbuild queue、右にLive / Schedule verification、下部にAPI-like Contactを置く。',
        'Header: 通常ナビよりもcommand barやノードラベルとして扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名はプロジェクト名/関数名のように置き、活動内容は検証ログに分ける。',
        'Visual hook: 回路、ノード、検証パネル。冷静な技術感を出し、派手なネオンに寄せすぎない。',
        'Primary actions: Run Live、Schedule、Follow、Contact APIを整理する。Contactは問い合わせendpointとして分離する。',
      ],
      composition: 'use the Tech Logic layout signature exactly. Make the first viewport a logic circuit operations board with command bar, node graph hero, build queue, verification schedule, and API-like Contact.',
      negatives: ['No generic cyber city, no idol stage, no fantasy parchment, no repeated right-side cards.'],
    },
    U: {
      archetype: 'urban wall poster collage',
      density: 'high density with street-layer hierarchy.',
      placement: 'wall-tag header, center mural hero, torn-poster Live/Schedule, sticker Follow icons, lower-right booking/contact poster.',
      implementation: 'poster collage grid, sticker CTAs, wall texture, torn paper panels, and readable labels.',
      layout: [
        'PC composition: ストリート壁面のposter collageとして構成する。上部にwall-tag header、中央にmural hero、破れたposterにLive / Schedule、stickerでFollow、右下にbooking/contact posterを置く。',
        'Header: 通常ナビではなく、タグ/ステッカー/ポスター見出しとして扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名は大きなグラフィティタグとして置き、活動内容は貼り紙に分散する。',
        'Visual hook: 落書き、ステッカー、ポスター、都市の壁。雑多でもCTAは読めるようにする。',
        'Primary actions: Live、Schedule、Follow、Booking/Contactを整理する。Contactは出演/案件ポスターとして分離する。',
      ],
      composition: 'use the Urban Graffiti layout signature exactly. Make the first viewport an urban wall poster collage with tag header, mural hero, torn-poster Live/Schedule, sticker Follow icons, and booking/contact poster.',
      negatives: ['No polished corporate grid, no fantasy UI, no pastel prism panels, no identical right-side card stack.'],
    },
    V: {
      archetype: 'vivid glitch sticker stack',
      density: 'high density with layered pop rhythm.',
      placement: 'offset sticker nav, center oversized hero sticker, floating live/clip windows, diagonal schedule strip, separated contact sticker.',
      implementation: 'layered panels, clipped stickers, strong color blocks, stable text zones, and limited glitch accents.',
      layout: [
        'PC composition: vividなglitch sticker stackとして構成する。ずれたsticker nav、中央のoversized hero sticker、浮遊するLive / Clip windows、斜めのSchedule strip、分離したContact stickerを置く。',
        'Header: 通常ナビではなく、ステッカーや切り抜きタブとして扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名は大きなステッカーとして置き、短い一言は色面ラベルにする。',
        'Visual hook: 強い色面、ステッカー、ウィンドウ重なり、軽いグリッチ。CTA文字は絶対に壊さない。',
        'Primary actions: Live、Clip、Schedule、Contactを整理する。Contactは色を変えた別ステッカーとして分離する。',
      ],
      composition: 'use the Vivid Glitch layout signature exactly. Make the first viewport a vivid glitch sticker stack with offset sticker nav, oversized hero sticker, floating Live/Clip windows, diagonal schedule strip, and separate Contact sticker.',
      negatives: ['No clean dashboard, no unreadable glitch text, no boss status UI, no repeated right-side cards.'],
    },
    W: {
      archetype: 'ultra-wide cinematic stream wall',
      density: 'medium-low density with horizontal flow.',
      placement: 'top minimal frame labels, center panoramic hero, bottom horizontal timeline for Live/Schedule/Archive, far-right contact slate.',
      implementation: 'wide aspect hero, horizontal timeline, caption labels, and stable CTA panels.',
      layout: [
        'PC composition: ultra-wide cinematic stream wallとして構成する。上部は最小ラベル、中央にpanoramic hero、下部にLive / Schedule / Archiveの横長timeline、右端にcontact slateを置く。',
        'Header: 通常navを避け、映画字幕/カメラフレームのラベルとして扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名はシネマ字幕やタイトルカードとして置き、情報は横方向に流す。',
        'Visual hook: 横長構図、配信シーンのパノラマ、タイムライン帯。カードを縦に積まない。',
        'Primary actions: Watch Live、Schedule、Archive、Contactを整理する。Contactは右端のslateとして分離する。',
      ],
      composition: 'use the Wide Pan layout signature exactly. Make the first viewport an ultra-wide cinematic stream wall with panoramic hero, horizontal timeline for Live/Schedule/Archive, and far-right Contact slate.',
      negatives: ['No vertical card stack, no dense dashboard, no idol ticket strip, no generic hero-left/cards-right layout.'],
    },
    X: {
      archetype: 'action sports camera overlay',
      density: 'high density with diagonal momentum.',
      placement: 'diagonal top timer/nav, center action hero, left speed/status meter, right event schedule, bottom sponsor/contact rail.',
      implementation: 'diagonal grid, timer labels, action photo background, meter cards, and sponsor rail.',
      layout: [
        'PC composition: アクションカメラのoverlayとして構成する。斜めのtimer/nav、中央のaction hero、左のspeed/status meter、右のevent schedule、下部のsponsor/contact railを置く。',
        'Header: 通常navではなく、計測タイマーや競技UIとして扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名は大会タイトル/選手名のように置き、配信内容は競技ラベルで示す。',
        'Visual hook: 斜め構図、スピードメーター、アクション感。動きは強くてもCTAは安定させる。',
        'Primary actions: Watch Live、Schedule、Follow、Sponsor/Contactを整理する。Contactはスポンサー/出演相談railとして分離する。',
      ],
      composition: 'use the Xtreme Action layout signature exactly. Make the first viewport an action sports camera overlay with diagonal timer/nav, action hero, speed meter, event schedule, and sponsor/contact rail.',
      negatives: ['No pastel layout, no fantasy parchment, no clean corporate dashboard, no identical right-side cards.'],
    },
    Y: {
      archetype: 'creator growth analytics board',
      density: 'medium-high density with chart hierarchy.',
      placement: 'top KPI ticker, center growth chart hero, left audience/follow panel, right next stream funnel, bottom sponsor/contact report card.',
      implementation: 'KPI ticker, line chart hero, metric cards, funnel card, and sponsor report CTA.',
      layout: [
        'PC composition: 配信成長analytics boardとして構成する。上部にKPI ticker、中央にgrowth chart hero、左にaudience/follow、右にnext stream funnel、下部にsponsor/contact report cardを置く。',
        'Header: 通常navではなく、KPI tickerや分析タブとして扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名は成長レポートの主題として置き、活動内容は指標カードに分ける。',
        'Visual hook: チャート、KPI、分析パネル。数字やグラフは装飾ではなく導線として使う。',
        'Primary actions: Watch Live、Schedule、Follow、Sponsor Contactを整理する。Contactは案件レポート/媒体資料風に分離する。',
      ],
      composition: 'use the Yield Chart layout signature exactly. Make the first viewport a creator growth analytics board with KPI ticker, growth chart hero, audience/follow panel, next stream funnel, and sponsor/contact report card.',
      negatives: ['No fantasy UI, no idol stage, no generic business SaaS page, no repeated right-side card stack.'],
    },
    Z: {
      archetype: 'zen brush scroll composition',
      density: 'low density with strong negative space.',
      placement: 'minimal top/side ink nav, large brush hero, small next stream seal, lower-left schedule scroll, lower-right quiet contact seal.',
      implementation: 'ink brush background, scroll-like panels, seal CTAs, static texture, and restrained typography.',
      layout: [
        'PC composition: 禅の掛け軸/筆跡として構成する。最小限のink nav、大きなbrush hero、小さなnext stream seal、左下にschedule scroll、右下にquiet contact sealを置く。',
        'Header: 通常navを避け、墨の小さな印や縦書きラベルとして扱う。SPはtop compact header + bottom CTA。',
        'Hero copy: キャラ名は大きな筆文字/余白の主役として置き、説明は極力短くする。',
        'Visual hook: 筆跡、余白、和紙、印章。Cとは違う静かな余白で、装飾密度を上げない。',
        'Primary actions: Live、Schedule、Follow、Contactを整理する。Contactは控えめな印章/問い合わせ札として分離する。',
      ],
      composition: 'use the Zen Brush layout signature exactly. Make the first viewport a zen brush scroll composition with minimal ink nav, large brush hero, next stream seal, schedule scroll, and quiet contact seal.',
      negatives: ['No dense dashboard, no cyber HUD, no idol ticket strip, no repeated right-side cards.'],
    },
  };

  return signatures[tag] || {
    archetype: 'theme-specific streamer first viewport',
    density: 'medium density with clear hierarchy.',
    placement: 'distinct header, hero identity, readable live/schedule area, separated follow and contact actions.',
    implementation: 'CSS grid, static background layers, accessible text, and restrained CTA panels.',
    layout: [
      'PC composition: テーマ固有の世界観をUI配置に反映し、汎用的なhero-left/cards-right構成にしない。',
      'Header: 既存のHeader positionに従いつつ、テーマ内のオブジェクトやラベルとして見せる。',
      'Hero copy: キャラ名、配信ジャンル、初見向けの一言、活動プラットフォームを1画面内に入れる。',
      'Visual hook: テーマ固有の形状を情報配置に使い、CTAと配信予定の可読性を最優先にする。',
      'Primary actions: Live / Schedule / Follow / Contact を4つ以内に整理する。',
    ],
    composition: 'use a theme-specific first viewport layout. Do not reuse a generic hero-left/cards-right dashboard. Include readable streamer identity, Live/Schedule, Follow, and separated Contact.',
    negatives: ['No generic repeated right-side card stack.'],
  };
}

function buildPrompt(template, detailPath, detailContent) {
  const theme = template.themeLabel || template.name;
  const degree = degreeFromDetailPath(detailPath);
  const colors = template.colors || [];
  const features = template.features || [];
  const typography = typographyFor(theme, features);
  const audience = extractLine(detailContent, 'Target audience');
  const conversion = extractLine(detailContent, 'Conversion goal');
  const renewalDepth = extractLine(detailContent, 'Strategic renewal depth');
  const effectLevel = extractLine(detailContent, 'Motion / effect level');
  const pageModel = extractLine(detailContent, 'Page model');
  const header = extractLine(detailContent, 'Header position');
  const layoutMode = extractLine(detailContent, 'Layout mode');
  const mockPriority = extractLine(detailContent, 'Mock priority');
  const visualDirection = extractLine(detailContent, 'Visual direction');
  const visualSystem = extractSection(detailContent, 'Visual System');
  const firstViewport = extractSection(detailContent, 'First Viewport Blueprint');
  const motionDetail = extractSection(detailContent, 'Motion Detail');
  const avoid = extractSection(detailContent, 'Avoid');
  const imagery = imageryFor(theme, visualDirection, audience);
  const sourceDetail = path.relative(root, detailPath).replaceAll('\\', '/');
  const layoutSignature = layoutSignatureFor(template.tag);
  const layoutBlock = layoutSignature.layout.map((line) => `- ${line.replace(/^- /, '')}`).join('\n');
  const signatureBlock = [
    `- Archetype: ${layoutSignature.archetype}`,
    `- Density: ${layoutSignature.density}`,
    `- Information placement: ${layoutSignature.placement}`,
    '- Avoid shared layout: do not use generic hero-left/cards-right composition, balanced two-column card grid, or identical right-side stacked cards.',
    `- Implementation hint: ${layoutSignature.implementation}`,
  ].join('\n');
  const extraNegative = layoutSignature.negatives.map((line) => `- ${line}`).join('\n');

  return `# Streamer ${template.tag}: ${theme} Mock Prompt

## Purpose
- このファイルは streamer/${template.tag.toLowerCase()} の first viewport mock 画像を作るためのプロンプト。
- \`design.md\` 形式の考え方に合わせ、YAML design tokens + human-readable rationale + image prompt に分ける。
- Source detail: \`${sourceDetail}\`
- Generated: ${today}

## DESIGN.md Tokens
\`\`\`yaml
---
version: "alpha"
name: "Streamer ${template.tag}: ${theme}"
description: "${audience}向けの公式サイト first viewport mock。${conversion}へつなぐ。"
colors:
  primary: "${colors[0] || '#bc13fe'}"
  secondary: "${colors[1] || '#111827'}"
  surface: "${colors[2] || '#05050a'}"
  on-surface: "#ffffff"
  muted: "#a1a1aa"
typography:
  h1:
    fontFamily: "${typography.h1.split(',')[0]}"
    fontSize: "${typography.h1.split(',')[1]?.trim() || '64px'}"
    fontWeight: 800
    lineHeight: 1.05
  body-md:
    fontFamily: "Noto Sans JP"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.7
  label-caps:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.06em"
rounded:
  sm: "4px"
  md: "8px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "56px"
components:
  live-badge:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  primary-cta:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "14px 18px"
  info-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "18px"
---
\`\`\`

## Overview
- Target audience: ${audience}
- Conversion goal: ${conversion}
- Renewal depth: ${renewalDepth}
- Motion / effect level: ${effectLevel}
- Page model: ${pageModel}
- Header position: ${header}
- Layout mode: ${layoutMode}
- Mock priority: ${mockPriority}

## Colors
- Primary: \`${colors[0] || '#bc13fe'}\` を世界観の主役色、Live状態、重要アクセントに使う。
- Secondary: \`${colors[1] || '#111827'}\` をUI枠、背景レイヤー、補助アクセントに使う。
- Surface: \`${colors[2] || '#05050a'}\` を背景/カード面に使う。
- CTA色と装飾色を混ぜない。Live / Schedule / Follow / Contact は色だけでなくラベルで区別する。

## Typography
- H1: ${typography.h1}
- Body: ${typography.body}
- Label: ${typography.label}
- キャラ名は大きく、配信日時とCTAはUIとして読みやすくする。装飾フォントを本文に使わない。

## Layout
${layoutBlock}

## Layout Signature
${signatureBlock}

## Elevation & Depth
- 背景は最大3レイヤーまで。主役ビジュアル、UIカード、CTAが重ならないようにする。
- Cards: 8px radius を基本にし、過剰な角丸カード感を避ける。
- Shadow / glow はHeroの主役周辺に限定し、常時広範囲にかけない。

## Shapes
- テーマに合わせた装飾形状を1種類だけ使う。HUD、HP bar、orbit line、stage light、brush strokeなど。
- CTAとScheduleは標準的な矩形UIにして、クリック可能領域が分かるようにする。

## Components
${visualSystem}

## Motion Notes
${motionDetail}

## Do's and Don'ts
### Do
- first viewportだけで「誰のサイトか」「次に何を見るか」「どこからフォロー/案件相談するか」が分かる。
- Live / Schedule / Follow / Contact を4アクション以内に整理する。
- IRIAMライバー / VTuber向けに、lit.linkより世界観があり、公式サイトより軽く見えるバランスにする。
- キャラクター立ち絵が無い場合でも、シルエット、ロゴ、配信UI、背景レイヤーで成立させる。

### Don't
${avoid}
- 実装不能な細部、判読不能な小文字、意味のない長文ダミーテキストを入れない。

## Mock Image Prompt
Create a high-fidelity first viewport website mockup for a Japanese streamer / VTuber official profile site.

Theme: "${theme}".
Audience: ${audience}.
Visual direction: ${visualDirection}.
Imagery direction: ${imagery}

Canvas: desktop first viewport, 16:9, 1440x900, no browser chrome, no device frame.
Composition: ${layoutSignature.composition}
Text: keep text short and legible. Use labels such as "LIVE", "Schedule", "Follow", "Contact", "Next Stream", and a short Japanese streamer name. Do not fill the design with long unreadable paragraphs.
Style: polished production website mock, not a landing page explanation, not a generic gaming poster. The result should feel like a template that an IRIAMライバー or VTuber could immediately imagine using.
CTA: show one primary CTA and two to three secondary actions. Business contact must be visually separate from fan/community actions.
Accessibility: high contrast for schedule and CTA text. Avoid hiding text behind effects.

## Negative Prompt
- No generic stock cyber background without website UI.
- No poster-only composition.
- No unreadable tiny paragraphs.
- No excessive glitch, particles, smoke, blur, or neon bloom over CTA text.
${extraNegative}
- No browser chrome, phone frame, watermark, social media screenshot, or app store badge.
- No unrelated corporate business site tone.

## Mock Review Checklist
- First viewport contains theme, streamer identity, Live/Schedule, Follow, Contact.
- The visual identity matches "${theme}" and still feels like a usable website.
- CTA and schedule are readable at thumbnail size.
- Fan actions and business contact are not mixed.
- The mock can be implemented in Phase 1 without requiring motion, 3D, particles, or heavy canvas.
`;
}

const detailFiles = await listMarkdownFiles(detailRoot);
const detailByTag = new Map();
for (const file of detailFiles) {
  const name = path.basename(file);
  const tag = name.match(/^([a-z])-.*\.md$/i)?.[1]?.toUpperCase();
  if (tag) detailByTag.set(tag, file);
}

const resolvedOutputRoot = path.resolve(outputRoot);
if (!resolvedOutputRoot.endsWith(`${path.sep}docs${path.sep}template-renewal-details${path.sep}streamer${path.sep}mock-prompts`)) {
  throw new Error(`Refusing to clear unexpected output directory: ${resolvedOutputRoot}`);
}

await fs.rm(outputRoot, { recursive: true, force: true });

let count = 0;
for (const template of PORTAL_DATA.templates.streamer) {
  const detailPath = detailByTag.get(template.tag);
  if (!detailPath) {
    throw new Error(`Missing streamer detail md for tag ${template.tag}`);
  }
  const detailContent = await fs.readFile(detailPath, 'utf8');
  const degree = degreeFromDetailPath(detailPath);
  const outputDir = path.join(outputRoot, degree);
  await fs.mkdir(outputDir, { recursive: true });
  const theme = template.themeLabel || template.name;
  const fileName = `${template.tag.toLowerCase()}-${slugify(theme)}-mock-prompt.md`;
  await fs.writeFile(path.join(outputDir, fileName), buildPrompt(template, detailPath, detailContent), 'utf8');
  count += 1;
}

const readme = `# Streamer Mock Prompts

## Purpose
- streamer 26テンプレートの first viewport mock 作成用プロンプトを管理する。
- 各プロンプトは DESIGN.md の考え方に合わせ、design tokens、視覚方針、画像生成プロンプト、negative prompt、review checklist を含む。
- business 実装中に裏で streamer mock を作るための入力として使う。

## Structure
- \`full-renewal/\`: フルリニューアル分類の streamer mock prompts
- \`partial-renewal/\`: partial分類だが、戦略上は high renewal として扱う streamer mock prompts
- \`polish/\`: polish分類だが、戦略上は high renewal として扱う streamer mock prompts

## Source
- Template data: \`public/assets/js/data.js\`
- Renewal details: \`docs/template-renewal-details/streamer/**/*.md\`
- Generator: \`scripts/generate-streamer-mock-prompts.mjs\`
- DESIGN.md reference: https://github.com/google-labs-code/design.md

## Usage
1. 対象テンプレートの prompt md を開く。
2. \`Mock Image Prompt\` と \`Negative Prompt\` を画像生成ツールへ渡す。
3. 生成後、\`Mock Review Checklist\` でFV、CTA、配信導線、案件導線を確認する。
4. 採用するモックは、該当テンプレートの renewal detail md と矛盾しないようにする。
`;

await fs.writeFile(path.join(outputRoot, 'README.md'), readme, 'utf8');

console.log(`Generated ${count} streamer mock prompt files under ${path.relative(root, outputRoot)}`);
