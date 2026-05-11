# Streamer Full Renewal Asset Plan

## Purpose

この資料は、final page mock を高品質に実装するための asset split を固定する。目的は、画像に UI 構造や文字を焼き込まず、HTML/CSS/vanilla JS と template-local SVG/WebP を分担して使うこと。

実装時は `LAYOUT_MATRIX.md`、各テーマの `DESIGN.md`、`*-final-page-mock-v1.png` とあわせて参照する。

## Global Asset Rules

- Text, CTA labels, dates, stream titles, navigation labels are always HTML text. Do not bake readable UI text into WebP.
- Use WebP for irregular texture, ambience, large photographic or painterly detail, and complex material.
- Use SVG for clean symbols, masks, frames, rails, icons, simple seals, geometry, and scalable UI ornament.
- Use CSS for layout, spacing, responsive behavior, card size, text hierarchy, state, hover/focus, and simple gradients.
- Use vanilla JS only for state and small one-shot interactions: reveal, fill, press, active nav, reduced-motion handling.
- Generate desktop-first large assets first. Add mobile-specific assets only when the shape itself breaks at mobile widths.
- Keep assets under the target template's local asset directory during implementation. Shared assets are allowed only after at least three templates prove the same asset is truly reusable.

## Asset Type Decision

| Need | Preferred format | Notes |
| --- | --- | --- |
| Paper, leather, stone, metal, cloth, wall, ink texture | WebP | Repeat or layer as background. Keep text separate. |
| Irregular edges, torn paper, ink blot, brush stroke, smoke/mist patch | WebP or SVG mask | WebP for rich material; SVG mask for clean edge control. |
| Crest, seal, icon, rail, gauge, HP frame, divider, geometric frame | SVG | Keep scalable and color-adjustable when possible. |
| Hero room, stage, cockpit, board, panoramic environment | WebP | Use `object-fit` / focal position; add mobile variant if crop fails. |
| Progress bar fill, HP amount, schedule rows, tabs, CTA state | CSS + HTML | Decoration can sit above/below as SVG/WebP. |
| One-shot motion, active nav, fill animation | CSS + vanilla JS | Respect `prefers-reduced-motion`. |

## Responsive Asset Rules

- Texture assets are generally shared across PC/tablet/mobile.
- Small symbols and corner ornaments are generally shared.
- Large hero backgrounds may need `desktop` and `mobile` variants.
- Wide docks, long rails, panoramic scenes, and horizontal boards may need mobile-specific crops or alternate pieces.
- If a WebP contains a structural frame, prefer splitting it into reusable pieces rather than stretching one full image.
- If a card shape must stretch, use CSS layout plus separate edge/corner assets instead of a single full-card image.

Recommended naming:

```text
assets/
  texture-washi.webp
  texture-parchment.webp
  hero-desktop.webp
  hero-mobile.webp
  frame-hp.svg
  seal-contact.svg
  edge-scroll-left.webp
  edge-scroll-right.webp
```

## Pilot Design Kits

### Z Zen Brush

Core goal: keep the quiet paper composition and ink identity. The implementation should feel expensive because of spacing, paper texture, and restrained red seal placement, not because of many effects.

| Mock area | Component | HTML/CSS responsibility | SVG/WebP responsibility | Motion |
| --- | --- | --- | --- | --- |
| Left ink nav | `InkNav` | nav links, active state, compact mobile nav | ink drip patch, small paper label, optional brush divider | fade/slide in only |
| Center brush hero | `BrushHero` | title, role tags, profile CTA | brush stroke, enso, washi background, optional silhouette | ink reveal, reduced-motion static |
| Right-top stream seal | `StreamSeal` | next stream text, date, live CTA | seal mark or stamp backing | seal press on load/hover |
| Lower-left schedule | `ScheduleScroll` | schedule rows, labels, all schedule CTA | scroll edge pieces, paper texture | scroll unfold |
| Lower-right contact | `ContactSeal` | business contact copy, CTA, follow split | red seal, paper slip, ink corner | small press/focus response |

Asset backlog:

- WebP: `texture-washi.webp`, `ink-blot-hero.webp`, `brush-stroke-main.webp`, `scroll-paper-texture.webp`, `scroll-edge-set.webp`
- SVG: `enso-mark.svg`, `seal-contact.svg`, `ink-nav-mark.svg`, `divider-brush.svg`
- CSS-only: paper cards, spacing, text hierarchy, bottom CTA order, card shadows

Responsive notes:

- PC keeps left ink nav and diagonal paper balance.
- Tablet moves nav to compact top label; schedule scroll becomes a wide block below hero.
- Mobile order: `name -> next stream -> schedule -> follow -> contact -> profile`.
- Add `hero-mobile.webp` only if the brush/enso crop loses the focal point.

### B Boss Room

Core goal: keep the command-room asymmetry and separate fan action from business contract. The page should look like a boss status room, not a generic fantasy landing page.

| Mock area | Component | HTML/CSS responsibility | SVG/WebP responsibility | Motion |
| --- | --- | --- | --- | --- |
| Left crest rail | `BossSideRail` | nav links, challenge note, mobile compact nav | crest, rail frame, stone/leather texture | panel reveal |
| Center throne hero | `ThroneHero` | streamer name, role tags, primary CTA | throne background, red cloth, gold trim | subtle reveal only |
| Right raid panel | `NextRaidPanel` | stream title, date, schedule CTA | raid frame, dark panel texture | panel reveal |
| Status block | `BossStatusPanel` | HP value, stats, follow buttons | HP frame SVG, status ornaments | HP bar fill |
| Contract block | `ContractPanel` | business contact CTA, short terms | contract seal/frame, red cloth patch | contract stamp response |

Asset backlog:

- WebP: `hero-throne-desktop.webp`, `texture-stone.webp`, `texture-leather.webp`, `texture-red-cloth.webp`, `panel-shadow.webp`
- SVG: `crest-boss.svg`, `frame-hp.svg`, `frame-raid.svg`, `contract-seal.svg`, `divider-gold.svg`
- CSS-only: command grid, HP fill, CTA states, stats rows, responsive card order

Responsive notes:

- PC keeps left rail, center throne, right raid/status, lower contract.
- Tablet keeps rail as a side label or top compact command strip depending on available width.
- Mobile order: `name -> live -> next stream -> follow -> contact -> schedule`.
- Use mobile hero crop if the throne silhouette becomes unreadable.

### Q Quest Log

Core goal: preserve the adventurer guild board hierarchy. It should feel participatory and organized, not intimidating or boss-like.

| Mock area | Component | HTML/CSS responsibility | SVG/WebP responsibility | Motion |
| --- | --- | --- | --- | --- |
| Left quest tabs | `QuestMenu` | category links, rank labels, active state | leather tabs, pin details | tab reveal |
| Center active quest | `ActiveQuestHero` | streamer identity, active quest, CTA | parchment hero, torn edge, wax seal | quest unfold |
| Right schedule | `PartySchedule` | date rows, quest tags, all schedule CTA | paper strips, board texture | row reveal |
| Recruitment/follow | `PartyRecruitment` | community copy, follow links | pinned notices, small seals | pin press |
| Guild contact | `GuildContact` | business contact CTA, notice copy | guild seal, dark board backing | seal stamp |

Asset backlog:

- WebP: `texture-parchment.webp`, `texture-wood-board.webp`, `torn-paper-edge.webp`, `leather-tab.webp`, `wax-seal.webp`
- SVG: `guild-mark.svg`, `pin-brass.svg`, `quest-divider.svg`, `seal-small.svg`
- CSS-only: board grid, tab layout, schedule rows, tag colors, responsive order

Responsive notes:

- PC keeps left quest tabs, center active quest, right party schedule, bottom guild contact.
- Tablet converts tabs into a horizontal board strip above active quest.
- Mobile order: `active quest -> next stream -> party schedule -> recruitment/community -> contact`.
- Avoid compressing the parchment hero into a tiny image; rebuild the card with HTML/CSS.

## A-Z Asset Direction

| Theme | WebP focus | SVG focus | CSS/JS focus |
| --- | --- | --- | --- |
| A Abyss Neon | abyss texture, sonar glow patches, submerged hero | depth rail, sonar rings, beacon marks | cockpit grid, dock panels, sonar sweep |
| B Boss Room | throne, stone/leather/cloth, panel shadows | crest, HP frame, gold dividers | command layout, HP fill, panel reveal |
| C Crystal Prism | glass shimmer, soft prism light | prism shards, waveform lines | floating panel placement, gentle reveal |
| D Digital Ghost | static noise, glitch silhouette, dark terminal grain | terminal frame, lock marks, scanline mask | access log, encrypted rows, prompt nav |
| E E-Sports Pro | arena/map background, broadcast texture | scoreboard frame, bracket lines, platform icons | match grid, roster cards, bracket state |
| F Future Tech | lab background, prototype core glow | module icons, HUD rings, protocol marks | module grid, demo queue, restrained glow |
| G Glitch Core | torn browser fragments, zine texture | clipped tabs, shard masks, alert marks | diagonal shard layout, stable rescue panel |
| H Horror Mansion | hallway/portrait, candle light, paper letter | floor map, key icons, wax marks | invitation rows, sealed contact reveal |
| I Idol Stage | stage lights, ticket paper, goods texture | marquee frame, ticket perforation, fan icons | timetable, ticket strip, backstage block |
| J Jazz Lounge | record sleeve, warm light, menu paper | lounge mark, note dividers, reservation tag | vertical menu, set list, low-motion lighting |
| K Knight Honor | parchment/metal, crest backdrop | shield rail, crest, expedition icons | formal rows, audience hall CTA |
| L Lunar Phase | moonlit sky, soft clouds, phase glow | phase dial, orbit lines, star labels | orbit panels, calendar rhythm |
| M Metallic Chrome | chrome pedestal, metal reflections | spec strip, frame lines, demo marks | showroom grid, polished dock states |
| N Neon Night | street wall, posters, neon sign glow | sign frames, sticker shapes, flyer marks | event board, flyer/sticker layout |
| O Orbit Space | planet/orbit background, starfield | radial tabs, telemetry marks, mission icons | orbit layout, telemetry panels |
| P Pixel Retro | cartridge label, pixel background, save slot texture | pixel frame, command icons, stage markers | save-select rows, command menu |
| Q Quest Log | parchment, wood board, wax seal | guild mark, brass pins, quest dividers | board grid, quest rows, seal stamp |
| R Rogue Stealth | dossier paper, tactical map, dark cloth | mission tabs, lock marks, map lines | stealth dossier layout, secure drop |
| S Steampunk Gear | brass, workshop, pressure gauge texture | gear rail, gauge marks, blueprint lines | control bench, gauge schedule |
| T Tech Logic | subtle circuit board, dark panel grain | node graph, command marks, endpoint icons | operations grid, verification queue |
| U Urban Graffiti | mural wall, torn poster, sticker texture | tag frame, sticker cuts, tape/pin marks | poster collage, booking poster |
| V Vivid Glitch | sticker paper, vivid glitch patches | cutout masks, tab marks, warning icons | sticker stack, diagonal schedule |
| W Wide Pan | panoramic scene, film grain, slate texture | frame labels, timeline ticks, slate marks | wide timeline, cinematic layout |
| X Xtreme Action | action background, motion streak texture | timer frame, meter marks, sponsor labels | diagonal overlay, speed meter |
| Y Yield Chart | subtle report paper, chart board texture | KPI icons, chart axes, funnel marks | growth chart layout, KPI ticker |
| Z Zen Brush | washi, ink blot, brush stroke, scroll texture | enso, seal, brush divider | scroll layout, seal press, ink reveal |

## Acceptance Checks

- First viewport matches the theme row in `LAYOUT_MATRIX.md`.
- The implementation can identify each major mock area as an HTML component.
- No WebP contains required readable text.
- Fan Follow and business Contact remain visually distinct.
- PC/tablet/mobile behavior is specified before implementation starts.
- Motion can be disabled without hiding Hero, Schedule, Follow, or Contact.
