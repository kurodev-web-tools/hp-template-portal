# Business M-Z Renewal Design

## 概要

`public/templates/business` 配下の `M, N, P, Q, R, S, T, U, V, W, X, Y, Z` を、対応する `public/v2_stitch_archive/business/*` のモックアップを基準に大幅リニューアルする。

今回の対象は `index.html` だけではなく、各テンプレートの `about.html`, `service.html`, `contact.html` を含む 4 ページ構成全体である。`index.html` はモックアップを基準として再構築し、下層ページはモックアップの視覚言語とテーマ性に沿って新規設計する。

## 対象と参照元

| テンプレート | 参照モックアップ |
| --- | --- |
| M | `public/v2_stitch_archive/business/minimal_architecture_design_portfolio` |
| N | `public/v2_stitch_archive/business/neon_night_metro_pulse_homepage` |
| P | `public/v2_stitch_archive/business/pop_spark_boom_homepage` |
| Q | `public/v2_stitch_archive/business/quality_first_precision_manufacturing` |
| R | `public/v2_stitch_archive/business/royal_legacy_pride_heritage_homepage` |
| S | `public/v2_stitch_archive/business/smart_saas_intelligent_os` |
| T | `public/v2_stitch_archive/business/trust_guard_iron_stability_homepage` |
| U | `public/v2_stitch_archive/business/urban_street_raw_energy_homepage` |
| V | `public/v2_stitch_archive/business/vivid_impact_the_statement` |
| W | `public/v2_stitch_archive/business/wide_horizon_panorama_homepage` |
| X | `public/v2_stitch_archive/business/xtreme_snap_break_limits` |
| Y | `public/v2_stitch_archive/business/yield_growth_investment_firm_homepage` |
| Z | `public/v2_stitch_archive/business/zen_garden_silence_homepage` |

## ゴール

- 各テンプレートの `index.html` を対応モックアップに沿って再構築する
- `about.html`, `service.html`, `contact.html` をテーマ整合のある新規ページとして再設計する
- 各テンプレート間でレイアウト、動き、カード配置、セクション構成が安易に似ないよう差別化する
- 完成済みテンプレート `public/templates/business/a` を構成基準として、フォルダ構成と基本品質を揃える

## 非ゴール

- 13 テンプレートの UI を単一部品化して横断的に共通化すること
- 既存の崩れた HTML を温存しながら部分修正すること
- 実在企業向けの確定文言や確定数値を作ること

## 置き換え方針

- 各テンプレート配下は実質フルリプレイスで整理する
- 旧 HTML / CSS / JS は必要最小限の参照を除いて前提にしない
- 完成済みテンプレート準拠のフォルダ構成に合わせて再配置する
- 既存未コミット変更は破棄せず、今回の設計・実装時に内容を確認しながら上書き整合する

## ページ構成方針

### 共通ページ役割

- `index.html`
  - モックアップ忠実再現を最優先とする基準ページ
  - ヒーロー、主要セクション順、タイポ、配色、アニメーションのトーンをモックアップに寄せる
- `about.html`
  - 企業紹介の定型ではなく、各テーマの思想、背景、沿革、価値観を伝えるページ
- `service.html`
  - 単なるサービス一覧ではなく、テーマに合う切り口で価値を整理して見せるページ
- `contact.html`
  - 問い合わせ導線もテーマごとに最適化し、CTA の熱量や説明文を変えるページ

### 共通品質

- SEO メタ、OG、構造化データ、相対パス整合、モバイルナビゲーションを整備する
- 完成済みテンプレートに合わせて `assets/css`, `assets/js`, `assets/generated` を配置する
- 4 ページ間の導線と現在地表示を揃える
- 公開前差し替えが必要な数値や社名はコメントで明示する

### index 再現の優先順位

`index.html` は「モックアップ準拠」と「テンプレート運用要件」を両立させるが、優先順位は次の通りに固定する。

#### 忠実再現を優先する要素

- ヒーローの構図
- 主要セクションの並び順
- 配色トーン
- タイポグラフィの方向性
- 画面密度と余白感
- 主要ビジュアルの配置
- モックアップの個性を規定するアニメーショントーン

#### 運用都合で改変してよい要素

- 実ページ遷移のためのヘッダー導線
- 4 ページ構成に合わせたフッター導線
- 現在地表示や CTA のリンク先
- SEO メタ、OG、構造化データ
- 外部依存画像のローカル置換
- フォーム、問い合わせ説明、法的に誤解を招く文言の調整

#### 改変禁止に近い扱いとする要素

- モックアップの印象を決定するレイアウト骨格
- セクションの視覚的な強弱関係
- テーマ固有の視覚言語
- 他テンプレートへ寄ってしまう安易な共通 UI 化

## 差別化ルール

各テンプレートごとに次の 2 軸を固定して、見た目の重複を防ぐ。

- レイアウト重心
  - 余白主導、アシンメトリー、精密グリッド、誌面的構成、横広構成などをテンプレート単位で固定する
- 動きの文法
  - フェード、ライン描画、発光、ズーム、パララックス、段差スクロール、文字出現などを分散させる

共通化するのはページ役割と最低限の技術基盤だけに留め、以下はテンプレートごとに個別設計する。

- セクション順
- カード配置
- 余白スケール
- 見出し表現
- CTA 配置
- hover / scroll 演出
- キービジュアルの使い方

## テンプレート別デザインマップ

### M / minimal_architecture_design_portfolio

- 視覚言語: 白黒基調、広い余白、細線、静かなタイポ
- 動き: 遅いフェード、マスク展開、最小限の視差
- `about`: 設計思想と作品哲学
- `service`: 設計領域とスタジオの進め方
- `contact`: 建築相談に寄せた静かな導線

### N / neon_night_metro_pulse_homepage

- 視覚言語: ネオン配色、斜め構図、グロー、夜景感
- 動き: スライド、発光、レイヤーの奥行き
- `about`: カルチャーとコミュニティ紹介
- `service`: イベント制作、演出、空間プロジェクト
- `contact`: 参加、協業、ブッキング導線

### P / pop_spark_boom_homepage

- 視覚言語: ポップ色、太字、衝突感あるカード、角度のある紙面
- 動き: 跳ねる、拡大、色切替
- `about`: ブランド姿勢とキャンペーン思想
- `service`: 企画、販促、制作支援
- `contact`: 気軽さ重視の軽快導線

### Q / quality_first_precision_manufacturing

- 視覚言語: 精密グリッド、メタル感、直線、計測的 UI
- 動き: ライン描画、工程表示、数値カウント
- `about`: 品質哲学と製造体制
- `service`: 加工領域、対応材質、工程別整理
- `contact`: 図面相談や試作相談に寄せた導線

### R / royal_legacy_pride_heritage_homepage

- 視覚言語: 重厚配色、セリフ体、章立て感、格式
- 動き: ゆったりしたフェード、装飾線の展開
- `about`: 沿革、継承、価値観
- `service`: 高付加価値支援、伴走型提案
- `contact`: 上質で落ち着いた相談導線

### S / smart_saas_intelligent_os

- 視覚言語: UI パネル、ダッシュボード感、クリーンな濃淡
- 動き: スクロール連動、パネル浮上、チャート演出
- `about`: プロダクト思想と運用思想
- `service`: 機能モジュール、導入フロー、活用領域
- `contact`: デモ予約と相談導線

### T / trust_guard_iron_stability_homepage

- 視覚言語: 堅牢さ、重心の低い構図、濃色、直方体的 UI
- 動き: 最小限、安定重視、境界線の強調
- `about`: 安全思想と運用責任
- `service`: 監査、保守、防御、監視
- `contact`: 信頼訴求型の導線

### U / urban_street_raw_energy_homepage

- 視覚言語: 粗さ、ストリート感、大胆なタイポ、切り貼り感
- 動き: ズレ、横流れ、レイヤー干渉
- `about`: カルチャー背景とブランド態度
- `service`: 企画、演出、制作、コラボレーション
- `contact`: 協業と参加を促す導線

### V / vivid_impact_the_statement

- 視覚言語: 強コントラスト、メッセージ先行、大見出し主導
- 動き: 文字出現、塗り切替、縦方向の圧
- `about`: ステートメント中心
- `service`: 提供価値を短く強く見せる構成
- `contact`: 熱量高めでシンプルな導線

### W / wide_horizon_panorama_homepage

- 視覚言語: 横広感、風景的レイアウト、開放感、広い余白
- 動き: パララックス、横移動、広がるマスク
- `about`: ビジョンとスケール感
- `service`: 領域横断型の価値整理
- `contact`: 相談と資料請求の両対応

### X / xtreme_snap_break_limits

- 視覚言語: スポーツ、アクション、斜線、瞬発力
- 動き: 高速トランジション、ズーム、シャッター感
- `about`: 制作姿勢とスピード感
- `service`: 撮影、編集、配信パッケージ
- `contact`: 案件相談型

### Y / yield_growth_investment_firm_homepage

- 視覚言語: 投資、金融、整然さ、数値重視
- 動き: 穏やかな数値アニメーション、チャート出現
- `about`: 投資哲学と実績
- `service`: 戦略、運用、分析、伴走支援
- `contact`: 面談予約型

### Z / zen_garden_silence_homepage

- 視覚言語: 静寂、余白、自然素材感、抑制された色
- 動き: 静かなフェード、細線、ゆっくりした視線誘導
- `about`: 理念、美意識、静けさの哲学
- `service`: 体験や空間提案
- `contact`: 静かな予約導線

## 技術方針

### HTML

- `public/v2_stitch_archive/business/*/code.html` をそのまま置くのではなく、テンプレート用の完成形 HTML として再構築する
- 各ページでメタ情報、ナビゲーション、フッター、現在地を整える
- モックアップが持つ情報密度やパーツ構成は尊重するが、実運用しやすい文脈へ置き換える

### CSS

- `assets/css/tailwind-built.css` を土台にしつつ、個性の大半は `assets/css/style.css` に寄せる
- 色変数、タイポ、余白、カード形状、hover、アニメーションはテンプレートごとに分ける
- 横断共通の UI パターン化は最小限にする
- CSS は各テンプレートのディレクトリ単位で完全分離する
- つまり `public/templates/business/M/assets/css/style.css` と `public/templates/business/N/assets/css/style.css` は別物として管理し、13 テンプレートを 1 つの共通 CSS に結合しない
- 共通で許可するのはポータル側既存の `../../../assets/css/business-base.css` 参照までとする

### JavaScript

- `assets/js/script.js` は必要最小限の機能に留める
- 共通候補はモバイルメニュー、スクロール監視、出現アニメーション程度
- テンプレートごとの動きは必要な分だけ追加し、重い依存は入れない
- JS もテンプレートディレクトリごとのローカルファイルとして分離し、横断共有スクリプトは持たない
- テンプレート固有の演出は各 `assets/js/script.js` に閉じ込める

### アセット

- 外部画像直参照が残る場合は必要に応じてローカル生成アセットへ置き換える
- 完成済みテンプレートで使われている `assets/generated` の運用を参考にする

### コンテンツ

- 各テンプレートごとに仮想企業像を設定して文言を作る
- ダミー感を減らし、テーマに沿った語彙を選ぶ
- 確定値ではない KPI や年数は差し替えコメントを入れる

### 参照元テンプレート

完成済みテンプレートの参照先は次のように固定する。

- 構成基準: `public/templates/business/a`
- 参照対象:
  - 4 ページ構成の置き方
  - `assets/css`, `assets/js`, `assets/generated` の配置
  - 基本的なメタタグの持ち方
  - モバイルメニューやページ導線の実装粒度
- 非参照対象:
  - 見た目そのもの
  - セクション構成
  - 色、余白、カード形状、アニメーションの作り方

### メタデータと構造化データの最低要件

全ページで次を必須とする。

- `<title>`
- `meta name="description"`
- `meta name="viewport"`
- `meta name="theme-color"`
- `meta property="og:title"`
- `meta property="og:description"`
- `meta property="og:type"`
- `meta property="og:locale"`
- `meta property="og:url"`
- `meta name="twitter:card"`
- `link rel="canonical"`
- `meta name="robots"`

構造化データは過剰主張を避けるため、次の範囲に制限する。

- `index/about/service/contact` すべてで許可:
  - `Organization`
  - `WebSite`
- `contact.html` で追加許可:
  - `ContactPage`
- `service.html` で追加許可:
  - `Service`

次は使用しない。

- 実績や収益率を断定的に見せる金融系スキーマ
- 医療、法務、認証、監査を保証するような断定的スキーマ
- モックアップ由来の仮数値を事実として扱う構造化データ

ダミー値の扱いは次の通りとする。

- URL はテンプレート相対または `https://example.com/...` に統一
- 電話番号、住所、社名、実績数値は仮値であることを HTML コメントで明示
- `Y`, `Q`, `T`, `S` は成果保証や認証保証に読める断定表現を避ける

### 仮想企業像の制約

各テンプレートで文言作成前に、最低でも次を固定する。

- 想定業種
- 想定顧客
- 提供価値
- 禁止表現

特に以下の制約を守る。

- `Y`: 利回り保証、確実な成長、元本保証のような表現を使わない
- `Q`: 認証取得済み、業界最高精度など根拠不明の断定を避ける
- `T`: 完全防御、絶対安全のような表現を使わない
- `S`: 導入成果を断定しない

### アクセシビリティ最低基準

- すべての主要アニメーションは `prefers-reduced-motion: reduce` で弱めるか無効化する
- キーボードでナビゲーションとフォーム操作が可能であること
- `contact.html` のフォーム項目にはラベルを付ける
- テキストと背景は可読性を損なわないコントラストを確保する
- 発光表現や高速トランジションは読字性を壊さない範囲に制限する
- 装飾的画像以外には適切な `alt` を付ける

## 作業分割方針

13 件を一気に処理せず、前半で基準となる幅を押さえてから後半へ展開する。

### フェーズ 1

- `M`
- `N`
- `P`
- `Q`

静的、ネオン、ポップ、精密製造の 4 系統で差別化の基準を作る。

### フェーズ 2

- `R`
- `S`
- `T`
- `U`
- `V`
- `W`
- `X`
- `Y`
- `Z`

前半で確立した差別化ルールを維持しつつ後続へ展開する。

## 検証方針

- 各テンプレートで `index/about/service/contact` の相互リンクを確認する
- モバイルメニューの開閉、主要 CTA、相対パスを確認する
- レスポンシブ崩れがないかを主要ページで確認する
- テーマ固有アニメーションが過剰または破綻していないか確認する
- 必要に応じてブラウザで実表示を確認する

### 完了判定

- 対象は 13 テンプレート x 4 ページの全 52 ページとする
- 各テンプレートで少なくとも `index/about/service/contact` の 4 ページすべてを確認対象に含める
- 確認 viewport は最低でも `375px` 幅のモバイルと `1440px` 幅のデスクトップを使う
- 確認観点は次を最低ラインとする
  - ページ間リンク
  - 画像・CSS・JS の相対パス
  - ファーストビュー崩れ
  - モバイルメニュー
  - フォームラベル
  - `prefers-reduced-motion` での破綻有無
  - 主要 CTA の遷移先

### 既存未コミット変更との競合方針

- 対象ディレクトリに既存変更がある場合は、まず内容を確認する
- 今回の設計意図と一致する変更は取り込む
- 一致しない変更は勝手に revert せず、設計優先で置換する前にユーザーへ確認する
- 設計意図を阻害しない周辺変更はそのまま残す

## リスク

- 既存ワークツリーに対象ファイルの未コミット変更があるため、実装時は現在内容を読みながら競合を避ける必要がある
- 13 件を一括で進めると差別化が薄まりやすいため、フェーズ分割と都度確認が必要である
- モックアップの外部依存表現をそのまま使うと運用上不安定になるため、ローカル化判断が必要になる

## 承認済み事項

- 4 ページ構成は `index/about/service/contact` で統一する
- `index` はモックアップ準拠で作成する
- 下層ページはモックアップにないため、テーマと `index` の視覚言語に合わせて新規設計する
- 旧ファイルは実質フルリプレイス前提で整理する
- 完成済みテンプレート `public/templates/business/a` を構成基準として参照する
- テンプレートごとの独自性を重視し、レイアウトやエフェクトの使い回しを避ける
