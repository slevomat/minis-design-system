---
id: 017
title: Changelog sync skill — one change, every changelog
status: draft
created: 2026-11-12
updated: 2026-11-12
owner: Lexislav
---

# 017 — Changelog sync skill: one change, every changelog

> Part of the MiniS redefinition (`docs/MiniS redefined guardrails, not a UI kit.md`, "Skilly,
> které MiniS potřebuje"). The brief's skills table doesn't list this skill yet; add a row when
> this plan goes past `draft`. Distribution: see plan 009.

## The problem

One change to Mini*S has to be written down in up to four places, by hand, in different formats:

| Where | Shape | Written by today |
|---|---|---|
| `CHANGELOG.md` (repo root) | Grouped by date, then component; token names and old → new values | Whoever lands the code (CLAUDE.md → Changelog rules) |
| Storybook **Changelog** story (`apps/storybook/stories/Introduction.stories.ts`) | Same content as styled HTML, newest date on top | Same person, same commit |
| Figma docs card, **changelog** card of each component's stack | Per component, one row per date, user-facing, `DD Mon YYYY` | Designer, or the `minis-figma-docs` skill |
| Figma foundation **Changelog card** (Typography…) | Per foundation | Designer |

They drift. In November 2026 the `minis-figma-docs` migration found:
- Figma cards with entries copied from another component (TopBar's card had PageHeader's text)
- dates in impossible order ("03 Oc 2025" below "01 Sep 2025")
- code changes that never reached Figma (Alert's breaking `no-icon`, Message's split into
  standalone / on product)
- Figma-only changes that never reached the repo

Each fix was manual detective work across the three sources.

## Constraints

- **The `minis-figma-docs` skill stays Figma-only by design.** It may read `CHANGELOG.md`, but it
  never writes repo docs. This skill is the one allowed to write *across* sides. It reuses
  `minis-figma-docs` (and its kit) for the Figma part instead of duplicating it.
- **CLAUDE.md changelog rules are the contract for the repo side.** Same commit as the change.
  Token entries carry the CSS property names and old → new values, under a "Tokens" sub-section.
- **The Figma-side rules live in `minis-figma-docs`:** what counts as an entry, where it lives,
  when it's written, and no empty cards. See its SKILL.md → "Changelog".
- **The audiences differ.** The repo changelog is for developers (token names, attributes,
  breaking notes). The Figma card is for whoever uses the component (one plain line per change).
  The same change is phrased differently per side; the skill must not copy text verbatim.
- **Never write to the production repo** (`../slevomat`, read-only); see plan 016.
- **The user commits and pushes.** The skill prepares the edits and the commit message; it never
  pushes.

## Approach (proposal)

One skill, `minis-changelog` (also as a `/minis-changelog` command), with three modes:

1. **Log a change.** Input: what changed. Free text, a diff or commit range, or a Figma node.
   Output:
   - a normalised entry: date, component(s) or foundation, kind (`code` / `figma` / `token` /
     `docs`), breaking yes/no, one developer line, one user line
   - that entry written to every side that should carry it: `CHANGELOG.md` + the Storybook story
     for `code` and `token` changes, the component's Figma changelog card for anything a component
     user would notice
2. **Reconcile.** For one component or all of them, read the three sources, match entries by
   date + component, and report the gaps: in the repo but not in Figma, the reverse, contradictory
   wording, and dates out of order. Fix them on request, never silently.
3. **Release notes** (later, with plan 011). Collect the entries since the last version tag into
   release notes.

Why not one structured source file (e.g. `changelog/*.json`) rendered to all three? It's cleaner,
but it changes how everyone writes changelogs today, and Figma can't read it without a plugin. The
proposal starts with the three existing sources plus Reconcile mode, and keeps a structured source
as an open question.

## Phases

- [ ] **Phase 0: Figma-side contract.** Add the "Changelog" rules to `minis-figma-docs`: what
      counts, where it lives, when it's written, no empty card. *(Done 2026-11-12 in the
      `minis-figma-docs` session; tick once committed.)*
- [ ] **Phase 1: Reconcile, read-only.** A script or skill step that extracts entries from
      `CHANGELOG.md`, the Storybook story and every Figma changelog card (via `use_figma`), then
      prints a gap report per component. No writes. Run it once to measure the drift.
- [ ] **Phase 2: Log mode for code changes.** Given a diff or commit range, draft the
      `CHANGELOG.md` + Storybook entries (CLAUDE.md format) and the Figma card row
      (`minis-figma-docs` voice). The user reviews; the skill applies.
- [ ] **Phase 3: Log mode for Figma changes.** Given a Figma node and what changed, write the card
      row. Ask whether the change also needs a repo entry, e.g. when a token or property changed.
- [ ] **Phase 4: Hooks** (optional). A commit-time reminder when a component or token file
      changes without a `CHANGELOG.md` change, in line with the brief's rules-hook idea.
- [ ] **Phase 5: Release notes** (with plan 011).

## Open questions

1. **Source of truth.** Keep three hand-written sources plus Reconcile, or move to one structured
   source rendered everywhere? The second needs a Figma-side writer, i.e. this skill via
   `use_figma` or the docs plugin.
2. **Do Figma-only changes belong in `CHANGELOG.md`?** For example, a new Figma variant before the
   code has it. Today: no. But developers miss design changes that are coming.
3. **Which date wins** when Figma and code land on different days: the Figma change date, or the
   code merge date? Proposal: each side keeps its own date; Reconcile matches within a window.
4. **Granularity:** one Figma row per repo entry, or several repo bullets grouped into one user
   line? (`minis-figma-docs` voice says group related changes under one date.)
5. **Production:** should Reconcile also read what production (`../slevomat`) has adopted, so the
   changelog can say "adopted in production"? This ties into plan 016.
6. **Who runs it:** the DS owner only, or designers too? Designers may not have the repo, which
   pushes towards a Figma-first entry point and plan 009 distribution.
7. **Name:** `minis-changelog`, or part of a wider `minis-release` skill?
