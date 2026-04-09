# HP-Portal Operational Tasks

## Purpose
- このファイルは HP-Portal を継続改善するための運用ボード
- 主に AI が次の作業を判断するために読む
- 直近の実行判断は `docs/PLAN.md` よりこの `task.md` を優先する

## Active Priorities
- [ ] `public` / `docs` / `scripts` の棚卸しを継続し、`docs` / `scripts` は現状維持で問題ない状態を保ちつつ、`public/templates` の補助資産と未使用ファイル候補を重点確認する。直近では `business/o` の未参照 `_contact_sheet.png`、`business` 配下の未参照 `external-image-02.svg` 以降、`business/b,d,o` の未参照 generated SVG を削除済み
- [ ] business / lp / portfolio / streamer テンプレートの公開品質を維持する
- [ ] テンプレート更新後のサムネイル更新と表示確認の運用を安定させる

## Routine Checks
- [ ] `public/templates` 配下に公開不要なバックアップ、設計メモ、補助ファイルが増えていないか確認する
- [x] `scripts/` 配下に再利用しない one-off スクリプトが溜まっていないか確認する。現状は `package.json` と運用文書から全 script の参照先が追え、one-off と判断できる残存ファイルはない
- [x] `public/assets/images/thumbnails/*_v2` と一覧側の参照先にズレがないか確認する。`public/assets/js/data.js` の全 104 template 参照について実ファイル存在を照合し、欠落 0 件を確認した
- [ ] `npm run audit:links` で template 内の相対リンク切れが増えていないか確認する
- [ ] `npm run audit:metadata` で metadata / placeholder の抜けや戻りがないか確認する
- [ ] `.gitignore` が一時ファイル、生成物、ローカルメモを正しく吸収できているか確認する

## Next Candidate Actions
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
