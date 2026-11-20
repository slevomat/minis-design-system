---
id: 014
title: Porting rules — carrying tokens and recipes into each environment
status: draft
created: 2026-10-29
updated: 2026-11-20
owner: Lexislav
---

# 014 — Porting rules: carrying tokens and recipes into each environment

> **Depends on the canonical-names decision** (011 question 2 = 012 question 1) and on the
> **registry** (013), which records implementation status per platform. Phases 0 and 1 can run
> before either is settled; `common.md` can't be final until canonical names are.

## Context

Mini*S is being redefined as shared rules rather than a UI kit. Porting rules are one of the five
foundation layers everyone gets, next to tokens, Latte recipes, skills and the registry. The
environments:

- **Production** runs on **Nette/Latte**.
- **Web components** (this repo) are the reference implementation and the vibe-coding sandbox.
- **Figma** is the source of truth for tokens.
- **The mobile app** has adopted token values and plans to adopt names and structure.

**Reference rule for now: values come from Mini*S tokens, behaviour comes from production Latte.**
Long term, Mini*S should own both. The direction is agreed (the Nette lead developer accepted the redefinition on 2026-11-02); the details here are proposals until the decisions in plan 003 are closed.

## The problem

The rules for moving a token or a recipe from one environment to another exist only implicitly:
exporter settings stored per machine, alias tables in CLAUDE.md and in `tier-tokens.ts`, and
conventions people carry in their heads. Nobody outside this repo, human or AI, can follow them,
and nothing says which side wins when two environments disagree.

## Constraints

- **Figma variables are the source of truth for tokens**; a built output is never edited.
- **Heritage colours keep working unchanged** until production fully adopts Mini*S (plan 001).
- **Production conventions win on behaviour** until Mini*S owns it; `latte.md` is written with the
  Nette lead developer, not for them.
- **Never invent a token name.** A missing token is flagged as a gap, not guessed
  (cf. `--color-border-default`, which does not exist).
- **One short page per guide.** Rules that need more go to the docs they point at.

## Where the implicit rules live today (starting point for Phase 0)

| Rule | Lives in |
|---|---|
| Exporter settings ("Remove collection name", "Omit default") | CLAUDE.md → "Exporter settings"; exporter repo |
| `tokens.json` → `tokens.css` name drift | CLAUDE.md, `getting-started.md`, `apps/storybook/.storybook/tier-tokens.ts` (`CSS_NAME_ALIASES`) |
| `100000px` = `100%` | CLAUDE.md, `getting-started.md`, `tier-tokens.ts` |
| Hand-maintained tokens (fonts, brand composites, bleeding-edge padding) | CLAUDE.md, `packages/tokens/README.md`, `tier-tokens.ts` (`XL_BRAND_EXTRAS`) |
| OKLCH + hex fallback (`tokens.rgb.css` loaded first) | `packages/tokens/README.md`, `packages/tokens/scripts/build.js` |
| `data-mode="dark"`, `data-theme` schemas | CLAUDE.md, `packages/tokens/README.md`, `getting-started.md` |
| Viewport tokens vs container queries | CLAUDE.md, `docs/ai-prompts/layouts/index.md` |
| Size names = Figma `Size` variant names | CLAUDE.md, `principles.md` |
| Figma ↔ code property table | CLAUDE.md → "Figma Code Connect" |
| Lit API rules (`no-*` booleans, ElementInternals) | component docs; not written down in one place |
| Icon names vs production webfont | `docs/ai-prompts/components/icon.md` |

## Approach

Short written guides, one page each, in `docs/porting/` (location is open question 1):

1. **`common.md`** — applies everywhere.
   - Canonical names and the transform per target: CSS custom property, SCSS, Style Dictionary
     path, Figma variable path, and the exporter rules that produce them.
   - Value conventions: OKLCH with a hex fallback, `100000px` = `100%`, alpha tokens
     (`--color-separator`).
   - Modes and breakpoints: `data-mode="dark"`, `data-theme` schemas, viewport tokens vs container
     queries with breakpoints hardcoded from the `--breakpoint-*` scale.
   - The reference/conflict rule above, and how a divergence is reported (registry status, issue).
   - A missing token: never invent one, flag the gap, build it as Local (plan 005).
   - Version tracking: which token/recipe version each target has (plan 012).
2. **`latte.md`** — how Nette consumes tokens; the heritage → Mini*S mapping; component API names
   identical to Figma and the web components (`variant`, `size` `xs`–`xl`); slots → Latte blocks;
   accessibility carried over unchanged; icons via the webfont in production.
3. **`web-components.md`** — points to the existing Lit conventions instead of restating them;
   web components mirror the Latte recipe's behaviour; Storybook requirements.
4. **`figma.md`** — the Figma ↔ code property table and the exporter settings, moved here from
   CLAUDE.md.

**First worked example: typography** (added 2026-11-06). `docs/ai-prompts/typography.md` already
covers one property family across all environments: Figma (Figma-only `-px` line heights, typed
percentages, non-bindable name-encoded variables), the exporter (≥ 1.2.1: values from names, `-px`
skipped), CSS tokens, and production (`typo-*` classes, `$typo-*` mixins generated from the
resolved JSON). Its structure (rules per environment plus "which side wins") is the template for
`common.md`, `latte.md` and `figma.md`, and its production section is a starting point for
`latte.md`. **Divergences to settle here:** production's Brand heading xl is hand-written as
`font-size: clamp(32px, 7vw, 56px)` and `font-weight: 700`, while Mini*S says 32 → 56px at 1480px
and weight 400 (plan 015 → "Production audit", item 3).
**Brand weight, found 2026-11-20:** the exporter's resolved export of MiniS DS shows the Figma styles
`Brand/Heading/lg` and `/xl` with `fontWeight` **700** and `uppercase`. So Figma and production agree on
700, and only Mini*S (`--typography-brand-weight: 400`, `CLAUDE.md`, `docs/ai-prompts/typography.md`)
says 400, on the grounds that Kensington and Bebas Neue are single-weight and 700 would synthesise a
fake bold. Open question 5 asks which side wins.
5. **Later: `mobile.md`** — iOS/Android outputs from the same source.

**Rejected:** keeping the rules in CLAUDE.md (only Claude Code in this repo reads it; the Nette
repo and the mobile team never see it); one long porting document (nobody reads it, and each
environment's owner needs a page they can own).

## Phases

- [ ] **Phase 0 — Inventory.** Find every implicit rule in the repo and list where it lives; extend
      the table above and mark duplicates that disagree.
- [ ] **Phase 1 — Draft `common.md`.**
- [ ] **Phase 2 — `latte.md`**, written together with the Nette lead developer.
- [ ] **Phase 3 — `web-components.md` and `figma.md`**, then slim CLAUDE.md to link to them.
- [ ] **Phase 4 — Link from `AGENTS.md`** (doesn't exist yet; cf. 010 question 2) **and the skills**
      (004–006, `minis-app`).

## Dependencies

- **011 / 012** — the canonical-names decision; 012 also carries the version tracking and the
  Style Dictionary transforms `common.md` describes.
- **013** — the registry's `implementations` status per platform is where divergence shows up.
- **001** — heritage colours; **010** — how the guides reach the Nette repo.

## Open questions

1. **Where do the guides live** — this repo, the Nette repo, or both?
2. **Who owns `latte.md`** — the Nette lead developer, or Mini*S with their review?
3. **Does the heritage → Mini*S mapping belong here or in plan 001?**
4. **How is a divergence reported** — a registry status, a GitHub issue, or both?
5. **Brand heading weight: 400 or 700?** Figma styles and production both use 700; Mini*S says 400
   (single-weight fonts, no synthesised bold). Check what the real Kensington files provide. If it
   has a real bold, 700 is right and the Mini*S docs and `--typography-brand-weight` change. If not,
   Figma and production carry a fake bold. Settle it together with the Brand XL `clamp()` divergence
   above, and record the answer in `docs/ai-prompts/typography.md`.
