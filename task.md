# HP-Portal Operational Tasks

## Purpose
- このファイルは HP-Portal を継続改善するための運用ボード
- 主に AI が次の作業を判断するために読む
- 直近の実行判断は `docs/PLAN.md` よりこの `task.md` を優先する

## Active Priorities
- [ ] `public` / `docs` / `scripts` の棚卸しを継続し、運用に不要な資産を減らす
- [ ] business / lp / portfolio / streamer テンプレートの公開品質を維持する
- [ ] テンプレート更新後のサムネイル更新と表示確認の運用を安定させる

## Routine Checks
- [ ] `public/templates` 配下に公開不要なバックアップ、設計メモ、補助ファイルが増えていないか確認する
- [ ] `scripts/` 配下に再利用しない one-off スクリプトが溜まっていないか確認する
- [ ] `public/assets/images/thumbnails/*_v2` と一覧側の参照先にズレがないか確認する
- [ ] `npm run audit:links` で template 内の相対リンク切れが増えていないか確認する
- [ ] `npm run audit:metadata` で metadata / placeholder の抜けや戻りがないか確認する
- [ ] `.gitignore` が一時ファイル、生成物、ローカルメモを正しく吸収できているか確認する

## Next Candidate Actions
- [ ] `public/templates` 配下で新たに補助ファイルや未使用資産が増えていないかを継続確認する
- [ ] 残っているスクリプトの用途を継続確認し、再利用性の薄いものが増えない状態を維持する
- [ ] `docs/THUMBNAIL_WORKFLOW.md` を起点に、変更範囲だけを capture する運用へ寄せ続ける
- [ ] カテゴリ共通 `DESIGN.md` を基準に、必要なテンプレートから個別 `DESIGN.md` を追加する
- [ ] `docs/README.md` を基準に、reference 文書の置き場所を維持しつつ必要なら再整理する
- [ ] `docs/TEMPLATE_METADATA_AUDIT.md` を基準に、demo placeholder 文言の品質を必要に応じて見直す
- [ ] template の相対リンク監査を回し、明らかな参照切れを順次解消する
- [ ] template の metadata 監査を回し、構造的な抜けや placeholder 戻りを順次解消する
- [ ] `streamer` の残る公開品質課題として、設定コメントの扱いと個別 CTA 文言の明確化を整理する
- [ ] `lp` の残る公開品質課題として、`data-ai-type` の整理と heavy Unsplash / placeholder 依存の削減を進める
- [ ] `portfolio` は description 固有化を維持しつつ、残るダミーリンクと CDN 依存を順次整理する
- [ ] `business` の開発用コメント、generic placeholder、`business/k` のダミー検索 UI が戻っていないか継続確認する

## Backlog
- [ ] テンプレート更新後の検証手順を標準化する
- [ ] サムネイル再生成ルールと保存先ルールを必要に応じて追加文書化する
- [ ] 運用ルールに合わせて `docs` の役割分担を継続的に簡素化する

## Update Rules
- 大きな整理や実装が終わったら、完了内容に合わせてこのファイルを更新する
- 完了済みの長い履歴はここに溜めず、必要ならコミット履歴や補助文書で追う
- 中長期の背景、フェーズ、方針は `docs/PLAN.md` に寄せる
