# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Existing project rules (carried forward and expanded)

### Worktree usage
- Prefer separate branches and `git worktree` directories for template renewals, new category work, and new template additions when those tasks should be reviewed or shipped independently.
- Treat planning, categorization, naming, and theme exploration as pre-implementation work. Do not create a worktree until the task becomes a concrete implementation unit with file changes.
- Keep `main` clean and use it as the stable reference point. Avoid collecting multiple unrelated template changes in a single implementation branch when independent worktrees would keep diffs clearer.
- For small, one-off fixes that touch only a narrow part of the repository and are unlikely to overlap with other work, a dedicated worktree is optional.
- After a worktree branch is merged and no follow-up work is expected, remove the worktree to keep `.worktrees/` manageable.

### Parallel template work
- When multiple templates are being renewed or added at the same time, prefer one branch and one worktree per template unless a single shared branch is clearly simpler and the changes are meant to ship together.
- If templates will be completed and released at different times, keep them isolated so each template can be reviewed, merged, and shipped independently.

### Design documentation
- Use `DESIGN.md` files when visual differentiation matters and the template should preserve a distinct layout, motion language, and overall atmosphere.
- Place category-level `DESIGN.md` files in the category directory to describe the shared visual direction and UX rules for that category.
- Place template-level `DESIGN.md` files in each template directory to describe the template's unique design intent, differentiation, and constraints.
- Keep category-level `DESIGN.md` focused on shared rules. Keep template-level `DESIGN.md` focused on differences, signature elements, and anti-patterns for that specific template.
- Do not create template-level `DESIGN.md` files during ideation only. Create them once a template becomes a concrete implementation unit.

## Source-of-truth docs
- Use `task.md` as the operational source of truth for current priorities and what to do next.
- Use `docs/PLAN.md` for medium/long-term context and background.
- Start from `docs/README.md` to find operational docs (`AI_WORKFLOW`, thumbnail/static-audit workflows, metadata notes).

## Setup and common commands

### Environment and install
- CI uses Node 20 and pnpm (`.github/workflows/deploy.yml`).
- Install dependencies:
  - `pnpm install --frozen-lockfile` (CI-equivalent)
  - or `pnpm install` for local development

### Local development and deploy
- Start Cloudflare Pages local dev server (serves `public/` + Pages Functions):
  - `npm run pages:dev`
- Build step used before deploy (updates template count in `public/index.html`):
  - `npm run build`
- Deploy Pages:
  - `npm run pages:deploy`

### Static audits ("lint" equivalent in this repo)
- Link integrity audit for template HTML:
  - `npm run audit:links`
  - fallback: `node scripts/audit-template-links.js`
- Metadata/placeholder audit:
  - `npm run audit:metadata`
  - fallback: `node scripts/audit-template-metadata.js`

### Tests
- Run one test file:
  - `node tests/template-lp-quality.test.js`
- Run all tests (PowerShell):
  - `Get-ChildItem tests/*.test.js | ForEach-Object { node $_.FullName; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE } }`
- Notable category quality tests:
  - `node tests/template-business-quality.test.js`
  - `node tests/template-lp-quality.test.js`
  - `node tests/template-portfolio-placeholder-quality.test.js`
  - `node tests/template-streamer-quality.test.js`

### Thumbnail workflows
- Start preview server first: `npm run pages:dev`
- Capture examples:
  - `npm run capture:mobile`
  - `npm run capture:lp`
  - `npm run capture:portfolio`
  - `npm run capture:streamer`
  - `npm run capture:business-v2 -- w x`
- See `docs/THUMBNAIL_WORKFLOW.md` for decision rules and fallback mode (`BUSINESS_CAPTURE_SOURCE=file`).

### Remotion video workflows
- Main project remotion compositions:
  - `npm run studio`
  - `npm run render`
  - `npm run render:staffroll`
  - `npm run render:pro`
- Separate video project in `remotion-video/`:
  - `npm --prefix remotion-video run start`
  - `npm --prefix remotion-video run render`

## High-level architecture

### 1) Runtime model: Cloudflare Pages static app + Pages Functions
- `public/` is the deployed static site (`wrangler.toml` sets `pages_build_output_dir = "public"`).
- Server endpoints live in `functions/api/*.js` and are invoked as:
  - `/api/checkout` -> Stripe Checkout session creation (`functions/api/checkout.js`)
  - `/api/submit-form` -> form validation + Turnstile verification + Resend email (`functions/api/submit-form.js`)
  - `/api/webhook` -> Stripe webhook handling + confirmation email (`functions/api/webhook.js`)

### 2) Frontend data-driven portal architecture
- `public/assets/js/data.js` is the canonical catalog for categories/templates (metadata, labels, thumbnail paths, tags).
- `public/assets/js/script.js` powers the top portal page (`public/index.html`) and renders category cards/effects.
- `public/assets/js/list.js` powers template listing/filtering/detail modal behavior based on query params and `PORTAL_DATA`.
- `public/assets/js/client-stripe.js` and `public/assets/js/form-handler.js` are the frontend bridges to the `/api/*` endpoints.

### 3) Template/content layout
- Template assets are category-scoped under `public/templates/{business|lp|portfolio|streamer}/...`.
- Category-level visual direction is documented in `public/templates/<category>/DESIGN.md`.
- Thumbnail files are maintained under `public/assets/images/thumbnails/*_v2/`, and `data.js` paths must stay in sync.

### 4) Tooling scripts and quality gates
- `scripts/update-count.js` is part of `npm run build`; it parses `data.js` and updates the "XX+ Premium Designs" stat in `public/index.html`.
- `scripts/audit-template-links.js` and `scripts/audit-template-metadata.js` are core quality gates referenced by docs and `task.md` routine checks.
- `scripts/capture-thumbnails.js` handles generic category capture; `scripts/capture-business-v2.js` exists separately for business-specific clipping overrides.

### 5) Video generation sub-systems
- Root `src/` + `src/Root.tsx` define Remotion compositions used by root-level `npm run studio/render*`.
- `remotion-video/` is an additional Remotion project used for hero video output into `public/assets/videos/`.
