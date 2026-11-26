---
id: 009
title: Token-update skill (typography first)
status: draft
created: 2026-10-29
updated: 2026-11-26
owner: Lexislav
---

# 009 — Token-update skill (typography first)

> **Revisited 2026-11-20**, after plans 015 and 016 landed. The typography part is no longer
> optional: the owner said yes to "a skill for future typography updates" on 2026-11-05 (plan 015,
> Answers), and plan 015 phase 7 and plan 016 phase 6 are both waiting for it. The rest of the
> skill (colours, layout, components) stays optional. Status unchanged (`draft`); moving it is the
> owner's call.
>
> **Plan 024 (automatic token export) takes this skill as its phase 1**, the manual export path.
> That still holds: the scripts and checks designed here are what 024 phase 1 calls, so nothing is
> thrown away when 024 starts. Merge or close this plan then; the typography reference file below
> stays a reference of the skill it becomes part of.
>
> **Not covered here:** a generic, non-Mini*S version of this method (an article and a skill for
> other Figma teams) exists, drafted in an earlier session and kept by the owner outside this repo.
> This plan is only the Mini*S skill.
> Distribution: see plan 010 (this skill stays in this repo only).
>
> **Intent, restated by the owner 2026-11-26: any change to typography takes this procedure.**
> Keeping Figma's responsive text working (generated `-px` line heights, typed percentages,
> exporter rules, the `@media` merge) is too complex to do by hand, so as much of it as possible is
> automated. That is the purpose of the skill; the rest of the token-update checklist rides along.
>
> **Built 2026-11-26** (phases 0–2, uncommitted at the time of writing): `.claude/skills/minis-token-update/`
> (`SKILL.md`, `typography.md`), `packages/tokens/scripts/{check-export,diff-export}.mjs` with
> `lib/export-utils.mjs` and a test file, and the root scripts `pnpm tokens:check` / `pnpm tokens:diff`.
> The open questions were answered with working defaults so the work could proceed; see "Working
> answers" under Open questions. Status is still `draft`; moving it is the owner's call.

## The problem

The token-update procedure is spread across several `CLAUDE.md` sections ("Token exports",
"Exporter settings", "Typography in the export", "Figma-export naming drift", "Changelog rules",
"Common pitfalls") and `docs/ai-prompts/typography.md` §6. Each step is easy to miss, and the
misses are expensive: the exporter's naming settings are **off by default on a fresh install, which
renames every token**.

What the last two weeks showed (2026-11-05 to 2026-11-20; each point checked against the repo):

- **The exporter is part of the procedure, and it shipped five releases in two weeks** (1.1.0, 1.2.0,
  1.2.1, 1.3.0, 1.3.1). Every typography rule below depends on the version that made the export. Nothing
  in the repo enforces it: the repo's own `tokens.json` is **exporter 1.3.0** while `tokens.rgb.json`
  is **1.3.1**, exported minutes apart on 2026-11-20 (`$metadata.exporterVersion`). The 1.3.0 file
  still holds one self-reference, `--accordion-padding-y: var(--accordion-padding-y)`, which 1.3.1
  fixes. A version check would have caught it.
- **Figma applies any bound number as pixels**, so line height needs the generated, Figma-only
  `typography/<role>/line-height-px` variables (rewritten by the exporter's **📏 Line heights**
  command), and letter spacing is a typed percentage in the text styles. The ratio and spacing
  variables carry their meaning in their *names* (`line-height/130%`, `spacing/-0,3%`, a comma for
  the decimal) and are not bindable. Skipping the recalculation, or binding a ratio, produces a
  silently wrong Figma file; skipping the version check produces `line-height: 26px` in production.
- **Two consumers, two file shapes.** This repo gets `tokens.json` (references mode, OKLCH) and
  `tokens.rgb.json` (resolved, hex), both re-exported whole. Production (Nette, read-only clone
  `../slevomat`) gets **one resolved JSON per top-level group** in `build/style-dictionary/tokens/`
  (`colors.json`, `layout.json`, `scales.json`, `shadows.json`, `typography.json`; `fonts.json` has no
  `$metadata`, so it is presumably hand-made), each with its own `$metadata` block, and builds `_variables.styl` from them
  with Style Dictionary. The structure of `tokens.rgb.json` → `typography` and `layout` matches
  production's `typography.json` and `layout.json` key for key (checked 2026-11-20; the only
  difference in `typography` is the letter-spacing rename: 5 new names, 7 old ones gone). The
  developer's import of the split `typography.json` / `layout.json` worked (reported 2026-11-20, no
  log seen).
- **`tokens.css` is merged by hand**, and a re-export does not tell you what to merge. The
  2026-11-20 re-export left `tokens.css` unchanged and produced a list of 41 places where Figma and
  `tokens.css` differ (gaps G12 and G13 in plan 003). Those were found by a one-off script and by
  hand. The same comparison is what every token update needs, and it is scriptable.
- **The checks are known and repeatable** (they were run by hand on 2026-11-20, see the CHANGELOG
  entry): no `line-height-px` anywhere; `--color-border`, `--color-separator` and
  `--color-interaction-primary-surface` exist and `--color-border-default` does not; the five
  `--typography-spacing-*` tokens are intact; Layout line-height ratios match `tokens.css` in every
  mode; the Storybook Tier values (generated from `tokens.json` by
  `apps/storybook/.storybook/tier-tokens.ts`) did not change by accident.
- **Some of what `CLAUDE.md` says about the export is already stale** (found while verifying this
  plan, see open question 8): the "Figma-export naming drift" table and the `CSS_NAME_ALIASES` in
  `tier-tokens.ts` describe names the export no longer uses.

## Constraints

- **The exporter's settings and version can't be read from here.** The settings live per machine in
  Figma `clientStorage` (plugin `minis-designtokens-exporter`, repo `slevomat/figma-plugins`, local
  `~/Projekty/Slevomat/Figma plugins/minis-designtokens-exporter`), and the Figma Community
  version can differ from the repo's master. The skill can only ask, and then **verify the result**:
  every export records `$metadata.exporterVersion` and `$metadata.settings`.
- **Required settings** (all ON for every export): Remove collection name from variables, Omit
  "default" from variable names, Remove mode suffix, Include origin reference. Required version:
  **≥ 1.3.1** (≥ 1.2.1 for the resolved export rules, 1.3.1 for the references-mode fixes).
- **There is no `tokens.json` → `tokens.css` converter.** `packages/tokens/scripts/build.js` builds
  `dist/` from `tokens.css` and nothing else. Layout modes become `@media` blocks, so updating
  `tokens.css` from the export is an agent-assisted step that **stops at a diff for the owner to
  review**. It is never a blind edit.
- **`HAND-MAINTAINED` content in `tokens.css` must survive:** the FONTS comment block (the only one
  carrying the marker), `--typography-font-family-brand`, `--typography-brand-weight`,
  `--container-bleeding-edge-padding` and the other token blocks that exist only in `tokens.css`.
  Check them by name after every merge. **Heritage values must not change silently** (plan 001).
- **Never write into the production repo** (`../slevomat`, read-only, plan 017). Production gets
  files and a hand-over note; its developer runs its own Style Dictionary build.
- **The user commits and pushes.** The skill prepares edits and a commit message and never pushes.
  (`CLAUDE.md`: plan edits go to `master` in their own commit; token changes ride with their
  changelogs.)
- Every added / renamed / removed / re-valued token goes into **both** changelogs (`CHANGELOG.md`
  and the Storybook Changelog story, `apps/storybook/stories/Introduction.stories.ts`), in the same
  commit, with CSS names and old → new values.
- **Open design decisions stay open.** The skill reports them and never settles them: brand heading
  weight 400 vs 700 and the Brand XL `clamp(32px, 7vw, 56px)` divergence (plan 014 question 5, gap
  G14 in plan 003), Brand xl letter spacing `0.01em` (production) vs `0.03em` (Figma and
  Mini*S), layout spacing (G12) and the other Figma ≠ `tokens.css` values (G13).

## Approach

### Shape: one skill, typography as a reference file (recommended)

Plan 015 phase 7 and plan 016 phase 6 said "a section of the token-update skill, not a separate
skill, because a typography change is a token change and two procedures would drift". That reasoning
holds, and the last two weeks add to it: **every check in the typography procedure is also a check
for any other token update** (version and settings, no `-px`, sentinel names, name-set diff, Tier,
both changelogs, the `tokens.css` merge). Only a few steps are typography-specific (editing sizes,
ratios and spacing in Figma, the **📏 Line heights** command, the typography `@media` mapping, the
typography docs).

So: **one skill, `minis-token-update`, with typography as a reference file loaded on demand**, not a
second skill and not a paragraph buried in a long `SKILL.md`. The shared procedure lives once; a
typography change reads the extra file, a colour change doesn't. This is the layout
`minis-figma-docs` already uses (`SKILL.md` + `kit.md` + `scripts/`).

```
.claude/skills/minis-token-update/
  SKILL.md        when to use; preconditions; the shared procedure (steps 0–9 below);
                  the stop points; the "never" list
  typography.md   the typography reference: what to edit in Figma, the Line heights command,
                  where each value lives, add-a-role, typography-only checks, pitfalls.
                  Links to docs/ai-prompts/typography.md for the method; adds only the
                  repo-specific steps
packages/tokens/scripts/
  check-export.mjs   the verifiable checks (step 5 and 7); exit code ≠ 0 on a failure
  diff-export.mjs    added / removed / renamed / re-valued between two exports (step 5)
```

The scripts sit in `packages/tokens/scripts/` next to `build.js`, **not inside the skill**, so that CI
(plan 011/022) and plan 024's pipeline can run them without Claude and the skill just calls them
(`pnpm tokens:check`, `pnpm tokens:diff`; names to confirm). Code in the repo is a separate change
from the plans and from the skill text.

**Single source for the method.** `docs/ai-prompts/typography.md` is deliberately self-contained and
portable (copied into other AI tools), so it keeps §6 "Changing typography" as the method in
prose. The skill's `typography.md` does not restate it: it links there and adds what only this repo
has (the `tokens.css` merge, the Tier check, both changelogs, the production hand-over). When the
method changes, only `typography.md` (docs) changes; when the repo procedure changes, only the
skill does.

**Distribution (plan 010).** This repo only: `.claude/skills/minis-token-update/`, committed here,
used by whoever updates tokens (today the owner). It does **not** go to the Nette repo: production
doesn't run the exporter, it consumes the JSON, and its agents are mostly Copilot with a different
skill format (plan 010, production facts). What reaches production is a **hand-over note** (step 9),
text the skill drafts, not a skill. If the Claude Code plugin (plan 010 option A) is built, it may
carry this skill for Mini*S maintainers, but nothing depends on it.

**Alternatives considered**

- *A separate small typography skill that the token-update skill calls.* Cleaner on paper, but the
  shared checks would then live in one skill and be needed from the other; every change to the
  checks touches two places, which is the drift the plans warned about. Only worth it if the
  typography procedure grows far beyond one reference file.
- *A section inside one long `SKILL.md`.* Same procedure, but every token update loads the
  typography details and every typography change scrolls through colour steps. The reference file
  gets the same single-owner benefit with less context.
- *Prose in `CLAUDE.md` and `docs/ai-prompts/typography.md` only.* What exists today, and the
  reason for this plan: the steps are spread over five sections and the checks are run by hand.
  `docs/ai-prompts/typography.md` §6 stays as the portable method.
- *Fully automated import in CI* (rejected earlier, still rejected here): the export is a manual
  plugin run in Figma. Plan 024 is where that is revisited.

### The procedure

Each step says **who**: **manual** (a person in Figma or the plugin), **agent** (the skill proposes,
the owner reviews), **script** (run it; a failing exit code stops the procedure).

| # | Step | Who | Typography-specific part (`typography.md`) |
|---|---|---|---|
| 0 | **Classify the change**: size, ratio, letter spacing, new role, or another token (colour, layout, component). Say what the expected diff is before touching anything. | agent | A new role: does its line height change per breakpoint? Decides whether it gets a Layout ratio variable + `-px` variable or a typed percentage |
| 1 | **Preconditions in Figma.** Exporter ≥ 1.3.1 installed (the version string in the plugin window); the four settings ON on **this machine**. The skill asks; step 5 verifies. | manual | — |
| 2 | **Edit in Figma.** Size: Layout `typography/<role>/size` (Heading) or `Typography/size/*` (Body, which has no Layout size). Ratio: alias the role's `typography/<role>/line-height` to a `Typography/line-height/N%` primitive (the name carries the meaning; comma for decimals). Letter spacing: a `Typography/spacing/N%` variable, no scopes, Code Syntax `var(--typography-spacing-…)`, typed percentage in the style. Never bind a ratio or spacing variable; never edit a `-px` variable by hand. | manual | The whole of it. See `docs/ai-prompts/typography.md` §3 and §6 |
| 3 | **Recalculate line heights**: the plugin's **📏 Line heights** command. It runs a read-only check first and lists what is out of date; **Apply** rewrites only the out-of-date `-px` variables (design mode only, Apply is disabled in Dev Mode); then it checks again and must report nothing out of date. Look at a `default`, a `md` and an `xl` frame (26 → 30 px for Heading/lg, and so on). | manual | Skip if only an unrelated token changed. Brand lg/xl keep a typed percentage and are "not generated" by design |
| 4 | **Export from Figma.** For this repo: `tokens.json` (references, OKLCH) and `tokens.rgb.json` (resolved, hex), all collections, Light + Dark, both from the same plugin version in the same session (**Export all**). For production: the owner exports the resolved groups it consumes (`typography`, `layout`, and `scales` / `colors` / `shadows` when they changed), one group per file, with the exporter too; see step 9. | manual | Typography lives in the `typography` and `layout` groups |
| 5 | **Validate the exports** (`check-export`, then `diff-export` against `git show HEAD:…`). **Checks that stop the procedure:** `$metadata.exporterVersion` ≥ 1.3.1 and equal in both files; `$metadata.settings.naming` all true and `includeOriginReference` true; no `line-height-px` name anywhere; no value that is a `var()` of its own name; `--color-border`, `--color-separator`, `--color-interaction-primary-surface` present and `--color-border-default` absent; no token name that was in the old export and is now gone **without being listed as expected in step 0** (a removed name is an alarm, not a detail). **Typography checks:** the spacing set is exactly `--typography-spacing-{n2,n1,n0_3,0,3}` with the em values (or the set step 0 announced); every `-line-height` and `-size` per Layout mode is what step 0 announced; in `tokens.rgb.json` the composites carry the `default`-mode ratio as a percentage (`heading.lg` → `130%`), never pixels. **The diff is the report**: added, removed, renamed, re-valued, grouped by collection, with typography on top and known divergences (G12, G13, G14) listed but not judged. | script | — |
| 6 | **Merge into `tokens.css`** (`packages/tokens/src/tokens.css`): Layout modes → the right `@media (min-width: …)` block, `100000px` → `100%`, translate any name the export still spells differently, keep every hand-maintained token, never paste a raw export over the file, never copy a `-px` value. The skill produces a **patch for review** and stops. | agent, owner reviews | The typography `@media` mapping; spacing tokens as em |
| 7 | **Build and check against the merged `tokens.css`:** `pnpm --filter @minis/tokens build` (also regenerates `apps/storybook/stories/palette-data.json`, commit it), `pnpm typecheck`; `check-export` again in "css" mode: Layout line-height and size values per mode equal `tokens.css`; sentinel names and hand-maintained names present; the `--typography-spacing-*` set intact. **Tier:** the `layout` group of `tokens.json` is what feeds the Storybook Tier toolbar (`tier-tokens.ts`), so compare it with `git show HEAD:tokens.json`: unchanged unless step 0 said otherwise. Restart the Storybook dev server, then look at Design Tokens → Typography / Text Styles and at the components that use the role (page-header and topbar use the heading and spacing tokens, for example). | script + manual | The roles to look at, per changed token |
| 8 | **Changelogs, same commit.** `CHANGELOG.md` and the Storybook Changelog story (newest date on top): CSS names, old → new, a "Tokens" sub-section. The skill drafts both from the diff; the owner reviews. **Figma docs changelog card:** hand over to the `minis-figma-docs` skill (Figma-only), or to plan 018's Log mode once it exists; never write it from this skill. | agent | Letter-spacing renames are breaking; say so |
| 9 | **Hand-over to production**, only when a token production consumes changed. Prepare, never push: **a short note only** (the files themselves are exporter output, made by the owner in step 4, not by the skill; open question 4) listing renamed, removed, re-valued and new names, plus what to expect (for typography: production's mixins start below 360 px from the composite, so the `default`-mode ratio matters; `build/style-dictionary/config.js` deletes `layout.default.typography`). Its developer runs the build. | agent drafts, owner sends | Typography is the case production lags on today |
| 10 | **Commit message.** One commit for the token files, `tokens.css`, the regenerated palette data and both changelogs; the owner commits and pushes. | agent drafts | — |

**What is automated or verifiable by script** (phases 1 and 3 build it): step 5 (all of it), the
`tokens.css` half of step 7, the Tier comparison, the changelog **draft** from the diff, and the
hand-over note. **What stays manual, by design:** every Figma edit (step 2), the plugin runs (steps 3
and 4), the plugin settings (step 1; only their effect is verified), the `tokens.css` merge decision
(step 6; the agent proposes, a person reads the diff) and the visual look at Storybook and the
Figma frames.

### What the skill must never do

- **Paste a raw export over `tokens.css`**, or edit it without showing the diff first. The `@media`
  structure and the hand-maintained blocks live only there.
- **Copy a `-px` value into CSS**, JSON or any changelog entry as a token. `typography/<role>/line-height-px`
  is Figma-only and generated.
- **Write into the production repo** (`../slevomat`) or push anywhere. Production's agent files,
  Stylus and `build/style-dictionary/` are read-only for us; the hand-over is a note and files.
- **Claim to know the plugin's settings.** It asks, then verifies the export's `$metadata`.
- **Run Apply** in the Line heights command without the read-only check first, or edit a `-px`
  variable by hand, or bind a ratio or spacing variable.
- **Change a heritage value, or any value outside the announced diff,** without saying so.
- **Hand-edit Tier values** in `preview.ts` (they come from `tokens.json`), or hand-copy export
  names into `tier-tokens.ts` aliases without checking they still apply.
- **Invent a token name** (`--color-border-default` does not exist; neither does a numeric
  `--spacing-{n}`). A missing token is a gap to report.
- **Decide an open design question** (brand weight, Brand XL `clamp()`, Brand xl letter spacing,
  layout spacing, G12 / G13): list it, point at the plan, stop.
- **Skip a changelog.** Both, same commit.

## Phases

- [x] **Phase 0 — Decide the shape** (question 1) and the questions that block phases 1–2
      (questions 2–5). Done 2026-11-26 with working defaults (see "Working answers"); the owner
      moves the status.
- [x] **Phase 1 — Checks as scripts.** Done 2026-11-26: `check-export.mjs`, `diff-export.mjs` and
      `lib/export-utils.mjs` in `packages/tokens/scripts/`, `pnpm tokens:check` / `pnpm tokens:diff`,
      and `export-checks.test.mjs` (23 tests, `pnpm --filter @minis/tokens test`). Checked against the
      real files: on the repo's `tokens.json` (exporter 1.3.0) `tokens:check` **fails** on the
      version, the `--accordion-padding-y` self-reference and the version mismatch; on
      `tokens.rgb.json` (1.3.1) it **passes**; `--css` confirms all 140 Layout size and line-height
      values in `tokens.css` match the export in every mode, with 23 other Layout values (spacing,
      `--page-width`) listed as the known G12/G13 divergences. `tokens:diff` against the commit
      before the 1.3 re-export reproduces the old → new typography names (`heading-large` →
      `heading-lg`, `poster` → `heading-xl`, the five spacing tokens). The tests use in-memory
      fixtures, not the real exports, because `tokens.json` flips to passing at the next re-export.
- [x] **Phase 2 — Write the skill:** `.claude/skills/minis-token-update/SKILL.md` and
      `typography.md` written 2026-11-26; `CLAUDE.md` → Token exports and
      `docs/ai-prompts/typography.md` §6 point to it. Plan 015 phase 7 and plan 016 phase 6 ticked.
      The skill has not been run on a real change yet (phase 3).
- [ ] **Phase 3 — Dry run on a no-op re-export** with exporter 1.3.1: it brings `tokens.json` up to
      1.3.1, shows the procedure on a change with an empty diff, and finds what the steps missed.
      **Partly done 2026-11-26, without Figma** (a real re-export is a manual plugin run, so the
      box stays unticked until one exists): steps 0, 5, 6, 7 and 10 were run on what is on disk.
      The 2026-11-20 pre-change exports (`~/Downloads/tokens-ref.json`, `tokens-rgb-resolved.json`)
      as "old" against the repo files as "new" gave exactly the known change (`--container-padding`
      and `--container-narrow-padding`, mode `lg`, 16 → 32 px) and flagged the Storybook Tier;
      `tokens:check --css` on the repo exports shows typography matching in all modes, and the build
      leaves `palette-data.json` unchanged. **Found and fixed:** a simulated 1.3.1 `tokens.json`
      (version bumped, the self-referencing `components` alias omitted, as docs §4 says 1.3.1 does)
      failed `same-tokens`, because the check compared token positions. It now compares CSS names and
      reports an omitted alias as information. **Still needed:** the real re-export with exporter
      1.3.1 (steps 1–4 are manual); expect `tokens:check` to go green on `tokens.json` then. Step 1
      (the plugin's version and settings) can only be confirmed by the owner.
- [ ] **Phase 4 — Run it on the first real typography change** (a size, a ratio or a new role) and
      fix what it missed.
- [ ] **Phase 5 — Hand over to plan 024 phase 1** (and to plan 018's Log mode for the changelog
      steps) when those start; close or merge this plan then.

## Working answers (2026-11-26)

The owner asked to stop discussing and get it built, so phases 0–2 went ahead on these defaults.
Each stays open to change; edit here when one is overruled.

| Q | Working answer | Status |
|---|---|---|
| 1 Shape, name | One skill, **`minis-token-update`**, with `typography.md` as a reference file. In the plugin (plan 010) it becomes `/minis:token-update`. | Built |
| 2 Script location | `packages/tokens/scripts/`, run as `pnpm tokens:check` and `pnpm tokens:diff` (reusable by CI and plan 024). | Built |
| 3 Who runs updates | The owner, on their machine. The skill asks for the plugin version and settings each time and the export's `$metadata` proves them. | Default |
| 4 Production's per-group files | **Decided 2026-11-26 (owner): the exporter plugin makes them; the skill does not.** The skill drafts only the hand-over note and never rewrites a production file. Evidence: production's `typography.json` and `layout.json` are single-group, resolved-mode exports with their own `$metadata` (2026-06-04 and 2026-05-22, no `exporterVersion`), i.e. exporter output. Still to confirm with the Nette developer: what they want with a change (files, a note, or a PR). | Decided; one sub-question open |
| 5 Re-export `tokens.json` with 1.3.1 | At the next token update. `pnpm tokens:check` fails on the current file until then, on purpose; both files must be from the same exporter version. | Default |
| 6 Mode ↔ tier mapping | No hand-written table: a Layout mode's width is its entry in the export's own `breakpoints` group (`default` = 0). The CSS value at that width is the `:root` cascade of every `min-width` block up to it. A mode with no breakpoint fails the check. | Built |
| 7 Canonical text for the method | `docs/ai-prompts/typography.md` §6 (portable); the skill links to it and adds only repo steps. | Built |
| 8 Stale `CLAUDE.md` text and `tier-tokens.ts` aliases | Left as they are for now (confirmed stale on 2026-11-26: the aliases map names the export no longer has). The skill says not to encode them. Clean up with the dry run. | Open, small |
| 9 Figma changelog card | The skill hands off to `minis-figma-docs`; plan 018 replaces that later. | Default |
| 10 Figma MCP access | Not required. A person looks at the frames in Figma (step 3). | Default |
| 11 Which groups production wants | Part of question 4. | Open |

## Open questions

1. **Shape: one skill with `typography.md` as a reference file (recommended), a separate small
   typography skill, or prose only?** Plans 015 and 016 assumed "a section of this skill"; the
   reference file is the same decision with a cleaner load. Also the **name** (`minis-token-update`
   or `minis-tokens`) and whether it gets a slash command.
2. **Where do the scripts live?** Recommended `packages/tokens/scripts/` with `pnpm tokens:check` /
   `tokens:diff` (reusable by CI and plan 024). The alternative is inside the skill folder, which keeps
   them out of the package but out of CI's reach too. They are code, so a separate change.
3. **Who runs token updates, and on whose machine?** Today only the owner. The plugin settings are
   per machine and the Community version can differ from the repo's master, so a second person means
   a settings check on their machine. Does anyone else need the skill?
4. **~~How does production's per-group file shape get made?~~ Answered 2026-11-26 (owner): the
   exporter plugin exports the groups; the skill never splits `tokens.rgb.json` and never writes a
   production file.** Step 9 is a hand-over note only. **Still open (needs the Nette developer):**
   what does production want with a change: the files, a note, or a PR (plan 024 question 5, plan 003
   production question 4)? Which exporter setting makes a one-group file, and whether
   `tokens:check` should accept a single-group file (its Layout mode mapping needs the `breakpoints`
   group, so today it can't), are small follow-ups.
5. **Re-export `tokens.json` with exporter 1.3.1 now, or with the next token update?** It is on
   1.3.0 and still has one self-reference line (`--accordion-padding-y`). Phase 1's check will fail
   on it until then. Related: should the check require both files to be from the same version, as
   proposed?
6. **Mode ↔ tier mapping for the line-height and size comparison.** The 2026-11-20 comparison
   used Figma `xs` → CSS base, `sm` → 408 px, `md` → 768 px …, and ignored `default` (not a breakpoint).
   Gap G12 says the modes and tiers don't line up for layout spacing. For typography the mapping
   has been agreed in practice, but it is written nowhere. Does the script get an explicit mapping
   table, and does it fail on a mode it can't map rather than skip it?
7. **Which text is canonical for the method:** `docs/ai-prompts/typography.md` §6 (portable, as
   proposed) with the skill linking to it, or the skill, with §6 shortened to a pointer? The first
   keeps the docs copy-able into other tools; the second has one place to edit.
8. **Stale text found while verifying this plan** (not mine to change here): `CLAUDE.md` →
   "Figma-export naming drift" (the `heading-large` / `poster` table) and the sentence that the brand
   composites exist only in `tokens.css`; `tier-tokens.ts` `CSS_NAME_ALIASES` and
   `XL_BRAND_EXTRAS`. The 2026-11-20 export already uses `--typography-heading-{lg,md,sm}-*`,
   `--typography-heading-{xl,2xl}-size` and `--typography-brand-{lg,xl}-{size,line-height}`
   (the repo CHANGELOG says "the aliases no longer match anything"). `--typography-brand-weight`
   and the FONTS block remain `tokens.css`-only. Clean up now, or leave until the skill's dry run?
   The skill should not encode the old table.
9. **The Figma changelog card** (step 8): until plan 018 exists, does the skill hand off to
   `minis-figma-docs` itself or only remind the owner?
10. **Does the skill get Figma MCP access** for a read-only look at frames and variables (the
    `default` / `md` / `xl` check, the Line heights state), or is that a person's job? Dev Mode
    and the plugin cover Apply either way.
11. **Production's `typography.json` and `layout.json` are from 2026-06-04 and 2026-05-22** (the
    2026-11-20 import was a test). When the real import happens, does the developer want the
    split files for every group, or only the changed ones? (Part of question 4.)

Left open on purpose, outside this plan: brand heading weight and Brand XL `clamp()` (014 question 5,
G14), Figma values that differ from `tokens.css` outside typography (G13), layout spacing (G12).
