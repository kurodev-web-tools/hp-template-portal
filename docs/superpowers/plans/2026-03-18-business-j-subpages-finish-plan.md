# Business J Subpages Finish Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `business/j` の `about / service / contact` を、すでに完成している `index` と同じ和モダンの密度と編集感まで引き上げる。静かな余白、工芸写真、濃淡の切り替え、非対称な情報配置を下層ページにも通し、4ページ全体を一つのテンプレートとして成立させる。

**Architecture:** `index.html` の強みである「大きな写真面」「縦方向の余韻」「明暗の切り替え」「和モダンのタイポグラフィ」を下層3ページへ展開する。`about` は継承と思想、`service` は支援領域と進め方、`contact` は相談導線と期待値整理に役割を分ける。既存の `assets/generated/*.svg` を使い、必要な情報密度は HTML 構成の再設計で補う。

**Tech Stack:** 静的 HTML, Tailwind v4, `assets/generated/*.svg`, `node scripts/review-business-templates.js`

---

## Scope

- 改修対象
  - `public/templates/business/j/about.html`
  - `public/templates/business/j/service.html`
  - `public/templates/business/j/contact.html`
- 必要に応じて調整
  - `public/templates/business/j/assets/css/tailwind-input.css`
  - `public/templates/business/j/assets/css/tailwind-built.css`
- 参照
  - `public/templates/business/j/index.html`
  - `public/v2_stitch_archive/business/japanese_modern_tradition_refinement/code.html`

## Success Criteria

- `about / service / contact` が `index` に比べて簡素に見えない
- 下層ページにも写真面、濃色セクション、和モダンの余白設計が入っている
- 各ページの役割分担が明確で、同じテンプレートの中で連続性がある
- フッター、ヘッダー、CTA のトーンが `index` と揃っている
- `review-business-templates.js` で重大問題なし

---

## Chunk 1: Direction Lock

### Task 1: 差分整理

**Files:**
- Read: `public/templates/business/j/index.html`
- Read: `public/templates/business/j/about.html`
- Read: `public/templates/business/j/service.html`
- Read: `public/templates/business/j/contact.html`

- [ ] `index` の要素を整理する
  - 写真を大きく見せるヒーロー
  - 明暗の切り替え
  - 非対称レイアウト
  - 工芸・余白・物語を扱う見出し
- [ ] 下層ページの不足を固定する
  - 写真面が少ない
  - 情報が均一なカード列に寄りすぎている
  - CTA や相談導線に余韻が足りない

### Task 2: ページごとの役割固定

**Files:**
- Output: `docs/superpowers/plans/2026-03-18-business-j-subpages-finish-plan.md`

- [ ] `about` は「工房思想と継承」
- [ ] `service` は「支援領域と進め方」
- [ ] `contact` は「相談前の期待値整理と静かな導線」

---

## Chunk 2: About Page

### Task 3: ヒーローと導入の再設計

**Files:**
- Modify: `public/templates/business/j/about.html`

- [ ] テキストだけの導入をやめ、写真面か濃色パネルを含むヒーローへ変更する
- [ ] `index` と同じく大きい見出しと補助テキストの抑揚を作る
- [ ] 継承、文脈、翻訳の三要素が一画面で見えるようにする

### Task 4: 中段以降の密度補強

**Files:**
- Modify: `public/templates/business/j/about.html`

- [ ] 理念説明だけでなく、工房の読み解き方や継承プロセスを段組みで見せる
- [ ] 画像と文章のセットを少なくとも1ブロック入れる
- [ ] 最後に `index` とつながる濃色 CTA を置く

---

## Chunk 3: Service Page

### Task 5: 支援領域の見せ方を再構成

**Files:**
- Modify: `public/templates/business/j/service.html`

- [ ] ヒーローで支援領域と美意識の両方が伝わる構成へ変更する
- [ ] 3サービスを単純カード列から引き上げ、説明密度と役割差をつける
- [ ] 進め方や伴走の流れを濃色セクションで見せる

### Task 6: 適用先と成果イメージの補強

**Files:**
- Modify: `public/templates/business/j/service.html`

- [ ] `Suitable For` を単なる短文カードではなく、対象業態と狙う変化が見える形にする
- [ ] `index` にあるような余白と段差を使って、単調さを減らす

---

## Chunk 4: Contact Page

### Task 7: 相談導線の空気感をつくる

**Files:**
- Modify: `public/templates/business/j/contact.html`

- [ ] 相談文言だけのヒーローをやめ、期待値整理カードや静かな補助情報を加える
- [ ] フォーム以外に、相談の流れや初回対話の論点を見せる
- [ ] `Response / Typical Requests` をより編集的な見せ方へ寄せる

### Task 8: フォーム周辺の完成度を上げる

**Files:**
- Modify: `public/templates/business/j/contact.html`

- [ ] フォームを主役にしつつ、右側の補助情報を `index` のトーンに合わせる
- [ ] 最下部に次のアクションが見える補助ブロックを追加する

---

## Verification Commands

- `npx @tailwindcss/cli -i public/templates/business/j/assets/css/tailwind-input.css -o public/templates/business/j/assets/css/tailwind-built.css`
- `node scripts/review-business-templates.js`

## Notes

- 優先順位は `about → service → contact`
- 画像は既存の `assets/generated/external-image-01.svg` から `05.svg` を再利用する
