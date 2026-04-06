# Business P Renewal Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `public/templates/business/p` をポップ販促テーマの4ページ構成へ刷新し、専用 CSS/JS と検証まで完了する。

**Architecture:** `index/about/service/contact` を全面差し替えし、ポップな紙面表現やステッカー演出は `assets/css/style.css` に集約する。Tailwind v4 は `tailwind-input.css` から `tailwind-built.css` を生成し、JS はメニューと出現演出、デモフォーム送信メッセージだけに留める。

**Tech Stack:** HTML, Tailwind CSS v4, vanilla JavaScript

---

## Chunk 1: Asset Base

### Task 1: Define P theme assets

**Files:**
- Create: `public/templates/business/p/assets/css/tailwind-input.css`
- Create: `public/templates/business/p/assets/css/style.css`
- Create: `public/templates/business/p/assets/js/script.js`

- [ ] Tailwind テーマ色、フォント、背景色を `tailwind-input.css` に定義する
- [ ] ポップ広告調の境界線、シャドウ、マルキー、フォーム、reduced-motion を `style.css` に定義する
- [ ] モバイルメニュー、スクロール時ヘッダー、出現アニメーション、デモフォーム送信メッセージを `script.js` に実装する

## Chunk 2: Page Rebuild

### Task 2: Replace all P pages

**Files:**
- Modify: `public/templates/business/p/index.html`
- Modify: `public/templates/business/p/about.html`
- Modify: `public/templates/business/p/service.html`
- Modify: `public/templates/business/p/contact.html`

- [ ] 共通 head 要素、SEO、JSON-LD、ナビゲーション、フッターを4ページへ反映する
- [ ] `index.html` をモックアップ準拠のポップ訴求ページへ再構築する
- [ ] `about/service/contact` をテーマ整合のある下層ページへ再設計する
- [ ] 数値、住所、社名、フォーム仕様などの差し替え注意コメントを入れる

## Chunk 3: Build And Verify

### Task 3: Generate CSS and verify

**Files:**
- Generate: `public/templates/business/p/assets/css/tailwind-built.css`

- [ ] `npx @tailwindcss/cli -i public/templates/business/p/assets/css/tailwind-input.css -o public/templates/business/p/assets/css/tailwind-built.css`
- [ ] `node scripts/review-business-templates.js`
- [ ] 必要なら `public/templates/business/p/*.html` の静的崩れを手修正する
