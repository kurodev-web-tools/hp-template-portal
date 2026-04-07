# Template Metadata Audit

This document tracks template pages that still use placeholder-style metadata or demo-only values that should be reviewed before treating the template as publication-ready.

## Current Findings

### Business templates with `.example.jp` demo domains
- None currently tracked

### Business templates with `example.com` style canonical or OGP URLs
- None currently tracked in the first cleanup batch

### Boilerplate-only placeholder metadata
- `business/boilerplate.html`
  - Intentional starter asset
  - Already marked `noindex, nofollow`

### Placeholder-style contact values inside templates
- `example.com` / `.example.jp` style contact placeholders have been cleaned up in active templates.
- Form placeholders still exist intentionally, but they now use brand-aware or theme-aware demo values instead of raw example domains.

## Recommended Handling
- Treat canonical URLs, `og:url`, and structured-data `url` fields as metadata quality work, not as design work.
- Keep form placeholder text unless it causes confusion in the template demo itself.
- Prefer contextual demo addresses over `example.com` style values when a template already has a clear fictional brand or domain.

## Notes
- Some templates intentionally use fictional branded domains for presentation. Those are not automatically errors.
- The remaining audit target is limited to starter-only placeholder metadata in `business/boilerplate.html`.
