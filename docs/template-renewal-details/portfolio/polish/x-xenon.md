# Portfolio X: Xenon Renewal Detail

## 基本情報
- Category: Portfolio
- Template ID: pf_x
- Existing path: `templates/portfolio/x`
- Current theme name: Xenon
- Renewal decision: Polish
- Source audit: `docs/reviews/PORTAL_CONVERSION_AUDIT_2026-05-03.md`
- Created: 2026-05-03

## 現状の読み取り
既存テーマは「Xenon」。features は Xenon, Sheen, Industrial、主要色は #1c1917, #e7e5e4, #fb923c。現行の一覧カードでは見た目の違いは伝わるが、受託制作としての選択理由と申し込み導線をさらに明確にする。

## リニューアルの狙い
- Target audience: インダストリアルデザイナー
- Conversion goal: 作品閲覧、問い合わせ、案件相談、プロフィール理解
- Core concept: インダストリアルデザイナー の作品サイト。見た目だけでなく、誰に何を依頼できるかを伝える。
- Priority: 既存の完成度を活かし、受注導線と文言を磨く。

## 詳細分類
- Strategic renewal depth: Low-Medium。既存の完成度を残し、作品説明とCTAを磨く。
- Motion / effect level: Low-Medium
- Page model: 作品主導のsingle page。案件相談に必要な profile / service / contact をページ後半へ自然に接続する。
- Header position: PCはminimal top headerまたは左固定の小さなindex。SPは作品閲覧を邪魔しないtop compact header。
- Layout mode: editorial portfolio。作品の大小差、余白、ケーススタディ導線で個性を出す。装飾より作品の見え方を優先する。
- Mock priority: 推奨。作品一覧の密度を変える場合だけ作る。
- Implementation unit: 作品グリッド、ケーススタディ、問い合わせ導線を別単位で進める。
- Rationale: portfolio は演出を使えるが、作品より演出が目立つと逆効果になる。動きは作品理解を助ける範囲に限定する。

## 推奨ページ構成
- Hero: 現状を大きく崩さず、CTA文言と対象者を明確化。
- Existing Sections: 既存セクションの順序は原則維持。
- CTA Strip: 「このテンプレートで制作相談」への導線を追加。
- Footer / Contact: 問い合わせ先、SNS、補助リンクを整理。

## First Viewport Blueprint
- PC composition: 代表作品を大きく見せ、横に作者名、依頼可能領域、問い合わせCTAを置く。
- Header: PCはminimal top headerまたは左固定の小さなindex。SPは作品閲覧を邪魔しないtop compact header。
- Hero copy: 作家性のある短いstatementと、対応できる仕事を同時に見せる。
- Visual hook: 製品/案件相談を明確化。作品を隠す装飾や過剰な文字被せは避ける。
- Primary actions: Selected Works / Case Study / Contact を明確に分ける。
- SP order: 作品、肩書き、対応領域、問い合わせCTA、プロフィールの順にする。

## Section-by-Section Plan
- Hero / Statement (既存維持 + 改善): 作風と依頼可能性を同時に示す。入れる内容: 代表作品、肩書き、対応領域、CTA。注意: 雰囲気だけで何を頼めるか不明にしない。
- Selected Works (既存維持 + 改善): 作品の強さを見せる。入れる内容: 3-6作品、役割、媒体、年。注意: 作品名だけで説明を終えない。
- Case Study (既存維持 + 改善): 仕事としての信頼を作る。入れる内容: 課題、担当範囲、制作意図、成果。注意: 長すぎる読み物にしない。
- Profile / Fit (既存維持 + 改善): 相性判断を助ける。入れる内容: 経歴、得意領域、依頼に向く案件。注意: 自分語りだけにしない。
- Services / Contact (既存維持 + 改善): 相談へつなぐ。入れる内容: 対応メニュー、目安、問い合わせCTA。注意: 連絡先を埋もれさせない。

## デザイン / レイアウト方針
- Layout base: 作品を主役にしつつ、問い合わせ導線を埋もれさせない。
- Visual direction: 製品/案件相談を明確化
- First viewport: 誰向けのテンプレートか、何ができるか、どの行動を取るべきかを5秒で理解できる状態にする。
- Mobile: CTA、主要情報、信頼材料を先に出す。PCの演出を単純縮小しない。
- Color: 既存の #1c1917, #e7e5e4, #fb923c を起点に、CTA色と装飾色を分ける。

## Visual System
- Color system: #1c1917, #e7e5e4, #fb923c は作品の邪魔をしない背景/アクセントに限定する。
- Typography: statementは短く強く、作品説明は小さくても読みやすくする。
- Imagery: 作品サムネイルの比率を揃えすぎず、主役作品だけ大きく扱う。
- Components: work card、case study panel、service chip、contact strip。

## コンテンツ方針
- Demo copy は実サイト寄りにする。説明のための見出しや meta 的な文言は避ける。
- 架空情報は具体的だが過剰にしない。所在地、実績、活動内容、価格帯、スケジュールのいずれかを入れて現実感を出す。
- CTA 周辺には「何が起きるか」を書く。例: 相談、予約、資料請求、無料体験、フォロー。

## Content Replacement Plan
- Fictional brand: 作者名、制作領域、代表案件、使用媒体、依頼条件を仮設定する。
- Audience language: インダストリアルデザイナー が「この人に何を頼めるか」を判断できる言葉にする。
- Required concrete details: 作品名、担当範囲、制作年、対応メニュー、相談可能な案件。
- Avoid: 作品画像だけを並べ、役割や依頼導線がない状態。

## CTA / 導線
- Primary CTA: 作品を見る / 依頼相談する
- Secondary CTA: プロフィール、対応範囲、ケーススタディ
- Portal CTA: `plans.html?template=portfolio-x&plan=standard` へ接続する想定。
- Demo CTA: fixed bottom CTA または Hero CTA から「このテンプレートで制作相談」へ戻す。

## Motion / Effect
- Full renewal: 演出は追加しすぎない。既存効果の重さとCTA視認性を優先して調整する。
- Reduced motion: 連続アニメーションを止めても、Hero、主要情報、CTA が成立する。
- Performance: 常時動く背景、重い blur、過剰な shadow は避ける。演出はHeroか主役セクションに限定する。

## Motion Detail
- Effect level: Low-Medium
- Reduced motion: `prefers-reduced-motion` では移動/点滅/連続ループを止め、opacity変化程度にする。
- Performance budget: transform / opacity 中心。常時動く blur、広範囲 backdrop-filter、多重 shadow、重い canvas は避ける。
- Signature motion: 作品カードのreveal、case studyの切り替え、画像の軽いparallaxまで。
- Interaction: 作品hoverで役割/媒体/年を出す。ただしSPでは常時表示にする。
- Upper limit: 作品を隠す大きな文字被せ、過剰なスクロール固定、長いローディング演出は避ける。

## Avoid
- 作品画像だけで、依頼可能領域、担当範囲、問い合わせ導線がない。
- 装飾やスクロール演出が作品理解を邪魔している。
- SPで作品キャプションがhover前提になっている。
- 連絡導線がfooterだけにあり、検討中に戻れない。

## モック画像方針
任意。既存見た目を維持するため、モックより先に文言と導線の静的修正で進める。

## 実装時の注意
- Phase 0: モック確認。推奨。作品一覧の密度を変える場合だけ作る。
- Phase 1: HTML構造、セクション順、header/CTA位置だけを作る。motion、粒子、3D、重い背景は入れない。
- Phase 2: 実サイト寄りcopy、仮ブランド、画像、CTA、フォーム/外部リンクを入れる。
- Phase 3: 作品reveal、case transition、軽いparallaxを追加する。作品より演出が目立つ場合は削る。
- Phase 4: 390 / 820 / 1024 / 1366px を基準に、改行、CTA到達性、はみ出し、重なりを確認する。
- Phase 5: metadata、相対リンク、placeholder、サムネイル、template modal導線を確認する。

## 受け入れ条件
- テーマ名「Xenon」の印象が残っている。
- First viewport に対象者、価値、CTA がある。
- 作品閲覧、問い合わせ、案件相談、プロフィール理解への導線が迷わない。
- SP で主要CTAが1画面目または直後に出る。
- Detail md の `詳細分類`、`First Viewport Blueprint`、`Section-by-Section Plan`、`Motion Detail` と実装内容が矛盾しない。
- `npm run audit:links` と `npm run audit:metadata` が通る。
