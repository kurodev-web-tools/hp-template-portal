# Round Table エージェントシステム 仕様設計書

> version: 0.1.0
> 作成日：2026-04-02
> コンセプト：AI エージェントによる円卓会議形式タスクオーケストレーション

---

## 1. システム概要

### 1.1 プロジェクトコンセプト

「円卓の騎士」メタファーを用いたマルチエージェントオーケストレーションシステム

- 各エージェントは独立した役割（騎士）を持つ
- 重要な決定は「円卓会議」によって民主的に承認される（7/13 以上）
- 既存の AI サブスクリプションを最大限活用し、コスト効率を最適化
- Web UI で可視化・操作可能

### 1.2 コアバリュー

| 価値 | 説明 |
|------|------|
| 🛡️ **コスト最適化** | 既存サブスク活用、月額 ~6,000-9,000 円 |
| ⚔️ **専門化** | 各騎士が特定タスクに特化 |
| 🏰 **透明性** | 円卓 UI で全エージェントの状態を可視化 |
| 📜 **承認プロセス** | 13 人の騎士による民主的承認システム |

---

## 2. システムアーキテクチャ

### 2.1 全体構成図

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                               │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │   Round Table Portal (Next.js 15 + TypeScript)                  │ │
│  │   - 円卓ダッシュボード (リアルタイムステータス)                  │ │
│  │   - 騎士個別 UI (タスク詳細、成果物プレビュー)                    │ │
│  │   - 会議ビュー (承認プロセス可視化)                              │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                          WebSocket / SSE
                                    │
┌─────────────────────────────────────────────────────────────────────┐
│                         BACKEND LAYER                                │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │   Round Table Core (Node.js 22 + Express/Fastify)               │ │
│  │   - エージェントオーケストレーター                                │ │
│  │   - タスクキュー管理 (BullMQ + Redis)                           │ │
│  │   - 状態管理 (PostgreSQL)                                       │ │
│  │   - 円卓会議プロトコル                                           │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  AI PROVIDERS    │    │  EXTERNAL APIs   │    │  LOCAL TOOLS     │
├──────────────────┤    ├──────────────────┤    ├──────────────────┤
│ • ChatGPT Plus   │    │ • Google Flow    │    │ • Git            │
│   (GPT-5.4)      │    │   (Gemini Web)   │    │ • npm/yarn       │
│ • Gemini Pro     │    │ • Remotion       │    │ • Docker         │
│ • Alibaba Code   │    │                  │    │                  │
│   (Qwen2.5)      │    │                  │    │                  │
└──────────────────┘    └──────────────────┘    └──────────────────┘
```

### 2.2 セッション管理レイヤー

```
┌─────────────────────────────────────────────────────────────────────┐
│              SESSION MANAGER (CLI ラッパー)                         │
│  (各サブスクのセッションを管理・多重化)                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │
│  │ ChatGPT     │  │ Gemini      │  │ Alibaba     │                  │
│  │ セッション  │  │ セッション  │  │ セッション  │                  │
│  │ (5 時間制限) │  │ (レート厳)  │  │ (レート緩)  │                  │
│  └─────────────┘  └─────────────┘  └─────────────┘                  │
│                                                                      │
│  • 騎士ごとに独立コンテキスト                                         │
│  • レートリミット監視・自動調整                                       │
│  • 優先度ベースキューイング                                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. エージェント定義（円卓の騎士たち）

### 3.1 騎士一覧

| 騎士名 | 役割 | 担当タスク | 使用モデル | 承認権限 |
|--------|------|------------|------------|----------|
| 🏰 **アーサー** | 王 / 最終承認 | 方向性決定、最終承認 | GPT-5.4 (ChatGPT Plus CLI) | ✅ |
| ⚔️ **ランスロット** | 最強騎士 / 動画 | 動画生成、アニメーション | GPT-5.4-mini (ChatGPT Plus) | ✅ |
| 🛡️ **ガラハド** | 聖騎士 / 審査 | コードレビュー、セキュリティ | GPT-5.4 (ChatGPT Plus CLI) | ✅ |
| 🎨 **ガレス** | 美の騎士 / 画像 | 画像生成、デザイン | Gemini Pro | ✅ |
| 💻 **ケイ** | 家宰 / 開発 | コード生成、ターミナル | GPT-5.4 (ChatGPT Plus CLI) | ✅ |
| 📋 **ベディヴィア** | 忠臣 / タスク管理 | プロジェクト管理、進捗 | Qwen2.5-Coder (Alibaba Code) | ✅ |
| 🌲 **パーシバル** | 森の騎士 / 調査 | リサーチ、情報収集 | Qwen2.5-Coder (Alibaba Code) | ✅ |
| 🔥 **トリスタン** | 楽団員 / 创意 | 企画立案、ブレインストーミング | GPT-5.4-mini (ChatGPT Plus) | ✅ |
| 🌊 **ガフリス** | 水辺の騎士 / データ | データ処理、ETL | Qwen2.5-Coder (Alibaba Code) | ✅ |
| 📱 **ボーズ** | 技術騎士 / フロントエンド | UI/UX 設計、React | GPT-5.4 (ChatGPT Plus CLI) | ✅ |
| 🔧 **ケイ（弟）** | 副家宰 / テスト | テスト作成、QA | Qwen2.5-Coder (Alibaba Code) | ✅ |
| 🌙 **モルドレッド** | 影の騎士 / 批判的検討 | リスク分析、代替案 | GPT-5.4 (ChatGPT Plus CLI) | ✅ |
| 🌟 **ラグレット** | 希望騎士 / 最適化 | コスト最適化、効率化 | Qwen2.5-Coder (Alibaba Code) | ✅ |

**承認定数**: 13 人中 7 人以上の承認で可決

### 3.2 エージェントベースクラス

```typescript
// /src/agents/base/Knight.ts

export interface KnightConfig {
  id: string;
  name: string;
  role: string;
  description: string;
  model: ModelProvider;
  maxTokens: number;
  rateLimitPerHour: number;
  hasApprovalVote: boolean;
}

export interface Task {
  id: string;
  type: TaskType;
  priority: 'low' | 'medium' | 'high' | 'critical';
  input: unknown;
  context?: TaskContext;
  createdAt: Date;
  assignedTo?: string;
}

export interface TaskResult {
  success: boolean;
  output: unknown;
  artifacts?: Artifact[];
  message?: string;
  error?: Error;
}

export abstract class Knight {
  protected config: KnightConfig;
  protected status: KnightStatus;
  protected currentTask: Task | null;

  abstract execute(task: Task): Promise<TaskResult>;
  abstract vote(proposal: Proposal): Promise<Vote>;

  getStatus(): KnightStatus;
  assignTask(task: Task): void;
  completeTask(): TaskResult | null;
}
```

### 3.3 騎士実装例（ケイ - 開発）

```typescript
// /src/agents/impl/Kei.ts

export class Kei extends Knight {
  constructor() {
    super({
      id: 'knight-kei',
      name: 'ケイ',
      role: '家宰',
      description: '開発タスクを担当する騎士。CLI 操作、コード生成を行う。',
      model: 'chatgpt-plus',
      maxTokens: 8192,
      rateLimitPerHour: 60,
      hasApprovalVote: true,
    });
  }

  async execute(task: Task): Promise<TaskResult> {
    // ChatGPT Plus CLI を subprocess で起動
    // コード生成、ファイル操作、ターミナルコマンド実行
  }

  async vote(proposal: Proposal): Promise<Vote> {
    // 技術的実現可能性に基づき投票
  }
}
```

---

## 4. 承認システム（円卓会議プロトコル）

### 4.1 承認フロー

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   提案作成   │────▶│  騎士に配布  │────▶│   投票集計   │
│  (Proposal) │     │ (13 人)      │     │  (7/13 確認) │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                          ┌────────────────────┘
                          ▼
                   ┌─────────────┐
                   │  承認/却下   │
                   │  結果通知    │
                   └─────────────┘
```

### 4.2 Proposal データ構造

```typescript
interface Proposal {
  id: string;
  title: string;
  description: string;
  type: 'feature' | 'refactor' | 'bugfix' | 'architecture';
  impact: 'low' | 'medium' | 'high';
  submittedBy: string;
  submittedAt: Date;

  // 承認状態
  votes: Vote[];
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  deadline: Date;

  // 関連資料
  attachments: Attachment[];
}

interface Vote {
  knightId: string;
  vote: 'approve' | 'reject' | 'abstain';
  reason?: string;
  votedAt: Date;
}
```

### 4.3 承認ルール

| 提案タイプ | 必要承認数 | 投票期限 |
|------------|------------|----------|
| 機能追加 (feature) | 7/13 | 24 時間 |
| リファクタ (refactor) | 5/13 | 12 時間 |
| 緊急バグ修正 (bugfix) | 3/13 | 1 時間 |
| アーキテクチャ変更 | 9/13 | 48 時間 |

---

## 5. データベーススキーマ

### 5.1 PostgreSQL

```sql
-- 騎士（エージェント）定義
CREATE TABLE knights (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  config JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- タスク
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL,
  priority VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  assigned_to VARCHAR(50) REFERENCES knights(id),
  input JSONB NOT NULL,
  result JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- 提案（円卓会議）
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  submitted_by VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  deadline TIMESTAMP
);

-- 投票
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES proposals(id),
  knight_id VARCHAR(50) REFERENCES knights(id),
  vote VARCHAR(20) NOT NULL,
  reason TEXT,
  voted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(proposal_id, knight_id)
);

-- 成果物（画像、動画、コード等）
CREATE TABLE artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id),
  type VARCHAR(50) NOT NULL,
  path VARCHAR(500) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 6. API 設計

### 6.1 REST API エンドポイント

```
# 騎士管理
GET    /api/knights              # 騎士一覧
GET    /api/knights/:id          # 騎士詳細
GET    /api/knights/:id/status   # ステータス
POST   /api/knights/:id/task     # タスク割り当て

# タスク管理
GET    /api/tasks                # タスク一覧
POST   /api/tasks                # タスク作成
GET    /api/tasks/:id            # タスク詳細
DELETE /api/tasks/:id            # タスクキャンセル

# 円卓会議
GET    /api/proposals            # 提案一覧
POST   /api/proposals            # 提案作成
GET    /api/proposals/:id        # 提案詳細
POST   /api/proposals/:id/vote   # 投票

# 成果物
GET    /api/artifacts            # 成果物一覧
GET    /api/artifacts/:id        # 成果物詳細
GET    /api/artifacts/:id/file   # ファイルダウンロード
```

### 6.2 WebSocket イベント

```typescript
// サーバー → クライアント
type ServerEvent =
  | { type: 'knight:status:update'; knightId: string; status: KnightStatus }
  | { type: 'task:progress'; taskId: string; progress: number }
  | { type: 'task:complete'; taskId: string; result: TaskResult }
  | { type: 'proposal:vote'; proposalId: string; vote: Vote }
  | { type: 'proposal:result'; proposalId: string; result: ProposalResult };

// クライアント → サーバー
type ClientEvent =
  | { type: 'task:assign'; knightId: string; task: Task }
  | { type: 'proposal:submit'; proposal: Proposal }
  | { type: 'proposal:vote'; proposalId: string; vote: Vote };
```

---

## 7. フロントエンド構成

### 7.1 ディレクトリ構造

```
src/
├── app/                      # Next.js 15 App Router
│   ├── page.tsx              # 円卓ダッシュボード
│   ├── knights/              # 騎士個別ページ
│   │   └── [id]/page.tsx
│   ├── proposals/            # 円卓会議
│   │   └── [id]/page.tsx
│   └── artifacts/            # 成果物ギャラリー
│       └── [id]/page.tsx
├── components/
│   ├── RoundTable.tsx        # 円卓 UI コンポーネント
│   ├── KnightCard.tsx        # 騎士ステータスカード
│   ├── TaskList.tsx          # タスクリスト
│   ├── ProposalVoting.tsx    # 投票 UI
│   └── ArtifactPreview.tsx   # 成果物プレビュー
├── hooks/
│   ├── useKnightStatus.ts
│   ├── useTaskSubscription.ts
│   └── useWebSocket.ts
└── lib/
    ├── api.ts
    └── websocket.ts
```

### 7.2 円卓 UI デザインコンセプト

```
                    ┌─────────────────────────────────┐
                    │      Round Table Dashboard      │
                    │     2026-04-02 14:30:00        │
                    └─────────────────────────────────┘

         🏰 アーサー              ⚔️ ランスロット
        [承認待ち]                [動画生成中 75%]
              ╱│╲                    │
             ╱ │ ╲                   │
            ╱  │  ╲                  │
    🛡️ガラハド──(円)──🎨ガレス
   [レビュー中]  │卓   [待機中]
                │
                │
    💻 ケイ ────┼──── 📋 ベディヴィア
   [CLI 実行中]  │    [タスク管理]
                │
         🌲 パーシバル
          [調査中]


    凡例：
    🟢 待機中  🟡 処理中  🔴 エラー  ⚫ オフライン
```

---

## 8. CLI ラッパーアーキテクチャ（API 不使用）

### 8.1 基本方針

**既存サブスクの CLI/Web をラップして使用する**

- API 課金は一切行わない
- 月額固定費のみで運用
- レートリミット内で最適化

### 8.2 モデル割り当て（改）

| 騎士 | 担当 | 使用モデル | 基盤 |
|------|------|------------|------|
| 🏰 **アーサー** | 王 / 最終承認 | GPT-5.4 | ChatGPT Plus CLI |
| ⚔️ **ランスロット** | 動画 | GPT-5.4-mini | ChatGPT Plus |
| 🛡️ **ガラハド** | 審査 | GPT-5.4 | ChatGPT Plus CLI |
| 🎨 **ガレス** | 画像 | Gemini Pro | Gemini Web/CLI |
| 💻 **ケイ** | 開発 | GPT-5.4 | ChatGPT Plus CLI |
| 📋 **ベディヴィア** | タスク管理 | Qwen2.5-Coder | Alibaba Code |
| 🌲 **パーシバル** | 調査 | Qwen2.5-Coder | Alibaba Code |
| 🔥 **トリスタン** | 企画 | GPT-5.4-mini | ChatGPT Plus |
| 🌊 **ガフリス** | データ | Qwen2.5-Coder | Alibaba Code |
| 📱 **ボーズ** | フロントエンド | GPT-5.4 | ChatGPT Plus CLI |
| 🔧 **ケイ（弟）** | テスト | Qwen2.5-Coder | Alibaba Code |
| 🌙 **モルドレッド** | リスク分析 | GPT-5.4 | ChatGPT Plus CLI |
| 🌟 **ラグレット** | 最適化 | Qwen2.5-Coder | Alibaba Code |

**戦略**:
- 重要な判断（承認/審査/開発）→ GPT-5.4（高精度）
- 軽量タスク（管理/調査/データ）→ Qwen2.5-Coder（レート緩め）
- 画像生成 → Gemini Pro（Google Flow 統合）

### 8.3 CLI ラッパー構造

```typescript
// /src/providers/CliWrapper.ts

export class CliWrapper {
  private process: ChildProcess | null = null;
  private session: Map<string, Message> = new Map();

  // ChatGPT Plus CLI を起動して対話
  async spawn(provider: 'chatgpt' | 'gemini' | 'alibaba'): Promise<void> {
    const command = this.getCommand(provider);
    this.process = spawn(command, {
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  }

  // メッセージ送信（ストリーミング受信）
  async send(prompt: string, context?: Message[]): Promise<AsyncIterable<string>> {
    // CLI にプロンプトを送信
    // ストリームレスポンスをパースして返す
  }

  // セッション管理（騎士ごとに独立したコンテキスト）
  createSession(knightId: string): Session {
    return new Session(knightId);
  }
}
```

### 8.4 セッション管理

```
┌─────────────────────────────────────────────────────────┐
│              Session Manager                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ChatGPT Plus セッション (5 時間制限)                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │ アーサー     │ │ ガラハド     │ │ ケイ         │    │
│  │ (承認用)     │ │ (審査用)     │ │ (開発用)     │    │
│  │ context_001  │ │ context_002  │ │ context_003  │    │
│  └──────────────┘ └──────────────┘ └──────────────┘    │
│  残り：4 時間 32 分                                       │
│                                                         │
│  Alibaba Code セッション (レート緩め)                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │ ベディヴィア  │ │ パーシバル   │ │ ガフリス     │    │
│  │ context_A01  │ │ context_A02  │ │ context_A03  │    │
│  └──────────────┘ └──────────────┘ └──────────────┘    │
│                                                         │
│  Gemini セッション                                       │
│  ┌──────────────┐                                       │
│  │ ガレス       │                                       │
│  │ (画像生成)   │                                       │
│  └──────────────┘                                       │
└─────────────────────────────────────────────────────────┘
```

---

---

## 9. コスト最適化戦略

### 9.1 月額コスト（固定）

| サービス | 月額 | 用途 |
|----------|------|------|
| ChatGPT Plus | $20 (~3,000 円) | 開発/審査/承認/企画 |
| Gemini Pro | 3,000 円 | 画像生成 |
| Alibaba Code | 無料 | タスク/調査/データ/テスト |
| **合計** | **~6,000 円/月** | **API 課金なし** |

### 9.2 レートリミット管理

```typescript
// /src/lib/RateLimitManager.ts

interface RateLimitConfig {
  provider: 'chatgpt' | 'gemini' | 'alibaba';
  // ChatGPT: 5 時間ごと、Gemini: 厳しめ、Alibaba: 緩め
  resetInterval: number;
  maxRequestsPerInterval: number;
  currentUsage: number;
}

class RateLimitManager {
  private configs: Map<string, RateLimitConfig> = new Map();

  // リクエスト可能かチェック
  canRequest(provider: string): boolean {
    const config = this.configs.get(provider);
    if (!config) return false;

    // 制限を超えていたら待機
    if (config.currentUsage >= config.maxRequestsPerInterval) {
      const timeUntilReset = this.getTimeUntilReset(config);
      return timeUntilReset <= 0;
    }
    return true;
  }

  // 使用量記録
  recordRequest(provider: string): void {
    const config = this.configs.get(provider);
    if (config) {
      config.currentUsage++;
    }
  }

  // 優先度ベースのキューイング
  async enqueue(task: Task): Promise<void> {
    // 高優先度タスクは先に処理
    // レート制限に達している場合はキューに溜める
  }
}
```

### 9.3 モデル使い分け戦略

```typescript
// 高コストだが高精度 (ChatGPT Plus GPT-5.4)
const highPriorityTasks = [
  'architecture-design',
  'security-review',
  'final-approval',
  'complex-refactor',
];

// 低コストモデルで十分 (GPT-5.4-mini / Qwen)
const lowPriorityTasks = [
  'boilerplate-generation',
  'documentation',
  'simple-research',
  'data-processing',
];

// 画像生成は Gemini に委任
const imageTasks = [
  'logo-design',
  'illustration',
  'ui-mockup',
];
```

---

## 10. 実装ロードマップ

---

## 10. 実装ロードマップ

### Phase 1: 基盤構築（2 週間）

- [ ] プロジェクトセットアップ (Next.js 15 + Node.js 22)
- [ ] データベース設計・実装 (PostgreSQL)
- [ ] CLI ラッパーベース実装 (ChatGPT/Alibaba 用)
- [ ] セッション管理システム
- [ ] WebSocket 通信基盤

### Phase 2: 騎士実装（3 週間）

- [ ] ケイ（開発）実装 - ChatGPT Plus CLI 連携
- [ ] ガレス（画像）実装 - Gemini Web 連携
- [ ] ベディヴィア（タスク管理）実装 - Alibaba Code 連携
- [ ] ガラハド（審査）実装
- [ ] アーサー（承認）実装

### Phase 3: フロントエンド（2 週間）

- [ ] 円卓ダッシュボード UI
- [ ] 騎士個別ページ
- [ ] リアルタイムステータス表示
- [ ] 成果物ギャラリー

### Phase 4: 円卓会議（2 週間）

- [ ] 提案システム実装
- [ ] 投票プロトコル
- [ ] 承認フロー可視化

### Phase 5: 24/7 稼働環境（1 週間）

- [ ] 常時稼働サーバー設定
- [ ] 監視・アラート設定
- [ ] 自動リストア機構

### Phase 6: 最適化（1 週間）

- [ ] レートリミット最適化
- [ ] キューイング戦略
- [ ] ドキュメント整備

**総計**: 11 週間 (~3 ヶ月)

---

## 11. リスクと対策

| リスク | 影響度 | 対策 |
|--------|--------|------|
| API レート制限 | 高 | 複数アカウント、キューイング |
| コスト超過 | 中 | 監視ダッシュボード、アラート |
| エージェント暴走 | 高 | サンボックス、リソース制限 |
| 状態不整合 | 中 | トランザクション、イベントソーシング |

---

## 12. 次のアクション

1. [ ] 本仕様書のレビュー・修正
2. [ ] プロジェクトリポジトリ作成
3. [ ] Phase 1 実装開始

---

## 付録 A: 使用技術スタックまとめ

| 層 | 技術 |
|----|------|
| **Frontend** | Next.js 15, React 19, TypeScript, TailwindCSS, shadcn/ui |
| **Backend** | Node.js 22, Express/Fastify, TypeScript |
| **Database** | PostgreSQL 16, Redis 7 |
| **AI Providers** | ChatGPT Plus CLI, Gemini Pro Web, Alibaba Code |
| **Orchestration** | BullMQ (キュー管理) |
| **Realtime** | WebSocket (Socket.io / ws) |
| **Monitoring** | Prometheus, Grafana |
| **Deployment** | Docker, Docker Compose |
| **CLI Wrappers** | 自作 (child_process + ストリーム処理) |

---

*このドキュメントは円卓会議の承認を得て更新されます*
