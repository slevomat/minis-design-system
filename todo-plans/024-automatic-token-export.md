---
id: 024
title: Automatic token export — Figma to a pull request, so no copy lags
status: draft
created: 2026-11-13
updated: 2026-11-20
owner: Lexislav
---

# 024 — Automatic token export: Figma to a pull request, so no copy lags

> **Gap G2 in plan 003, turned into a plan** (2026-11-13). Rollout phase 1 ("Tokens in Nette",
> November–December 2026). Overlaps plan 009 (token-update skill, typography first): 009 becomes this
> plan's manual fallback (phase 1 below).

## Context

Figma variables are the source of truth for tokens (plan 014). Today every copy of them is made by
hand, and each one is older than the last:

| Copy | Last export (from `$metadata.exportDate`) | How it's made |
|---|---|---|
| This repo, `tokens.json` / `tokens.rgb.json` | 2026-03-13 | The owner runs the exporter plugin and commits the files |
| This repo, `packages/tokens/src/tokens.css` | newer, edited with each token change | Exporter output + hand-maintained blocks (CLAUDE.md, "Token exports") |
| Production, `build/style-dictionary/tokens/*.json` | 2026-08-12 | The lead developer exports, runs `build/style-dictionary/config.js` by hand (plan 017) |
| `ux-design-playground`, Claude design system | unknown | Copied (plan 019) |

The exporter (`Figma plugins/minis-designtokens-exporter`, v1.2.1) writes CSS, JSON and Style
Dictionary output to the clipboard or a download. Its manifest has `networkAccess.allowedDomains:
["none"]`, so it can't open a pull request today. It already stamps the export date, exporter
version and settings into `$metadata`. Slevomat is on the Figma **Professional** plan; the REST
API's variables endpoint is very likely Enterprise-only (plan 003, G2 note; to verify).

## The problem

- **Tokens drift between copies**, and nobody can tell which version a copy has. Plan 016's
  letter-spacing names, `Alert/success` and `--color-surface-transparent` are in Figma and this
  repo, but not in production.
- **The export depends on one machine's settings.** Two exporter settings are off by default and
  rename every token if forgotten (CLAUDE.md, "Exporter settings").
- **Every downstream output waits for a person:** `tokens.css`, the Storybook tier tokens, the
  Figma docs cards (plan 018), the hosted runtime (plan 019) and production's import.

## Constraints

- **Figma stays the source**; nothing downstream is edited by hand except the documented
  hand-maintained blocks in `tokens.css`, which an export must preserve.
- **The exporter's settings are fixed by the pipeline**, not by whoever runs it ("Remove collection
  name" and "Omit default" on).
- **A person approves every change.** The output is a pull request, never a direct push.
- **No secrets in the Figma file or the plugin's published code.** A GitHub token, if used, is
  per-user and stored in `figma.clientStorage`.
- **Production pulls, Mini*S doesn't push** (plan 020). A PR into production only if their team
  asks for one.

## Approach

**Target: one action in Figma produces one PR in this repo** containing the updated
`tokens.json`, `tokens.rgb.json` and the regenerated `tokens.css`, with a diff summary (added,
renamed, removed, re-valued tokens) as the PR description. CI then rebuilds, runs the checks
(011, 022) and the changelog sync (018) proposes the entries.

Options, in order of preference:

1. **The exporter opens the PR** through the GitHub API (`allowedDomains: ["api.github.com"]`), with
   a per-user fine-grained token that can only write to this repo. Settings are forced by an
   "export for Mini*S" preset.
2. **The exporter writes a file; a script opens the PR.** The owner saves the export, runs one
   command (plan 009's skill wraps it), which validates, rebuilds and opens the PR. No network
   access in the plugin.
3. **REST API in CI on a schedule.** Only if the plan allows it (likely Enterprise), so last.

**Production** gets the same JSON in the shape its Style Dictionary reads (`build/style-dictionary/
tokens/*.json`), attached to each release (plan 012). Whether that becomes a PR into production
is their call (plan 020, question 4 of plan 003's production list).

**Rejected:**

- **Keeping the manual export.** It's how the copies above drifted.
- **Exporting straight to `master`.** Every token change needs review (renames break users).
- **Syncing Figma and code both ways.** Figma is the source; code never writes back.

## Phases

- [ ] **Phase 0 — Verify the options.** Does the Professional plan's REST API serve variables?
      Can a Figma plugin hold a per-user GitHub token safely enough for the owner's team?
- [ ] **Phase 1 — Manual path, one command** (option 2): validate the export's settings and
      `$metadata`, preserve the hand-maintained blocks, rebuild, open a PR. Absorbs plan 009.
- [ ] **Phase 2 — Diff summary** in the PR: added / renamed / removed / re-valued, with the
      rename list feeding the deprecation map for production's Stylelint (plan 017 question 8).
- [ ] **Phase 3 — One click in Figma** (option 1), if phase 0 says it's safe.
- [ ] **Phase 4 — Downstream on merge:** hosted runtime (019), Claude design system (019),
      production release artefact (012), Figma docs refresh (018).

## Dependencies

- **009** — its manual skill is phase 1 here; close or merge it when this plan starts. The scripts
  it plans (`check-export`, `diff-export` in `packages/tokens/scripts/`) are what phase 1 and
  phase 2 call, so build them there first (revisited 2026-11-20; the typography reference file
  stays part of the skill).
- **012** — versioning and the production-shaped artefact; **018** — changelog entries.
- **019** — the hosted runtime and design system regenerate on merge.
- **003 decision 3** — canonical names, so the diff can call a change a rename.
- **020** — whether production wants a PR.

## Open questions

1. **Is the Figma variables REST endpoint available on Professional?** (Phase 0.)
2. **Who may export?** Only the DS owner, or anyone with edit rights in the MiniS file?
3. **Does the exporter live in this repo or stay separate?** It's in `Figma plugins/` today.
4. **How are hand-maintained blocks in `tokens.css` protected** — markers the script checks, or
   moved out to a separate file the build concatenates?
5. **Does production want the JSON as a PR, a release artefact, or both?**
