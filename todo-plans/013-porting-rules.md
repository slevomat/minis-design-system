---
id: 013
title: Porting rules — carrying tokens and recipes into each environment
status: draft
created: 2026-10-29
updated: 2026-10-29
owner: Lexislav
---

# 013 — Porting rules: carrying tokens and recipes into each environment

> **Depends on the canonical-names decision** (010 question 2 = 011 question 1) and on the
> **registry** (012), which records implementation status per platform. Phases 0 and 1 can run
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
Long term, Mini*S should own both. The redefinition is still in ideation, so this plan is a draft.

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
   - A missing token: never invent one, flag the gap, build it as Local (plan 004).
   - Version tracking: which token/recipe version each target has (plan 011).
2. **`latte.md`** — how Nette consumes tokens; the heritage → Mini*S mapping; component API names
   identical to Figma and the web components (`variant`, `size` `xs`–`xl`); slots → Latte blocks;
   accessibility carried over unchanged; icons via the webfont in production.
3. **`web-components.md`** — points to the existing Lit conventions instead of restating them;
   web components mirror the Latte recipe's behaviour; Storybook requirements.
4. **`figma.md`** — the Figma ↔ code property table and the exporter settings, moved here from
   CLAUDE.md.
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
- [ ] **Phase 4 — Link from `AGENTS.md`** (doesn't exist yet; cf. 009 question 2) **and the skills**
      (003–005, `minis-app`).

## Dependencies

- **010 / 011** — the canonical-names decision; 011 also carries the version tracking and the
  Style Dictionary transforms `common.md` describes.
- **012** — the registry's `implementations` status per platform is where divergence shows up.
- **001** — heritage colours; **009** — how the guides reach the Nette repo.

## Open questions

1. **Where do the guides live** — this repo, the Nette repo, or both?
2. **Who owns `latte.md`** — the Nette lead developer, or Mini*S with their review?
3. **Does the heritage → Mini*S mapping belong here or in plan 001?**
4. **How is a divergence reported** — a registry status, a GitHub issue, or both?
