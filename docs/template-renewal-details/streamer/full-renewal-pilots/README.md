# Streamer Full Renewal Pilot Plan

## Purpose

このディレクトリは、streamer テンプレートのフルリニューアルを始める前に、代表 3 テーマの設計品質と実装方針を固定し、その粒度を全 26 テンプレートへ横展開するための作業領域。

Pilot 対象:

- `B Boss Room`: 高密度ゲーム UI / 暗金 / 玉座 / status panel
- `Q Quest Log`: RPG 掲示板 / 羊皮紙 / party schedule / guild contact
- `Z Zen Brush`: 和紙 / 墨 / 巻物 / 余白 / 朱印

Expansion status:

- B / Q / Z で粒度を確定済み。
- A-Z 全 26 テンプレートに `DESIGN.md` と `IMPLEMENTATION_PLAN.md` を展開済み。

## Non-Negotiable Quality Bar

- チープな見た目にしない。余白、文字サイズ、質感、カード密度、CTA の見え方まで販売用テンプレート品質にする。
- 各テーマの演出、レイアウト、デザインを明確に変える。共通の hero-left / cards-right 構成へ戻さない。
- モックの基本構造を再現する。カード形状、情報配置、主要装飾、CTA 位置、PC の第一印象はモックを基準にする。
- 企業 HP 風に寄せない。配信者の公式サイトとして、Live / Schedule / Follow / Community / Contact を自然に見せる。
- 標準演出はテンプレートに含める。プラン差は「標準演出の有無」ではなく、追加調整・素材加工・構成変更の範囲で扱う。
- PC は世界観を優先し、SP は可読性と CTA 到達性を優先する。PC の縮小版を SP にしない。
- `prefers-reduced-motion` で標準演出を止めても、情報設計と CTA が成立する。

## Design Package Structure

各 pilot は以下を持つ。

- `DESIGN.md`: Google Labs の DESIGN.md 形式に寄せた design tokens + design rationale。見た目の契約書。
- `IMPLEMENTATION_PLAN.md`: 実装順、フェーズ、検証、受け入れ条件。作業計画。

## Common Technical Baseline

3 pilot と、横展開済みの streamer full renewal は、原則として同じ技術基盤を使う。

- Runtime: Static HTML/CSS with vanilla JavaScript
- Styling: template-local CSS variables and component classes
- Assets: SVG/WebP under each template-local assets directory
- Motion: CSS transitions/animations first
- GSAP: CSS だけだと brittle になる短い template-local signature motion に限り Phase 3 で許可
- No React/Next.js conversion
- No Three.js, canvas, particles, scroll hijacking, or heavy animation libraries unless explicitly approved for that template

## Recommended Sequence

1. `Z Zen Brush`
   - 墨、巻物、和紙、朱印を素材化すれば重い JS なしで高品質化できる。
   - まず「標準演出込みテンプレート」の価格/プラン説明にも転用しやすい。
2. `B Boss Room`
   - 高密度 UI の代表。PC first viewport の再現難度を測る。
   - side rail / status / contract block の部品化判断に向く。
3. `Q Quest Log`
   - 下層ページ展開しやすい。LP + subpages の基準作りに向く。
   - parchment / quest tab / guild notice の asset strategy を確認する。

## Implementation Boundaries

- Phase 1 は構造とレスポンシブだけ。motion / particle / canvas / 3D は入れない。
- Phase 2 で CSS、素材、copy、CTA を入れ、モック再現度を上げる。
- Phase 3 でテーマ固有の signature motion を 1-2 個だけ追加する。
- Phase 4 は個別テンプレート内の下層ページとプラン導線を整理する。template modal / shared registry 連携は integration branch で扱う。
- Symphony issue 化前に、各 plan は `Scope` / `Non-goals` / `Verification` を必ず持つ。
- Shared registry、thumbnail、task board、portal-wide data updates は個別テンプレート issue では触らず、integration branch で扱う。

## Rollout Rules For Full Streamer Set

- 共通技術基盤は固定し、テーマごとの違いは CSS variables、component classes、template-local assets、signature motion で表現する。
- motion policy はテンプレートごとに違ってよいが、CSS first / GSAP optional / heavy runtime forbidden の境界は維持する。
- 各テンプレート plan は `Modify only public/templates/streamer/<id>/**` を Scope に入れる。
- `public/assets/js/data.js`、thumbnails、`task.md`、`docs/PLAN.md` は integration branch でまとめて更新する。

## Verification Baseline

- `node scripts/audit-template-links.js`
- `node scripts/audit-template-metadata.js`
- `git diff --check`
- Optional: static grep for `href="#"` and cross-template edits
- Human Review: integration branch / Codex app 側で 390 / 820 / 1024 / 1366px の first viewport、SP CTA order、reduced motion state を確認する。
