# Thumbnail Workflow

This document defines the minimum reusable workflow for refreshing template thumbnails after updates.

## Default Flow
1. Start the local preview server.
2. Capture only the category or business template tags that changed.
3. Confirm that files were written into the expected `*_v2` directory.
4. Re-run lightweight audits only when the template HTML or metadata changed together with the thumbnail work.
5. Do one lightweight portal or template spot-check only when the visual change is meaningful.

## Common Commands

### Start preview server
```powershell
npm run pages:dev
```

### Capture all mobile thumbnails
```powershell
npm run capture:mobile
```

### Capture one category
```powershell
npm run capture:lp
npm run capture:portfolio
npm run capture:portfolio-desktop
npm run capture:streamer
npm run capture:streamer-desktop
```

`capture-thumbnails.js` currently supports:
- `mobile`
- `desktop`
- `x-social`

Category-scoped commands are currently prepared for:
- `lp`
- `portfolio`
- `streamer`

### Capture selected business templates
```powershell
npm run capture:business-v2 -- w
npm run capture:business-v2 -- w x
```

### Capture business `v2` thumbnails
```powershell
npm run capture:business-v2
```

### Optional fallback for business capture
If the local preview server is unstable and only business thumbnails need to be refreshed, `capture-business-v2.js` can read local files directly.

```powershell
$env:BUSINESS_CAPTURE_SOURCE='file'
npm run capture:business-v2 -- w x
Remove-Item Env:BUSINESS_CAPTURE_SOURCE
```

## Validation Points
- Generated files should appear under `public/assets/images/thumbnails/<category>_v2/`.
- Prefer checking only the files you intended to refresh instead of scanning the whole category.
- Use a portal list or template spot-check only for categories whose composition or framing changed.
- If the thumbnail refresh accompanied template edits, run `node scripts/audit-template-links.js` and `node scripts/audit-template-metadata.js`.
- If list data changed, confirm thumbnail paths against `public/assets/js/data.js`.

## Minimal Decision Rule
- If only `lp`, `portfolio`, or `streamer` changed, run the matching category capture command.
- If only a few business templates changed, pass their tags to `capture:business-v2` instead of regenerating all business thumbnails.
- Regenerate all thumbnails only when a shared capture rule, base CSS, or list presentation changed.
- Avoid full-category recapture when the change is limited to copy, metadata, or non-visual cleanup.

## Maintenance Notes
- `capture-business-v2.js` intentionally stays separate because business thumbnails use custom clipping and per-template overrides.
- If a new reusable capture pattern appears, prefer extending `capture-thumbnails.js` or documenting why a new specialized script is necessary.
- Keep this document aligned with `package.json` scripts. If a new capture command is added, update this file in the same change.
