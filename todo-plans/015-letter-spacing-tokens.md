---
id: 015
title: Letter-spacing tokens — one meaning in Figma, the exporter and CSS
status: draft
created: 2026-11-05
updated: 2026-11-05
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

- **CSS letter spacing should scale with font size** (em), like the components already do. A
  fixed px value looks right at one size and wrong at the others. *(Proposed: confirm in
  phase 1.)*
- **Figma can only bind pixels.** A token that must scale with size can't be bound in Figma. That's
  the same wall as plan 014.
- Production's real values decide what the tokens should be. The production audit in plan 014
  phase 0a covers letter spacing too.

## Approach (proposed)

Treat letter spacing like the line-height ratios:

- **The tokens are percentages of font size, and the meaning is in the name.** For example
  `typography/spacing/tight-2` → `-0.02em`, in the same way `line-height/130%` → `130%`. The
  exporter derives the CSS value from the name, so the stored number doesn't matter. The exact
  naming is an open question.
- **Text styles keep a typed-in percentage.** A percentage already scales with size, so there's
  no need for a `-px` set as in plan 014. The spacing variables get no `LETTER_SPACING` scope, so
  they can't be bound by mistake.
- **The Brand styles unbind** and type the percentage that matches the intended look. Phase 0
  decides whether that is 1 px at 32 px (≈ 3 %) or something else.
- **CSS** gets the full, renamed set, including `extra-wide` / `ultra-wide` or whatever replaces
  them. `page-header` and `topbar` then use the tokens instead of raw em values.

Rejected: **px everywhere** (fix the exporter to emit px). It's simple and matches what Figma
renders, but letter spacing then stops scaling with size, and the existing em values in the
components would have to become per-size px values.

## Phases

- [x] **0. Production values.** Done 2026-11-05 (see "Production audit" below).
- [ ] **1. Decide** the unit (em proposed), the names, and the Brand value. Write the
      answers here.
- [ ] **2. Exporter:** derive em from the name, drop the "bound = percent" special case, fix the
      `formatFloat()` comment, update `TOKEN_CHANGES.md`.
- [ ] **3. Figma:** rename and revalue `typography/spacing/*`, remove the `LETTER_SPACING` scope,
      unbind the Brand styles and type their percentage.
- [ ] **4. Export and diff.** Regenerate `tokens.css` / `tokens.json`. Every `--typography-spacing-*`
      change goes into `CHANGELOG.md` and the Storybook Changelog story (old → new). The rename
      is a breaking token change.
- [ ] **5. Components:** `page-header` and `topbar` switch from raw em to the tokens, and the
      `extra-wide` fallback goes.
- [ ] **6. Docs:** `CLAUDE.md` → Token naming gets a letter-spacing line. The procedure goes into
      the typography part of the 008 skill (plan 014 phase 7).

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
  px and an older naming (`wide`/`wider`). This settles open question 1 in favour of em, unless
  someone objects.
- **The `$typography-spacing-*` variables aren't used anywhere in production's Stylus.** Only
  the composite values reach the page through the `$typo-*` mixins. Renaming the spacing tokens is
  low-risk for production.
- **The real tracking values are tiny.** `-0.0032em` at 16 px is 0.05 px, which is invisible. If the
  intent was "−0.32 px", production has effectively no tracking from these tokens. The Figma
  values were probably meant as percentages (−0.32 % ≈ −0.003em, the same as body's −0.3 %), which
  supports encoding the percentage in the name.
- **Brand lg drift.** Production's brand lg is `0.03em` (`ultra-wide`), but the Figma style is now
  bound to `extra-wide` (1 → `0.01em`). One of them changed after the June export. Which one is
  intended is part of open question 3.

## Open questions

1. **em or px in CSS?** Production already uses em (see the audit), so em is proposed. Anyone relying
   on `--typography-spacing-*` being px? Nothing in `packages/components` uses them, apart from the
   missing `extra-wide`.
2. **Names.** Keep `tighter … ultra-wide` with fixed meanings, or encode the value in the name
   (`spacing/-2`, `spacing/-0.3`) the way line height does? Name-encoded is honest about Figma
   ignoring the value. Semantic names read better.
3. **Brand.** Is the intended look 1 px fixed (what Figma shows today) or a share of the size?
4. **Was `tokens.css`'s spacing block hand-written?** If yes, mark it `HAND-MAINTAINED` like the
   `FONTS` block until phase 4, so a re-export doesn't silently overwrite it.
