---
version: "alpha"
name: "Streamer B: Boss Room"
description: "RPGボス系VTuber向けの高密度公式サイト。玉座、暗金、ステータスUI、契約ブロックで配信導線と案件導線を分離する。"
colors:
  primary: "#d4af37"
  primary-deep: "#8a6d3b"
  surface: "#121212"
  surface-deep: "#050403"
  danger: "#8b1111"
  text: "#f7ead2"
  muted: "#a99b7b"
typography:
  display:
    fontFamily: "Cinzel, Noto Serif JP"
    fontSize: "clamp(3rem, 7vw, 6.5rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "0"
  heading:
    fontFamily: "Cinzel, Noto Serif JP"
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "0"
  body:
    fontFamily: "Noto Sans JP, system-ui"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: "0"
  label:
    fontFamily: "Inter, system-ui"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.08em"
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
  side-rail:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
    padding: "24px"
  raid-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
    padding: "22px"
  contract-cta:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "16px 22px"
---

## Overview

Boss Room は「支配者の配信管理室」。ユーザーが first viewport で、キャラクターの格、次回配信、フォロー導線、案件相談を同時に理解できることを最優先にする。

一般的なゲーム風 LP ではなく、画面全体を boss command panel として設計する。左 rail、中央 throne、右 raid panel、下部 status/contact の非対称構成を守る。

## Colors

暗黒背景に金を載せるだけだと安く見えるため、金は主役線と見出しに限定する。赤は `Contract` と `Live` の緊急性だけに使い、通常のファン導線とは混ぜない。

## Typography

キャラ名と章タイトルはセリフ体で重厚にする。配信日時、CTA、schedule は UI として読ませるため sans-serif を使う。本文に装飾フォントを使わない。

## Layout

PC は 12-column grid ではなく、モック準拠の command room layout を使う。

- 左: crest / nav / challenge note
- 中央: throne visual / streamer name / role tags
- 右: live status / next raid / schedule
- 下部: boss status / follow / contract

SP は side rail を top compact nav に畳み、順序を `name -> live -> next stream -> follow -> contact -> schedule` に変える。

## Layout Contract

- Page model: 公式サイト型LP。トップ1ページで完結し、必要なら schedule / profile / contact を下層化できる構造にする。
- Header type: PC は left side rail / command room nav。通常の top fixed header は使わない。SP は top compact header + bottom CTA。
- Layout mode: world-in-UI。PC は boss command room の中に nav / status / schedule / contract を埋め込み、SP は情報カードへ分解する。
- PC composition: left crest rail、center throne visual、right Next Raid / schedule、lower Boss Status / Follow / Contract。
- Information placement: left crest/nav/challenge note, center throne identity, right live status/next raid/schedule, bottom boss status/follow/contract.
- Avoid shared layout: do not use generic hero-left/cards-right composition, balanced two-column card grid, normal top nav, or Quest Log parchment layout.
- Implementation hint: side rail、throne frame、HP/status bar、raid card、contract CTA を別形状の component として扱う。

## Elevation & Depth

金枠、革、石、赤布の質感は CSS だけで描かず、必要な部分だけ透過 WebP / SVG frame として素材化する。カードは立体化しすぎず、線、影、背景差で奥行きを作る。

## Components

- `BossSideRail`: crest、nav、challenge note
- `ThroneHero`: 背景/キャラ領域、名前、tag
- `NextRaidPanel`: 次回配信、サムネイル、日時、CTA
- `BossStatusPanel`: HP bar、status stats、follow buttons
- `ContractPanel`: 案件/コラボ相談専用 CTA

## Effects

標準演出は `status pulse`、`HP bar fill`、`panel reveal` まで。実装は CSS transitions/animations と vanilla JavaScript を優先する。GSAP は CSS だけだと brittle になる短い Phase 3 signature motion に限り許可する。

常時粒子、canvas、Three.js、scroll hijacking、heavy animation libraries は使わない。金枠の微発光は hover / active の短い変化に限定する。`prefers-reduced-motion` では移動、点滅、ループを止めても、throne identity、Next Raid、Follow、Contract CTA が成立する。

## Do's And Don'ts

Do:

- 玉座、紋章、HP bar、契約書の形状を再現する。
- fan action と business contact を視覚的に分ける。
- schedule の日付と時間を最優先で読ませる。

Don't:

- 汎用ネオンやサイバー背景に逃げない。
- 全カードを同じ矩形・同じ右積みにしない。
- グローで文字や CTA を読みにくくしない。
