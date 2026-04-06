# AI Agent Workflow Rules for HP-Portal

このドキュメントは、AIアシスタント（Antigravity）が本プロジェクトに関わる際の行動指針と運用ルールを定義します。コンテキスト効率と情報の永続性を最大化することを目的とします。

## 1. Task Management & Synchronization

### Single Source of Truth (SSOT)
- 本プロジェクトの日常運用における公式なタスク・進捗管理の正本は **ルートの `task.md`** とします。
- `docs/PLAN.md` は中長期の計画、背景、フェーズ整理、設計意図の共有に使う補助文書とします。
- Cyber-Glass Center 等のダッシュボードや AI の実行判断は、直近の実行計画として `task.md` を優先して参照します。

### Synchronization Rule (同期ルール)
- AI は作業前に `task.md` を確認し、現在の作業内容と整合しているかを確認します。
- AI は自身の作業用メモリ（`.gemini` 配下のアーティファクト）で微細なタスク管理を行っても構いませんが、**機能単位の完了時には必ず `task.md` を更新**しなければなりません。
- 更新時は完了内容、残課題、次アクションを反映し、必要に応じて Git コミット内容との整合性を取ります。
- `task.md` と `docs/PLAN.md` に差分がある場合、直近の実行判断は `task.md` を優先します。

### Initialization & Template Usage
- プロジェクト初期化機能によって `task.md` テンプレートが作成された場合、AIは初期化後の最初の対話または作業フェーズにおいて、**このファイルを具体的な開発タスクで埋める責任**を持ちます。

## 2. Context Optimization Strategy

### Documentation
- **`task.md`**: 実行中のタスク、完了状況、次アクションの正本
- **`docs/PLAN.md`**: 中長期の計画、背景、フェーズ整理
- **`日報/project_history.md`**: 実装履歴と変更ログ
- **`docs/AI_WORKFLOW.md`**: AIの振る舞いに関するルール

## 3. Coding Standards
- **Environment**: I-M Portal Project (HP-Portal)
- **Tech Stack**: HTML/CSS/JS (Vanilla), EJS (potentially)
- **Path Handling**: Windows環境 (`\`) に注意する。
