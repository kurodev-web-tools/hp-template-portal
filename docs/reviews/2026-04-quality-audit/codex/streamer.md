# Codex Audit: Streamer

## Scope
- `public/templates/streamer`

## Findings
- `severity: high`
  `file: public/templates/streamer/a/index.html, public/templates/streamer/b/index.html, public/templates/streamer/c/index.html, public/templates/streamer/d/index.html, public/templates/streamer/e/index.html, public/templates/streamer/e/achievements.html, public/templates/streamer/e/contact.html, public/templates/streamer/e/stats.html, public/templates/streamer/f/index.html, public/templates/streamer/g/index.html, public/templates/streamer/h/index.html, public/templates/streamer/i/index.html, public/templates/streamer/j/index.html, public/templates/streamer/k/index.html, public/templates/streamer/k/about.html, public/templates/streamer/k/contact.html, public/templates/streamer/k/gallery.html, public/templates/streamer/l/index.html, public/templates/streamer/m/index.html, public/templates/streamer/n/index.html, public/templates/streamer/o/index.html, public/templates/streamer/p/index.html, public/templates/streamer/q/index.html, public/templates/streamer/r/index.html, public/templates/streamer/s/index.html, public/templates/streamer/s/contact.html, public/templates/streamer/s/gear.html, public/templates/streamer/s/workshop.html, public/templates/streamer/t/index.html, public/templates/streamer/u/index.html, public/templates/streamer/v/index.html, public/templates/streamer/w/index.html, public/templates/streamer/x/index.html, public/templates/streamer/y/index.html, public/templates/streamer/z/index.html, public/templates/streamer/z/contact.html, public/templates/streamer/z/gallery.html, public/templates/streamer/z/meditation.html`
  `issue: ほぼ全テンプレートが同じ `data-channel-url=\"https://re-link.work/kurodev\"` を持っており、配信導線のデモ先が実質共通化されている`
  `why: streamer テンプレートでは配信導線そのものが主役なので、全テンプレートで同じ channel URL が入っていると、キャラクター差より「未差し替えの共通デモ」に見える。`
  `recommendation: 各テンプレートごとにブランドに沿った仮の channel URL を用意する。少なくとも共通の `kurodev` を外し、個別テンプレートごとの識別子へ置き換える。`

- `severity: medium`
  `file: public/templates/streamer/a/index.html, public/templates/streamer/b/index.html, public/templates/streamer/c/index.html, public/templates/streamer/d/index.html, public/templates/streamer/e/index.html, public/templates/streamer/f/index.html, public/templates/streamer/g/index.html, public/templates/streamer/h/index.html, public/templates/streamer/i/index.html, public/templates/streamer/j/index.html, public/templates/streamer/k/index.html, public/templates/streamer/l/index.html, public/templates/streamer/m/index.html, public/templates/streamer/n/index.html, public/templates/streamer/o/index.html, public/templates/streamer/p/index.html, public/templates/streamer/q/index.html, public/templates/streamer/r/index.html, public/templates/streamer/s/index.html, public/templates/streamer/t/index.html, public/templates/streamer/u/index.html, public/templates/streamer/v/index.html, public/templates/streamer/w/index.html, public/templates/streamer/x/index.html, public/templates/streamer/y/index.html, public/templates/streamer/z/index.html`
  `issue: ヒーロー CTA や周辺導線に `href=\"#\"` が多く、本番導線としては死んだリンクが目立つ`
  `why: business や portfolio と違って、streamer は「押したら何か始まる」期待値が高いカテゴリなので、主要ボタンがダミーリンクだと未完成感が強く出る。`
  `recommendation: 配信ページ、Discord、SNS、予約、参加フォームなど、テンプレートの世界観に沿った仮リンク先へ差し替える。未接続の導線はボタンにせず、差し替え前提のラベルへ落とす。`

- `severity: medium`
  `file: public/templates/streamer/a/index.html, public/templates/streamer/k/index.html`
  `issue: 本文中に「配信設定: 以下の data- 属性を書き換えてください」系の開発用コメントが残っている`
  `why: streamer テンプレートは演出の没入感が価値なので、ソース上の運用メモがそのまま残ると配布物としての仕上がりを下げる。設定ガイド自体は必要でも、公開 HTML 本体に残す必要は薄い。`
  `recommendation: 設定手順は docs か starter 用テンプレートへ寄せ、公開テンプレート側の HTML コメントは削除する。`

- `severity: low`
  `file: public/templates/streamer/a/index.html, public/templates/streamer/k/index.html, public/templates/streamer/n/index.html, public/templates/streamer/q/index.html, public/templates/streamer/y/index.html`
  `issue: 世界観は強い一方で、CTA 文言が抽象的で、何をしてほしいボタンなのか分かりにくい箇所がある`
  `why: `JACK IN`、`JOIN GUILD`、`WAKE UP`、`ACCEPT QUEST`、`INVEST NOW` のようなコピーは雰囲気は出るが、配信視聴・参加・サブスク・SNS など具体行動との対応が曖昧になりやすい。`
  `recommendation: 世界観を保ったままでも、サブテキストや補助ラベルで「配信を見る」「Discord 参加」「予約する」など実際の行動を補う。`

## Category Summary
- `streamer` は 4 カテゴリの中で最も世界観が強く、見た目だけなら差別化も十分です。
- その反面、公開品質を下げているのはデザインではなく導線の仮置きです。共通 channel URL、`#` のままの CTA、設定コメント残存が、テンプレの強さをそのまま削っています。
- このカテゴリは small fix の効果が大きく、配信先 URL と CTA の実体だけでもかなり「本番感」が上がります。

## Priority Fixes
1. 各テンプレートの `data-channel-url` を固有の仮 URL へ差し替える
2. 主要 CTA の `href=\"#\"` を用途に合った仮リンクへ置き換える
3. 設定コメントを docs 側へ移し、HTML 本体からは外す
