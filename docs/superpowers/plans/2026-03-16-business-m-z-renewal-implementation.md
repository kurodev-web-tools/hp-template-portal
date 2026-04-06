# Business M-Z Renewal Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `public/templates/business` 配下の `m,n,p,q,r,s,t,u,v,w,x,y,z` を、対応モックアップ準拠の `index.html` とテーマ整合のある `about/service/contact` を持つ 4 ページ構成へ全面改修する。

**Architecture:** 各テンプレートディレクトリを独立した実装単位として扱い、`index/about/service/contact` とローカル `assets/css/style.css`, `assets/js/script.js`, `assets/generated/*` を個別管理する。`index` はモックアップの構図と視覚言語を優先して再構築し、下層ページは同テーマの派生ページとして新規設計する。

**Tech Stack:** Static HTML, Tailwind input/output CSS, per-template custom CSS, vanilla JavaScript, existing portal base CSS

---

## File Structure

### Shared reference files

- Reference spec: `docs/superpowers/specs/2026-03-16-business-mnpqrstuvwxyz-renewal-design.md`
- Reference structure: `public/templates/business/a/index.html`
- Reference structure: `public/templates/business/a/about.html`
- Reference structure: `public/templates/business/a/service.html`
- Reference structure: `public/templates/business/a/contact.html`
- Reference CSS pattern: `public/templates/business/a/assets/css/style.css`
- Verification log to create/update: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

### Template-to-mockup mapping

- `m` -> `public/v2_stitch_archive/business/minimal_architecture_design_portfolio/code.html`
- `n` -> `public/v2_stitch_archive/business/neon_night_metro_pulse_homepage/code.html`
- `p` -> `public/v2_stitch_archive/business/pop_spark_boom_homepage/code.html`
- `q` -> `public/v2_stitch_archive/business/quality_first_precision_manufacturing/code.html`
- `r` -> `public/v2_stitch_archive/business/royal_legacy_pride_heritage_homepage/code.html`
- `s` -> `public/v2_stitch_archive/business/smart_saas_intelligent_os/code.html`
- `t` -> `public/v2_stitch_archive/business/trust_guard_iron_stability_homepage/code.html`
- `u` -> `public/v2_stitch_archive/business/urban_street_raw_energy_homepage/code.html`
- `v` -> `public/v2_stitch_archive/business/vivid_impact_the_statement/code.html`
- `w` -> `public/v2_stitch_archive/business/wide_horizon_panorama_homepage/code.html`
- `x` -> `public/v2_stitch_archive/business/xtreme_snap_break_limits/code.html`
- `y` -> `public/v2_stitch_archive/business/yield_growth_investment_firm_homepage/code.html`
- `z` -> `public/v2_stitch_archive/business/zen_garden_silence_homepage/code.html`

### Tailwind and CSS responsibility

For each template directory:
- `assets/css/tailwind-input.css`: Tailwind utility input file. Update only when utility generation needs to change.
- `assets/css/tailwind-built.css`: built output consumed by HTML. Regenerate after input changes.
- `assets/css/style.css`: template-specific handcrafted visual language, component styling, motion rules, and `prefers-reduced-motion` overrides.
- `assets/js/script.js`: template-local interactions only.

Rule:
- Do not place template identity in `tailwind-built.css` if it can live in `style.css`.
- Only touch `tailwind-input.css` and regenerate `tailwind-built.css` when utility classes are truly needed.
- Prefer stable handcrafted CSS in `style.css` for distinctive layouts.

## Verification Contract

For every template, record results in `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md` using this structure:

```md
## m
- Mockup match: pass/fail
- Theme-derived lower pages: pass/fail
- Metadata/OG: pass/fail
- Structured data: pass/fail
- Mobile 375px: pass/fail
- Desktop 1440px: pass/fail
- Mobile menu: pass/fail
- Reduced motion: pass/fail
- Link/path integrity: pass/fail
- Notes:
```

Pass criteria per template:
- `Mockup match`: hero composition, major section order, typography direction, spacing density, and visual hierarchy match the mapped mockup.
- `Theme-derived lower pages`: `about/service/contact` clearly inherit the same visual language and business theme as `index`, without reusing another template’s layout pattern.
- `Metadata/OG`: all required tags from the approved spec are present.
- `Structured data`: only allowed schema types are present and no unsafe claims remain.
- `Mobile 375px`: first view has no overflow, clipped hero, broken CTA, or overlapping nav.
- `Desktop 1440px`: layout identity remains intact and sections do not collapse into generic stacked cards.
- `Mobile menu`: open/close and focus order work.
- `Reduced motion`: main transitions are reduced or disabled under `prefers-reduced-motion`.
- `Link/path integrity`: CSS, JS, generated assets, and all internal links resolve correctly.

## Chunk 1: Phase 1 Templates

### Task 1: Rebuild `m`

**Files:**
- Modify: `public/templates/business/m/index.html`
- Modify: `public/templates/business/m/about.html`
- Modify: `public/templates/business/m/service.html`
- Modify: `public/templates/business/m/contact.html`
- Create or replace as needed: `public/templates/business/m/assets/css/style.css`
- Create or replace as needed: `public/templates/business/m/assets/js/script.js`
- Update only if required: `public/templates/business/m/assets/css/tailwind-input.css`
- Regenerate if input changed: `public/templates/business/m/assets/css/tailwind-built.css`
- Create or replace as needed: `public/templates/business/m/assets/generated/*`
- Verify log: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Write the failing verification entry for `m` in the verification log**
- [ ] **Step 2: Compare current `m/index.html` against its mapped mockup and confirm failure**
- [ ] **Step 3: Rebuild `m/index.html` to match the minimal architecture mockup**
- [ ] **Step 4: Rebuild `m/about.html`, `m/service.html`, `m/contact.html` as architecture-studio pages**
- [ ] **Step 5: Implement isolated CSS/JS/assets for `m`; regenerate Tailwind only if input changed**
- [ ] **Step 6: Verify all contract items for `m` and update the verification log**
- [ ] **Step 7: Commit `m`**

```bash
git add public/templates/business/m docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "feat: rebuild business template m"
```

### Task 2: Rebuild `n`

**Files:**
- Modify: `public/templates/business/n/index.html`
- Modify: `public/templates/business/n/about.html`
- Modify: `public/templates/business/n/service.html`
- Modify: `public/templates/business/n/contact.html`
- Create or replace as needed: `public/templates/business/n/assets/css/style.css`
- Create or replace as needed: `public/templates/business/n/assets/js/script.js`
- Update only if required: `public/templates/business/n/assets/css/tailwind-input.css`
- Regenerate if input changed: `public/templates/business/n/assets/css/tailwind-built.css`
- Create or replace as needed: `public/templates/business/n/assets/generated/*`
- Verify log: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Write the failing verification entry for `n`**
- [ ] **Step 2: Compare current `n/index.html` against its mapped mockup and confirm failure**
- [ ] **Step 3: Rebuild `n/index.html` around neon nightlife/event sections from the mockup**
- [ ] **Step 4: Rebuild `n/about.html`, `n/service.html`, `n/contact.html` for community, events, collaboration**
- [ ] **Step 5: Implement isolated CSS/JS/assets for `n`; regenerate Tailwind only if input changed**
- [ ] **Step 6: Verify all contract items for `n` and update the verification log**
- [ ] **Step 7: Commit `n`**

```bash
git add public/templates/business/n docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "feat: rebuild business template n"
```

### Task 3: Rebuild `p`

**Files:**
- Modify: `public/templates/business/p/index.html`
- Modify: `public/templates/business/p/about.html`
- Modify: `public/templates/business/p/service.html`
- Modify: `public/templates/business/p/contact.html`
- Create or replace as needed: `public/templates/business/p/assets/css/style.css`
- Create or replace as needed: `public/templates/business/p/assets/js/script.js`
- Update only if required: `public/templates/business/p/assets/css/tailwind-input.css`
- Regenerate if input changed: `public/templates/business/p/assets/css/tailwind-built.css`
- Create or replace as needed: `public/templates/business/p/assets/generated/*`
- Verify log: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Write the failing verification entry for `p`**
- [ ] **Step 2: Compare current `p/index.html` against its mapped mockup and confirm failure**
- [ ] **Step 3: Rebuild `p/index.html` to match the mockup’s bold pop composition**
- [ ] **Step 4: Rebuild `p/about.html`, `p/service.html`, `p/contact.html` for manifesto, campaign services, and CTA**
- [ ] **Step 5: Implement isolated CSS/JS/assets for `p`; regenerate Tailwind only if input changed**
- [ ] **Step 6: Verify all contract items for `p` and update the verification log**
- [ ] **Step 7: Commit `p`**

```bash
git add public/templates/business/p docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "feat: rebuild business template p"
```

### Task 4: Rebuild `q`

**Files:**
- Modify: `public/templates/business/q/index.html`
- Modify: `public/templates/business/q/about.html`
- Modify: `public/templates/business/q/service.html`
- Modify: `public/templates/business/q/contact.html`
- Create or replace as needed: `public/templates/business/q/assets/css/style.css`
- Create or replace as needed: `public/templates/business/q/assets/js/script.js`
- Update only if required: `public/templates/business/q/assets/css/tailwind-input.css`
- Regenerate if input changed: `public/templates/business/q/assets/css/tailwind-built.css`
- Create or replace as needed: `public/templates/business/q/assets/generated/*`
- Verify log: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Write the failing verification entry for `q`**
- [ ] **Step 2: Compare current `q/index.html` against its mapped mockup and confirm failure**
- [ ] **Step 3: Rebuild `q/index.html` with blueprint-like quality/process emphasis from the mockup**
- [ ] **Step 4: Rebuild `q/about.html`, `q/service.html`, `q/contact.html` for manufacturing quality and inquiry flow**
- [ ] **Step 5: Implement isolated CSS/JS/assets for `q`; regenerate Tailwind only if input changed**
- [ ] **Step 6: Verify all contract items for `q` and update the verification log**
- [ ] **Step 7: Commit `q`**

```bash
git add public/templates/business/q docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "feat: rebuild business template q"
```

## Chunk 2: Phase 2 Templates

### Task 5: Rebuild `r`

**Files:**
- Modify: `public/templates/business/r/index.html`
- Modify: `public/templates/business/r/about.html`
- Modify: `public/templates/business/r/service.html`
- Modify: `public/templates/business/r/contact.html`
- Create or replace as needed: `public/templates/business/r/assets/css/style.css`
- Create or replace as needed: `public/templates/business/r/assets/js/script.js`
- Update only if required: `public/templates/business/r/assets/css/tailwind-input.css`
- Regenerate if input changed: `public/templates/business/r/assets/css/tailwind-built.css`
- Create or replace as needed: `public/templates/business/r/assets/generated/*`
- Verify log: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Write the failing verification entry for `r`**
- [ ] **Step 2: Compare current `r/index.html` against its mapped mockup and confirm failure**
- [ ] **Step 3: Rebuild `r/index.html` for heritage/luxury consultation theme**
- [ ] **Step 4: Rebuild `r/about.html`, `r/service.html`, `r/contact.html`**
- [ ] **Step 5: Implement isolated CSS/JS/assets for `r`; regenerate Tailwind only if input changed**
- [ ] **Step 6: Verify all contract items for `r` and update the verification log**
- [ ] **Step 7: Commit `r`**

```bash
git add public/templates/business/r docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "feat: rebuild business template r"
```

### Task 6: Rebuild `s`

**Files:**
- Modify: `public/templates/business/s/index.html`
- Modify: `public/templates/business/s/about.html`
- Modify: `public/templates/business/s/service.html`
- Modify: `public/templates/business/s/contact.html`
- Create or replace as needed: `public/templates/business/s/assets/css/style.css`
- Create or replace as needed: `public/templates/business/s/assets/js/script.js`
- Update only if required: `public/templates/business/s/assets/css/tailwind-input.css`
- Regenerate if input changed: `public/templates/business/s/assets/css/tailwind-built.css`
- Create or replace as needed: `public/templates/business/s/assets/generated/*`
- Verify log: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Write the failing verification entry for `s`**
- [ ] **Step 2: Compare current `s/index.html` against its mapped mockup and confirm failure**
- [ ] **Step 3: Rebuild `s/index.html` for intelligent SaaS product theme**
- [ ] **Step 4: Rebuild `s/about.html`, `s/service.html`, `s/contact.html`**
- [ ] **Step 5: Implement isolated CSS/JS/assets for `s`; regenerate Tailwind only if input changed**
- [ ] **Step 6: Verify all contract items for `s` and update the verification log**
- [ ] **Step 7: Commit `s`**

```bash
git add public/templates/business/s docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "feat: rebuild business template s"
```

### Task 7: Rebuild `t`

**Files:**
- Modify: `public/templates/business/t/index.html`
- Modify: `public/templates/business/t/about.html`
- Modify: `public/templates/business/t/service.html`
- Modify: `public/templates/business/t/contact.html`
- Create or replace as needed: `public/templates/business/t/assets/css/style.css`
- Create or replace as needed: `public/templates/business/t/assets/js/script.js`
- Update only if required: `public/templates/business/t/assets/css/tailwind-input.css`
- Regenerate if input changed: `public/templates/business/t/assets/css/tailwind-built.css`
- Create or replace as needed: `public/templates/business/t/assets/generated/*`
- Verify log: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Write the failing verification entry for `t`**
- [ ] **Step 2: Compare current `t/index.html` against its mapped mockup and confirm failure**
- [ ] **Step 3: Rebuild `t/index.html` for security/defense theme**
- [ ] **Step 4: Rebuild `t/about.html`, `t/service.html`, `t/contact.html`**
- [ ] **Step 5: Implement isolated CSS/JS/assets for `t`; regenerate Tailwind only if input changed**
- [ ] **Step 6: Verify all contract items for `t` and update the verification log**
- [ ] **Step 7: Commit `t`**

```bash
git add public/templates/business/t docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "feat: rebuild business template t"
```

### Task 8: Rebuild `u`

**Files:**
- Modify: `public/templates/business/u/index.html`
- Modify: `public/templates/business/u/about.html`
- Modify: `public/templates/business/u/service.html`
- Modify: `public/templates/business/u/contact.html`
- Create or replace as needed: `public/templates/business/u/assets/css/style.css`
- Create or replace as needed: `public/templates/business/u/assets/js/script.js`
- Update only if required: `public/templates/business/u/assets/css/tailwind-input.css`
- Regenerate if input changed: `public/templates/business/u/assets/css/tailwind-built.css`
- Create or replace as needed: `public/templates/business/u/assets/generated/*`
- Verify log: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Write the failing verification entry for `u`**
- [ ] **Step 2: Compare current `u/index.html` against its mapped mockup and confirm failure**
- [ ] **Step 3: Rebuild `u/index.html` for urban/street brand energy**
- [ ] **Step 4: Rebuild `u/about.html`, `u/service.html`, `u/contact.html`**
- [ ] **Step 5: Implement isolated CSS/JS/assets for `u`; regenerate Tailwind only if input changed**
- [ ] **Step 6: Verify all contract items for `u` and update the verification log**
- [ ] **Step 7: Commit `u`**

```bash
git add public/templates/business/u docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "feat: rebuild business template u"
```

### Task 9: Rebuild `v`

**Files:**
- Modify: `public/templates/business/v/index.html`
- Modify: `public/templates/business/v/about.html`
- Modify: `public/templates/business/v/service.html`
- Modify: `public/templates/business/v/contact.html`
- Create or replace as needed: `public/templates/business/v/assets/css/style.css`
- Create or replace as needed: `public/templates/business/v/assets/js/script.js`
- Update only if required: `public/templates/business/v/assets/css/tailwind-input.css`
- Regenerate if input changed: `public/templates/business/v/assets/css/tailwind-built.css`
- Create or replace as needed: `public/templates/business/v/assets/generated/*`
- Verify log: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Write the failing verification entry for `v`**
- [ ] **Step 2: Compare current `v/index.html` against its mapped mockup and confirm failure**
- [ ] **Step 3: Rebuild `v/index.html` for statement-led creative branding**
- [ ] **Step 4: Rebuild `v/about.html`, `v/service.html`, `v/contact.html`**
- [ ] **Step 5: Implement isolated CSS/JS/assets for `v`; regenerate Tailwind only if input changed**
- [ ] **Step 6: Verify all contract items for `v` and update the verification log**
- [ ] **Step 7: Commit `v`**

```bash
git add public/templates/business/v docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "feat: rebuild business template v"
```

### Task 10: Rebuild `w`

**Files:**
- Modify: `public/templates/business/w/index.html`
- Modify: `public/templates/business/w/about.html`
- Modify: `public/templates/business/w/service.html`
- Modify: `public/templates/business/w/contact.html`
- Create or replace as needed: `public/templates/business/w/assets/css/style.css`
- Create or replace as needed: `public/templates/business/w/assets/js/script.js`
- Update only if required: `public/templates/business/w/assets/css/tailwind-input.css`
- Regenerate if input changed: `public/templates/business/w/assets/css/tailwind-built.css`
- Create or replace as needed: `public/templates/business/w/assets/generated/*`
- Verify log: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Write the failing verification entry for `w`**
- [ ] **Step 2: Compare current `w/index.html` against its mapped mockup and confirm failure**
- [ ] **Step 3: Rebuild `w/index.html` for wide-horizon panorama theme**
- [ ] **Step 4: Rebuild `w/about.html`, `w/service.html`, `w/contact.html`**
- [ ] **Step 5: Implement isolated CSS/JS/assets for `w`; regenerate Tailwind only if input changed**
- [ ] **Step 6: Verify all contract items for `w` and update the verification log**
- [ ] **Step 7: Commit `w`**

```bash
git add public/templates/business/w docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "feat: rebuild business template w"
```

### Task 11: Rebuild `x`

**Files:**
- Modify: `public/templates/business/x/index.html`
- Modify: `public/templates/business/x/about.html`
- Modify: `public/templates/business/x/service.html`
- Modify: `public/templates/business/x/contact.html`
- Create or replace as needed: `public/templates/business/x/assets/css/style.css`
- Create or replace as needed: `public/templates/business/x/assets/js/script.js`
- Update only if required: `public/templates/business/x/assets/css/tailwind-input.css`
- Regenerate if input changed: `public/templates/business/x/assets/css/tailwind-built.css`
- Create or replace as needed: `public/templates/business/x/assets/generated/*`
- Verify log: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Write the failing verification entry for `x`**
- [ ] **Step 2: Compare current `x/index.html` against its mapped mockup and confirm failure**
- [ ] **Step 3: Rebuild `x/index.html` for action/sports production**
- [ ] **Step 4: Rebuild `x/about.html`, `x/service.html`, `x/contact.html`**
- [ ] **Step 5: Implement isolated CSS/JS/assets for `x`; regenerate Tailwind only if input changed**
- [ ] **Step 6: Verify all contract items for `x` and update the verification log**
- [ ] **Step 7: Commit `x`**

```bash
git add public/templates/business/x docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "feat: rebuild business template x"
```

### Task 12: Rebuild `y`

**Files:**
- Modify: `public/templates/business/y/index.html`
- Modify: `public/templates/business/y/about.html`
- Modify: `public/templates/business/y/service.html`
- Modify: `public/templates/business/y/contact.html`
- Create or replace as needed: `public/templates/business/y/assets/css/style.css`
- Create or replace as needed: `public/templates/business/y/assets/js/script.js`
- Update only if required: `public/templates/business/y/assets/css/tailwind-input.css`
- Regenerate if input changed: `public/templates/business/y/assets/css/tailwind-built.css`
- Create or replace as needed: `public/templates/business/y/assets/generated/*`
- Verify log: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Write the failing verification entry for `y`**
- [ ] **Step 2: Compare current `y/index.html` against its mapped mockup and confirm failure**
- [ ] **Step 3: Rebuild `y/index.html` for restrained investment/advisory theme**
- [ ] **Step 4: Rebuild `y/about.html`, `y/service.html`, `y/contact.html` with safe financial copy**
- [ ] **Step 5: Implement isolated CSS/JS/assets for `y`; regenerate Tailwind only if input changed**
- [ ] **Step 6: Verify all contract items for `y` and update the verification log**
- [ ] **Step 7: Commit `y`**

```bash
git add public/templates/business/y docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "feat: rebuild business template y"
```

### Task 13: Rebuild `z`

**Files:**
- Modify: `public/templates/business/z/index.html`
- Modify: `public/templates/business/z/about.html`
- Modify: `public/templates/business/z/service.html`
- Modify: `public/templates/business/z/contact.html`
- Create or replace as needed: `public/templates/business/z/assets/css/style.css`
- Create or replace as needed: `public/templates/business/z/assets/js/script.js`
- Update only if required: `public/templates/business/z/assets/css/tailwind-input.css`
- Regenerate if input changed: `public/templates/business/z/assets/css/tailwind-built.css`
- Create or replace as needed: `public/templates/business/z/assets/generated/*`
- Verify log: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Write the failing verification entry for `z`**
- [ ] **Step 2: Compare current `z/index.html` against its mapped mockup and confirm failure**
- [ ] **Step 3: Rebuild `z/index.html` for zen/minimal space theme**
- [ ] **Step 4: Rebuild `z/about.html`, `z/service.html`, `z/contact.html`**
- [ ] **Step 5: Implement isolated CSS/JS/assets for `z`; regenerate Tailwind only if input changed**
- [ ] **Step 6: Verify all contract items for `z` and update the verification log**
- [ ] **Step 7: Commit `z`**

```bash
git add public/templates/business/z docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "feat: rebuild business template z"
```

## Chunk 3: Cross-Template QA And Finish

### Task 14: Normalize metadata, accessibility, and path integrity across all templates

**Files:**
- Modify: `public/templates/business/m/**`
- Modify: `public/templates/business/n/**`
- Modify: `public/templates/business/p/**`
- Modify: `public/templates/business/q/**`
- Modify: `public/templates/business/r/**`
- Modify: `public/templates/business/s/**`
- Modify: `public/templates/business/t/**`
- Modify: `public/templates/business/u/**`
- Modify: `public/templates/business/v/**`
- Modify: `public/templates/business/w/**`
- Modify: `public/templates/business/x/**`
- Modify: `public/templates/business/y/**`
- Modify: `public/templates/business/z/**`
- Modify: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Check required meta/OG/canonical tags on all 52 pages**
- [ ] **Step 2: Check allowed structured data types and remove unsafe claims**
- [ ] **Step 3: Check `prefers-reduced-motion`, alt text, labels, keyboard navigation**
- [ ] **Step 4: Check relative asset paths and internal page links**
- [ ] **Step 5: Fix any template that regressed during cross-template review**
- [ ] **Step 6: Update verification log entries for any changed pass/fail state**
- [ ] **Step 7: Commit metadata and QA fixes**

```bash
git add public/templates/business/m public/templates/business/n public/templates/business/p public/templates/business/q public/templates/business/r public/templates/business/s public/templates/business/t public/templates/business/u public/templates/business/v public/templates/business/w public/templates/business/x public/templates/business/y public/templates/business/z docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "fix: normalize business template metadata and qa"
```

### Task 15: Final verification sweep

**Files:**
- Test only: `public/templates/business/m/**`
- Test only: `public/templates/business/n/**`
- Test only: `public/templates/business/p/**`
- Test only: `public/templates/business/q/**`
- Test only: `public/templates/business/r/**`
- Test only: `public/templates/business/s/**`
- Test only: `public/templates/business/t/**`
- Test only: `public/templates/business/u/**`
- Test only: `public/templates/business/v/**`
- Test only: `public/templates/business/w/**`
- Test only: `public/templates/business/x/**`
- Test only: `public/templates/business/y/**`
- Test only: `public/templates/business/z/**`
- Test only: `docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md`

- [ ] **Step 1: Re-open all 13 templates at `375px` width and confirm all verification entries are pass**
- [ ] **Step 2: Re-open all 13 templates at `1440px` width and confirm all verification entries are pass**
- [ ] **Step 3: Click through primary nav links, footer links, and contact CTA on all 52 pages**
- [ ] **Step 4: Confirm verification log has one completed section per template**
- [ ] **Step 5: Capture final notes for intentional placeholders in the verification log**
- [ ] **Step 6: Commit final touch-ups if needed**

```bash
git add public/templates/business/m public/templates/business/n public/templates/business/p public/templates/business/q public/templates/business/r public/templates/business/s public/templates/business/t public/templates/business/u public/templates/business/v public/templates/business/w public/templates/business/x public/templates/business/y public/templates/business/z docs/superpowers/verification/2026-03-16-business-m-z-renewal-checks.md
git commit -m "chore: finalize business template renewals"
```
