# HP-Portal Operational Tasks

## Purpose
- このファイルは HP-Portal を継続改善するための運用ボード
- 主に AI が次の作業を判断するために読む
- 直近の実行判断は `docs/PLAN.md` よりこの `task.md` を優先する

## Active Priorities
- [ ] 2026-05-03 の受注導線監査を起点に、`list.html` の template modal から `plans.html` / `order-premium.html` へ template id を渡す導線、トップの実数表示、料金/プラン名の整理を優先改善する。詳細は `docs/reviews/PORTAL_CONVERSION_AUDIT_2026-05-03.md`
- [x] 104テンプレート分のリニューアル詳細mdを `docs/template-renewal-details/` にカテゴリ別かつ `full-renewal` / `partial-renewal` / `polish` 別で作成した。各テンプレートの実装前設計入力として、構成、デザイン、CTA、モック画像方針に加え、リニューアル深度、演出レベル、ページモデル、PCヘッダー位置、FV設計、セクション別計画、避ける表現、実装フェーズまで確認できる
- [x] streamer 26件の first viewport mock 作成用プロンプトを `docs/template-renewal-details/streamer/mock-prompts/` に作成した。DESIGN.md 形式を参考に、design tokens、視覚方針、画像生成プロンプト、negative prompt、review checklist をテンプレートごとに確認できる
- [ ] `public` / `docs` / `scripts` の棚卸しを継続し、`docs` / `scripts` は現状維持で問題ない状態を保ちつつ、`public/templates` の補助資産と未使用ファイル候補を重点確認する。直近では `business/o` の未参照 `_contact_sheet.png`、`business` 配下の未参照 `external-image-02.svg` 以降、`business/b,d,o` の未参照 generated SVG を削除済み
- [ ] business / lp / portfolio / streamer テンプレートの公開品質を維持する
- [x] Business L: Logical の Phase 1 partial renewal を専用 worktree / branch で実施した。構造と CTA 導線に絞り、エンジニアリング会社向けの Hero CTA、mobile menu、下層ページ、課題/解決/成果の比較表から `plans.html?template=business-l&plan=standard` への「このテンプレートで制作相談」導線を追加した。motion / 3D / 粒子 / 重い canvas は追加せず、既存の reveal / breathing / live update 処理も静的化した。次の実装候補は Business G: Global
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

## Backlog
- [x] テンプレート更新後の検証手順を標準化する。`docs/TEMPLATE_STATIC_AUDIT.md` に default verification routine、監査コマンドの使い分け、カテゴリ別テストの入口を追記した
- [ ] サムネイル再生成ルールと保存先ルールを必要に応じて追加文書化する
- [x] 運用ルールに合わせて `docs` の役割分担を継続的に簡素化する。`docs/README.md` に quick guide を追加し、`docs/AI_WORKFLOW.md` から関連運用文書の役割を辿れるように整理した

## Update Rules
- 大きな整理や実装が終わったら、完了内容に合わせてこのファイルを更新する
- 完了済みの長い履歴はここに溜めず、必要ならコミット履歴や補助文書で追う
- 中長期の背景、フェーズ、方針は `docs/PLAN.md` に寄せる
