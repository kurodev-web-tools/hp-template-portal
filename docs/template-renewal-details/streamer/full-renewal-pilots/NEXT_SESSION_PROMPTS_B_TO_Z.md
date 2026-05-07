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
D:\hp-portal で streamer C のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-c-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-c-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer C / Crystal Prism のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/c/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\c-crystal-prism\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\c-crystal-prism\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer C 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/c/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer C として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-c-renewal`
```

## D: Digital Ghost

```text
D:\hp-portal で streamer D のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-d-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-d-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer D / Digital Ghost のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/d/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\d-digital-ghost\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\d-digital-ghost\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer D 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/d/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer D として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-d-renewal`
```

## E: E-Sports Pro

```text
D:\hp-portal で streamer E のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-e-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-e-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer E / E-Sports Pro のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/e/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\e-e-sports-pro\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\e-e-sports-pro\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer E 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/e/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer E として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-e-renewal`
```

## F: Future Tech

```text
D:\hp-portal で streamer F のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-f-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-f-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer F / Future Tech のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/f/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\f-future-tech\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\f-future-tech\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer F 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/f/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer F として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-f-renewal`
```

## G: Glitch Core

```text
D:\hp-portal で streamer G のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-g-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-g-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer G / Glitch Core のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/g/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\g-glitch-core\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\g-glitch-core\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer G 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/g/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer G として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-g-renewal`
```

## H: Horror Mansion

```text
D:\hp-portal で streamer H のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-h-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-h-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer H / Horror Mansion のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/h/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\h-horror-mansion\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\h-horror-mansion\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer H 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/h/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer H として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-h-renewal`
```

## I: Idol Stage

```text
D:\hp-portal で streamer I のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-i-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-i-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer I / Idol Stage のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/i/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\i-idol-stage\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\i-idol-stage\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer I 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/i/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer I として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-i-renewal`
```

## J: Jazz Lounge

```text
D:\hp-portal で streamer J のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-j-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-j-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer J / Jazz Lounge のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/j/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\j-jazz-lounge\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\j-jazz-lounge\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer J 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/j/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer J として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-j-renewal`
```

## K: Knight Honor

```text
D:\hp-portal で streamer K のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-k-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-k-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer K / Knight Honor のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/k/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\k-knight-honor\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\k-knight-honor\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer K 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/k/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer K として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-k-renewal`
```

## L: Lunar Phase

```text
D:\hp-portal で streamer L のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-l-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-l-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer L / Lunar Phase のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/l/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\l-lunar-phase\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\l-lunar-phase\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer L 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/l/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer L として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-l-renewal`
```

## M: Metallic Chrome

```text
D:\hp-portal で streamer M のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-m-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-m-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer M / Metallic Chrome のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/m/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\m-metallic-chrome\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\m-metallic-chrome\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer M 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/m/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer M として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-m-renewal`
```

## N: Neon Night

```text
D:\hp-portal で streamer N のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-n-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-n-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer N / Neon Night のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/n/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\n-neon-night\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\n-neon-night\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer N 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/n/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer N として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-n-renewal`
```

## O: Orbit Space

```text
D:\hp-portal で streamer O のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-o-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-o-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer O / Orbit Space のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/o/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\o-orbit-space\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\o-orbit-space\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer O 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/o/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer O として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-o-renewal`
```

## P: Pixel Retro

```text
D:\hp-portal で streamer P のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-p-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-p-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer P / Pixel Retro のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/p/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\p-pixel-retro\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\p-pixel-retro\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer P 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/p/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer P として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-p-renewal`
```

## Q: Quest Log

```text
D:\hp-portal で streamer Q のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-q-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-q-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer Q / Quest Log のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/q/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\q-quest-log\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\q-quest-log\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer Q 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/q/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer Q として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-q-renewal`
```

## R: Rogue Stealth

```text
D:\hp-portal で streamer R のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-r-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-r-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer R / Rogue Stealth のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/r/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\r-rogue-stealth\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\r-rogue-stealth\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer R 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/r/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer R として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-r-renewal`
```

## S: Steampunk Gear

```text
D:\hp-portal で streamer S のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-s-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-s-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer S / Steampunk Gear のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/s/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\s-steampunk-gear\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\s-steampunk-gear\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer S 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/s/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer S として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-s-renewal`
```

## T: Tech Logic

```text
D:\hp-portal で streamer T のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-t-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-t-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer T / Tech Logic のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/t/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\t-tech-logic\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\t-tech-logic\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer T 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/t/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer T として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-t-renewal`
```

## U: Urban Graffiti

```text
D:\hp-portal で streamer U のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-u-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-u-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer U / Urban Graffiti のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/u/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\u-urban-graffiti\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\u-urban-graffiti\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer U 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/u/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer U として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-u-renewal`
```

## V: Vivid Glitch

```text
D:\hp-portal で streamer V のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-v-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-v-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer V / Vivid Glitch のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/v/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\v-vivid-glitch\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\v-vivid-glitch\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer V 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/v/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer V として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-v-renewal`
```

## W: Wide Pan

```text
D:\hp-portal で streamer W のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-w-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-w-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer W / Wide Pan のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/w/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\w-wide-pan\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\w-wide-pan\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer W 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/w/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer W として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-w-renewal`
```

## X: Xtreme Action

```text
D:\hp-portal で streamer X のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-x-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-x-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer X / Xtreme Action のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/x/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\x-xtreme-action\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\x-xtreme-action\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer X 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/x/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer X として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-x-renewal`
```

## Y: Yield Chart

```text
D:\hp-portal で streamer Y のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-y-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-y-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer Y / Yield Chart のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/y/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\y-yield-chart\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\y-yield-chart\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer Y 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/y/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer Y として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-y-renewal`
```

## Z: Zen Brush

```text
D:\hp-portal で streamer Z のフルリニューアル実装を進めてください。

前提:
- 作業は Codex app 通常実装で行います。Symphony / Linear は使いません。
- 1テンプレート = 1ブランチ = 1worktree = 1PR の運用です。
- 作業前に `git fetch origin` を行い、最新の `origin/streamer/full-renewal-integration` から個別ブランチを切ってください。
- PR の向き先は main ではなく `streamer/full-renewal-integration` にしてください。
- 作業ブランチ名は `codex/streamer-z-renewal` を使ってください。
- worktree は `D:\hp-portal-worktrees\streamer-z-renewal` のように、既存 main 作業ツリーと分離してください。

作業対象:
- streamer Z / Zen Brush のテンプレートのみ。
- 変更範囲は原則 `public/templates/streamer/z/**` のみです。
- 参照する仕様:
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\z-zen-brush\DESIGN.md`
  - `D:\hp-portal\docs\template-renewal-details\streamer\full-renewal-pilots\z-zen-brush\IMPLEMENTATION_PLAN.md`
- `SYMPHONY_TASK.md` は参考情報としてのみ扱い、実行契約にはしないでください。

重要な制約:
- まず既存の streamer Z 実装を確認してください。
- フルリニューアルとして不要な既存実装に引っ張られそうな場合は、`public/templates/streamer/z/**` のみ削除または置き換えてから進めてください。
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
- 既存の見た目や構成に引っ張られず、仕様書に基づいて streamer Z として成立する実サイト寄りのテンプレートにしてください。
- デモっぽい見出し、placeholder 感、過剰な演出は避けてください。
- レスポンシブ、アクセシビリティ、CTA導線、横スクロールなしを確認してください。

完了時:
- 関連する最小限の検証を実行してください。
- diff を確認してください。
- 最終報告には、変更ファイル、実装内容、検証結果、結合ブランチ側で後から対応すべき共有更新、PR base / compare を含めてください。
- PR base: `streamer/full-renewal-integration`
- PR compare: `codex/streamer-z-renewal`
```
