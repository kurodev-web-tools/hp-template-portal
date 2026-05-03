import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const outputRoot = path.join(root, 'docs', 'template-renewal-details');
const { PORTAL_DATA } = await import(pathToFileURL(path.join(root, 'public', 'assets', 'js', 'data.js')).href);

const today = '2026-05-03';

const categoryConfig = {
  business: {
    label: 'Business',
    purpose: '信頼、業務内容、実績、問い合わせを短時間で伝える受託向けサイト',
    defaultGoal: '問い合わせ、無料相談、資料請求',
    standardSections: ['Hero', 'Trust Proof', 'Services', 'Case / Numbers', 'Process', 'FAQ', 'Contact'],
    layoutBase: 'PC は情報密度を高めた2カラムまたはカードグリッド、SP はCTAを前倒しした1カラム。',
    tone: '落ち着き、信頼、業種固有の実在感',
    mockScope: 'first viewport + services/proof の一部',
  },
  streamer: {
    label: 'Streamer',
    purpose: '配信者の人格、活動導線、ファン参加、案件相談をまとめる公式サイト',
    defaultGoal: '配信視聴、SNSフォロー、スケジュール確認、案件相談',
    standardSections: ['Hero', 'Profile', 'Live / Schedule', 'Clips / Archive', 'Community', 'Goods / Links', 'Contact'],
    layoutBase: 'PC は世界観UIを強め、SP は配信予定とSNS導線を最短距離にする。',
    tone: 'キャラクター性、記憶に残る世界観、ファン導線',
    mockScope: 'first viewport + schedule / clips teaser',
  },
  lp: {
    label: 'LP',
    purpose: '1つの offer に絞って、理解、信頼、行動を最短でつなぐCVページ',
    defaultGoal: '購入、予約、申し込み、資料請求、無料体験',
    standardSections: ['Hero Offer', 'Problem / Promise', 'Benefits', 'Proof', 'Pricing / Plans', 'FAQ', 'Final CTA'],
    layoutBase: '1ページ1目的を徹底し、CTAとフォーム摩擦を最小化する。',
    tone: '明確、直接的、ベネフィット重視',
    mockScope: 'first viewport + proof/pricing teaser',
  },
  portfolio: {
    label: 'Portfolio',
    purpose: '作品、視点、依頼可能性を伝え、問い合わせへ自然につなぐサイト',
    defaultGoal: '作品閲覧、問い合わせ、案件相談、プロフィール理解',
    standardSections: ['Hero / Statement', 'Selected Works', 'Case Study', 'Profile', 'Services / Fit', 'Contact'],
    layoutBase: '作品を主役にしつつ、問い合わせ導線を埋もれさせない。',
    tone: '作家性、余白、編集された実在感',
    mockScope: 'first viewport + selected work detail teaser',
  },
};

const decisions = {
  business: {
    partial: ['A', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'Q', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'],
    polish: ['B', 'C', 'D', 'K', 'M', 'N', 'O', 'P', 'R', 'Z'],
    full: [],
  },
  streamer: {
    full: ['B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'T', 'U', 'V', 'X', 'Y'],
    partial: ['E'],
    polish: ['A', 'K', 'S', 'W', 'Z'],
  },
  lp: {
    full: ['H', 'I', 'J', 'K', 'L', 'M', 'O', 'Q', 'S', 'T', 'U', 'V', 'W', 'X', 'Z'],
    partial: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'N', 'P', 'R'],
    polish: ['Y'],
  },
  portfolio: {
    full: ['J', 'O', 'S'],
    partial: ['F', 'V'],
    polish: ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X', 'Y', 'Z'],
  },
};

const categorySpecific = {
  business: {
    Authentic: {
      audience: '士業、戦略コンサル、堅実なBtoB企業',
      concept: '信頼の蓄積を見せるコーポレートサイト。派手な演出より、実績、担当領域、相談しやすさを優先する。',
      design: 'クラシックな余白、縦長の見出し、控えめな罫線。Hero は実写風の建築/会議室/資料モチーフで重心を作る。',
      conversion: '初回相談、資料請求、顧問相談の3導線を分ける。',
    },
    Bold: {
      audience: 'スタートアップ、制作会社、ローンチ支援会社',
      concept: '勢いと実行力を売るローンチ支援サイト。大きい数字と短いコピーで即断させる。',
      design: '大判タイポ、強い黒白コントラスト、アクセントカラーをCTAだけに集中。',
      conversion: 'プロジェクト相談と実績閲覧をHero内で並列に置く。',
    },
    Clean: {
      audience: 'クリニック、医療、士業、相談業',
      concept: '不安を減らす予約導線型サイト。診療/相談内容、受付時間、初回手順を最初に見せる。',
      design: '白ベース、淡い青、カード型の診療案内。余白は広めだが情報は隠さない。',
      conversion: 'Web予約、電話、アクセス確認を固定CTAにする。',
    },
    Dynamic: {
      audience: '製造、スポーツ、モビリティ、イベント運営',
      concept: '速度と実行管理を伝えるオペレーションサイト。演出はHeroに限定し、以降は成果指標で説得する。',
      design: '斜め構図、大きな写真、黒/オレンジの高コントラスト。',
      conversion: '導入相談、事例DL、現場見学予約の導線を用意する。',
    },
    Eco: {
      audience: '環境、食品、日用品、サステナブルブランド',
      concept: '抽象的なエコではなく、具体的な調達/製造/運用改善を見せる。',
      design: '自然色を使いつつ、淡すぎる印象を避ける。写真と数値カードを多めにする。',
      conversion: '無料相談、資料請求、導入事例のCTAを分ける。',
    },
    Future: {
      audience: 'AI導入、SaaS、IT支援、DX企業',
      concept: '近未来感より、導入後に何が変わるかを伝えるテックサイト。',
      design: 'ダーク背景、UIプレビュー、細いグリッド。抽象的な光よりプロダクト画面を優先。',
      conversion: 'デモ相談、資料DL、技術相談を明確にする。',
    },
    Global: {
      audience: '物流、商社、越境EC、海外展開支援',
      concept: '対応エリア、輸送網、リスク対応を見せるグローバルサイト。',
      design: '地図/ルート/ステータスUIを使い、国際感を装飾ではなく情報にする。',
      conversion: '見積もり相談、対応地域確認、輸送相談を配置する。',
    },
    'High-end': {
      audience: 'ホテル、高級サービス、プレミアムブランド',
      concept: '高級感と予約/問い合わせの現実感を両立する。',
      design: '余白、低彩度写真、金属アクセント。CTAは控えめでも見失わない位置に固定。',
      conversion: '来店予約、資料請求、コンシェルジュ相談。',
    },
    Intelligent: {
      audience: '分析ツール、監視SaaS、データ活用企業',
      concept: 'ダッシュボードの見た目を、導入メリットと意思決定支援に接続する。',
      design: '左に課題、右にUIプレビュー。データカードは動く装飾ではなく証拠にする。',
      conversion: 'デモ予約、導入相談、事例DL。',
    },
    Modern: {
      audience: '旅館、和ブランド、茶寮、文化施設',
      concept: '和モダンを実サイトとして使えるよう、予約/アクセス/商品導線を入れる。',
      design: '縦書きはアクセントに限定。SPでは横書き優先。',
      conversion: '予約、来店、商品購入、問い合わせ。',
    },
    Knowledge: {
      audience: '研究所、教育機関、学会、専門講座',
      concept: '知的信頼を見せる情報整理型サイト。',
      design: '落ち着いた紙面構成、論文/講座/イベントカード。',
      conversion: '資料請求、入会、講座申し込み。',
    },
    Logical: {
      audience: 'システム開発、エンジニアリング、BtoB支援',
      concept: '複雑な業務課題を整理して解決する会社に見せる。',
      design: 'フロー図、比較表、コード風アクセント。装飾terminalに頼りすぎない。',
      conversion: '技術相談、要件整理MTG、資料DL。',
    },
    Minimal: {
      audience: '建築、プロダクト、デザイン事務所',
      concept: '余白を保ちながら、問い合わせの理由を不足させない。',
      design: '大きな余白、少ない色、作品/サービスの並びは明確に。',
      conversion: '制作相談、カタログ請求、来店予約。',
    },
    'Neon Night': {
      audience: 'イベント、ナイトクラブ、音楽企画',
      concept: '熱量を残しつつ、チケット/予約へ迷わず進める。',
      design: '暗背景、ネオン、イベントカード。点滅は控えめ。',
      conversion: 'チケット購入、席予約、出演相談。',
    },
    'Organic Flow': {
      audience: 'スパ、美容、ウェルネス、オーガニックブランド',
      concept: '癒しだけでなく、メニュー、価格、予約を分かりやすく見せる。',
      design: '流体形状、柔らかい写真、価格カード。',
      conversion: '初回予約、メニュー確認、相談。',
    },
    'Pop Vibrant': {
      audience: 'エンタメ、店舗、ファミリー向けサービス',
      concept: '楽しさを行動に変えるキャンペーンサイト。',
      design: 'ポップ色、ステッカー風パーツ、CTAの視認性を強くする。',
      conversion: '来店予約、キャンペーン参加、問い合わせ。',
    },
    'Quality First': {
      audience: '精密機器、高級プロダクト、品質保証が重要な企業',
      concept: '品質証明と仕様確認を主役にする。',
      design: '白黒基調、製品アップ、仕様表、保証カード。',
      conversion: '製品相談、カタログ請求、見積もり。',
    },
    'Royal Legacy': {
      audience: '老舗、文化ブランド、伝統組織',
      concept: '歴史と現在の提供価値を同じ画面で伝える。',
      design: 'クラシックな装飾、年表、代表商品/サービス。',
      conversion: '来店予約、取材/法人相談、資料請求。',
    },
    'Smart SaaS': {
      audience: 'SaaS、業務ツール、BtoBプロダクト',
      concept: '無料相談より、デモ/価格/導入フローを明確にする。',
      design: 'UIスクリーン、bento grid、証拠バッジ。',
      conversion: '無料デモ、資料DL、トライアル。',
    },
    'Trust Guard': {
      audience: 'セキュリティ、金融、インフラ',
      concept: '守る価値、監査、導入体制を見せる。',
      design: '堅い配色、証明書/ログ/監査カード。',
      conversion: '診断相談、資料請求、監査問い合わせ。',
    },
    'Urban Street': {
      audience: 'アパレル、カルチャー拠点、クリエイティブ集団',
      concept: '勢いと販売/イベント導線を両立する。',
      design: 'グリッド崩し、写真コラージュ、太いCTA。',
      conversion: 'イベント予約、EC、コラボ相談。',
    },
    'Vivid Impact': {
      audience: '広告、キャンペーン、アートプロジェクト',
      concept: '強烈なビジュアルを、成果と申込導線に接続する。',
      design: '補色配色、大型コピー、実績数値。',
      conversion: '企画相談、制作依頼、キャンペーン参加。',
    },
    'Wide Horizon': {
      audience: '建築、写真、風景、ギャラリー',
      concept: '横長体験を残しつつ、迷わず問い合わせへ行ける。',
      design: 'PCは横スクロール、SPは縦の編集レイアウトに再構成。',
      conversion: '作品相談、展示予約、問い合わせ。',
    },
    'Xtreme Snap': {
      audience: 'スポーツ、アクション、イベント',
      concept: '熱量を保ちながら、スクロール操作で離脱させない。',
      design: '全画面セクションは3枚程度に制限し、CTAを常時見える位置へ。',
      conversion: '参加予約、スポンサー相談、問い合わせ。',
    },
    'Yield Growth': {
      audience: '投資、コンサル、経営支援',
      concept: '成長期待よりも信頼、免責、相談導線を整理する。',
      design: '数値カード、チャート、落ち着いたグリーン/ゴールド。',
      conversion: '初回相談、資料請求、診断申し込み。',
    },
    'Zen Garden': {
      audience: '茶室、スパ、和ブランド、静かな店舗',
      concept: '静けさを保ちつつ、予約/アクセス/メニューを見失わせない。',
      design: '低彩度、余白、写真一枚の説得力。SPは情報を前倒し。',
      conversion: '予約、アクセス確認、問い合わせ。',
    },
  },
  streamer: {
    'Abyss Neon': ['深海サイバー配信者', '深度メーター型ナビ、青/ピンクのネオン、配信状態カード', 'Live通知、YouTube/Twitch、案件相談'],
    'Boss Room': ['RPGボス系VTuber', '玉座/ステータスUI、重厚な暗金、HPバー型セクション', 'スケジュール、切り抜き、ファンコミュニティ'],
    'Crystal Prism': ['透明感/癒し/歌枠配信者', 'ガラスカード、淡いプリズム、柔らかい光', '配信予定、歌枠アーカイブ、SNSフォロー'],
    'Digital Ghost': ['匿名/ミステリアス系配信者', '暗い端末UI、ノイズ、アクセスログ風ナビ', '活動内容、匿名性ガイド、配信通知'],
    'E-Sports Pro': ['競技系配信者/チーム', '大会UI、白青、成績カード', '大会実績、配信予定、スポンサー相談'],
    'Future Tech': ['近未来/AI系配信者', 'HUD、プロダクトUI、サイバーグリッド', '配信テーマ、技術企画、案件相談'],
    'Glitch Core': ['切り抜き/短尺動画系', 'グリッチはHero中心、カードは読みやすく', 'Shorts/TikTok、最新動画、SNSフォロー'],
    'Horror Mansion': ['ホラー/怪談系VTuber', '館内マップ、蝋燭、暗いが読めるコントラスト', '配信予定、怪談投稿、コミュニティ'],
    'Idol Stage': ['アイドル/歌枠配信者', 'ステージ照明、ライブ日程、ファン導線', 'ライブ予定、グッズ、ファンクラブ'],
    'Jazz Lounge': ['音楽/夜配信者', 'ラウンジ席、セットリスト、レコード風カード', '配信予約、音源、出演相談'],
    'Knight Honor': ['騎士/ファンタジー系', '紋章、任務リスト、品のある金属感', 'スケジュール、ファン参加、案件相談'],
    'Lunar Phase': ['月/占い/夜系配信者', '月齢UI、静かなグラデーション、夜の予定表', '配信予定、占い/相談、SNS'],
    'Metallic Chrome': ['近未来/ファッション系', 'クローム反射、雑誌的Hero、UIは整理', '最新配信、ビジュアルギャラリー、案件'],
    'Neon Night': ['夜遊び/クラブ配信者', 'ネオン街、イベント告知、音楽感', 'イベント配信、告知、コミュニティ'],
    'Orbit Space': ['宇宙/科学系配信者', '軌道ナビ、星図、ミッションカード', '配信予定、アーカイブ、研究/案件相談'],
    'Pixel Retro': ['レトロゲーム配信者', 'ドットUI、セーブスロット、カセット風カード', '配信予定、ゲームリスト、Discord'],
    'Quest Log': ['RPG/企画配信者', 'クエストログを情報設計に使う', '参加企画、次回配信、コミュニティ'],
    'Rogue Stealth': ['ステルス/スパイ系', '任務ブリーフィング、暗いUI、最小演出', '配信予定、秘密任務風企画、SNS'],
    'Steampunk Gear': ['スチームパンク系', '歯車、真鍮、紙面カード', '配信予定、世界観、コミュニティ'],
    'Tech Logic': ['論理/開発/ガジェット系', '端末UI、コード断片、可読性重視', '配信テーマ、技術相談、アーカイブ'],
    'Urban Graffiti': ['ストリート/ラップ/カルチャー系', '壁面グラフィティ、イベント告知、太いCTA', '配信/ライブ予定、SNS、コラボ相談'],
    'Vivid Glitch': ['短尺/高速編集系', '強い色はHeroに限定、下部は整理', 'ショート動画、切り抜き、フォロー'],
    'Wide Pan': ['旅/風景/雑談配信者', '横長パノラマ、SPは縦編集', '配信予定、旅ログ、案件相談'],
    'Xtreme Action': ['スポーツ/アクション配信者', '全画面写真、スコア、スポンサー枠', '大会予定、配信、スポンサー相談'],
    'Yield Chart': ['投資/分析配信者', 'チャート、免責、情報整理', '配信予定、分析コンテンツ、問い合わせ'],
    'Zen Brush': ['和/書/落ち着いた配信者', '筆跡、余白、静かなCTA', '配信予定、作品/アーカイブ、SNS'],
  },
  lp: {
    'App Showcase': ['アプリDL/無料体験', 'アプリ画面、主要ベネフィット、ストア/資料請求CTA'],
    'Brand Story': ['ブランド購入/予約', '物語より商品価値と購入導線を優先'],
    'Campaign Flow': ['キャンペーン参加', '期限、特典、参加手順、フォーム'],
    'Digital SaaS': ['SaaS無料トライアル', 'UIプレビュー、価格、導入効果'],
    'Event Summit': ['イベント申込', '日時、登壇者、残席、申込フォーム'],
    'Food & Dining': ['飲食予約', 'メニュー、席予約、アクセス'],
    'Gym & Fit': ['体験予約', '成果、料金、体験フォーム'],
    'Health Clinic': ['診療/相談予約', '初診導線、診療内容、予約CTA'],
    'Interior Art': ['施工相談/見積もり', '施工例、プラン、見積もりフォーム'],
    'Jewelry Lux': ['来店予約/購入', '商品価格帯、予約、ギフト導線'],
    'Knowledge Base': ['講座申込/資料請求', '講座価値、カリキュラム、申込CTA'],
    'Legal Trust': ['法律相談', '相談内容、料金目安、免責、予約'],
    'Media & News': ['購読/広告出稿', '媒体価値、読者層、資料請求'],
    'Nature Beauty': ['商品購入/診断', '悩み別ベネフィット、診断CTA'],
    'One Product': ['単品購入', '商品価値、価格、FAQ、購入CTA'],
    'Pet Life': ['ペットサービス予約', 'サービス内容、料金、予約'],
    'Quiz & Lead': ['診断リード獲得', 'クイズから結果/申込へつなぐ'],
    'Recruit Hero': ['応募', '募集要項、働く理由、応募CTA'],
    'Service & Tech': ['サービス相談', '課題、解決、価格、相談CTA'],
    'Travel & Stay': ['宿泊予約', 'プラン、空室確認、アクセス'],
    'Utility Tool': ['ツール登録', '使い方、便利さ、無料登録'],
    'Visual Story': ['動画視聴後CV', 'VSL、価格、FAQ、CTA'],
    'Webinar Host': ['ウェビナー申込', '日時、特典、講師、申込フォーム'],
    'Xross Media': ['SNSキャンペーン参加', '参加手順、拡散導線、CTA'],
    'Youth Culture': ['イベント/商品購入', '若年層向けCTAとSNS導線'],
    'Zone Focus': ['ニッチ offer CV', '対象者を絞り、1つの申込に集約'],
  },
  portfolio: {
    Aurora: ['ビジュアルデザイナー', 'オーロラ背景と作品を競合させず、作品カードを主役にする'],
    Blueprint: ['バックエンド/設計者', '設計図UI、システム図、技術実績'],
    Cinematic: ['映像クリエイター', '横長プレビュー、作品リール、問い合わせ'],
    Darkmode: ['開発者/セキュリティ系', 'Terminal風だが可読性優先、実績と技術'],
    Ethereal: ['UI/アート系', '淡い余白、作品詳細、依頼導線'],
    Film: ['写真家/映像作家', '横スクロールを残しつつCTAへ戻れる'],
    Glassmorphism: ['UI/UXデザイナー', 'トレンド感とケーススタディを両立'],
    Holographic: ['3D/デジタルアート', '反射演出は作品周辺に限定'],
    Infinite: ['VFX/空間表現', '没入Heroと作品一覧の導線を分ける'],
    Journal: ['編集者/文筆家', '記事/実績/問い合わせを中心に全面再構成'],
    Kinetic: ['モーションデザイナー', '動きは作品理解を助ける範囲にする'],
    Line: ['建築/ミニマル', '1px線と余白、問い合わせ固定'],
    Minimal: ['アートディレクター', '静けさと実績の説明量を両立'],
    Neon: ['音楽/夜系クリエイター', '出演依頼/予約導線を補強'],
    Obsidian: ['高級ブランド/ラグジュアリー作家', 'luxury portfolio として全面再構成'],
    Paper: ['イラストレーター', '依頼種別、価格目安、作品カテゴリ'],
    Quantum: ['データサイエンティスト', '成果指標、可視化、問い合わせ'],
    Retro: ['インディーゲーム開発者', '作品詳細と体験版/連絡導線'],
    Space: ['3D/宇宙/空間クリエイター', '軌道UIを作品閲覧に接続して全面再構成'],
    Typography: ['タイポグラファー', '文字表現と案件導線を整理'],
    Underwater: ['自然/研究/写真家', 'プロジェクト詳細と連絡導線'],
    Vintage: ['クラフト/歴史系作家', '汎用文言を消し、展示/販売導線を強化'],
    Watercolor: ['画家/水彩作家', '作品購入/依頼/展示導線'],
    Xenon: ['インダストリアルデザイナー', '製品/案件相談を明確化'],
    Yarn: ['ハンドクラフト作家', '販売、展示、依頼の分岐'],
    Zen: ['和風建築/思想系', '静けさと問い合わせを両立'],
  },
};

function getDecision(category, tag) {
  const set = decisions[category];
  if (set.full.includes(tag)) return 'Full Renewal';
  if (set.partial.includes(tag)) return 'Partial Renewal';
  return 'Polish';
}

function decisionDir(decision) {
  if (decision === 'Full Renewal') return 'full-renewal';
  if (decision === 'Partial Renewal') return 'partial-renewal';
  return 'polish';
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function strategicProfile(category, decision, theme) {
  if (category === 'streamer') {
    const immersive = ['Boss Room', 'Horror Mansion', 'Knight Honor', 'Quest Log', 'Rogue Stealth', 'Steampunk Gear'];
    const scenic = ['Lunar Phase', 'Orbit Space', 'Wide Pan', 'Zen Brush'];
    const layoutMode = immersive.includes(theme)
      ? 'world-in-UI。PCはテーマ世界の中にナビ/配信予定/CTAを埋め込み、SPは情報カードへ分解する。'
      : scenic.includes(theme)
        ? 'immersive single page。PCは大きい背景/余白で世界観を作り、SPは配信予定とSNS導線を先に出す。'
        : 'LP single page + activity hub。PCはHeroと配信情報を横並びにし、SPはLive/SNS/Contactを短く積む。';
    return {
      renewalDepth: 'High。フォルダ分類に関わらず、販売用テンプレートとしては全件フルリニューアル相当で扱う。',
      effectLevel: decision === 'Polish' ? 'Medium-High' : 'High',
      pageType: '公式サイト型LP。トップ1ページで完結し、必要なら schedule / profile / contact を下層化できる構造にする。',
      header: immersive.includes(theme) ? 'PCはside railまたはworld-in-UI header。SPはtop compact header + sticky CTA。' : 'PCはtop fixed header。SPはtop compact header + bottom CTA。',
      layoutMode,
      mockPriority: '必須。全 streamer は first viewport mock を作り、キャラ性、配信導線、案件導線が同時に読めるか確認する。',
      implementationUnit: '構造、copy、ビジュアル、演出を分けて実装する。演出はPhase 3まで入れない。',
      rationale: 'streamer はテンプレート感が出ると選ばれにくい。世界観の強さを商品価値にしつつ、配信予定とSNS導線は実用UIとして読みやすく保つ。',
    };
  }

  if (category === 'portfolio') {
    return {
      renewalDepth: decision === 'Full Renewal' ? 'High。作品体験から組み直す。' : decision === 'Partial Renewal' ? 'Medium。構成は活かし、作品の見せ方と依頼導線を再設計する。' : 'Low-Medium。既存の完成度を残し、作品説明とCTAを磨く。',
      effectLevel: decision === 'Full Renewal' ? 'Medium-High' : decision === 'Partial Renewal' ? 'Medium' : 'Low-Medium',
      pageType: '作品主導のsingle page。案件相談に必要な profile / service / contact をページ後半へ自然に接続する。',
      header: 'PCはminimal top headerまたは左固定の小さなindex。SPは作品閲覧を邪魔しないtop compact header。',
      layoutMode: 'editorial portfolio。作品の大小差、余白、ケーススタディ導線で個性を出す。装飾より作品の見え方を優先する。',
      mockPriority: decision === 'Polish' ? '推奨。作品一覧の密度を変える場合だけ作る。' : '必須。first viewport + selected works の見え方を1枚で確認する。',
      implementationUnit: '作品グリッド、ケーススタディ、問い合わせ導線を別単位で進める。',
      rationale: 'portfolio は演出を使えるが、作品より演出が目立つと逆効果になる。動きは作品理解を助ける範囲に限定する。',
    };
  }

  if (category === 'lp') {
    return {
      renewalDepth: decision === 'Full Renewal' ? 'High。offer、証拠、フォーム導線から組み直す。' : decision === 'Partial Renewal' ? 'Medium。既存構成を使い、CTAと証拠の不足を補う。' : 'Low。文言、価格/条件、CTA視認性を中心に磨く。',
      effectLevel: decision === 'Full Renewal' ? 'Medium' : 'Low-Medium',
      pageType: 'CV特化single page。下層ページより、1ページ内で理解、納得、行動を完結させる。',
      header: 'PCはtop sticky header + CTA。SPはbottom fixed CTAを優先し、メニューは薄くする。',
      layoutMode: 'conversion-first LP。セクションごとに1メッセージへ絞り、CTAを一定間隔で繰り返す。',
      mockPriority: decision === 'Full Renewal' ? '必須。first viewport + proof/pricing teaser を作る。' : '推奨。FVか価格訴求を大きく変える場合だけ作る。',
      implementationUnit: 'offer、proof、pricing/form、FAQを別単位で詰める。',
      rationale: 'LPは派手さより申込摩擦の低さが重要。演出は注意誘導に留め、フォームや価格の理解を邪魔しない。',
    };
  }

  return {
    renewalDepth: decision === 'Full Renewal' ? 'High。情報設計から組み直す。' : decision === 'Partial Renewal' ? 'Medium。既存の信頼感を活かして導線と証拠を補強する。' : 'Low。見た目を大きく崩さず文言とCTAを磨く。',
    effectLevel: 'Low',
    pageType: '企業向けmulti-section site。必要に応じて service / case / contact の下層化を想定する。',
    header: 'PCはtop sticky header。SPは問い合わせ導線を見失わないcompact header + CTA。',
    layoutMode: 'trust-first corporate layout。情報密度、証拠、問い合わせ導線を優先し、演出は補助に留める。',
    mockPriority: decision === 'Full Renewal' ? '必須。first viewport + services/proof を作る。' : '任意。構成変更が大きい場合のみ作る。',
    implementationUnit: 'Hero、信頼材料、サービス、事例/流れ、問い合わせを別単位で進める。',
    rationale: 'business は派手な演出より信頼と分かりやすさがCVに直結する。表現は業種固有の実在感で差別化する。',
  };
}

function trimJapaneseSentence(value) {
  return String(value || '').replace(/[。.\s]+$/g, '');
}

function firstViewportBlueprint(category, theme, profile, design, conversion) {
  const cleanDesign = trimJapaneseSentence(design);
  const cleanConversion = trimJapaneseSentence(conversion);
  if (category === 'streamer') {
    return [
      `- PC composition: 左または中央にキャラクター/世界観の主役、反対側に「次回配信」「最新アーカイブ」「SNS」「案件相談」をまとめる。`,
      `- Header: ${profile.header}`,
      `- Hero copy: キャラ名、配信ジャンル、初見向けの一言、活動プラットフォームを1画面内に入れる。`,
      `- Visual hook: ${cleanDesign}。ただしCTAと配信予定の可読性を最優先にする。`,
      '- Primary actions: Live / Schedule / Follow / Contact を4つ以内に整理する。',
      '- SP order: キャラ名、Live状態、次回配信、SNS、案件相談の順に出す。',
    ].join('\n');
  }
  if (category === 'portfolio') {
    return [
      '- PC composition: 代表作品を大きく見せ、横に作者名、依頼可能領域、問い合わせCTAを置く。',
      `- Header: ${profile.header}`,
      '- Hero copy: 作家性のある短いstatementと、対応できる仕事を同時に見せる。',
      `- Visual hook: ${cleanDesign}。作品を隠す装飾や過剰な文字被せは避ける。`,
      '- Primary actions: Selected Works / Case Study / Contact を明確に分ける。',
      '- SP order: 作品、肩書き、対応領域、問い合わせCTA、プロフィールの順にする。',
    ].join('\n');
  }
  if (category === 'lp') {
    return [
      '- PC composition: 左にofferとCTA、右に証拠/価格/利用イメージを置く。',
      `- Header: ${profile.header}`,
      '- Hero copy: 誰の何の課題を、どの条件で解決するかを一文で示す。',
      `- Visual hook: ${cleanDesign}。演出よりoffer理解とCTA視認性を優先する。`,
      `- Primary actions: Conversion goal (${cleanConversion}) に直結するCTAを1つ主役にする。`,
      '- SP order: offer、CTA、安心材料、価格/条件、フォームの順にする。',
    ].join('\n');
  }
  return [
    '- PC composition: 左に事業価値と相談CTA、右に実績/サービス/写真を置く。',
    `- Header: ${profile.header}`,
    '- Hero copy: 対象顧客、提供価値、相談できる内容を明確にする。',
    `- Visual hook: ${cleanDesign}。過度な演出ではなく業種固有の写真/数値/証拠で差別化する。`,
    `- Primary actions: Conversion goal (${cleanConversion}) に沿うCTAを置く。`,
    '- SP order: 価値、CTA、信頼材料、サービス、問い合わせの順にする。',
  ].join('\n');
}

function sectionPlan(category, decision) {
  const scope = decision === 'Full Renewal' ? '新規設計' : decision === 'Partial Renewal' ? '既存活用 + 再設計' : '既存維持 + 改善';
  const plans = {
    business: [
      ['Hero', '対象顧客、提供価値、相談CTAを明確化', '大きいコピー + 実績/写真/証拠カード', 'CTAが抽象的な「お問い合わせ」だけにならないこと'],
      ['Trust Proof', '不安を減らす', '実績数値、資格、取引先、導入前後', 'ロゴだけでなく何が強いかを書く'],
      ['Services', '依頼可能範囲を理解させる', '3-4サービス、対象、成果、納品物', '説明過多にせず比較しやすくする'],
      ['Process / Case', '相談後の流れを見せる', 'ステップ、期間、費用目安、事例', '信頼獲得のために具体性を入れる'],
      ['Contact', '問い合わせ摩擦を下げる', '目的別CTA、フォーム、電話/資料請求', '入力項目を増やしすぎない'],
    ],
    streamer: [
      ['Hero', '初見が誰のサイトか即理解する', 'キャラ名、ジャンル、Live状態、SNS CTA', '世界観演出で文字を読めなくしない'],
      ['Profile', '配信人格と活動ジャンルを伝える', 'タグ、活動時間、好きな企画、プラットフォーム', '設定説明だけで終わらせない'],
      ['Schedule', '次に何を見ればいいか示す', '次回配信、週間枠、通知CTA', '装飾より日時の読みやすさ優先'],
      ['Clips / Archive', '魅力を短時間で伝える', '代表動画、人気企画、切り抜き導線', 'iframe多用で重くしない'],
      ['Community / Contact', 'ファン参加と案件相談を分ける', 'Discord/X/ハッシュタグ/Business contact', 'ファン向けCTAと企業向けCTAを混ぜない'],
    ],
    lp: [
      ['Hero Offer', '申込理由を最短で作る', 'offer、対象者、価格/無料条件、CTA', 'キャッチコピーだけで内容を隠さない'],
      ['Problem / Promise', '課題と解決後を接続する', '悩み、Before/After、約束', '煽りすぎない'],
      ['Benefits', '選ぶ理由を比較可能にする', '3-5 benefit、成果、対象条件', '抽象的な利点だけにしない'],
      ['Proof / Pricing', '不安を下げる', 'レビュー、実績、比較、価格/プラン', '価格や条件を隠しすぎない'],
      ['FAQ / Form', '行動直前の不安を潰す', 'FAQ、入力項目、送信後の流れ', 'フォームを長くしすぎない'],
    ],
    portfolio: [
      ['Hero / Statement', '作風と依頼可能性を同時に示す', '代表作品、肩書き、対応領域、CTA', '雰囲気だけで何を頼めるか不明にしない'],
      ['Selected Works', '作品の強さを見せる', '3-6作品、役割、媒体、年', '作品名だけで説明を終えない'],
      ['Case Study', '仕事としての信頼を作る', '課題、担当範囲、制作意図、成果', '長すぎる読み物にしない'],
      ['Profile / Fit', '相性判断を助ける', '経歴、得意領域、依頼に向く案件', '自分語りだけにしない'],
      ['Services / Contact', '相談へつなぐ', '対応メニュー、目安、問い合わせCTA', '連絡先を埋もれさせない'],
    ],
  };

  return plans[category]
    .map(([name, goal, content, caution]) => `- ${name} (${scope}): ${goal}。入れる内容: ${content}。注意: ${caution}。`)
    .join('\n');
}

function contentPlan(category, audience, conversion) {
  const cleanConversion = trimJapaneseSentence(conversion);
  if (category === 'streamer') {
    return [
      `- Fictional brand: 配信者名、配信タグ、ファンネーム、週間スケジュールを仮設定し、デモではなく実在する公式サイトの密度にする。`,
      `- Audience language: ${audience} のファンが読む言葉と、企業担当者が読む案件相談の言葉を分ける。`,
      '- Required concrete details: 次回配信日時、主要プラットフォーム、代表企画、連絡条件、ハッシュタグ。',
      '- Avoid: 世界観設定だけで、配信内容、次回行動、問い合わせ条件が分からない状態。',
    ].join('\n');
  }
  if (category === 'portfolio') {
    return [
      '- Fictional brand: 作者名、制作領域、代表案件、使用媒体、依頼条件を仮設定する。',
      `- Audience language: ${audience} が「この人に何を頼めるか」を判断できる言葉にする。`,
      '- Required concrete details: 作品名、担当範囲、制作年、対応メニュー、相談可能な案件。',
      '- Avoid: 作品画像だけを並べ、役割や依頼導線がない状態。',
    ].join('\n');
  }
  if (category === 'lp') {
    return [
      '- Fictional brand: offer名、対象者、価格/無料条件、申込後の流れを仮設定する。',
      `- Audience language: ${audience} が今申し込む理由を理解できる言葉にする。`,
      `- Required concrete details: Conversion goal (${cleanConversion}) の条件、ベネフィット、証拠、FAQ、送信後の流れ。`,
      '- Avoid: 「今すぐ」「簡単」だけで、内容や条件が薄い状態。',
    ].join('\n');
  }
  return [
    '- Fictional brand: 会社名、所在地、提供サービス、実績数値、相談メニューを仮設定する。',
    `- Audience language: ${audience} が安心して相談できる言葉にする。`,
    `- Required concrete details: Conversion goal (${cleanConversion}) に必要な資料、事例、費用目安、対応範囲。`,
    '- Avoid: 汎用的な企業理念だけで、何を依頼できるか分からない状態。',
  ].join('\n');
}

function motionPlan(category, profile, theme) {
  const common = [
    `- Effect level: ${profile.effectLevel}`,
    '- Reduced motion: `prefers-reduced-motion` では移動/点滅/連続ループを止め、opacity変化程度にする。',
    '- Performance budget: transform / opacity 中心。常時動く blur、広範囲 backdrop-filter、多重 shadow、重い canvas は避ける。',
  ];
  if (category === 'streamer') {
    return common.concat([
      `- Signature motion: ${theme} の世界観をHeroに1つだけ置く。例: status pulse、schedule reveal、UI scan、背景レイヤーの緩い移動。`,
      '- Interaction: SNS/配信カードのhoverは短く、クリック可能領域を明確にする。',
      '- Upper limit: パーティクルやグリッチは主役にしない。Live状態とCTAが最初に読めることを優先する。',
    ]).join('\n');
  }
  if (category === 'portfolio') {
    return common.concat([
      '- Signature motion: 作品カードのreveal、case studyの切り替え、画像の軽いparallaxまで。',
      '- Interaction: 作品hoverで役割/媒体/年を出す。ただしSPでは常時表示にする。',
      '- Upper limit: 作品を隠す大きな文字被せ、過剰なスクロール固定、長いローディング演出は避ける。',
    ]).join('\n');
  }
  if (category === 'lp') {
    return common.concat([
      '- Signature motion: CTA到達を助ける軽いreveal、FAQ accordion、価格カードhover程度。',
      '- Interaction: フォーム、価格、CTA周辺は動かしすぎない。',
      '- Upper limit: CV導線の前に長い演出を置かない。',
    ]).join('\n');
  }
  return common.concat([
    '- Signature motion: fade / slight slide / number reveal 程度。',
    '- Interaction: 問い合わせ、資料請求、サービス詳細のhoverを分かりやすくする。',
    '- Upper limit: 信頼を損ねる派手なパーティクル、過度なスクロール演出、点滅は避ける。',
  ]).join('\n');
}

function visualSystem(category, theme, colors) {
  const colorText = colors || '既存テーマ色';
  if (category === 'streamer') {
    return [
      `- Color system: ${colorText} を主役色、CTA色、背景演出色に分ける。Live/Follow/Contact は色だけでなくラベルでも区別する。`,
      '- Typography: キャラ名は大きく、配信日時とCTAは読みやすいUI文字にする。装飾フォントを本文に使わない。',
      '- Imagery: キャラクター立ち絵が無い場合でも成立するよう、シルエット、ロゴ、配信UI、背景レイヤーで代替できる設計にする。',
      '- Components: Live badge、schedule card、clip card、platform button、business contact block。',
    ].join('\n');
  }
  if (category === 'portfolio') {
    return [
      `- Color system: ${colorText} は作品の邪魔をしない背景/アクセントに限定する。`,
      '- Typography: statementは短く強く、作品説明は小さくても読みやすくする。',
      '- Imagery: 作品サムネイルの比率を揃えすぎず、主役作品だけ大きく扱う。',
      '- Components: work card、case study panel、service chip、contact strip。',
    ].join('\n');
  }
  if (category === 'lp') {
    return [
      `- Color system: ${colorText} を背景、信頼材料、CTAで役割分担する。CTA色を複数に分散させない。`,
      '- Typography: 見出しは短く、価格/条件/CTAは一目で読めるサイズにする。',
      '- Imagery: offer利用後の状態、商品、画面、人物など、申込判断に効く素材を使う。',
      '- Components: benefit card、proof card、pricing table、FAQ accordion、form block。',
    ].join('\n');
  }
  return [
    `- Color system: ${colorText} を基調に、信頼色とCTA色を分ける。業種とズレる彩度は抑える。`,
    '- Typography: 企業名/価値提案は落ち着かせ、サービス説明と問い合わせCTAを読みやすくする。',
    '- Imagery: 会議、製品、店舗、現場、人物など、業種が伝わる素材を優先する。',
    '- Components: service card、proof number、case card、process step、contact block。',
  ].join('\n');
}

function implementationPhases(category, profile) {
  const phase3 = category === 'streamer'
    ? 'Phase 3: Hero signature motion、Live状態、schedule revealを追加する。重い3D/WebGLはこの段階でも必要性を確認してから入れる。'
    : category === 'portfolio'
      ? 'Phase 3: 作品reveal、case transition、軽いparallaxを追加する。作品より演出が目立つ場合は削る。'
      : 'Phase 3: CTA視認性を妨げない範囲で、fade/reveal/accordionを追加する。';
  return [
    `- Phase 0: モック確認。${profile.mockPriority}`,
    '- Phase 1: HTML構造、セクション順、header/CTA位置だけを作る。motion、粒子、3D、重い背景は入れない。',
    '- Phase 2: 実サイト寄りcopy、仮ブランド、画像、CTA、フォーム/外部リンクを入れる。',
    `- ${phase3}`,
    '- Phase 4: 390 / 820 / 1024 / 1366px を基準に、改行、CTA到達性、はみ出し、重なりを確認する。',
    '- Phase 5: metadata、相対リンク、placeholder、サムネイル、template modal導線を確認する。',
  ].join('\n');
}

function avoidRules(category) {
  if (category === 'streamer') {
    return [
      '- 世界観説明だけで、次回配信/SNS/案件相談が見えない。',
      '- グリッチ、点滅、パーティクルが多く、文字とCTAが読みにくい。',
      '- ファン向け導線と企業向け問い合わせが同じCTAに混ざっている。',
      '- PC演出をSPへそのまま縮小して、配信予定が下に埋もれる。',
    ].join('\n');
  }
  if (category === 'portfolio') {
    return [
      '- 作品画像だけで、依頼可能領域、担当範囲、問い合わせ導線がない。',
      '- 装飾やスクロール演出が作品理解を邪魔している。',
      '- SPで作品キャプションがhover前提になっている。',
      '- 連絡導線がfooterだけにあり、検討中に戻れない。',
    ].join('\n');
  }
  if (category === 'lp') {
    return [
      '- 何のofferか分かる前に長い演出や抽象コピーを見せる。',
      '- 価格、条件、申込後の流れを隠しすぎる。',
      '- CTA文言がセクションごとに変わり、行動がぶれる。',
      '- フォーム項目が多く、CV前に離脱しやすい。',
    ].join('\n');
  }
  return [
    '- 派手な演出で信頼感を損ねる。',
    '- 会社/サービス/実績/問い合わせの関係が曖昧。',
    '- 「お問い合わせ」だけで、何を相談できるか分からない。',
    '- 業種固有の写真や証拠がなく、汎用企業サイトに見える。',
  ].join('\n');
}

function categoryTemplate(category, template) {
  const config = categoryConfig[category];
  const decision = getDecision(category, template.tag);
  const theme = template.themeLabel || template.name;
  const features = (template.features || []).join(', ');
  const colors = (template.colors || []).join(', ');
  const profile = strategicProfile(category, decision, theme);
  const defaultGoal = trimJapaneseSentence(config.defaultGoal);
  const currentSummary = `既存テーマは「${theme}」。features は ${features || '未定義'}、主要色は ${colors || '未定義'}。現行の一覧カードでは見た目の違いは伝わるが、受託制作としての選択理由と申し込み導線をさらに明確にする。`;

  const specific = categorySpecific[category][theme] || categorySpecific[category][template.name] || null;
  let audience;
  let concept;
  let design;
  let conversion;

  if (category === 'business') {
    audience = specific?.audience || `${theme} の印象が合う専門サービス、店舗、企業`;
    concept = specific?.concept || `${theme} の既存印象を保ちながら、事業内容と問い合わせ理由を明確にする。`;
    design = specific?.design || `${config.tone} を軸に、Hero、証拠、サービス、CTA の順で整理する。`;
    conversion = specific?.conversion || config.defaultGoal;
  } else if (category === 'streamer') {
    audience = specific?.[0] || `${theme} の世界観を持つ配信者`;
    concept = `${specific?.[0] || theme} 向けの公式サイト。既存の ${theme} らしさを保ちつつ、配信予定、SNS、アーカイブ、案件相談へつなぐ。`;
    design = specific?.[1] || `${config.tone} を軸に、キャラクター性と情報の見つけやすさを両立する。`;
    conversion = specific?.[2] || config.defaultGoal;
  } else if (category === 'lp') {
    audience = `${theme} の offer を探している見込み客`;
    concept = `${specific?.[0] || config.defaultGoal} に絞ったCV型LP。1ページ1目的で、訴求、証拠、価格/条件、CTAを迷わせない。`;
    design = specific?.[1] || `${config.tone} を軸に、Heroで offer とCTAを明確化する。`;
    conversion = specific?.[0] || config.defaultGoal;
  } else {
    audience = specific?.[0] || `${theme} の世界観が合う制作者、個人事業主、スタジオ`;
    concept = `${specific?.[0] || theme} の作品サイト。見た目だけでなく、誰に何を依頼できるかを伝える。`;
    design = specific?.[1] || `${config.tone} を軸に、作品と問い合わせ導線を両立する。`;
    conversion = config.defaultGoal;
  }

  const full = decision === 'Full Renewal';
  const partial = decision === 'Partial Renewal';
  const structure = full
    ? fullStructure(category, theme)
    : partial
      ? partialStructure(category, theme)
      : polishStructure(category, theme);
  const mock = full
    ? `必須。${config.mockScope} を 1 枚作る。既存テーマ名「${theme}」が残っていること、CTA が最初の画面に見えること、SPでも成立する情報量であることを確認する。`
    : partial
      ? `推奨。大きくレイアウトを触る場合のみ ${config.mockScope} を作る。文章/CTAだけの変更なら不要。`
      : `任意。既存見た目を維持するため、モックより先に文言と導線の静的修正で進める。`;

  return `# ${config.label} ${template.tag}: ${theme} Renewal Detail

## 基本情報
- Category: ${config.label}
- Template ID: ${template.id}
- Existing path: \`${template.path}\`
- Current theme name: ${theme}
- Renewal decision: ${decision}
- Source audit: \`docs/reviews/PORTAL_CONVERSION_AUDIT_2026-05-03.md\`
- Created: ${today}

## 現状の読み取り
${currentSummary}

## リニューアルの狙い
- Target audience: ${audience}
- Conversion goal: ${conversion}
- Core concept: ${concept}
- Priority: ${full ? '既存の見た目を参考にしつつ、構造から作り直す。' : partial ? '既存の印象を残し、足りない導線と実在感を補強する。' : '既存の完成度を活かし、受注導線と文言を磨く。'}

## 詳細分類
- Strategic renewal depth: ${profile.renewalDepth}
- Motion / effect level: ${profile.effectLevel}
- Page model: ${profile.pageType}
- Header position: ${profile.header}
- Layout mode: ${profile.layoutMode}
- Mock priority: ${profile.mockPriority}
- Implementation unit: ${profile.implementationUnit}
- Rationale: ${profile.rationale}

## 推奨ページ構成
${structure}

## First Viewport Blueprint
${firstViewportBlueprint(category, theme, profile, design, conversion)}

## Section-by-Section Plan
${sectionPlan(category, decision)}

## デザイン / レイアウト方針
- Layout base: ${config.layoutBase}
- Visual direction: ${design}
- First viewport: 誰向けのテンプレートか、何ができるか、どの行動を取るべきかを5秒で理解できる状態にする。
- Mobile: CTA、主要情報、信頼材料を先に出す。PCの演出を単純縮小しない。
- Color: 既存の ${colors || 'テーマ色'} を起点に、CTA色と装飾色を分ける。

## Visual System
${visualSystem(category, theme, colors)}

## コンテンツ方針
- Demo copy は実サイト寄りにする。説明のための見出しや meta 的な文言は避ける。
- 架空情報は具体的だが過剰にしない。所在地、実績、活動内容、価格帯、スケジュールのいずれかを入れて現実感を出す。
- CTA 周辺には「何が起きるか」を書く。例: 相談、予約、資料請求、無料体験、フォロー。

## Content Replacement Plan
${contentPlan(category, audience, conversion)}

## CTA / 導線
- Primary CTA: ${primaryCta(category, decision)}
- Secondary CTA: ${secondaryCta(category)}
- Portal CTA: \`plans.html?template=${category}-${template.tag.toLowerCase()}&plan=standard\` へ接続する想定。
- Demo CTA: fixed bottom CTA または Hero CTA から「このテンプレートで制作相談」へ戻す。

## Motion / Effect
- Full renewal: ${full ? motionDirection(category, theme) : '演出は追加しすぎない。既存効果の重さとCTA視認性を優先して調整する。'}
- Reduced motion: 連続アニメーションを止めても、Hero、主要情報、CTA が成立する。
- Performance: 常時動く背景、重い blur、過剰な shadow は避ける。演出はHeroか主役セクションに限定する。

## Motion Detail
${motionPlan(category, profile, theme)}

## Avoid
${avoidRules(category)}

## モック画像方針
${mock}

## 実装時の注意
${implementationPhases(category, profile)}

## 受け入れ条件
- テーマ名「${theme}」の印象が残っている。
- First viewport に対象者、価値、CTA がある。
- ${defaultGoal}への導線が迷わない。
- SP で主要CTAが1画面目または直後に出る。
- Detail md の \`詳細分類\`、\`First Viewport Blueprint\`、\`Section-by-Section Plan\`、\`Motion Detail\` と実装内容が矛盾しない。
- \`npm run audit:links\` と \`npm run audit:metadata\` が通る。
`;
}

function fullStructure(category, theme) {
  if (category === 'streamer') {
    return [
      '- Hero: キャラクター名、肩書き、配信ジャンル、Live/SNS CTA。',
      '- Profile: 何を配信する人か、人格、活動時間、主要プラットフォーム。',
      '- Schedule: 次回配信、週間枠、状態表示。',
      '- Clips / Archive: 代表動画、切り抜き、人気企画。',
      '- Community: Discord、X、ファン参加、ハッシュタグ。',
      '- Contact: コラボ、案件、イベント出演の相談導線。',
    ].join('\n');
  }
  if (category === 'lp') {
    return [
      '- Hero Offer: 対象者、約束、CTA、価格/無料条件を明示。',
      '- Problem / Promise: 悩みと解決後の状態を短く示す。',
      '- Benefits: 3-5個の具体ベネフィット。',
      '- Proof: 実績、レビュー、比較、FAQ前の安心材料。',
      '- Pricing / Plan: 価格、含まれるもの、申込条件。',
      '- Form / Final CTA: 入力項目を絞り、送信後の流れを書く。',
    ].join('\n');
  }
  if (category === 'portfolio') {
    return [
      '- Hero / Statement: 作者性と依頼可能領域を同時に示す。',
      '- Selected Works: 代表作品3-6件を大きく見せる。',
      '- Case Study: 1件を深掘りして役割、課題、成果を示す。',
      '- Profile / Fit: 依頼に向く案件、対応範囲、制作姿勢。',
      '- Services / Contact: 相談できる内容と問い合わせ導線。',
    ].join('\n');
  }
  return [
    '- Hero: 事業価値、対象顧客、相談CTA。',
    '- Trust Proof: 実績、数値、取引先、資格。',
    '- Services: 主要サービス3-4件。',
    '- Case / Process: 導入事例と相談から納品までの流れ。',
    '- Contact: 低摩擦な問い合わせフォーム。',
  ].join('\n');
}

function partialStructure(category, theme) {
  return [
    '- Hero: 既存の印象を残し、対象者とCTAを明確化。',
    '- Main Value: 既存の強いセクションを残し、具体的な価値に書き換える。',
    '- Proof / Detail: 実績、作品、価格、スケジュールなど不足情報を追加。',
    '- CTA: ページ中盤と末尾に同じ行動を繰り返す。',
  ].join('\n');
}

function polishStructure(category, theme) {
  return [
    '- Hero: 現状を大きく崩さず、CTA文言と対象者を明確化。',
    '- Existing Sections: 既存セクションの順序は原則維持。',
    '- CTA Strip: 「このテンプレートで制作相談」への導線を追加。',
    '- Footer / Contact: 問い合わせ先、SNS、補助リンクを整理。',
  ].join('\n');
}

function primaryCta(category, decision) {
  if (category === 'streamer') return '配信を見る / スケジュールを見る / 案件相談';
  if (category === 'lp') return '申し込む / 予約する / 無料体験する / 資料請求';
  if (category === 'portfolio') return '作品を見る / 依頼相談する';
  return '無料相談する / 見積もり相談する';
}

function secondaryCta(category) {
  if (category === 'streamer') return 'SNSフォロー、Discord、アーカイブ閲覧';
  if (category === 'lp') return 'FAQ、価格、レビュー、比較表';
  if (category === 'portfolio') return 'プロフィール、対応範囲、ケーススタディ';
  return '資料請求、導入事例、サービス詳細';
}

function motionDirection(category, theme) {
  if (category === 'streamer') return `世界観演出は ${theme} のHeroと1セクションに限定し、配信予定やSNS導線の可読性を優先する。`;
  if (category === 'lp') return 'CVを邪魔しない軽い出現演出のみ。CTA周辺は動かしすぎない。';
  if (category === 'portfolio') return `作品の見せ方を強める遷移に限定し、${theme} の装飾が作品を上書きしないようにする。`;
  return '信頼感を損なわない fade / reveal / slight slide を基本にする。';
}

async function writeReadme() {
  const content = `# Template Renewal Details

## Purpose
- 104テンプレート分のリニューアル詳細をカテゴリ別に管理する。
- \`docs/reviews/PORTAL_CONVERSION_AUDIT_2026-05-03.md\` の簡易方針を、実装前に読める粒度へ展開する。
- 各テンプレートの実装セッションでは、該当ファイルを設計入力として扱う。

## Structure
- \`business/full-renewal/\`, \`business/partial-renewal/\`, \`business/polish/\`
- \`streamer/full-renewal/\`, \`streamer/partial-renewal/\`, \`streamer/polish/\`
- \`streamer/mock-prompts/\`: streamer 26件の first viewport mock 作成用プロンプト
- \`lp/full-renewal/\`, \`lp/partial-renewal/\`, \`lp/polish/\`
- \`portfolio/full-renewal/\`, \`portfolio/partial-renewal/\`, \`portfolio/polish/\`

## Usage
1. 対象テンプレートの md を読む。
2. \`Renewal decision\` が \`Full Renewal\` の場合は、実装前に first viewport mock を作る。
3. \`Partial Renewal\` は必要に応じてモックを作り、既存構造を活かす。
4. \`Polish\` は導線、文言、CTA、軽いレイアウト調整を優先する。
5. \`詳細分類\`、\`First Viewport Blueprint\`、\`Section-by-Section Plan\`、\`Motion Detail\`、\`Avoid\` を実装前の必読項目にする。

## Detail Fields
- \`Strategic renewal depth\`: フォルダ分類とは別に、販売用としてどこまで作り直すかを示す。
- \`Motion / effect level\`: 演出の上限。business / lp は原則控えめ、streamer / portfolio は価値につながる範囲で強める。
- \`Page model\`: LP型か、下層ページを想定するか。
- \`Header position\`: PC表示時のヘッダー位置とSPでのCTA扱い。
- \`First Viewport Blueprint\`: モック画像またはPhase 1実装で最初に見る構成。
- \`Section-by-Section Plan\`: 各セクションの目的、内容、注意点。
- \`Motion Detail\`: 実装してよい演出と上限。
- \`Avoid\`: そのカテゴリでやるとCVや品質を落とす表現。

## Category Motion Policy
- business: Low。信頼、業種固有の実在感、問い合わせしやすさを優先する。派手なパーティクル、強いスクロール演出、点滅は原則使わない。
- lp: Low-Medium。CTA誘導、FAQ、価格カードなどCV補助に限る。申込前に長い演出を置かない。
- streamer: Medium-High to High。全件を販売用にはフルリニューアル相当で扱い、世界観を商品価値にする。ただしLive/SNS/Contactの可読性を最優先にする。
- portfolio: Low-Medium to Medium-High。作品の見せ方を強める演出は使えるが、作品より演出が目立つ状態は避ける。

## Shared Principles
- 2026年時点のCV設計では、1ページ1目的、明確なCTA、証拠/価格/フォームの摩擦低減、モバイル優先を重視する。
- 派手な演出より、誰向けで何を依頼できるかを first viewport で伝える。
- フルリニューアルでも既存テーマ名と印象は残す。
- streamer はフォルダ分類が \`partial-renewal\` / \`polish\` でも、戦略上は high 寄りの作り直しとして扱う。
- business / lp は企業向けの信頼感を優先し、演出はCV補助に限定する。

## Streamer Mock Prompts
- \`docs/template-renewal-details/streamer/mock-prompts/\` に、DESIGN.md 形式を参考にしたモック画像生成用プロンプトを保存する。
- business の実装を先に進める間、streamer はこの prompt を使って first viewport mock を先行作成する。
- 再生成は \`node scripts/generate-streamer-mock-prompts.mjs\` を使う。

## Reference Notes
- Landing page / website conversion references checked on 2026-05-03:
  - https://www.manotea.de/en/blog/landing-page-design-2026
  - https://www.flowtrix.co/blogs/12-b2b-landing-page-design-examples-for-2026
  - https://www.stan.vision/journal/saas-website-design
  - https://www.webstacks.com/blog/minimalist-landing-page-design-trends
`;
  await fs.writeFile(path.join(outputRoot, 'README.md'), content, 'utf8');
}

await fs.mkdir(outputRoot, { recursive: true });
await writeReadme();

let count = 0;
for (const [category, templates] of Object.entries(PORTAL_DATA.templates)) {
  for (const template of templates) {
    const theme = template.themeLabel || template.name;
    const decision = getDecision(category, template.tag);
    const dir = path.join(outputRoot, category, decisionDir(decision));
    await fs.mkdir(dir, { recursive: true });
    const file = `${template.tag.toLowerCase()}-${slugify(theme)}.md`;
    const content = categoryTemplate(category, template);
    await fs.writeFile(path.join(dir, file), content, 'utf8');
    count += 1;
  }
}

console.log(`Generated ${count} renewal detail files under ${path.relative(root, outputRoot)}`);
