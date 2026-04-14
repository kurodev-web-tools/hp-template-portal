# Streamer I Renewal Design

## Scope
- 対象:
  - `public/templates/streamer/i`
- テンプレート名:
  - `Idol / Cheer` 系テンプレート
- この文書は `streamer/i` renewal の詳細設計をまとめる
- カテゴリ全体方針は `STREAMER_RENEWAL_PLAN.md` を参照する

## Renewal Goal
- `streamer` カテゴリ内で、`i` を「アイドル風テンプレート」から「応援参加体験を持つ高品質なデジタルステージ型テンプレート」へ格上げする
- アイドル本人の魅力と、応援することでステージが反応する体験を両立する
- リアルタイム人気指標に依存せず、新規配信者でも成立する応援 UI を作る

## Core Experience
- 中心体験:
  - `cheer`
- ユーザーの体感:
  - ステージを観るだけでなく、自分の応援で空間が反応し熱量が上がる
- 構造:
  - デジタルステージをベースに各セクションを展開する
  - 応援アクションで光や演出レイヤーが変化する
- 主役になる印象:
  - 配信ライブに最適化された華やかなデジタルステージ

## Comparison Guardrails
- `j` と被らない点:
  - `j` はラウンジ滞在、`i` は正面のライブステージ
- `c` と被らない点:
  - `c` は上映作品、`i` はリアルタイムの応援参加
- このテンプレートで避けること:
  - 単なる idol profile
  - ハートやスタンプだけの軽い UI
  - リアルタイム人気数値頼みの設計

## World Direction
- 世界観の核:
  - `digital live stage`
- キーワード:
  - stage
  - glow
  - light reaction
  - fan response
  - next live stage
- 補助表現:
  - LED panels
  - wave lights
  - stage pulses
  - reaction particles
- 非採用:
  - 現地ライブ会場特化
  - 数字の強さだけで押す popularity UI

## Information Priority
- 1. Main Stage Hero
- 2. Idol Presence / Character Appeal
- 3. Cheer Interaction
- 4. Archive Performance
- 5. Next Live Stage
- 6. Watch / SNS / Support

## Section Structure

### 1. Main Stage Hero
- 役割:
  - まず主役の存在感とステージの空気を成立させる
- 見せるもの:
  - 大きなメインビジュアル
  - stage copy
  - 軽い視聴導線
  - 応援参加の存在予告
- 方向性:
  - 主演感は強く、ただし static すぎずライブの熱量を感じさせる

### 2. Idol Presence / Character Appeal
- 役割:
  - 本人の魅力を見せる
- 見せるもの:
  - 表示名
  - role / idol title
  - world one-liner
  - charm points
- 方向性:
  - どのセクションでも存在を感じるが、毎回同じ立ち絵を大きく貼らない
  - ステージ上、サイドパネル、モニター内など見せ方を変える

### 3. Cheer Interaction
- 役割:
  - 応援参加を主役体験として見せる
- 見せるもの:
  - 応援アクション
  - 光の反応
  - ステージ演出の変化
  - 補助的な unlock 要素
- 方向性:
  - リアルタイム同期ではなく、滞在、tap、click で反応する
  - 主役は光とステージ演出
  - ハートやスタンプは補助

### 4. Archive Performance
- 役割:
  - 過去パフォーマンスの入口を作る
- 見せるもの:
  - 代表アーカイブ
  - performance title
  - summary
  - viewing CTA
- 方向性:
  - ライブパフォーマンスの記録として見せる
  - 作品上映ではなく、過去ステージの熱量を伝える

### 5. Next Live Stage
- 役割:
  - 次の出演や配信予定を見せる
- 見せるもの:
  - next live stage
  - 日時
  - 今回の見どころ
  - special stage note
- 方向性:
  - 予定表ではなく、次のステージ告知として見せる

### 6. Watch / SNS / Support
- 役割:
  - 視聴、SNS、支援導線をまとめる
- 見せるもの:
  - 視聴導線
  - X
  - YouTube
  - TikTok
  - support / membership
- 方向性:
  - ステージのラストで次の参加導線へつなぐ

## Character Strategy
- Vtuber / idol 感は強く出す
- ただし常時フル立ち絵を全セクションに置かない
- 本人の存在は維持しつつ、見せ方を変える
- 例:
  - hero では大きく
  - 中盤はステージ中央やモニター内
  - archive や schedule ではサムネやパネル内に再登場

## Interaction Strategy
- `Visible Reaction`
  - 光、LED、波形、粒子、発光レイヤーが応援に反応する
- `Touchable Reaction`
  - テーマ切替
  - stage variation
  - 1 つだけ unlock 要素
- 基本方針:
  - 見える反応を主役
  - 触れる反応は補助
  - 実数同期は前提にしない

## Motion And Effects
- 主役演出:
  - stage glow
  - LED reaction
  - wave light
  - response pulse
- 補助演出:
  - confetti
  - particles
  - heart / stamp traces
- 避けること:
  - 過剰な kawaii UI への偏り
  - 常時うるさすぎる演出
  - 実数人気が少ないと寂しく見える設計

## Archive Strategy
- archive は `performance archive`
- 各 archive に持たせる要素:
  - title
  - summary
  - CTA
  - stage tag
- 基本方針:
  - ライブの余韻を持つ見せ方にする

## CTA Strategy
- 主視聴導線は早い段階から見せる
- support や membership は後段で整理する
- 応援の空気を壊さない文法にする
- 方向性:
  - 参加、視聴、応援がすべて stage 文脈でつながるようにする

## Technical Direction
- 主体:
  - `CSS + JS`
- 主な用途:
  - stage reaction 制御
  - light / glow / pulse 演出
  - variation 切替
- 基本方針:
  - WebGL 必須にはせず、光とレイヤー演出の品質で勝つ
  - 人気指標連動ではなく、その場のインタラクションで成立させる
- 非採用:
  - popularity number driven UI
  - 現地ライブ会場再現

## Non-Goals
- 立ち絵を全セクションに同じ形で貼り続けない
- 単なる idol 紹介ページにしない
- 数字が少ないと寂しく見える設計にしない
- ハートスタンプだけを主役にしない

## Why This Direction
- `i` は配信者の魅力と応援参加体験の両方を持っていた方が streamer HP として自然
- デジタルステージに寄せることで、配信特化のライブ感を作りやすい
- 光とステージ演出を主役にすることで、高品質な応援 UI にできる
- 実数同期を前提にしないことで、新規配信者でも成立しやすい

## Implementation Notes
- hero の時点で「主役感」と「ステージ感」が必要
- 反応演出は 1 回ごとの満足感を作る
- 触れる反応は少数に絞って複雑化を避ける
- profile seed を先に決めて、generic idol copy に戻らないようにする

## Open Knobs
- 反応演出の段階数
- variation 切替のテーマ数
- support 導線の強さ
- stage に再登場する立ち絵の頻度

## Readiness Check
- renewal の狙いが明確
- `c/j` との差別化が明確
- 中心体験が明確
- visible / touchable reaction の役割が明確
- next live stage / archive / CTA の役割が明確
- 技術方針が明確
- 非採用案が明確

現時点で、別セッションで `streamer/i` renewal 用 worktree を切って実装へ入れる粒度としては十分。
