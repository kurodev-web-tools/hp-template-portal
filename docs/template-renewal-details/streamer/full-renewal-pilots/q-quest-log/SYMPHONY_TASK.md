# Quest Log Implementation Plan - Symphony Task

This file is the Linear issue body for a Symphony run. Keep this task scoped to one streamer template and one Symphony workspace.

## Objective

Quest Log を冒険者ギルド掲示板型の配信者公式サイトへリニューアルする。

Static-first。Quest board grid を作り、LP と下層ページの両方へ展開できる category/tab 構造にする。素材は parchment / wood / seal に限定する。

## Source Docs

Reference these planning docs when implementing:

- `docs/template-renewal-details/streamer/full-renewal-pilots/q-quest-log/DESIGN.md`
- `docs/template-renewal-details/streamer/full-renewal-pilots/q-quest-log/IMPLEMENTATION_PLAN.md`
- `docs/template-renewal-details/streamer/mockup-image/full-renewal/q-quest-log-layout-v2.png`
- `docs/template-renewal-details/streamer/full-renewal/q-quest-log.md`

## Scope

- Modify only `public/templates/streamer/q/**`.
- Rebuild the landing page structure around the Quest Log mock: quest tabs, active quest parchment, party schedule, party recruitment, guild contact.
- Keep all assets template-local under `public/templates/streamer/q/assets/`.
- Keep portal CTA links pointing to `plans.html?template=streamer-q&plan=standard`.

## Non-goals

- Do not edit `public/assets/js/data.js`.
- Do not edit thumbnails.
- Do not edit `task.md`.
- Do not edit `docs/PLAN.md`.
- Do not touch other templates.
- Do not update shared registry, template modal data, thumbnails, or task board entries in this template issue.
- Do not introduce React, build-system changes, global CSS rewrites, or shared JavaScript changes.

## Technical Baseline

- Static HTML/CSS + vanilla JavaScript. Template-local CSS variables, component classes, SVG/WebP assets, CSS transitions/animations first. GSAP is allowed only for short template-local signature motion in Phase 3 when CSS alone would be brittle.
- Runtime: Static HTML/CSS with vanilla JavaScript.
- Styling: template-local CSS variables and component classes.
- Assets: SVG/WebP under `public/templates/streamer/q/assets/`.
- Motion: CSS transitions/animations first.
- GSAP: allowed only for short, template-local Phase 3 signature motion if CSS alone would be brittle.
- Forbidden unless explicitly approved: React/Next.js conversion, Three.js, canvas, particles, scroll hijacking, heavy animation libraries.

## Implementation Requirements

### Phase 1: Static Structure

- [ ] Create quest board layout: left tabs, active quest, right schedule, lower contact/follow.
- [ ] Add semantic sections: `hero`, `quests`, `schedule`, `community`, `archive`, `contact`.
- [ ] Preserve category tabs as future subpage navigation candidates.
- [ ] Add CTA links to `plans.html?template=streamer-q&plan=standard`.
- [ ] Keep all links and asset paths local to `public/templates/streamer/q/**` where possible.

### Phase 2: Visual Fidelity

- [ ] Define CSS variables from `DESIGN.md`.
- [ ] Build parchment cards, wood board, seal CTA, party schedule rows.
- [ ] Add texture assets only where CSS cannot reproduce quality.
- [ ] Make weekday/status tags readable without relying on color alone.
- [ ] Use believable streamer/企画配信 copy.

### Phase 3: Signature Motion

- [ ] Add active quest unfold with CSS clip-path, scale, or opacity.
- [ ] Add subtle seal stamp on primary CTA interaction.
- [ ] Add schedule row reveal with reduced-motion fallback.
- [ ] Use vanilla JS class toggles first; use GSAP only if CSS sequencing becomes brittle.

## Template Motion Policy

- Standard motion: `quest card unfold`, `seal stamp`, `schedule row reveal`.
- CSS first: use transitions, keyframes, transforms, opacity, clip-path, and scale.
- Vanilla JS may add/remove local classes for load and interaction states.
- GSAP is optional only if a short Phase 3 unfold/stamp sequence is materially clearer than CSS.
- `prefers-reduced-motion` must disable loops, travel, and stamp movement while keeping all parchment panels visible.

## Verification

- [ ] Run `node scripts/audit-template-links.js`.
- [ ] Run `node scripts/audit-template-metadata.js`.
- [ ] Run `git diff --check`.
- [ ] Optional: static grep for `href="#"`.
- [ ] Optional: verify no cross-template edits with `git diff --name-only`.

## Human Review Notes

- First viewport should clearly show left quest tabs, active quest, party schedule, party recruitment, and guild contact.
- SP order should prioritize active quest, next stream, schedule, community, Contact.
- Reduced motion state should preserve all parchment panels and CTA visibility.
- Browser review belongs to the integration branch / Codex app pass, not the Symphony issue baseline.

## Acceptance Criteria

- モックの left quest tabs / active quest / party schedule / guild contact が読み取れる。
- LP でも下層ページありでも使える情報構造になっている。
- schedule と CTA が羊皮紙テクスチャに埋もれない。
- 標準演出を止めてもテンプレートとして成立する。
- 変更範囲が `public/templates/streamer/q/**` に閉じている。

