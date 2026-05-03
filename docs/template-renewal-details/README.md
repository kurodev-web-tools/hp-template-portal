# Template Renewal Details

## Purpose
- 104テンプレート分のリニューアル詳細をカテゴリ別に管理する。
- `docs/reviews/PORTAL_CONVERSION_AUDIT_2026-05-03.md` の簡易方針を、実装前に読める粒度へ展開する。
- 各テンプレートの実装セッションでは、該当ファイルを設計入力として扱う。

## Structure
- `business/full-renewal/`, `business/partial-renewal/`, `business/polish/`
- `streamer/full-renewal/`, `streamer/partial-renewal/`, `streamer/polish/`
- `streamer/mock-prompts/`: streamer 26件の first viewport mock 作成用プロンプト
- `lp/full-renewal/`, `lp/partial-renewal/`, `lp/polish/`
- `portfolio/full-renewal/`, `portfolio/partial-renewal/`, `portfolio/polish/`

## Usage
1. 対象テンプレートの md を読む。
2. `Renewal decision` が `Full Renewal` の場合は、実装前に first viewport mock を作る。
3. `Partial Renewal` は必要に応じてモックを作り、既存構造を活かす。
4. `Polish` は導線、文言、CTA、軽いレイアウト調整を優先する。
5. `詳細分類`、`First Viewport Blueprint`、`Section-by-Section Plan`、`Motion Detail`、`Avoid` を実装前の必読項目にする。

## Detail Fields
- `Strategic renewal depth`: フォルダ分類とは別に、販売用としてどこまで作り直すかを示す。
- `Motion / effect level`: 演出の上限。business / lp は原則控えめ、streamer / portfolio は価値につながる範囲で強める。
- `Page model`: LP型か、下層ページを想定するか。
- `Header position`: PC表示時のヘッダー位置とSPでのCTA扱い。
- `First Viewport Blueprint`: モック画像またはPhase 1実装で最初に見る構成。
- `Section-by-Section Plan`: 各セクションの目的、内容、注意点。
- `Motion Detail`: 実装してよい演出と上限。
- `Avoid`: そのカテゴリでやるとCVや品質を落とす表現。

## Category Motion Policy
- business: Low。信頼、業種固有の実在感、問い合わせしやすさを優先する。派手なパーティクル、強いスクロール演出、点滅は原則使わない。
- lp: Low-Medium。CTA誘導、FAQ、価格カードなどCV補助に限る。申込前に長い演出を置かない。
- streamer: Medium-High to High。全件を販売用にはフルリニューアル相当で扱い、世界観を商品価値にする。ただしLive/SNS/Contactの可読性を最優先にする。
- portfolio: Low-Medium to Medium-High。作品の見せ方を強める演出は使えるが、作品より演出が目立つ状態は避ける。

## Shared Principles
- 2026年時点のCV設計では、1ページ1目的、明確なCTA、証拠/価格/フォームの摩擦低減、モバイル優先を重視する。
- 派手な演出より、誰向けで何を依頼できるかを first viewport で伝える。
- フルリニューアルでも既存テーマ名と印象は残す。
- streamer はフォルダ分類が `partial-renewal` / `polish` でも、戦略上は high 寄りの作り直しとして扱う。
- business / lp は企業向けの信頼感を優先し、演出はCV補助に限定する。

## Streamer Mock Prompts
- `docs/template-renewal-details/streamer/mock-prompts/` に、DESIGN.md 形式を参考にしたモック画像生成用プロンプトを保存する。
- business の実装を先に進める間、streamer はこの prompt を使って first viewport mock を先行作成する。
- 再生成は `node scripts/generate-streamer-mock-prompts.mjs` を使う。

## Reference Notes
- Landing page / website conversion references checked on 2026-05-03:
  - https://www.manotea.de/en/blog/landing-page-design-2026
  - https://www.flowtrix.co/blogs/12-b2b-landing-page-design-examples-for-2026
  - https://www.stan.vision/journal/saas-website-design
  - https://www.webstacks.com/blog/minimalist-landing-page-design-trends
