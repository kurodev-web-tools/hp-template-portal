# Streamer D Renewal Design

## Scope
- 対象:
  - `public/templates/streamer/d`
- テンプレート名:
  - `Decrypt / Classified` 系テンプレート
- この文書は `streamer/d` renewal の詳細設計をまとめる
- カテゴリ全体方針は `STREAMER_RENEWAL_PLAN.md` を参照する

## Renewal Goal
- `streamer` カテゴリ内で、`d` を「解析っぽい見た目のテンプレート」から「機密ファイルを解読する高品質体験を持つテンプレート」へ格上げする
- 配信者や活動情報を、generic なプロフィール一覧ではなく `classified dossier` として段階的に開示する
- 探偵キャラ専用ではなく、調査 / 解析 / 機密資料の空気を持つ汎用テンプレートとして成立させる

## Core Experience
- 中心体験:
  - `decode`
- ユーザーの体感:
  - ページを読むのではなく、1 件の機密ファイルを段階的に解読していく
- 構造:
  - 疑似固定画面ベース
  - スクロールに応じて access level が上がり、情報が順に開示される
- 主役になる印象:
  - 配信者と活動の dossier を開封していく感覚

## Comparison Guardrails
- `a` と被らない点:
  - `a` は潜航、`d` は解読
- `b` と被らない点:
  - `b` は支配者との対面、`d` は資料閲覧
- このテンプレートで避けること:
  - 探偵キャラ固定
  - コルクボードや赤い糸の直球演出
  - 緑文字の安いハッカー端末 UI

## World Direction
- 世界観の核:
  - `classified dossier`
- キーワード:
  - dossier
  - access level
  - classified
  - sealed / unsealed
  - briefing
- 色 / 質感:
  - 暗いグレー基調
  - muted metallic
  - 洗練された dossier 面構成
- 補助表現:
  - access stamp
  - level indicator
  - subtle scan
  - reveal mask
- 非採用:
  - 白黒 + 赤検閲の強すぎる演出
  - ハッカー端末直球表現

## Information Priority
- 1. 識別情報
- 2. 人物 / 世界観ファイル
- 3. 活動領域
- 4. Record Files
- 5. Scheduled Briefing
- 6. Disclosure CTA / SNS

## Section Structure

### 1. Identification Layer
- 役割:
  - まず「対象は誰か」を特定させる
- 見せるもの:
  - 表示名
  - class / role
  - access level
  - signal status
- 方向性:
  - 最初から全情報を見せず、識別完了の感覚を出す

### 2. Subject Dossier
- 役割:
  - 配信者の人物像や世界観を開示する
- 見せるもの:
  - 世界観の一文
  - 肩書き
  - 所属や立ち位置
  - キャラクター設定
- 方向性:
  - profile をそのまま置くのではなく dossier の一部として読む構造にする

### 3. Activity File
- 役割:
  - 何を配信しているかを整理する
- 見せるもの:
  - 主配信ジャンル
  - 企画傾向
  - 活動時間帯
  - 参加型要素
- 方向性:
  - 解析対象の行動履歴のように読めるが、実サイトとして意味が通るようにする

### 4. Record Files
- 役割:
  - アーカイブを過去記録として見せる
- 見せるもの:
  - 代表アーカイブ
  - 記録タイトル
  - 一文要約
  - 視聴導線
- 方向性:
  - `case evidence` ではなく `record files` として扱う
  - 事件性を上げすぎず、汎用性を保つ

### 5. Scheduled Briefing
- 役割:
  - 次の配信や企画を briefing として提示する
- 見せるもの:
  - 次回配信
  - 今週の briefing
  - 公開情報の範囲
- 方向性:
  - 予定表ではなく briefing として読む UI にする

### 6. Disclosure / External Links
- 役割:
  - 外部導線を資料開示として見せる
- 見せるもの:
  - 視聴導線
  - X
  - YouTube
  - Discord
  - 必要に応じて contact
- 方向性:
  - `request access` ではなく `file disclosure` 文脈でまとめる

## Visual Strategy
- 画面は 1 枚の dossier を見ている感覚を保つ
- 情報は開封前 / 開封後の差が分かるようにする
- 紙の資料感を直球で再現するより、デジタル dossier として洗練させる
- セクション境界は強すぎず、access level 上昇で自然につなぐ

## Motion And Effects
- 主役演出:
  - sealed → unsealed の変化
  - access level 上昇
  - reveal mask
  - subtle scan
- 補助演出:
  - classified stamp
  - UI の薄い点灯
  - 行やブロックの段階開示
- 避けること:
  - 派手な glitch
  - 激しい HUD
  - 情報を隠しすぎて読めなくすること

## Archive Strategy
- アーカイブは `record files` として見せる
- 各 record に持たせる要素:
  - title
  - summary
  - viewing CTA
  - record id 的な補助情報
- 基本方針:
  - ライブラリ一覧ではなく、記録ファイルの束として見せる

## CTA Strategy
- CTA は開示操作として見せる
- 想定 CTA:
  - `UNSEAL FILE`
  - `REVEAL RECORD`
  - `OPEN DOSSIER`
  - `VIEW BRIEFING`
- 方向性:
  - 視聴や移動のためのボタンであっても、機密資料の開示操作に見せる

## Technical Direction
- 主体:
  - `CSS + JS`
- 主な用途:
  - 疑似固定画面制御
  - access level に応じた段階開示
  - mask / fade / stamp 演出
- 基本方針:
  - 空間演出ではなく、資料解読の UI 品質で勝つ
- 非採用:
  - `a` / `b` のような WebGL 主役設計
  - 探偵ドラマの小道具過多表現

## Non-Goals
- 探偵配信者専用テンプレートにはしない
- 事件性を強めすぎない
- generic な cyber terminal にしない
- 一覧ページ型の情報配置にはしない

## Why This Direction
- `d` は「解析」「復号」を主役にした方がカテゴリ内で独自性が出る
- 探偵固定ではなく dossier UI に寄せることで、幅広い streamer に適用しやすい
- CSS + JS 主体でも、段階開示と dossier 演出の質で高品質 renewal が成立する
- `record files` と `scheduled briefing` を使うことで、archive と schedule も自然に世界観へ統合できる

## Implementation Notes
- 最初に識別情報だけを出し、その後の開示で期待値を作る
- 文言は調査 / dossier 文脈に寄せつつ、実サイトとして意味が通るようにする
- briefing や record のラベルは抽象化しすぎず、内容が推測できる程度に保つ
- profile seed を先に決めないと generic copy に戻りやすい

## Open Knobs
- dossier の紙感をどこまで出すか
- record files を何件見せるか
- access level 表現の粒度
- disclosure CTA の文体の強さ

## Readiness Check
- renewal の狙いが明確
- `a` / `b` との差別化が明確
- 中心体験が明確
- record / briefing / disclosure の役割が明確
- 技術方針が明確
- 非採用案が明確

現時点で、別セッションで `streamer/d` renewal 用 worktree を切って実装へ入れる粒度としては十分。
