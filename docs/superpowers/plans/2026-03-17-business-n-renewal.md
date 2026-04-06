# Business N Renewal Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `public/templates/business/n` をネオン夜景テーマの4ページ構成へ刷新し、専用 CSS/JS と検証まで完了する。

**Architecture:** `index/about/service/contact` を全面差し替えし、見た目の共通要素は `assets/css/style.css` と `assets/js/script.js` に集約する。Tailwind v4 は `tailwind-input.css` から `tailwind-built.css` を生成し、HTML ではテーマ固有の補助クラスだけを組み合わせる。

**Tech Stack:** HTML, Tailwind CSS v4, vanilla JavaScript

---

## Chunk 1: Asset Base

### Task 1: Define N theme assets

**Files:**
- Create: `public/templates/business/n/assets/css/tailwind-input.css`
- Create: `public/templates/business/n/assets/css/style.css`
- Create: `public/templates/business/n/assets/js/script.js`

- [ ] Tailwind テーマ色、フォント、背景色を `tailwind-input.css` に定義する
- [ ] モバイルメニュー、発光、背景グリッド、フォーム、reduced-motion を `style.css` に定義する
- [ ] モバイルメニュー、スクロール時ヘッダー、出現アニメーション、デモフォーム送信メッセージを `script.js` に実装する

## Chunk 2: Page Rebuild

### Task 2: Replace all N pages

**Files:**
- Modify: `public/templates/business/n/index.html`
- Modify: `public/templates/business/n/about.html`
- Modify: `public/templates/business/n/service.html`
- Modify: `public/templates/business/n/contact.html`

- [ ] 共通 head 要素、SEO、JSON-LD、ナビゲーション、フッターを4ページへ反映する
- [ ] `index.html` をモックアップ準拠のネオン訴求ページへ再構築する
- [ ] `about/service/contact` をテーマ整合のある下層ページへ再設計する
- [ ] 数値、住所、社名、フォーム仕様などの差し替え注意コメントを入れる

## Chunk 3: Build And Verify

### Task 3: Generate CSS and verify

**Files:**
- Generate: `public/templates/business/n/assets/css/tailwind-built.css`

- [ ] `npx @tailwindcss/cli -i public/templates/business/n/assets/css/tailwind-input.css -o public/templates/business/n/assets/css/tailwind-built.css`
- [ ] `node scripts/verify_all_pages.js`
- [ ] 必要なら `public/templates/business/n/*.html` の静的崩れを手修正する
