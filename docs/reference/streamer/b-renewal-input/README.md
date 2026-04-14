# Streamer B Renewal Input

## Purpose
- This folder is the handoff bundle for implementing the `streamer/b` renewal
- It contains only the files that should be read before starting the actual template work

## Read Order
- `b-renewal-design.md`
  - Original detailed concept direction
- `b-DESIGN.md`
  - Implementation-facing design authority
- `b-stitch-review.md`
  - What to keep and what to revise from the Stitch output
- `STREAMER_PROFILE_FORMAT.md`
  - Shared profile structure for realistic dummy streamer content
- `b-stitch-prompt.md`
  - Prompt history and reference for additional Stitch iterations if needed

## Stitch Output
- `stitch-output/screen.png`
  - Best current visual reference from Stitch
- `stitch-output/DESIGN.md`
  - Stitch-generated design notes
- `stitch-output/code.html`
  - Stitch-generated structural output

## Usage Rules
- Do not treat Stitch output as implementation architecture
- Treat `b-DESIGN.md` as the source of truth when conflicts exist
- Use the Stitch files as visual reference only
- Replace abstract placeholder copy with streamer-specific content before implementation hardens
