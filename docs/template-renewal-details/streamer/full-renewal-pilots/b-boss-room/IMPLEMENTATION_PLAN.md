# Boss Room Implementation Plan

**Goal:** Boss Room をモック準拠の高密度 RPG boss command room 公式サイトへリニューアルする。

**Architecture:** Static-first。Phase 1 で HTML/CSS 構造を作り、Phase 2 で質感素材と CTA copy、Phase 3 で軽量 signature motion を追加する。PC は world-in-UI、SP は情報優先の縦構成へ変換する。

**Tech Stack:** Static HTML/CSS + vanilla JavaScript. Template-local CSS variables, component classes, SVG/WebP assets, CSS transitions/animations first. GSAP is allowed only for short template-local signature motion in Phase 3 when CSS alone would be brittle.

---

## Technical Baseline

- Runtime: Static HTML/CSS with vanilla JavaScript.
- Styling: template-local CSS variables and component classes.
- Assets: SVG/WebP under `public/templates/streamer/b/assets/`.
- Motion: CSS transitions/animations first.
- GSAP: allowed only for short, template-local Phase 3 signature motion if CSS alone would be brittle.
- Forbidden unless explicitly approved: React/Next.js conversion, Three.js, canvas, particles, scroll hijacking, heavy animation libraries.

## Scope

- Modify only `public/templates/streamer/b/**`.
- Rebuild the landing page structure around the Boss Room mock: side rail, throne hero, Next Raid, Boss Status, Follow, Contract.
- Keep all assets template-local under `public/templates/streamer/b/assets/`.
- Keep portal CTA links pointing to `plans.html?template=streamer-b&plan=standard`.

## Non-goals

- Do not edit `public/assets/js/data.js`.
- Do not edit thumbnails.
- Do not edit `task.md`.
- Do not edit `docs/PLAN.md`.
- Do not touch other templates.
- Do not update shared registry, template modal data, thumbnails, or task board entries in this template issue.
- Do not introduce React, build-system changes, global CSS rewrites, or shared JavaScript changes.

## Template Motion Policy

- Standard motion: `status pulse`, `HP bar fill`, `panel reveal`.
- CSS first: use transitions, keyframes, transforms, opacity, and width/scale.
- Vanilla JS may add/remove local classes for load and interaction states.
- GSAP is optional only if a short Phase 3 timeline is materially clearer than CSS.
- `prefers-reduced-motion` must disable loops, travel, and pulse while keeping all panels visible.

## Files

- Reference: `docs/template-renewal-details/streamer/full-renewal-pilots/b-boss-room/DESIGN.md`
- Reference: `docs/template-renewal-details/streamer/mockup-image/full-renewal/b-boss-room-layout-v2.png`
- Reference: `docs/template-renewal-details/streamer/full-renewal/b-boss-room.md`
- Modify: `public/templates/streamer/b/index.html`
- Create/modify: `public/templates/streamer/b/assets/css/style.css`
- Create/modify if needed: `public/templates/streamer/b/assets/js/script.js`
- Create if needed: `public/templates/streamer/b/assets/img/`

## Phase 1: Static Structure

- [ ] Create the PC grid with left rail, throne hero, right raid panel, lower status/follow, lower contract.
- [ ] Add semantic sections: `hero`, `profile`, `schedule`, `archive`, `community`, `contact`.
- [ ] Add SP order independent from PC visual order.
- [ ] Add CTA links to `plans.html?template=streamer-b&plan=standard`.
- [ ] Keep all links and asset paths local to `public/templates/streamer/b/**` where possible.

## Phase 2: Visual Fidelity

- [ ] Define CSS variables from `DESIGN.md`.
- [ ] Build gold frame, HP bar, contract CTA, and side rail components.
- [ ] Add only necessary texture assets: crest/frame, throne backdrop, red contract texture.
- [ ] Replace demo copy with believable streamer official-site copy.
- [ ] Keep card radius <= 8px and avoid generic floating-card styling.

## Phase 3: Signature Motion

- [ ] Add HP bar fill on load using CSS transform/width.
- [ ] Add subtle live/status pulse with reduced-motion fallback.
- [ ] Add panel reveal with opacity/translate only.
- [ ] Use vanilla JS class toggles first; use GSAP only if CSS sequencing becomes brittle.

## Phase 4: Verification

- [ ] Run `node scripts/audit-template-links.js`.
- [ ] Run `node scripts/audit-template-metadata.js`.
- [ ] Run `git diff --check`.
- [ ] Optional: static grep for `href="#"`.
- [ ] Optional: verify no cross-template edits with `git diff --name-only`.

## Human Review Notes

- First viewport should clearly show side rail, throne identity, Next Raid, Boss Status, Follow, and Contract.
- SP order should prioritize name, Live, next stream, Follow, Contact.
- Reduced motion state should preserve all information and CTA visibility.
- Browser review belongs to the integration branch / Codex app pass, not the Symphony issue baseline.

## Acceptance Criteria

- モックの side rail / throne / next raid / boss status / contract block が読み取れる。
- fan action と business contact が混ざっていない。
- SP で名前、Live、次回配信、Follow、Contact が直後に出る。
- 標準演出を止めてもテンプレートとして成立する。
- 変更範囲が `public/templates/streamer/b/**` に閉じている。

