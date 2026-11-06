---
id: 015
title: Letter-spacing tokens — one meaning in Figma, the exporter and CSS
status: in-progress
created: 2026-11-05
updated: 2026-11-06
owner: Lexislav
---

# 015 — Letter-spacing tokens: one meaning in Figma, the exporter and CSS

> **High priority** (owner, 2026-11-05). The next token export from Figma may rewrite
> `--typography-spacing-*` in `tokens.css` with different names and units. **Until phase 1 is
> decided, check the `--typography-spacing-*` lines of every export diff by hand before
> committing it.**
> Related: plan 014 (same root cause for line height: Figma applies bound numbers as pixels).

## The problem

The `typography/spacing/*` tokens mean different things depending on where you look. Checked on
2026-11-05:

| Figma variable | Value | Figma renders, when bound | Exporter (current `code.ts`) emits | `tokens.css` today |
|---|---|---|---|---|
| `tighter` | −0.32 | −0.32 px | `-0.0032em` | `--typography-spacing-tighter: -0.32px` |
| `tight` | −0.16 | −0.16 px | `-0.0016em` | `--typography-spacing-tight: -0.16px` |
| `normal` | 0 | 0 | `0` | `--typography-spacing-normal: 0px` |
| `narrow` | 0.4 | 0.4 px | `0.004em` | *(no `narrow`)* `--typography-spacing-wide: 0.4px` |
| `wide` | 0.8 | 0.8 px | `0.008em` | **`--typography-spacing-wide: 0.4px`**, `--typography-spacing-wider: 0.8px` |
| `extra-wide` | 1 | 1 px | `0.01em` | *(missing)* |
| `ultra-wide` | 3 | 3 px | `0.03em` | *(missing)* |

Five separate problems:

1. **Unit.** Figma applies a bound value as pixels (verified: `letterSpacing = {unit: PIXELS,
   value: -0.32}`). The exporter assumes it's a percentage and divides by 100 (exporter commits
   `3a2a761` and `5894b8b`, 2026-06-03, and `TOKEN_CHANGES.md` §6). The comment in `formatFloat()`,
   "Figma interprets FLOAT variables as percentage when applied to letter-spacing", is wrong.
   `tokens.css` has pixels, so it doesn't come from the current exporter.
2. **Names.** In Figma, `wide` = 0.8. In CSS, `wide` = 0.4 and `wider` = 0.8. The same name has a
   different value, which is the worst kind of drift.
3. **Missing tokens.** `extra-wide` and `ultra-wide` aren't in `tokens.css`. `page-header`
   uses `var(--typography-spacing-extra-wide, 1px)`, so it always falls back to 1px.
4. **Brand styles.** `Brand/Heading/xl` and `/lg` bind `extra-wide` (1). Figma renders 1 px. The
   exporter emits `0.01em`, which is 0.32 px at 32 px and 0.56 px at 56 px. Figma and CSS disagree.
5. **Text styles don't use the tokens.** Heading −2 %, Heading/lg −1 % and Body −0.3 % are typed
   into the styles. Components hard-code the same numbers as em: `page-header` −0.02em and
   −0.003em, `topbar` −0.01em. `tokens.json` has no spacing variables at all, and every text
   style's `letterSpacing` there is `"0"`, so it predates the current styles.

## Constraints

- **CSS letter spacing is em** (decided 2026-11-06), so it scales with font size, like the
  components and production already do.
- **Figma can only bind pixels.** A token that must scale with size can't be bound in Figma. That's
  the same wall as plan 014.
- Production's real values decide what the tokens should be. The production audit in plan 014
  phase 0a covers letter spacing too.

## Approach

Treat letter spacing like the line-height ratios:

- **The tokens are percentages of font size, and the meaning is in the name** (decided
  2026-11-06), exactly like `line-height/130%` → `130%`. The exporter derives the CSS value from
  the name, so the stored number doesn't matter. Only the values the styles actually use:

  | Figma variable | CSS name | CSS value | Used by |
  |---|---|---|---|
  | `Typography/spacing/-2%` | `--typography-spacing-n2` | `-0.02em` | Heading 2xl/xl/md/sm |
  | `Typography/spacing/-1%` | `--typography-spacing-n1` | `-0.01em` | Heading lg |
  | `Typography/spacing/-0,3%` (Figma forbids `.`) | `--typography-spacing-n0_3` | `-0.003em` | Body md/sm |
  | `Typography/spacing/0%` | `--typography-spacing-0` | `0` | Captions, labels |
  | `Typography/spacing/3%` | `--typography-spacing-3` | `0.03em` | Brand lg/xl |

  The CSS names need one exporter rule. Today `sanitizeCSSSegment()` only strips `%` and spaces,
  so `-0.3%` would become `--typography-spacing--0.3`, and a dot isn't valid in a custom
  property name. Rule (owner, 2026-11-06): a leading `-` becomes `n`, and `.` becomes `_`.
  So `-0.3%` → `--typography-spacing-n0_3`.
  The old `tighter … ultra-wide` names are removed.
- **Text styles keep a typed-in percentage.** A percentage already scales with size, so there's
  no need for a `-px` set as in plan 014. The spacing variables get no `LETTER_SPACING` scope, so
  they can't be bound by mistake.
- **Brand lg and Brand xl are both 3 %** (decided 2026-11-06). Both styles unbind `extra-wide`
  and type 3 %. Docs and tokens follow production's brand lg value. **Visible change in
  production:** brand xl goes from `0.01em` to `0.03em` (≈ 0.3 px → 1 px at 32 px) on the first
  export after phase 4 (`$typo-brand-heading-xl`, ~5 Latte uses).
- **CSS** gets the renamed set above. `page-header` and `topbar` then use the tokens instead of
  raw em values.

Rejected: **px everywhere** (fix the exporter to emit px). It's simple and matches what Figma
renders, but letter spacing then stops scaling with size, and the existing em values in the
components would have to become per-size px values.

## Phases

- [x] **0. Production values.** Done 2026-11-05 (see "Production audit" below).
- [x] **1. Decide** the unit, the names and the Brand value. Done 2026-11-06, see "Decisions".
- [x] **2. Exporter:** derive em from the name (`spacing/-2%` → `-0.02em`), add the name rule
      (leading `-` → `n`, `.` → `_`), drop the "bound = percent" special case, fix the `formatFloat()` comment,
      update `TOKEN_CHANGES.md`. Ship it in the same release as plan 014 phase 1. Done 2026-11-06:
      exporter 1.1.0 (`fed1340`). The old names (`tighter … ultra-wide`) still export ÷ 100, with a
      warning when bound, so production keeps its current values until phase 3 renames them. The
      minus/dot rule also applies to JSON and Style Dictionary keys, and renames none of the existing
      449 names.
- [x] **3. Figma:** replace `typography/spacing/*` with the five variables above (no
      `LETTER_SPACING` scope), unbind both Brand styles and type 3 %.
      Progress 2026-11-06:
      - [x] Created `Typography/spacing/-2%`, `-1%`, `0%`, `3%` (`VariableID:6087:150`–`153`) in the
            Typography collection: no scopes, Web Code Syntax `var(--typography-spacing-n2)` etc., and a
            description saying the value comes from the name.
      - [x] **`-0.3%` → `Typography/spacing/-0,3%`** (owner, 2026-11-06; `VariableID:6088:142`).
            Figma doesn't allow `.` in variable names, so the decimal is written with a comma. The CSS
            name stays `--typography-spacing-n0_3`. No other variable name in the file contains a comma.
      - [x] **Exporter change, done:** 1.2.1 (`slevomat/figma-plugins` master `feef435`, 44 tests).
            It was needed because 1.1.0/1.2.0 couldn't handle the comma:
            - `letterSpacingFromName()`: accept `,` as well as `.` as the decimal separator
              (`-0,3%` → `-0.003em`). Today it doesn't match, and the name falls through to the old
              ÷ 100 path (right only by coincidence, because the stored value is −0.3).
            - `encodeSignAndDecimal()`: map `,` → `_` like `.`. Today `-0,3%` would become
              `--typography-spacing-n0,3`, and a comma is invalid in a custom property name. The same
              applies to JSON and Style Dictionary keys.
            - Add tests for `-0,3%` → `--typography-spacing-n0_3: -0.003em`.
      - [x] **Brand styles need Kensington.** Done by the owner on 2026-11-06: both are at `3%`,
            typed, with no binding. Figma can't edit a text style whose font isn't
            installed, and the scripting environment doesn't have Kensington. Manual step in Figma
            with the font installed: on `Brand/Heading/lg` and `Brand/Heading/xl`, detach the
            letter-spacing variable and type `3%`.
      - [x] Removed 2026-11-06, after checking that no style or alias referenced them. Rule followed: remove the seven old variables (`tighter … ultra-wide`) only **after** the Brand styles
            are unbound. Only the two Brand styles reference them; no variable aliases them. Deleting
            them earlier would leave the styles with a typed 1 px (≈ 0.03–0.04em on export). Nodes
            bound directly on the canvas keep their current value when a variable is deleted. Library
            consumers lose the link, but nothing is scoped to bind them any more.
- [x] **4. Export and diff.** Expected from a resolved export with exporter ≥ 1.2.1: `--typography-spacing-n2`
      `-0.02em`, `n1` `-0.01em`, `n0_3` `-0.003em`, `0` `0`, `3` `0.03em`; Brand lg/xl `0.03em`;
      no warnings. Regenerate `tokens.css` / `tokens.json`. Every `--typography-spacing-*`
      change goes into `CHANGELOG.md` and the Storybook Changelog story (old → new). The rename
      is a breaking token change.
      Done 2026-11-06 (`51f51f1`). The resolved export (exporter 1.2.1, 16:05) matched exactly, the
      `-0,3%` comma name included. `tokens.css` got the five new tokens by hand-merge (it is merged by
      hand, see plan 014), and the old block and its "outdated" comment are gone. Both changelogs are
      updated. **Not done:** `tokens.json` / `tokens.rgb.json` weren't re-exported. They are
      references-mode and hex exports, and neither holds spacing tokens today (the old ones never
      reached them). Re-export them with the next token update.
- [x] **5. Components:** `page-header` (`var(--typography-spacing-extra-wide, 1px)` →
      `var(--typography-spacing-3)`, plus the raw `-0.02em` / `-0.003em`) and `topbar`
      (`-0.01em`) switch to the tokens. Done in `51f51f1`. Checked in Storybook: heading 0.96px at 32px,
      location −0.4px at 20px, text −0.048px at 16px, topbar app name −0.2px at 20px.
- [ ] **6. Docs:** `docs/ai-prompts/components/page-header.md` (letter-spacing row:
      `--typography-spacing-extra-wide` 1px → `--typography-spacing-3` 0.03em),
      `docs/ai-prompts/components/topbar.md` (−1 % → `--typography-spacing-n1`), and a
      letter-spacing line in `CLAUDE.md` → Token naming. The procedure goes into the typography
      part of the 008 skill (plan 014 phase 7). Remove the "outdated" comment from `tokens.css`.
      Done in `51f51f1` except the 008 skill part, which waits for plan 014 phase 7.

## Production audit (2026-11-05)

Read from the production repo (`slevomat/slevomat` at `fe4f1d6b3d4`). Production's
`_variables.styl` is generated by Style Dictionary from **this exporter's JSON** (exported
2026-06-04, production commit `abcd8fd4c5c`, "update typography spacing tokens, adjust letter
spacing"):

| Token | Production | `tokens.css` (this repo) |
|---|---|---|
| `tighter` | `-0.0032em` | `-0.32px` |
| `tight` | `-0.0016em` | `-0.16px` |
| `normal` | `0` | `0px` |
| `narrow` | `0.004em` | *(missing)* |
| `wide` | `0.008em` | `0.4px` |
| `extra-wide` | `0.01em` | *(missing)* |
| `ultra-wide` | `0.03em` | *(missing)* |

Text-style letter spacing in production: heading 2xl/xl/md/sm `-0.02em`, heading lg `-0.01em`,
body md/sm `-0.003em`, captions `0`, **brand lg `0.03em`, brand xl `0.01em`**.

What this means:

- **Production already uses em**, with the exporter's names. `tokens.css` is the odd one out, with
  px and an older naming (`wide`/`wider`). This is why em was chosen (Decisions 1).
- **The `$typography-spacing-*` variables aren't used anywhere in production's Stylus.** Only
  the composite values reach the page through the `$typo-*` mixins. Renaming the spacing tokens is
  low-risk for production.
- **The real tracking values are tiny.** `-0.0032em` at 16 px is 0.05 px, which is invisible. If the
  intent was "−0.32 px", production has effectively no tracking from these tokens. The Figma
  values were probably meant as percentages (−0.32 % ≈ −0.003em, the same as body's −0.3 %), which
  supports encoding the percentage in the name.
- **Brand lg drift.** Production's brand lg is `0.03em` (`ultra-wide`), but the Figma style is now
  bound to `extra-wide` (1 → `0.01em`). One of them changed after the June export. Decided: 3 % for
  both (Decisions 3).

## Decisions (owner, 2026-11-06)

1. **Unit: em** in CSS. Figma text styles keep a typed-in percentage.
2. **Names carry the percentage**, the same way line height works. See the table in Approach.
3. **Brand: 3 %** for both Brand lg and Brand xl, following production's brand lg value. Docs
   and tokens are synced to that.
4. **The old `tokens.css` spacing block** gets a comment saying it's outdated and will be replaced
   by this plan. Done 2026-11-06; it isn't a token change, so it has no changelog entry.

## Open questions

None. The last one, CSS names for minus and decimal values, was answered on 2026-11-06: a leading
`-` becomes `n` and `.` becomes `_` (`--typography-spacing-n0_3`). An `n` prefix keeps the
names short. An underscore is valid in a custom property name and visibly isn't a word
separator, so `n0_3` can't be misread as 0 and 3.
