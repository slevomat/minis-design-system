---
id: 028
title: Icons — one path from the Figma library to the production webfonts
status: draft
created: 2026-11-13
updated: 2026-11-13
owner: Lexislav
---

# 028 — Icons: one path from the Figma library to the production webfonts

> **Gap G10 in plan 003, turned into a plan** (2026-11-13). Rollout phase 5 ("Expansion", from
> March 2027). Also defines the icon path the contribution skill (005) follows.

## Context

- **Source of truth:** the **Slevomat Icons** Figma library (Icons 2.0, file
  `lZsWlkVSBRTlpI2vKpnAXT`, page `2:4`), grouped by section: 24 × 24 grid, 20 px live area, one
  fill.
- **Mini*S:** `@minis/icons` serves 287 icons as SVG through `<minis-icon>`, plus 25 deprecated
  aliases (`packages/icons/src/registry.ts`, `docs/ai-prompts/components/icon.md`). The section
  `Icon/figma-only/*` (51 icons: plus, minus, outline variants, login/sign-out…) is drawn in Figma
  but **not in the production webfont**.
- **Production:** four IcoMoon webfonts (frontend, admins, offline, travel), with their IcoMoon
  selection files in `doc/font/selection-slevomat-*.json` and further selections in `doc/icons/`.
  The Stylus side is `_fonts-slevomat-*.styl`; the styleguide shows each font's demo page, and
  BackstopJS covers them. The fonts are maintained by the lead developer (recent commits "Bike icon
  in da set", "new icons for benefits").

The brief's icon path (proposal): search first, draw in Figma by the library's rules, export to
the repo, and **get it into the webfont**, or it stays only in Figma and Mini*S. Nobody owns that
last step.

## The problem

- **Icons drawn for Mini*S don't reach production.** 51 today; every new one adds to the gap.
- **Two name lists:** Figma/Mini*S names vs webfont glyph names. The mapping lives in prose
  (`icon.md`).
- **The webfont update is manual** (IcoMoon import of SVGs, export, commit), so it waits for one
  person.

## Constraints

- **Figma is the source**; the repo and the webfonts are outputs.
- **Production's format stays** until its team decides otherwise (webfonts, IcoMoon) (plan 020).
- **Names don't change silently**: a renamed icon gets a deprecated alias (as in
  `registry.ts`).
- **No proprietary fonts or third-party icon sets** enter this repo beyond what's licensed.

## Approach

1. **One icon list with both names:** each icon's Figma name, Mini*S name, and webfont + glyph
   name (or "missing"). Generated from `registry.ts` and the IcoMoon selection files; becomes part
   of the registry (013 question 2).
2. **A hand-over pack per batch** for production: the SVGs of missing icons, prepared to IcoMoon's
   import rules, plus the target font. The lead developer imports and regenerates the font, as
   today, but from a ready list.
3. **Later, a script** that adds glyphs to the selection JSON directly, if production wants it.
4. **The contribution path for icons** in plan 005: search the list → draw in Figma → export to
   `@minis/icons` → add to the hand-over pack.

**Rejected:**

- **Replacing webfonts with inline SVG in production now.** Possibly better (accessibility,
  colour), but a production architecture decision, not a Mini*S one. Listed as an open question.
- **Copying production's webfonts into Mini*S.** The SVGs are the source; the fonts are
  production's output.

## Phases

- [ ] **Phase 0 — The icon list** with Figma, Mini*S and webfont names; the 51 missing ones
      marked.
- [ ] **Phase 1 — First hand-over pack** (the 51), agreed format with the lead developer.
- [ ] **Phase 2 — Icon path in the contribution skill** (005) and the registry (013).
- [ ] **Phase 3 — Optional script** for the selection JSON, if production wants it.

## Dependencies

- **013** — icons in the registry (one item per set or per icon, its question 2).
- **005** — the icon path; **020** — production agreement; **017** — re-reads `doc/font/`.

## Open questions

1. **Which webfont gets a new icon** — frontend by default, travel or admins by section?
2. **Who imports into IcoMoon**, and how often: per icon, per batch, at the monthly review (021)?
3. **Inline SVG instead of webfonts in production** — worth raising with the production team?
4. **Do the deprecated Mini*S aliases** need matching aliases in the webfonts?
