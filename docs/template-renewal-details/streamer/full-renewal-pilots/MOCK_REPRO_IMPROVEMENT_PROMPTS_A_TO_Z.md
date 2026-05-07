# Streamer Mock Reproduction Improvement Prompts A-Z

## Usage

このファイルは、`streamer/full-renewal-integration` に統合済みの streamer A-Z を、各テンプレート別セッション / 別 worktree でモック再現度 90% 目標まで改善するための指示プロンプト集です。

各セッションでは、対象テンプレート 1 件だけを扱ってください。別テンプレートや shared registry まで広げるとレビュー単位が崩れます。

## Common Contract For Every Session

各テンプレートのプロンプトを貼る前提で、以下の契約は全テンプレート共通です。

```text
重要:
- main へは接続しないでください。
- `streamer/full-renewal-integration` を base に、対象テンプレート専用の worktree / branch を作ってください。
- 1テンプレート = 1セッション = 1worktree = 1branch = 1PR の単位で進めてください。
- 変更範囲は原則 `public/templates/streamer/<letter>/**` のみです。
- 共有ファイル、`public/assets/js/data.js`、テンプレート一覧、モーダル、レジストリ、サムネイル、`task.md`、`docs/PLAN.md` は触らないでください。
- 共有更新が必要に見える場合は実装せず、最終報告に「integration branch 側で対応する共有更新」として列挙してください。
- Three.js、canvas、粒子、重い animation library、scroll hijacking は追加しないでください。
- 既存の `prefers-reduced-motion` 対応は維持し、動きを止めても Hero / Live / Schedule / Follow / Contact が読める状態にしてください。

目標:
- ピクセル完全一致ではなく、モック再現度 90% を目指してください。
- 特に first viewport の構図、カード形状、装飾オブジェクト、配置、質感、テーマ固有エフェクトを重視してください。
- モックでおしゃれなカード、額縁、ゲージ、シール、パネル、切り欠き、ステッカー、巻物、HUD になっている箇所を、実装でただの四角い枠にしないでください。
- キャラクター画像そのものは完全一致不要ですが、モックがキャラクター存在感に依存している場合は、CSS/SVG/ローカル装飾で「そのテンプレートの主役」として成立する代替ビジュアルを作ってください。

改善ループ:
1. 参照 mock、現状実装、DESIGN.md、IMPLEMENTATION_PLAN.md を確認する。
2. 現状の first viewport を 1440x900 でスクリーンショットする。
3. mock と現状を比較し、足りない object / card shape / placement / effect を短く列挙する。
4. 改善を実装する。
5. local server で確認し、1440x900 スクリーンショットを再取得する。
6. mock 再現度が 90% に届いていない場合は、理由を特定して再度改善する。
7. 90% 目標に到達するまで 3-6 を繰り返す。時間切れや技術制約がある場合だけ、未達理由と次の具体策を最終報告に残す。

検証:
- `node scripts/audit-template-links.js`
- `node scripts/audit-template-metadata.js`
- `git diff --check`
- 対象テンプレートの 1440x900 first viewport screenshot
- 必要に応じて mobile viewport も確認

最終報告:
- 変更ファイル
- mock 再現度を上げた点
- まだ mock と差が残る点
- 実装したテーマ固有エフェクト
- 検証結果
- PR base / compare
```

## A: Abyss Neon

```text
D:\hp-portal で streamer A / Abyss Neon のモック再現度改善を進めてください。

Branch / worktree:
- 作業前に `git fetch origin` を実行してください。
- 最新の `origin/streamer/full-renewal-integration` から `codex/streamer-a-mock-repro` を作成してください。
- worktree は `D:\hp-portal-worktrees\streamer-a-mock-repro` を使ってください。
- PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-a-mock-repro` です。

Scope:
- 変更範囲は `public/templates/streamer/a/**` のみです。
- shared files、サムネイル、`task.md`、`docs/PLAN.md` は触らないでください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/polish/a-abyss-neon-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/a-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/a-abyss-neon/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/a-abyss-neon/IMPLEMENTATION_PLAN.md`

Target:
- 目標は mock 再現度 90% です。
- 現状は depth rail / sonar / live beacon / bottom dock はありますが、mock と比べると深海背景、キャラクター存在感、右上 LIVE の発光、下部 dock のカード形状が弱いです。

Required improvements:
- first viewport の深海感を強めてください。水圧レイヤー、暗い海底奥行き、泡、クラゲ、深海構造物のような装飾を CSS/SVG で追加し、単なる暗い円背景にしないでください。
- 中央の主役シルエットを、ただの抽象形ではなく「深海サイバー配信者の代替ビジュアル」として読めるようにしてください。髪・ヘッドセット・発光ライン・背面リングなどで存在感を上げてください。
- 左の depth rail は mock のように機械パネル感を強め、切り欠き、メーター目盛り、発光ポイント、submarine system block を整理してください。
- 右の LIVE sonar は赤 / pink の発光を強め、`LIVE` / `ON AIR` / 角度目盛りが mock と同程度に主役として見えるようにしてください。
- 下部 Schedule / Follow / Contact dock は 1440x900 の first viewport で読める位置に収め、ただの四角い枠ではなく sci-fi panel の切り欠き、内側ライン、角装飾を加えてください。
- Contact は fan action と business contact が混ざらないよう、制作相談 CTA を明確に維持してください。

Effects:
- `sonar-sweep` は維持してください。
- `live beacon pulse` をより見える状態にしてください。
- depth panel reveal は軽量 CSS / vanilla JS で維持し、reduced motion では停止してください。

Completion:
- mock と再取得 screenshot を見比べ、カード形状 / 配置 / deep-sea visual / live beacon / dock が 90% 目標に届くまで改善ループしてください。
```

## B: Boss Room

```text
D:\hp-portal で streamer B / Boss Room のモック再現度改善を進めてください。

Branch / worktree:
- `git fetch origin`
- base: `origin/streamer/full-renewal-integration`
- branch: `codex/streamer-b-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-b-mock-repro`
- PR base: `streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/b/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/b-boss-room-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/b-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/b-boss-room/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/b-boss-room/IMPLEMENTATION_PLAN.md`

Target:
- 現状は side rail / throne identity / next raid / boss status / follow / contract が揃っています。
- 90% へ上げるには、mock の豪華な throne / crest / gold filigree / red contract panel の装飾密度を実装に反映してください。

Required improvements:
- Hero 周辺に王座・紋章・額縁装飾を増やし、mock の「RPG boss room」感を強めてください。
- side rail の金属フレーム、セクションボタン、rank badge をより高級な boss UI にしてください。
- Boss Status / Follow / Contract のカードは、角装飾、金ライン、赤黒グラデーション、内側 border を追加し、ただの枠に見えないようにしてください。
- Next Raid の card は mock のような raid notice / status block / progress feel を強めてください。

Effects:
- `status-pulse` は維持してください。
- HP bar fill、panel reveal、contract glow を CSS first で見える状態にしてください。
- reduced motion では pulse / fill animation を止め、情報は表示してください。

Completion:
- mock と screenshot を比較し、王座感、カード装飾、boss UI、contract CTA が 90% 目標に届くまで改善ループしてください。
```

## C: Crystal Prism

```text
D:\hp-portal で streamer C / Crystal Prism のモック再現度改善を進めてください。

Branch / worktree:
- `git fetch origin`
- base: `origin/streamer/full-renewal-integration`
- branch: `codex/streamer-c-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-c-mock-repro`
- PR base: `streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/c/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/c-crystal-prism-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/c-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/c-crystal-prism/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/c-crystal-prism/IMPLEMENTATION_PLAN.md`

Target:
- C は最重要改善対象です。現状は淡い prism 背景と抽象 silhouette はありますが、mock の情報密度、浮遊カード、Live / Schedule / Follow / Contact の配置がほぼ再現できていません。
- 90% 目標まで first viewport をかなり作り直してください。

Required improvements:
- mock のように、左側に identity copy、中央に translucent prism character / main visual、右側に next live card、下部に floating prism cards / SNS / contact を配置してください。
- 単なる淡い背景にせず、ガラス板、prism shard、光の屈折、半透明 panel、浮遊 chip を複数配置してください。
- 現状の抽象 silhouette は弱いので、髪・マイク・音符・prism wing などの形で Crystal Prism らしい主役ビジュアルへ強化してください。
- card は白い四角ではなく、glassmorphism panel、薄い border、内側 highlight、角の prism accent を持つ形にしてください。
- Live / Schedule / Follow / Contact は first viewport 内で見える位置に整理し、mock の導線密度に寄せてください。

Effects:
- `prism-shimmer` と `soft-live-glow` を visible glass/prism objects に適用してください。
- floating panel reveal を CSS / vanilla JS で実装または強化してください。
- reduced motion では shimmer / floating を停止してください。

Completion:
- 現状との差が大きいため、1回の編集で終わらせず、screenshot 比較で 90% に届くまでレイアウト・カード・主役ビジュアルを改善ループしてください。
```

## D: Digital Ghost

```text
D:\hp-portal で streamer D / Digital Ghost のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-d-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-d-mock-repro`
- base: `origin/streamer/full-renewal-integration`
- PR base: `streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/d/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/d-digital-ghost-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/d-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/d-digital-ghost/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/d-digital-ghost/IMPLEMENTATION_PLAN.md`

Target:
- 現状は terminal HUD と green live panel は近いですが、mock の下部 follow/contact と ghost terminal layering の密度が不足しています。

Required improvements:
- left terminal rail、center ghost visual、right live stack の構図は維持しつつ、lower object row を mock に近い密度へ上げてください。
- skull / access / glitch marker / terminal prompt など、Digital Ghost 固有の小物を増やしてください。
- card は黒緑の四角ではなく、terminal window、scan line、corner bracket、status chip、inner grid を持つ形にしてください。
- fan follow と business contact が first viewport で見えるように配置を調整してください。

Effects:
- `terminal boot`、`access scan`、`ghost line flicker` を見える状態にしてください。
- 既存の `scan-drift` / `ghost-line-flicker` は維持し、reduced motion で停止してください。

Completion:
- terminal HUD、ghost visual、lower cards、scan effect が mock の意図に 90% 近づくまで改善ループしてください。
```

## E: E-Sports Pro

```text
D:\hp-portal で streamer E / E-Sports Pro のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-e-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-e-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/e/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/partial-renewal/e-e-sports-pro-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/e-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/e-e-sports-pro/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/e-e-sports-pro/IMPLEMENTATION_PLAN.md`

Target:
- scoreboard header、side roster、match panel、stats はありますが、mock の game-scene visual、sponsor/platform strip、competitive HUD の密度が不足しています。

Required improvements:
- center match image / arena card を mock に近い主役感へ強化してください。
- scoreboard は単なる矩形ではなく、team score、timer、status light、match metadata を持つ broadcast overlay として磨いてください。
- side roster / player card / stats card は e-sports UI らしい avatar chip、rank badge、team color、division line を増やしてください。
- bottom sponsor / platform / contact strip を mock に近い密度にしてください。

Effects:
- `score ticker reveal`、`match panel reveal`、`live indicator pulse` を CSS first で見える状態にしてください。
- reduced motion 対応を維持してください。

Completion:
- mock と比較して broadcast overlay、match card、stats UI、platform strip が 90% に届くまで改善ループしてください。
```

## F: Future Tech

```text
D:\hp-portal で streamer F / Future Tech のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-f-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-f-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/f/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/f-future-tech-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/f-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/f-future-tech/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/f-future-tech/IMPLEMENTATION_PLAN.md`

Target:
- lab nav、central module、right live demo、schedule はありますが、mock の central diamond hologram と周辺 module の高級感が足りません。

Required improvements:
- central hologram をより精密な diamond / module object にしてください。光線、facet、inner core、ring label を追加してください。
- lab side navigation と data cards は bevel、micro label、module icon、thin grid を増やしてください。
- right live demo / next stream card は mock のように broadcast module として情報密度を上げてください。
- cyan glow は強すぎず、mock の sci-fi lab らしい精密さを優先してください。

Effects:
- `lab-scan` と `hologram-pulse` を central object に効かせてください。
- module reveal を visible panel に適用してください。
- reduced motion で scan / pulse を停止してください。

Completion:
- hologram object、module cards、right live demo、data density が 90% に届くまで改善ループしてください。
```

## G: Glitch Core

```text
D:\hp-portal で streamer G / Glitch Core のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-g-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-g-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/g/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/g-glitch-core-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/g-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/g-glitch-core/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/g-glitch-core/IMPLEMENTATION_PLAN.md`

Target:
- 現状は glitch palette と angular cards はありますが、mock の character art、sticker density、diagonal stacked cards の勢いが不足しています。

Required improvements:
- hero visual に glitch portrait / fragmented avatar / polygon shard など、主役として見える代替ビジュアルを追加してください。
- clip / live / schedule card は diagonal stack、offset、cut corner、sticker label を増やしてください。
- Follow / Contact は mock のように派手な sticker UI として first viewport に見えるようにしてください。
- 背景は scanline だけでなく、glitch block、pink/cyan shard、warning label を整理して追加してください。

Effects:
- `glitch snap` を hero title / card edge に見える形で入れてください。
- `clip panel reveal` と `sticker hover pulse` を維持してください。
- reduced motion でグリッチ移動や点滅を停止してください。

Completion:
- chaotic-but-controlled な Glitch Core らしさ、カード角度、sticker density が 90% に届くまで改善ループしてください。
```

## H: Horror Mansion

```text
D:\hp-portal で streamer H / Horror Mansion のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-h-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-h-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/h/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/h-horror-mansion-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/h-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/h-horror-mansion/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/h-horror-mansion/IMPLEMENTATION_PLAN.md`

Target:
- 現状は dark mansion mood はありますが、mock の ornate portrait、mansion map、invitation card、sealed contact の豪華さが不足しています。

Required improvements:
- 中央の portrait / silhouette を unfinished に見せず、額縁、肖像画、影、赤い seal、candle light で主役化してください。
- mansion map / floor plan / key / room marker など、Horror Mansion 固有オブジェクトを first viewport に配置してください。
- invitation / schedule / contact cards は parchment、wax seal、ornate frame、candle glow を持つ形にしてください。
- CTA は暗く沈めず、mock の sealed contact と同等に見つけやすくしてください。

Effects:
- `candle flicker` は実際の candle / light object に効かせてください。
- `invitation card reveal` と mansion map focus を CSS first で強化してください。
- reduced motion で flicker / reveal を停止してください。

Completion:
- portrait、map、invitation、sealed contact、candle atmosphere が 90% に届くまで改善ループしてください。
```

## I: Idol Stage

```text
D:\hp-portal で streamer I / Idol Stage のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-i-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-i-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/i/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/i-idol-stage-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/i-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/i-idol-stage/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/i-idol-stage/IMPLEMENTATION_PLAN.md`

Target:
- pink idol direction はありますが、mock の concert background、stage-light density、fan club / goods / live cards の量が不足しています。

Required improvements:
- hero background に concert light、audience glow、stage rig、sparkle を追加してください。
- central idol silhouette は単なる形ではなく、stage performer として見えるように hair/ribbon/mic/light cone を足してください。
- lower cards は mock のように Live / Fan Club / Goods / Contact がそれぞれ個性ある ticket/card 形状になるようにしてください。
- Next Live card は white panel のままでも、ticket strip、star badge、pink border、live pulse を追加してください。

Effects:
- `stage-light-sweep`、`ticket-strip-reveal`、`live-badge-pulse` を visible objects に適用してください。
- reduced motion 対応を維持してください。

Completion:
- first viewport が idol concert page として 90% の密度と華やかさに届くまで改善ループしてください。
```

## J: Jazz Lounge

```text
D:\hp-portal で streamer J / Jazz Lounge のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-j-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-j-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/j/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/j-jazz-lounge-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/j-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/j-jazz-lounge/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/j-jazz-lounge/IMPLEMENTATION_PLAN.md`

Target:
- lounge composition は近いですが、mock の warm lamp、velvet curtain、microphone glow、小カードの高級感がまだ弱いです。

Required improvements:
- hero に velvet curtain / lamp glow / microphone highlight を強めてください。
- side nav は lounge menu として、gold line、active marker、table card 感を上げてください。
- Tonight / Schedule / Reservation cards は paper menu / jazz flyer / brass plate のような質感を持たせてください。
- Contact CTA は reservation panel として、mock の落ち着いた高級感に寄せてください。

Effects:
- `curtain fade`、`microphone glow`、`reservation panel reveal` を visible objects に効かせてください。
- reduced motion で glow/reveal を停止してください。

Completion:
- mock の lounge warmth、microphone、reservation cards が 90% に届くまで改善ループしてください。
```

## K: Knight Honor

```text
D:\hp-portal で streamer K / Knight Honor のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-k-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-k-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/k/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/polish/k-knight-honor-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/k-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/k-knight-honor/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/k-knight-honor/IMPLEMENTATION_PLAN.md`

Target:
- heraldic layout は近いですが、mock の knight portrait、banner folds、ornate frame が弱いです。

Required improvements:
- central hero を knight portrait / shield / banner object として強化してください。
- side nav、live、expedition、schedule、audience contact の各 panel に shield corner、gold trim、cloth fold、crest stamp を追加してください。
- blue/gold の高級感を維持し、ただの dashboard に見えないようにしてください。

Effects:
- `banner unfurl`、`crest shine`、`honor panel reveal` を visible objects に適用してください。
- reduced motion 対応を維持してください。

Completion:
- heraldic frame、crest、banner、expedition cards が 90% に届くまで改善ループしてください。
```

## L: Lunar Phase

```text
D:\hp-portal で streamer L / Lunar Phase のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-l-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-l-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/l/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/l-lunar-phase-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/l-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/l-lunar-phase/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/l-lunar-phase/IMPLEMENTATION_PLAN.md`

Target:
- L は高優先です。現状は月の雰囲気はありますが、mock の moonlit hero scene、dense left nav/follow、right live card の構成に届いていません。

Required improvements:
- hero title / CTA を first viewport 内でより高く、明確に見える位置へ調整してください。
- central visual は単なる moon/silhouette ではなく、月光・髪・背面 moon disc・orbit ring で Lunar Phase の主役として成立させてください。
- left nav / phase selector / follow chips を mock に近い密度で配置してください。
- right live card と schedule card を first viewport 内で見えるようにし、月相 chip、calendar mark、night card frame を追加してください。
- Contact / Follow が下に沈みすぎないようにしてください。

Effects:
- `moon phase reveal`、`orbit line glow`、`schedule fade-in` を visible phase objects に適用してください。
- reduced motion では orbit/glow movement を停止してください。

Completion:
- moonlit scene、phase chips、live card、schedule/follow/contact が 90% に届くまで改善ループしてください。
```

## M: Metallic Chrome

```text
D:\hp-portal で streamer M / Metallic Chrome のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-m-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-m-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/m/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/m-metallic-chrome-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/m-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/m-metallic-chrome/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/m-metallic-chrome/IMPLEMENTATION_PLAN.md`

Target:
- chrome UI はありますが、mock の metallic character/object と polished frame の質感が不足しています。

Required improvements:
- central object を simple placeholder から、chrome bust / monogram / reflective figure として見える形にしてください。
- Spec / Live Demo / Schedule / Contact cards に reflective edge、bevel、inner shine、metal plate label を追加してください。
- 白黒グレーだけで平坦にせず、反射ラインと青/白 highlight で metal surface を表現してください。

Effects:
- `chrome-sheen` を central object と card frame に走らせてください。
- `spec panel reveal` と `live demo glow` を visible cards に適用してください。
- reduced motion で sheen を停止してください。

Completion:
- chrome object、reflective cards、metal frame が 90% に届くまで改善ループしてください。
```

## N: Neon Night

```text
D:\hp-portal で streamer N / Neon Night のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-n-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-n-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/n/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/n-neon-night-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/n-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/n-neon-night/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/n-neon-night/IMPLEMENTATION_PLAN.md`

Target:
- neon club structure はありますが、mock の vivid city/night character、club stickers、bar sign、booking contact の濃さが足りません。

Required improvements:
- hero に neon street / club sign / character-like silhouette を追加し、夜街感を強めてください。
- left menu、live card、tonight card、schedule card に neon tube border、sign flicker、sticker label を増やしてください。
- Booking / Contact CTA は mock のような club counter / ticket card として見えるようにしてください。

Effects:
- `neon sign flicker` を actual neon signage に適用してください。
- `marquee reveal` と `schedule pulse` を維持してください。
- reduced motion で flicker / pulse を停止してください。

Completion:
- neon signage、city atmosphere、booking card、club density が 90% に届くまで改善ループしてください。
```

## O: Orbit Space

```text
D:\hp-portal で streamer O / Orbit Space のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-o-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-o-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/o/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/o-orbit-space-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/o-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/o-orbit-space/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/o-orbit-space/IMPLEMENTATION_PLAN.md`

Target:
- orbit dashboard はありますが、mock の space portrait、orbital rings、telemetry density が足りません。

Required improvements:
- central orbit visual を planet / portrait / orbit station のような主役 object に強化してください。
- orbital rings、mission dots、telemetry labels、starfield を増やしてください。
- right schedule/live panel と left telemetry panel は mock のように細かい data chip を持つ宇宙管制 UI にしてください。
- Follow / contact block は first viewport 内で見つけやすくしてください。

Effects:
- `orbital line sweep` を ring object に適用してください。
- `mission panel reveal` と `telemetry pulse` を visible cards に適用してください。
- reduced motion 対応を維持してください。

Completion:
- orbit rings、space object、telemetry cards、mission/schedule が 90% に届くまで改善ループしてください。
```

## P: Pixel Retro

```text
D:\hp-portal で streamer P / Pixel Retro のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-p-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-p-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/p/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/p-pixel-retro-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/p-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/p-pixel-retro/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/p-pixel-retro/IMPLEMENTATION_PLAN.md`

Target:
- save slot / pixel avatar / next stage は近いですが、mock の game cartridge、console frame、pixel detail をさらに上げてください。

Required improvements:
- save slot cards に selected state、pixel border、tiny icon、cartridge label を追加してください。
- central avatar card は pixel character としてより愛嬌と情報を持つようにしてください。
- next stage / schedule / contact は game UI window として、8-bit corner、scanline、button state を強めてください。

Effects:
- `pixel boot` を維持してください。
- `save slot select` と `steps hover` を visible UI に追加または強化してください。
- reduced motion 対応を維持してください。

Completion:
- game UI、pixel object、save slot、cartridge/card detail が 90% に届くまで改善ループしてください。
```

## Q: Quest Log

```text
D:\hp-portal で streamer Q / Quest Log のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-q-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-q-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/q/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/q-quest-log-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/q-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/q-quest-log/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/q-quest-log/IMPLEMENTATION_PLAN.md`

Target:
- quest board は見えますが、mock の fantasy character、parchment material、quest UI 装飾をさらに強めてください。

Required improvements:
- central quest card に fantasy portrait / relic / door / map などの主役 object を追加してください。
- left menu、schedule、party recruitment、guild contact は parchment edge、wax seal、ribbon、quest rank badge を持つ形にしてください。
- ただの緑/白カードに見えないよう、紙質・影・折り目・装飾線を追加してください。

Effects:
- `quest card unfold`、`seal stamp`、`schedule row reveal` を visible objects に適用してください。
- reduced motion で unfold / stamp を停止してください。

Completion:
- parchment material、quest board density、fantasy object、seal/contact が 90% に届くまで改善ループしてください。
```

## R: Rogue Stealth

```text
D:\hp-portal で streamer R / Rogue Stealth のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-r-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-r-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/r/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/r-rogue-stealth-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/r-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/r-rogue-stealth/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/r-rogue-stealth/IMPLEMENTATION_PLAN.md`

Target:
- tactical layout は近いですが、mock の cinematic stealth portrait と dossier layering を上げてください。

Required improvements:
- central agent silhouette を、hood / visor / tactical gear / shadow layers で主役化してください。
- map / intel / mission / schedule cards に document tabs、classified stamp、red alert、scan grid を追加してください。
- Follow / Contact は covert comms / dead drop のようなテーマ表現に寄せてください。

Effects:
- `dossier scan`、`mission card reveal`、`stealth signal pulse` を visible UI に適用してください。
- reduced motion 対応を維持してください。

Completion:
- stealth portrait、dossier texture、mission card、signal/contact が 90% に届くまで改善ループしてください。
```

## S: Steampunk Gear

```text
D:\hp-portal で streamer S / Steampunk Gear のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-s-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-s-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/s/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/polish/s-steampunk-gear-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/s-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/s-steampunk-gear/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/s-steampunk-gear/IMPLEMENTATION_PLAN.md`

Target:
- steampunk palette はありますが、mock の brass/wood frame、gear character、workbench objects が不足しています。

Required improvements:
- central hero に gear character / mechanic silhouette / brass portrait を追加してください。
- side rail、live、schedule、work order、contact cards に brass rivet、gear corners、pressure gauge、paper label を追加してください。
- frame はただの茶色い枠ではなく、金属・木・紙の素材差が見えるようにしてください。

Effects:
- `gear tick`、`gauge fill`、`workbench panel reveal` を visible objects に適用してください。
- reduced motion で gear/gauge animation を停止してください。

Completion:
- brass gear density、hero object、workbench panels、gauge/contact が 90% に届くまで改善ループしてください。
```

## T: Tech Logic

```text
D:\hp-portal で streamer T / Tech Logic のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-t-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-t-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/t/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/t-tech-logic-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/t-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/t-tech-logic/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/t-tech-logic/IMPLEMENTATION_PLAN.md`

Target:
- logic dashboard は近いですが、mock の circuit graph prominence と terminal module density を少し上げてください。

Required improvements:
- central graph をより明確な logic flow / circuit diagram として見せてください。
- node chips、connection labels、terminal tabs、code block card を追加または強化してください。
- Live / Schedule / Contact API cards は developer dashboard として整理し、細い grid と status color を整えてください。

Effects:
- `circuit trace`、`node reveal`、`logic panel pulse` を visible graph / node に効かせてください。
- reduced motion 対応を維持してください。

Completion:
- circuit graph、node chips、terminal panels、API contact が 90% に届くまで改善ループしてください。
```

## U: Urban Graffiti

```text
D:\hp-portal で streamer U / Urban Graffiti のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-u-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-u-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/u/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/u-urban-graffiti-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/u-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/u-urban-graffiti/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/u-urban-graffiti/IMPLEMENTATION_PLAN.md`

Target:
- U は高優先です。現状は clean poster page に寄っていますが、mock は graffiti stickers、torn posters、tapes、character illustration、dense lower cards が強いです。

Required improvements:
- hero に character-like graffiti portrait / torn poster / spray paint object を追加してください。
- side nav と live card は sticker、tape、hand-drawn label、rough border を持つ形にしてください。
- Schedule / Contact / Follow は clean card ではなく、貼り紙、ステッカー、チケット、路地看板のようなオブジェクトへ寄せてください。
- 背景に壁面 texture、paper tear、spray mark、small sticker を追加してください。ただし文字を読みにくくしないでください。

Effects:
- `poster paste`、`sticker pop`、`waveform pulse` を visible objects に適用してください。
- reduced motion では pop / pulse を停止してください。

Completion:
- graffiti density、torn poster/card shape、street object、booking contact が 90% に届くまで改善ループしてください。
```

## V: Vivid Glitch

```text
D:\hp-portal で streamer V / Vivid Glitch のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-v-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-v-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/v/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/v-vivid-glitch-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/v-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/v-vivid-glitch/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/v-vivid-glitch/IMPLEMENTATION_PLAN.md`

Target:
- 現状はかなり近いです。90% へ上げるため、illustrated character 代替、overlapping sticker texture、clip card depth を強化してください。

Required improvements:
- central card のキャラ/主役感を強め、ただの紙カードに見えないようにしてください。
- sticker cutout、torn label、neon tab、glitch edge を増やしてください。
- Live / Clip / Schedule / Goods / Contact は mock のように重なりと角度を持つカード群として整えてください。

Effects:
- `sticker slam`、`glitch cut`、`clip panel reveal` を visible objects に適用してください。
- reduced motion 対応を維持してください。

Completion:
- vivid sticker chaos、card overlap、glitch title、contact/goods objects が 90% に届くまで改善ループしてください。
```

## W: Wide Pan

```text
D:\hp-portal で streamer W / Wide Pan のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-w-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-w-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/w/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/polish/w-wide-pan-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/w-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/w-wide-pan/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/w-wide-pan/IMPLEMENTATION_PLAN.md`

Target:
- W は高優先です。現状は wide/panoramic direction はありますが、mock の cinematic panoramic scene と bottom media/contact panels の密度に届いていません。

Required improvements:
- hero に強い panoramic visual を追加してください。夜景、窓、映画的な光、横長 image substitute で wide pan の意味を明確にしてください。
- bottom に film strip / audio waveform / media card / contact card を mock に近い密度で配置してください。
- side CTA と nav は浮いたボタンではなく、wide media UI の一部として形状と色を整えてください。
- card はただの rectangle ではなく、cinema panel、timeline, frame edge, preview thumbnail を持たせてください。

Effects:
- `wide pan reveal`、`timeline slide`、`night light pulse` を film/timeline/window objects に適用してください。
- reduced motion 対応を維持してください。

Completion:
- panoramic hero、film/media panels、timeline/contact density が 90% に届くまで改善ループしてください。
```

## X: Xtreme Action

```text
D:\hp-portal で streamer X / Xtreme Action のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-x-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-x-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/x/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/x-xtreme-action-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/x-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/x-xtreme-action/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/x-xtreme-action/IMPLEMENTATION_PLAN.md`

Target:
- action layout は近いです。90% へ上げるため、action image、speed/gauge frame、diagonal object density を強化してください。

Required improvements:
- hero action visual に diagonal motion、vehicle/board/speed line のような object を足してください。
- speed gauge、live timer、sponsor chip、schedule card は angular frame と orange hazard accents を増やしてください。
- Contact / Sponsor CTA は mock のように action event card として目立たせてください。

Effects:
- `diagonal wipe`、`speed gauge fill`、`action card snap` を visible objects に適用してください。
- reduced motion 対応を維持してください。

Completion:
- speed/action density、angular cards、gauge/live/sponsor が 90% に届くまで改善ループしてください。
```

## Y: Yield Chart

```text
D:\hp-portal で streamer Y / Yield Chart のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-y-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-y-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/y/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/y-yield-chart-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/y-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/y-yield-chart/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/y-yield-chart/IMPLEMENTATION_PLAN.md`

Target:
- dashboard layout は近いです。90% へ上げるため、financial chart polish、metric annotations、sponsor/contact block を強化してください。

Required improvements:
- chart area に annotation chip、line glow、axis label、metric rise marker を追加してください。
- left KPI / right live / lower sponsor contact は dashboard card として glossy border、status chip、inner grid を強めてください。
- green accent は CTA / growth signal / status の役割が分かるように整理してください。

Effects:
- `chart draw`、`metric count-in`、`live signal pulse` を visible chart/KPI に適用してください。
- reduced motion 対応を維持してください。

Completion:
- chart fidelity、KPI density、dashboard card quality、sponsor/contact が 90% に届くまで改善ループしてください。
```

## Z: Zen Brush

```text
D:\hp-portal で streamer Z / Zen Brush のモック再現度改善を進めてください。

Branch / worktree:
- branch: `codex/streamer-z-mock-repro`
- worktree: `D:\hp-portal-worktrees\streamer-z-mock-repro`
- base: `origin/streamer/full-renewal-integration`

Scope:
- `public/templates/streamer/z/**` のみ変更してください。

References:
- Mock: `docs/template-renewal-details/streamer/mockup-image/polish/z-zen-brush-layout-v2.png`
- Current comparison: `artifacts/streamer-integration-review/compare-side-by-side/z-compare.jpg`
- Design: `docs/template-renewal-details/streamer/full-renewal-pilots/z-zen-brush/DESIGN.md`
- Plan: `docs/template-renewal-details/streamer/full-renewal-pilots/z-zen-brush/IMPLEMENTATION_PLAN.md`

Target:
- Z はかなり近いです。90% へ上げるため、ink illustration、brush texture、irregular paper edge、seal press を強化してください。

Required improvements:
- hero の ink wash と brush portrait を richer にし、mock の墨の勢いに近づけてください。
- side nav、next stream seal、schedule scroll、contact seal に紙端の不規則さ、朱印、筆線、薄い和紙 texture を追加してください。
- clean すぎる面を避け、静かだが高品質な和紙/墨/朱印の質感を作ってください。

Effects:
- `ink drip reveal`、`scroll unfold`、`seal press` を visible objects に適用してください。
- reduced motion では drip / unfold を停止し、情報は表示してください。

Completion:
- ink wash、brush portrait、paper edges、next stream seal、contact seal が 90% に届くまで改善ループしてください。
```
