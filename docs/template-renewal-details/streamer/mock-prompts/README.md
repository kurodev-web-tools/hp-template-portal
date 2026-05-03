# Streamer Mock Prompts

## Purpose
- streamer 26テンプレートの first viewport mock 作成用プロンプトを管理する。
- 各プロンプトは DESIGN.md の考え方に合わせ、design tokens、視覚方針、画像生成プロンプト、negative prompt、review checklist を含む。
- business 実装中に裏で streamer mock を作るための入力として使う。

## Structure
- `full-renewal/`: フルリニューアル分類の streamer mock prompts
- `partial-renewal/`: partial分類だが、戦略上は high renewal として扱う streamer mock prompts
- `polish/`: polish分類だが、戦略上は high renewal として扱う streamer mock prompts

## Source
- Template data: `public/assets/js/data.js`
- Renewal details: `docs/template-renewal-details/streamer/**/*.md`
- Generator: `scripts/generate-streamer-mock-prompts.mjs`
- DESIGN.md reference: https://github.com/google-labs-code/design.md

## Usage
1. 対象テンプレートの prompt md を開く。
2. `Mock Image Prompt` と `Negative Prompt` を画像生成ツールへ渡す。
3. 生成後、`Mock Review Checklist` でFV、CTA、配信導線、案件導線を確認する。
4. 採用するモックは、該当テンプレートの renewal detail md と矛盾しないようにする。
