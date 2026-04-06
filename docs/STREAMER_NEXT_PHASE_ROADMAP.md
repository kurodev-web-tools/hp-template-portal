# Streamer Templates Next Phase Roadmap (Integrated Edition)

このドキュメントは、全26テンプレートへの「魔法の演出」の実装と、配信状況をリアルタイムに伝える「ステータス連動」を両立させるための、製品完成に向けた最終ロードマップです。

---

## 1. 二層のインタラクション設計

### 🎭 層1：職人的UX「魔法の演出」(Interactivity for Joy)
閲覧者がサイトを操作した際の「楽しさ・驚き」を提供し、プレミアム感を演出する。
- 各テンプレート固有の独自ギミック。

### 📡 層2：AIステータス連動「自動ステータス・インジケーター」(Activity Communication)
配信状況（LIVE/OFFLINE）を自動で判別し、視聴者を適切な場所へ誘導する。
- **Dual-Status表示**: 配信中とオフライン時で表示を切り替える。
  - **LIVE（配信中）**: 視覚的に際立つ演出で「今すぐ視聴」を促す（例：● LIVE）。
  - **OFFLINE（活動休止中）**: 控えめながらも「アーカイブ視聴」や「チャンネル登録」を促す（例：🎬 ARCHIVE / 📺 CHANNEL）。
- **チャンネル遷移**: インジケーターをクリックすると、設定された配信URLへ自動遷移。
- **データ駆動**: URLパラメータ `?live=true` や `?channel_url=...` で状態を一括制御。

---

## 2. 全26テンプレート：演出・デザイン一覧

| ID    | テンプレート名      | ① 魔法の演出 (JOY)                       | ② LIVE時の表示デザイン (STATUS)          |
| :---- | :------------------ | :--------------------------------------- | :--------------------------------------- |
| **A** | **Neon Abyss**      | **RGB Glitch Hover**: 分離・振動演出     | ロゴ横にネオンの「LIVE」テキストが浮遊   |
| **B** | **Cyber Pulse**     | **Audio Sync Pulse**: 声に反応する脈動   | ロゴ横に脈動する赤ドット                 |
| **C** | **Aurora**          | **Color Flow**: 光の霧の変化             | ロゴ周辺に赤いオーロラの「光の霧」       |
| **D** | **Digital Ghost**   | **Hover Decrypt**: 文字化けの高速解読    | ロゴ直後に `[ON AIR]` スキャンテキスト   |
| **E** | **E-Sports Pro**    | **Stat Counter**: 数値高速カウントアップ | ロゴの右肩に赤い通知バッジ               |
| **F** | **Future Tech**     | **Hex-Grid Reactive**: グリッドの反応    | サイドバーアイコンが赤いリング状に発光   |
| **G** | **Glitch Core**     | **Random Error Jitter**: 意図的なバグ    | ロゴが赤変し、ノイズ混じりの「[LIVE]」   |
| **H** | **Horror Mansion**  | **Flashlight Cursor**: 懐中電灯演出      | ロゴ横に赤い「血の滴り」または「光る目」 |
| **I** | **Idol Stage**      | **Falling Sparkle**: キラキラ降下粒子    | ロゴ周囲に赤いハートや粒子が高速舞う     |
| **J** | **Jazz Lounge**     | **Rhythmic Stagger**: ビートフェードイン | ロゴ横に赤い「ON AIR」看板が点灯         |
| **K** | **Knight Honor**    | **Parchment Unroll**: 羊皮紙展開         | ロゴの盾部分が赤く燃え上がる             |
| **L** | **Lunar Phase**     | **Real-time Moon**: 月の満ち欠け同期     | 右下オービットボタンの中央が赤く発光     |
| **M** | **Metallic Chrome** | **Liquid Metal Trail**: 水銀の残像       | ロゴの両サイドに赤いLEDランプが点灯      |
| **N** | **Neon Night**      | **Flickering Neon**: ネオンフリッカー    | ロゴ横の看板が激しくフリッカー点滅       |
| **O** | **Orbit Space**     | **Draggable Planet**: 惑星ドラッグ遊び   | 衛星が赤く発光し、軌道が変化する         |
| **P** | **Pixel Retro**     | **Block Build**: ブロック積み上がり      | ロゴ横にドット絵「！」または「LIVE」     |
| **Q** | **Quest Log**       | **Page Turn**: ページめくり              | ロゴの羊皮紙に赤い「封蝋」が押される     |
| **R** | **Rogue Stealth**   | **Stealth Alpha**: 隠れ身の術演出        | ロゴ横に赤い「ターゲット」マークが出現   |
| **S** | **Steampunk Gear**  | **Gear & Steam**: 歯車と蒸気噴出         | メーターが赤くなり、蒸気が噴き出す       |
| **T** | **Tech Logic**      | **Circuit Trace**: 回路の光の走査        | ネットワークノードのロゴ中心が赤く接続   |
| **U** | **Urban Graffiti**  | **Spray Dispersion**: スプレー飛沫       | ロゴ周辺に赤いスプレーで「NOW!!」落書き  |
| **V** | **Vivid Glitch**    | **Color Splash**: クリック時の波紋       | ロゴが赤い強烈なフラッシュを繰り返す     |
| **W** | **Wide Pan**        | **Depth Parallax**: 深度パララックス     | 画像ロゴ右上に赤い「● REC」ランプ        |
| **X** | **Xtreme Snap**     | **Gravity Warp**: 衝撃波と画面の歪み     | ロゴが激しく振動し、赤い衝撃波が出る     |
| **Y** | **Yield Chart**     | **Gold Glint**: コインのような反射       | ロゴが赤金に変色し、「ACTIVE」表示       |
| **Z** | **Zen Master**      | **Ink Bleed**: 墨のにじみ/筆跡演出       | 右上に赤い「落款（はんこ）」が押される   |

---

## 3. 実装の優先順位

1.  **[基盤] 共通エンジンの完全化**: `template-common.js` への「チャンネル遷移」と「ステータス反映」の一括実装。
2.  **[基盤] HTMLへのスタブ追加**: 全26種 `index.html` への `data-` 属性の一括付与（Opencode Swarm）。
3.  **[個別] LIVEデザインの実装**: 視覚的インパクトの強い A, B, D, X, Z から開始。
4.  **[個別] 魔法の演出の実装**: 操作の楽しさを追加。
5.  **[刷新] Anti-Lorem Ipsum**: テキストコンテンツの全面更新。
