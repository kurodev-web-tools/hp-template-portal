# Streamer B Google Stitch Prompt

## Purpose
- Instructions for creating an initial mockup / wireframe for the `streamer/b` renewal in Google Stitch
- The goal is not final implementation, but validation of `composition / information hierarchy / UI tone / world direction`
- `three.js / WebGL` is mentioned as a likely final implementation path, but Stitch is not expected to generate production-grade code for it

## Recommended Input Prompt
```text
Create a high-fidelity website mockup / wireframe for a Japanese streamer template called "Boss Room".

This is a landing-style homepage for a streamer / VTuber, but it should not feel like a generic influencer website, dashboard, or SaaS page.
The core experience is "lock on": the viewer feels like they are confronting a ruler in a boss room, and the page gradually narrows its visual focus toward the streamer.

Design direction:
- Theme: BOSS ROOM
- Mood: luxurious, tense, dominant, invitation-only
- Color palette: deep black, dark violet, muted magenta highlights, cold metallic accents
- Visual grammar: target markers, focus rings, room framing, selective glow, large cinematic negative space
- Avoid: red warning UI, retro pixel game style, cyber terminal style, generic premium LP style

Layout direction:
- Build the page as a pseudo-fixed confrontation space rather than a normal stacked marketing page
- The hero should show a distant but dominant streamer figure placed at the end of a room or throne-like chamber
- As the page progresses, the composition should feel more focused and closer, but still elegant and readable
- Keep mobile viewing in mind; the structure should still work on a smartphone without losing hierarchy

Information priority:
1. Presence of the ruler / streamer
2. Dominance metrics
3. Activity / stream style
4. Audience access window (schedule)
5. Access pass / SNS / participation links

Required sections:
1. Boss Room Hero
   - Distant dominant character
   - Room pressure and focus convergence
   - Early teaser of access pass CTA

2. Ruler Profile
   - Name
   - Title
   - One-line world statement
   - Short personality / activity summary

3. Dominance Metrics
   - 3 to 4 large metrics only
   - Labels should feel world-themed but still understandable
   - Avoid tiny dashboard widgets

4. Activity / Stream Domain
   - Main content genres
   - Signature stream formats
   - Participation style

5. Audience Access Window
   - Next stream
   - Weekly access windows
   - Public / limited / member labels
   - Show it as a viewing window, not a plain calendar

6. Access Pass / External Nodes
   - YouTube, X, Discord, membership, etc.
   - Present these as invitation / access-pass cards, not a plain icon row

Character direction:
- The streamer should remain the center of gravity of the page
- Use a visual language that supports future use of static image, transparent video, or layered character assets
- Do not make the site feel empty without a live 3D model

Typography and composition:
- Strong display typography
- Large visual hierarchy
- Elegant spacing with tension
- Minimal but high-impact UI chrome
- Readable Japanese-friendly layout

Technical expectation note:
- The final implementation may use three.js / WebGL for focus convergence, room compression, and lock-on effects
- For this mockup, prioritize visual structure and cinematic UI over implementation detail

Deliverables:
- Desktop homepage mockup
- Mobile homepage mockup
- Clear section separation
- UI component direction for metrics, schedule, and access pass
```

## Short Variant
```text
Design a high-fidelity Japanese streamer / VTuber homepage mockup called "Boss Room".
The experience is a confrontation with a dominant ruler in a luxurious dark-violet boss chamber.
The visual keyword is "lock on".

Avoid generic influencer sites, SaaS dashboards, cyber terminals, and red warning UIs.
Use a pseudo-fixed cinematic layout with:
- Boss Room Hero
- Ruler Profile
- 3-4 large dominance metrics
- Activity / stream domain
- Audience access window
- Access pass / SNS cards

The streamer must remain the visual center.
The final product may later use three.js / WebGL, but this stage is only for mockup / wireframe / visual direction.
Create both desktop and mobile versions.
```

## Prompt Optimization Notes
- Explicitly say `mockup / wireframe / visual direction` so Stitch does not drift toward fake-finished implementation
- Include `pseudo-fixed confrontation space` to avoid a generic vertically stacked landing page
- Include `3 to 4 large metrics only` to prevent dashboard clutter
- Make the `avoid` list strong enough to prevent drift toward `A`-style depth exploration or terminal-like UI
- Include `mobile homepage mockup` to avoid desktop-only dense layouts

## What To Check In Stitch Output
- Whether the first impression clearly feels like a confrontation inside a boss room
- Whether it still feels character-centered instead of turning into a UI-only website
- Whether the metrics read as `dominance metrics` rather than a dashboard
- Whether the schedule avoids looking like a plain calendar
- Whether the CTAs avoid collapsing into a simple SNS icon row
- Whether it avoids drifting toward `A`-style deep-sea composition or `F`-style system UI

## Follow-up After Mockup
- Transfer the approved composition into `DESIGN.md`
- Break each section down into implementation-ready rules for fixed behavior, scroll transitions, and layer structure
- Limit `three.js / WebGL` to the few areas that truly need it, and keep responsibilities separate from standard DOM-based content
