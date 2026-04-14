# Streamer C Renewal Design

## Scope
- 対象:
  - `public/templates/streamer/c`
- テンプレート名:
  - `Cinema / Gaze Up` 系テンプレート
- この文書は `streamer/c` renewal の詳細設計をまとめる
- カテゴリ全体方針は `STREAMER_RENEWAL_PLAN.md` を参照する

## Renewal Goal
- `streamer` カテゴリ内で、`c` を「映画っぽい雰囲気のあるテンプレート」から「上映体験そのものを持つ高品質テンプレート」へ格上げする
- 配信アーカイブを単なる過去配信一覧ではなく、作品ラインナップとして見せる
- 配信者本人を主演と捉え、HP 全体を上映サイトとして成立させる

## Core Experience
- 中心体験:
  - `screen`
- ユーザーの体感:
  - ページを読むのではなく、作品を上映されながら章ごとに観ていく
- 構造:
  - シーン切替型の縦スクロール
  - 補助として chapter navigation を持つ
- 主役になる印象:
  - 作品ポスターから上映が始まり、章ごとに代表作品や次回予告が流れていく

## Comparison Guardrails
- `a` と被らない点:
  - `a` は潜航、`c` は上映
- `b` と被らない点:
  - `b` は対面圧、`c` は作品鑑賞
- このテンプレートで避けること:
  - 動画サービス風の generic 一覧 UI
  - tech / HUD 的な情報整理
  - 単なる映画ポスター風 LP

## World Direction
- 世界観の核:
  - `映像作品の上映体験`
- キーワード:
  - chapter
  - poster
  - opening scene
  - fade
  - trailer
- トーン:
  - インディー映画 / アートシネマ
- 補助表現:
  - ヒーローのみ劇場ポスター級の強さ
- 非採用:
  - メジャー映画ポスター感一辺倒
  - ドキュメンタリー密着路線

## Information Priority
- 1. Main Poster / 主演作品の入口
- 2. Opening Scene / 世界観導入
- 3. Film Chapters / 代表アーカイブ上映
- 4. Cast & Profile / 主演情報
- 5. Next Trailer / 次回予告
- 6. Watch / SNS / Contact

## Section Structure

### 1. Main Poster / Hero
- 役割:
  - 第一印象で上映作品の入口を成立させる
- 見せるもの:
  - 主演ビジュアル
  - 作品タイトル級の hero copy
  - 軽い視聴導線
  - chapter の存在予告
- 方向性:
  - 全体はアートシネマ寄りでも、ヒーローだけはポスター級に強く見せる

### 2. Opening Scene / World Intro
- 役割:
  - 作品の導入として世界観を提示する
- 見せるもの:
  - 一文で分かる世界観
  - 配信者がどんな作品性を持つか
  - 上映の空気を決める導入コピー
- 方向性:
  - 説明文ではなく opening scene として見せる

### 3. Film Chapters / Archive Showcase
- 役割:
  - 代表アーカイブを作品として上映する
- 見せるもの:
  - 大きな 1 作品表示
  - chapter ごとの切替
  - タイトル
  - 一文コピー
  - 上映時間風の情報
  - 視聴導線
- 切替方法:
  - chapter click 主体
- 方向性:
  - Netflix 的一覧ではなく、上映プログラムを選ぶ感覚にする
  - 必要なら小さなサムネイルストリップを補助で添える

### 4. Cast & Profile
- 役割:
  - 主演としての配信者を見せる
- 見せるもの:
  - 表示名
  - 主演としての立ち位置
  - 配信テーマ
  - 主な活動内容
  - 世界観に沿ったプロフィール情報
- 方向性:
  - 見た目は映画クレジット風
  - ただし中身は実サイトとして読めるようにする

### 5. Next Trailer
- 役割:
  - 今後の配信や企画を期待に変える
- 見せるもの:
  - 次回配信
  - 新企画
  - コラボ予告
  - teaser copy
- 方向性:
  - 「予定告知」ではなく「予告編」として見せる

### 6. Watch / SNS / Contact
- 役割:
  - 視聴、SNS、問い合わせの導線をまとめる
- 見せるもの:
  - 視聴導線
  - X
  - YouTube
  - TikTok
  - 問い合わせ
- 方向性:
  - 作品のラストクレジット後に現れる導線として整理する

## Character / Lead Visual Strategy
- 配信者は主演として扱う
- 主役ビジュアル:
  - 1 枚の主演ビジュアルを軸にする
- シーン展開:
  - chapter ごとに別カットや別構図を差し込む
- 基本方針:
  - 主演ポスターの強さを失わず、上映中に別シーンへ遷移していく感覚を作る

## Motion And Effects
- 主役演出:
  - 映画的フェード
  - クロスディゾルブ
  - chapter 切替
  - 余白とタイポの移行
- 補助演出:
  - poster から scene への移行
  - ゆっくりしたテキスト出現
  - シーン境界の柔らかいマスク切替
- 避けること:
  - 激しいカット連打
  - 派手な 3D 空間演出
  - generic なカルーセル UI

## Archive Strategy
- アーカイブは一覧 UI ではなく、代表作品を大きく 1 本見せる
- chapter navigation から別作品へ切り替える
- 各作品で見せる項目:
  - タイトル
  - 一文コピー
  - 上映時間風ラベル
  - 視聴 CTA
- 基本方針:
  - 「配信アーカイブ」ではなく「作品ラインナップ」として扱う

## CTA Strategy
- hero では軽い視聴導線を置く
- 主導線は chapter / archive セクション内に持たせる
- ラストで SNS / contact をまとめて出す
- 基本方針:
  - CTA を広告っぽく見せず、「上映を見る」「次回作を待つ」文脈で整理する

## Technical Direction
- 主体:
  - `CSS + JS`
- 主な用途:
  - シーン切替
  - chapter 同期
  - フェード制御
  - タイポとマスクの演出
- 基本方針:
  - `WebGL` なしでも高品質に成立させる
  - 高品質の鍵は編集感、間、タイポ、構図で作る
- 非採用:
  - `a` / `b` のような WebGL 主役設計
  - 動画サービス UI 寄りの大量サムネイル一覧

## Non-Goals
- generic な映画風 landing page にしない
- アーカイブ一覧を動画サービス模倣 UI にしない
- 主演ではなくキュレーター的立ち位置にしない
- 速いカット編集で派手さを出す方向には行かない

## Why This Direction
- `c` は人物紹介より「作品上映」の方向へ伸ばした方がカテゴリ内で差別化しやすい
- `streamer` カテゴリの中でも、最も編集美と上映テンポで勝つ枠にできる
- CSS + JS 主体でも、シーン設計とフェード品質を高めれば十分に高品質 renewal が成立する
- ラストを予告編につなぐことで、単発ページで終わらずシリーズ感を持たせられる

## Implementation Notes
- chapter navigation は装飾ではなく、実際にシーン移動に使えるようにする
- main poster と archive showcase の主演感を揃える
- cast/profile はクレジット風でも読みやすさを優先して壊さない
- 予告編セクションは teaser に寄せるが、次回配信情報としても機能させる
- 見出しやプロフィール文言はテンプレ感を避けるため、profile seed を先に決める

## Open Knobs
- chapter 数を何本にするか
- 主演ビジュアルと chapter 別カットの枚数
- 上映時間風ラベルをどこまで抽象化するか
- ラストの contact を作品文脈でどこまで包むか

## Readiness Check
- renewal の狙いが明確
- `a` / `b` との差別化が明確
- 中心体験が明確
- archive の見せ方が明確
- hero / chapter / trailer の流れが明確
- 技術方針が明確
- 非採用案が明確

現時点で、別セッションで `streamer/c` renewal 用 worktree を切って実装へ入れる粒度としては十分。
