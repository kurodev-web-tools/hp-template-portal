# Streamer B Decision Sheet

## Purpose
- This sheet captures the remaining decisions that should ideally be fixed before implementing `streamer/b`
- It is intentionally narrow: only the decisions that materially affect structure, copy, and scope

## Status Rule
- `Fixed` means the implementation can assume it without reopening the question
- `Tentative` means it is a working assumption and may still change

## 1. Dummy Streamer Identity
- Status:
  - `Tentative`
- Needs to be fixed:
  - Display name
  - Title
  - One-line world statement
  - Core personality summary
  - Core stream promise
- Why it matters:
  - Hero, profile, CTA copy, and schedule tone all depend on this

## 2. Dominance Metrics Set
- Status:
  - `Tentative`
- Recommended count:
  - `3 to 4`
- Needs to be fixed:
  - Metric labels
  - Realistic values
  - Which one is primary
- Why it matters:
  - The layout hierarchy depends on the lead metric and support metrics

## 3. Audience Access Window Scope
- Status:
  - `Tentative`
- Options:
  - `Next stream + weekly schedule`
  - `Next stream only`
- Recommended:
  - `Next stream + weekly schedule`
- Why it matters:
  - This directly changes the information density and section structure

## 4. Character Asset Assumption
- Status:
  - `Tentative`
- Options:
  - `Single still image`
  - `2 to 3 still variations`
  - `Future transparent video-compatible structure`
- Recommended:
  - `2 to 3 still variations with future transparent-video compatibility`
- Why it matters:
  - Hero composition, profile framing, and transition logic all depend on this

## 5. WebGL Introduction Scope
- Status:
  - `Tentative`
- Options:
  - `No WebGL in first implementation`
  - `Hero-only WebGL in first implementation`
  - `WebGL-first implementation`
- Recommended:
  - `No WebGL in first implementation, with structure prepared for later hero-level enhancement`
- Why it matters:
  - This changes complexity, risk, and delivery speed

## 6. Copy Style Boundary
- Status:
  - `Tentative`
- Needs to be fixed:
  - How abstract the copy can be
  - How much world-language vs real streamer information should appear
- Recommended rule:
  - `World-flavored but reality-anchored`
- Why it matters:
  - Prevents the template from drifting into fashion-brand abstraction

## 7. Navigation Weight
- Status:
  - `Tentative`
- Recommended rule:
  - `Keep navigation light; do not depend on a heavy desktop side rail`
- Why it matters:
  - The Stitch mockup uses a strong side structure that should not dictate the production implementation

## Suggested Completion Order
- 1. Dummy streamer identity
- 2. Metrics set
- 3. Access window scope
- 4. Character asset assumption
- 5. WebGL introduction scope
- 6. Copy style boundary
- 7. Navigation weight
