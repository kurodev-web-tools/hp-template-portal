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
- [ ] `.gitignore` が一時ファイル、生成物、ローカルメモを正しく吸収できているか確認する

## Next Candidate Actions
- [ ] `public/templates` 配下の補助ファイル整理を継続する
- [ ] 残っているスクリプトを用途単位で見直し、継続運用するものだけ残す
- [ ] テンプレート更新時の確認手順を最小限で再利用できる形に寄せる

## Backlog
- [ ] テンプレート更新後の検証手順を標準化する
- [ ] サムネイル再生成ルールと保存先ルールを必要に応じて追加文書化する
- [ ] 運用ルールに合わせて `docs` の役割分担を継続的に簡素化する

## Update Rules
- 大きな整理や実装が終わったら、完了内容に合わせてこのファイルを更新する
- 完了済みの長い履歴はここに溜めず、必要ならコミット履歴や補助文書で追う
- 中長期の背景、フェーズ、方針は `docs/PLAN.md` に寄せる
