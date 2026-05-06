# HP-Portal Operational Tasks

## Purpose
- このファイルは HP-Portal を継続改善するための運用ボード
- 主に AI が次の作業を判断するために読む
- 直近の実行判断は `docs/PLAN.md` よりこの `task.md` を優先する

## Active Priorities
- [ ] streamer 26件のフルリニューアルは、当面 Symphony / Linear 実行ではなく Codex app の通常作業で進める。基本単位は `1テンプレート = 1ブランチ = 1worktree = 1PR` とし、個別PRを結合用ブランチへ集約してから全体確認する
- [ ] streamer 26件の個別実装は `docs/template-renewal-details/streamer/full-renewal-pilots/<slug>/DESIGN.md` と `IMPLEMENTATION_PLAN.md` を正本にする。`SYMPHONY_TASK.md` は実装補助メモとして参照してよいが、実行契約としては扱わない
- [ ] streamer renewal の共有ファイル更新は個別テンプレートPRでは行わず、結合用ブランチでまとめて扱う。対象は `public/assets/js/data.js`、サムネイル、template modal / registry、`task.md`、`docs/PLAN.md`
- [ ] 2026-05-03 の受注導線監査を起点に、`list.html` の template modal から `plans.html` / `order-premium.html` へ template id を渡す導線、トップの実数表示、料金/プラン名の整理を優先改善する。詳細は `docs/reviews/PORTAL_CONVERSION_AUDIT_2026-05-03.md`
- [x] business polish 1件目として `business/c` (Clean) を `codex-business-c-clean` worktree で改善した。医療/相談業向けの既存構成を維持し、4ページ共通で `plans.html?template=business-c&plan=standard` / `plan=light` へ戻る固定相談CTAを追加した
- [x] 104テンプレート分のリニューアル詳細mdを `docs/template-renewal-details/` にカテゴリ別かつ `full-renewal` / `partial-renewal` / `polish` 別で作成した。各テンプレートの実装前設計入力として、構成、デザイン、CTA、モック画像方針に加え、リニューアル深度、演出レベル、ページモデル、PCヘッダー位置、FV設計、セクション別計画、避ける表現、実装フェーズまで確認できる
- [x] Business D: Dynamic の Phase 1 polish として、`public/templates/business/d` の制作相談 CTA を `plans.html?template=business-d&plan=standard` へ整理し、未接続リンクとスクロール reveal / parallax フックを外して static structure + CTA 導線に寄せた
- [x] streamer 26件の first viewport mock 作成用プロンプトを `docs/template-renewal-details/streamer/mock-prompts/` に作成した。DESIGN.md 形式を参考に、design tokens、視覚方針、画像生成プロンプト、negative prompt、review checklist をテンプレートごとに確認できる
- [x] streamer B/C/I の試作結果を受け、`scripts/generate-streamer-mock-prompts.mjs` と `mock-prompts/` 全26件に Layout Signature を追加した。各テーマで archetype、ヘッダー位置、情報配置、密度、実装ヒント、避ける共通レイアウトを明文化し、右カード積み/hero-left/cards-right に戻りにくい生成入力へ更新した
- [x] streamer 26件の first viewport mock画像を更新済み Layout Signature プロンプトから `docs/template-renewal-details/streamer/mockup-image/` に `*-layout-v2.png` として保存した。保存先は `full-renewal` / `partial-renewal` / `polish` の分類を維持し、各画像の存在と寸法取得を確認済み
- [x] Symphony / Linear で streamer 26件を自動実装する試行は、Windows 上の Codex app-server / MCP auth で `TokenRefreshFailed` が出るため中断した。Linear に積んだ streamer renewal issue は運用対象から外し、Codex app 実装へ戻す
- [ ] `public` / `docs` / `scripts` の棚卸しを継続し、`docs` / `scripts` は現状維持で問題ない状態を保ちつつ、`public/templates` の補助資産と未使用ファイル候補を重点確認する。直近では `business/o` の未参照 `_contact_sheet.png`、`business` 配下の未参照 `external-image-02.svg` 以降、`business/b,d,o` の未参照 generated SVG を削除済み
- [ ] business / lp / portfolio / streamer テンプレートの公開品質を維持する
- [x] Business B: Bold の Phase 1 polish として、Hero の制作相談CTA、実績導線、CTA strip、SP固定CTA、下層ページ共通の `plans.html?template=business-b&plan=standard` 導線を追加した。詳細入力は `docs/template-renewal-details/business/polish/b-bold.md`
- [x] Business O Organic Flow の Phase 1 polish として、既存の柔らかい見た目を維持したまま、FV、ヘッダー、モバイルメニュー、各下層ページに `plans.html?template=business-o&plan=standard` への制作相談導線を追加し、抽象的なウェルネス表現をメニュー、価格、予約、相談の実サイト寄りコピーへ寄せた
- [x] Business M: Minimal の Phase 1 polish として、既存の静かな余白と暗色構成を維持しながら、header / hero / CTA strip / mobile fixed CTA から `plans.html?template=business-m&plan=standard` へ進める導線を追加した。motion、3D、粒子、重い canvas は追加していない。`node scripts/audit-template-links.js`、`node scripts/audit-template-metadata.js`、`git diff --check` は通過済み
- [x] Business K: Knowledge の Phase 1 polish を実施した。`docs/template-renewal-details/business/polish/k-knowledge.md` に合わせ、既存の知的信頼感を維持しながら Hero / header / contact / footer の CTA を `plans.html?template=business-k&plan=standard` へつなぎ、未完成に見える検索・`#` 導線を実ページへの相談導線へ整理した
- [x] Business S: Smart SaaS の Phase 1 構造/CTA導線を `codex/business-s-smart-saas` で更新した。`public/templates/business/s/` の Hero、About、Service、Contact に `plans.html?template=business-s&plan=standard` への制作相談導線、SaaS向け実サイト寄りコピー、問い合わせしやすい相談フォーム文脈を反映済み。motion / 3D / 粒子 / heavy canvas の新規追加はなし
- [x] Business T: Trust Guard の Phase 1 partial renewal を専用 worktree / branch で実施した。構造と CTA 導線に絞り、Trust Guard の堅牢な印象を残しながら、Hero / mobile menu / 下層ページ / contact に `plans.html?template=business-t&plan=standard` への「このテンプレートで制作相談」導線を追加した。motion / 3D / 粒子 / 重い canvas は追加せず、既存の fade-up 表示処理も静的化した
- [x] Business A: Authentic の Phase 1 として、`docs/template-renewal-details/business/partial-renewal/a-authentic.md` を基準に構造と CTA 導線のみを整理した。`public/templates/business/a` の header / mobile menu / hero / 中盤 CTA / contact form に、初回相談、資料請求、顧問相談、`plans.html?template=business-a&plan=standard` への制作相談導線を追加し、演出追加は行っていない
- [x] Business Z: Zen Garden の Phase 1 polish として、`docs/template-renewal-details/business/polish/z-zen-garden.md` を基準に hero の対象/価値/CTA、制作相談導線、CTA strip、footer CTA、一覧 description を更新した。motion / 3D / canvas / 粒子は追加せず、既存の scroll reveal は外して静的表示へ戻した
- [x] Business R: Royal Legacy の Phase 1 polish を実施した。既存のクラシックな構造を維持しつつ、老舗企業・文化ブランド向けの実サイト寄りコピー、header / hero / contact / mobile menu の制作相談導線、`plans.html?template=business-r&plan=standard` への CTA を追加した
- [x] Business P: Pop Vibrant は専用 worktree / branch で Phase 1 polish を実施し、ファミリー向け店舗・エンタメサービスの販促サイトとして CTA 導線、実サイト寄りコピー、静的構造を整理した
- [x] Business D: Dynamic の Phase 1 polish として、`public/templates/business/d` の制作相談 CTA を `plans.html?template=business-d&plan=standard` へ整理し、未接続リンクとスクロール reveal / parallax フックを外して static structure + CTA 導線に寄せた
- [x] Business N: Neon Night の Phase 1 polish を実施。ネオン調の印象を維持しつつ、イベント/ナイトクラブ/音楽企画向けの実サイト寄りコピー、チケット購入・席予約・出演相談の導線、`plans.html?template=business-n&plan=standard` への制作相談 CTA を強化した
- [x] Business Y: Yield Growth の Phase 1 partial renewal として、投資・経営支援向けの plan-routed CTA、初回相談導線、静的表示方針を `public/templates/business/y` に反映した
- [x] Business F: Future の Phase 1 改善として、AI導入・SaaS・DX支援向けの実サイト寄りコピー、`plans.html?template=business-f&plan=standard` への制作相談CTA、サービス/問い合わせ導線の具体化、装飾アニメーションの静止化を反映した
- [x] Business L: Logical の Phase 1 partial renewal を専用 worktree / branch で実施した。構造と CTA 導線に絞り、エンジニアリング会社向けの Hero CTA、mobile menu、下層ページ、課題/解決/成果の比較表から `plans.html?template=business-l&plan=standard` への「このテンプレートで制作相談」導線を追加した。motion / 3D / 粒子 / 重い canvas は追加せず、既存の reveal / breathing / live update 処理も静的化した
- [x] Business G: Global の Phase 1 partial renewal を実施し、物流・商社・越境EC向けの対応地域確認、輸送相談、`plans.html?template=business-g&plan=standard` への制作相談CTAを補強した
- [x] `business/h` High-end の Phase 1 として、ホテル・高級サービス向けの実サイト寄りコピー、信頼材料、予約 / 資料請求 / 制作相談 CTA を `plans.html?template=business-h&plan=standard` に接続した
- [x] Business J: Modern は Phase 1 として、旅館・茶寮・和ブランド・文化施設向けの実サイト寄りコピー、`plans.html?template=business-j&plan=standard` への制作相談CTA、SPメニュー/ヘッダー/末尾固定CTAの導線を追加した。motion、3D、粒子、重いcanvasは追加していない
- [x] `business/q` Quality First の Phase 1 改善として、静的な品質証明・仕様確認の見せ方を保ったまま、`plans.html?template=business-q&plan=standard` への制作相談導線、見積もり/カタログ請求を含む問い合わせ入口、reveal/counter 系の動的演出削除を反映した
- [x] `business/i` Intelligent の Phase 1 改善として、分析ツール / 監視SaaS / データ活用企業向けの相談導線を `plans.html?template=business-i&plan=standard` に接続し、Hero、各ページ header、contact 周辺、一覧 description を実サイト寄りに補強した
- [x] `business/v` Vivid Impact の Phase 1 改善を実施した。既存の強い配色と実サイト寄りの制作スタジオ構成を維持しつつ、全ページに `plans.html?template=business-v&plan=standard` への制作相談 CTA を追加し、Phase 1 制約に合わせて reveal / IntersectionObserver 系の演出を外した
- [x] Business E: Eco の Phase 1 改善として、食品・日用品・小売向けの実在感を残したまま、全ページに `plans.html?template=business-e&plan=standard` への「このテンプレートで制作相談」導線を追加し、過度な hover 移動・画像拡大・広範囲 blur を抑えた
- [x] `business/u` Urban Street の Phase 1 改善として、plan 相談 CTA、問い合わせ導線、静的表示への整理を反映した。専用 branch / worktree / draft PR 単位で検証し、streamer には触れていない
- [x] `business/w` Wide Horizon の Phase 1 として、宿泊施設向け景観導線サイトの実在感を保ったまま、Hero / header / 各CTAから `plans.html?template=business-w&plan=standard` へ制作相談導線を接続し、既存の自動 reveal / count-up / hero zoom を静的表示へ寄せた
- [x] Business X: Xtreme Snap の Phase 1 改善として、スポーツイベント / アクション系ブランド向けの実在感、参加予約 / スポンサー相談のCTA導線、`plans.html?template=business-x&plan=standard` への制作相談導線、既存 motion hook の静的化を反映した
- [ ] テンプレート更新後のサムネイル更新と表示確認の運用を安定させる

## Routine Checks
- [ ] `public/templates` 配下に公開不要なバックアップ、設計メモ、補助ファイルが増えていないか確認する
- [x] `scripts/` 配下に再利用しない one-off スクリプトが溜まっていないか確認する。現状は `package.json` と運用文書から全 script の参照先が追え、one-off と判断できる残存ファイルはない
- [x] `public/assets/images/thumbnails/*_v2` と一覧側の参照先にズレがないか確認する。`public/assets/js/data.js` の全 104 template 参照について実ファイル存在を照合し、欠落 0 件を確認した
- [x] `npm run audit:links` で template 内の相対リンク切れが増えていないか確認する。現時点では `No broken relative template links found.`
- [x] `npm run audit:metadata` で metadata / placeholder の抜けや戻りがないか確認する。現時点では `No metadata issues found.`
- [x] `.gitignore` が一時ファイル、生成物、ローカルメモを正しく吸収できているか確認する。現状の ignore ルールは運用に対して十分で、`docs` / `scripts` / `public` 配下にも一時ファイル混入はない

## Next Candidate Actions
- [x] streamer 新テーマの共通基盤を `docs/TEMPLATE_DESIGN_SPEC_COMMON.md` と `docs/TECH_STACK.md` に固定した。詳細設計テンプレートと共通骨格、3D / フォールバック / 検証ルールを整理済み
- [x] streamer の残りテーマ詳細設計に、`LP single page` / `LP + subpages` / `side panel` / `top fixed` / `world-in-UI` の判断を横展開した
- [x] `E: Echo` と `O: Overload` の `LP + subpages` で、トップの役割と下層ページの役割分担を明文化した
- [x] `K / Q / S / U / W / X / P` の `world-in-UI` 系で、トップの役割と導線の意味づけを補強した
- [x] `A / D / F` の `LP single page` 系で、トップの役割と SP の可読性優先を明文化した
- [x] `B / C / I` の演出強め `LP single page` 系で、トップの役割と画面内導線を明文化した
- [x] `G / H / J / K / L / M / N / R / T / V / Y / Z` の `LP single page` / `world-in-UI` 系で、トップの役割を追加して見出し粒度を揃えた
- [x] `streamer_next` のための予約領域を `public/assets/js/data.js` と `public/assets/images/thumbnails/streamer_next/` に準備した。表示接続は次の branch で行う
- [ ] `public/templates` 配下で新たに補助ファイルや未使用資産が増えていないかを継続確認する。現時点では `business/boilerplate.html` はスターターテンプレートとして保持し、generated 画像は参照のある `external-image-01.svg` と OGP 用 SVG を中心に残して個別判断する
- [x] 残っているスクリプトの用途を継続確認し、再利用性の薄いものが増えない状態を維持する。`scripts/README.md`、`package.json`、関連運用文書の参照は整合しており、現状の残存 script は保守対象として妥当
- [x] `docs/THUMBNAIL_WORKFLOW.md` を起点に、変更範囲だけを capture する運用へ寄せ続ける。カテゴリ別 command、business の tag 指定、preview 不安定時の file fallback、capture 後の最小確認手順を文書へ反映した
- [ ] カテゴリ共通 `DESIGN.md` を基準に、必要なテンプレートから個別 `DESIGN.md` を追加する
- [x] `docs/README.md` を基準に、reference 文書の置き場所を維持しつつ必要なら再整理する。現状の `docs/reviews` / `docs/reference` 配置は運用方針と整合している
- [x] `docs/TEMPLATE_METADATA_AUDIT.md` を基準に、demo placeholder 文言の品質を必要に応じて見直す。`example.com` 系の metadata 戻りはなく、残る `data-demo-*` は意図的な demo hook、generated SVG の `Local placeholder image` はローカル生成資産として扱う方針を明記した
- [ ] template の相対リンク監査を回し、明らかな参照切れを順次解消する
- [ ] template の metadata 監査を回し、構造的な抜けや placeholder 戻りを順次解消する
- [x] `streamer` の残る公開品質課題として、設定コメントの除去と個別 CTA / contact 文言の明確化を反映した
- [x] `lp` の残る公開品質課題として、`data-ai-type` の明確なズレと主要フォームの placeholder / demo 文言を整理した。heavy Unsplash 依存は継続課題として保留
- [x] `portfolio` は description 固有化と画像差し替え完了状態を維持しつつ、CDN 依存は当面保留として placeholder 品質の主要な戻り確認を完了した
- [x] `business` の開発用コメント、generic placeholder、`business/k` のダミー検索 UI について主要な戻り確認を実施した
- [x] `business/w` Wide Horizon の Phase 1 として、宿泊施設向け景観導線サイトの実在感を保ったまま、Hero / header / 各CTAから `plans.html?template=business-w&plan=standard` へ制作相談導線を接続し、既存の自動 reveal / count-up / hero zoom を静的表示へ寄せた
- [x] `business/u` Urban Street の Phase 1 改善として、plan 相談 CTA、問い合わせ導線、静的表示への整理を反映した。専用 branch / worktree / draft PR 単位で検証し、streamer には触れていない
- [x] `business/v` Vivid Impact の Phase 1 改善を実施した。既存の強い配色と実サイト寄りの制作スタジオ構成を維持しつつ、全ページに `plans.html?template=business-v&plan=standard` への制作相談 CTA を追加し、Phase 1 制約に合わせて reveal / IntersectionObserver 系の演出を外した
- [x] `business/i` Intelligent の Phase 1 改善として、分析ツール / 監視SaaS / データ活用企業向けの相談導線を `plans.html?template=business-i&plan=standard` に接続し、Hero、各ページ header、contact 周辺、一覧 description を実サイト寄りに補強した
- [x] `business/q` Quality First の Phase 1 改善として、静的な品質証明・仕様確認の見せ方を保ったまま、`plans.html?template=business-q&plan=standard` への制作相談導線、見積もり/カタログ請求を含む問い合わせ入口、reveal/counter 系の動的演出削除を反映した
- [x] `business/h` High-end の Phase 1 として、ホテル・高級サービス向けの実サイト寄りコピー、信頼材料、予約 / 資料請求 / 制作相談 CTA を `plans.html?template=business-h&plan=standard` に接続した
- [x] Business R: Royal Legacy の Phase 1 polish を実施した。既存のクラシックな構造を維持しつつ、老舗企業・文化ブランド向けの実サイト寄りコピー、header / hero / contact / mobile menu の制作相談導線、`plans.html?template=business-r&plan=standard` への CTA を追加した
- [x] Business P: Pop Vibrant は専用 worktree / branch で Phase 1 polish を実施し、ファミリー向け店舗・エンタメサービスの販促サイトとして CTA 導線、実サイト寄りコピー、静的構造を整理した

## Backlog
- [x] テンプレート更新後の検証手順を標準化する。`docs/TEMPLATE_STATIC_AUDIT.md` に default verification routine、監査コマンドの使い分け、カテゴリ別テストの入口を追記した
- [ ] サムネイル再生成ルールと保存先ルールを必要に応じて追加文書化する
- [x] 運用ルールに合わせて `docs` の役割分担を継続的に簡素化する。`docs/README.md` に quick guide を追加し、`docs/AI_WORKFLOW.md` から関連運用文書の役割を辿れるように整理した

## Archived / Deferred
- [ ] Symphony runner の再検証は、Codex app-server の MCP/auth 失敗を切り分けられる小さい検証 issue で別途行う。streamer 26件の本実装ブロッカーにはしない
- [ ] Linear は当面 streamer renewal の実行キューとして使わず、必要になった場合のみ進捗メモや手動タスク管理に限定する

## Update Rules
- 大きな整理や実装が終わったら、完了内容に合わせてこのファイルを更新する
- 完了済みの長い履歴はここに溜めず、必要ならコミット履歴や補助文書で追う
- 中長期の背景、フェーズ、方針は `docs/PLAN.md` に寄せる
