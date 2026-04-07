# Thumbnail Workflow

This document defines the minimum reusable workflow for refreshing template thumbnails after updates.

## Default Flow
1. Start the local preview server.
2. Capture only the category or template set that changed.
3. Confirm that generated files land in the expected `*_v2` directory.
4. Check the portal list or related references to ensure the refreshed thumbnails are the ones being served.

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
npm run capture:portfolio
npm run capture:streamer
```

### Capture business `v2` thumbnails
```powershell
npm run capture:business-v2
```

## Validation Points
- Generated files should appear under `public/assets/images/thumbnails/<category>_v2/`.
- The updated category should still render correctly in the portal after capture.
- Thumbnail refresh should be scoped to the changed templates when possible instead of regenerating everything.

## Maintenance Notes
- `capture-business-v2.js` intentionally stays separate because business thumbnails use custom clipping and per-template overrides.
- If a new reusable capture pattern appears, prefer extending `capture-thumbnails.js` or documenting why a new specialized script is necessary.
