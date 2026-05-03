# Business L: Logical Renewal Detail

## 基本情報
- Category: Business
- Template ID: bus_l
- Existing path: `templates/business/l`
- Current theme name: Logical
- Renewal decision: Partial Renewal
- Source audit: `docs/reviews/PORTAL_CONVERSION_AUDIT_2026-05-03.md`
- Created: 2026-05-03

## 現状の読み取り
既存テーマは「Logical」。features は Systemic, Terminal, Logic Flow、主要色は #0f172a, #38bdf8, #1e293b。現行の一覧カードでは見た目の違いは伝わるが、受託制作としての選択理由と申し込み導線をさらに明確にする。

## リニューアルの狙い
- Target audience: システム開発、エンジニアリング、BtoB支援
- Conversion goal: 技術相談、要件整理MTG、資料DL。
- Core concept: 複雑な業務課題を整理して解決する会社に見せる。
- Priority: 既存の印象を残し、足りない導線と実在感を補強する。

## 詳細分類
- Strategic renewal depth: Medium。既存の信頼感を活かして導線と証拠を補強する。
- Motion / effect level: Low
- Page model: 企業向けmulti-section site。必要に応じて service / case / contact の下層化を想定する。
- Header position: PCはtop sticky header。SPは問い合わせ導線を見失わないcompact header + CTA。
- Layout mode: trust-first corporate layout。情報密度、証拠、問い合わせ導線を優先し、演出は補助に留める。
- Mock priority: 任意。構成変更が大きい場合のみ作る。
- Implementation unit: Hero、信頼材料、サービス、事例/流れ、問い合わせを別単位で進める。
- Rationale: business は派手な演出より信頼と分かりやすさがCVに直結する。表現は業種固有の実在感で差別化する。

## 推奨ページ構成
- Hero: 既存の印象を残し、対象者とCTAを明確化。
- Main Value: 既存の強いセクションを残し、具体的な価値に書き換える。
- Proof / Detail: 実績、作品、価格、スケジュールなど不足情報を追加。
- CTA: ページ中盤と末尾に同じ行動を繰り返す。

## First Viewport Blueprint
- PC composition: 左に事業価値と相談CTA、右に実績/サービス/写真を置く。
- Header: PCはtop sticky header。SPは問い合わせ導線を見失わないcompact header + CTA。
- Hero copy: 対象顧客、提供価値、相談できる内容を明確にする。
- Visual hook: フロー図、比較表、コード風アクセント。装飾terminalに頼りすぎない。過度な演出ではなく業種固有の写真/数値/証拠で差別化する。
- Primary actions: Conversion goal (技術相談、要件整理MTG、資料DL) に沿うCTAを置く。
- SP order: 価値、CTA、信頼材料、サービス、問い合わせの順にする。

## Section-by-Section Plan
- Hero (既存活用 + 再設計): 対象顧客、提供価値、相談CTAを明確化。入れる内容: 大きいコピー + 実績/写真/証拠カード。注意: CTAが抽象的な「お問い合わせ」だけにならないこと。
- Trust Proof (既存活用 + 再設計): 不安を減らす。入れる内容: 実績数値、資格、取引先、導入前後。注意: ロゴだけでなく何が強いかを書く。
- Services (既存活用 + 再設計): 依頼可能範囲を理解させる。入れる内容: 3-4サービス、対象、成果、納品物。注意: 説明過多にせず比較しやすくする。
- Process / Case (既存活用 + 再設計): 相談後の流れを見せる。入れる内容: ステップ、期間、費用目安、事例。注意: 信頼獲得のために具体性を入れる。
- Contact (既存活用 + 再設計): 問い合わせ摩擦を下げる。入れる内容: 目的別CTA、フォーム、電話/資料請求。注意: 入力項目を増やしすぎない。

## デザイン / レイアウト方針
- Layout base: PC は情報密度を高めた2カラムまたはカードグリッド、SP はCTAを前倒しした1カラム。
- Visual direction: フロー図、比較表、コード風アクセント。装飾terminalに頼りすぎない。
- First viewport: 誰向けのテンプレートか、何ができるか、どの行動を取るべきかを5秒で理解できる状態にする。
- Mobile: CTA、主要情報、信頼材料を先に出す。PCの演出を単純縮小しない。
- Color: 既存の #0f172a, #38bdf8, #1e293b を起点に、CTA色と装飾色を分ける。

## Visual System
- Color system: #0f172a, #38bdf8, #1e293b を基調に、信頼色とCTA色を分ける。業種とズレる彩度は抑える。
- Typography: 企業名/価値提案は落ち着かせ、サービス説明と問い合わせCTAを読みやすくする。
- Imagery: 会議、製品、店舗、現場、人物など、業種が伝わる素材を優先する。
- Components: service card、proof number、case card、process step、contact block。

## コンテンツ方針
- Demo copy は実サイト寄りにする。説明のための見出しや meta 的な文言は避ける。
- 架空情報は具体的だが過剰にしない。所在地、実績、活動内容、価格帯、スケジュールのいずれかを入れて現実感を出す。
- CTA 周辺には「何が起きるか」を書く。例: 相談、予約、資料請求、無料体験、フォロー。

## Content Replacement Plan
- Fictional brand: 会社名、所在地、提供サービス、実績数値、相談メニューを仮設定する。
- Audience language: システム開発、エンジニアリング、BtoB支援 が安心して相談できる言葉にする。
- Required concrete details: Conversion goal (技術相談、要件整理MTG、資料DL) に必要な資料、事例、費用目安、対応範囲。
- Avoid: 汎用的な企業理念だけで、何を依頼できるか分からない状態。

## CTA / 導線
- Primary CTA: 無料相談する / 見積もり相談する
- Secondary CTA: 資料請求、導入事例、サービス詳細
- Portal CTA: `plans.html?template=business-l&plan=standard` へ接続する想定。
- Demo CTA: fixed bottom CTA または Hero CTA から「このテンプレートで制作相談」へ戻す。

## Motion / Effect
- Full renewal: 演出は追加しすぎない。既存効果の重さとCTA視認性を優先して調整する。
- Reduced motion: 連続アニメーションを止めても、Hero、主要情報、CTA が成立する。
- Performance: 常時動く背景、重い blur、過剰な shadow は避ける。演出はHeroか主役セクションに限定する。

## Motion Detail
- Effect level: Low
- Reduced motion: `prefers-reduced-motion` では移動/点滅/連続ループを止め、opacity変化程度にする。
- Performance budget: transform / opacity 中心。常時動く blur、広範囲 backdrop-filter、多重 shadow、重い canvas は避ける。
- Signature motion: fade / slight slide / number reveal 程度。
- Interaction: 問い合わせ、資料請求、サービス詳細のhoverを分かりやすくする。
- Upper limit: 信頼を損ねる派手なパーティクル、過度なスクロール演出、点滅は避ける。

## Avoid
- 派手な演出で信頼感を損ねる。
- 会社/サービス/実績/問い合わせの関係が曖昧。
- 「お問い合わせ」だけで、何を相談できるか分からない。
- 業種固有の写真や証拠がなく、汎用企業サイトに見える。

## モック画像方針
推奨。大きくレイアウトを触る場合のみ first viewport + services/proof の一部 を作る。文章/CTAだけの変更なら不要。

## 実装時の注意
- Phase 0: モック確認。任意。構成変更が大きい場合のみ作る。
- Phase 1: HTML構造、セクション順、header/CTA位置だけを作る。motion、粒子、3D、重い背景は入れない。
- Phase 2: 実サイト寄りcopy、仮ブランド、画像、CTA、フォーム/外部リンクを入れる。
- Phase 3: CTA視認性を妨げない範囲で、fade/reveal/accordionを追加する。
- Phase 4: 390 / 820 / 1024 / 1366px を基準に、改行、CTA到達性、はみ出し、重なりを確認する。
- Phase 5: metadata、相対リンク、placeholder、サムネイル、template modal導線を確認する。

## 受け入れ条件
- テーマ名「Logical」の印象が残っている。
- First viewport に対象者、価値、CTA がある。
- 問い合わせ、無料相談、資料請求への導線が迷わない。
- SP で主要CTAが1画面目または直後に出る。
- Detail md の `詳細分類`、`First Viewport Blueprint`、`Section-by-Section Plan`、`Motion Detail` と実装内容が矛盾しない。
- `npm run audit:links` と `npm run audit:metadata` が通る。
