# Template Static Audit

この文書は `public/templates` 配下の静的監査で見つかった、構造的な不足をカテゴリ単位でまとめる。

## Commands

```powershell
npm run audit:links
npm run audit:metadata
```

## Default Verification Routine
1. `task.md` で今回の変更範囲を確認する
2. HTML / metadata / placeholder を触った場合は `npm run audit:links` と `npm run audit:metadata` を実行する
3. `npm` wrapper で挙動が不安定な場合は `node scripts/audit-template-links.js` と `node scripts/audit-template-metadata.js` を直接実行する
4. サムネイルや一覧データも触った場合は `docs/THUMBNAIL_WORKFLOW.md` の確認手順を追加で回す
5. カテゴリ単位の品質修正を行った場合は、そのカテゴリ専用テストがあれば合わせて実行する

## When To Run What
- copy / placeholder / metadata の修正:
  - `npm run audit:metadata`
- template 内リンク、画像、相対参照の修正:
  - `npm run audit:links`
- カテゴリ単位の公開品質修正:
  - `npm run audit:links`
  - `npm run audit:metadata`
  - 必要ならカテゴリ専用テスト
- サムネイル更新:
  - `docs/THUMBNAIL_WORKFLOW.md` に従って capture と最小確認を実施

## Current Category-Specific Tests
- `node tests/template-business-quality.test.js`
- `node tests/template-lp-quality.test.js`
- `node tests/template-portfolio-placeholder-quality.test.js`
- `node tests/template-streamer-quality.test.js`

## Current Snapshot

### Link Audit
- `npm run audit:links`
- 現状は `No broken relative template links found.`

### Metadata Audit
- `npm run audit:metadata`
- 現状は `No metadata issues found.`

## Category Summary

### Business
- `2026-04-08` 時点で、`business` 配下の metadata 欠落は静的監査上ゼロ
- `og:image`、`robots`、`structured-data:url` の不足は一括補完済み
- 今後は欠落修正よりも、文言品質や OGP 画像の妥当性をレビュー対象にする

### LP
- `2026-04-08` 時点で、`lp` 配下の metadata 欠落は静的監査上ゼロ
- カテゴリ共通のデモドメイン方針で `canonical`、OGP、`robots`、JSON-LD を補完済み
- `lp/q/plan.html` の `description` も追加済み

### Portfolio
- `2026-04-08` 時点で、`portfolio` 配下の metadata 欠落は静的監査上ゼロ
- カテゴリ共通のデモドメイン方針で `description`、`canonical`、OGP、`robots`、JSON-LD を補完済み
- description 未設定だったテンプレートには最小限の説明文を追加済み

### Streamer
- `2026-04-08` 時点で、`streamer` 配下の metadata 欠落は静的監査上ゼロ
- カテゴリ共通のデモドメイン方針で `description`、`canonical`、OGP、`robots`、JSON-LD を補完済み
- 複数ページ構成のテンプレートにもページ単位の canonical / metadata を追加済み

## Recommended Order
1. title / description / OGP 文言の妥当性をカテゴリ単位で見直す
2. OGP 画像の実体と metadata の整合性を確認する
3. 欠落監査の次段として、UX / 独自性 / CTA を別モデルや目視で監査する

## Notes
- この監査は「欠落の有無」を見るもので、文言品質やデザイン品質までは評価しない
- 最終品質監査では、別モデルや目視レビューで UX / 独自性 / CTA も別途確認する
