# Streamer H Renewal Design

## Scope
- 対象:
  - `public/templates/streamer/h`
- テンプレート名:
  - `Horror / Mansion` 系テンプレート
- この文書は `streamer/h` renewal の詳細設計をまとめる
- カテゴリ全体方針は `STREAMER_RENEWAL_PLAN.md` を参照する

## Renewal Goal
- `streamer` カテゴリ内で、`h` を「怖い演出のあるテンプレート」から「館を探索しながら情報を発見していく高品質テンプレート」へ格上げする
- ホラーを主役にせず、探索と発見を主役にする
- 配信者や活動情報を、館に残された記憶や hidden notes として見つけていく体験へ変換する

## Core Experience
- 中心体験:
  - `discover`
- ユーザーの体感:
  - 館を巡り、部屋ごとに情報を見つけていく
- 構造:
  - 縦スクロールで部屋を順に巡る
  - 遷移ごとに扉を開く演出を入れる
  - 各部屋では視界や近接で発見できる情報が増える
- 主役になる印象:
  - 怖いだけではなく、先を見たくなる mansion exploration

## Comparison Guardrails
- `g` と被らない点:
  - `g` は破断再構成、`h` は空間探索
- `a` と被らない点:
  - `a` は潜航、`h` は部屋巡り
- このテンプレートで避けること:
  - びっくり演出頼み
  - 単なる haunted house 風装飾
  - 情報が怖さのために読めなくなること

## World Direction
- 世界観の核:
  - `mansion exploration`
- キーワード:
  - room
  - door
  - memory
  - hidden note
  - opening
- 補助表現:
  - shadow
  - curtain drift
  - flashlight / narrow focus
  - door transition
- 非採用:
  - 廃研究所やサイバー施設方向
  - ジャンプスケア中心の演出

## Information Priority
- 1. Entrance / Invitation
- 2. Room Memory
- 3. Hidden Notes
- 4. Archive Traces
- 5. Next Opening
- 6. Open / Uncover CTA

## Section Structure

### 1. Entrance / Invitation
- 役割:
  - 館へ入る導入を作る
- 見せるもの:
  - 入口となる hero
  - 館の空気
  - 配信者の存在を感じさせる兆候
  - 先へ進みたくなる導入コピー
- 方向性:
  - すべてを最初から見せず、招き入れる入口として扱う

### 2. Room Memory
- 役割:
  - 部屋ごとの記憶として人物像や世界観を見せる
- 見せるもの:
  - 表示名
  - role / title
  - world one-liner
  - 印象的なビジュアルや象徴
- 方向性:
  - プロフィールを直接置かず、部屋に残る記憶として見つける

### 3. Hidden Notes
- 役割:
  - 活動内容や配信テーマを発見させる
- 見せるもの:
  - 主配信ジャンル
  - 企画傾向
  - 活動スタイル
  - hidden note 的な断片情報
- 方向性:
  - 全情報をカード一覧にせず、拾い上げる体験にする

### 4. Archive Traces
- 役割:
  - 過去配信を痕跡として見せる
- 見せるもの:
  - 代表アーカイブ
  - trace title
  - summary
  - viewing CTA
- 方向性:
  - 過去配信を上映作品や record file ではなく、部屋に残る trace として見せる

### 5. Next Opening
- 役割:
  - 次に開く夜や次回配信を案内する
- 見せるもの:
  - next opening
  - 時刻
  - 次回のテーマ
- 方向性:
  - schedule ではなく、次に館が開くタイミングとして見せる

### 6. Open / Uncover CTA
- 役割:
  - 視聴や外部導線を発見文法でまとめる
- 見せるもの:
  - 視聴導線
  - X
  - YouTube
  - Discord
  - 必要に応じて contact
- 方向性:
  - `open / uncover` 系 CTA に寄せる

## Visual Strategy
- 館の空間自体をナビゲーションにする
- 部屋ごとに情報の濃度や見え方を変える
- 視界は狭めても、最終的には内容が読めることを優先する
- 扉、影、カーテン、細い光などで緊張感を作る

## Motion And Effects
- 主役演出:
  - door opening
  - room transition
  - narrow focus reveal
  - hidden information uncover
- 補助演出:
  - subtle shadow move
  - curtain drift
  - faint light sweep
- 避けること:
  - jumpscare
  - 過剰な画面揺れ
  - 常時暗くして読めなくすること

## Archive Strategy
- archive は `trace` として見せる
- 各 trace に持たせる要素:
  - title
  - summary
  - CTA
  - room association 的な補助情報
- 基本方針:
  - 作品上映ではなく、探索の中で見つかる記録として扱う

## CTA Strategy
- CTA は `open / uncover` 文法にする
- 想定 CTA:
  - `OPEN THE DOOR`
  - `UNCOVER SIGNAL`
  - `ENTER THE ROOM`
  - `REVEAL STREAM`
- 方向性:
  - ホラー脅しではなく、発見と進入の気持ちよさを優先する

## Technical Direction
- 主体:
  - `CSS + JS`
- 主な用途:
  - room transition
  - door animation
  - focus reveal
  - hidden note 表示制御
- 基本方針:
  - 空間演出は CSS / JS で十分に成立させる
  - WebGL を必須にせず、館探索と発見のテンポで勝つ
- 非採用:
  - 破片再構成系
  - terminal / HUD 系

## Non-Goals
- ホラー演出そのものを主役にしない
- haunted house の装飾見本市にしない
- 読み物として破綻するほど暗くしない
- 視聴者を怖がらせるだけで終わらせない

## Why This Direction
- `h` はホラーより探索を主役にした方が、高品質かつ汎用性のある renewal になる
- 館を巡る構造にすることで、profile / archive / schedule をすべて「発見対象」に変換できる
- door opening と room memory の組み合わせで、他テンプレートにはない回遊感を作れる
- CSS + JS 主体でも、空間遷移と視界制御で十分に強い体験が作れる

## Implementation Notes
- hero で「怖い」より「入りたくなる」を優先する
- 部屋ごとに情報の役割を変え、全部同じカード列にしない
- CTA は発見後の解放感につなげる
- profile seed を先に決めないと、hidden note の文言が generic になりやすい

## Open Knobs
- 部屋数を何室にするか
- 扉演出の強さ
- 視界制限の度合い
- CTA 文体の強さ

## Readiness Check
- renewal の狙いが明確
- `a/g` との差別化が明確
- 中心体験が明確
- room memory / hidden notes / next opening の役割が明確
- 技術方針が明確
- 非採用案が明確

現時点で、別セッションで `streamer/h` renewal 用 worktree を切って実装へ入れる粒度としては十分。
