# Streamer Full Renewal Next Session Prompts B-Z

## Usage

- A が `streamer/full-renewal-integration` にマージされた後、B の別セッションで `B` のプロンプトを貼る。
- B がマージされた後、C の別セッションで `C` のプロンプトを貼る。
- 以降 Z まで同じ。各回、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切る。
- PR base は常に `streamer/full-renewal-integration`。compare は各テンプレートの `codex/streamer-<letter>-renewal`。
- 既存実装を一度消してよいのは、対象テンプレートの `public/templates/streamer/<letter>/**` のみ。共有ファイルは個別ブランチでは触らない。

## B: Boss Room

```text
D:\hp-portal で streamer B のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-b-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-b-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer B / Boss Room のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/b/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\b-boss-room\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\b-boss-room\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer B 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/b/**` のみ削除または置き換えてから進めてください。
- 共有ファイルは個別ブランチでは原則触らないでください。
  - `public/assets/js/data.js`
  - テンプレート一覧・モーダル・レジストリ系
  - 共通CSS / 共通JS
  - サムネイル
  - `task.md`
  - `docs/PLAN.md`
- 共有ファイルの更新が必要な場合は、実装せず最終レポートに「結合ブランチで対応する共有更新」として列挙してください。

実装方針:
- `DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先してください。
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer B として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-b-renewal`
```

## C: Crystal Prism

```text
D:\hp-portal で streamer C のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-c-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-c-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-c-renewal` です。

対象は streamer C / Crystal Prism のみです。変更範囲は原則 `public/templates/streamer/c/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\c-crystal-prism\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\c-crystal-prism\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer C 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/c/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Crystal Prism として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## D: Digital Ghost

```text
D:\hp-portal で streamer D のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-d-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-d-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-d-renewal` です。

対象は streamer D / Digital Ghost のみです。変更範囲は原則 `public/templates/streamer/d/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\d-digital-ghost\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\d-digital-ghost\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer D 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/d/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Digital Ghost として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## E: E-Sports Pro

```text
D:\hp-portal で streamer E のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-e-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-e-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-e-renewal` です。

対象は streamer E / E-Sports Pro のみです。変更範囲は原則 `public/templates/streamer/e/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\e-e-sports-pro\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\e-e-sports-pro\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer E 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/e/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、E-Sports Pro として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## F: Future Tech

```text
D:\hp-portal で streamer F のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-f-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-f-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-f-renewal` です。

対象は streamer F / Future Tech のみです。変更範囲は原則 `public/templates/streamer/f/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\f-future-tech\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\f-future-tech\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer F 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/f/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Future Tech として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## G: Glitch Core

```text
D:\hp-portal で streamer G のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-g-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-g-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-g-renewal` です。

対象は streamer G / Glitch Core のみです。変更範囲は原則 `public/templates/streamer/g/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\g-glitch-core\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\g-glitch-core\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer G 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/g/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Glitch Core として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## H: Horror Mansion

```text
D:\hp-portal で streamer H のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-h-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-h-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-h-renewal` です。

対象は streamer H / Horror Mansion のみです。変更範囲は原則 `public/templates/streamer/h/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\h-horror-mansion\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\h-horror-mansion\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer H 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/h/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Horror Mansion として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## I: Idol Stage

```text
D:\hp-portal で streamer I のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-i-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-i-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-i-renewal` です。

対象は streamer I / Idol Stage のみです。変更範囲は原則 `public/templates/streamer/i/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\i-idol-stage\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\i-idol-stage\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer I 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/i/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Idol Stage として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## J: Jazz Lounge

```text
D:\hp-portal で streamer J のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-j-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-j-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-j-renewal` です。

対象は streamer J / Jazz Lounge のみです。変更範囲は原則 `public/templates/streamer/j/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\j-jazz-lounge\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\j-jazz-lounge\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer J 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/j/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Jazz Lounge として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## K: Knight Honor

```text
D:\hp-portal で streamer K のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-k-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-k-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-k-renewal` です。

対象は streamer K / Knight Honor のみです。変更範囲は原則 `public/templates/streamer/k/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\k-knight-honor\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\k-knight-honor\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer K 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/k/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Knight Honor として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## L: Lunar Phase

```text
D:\hp-portal で streamer L のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-l-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-l-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-l-renewal` です。

対象は streamer L / Lunar Phase のみです。変更範囲は原則 `public/templates/streamer/l/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\l-lunar-phase\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\l-lunar-phase\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer L 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/l/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Lunar Phase として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## M: Metallic Chrome

```text
D:\hp-portal で streamer M のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-m-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-m-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-m-renewal` です。

対象は streamer M / Metallic Chrome のみです。変更範囲は原則 `public/templates/streamer/m/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\m-metallic-chrome\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\m-metallic-chrome\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer M 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/m/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Metallic Chrome として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## N: Neon Night

```text
D:\hp-portal で streamer N のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-n-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-n-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-n-renewal` です。

対象は streamer N / Neon Night のみです。変更範囲は原則 `public/templates/streamer/n/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\n-neon-night\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\n-neon-night\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer N 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/n/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Neon Night として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## O: Orbit Space

```text
D:\hp-portal で streamer O のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-o-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-o-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-o-renewal` です。

対象は streamer O / Orbit Space のみです。変更範囲は原則 `public/templates/streamer/o/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\o-orbit-space\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\o-orbit-space\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer O 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/o/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Orbit Space として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## P: Pixel Retro

```text
D:\hp-portal で streamer P のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-p-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-p-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-p-renewal` です。

対象は streamer P / Pixel Retro のみです。変更範囲は原則 `public/templates/streamer/p/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\p-pixel-retro\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\p-pixel-retro\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer P 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/p/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Pixel Retro として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## Q: Quest Log

```text
D:\hp-portal で streamer Q のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-q-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-q-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-q-renewal` です。

対象は streamer Q / Quest Log のみです。変更範囲は原則 `public/templates/streamer/q/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\q-quest-log\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\q-quest-log\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer Q 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/q/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Quest Log として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## R: Rogue Stealth

```text
D:\hp-portal で streamer R のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-r-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-r-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-r-renewal` です。

対象は streamer R / Rogue Stealth のみです。変更範囲は原則 `public/templates/streamer/r/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\r-rogue-stealth\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\r-rogue-stealth\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer R 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/r/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Rogue Stealth として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## S: Steampunk Gear

```text
D:\hp-portal で streamer S のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-s-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-s-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-s-renewal` です。

対象は streamer S / Steampunk Gear のみです。変更範囲は原則 `public/templates/streamer/s/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\s-steampunk-gear\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\s-steampunk-gear\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer S 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/s/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Steampunk Gear として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## T: Tech Logic

```text
D:\hp-portal で streamer T のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-t-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-t-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-t-renewal` です。

対象は streamer T / Tech Logic のみです。変更範囲は原則 `public/templates/streamer/t/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\t-tech-logic\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\t-tech-logic\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer T 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/t/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Tech Logic として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## U: Urban Graffiti

```text
D:\hp-portal で streamer U のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-u-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-u-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-u-renewal` です。

対象は streamer U / Urban Graffiti のみです。変更範囲は原則 `public/templates/streamer/u/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\u-urban-graffiti\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\u-urban-graffiti\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer U 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/u/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Urban Graffiti として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## V: Vivid Glitch

```text
D:\hp-portal で streamer V のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-v-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-v-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-v-renewal` です。

対象は streamer V / Vivid Glitch のみです。変更範囲は原則 `public/templates/streamer/v/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\v-vivid-glitch\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\v-vivid-glitch\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer V 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/v/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Vivid Glitch として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## W: Wide Pan

```text
D:\hp-portal で streamer W のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-w-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-w-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-w-renewal` です。

対象は streamer W / Wide Pan のみです。変更範囲は原則 `public/templates/streamer/w/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\w-wide-pan\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\w-wide-pan\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer W 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/w/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Wide Pan として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## X: Xtreme Action

```text
D:\hp-portal で streamer X のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-x-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-x-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-x-renewal` です。

対象は streamer X / Xtreme Action のみです。変更範囲は原則 `public/templates/streamer/x/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\x-xtreme-action\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\x-xtreme-action\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer X 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/x/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Xtreme Action として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## Y: Yield Chart

```text
D:\hp-portal で streamer Y のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-y-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-y-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-y-renewal` です。

対象は streamer Y / Yield Chart のみです。変更範囲は原則 `public/templates/streamer/y/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\y-yield-chart\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\y-yield-chart\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer Y 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/y/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Yield Chart として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```

## Z: Zen Brush

```text
D:\hp-portal で streamer Z のフルリニューアル実装を進めてください。作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から `codex/streamer-z-renewal` を作成し、worktree は `D:\hp-portal-worktrees\streamer-z-renewal` に分離してください。PR base は `streamer/full-renewal-integration`、compare は `codex/streamer-z-renewal` です。

対象は streamer Z / Zen Brush のみです。変更範囲は原則 `public/templates/streamer/z/**` のみにしてください。参照仕様は `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\z-zen-brush\DESIGN.md` と `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\z-zen-brush\IMPLEMENTATION_PLAN.md` です。`SYMPHONY_TASK.md` は参考情報としてのみ扱ってください。

まず既存の streamer Z 実装を確認してください。既存実装に引っ張られそうな場合は、`public/templates/streamer/z/**` のみ削除または置き換えてから進めてください。共有ファイル、`public/assets/js/data.js`、テンプレート一覧・モーダル・レジストリ系、共通CSS/JS、サムネイル、`task.md`、`docs/PLAN.md` は個別ブランチでは原則触らないでください。必要な共有更新は最終レポートに列挙してください。

`DESIGN.md` と `IMPLEMENTATION_PLAN.md` を優先し、Zen Brush として成立する実サイト寄りのテンプレートにしてください。デモっぽい見出し、placeholder 感、過剰な演出は避け、レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。完了時は最小限の検証、diff確認、変更ファイル、実装内容、検証結果、結合ブランチ側で対応すべき共有更新を報告してください。
```
