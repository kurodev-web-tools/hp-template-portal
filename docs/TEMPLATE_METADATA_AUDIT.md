# Template Metadata Audit

This document tracks template pages that still use placeholder-style metadata or demo-only values that should be reviewed before treating the template as publication-ready.

## Current Findings

### Business templates with `example.com` style canonical or OGP URLs
- `business/d`
- `business/f`
- `business/i`
- `business/j`
- `business/k`
- `business/l`
- `business/r`

### Business templates with `.example.jp` demo domains
- `business/c`

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
- The highest-priority cleanup targets are templates still using generic `example.com` or `.example.jp` URLs in metadata.
