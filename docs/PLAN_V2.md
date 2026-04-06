# 多角的なセキュリティ監査・改善計画 (V2)

独自ドメイン (`templates.kuro-lab.com`) での本番運用をより高品質かつ堅牢にするための、多角的な改善計画です。

## 監査の視点

### 1. セキュリティの深掘り (Security Depth)
- **依存関係の修正**: `pnpm audit` で検出された `minimatch` (ReDoS) および `nodemailer` の脆弱性を `pnpm update` または `pnpm.overrides` で修正。
- **XSS防御の徹底**: すべてのフロントエンドスクリプト (`list.js`, `script.js` 等) から `innerHTML` を排除し、安全な DOM 操作に完全移行（一部完了）。
- **APIエンドポイントの防御**: レート制限とペイロード検証の強化。

### 2. パフォーマンスとUX (Performance & UX)
- **多地点 Lighthouse 監査**: 以下の主要ページを監査対象とし、Performance 90点以上を目指す。
    - `index.html` (トップ)
    - `list.html` (ギャラリー: JS負荷と画像読み込みの最適化)
    - `plans.html` (プラン選択)
    - `order-premium.html` (カスタムオーダー)
- **エラーハンドリングの強化**: ネットワークエラー時や API 失敗時のユーザーへの視覚的フィードバック（トースト通知等）の改善。

### 3. インフラとスケーラビリティ (Infrastructure)
- **CI/CD 自動化の導入**: `.github/workflows/deploy.yml` の実用化（Cloudflare API連携）。
- **WebP アセット化**: ポートフォリオ画像の次世代形式化の検討。

---

## オーケストレーション・プラン

### Phase 1: 依存関係とフロントエンドの硬化 (Implementation)
- `security-auditor`: `pnpm update` による脆弱性解消。
- `frontend-specialist`: `list.js` 以外の `innerHTML` 排除とエラー通知 UI の追加。

### Phase 2: 最適化と検証 (Verification)
- `performance-optimizer`: 4つの主要ページでの Lighthouse 実行とボトルネック解消。
- `test-engineer`: 全フォーム（Standard/Premium）の正常系・異常系テストの完遂。

## 検証プラン
- [ ] 4つの主要ページすべてで Lighthouse Performance 90+ を達成。
- [ ] `pnpm audit` で High/Moderate な脆弱性が 0 であることを確認。
- [ ] モバイル環境での `list.html` のスクロールが 60fps を維持しているか手動確認。

