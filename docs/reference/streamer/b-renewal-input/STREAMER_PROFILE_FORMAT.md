# Streamer Profile Format

## Purpose
- `streamer` renewal 時に、見出しや CTA が「テンプレートです」感を出さないようにするための仮設定フォーマット
- デザイン設計と同時に、ダミー配信者の人格、活動、文言トーンを先に決めるために使う
- テーマに合わない項目は無理に埋めず、省略可能にする

## Usage Rule
- 各テンプレートの renewal 設計時に、このフォーマットをベースに仮設定を作る
- 必須項目だけ埋めてもよい
- 見出し、プロフィール、CTA、schedule、SNS ラベルはこの設定を参照して文言を決める
- generic なテンプレ文言や抽象的すぎるコピーを避け、実サイト寄りの空気へ寄せる

## Required Fields

### Display Name
- 表示名
- 例:
  - `Abyss_00`
  - `Boss Violet`

### World One-Liner
- 世界観を一文で説明する
- 例:
  - `深海層から配信信号を拾い上げる仮想潜航者。`
  - `招待制フロアを支配する夜の配信者。`

### Stream Theme
- その配信者が何を見せるのかの主題
- 例:
  - `深夜雑談と没入型ホラー配信`
  - `高圧的な世界観で見せるゲーム実況と企画配信`

### Primary CTA
- 最も代表的な参加導線
- 例:
  - `潜航を開始する`
  - `Access Pass を受け取る`

## Optional Fields

### Role / Title
- 肩書きやロール
- 例:
  - `Virtual Deep Diver`
  - `Host of the Boss Room`

### Main Activities
- 主な活動内容
- 例:
  - `FPS 配信`
  - `深夜雑談`
  - `視聴者参加型企画`

### Tone / Voice
- 文体、口調、キャラクターの話し方
- 例:
  - `静かで低温、余韻が長い`
  - `高圧的だが遊び心がある`

### Schedule Mode
- スケジュールをどう見せるか
- 例:
  - `潜航ログ`
  - `Audience Access Window`
  - `Quest Board`

### SNS Entry Labels
- SNS 導線のラベル方針
- 例:
  - `Signal Log`
  - `Join the Floor`
  - `Watch Live`

### Support Settings
- 必要なときだけ使う補助設定
- 例:
  - 所属
  - ユニット名
  - ファンネーム
  - ハッシュタグ
  - メンバーシップ名

## Copy Checklist
- hero 見出しが generic ではない
- profile が「どんな活動者か」を説明できている
- CTA が世界観と行動の両方を示している
- schedule の見せ方がテーマに沿っている
- SNS ラベルが実サイトの空気を壊していない
- `Template`, `Demo`, `Sample` 的な語感が表に出ていない

## Lightweight Template

```md
## Streamer Profile Seed
- Display Name:
- Role / Title:
- World One-Liner:
- Stream Theme:
- Main Activities:
- Tone / Voice:
- Primary CTA:
- Schedule Mode:
- SNS Entry Labels:
- Support Settings:
```
