---
id: 014
title: Responsive line height in Figma text styles
status: in-progress
created: 2026-11-05
updated: 2026-11-06
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
   resolved size × resolved ratio for that mode, **rounded to whole pixels**:

   | Role | default … sm | md … 4xl |
   |---|---|---|
   | Heading/lg | 20 × 1.30 = **26** | 24 × 1.25 = **30** |
   | Heading/md | 18 × 1.33 = 23.94 → **24** | 20 × 1.30 = **26** |
   | Heading/sm | 16 × 1.38 = 22.08 → **22** | 18 × 1.33 = 23.94 → **24** |
   | Body/md | 16 × 1.38 = 22.08 → **22** | 16 × 1.50 = **24** |
   | Body/sm | 14 × 1.43 = 20.02 → **20** | 14 × 1.57 = 21.98 → **22** |

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
| `formatTextStyleToken()`, `resolved` mode (what production consumes) | Uses `style.lineHeight`, which is a percentage today. | Once bound, this reads `{unit: PIXELS, value: 26}` for whichever mode is current. Use the ratio variable's name-derived percentage instead (fall back to the style value). |
| New: "Recalculate line heights" | — | For each `typography/<role>/line-height` with a matching text style: resolve size × ratio per Layout mode, round to whole pixels and write `…/line-height-px`. Create it if it's missing and the ratio varies. Report what changed. |

A text style bound to a `-px` variable must still export
`--typography-heading-lg-line-height: var(--typography-line-height-130)` and so on, exactly as it
does today. `tokens.css` must be byte-identical before and after this plan, apart from intended
fixes.

## Phases

- [x] **0a. Production audit first.** Done 2026-11-05. The results are in "Production audit" below.
- [x] **0b. Decide** the remaining open questions. Done 2026-11-06, see "Answers".
- [x] **1. Exporter: skip `-px`** and fix the resolved-mode line height. Done 2026-11-06:
      exporter 1.1.0 (figma-plugins PR #1, merge `fed1340`), shipped together with plan 015 phase 2.
      The owner ran a references-mode export of the real file, and the output was as expected apart from
      two warnings: Brand lg/xl are still bound to `extra-wide`, which plan 015 phase 3 removes. Still
      open: a **resolved-mode** export after phase 3, where heading lg must read `130%` and not
      `26px`. Also run production's Style Dictionary build once on the next export, to confirm the new
      `$metadata.exporterVersion` / `$metadata.settings` block produces no variables.
- [x] **2. Figma: create the `-px` variables** (script via MCP), scoped to `LINE_HEIGHT`. Done
      2026-11-06: `typography/{heading/lg,heading/md,heading/sm,body/md,body/sm}/line-height-px`
      (`VariableID:6084:142`–`146`) in the Layout collection, all ten modes, rounded size × ratio. Each
      has a description saying it is Figma-only, generated, and skipped by exporter ≥ 1.1.0.
      **Code Syntax (Web)** is set to the responsive CSS variable, e.g. `var(--typography-heading-lg-line-height)`,
      so Dev Mode shows the token instead of the pixel value. One value covers every mode, because the
      CSS variable itself changes per breakpoint. The idea comes from Andii Hei, "Going Unitless in Figma
      — A Workaround" (Design Systems Collective, Jan 2026), which uses fixed variables without modes.
      The exporter doesn't read Code Syntax.
- [x] **3. Figma: bind** them in Heading lg/md/sm, Body md/sm, and narrow the ratio variables' scopes.
      Done 2026-11-06. Scopes set to none (hidden from every picker) on all 11
      `Typography/line-height/N%` primitives and all 7 Layout `typography/*/*/line-height` ratios,
      brand included. Existing bindings are untouched.
- [ ] **4. Verify.** Specimens in `default`, `md` and `xl` frames show 26/30 px etc.; a full export
      produces the same `tokens.css`; Storybook Tier toolbar values are unchanged.
      - [x] Figma, 2026-11-06: all five styles × three modes read back the expected size and line
            height, and two lines measure exactly 2 × line height (15/15). The board's section 05
            "After" row is now live.
      - [x] References-mode CSS export (exporter v1.2.0, 2026-11-06T15:17): no `-px` anywhere;
            the five styles export `var(--typography-<role>-line-height)`; the Layout line-height
            and size values in all ten modes equal `tokens.css` (138/143/130/133/138 % → 150/157/
            125/130/133 % from `md`).
      - [x] Resolved-mode JSON export (v1.2.0, 2026-11-06T15:19): heading lg `130%`, md `133%`, sm
            `138%`, body md `138%`, body sm `143%`. These are the `default`-mode ratios, never pixels. No `-px`
            anywhere. Compared with production's `typography.json` (export of 2026-06-04), the only
            differences in the type styles are:
            - body md 150 → 138 %, body sm 150 → 143 %, heading lg 125 → 130 %. Intended: this is
              production's base value, used below 360 px, so the audit's < 360 px bug is fixed.
            - **brand lg letter spacing 0.03em → 0.01em. Unintended.** The Figma style is bound to
              `extra-wide` (see plan 015). **Don't hand an export to production before plan 015 phase 3**,
              or brand lg loses its tracking until the next export.
      - [x] `tokens.css` unchanged by the line-height part (checked against the references export
            above). Storybook Tier values come from `tokens.json`, which hasn't been re-exported, so
            they can't have changed yet. Re-check when it is.
      - **Found in that export, older than this plan:** in references mode, a text-style composite
        whose name equals its Layout variable references itself:
        `--typography-heading-lg-line-height: var(--typography-heading-lg-line-height)` (likewise
        heading md/sm, body md/sm, and `.Components` `--accordion-padding-y`). Pasted into one
        `:root`, that is a CSS cycle and the value becomes invalid. `tokens.css` isn't affected,
        because it is merged by hand and has no composite block, and production consumes resolved JSON. But the
        exporter should skip a composite line that would reference its own name. Exporter follow-up.
      - [ ] Production's Style Dictionary build ignores the new `$metadata` block. Production's JSON
            already carries `$metadata` (exportDate, exportMode, figmaFile) without trouble. New in it are
            `exporterVersion` and a nested `settings` object, so one build run is needed to confirm. That
            needs the production side.
- [ ] **5. Exporter: "Recalculate line heights" command.** Replaces the one-off script.
      It must also create the Code Syntax (`var(--typography-<role>-line-height)`) and the description
      for any new `-px` variable. Before building it, compare it with the community plugin "Unitless Line
      Height & Tokens" (linked from the article above).
- [x] **6. Docs.** Update the Figma TYPOGRAPHY page board and the exporter's `CLAUDE.md`. Add a line to
      this repo's `CLAUDE.md` → Token exports ("`-px` line-height variables are Figma-only").
      Done 2026-11-06: the Figma board, the exporter's own docs, `CLAUDE.md` → Token exports →
      "Typography in the export", and the portable `docs/ai-prompts/typography.md`.
- [ ] **7. Typography-update procedure as a skill.** Write down "how to change a size or ratio"
      (edit in Figma → Recalculate → export → check the `tokens.css` diff → both changelogs) as a
      section of the token-update skill in plan 008, not as a separate skill or agent. A
      typography change is a token change, and splitting the two procedures would let them drift.
      008 is optional today; this step is the reason to do at least its typography part.

## Production audit (2026-11-05)

Source: the production repo (`slevomat/slevomat`, master at `fe4f1d6b3d4`, 2026-11-05), read-only.
slevomat.cz itself blocks the automated browser with a Cloudflare check, so nothing was measured
in a browser. The code is the better source anyway, because it shows the breakpoints directly.

**How production gets its typography.** `build/style-dictionary/tokens/*.json` are **this
exporter's JSON output** (`exportMode: "resolved"`, exported 2026-06-04). Style Dictionary turns
them into `app/stylus/settings/_variables.styl` ("auto-generated"). The `$typo-*` mixins in
`app/stylus/plugins/typography.styl` combine the composite values with the `$layout-<tier>-*`
overrides. The Mini*S type classes are used in about 826 Latte files (`typo-body-md` 1632×,
`typo-body-sm` 1345×, `typo-heading-md` 690×, `typo-heading-lg` 580×, …).

**What matches.** The breakpoints are identical: 360 / 408 / 600 / 768 / 1008 / 1256 / 1480 px.
Every responsive size and line height matches `tokens.css` and the Figma Layout variables. For
example, heading lg is 20 px / 130 % → 24 px / 125 % from 768 px, and body md is 138 % → 150 %.
The values this plan generates are therefore the production values.

**What differs:**

1. **Below 360 px, production uses the Figma *text style's* line height.** The mixins start
   from the composite value, which the resolved export takes from the text style, and only override it
   from `mobile-small` (360 px). Heading lg and Body md/sm have the desktop ratio typed into the
   style, so a 320 px phone gets heading lg 125 % instead of 130 %, body md 150 % instead of 138 %,
   and body sm 150 % instead of 143 %. Heading md/sm happen to have the mobile ratio in the style
   and are correct. **This is the same drift this plan removes.** Once phase 1 makes the resolved
   export take the `default`-mode ratio, the next export fixes it.
2. **Heading/xl and Heading/2xl are `line-height: normal` in production too** (decided 2026-11-05:
   keep `auto`, see Answers). Figma's `auto` and CSS
   `normal` both use the font's own line metrics (Inter ≈ 121 %), so Figma, CSS and production
   already agree. Kept as `auto`, outside the `-px` set. If a fixed ratio is
   wanted, that's a new token and a visible change on ~230 production uses, so it's a design
   decision rather than part of this plan.
3. **Brand heading xl is hand-written in production:** `font-size: clamp(32px, 7vw, 56px)` (fluid,
   not the 32 → 56 px step at 1480 px), and weight `700` (Mini*S says brand text is always 400).
   This is outside this plan. It belongs to the porting rules (plan 013).

**Why phase 1 matters for production.** If the styles were bound to `-px` variables before the
exporter changes, the next resolved export would hand production `line-height: 26px` for the
heading lg composite. The `-px` variables would also appear in `layout.json`, and from there
in `_variables.styl`. So phase 1 has to cover the Style Dictionary JSON, not only `tokens.css`.

## Answers (2026-11-05)

- **Skip by name suffix.** The exporter recognises Figma-only variables by the name ending
  `-px`. Considered instead: a text label in the variable's description, or hiding the variable
  from publishing. Both are invisible in the variables panel and easy to lose on a rename, and
  hiding it might stop the variable from resolving in published styles. The suffix is visible
  wherever the name is.
- **Heading/xl and Heading/2xl keep `auto`** (owner, 2026-11-05). There are no intended
  line-height values in the Layout collection, `tokens.json`, `tokens.css` or Storybook, and production
  renders them with `line-height: normal`. Figma's `auto` and CSS `normal` both use Inter's own
  metrics (≈ 121 %), so the three already agree. They stay outside the `-px` set.
- **Round to whole pixels** (owner). 23.94 → 24. Figma can differ from the browser by up
  to about 0.1 px, which is invisible, and the redlines show clean numbers. CSS is unaffected:
  it keeps computing size × ratio.
- **Letter spacing** is split out into plan 015 (high priority).
- **A skill for future typography updates:** yes, as phase 7.

## Open questions

None.

Answered by the audit: Caption/* match production (sm 150 %, xs 133 %, xxs 140 %, no breakpoint
change), so they keep their typed percentage. The .Label/* styles are Figma-internal (dot
prefix, not exported).
