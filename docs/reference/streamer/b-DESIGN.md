# DESIGN.md - Streamer Template B "Boss Room"

## Overview
- Target:
  - `public/templates/streamer/b`
- Template name:
  - `Boss Room`
- This document defines the design standards for the `streamer/b` renewal implementation
- The concept-phase source document is `docs/reference/streamer/b-renewal-design.md`

## Design Intent
- `Boss Room` should transform a streamer website from a page that merely lists information into a space where the viewer confronts a ruler
- The protagonist is not the UI, but the streamer positioned at the far end of the room
- Scrolling should feel less like reading downward and more like `narrowing focus until the target is locked on`

## Experience Pillars
- `Confrontation`
  - The first requirement is not functional understanding, but the pressure of direct encounter
- `Focus Convergence`
  - As the page progresses, both space and information should converge toward a single focal point
- `Dominance With Readability`
  - The design should feel dominant without collapsing into unreadable over-stylization
- `Invitation-Only Access`
  - CTA elements should feel like access passes given to selected viewers, not generic action buttons

## Non-Goals
- Do not turn it into a generic premium landing page
- Do not turn it into a dashboard with many small cards
- Do not use a red-and-black danger-zone UI
- Do not drift into cyber terminal styling
- Do not reuse the deep-dive feel of `A` or the infiltration tone of `R`

## Audience
- Primary audience:
  - Individual VTubers / streamers who want a stronger world-driven presentation
- Viewing assumptions:
  - Mobile traffic is significant
  - The website is not a replacement for SNS, but a place to elevate worldbuilding and perceived quality

## Content Priority
- 1. The presence of the streamer
- 2. Dominance metrics
- 3. Activity domain
- 4. Stream schedule
- 5. External access paths

## Layout Rules
- The base structure is `pseudo-fixed scene + sectional progression`
- Do not make every viewport behave like a hard cut; the stronger impression should be that the viewer stays inside the same room while focus gradually shifts
- On desktop, preserve generous negative space and visible room depth
- On mobile, preserve the room identity while reorganizing information blocks into readable units
- Even during fixed-scene segments, text density and scroll speed must remain readable

## Section Blueprint

### 1. Boss Room Hero
- Role:
  - Establish atmospheric dominance
- Required elements:
  - Distant character
  - Room framing
  - Early signs of focus convergence
  - A subtle preview of the primary CTA
- Presentation:
  - The first impression should prioritize the pressure of the whole room
  - A little later, the viewer's eye should be pulled inward until the character becomes undeniable

### 2. Ruler Profile
- Role:
  - Define the personality of the ruler
- Required elements:
  - Display name
  - Title
  - One-liner
  - Condensed activity summary
- Rules:
  - Do not use copy that feels like placeholder template text
  - Write it as if it belongs to a believable real streamer

### 3. Dominance Metrics
- Role:
  - Communicate strength at a glance
- Required elements:
  - 3 to 4 large metrics
  - A small number of support status items
- Rules:
  - Do not scatter small graphs or tiles everywhere
  - Let labels lean into the world; let the numbers remain reality-based
  - Sizes must remain legible even when viewed from a distance-like composition

### 4. Activity / Stream Domain
- Role:
  - Explain what the streamer actually does, not just their world setting
- Required elements:
  - Main stream genres
  - Signature formats
  - Whether audience participation exists
- Rules:
  - Keep this section lighter than the metrics section
  - Do not reduce it to a generic feature list

### 5. Audience Access Window
- Role:
  - Show when viewers can next enter the room
- Required elements:
  - Next stream
  - Weekly schedule
  - Access-state labels
- Rules:
  - Do not present it as a normal calendar UI
  - It should feel like an opening window or access slot

### 6. Access Pass / External Nodes
- Role:
  - Present the formal participation paths
- Required elements:
  - YouTube
  - X
  - Discord
  - Membership when relevant
- Rules:
  - Do not end with icons alone
  - Each node should feel like a distinct entry path with a reason to enter

## Character Direction
- The character must always be treated as the center of gravity of the page
- Do not place the exact same standing visual unchanged in every section
- Preferred appearances:
  - In the hero, the streamer appears as a distant ruler
  - In the profile, the existence becomes clearer
  - In metrics / activity, the streamer remains the spatial axis of the room
- The structure should be future-compatible with:
  - Static art
  - Transparent-background video
  - Layer-separated character assets

## Motion Language
- Primary motion:
  - Focus convergence
  - Compression of room depth
  - Activation of target UI accents
- Secondary motion:
  - Tightening of negative space
  - Slow breathing in the dark zones
  - Early CTA presence signals
- Prohibited:
  - Constant glitch effects
  - Excessive noise
  - Any state where the UI becomes more dominant than the character

## Visual Language
- Colors:
  - Deep black
  - Dark violet
  - Restrained magenta
  - Metallic white accents
- Material references:
  - Velvet
  - Lacquer
  - Smoked glass
  - Metallic rim light
- Shapes:
  - Circular lock-on marks
  - Thin frames
  - Straight room-cutting lines
- Prohibited:
  - Excessive neon
  - Militarized HUD styling
  - Retro game styling

## Typography
- Headings should feel display-driven and intentional
- Body copy should preserve strong Japanese readability
- English labels should be short and decisive
- Tension should come from spacing and rhythm, not from decorative overload

## CTA Rules
- Use a vocabulary based on `pass / access / entry`
- Keep one clearly primary CTA
- Do not make CTA the hero of mid-page sections
- Consolidate the strongest access paths toward the end

## Data Rules
- Metrics do not need to be real-time by default
- The design must still work for smaller or newer streamers
- Define realistic dummy values early so empty states never make the page feel weak

## Responsive Rules
- On mobile, prioritize the focal target over the full room view
- Rebuild large metrics into one-column or two-column compositions
- Shorten fixed-scene segments
- Keep CTA and schedule touch-friendly

## Technical Direction
- Responsibilities for `three.js / WebGL`:
  - Room pressure
  - Focus convergence
  - Supporting lock-on visuals
- Responsibilities for DOM / CSS:
  - Information structure
  - Typography
  - Metric UI
  - Schedule
  - Access pass components
- Rules:
  - The WebGL canvas must not overpower the page
  - Reading-oriented content should remain DOM-based

## Implementation Guardrails
- First build a static composition that already works without WebGL
- Then add lock-on behavior and room compression incrementally
- Replace template-smelling copy early, even before final character assets are ready
- Prepare a dummy streamer profile that does not conflict with the theme

## Success Criteria
- The confrontation inside the `Boss Room` is immediately understandable
- It does not look like the same template family as `A`
- The streamer feels more dominant than the UI
- Schedule and CTA sections function as a believable real site
- The mobile version preserves both impact and readability
