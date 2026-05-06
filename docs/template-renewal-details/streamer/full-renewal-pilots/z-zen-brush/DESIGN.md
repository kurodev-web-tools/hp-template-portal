---
version: "alpha"
name: "Streamer Z: Zen Brush"
description: "和/書/落ち着いた配信者向けの静かな高品質公式サイト。和紙、墨、巻物、円相、朱印で配信導線と作品導線を見せる。"
colors:
  ink: "#171717"
  sumi: "#404040"
  paper: "#f3eadb"
  paper-deep: "#d6c4a8"
  seal: "#a53024"
  gold-muted: "#9b7a3e"
  text: "#201915"
  muted: "#756b5d"
typography:
  display:
    fontFamily: "Noto Serif JP, Yu Mincho, serif"
    fontSize: "clamp(3.5rem, 8vw, 8rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "0"
  heading:
    fontFamily: "Noto Serif JP, Yu Mincho, serif"
    fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0"
  body:
    fontFamily: "Noto Sans JP, system-ui"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.85
    letterSpacing: "0"
  label:
    fontFamily: "Inter, Noto Sans JP"
    fontSize: "0.75rem"
    fontWeight: 700
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
  lg: "36px"
  xl: "64px"
components:
  ink-nav:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "14px"
  scroll-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
    padding: "24px"
  seal-cta:
    backgroundColor: "{colors.seal}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "14px 20px"
---

## Overview

Zen Brush は「静かな和の配信者公式サイト」。派手さではなく、墨、余白、巻物、朱印の質で高品質に見せる。

モックの左上の墨垂れ、中央の大きな筆文字、下部の巻物 schedule、右下の contact 札を基本構造として扱う。密度を上げすぎず、余白そのものをデザイン価値にする。

## Colors

和紙の生成り、墨黒、朱印赤を中心にする。茶・金は補助線だけ。全体を beige 一色にせず、墨の黒と朱印で視線の着地点を作る。

## Typography

大見出しは書/明朝系を強く使う。本文と schedule は読みやすい sans-serif を使い、縦書き風ラベルは短い語だけに限定する。

## Layout

PC は zen brush scroll composition。

- 左: 墨垂れを含む minimal nav
- 中央: 大きな筆文字、円相、キャラクター/シルエット
- 右上: next stream seal
- 左下: schedule scroll
- 右下: contact seal / follow

SP は `name -> next stream -> schedule -> follow -> contact -> profile` の順にする。

## Elevation & Depth

和紙、墨飛沫、円相、巻物端、朱印は素材化する。CSS だけで無理に描かない。カードは影を薄くし、紙が重なっている程度にする。

## Components

- `InkNav`: 左側の墨ナビ
- `BrushHero`: 筆文字、円相、メインビジュアル
- `StreamSeal`: next stream の丸印情報
- `ScheduleScroll`: 巻物型 schedule
- `ContactSeal`: 朱印/札型 contact CTA

## Effects

標準演出は `ink drip reveal`、`scroll unfold`、`seal press`。実装は CSS transitions/animations、CSS mask/clip-path、template-local SVG/WebP、vanilla JavaScript を優先する。GSAP は CSS だけだと brittle になる短い Phase 3 signature motion に限り許可する。

Canvas、Three.js、particles、scroll hijacking、heavy animation libraries は使わない。`prefers-reduced-motion` では墨垂れ、巻物展開、朱印反応の移動/ループを止めても、Next Stream、Schedule Scroll、Contact CTA が成立する。

## Do's And Don'ts

Do:

- 墨垂れ、円相、巻物、朱印をモックの核として再現する。
- 静かな余白を残し、装飾を詰め込まない。
- schedule と contact は紙UIとして読める状態を保つ。

Don't:

- 和風素材を並べただけの汎用旅館サイトにしない。
- 全面 beige / brown で単調にしない。
- 墨演出で本文や CTA を隠さない。
