# Codex Audit: Business

## Scope
- `public/templates/business`

## Findings
- `severity: medium`
  `file: public/templates/business/a/about.html, public/templates/business/a/contact.html, public/templates/business/a/index.html, public/templates/business/a/service.html, public/templates/business/d/about.html, public/templates/business/d/contact.html, public/templates/business/d/index.html, public/templates/business/d/service.html, public/templates/business/f/about.html, public/templates/business/f/index.html, public/templates/business/f/service.html, public/templates/business/g/about.html, public/templates/business/g/contact.html, public/templates/business/g/index.html, public/templates/business/j/about.html, public/templates/business/j/contact.html, public/templates/business/j/index.html, public/templates/business/j/service.html, public/templates/business/k/about.html, public/templates/business/k/contact.html, public/templates/business/k/index.html, public/templates/business/k/service.html, public/templates/business/o/about.html, public/templates/business/o/contact.html, public/templates/business/o/index.html, public/templates/business/o/service.html`
  `issue: 公開テンプレート内に「数値は編集してください」系の開発用コメントが残っている`
  `why: 配布用テンプレートとしては内部メモがノイズになり、ソースをそのまま渡したときの完成度も落ちる。コメント自体は悪くないが、公開物と starter/boilerplate の境界が曖昧に見える。`
  `recommendation: 編集ガイドを残すなら starter 専用テンプレートへ寄せ、公開テンプレート側には残さない。残す場合も HTML コメントではなく docs 側か別ガイドへ移す。`

- `severity: medium`
  `file: public/templates/business/b/contact.html, public/templates/business/d/contact.html, public/templates/business/e/contact.html, public/templates/business/n/contact.html, public/templates/business/p/contact.html, public/templates/business/s/contact.html, public/templates/business/v/contact.html`
  `issue: 問い合わせフォームに generic すぎる placeholder が残っており、ブランド固有の世界観や日本語 UI と噛み合っていない`
  `why: 例えば \`example@company.jp\`、\`YOUR NAME\`、\`Company / Studio / Project\`、\`Example Inc.\`、\`contact@company.jp\` のような値は、公開デモとしての現実感を落とし、テンプレートの完成度より「未調整感」を強く出す。`
  `recommendation: 既にブランド設定があるテンプレートは、その世界観に沿った仮名・仮会社名・仮メールへ寄せる。英語 UI で統一しないページでは placeholder も日本語に揃える。`

- `severity: medium`
  `file: public/templates/business/k/index.html, public/templates/business/k/about.html, public/templates/business/k/service.html, public/templates/business/k/contact.html`
  `issue: ヘッダーに検索 UI があるが、検索結果や絞り込みへつながる処理が見当たらず、静的テンプレートとしてはダミー要素に見える`
  `why: 期待される操作に対して反応がないコントロールは、CTA 不足よりも強く「未完成」に見える。Knowledge Plaza は信頼感が重要なカテゴリなので、実在しない検索導線は特に違和感になりやすい。`
  `recommendation: 実装予定がないなら検索 UI を外す。残すなら検索対象のセクションやアーカイブ導線へ最低限つなげて、ダミーに見えないようにする。`

- `severity: medium`
  `file: public/templates/business/i/index.html, public/templates/business/l/index.html, public/templates/business/s/index.html`
  `issue: データ/運用系テンプレートの見た目が近く、カテゴリ内での選び分け理由がやや弱い`
  `why: いずれも dark or high-contrast な dashboard / control-room 系のヒーロー、メトリクスカード、テック寄りの CTA 構成で、用途の違いより visual family の近さが先に立つ。カタログとして見ると差別化の密度が不足している。`
  `recommendation: \`i\` は分析基盤寄り、\`l\` は業務基盤/アーキテクチャ寄り、\`s\` はSaaS/運用UI寄りに、ヒーロー構図・タイポ・色温度・カード密度をもう一段分ける。`

- `severity: low`
  `file: public/templates/business/i/index.html, public/templates/business/l/index.html, public/templates/business/r/index.html, public/templates/business/v/contact.html`
  `issue: head 内の metadata が自動補完の影響で同一行に連結されている箇所があり、読みやすさと保守性が落ちている`
  `why: 公開表示には直ちに影響しないが、以後のレビューや差分確認でノイズが増える。metadata を今後さらに見直す段階では地味に効率を下げる。`
  `recommendation: head の meta / link / script を 1 要素 1 行へ整形し、metadata 更新後も人が追いやすい形に戻す。`

## Category Summary
- 重大な破綻は見当たらず、`business` カテゴリは全体として公開可能な品質帯に入っています。
- ただし、完成度を落としているのはレイアウト崩れよりも「公開テンプレなのに starter 的な痕跡が残っている」点です。開発用コメント、generic placeholder、未接続の検索 UI がその代表です。
- デザイン面ではカテゴリの幅は出ていますが、`i / l / s` のようなテック寄り群はもう一段役割差を視覚化した方が、テンプレートカタログとして選びやすくなります。

## Priority Fixes
1. 公開テンプレートから開発用コメントを外し、starter 用ガイドと分離する
2. 問い合わせフォームの generic placeholder をブランド文脈に合わせて修正する
3. `business/k` の検索 UI を削除するか、最低限の実挙動につなぐ
