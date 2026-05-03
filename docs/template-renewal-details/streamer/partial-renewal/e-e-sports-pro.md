# Streamer E: E-Sports Pro Renewal Detail

## 基本情報
- Category: Streamer
- Template ID: st_e
- Existing path: `templates/streamer/e`
- Current theme name: E-Sports Pro
- Renewal decision: Partial Renewal
- Source audit: `docs/reviews/PORTAL_CONVERSION_AUDIT_2026-05-03.md`
- Created: 2026-05-03

## 現状の読み取り
既存テーマは「E-Sports Pro」。features は Competitive, Scoreboard, Official、主要色は #0055ff, #ffffff, #0a0e1a。現行の一覧カードでは見た目の違いは伝わるが、受託制作としての選択理由と申し込み導線をさらに明確にする。

## リニューアルの狙い
- Target audience: 競技系配信者/チーム
- Conversion goal: 大会実績、配信予定、スポンサー相談
- Core concept: 競技系配信者/チーム 向けの公式サイト。既存の E-Sports Pro らしさを保ちつつ、配信予定、SNS、アーカイブ、案件相談へつなぐ。
- Priority: 既存の印象を残し、足りない導線と実在感を補強する。

## 詳細分類
- Strategic renewal depth: High。フォルダ分類に関わらず、販売用テンプレートとしては全件フルリニューアル相当で扱う。
- Motion / effect level: High
- Page model: 公式サイト型LP。トップ1ページで完結し、必要なら schedule / profile / contact を下層化できる構造にする。
- Header position: PCはtop fixed header。SPはtop compact header + bottom CTA。
- Layout mode: LP single page + activity hub。PCはHeroと配信情報を横並びにし、SPはLive/SNS/Contactを短く積む。
- Mock priority: 必須。全 streamer は first viewport mock を作り、キャラ性、配信導線、案件導線が同時に読めるか確認する。
- Implementation unit: 構造、copy、ビジュアル、演出を分けて実装する。演出はPhase 3まで入れない。
- Rationale: streamer はテンプレート感が出ると選ばれにくい。世界観の強さを商品価値にしつつ、配信予定とSNS導線は実用UIとして読みやすく保つ。

## 推奨ページ構成
- Hero: 既存の印象を残し、対象者とCTAを明確化。
- Main Value: 既存の強いセクションを残し、具体的な価値に書き換える。
- Proof / Detail: 実績、作品、価格、スケジュールなど不足情報を追加。
- CTA: ページ中盤と末尾に同じ行動を繰り返す。

## First Viewport Blueprint
- PC composition: 左または中央にキャラクター/世界観の主役、反対側に「次回配信」「最新アーカイブ」「SNS」「案件相談」をまとめる。
- Header: PCはtop fixed header。SPはtop compact header + bottom CTA。
- Hero copy: キャラ名、配信ジャンル、初見向けの一言、活動プラットフォームを1画面内に入れる。
- Visual hook: 大会UI、白青、成績カード。ただしCTAと配信予定の可読性を最優先にする。
- Primary actions: Live / Schedule / Follow / Contact を4つ以内に整理する。
- SP order: キャラ名、Live状態、次回配信、SNS、案件相談の順に出す。

## Section-by-Section Plan
- Hero (既存活用 + 再設計): 初見が誰のサイトか即理解する。入れる内容: キャラ名、ジャンル、Live状態、SNS CTA。注意: 世界観演出で文字を読めなくしない。
- Profile (既存活用 + 再設計): 配信人格と活動ジャンルを伝える。入れる内容: タグ、活動時間、好きな企画、プラットフォーム。注意: 設定説明だけで終わらせない。
- Schedule (既存活用 + 再設計): 次に何を見ればいいか示す。入れる内容: 次回配信、週間枠、通知CTA。注意: 装飾より日時の読みやすさ優先。
- Clips / Archive (既存活用 + 再設計): 魅力を短時間で伝える。入れる内容: 代表動画、人気企画、切り抜き導線。注意: iframe多用で重くしない。
- Community / Contact (既存活用 + 再設計): ファン参加と案件相談を分ける。入れる内容: Discord/X/ハッシュタグ/Business contact。注意: ファン向けCTAと企業向けCTAを混ぜない。

## デザイン / レイアウト方針
- Layout base: PC は世界観UIを強め、SP は配信予定とSNS導線を最短距離にする。
- Visual direction: 大会UI、白青、成績カード
- First viewport: 誰向けのテンプレートか、何ができるか、どの行動を取るべきかを5秒で理解できる状態にする。
- Mobile: CTA、主要情報、信頼材料を先に出す。PCの演出を単純縮小しない。
- Color: 既存の #0055ff, #ffffff, #0a0e1a を起点に、CTA色と装飾色を分ける。

## Visual System
- Color system: #0055ff, #ffffff, #0a0e1a を主役色、CTA色、背景演出色に分ける。Live/Follow/Contact は色だけでなくラベルでも区別する。
- Typography: キャラ名は大きく、配信日時とCTAは読みやすいUI文字にする。装飾フォントを本文に使わない。
- Imagery: キャラクター立ち絵が無い場合でも成立するよう、シルエット、ロゴ、配信UI、背景レイヤーで代替できる設計にする。
- Components: Live badge、schedule card、clip card、platform button、business contact block。

## コンテンツ方針
- Demo copy は実サイト寄りにする。説明のための見出しや meta 的な文言は避ける。
- 架空情報は具体的だが過剰にしない。所在地、実績、活動内容、価格帯、スケジュールのいずれかを入れて現実感を出す。
- CTA 周辺には「何が起きるか」を書く。例: 相談、予約、資料請求、無料体験、フォロー。

## Content Replacement Plan
- Fictional brand: 配信者名、配信タグ、ファンネーム、週間スケジュールを仮設定し、デモではなく実在する公式サイトの密度にする。
- Audience language: 競技系配信者/チーム のファンが読む言葉と、企業担当者が読む案件相談の言葉を分ける。
- Required concrete details: 次回配信日時、主要プラットフォーム、代表企画、連絡条件、ハッシュタグ。
- Avoid: 世界観設定だけで、配信内容、次回行動、問い合わせ条件が分からない状態。

## CTA / 導線
- Primary CTA: 配信を見る / スケジュールを見る / 案件相談
- Secondary CTA: SNSフォロー、Discord、アーカイブ閲覧
- Portal CTA: `plans.html?template=streamer-e&plan=standard` へ接続する想定。
- Demo CTA: fixed bottom CTA または Hero CTA から「このテンプレートで制作相談」へ戻す。

## Motion / Effect
- Full renewal: 演出は追加しすぎない。既存効果の重さとCTA視認性を優先して調整する。
- Reduced motion: 連続アニメーションを止めても、Hero、主要情報、CTA が成立する。
- Performance: 常時動く背景、重い blur、過剰な shadow は避ける。演出はHeroか主役セクションに限定する。

## Motion Detail
- Effect level: High
- Reduced motion: `prefers-reduced-motion` では移動/点滅/連続ループを止め、opacity変化程度にする。
- Performance budget: transform / opacity 中心。常時動く blur、広範囲 backdrop-filter、多重 shadow、重い canvas は避ける。
- Signature motion: E-Sports Pro の世界観をHeroに1つだけ置く。例: status pulse、schedule reveal、UI scan、背景レイヤーの緩い移動。
- Interaction: SNS/配信カードのhoverは短く、クリック可能領域を明確にする。
- Upper limit: パーティクルやグリッチは主役にしない。Live状態とCTAが最初に読めることを優先する。

## Avoid
- 世界観説明だけで、次回配信/SNS/案件相談が見えない。
- グリッチ、点滅、パーティクルが多く、文字とCTAが読みにくい。
- ファン向け導線と企業向け問い合わせが同じCTAに混ざっている。
- PC演出をSPへそのまま縮小して、配信予定が下に埋もれる。

## モック画像方針
推奨。大きくレイアウトを触る場合のみ first viewport + schedule / clips teaser を作る。文章/CTAだけの変更なら不要。

## 実装時の注意
- Phase 0: モック確認。必須。全 streamer は first viewport mock を作り、キャラ性、配信導線、案件導線が同時に読めるか確認する。
- Phase 1: HTML構造、セクション順、header/CTA位置だけを作る。motion、粒子、3D、重い背景は入れない。
- Phase 2: 実サイト寄りcopy、仮ブランド、画像、CTA、フォーム/外部リンクを入れる。
- Phase 3: Hero signature motion、Live状態、schedule revealを追加する。重い3D/WebGLはこの段階でも必要性を確認してから入れる。
- Phase 4: 390 / 820 / 1024 / 1366px を基準に、改行、CTA到達性、はみ出し、重なりを確認する。
- Phase 5: metadata、相対リンク、placeholder、サムネイル、template modal導線を確認する。

## 受け入れ条件
- テーマ名「E-Sports Pro」の印象が残っている。
- First viewport に対象者、価値、CTA がある。
- 配信視聴、SNSフォロー、スケジュール確認、案件相談への導線が迷わない。
- SP で主要CTAが1画面目または直後に出る。
- Detail md の `詳細分類`、`First Viewport Blueprint`、`Section-by-Section Plan`、`Motion Detail` と実装内容が矛盾しない。
- `npm run audit:links` と `npm run audit:metadata` が通る。
