# Portfolio Design Specifications v2.0

26テンプレート（A〜Z）の公式UI/UX設計書。各テンプレートは**HTMLレイアウト・セクション構成・Wowエフェクト**まで独自設計。他のテンプレートとの構造的重複を禁止する。

---

## A - Aurora（オーロラ）
**ターゲット**: Webデザイナー / クリエイティブ職

**コンセプト**: 「生きた光のキャンバス」。画面全体が呼吸する多色グラデーションで、ポートフォリオ自体がアート作品。

**Colors**: `#00D2FF` → `#8E2DE2` → `#F64F59` の流動三色グラデーション

**フォント**: Outfit（見出し） / Inter（本文）

### Layout Architecture
```
[1] HERO          — 100vh フルスクリーン。多色Radial Gradientが8秒でアニメーション。
                    テキストはセンター下寄り。カスタムカーソル（オーロラglow）。
[2] ABOUT         — 60/40 非対称グリッド。左: 巨大なプロフィール写真（角型）。
                    右: 自己紹介文（上寄せ）+ タグクラウド。
[3] WORKS         — Masonry（煉瓦積み）グリッド。3列不揃いカード。
                    カードHover時: Glassモーフィズムオーバーレイが浮き上がる。
[4] SKILLS        — 水平レーンに並ぶスキルバー（左→右アニメーション）。
                    背景にはフィルムノイズオーバーレイ。
[5] CONTACT       — フルスクリーンセクション。中央に大きなメールアドレス（光る）。
```

**Wow Factor（必須実装）**:
- `mix-blend-mode: screen` で重なるRadial Gradientオーロラ背景
- フィルムノイズ（ Canvas or SVG feTurbulence）常時オーバーレイ
- カスタムカーソル（点 + Glowリング）

---

## B - Blueprint（設計図）
**ターゲット**: バックエンドエンジニア / システムアーキテクト

**コンセプト**: 「技術仕様書そのもの」。ポートフォリオがCADの設計図として表現される。

**Colors**: `#003B6F`（青図面）/ `#FFFFFF`（白線）/ `#FF6B35`（オレンジ強調）

**フォント**: JetBrains Mono（全て）

### Layout Architecture
```
[1] HERO          — 100vh。背景はSVGドットグリッド（製図ペーパー）。
                    四隅に製図枠コーナーマーカー（L字）。
                    見出しは「SPEC: PORTFOLIO v1.0」「DATE: 2025.01.01」の仕様書形式。
[2] ABOUT         — 左: 寸法線付きのプロフィール「図面」（正面図風）。
                    右: KEY→VALUEペアのスペックリスト。
[3] WORKS         — 横1列のリスト形式（グリッドではない）。
                    各行: [番号] / [プロジェクト名] / [種別] / [年] / [→詳細アイコン]。
                    Hover時: 寸法線（←→）が出現。
[4] SKILLS        — 2列対称のスペックシート。各スキルに「████░░ 80%」形式バー。
[5] CONTACT       — END_OF_DOCUMENT風フッター。「APPROVED BY: [NAME]」「DATE:」ハンコ風。
```

**Wow Factor（必須実装）**:
- スクロール進行度に応じてグリッド線が描画されるSVGアニメーション
- Hover時に各プロジェクト行の周囲に寸法線（`←→`）が出現

---

## C - Cinematic（シネマティック）
**ターゲット**: 映像監督 / 映画制作者 / ビデオグラファー

**コンセプト**: 「映画が始まる瞬間」。上下の黒帯が開き、21:9の映画のような体験が始まる。

**Colors**: `#0A0A0A`（黒）/ `#D4AF37`（ゴールド）/ 低彩度写真

**フォント**: Playfair Display（見出し） / Source Sans Pro（本文）

### Layout Architecture
```
[1] HERO (OPENING REEL)
    — 入場時に上下の黒帯（`cinematic-bars`）がゆっくり開く（2秒）。
    — 全画面の暗い写真（背景）が超低速ズームイン（Ken Burns: 30秒周期）。
    — 中央にゴールドのテキスト。

[2] ABOUT (THE DIRECTOR)
    — 縦長ワイドセクション。左半分を占める大きな縦型写真。
    — 右: 3〜4行の短い「監督のことば」+ 受賞・実績ロゴ一覧。

[3] WORKS (FILMOGRAPHY)
    — 横スクロール（overflow-x: scroll）のフィルムリスト。
    — 各カード: アスペクト比16:9の静止画、Hover時にゴールドのオーバーレイ。
    — フィルムグレインが常にオーバーレイ。

[4] CONTACT (CREDITS)
    — エンドクレジット風。縦スクロールで役職・名前が流れるアニメーション。
    — 「DIRECTED BY」→名前、「PRODUCED BY」→メール等。
```

**Wow Factor（必須実装）**:
- 初回ロード時の「シネマカーテン（黒帯）オープン」アニメーション
- Ken Burns効果（超低速ズーム: `transform: scale(1) → scale(1.1)` / 30秒）
- 常時フィルムグレインオーバーレイ（`opacity: 0.05`）

---

## D - Darkmode（ダークモード）
**ターゲット**: 開発者 / ハッカー / ターミナル愛好家

**コンセプト**: 「OLEDの暗闇に光る存在感」。`#000000`の純黒の中で、ネオンアクセントが局所的に光る。

**Colors**: `#000000`（ピュアブラック）/ `#1A1A1A`（カード背景）/ `#00FF88`（ネオングリーン）

**フォント**: Inter（全て）

### Layout Architecture
```
[1] HERO          — 真っ黒。コードのシンタックスハイライト風に大きなタイトルが表示。
                    バックグラウンドで「タイピングエフェクト」が走る（小さなテキスト）。
                    右下にカーソル点滅（`|`）。

[2] ABOUT         — 左: ターミナル風ウィンドウ（`> name: ...` `> role: ...`）。
                    右: プロフィール写真（グレースケール → Hoverするとネオングリーン着色）。

[3] WORKS         — 横スクロールのカードスライダー（キーボード/スワイプで移動）。
                    各カード: `#1A1A1A`背景 + Hover時にネオングリーンがBorder・Shadowで発光。
                    スタックカード形式（前のカードが後ろに見える）。

[4] SKILLS        — `progress` 要素をカスタムスタイル。ネオングリーンで充填アニメーション。
                    「スキャンライン」オーバーレイ追加でハッカー感。

[5] CONTACT       — ターミナルの `send_message()` コマンド風フォーム。
                    入力フィールドは `border: none; border-bottom: 1px solid #00FF88;`。
```

**Wow Factor（必須実装）**:
- Hover時にのみ要素が局所的にネオングリーンで発光（局所照明エフェクト）
- ターミナルウィンドウUIのAboutセクション

---

## E - Ethereal（エセリアル）
**ターゲット**: UI/UXデザイナー（女性向け）/ ブランドデザイナー

**コンセプト**: 「天界の静けさ」。白・パステルだけで構成。空気のような透明感と圧倒的余白。

**Colors**: `#F8F9FF`（白） / `#E6E6FA`（ラベンダー） / `#FFB6C1`（薄ピンクアクセント）

**フォント**: Cormorant Garamond（見出し） / Lato（本文）

### Layout Architecture
```
[1] HERO          — 100vh。背景は複数の白い「雲Blob」がゆっくりdriftするアニメーション。
                    テキストは上寄せ・左寄せで大きなセリフ体。
                    右側に縦長のフェザー（羽根）イメージSVGが浮遊。

[2] ABOUT         — 中央1カラム。顔写真は円形（50%）で画面左に配置。
                    テキストは右隣。下にパステルカラーのタグ（hoverでふんわり拡大）。
                    セクション全体の背景はラベンダー（3%透明）。

[3] WORKS         — 縦積みの大画面ショーケース（1作品ずつ大きく）。
                    左右交互に画像とテキストが配置（ジグザグレイアウト）。
                    画像は `border-radius: 40% 60% 60% 40%` の有機的な形。

[4] PROCESS / PHILOSOPHY
    — 3 or 4項目の横並びアイコン+テキスト（フェザーアイコン等）。

[5] CONTACT       — 白い「ペーパー」風コンテナの中にメールフォーム。背景はラベンダーBlob。
```

**Wow Factor（必須実装）**:
- 背景の「雲Blob」が独立してゆっくり浮遊するCSS `keyframes` アニメーション
- 作品画像の有機的（非矩形）なシェイプ処理（`clip-path` or `border-radius`）

---

## F - Film（フィルム）
**ターゲット**: アナログ写真家 / フォトジャーナリスト

**コンセプト**: 「フィルムカウンターが進む**横スクロール**体験」。縦スクロールではなく、フィルムが横に送られる。

**Colors**: `#1A1A1A`（黒）/ `#F5F5F5`（白）/ `#8B7355`（セピア）

**フォント**: Courier Prime（全て）

### Layout Architecture
```
[1] HERO（縦スクロール部分）
    — 通常の縦スクロールHero。フィルムカウンター（「001 / 036」）表示。
    — 上下にフィルムスプロケット穴の装飾。

[2] FILMSTRIP（横スクロール強制ゾーン）
    — 📌 このセクションのみ横スクロール（GSAP ScrollTrigger / CSS scroll-snap）。
    — パネル1: PORTRAIT SERIES（写真 + タイトル）
    — パネル2: URBAN SHADOWS（写真 + タイトル）
    — パネル3: STILL LIFE（写真 + タイトル）
    — 各パネルはモノクロ。Hover→セピア→カラー の3段階フィルター変化。

[3] ABOUT（縦スクロール再開）
    — 暗室（Darkroom）テーマ。赤いセーフライトのようなトーン。
    — 「PHOTOGRAPHER SPEC」シート形式。

[4] CONTACT
    — 現像完了のレシート（Thermal Printer）風テキストスタイル。
```

**Wow Factor（必須実装）**:
- 作品セクションの**強制横スクロール**（CSS `scroll-snap` + 横長コンテナ）
- モノクロ→セピア→カラーの3段階Hoverフィルター変化

---

## G - Glassmorphism（グラスモーフィズム）
**ターゲット**: トレンド重視UIデザイナー / SaaSスタートアップ

**コンセプト**: 「ガラスの美術館」。Apple的な完璧なガラス質感。背景の鮮やかなメッシュグラデーション越しに情報を読む。

**Colors**: 背景: `#FF6B6B`, `#4ECDC4`, `#45B7D1` のメッシュグラデーション + カード: `rgba(255,255,255,0.15)`

**フォント**: Montserrat（全て）

### Layout Architecture
```
[1] HERO          — 100vh。背景に3色以上の鮮やかなメッシュグラデーション（固定）。
                    中央にガラスカード1枚（大）: backdrop-filter: blur(24px) + 白縁2px。
                    外側に装飾の宝石（小さなガラスBlob）が浮遊。

[2] ABOUT         — 背景: 異なるメッシュグラデーション。
                    左: 縦長ガラスカード（プロフ写真 + 一言）。
                    右: 横2段ガラスカード（スペック）。
                    カード同士が少し**重なって**配置（z-indexで奥行き）。

[3] WORKS         — 3カラムガラスカードグリッド。
                    各カードは完全独自サイズ（1×1, 1×2, 2×1など）のBento Grid風。
                    Hover: カードの透明度が上がり、内側に白い光が差す（疑似要素sheen）。

[4] CONTACT       — ガラスのモーダルのような大きなカード1枚。
                    背景はぼかされた抽象グラデーション。
```

**Wow Factor（必須実装）**:
- Hover時にカードの上を白い光の帯が走る「Sheen（シーン）」アニメーション
- カードサイズを混ぜた**Bento Grid**レイアウト（全て同サイズカード禁止）

---

## H - Holographic（ホログラム）
**ターゲット**: NFTアーティスト / 3Dデザイナー / メタバース

**コンセプト**: 「カードを傾けると虹色が走る」。マウス位置に連動するCSS 3D Tiltで、ホログラフィック反射を再現。

**Colors**: Rainbow shift: `#FF0080` → `#00FF88` → `#0080FF` のグラデーション

**フォント**: Orbitron（見出し） / Rajdhani（本文）

### Layout Architecture
```
[1] HERO          — 黒背景。中央に巨大なホログラフィックテキスト（虹色グラデーション）。
                    テキストにCSS `hue-rotate` アニメーション（4秒周期）。
                    マウス移動でページ全体が微妙に視差移動。

[2] ABOUT         — プロフィール「ホログラムカード」1枚。
                    カード上でマウスを動かすと傾き（`transform: rotateX, rotateY`）＆虹色グラデが走る。
                    カード内に顔写真（低透明度）とスペック情報。

[3] WORKS         — 3列の「ホログラフィックカード」グリッド。
                    各カード: HOVERで全カードが立体的に傾く（CSS 3D perspective tilt）。
                    虹色の線（Rainbow border）が常に回転。

[4] SKILLS        — バーではなく、六角形（Hexagon）を並べたスキルマップ。
                    各六角形にスキル名とレベルを記載。Hoverで発光。

[5] CONTACT       — ホログラム投影プラットフォーム風。`Transmit Message` ボタン。
```

**Wow Factor（必須実装）**:
- マウス追従カードTilt + ホログラフィック虹色反射（JS + CSS `perspective`）
- 六角形Hexagonスキルマップ（他テンプレートでは使わない）

---

## I - Infinite（無限宇宙）
**ターゲット**: VFXアーティスト / ゲーム開発者 / SF小説家

**コンセプト**: 「宇宙を旅する縦スクロール」。スクロールするたびに星に向かって加速し、宇宙の深さを体験する。

**Colors**: `#0B0D17`（宇宙黒）/ `#6366F1`（星雲紫）/ `#22D3EE`（シアン）

**フォント**: Exo 2（全て）

### Layout Architecture
```
[1] HERO          — Canvas（JS）で星屑パーティクル（z軸ワープ）が走る。
                    中央に惑星（CSSの `border-radius: 50%` + 複数のradial-shadow）。
                    「SCROLL TO EXPLORE」の誘導。

[2] ABOUT（CAPTAIN'S LOG）
    — 宇宙船のコックピット風UI。左に小さいコントロールパネル、右にテキスト。
    — スクロールで「目的地まで XX光年」のカウントダウン。

[3] WORKS（MISSIONS）
    — 縦に積み重なる「ミッションカード」（各カード = 1案件）。
    — 各カード: 宇宙船のミッションブリーフィング形式。左: 惑星サムネ、右: テキスト。
    — カードが画面に入ると、衛星軌道アニメーション発動。

[4] SKILLS（STARMAP）
    — 星座図のようなスキルマップ（Canvas or SVG）。
    — ノード（スキル）を線で結んだ「コンステレーション」表示。

[5] CONTACT（TRANSMISSION）
    — 宇宙通信端末UI。「SEND TRANSMISSION」ボタン。
```

**Wow Factor（必須実装）**:
- Canvasによるスクロール速度連動の星ワープパーティクル
- スキルをSVGの星座（Constellation）として表示

---

## J - Journal（ジャーナル）
**ターゲット**: ライター /編集者 / コンテンツクリエイター

**コンセプト**: 「高級雑誌のページを開く体験」。タイポグラフィが主役で、文字の美しさだけで魅了する。

**Colors**: `#F9F7F0`（オフホワイト）/ `#2C3E50`（墨色）/ `#E74C3C`（朱アクセント）

**フォント**: Playfair Display（見出し） / Source Serif Pro（本文） — セリフ体で統一

### Layout Architecture
```
[1] HERO（COVER PAGE）
    — 雑誌の表紙。大きな見出し（Playfair Display, 96px以上）が画面を圧倒。
    — `VOL. 01 / 2025 / PORTFOLIO` の掲示表示。
    — 下に横長の区切り線（1px）と小さいリード文。

[2] ABOUT（FEATURE ARTICLE）
    — CSS `columns: 2` による2段組みレイアウト（新聞・雑誌スタイル）。
    — 最初の文字が「ドロップキャップ」（4行分の巨大な装飾頭文字）。
    — コラム間に1pxの仕切り線。

[3] WORKS（PORTFOLIO SPREAD）
    — 雑誌の見開きページ（2ページ分）を模したレイアウト。
    — 主要作品は見開き全面画像。副作品は縦2段 or 3段。
    — ページ数ノンブル（「04」「05」）を隅に表示。

[4] SKILLS（EDITORIAL NOTE）
    — `blockquote` スタイルで各スキルを1〜2文で説明。左に朱线。

[5] CONTACT（EDITORIAL DESK）
    — 名刺風コンタクト。シンプルに名前・メール・SNSのみ。
```

**Wow Factor（必須実装）**:
- CSS `columns: 2` による本物の2段組みレイアウト
- 「ドロップキャップ」の装飾頭文字（`::first-letter`）

---

## K - Kinetic（キネティック）
**ターゲット**: モーションデザイナー / クリエイティブコーダー

**コンセプト**: 「物理演算で動くポートフォリオ」。マウスでクリック・ドラッグすると要素が弾き飛ぶ。

**Colors**: `#FF3366`（活性ピンク）/ `#33CCFF`（シアン）/ `#FFCC00`（エネルギー黄）

**フォント**: Kanit（全て）

### Layout Architecture
```
[1] HERO（PHYSICS PLAYGROUND）
    — 画面がCanvasまたはDOM物理演算エリア。
    — タイトル文字の各レターが個別のDOM要素として「落下」してくる（Matter.js or CSS spring）。
    — クリックすると文字が弾き飛ぶ（インタラクティブ）。

[2] ABOUT（BEHIND THE MOTION）
    — 通常のセクション（スクロールでReveal）。
    — 左: テキスト。右: プロフィール写真のMagnetic hover（マウスで吸い付く）。

[3] WORKS（WORK IN MOTION）
    — ドラッグ可能なカードスタック（Draggable UX）。
    — カードを左右にスワイプして作品を閲覧。
    — 各カードは少し回転が付き、本物のカードっぽい触感。

[4] SKILLS（ENERGY METER）
    — 円形のエネルギーゲージ（SVG `stroke-dashoffset` アニメーション）が横に並ぶ。

[5] CONTACT（BOUNCE TO ME）
    — 「SEND」ボタンが「弾む」アニメーション（Spring physics）で待機。
```

**Wow Factor（必須実装）**:
- Heroでの文字落下 + クリックで弾き飛ぶ物理演算インタラクション
- ドラッグ可能な作品カードスタック

---

## L - Line（ライン）
**ターゲット**: 建築家 / プロダクトデザイナー / ミニマリスト

**コンセプト**: 「線だけで構成された厳格な幾何学美」。CSSのborderのみで全てのデザインを表現。

**Colors**: `#000000`（線）/ `#FFFFFF`（背景）/ `#FF0000`（一点の赤アクセント）

**フォント**: Space Mono（全て）

### Layout Architecture
```
[1] HERO          — 白背景に黒い線のみ。黄金比（1:1.618）に従ったグリッド分割。
                    「名前」と「職種」のみのシンプルテキスト。右下に小さな赤点1個のみ。

[2] ABOUT         — ページを垂直1本線で二分割。左: テキスト（右寄せ）。右: 線で描いた幾何学図形 or 写真。
                    線が画面に入ると、SVGでシューっと描画される。

[3] WORKS         — `border-collapse` 的な、グリッドラインで碁盤目に区切られたテーブルレイアウト。
                    各セル: 作品名 + 年のみ（画像なし）。
                    Hover: セルの背景が黒に反転（線が白に変わる）。

[4] SKILLS        — 単純な左側の縦線 + スキル名テキストのリスト。
                    スキルレベルは「▪▪▪▪▫ (4/5)」形式。

[5] CONTACT       — ページを水平1本線で二分割。上: 「GET IN TOUCH」。下: メールアドレス（赤色）。
```

**Wow Factor（必須実装）**:
- 全ての区切りをSVGの線描画アニメーションで表現（scroll-triggerで発動）
- 作品セクションの「テーブル碁盤目レイアウト」（他では使わない）

---

## M - Minimal（ミニマル）
**ターゲット**: アートディレクター / コンセプトデザイナー

**コンセプト**: 「削ぎ落とした先にある美しさ」。余白が80%を占める。要素は声を荒げず、静かに存在する。

**Colors**: `#FFFFFF`（白）/ `#0A0A0A`（黒）/ `#808080`（グレー） — 3色のみ

**フォント**: DM Sans（全て）— クリーン

### Layout Architecture
```
[1] HERO          — 100vh。中央に名前（36px）と肩書き（16px）のみ。それ以外は空白。
                    スクロールすると、隠れたナビが上からフワッと現れる。

[2] ABOUT         — 左に薄い縦書きの「ABOUT」ラベル（回転テキスト）。
                    右に3段落の自己紹介文のみ。写真・アイコン一切なし。

[3] WORKS         — ナンバリングされたシンプルリスト（01, 02, 03...）。
                    各行: 番号 / タイトル のみ（1行）。
                    Hover: 行の下にグレーのunderlineがスライドイン。
                    クリック後のExpand: 詳細が下に静かに展開。

[4] CONTACT       — シングルラインのメールアドレスのみ。クリックでコピー。
```

**Wow Factor（必須実装）**:
- ページ内の全コンテンツがSplitTextで文字単位のRevealアニメーション
- 作品のAccordion（クリックで展開）リスト — 画面遷移なし

---

## N - Neon（ネオン）
**ターゲット**: ミュージシャン / DJアーティスト / ナイトクラブ関係

**コンセプト**: 「深夜のバーに飾られたネオンサイン」。4層重ねのtext-shadowで本物のネオン管の輝きを再現。

**Colors**: `#FF10F0`（ネオンピンク）/ `#00F0FF`（ネオンシアン）/ `#1A0A1A`（暗紫背景）

**フォント**: Bebas Neue（見出し） / Roboto（本文）

### Layout Architecture
```
[1] HERO（OPEN SIGN）
    — 全画面黒背景。複数のネオンサインが「点灯」するローディングアニメーション（stagger）。
    — メインタイトルは4層text-shadowで強烈に輝く。
    — ランダムなタイミングでネオンがチカチカ（flicker）。

[2] ABOUT（ARTIST BIO）
    — 暗い背景。左: ネオンで縁取られた写真（`box-shadow: 0 0 20px`）。
    — 右: バイオグラフィーテキスト。各段落の先頭にネオンカラーの記号（♪ ≋ ✦）。

[3] WORKS（SETLIST）
    — 横スクロールのレコードジャケット風カード（正方形、1:1アスペクト比）。
    — Hover: レコードが回転（`transform: rotate`）。

[4] SKILLS（FREQ ANALYZER）
    — イコライザー（縦バーが音楽に合わせて踊る）風のスキルバー。
    — CSS animationでバーの高さがランダムに変動する「ライブ感」。

[5] CONTACT（BACKSTAGE PASS）
    — バックステージパス風のデザイン。名前・役割・連絡先が印刷されたレイアウト。
```

**Wow Factor（必須実装）**:
- 4層text-shadowによる本物のネオン管Glow
- ランダムなflicker（点滅）アニメーション
- イコライザー風スキルバー

---

## O - Obsidian（黒曜石）
**ターゲット**: ラグジュアリーブランドデザイナー / ハイエンドUI

**コンセプト**: 「漆黒の石から削り出された高級感」。岩のテクスチャ + スクロールで降下するスポットライト。

**Colors**: `#0D0D0D`（漆黒）/ `#FF0040`（血赤）/ `#4A0080`（暗紫）

**フォント**: Cinzel（見出し） / Cormorant Garamond（本文）

### Layout Architecture
```
[1] HERO          — 漆黒。石のノイズテクスチャ（SVG feTurbulence）が背景。
                    中央から1本の赤い光線（縦グラデーション）が下向きに照射。
                    見出しがMarble内から削り出されるエフェクト（clip-pathアニメ）。

[2] ABOUT（THE CRAFTSMAN）
    — 全体を斜め（skewY: -3deg）に傾けたセクション。スクロールで戻る。
    — 右: 大きな石像（プロフィール写真）。左: 短く力強いテキスト。

[3] WORKS（THE COLLECTION）
    — 縦積みカード。各カード = モノクロ画像（全面）+ Hover時に赤いオーバーレイ。
    — スクロールすると上から「スポットライト」が降ってくるCSS効果。

[4] CONTACT（COMMISSION）
    — 漆黒の大きなフォームエリア。「REQUEST A COMMISSION」見出し。
    — 入力フィールドはunderlineのみ。Submitボタンは赤い鋭角ボタン。
```

**Wow Factor（必須実装）**:
- 石のノイズテクスチャ（SVG `feTurbulence`）の背景
- スクロール位置に連動して降下するスポットライト効果

---

## P - Paper（ペーパー）
**ターゲット**: イラストレーター / ブックデザイナー / 紙もの作家

**コンセプト**: 「紙が重なって生まれる情報の層」。カードがリアルな物理影で重なり、Hoverで紙が持ち上がる。

**Colors**: `#F5F5DC`（生成り）/ `#D2B48C`（クラフト）/ `#8B7355`（影の茶色）

**フォント**: Spectral（全て）

### Layout Architecture
```
[1] HERO（FIRST PAGE）
    — 白いコピー用紙が3〜4枚「ズレて重なった」ように見えるHero。
    — 各紙に box-shadow で正確な物理的影（右下に伸びる自然な影）。
    — 最前面の紙に名前と肩書き。

[2] ABOUT（HANDWRITTEN NOTE）
    — 横長の便箋風レイアウト。用紙の横線（`repeating-linear-gradient`）が背景。
    — 写真はPostIt（付箋）スタイルで右上に少し傾いて配置。

[3] WORKS（PINBOARD）
    — コルクボード（テクスチャ背景）に作品がピン留めされたスタイル。
    — 各カードは少しランダムに傾いており(`rotate: -2deg` etc)、画鋲のSVGが上部に。
    — Hover: カードが真っ直ぐになり、影が強くなる（=紙が持ち上がる）。

[4] CONTACT（HANDWRITTEN CARD）
    — 手書き風フォントで名刺サイズのコンタクトカード。封筒のイラストを添える。
```

**Wow Factor（必須実装）**:
- コルクボード上のランダム傾き + Hover時に真っ直ぐになる物理影変化
- 便箋の横線背景（`repeating-linear-gradient`）

---

## Q - Quantum（量子）
**ターゲット**: データサイエンティスト / ML研究者 / バイオインフォ

**コンセプト**: 「データが繋がる瞬間」。Canvasで粒子がリアルタイムにノード・エッジを形成するネットワーク可視化。

**Colors**: `#0066CC`（科学青）/ `#00CCFF`（エネルギー）/ `#FFFFFF`（粒子）

**フォント**: Roboto Mono（全て）

### Layout Architecture
```
[1] HERO（PARTICLE NETWORK）
    — 全画面Canvas: 粒子が動いており、近接すると自動的に線（Edge）で繋がる。
    — マウスに近い粒子は反発（力場）。
    — テキストはCanvasの上にz-index重ねて配置。

[2] ABOUT（DATA PROFILE）
    — 左: データダッシュボード風の情報パネル（スペック項目 + バー/ゲージ）。
    — 右: プロフィール写真（Six-角形でクリップ）。
    — 数値は画面に入った瞬間にカウントアップ。

[3] WORKS（RESEARCH PAPERS）
    — 論文・研究発表のような縦積みリスト形式。
    — 各行: タイトル / 種別 / 年 / DOI風ID。
    — Hover: 右にサムネイルがフワッと表示（Tooltip風）。

[4] SKILLS（WEIGHTED GRAPH）
    — SVG/Canvasで描いたスキルの重み付きグラフ（ノードサイズがレベル）。

[5] CONTACT（SIGNAL ENDPOINT）
    — API Endpoint UIをモチーフに。「POST /contact」的なフォーム表示。
```

**Wow Factor（必須実装）**:
- Canvas粒子ネットワーク（マウスへの反発付き）
- SVG / Canvas重み付きスキルグラフ

---

## R - Retro（レトロ）
**ターゲット**: インディーゲーム開発者 / ピクセルアーティスト / 80年代愛好家

**コンセプト**: 「VHSが再生されるCRT画面」。意図的なグリッチ・色収差・スキャンラインで「壊れた過去」を表現。

**Colors**: `#FF00FF`（マゼンタ）/ `#00FFFF`（シアン）/ `#000033`（暗青）

**フォント**: Press Start 2P（見出し） / VT323（本文）

### Layout Architecture
```
[1] HERO（VHS BOOT SCREEN）
    — 「---VHS---」のブルーバック + 走るスキャンライン（常時）。
    — ローディングバーが100%になると「メインメニュー」が表示される演出。
    — RGB色収差（text-shadowで赤・青をY軸にずらす）をタイトルに適用。

[2] ABOUT（PLAYER SELECT）
    — ゲームのキャラクター選択画面風。
    — 「PLAYER 1: [NAME]」「CLASS: DEVELOPER」「EXP: 5000」等のゲームUI。
    — 点滅するカーソル（`|`）が各項目を指す。

[3] WORKS（ACHIEVEMENT UNLOCKED）
    — ゲームのトロフィー/実績一覧UI。
    — 各「実績」カードはアンロック/ロック状態で見た目が変わる。
    — ロック解除時（Hover）: ピコーン音のビジュアルエフェクト + 光。

[4] SKILLS（STATS SCREEN）
    — RPGのステータス画面（ATK, DEF, SPD のような略語でスキルを表示）。
    — ドット絵の水平バー。

[5] CONTACT（INSERT COIN）
    — アーケードの「INSERT COIN」画面。Submitボタン = コイン投入口。
```

**Wow Factor（必須実装）**:
- 常時スキャンライン（CSSのrepeating-linear-gradient）オーバーレイ
- VHSブート画面のローディング演出
- 「実績アンロック」スタイルの作品カード

---

## S - Space（宇宙）
**ターゲット**: 宇宙工学 / 航空宇宙 / SF作家

**コンセプト**: 「惑星が軌道を描く太陽系」。要素が惑星として中心の太陽を公転する軌道型レイアウト。

**Colors**: `#0B1026`（深宇宙）/ `#7B68EE`（星雲紫）/ `#00BFFF`（星の青）

**フォント**: Exo 2（全て）

### Layout Architecture
```
[1] HERO（SOLAR SYSTEM）
    — Canvas: 中心に「太陽」（大きな発光円）。周囲に惑星（スキル/特徴）がCSSで公転。
    — 各惑星はクリック可能でPopover情報表示。
    — マウスが近づくと引力で惑星が少し引き寄せられる。

[2] ABOUT（MISSION LOG）
    — 宇宙ステーションの航行ログUI（左: 時系列ログリスト、右: 概要文）。

[3] WORKS（MISSION ARCHIVES）
    — カード型ではなく、「ミッションブリーフ」の縦積みリスト。
    — 各ミッション: コードネーム / 概要 / ステータス（COMPLETED ✓）。
    — 展開可能（Accordion）。

[4] CONTACT（COMMAND CENTER）
    — コックピットUI。HUDをイメージしたサークル型の連絡先表示。
```

**Wow Factor（必須実装）**:
- CSS `animation: orbit` による惑星の公転アニメーション
- ミッションブリーフAccordionリスト

---

## T - Typography（タイポグラフィ）
**ターゲット**: タイポグラファー / グラフィックデザイナー / 広告クリエイター

**コンセプト**: 「文字が主役の動く壁画」。画面いっぱいに巨大なOutline文字が配置され、スクロールで横にスライドする。

**Colors**: `#1A1A1A`（文字黒）/ `#F8F8F8`（背景白）/ `#FF3333`（アクセント赤）のみ

**フォント**: Oswald（Bold、見出し）/ Merriweather（本文）

### Layout Architecture
```
[1] HERO（BIG TYPE）
    — 画面いっぱいに巨大な薄いOutlineテキスト（-webkit-text-stroke）が背景に配置。
    — PORTFOLIO / DESIGN / 2025 等の単語がOverlapして配置。
    — 手前に名前と肩書きの実テキスト（小さめ）。
    — スクロールすると背景のOutline文字が反対方向にスライド（Parallax）。

[2] ABOUT（TYPE SPECIMEN）
    — フォント見本シート風。「Name」「Role」「Specialty」がスタイル見本として並ぶ。
    — 各ブロックは異なるフォントサイズ・weight・スタイルで表示（意図的に混在）。

[3] WORKS（HEADLINES）
    — 雑誌ヘッドライン風のリスト。作品名が大きな見出しとして並ぶ（画像なし）。
    — Hover: 見出しの後ろに赤いラインがスライドイン。

[4] CONTACT（COLOPHON）
    — 本の奥付（Colophon）のスタイル。印刷物の最終ページのような情報整理。
```

**Wow Factor（必須実装）**:
- 背景のOutlineテキストがスクロールと逆方向にスライドするParallax
- フォント見本シート風Aboutセクション

---

## U - Underwater（水中）
**ターゲット**: ダイバー / 海洋写真家 / 自然科学者

**コンセプト**: 「海底から見上げる光の揺らぎ」。SVGフィルター（feTurbulence）で画面全体が本物の水中のようにゆらぐ。

**Colors**: `#006994`（深海青）/ `#48CAE4`（浅海シアン）/ `#E0F7FA`（光の白）

**フォント**: Quicksand（全て）

### Layout Architecture
```
[1] HERO（THE DEEP）
    — 深い青のグラデーション（上: 水面の光、下: 暗部）。
    — 背景にSVGフィルター（`feTurbulence + feDisplacementMap`）で全体が揺らぐ（low intensity）。
    — 泡パーティクルが下から上に上昇（JS or CSS keyframes）。
    — タイトルは水面に書いたような揺れるテキスト。

[2] ABOUT（EXPEDITION LOG）
    — 潜水調査ログのUI。左に「DEPTH」「TEMP」「VISIBILITY」等の計器パネル。
    — 右: 丸いポートホール（円形フレーム）でプロフィール写真。

[3] WORKS（SPECIMENS）
    — 標本コレクション風グリッド（3列）。
    — 各カードは標本ラベル付き（学名風にプロジェクト名・種別を表記）。
    — Hover: 標本が僅かに揺れる（`animation: sway`）。

[4] SKILLS（OXYGEN LEVELS）
    — 酸素タンクゲージ風の垂直バーグラフ群。各バーがゆっくり充填アニメーション。

[5] CONTACT（SURFACE）
    — 「浮上」をテーマ。下から上に浮き上がるアニメーションでコンタクト情報が現れる。
```

**Wow Factor（必須実装）**:
- SVG `feTurbulence + feDisplacementMap` フィルターによる全画面の水中揺らぎ
- ポートホール（円形）写真フレーム

---

## V - Vintage（ヴィンテージ）
**ターゲット**: 歴史家 / 職人 / アンティーク収集家

**コンセプト**: 「100年前の名刺交換」。セピアとビネットで経年劣化を表現。写真の上には実際のホコリ・傷テクスチャ。

**Colors**: `#704214`（セピア）/ `#D4C5B0`（古紙）/ `#B8860B`（ゴールドアクセント）

**フォント**: Playfair Display Italic（見出し） / Libre Baskerville（本文）

### Layout Architecture
```
[1] HERO（PORTRAIT STUDIO）
    — アンティークのオーバルフレーム（楕円形ボーダー装飾）。
    — 中央にセピア写真（フィルター適用）+ ビネット（四隅暗変）オーバーレイ。
    — 写真上に傷・ホコリテクスチャPNG（`opacity: 0.3`）。

[2] ABOUT（CURRICULUM VITAE）
    — 古典的な履歴書（CV）スタイル。タイプライター風フォントで項目並べ。
    — 装飾の横罫線（波線・二重線）で区切り。

[3] WORKS（PORTFOLIO FOLIO）
    — 大判ブック（開いた本）のようなレイアウト。左右のページに作品を配置。
    — 各「ページ」の端は少し折れ曲がって（`:after` 擬似要素）見える。
    — 全作品はセピアフィルター + Hoverでカラーに戻る（sepia→none）。

[4] CONTACT（POST CARD）
    — ポストカード（往復はがき）デザイン。左: メッセージ欄、右: 宛先欄（住所・切手風）。
```

**Wow Factor（必須実装）**:
- 全体にビネット（四隅暗変）+ ホコリテクスチャオーバーレイ
- 作品のセピア → カラーHover変化

---

## W - Watercolor（水彩）
**ターゲット**: 水彩画家 / イラストレーター / アートスクール生

**コンセプト**: 「紙の上に水彩絵の具が広がる瞬間」。`mask-image` でセクション・画像の境界を筆の跡のように不規則にする。

**Colors**: `#FFB7C5`（ピンク）/ `#87CEEB`（水色）/ `#F0E68C`（黄）/ `#C8E6C9`（薄緑）

**フォント**: Caveat（見出し） / Nunito（本文）

### Layout Architecture
```
[1] HERO（BLANK CANVAS）
    — 水彩紙テクスチャ（PNG）を背景に。
    — テキストは手書きフォント。Heroの下端は`mask-image`のSVGブラシシェイプで
      ジャギーなエッジに（直線的な区切りなし）。
    — 背景でゆっくり色が広がるアニメーション（radial-gradient の拡大）。

[2] ABOUT（ARTIST STATEMENT）
    — 横長のブラシストローク（太いSVG path）がセクション背景。
    — テキストはその上に配置。
    — 写真は水彩の滲みシェイプ（`clip-path` or SVG mask）でクリップ。

[3] WORKS（GALLERY WALL）
    — 「ギャラリーの壁」。作品は白い額縁付きで不規則に配置（masonry or absolute位置）。
    — 各作品の下に手書きキャプション（Caveatフォント）。

[4] SKILLS（COLOR PALETTE）
    — 絵の具パレットの丸（円形スウォッチ）がスキルを表す。
    — 円の大きさがレベルを表す。ラベルは下に手書き。

[5] CONTACT（OPEN STUDIO）
    — スケッチブックの1ページ風。余白に鉛筆ラインの落書き（SVG path）。
```

**Wow Factor（必須実装）**:
- セクション境界を `mask-image`（SVGブラシシェイプ）でジャギー処理
- 円形絵の具パレットスキルビュー

---

## X - Xenon（キセノン）
**ターゲット**: 自動車・航空・精密機械デザイナー / 工業デザイナー

**コンセプト**: 「走る光の筋」。暗い背景にキセノンライトが鋭く走り、Hoverでシャープな白Sheen（光の帯）が走る。

**Colors**: `#111111`（暗背景）/ `#E0E8FF`（キセノン白）/ `#00AAFF`（鋭いシアン）

**フォント**: Rajdhani（見出し） / Exo 2（本文）

### Layout Architecture
```
[1] HERO（LIGHT SPEED）
    — 暗背景に、水平に走るキセノン光の筋（CSSアニメ + box-shadow）が複数本。
    — タイトルテキストは鋭角サンセリフ。文字間隔広め。
    — 画面右端に細い縦ラインが点在（ランウェイライト的）。

[2] ABOUT（SPECIFICATIONS）
    — 自動車スペックシート風。「ENGINE: Creative Dev」「TORQUE: 5yr exp」等の技術表現。
    — 左: スポーツカーのサイドビュー（プロフィール写真）。右: スペック表。

[3] WORKS（TEST DRIVE）
    — 横長（ランドスケープ）のカードが縦に積まれる。
    — 各カード: 暗背景 + 鋭いサイドライン（左端に2px縦ライン）。
    — Hover: カード上を白い光の帯（Sheen）がキラッと走る（`::after` スライドアニメーション）。

[4] SKILLS（CONTROL PANEL）
    — 円形のダイヤルゲージ（SVG `arc`）でスキルを表示。ダッシュボード的配置。

[5] CONTACT（IGNITION）
    — 「START ENGINE」のスタートボタン（エンジン点火デザイン）でCTAを表現。
```

**Wow Factor（必須実装）**:
- Hover時のSheen（白い光の帯が走る）アニメーション（`::after`でスライド）
- SVGアークによるダイヤルゲージスキルビュー

---

## Y - Yarn（ヤーン）
**ターゲット**: ハンドクラフト職人 / ニットデザイナー / アパレル

**コンセプト**: 「手編みのあたたかみ」。縫い目のような`border-style: dashed`と丸みで、デジタルなのに手作りの触感を表現。

**Colors**: `#D2691E`（ウール茶）/ `#F4A460`（ベージュ）/ `#E8D5B7`（生成り）

**フォント**: Patrick Hand（見出し） / Nunito（本文）

### Layout Architecture
```
[1] HERO（YARN BALL）
    — 背景は編み目パターン（CSSのrepeating-linear or SVG）。
    — 中央に大きな毛糸玉のイラスト（SVGアニメーション、巻かれていく）。
    — タイトルは手書きフォントで「温かく」。

[2] ABOUT（WHO I KNIT）
    — 全要素のborderは `border-style: dashed` で統一（縫い目風）。
    — 写真はヘキサゴン（蜂の巣）形状にクリップ。
    — 「お気に入り素材」タグが並ぶ（丸角バッジ、各色違い）。

[3] WORKS（THE COLLECTION）
    — 正方形カードのグリッド（各カードに角丸 `border-radius: 24px`）。
    — 各カードは `border: 2px dashed` + 内側に薄いニット柄背景。
    — Hover: カードが少し浮いてフワッと影（毛糸のクッション感）。

[4] SKILLS（SKILL BASKET）
    — バスケット（かごの丸形コンテナ）にスキルが入った比喩的なビュー。
    — 各スキルは色違いのウール玉（`border-radius: 50%`）として表示。

[5] CONTACT（SEND A LETTER）
    — 封筒デザインのコンタクトカード。フラップが開くアニメーション（Hover）。
```

**Wow Factor（必須実装）**:
- 全ボーダーを`dashed`（縫い目）で統一
- 封筒フラップが開くHoverアニメーション

---

## Z - Zen（禅）
**ターゲット**: 日本建築家 / 瞑想家 / ミニマリスト（日本的）

**コンセプト**: 「墨が紙に落ちる静寂の瞬間」。SVGのstroke-dashoffsetで筆文字がシュッと描かれるアニメーション。枯山水の砂紋が背景。

**Colors**: `#F5F5DC`（和紙）/ `#2F4F4F`（墨緑）/ `#1A1A1A`（墨黒）

**フォント**: Noto Serif JP（見出し） / Noto Sans JP（本文）

### Layout Architecture
```
[1] HERO（SUMI / 墨）
    — 枯山水の砂紋（波紋のSVGパターン）が背景（`opacity: 0.15`）。
    — 中央に漢字1文字（「無」等）をSVGで表現し、stroke-dashoffsetで
      「くるっと書かれる」筆文字アニメーション（ページ読み込み時）。
    — 下に日本語と英語のキャプション。

[2] ABOUT（空）
    — 完全な非対称レイアウト。左端（20%幅）に縦書きの見出し「私について」。
    — 残り80%に自己紹介文。写真はなし、または右端に小さく配置。
    — 何も置かれていない「余白（ま）」を設計として意図する。

[3] WORKS（間）
    — 各作品を独立した一枚岩として扱う縦積みレイアウト。
    — 作品と作品の間に、十分な余白（`margin: 200px 0`）。
    — タイトルを縦書き（`writing-mode: vertical-rl`）で左に添える選択肢。
    — Hover: 微細な石の波紋（ripple）が静かに広がる。

[4] CONTACT（道）
    — 最小限。メールアドレス1行。その上下に十分な余白。
    — 送信フォームなし（mailto: リンクのみ）。
```

**Wow Factor（必須実装）**:
- SVG `stroke-dashoffset` による筆文字描画アニメーション（ロード時）
- 縦書き（`writing-mode: vertical-rl`）を活用したレイアウト要素
- 「余白（ま）」を意図的・積極的にデザインとして使う

---

*Portfolio Design Specifications v2.0 — 26 Themes, 0 Duplicates*
*各テンプレートはこの設計書のLayout Architectureに従い、HTMLからトップダウンで構築すること。*

---

# ⚡ Appendix: Effects & Animation Specification

26テンプレート全体に適用する**エフェクト実装仕様書**。各テンプレートのレシピに従い、CSSとJSで「魔法の演出」を実現する。

---

## 🧰 Global Tech Stack（共通技術スタック）

### 使用ライブラリ方針

| カテゴリ                     | 採用技術                           | 用途                                               |
| ---------------------------- | ---------------------------------- | -------------------------------------------------- |
| **スクロールアニメーション** | **GSAP + ScrollTrigger**           | Reveal / Parallax / Horizontal Scroll              |
| **パーティクル / Canvas**    | **Vanilla Canvas API**             | 星・泡・ネットワーク粒子（ライブラリ依存を避ける） |
| **SVGアニメーション**        | **CSS `stroke-dashoffset`**        | 線描画・筆文字                                     |
| **物理演算**                 | **Matter.js**（オプション）        | K (Kinetic) のみ使用                               |
| **3D傾き（Tilt）**           | **Vanilla JS `mousemove`**         | H (Holographic)、A (Aurora)                        |
| **テキスト分割**             | **SplitType.js**                   | M (Minimal)、T (Typography)                        |
| **横スクロール**             | **CSS `scroll-snap` + JavaScript** | F (Film)                                           |

### 全テンプレート共通ルール

```js
// 1. Reveal（スクロール出現）— data-reveal 属性のある要素に適用
// portfolio-common.js に既実装。全テンプレートで使用。
const revealObserver = new IntersectionObserver(/* ... */);

// 2. Smooth Scroll — href="#section" のリンクに適用
document.querySelectorAll('a[href^="#"]').forEach(/* ... */);

// 3. Header Shrink — スクロール後にheaderにclass追加
window.addEventListener('scroll', /* ... */);
```

### パフォーマンス原則
- アニメーションは `will-change: transform, opacity` を事前指定
- Canvasは `requestAnimationFrame` ループのみ（`setInterval` 禁止）
- 重いエフェクトは `prefers-reduced-motion` で無効化
- 初回ロード: **FCP（First Contentful Paint）1.5秒以内**が目標

---

## 🎬 Per-Template Effect Recipes

### A - Aurora（オーロラ）

```css
/* 1. 生きたオーロラ背景 */
.aurora-bg {
  background: radial-gradient(ellipse at 20% 50%, #00D2FF44, transparent 60%),
              radial-gradient(ellipse at 80% 20%, #8E2DE244, transparent 60%),
              radial-gradient(ellipse at 50% 80%, #F64F5944, transparent 60%);
  animation: aurora-shift 8s ease-in-out infinite alternate;
}
@keyframes aurora-shift {
  0%   { background-position: 20% 50%, 80% 20%, 50% 80%; }
  100% { background-position: 40% 30%, 60% 70%, 30% 60%; }
}

/* 2. フィルムノイズオーバーレイ */
.noise::before {
  content: '';
  position: fixed; inset: 0; z-index: 9999; pointer-events: none;
  background-image: url("data:image/svg+xml,..."); /* SVGノイズ */
  opacity: 0.04;
  animation: noise-flicker 0.5s steps(2) infinite;
}

/* 3. カスタムカーソル */
.cursor { width: 8px; height: 8px; background: white; border-radius: 50%; position: fixed; pointer-events: none; }
.cursor-glow { width: 40px; height: 40px; border: 1px solid rgba(255,255,255,0.4); border-radius: 50%; position: fixed; pointer-events: none; transition: transform 0.15s; }
```

```js
// カスタムカーソル追従
document.addEventListener('mousemove', e => {
  cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
  cursorGlow.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
});
```

---

### B - Blueprint（設計図）

```js
// SVG線描画アニメーション（ScrollTrigger）
gsap.from('.blueprint-path', {
  strokeDashoffset: 1000,
  strokeDasharray: 1000,
  duration: 2,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.blueprint-path', start: 'top 80%' }
});
```

```css
/* 寸法線ホバーエフェクト */
.work-item::before, .work-item::after {
  content: '←────────→';
  position: absolute; opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  transform: translateY(4px);
  font-family: 'JetBrains Mono'; font-size: 10px; color: #FF6B35;
}
.work-item:hover::before, .work-item:hover::after { opacity: 1; transform: translateY(0); }
```

---

### C - Cinematic（シネマティック）

```css
/* シネマバー開幕アニメーション */
.cinematic-bar--top { transform: translateY(0); animation: bar-open-top 2s 0.5s cubic-bezier(0.76,0,0.24,1) forwards; }
.cinematic-bar--bottom { transform: translateY(0); animation: bar-open-bottom 2s 0.5s cubic-bezier(0.76,0,0.24,1) forwards; }
@keyframes bar-open-top    { to { transform: translateY(-100%); } }
@keyframes bar-open-bottom { to { transform: translateY(100%); } }

/* Ken Burns — 30秒超低速ズーム */
.hero__image { animation: ken-burns 30s linear infinite alternate; }
@keyframes ken-burns { from { transform: scale(1); } to { transform: scale(1.08); } }

/* フィルムグレイン常時オーバーレイ */
.film-grain {
  position: fixed; inset: 0; pointer-events: none; z-index: 100;
  background-image: url('grain.png');
  opacity: 0.05; animation: grain-move 0.3s steps(1) infinite;
}
@keyframes grain-move { 0%{background-position:0 0} 25%{background-position:-50px 30px} 50%{background-position:100px -20px} 75%{background-position:30px 60px} }
```

---

### D - Darkmode（ダークモード）

```css
/* ネオングリーンGlow発光 — 局所照明 */
.work-card { transition: box-shadow 0.3s, border-color 0.3s; }
.work-card:hover {
  border-color: #00FF88;
  box-shadow: 0 0 8px #00FF88, 0 0 24px #00FF8844, inset 0 0 12px #00FF8811;
}

/* スキャンラインオーバーレイ */
.scanlines {
  position: fixed; inset: 0; pointer-events: none; z-index: 999;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px);
}
```

```js
// タイピングアニメーション（Hero背景テキスト）
const lines = ['> initializing portfolio...', '> loading components...', '> ready.'];
let lineIdx = 0, charIdx = 0;
function type() {
  if (charIdx < lines[lineIdx].length) {
    terminal.textContent += lines[lineIdx][charIdx++];
    setTimeout(type, 60);
  } else { lineIdx = (lineIdx + 1) % lines.length; charIdx = 0; setTimeout(type, 1200); }
}
type();
```

---

### E - Ethereal（エセリアル）

```css
/* 雲Blobのdriftアニメーション */
.cloud-blob { position: absolute; border-radius: 50%; filter: blur(80px); animation: cloud-drift var(--dur, 20s) ease-in-out infinite alternate; }
@keyframes cloud-drift {
  from { transform: translate(var(--x1, -20px), var(--y1, -10px)); }
  to   { transform: translate(var(--x2,  20px), var(--y2,  15px)); }
}

/* 有機形状の作品画像 */
.work-image {
  clip-path: polygon(30% 0%, 70% 5%, 100% 30%, 95% 70%, 70% 100%, 30% 95%, 0% 70%, 5% 30%);
  transition: clip-path 0.6s ease;
}
.work-image:hover { clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%); }
```

---

### F - Film（フィルム）

```js
// 横スクロール（GSAP ScrollTrigger水平パネル）
gsap.to('.film-panels', {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.filmstrip-section',
    pin: true,
    scrub: 1,
    snap: 1 / (panels.length - 1),
    end: () => `+=${filmstrip.offsetWidth}`
  }
});
```

```css
/* ホバーフィルター: モノクロ → セピア → カラー */
.film-panel__image { filter: grayscale(100%); transition: filter 0.6s; }
.film-panel:hover .film-panel__image { filter: sepia(60%); }
.film-panel:hover:hover .film-panel__image { filter: sepia(0%); } /* JSでダブルクリック or dwell */
```

---

### G - Glassmorphism（グラスモーフィズム）

```css
/* Apple級ガラスカード */
.glass-card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
}

/* Sheenアニメーション（Hoverで光の帯が走る） */
.glass-card::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%);
  background-size: 200% 100%;
  background-position: -100% 0;
  transition: background-position 0.6s;
}
.glass-card:hover::after { background-position: 200% 0; }
```

---

### H - Holographic（ホログラム）

```js
// マウス位置でカードを3D Tilt + 虹色グラデシフト
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
    card.style.background = `linear-gradient(${Math.atan2(y, x) * (180/Math.PI)}deg, #FF0080, #00FF88, #0080FF)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
```

---

### I - Infinite（無限宇宙）

```js
// Canvas スター ワープ パーティクル（スクロール速度連動）
const stars = Array.from({length: 300}, () => ({
  x: Math.random() * W, y: Math.random() * H, z: Math.random() * W, pz: 0
}));
function draw() {
  ctx.fillStyle = 'rgba(11,13,23,0.2)'; ctx.fillRect(0,0,W,H);
  const speed = 1 + scrollVelocity * 3; // scroll速度で加速
  stars.forEach(s => {
    s.pz = s.z;
    s.z -= speed;
    if (s.z <= 0) { s.x = Math.random() * W; s.y = Math.random() * H; s.z = W; s.pz = s.z; }
    const sx = (s.x - W/2) * (W / s.z) + W/2;
    const sy = (s.y - H/2) * (W / s.z) + H/2;
    const px = (s.x - W/2) * (W / s.pz) + W/2;
    const py = (s.y - H/2) * (W / s.pz) + H/2;
    ctx.strokeStyle = `rgba(255,255,255,${1 - s.z/W})`;
    ctx.lineWidth = (1 - s.z/W) * 2;
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
  });
  requestAnimationFrame(draw);
}
```

---

### J - Journal（ジャーナル）

```css
/* 2段組みレイアウト（新聞スタイル） */
.article-body { columns: 2; column-gap: 3rem; column-rule: 1px solid #2C3E5030; }
@media (max-width: 768px) { .article-body { columns: 1; } }

/* ドロップキャップ */
.article-body p:first-of-type::first-letter {
  font-size: 5rem; line-height: 1; float: left;
  font-family: 'Playfair Display', serif; font-weight: 700;
  color: #E74C3C; margin: 0 0.1em -0.1em 0;
  padding: 0.05em 0.1em 0 0;
}
```

---

### K - Kinetic（キネティック）

```js
// 文字落下 + クリックで弾き飛ばし（Matter.js）
import Matter from 'matter-js';
const { Engine, Bodies, World, Events } = Matter;
const engine = Engine.create({ gravity: { y: 1 } });
const letters = [...'KINETIC'].map((char, i) => {
  const body = Bodies.rectangle(100 + i * 80, -50, 60, 60, { restitution: 0.6 });
  body.char = char;
  World.add(engine.world, body);
  return body;
});
// Render: requestAnimationFrame でcanvasに描画
```

---

### L - Line（ライン）

```js
// SVG線描画アニメーション（ScrollTrigger）
gsap.utils.toArray('.svg-line').forEach(line => {
  const length = line.getTotalLength();
  gsap.from(line, {
    strokeDasharray: length, strokeDashoffset: length,
    duration: 1.5, ease: 'power2.out',
    scrollTrigger: { trigger: line, start: 'top 85%' }
  });
});
```

```css
/* テーブル碁盤目レイアウト（Worksセクション） */
.works-table { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid #000; }
.works-cell { border: 1px solid #000; padding: 1.5rem; transition: background 0.2s, color 0.2s; }
.works-cell:hover { background: #000; color: #fff; }
```

---

### M - Minimal（ミニマル）

```js
// SplitType — 文字単位Revealアニメーション
import SplitType from 'split-type';
document.querySelectorAll('[data-split]').forEach(el => {
  const split = new SplitType(el, { types: 'chars' });
  gsap.from(split.chars, {
    y: 40, opacity: 0, stagger: 0.03, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 90%' }
  });
});
```

---

### N - Neon（ネオン）

```css
/* 本物のネオン管：4層text-shadow */
.neon-text {
  color: #FF10F0;
  text-shadow:
    0 0 4px  #FF10F0,
    0 0 12px #FF10F0,
    0 0 30px #FF10F0,
    0 0 80px #FF10F066;
  animation: neon-flicker 4s infinite;
}
@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: 0.4; }
}

/* イコライザー風スキルバー */
.eq-bar { animation: eq-bounce var(--dur, 0.8s) ease-in-out infinite alternate; }
@keyframes eq-bounce { from { transform: scaleY(0.3); } to { transform: scaleY(1); } }
```

---

### O - Obsidian（黒曜石）

```css
/* 石のノイズテクスチャ（SVG feTurbulence） */
.obsidian-texture {
  position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.06;
  filter: url(#obsidian-noise);
}
/* SVG filter定義: <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" /> */

/* スクロール連動スポットライト */
.spotlight {
  position: fixed; width: 300px; height: 300px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,0,64,0.15) 0%, transparent 70%);
  pointer-events: none; transform: translateX(-50%);
  top: calc(var(--scroll-pct, 0) * 100vh);
  transition: top 0.1s linear;
}
```

---

### P - Paper（ペーパー）

```css
/* コルクボードのランダム傾き */
.pin-card { transform: rotate(var(--rot, -2deg)); transition: transform 0.3s, box-shadow 0.3s; }
.pin-card:hover { transform: rotate(0deg); box-shadow: 0 20px 60px rgba(0,0,0,0.25); }

/* 便箋の横線 */
.notepad-bg {
  background-image: repeating-linear-gradient(
    180deg, transparent, transparent 27px, #8B735533 27px, #8B735533 28px
  );
  background-position: 0 1.5rem; /* ベースライン合わせ */
}
```

---

### Q - Quantum（量子）

```js
// Canvas: 粒子ネットワーク（マウスへの反発付き）
function updateParticles() {
  particles.forEach(p => {
    const dx = p.x - mouse.x, dy = p.y - mouse.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 100) { p.vx += (dx / dist) * 0.5; p.vy += (dy / dist) * 0.5; }
    p.x += p.vx *= 0.97; p.y += p.vy *= 0.97;
    // 壁で反射
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  });
  // エッジ描画
  particles.forEach((a, i) => particles.slice(i+1).forEach(b => {
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d < 120) {
      ctx.strokeStyle = `rgba(0,204,255,${1 - d/120})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
  }));
}
```

---

### R - Retro（レトロ）

```css
/* VHSスキャンライン（常時） */
.crt-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 9998;
  background: repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 4px);
}

/* RGBカラー収差（グリッチ） */
.glitch-text {
  position: relative;
  text-shadow: -2px 0 #FF00FF, 2px 2px #00FFFF;
  animation: glitch-shift 3s steps(1) infinite;
}
@keyframes glitch-shift {
  0%, 95%, 100% { text-shadow: -2px 0 #FF00FF, 2px 2px #00FFFF; }
  96% { text-shadow: 2px 0 #FF00FF, -2px -2px #00FFFF; clip-path: inset(20% 0 60% 0); }
  98% { text-shadow: -3px 0 #FF00FF, 3px 1px #00FFFF; clip-path: inset(60% 0 10% 0); }
}
```

---

### S - Space（宇宙）

```css
/* CSS 惑星公転アニメーション */
.orbit-path {
  position: absolute; border-radius: 50%; border: 1px dashed rgba(255,255,255,0.2);
  animation: orbit-spin var(--dur, 20s) linear infinite;
  transform-origin: center;
}
.planet {
  position: absolute; border-radius: 50%;
  top: 0; left: 50%; transform: translateX(-50%) translateY(-50%);
}
@keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
```

---

### T - Typography（タイポグラフィ）

```css
/* バックグラウンドOutlineテキスト + 逆方向Parallax */
.bg-typography {
  position: absolute; white-space: nowrap; font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 900; -webkit-text-stroke: 1px rgba(0,0,0,0.08);
  color: transparent; user-select: none;
  will-change: transform; /* GSAP ScrollTrigger で translateX */
}
```

```js
// 逆スクロールParallax
gsap.to('.bg-typography--left',  { xPercent: -15, ease: 'none', scrollTrigger: { scrub: 1 } });
gsap.to('.bg-typography--right', { xPercent:  15, ease: 'none', scrollTrigger: { scrub: 1 } });
```

---

### U - Underwater（水中）

```html
<!-- SVGフィルター定義 -->
<svg class="water-filter" style="display:none">
  <defs>
    <filter id="water-distort">
      <feTurbulence type="turbulence" baseFrequency="0.012 0.008" numOctaves="3" seed="2" result="noise">
        <animate attributeName="baseFrequency" values="0.012 0.008;0.01 0.012;0.012 0.008" dur="8s" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
</svg>
```

```css
/* 全体に水中のゆらぎを適用 */
.hero__content { filter: url(#water-distort); }

/* 泡パーティクル */
.bubble { border-radius: 50%; background: rgba(255,255,255,0.3); position: absolute;
  animation: bubble-rise var(--dur, 6s) ease-in infinite; bottom: 0; }
@keyframes bubble-rise {
  from { transform: translateY(0) scale(1); opacity: 0.8; }
  to   { transform: translateY(-100vh) scale(1.3); opacity: 0; }
}
```

---

### V - Vintage（ヴィンテージ）

```css
/* ビネット（四隅暗変）+ ホコリ・傷テクスチャ */
body::after {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 9000;
  background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%);
  background-blend-mode: multiply;
}
/* ホコリPNGをoverlay */
.dust-overlay { position: fixed; inset: 0; pointer-events: none; z-index: 9001;
  background-image: url('dust.png'); opacity: 0.12; mix-blend-mode: screen; }

/* セピア→カラーHover変化 */
.folio-image { filter: sepia(80%) brightness(0.9); transition: filter 0.8s; }
.folio-image:hover { filter: sepia(0%) brightness(1); }
```

---

### W - Watercolor（水彩）

```css
/* セクション境界をブラシシェイプでマスク */
.hero {
  -webkit-mask-image: url('brush-mask.svg');
  mask-image: url('brush-mask.svg');
  -webkit-mask-position: bottom; mask-position: bottom;
  -webkit-mask-size: 100% auto; mask-size: 100% auto;
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
}

/* 色が広がる背景アニメーション（絵の具の滲み） */
.wash {
  border-radius: 50%; filter: blur(80px); opacity: 0.6;
  animation: wash-spread var(--dur, 12s) ease-in-out infinite alternate;
}
@keyframes wash-spread {
  from { transform: scale(1) translate(0, 0); }
  to   { transform: scale(1.3) translate(20px, -10px); }
}
```

---

### X - Xenon（キセノン）

```css
/* Sheenアニメーション（カード上を光の帯が走る） */
.work-card { position: relative; overflow: hidden; }
.work-card::after {
  content: '';
  position: absolute; top: -50%; left: -75%; width: 50%; height: 200%;
  background: linear-gradient(105deg, transparent, rgba(255,255,255,0.4), transparent);
  transform: skewX(-15deg);
  transition: left 0.7s ease;
}
.work-card:hover::after { left: 150%; }

/* SVGアークダイヤルゲージ */
.dial-gauge circle.fill {
  stroke-dasharray: var(--circumference);
  stroke-dashoffset: calc(var(--circumference) * (1 - var(--level)));
  transition: stroke-dashoffset 1.5s ease;
}
```

---

### Y - Yarn（ヤーン）

```css
/* 全ボーダーをdashed（縫い目）で統一 */
.maker__card, .stitch-card {
  border: 2px dashed #D2691E;
  border-radius: 24px;
}

/* 封筒フラップHoverアニメーション */
.envelope__flap {
  transform-origin: top center;
  transform: rotateX(0deg);
  transition: transform 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
.envelope:hover .envelope__flap { transform: rotateX(-180deg); }
```

---

### Z - Zen（禅）

```css
/* 縦書きレイアウト */
.section__label-vertical {
  writing-mode: vertical-rl; text-orientation: mixed;
  letter-spacing: 0.3em; font-size: 0.75rem;
}

/* 枯山水砂紋パターン */
.karesansui-bg {
  background-image: url("data:image/svg+xml, <svg ...波紋SVGパターン...>");
  opacity: 0.1;
}
```

```js
// 筆文字SVGアニメーション（ページロード時）
const paths = document.querySelectorAll('.sumi-path');
paths.forEach((path, i) => {
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;
  gsap.to(path, {
    strokeDashoffset: 0, duration: 1.5 + i * 0.3,
    ease: 'power2.inOut', delay: 0.5 + i * 0.4
  });
});
```

---

## 📐 共通アニメーション設定値（Design Token）

```css
/* アニメーション速度 */
--duration-fast:    0.2s;
--duration-normal:  0.4s;
--duration-slow:    0.8s;
--duration-dramatic: 2s;

/* イージング */
--ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out:     cubic-bezier(0.76, 0, 0.24, 1);
--ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1); /* バネ感 */

/* Reveal stagger */
--stagger-fast:    50ms;
--stagger-normal: 100ms;
--stagger-slow:   200ms;
```

---

*Portfolio Design Specifications v2.0 — Effects Appendix*
*実装時はこのレシピをそのままAIへの実装プロンプトに含めること。*

---

# 🎭 Appendix: Emotional Goals & Purchase Drivers
*Steve Jobs条件 + Jeff Bezos条件 — Board Meeting 2026-02-24 決定事項*

## 感情的ゴール（Emotional Goal）
> 「Heroを見た瞬間、ユーザーが感じるべき感情を一文で定義する。実装者はこの感情を達成するためにデザインを判断せよ。」 — Steve Jobs

## 購入動機（Purchase Driver）
> 「購入者はどんなキーワードで検索し、何に共感してテンプレートを買うかを定義する。」 — Jeff Bezos

---

| Template            | 感情的ゴール                                                                           | 購入動機（検索キーワード）                                            |
| ------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **A Aurora**        | Heroを見た瞬間、自分が北極の空の下に立ち、頭上に本物のオーロラが広がっていると錯覚する | `aurora portfolio template` / `gradient animation portfolio`          |
| **B Blueprint**     | 画面を開いた瞬間、自分が大企業の設計資料室に入り込んだような技術的権威を感じる         | `engineer portfolio template` / `technical dark blue portfolio`       |
| **C Cinematic**     | 映画が始まる直前の「映画館の暗闇」の高揚感と静寂を感じる                               | `cinematic portfolio template` / `filmmaker portfolio dark`           |
| **D Darkmode**      | ハイエンドな開発者ツールを起動したときの、洗練された機能美と黒への安心感               | `dark mode developer portfolio` / `hacker portfolio template`         |
| **E Ethereal**      | 朝の雲の中を飛んでいるような、重力から解放された浮遊感と清潔さ                         | `ethereal pastel portfolio` / `dreamy feminine portfolio template`    |
| **F Film**          | 古いフィルムカメラのシャッターを切る瞬間の、アナログな緊張感と詩情                     | `film photography portfolio` / `analog dark room portfolio`           |
| **G Glassmorphism** | Apple StoreのガラスのテーブルにiPhoneが置かれているような、現代的な透明の高級感        | `glassmorphism portfolio template` / `apple style portfolio`          |
| **H Holographic**   | NFTカードを傾けて虹色が流れる瞬間の、子供のような純粋な驚きと未来感                    | `holographic portfolio template` / `nft artist portfolio`             |
| **I Infinite**      | ロケットが大気圏を抜けた瞬間、窓の外に無限の宇宙が広がったときの沈黙と畏敬             | `space portfolio template` / `infinite scroll universe portfolio`     |
| **J Journal**       | 高級書店で手に取った、厚みのある装丁の美しい写真集の最初のページを開く感覚             | `editorial portfolio template` / `magazine style portfolio`           |
| **K Kinetic**       | 物理の法則に従って動く要素に触れた瞬間の、「このサイト生きている」という驚きと喜び     | `interactive portfolio template` / `physics animation portfolio`      |
| **L Line**          | 建築の設計図や高級ブランドのシンプルなロゴを見たときの、無駄のない完成形への満足       | `minimalist line portfolio` / `architect portfolio template`          |
| **M Minimal**       | 美術館の真っ白な壁に一枚の絵が孤立して掛かっているときの、余白が語りかける贅沢         | `ultra minimal portfolio` / `white space portfolio template`          |
| **N Neon**          | 深夜のクラブのロゴが点灯した瞬間の、音楽が鳴り始めるような期待感と興奮                 | `neon sign portfolio template` / `musician DJ portfolio`              |
| **O Obsidian**      | 高級ブランドの黒いボックスを開けた瞬間の、重厚で神秘的な高揚感                         | `luxury dark portfolio` / `obsidian premium portfolio template`       |
| **P Paper**         | 机の上に重なった手紙や資料を整理し始めたときの、温かみとアナログな安心感               | `paper texture portfolio` / `handmade craft portfolio template`       |
| **Q Quantum**       | 研究論文の図表で、自分が探していたパターンをついに見つけた瞬間の知的興奮               | `data scientist portfolio` / `particle network portfolio template`    |
| **R Retro**         | 幼少期に夢中になったゲームのタイトル画面が起動した瞬間の、ノスタルジーとワクワク感     | `retro vhs portfolio template` / `pixel art game developer portfolio` |
| **S Space**         | プラネタリウムのドームで、解説員が「これが私たちの太陽系です」と言った瞬間の静かな感動 | `space astronomy portfolio` / `3D solar system portfolio template`    |
| **T Typography**    | グラフィックデザインの展覧会で、文字だけで構成されたポスターの前に立ったときの美的発見 | `typography portfolio template` / `graphic design big text portfolio` |
| **U Underwater**    | スキューバダイビングで初めて水中に顔を沈めた瞬間の、音が消えて光が揺れる異世界感       | `underwater portfolio template` / `ocean diver portfolio`             |
| **V Vintage**       | 祖父の書斎でセピア色の写真アルバムを発見したときの、時間の重さと温もり                 | `vintage portfolio template` / `antique retro cream portfolio`        |
| **W Watercolor**    | 画家が筆で描いた水彩画の色が滲んで広がる瞬間の、偶然の美しさへの驚きと解放感           | `watercolor portfolio template` / `artist painter portfolio`          |
| **X Xenon**         | 高速道路でキセノンヘッドライトが暗闇を切り裂く瞬間の、鋭さと速度への興奮               | `xenon light portfolio` / `automotive industrial design portfolio`    |
| **Y Yarn**          | 完成したニット作品を手に取ったときの、温もりと「自分の手で作った」達成感               | `handmade craft portfolio template` / `knitting apparel portfolio`    |
| **Z Zen**           | 京都の枯山水の前に座り、砂紋と石だけの空間に向き合ったときの完全な静寂と無心           | `japanese zen portfolio template` / `wabi sabi minimal portfolio`     |

---

## 仕様書の使い方（実装者へ）

この `design-specs.md` は **3層構造** になっています：

```
Layer 1: Layout Architecture   — HTMLのセクション構成（最重要。必ず従うこと）
Layer 2: Effect Recipes        — CSS/JSの具体的実装コード（そのまま使うこと）
Layer 3: Emotional Goals       — 完成物の品質判断基準（これを満たさないとNG）
```

**実装プロンプトの作り方:**
1. 対象テンプレートの `Layout Architecture` をそのままコピー
2. `Effect Recipes` の対応セクションをコピー
3. `Emotional Goal` を末尾に追加し「この感情を達成するデザインにしてください」と指示
4. Opencodeに投げる

---

*Portfolio Design Specifications v2.0 — FINAL*
*Board Approved: 2026-02-24 | 全員一致可決*
