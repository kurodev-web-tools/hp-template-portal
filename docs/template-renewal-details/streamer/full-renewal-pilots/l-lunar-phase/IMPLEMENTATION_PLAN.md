# Lunar Phase Implementation Plan

**Goal:** Lunar Phase をモック準拠の高品質な 月/占い/夜系配信者 向け配信者公式サイトへリニューアルする。

**Architecture:** Static-first。`moon phase observatory` を first viewport の基準にし、Phase 1 で HTML/CSS 構造、Phase 2 で素材と visual fidelity、Phase 3 で軽量 signature motion を追加する。PC はテーマ世界観を優先し、SP は CTA と schedule の到達性を優先する。

**Tech Stack:** Static HTML/CSS + vanilla JavaScript. Template-local CSS variables, component classes, SVG/WebP assets, CSS transitions/animations first. GSAP is allowed only for short template-local signature motion in Phase 3 when CSS alone would be brittle.

---

## Technical Baseline

- Runtime: Static HTML/CSS with vanilla JavaScript.
- Styling: template-local CSS variables and component classes.
- Assets: SVG/WebP under `public/templates/streamer/l/assets/`.
- Motion: CSS transitions/animations first.
- GSAP: allowed only for short, template-local Phase 3 signature motion if CSS alone would be brittle.
- Forbidden unless explicitly approved: React/Next.js conversion, Three.js, canvas, particles, scroll hijacking, heavy animation libraries.

## Scope

- Modify only `public/templates/streamer/l/**`.
- Rebuild or strengthen the landing page structure around the `Lunar Phase` mock: top or side lunar phase dial, center moonlit hero, orbiting Next Stream/Schedule panels, lower quiet Contact.
- Treat this as an LP-first template; do not create new subpages in this template issue unless the existing renewal detail explicitly requires it.
- Keep all assets template-local under `public/templates/streamer/l/assets/`.
- Keep portal CTA links pointing to `plans.html?template=streamer-l&plan=standard`.

## Non-goals

- Do not edit `public/assets/js/data.js`.
- Do not edit thumbnails.
- Do not edit `task.md`.
- Do not edit `docs/PLAN.md`.
- Do not touch other templates.
- Do not update shared registry, template modal data, thumbnails, or task board entries in this template issue.
- Do not introduce React, build-system changes, global CSS rewrites, or shared JavaScript changes.

## Template Motion Policy

- Standard motion: `moon phase reveal`, `orbit line glow`, `schedule fade-in`.
- CSS first: use transitions, keyframes, transforms, opacity, clip-path, masks, width/scale, or filter only where appropriate.
- Vanilla JS may add/remove local classes for load and interaction states.
- GSAP is optional only if a short Phase 3 sequence is materially clearer than CSS.
- `prefers-reduced-motion` must disable loops, travel, and repeated attention effects while keeping all panels and CTAs visible.

## Files

- Reference: `docs/template-renewal-details/streamer/full-renewal-pilots/l-lunar-phase/DESIGN.md`
- Reference: `docs/template-renewal-details/streamer/mockup-image/full-renewal/l-lunar-phase-layout-v2.png`
- Reference: `docs/template-renewal-details/streamer/full-renewal/l-lunar-phase.md`
- Modify: `public/templates/streamer/l/index.html`
- Create/modify: `public/templates/streamer/l/assets/css/style.css`
- Create/modify if needed: `public/templates/streamer/l/assets/js/script.js`
- Create if needed: `public/templates/streamer/l/assets/img/`

## Phase 1: Static Structure

- [ ] Create the PC layout based on the mock's `moon phase observatory` signature.
- [ ] Add semantic sections: `hero`, `profile`, `schedule`, `archive`, `community`, `contact`.
- [ ] Add SP order independent from PC visual order.
- [ ] Add CTA links to `plans.html?template=streamer-l&plan=standard`.
- [ ] Keep all links and asset paths local to `public/templates/streamer/l/**` where possible.

## Phase 2: Visual Fidelity

- [ ] Define CSS variables from `DESIGN.md`.
- [ ] Build template-local component classes for `MoonNav`, `LunarHero`, `PhaseSchedule`, `CelestialFollow`, `OracleContact`.
- [ ] Add SVG/WebP assets only where CSS cannot reproduce the mock quality.
- [ ] Replace demo copy with believable streamer official-site copy for 月/占い/夜系配信者.
- [ ] Preserve the mock's card shapes, information placement, and CTA hierarchy.

## Phase 3: Signature Motion

- [ ] Add `moon phase reveal` with CSS first.
- [ ] Add `orbit line glow` with CSS first.
- [ ] Add `schedule fade-in` with CSS first.
- [ ] Use vanilla JS class toggles first; use GSAP only if CSS sequencing becomes brittle.
- [ ] Add `prefers-reduced-motion` fallback before considering the phase complete.

## Phase 4: Verification

- [ ] Run `node scripts/audit-template-links.js`.
- [ ] Run `node scripts/audit-template-metadata.js`.
- [ ] Run `git diff --check`.
- [ ] Optional: static grep for `href="#"`.
- [ ] Optional: verify no cross-template edits with `git diff --name-only`.

## Human Review Notes

- First viewport should clearly communicate `Lunar Phase` and should follow this placement: top or side lunar phase dial, center moonlit hero, orbiting Next Stream/Schedule panels, lower quiet Contact.
- SP order should prioritize streamer identity, next stream, schedule, Follow, Contact.
- Reduced motion state should preserve information hierarchy and CTA visibility.
- Browser review belongs to the integration branch / Codex app pass, not the Symphony issue baseline.

## Acceptance Criteria

- モックの layout signature、カード形状、主要装飾、CTA 位置が読み取れる。
- 月/占い/夜系配信者 向けの配信者公式サイトとして、企業 HP 風ではなくテーマ固有の世界観がある。
- Live / Schedule / Follow / Community / Contact の導線が迷わない。
- 標準演出を止めてもテンプレートとして成立する。
- 変更範囲が `public/templates/streamer/l/**` に閉じている。
