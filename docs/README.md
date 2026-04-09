# Docs Index

このディレクトリは「日常運用の正本」と「参照資料」を分けて扱う。

## Quick Guide
- 直近の作業を決める:
  - `../task.md`
- 中長期の背景や継続テーマを見る:
  - `PLAN.md`
- AI の基本運用ルールを確認する:
  - `AI_WORKFLOW.md`
- テンプレート更新後の検証手順を見る:
  - `TEMPLATE_STATIC_AUDIT.md`
- サムネイル更新手順を見る:
  - `THUMBNAIL_WORKFLOW.md`
- placeholder / metadata 文言の扱いを見る:
  - `TEMPLATE_METADATA_AUDIT.md`

## Operational Docs
- `../task.md`
  - 直近の作業と次アクションの正本
- `PLAN.md`
  - 中長期の方針、背景、整理済みテーマ
- `AI_WORKFLOW.md`
  - AI 運用上の前提と `task.md` 優先ルール
- `THUMBNAIL_WORKFLOW.md`
  - サムネイル更新の最小運用手順
- `TEMPLATE_METADATA_AUDIT.md`
  - placeholder / metadata 品質の監査メモ
- `TEMPLATE_STATIC_AUDIT.md`
  - 静的監査コマンドとカテゴリ別の不足傾向

## Specs
- `ROUND_TABLE_SPEC.md`
  - 個別機能・構想の仕様書

## Reference Docs
- `reference/portfolio/`
  - portfolio テンプレート設計の参考メモ
- `reference/tools/`
  - Codex / skill 運用の補助メモ

## Rule
- `task.md` と `PLAN.md` を優先し、参照資料は実行判断の正本にしない
- 単発メモや抽出結果は `docs` 直下ではなく `reference/` 配下に寄せる
- 新しい運用文書を追加する前に、既存文書へ統合できないかを先に確認する
- 迷ったら `README.md` から辿れる既存文書へ追記し、同じ用途の新規文書は増やさない
