# Quality Audit Summary

## Purpose
- 複数モデルの監査結果を統合し、公開品質上の優先課題を決める

## Inputs
- `codex/business.md`
- `codex/lp.md`
- `codex/portfolio.md`
- `codex/streamer.md`
- `kimi/business.md`
- `kimi/lp.md`
- `kimi/portfolio.md`
- `kimi/streamer.md`

## Cross-Model Findings
- `streamer` は最優先カテゴリ
  - Codex / Kimi の両方が、配信導線の仮置きと subpage 品質の弱さを指摘している
  - 特に [streamer/e/index.html](D:\hp-portal\public\templates\streamer\e\index.html) の壊れた description は公開前修正が必要
- `portfolio` は metadata 欠落より「本物感」の不足が主要課題
  - 両モデルとも stock image 依存と description の定型化を問題視している
  - `i / h / s` の近接した世界観も再整理候補
- `lp` はカテゴリ適合性と素材運用に課題が寄っている
  - `lp/p` の portfolio 寄り構成と `lp/j` の価格情報不足は Kimi 側で強く指摘
  - Codex 側は Unsplash / placeholder / `data-ai-type` 残存を重点指摘
- `business` は公開可能帯だが、starter 痕跡が残っている
  - generic placeholder、開発用コメント、`business/k` のダミー検索 UI が主な残件
  - `i / l / s` のテック系差別化不足は両モデルで重なっている

## Release Blockers
- [streamer/e/index.html](D:\hp-portal\public\templates\streamer\e\index.html)
  - broken `meta name="description"` と不完全な OGP description を修正する
- `streamer` subpages
  - `e/*`, `k/*`, `s/*`, `z/*` の generic description をページ内容に合わせて書き換える
- [lp/p/index.html](D:\hp-portal\public\templates\lp\p\index.html)
  - LP として維持するか、portfolio 側へ寄せるかを決める
- [lp/j/index.html](D:\hp-portal\public\templates\lp\j\index.html)
  - 予約 CTA 前に価格またはコース情報を補う

## High-Value Fixes
- `streamer` の共通ダミー導線を解消する
  - `data-channel-url="https://re-link.work/kurodev"` の共通化を外し、テンプレートごとの仮 URL に変える
  - `href="#"` の主要 CTA を用途に沿った仮リンクへ置き換える
- `portfolio` の description と主要画像をテンプレート固有に寄せる
  - 代表画像、プロフィール画像、works 一段目の stock 依存を減らす
  - 定型 description を職種・作風ベースの個別文言へ差し替える
- `lp` の公開ソース上の未整理要素を減らす
  - `data-ai-type` の残存を整理する
  - `placehold.co` と heavy Unsplash dependency を優先的に削る
- `business` の starter 痕跡を公開テンプレートから外す
  - 開発用コメントを docs / starter 側へ寄せる
  - generic placeholder とダミー検索 UI を解消する

## Re-Check Before Fixing
- [streamer/w/index.html](D:\hp-portal\public\templates\streamer\w\index.html)
  - Kimi の brand mismatch 指摘は spot check 上では断定しづらかったため、修正前に再確認する
- `business` の統一性指摘全般
  - 仕様上の個性と品質問題を切り分けて扱う
- `portfolio` の CDN 指摘
  - 配布方針として許容するか、完全ローカル化するかを先に決める

## Top Priorities
1. [streamer/e/index.html](D:\hp-portal\public\templates\streamer\e\index.html) の壊れた description を修正する
2. `streamer` の generic subpage description と共通ダミー導線を整理する
3. [lp/p/index.html](D:\hp-portal\public\templates\lp\p\index.html) のカテゴリ方針を決め、[lp/j/index.html](D:\hp-portal\public\templates\lp\j\index.html) に価格情報を追加する
4. `portfolio` の定型 metadata description と stock image 依存を、代表テンプレートから順に固有化する
5. `business` の開発用コメント、generic placeholder、`business/k` のダミー検索 UI を整理する

## Notes
- Static metadata / link 欠落は 2026-04-08 時点で一通り補完済み
- この summary では欠落の有無ではなく、公開品質としての妥当性を優先して整理する
- Kimi 側の監査は十分実用的で、そのまま採用可能
- ただし一部の整合性指摘は spot check 後に修正着手する
