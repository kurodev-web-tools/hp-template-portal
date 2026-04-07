# HP-Portal Plan

## Purpose
- この文書は HP-Portal の中長期計画、背景、運用方針をまとめる補助文書とする
- 日々の進行管理や直近タスクはルートの `task.md` を正本として扱う

## Current State
- business テンプレートのリニューアルとサムネイル更新は完了済み
- 公開ポータルのサムネイル参照は `public/assets/images/thumbnails/*_v2` に統一済み
- `public` 配下の不要アーカイブ、旧サムネイル、レガシースクリプトの整理を段階的に実施済み
- `.gitignore` と運用ルールを見直し、`task.md` を日常運用の正本として扱う方針に統一済み

## Ongoing Themes

### 1. Public Asset Hygiene
- 公開に不要なアーカイブ、バックアップ、設計メモ、生成物を継続的に整理する
- `public/templates` 配下に公開不要ファイルを残さない
- サムネイル、画像、テンプレート資産の保存先ルールを維持する

### 2. Template Quality
- business / lp / portfolio / streamer の各テンプレートで公開品質を維持する
- レイアウト崩れ、モバイル表示、文言品質、リンク整合性を継続確認する
- 更新後に必要なサムネイル再生成と一覧確認を運用に組み込む

### 3. Script And Tooling Hygiene
- 再利用価値の低い one-off スクリプトは溜め込まず整理する
- 継続運用するスクリプトだけを残し、用途が分かる状態を保つ
- 生成物、監査レポート、一時ファイルが Git に混ざらない状態を維持する
- 単発移行で役目を終えたスクリプトは README と運用文書を更新したうえで削除する

### 4. Operational Consistency
- `task.md` を直近の作業計画と完了報告の正本として維持する
- `docs/AI_WORKFLOW.md` と `C:\Users\taka\.codex\AGENTS.md` の運用ルールを継続的に反映する
- 必要に応じて `docs` を簡素化し、正本と参考資料の境界を明確にする
- `docs/README.md` を起点に、運用文書と reference 文書の置き場所を揃える

## Near-Term Plan
- `public/templates` 配下の補助ファイル整理を継続する
- `scripts/` 配下の残存ツールを用途単位で見直す
- テンプレート更新後の確認手順を最小限で再利用できる形に寄せる

## Archive Note
- 過去の監査レポートや個別検証結果は、必要なら専用の履歴文書に分離する
- `docs/PLAN.md` 自体は単発レポート置き場ではなく、継続的な計画文書として保つ
