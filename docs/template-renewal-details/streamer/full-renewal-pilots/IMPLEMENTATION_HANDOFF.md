# Streamer Full Renewal Implementation Handoff

## Purpose

この資料は、final page mock から template renewal 実装へ移るための handoff contract。別セッションで1テンプレートずつ進める前提で、スコープ、参照資料、実装順、検証、PR運用を固定する。

## Source Of Truth

Use these files in this order:

1. `docs/template-renewal-details/streamer/full-renewal-pilots/LAYOUT_MATRIX.md`
2. `docs/template-renewal-details/streamer/full-renewal-pilots/ASSET_PLAN.md`
3. `docs/template-renewal-details/streamer/full-renewal-pilots/<theme>/DESIGN.md`
4. `docs/template-renewal-details/streamer/full-renewal-pilots/<theme>/IMPLEMENTATION_PLAN.md`
5. `docs/template-renewal-details/streamer/mockup-image/full-renewal/<theme>-final-page-mock-v1.png`

If the old `*-layout-v2.png` and the new `*-final-page-mock-v1.png` disagree, use the new final page mock for visual direction and `LAYOUT_MATRIX.md` for structure.

## Branch And PR Policy

- Work one template per session, branch, worktree, and draft PR.
- Base branch is `streamer/full-renewal-integration`, not `main`.
- Do not merge into `main` until all streamer templates are renewed, reviewed on the integration branch, and corrected as a set.
- Keep template PRs scoped to `public/templates/streamer/<id>/**` unless the issue explicitly says otherwise.
- Do not touch `public/assets/js/data.js`, thumbnails, `task.md`, `docs/PLAN.md`, or shared registries in individual template PRs.
- Use integration branch for final registry, thumbnail, portal data, and cross-template cleanup.

Recommended branch naming:

```text
codex/streamer-z-full-renewal
codex/streamer-b-full-renewal
codex/streamer-q-full-renewal
```

## Recommended Renewal Order

Start with the three pilot shapes, then continue by complexity clusters:

1. `z-zen-brush`
2. `b-boss-room`
3. `q-quest-log`
4. Side/world-in-UI set: `h-horror-mansion`, `k-knight-honor`, `r-rogue-stealth`, `s-steampunk-gear`
5. HUD/technical set: `a-abyss-neon`, `d-digital-ghost`, `f-future-tech`, `t-tech-logic`, `o-orbit-space`
6. Entertainment set: `e-e-sports-pro`, `i-idol-stage`, `j-jazz-lounge`, `p-pixel-retro`, `x-xtreme-action`
7. Visual/material set: `c-crystal-prism`, `l-lunar-phase`, `m-metallic-chrome`, `n-neon-night`, `u-urban-graffiti`, `v-vivid-glitch`, `w-wide-pan`, `y-yield-chart`, `g-glitch-core`

This order is adjustable, but each PR should remain one template.

## Per-Template Workflow

### Phase 0: Intake

- Confirm target template id and theme folder.
- Read `LAYOUT_MATRIX.md`, `ASSET_PLAN.md`, theme `DESIGN.md`, theme `IMPLEMENTATION_PLAN.md`, and the final page mock.
- Inspect current `public/templates/streamer/<id>/**`.
- Identify reusable local assets and missing assets.
- Write a short implementation note in the PR body; do not create extra docs unless the template needs a durable deviation note.

### Phase 1: Structure

- Build semantic HTML sections: `hero`, `profile`, `schedule`, `archive`, `community`, `contact`.
- Implement the first viewport layout signature from `LAYOUT_MATRIX.md`.
- Implement responsive order without motion.
- Use placeholder CSS shapes only where final SVG/WebP assets are not ready, but keep the component boundaries correct.

Do not add Phase 3 motion, particles, canvas, Three.js, or heavy runtime libraries in Phase 1.

### Phase 2: Visual Fidelity

- Add template-local CSS variables, material treatment, texture assets, SVG frames, and final copy.
- Replace placeholder shapes with SVG/WebP where needed.
- Preserve readable text as HTML.
- Confirm fan CTA and business Contact are visually separated.
- Match the final page mock at the level of layout signature, information placement, card shape, and CTA hierarchy.

### Phase 3: Signature Motion

- Add only 1-2 theme-specific motions.
- Prefer CSS transitions/animations and vanilla JS.
- Add `prefers-reduced-motion` fallback before considering the phase complete.
- Motion must not be required for information visibility.

### Phase 4: Handoff

- Run checks.
- Inspect the diff.
- Create a draft PR to `streamer/full-renewal-integration`.
- Include visual review notes for 390 / 820 / 1024 / 1366px first viewport checks.

## Component Mapping Template

Use this structure in each implementation issue or PR body:

```text
Theme:
Template path:
Final mock:

First viewport components:
- Navigation:
- Hero:
- Schedule:
- Follow/community:
- Contact/business:

Asset split:
- WebP:
- SVG:
- CSS-only:
- JS:

Responsive order:
- PC:
- Tablet:
- Mobile:

Motion:
- Standard:
- Reduced motion:
```

## PR Body Template

```markdown
## 変更内容

- Renewed `streamer/<id>` against the final page mock.
- Implemented the first viewport layout signature from `LAYOUT_MATRIX.md`.
- Added template-local assets/styles for the theme's core visual language.

## 参照資料

- `LAYOUT_MATRIX.md`
- `ASSET_PLAN.md`
- `<theme>/DESIGN.md`
- `<theme>/IMPLEMENTATION_PLAN.md`
- `<theme>-final-page-mock-v1.png`

## 検証結果

- `node scripts/audit-template-links.js`
- `node scripts/audit-template-metadata.js`
- `git diff --check`

## 確認してほしい表示ポイント

- 390px:
- 820px:
- 1024px:
- 1366px:
- Reduced motion:

## 備考

- Base branch: `streamer/full-renewal-integration`
- Scope: `public/templates/streamer/<id>/**`
```

## Verification Baseline

Minimum checks:

```powershell
node scripts/audit-template-links.js
node scripts/audit-template-metadata.js
git diff --check
```

Additional checks when touching layout or motion:

```powershell
rg -n 'href="#"|TODO|FIXME' public/templates/streamer/<id>
rg -n 'canvas|three|particles|scroll hijack|gsap' public/templates/streamer/<id>
```

Browser review is recommended at integration time, but individual template PRs should at least leave viewport review notes for:

- 390px mobile first viewport and CTA order
- 820px tablet transition
- 1024px compact desktop
- 1366px full desktop
- Reduced motion state

## Blocker Rules

Stop and report a concise blocker if:

- The final mock conflicts with `LAYOUT_MATRIX.md` and the conflict cannot be resolved locally.
- Required assets would need external copyrighted material.
- The implementation would require touching shared registry or portal data.
- A template cannot preserve readable CTA and schedule text without changing the layout contract.

## Completion Definition

A template renewal PR is ready for review when:

- The first viewport layout signature is recognizable without reading the theme name.
- The lower page sections follow `hero`, `profile`, `schedule`, `archive`, `community`, `contact`.
- The major cards map to documented components.
- WebP/SVG assets are template-local and no required text is baked into images.
- Mobile order prioritizes next stream, schedule, follow, and contact.
- Verification commands have been attempted and results are included in the PR.
