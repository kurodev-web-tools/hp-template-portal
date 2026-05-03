# Portal Conversion Audit 2026-05-03

## Scope
- 対象: `public` のポータル導線、`plans.html` / `order-premium.html`、4カテゴリ x 26件 = 104テンプレート
- 目的: 受託制作依頼が来る状態へ近づけるため、見た目・演出・導線・料金・プラン内容を営業視点で確認する
- 確認方法: static scan、既存監査スクリプト、in-app browser で `index.html` / `list.html` / `plans.html` / template modal を確認

## Verification
- `node scripts/audit-template-links.js`: pass, broken relative template links 0
- `node scripts/audit-template-metadata.js`: pass, metadata issues 0
- Browser: `http://127.0.0.1:4173/`, `list.html`, `plans.html`, list modal を確認

## Executive Finding
現状は「104テンプレートの見本帳」としては成立しているが、「このテンプレートで依頼したい」と思った人を申し込みまで運ぶ導線が弱い。最大の問題はテンプレート品質そのものより、一覧モーダルが `VIEW DEMO` で止まり、価格・プラン・申し込みに接続していないこと。

優先順位は以下。

1. 一覧モーダルと各デモに `このテンプレートで相談 / Lightで申し込む / Standardで相談` を追加する
2. トップの `78+ Premium Designs` を実数の `104 templates` に直す
3. 料金を「安い3プラン」から「範囲が明確な制作パッケージ」に組み替える
4. Streamer と LP を優先してリニューアルする
5. Business / Portfolio は全面作り直しより、導線・実在感・選び方の補強を先に行う

## Pricing Assessment
現行:

| Plan | Price | 現状の見え方 | 判断 |
|---|---:|---|---|
| Light | 10,000 yen | 画像差し替え制限なし、全ページテキスト置換、配色3色、サーバー/ドメイン支援まで含む | 安すぎる。作業範囲が広く、依頼者にも品質不安が出る |
| Standard | 30,000 yen | レイアウト微調整2点、サブページ追加、詳細配色、サーバー/ドメイン支援 | 実作業に対して安い。追加ページの条件が曖昧 |
| Premium | 50,000 yen | 特殊演出、外部連携、1か月フォロー | 外部連携込みなら赤字化しやすい。Full Order との名前も混線 |
| Full Order | 要相談 | 完全オリジナル、システム/EC、SEO戦略 | 要件差が大きいため要相談でよい。ただしテンプレートプランとは明確に分ける |

相場参照:
- Row Tech はテンプレート型を 10万〜30万円、小規模サイトを 30万〜80万円としている。
- ToolShare Lab はフリーランス相場として LP 10万〜50万円、コーポレート 30万〜150万円を提示している。
- Epace は LP の費用内訳として、戦略設計 5万〜15万円、デザイン 10万〜30万円、コーディング 5万〜20万円、フォーム 3万〜10万円を挙げている。
- IDERTY はフリーランスの小規模サイトを 10万〜50万円、制作会社の小規模サイトを 30万〜80万円としている。

推奨:

| New Plan | Price Range | Scope |
|---|---:|---|
| Template Light | 20,000 yen | ココナラ等と比較する初回客向けの入口。原稿/画像支給前提、主要テキスト差し替え、画像数点、配色1-2色、修正1回。構成変更と公開代行は含めない |
| Template Standard | 50,000 yen | 主力プラン。全体文言調整、画像差し替え多め、CTA/フォーム調整、基本SEO、スマホ表示確認、修正2回。サーバー/ドメインは手順案内または軽い支援まで |
| Template Plus | 100,000 yen | しっかり寄せたい人向け。セクション追加、軽いレイアウト変更、下層ページ調整、導線改善、公開支援込み。外部連携や大きな独自演出は別見積もり |
| Full Order | 要相談 | 完全オリジナル制作、システム/EC/予約、撮影/コピー、特殊演出、運用設計など。価格固定せず、要件確定後に見積もる |

テンプレート制作では低価格入口を残す。価格を相場上限へ寄せすぎると、初回客はココナラ等のクラウドソーシングへ流れやすい。代わりに `20,000 yen` の Light は scope を絞り、利益を出す主力は `50,000 yen` の Standard、作り込みは `100,000 yen` の Plus へ誘導する。

## Portal Funnel
現状の問題:
- Top page は見た目は強いが、受託制作サービスとしての「誰向け」「何が含まれる」「依頼後の流れ」が薄い。
- `78+ Premium Designs` が実数の 104 とズレている。
- `list.html` のテンプレート modal は説明、features、color、`VIEW DEMO` のみで、申し込み導線がない。
- `plans.html` は `Premium` と `Full Order` / `order-premium.html` の名称が混線している。
- Contact form の選択肢が `Standard Plan（テンプレート）` と `Premium Plan（フルオーダー）` で、Light / Premium / Full Order の実際のプラン構造と合っていない。
- Template category 選択がカテゴリ単位で、`Business A` など具体テンプレートIDを渡せない。

推奨導線:
1. Top: `テンプレートから短納期でHP制作` を主語にし、104件/最短納期/価格帯/制作範囲をfirst viewで明示。
2. List modal: `このテンプレートで相談`、`このテンプレートをLightで申し込む`、`Standardで見積もり` を追加し、template id/name/categoryを query または hidden field へ渡す。
3. Demo pages: fixed bottom CTA を追加。`このデザインで制作相談` から `plans.html?template=business-a` に戻す。
4. Plans: Light/Standard/Premium と Full Order を別セクションに分け、`Premium Request` という文言を `Full Order Request` へ変更。
5. Success path: Stripe決済前に、依頼内容控え・納品範囲・キャンセル/着手条件を明示。

## Category Assessment

| Category | Current State | Priority | Direction |
|---|---|---:|---|
| Business | 4ページ構成が多く、フォームもあり土台は強い。多くは実サイト寄りに見える | Medium | 全面リニューアルより、template選択から受注への接続、業種別の選び方、汎用文言の除去 |
| Streamer | A/K/S/Z/E 以外は1ページ・CTA弱めが多く、受注用HPとしては不足 | Highest | フルリニューアル優先。配信者向け公式サイトとして profile/schedule/clips/community/contact を標準化 |
| LP | LPなのに lead capture / offer / price / proof が弱いテンプレートが多い | High | 各LPに「何を売る/予約する/登録するか」を固定し、CV導線を再設計 |
| Portfolio | 見た目は強いが、依頼者がHP制作として選ぶには用途説明が弱い | Medium | 作品サイトとしての本物感と、テンプレート購入導線を補強。J/O/S は作り直し候補 |

## Per-Template Actions

### Business

| Template | Decision | Improvement |
|---|---|---|
| A Authentic | Partial | 汎用文言を削り、士業/コンサル向けの信頼導線と実績ブロックを補強 |
| B Bold | Polish | 現状維持寄り。スタートアップ向けに導入事例と問い合わせCTAを強化 |
| C Clean | Polish | 医療/クリニック向けとして予約CTA、診療時間、初診導線をより見える位置へ |
| D Dynamic | Polish | 演出が重めなので、動きはhero中心に制限し、産業/スポーツ向けの成果訴求を追加 |
| E Eco | Partial | サステナブル支援の具体メニューと事例を増やし、抽象コピーを減らす |
| F Future | Partial | テック感はあるが事業内容が薄い。SaaS/AI導入支援など用途を固定 |
| G Global | Partial | 物流/商社向けのKPI、対応地域、相談導線を補強 |
| H High-end | Partial | 高級感は良い。価格帯・予約/問い合わせ導線の現実感を追加 |
| I Intelligent | Partial | ダッシュボード風の差別化はあるが、導入メリットとCTAを明確化 |
| J Modern | Partial | 和モダンの業種を絞り、旅館/老舗/茶寮など実サイト寄りへ寄せる |
| K Knowledge | Polish | 教育/研究機関向けに資料請求・入会/問い合わせ導線を整理 |
| L Logical | Partial | エンジニアリング会社向けに、課題/解決/実績の比較表を追加 |
| M Minimal | Polish | 余白は活かしつつ、CTAが弱くならないよう問い合わせ導線を固定表示 |
| N Neon Night | Polish | イベント/ナイトライフ用途を明確化し、予約・チケット導線を追加 |
| O Organic Flow | Polish | スパ/美容/ウェルビーイング向けに予約導線とメニュー価格を補強 |
| P Pop Vibrant | Polish | エンタメ/店舗向けにキャンペーン・来店予約導線を追加 |
| Q Quality First | Partial | 精密機器/高級プロダクト向けに製品仕様・保証・問い合わせを整理 |
| R Royal Legacy | Polish | 伝統/ブランドアーカイブ向けに沿革と問い合わせ導線を強める |
| S Smart SaaS | Partial | SaaSらしい価格表、導入フロー、無料相談CTAを追加 |
| T Trust Guard | Partial | セキュリティ/金融向けに信頼証明、監査、問い合わせ前の資料DLを追加 |
| U Urban Street | Partial | カルチャー拠点/アパレル向けにイベント・EC誘導を追加 |
| V Vivid Impact | Partial | 広告/キャンペーン向けに強いCTAと実績数値を追加 |
| W Wide Horizon | Partial | 横スクロールの扱いを見直し、通常閲覧でも迷わないCTAを追加 |
| X Xtreme Snap | Partial | スナップ演出を抑え、モバイルでの読了と問い合わせを優先 |
| Y Yield Growth | Partial | 投資/コンサル向けに信頼・免責・相談導線を明確化 |
| Z Zen Garden | Polish | 禅/スパ/茶室向けに予約・アクセス・メニューを補強 |

### Streamer

| Template | Decision | Improvement |
|---|---|---|
| A Abyss Neon | Polish | 既存を活かし、配信予定・SNS・依頼CTAを固定化 |
| B Boss Room | Full | 公式サイト型へ再設計。hero/profile/schedule/clips/community/contact を追加 |
| C Crystal Prism | Full | かわいい/透明感だけで終わらせず、活動情報とファン導線を設計 |
| D Digital Ghost | Full | 匿名性をテーマにしつつ、実用導線と問い合わせ導線を追加 |
| E E-Sports Pro | Partial | 4ページ構成は活かし、generic文言と大会/実績導線を整える |
| F Future Tech | Full | 配信者というよりtech素材に寄っているため、近未来配信者HPへ作り直す |
| G Glitch Core | Full | グリッチ演出をhero中心に抑え、可読プロフィールとCTAを追加 |
| H Horror Mansion | Full | 世界観は強いが受注用途に弱い。ホラー系VTuber公式サイトへ再構成 |
| I Idol Stage | Full | アイドル配信者向けにスケジュール、ライブ実績、グッズ導線を追加 |
| J Jazz Lounge | Full | 雰囲気サイト止まり。音楽/夜配信者向けの活動導線を追加 |
| K Knight Honor | Polish | 4ページ構成を活かし、導線とCTA文言だけを営業向けに調整 |
| L Lunar Phase | Full | 月/占い/夜配信向けとして profile と予約/依頼導線を再設計 |
| M Metallic Chrome | Full | 見た目先行。活動内容、SNS、アーカイブ導線を追加 |
| N Neon Night | Full | Neon系が重複気味。A/G/V と差別化して夜遊び/クラブ配信に寄せる |
| O Orbit Space | Full | 宇宙テーマを公式HP構造に落とし込み、コンテンツ導線を追加 |
| P Pixel Retro | Full | レトロゲーム配信者向けに配信予定、動画、コミュニティを追加 |
| Q Quest Log | Full | RPG UIを活かし、プロフィールをクエストログ化してCTAを明確化 |
| R Rogue Stealth | Full | ステルス/スパイ系として強いが、情報設計を公式サイト型へ |
| S Steampunk Gear | Polish | 4ページ構成を活かし、依頼/活動導線とモバイル可読性を調整 |
| T Tech Logic | Full | tech風テンプレから配信者用の活動紹介へ作り替える |
| U Urban Graffiti | Full | ストリート配信者/ラッパー寄りにして、イベント/SNS導線を追加 |
| V Vivid Glitch | Full | A/G と重複するため、短尺動画/切り抜き特化など用途を分ける |
| W Wide Pan | Polish | 横長表現は良いがフォームなし。相談CTAと通常スクロール導線を補う |
| X Xtreme Action | Full | スポーツ/アクション配信者向けに配信・大会・スポンサー導線を追加 |
| Y Yield Chart | Full | 投資/分析配信者向けに免責、実績、コンテンツ導線を整理 |
| Z Zen Brush | Polish | 4ページ構成を活かし、和風配信者の活動導線と問い合わせCTAを補強 |

### LP

| Template | Decision | Improvement |
|---|---|---|
| A App Showcase | Partial | アプリDL/資料請求などCVを固定し、フォームまたはストア導線を追加 |
| B Brand Story | Partial | ブランド紹介だけでなく購入/予約/問い合わせの最終CTAを明確化 |
| C Campaign Flow | Partial | キャンペーン期限、特典、申し込み条件を強める |
| D Digital SaaS | Partial | 無料トライアル/資料請求導線と価格表を追加 |
| E Event Summit | Partial | イベント日時、チケット、登壇者、申込フォームを上部に集約 |
| F Food & Dining | Partial | 予約・メニュー・アクセスを明確化 |
| G Gym & Fit | Partial | 体験予約、料金、ビフォーアフター/実績を強化 |
| H Health Clinic | Full | フォームなしはLPとして弱い。診療予約LPとして再設計 |
| I Interior Art | Full | 問い合わせ/見積もりCTAと施工事例を中心に再設計 |
| J Jewelry Lux | Full | 価格・商品導線・予約導線が弱い。購入/来店予約LPへ作り直し |
| K Knowledge Base | Full | 情報サイト化している。講座申込/資料請求LPへ再設計 |
| L Legal Trust | Full | 法務相談LPとして信頼証明、相談導線、免責を整える |
| M Media & News | Full | メディア紹介ではCVが弱い。購読/広告出稿/資料請求へ寄せる |
| N Nature Beauty | Partial | 商品購入/予約/診断導線をfirst viewに置く |
| O One Product | Full | 商品LPとして価格、ベネフィット、FAQ、購入CTAを再設計 |
| P Pet Life | Partial | ペットサービス向けに予約/問い合わせフォームを追加 |
| Q Quiz & Lead | Full | クイズ結果からリード獲得までの導線を実装前提で再設計 |
| R Recruit Hero | Partial | 応募フォームまたは募集要項導線を強化 |
| S Service & Tech | Full | サービスLPとして課題/解決/価格/相談CTAを再構成 |
| T Travel & Stay | Full | 宿泊予約LPとして空室確認/プラン/アクセスを設計 |
| U Utility Tool | Full | ツール登録/無料体験導線を中心に再設計 |
| V Visual Story | Full | VSL型なら動画視聴後のCTA、価格、FAQを追加 |
| W Webinar Host | Full | 開催日時、参加特典、申込フォームを上部に固定 |
| X Xross Media | Full | SNSバズ訴求だけでなく、キャンペーン参加/問い合わせ導線を追加 |
| Y Youth Culture | Polish | 既存フォームを活かし、商品/イベントなどCVをさらに明確化 |
| Z Zone Focus | Full | ニッチ訴求の対象とCVを固定して全面再構成 |

### Portfolio

| Template | Decision | Improvement |
|---|---|---|
| A Aurora | Polish | 見た目は強い。制作依頼CTAと職種適合説明を追加 |
| B Blueprint | Polish | システム/設計者向けの案件導線と問い合わせCTAを追加 |
| C Cinematic | Polish | 映像制作者向けに作品視聴から問い合わせまでの流れを明確化 |
| D Darkmode | Polish | 開発者向けとして実績・技術スタック・連絡導線を補強 |
| E Ethereal | Polish | UI/アート向けに作品詳細と問い合わせCTAを補強 |
| F Film | Partial | 横スクロールの体験を残しつつ、通常閲覧とCTA到達性を改善 |
| G Glassmorphism | Polish | トレンド感は良い。実績・役割・問い合わせを明確化 |
| H Holographic | Polish | 3D/crypto art向けの職種説明とCTAを補強 |
| I Infinite | Polish | 没入感は良い。作品一覧と連絡導線の見つけやすさを改善 |
| J Journal | Full | CTAが弱く、文筆/編集者向けの問い合わせ導線へ作り直す |
| K Kinetic | Polish | motion系として成立。演出過多を避け、連絡導線を固定 |
| L Line | Polish | ミニマル表現は良い。制作相談CTAを明確化 |
| M Minimal | Polish | 余白を活かしつつ、問い合わせと実績概要を補強 |
| N Neon | Polish | 音楽/夜系として予約・出演依頼導線を追加 |
| O Obsidian | Full | 高級感はあるがCTAが弱い。luxury portfolioとして再構成 |
| P Paper | Polish | イラストレーター向けに依頼種別・価格目安・CTAを追加 |
| Q Quantum | Polish | データサイエンス向けに成果指標と問い合わせ導線を補強 |
| R Retro | Polish | ゲーム開発者向けに作品詳細と連絡導線を強化 |
| S Space | Full | CTAが弱く、宇宙/3Dクリエイター向けに全面再構成 |
| T Typography | Polish | タイポグラファー向けに依頼導線と作品導線を整理 |
| U Underwater | Polish | 研究/写真系として問い合わせ先とプロジェクト詳細を補強 |
| V Vintage | Partial | 汎用文言を削り、クラフト/歴史系の実績と問い合わせを強化 |
| W Watercolor | Polish | 画家/水彩作家向けに作品購入/依頼導線を追加 |
| X Xenon | Polish | industrial design向けに案件相談CTAを追加 |
| Y Yarn | Polish | ハンドクラフト向けに販売/展示/依頼導線を追加 |
| Z Zen | Polish | 和風建築/思想系として問い合わせCTAを明確化 |

## Implementation Plan

### Phase 1: Conversion Fix
- `public/assets/js/list.js` の modal footer に `このテンプレートで相談` を追加
- `plans.html` / `order-premium.html` に `template` query を受ける hidden field と表示ラベルを追加
- Top の実数表示を `104 templates` に更新
- `plans.html` の plan naming を `Template Premium` と `Full Order` に分離

### Phase 2: Pricing Rewrite
- 価格を `20,000 / 50,000 / 100,000 / Full Order 要相談` に変更
- 各プランに「含むもの / 含まないもの / 修正回数 / 納品形式 / 公開支援範囲」を明記
- Light はクラウドソーシング対抗の入口として残し、scope を狭める

### Phase 3: High Priority Renewal
- Streamer B/C/D/F/G/H/I/J/L/M/N/O/P/Q/R/T/U/V/X/Y を公式サイト型へ順次リニューアル
- LP H/I/J/K/L/M/O/Q/S/T/U/V/W/X/Z をCV型LPへ順次リニューアル

### Phase 4: Polish
- Business は partial/polish をまとめて導線補強
- Portfolio J/O/S を作り直し、他は職種説明と制作相談CTAを追加
