# Streamer F Renewal Design

## Scope
- 対象:
  - `public/templates/streamer/f`
- テンプレート名:
  - `Future Tech / Initialize` 系テンプレート
- この文書は `streamer/f` renewal の詳細設計をまとめる
- カテゴリ全体方針は `STREAMER_RENEWAL_PLAN.md` を参照する

## Renewal Goal
- `streamer` カテゴリ内で、`f` を「近未来っぽいテンプレート」から「起動そのものを体験させる高品質テンプレート」へ格上げする
- 配信者本人を system core として見せ、視聴者は起動された環境へアクセスする operator という構図を作る
- `T` の terminal 実行感とは分け、`system boot` の高揚感を主役にする

## Core Experience
- 中心体験:
  - `initialize`
- ユーザーの体感:
  - ページを読むのではなく、system が起動しモジュールが順次有効化される過程に立ち会う
- 構造:
  - system interface 文法をページ全体で維持する
  - ただし各セクションは別モジュールとして意味を変える
- 主役になる印象:
  - 配信者が central core として立ち上がり、視聴者が session へ同期していく

## Comparison Guardrails
- `t` と被らない点:
  - `t` は command execution、`f` は system boot
- `a` と被らない点:
  - `a` は潜航、`f` は起動
- このテンプレートで避けること:
  - terminal 的に暗すぎる UI
  - generic SaaS / AI サービス LP
  - 単なる dashboard 化

## World Direction
- 世界観の核:
  - `OS / AI system boot`
- キーワード:
  - core boot
  - module activation
  - sync
  - node
  - session
- トーン:
  - 寒色グローの future interface
  - ただし暗くなりすぎず、起動直後の明るさを持つ
- 非採用:
  - 真っ白な clean OS
  - 重い黒ベース terminal
  - generic blue dashboard

## Information Priority
- 1. Core Boot
- 2. Identity Module
- 3. Stream Modules
- 4. Memory Log
- 5. Session Queue
- 6. External Nodes

## Section Structure

### 1. Core Boot
- 役割:
  - system の起動と central core の存在を見せる
- 見せるもの:
  - system online 状態
  - core boot copy
  - central visual
  - session launch CTA
- 方向性:
  - ヒーローはプロフィールではなく boot sequence の開始点として扱う

### 2. Identity Module
- 役割:
  - 配信者本人を system core として認識させる
- 見せるもの:
  - 表示名
  - role / title
  - world one-liner
  - core traits
- 方向性:
  - about section ではなく identity module として表示する

### 3. Stream Modules
- 役割:
  - 配信内容をモジュール群として見せる
- 見せるもの:
  - 主配信ジャンル
  - 企画群
  - feature modules
  - stream capability
- 方向性:
  - カード一覧ではなく、有効化された module として見せる

### 4. Memory Log
- 役割:
  - 過去配信を記憶ログとして見せる
- 見せるもの:
  - 代表アーカイブ
  - log title
  - summary
  - viewing CTA
- 方向性:
  - archive ではなく memory access の感覚に寄せる

### 5. Session Queue
- 役割:
  - 今後の配信予定を queue として提示する
- 見せるもの:
  - next session
  - queue list
  - 予定時刻
  - session note
- 方向性:
  - schedule ではなく、起動待ちの session queue として見せる

### 6. External Nodes
- 役割:
  - 外部接続先を node として見せる
- 見せるもの:
  - 視聴導線
  - X
  - YouTube
  - Discord
  - 必要に応じて membership
- 方向性:
  - SNS アイコン列ではなく、external nodes への接続として整理する

## Character Strategy
- 配信者本人は system core として扱う
- 視聴者は operator として接続する側
- 主役はキャラクター単体の派手さではなく、起動された system の中心にいること
- central visual は hero の核だが、以後も module の中心存在として一貫して扱う

## Motion And Effects
- 主役演出:
  - signal 走査
  - line / grid scan
  - module activation
  - connection line
- 補助演出:
  - subtle glow
  - activation pulse
  - session load 感
- 避けること:
  - terminal 的タイピング演出多用
  - 派手な 3D 空間演出
  - 常時まぶしすぎる発光

## Archive Strategy
- archive は `memory log`
- 各 log に持たせる要素:
  - title
  - summary
  - log type
  - CTA
- 基本方針:
  - 過去配信を「閲覧コンテンツ」ではなく、system に蓄積された記憶として扱う

## CTA Strategy
- CTA は operator 側の起動操作として見せる
- 想定 CTA:
  - `LAUNCH STREAM`
  - `SYNC SESSION`
  - `ENTER LIVE`
  - `OPEN NODE`
- 方向性:
  - `watch` より `launch / sync` を優先する

## Technical Direction
- 主体:
  - `CSS + JS`
- 主な用途:
  - module activation 制御
  - scan / glow / queue 演出
  - section transition
- 基本方針:
  - 起動文法を全体に維持しつつ、各 module の意味を変えて単調さを防ぐ
- 非採用:
  - `a/b` の WebGL 主役設計
  - `t` 風 terminal command 主役設計

## Non-Goals
- terminal 模倣ページにはしない
- generic AI service LP にしない
- dashboard の表整理だけを主役にしない
- 配信者を operator 側に置かない

## Why This Direction
- `f` は「起動」の高揚感を主役にした方が `t` と明確に差別化できる
- 配信者を system core に置くことで、近未来テーマと配信導線が自然につながる
- page 全体を system interface 文法にすることで、初期起動演出だけで終わらない renewal にできる
- CSS + JS 主体でも、scan と module activation の品質を高めれば十分に高品質化できる

## Implementation Notes
- hero で system boot 感が伝わらないとテーマが崩れる
- module ごとに表情を変え、全部が同じパネルに見えないようにする
- brightness を上げすぎず、寒色グローで立ち上がる印象を優先する
- copy は system 文法に寄せつつ、意味不明なテック jargon にはしない

## Open Knobs
- central visual の素材形式
- queue の情報量
- module activation の強さ
- CTA の語彙をどこまで system 寄りにするか

## Readiness Check
- renewal の狙いが明確
- `t` との差別化が明確
- 中心体験が明確
- module 構成が明確
- memory log / session queue / external nodes の役割が明確
- 技術方針が明確
- 非採用案が明確

現時点で、別セッションで `streamer/f` renewal 用 worktree を切って実装へ入れる粒度としては十分。
