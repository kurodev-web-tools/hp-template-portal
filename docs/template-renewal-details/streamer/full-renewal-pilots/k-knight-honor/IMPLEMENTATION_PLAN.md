# Knight Honor Implementation Plan

**Goal:** Knight Honor をモック準拠の高品質な 騎士/ファンタジー系 向け配信者公式サイトへリニューアルする。

**Architecture:** Static-first。`knight order command table` を first viewport の基準にし、Phase 1 で HTML/CSS 構造、Phase 2 で素材と visual fidelity、Phase 3 で軽量 signature motion を追加する。PC はテーマ世界観を優先し、SP は CTA と schedule の到達性を優先する。

**Tech Stack:** Static HTML/CSS + vanilla JavaScript. Template-local CSS variables, component classes, SVG/WebP assets, CSS transitions/animations first. GSAP is allowed only for short template-local signature motion in Phase 3 when CSS alone would be brittle.

---

## Technical Baseline

- Runtime: Static HTML/CSS with vanilla JavaScript.
- Styling: template-local CSS variables and component classes.
- Assets: SVG/WebP under `public/templates/streamer/k/assets/`.
- Motion: CSS transitions/animations first.
- GSAP: allowed only for short, template-local Phase 3 signature motion if CSS alone would be brittle.
- Forbidden unless explicitly approved: React/Next.js conversion, Three.js, canvas, particles, scroll hijacking, heavy animation libraries.

## Scope

- Modify only `public/templates/streamer/k/**`.
- Rebuild or strengthen the landing page structure around the `Knight Honor` mock: left shield/nav, center oath/hero crest, right expedition schedule, bottom audience hall Contact.
- Keep existing subpages if present; strengthen the first viewport and main landing flow without removing current subpage routes.
- Keep all assets template-local under `public/templates/streamer/k/assets/`.
- Keep portal CTA links pointing to `plans.html?template=streamer-k&plan=standard`.

## Non-goals

- Do not edit `public/assets/js/data.js`.
- Do not edit thumbnails.
- Do not edit `task.md`.
- Do not edit `docs/PLAN.md`.
- Do not touch other templates.
- Do not update shared registry, template modal data, thumbnails, or task board entries in this template issue.
- Do not introduce React, build-system changes, global CSS rewrites, or shared JavaScript changes.

## Template Motion Policy

- Standard motion: `banner unfurl`, `crest shine`, `honor panel reveal`.
- CSS first: use transitions, keyframes, transforms, opacity, clip-path, masks, width/scale, or filter only where appropriate.
- Vanilla JS may add/remove local classes for load and interaction states.
- GSAP is optional only if a short Phase 3 sequence is materially clearer than CSS.
- `prefers-reduced-motion` must disable loops, travel, and repeated attention effects while keeping all panels and CTAs visible.

## Files

- Reference: `docs/template-renewal-details/streamer/full-renewal-pilots/k-knight-honor/DESIGN.md`
- Reference: `docs/template-renewal-details/streamer/mockup-image/polish/k-knight-honor-layout-v2.png`
- Reference: `docs/template-renewal-details/streamer/polish/k-knight-honor.md`
- Modify: `public/templates/streamer/k/index.html`
- Modify: `public/templates/streamer/k/contact.html`
- Modify: `public/templates/streamer/k/gallery.html`
- Create/modify: `public/templates/streamer/k/assets/css/style.css`
- Create/modify if needed: `public/templates/streamer/k/assets/js/script.js`
- Create if needed: `public/templates/streamer/k/assets/img/`

## Phase 1: Static Structure

- [ ] Create the PC layout based on the mock's `knight order command table` signature.
- [ ] Add semantic sections: `hero`, `profile`, `schedule`, `archive`, `community`, `contact`.
- [ ] Add SP order independent from PC visual order.
- [ ] Add CTA links to `plans.html?template=streamer-k&plan=standard`.
- [ ] Keep all links and asset paths local to `public/templates/streamer/k/**` where possible.

## Phase 2: Visual Fidelity

- [ ] Define CSS variables from `DESIGN.md`.
- [ ] Build template-local component classes for `OrderNav`, `KnightHero`, `CampaignSchedule`, `BannerFollow`, `AudienceContact`.
- [ ] Add SVG/WebP assets only where CSS cannot reproduce the mock quality.
- [ ] Replace demo copy with believable streamer official-site copy for 騎士/ファンタジー系.
- [ ] Preserve the mock's card shapes, information placement, and CTA hierarchy.

## Phase 3: Signature Motion

- [ ] Add `banner unfurl` with CSS first.
- [ ] Add `crest shine` with CSS first.
- [ ] Add `honor panel reveal` with CSS first.
- [ ] Use vanilla JS class toggles first; use GSAP only if CSS sequencing becomes brittle.
- [ ] Add `prefers-reduced-motion` fallback before considering the phase complete.

## Phase 4: Verification

- [ ] Run `node scripts/audit-template-links.js`.
- [ ] Run `node scripts/audit-template-metadata.js`.
- [ ] Run `git diff --check`.
- [ ] Optional: static grep for `href="#"`.
- [ ] Optional: verify no cross-template edits with `git diff --name-only`.

## Human Review Notes

- First viewport should clearly communicate `Knight Honor` and should follow this placement: left shield/nav, center oath/hero crest, right expedition schedule, bottom audience hall Contact.
- SP order should prioritize streamer identity, next stream, schedule, Follow, Contact.
- Reduced motion state should preserve information hierarchy and CTA visibility.
- Browser review belongs to the integration branch / Codex app pass, not the Symphony issue baseline.

## Acceptance Criteria

- モックの layout signature、カード形状、主要装飾、CTA 位置が読み取れる。
- 騎士/ファンタジー系 向けの配信者公式サイトとして、企業 HP 風ではなくテーマ固有の世界観がある。
- Live / Schedule / Follow / Community / Contact の導線が迷わない。
- 標準演出を止めてもテンプレートとして成立する。
- 変更範囲が `public/templates/streamer/k/**` に閉じている。
