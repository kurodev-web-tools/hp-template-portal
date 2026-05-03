# LP Q: Quiz & Lead Renewal Detail

## 基本情報
- Category: LP
- Template ID: lp_q
- Existing path: `templates/lp/q`
- Current theme name: Quiz & Lead
- Renewal decision: Full Renewal
- Source audit: `docs/reviews/PORTAL_CONVERSION_AUDIT_2026-05-03.md`
- Created: 2026-05-03

## 現状の読み取り
既存テーマは「Quiz & Lead」。features は Quiz, Interactive, Lead、主要色は #ec4899, #fdf2f8, #831843。現行の一覧カードでは見た目の違いは伝わるが、受託制作としての選択理由と申し込み導線をさらに明確にする。

## リニューアルの狙い
- Target audience: Quiz & Lead の offer を探している見込み客
- Conversion goal: 診断リード獲得
- Core concept: 診断リード獲得 に絞ったCV型LP。1ページ1目的で、訴求、証拠、価格/条件、CTAを迷わせない。
- Priority: 既存の見た目を参考にしつつ、構造から作り直す。

## 詳細分類
- Strategic renewal depth: High。offer、証拠、フォーム導線から組み直す。
- Motion / effect level: Medium
- Page model: CV特化single page。下層ページより、1ページ内で理解、納得、行動を完結させる。
- Header position: PCはtop sticky header + CTA。SPはbottom fixed CTAを優先し、メニューは薄くする。
- Layout mode: conversion-first LP。セクションごとに1メッセージへ絞り、CTAを一定間隔で繰り返す。
- Mock priority: 必須。first viewport + proof/pricing teaser を作る。
- Implementation unit: offer、proof、pricing/form、FAQを別単位で詰める。
- Rationale: LPは派手さより申込摩擦の低さが重要。演出は注意誘導に留め、フォームや価格の理解を邪魔しない。

## 推奨ページ構成
- Hero Offer: 対象者、約束、CTA、価格/無料条件を明示。
- Problem / Promise: 悩みと解決後の状態を短く示す。
- Benefits: 3-5個の具体ベネフィット。
- Proof: 実績、レビュー、比較、FAQ前の安心材料。
- Pricing / Plan: 価格、含まれるもの、申込条件。
- Form / Final CTA: 入力項目を絞り、送信後の流れを書く。

## First Viewport Blueprint
- PC composition: 左にofferとCTA、右に証拠/価格/利用イメージを置く。
- Header: PCはtop sticky header + CTA。SPはbottom fixed CTAを優先し、メニューは薄くする。
- Hero copy: 誰の何の課題を、どの条件で解決するかを一文で示す。
- Visual hook: クイズから結果/申込へつなぐ。演出よりoffer理解とCTA視認性を優先する。
- Primary actions: Conversion goal (診断リード獲得) に直結するCTAを1つ主役にする。
- SP order: offer、CTA、安心材料、価格/条件、フォームの順にする。

## Section-by-Section Plan
- Hero Offer (新規設計): 申込理由を最短で作る。入れる内容: offer、対象者、価格/無料条件、CTA。注意: キャッチコピーだけで内容を隠さない。
- Problem / Promise (新規設計): 課題と解決後を接続する。入れる内容: 悩み、Before/After、約束。注意: 煽りすぎない。
- Benefits (新規設計): 選ぶ理由を比較可能にする。入れる内容: 3-5 benefit、成果、対象条件。注意: 抽象的な利点だけにしない。
- Proof / Pricing (新規設計): 不安を下げる。入れる内容: レビュー、実績、比較、価格/プラン。注意: 価格や条件を隠しすぎない。
- FAQ / Form (新規設計): 行動直前の不安を潰す。入れる内容: FAQ、入力項目、送信後の流れ。注意: フォームを長くしすぎない。

## デザイン / レイアウト方針
- Layout base: 1ページ1目的を徹底し、CTAとフォーム摩擦を最小化する。
- Visual direction: クイズから結果/申込へつなぐ
- First viewport: 誰向けのテンプレートか、何ができるか、どの行動を取るべきかを5秒で理解できる状態にする。
- Mobile: CTA、主要情報、信頼材料を先に出す。PCの演出を単純縮小しない。
- Color: 既存の #ec4899, #fdf2f8, #831843 を起点に、CTA色と装飾色を分ける。

## Visual System
- Color system: #ec4899, #fdf2f8, #831843 を背景、信頼材料、CTAで役割分担する。CTA色を複数に分散させない。
- Typography: 見出しは短く、価格/条件/CTAは一目で読めるサイズにする。
- Imagery: offer利用後の状態、商品、画面、人物など、申込判断に効く素材を使う。
- Components: benefit card、proof card、pricing table、FAQ accordion、form block。

## コンテンツ方針
- Demo copy は実サイト寄りにする。説明のための見出しや meta 的な文言は避ける。
- 架空情報は具体的だが過剰にしない。所在地、実績、活動内容、価格帯、スケジュールのいずれかを入れて現実感を出す。
- CTA 周辺には「何が起きるか」を書く。例: 相談、予約、資料請求、無料体験、フォロー。

## Content Replacement Plan
- Fictional brand: offer名、対象者、価格/無料条件、申込後の流れを仮設定する。
- Audience language: Quiz & Lead の offer を探している見込み客 が今申し込む理由を理解できる言葉にする。
- Required concrete details: Conversion goal (診断リード獲得) の条件、ベネフィット、証拠、FAQ、送信後の流れ。
- Avoid: 「今すぐ」「簡単」だけで、内容や条件が薄い状態。

## CTA / 導線
- Primary CTA: 申し込む / 予約する / 無料体験する / 資料請求
- Secondary CTA: FAQ、価格、レビュー、比較表
- Portal CTA: `plans.html?template=lp-q&plan=standard` へ接続する想定。
- Demo CTA: fixed bottom CTA または Hero CTA から「このテンプレートで制作相談」へ戻す。

## Motion / Effect
- Full renewal: CVを邪魔しない軽い出現演出のみ。CTA周辺は動かしすぎない。
- Reduced motion: 連続アニメーションを止めても、Hero、主要情報、CTA が成立する。
- Performance: 常時動く背景、重い blur、過剰な shadow は避ける。演出はHeroか主役セクションに限定する。

## Motion Detail
- Effect level: Medium
- Reduced motion: `prefers-reduced-motion` では移動/点滅/連続ループを止め、opacity変化程度にする。
- Performance budget: transform / opacity 中心。常時動く blur、広範囲 backdrop-filter、多重 shadow、重い canvas は避ける。
- Signature motion: CTA到達を助ける軽いreveal、FAQ accordion、価格カードhover程度。
- Interaction: フォーム、価格、CTA周辺は動かしすぎない。
- Upper limit: CV導線の前に長い演出を置かない。

## Avoid
- 何のofferか分かる前に長い演出や抽象コピーを見せる。
- 価格、条件、申込後の流れを隠しすぎる。
- CTA文言がセクションごとに変わり、行動がぶれる。
- フォーム項目が多く、CV前に離脱しやすい。

## モック画像方針
必須。first viewport + proof/pricing teaser を 1 枚作る。既存テーマ名「Quiz & Lead」が残っていること、CTA が最初の画面に見えること、SPでも成立する情報量であることを確認する。

## 実装時の注意
- Phase 0: モック確認。必須。first viewport + proof/pricing teaser を作る。
- Phase 1: HTML構造、セクション順、header/CTA位置だけを作る。motion、粒子、3D、重い背景は入れない。
- Phase 2: 実サイト寄りcopy、仮ブランド、画像、CTA、フォーム/外部リンクを入れる。
- Phase 3: CTA視認性を妨げない範囲で、fade/reveal/accordionを追加する。
- Phase 4: 390 / 820 / 1024 / 1366px を基準に、改行、CTA到達性、はみ出し、重なりを確認する。
- Phase 5: metadata、相対リンク、placeholder、サムネイル、template modal導線を確認する。

## 受け入れ条件
- テーマ名「Quiz & Lead」の印象が残っている。
- First viewport に対象者、価値、CTA がある。
- 購入、予約、申し込み、資料請求、無料体験への導線が迷わない。
- SP で主要CTAが1画面目または直後に出る。
- Detail md の `詳細分類`、`First Viewport Blueprint`、`Section-by-Section Plan`、`Motion Detail` と実装内容が矛盾しない。
- `npm run audit:links` と `npm run audit:metadata` が通る。
