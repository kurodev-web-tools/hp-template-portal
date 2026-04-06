# AI Agent Workflow Rules for HP-Portal

このドキュメントは、AIアシスタント（Antigravity）が本プロジェクトに関わる際の行動指針と運用ルールを定義します。コンテキスト効率と情報の永続性を最大化することを目的とします。

## 1. Task Management & Synchronization

### Single Source of Truth (SSOT)
- 本プロジェクトの公式なタスク・進捗管理は **`docs/PLAN.md`**（またはルートの `task.md`）を正本とします。
- Cyber-Glass Center 等のダッシュボードはこのファイルを参照します。

### Synchronization Rule (同期ルール)
- AIは自身の作業用メモリ（`.gemini` 配下のアーティファクト）で微細なタスク管理を行っても構いませんが、**機能単位の完了時には必ず `docs/PLAN.md` のチェックボックスを更新**しなければなりません。
- 更新時は `[x]` マークを付け、必要に応じて新規機能の追記や、Gitコミット（もし行う場合）との整合性を取ります。

### Initialization & Template Usage
- プロジェクト初期化機能によって `task.md` テンプレートが作成された場合、AIは初期化後の最初の対話または作業フェーズにおいて、**このファイルを具体的な開発タスクで埋める責任**を持ちます。

## 2. Context Optimization Strategy

### Documentation
- **`docs/PLAN.md`**: 実装計画と進捗
- **`日報/project_history.md`**: 実装履歴と変更ログ
- **`docs/AI_WORKFLOW.md`**: AIの振る舞いに関するルール

## 3. Coding Standards
- **Environment**: I-M Portal Project (HP-Portal)
- **Tech Stack**: HTML/CSS/JS (Vanilla), EJS (potentially)
- **Path Handling**: Windows環境 (`\`) に注意する。
