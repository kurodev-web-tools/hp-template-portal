# Template Metadata Audit

This document tracks template pages that still use placeholder-style metadata or demo-only values that should be reviewed before treating the template as publication-ready.

## Current Findings

### Business templates with `.example.jp` demo domains
- None currently tracked

### Business templates with `example.com` style canonical or OGP URLs
- None currently tracked in the first cleanup batch

### Boilerplate-only placeholder metadata
- None currently tracked

### Placeholder-style contact values inside templates
- `example.com` / `.example.jp` style contact placeholders have been cleaned up in active templates.
- Form placeholders still exist intentionally, but they now use brand-aware or theme-aware demo values instead of raw example domains.

### Demo-form hooks that remain intentionally
- `data-demo-form` and related demo submission hooks remain in several business contact pages.
- These are treated as demo behavior markers, not metadata issues, as long as visible copy is publication-ready.

### Generated local placeholder image labels
- `public/templates/business/**/assets/generated/external-image-01.svg` still contains the text `Local placeholder image`.
- These files are currently used as local generated logo / fallback assets. They should be reviewed only when replacing generated artwork, not during normal metadata cleanup.

## Recommended Handling
- Treat canonical URLs, `og:url`, and structured-data `url` fields as metadata quality work, not as design work.
- Keep form placeholder text unless it causes confusion in the template demo itself.
- Prefer contextual demo addresses over `example.com` style values when a template already has a clear fictional brand or domain.
- Do not treat `data-demo-*` hooks alone as cleanup targets unless the visible UI or submit behavior looks unfinished.
- Do not flag generated local SVG labels as metadata regressions unless they leak into visible published UI in a misleading way.

## Notes
- Some templates intentionally use fictional branded domains for presentation. Those are not automatically errors.
- No active `example.com` style metadata remains in tracked templates or starter assets.
- The current review found no new metadata-string regressions in active templates; remaining items are intentional demo hooks or generated local assets.
