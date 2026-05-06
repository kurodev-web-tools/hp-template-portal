# Zen Brush Implementation Plan - Symphony Task

This file is the Linear issue body for a Symphony run. Keep this task scoped to one streamer template and one Symphony workspace.

## Objective

Zen Brush を和紙、墨、巻物、朱印を標準演出として備えた高品質配信者公式サイトへリニューアルする。

Static-first。LP-first top + existing subpages 方針で、既存下層ページは維持しながら first viewport と main landing flow を強化する。CSS と素材で世界観を作り、GSAP は CSS だけだと brittle になる短い signature motion に限る。

## Source Docs

Reference these planning docs when implementing:

- `docs/template-renewal-details/streamer/full-renewal-pilots/z-zen-brush/DESIGN.md`
- `docs/template-renewal-details/streamer/full-renewal-pilots/z-zen-brush/IMPLEMENTATION_PLAN.md`
- `docs/template-renewal-details/streamer/mockup-image/polish/z-zen-brush-layout-v2.png`
- `docs/template-renewal-details/streamer/polish/z-zen-brush.md`

## Scope

- Modify only `public/templates/streamer/z/**`.
- Use `LP-first top + existing subpages`: keep existing subpages, strengthen the first viewport and main landing flow.
- Rebuild the top landing experience around the Zen Brush mock: ink nav, brush hero, next stream seal, schedule scroll, contact seal.
- Keep all assets template-local under `public/templates/streamer/z/assets/`.
- Keep portal CTA links pointing to `plans.html?template=streamer-z&plan=standard`.

## Non-goals

- Do not edit `public/assets/js/data.js`.
- Do not edit thumbnails.
- Do not edit `task.md`.
- Do not edit `docs/PLAN.md`.
- Do not touch other templates.
- Do not remove existing Z subpages unless a later integration decision explicitly approves it.
- Do not update shared registry, template modal data, thumbnails, or task board entries in this template issue.
- Do not introduce React, build-system changes, global CSS rewrites, or shared JavaScript changes.

## Technical Baseline

- Static HTML/CSS + vanilla JavaScript. Template-local CSS variables, component classes, SVG/WebP assets, CSS transitions/animations first. GSAP is allowed only for short template-local signature motion in Phase 3 when CSS alone would be brittle.
- Runtime: Static HTML/CSS with vanilla JavaScript.
- Styling: template-local CSS variables and component classes.
- Assets: SVG/WebP under `public/templates/streamer/z/assets/`.
- Motion: CSS transitions/animations first, including CSS mask/clip-path where useful.
- GSAP: allowed only for short, template-local Phase 3 signature motion if CSS alone would be brittle.
- Forbidden unless explicitly approved: React/Next.js conversion, Three.js, canvas, particles, scroll hijacking, heavy animation libraries.

## Implementation Requirements

### Phase 1: Static Structure

- [ ] Keep Z as LP-first top + existing subpages.
- [ ] Build first viewport structure: ink nav, brush hero, stream seal, schedule scroll, contact seal.
- [ ] Add SP order independent from PC visual order.
- [ ] Add CTA links to `plans.html?template=streamer-z&plan=standard`.
- [ ] Keep all links and asset paths local to `public/templates/streamer/z/**` where possible.

### Phase 2: Visual Fidelity

- [ ] Define CSS variables from `DESIGN.md`.
- [ ] Add paper texture, ink drip, enso circle, scroll ends, seal marks as WebP/SVG assets.
- [ ] Build scroll card with pseudo-elements for roll ends and paper shadow.
- [ ] Replace generic copy with calm singer/reading/VTuber official-site copy.
- [ ] Keep negative space and avoid decorative clutter.

### Phase 3: Signature Motion

- [ ] Add ink drip reveal with CSS mask/clip-path or asset transform.
- [ ] Add scroll unfold with scaleX/clip-path.
- [ ] Add seal press on CTA interaction.
- [ ] Use vanilla JS class toggles first; use GSAP only if CSS sequencing becomes brittle.

## Template Motion Policy

- Standard motion: `ink drip reveal`, `scroll unfold`, `seal press`.
- CSS first: use transitions, keyframes, transforms, opacity, mask-position, clip-path, scale.
- Vanilla JS may add/remove local classes for load and interaction states.
- GSAP is optional only if a short Phase 3 ink/scroll/seal sequence is materially clearer than CSS.
- `prefers-reduced-motion` must disable travel, unfold movement, and seal press motion while keeping all paper/ink assets visible.

## Verification

- [ ] Run `node scripts/audit-template-links.js`.
- [ ] Run `node scripts/audit-template-metadata.js`.
- [ ] Run `git diff --check`.
- [ ] Optional: static grep for `href="#"`.
- [ ] Optional: verify no cross-template edits with `git diff --name-only`.

## Human Review Notes

- First viewport should clearly show ink drip, brush hero, next stream seal, schedule scroll, and contact seal.
- SP order should prioritize name, next stream, schedule, Follow, Contact.
- Reduced motion state should preserve all paper/ink assets and CTA visibility.
- Browser review belongs to the integration branch / Codex app pass, not the Symphony issue baseline.

## Acceptance Criteria

- モックの墨垂れ / 筆文字 / next stream seal / schedule scroll / contact seal が読み取れる。
- 静かだがチープではない。余白、和紙、墨、朱印の質感で高品質に見える。
- Existing subpages are retained, with only landing-flow and navigation/CTA consistency changes where needed.
- 標準演出を止めてもテンプレートとして成立する。
- 変更範囲が `public/templates/streamer/z/**` に閉じている。

