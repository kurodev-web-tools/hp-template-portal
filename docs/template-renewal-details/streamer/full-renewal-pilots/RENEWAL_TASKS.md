# Streamer Full Renewal Task Board

## Purpose

このファイルは、streamer 26件の full renewal を `streamer/full-renewal-integration` 上で順番に進めるための専用 task board。通常の `task.md` より粒度を細かくし、mock reproduction ではなく theme-specific renewal の進行管理に使う。

## Current Contract

- Base branch: `streamer/full-renewal-integration`
- Unit: `1 template = 1 worktree = 1 branch = 1 draft PR`
- Do not target `main` until all streamer renewals are integrated, visually reviewed, corrected, and then merged from the integration branch.
- Use `LAYOUT_MATRIX.md` before the theme `DESIGN.md`.
- Use `ASSET_PLAN.md` before creating or embedding SVG/WebP assets.
- Use `IMPLEMENTATION_HANDOFF.md` for branch, phase, verification, and PR body rules.
- Use `*-final-page-mock-v1.png` as the current visual direction.

## Legacy Reference Policy

Keep these files for now, but do not treat them as the active execution contract:

- `SYMPHONY_TASK.md`
  - Legacy Symphony/Linear handoff notes. Useful for context, not authoritative for the next Codex app sessions.
- `NEXT_SESSION_PROMPTS_B_TO_Z.md`
  - Superseded by `IMPLEMENTATION_HANDOFF.md` and this task board.
- `MOCK_REPRO_IMPROVEMENT_PROMPTS_A_TO_Z.md`
  - Superseded by final page mocks and the layout/asset contracts.
- `*-layout-v2.png`
  - Older first-viewport or earlier-pass mock reference. Useful for comparison only.
- `*-mockup.png`
  - Early pilot images. Useful for historical comparison only.

Delete or archive legacy files only after several template renewals confirm they are no longer needed for comparison.

## Pre-Merge Checklist For Prep PR

- [x] Close old `streamer-*-mock-repro` PRs that were based on the earlier mock-reproduction direction.
- [x] Add `LAYOUT_MATRIX.md`.
- [x] Add A-Z `*-final-page-mock-v1.png`.
- [x] Add `ASSET_PLAN.md`.
- [x] Add `IMPLEMENTATION_HANDOFF.md`.
- [x] Add B/Q/Z `Layout Contract` to match the newer A-Z design format.
- [ ] Review final page mock direction before merging the prep PR.
- [ ] Merge prep PR into `streamer/full-renewal-integration`.

## Renewal Queue

### Pilot Set

- [ ] `streamer/z` - Zen Brush
  - Priority: first
  - Reason: validates paper/ink/scroll asset split with low runtime complexity.
  - Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/z-zen-brush-final-page-mock-v1.png`
  - Branch: `codex/streamer-z-full-renewal`

- [ ] `streamer/b` - Boss Room
  - Priority: second
  - Reason: validates high-density command room, HP bar, and contract CTA separation.
  - Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/b-boss-room-final-page-mock-v1.png`
  - Branch: `codex/streamer-b-full-renewal`

- [ ] `streamer/q` - Quest Log
  - Priority: third
  - Reason: validates board/card system, parchment assets, and community/contact separation.
  - Mock: `docs/template-renewal-details/streamer/mockup-image/full-renewal/q-quest-log-final-page-mock-v1.png`
  - Branch: `codex/streamer-q-full-renewal`

### Side / World-In-UI Set

- [ ] `streamer/h` - Horror Mansion
- [ ] `streamer/k` - Knight Honor
- [ ] `streamer/r` - Rogue Stealth
- [ ] `streamer/s` - Steampunk Gear

### HUD / Technical Set

- [ ] `streamer/a` - Abyss Neon
- [ ] `streamer/d` - Digital Ghost
- [ ] `streamer/f` - Future Tech
- [ ] `streamer/t` - Tech Logic
- [ ] `streamer/o` - Orbit Space

### Entertainment Set

- [ ] `streamer/e` - E-Sports Pro
- [ ] `streamer/i` - Idol Stage
- [ ] `streamer/j` - Jazz Lounge
- [ ] `streamer/p` - Pixel Retro
- [ ] `streamer/x` - Xtreme Action

### Visual / Material Set

- [ ] `streamer/c` - Crystal Prism
- [ ] `streamer/l` - Lunar Phase
- [ ] `streamer/m` - Metallic Chrome
- [ ] `streamer/n` - Neon Night
- [ ] `streamer/u` - Urban Graffiti
- [ ] `streamer/v` - Vivid Glitch
- [ ] `streamer/w` - Wide Pan
- [ ] `streamer/y` - Yield Chart
- [ ] `streamer/g` - Glitch Core

## Per-Template Done Definition

- [ ] Scope stays inside `public/templates/streamer/<id>/**`.
- [ ] First viewport matches the row in `LAYOUT_MATRIX.md`.
- [ ] Implementation maps visible mock areas to named components.
- [ ] WebP/SVG assets are template-local.
- [ ] Required text is HTML, not baked into images.
- [ ] Fan CTA and business Contact are visually separated.
- [ ] Mobile order prioritizes next stream, schedule, follow, and contact.
- [ ] `prefers-reduced-motion` keeps all key information visible.
- [ ] `node scripts/audit-template-links.js` passes.
- [ ] `node scripts/audit-template-metadata.js` passes.
- [ ] `git diff --check` passes.
- [ ] Draft PR targets `streamer/full-renewal-integration`.

## Integration Branch Final Checklist

Run this only after all individual template PRs are merged into `streamer/full-renewal-integration`:

- [ ] Update `public/assets/js/data.js` and any template registry/modal data.
- [ ] Regenerate thumbnails.
- [ ] Review 390 / 820 / 1024 / 1366px for every streamer template.
- [ ] Check reduced-motion state for templates with signature motion.
- [ ] Run link and metadata audits.
- [ ] Run thumbnail/reference consistency checks.
- [ ] Remove or archive legacy prompt/mock files if they are no longer needed.
- [ ] Prepare final PR from `streamer/full-renewal-integration` to `main`.
