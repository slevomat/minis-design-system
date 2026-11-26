# Typography — the repo-specific steps

The **method** is in [`docs/ai-prompts/typography.md`](../../../docs/ai-prompts/typography.md)
(§3 Figma, §4 exporter, §6 changing typography, §7 pitfalls). It is written to be portable and is
the single source for *how Figma typography works*; this file doesn't restate it. It adds what only
this repo has, in the order the procedure in [SKILL.md](SKILL.md) uses it. Read §3 and §6 of that
doc first.

## Step 0 — classify the change

| You are changing | In Figma | CSS token(s) | Needs the Line heights command | Expect in the diff |
|---|---|---|---|---|
| A **heading size** | Layout variable `typography/<role>/size` for the modes that change | `--typography-heading-<role>-size`, in the `@media` block of that tier | Yes (the `-px` values follow size × ratio) | `layout` re-valued, per mode |
| A **body size** | Typography collection `Typography/size/*` (Body has no Layout size) | `--typography-size-*` (a primitive, so every role using it moves) | Yes, for every role bound to it | `typography` re-valued, many `layout` composites |
| A **line-height ratio** of a role | Alias the role's `typography/<role>/line-height` to another `Typography/line-height/N%` primitive | `--typography-<role>-line-height` per tier | Yes | `layout` re-valued, per mode |
| **A new ratio** | A new `Typography/line-height/N%` primitive (the name carries the value) | `--typography-line-height-N: N%` | Yes, once a role uses it | `typography` added |
| **Letter spacing** | A `Typography/spacing/N%` variable: no scopes, Code Syntax `var(--typography-spacing-…)`; the text style gets the **typed percentage** | `--typography-spacing-…` in em | No | `typography` added/renamed; **breaking** if a name changed |
| A **new role** | See docs §6 "Add a role" | the composite names + a `typo-*` mapping for production | Yes if its line height changes per breakpoint | `layout` added, `typography` maybe |
| A **breakpoint** a text style follows | Layout mode values | the `@media (min-width)` block | Yes | `layout` re-valued |

Letter-spacing names are the percentage: leading `-` → `n`, `.` or `,` → `_` (`-0,3%` →
`--typography-spacing-n0_3` = `-0.003em`). The set is exactly `{n2, n1, n0_3, 0, 3}`; a change to it
is announced in step 0 and passed to `pnpm tokens:check --spacing-set …`.

Heading/xl and Heading/2xl have no line-height token on purpose (`normal` / `auto` agree).
Brand lg/xl keep a typed percentage and are "not generated" by the Line heights command, by design.

## Step 2 — hard rules while editing in Figma

- **Never bind a ratio or spacing variable** (they have no scopes so Figma refuses; if you find one
  bound, it is a bug: 1.3 would apply as 1.3 px).
- **Never edit a `-px` variable by hand.** Change the size or ratio and run the command.
- Variable names carry the value; keep the comma for decimals (`-0,3%`).
- Desktop frames need Layout mode `md` or higher; a frame with no mode is `default` (mobile).

## Step 3 — what the Line heights command should show

Run the read-only check, apply only what it lists, check again until it says nothing is out of date.
Then look at one frame each in `default`, `md` and `xl`: for Heading/lg the line height goes
26 → 30 px (20 × 130 % → 24 × 125 %). If it doesn't, the size or the ratio isn't what you meant.

## Step 5 — what the export must look like for a typography change

`pnpm tokens:check` already covers: no `line-height-px`, the spacing set and values, ratio values
equal to their names, Layout line heights as percentages and sizes as px, every mode mapped.
Check by eye in the diff (typography is printed first):

- every `--typography-*-size` and `--typography-*-line-height` that changed is one you announced, in
  the modes you announced;
- `tokens.rgb.json` composites carry the **`default`-mode ratio** as a percentage (Heading/lg
  `130%`), never pixels. Production's mixins start below 360 px from that value;
- a rename shows up as removed + added (or a "renamed" candidate with the same value): it is a
  breaking change for production and goes in both changelogs.

## Step 6 — where each value goes in `tokens.css`

`packages/tokens/src/tokens.css`, the typography composite block (base = Figma `default` / `2xs`;
`@media (min-width: 408px)` is Figma `xs`; **768** is `md`, **1008** `lg`, **1256** `xl`, **1480**
`2xl`, **1920** `3xl`, **2560** `4xl`; Figma `sm` (600 px) has no block of its own in `tokens.css`
and only matters if a typography value differs there, which `tokens:check --css` would catch).

- Sizes: `--typography-heading-<role>-size: var(--typography-size-…)` with the px as a comment.
- Ratios: `--typography-<role>-line-height: var(--typography-line-height-N)`.
- Brand composites scale at 1480 px (`--typography-brand-{lg,xl}-size`); they are hand-maintained
  alongside the export, don't remove them.
- Spacing: the five em tokens in the primitives block.
- Never a `-px` value, never a raw paste.

## Step 7 — what to look at

Storybook → Design Tokens → Typography / Text Styles, and the components that use the changed
role: `<minis-page-header>` and `<minis-topbar>` use the heading and spacing tokens. Restart the
dev server first (the Tier toolbar reads `tokens.json` at build time). The Tier toolbar changes
tokens, not container queries: page-header and card-grid respond to real iframe width only.

## Step 8 — changelog wording

Typography changes are token changes: `### Tokens — <what>` in `CHANGELOG.md` and the same block in
the Storybook Changelog story. Give the CSS names and old → new per tier. A letter-spacing or
composite rename is breaking; say so, and say what production's `typo-*` classes will do.

## Step 9 — production

Production consumes the resolved JSON groups `typography` and `layout` through Style Dictionary
(`build/style-dictionary/`), generating `_variables.styl`; its `typo-*` classes and `$typo-*` mixins
pick a change up on the next build. Things to say in the note: the changed names, that
`layout.default.typography` is deleted by production's config, and that `-px` values must never
appear. Known differences production keeps for now (not ours to settle here): brand heading xl uses
`clamp(32px, 7vw, 56px)` at weight 700, Mini*S says 32 → 56 px at 1480 px and weight 400.

## Pitfalls specific to updates

- An export from an old exporter leaks `-px` into CSS (`line-height: 26px`) or breaks the spacing
  names: that is the `exporter-version` and `no-line-height-px` checks.
- `tokens.json` and `tokens.rgb.json` from different sessions or versions: the `same-version`
  check. Re-export both.
- Skipping the Line heights command leaves Figma frames with the old pixel line heights while the
  CSS is right: nothing in the export notices, so look at the frames (step 3).
