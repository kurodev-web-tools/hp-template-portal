# Codex Audit: LP

## Scope
- `public/templates/lp`

## Findings
- `severity: medium`
  `file: public/templates/lp/a/index.html, public/templates/lp/b/index.html, public/templates/lp/c/index.html, public/templates/lp/d/index.html, public/templates/lp/e/index.html, public/templates/lp/f/index.html, public/templates/lp/g/index.html, public/templates/lp/j/index.html, public/templates/lp/k/index.html, public/templates/lp/m/index.html, public/templates/lp/o/index.html, public/templates/lp/p/index.html, public/templates/lp/v/index.html, public/templates/lp/w/index.html, public/templates/lp/x/index.html`
  `issue: 公開デモの主要ビジュアルが Unsplash 直参照に強く依存している`
  `why: 外部 CDN 依存は表示安定性・著作権運用・ブランド一貫性の面で弱く、テンプレートの独自性より素材サイト依存の印象が先に立つ。特に LP は first view の説得力が重要なので、ここが借り物に見えると質感が落ちる。`
  `recommendation: サムネイルだけでなく hero / testimonial / gallery の主要素材もローカル資産へ置き換える。少なくとも first view と social proof 周りはカテゴリごとの専用素材へ寄せる。`

- `severity: medium`
  `file: public/templates/lp/h/index.html`
  `issue: `placehold.co` の仮画像がそのまま残っており、公開テンプレートとして未完成に見える`
  `why: hero 画像と testimonial avatar が placeholder のままだと、metadata を整えても LP 本体の完成度が著しく下がる。特に美容・高級家電系の LP では、素材の質感が説得力そのものになる。`
  `recommendation: `placehold.co` の画像をブランド用の実素材か、少なくともローカルの仮ビジュアルへ置き換える。`

- `severity: medium`
  `file: public/templates/lp/a/index.html, public/templates/lp/b/index.html, public/templates/lp/c/index.html, public/templates/lp/d/index.html, public/templates/lp/e/index.html, public/templates/lp/f/index.html, public/templates/lp/g/index.html, public/templates/lp/i/index.html, public/templates/lp/j/index.html, public/templates/lp/k/index.html, public/templates/lp/l/index.html, public/templates/lp/m/index.html, public/templates/lp/n/index.html, public/templates/lp/o/index.html, public/templates/lp/p/index.html, public/templates/lp/q/index.html, public/templates/lp/r/index.html, public/templates/lp/s/index.html, public/templates/lp/t/index.html, public/templates/lp/u/index.html, public/templates/lp/v/index.html, public/templates/lp/w/index.html, public/templates/lp/x/index.html, public/templates/lp/y/index.html, public/templates/lp/z/index.html`
  `issue: `data-ai-type` の区分マーカーが広く残っており、ソース上で「AI テンプレート生成物」の印象を強めている`
  `why: 表示上の障害ではないが、テンプレート配布物としては内部制作メタデータがそのまま残っている状態で、ソース閲覧時の完成度を下げる。AI デザインっぽさを抑えたい方針とも相性が悪い。`
  `recommendation: 制作用のトレーサビリティが不要なら削除する。残す必要があるなら build 用コメントや docs 側へ逃がし、公開 HTML には残さない。`

- `severity: low`
  `file: public/templates/lp/q/index.html, public/templates/lp/q/plan.html`
  `issue: 診断ページ本体と詳細プランページの metadata / UI tone は揃ったが、独立ページとして見ると説明文がやや汎用的で、診断結果との接続が弱い`
  `why: `q` は「診断体験」が価値の中心なのに、`plan.html` 単体では generic な詳細ページに見えやすい。LP の連続体験として見ると、診断結果からの遷移理由がもう少し言語化されていた方が強い。`
  `recommendation: `plan.html` に「診断結果を受けてこのプランが提案される理由」を短く追記し、導線の連続性を強める。`

## Category Summary
- `LP` カテゴリは、訴求構成そのものは各テンプレートでかなり分かれており、`business` よりも用途差は出せています。
- ただし、完成度を押し下げているのは layout ではなく素材運用です。外部画像、placeholder 画像、AI 用マーカーが残っていて、テンプレートとしての最終仕上げがまだ浅いものが混ざっています。
- 逆に言うと、構成や CTA の大半は既に成立しているので、素材とソース表面の整備だけでも公開印象はかなり上がります。

## Priority Fixes
1. Unsplash / placeholder 依存の強い LP から順にローカル素材へ置き換える
2. 公開 HTML に残っている `data-ai-type` マーカーを整理する
3. `lp/q` のような複数ページ体験は、ページ間の接続文言を補強する
