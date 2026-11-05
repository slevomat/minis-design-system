---
id: 014
title: Responsive line height in Figma text styles
status: draft
created: 2026-11-05
updated: 2026-11-05
owner: Lexislav
---

# 014 — Responsive line height in Figma text styles

> Touches two repos: the Figma file (`mfiAVMWkxiBRGnegjqLMNW`) and the exporter plugin
> (`Figma plugins/minis-designtokens-exporter/`). Nothing in this repo's CSS changes.
> The audit behind it is on the Figma TYPOGRAPHY page → "Typography tokens — Figma issues".

## The problem

In CSS, line height changes with the breakpoint. `--typography-heading-lg-line-height` is 130 %
on mobile and 125 % from `md` up, and the same goes for heading md/sm and body md/sm. In Figma, the
text styles can't follow this:

- **Figma applies a FLOAT variable bound to line height as pixels, whatever the number.** This was
  re-tested on 2026-11-05. `1.3` binds as 1.3 px and `130` binds as 130 px. There is no unit
  setting on variables.
- So no text style binds line height. Each one has a fixed percentage typed in, and only font size
  follows the Layout mode.
- The typed-in percentages have drifted. Some styles carry the mobile ratio, some the desktop one
  (Body/md is 150 % but the token is 138 % on mobile). Figma therefore doesn't match any real
  breakpoint exactly.

The `Typography/line-height/N%` primitives are only meaningful by name. The exporter derives
`N%` from the name (`formatFloat()` in the exporter's `code.ts`) and ignores the stored number.
They stay as multipliers (`1.30`) so that anything reading the raw value still gets something
sensible.

## Constraints

- **CSS doesn't change.** `tokens.css` keeps unitless/percentage line heights that scale with
  font size. The Figma-side fix must not leak pixel line heights into the CSS export.
- **One text style per role.** Switching a frame's Layout mode must change size *and* line height
  together, as size already does today. Designers must not swap styles by hand.
- **Mobile and desktop on the same canvas.** Anything that rewrites styles file-wide is out.
- **Kensington/brand rules unchanged** (see `CLAUDE.md` → Typography family).

## Approach — generated pixel variables

Give Figma what it understands, which is pixels, and compute them from the tokens:

```
Typography/size/*  ─┐
                    ├─ size × ratio, per Layout mode ─▶ typography/<role>/line-height-px  (Layout, FLOAT, px)
typography/<role>/  ─┘                                              │
  line-height (ratio, by name)                                      ▼
                                                    Text style <Role> binds lineHeight to it
                                                                    │
                                                    Frame Layout mode = md ─▶ 24 px / 30 px
```

1. **New Layout variables, one per role whose ratio changes between modes.** Today that's
   heading lg/md/sm and body md/sm. Each is
   `typography/<role>/line-height-px`, scoped to `LINE_HEIGHT` only. Its value in each mode =
   resolved size × resolved ratio for that mode:

   | Role | default … sm | md … 4xl |
   |---|---|---|
   | Heading/lg | 20 × 1.30 = **26** | 24 × 1.25 = **30** |
   | Heading/md | 18 × 1.33 = **23.94** | 20 × 1.30 = **26** |
   | Heading/sm | 16 × 1.38 = **22.08** | 18 × 1.33 = **23.94** |
   | Body/md | 16 × 1.38 = **22.08** | 16 × 1.50 = **24** |
   | Body/sm | 14 × 1.43 = **20.02** | 14 × 1.57 = **21.98** |

   (Values read from the Figma file on 2026-11-05.)
2. **Bind them** in the five text styles' line height.
3. **Roles with a constant ratio keep their percentage.** Brand lg/xl are 110 % in every mode.
   A typed-in 110 % already scales correctly when the size jumps at `2xl`, so a pixel variable
   would only add something to regenerate. Captions and labels have no responsive token and keep
   their percentage too.
4. **Hide the ratio variables from the line-height picker.** Remove `LINE_HEIGHT` from the scopes
   of `Typography/line-height/*` and `typography/<role>/line-height`, so nobody binds 1.3 px by
   accident. `typography/body/md/line-height` is currently `ALL_SCOPES`.
5. **A "Recalculate line heights" command** rewrites the `-px` variables from the current sizes
   and ratios. Run it after any size or ratio change. It lives in the exporter plugin, which
   already knows the role ↔ variable mapping (see below). Until then, the same calculation can
   be run as a one-off script through the Figma MCP.

### Rejected alternatives

- **One style per breakpoint** (`Heading/lg/mobile`, `Heading/lg/desktop`, or
  `heading/size-xs/breakpoint-xs|breakpoint-xl`). Exact, and only ×2, because every ratio changes
  at one point (`md`). But mode switching stops working: every text layer and every component
  needs a manual style swap or a breakpoint variant. A "mobile" style in a desktop-mode frame
  silently mixes a desktop size with a mobile line height. It also adds styles to a file whose
  complaint is already "more styles than tokens".
- **A plugin that recalculates the styles themselves.** A text style has one line height for the
  whole file. A plugin can either flip every style at once (no mobile and desktop side by side) or
  write pixel overrides onto each text layer (detached from the style, and stale after any edit).
  The useful part of the idea, automatic recalculation, survives as step 5. It just targets
  variables instead of styles.
- **Wait for Figma to add units to variables.** Not announced as of 2026-11-05. If it ships, this
  plan becomes "rebind to the ratio variables and delete the `-px` set".

## Exporter changes (separate repo)

The exporter has to know about the `-px` variables, or they leak into CSS as broken values:

| Where (`code.ts`) | Today | Needed |
|---|---|---|
| `formatFloat()` | A name containing `height` exports the raw number as unitless. `…/line-height-px` = 26 would become `line-height: 26` (26 × font size). | Skip `*/line-height-px` variables in every output (CSS, `tokens.json`, `tokens.rgb.json`). Or emit them only as a comment, if wanted for reference. |
| `buildLayoutLineHeightMap()` | Matches names ending in `/line-height`. | Unchanged. `-px` doesn't match, and the style → `var(--typography-<role>-line-height)` reference keeps working. |
| `formatTextStyleToken()`, `resolved` mode | Uses `style.lineHeight`, which is a percentage today. | Once bound, this reads `{unit: PIXELS, value: 26}` for whichever mode is current. Use the ratio variable's name-derived percentage instead (fall back to the style value). |
| New: "Recalculate line heights" | — | For each `typography/<role>/line-height` with a matching text style: resolve size × ratio per Layout mode and write `…/line-height-px`. Create it if it's missing and the ratio varies. Report what changed. |

A text style bound to a `-px` variable must still export
`--typography-heading-lg-line-height: var(--typography-line-height-130)` and so on, exactly as it
does today. `tokens.css` must be byte-identical before and after this plan, apart from intended
fixes.

## Phases

- [ ] **0. Decide** the open questions below.
- [ ] **1. Exporter: skip `-px`** and fix the resolved-mode line height. Release before any `-px`
      variable exists in the file, so an export in between can't break CSS.
- [ ] **2. Figma: create the five `-px` variables** (script via MCP), scoped to `LINE_HEIGHT`.
- [ ] **3. Figma: bind** them in Heading lg/md/sm and Body md/sm, and narrow the ratio variables'
      scopes.
- [ ] **4. Verify.** Specimens in `default`, `md` and `xl` frames show 26/30 px etc.; a full export
      produces the same `tokens.css`; Storybook Tier toolbar values are unchanged.
- [ ] **5. Exporter: "Recalculate line heights" command.** Replaces the one-off script.
- [ ] **6. Docs.** Update the Figma TYPOGRAPHY page board and the exporter's `CLAUDE.md`. Add a line to
      this repo's `CLAUDE.md` → Token exports ("`-px` line-height variables are Figma-only").

## Open questions

1. **Rounding.** Keep fractions (23.94, matching the browser) or round to whole pixels (24, cleaner
   redlines)? Leaning towards fractions.
2. **Heading/xl and Heading/2xl** are `auto` and have no line-height token, in Figma or in CSS.
   What should they be? Without a token they can't be part of this.
3. **Skip by name suffix, or by marker?** The suffix `-px` is simple. An explicit marker
   (description tag such as `[figma-only]`, or `hiddenFromPublishing`) is sturdier. Need to check
   that a hidden variable still resolves inside a published text style for library consumers.
4. **Letter spacing.** Styles use percentages, which already scale, so no `-px` set is planned. But
   the three sources disagree about `typography/spacing/*`. Figma applies a bound value as pixels
   (`-0.32 px`). `tokens.css` has `--typography-spacing-tighter: -0.32px`. The current exporter
   code would emit `-0.0032em`, because it treats the value as a percentage. Which is intended, and
   would the next export change `tokens.css`? Only the Brand styles bind letter spacing today.
5. **Drift cleanup.** After binding, the five styles are exact in every mode. Should Caption/* and
   .Label/* be checked against the CSS at the same time?
