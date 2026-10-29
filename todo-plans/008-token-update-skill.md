---
id: 008
title: Token-update skill (optional)
status: draft
created: 2026-10-29
updated: 2026-10-29
owner: Lexislav
---

# 008 — Token-update skill (optional)

> **Optional.** Worth doing only if token updates are done by more than one or two people, or the
> checklist in `CLAUDE.md` keeps getting missed. No dependency on the registry or Latte recipes.
> Distribution: see plan 009 (this one probably stays in this repo only).

## The problem

The token-update procedure is spread across several `CLAUDE.md` sections ("Token exports",
"Exporter settings", "Figma-export naming drift", "Changelog rules", "Common pitfalls"). Each step
is easy to miss, and the misses are expensive: the exporter's two naming settings are **off by
default on a fresh install, which renames every token**.

## Constraints

- **The exporter settings can't be checked from here.** They live per machine in Figma
  `clientStorage` (plugin `minis-designtokens-exporter`, separate repo). The skill can only ask and
  then verify the result.
- **There is no `tokens.json` → `tokens.css` converter.** `packages/tokens/scripts/build.js` builds
  `dist/` from `tokens.css`; updating `tokens.css` from the export is a manual or agent step.
- **`HAND-MAINTAINED` blocks** in `tokens.css` (fonts, brand typography, `--container-bleeding-edge-padding`)
  must survive. **Heritage values must not change silently** (001).
- Every added/renamed/removed/re-valued token goes into **both** changelogs (`CHANGELOG.md` and the
  Storybook Changelog story).

## Approach

A checklist skill:

1. **Export** from Figma with "Remove collection name from variables" and "Omit 'default' from
   variable names" both **ON**.
2. Replace `tokens.json` and `tokens.rgb.json` at the repo root.
3. **Update `tokens.css`**: apply the naming-drift table, translate `100000px` → `100%`, keep the
   `HAND-MAINTAINED` blocks.
4. `pnpm --filter tokens build`.
5. **Spot checks:** `--color-border`, `--color-separator` and `--color-interaction-primary-surface`
   still exist; diff the token name set before/after (a removed name is an alarm, not a detail);
   flag any heritage value change.
6. Log every change in both changelogs; restart Storybook so the Tier toolbar picks up new values.

**Rejected:** fully automated import in CI (the export is a manual plugin run in Figma); leaving it
as prose in `CLAUDE.md` if the optional bar is met.

## Phases

- [ ] **Phase 0 — Decide whether to do it at all** (question 1).
- [ ] **Phase 1 — Write the skill** from the `CLAUDE.md` sections; make `CLAUDE.md` point to it.
- [ ] **Phase 2 — Run it** on the next real Figma re-export and fix what it missed.

## Open questions

1. **Is this worth a skill**, or is a single checklist section in `CLAUDE.md` enough?
2. **Should the name-set diff be a script in the repo** (code, so a separate change) rather than
   something the agent does by hand each time?
3. **Who runs token updates?** If it's only the owner, the skill's value is mostly as a memory aid.
4. **How do token updates reach production** once production consumes Mini*S tokens — does this
   skill end with a release/publish step?
