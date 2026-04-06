# Business D/F/H/O Follow-up Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `business/d`, `business/f`, `business/h`, `business/o` を、対応するアーカイブモックアップの情報設計と世界観に近づけつつ、現行の独自性を残したままトップページ品質を引き上げる。

**Architecture:** `D` は過度にアクション寄りになったトップを B2B テック寄りへ戻し、`F` は演出偏重を抑えて IT 企業としての読める構成へ補強する。`H` は黒場中心の疎さを上質な写真・質感演出へ置き換え、`O` は余白過多なファーストビューを圧縮してウェルネス訴求を1画面目に集約する。各テンプレートとも `index.html` を主対象にし、必要最小限の CSS とローカル素材を追加する。

**Tech Stack:** 静的 HTML, Tailwind v4, 各テンプレート固有 CSS / JS, `chrome-devtools`, `node scripts/review-business-templates.js`

---

## Scope

- 改修対象
  - `public/templates/business/d/index.html`
  - `public/templates/business/f/index.html`
  - `public/templates/business/h/index.html`
  - `public/templates/business/o/index.html`
- 必要に応じて参照・改修
  - `public/templates/business/d/assets/css/style.css`
  - `public/templates/business/f/assets/css/style.css`
  - `public/templates/business/h/assets/css/style.css`
  - `public/templates/business/o/assets/css/style.css`
  - `public/templates/business/*/assets/generated/*.svg`
- 参照モックアップ
  - `public/v2_stitch_archive/business/dynamic_tech_startup_homepage/screen.png`
  - `public/v2_stitch_archive/business/future_it_solutions_homepage/screen.png`
  - `public/v2_stitch_archive/business/high_end_luxury_experience/screen.png`
  - `public/v2_stitch_archive/business/organic_flow_wellness_homepage/screen.png`

## Success Criteria

- `D` が「勢いのあるアクション LP」だけでなく、B2B テック企業サイトとして読める
- `F` のファーストビューで、企業の提供価値と IT 基盤感がすぐ伝わる
- `H` の上質さが黒ベタではなく写真・光・素材感で出る
- `O` の1画面目で、世界観とサービス導線が同時に見える
- 各テンプレートが `review-business-templates.js` で重大問題なし
- ブラウザ確認で、アーカイブ比較時の弱点が視覚的に改善されている

---

## Chunk 1: Template D

### Task 1: モックアップとの差分固定

**Files:**
- Read: `public/templates/business/d/index.html`
- Read: `public/v2_stitch_archive/business/dynamic_tech_startup_homepage/screen.png`
- Output: `artifacts/d-index-review-4.png`

- [ ] 現行 `D` のトップで、B2B テック感を弱めている要素を 3 点以内に要約する
- [ ] アーカイブ側の強みを整理する
  - プロダクト感のあるヒーロー
  - 指標パネルの説得力
  - 企業向けサイトとしての読みやすい順序
- [ ] 改修方針を固定する
  - オレンジの勢いは残す
  - 1画面目か2ブロック目にプロダクト面を戻す
  - 速度感だけでなく導入判断材料を見せる

### Task 2: D のトップ再構成

**Files:**
- Modify: `public/templates/business/d/index.html`
- Modify: `public/templates/business/d/assets/css/style.css`
- Modify/Create: `public/templates/business/d/assets/generated/*.svg`

- [ ] ヒーロー内に B2B 向けの価値訴求を 1 ブロック追加する
- [ ] 速度・可用性・導入社数などの指標パネルを上側へ寄せる
- [ ] アクションスタジオに見えやすい抽象モチーフを減らし、プロダクト UI や構成図を補う
- [ ] CTA の文言と文脈を「視聴」寄りから「導入相談」寄りへ再調整する

### Task 3: D の検証

**Files:**
- Verify: `public/templates/business/d/index.html`
- Verify: `codexレビュー結果/template-d-review.md`

- [ ] Tailwind を再ビルドする
- [ ] `node scripts/review-business-templates.js` を実行する
- [ ] ブラウザで再確認し、比較用スクリーンショットを保存する

---

## Chunk 2: Template F

### Task 4: 演出と情報の比率調整

**Files:**
- Read: `public/templates/business/f/index.html`
- Read: `public/v2_stitch_archive/business/future_it_solutions_homepage/screen.png`
- Output: `artifacts/f-index-review.png`

- [ ] 現行 `F` の装飾が強すぎる箇所を洗い出す
- [ ] アーカイブの「企業サイトとしての安心感」を構成する要素を整理する
  - 明確な主見出し
  - 具体的な機能カード
  - 実在感のある UI 面
- [ ] 改修方針を固定する
  - 粒子・グリッチは主役にしない
  - 提供価値と基盤技術を前に出す

### Task 5: F のヒーローと中段補強

**Files:**
- Modify: `public/templates/business/f/index.html`
- Modify: `public/templates/business/f/assets/css/style.css`

- [ ] ヒーロー見出しの可読性と会社説明を強化する
- [ ] 1画面目か直下に、ネットワーク・量子・暗号・クラウドなどの機能帯を追加する
- [ ] 見せ場として使う UI パネルを 1 つ明確に置く
- [ ] 世界観は維持しつつ、コーポレート寄りの整然さを増やす

### Task 6: F の検証

**Files:**
- Verify: `public/templates/business/f/index.html`
- Verify: `codexレビュー結果/template-f-review.md`

- [ ] Tailwind を再ビルドする
- [ ] `node scripts/review-business-templates.js` を実行する
- [ ] ブラウザで視認性と情報密度を確認する

---

## Chunk 3: Template H

### Task 7: 高級感の出し方を再設計

**Files:**
- Read: `public/templates/business/h/index.html`
- Read: `public/v2_stitch_archive/business/high_end_luxury_experience/screen.png`
- Output: `artifacts/h-index-review.png`

- [ ] 現行 `H` の「黒いが中身が薄く見える」原因を要約する
- [ ] アーカイブの高級感がどこから出ているかを整理する
  - 写真の質感
  - 余白と編集感
  - 落ち着いた黄金色アクセント
- [ ] 改修方針を固定する
  - 黒場は減らしすぎない
  - ただしファーストビューに素材感を足す

### Task 8: H のファーストビュー改善

**Files:**
- Modify: `public/templates/business/h/index.html`
- Modify: `public/templates/business/h/assets/css/style.css`
- Modify/Create: `public/templates/business/h/assets/generated/*.svg`

- [ ] ヒーローまたは2ブロック目に上質な空間写真・図版を強く置く
- [ ] 文字だけで成立させていた部分に、光・素材・ディテールの視覚情報を追加する
- [ ] CTA 周辺の余白配分を調整し、未完成に見える黒場を減らす
- [ ] ラグジュアリー感を損なわずに情報の密度を少し上げる

### Task 9: H の検証

**Files:**
- Verify: `public/templates/business/h/index.html`
- Verify: `codexレビュー結果/template-h-review.md`

- [ ] Tailwind を再ビルドする
- [ ] `node scripts/review-business-templates.js` を実行する
- [ ] ブラウザで高級感と疎さのバランスを確認する

---

## Chunk 4: Template O

### Task 10: 1画面目の圧縮と導線整理

**Files:**
- Read: `public/templates/business/o/index.html`
- Read: `public/v2_stitch_archive/business/organic_flow_wellness_homepage/screen.png`
- Output: `artifacts/o-index-review-3.png`

- [ ] 現行 `O` の余白過多に見える原因を要約する
- [ ] アーカイブの良さを整理する
  - 1画面目で世界観とサービスが両立
  - 緑のアクセントが行動導線に効いている
  - 下段カードへのつながりが早い
- [ ] 改修方針を固定する
  - 静かな空気感は残す
  - ただしヒーローだけで引っ張りすぎない

### Task 11: O のトップ再調整

**Files:**
- Modify: `public/templates/business/o/index.html`
- Modify: `public/templates/business/o/assets/css/style.css`

- [ ] ヒーローの高さを圧縮する
- [ ] サービスカードまたは指標ブロックを1画面目に少し食い込ませる
- [ ] テキストと画像の間延びを減らし、一覧サムネイルでも内容が見えるようにする
- [ ] 世界観を壊さず、予約・体験導線を早めに見せる

### Task 12: O の検証

**Files:**
- Verify: `public/templates/business/o/index.html`
- Verify: `codexレビュー結果/template-o-review.md`

- [ ] Tailwind を再ビルドする
- [ ] `node scripts/review-business-templates.js` を実行する
- [ ] ブラウザでファーストビューの密度を確認する

---

## Verification Commands

- `npx @tailwindcss/cli -i public/templates/business/d/assets/css/tailwind-input.css -o public/templates/business/d/assets/css/tailwind-built.css`
- `npx @tailwindcss/cli -i public/templates/business/f/assets/css/tailwind-input.css -o public/templates/business/f/assets/css/tailwind-built.css`
- `npx @tailwindcss/cli -i public/templates/business/h/assets/css/tailwind-input.css -o public/templates/business/h/assets/css/tailwind-built.css`
- `npx @tailwindcss/cli -i public/templates/business/o/assets/css/tailwind-input.css -o public/templates/business/o/assets/css/tailwind-built.css`
- `node scripts/review-business-templates.js`

## Notes

- 優先順位は `D → F → H → O`
- `D` と `F` は情報設計の補強が主、`H` と `O` はファーストビューの視覚密度調整が主
- すべて `index.html` 中心で進め、下層ページには必要が出た場合のみ波及させる
