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
- Contact forms and demo email placeholders still exist across several templates.
- This is acceptable for template demos, but canonical URLs and structured-data URLs should be reviewed separately from form placeholder text.

## Recommended Handling
- Treat canonical URLs, `og:url`, and structured-data `url` fields as metadata quality work, not as design work.
- Update placeholder domains only when the target publication pattern for that template is clear.
- Keep form placeholder text unless it causes confusion in the template demo itself.

## Notes
- Some templates intentionally use fictional branded domains for presentation. Those are not automatically errors.
- The next cleanup targets are placeholder contact examples only, not metadata URLs.
