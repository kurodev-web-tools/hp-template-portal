# Business A/C/K Follow-up Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `business/k`, `business/a`, `business/c` のトップページ品質を、アーカイブの世界観と現在のブラウザ表示の両面から引き上げる。

**Architecture:** まず `K` の未完成に見えるプレースホルダー依存を除去し、誌面・知識拠点として成立するトップページへ再設計する。次に `A` のヒーロー破綻を直し、最後に `C` の医療テンプレートとしての信頼材料をファーストビューへ補強する。各テンプレートとも `index.html` を主対象にし、必要最小限で CSS/画像参照を調整する。

**Tech Stack:** 静的 HTML, Tailwind v4, 各テンプレート固有 CSS / JS, `chrome-devtools`, `node scripts/review-business-templates.js`

---

## Scope

- 改修対象
  - `public/templates/business/k/index.html`
  - `public/templates/business/a/index.html`
  - `public/templates/business/c/index.html`
- 必要に応じて参照・改修
  - `public/templates/business/k/assets/css/style.css`
  - `public/templates/business/a/assets/css/style.css`
  - `public/templates/business/c/assets/css/style.css`
  - `public/templates/business/*/assets/generated/external-image-*.svg`
- 参照モックアップ
  - `public/v2_stitch_archive/business/knowledge_plaza_of_exploration/screen.png`
  - `public/v2_stitch_archive/business/authentic_tradition_innovation_homepage/screen.png`
  - `public/v2_stitch_archive/business/clean_trust_medical_health_tech_homepage/screen.png`

## Success Criteria

- `K` のヒーローと刊行物エリアがプレースホルダーに見えない
- `A` のヒーロー左側に破綻して見える文字片や背景ノイズが残らない
- `C` のファーストビューで医療系テンプレートとしての信頼材料が一目で伝わる
- 各テンプレートが `review-business-templates.js` で重大問題なし
- ブラウザ確認で「崩れて見える」箇所が消えている

---

## Chunk 1: Template K

### Task 1: 現状確認と設計固定

**Files:**
- Read: `public/templates/business/k/index.html`
- Read: `public/v2_stitch_archive/business/knowledge_plaza_of_exploration/screen.png`
- Output: `artifacts/k-index-review.png`

- [ ] `K` の現行トップをブラウザで再確認し、未完成に見える箇所を 3 点以内に要約する
- [ ] アーカイブの強みを整理する
  - 図書館・資料室の重量感
  - 誌面・刊行物の密度
  - 学術機関らしい静かな格調
- [ ] 改修方針を固定する
  - プレースホルダー画像を使い続けない
  - 画像が弱い箇所は誌面型 UI に置き換える
  - CTA は維持しつつ下段の情報密度を上げる

### Task 2: Hero の再設計

**Files:**
- Modify: `public/templates/business/k/index.html`
- Modify: `public/templates/business/k/assets/css/style.css` またはインライン調整箇所

- [ ] Hero の `external-image-01.svg` 依存を除去または弱める
- [ ] 背景を以下のどちらかで再構成する
  - 実画像へ差し替える
  - 罫線、紙面パネル、章見出し、注記を使った誌面型ヒーローに置換する
- [ ] ヒーロー下の数値帯に編集注記を追加する
- [ ] 見出し、導入文、CTA の優先順位を保ちつつ、白っぽい未完成感を消す

### Task 3: Latest Publications の再設計

**Files:**
- Modify: `public/templates/business/k/index.html`

- [ ] `external-image-02.svg`, `03.svg`, `04.svg` を使う 3 枚の刊行物カードを再設計する
- [ ] 画像が弱い場合は以下のいずれかを採用する
  - 書影風のローカル図版
  - テキスト主体の論文カード
  - 図版 + 注釈 + 年号の学術誌面カード
- [ ] カードごとの高さと余白を詰め、一覧が空白だらけに見えないようにする
- [ ] 英文コピーが浮いている箇所は日本語中心へ揃える

### Task 4: K の検証

**Files:**
- Verify: `public/templates/business/k/index.html`
- Verify: `codexレビュー結果/template-k-review.md`

- [ ] `npx @tailwindcss/cli -i public/templates/business/k/assets/css/tailwind-input.css -o public/templates/business/k/assets/css/tailwind-built.css` を実行する
- [ ] `node scripts/review-business-templates.js` を実行し、`template-k-review.md` を確認する
- [ ] ブラウザで `k/index.html` を再確認し、スクリーンショットを保存する

---

## Chunk 2: Template A

### Task 5: Hero ノイズの除去

**Files:**
- Modify: `public/templates/business/a/index.html`
- Modify: `public/templates/business/a/assets/css/style.css` またはインライン調整箇所

- [ ] ヒーロー背景の `external-image-02.svg` による文字片・破綻感を除去する
- [ ] アーカイブの方向性に合わせて、背景を以下のどちらかへ寄せる
  - 格調高い建築 / 空間写真ベース
  - 写真を使わない濃色エディトリアル型
- [ ] 左下の白パネルは活かしつつ、背景とのコントラストを再調整する
- [ ] 歴史・格調・信頼が伝わる補助要素を 1 つ追加する
  - 年代帯
  - クレスト / 紋章風ディテール
  - 実績や沿革の短い注釈

### Task 6: A のファーストビュー品質確認

**Files:**
- Verify: `public/templates/business/a/index.html`
- Verify: `codexレビュー結果/template-a-review.md`

- [ ] Tailwind を再ビルドする
- [ ] `review-business-templates.js` を再実行する
- [ ] ブラウザ確認で、左端のノイズと背景の未完成感が消えていることを確認する

---

## Chunk 3: Template C

### Task 7: 医療テンプレートとしての信頼材料を補強

**Files:**
- Modify: `public/templates/business/c/index.html`
- Modify: `public/templates/business/c/assets/css/style.css` またはインライン調整箇所

- [ ] ヒーロー背景のプレースホルダー感を弱める、または除去する
- [ ] ファーストビューに信頼材料を 2 つ以上追加する
  - 診療時間
  - 専門外来
  - 医師 / スタッフ体制
  - 初診案内
- [ ] 今の「淡い箱」だけで終わらないように、右側または下側へ情報補助面を追加する
- [ ] 医療らしい清潔感は維持しつつ、のっぺり感を減らす

### Task 8: C の検証

**Files:**
- Verify: `public/templates/business/c/index.html`
- Verify: `codexレビュー結果/template-c-review.md`

- [ ] Tailwind を再ビルドする
- [ ] `review-business-templates.js` を再実行する
- [ ] ブラウザ確認で、ヒーローの背景ノイズと情報不足感が解消したか確認する

---

## Chunk 4: Optional Technical Cleanup

### Task 9: 外部画像依存の棚卸し

**Files:**
- Read/Modify: `public/templates/business/b/**/*.html`
- Read/Modify: `public/templates/business/d/**/*.html`
- Read/Modify: `public/templates/business/o/**/*.html`

- [ ] `B`, `D`, `O` の外部画像 URL を一覧化する
- [ ] 見た目を崩さずローカル化できるものを優先順位順に整理する
- [ ] この段階では実装するか、別プランへ切るかを判断する

---

## Verification Commands

- `npx @tailwindcss/cli -i public/templates/business/k/assets/css/tailwind-input.css -o public/templates/business/k/assets/css/tailwind-built.css`
- `npx @tailwindcss/cli -i public/templates/business/a/assets/css/tailwind-input.css -o public/templates/business/a/assets/css/tailwind-built.css`
- `npx @tailwindcss/cli -i public/templates/business/c/assets/css/tailwind-input.css -o public/templates/business/c/assets/css/tailwind-built.css`
- `node scripts/review-business-templates.js`

## Notes

- `K` は構造再設計寄りなので、最も手数が多い
- `A` は大改修よりヒーロー再構成が中心
- `C` は大幅刷新ではなく、信頼材料の追加とファーストビューの密度調整が主
- `L` と `O` は現状維持でよく、今回の主対象には含めない
