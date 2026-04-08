# business カテゴリ品質監査レポート

**監査日**: 2026-04-08  
**監査対象**: `public/templates/business/*`  
**監査方針**: 公開品質としての妥当性、デザイン独自性、UX/情報設計、文言品質、HTML一貫性

---

## Findings（重要度順）

### HIGH

#### 1. テンプレート間のデザイン差別化が不十分（類似性問題）
- **severity**: high
- **files**: `business/i/index.html`, `business/l/index.html`, `business/s/index.html`
- **issue**: AI/データ分析系テンプレート（i, l, s）が暗色背景+ダッシュボードUIという同一パターンで、差別化が弱い
- **why**: ユーザーが「どのテンプレートを選ぶか」の判断材料が乏しく、カタログとしての価値が低下する
- **recommendation**: i（Nexus AI）はビジネスカジュアルに、l（Logical Systems）はテック/エンジニアリング寄りに、s（Decision Workspace）はSaaS/プロダクト感を強化し、色味・フォント・レイアウトで明確な差別化を図る

#### 2. ヘッダー/ナビゲーションの一貫性欠如
- **severity**: high
- **files**: 複数テンプレートで確認
- **issue**: モバイルメニューの実装パターンが統一されていない（auth-mobile-toggle, clean-mobile-toggle, ai-mobile-toggleなど、各テンプレートで別名）
- **why**: 今後の共通JSアップデート時にメンテナンスコストが増大し、バグの温床になる
- **recommendation**: `business-base.css` に標準のモバイルメニュー実装を定義し、各テンプレートはクラス名だけを上書きする方式に統一する

#### 3. OG画像の品質にばらつき
- **severity**: high
- **files**: `business/a/index.html`, `business/g/index.html`
- **issue**: OG:imageがアセット参照（`assets/images/...`）と外部生成サムネイル（`thumbnails/business_v2/...`）が混在
- **why**: SNSシェア時の見栄えがテンプレートによって大きく異なり、統一感がない
- **recommendation**: 全テンプレートでOGP画像生成パイプラインを適用し、サムネイルパスを統一する

### MEDIUM

#### 4. ブランド名の独自性・現実感の不足
- **severity**: medium
- **files**: `business/p/index.html`, `business/n/index.html`, `business/v/index.html`
- **issue**: ブランド名が「POP SPARK BOOM」「Metro Pulse」「VIVID IMPACT」など、英語の韻を重視しすぎており日本市場での違和感がある
- **why**: B2Bテンプレートとして「依頼したくなる」現実感に欠ける
- **recommendation**: 日本市場向けは「NEO-SYNC」「KIKYO」のような現実的な命名パターンを参考に、韻よりも業種との関連性を重視する

#### 5. フォント指定の揺れ
- **severity**: medium
- **files**: `business/b/index.html`, `business/d/index.html`, `business/h/index.html`
- **issue**: Google Fontsの読み込み方式に揺れ（preconnectの有無、subset指定の有無）
- **why**: パフォーマンスとフォント表示の一貫性に影響
- **recommendation**: 全テンプレートで以下のパターンに統一:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=...&display=swap" rel="stylesheet">
  ```

#### 6. CTA配置の弱さ
- **severity**: medium
- **files**: `business/m/index.html`, `business/q/index.html`, `business/r/index.html`
- **issue**: ファーストビューでCTAが見えない、またはボタンスタイルが背景と同化して目立たない
- **why**: コンバージョンを意識した導線設計が弱いと、テンプレートとしての実用価値が低下する
- **recommendation**: m（Minimal Architecture）は「Contact」への導線を強化、q（QUALITY FIRST）は「図面相談」ボタンのコントラストを上げる、r（Heritage Advisory）は初回CTAをhero内に配置

#### 7. テンプレートのページ構成の不統一
- **severity**: medium
- **files**: 複数
- **issue**: ページ構成が統一されていない（index/about/service/contactの4ページ構成と、index/about/service/project/contactの5ページ構成が混在）
- **why**: ユーザーがテンプレートを選んだ後のカスタマイズ時に混乱を招く
- **recommendation**: カテゴリごとに標準ページ構成を定義し、businessカテゴリは index/about/service/contact（4ページ）に統一する

### LOW

#### 8. コメントの残存
- **severity**: low
- **files**: `business/c/index.html`, `business/e/index.html`, `business/o/index.html`
- **issue**: 「数値は編集してください」などの開発時コメントがHTML内に残存
- **why**: 公開テンプレートとしては不要なノイズ
- **recommendation**: 全HTMLファイルから開発用コメントを削除する

#### 9. JSON-LDの型指定の揺れ
- **severity**: low
- **files**: `business/i/index.html`（WebPage）、`business/k/index.html`（Organization）、`business/s/index.html`（SoftwareApplication）
- **issue**: Schema.orgの型指定がテンプレートによって統一されていない
- **why**: SEOの一貫性に影響
- **recommendation**: businessカテゴリは `@type: Organization` を基本とし、明確にプロダクト系の場合のみ `SoftwareApplication` を使用する

#### 10. Material Iconsのウェイト指定
- **severity**: low
- **files**: 複数
- **issue**: Material Symbols Outlinedのfont-variation-settingsが統一されていない
- **why**: アイコンの見た目に微妙な違いが出る
- **recommendation**: 標準設定として `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24` を定義し、全テンプレートで統一

---

## Category Summary

### 強み
- **デザインバリエーション**: ブルータリスト（Bold Corp）、ラグジュアリー（Luxe）、和モダン（Kousei）、医療系（青葉内科）など、業種に応じた明確なビジュアル差別化ができている
- **メタデータ品質**: title/description/og タグは基本的に欠落がなく、適切に設定されている
- **モバイル対応**: 全テンプレートでレスポンシブ対応が実装されている
- **アクセシビリティ**: aria-label, aria-expanded などの基本的な属性が含まれている

### 課題
- **技術的一貫性**: CSSクラス命名、JS実装パターン、OGP画像生成が統一されていない
- **類似テンプレートの差別化**: AI/テック系テンプレートが視覚的に区別しにくい
- **命名の現実感**: 一部テンプレートのブランド名が実用性に欠ける
- **CTA設計**: ビジネス用途としての導線設計がテンプレートによって弱い

### 総合評価
公開品質としては**基準を満たしている**が、カタログとしての統一感と差別化には改善の余地がある。特に技術的実装の統一（モバイルメニュー、OGP画像、フォント読み込み）は優先して対応すべき。

---

## Priority Fixes（上位5件）

| 順位 | Issue | 対象ファイル | 推定工数 |
|------|-------|-------------|---------|
| 1 | モバイルメニュー実装の統一 | `business-base.css` + 全テンプレート | 4h |
| 2 | OGP画像生成パイプラインの適用 | 全テンプレート | 2h |
| 3 | AI/テック系テンプレートの差別化強化 | `i/`, `l/`, `s/` | 3h |
| 4 | フォント読み込みパターンの統一 | 全テンプレート | 1h |
| 5 | 開発用コメントの削除 | 全テンプレート | 1h |

---

## 備考

- 本監査は静的HTMLの品質に限定。動的機能（JS）は動作確認未実施
- アセット（画像）の実在確認は別途推奨
- テンプレート同士の差別化については、業種/用途での明確な棲み分けを推奨
