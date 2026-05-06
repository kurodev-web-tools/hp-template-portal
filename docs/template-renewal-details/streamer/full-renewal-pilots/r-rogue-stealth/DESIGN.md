---
version: "alpha"
name: "Streamer R: Rogue Stealth"
description: "ステルス/スパイ系向けの公式サイト first viewport mock。配信予定、秘密任務風企画、SNSへつなぐ。"
colors:
  primary: "#991b1b"
  secondary: "#000000"
  surface: "#1a1a1a"
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

## Overview

Rogue Stealth は ステルス/スパイ系 向けの配信者公式サイト。Conversion goal は 配信予定、秘密任務風企画、SNS。モックの first viewport を基準に、テーマ固有のレイアウト、装飾、カード形状、CTA 位置を販売用テンプレート品質で再現する。

High。フォルダ分類に関わらず、販売用テンプレートとしては全件フルリニューアル相当で扱う。

Page model は 公式サイト型LP。トップ1ページで完結し、必要なら schedule / profile / contact を下層化できる構造にする。 Header position は PCはside railまたはworld-in-UI header。SPはtop compact header + sticky CTA。 Layout mode は world-in-UI。PCはテーマ世界の中にナビ/配信予定/CTAを埋め込み、SPは情報カードへ分解する。

## Colors

- Primary: `#991b1b` を世界観の主役色、Live状態、重要アクセントに使う。
- Secondary: `#000000` をUI枠、背景レイヤー、補助アクセントに使う。
- Surface: `#1a1a1a` を背景/カード面に使う。
- CTA色と装飾色を混ぜない。Live / Schedule / Follow / Contact は色だけでなくラベルで区別する。

## Typography

- H1: Inter or Noto Sans JP, 64px, 800, line-height 1.02
- Body: Noto Sans JP, 16px, 500, line-height 1.7
- Label: Inter, 12px, 700, uppercase tracking 0.06em
- キャラ名は大きく、配信日時とCTAはUIとして読みやすくする。装飾フォントを本文に使わない。

## Layout

- PC composition: 潜入任務のdossierとして構成する。左にmission nav、中央にmasked hero/dossier、右にencrypted schedule、下部にsecure drop Contactを置く。
- Header: top navではなく、ミッション番号/暗号タブとして扱う。SPはtop compact header + sticky CTA。
- Hero copy: キャラ名はコードネームとして置き、活動内容はmission objectiveに分ける。
- Visual hook: ステルスHUD、暗号、潜入マップ。情報は暗く絞るがCTAは明確にする。
- Primary actions: Start Mission、Schedule、Follow、Secure Contactを整理する。Contactは安全な投函口として分離する。

### Layout Signature

- Archetype: stealth mission dossier
- Density: medium density with dark tactical focus.
- Information placement: left mission nav, center masked hero/dossier, right encrypted schedule, bottom secure drop Contact.
- Avoid shared layout: do not use generic hero-left/cards-right composition, balanced two-column card grid, or identical right-side stacked cards.
- Implementation hint: tactical grid, dossier cards, map overlays, dark panels, and high-contrast CTA.

## Elevation & Depth

- 背景は最大3レイヤーまで。主役ビジュアル、UIカード、CTAが重ならないようにする。
- Cards: 8px radius を基本にし、過剰な角丸カード感を避ける。
- Shadow / glow はHeroの主役周辺に限定し、常時広範囲にかけない。

## Components

- Color system: #991b1b, #000000, #1a1a1a を主役色、CTA色、背景演出色に分ける。Live/Follow/Contact は色だけでなくラベルでも区別する。
- Typography: キャラ名は大きく、配信日時とCTAは読みやすいUI文字にする。装飾フォントを本文に使わない。
- Imagery: キャラクター立ち絵が無い場合でも成立するよう、シルエット、ロゴ、配信UI、背景レイヤーで代替できる設計にする。
- Components: Live badge、schedule card、clip card、platform button、business contact block。

Suggested template-local components:

- `DossierNav`
- `RogueHero`
- `MissionSchedule`
- `ShadowFollow`
- `SecureContact`

## Effects

標準演出は `dossier scan`、`mission card reveal`、`stealth signal pulse`。実装は CSS transitions/animations と vanilla JavaScript を優先する。GSAP は CSS だけだと brittle になる短い Phase 3 signature motion に限り許可する。

Three.js、canvas、particles、scroll hijacking、heavy animation libraries は使わない。`prefers-reduced-motion` では移動、点滅、ループを止めても、Hero、Schedule、Follow、Contact CTA が成立する。

## Do's And Don'ts

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
