import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const detailRoot = path.join(root, 'docs', 'template-renewal-details', 'streamer');
const outputRoot = path.join(detailRoot, 'mock-prompts');
const { PORTAL_DATA } = await import(pathToFileURL(path.join(root, 'public', 'assets', 'js', 'data.js')).href);

const today = '2026-05-03';

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function normalize(value) {
  return String(value || '').trim();
}

function extractLine(content, label) {
  const pattern = new RegExp(`^- ${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*(.+)$`, 'm');
  return normalize(content.match(pattern)?.[1]);
}

function extractSection(content, heading) {
  const marker = `## ${heading}`;
  const start = content.indexOf(marker);
  if (start === -1) return '';
  const sectionStart = content.indexOf('\n', start);
  if (sectionStart === -1) return '';
  const rest = content.slice(sectionStart + 1);
  const nextHeading = rest.indexOf('\n## ');
  return normalize(nextHeading === -1 ? rest : rest.slice(0, nextHeading));
}

async function listMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'mock-prompts') continue;
      files.push(...await listMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function degreeFromDetailPath(filePath) {
  return path.basename(path.dirname(filePath));
}

function typographyFor(theme, features = []) {
  const keywords = `${theme} ${features.join(' ')}`.toLowerCase();
  if (keywords.includes('pixel') || keywords.includes('8-bit')) {
    return {
      h1: 'Press Start 2P or DotGothic16, 40px, 700, line-height 1.15',
      body: 'Noto Sans JP, 15px, 500, line-height 1.7',
      label: 'DotGothic16, 12px, 700, uppercase tracking 0.04em',
    };
  }
  if (keywords.includes('jazz') || keywords.includes('lounge') || keywords.includes('boss') || keywords.includes('horror')) {
    return {
      h1: 'Cinzel or Noto Serif JP, 64px, 700, line-height 1.05',
      body: 'Noto Sans JP, 16px, 500, line-height 1.7',
      label: 'Inter, 12px, 700, uppercase tracking 0.06em',
    };
  }
  return {
    h1: 'Inter or Noto Sans JP, 64px, 800, line-height 1.02',
    body: 'Noto Sans JP, 16px, 500, line-height 1.7',
    label: 'Inter, 12px, 700, uppercase tracking 0.06em',
  };
}

function imageryFor(theme, visualHook, audience) {
  const lower = `${theme} ${visualHook} ${audience}`.toLowerCase();
  if (lower.includes('horror')) return '暗い館内、窓の薄明かり、赤いLive badge、読める範囲の霧。怖さより配信導線の可読性を優先。';
  if (lower.includes('idol')) return 'ステージ照明、ピンク/白のスポットライト、ファンライト、配信予定カード。きらめきはHero周辺に限定。';
  if (lower.includes('pixel') || lower.includes('retro')) return 'ドットUI、セーブスロット、カセット風カード、8-bit frame。本文は読みやすい通常フォントも併用。';
  if (lower.includes('boss') || lower.includes('rpg')) return '玉座、HPバー、ステータスカード、暗金の重厚感。ファン向け導線と案件導線を明確に分離。';
  if (lower.includes('space') || lower.includes('orbit')) return '星図、軌道線、ミッションカード、深い宇宙背景。情報カードは高コントラストにする。';
  if (lower.includes('cyber') || lower.includes('glitch') || lower.includes('tech')) return 'HUD、scan line、端末UI、ネオンアクセント。グリッチはHeroの装飾に限定し、文字を壊さない。';
  if (lower.includes('zen') || lower.includes('brush')) return '筆跡、余白、和紙に近い静かな背景、落ち着いた配信予定カード。';
  return 'キャラクター立ち絵がなくても成立するよう、ロゴ、シルエット、配信UI、背景レイヤーで世界観を作る。';
}

function buildPrompt(template, detailPath, detailContent) {
  const theme = template.themeLabel || template.name;
  const degree = degreeFromDetailPath(detailPath);
  const colors = template.colors || [];
  const features = template.features || [];
  const typography = typographyFor(theme, features);
  const audience = extractLine(detailContent, 'Target audience');
  const conversion = extractLine(detailContent, 'Conversion goal');
  const renewalDepth = extractLine(detailContent, 'Strategic renewal depth');
  const effectLevel = extractLine(detailContent, 'Motion / effect level');
  const pageModel = extractLine(detailContent, 'Page model');
  const header = extractLine(detailContent, 'Header position');
  const layoutMode = extractLine(detailContent, 'Layout mode');
  const mockPriority = extractLine(detailContent, 'Mock priority');
  const visualDirection = extractLine(detailContent, 'Visual direction');
  const visualSystem = extractSection(detailContent, 'Visual System');
  const firstViewport = extractSection(detailContent, 'First Viewport Blueprint');
  const motionDetail = extractSection(detailContent, 'Motion Detail');
  const avoid = extractSection(detailContent, 'Avoid');
  const imagery = imageryFor(theme, visualDirection, audience);
  const sourceDetail = path.relative(root, detailPath).replaceAll('\\', '/');

  return `# Streamer ${template.tag}: ${theme} Mock Prompt

## Purpose
- このファイルは streamer/${template.tag.toLowerCase()} の first viewport mock 画像を作るためのプロンプト。
- \`design.md\` 形式の考え方に合わせ、YAML design tokens + human-readable rationale + image prompt に分ける。
- Source detail: \`${sourceDetail}\`
- Generated: ${today}

## DESIGN.md Tokens
\`\`\`yaml
---
version: "alpha"
name: "Streamer ${template.tag}: ${theme}"
description: "${audience}向けの公式サイト first viewport mock。${conversion}へつなぐ。"
colors:
  primary: "${colors[0] || '#bc13fe'}"
  secondary: "${colors[1] || '#111827'}"
  surface: "${colors[2] || '#05050a'}"
  on-surface: "#ffffff"
  muted: "#a1a1aa"
typography:
  h1:
    fontFamily: "${typography.h1.split(',')[0]}"
    fontSize: "${typography.h1.split(',')[1]?.trim() || '64px'}"
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
\`\`\`

## Overview
- Target audience: ${audience}
- Conversion goal: ${conversion}
- Renewal depth: ${renewalDepth}
- Motion / effect level: ${effectLevel}
- Page model: ${pageModel}
- Header position: ${header}
- Layout mode: ${layoutMode}
- Mock priority: ${mockPriority}

## Colors
- Primary: \`${colors[0] || '#bc13fe'}\` を世界観の主役色、Live状態、重要アクセントに使う。
- Secondary: \`${colors[1] || '#111827'}\` をUI枠、背景レイヤー、補助アクセントに使う。
- Surface: \`${colors[2] || '#05050a'}\` を背景/カード面に使う。
- CTA色と装飾色を混ぜない。Live / Schedule / Follow / Contact は色だけでなくラベルで区別する。

## Typography
- H1: ${typography.h1}
- Body: ${typography.body}
- Label: ${typography.label}
- キャラ名は大きく、配信日時とCTAはUIとして読みやすくする。装飾フォントを本文に使わない。

## Layout
${firstViewport}

## Elevation & Depth
- 背景は最大3レイヤーまで。主役ビジュアル、UIカード、CTAが重ならないようにする。
- Cards: 8px radius を基本にし、過剰な角丸カード感を避ける。
- Shadow / glow はHeroの主役周辺に限定し、常時広範囲にかけない。

## Shapes
- テーマに合わせた装飾形状を1種類だけ使う。HUD、HP bar、orbit line、stage light、brush strokeなど。
- CTAとScheduleは標準的な矩形UIにして、クリック可能領域が分かるようにする。

## Components
${visualSystem}

## Motion Notes
${motionDetail}

## Do's and Don'ts
### Do
- first viewportだけで「誰のサイトか」「次に何を見るか」「どこからフォロー/案件相談するか」が分かる。
- Live / Schedule / Follow / Contact を4アクション以内に整理する。
- IRIAMライバー / VTuber向けに、lit.linkより世界観があり、公式サイトより軽く見えるバランスにする。
- キャラクター立ち絵が無い場合でも、シルエット、ロゴ、配信UI、背景レイヤーで成立させる。

### Don't
${avoid}
- 実装不能な細部、判読不能な小文字、意味のない長文ダミーテキストを入れない。

## Mock Image Prompt
Create a high-fidelity first viewport website mockup for a Japanese streamer / VTuber official profile site.

Theme: "${theme}".
Audience: ${audience}.
Visual direction: ${visualDirection}.
Imagery direction: ${imagery}

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
- The visual identity matches "${theme}" and still feels like a usable website.
- CTA and schedule are readable at thumbnail size.
- Fan actions and business contact are not mixed.
- The mock can be implemented in Phase 1 without requiring motion, 3D, particles, or heavy canvas.
`;
}

const detailFiles = await listMarkdownFiles(detailRoot);
const detailByTag = new Map();
for (const file of detailFiles) {
  const name = path.basename(file);
  const tag = name.match(/^([a-z])-.*\.md$/i)?.[1]?.toUpperCase();
  if (tag) detailByTag.set(tag, file);
}

const resolvedOutputRoot = path.resolve(outputRoot);
if (!resolvedOutputRoot.endsWith(`${path.sep}docs${path.sep}template-renewal-details${path.sep}streamer${path.sep}mock-prompts`)) {
  throw new Error(`Refusing to clear unexpected output directory: ${resolvedOutputRoot}`);
}

await fs.rm(outputRoot, { recursive: true, force: true });

let count = 0;
for (const template of PORTAL_DATA.templates.streamer) {
  const detailPath = detailByTag.get(template.tag);
  if (!detailPath) {
    throw new Error(`Missing streamer detail md for tag ${template.tag}`);
  }
  const detailContent = await fs.readFile(detailPath, 'utf8');
  const degree = degreeFromDetailPath(detailPath);
  const outputDir = path.join(outputRoot, degree);
  await fs.mkdir(outputDir, { recursive: true });
  const theme = template.themeLabel || template.name;
  const fileName = `${template.tag.toLowerCase()}-${slugify(theme)}-mock-prompt.md`;
  await fs.writeFile(path.join(outputDir, fileName), buildPrompt(template, detailPath, detailContent), 'utf8');
  count += 1;
}

const readme = `# Streamer Mock Prompts

## Purpose
- streamer 26テンプレートの first viewport mock 作成用プロンプトを管理する。
- 各プロンプトは DESIGN.md の考え方に合わせ、design tokens、視覚方針、画像生成プロンプト、negative prompt、review checklist を含む。
- business 実装中に裏で streamer mock を作るための入力として使う。

## Structure
- \`full-renewal/\`: フルリニューアル分類の streamer mock prompts
- \`partial-renewal/\`: partial分類だが、戦略上は high renewal として扱う streamer mock prompts
- \`polish/\`: polish分類だが、戦略上は high renewal として扱う streamer mock prompts

## Source
- Template data: \`public/assets/js/data.js\`
- Renewal details: \`docs/template-renewal-details/streamer/**/*.md\`
- Generator: \`scripts/generate-streamer-mock-prompts.mjs\`
- DESIGN.md reference: https://github.com/google-labs-code/design.md

## Usage
1. 対象テンプレートの prompt md を開く。
2. \`Mock Image Prompt\` と \`Negative Prompt\` を画像生成ツールへ渡す。
3. 生成後、\`Mock Review Checklist\` でFV、CTA、配信導線、案件導線を確認する。
4. 採用するモックは、該当テンプレートの renewal detail md と矛盾しないようにする。
`;

await fs.writeFile(path.join(outputRoot, 'README.md'), readme, 'utf8');

console.log(`Generated ${count} streamer mock prompt files under ${path.relative(root, outputRoot)}`);
