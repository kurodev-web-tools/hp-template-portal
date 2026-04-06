# LPテンプレート共通基盤・設計思想

LP（ランディングページ）は「コンバージョン」という共通の目的を持ちつつ、商材によって「見せ方」が大きく異なります。
そのため、**「機能と骨格は共通化し、デザインと演出は個別化する」**という方針で基盤を構築します。

## 1. 共通化する範囲 (Common Infrastructure)

これらはすべてのLP（A-Z）で読み込む「標準装備」です。

### 🎨 CSS: `lp-base.css`
デザインの土台となるスタイル定義。
*   **Reset & Base**: ブラウザ差異の吸収、基本フォント設定。
*   **Layout Utilities**: フレックスボックス、グリッド、余白（`u-mb-4`等）、コンテナ幅の管理。
*   **Common Components**:
    *   ボタン（`.c-btn-primary`, `.c-btn-secondary`）：形状のベースのみ。色は変数で制御。
    *   フォーム（`.c-form-group`, `.c-input`, `.c-textarea`）：基本レイアウトとエラー状態。
    *   **Pricing（`.c-pricing-grid`）**: スマホでの横スクロール＆スナップ表示、タブ切り替え。
    *   FAQアコーディオン：開閉の基本動作スタイル（※各テンプレートで拡張可）。
    *   モーダルウィンドウ：ポップアップの基本構造。
*   **Animations**: フェードイン、スライドインなどの汎用クラス（`.js-scroll-trigger`）。

### ⚙️ JS: `lp-common.js`
LPに必須の機能ロジック。
*   **Scroll Observer**: スクロールに合わせて要素を表示する（`IntersectionObserver`）。
*   **Smooth Scroll**: ページ内リンクのスムーズスクロール。
*   **Form Validation**: 必須項目チェック、メールアドレス形式チェック。
*   **Copyright Year**: フッターの年号自動更新。
*   **Mobile Menu Toggle**: ハンバーガーメニューの開閉ロジック。

---

## 2. 個別化する範囲 (Individual Implementation)

テンプレートごとのフォルダ（`lp/a`, `lp/b`...）内で定義します。

### 📄 HTML: `index.html`
*   **構造**: 共通のクラス名（例: `.section`, `.container`）を使用しつつ、セクション構成は自由。
*   ファーストビュー（Hero）は完全に個別設計。

### 🎨 CSS: `style.css`
*   **CSS Variables**: テーマカラー（`--primary-color`）、アクセントカラー、独自のフォント指定。
*   **Unique Styles**: そのテーマ特有の装飾（和風の背景、ネオンの光彩など）。
*   **Component Overrides**: 共通ボタンの形状変更（丸角、角丸、立体など）。

### ⚙️ JS: `script.js`
*   **Gimmick**: そのテーマ固有の演出（`LP_Template_Selection_Plan.md`の「Key Feature」）。
    *   例：診断ロジック(F)、電卓機能(I)、紙吹雪エフェクト(G)。

---

## 3. ディレクトリ構成案

```text
public/
  ├── assets/               <-- 全体共通
  │   ├── css/
  │   │   └── lp-base.css   <-- LP用共通CSS
  │   └── js/
  │       └── lp-common.js  <-- LP用共通JS
  │
  └── templates/
      └── lp/
          ├── a/            <-- 個別テンプレート
          │   ├── index.html
          │   ├── style.css
          │   └── script.js
          │
          ├── b/
          ...
```

## 4. 結論：どこまで共通にするか？

> **「機能（ロジック）」と「基本クラス（ユーティリティ）」は100%共通化。**
> **「見た目（装飾）」と「構成（HTML）」は最小限の共通化にとどめる。**

無理にHTML構造（DOM）までガチガチに共通化すると、たとえば「全画面動画LP（V）」や「横スクロールLP（J）」のような尖ったデザインが作れなくなります。
**「クラス名は共通だが、中身のCSS変数は別物」**という疎結合な設計がベストです。
