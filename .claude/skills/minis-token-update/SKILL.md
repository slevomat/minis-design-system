---
name: minis-token-update
description: Update the Mini*S design tokens from a Figma export — and the REQUIRED procedure for ANY typography change (a font size, a line-height ratio, letter spacing, a new text role, a breakpoint change in a text style). Use when the user says they re-exported or will re-export tokens from Figma, replaced tokens.json / tokens.rgb.json, changed a typography variable or text style, added a text role, or asks "what changed in the export", "is this export OK", "merge the export into tokens.css". Validates the export with scripts, shows the diff, proposes the tokens.css patch for review, then drives the build, both changelogs and the production hand-over note. Mini*S repo only (needs tokens.json, tokens.rgb.json, packages/tokens). Never pushes, never writes to the production repo, never edits Figma.
---

# Mini*S token update

How a Figma change becomes a repo change without losing anything on the way. Plan 009
(`todo-plans/009-token-update-skill.md`) has the reasoning; this file is the procedure.

**Any change to typography goes through this procedure.** Figma applies every bound number as
pixels, so responsive text only works through generated `-px` line-height variables, typed
percentages and exporter rules that skip or derive values. Done by hand that breaks silently
(`line-height: 26px` in production, `1.3px` in Figma). The scripts below exist so nobody has to
remember it. Typography specifics are in [typography.md](typography.md) — read it whenever the
change touches a size, a line-height ratio, letter spacing or a text role.

## Rules that hold for every step

- **Stop points are real.** A failing check (`pnpm tokens:check`, exit code 1) ends the run until
  it is fixed or the owner explains it. Never say "continuing anyway".
- **You propose, the owner reads the diff.** The `tokens.css` merge and both changelogs are
  drafted by you and reviewed by a person. Never paste a raw export over `tokens.css`.
- **You cannot see the plugin's settings or version.** Ask for them (step 1); the export's
  `$metadata` proves the answer (step 5).
- **Never commit or push.** Prepare the files and a commit message (step 10); the owner commits.
- **Never touch**: Figma, the production repo (`../slevomat`, read-only), Storybook Tier values in
  `preview.ts`, or a `-px` value anywhere in code.
- **Open design decisions stay open.** Report them, point to the plan, stop: brand heading weight
  400 vs 700 and the Brand XL `clamp(32px, 7vw, 56px)` (plan 014 question 5, gap G14), Brand xl
  letter spacing 0.01em vs 0.03em, layout spacing (G12), other Figma ≠ `tokens.css` values (G13).

## The procedure

Each step says **who**: *manual* = a person in Figma or the plugin, *you* = the agent proposes,
*script* = run it and read the exit code.

### 0 — Classify the change (you)

Say, before anything else, what kind of change this is and what the diff must look like:
size, ratio, letter spacing, new role, or another token (colour, layout, component). Name the
tokens you expect to be added, removed or re-valued. The expected removals go to
`--expect-removed` in step 5; anything else that disappears is an alarm.
Typography → read [typography.md](typography.md) now.

### 1 — Preconditions in Figma (manual; ask, don't assume)

Ask the owner to confirm, **on the machine that will export**:
- the exporter plugin (`minis-designtokens-exporter`) is **≥ 1.3.1** (the version is shown in the
  plugin window; the Figma Community version can differ from the repo's master);
- all four settings are ON: *Remove collection name from variables*, *Omit "default" from
  variable names*, *Remove mode suffix*, *Include origin reference*. They are stored per machine,
  and a fresh install has the naming ones OFF, which renames every token.

### 2 — Edit in Figma (manual)

Typography edits and their rules are in [typography.md](typography.md). For other tokens, edit the
variable in its collection; don't rename a variable that has a CSS name without saying so in step 0.

### 3 — Recalculate line heights (manual, typography only)

The plugin's **📏 Line heights** command: read-only check first, **Apply** only for what it lists
as out of date (design mode only), then it must report nothing out of date. Skip it when no size
or ratio changed.

### 4 — Export from Figma (manual)

Export both files in one session with **Export all**, all collections, Light + Dark:
`tokens.json` (references, OKLCH) and `tokens.rgb.json` (resolved, hex), into the repo root.
For production: the resolved groups it consumes (see step 9).

### 5 — Validate the exports (script — a failure stops here)

```bash
pnpm tokens:check                                   # both files, exit 1 on any failure
pnpm tokens:diff --expect-removed <names from step 0>
```

`tokens:check` stops on: exporter below 1.3.1, a plugin setting OFF, the two files from
different versions or holding different tokens, any `line-height-px` token, a token that
references itself, a missing sentinel name (`--color-border`, `--color-separator`,
`--color-interaction-primary-surface`) or a forbidden `--color-border-default`, a letter-spacing
set that is not exactly `--typography-spacing-{n2,n1,n0_3,0,3}` with the em values its names say
(pass `--spacing-set` if the change announced a different set), a line-height ratio whose value
isn't the percentage in its name, a Layout line height in pixels, a Layout mode with no
breakpoint. `tokens:diff` compares both files with `HEAD` and exits 1 when a name vanished that
step 0 didn't announce. **The diff is the report**: show it to the owner, typography first, and
list known divergences (G12, G13, G14) without judging them.

Show the Tier effect: the `layout` group of `tokens.json` feeds the Storybook Tier toolbar. The
diff prints "Storybook Tier … unchanged" or the number of changes. Unchanged unless step 0 said
otherwise.

### 6 — Merge into `tokens.css` (you, owner reviews)

`packages/tokens/src/tokens.css` is merged by hand: Layout modes become `@media (min-width: Npx)`
blocks, mode widths come from the export's `breakpoints` group. Produce **a patch for review and
stop**. Rules:
- Put each changed Layout value in the right tier block; a value that is the same as the previous
  tier is not repeated.
- `100000px` means `100%`.
- Keep every hand-maintained token: the FONTS comment block (marker `HAND-MAINTAINED`),
  `--typography-font-family-brand`, `--typography-brand-weight`, the brand composites
  `--typography-brand-{lg,xl}-{size,line-height}`, `--container-bleeding-edge-padding`.
- Never copy a `-px` value. Never invent a token name: a token that is missing from Figma is a gap
  to report.
- Heritage colour values don't change silently (plan 001); a ramp-wide change is not this skill.

### 7 — Build and check against the merged CSS (script + manual)

```bash
pnpm tokens:check --css                  # tokens.css vs the export, every mode
pnpm --filter @minis/tokens build        # also regenerates apps/storybook/stories/palette-data.json (commit it)
pnpm typecheck
pnpm --filter @minis/tokens test         # the check scripts' own tests
```

`--css` fails if typography in `tokens.css` differs from the export in any mode, if a
hand-maintained token or the FONTS marker is gone, or if the letter-spacing set is off. Layout
values outside typography that differ are listed as warnings (G12/G13), not failures.
Then restart the Storybook dev server and look at Design Tokens → Typography / Text Styles and the
components that use the changed role (see typography.md).

### 8 — Changelogs, same commit (you draft, owner reviews)

Both, newest date on top: `CHANGELOG.md` and the Storybook Changelog story
(`apps/storybook/stories/Introduction.stories.ts`). Draft them from the `tokens:diff` output:
CSS names, old → new values, a "Tokens" sub-section. A renamed token is **breaking**; say so. The
Figma docs changelog card is a separate hand-off to the `minis-figma-docs` skill (Figma-only,
never from here).

### 9 — Hand-over to production (you draft, owner sends)

Only when a token production consumes changed (typography, layout, scales, colours, shadows).
**The skill does not make production's files.** Those are exporter output: the owner exports the
group(s) production consumes (`typography.json`, `layout.json`, … one group per file, resolved
mode) with the exporter plugin, the same way as in step 4. You only **draft the hand-over note**:
renamed, removed, re-valued and new names (from the `tokens:diff` of the matching group), and what
to expect. Prepare, never send. Production's developer runs its own Style Dictionary build.
If the owner gives you such a file, read it, don't rewrite it, and check it:

```bash
pnpm tokens:check --group-file <path>/typography.json --group-file <path>/layout.json
```

It applies the checks that fit the groups the file holds, takes Layout mode widths from
`tokens.rgb.json` when the file has no `breakpoints`, and fails if the group differs from the
repo's own `tokens.rgb.json` in any name or value (export it in the same session as the repo
files).

### 10 — Commit message (you draft)

One commit for the export files, `tokens.css`, the regenerated `palette-data.json`, the scripts'
output if relevant and both changelogs. Show the message; the owner commits and pushes.

## Never

Paste a raw export over `tokens.css` · copy a `-px` value anywhere · write to `../slevomat` or
push · claim to know the plugin's settings · run **Apply** without the read-only check first, edit
a `-px` variable by hand, or bind a ratio or spacing variable · change a heritage value or any
value outside the announced diff without saying so · hand-edit Tier values in `preview.ts` ·
invent a token name · decide an open design question · skip a changelog.

## Known stale text (do not encode it)

`CLAUDE.md` → "Figma-export naming drift" and `CSS_NAME_ALIASES` in
`apps/storybook/.storybook/tier-tokens.ts` describe names the export no longer uses
(`--typography-heading-large-*` → `-lg-*`, `poster` → `heading-xl`). The 2026-11-20 export already
uses the new names. Trust the export and `tokens:diff`; tell the owner if you find the old names
still doing work.
