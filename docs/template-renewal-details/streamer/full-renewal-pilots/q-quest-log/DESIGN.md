---
version: "alpha"
name: "Streamer Q: Quest Log"
description: "RPG/企画配信者向けの冒険者ギルド型公式サイト。羊皮紙、依頼票、party schedule、guild contact で活動導線を整理する。"
colors:
  parchment: "#f5e6be"
  parchment-deep: "#c9a86a"
  ink: "#2b1d0e"
  leather: "#5d4037"
  guild-green: "#1f3b22"
  seal-red: "#9a2d1f"
  text: "#21150a"
  muted: "#6b5a43"
typography:
  display:
    fontFamily: "Noto Serif JP, Georgia"
    fontSize: "clamp(2.8rem, 5vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "0"
  heading:
    fontFamily: "Noto Serif JP, Georgia"
    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0"
  body:
    fontFamily: "Noto Sans JP, system-ui"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.75
    letterSpacing: "0"
  label:
    fontFamily: "Inter, system-ui"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  sm: "2px"
  md: "6px"
  panel: "8px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "56px"
components:
  quest-tab:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "14px 18px"
  active-quest:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
    padding: "28px"
  guild-contact:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.parchment}"
    rounded: "{rounded.md}"
    padding: "16px 22px"
---

## Overview

Quest Log は「冒険者ギルドの掲示板」。配信予定、参加企画、コミュニティ募集、案件相談を quest として読ませる。

Boss Room とは違い、威圧感ではなく参加したくなる冒険感を出す。密度は高くても、階層は `Active Quest -> Party Schedule -> Guild Contact` の順で明確にする。

## Colors

羊皮紙と木・革の暖色を基盤にする。重要 CTA は seal red または guild green に限定し、全体を茶色一色にしない。schedule の曜日タグは色だけでなく文字でも判別できるようにする。

## Typography

見出しは serif、日時と CTA は sans-serif。冒険書風に寄せるが、本文の可読性を犠牲にしない。

## Layout

PC は quest board grid を使う。

- 左: quest category tabs / rank
- 中央: active quest parchment hero
- 右: party schedule / party recruitment
- 下部: quest board teasers / follow banners / guild contact

SP は `active quest -> next stream -> party schedule -> recruitment/community -> contact` の順にする。

## Layout Contract

- Page model: 公式サイト型LP。トップ1ページで完結し、必要なら schedule / profile / contact を下層化できる構造にする。
- Header type: PC は left quest category tabs / guild board nav。通常の top fixed header は使わない。SP は top compact header + bottom CTA。
- Layout mode: activity board。PC は冒険者ギルド掲示板の中に nav / active quest / party schedule / guild contact を配置し、SP は quest の優先順に縦へ再編成する。
- PC composition: left quest category/rank、center Active Quest parchment、right Party Schedule / recruitment、bottom board teasers / Follow / Guild Contact。
- Information placement: left category tabs/rank, center active quest identity, right party schedule/recruitment, bottom quest teasers/follow/guild contact.
- Avoid shared layout: do not use Boss Room command rail, throne/status language, normal top nav, or flat rectangular card grid.
- Implementation hint: parchment hero、quest tabs、party rows、guild notice、seal CTA を別形状の component として扱う。

## Elevation & Depth

羊皮紙、木板、革ベルト、封蝋は素材化する。影は紙が重なっている程度に抑え、モックの「掲示板感」を保つ。

## Components

- `QuestMenu`: left category tabs
- `ActiveQuestHero`: hero parchment, streamer identity, live CTA
- `PartySchedule`: schedule rows, tags, all schedule link
- `PartyRecruitment`: community / collab / fan participation
- `GuildContact`: business contact notice

## Effects

標準演出は `quest card unfold`、`seal stamp`、`schedule row reveal`。実装は CSS transitions/animations と vanilla JavaScript を優先する。GSAP は CSS だけだと brittle になる短い Phase 3 signature motion に限り許可する。

紙の揺れ、粒子、canvas、Three.js、scroll hijacking、heavy animation libraries は使わない。`prefers-reduced-motion` では移動、点滅、ループを止めても、Active Quest、Party Schedule、Guild Contact CTA が成立する。

## Do's And Don'ts

Do:

- 羊皮紙、依頼票、party schedule、guild contact の役割を明確にする。
- 下層ページ化しやすい category tabs を残す。
- 参加企画と案件相談を分ける。

Don't:

- Boss Room の HP bar / throne / contract red を流用しない。
- 汎用ファンタジー背景だけで UI を作らない。
- 紙テクスチャで文字コントラストを落とさない。
