# Streamer G Renewal Design

## Scope
- 対象:
  - `public/templates/streamer/g`
- テンプレート名:
  - `Glitch / Fragment` 系テンプレート
- この文書は `streamer/g` renewal の詳細設計をまとめる
- カテゴリ全体方針は `STREAMER_RENEWAL_PLAN.md` を参照する

## Renewal Goal
- `streamer` カテゴリ内で、`g` を「glitch 演出があるテンプレート」から「壊れながら本人像が成立していく高品質テンプレート」へ格上げする
- 画面破断は導入の一撃として使い、本編では人格破片再構成を主役にする
- glitch の量で押すのではなく、断片からアイデンティティが立ち上がる体験を作る

## Core Experience
- 中心体験:
  - `reconstruct`
- ユーザーの体感:
  - 壊れたガラス片や情報断片から、配信者の人物像と活動が徐々に再構成されていく
- 構造:
  - 導入はガラス破断
  - 本編は破片カードによる再構成
- 主役になる印象:
  - 砕けた断面の中に、むしろはっきりした identity が現れる

## Comparison Guardrails
- `a` と被らない点:
  - `a` は潜航、`g` は破断からの再構成
- `d` と被らない点:
  - `d` は dossier 解読、`g` は人格断片の再構成
- このテンプレートで避けること:
  - glitch を常時かけ続けるだけの演出
  - 割れガラスだけで終わる導入依存
  - 読めないほど破片化した UI

## World Direction
- 世界観の核:
  - `fragmented identity reconstruction`
- キーワード:
  - fracture
  - shard
  - reconstruct
  - signal restore
  - recovered timeline
- 補助演出:
  - broken glass intro
  - shard cards
  - offset fragments
  - reassembly
- 非採用:
  - コワさやホラーへの過度な寄せ
  - ただのノイズまみれ UI

## Information Priority
- 1. Fracture Intro
- 2. Identity Fragments
- 3. Activity Fragments
- 4. Archive Shards
- 5. Recovered Timeline
- 6. Restore / Reconnect CTA

## Section Structure

### 1. Fracture Intro
- 役割:
  - 初回ロード時の一撃として印象を作る
- 見せるもの:
  - ガラスに亀裂が入る
  - 破片が崩れる
  - 奥から本体の signal が見える
- 方向性:
  - 毎回多用せず、導入のみに限定する

### 2. Identity Fragments
- 役割:
  - 顔や世界観を破片カードで見せる
- 見せるもの:
  - 表情断片
  - 表示名
  - role / title
  - world one-liner
- 方向性:
  - 視認性の低い破片から、読めるカードへ再構成される

### 3. Activity Fragments
- 役割:
  - 配信内容や活動傾向を断片的に見せ、全体像を成立させる
- 見せるもの:
  - 主配信ジャンル
  - 企画傾向
  - 活動時間帯
  - 得意テーマ
- 方向性:
  - 情報もビジュアルと同じ文法で破片化 / 再構成する

### 4. Archive Shards
- 役割:
  - アーカイブを記録片として見せる
- 見せるもの:
  - 代表アーカイブ
  - shard title
  - summary
  - viewing CTA
- 方向性:
  - 各アーカイブを破片カードとして表示し、視認可能な大きさに再構成させる

### 5. Recovered Timeline
- 役割:
  - 今後の配信予定を復元されたタイムラインとして見せる
- 見せるもの:
  - 次回配信
  - 今週の予定
  - timeline marker
- 方向性:
  - 初期は断片化して見え、最終的には普通に読める縦タイムラインへ落ち着く
  - 世界観は持たせるが、可読性は通常 timeline レベルを保つ

### 6. Restore / Reconnect CTA
- 役割:
  - 参加導線を破片文法のまま提示する
- 見せるもの:
  - 視聴導線
  - X
  - YouTube
  - Discord
  - 必要に応じて contact
- 方向性:
  - 通常ボタンではなく、復元 / 再接続 / 開封の意味に寄せる

## Visual Strategy
- ビジュアル断片と情報断片を同じ文法で扱う
- 破片は装飾ではなく、情報容器として機能させる
- 読みにくい段階から、視認可能なカード状態へ変化させる
- 画像 1 のようなガラス破断は導入演出として使う
- 画像 2 のような「割れた断面の中にコンテンツが載る」感覚を本編 UI に取り込む

## Motion And Effects
- 主役演出:
  - glass fracture
  - shard separation
  - shard reassembly
  - signal restore
- 補助演出:
  - subtle offset
  - fragment glow
  - card stabilization
- 避けること:
  - ノイズを常時動かす
  - 何でも破片にして読めなくする
  - section ごとに破断演出を乱発する

## Schedule Strategy
- schedule は `Recovered Timeline`
- 見せ方:
  - 断片から時間軸が回復していく
- 基本方針:
  - 世界観は再構成
  - 読み方は通常 timeline と同等

## CTA Strategy
- CTA は復元 / 再接続の文法にする
- 想定 CTA:
  - `RESTORE SIGNAL`
  - `RECONNECT STREAM`
  - `OPEN FRAGMENT`
  - `ASSEMBLE ACCESS`
- 方向性:
  - 造語に寄りすぎず、行動意味が分かる範囲で世界観へ寄せる

## Technical Direction
- 破片そのものの存在感と動き:
  - `three.js`
- 情報カードと可読レイヤー:
  - `HTML/CSS`
- 状態制御:
  - `JS`
- 基本方針:
  - 破片は 3D / WebGL 側
  - 情報は HTML overlay 側
  - フル 3D UI にはせず、読む情報は常に HTML で担保する
- 非採用:
  - CSS だけで重厚な破断再構成を無理に再現すること
  - shader ありきの過剰設計

## Non-Goals
- ホラーガラス演出テンプレにはしない
- 破壊の気持ちよさだけを主役にしない
- glitch ノイズの量で差別化しない
- timeline や CTA を読めなくするほど断片化しない

## Why This Direction
- `g` は「壊れているのに成立している」ことが最も強い差別化軸になる
- 入口だけ画面破断型にし、本編を人格破片再構成型にすることで、強い導入と継続的な UI 文法の両立ができる
- 破片カードはビジュアルと情報の両方を統一的に扱えるので、他テンプレートにはない一貫性を作れる
- WebGL と HTML overlay を分けることで、高品質と可読性の両立がしやすい

## Implementation Notes
- 初回導入の破断演出は 1 回に限定する
- 破片カードはサイズと配置を調整し、常に最低限読める状態へ落とせるようにする
- ガラス演出の印象が強い分、以後の section では構成の美しさで見せる
- profile seed を先に決めておかないと、破片文法だけ強くて文言が generic になりやすい

## Open Knobs
- 破片数をどこまで増やすか
- 破断導入の時間
- 再構成の速度
- CTA の語彙の強さ

## Readiness Check
- renewal の狙いが明確
- `a/d` との差別化が明確
- 中心体験が明確
- 破断と再構成の役割分担が明確
- timeline / CTA / archive の扱いが明確
- 技術方針が明確
- 非採用案が明確

現時点で、別セッションで `streamer/g` renewal 用 worktree を切って実装へ入れる粒度としては十分。
