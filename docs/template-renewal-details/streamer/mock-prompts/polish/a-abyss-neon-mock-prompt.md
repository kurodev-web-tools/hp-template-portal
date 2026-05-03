# Streamer A: Abyss Neon Mock Prompt

## Purpose
- このファイルは streamer/a の first viewport mock 画像を作るためのプロンプト。
- `design.md` 形式の考え方に合わせ、YAML design tokens + human-readable rationale + image prompt に分ける。
- Source detail: `docs/template-renewal-details/streamer/polish/a-abyss-neon.md`
- Generated: 2026-05-03

## DESIGN.md Tokens
```yaml
---
version: "alpha"
name: "Streamer A: Abyss Neon"
description: "深海サイバー配信者向けの公式サイト first viewport mock。Live通知、YouTube/Twitch、案件相談へつなぐ。"
colors:
  primary: "#00f2ff"
  secondary: "#ff0055"
  surface: "#05050a"
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
- Target audience: 深海サイバー配信者
- Conversion goal: Live通知、YouTube/Twitch、案件相談
- Renewal depth: High。フォルダ分類に関わらず、販売用テンプレートとしては全件フルリニューアル相当で扱う。
- Motion / effect level: Medium-High
- Page model: 公式サイト型LP。トップ1ページで完結し、必要なら schedule / profile / contact を下層化できる構造にする。
- Header position: PCはtop fixed header。SPはtop compact header + bottom CTA。
- Layout mode: LP single page + activity hub。PCはHeroと配信情報を横並びにし、SPはLive/SNS/Contactを短く積む。
- Mock priority: 必須。全 streamer は first viewport mock を作り、キャラ性、配信導線、案件導線が同時に読めるか確認する。

## Colors
- Primary: `#00f2ff` を世界観の主役色、Live状態、重要アクセントに使う。
- Secondary: `#ff0055` をUI枠、背景レイヤー、補助アクセントに使う。
- Surface: `#05050a` を背景/カード面に使う。
- CTA色と装飾色を混ぜない。Live / Schedule / Follow / Contact は色だけでなくラベルで区別する。

## Typography
- H1: Inter or Noto Sans JP, 64px, 800, line-height 1.02
- Body: Noto Sans JP, 16px, 500, line-height 1.7
- Label: Inter, 12px, 700, uppercase tracking 0.06em
- キャラ名は大きく、配信日時とCTAはUIとして読みやすくする。装飾フォントを本文に使わない。

## Layout
- PC composition: 左または中央にキャラクター/世界観の主役、反対側に「次回配信」「最新アーカイブ」「SNS」「案件相談」をまとめる。
- Header: PCはtop fixed header。SPはtop compact header + bottom CTA。
- Hero copy: キャラ名、配信ジャンル、初見向けの一言、活動プラットフォームを1画面内に入れる。
- Visual hook: 深度メーター型ナビ、青/ピンクのネオン、配信状態カード。ただしCTAと配信予定の可読性を最優先にする。
- Primary actions: Live / Schedule / Follow / Contact を4つ以内に整理する。
- SP order: キャラ名、Live状態、次回配信、SNS、案件相談の順に出す。

## Elevation & Depth
- 背景は最大3レイヤーまで。主役ビジュアル、UIカード、CTAが重ならないようにする。
- Cards: 8px radius を基本にし、過剰な角丸カード感を避ける。
- Shadow / glow はHeroの主役周辺に限定し、常時広範囲にかけない。

## Shapes
- テーマに合わせた装飾形状を1種類だけ使う。HUD、HP bar、orbit line、stage light、brush strokeなど。
- CTAとScheduleは標準的な矩形UIにして、クリック可能領域が分かるようにする。

## Components
- Color system: #00f2ff, #ff0055, #05050a を主役色、CTA色、背景演出色に分ける。Live/Follow/Contact は色だけでなくラベルでも区別する。
- Typography: キャラ名は大きく、配信日時とCTAは読みやすいUI文字にする。装飾フォントを本文に使わない。
- Imagery: キャラクター立ち絵が無い場合でも成立するよう、シルエット、ロゴ、配信UI、背景レイヤーで代替できる設計にする。
- Components: Live badge、schedule card、clip card、platform button、business contact block。

## Motion Notes
- Effect level: Medium-High
- Reduced motion: `prefers-reduced-motion` では移動/点滅/連続ループを止め、opacity変化程度にする。
- Performance budget: transform / opacity 中心。常時動く blur、広範囲 backdrop-filter、多重 shadow、重い canvas は避ける。
- Signature motion: Abyss Neon の世界観をHeroに1つだけ置く。例: status pulse、schedule reveal、UI scan、背景レイヤーの緩い移動。
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

Theme: "Abyss Neon".
Audience: 深海サイバー配信者.
Visual direction: 深度メーター型ナビ、青/ピンクのネオン、配信状態カード.
Imagery direction: キャラクター立ち絵がなくても成立するよう、ロゴ、シルエット、配信UI、背景レイヤーで世界観を作る。

Canvas: desktop first viewport, 16:9, 1440x900, no browser chrome, no device frame.
Composition: use the Layout section above exactly. The mock must include a compact header, hero title area, live/status card, next schedule card, SNS/follow actions, and business contact action in the first viewport.
Text: keep text short and legible. Use labels such as "LIVE", "Schedule", "Follow", "Contact", "Next Stream", and a short Japanese streamer name. Do not fill the design with long unreadable paragraphs.
Style: polished production website mock, not a landing page explanation, not a generic gaming poster. The result should feel like a template that an IRIAMライバー or VTuber could immediately imagine using.
CTA: show one primary CTA and two to three secondary actions. Business contact must be visually separate from fan/community actions.
Accessibility: high contrast for schedule and CTA text. Avoid hiding text behind effects.

## Negative Prompt
- No generic stock cyber background without website UI.
- No poster-only composition.
- No unreadable tiny paragraphs.
- No excessive glitch, particles, smoke, blur, or neon bloom over CTA text.
- No browser chrome, phone frame, watermark, social media screenshot, or app store badge.
- No unrelated corporate business site tone.

## Mock Review Checklist
- First viewport contains theme, streamer identity, Live/Schedule, Follow, Contact.
- The visual identity matches "Abyss Neon" and still feels like a usable website.
- CTA and schedule are readable at thumbnail size.
- Fan actions and business contact are not mixed.
- The mock can be implemented in Phase 1 without requiring motion, 3D, particles, or heavy canvas.
