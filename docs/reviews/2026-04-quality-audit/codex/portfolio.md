# Codex Audit: Portfolio

## Scope
- `public/templates/portfolio`

## Findings
- `severity: medium`
  `file: public/templates/portfolio/a/index.html, public/templates/portfolio/b/index.html, public/templates/portfolio/c/index.html, public/templates/portfolio/d/index.html, public/templates/portfolio/e/index.html, public/templates/portfolio/f/index.html, public/templates/portfolio/g/index.html, public/templates/portfolio/h/index.html, public/templates/portfolio/j/index.html, public/templates/portfolio/p/index.html, public/templates/portfolio/u/index.html, public/templates/portfolio/v/index.html, public/templates/portfolio/w/index.html, public/templates/portfolio/x/index.html, public/templates/portfolio/y/index.html, public/templates/portfolio/z/index.html, public/templates/portfolio/k/index.html, public/templates/portfolio/q/index.html, public/templates/portfolio/r/index.html, public/templates/portfolio/s/index.html`
  `issue: 作品画像やプロフィール画像に picsum / Unsplash 直参照が広く残っている`
  `why: portfolio は「作品そのもの」が価値の中心なので、借り物のストック画像が残るとテンプレートの世界観よりも仮置き感が先に立つ。特に作品一覧やプロフィール写真が外部ランダム画像だと、完成度の低さが目立つ。`
  `recommendation: 代表作品、プロフィール、ギャラリーの主要画像はローカル資産へ置き換える。少なくとも hero と works の一段目は placeholder / stock 依存を外す。`

- `severity: medium`
  `file: public/templates/portfolio/k/index.html, public/templates/portfolio/q/index.html, public/templates/portfolio/r/index.html, public/templates/portfolio/s/index.html`
  `issue: `cdn.tailwindcss.com` や外部 GSAP にランタイム依存しているテンプレートが残っている`
  `why: portfolio は演出が強い分、外部スクリプト依存の失敗がそのまま第一印象の劣化につながる。静的テンプレートとして配布するなら、CDN が落ちた時にレイアウトや演出が崩れる構成は弱い。`
  `recommendation: 配布用テンプレートでは CSS / JS をローカルへ寄せる。少なくとも Tailwind のランタイム CDN 依存は避け、ビルド済み CSS に固定する。`

- `severity: medium`
  `file: public/templates/portfolio/a/index.html, public/templates/portfolio/b/index.html, public/templates/portfolio/c/index.html, public/templates/portfolio/d/index.html, public/templates/portfolio/e/index.html, public/templates/portfolio/f/index.html, public/templates/portfolio/g/index.html, public/templates/portfolio/h/index.html, public/templates/portfolio/i/index.html, public/templates/portfolio/j/index.html, public/templates/portfolio/k/index.html, public/templates/portfolio/l/index.html, public/templates/portfolio/m/index.html, public/templates/portfolio/n/index.html, public/templates/portfolio/o/index.html, public/templates/portfolio/p/index.html`
  `issue: metadata の description が自動補完の定型文になっており、各テンプレート固有の作風や職能を十分に表現できていない`
  `why: `を体験できるポートフォリオテンプレートです。作品、プロフィール、連絡導線を一体で見せるデモページです。` という文型は欠落補完としては機能するが、portfolio の差別化には弱い。検索結果や OGP で見た時の個性が薄れる。`
  `recommendation: 少なくとも代表的なテンプレートから順に、職種・作風・表現媒体・見せ方の違いが分かる description へ差し替える。`

- `severity: low`
  `file: public/templates/portfolio/a/index.html, public/templates/portfolio/e/index.html, public/templates/portfolio/g/index.html, public/templates/portfolio/p/index.html, public/templates/portfolio/q/index.html, public/templates/portfolio/r/index.html, public/templates/portfolio/s/index.html, public/templates/portfolio/t/index.html, public/templates/portfolio/z/index.html`
  `issue: ソーシャルリンクやダウンロード導線に `#` や空の `mailto:` が残っている`
  `why: portfolio は連絡導線の信頼性が重要なので、クリックしても意味のないリンクは「飾り」に見える。特に contact セクションや GitHub / Behance 表示がダミーだと完成度を落とす。`
  `recommendation: 未接続リンクは削除するか、ダミーであることが分かる非リンク要素へ置き換える。配布テンプレートとして残すなら、コメントや docs 側で差し替え箇所を案内する。`

## Category Summary
- `portfolio` はカテゴリとしての振れ幅が最も広く、方向性の差別化自体はかなりできています。
- 一方で、作品テンプレートなのに作品画像や外部リンクが仮置きのまま残っているものがあり、見た目の個性に対して「本物感」が追いついていません。
- metadata 欠落は解消済みですが、portfolio は欠落の有無よりも「誰の何を見せるページか」が description と作品画像から伝わるかの方が重要です。

## Priority Fixes
1. works / profile の picsum・Unsplash 依存を減らして、代表画像をローカル化する
2. `cdn.tailwindcss.com` 依存のテンプレートをビルド済み CSS へ寄せる
3. 定型 description とダミーリンクを、テンプレート固有の表現へ差し替える
