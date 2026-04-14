# Streamer E Renewal Design

## Scope
- 対象:
  - `public/templates/streamer/e`
- テンプレート名:
  - `Esports / Rank Up` 系テンプレート
- この文書は `streamer/e` renewal の詳細設計をまとめる
- カテゴリ全体方針は `STREAMER_RENEWAL_PLAN.md` を参照する

## Renewal Goal
- `streamer` カテゴリ内で、`e` を「esports っぽいテンプレート」から「試合進行そのものを主役にした高品質な公式中継風テンプレート」へ格上げする
- 配信者個人のプロフィールより、いま何が起きている試合なのかを中心に見せる
- 単なる戦績紹介ではなく、match state driven な HP として成立させる

## Core Experience
- 中心体験:
  - `compete`
- ユーザーの体感:
  - プロフィールを読むのではなく、大会進行を追っている
- 構造:
  - `試合前 / 試合中 / 試合後` の state を持つ
  - 基準状態は `試合中`
- 主役になる印象:
  - 公式中継と会場大型スクリーンの中間のような試合体験

## Comparison Guardrails
- `a` と被らない点:
  - `a` は潜航、`e` は競技進行
- `b` と被らない点:
  - `b` は対面圧、`e` は match state
- `c` と被らない点:
  - `c` は上映、`e` は中継
- `d` と被らない点:
  - `d` は解読、`e` は試合追跡
- このテンプレートで避けること:
  - generic な esports team サイト
  - 戦績表だけの管理画面
  - 選手紹介中心の普通のプロフィールページ

## World Direction
- 世界観の核:
  - `official esports broadcast hub`
- キーワード:
  - live now
  - current round
  - scoreboard
  - replay
  - highlight
- 視覚軸:
  - broadcast overlay
  - arena screen
- 補助表現:
  - round status
  - live ticker
  - match banner
- 非採用:
  - corporate team site
  - military / command room 系の重さ

## Information Priority
- 1. Current Match State
- 2. Score / Round / Status
- 3. Featured Player Card
- 4. Match Replay / Highlight Reel
- 5. Upcoming Matches
- 6. Watch / Follow / Community

## Section Structure

### 1. Current Match Hero
- 役割:
  - いま試合中であることを一発で伝える
- 見せるもの:
  - LIVE status
  - current round
  - score
  - current opponent
  - 視聴 CTA
- 方向性:
  - hero はプロフィールではなく match state の表示面として扱う

### 2. Scoreboard / Match Status
- 役割:
  - 試合進行を整理して見せる
- 見せるもの:
  - score
  - round progression
  - map / set 情報
  - 現在の優勢状態
- 方向性:
  - 情報構造は broadcast overlay
  - 見た目は arena screen のスケール感を持たせる

### 3. Featured Player Card
- 役割:
  - 配信者本人を注目選手として見せる
- 見せるもの:
  - 表示名
  - ロール
  - 強み
  - 代表実績
  - 今回の注目ポイント
- 方向性:
  - 普通の profile section ではなく、中継中に出る featured player card として扱う

### 4. Match Replay / Highlight Reel
- 役割:
  - 試合後や初見ユーザーの入口を作る
- 見せるもの:
  - 代表 match replay
  - 短い highlight reel
  - 勝負どころの一文
- 方向性:
  - replay を主役
  - highlight を補助
  - 作品上映ではなく競技記録として扱う

### 5. Upcoming Matches
- 役割:
  - 次の試合を追いやすくする
- 見せるもの:
  - next match
  - 対戦相手
  - 開始時刻
  - 注目ポイント
- 方向性:
  - schedule より `upcoming matches` として見せる
  - 試合前 state と接続しやすい UI にする

### 6. Watch / Follow / Community
- 役割:
  - 視聴、follow、コミュニティ参加の導線をまとめる
- 見せるもの:
  - 視聴導線
  - X
  - YouTube
  - Discord
  - 必要に応じて membership
- 方向性:
  - 大会配信の公式導線として扱う

## State Design
- `Pre-Match`
  - 次戦告知
  - 対戦相手
  - 開始時刻
  - 注目ポイント
- `Live`
  - current round
  - score
  - live status
  - 視聴導線
- `Post-Match`
  - result
  - replay
  - highlight
  - next match

## Visual Strategy
- 情報構造は中継画面のように整理する
- ただし画面全体は arena screen のスケール感を持たせる
- 数字やラベルの視認性を高く保つ
- 選手本人は強く出すが、主役はあくまで試合進行

## Motion And Effects
- 主役演出:
  - state 切替
  - score update 感
  - round progression
  - live indicator
- 補助演出:
  - ticker
  - subtle glow
  - replay / highlight transition
- 避けること:
  - 過剰な HUD
  - generic dashboard 感
  - WebGL ありきの派手さ優先

## Archive Strategy
- アーカイブは `match replay + highlight reel` のハイブリッド
- replay で試合単位を見せる
- highlight で熱量の高い入口を作る
- 基本方針:
  - `c` の上映作品とは違い、競技記録として扱う

## CTA Strategy
- hero の時点で `watch live` を最重要導線として見せる
- 試合後は replay を前面化できる構造にする
- 補助導線:
  - follow
  - notify
  - community join
- 方向性:
  - 「参加する」より「試合を追う」導線を優先する

## Technical Direction
- 主体:
  - `CSS + JS`
- 主な用途:
  - state 切替
  - live / replay / upcoming 表示制御
  - scoreboard 演出
- 基本方針:
  - 情報整理と状態変化の品質で勝つ
  - `A/B` のような WebGL 主役設計にはしない
- 非採用:
  - チーム管理画面風 UI
  - ただの stat table

## Non-Goals
- generic esports team site にしない
- 配信者個人プロフィール中心にしない
- 試合進行より戦績一覧を主役にしない
- テック系 dashboard テンプレに寄せない

## Why This Direction
- `e` は esports 文脈が強く、試合進行を主役にした方が差別化しやすい
- state driven にすることで、テンプレートの完成度が一段上がる
- 公式中継風の情報構造と arena screen の印象を組み合わせることで、競技の熱量を持たせられる
- replay と upcoming matches を併置することで、試合前後の導線も自然につながる

## Implementation Notes
- hero から current match 状態が分からないとテーマが崩れる
- featured player card は profile ではなく中継内の注目選手枠として扱う
- replay / highlight / upcoming の優先順位は state ごとに切り替えやすくする
- copy は generic gaming ではなく、公式中継の言葉づかいを意識する

## Open Knobs
- state 切替をどこまで明示するか
- scoreboard の粒度
- featured player card の情報量
- replay と highlight の見せ比率

## Readiness Check
- renewal の狙いが明確
- `a-d` との差別化が明確
- 中心体験が明確
- state 設計が明確
- replay / upcoming / CTA の役割が明確
- 技術方針が明確
- 非採用案が明確

現時点で、別セッションで `streamer/e` renewal 用 worktree を切って実装へ入れる粒度としては十分。
