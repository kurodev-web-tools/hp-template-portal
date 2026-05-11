# Streamer Full Renewal Layout Matrix

## Purpose

この資料は、A-Z の streamer full renewal で「同じモックを再現したように見える」状態を避けるための layout contract。最終モック生成、実装計画、Codex/Symphony handoff では、各テーマの `DESIGN.md` とあわせてこの表を参照する。

`Header type` は、画面上のナビゲーションの見せ方を示す。既存 `DESIGN.md` の `Header position は PCはtop fixed header` という共通文より、この表と各テーマの `Header:` / `Information placement:` の具体指定を優先する。

## Global Rules

- モックは pixel-perfect target ではなく、theme-specific layout intent として扱う。
- PC first viewport は、各テーマの `Header type`、`Hero placement`、`Schedule placement`、`CTA / Contact placement` を必ず変える。
- `hero-left / cards-right`、均等な 2 column card grid、同じ右側 stacked cards は fallback layout としても使わない。
- SP は PC の縮小版にしない。`name / next stream / follow / contact` の到達性を優先して再編成する。
- Live / Schedule / Follow / Community / Contact は、色だけでなく配置、形状、ラベルで区別する。
- Final mock には、この表の `Must not converge with` を反映する。

## A-Z Layout Contract

| Theme | Header type | First viewport layout | Hero placement | Schedule placement | CTA / Contact placement | Must not converge with |
| --- | --- | --- | --- | --- | --- | --- |
| A Abyss Neon | left depth meter nav / HUD rail | deep-sea cockpit: left rail, center submerged identity, right sonar beacon, bottom dock | center submerged hero identity | right sonar Live / Next Stream beacon | bottom Follow / Contact dock | generic top nav, right stacked cards, flat neon dashboard |
| B Boss Room | left side rail / command room nav | boss command room: left crest rail, center throne, right raid/status, lower follow/contract | center throne visual and streamer identity | right Next Raid / schedule panel | lower Boss Status / Follow and Contract blocks | Quest parchment layout, generic game cards, normal top header |
| C Crystal Prism | thin top nav or small floating nav | low-density prism field: hero from upper-left to center, floating panels around edges | upper-left to center glass identity | center-right floating Next Stream prism | lower-right quiet glass chip | dense right-column cards, heavy neon, boxed two-column layout |
| D Digital Ghost | command prompt nav | breach console: top prompt, left access log, center ghost identity, right encrypted terminal, bottom channel | center ghost identity / silhouette | right encrypted Live / Schedule terminal | bottom secure Follow / Contact channel | normal top nav, symmetric card grid, decorative-only glitch |
| E E-Sports Pro | scoreboard header | broadcast room: top scoreboard, center match/map hero, left roster, right bracket, bottom sponsor strip | center match/map hero | right Next Match bracket | bottom sponsor/contact strip | generic gaming neon, Boss HP/status layout, right stacked cards |
| F Future Tech | minimal lab nav / module labels | lab command deck: center AI core, left module nav, right live demo/schedule, bottom inquiry dock | center prototype / AI core | right Live demo / Schedule panels | bottom inquiry dock | generic SaaS hero, flat dashboard cards, common top nav |
| G Glitch Core | fragmented ticker / broken tabs | broken zine/browser: top ticker, center broken hero, diagonal shards, stable lower contact | center broken hero identity | diagonal Live / Clip / Schedule shards | lower stable rescue contact panel | symmetrical dashboard, unreadable glitch, normal header |
| H Horror Mansion | side rail or mansion guide header | mansion floor plan: left map nav, center hallway/portrait, right candle invitation, bottom sealed letter | center hallway / portrait hero | right candlelit Next Stream invitation | bottom sealed Contact letter | bright top nav, generic dark cards, unrelated gothic decoration |
| I Idol Stage | venue sign / ticket counter header | live venue page: top sign, center stage, right timetable, bottom ticket strip, backstage contact | center stage / performer | right large Next Live timetable | bottom Live / Fan Club / Goods strip, separate contact | generic pink idol cards, normal nav bar, same card density as E |
| J Jazz Lounge | vertical lounge menu / menu-table nav | lounge reservation menu: left menu, center record/stage hero, right set list, bottom reservation contact | center stage or record-cover hero | right Tonight set list / Next Stream | bottom reservation-style Contact | generic restaurant site, top nav, beige-only lounge cards |
| K Knight Honor | shield side rail / crest nav | strategy table: left shield rail, center crest/oath hero, right expedition schedule, bottom audience hall | center oath / crest hero | right expedition schedule | bottom audience hall Contact | Boss Room throne/HP language, normal top nav, generic fantasy cards |
| L Lunar Phase | phase dial / star-map labels | moon observatory: phase dial top/side, center moonlit hero, orbiting stream panels, lower contact | center moonlit hero | orbiting Next Stream / Schedule panels | lower quiet Contact | generic space dashboard, dense right column, high-noise background |
| M Metallic Chrome | spec bar / showroom label nav | chrome showroom: center pedestal, left spec strip, right demo/schedule display, bottom contact dock | center chrome pedestal | right Live demo / Schedule display | bottom polished Contact dock | ordinary product LP, generic tech cards, Future Tech lab layout |
| N Neon Night | club sign / alley sign nav | neon street: top sign nav, center street hero, right event board, bottom flyer/sticker CTAs | center street hero | right event board schedule | bottom flyer/sticker Follow / Contact | Abyss/Future cyber HUD, generic neon grid, right stacked cards |
| O Orbit Space | radial mission tabs / orbit nav | mission control: center orbit/planet hero, circular nav, left telemetry, right mission schedule, bottom ground control | center planet/avatar orbit | right mission schedule | bottom ground control Contact | top nav dashboard, plain star background, generic space cards |
| P Pixel Retro | pixel title bar / command menu | save-select screen: top title bar, center save-slot hero, left command menu, right stage schedule, bottom cartridge contact | center character / save-slot hero | right next stage / schedule | bottom cartridge Contact | modern game dashboard, Boss HP layout, rounded generic cards |
| Q Quest Log | left quest category tabs / guild board nav | quest board: left category/rank, center active quest parchment, right party schedule, bottom teasers/follow/contact | center Active Quest parchment | right Party Schedule / recruitment | bottom quest teasers / follow banners / Guild Contact | Boss Room command room, normal top header, flat card grid |
| R Rogue Stealth | mission nav / encrypted tabs | infiltration dossier: left mission nav, center masked dossier, right encrypted schedule, bottom secure drop | center masked hero / dossier | right encrypted schedule | bottom secure drop Contact | Digital Ghost terminal clone, normal top nav, generic dark UI |
| S Steampunk Gear | gear side rail / instrument panel | workshop bench: left gear nav, center engine/character hero, right pressure schedule, bottom brass work order | center engine / character hero | right pressure-gauge schedule | bottom brass contact work order | Quest parchment board, generic brown cards, normal header |
| T Tech Logic | compact command bar / node labels | operations board: top command bar, center node graph, left build queue, right verification, bottom API contact | center node graph hero | right Live / Schedule verification panel | bottom API-like contact | Future Tech AI core, SaaS dashboard, symmetrical analytics cards |
| U Urban Graffiti | wall tag / sticker header | poster collage: wall-tag header, center mural, torn live/schedule posters, sticker follow, lower-right booking poster | center mural hero | torn-poster Live / Schedule blocks | sticker Follow icons, lower-right booking/contact poster | clean top nav, flat grid, generic street background |
| V Vivid Glitch | offset sticker nav / cutout tabs | sticker stack: offset nav, oversized hero sticker, floating live/clip windows, diagonal schedule strip, separate contact sticker | center oversized hero sticker | diagonal Schedule strip plus floating Live/Clip | separated Contact sticker | G broken zine clone, unreadable glitch, regular card layout |
| W Wide Pan | cinematic frame labels | ultra-wide stream wall: top frame labels, center panoramic hero, bottom timeline, far-right contact slate | center panoramic hero | bottom horizontal Live / Schedule / Archive timeline | far-right contact slate | normal top nav, vertical stacked panels, narrow hero layout |
| X Xtreme Action | diagonal timer/nav overlay | action camera overlay: diagonal top timer, center action hero, left speed meter, right event schedule, bottom sponsor rail | center action hero | right event schedule | bottom sponsor/contact rail | E broadcast scoreboard, generic sports site, straight card grid |
| Y Yield Chart | KPI ticker / analytics tabs | growth analytics board: top KPI ticker, center growth chart, left audience/follow, right funnel, bottom sponsor report | center growth chart hero | right next stream funnel | bottom sponsor/contact report card | Tech Logic node board, generic finance dashboard, plain top nav |
| Z Zen Brush | left ink nav / minimal paper label | zen scroll composition: left ink nav, center brush/enso hero, right-top stream seal, lower-left scroll, lower-right contact seal | center brush character / enso hero | lower-left Schedule Scroll | right-top Stream Seal, lower-right Contact Seal / Follow | generic Japanese inn site, beige-only page, normal top header |

## Mock Generation Checklist

Before generating or approving a final mock for a theme, confirm:

- The header matches the theme's `Header type`.
- The first viewport cannot be mistaken for at least three neighboring themes.
- Schedule and Contact are not both generic right-column cards.
- Fan CTA and business Contact are visually separated.
- The mock keeps the same semantic sections required by implementation: `hero`, `profile`, `schedule`, `archive`, `community`, `contact`.
- Reduced-motion fallback would still leave the same information hierarchy visible.
