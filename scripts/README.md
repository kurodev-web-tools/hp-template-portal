# Scripts Overview

This directory keeps reusable project scripts only. One-off scripts should be deleted or folded into an existing reusable script after the task is finished.

## Current Scripts

### `update-count.js`
- Updates the premium template count shown on the portal index page.
- Used by `npm run build`.

### `capture-thumbnails.js`
- Captures category thumbnails from the local Pages dev server.
- Supports `mobile`, `desktop`, and `x-social` viewport modes.
- Supports category-scoped capture such as `lp`, `portfolio`, and `streamer`.
- Used by:
  - `npm run capture`
  - `npm run capture:mobile`
  - `npm run capture:desktop`
  - `npm run capture:x-social`
  - `npm run capture:lp`
  - `npm run capture:portfolio`
  - `npm run capture:portfolio-desktop`
  - `npm run capture:streamer`
  - `npm run capture:streamer-desktop`

### `capture-business-v2.js`
- Specialized thumbnail capture for `public/templates/business/*`.
- Keeps the current `business_v2` framing and per-template clipping rules.
- Used by `npm run capture:business-v2`.
- Accepts business template tags through `npm run capture:business-v2 -- <tag...>`.
- Covered by `tests/capture-business-v2.test.js`.

### `playwright-cli.ps1`
- Thin wrapper for running Playwright CLI through `npx`.
- Used by `npm run playwright`.

## Retention Rule
- Keep scripts here only if they support repeatable maintenance work.
- One-off cleanup or migration scripts should be removed once their edits are already reflected in tracked files.
