# Template Static Audit

この文書は `public/templates` 配下の静的監査で見つかった、構造的な不足をカテゴリ単位でまとめる。

## Commands

```powershell
npm run audit:links
npm run audit:metadata
```

## Current Snapshot

### Link Audit
- `npm run audit:links`
- 現状は `No broken relative template links found.`

### Metadata Audit
- `npm run audit:metadata`
- 現状は 152 ファイルで metadata 系の不足を検出

## Category Summary

### Business
- 一部テンプレートでは metadata が概ね揃っている
- 主な残件:
  - `structured-data:url` 欠落
  - `og:image` 欠落
  - 一部テンプレートで `robots` 欠落
- 優先対象:
  - `business/f`, `g`, `j`, `n`, `w`, `y`
  - `business/i`, `l`, `m`, `o`, `p`, `q`, `r`, `u`, `v`, `x`

### LP
- ほぼ全テンプレートで metadata の基本セットが未整備
- 主な残件:
  - `canonical`
  - `og:title`
  - `og:description`
  - `og:url`
  - `og:image`
  - `robots`
  - `structured-data:url`
- 備考:
  - `lp/q/plan.html` は `description` も欠落

### Portfolio
- ほぼ全テンプレートで metadata の基本セットが未整備
- 主な残件:
  - `description`
  - `canonical`
  - `og:title`
  - `og:description`
  - `og:url`
  - `og:image`
  - `robots`
  - `structured-data:url`

### Streamer
- ほぼ全テンプレートで metadata の基本セットが未整備
- 主な残件:
  - `canonical`
  - `og:title`
  - `og:description`
  - `og:url`
  - `og:image`
  - `robots`
  - `structured-data:url`
- 複数ページ構成のテンプレートでは `description` 欠落もある

## Recommended Order
1. Business の欠落を先に均す
2. LP / Portfolio / Streamer はカテゴリ共通の metadata 方針を決める
3. その後にテンプレート単位で title / description / OGP 文言を整える

## Notes
- この監査は「欠落の有無」を見るもので、文言品質やデザイン品質までは評価しない
- 最終品質監査では、別モデルや目視レビューで UX / 独自性 / CTA も別途確認する
