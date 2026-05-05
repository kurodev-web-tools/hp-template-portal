# Streamer E: E-Sports Pro Mock Prompt

## Purpose
- このファイルは streamer/e の first viewport mock 画像を作るためのプロンプト。
- `design.md` 形式の考え方に合わせ、YAML design tokens + human-readable rationale + image prompt に分ける。
- Source detail: `docs/template-renewal-details/streamer/partial-renewal/e-e-sports-pro.md`
- Generated: 2026-05-03

## DESIGN.md Tokens
```yaml
---
version: "alpha"
name: "Streamer E: E-Sports Pro"
description: "競技系配信者/チーム向けの公式サイト first viewport mock。大会実績、配信予定、スポンサー相談へつなぐ。"
colors:
  primary: "#0055ff"
  secondary: "#ffffff"
  surface: "#0a0e1a"
  on-surface: "#ffffff"
  muted: "#a1a1aa"
typography:
  h1:
    fontFamily: "Inter or Noto Sans JP"
    fontSize: "64px"
    fontWeight: 800
    lineHeight: 1.05
  body-md:
    fontFamily: "Noto Sans JP"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.7
  label-caps:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.06em"
rounded:
  sm: "4px"
  md: "8px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "56px"
components:
  live-badge:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  primary-cta:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "14px 18px"
  info-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "18px"
---
```

## Overview
- Target audience: 競技系配信者/チーム
- Conversion goal: 大会実績、配信予定、スポンサー相談
- Renewal depth: High。フォルダ分類に関わらず、販売用テンプレートとしては全件フルリニューアル相当で扱う。
- Motion / effect level: High
- Page model: 公式サイト型LP。トップ1ページで完結し、必要なら schedule / profile / contact を下層化できる構造にする。
- Header position: PCはtop fixed header。SPはtop compact header + bottom CTA。
- Layout mode: LP single page + activity hub。PCはHeroと配信情報を横並びにし、SPはLive/SNS/Contactを短く積む。
- Mock priority: 必須。全 streamer は first viewport mock を作り、キャラ性、配信導線、案件導線が同時に読めるか確認する。

## Colors
- Primary: `#0055ff` を世界観の主役色、Live状態、重要アクセントに使う。
- Secondary: `#ffffff` をUI枠、背景レイヤー、補助アクセントに使う。
- Surface: `#0a0e1a` を背景/カード面に使う。
- CTA色と装飾色を混ぜない。Live / Schedule / Follow / Contact は色だけでなくラベルで区別する。

## Typography
- H1: Inter or Noto Sans JP, 64px, 800, line-height 1.02
- Body: Noto Sans JP, 16px, 500, line-height 1.7
- Label: Inter, 12px, 700, uppercase tracking 0.06em
- キャラ名は大きく、配信日時とCTAはUIとして読みやすくする。装飾フォントを本文に使わない。

## Layout
- PC composition: eスポーツ大会配信のbroadcast roomとして構成する。上部にscoreboard header、中央にmatch/map hero、左にroster/platform、右にNext Match bracket、下部にsponsor/contact stripを置く。
- Header: 通常ナビではなく、試合スコアボードや大会HUDとして見せる。SPはtop compact header + bottom CTA。
- Hero copy: キャラ名はチームタグ/プレイヤーカードとして置き、配信ジャンルはmatch labelで示す。
- Visual hook: スコア、ブラケット、キルログ風Schedule。ただし文字は壊さず読みやすくする。
- Primary actions: Watch Live、Schedule、Follow、Scrim/Contactを整理する。企業/案件導線はsponsor/contactとして分離する。

## Layout Signature
- Archetype: e-sports broadcast match room
- Density: high density, broadcast-like, with clear match hierarchy.
- Information placement: top scoreboard header, center match/map hero, left roster/platform panel, right Next Match bracket, bottom sponsor/contact strip.
- Avoid shared layout: do not use generic hero-left/cards-right composition, balanced two-column card grid, or identical right-side stacked cards.
- Implementation hint: scoreboard header, bracket grid, stat cards, platform buttons, and separated sponsor/contact area.

## Elevation & Depth
- 背景は最大3レイヤーまで。主役ビジュアル、UIカード、CTAが重ならないようにする。
- Cards: 8px radius を基本にし、過剰な角丸カード感を避ける。
- Shadow / glow はHeroの主役周辺に限定し、常時広範囲にかけない。

## Shapes
- テーマに合わせた装飾形状を1種類だけ使う。HUD、HP bar、orbit line、stage light、brush strokeなど。
- CTAとScheduleは標準的な矩形UIにして、クリック可能領域が分かるようにする。

## Components
- Color system: #0055ff, #ffffff, #0a0e1a を主役色、CTA色、背景演出色に分ける。Live/Follow/Contact は色だけでなくラベルでも区別する。
- Typography: キャラ名は大きく、配信日時とCTAは読みやすいUI文字にする。装飾フォントを本文に使わない。
- Imagery: キャラクター立ち絵が無い場合でも成立するよう、シルエット、ロゴ、配信UI、背景レイヤーで代替できる設計にする。
- Components: Live badge、schedule card、clip card、platform button、business contact block。

## Motion Notes
- Effect level: High
- Reduced motion: `prefers-reduced-motion` では移動/点滅/連続ループを止め、opacity変化程度にする。
- Performance budget: transform / opacity 中心。常時動く blur、広範囲 backdrop-filter、多重 shadow、重い canvas は避ける。
- Signature motion: E-Sports Pro の世界観をHeroに1つだけ置く。例: status pulse、schedule reveal、UI scan、背景レイヤーの緩い移動。
- Interaction: SNS/配信カードのhoverは短く、クリック可能領域を明確にする。
- Upper limit: パーティクルやグリッチは主役にしない。Live状態とCTAが最初に読めることを優先する。

## Do's and Don'ts
### Do
- first viewportだけで「誰のサイトか」「次に何を見るか」「どこからフォロー/案件相談するか」が分かる。
- Live / Schedule / Follow / Contact を4アクション以内に整理する。
- IRIAMライバー / VTuber向けに、lit.linkより世界観があり、公式サイトより軽く見えるバランスにする。
- キャラクター立ち絵が無い場合でも、シルエット、ロゴ、配信UI、背景レイヤーで成立させる。

### Don't
- 世界観説明だけで、次回配信/SNS/案件相談が見えない。
- グリッチ、点滅、パーティクルが多く、文字とCTAが読みにくい。
- ファン向け導線と企業向け問い合わせが同じCTAに混ざっている。
- PC演出をSPへそのまま縮小して、配信予定が下に埋もれる。
- 実装不能な細部、判読不能な小文字、意味のない長文ダミーテキストを入れない。

## Mock Image Prompt
Create a high-fidelity first viewport website mockup for a Japanese streamer / VTuber official profile site.

Theme: "E-Sports Pro".
Audience: 競技系配信者/チーム.
Visual direction: 大会UI、白青、成績カード.
Imagery direction: 大会配信HUD、スコアボード、ブラケット、チームカード、マッチ開始パネル。案件導線はscrim/contactとして分ける。

Canvas: desktop first viewport, 16:9, 1440x900, no browser chrome, no device frame.
Composition: use the E-Sports Pro layout signature exactly. Make the first viewport feel like an e-sports broadcast match room with a top scoreboard, center match hero, right bracket/Next Match panel, left roster/platform panel, and bottom sponsor/contact strip.
Text: keep text short and legible. Use labels such as "LIVE", "Schedule", "Follow", "Contact", "Next Stream", and a short Japanese streamer name. Do not fill the design with long unreadable paragraphs.
Style: polished production website mock, not a landing page explanation, not a generic gaming poster. The result should feel like a template that an IRIAMライバー or VTuber could immediately imagine using.
CTA: show one primary CTA and two to three secondary actions. Business contact must be visually separate from fan/community actions.
Accessibility: high contrast for schedule and CTA text. Avoid hiding text behind effects.

## Negative Prompt
- No generic stock cyber background without website UI.
- No poster-only composition.
- No unreadable tiny paragraphs.
- No excessive glitch, particles, smoke, blur, or neon bloom over CTA text.
- No fantasy RPG layout, no pastel floating cards, no generic streamer profile dashboard, no identical right-side card stack.
- No browser chrome, phone frame, watermark, social media screenshot, or app store badge.
- No unrelated corporate business site tone.

## Mock Review Checklist
- First viewport contains theme, streamer identity, Live/Schedule, Follow, Contact.
- The visual identity matches "E-Sports Pro" and still feels like a usable website.
- CTA and schedule are readable at thumbnail size.
- Fan actions and business contact are not mixed.
- The mock can be implemented in Phase 1 without requiring motion, 3D, particles, or heavy canvas.
