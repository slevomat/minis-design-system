# Typography — tokens, Figma and production

This document is self-contained: it doesn't need this repository or `CLAUDE.md`, so it can be
copied as-is into another AI tool, a Claude project or another repo. It covers the type roles, the
CSS tokens, how Figma represents them, how the exporter turns Figma into code, and how production
(the Slevomat Nette app) consumes them.

The reasoning behind these rules is in `todo-plans/014-responsive-line-height-in-figma.md` and
`todo-plans/015-letter-spacing-tokens.md`. The Figma file `MiniS DS` → page **TYPOGRAPHY** has a
visual explainer ("Typography tokens — Figma issues").

---

## 1. The roles at a glance

Every text uses one of these roles. **Sizes and line heights change at the viewport breakpoints**;
letter spacing is a share of the font size and needs no breakpoint.

| Role (Figma text style) | Size: mobile → 768px+ (→ later) | Line height: mobile → 768px+ | Letter spacing | Weight |
|---|---|---|---|---|
| Heading/2xl | 24 → 32 → **40 at 1256px** | `normal` | −2 % | 600 |
| Heading/xl | 24 → 32 | `normal` | −2 % | 600 |
| Heading/lg | 20 → 24 | 130 % → 125 % | −1 % | 600 |
| Heading/md | 18 → 20 | 133 % → 130 % | −2 % | 600 |
| Heading/sm | 16 → 18 | 138 % → 133 % | −2 % | 600 |
| Body/md | 16 | 138 % → 150 % | −0.3 % | 400 |
| Body/sm | 14 | 143 % → 157 % | −0.3 % | 400 |
| Caption/sm | 14 | 150 % | 0 | 400 |
| Caption/xs | 12 | 133 % | 0 | 400 |
| Caption/xxs | 10 | 140 % | 0 | 400 |
| Brand/Heading/lg | 24 → **32 at 1480px** | 110 % | 3 % | 400, uppercase |
| Brand/Heading/xl | 32 → **56 at 1480px** | 110 % | 3 % | 400, uppercase |

- Family: **Inter** for everything except Brand, which is **Kensington** (proprietary, not
  distributed; fallback **Bebas Neue**). Both brand faces are all-caps and single-weight, so brand
  text is always uppercase at weight 400.
- Heading/xl and Heading/2xl have **no line-height token on purpose**: `normal` in CSS and `auto`
  in Figma both use Inter's own metrics (≈ 121 %), so they already agree.
- Breakpoints: `--breakpoint-2xs` 360, `xs` 408, `sm` 600, **`md` 768**, `lg` 1008, **`xl` 1256**,
  **`2xl` 1480**, `3xl` 1920, `4xl` 2560 px.

## 2. CSS tokens

All live in `@minis/tokens` → `tokens.css`. Never hard-code a size, line height or letter spacing.

```css
/* Size scale (px) */
--typography-size-{3xs|2xs|xs|xs-plus|sm|md|lg|xl|2xl|3xl|4xl|5xl}   /* 8 10 12 13 14 16 18 20 24 32 40 56 */

/* Responsive role sizes — change with the viewport */
--typography-heading-{2xl|xl|lg|md|sm}-size
--typography-brand-{lg|xl}-size

/* Line-height scale — percentages of the font size */
--typography-line-height-{90|100|110|125|130|133|138|140|143|150|157}

/* Responsive role line heights — change with the viewport */
--typography-heading-{lg|md|sm}-line-height
--typography-body-{md|sm}-line-height
--typography-brand-{lg|xl}-line-height

/* Letter spacing — em, the name is the percentage (n = minus, _ = decimal point) */
--typography-spacing-n2     /* -0.02em  · headings */
--typography-spacing-n1     /* -0.01em  · Heading/lg */
--typography-spacing-n0_3   /* -0.003em · body */
--typography-spacing-0      /* 0        · captions */
--typography-spacing-3      /*  0.03em  · brand */

/* Weights and families */
--typography-weight-{light|regular|medium|semibold|bold|black}
--typography-font-family-{sans|mono|brand}
--typography-brand-weight   /* 400, always */
```

A role is applied through its part tokens. There is no single "Heading/lg" variable:

```css
.title {
  font-family: var(--typography-font-family-sans);
  font-size: var(--typography-heading-lg-size);
  font-weight: var(--typography-weight-semibold);
  line-height: var(--typography-heading-lg-line-height);
  letter-spacing: var(--typography-spacing-n1);
}
```

**Rules**
- Line height is a **percentage** (or unitless), never px. It must scale with the font size.
- Letter spacing is **em** (through the tokens), never px. A px value is right at one size only.
- Use the responsive role tokens (`--typography-heading-lg-size`, `…-line-height`), not the raw
  scale, so the breakpoint steps happen automatically.

## 3. Figma

The Figma file is `MiniS DS` (key `mfiAVMWkxiBRGnegjqLMNW`). Breakpoints are the modes of the
**Layout** variable collection: `default` (mobile) … `4xl`.

**One text style per role.** Don't make per-breakpoint styles. Switching a frame's Layout mode
changes the style's size and line height. A frame with no mode set uses `default` (mobile), so
**desktop frames need Layout mode `md` or higher**.

**Why Figma needs extra variables.** Figma has no units on variables: a number bound to line
height or letter spacing is always applied as **pixels** (`1.3` becomes 1.3 px). That's why:

| Property | How the text style gets it |
|---|---|
| Font family, weight | bound to `Typography/font-family/*`, `Typography/weight/*` |
| Font size | bound to the Layout size variable (`typography/heading/lg/size`, …) |
| Line height, roles that change per breakpoint (Heading lg/md/sm, Body md/sm) | bound to a **Figma-only** pixel variable `typography/<role>/line-height-px`. In each Layout mode its value is the size × ratio, rounded to whole pixels (Heading/lg: 26 → 30). |
| Line height, everything else | a typed percentage (Brand 110 %, captions) or `auto` (Heading xl/2xl) |
| Letter spacing | a typed **percentage** (−2 %, −1 %, −0.3 %, 0, 3 %). A percentage already scales with the size. |

- **`-px` variables are generated, not designed.** Don't edit them by hand. After any change to a
  size or ratio, recalculate them (`round(size × ratio)` for each Layout mode) and check them in
  `default`, `md` and `xl` frames.
- **Ratio and spacing variables carry their meaning in the name**:
  `Typography/line-height/130%`, `typography/heading/lg/line-height`, `Typography/spacing/-2%`.
  The stored number doesn't matter, and they are **not bindable** (no scopes), so nobody can apply
  1.3 px by accident. Figma doesn't allow `.` in variable names, so a decimal is written with a
  comma: `Typography/spacing/-0,3%`.
- **Dev Mode** shows the CSS token for these variables (Code Syntax), e.g.
  `var(--typography-heading-lg-line-height)` or `var(--typography-spacing-n2)`, not the pixel value.

## 4. The exporter

The Figma plugin `minis-designtokens-exporter` (repo `slevomat/figma-plugins`) produces
`tokens.json`, `tokens.rgb.json`, CSS and the Style Dictionary JSON. **Version 1.2.1 or newer is
required** for these rules:

- `…/line-height-px` variables are **skipped** in every output. They never reach code.
- Line-height and spacing values are **derived from the name**: `line-height/130%` → `130%`,
  `spacing/-0,3%` → `-0.003em`.
- CSS names: a leading `-` becomes `n`, and `.` or `,` becomes `_`: `spacing/-0,3%` →
  `--typography-spacing-n0_3`.
- In **resolved** mode (what production uses), a text style bound to a `-px` variable exports the
  mobile (`default`-mode) ratio as a percentage (`130%`), never pixels. In **references** mode it exports
  `var(--typography-<role>-line-height)`.
- Every export records the exporter version and settings in `$metadata` (and in the CSS header).
- Known issue: in references mode, a text-style composite whose name equals its Layout variable
  references itself (`--typography-heading-lg-line-height: var(--typography-heading-lg-line-height)`).
  `tokens.css` is merged by hand and isn't affected.

`tokens.css` is **merged by hand** from the export: the Layout modes become `@media (min-width: …)`
blocks. Don't paste a raw export over it.

## 5. Production (Slevomat Nette app)

- Production consumes the exporter's **resolved JSON** through Style Dictionary
  (`build/style-dictionary/`), which generates `app/stylus/settings/_variables.styl`. That file is
  auto-generated; don't edit it.
- In markup, use the **`typo-*` classes**: `typo-heading-lg`, `typo-body-md`, `typo-caption-sm`,
  `typo-brand-heading-xl`, and so on. In Stylus, use the `$typo-*` mixins
  (`app/stylus/plugins/typography.styl`). They combine the role's base values with the
  `$layout-<tier>-*` overrides at the same breakpoints as above.
- Production uses Stylus variables, not CSS custom properties. When Figma Dev Mode shows
  `var(--typography-heading-lg-line-height)`, the production equivalent is the `typo-heading-lg`
  class or `$typo-heading-lg` mixin.
- Known differences, to be settled by the porting rules (plan 013): production's brand heading xl
  uses a fluid `clamp(32px, 7vw, 56px)` and weight 700. Mini*S says 32 → 56 px at 1480 px and
  weight 400.

## 6. Changing typography

**Change a size or a ratio**
1. In Figma, change the size or ratio variable (Layout or Typography collection).
2. Recalculate the `-px` variables of the affected roles: `round(size × ratio)` for each Layout
   mode. Check `default`, `md` and `xl` frames.
3. Export with exporter ≥ 1.2.1: resolved JSON (production) and references JSON (`tokens.json`).
4. Hand-merge the changes into `tokens.css` (the right `@media` block), and check Storybook
   (Design Tokens → Typography / Text Styles, plus the components that use the role).
5. Record every changed token, old → new, in `CHANGELOG.md` **and** the Storybook Changelog page,
   in the same commit.
6. Tell production: the next Style Dictionary build picks the change up.

**Add a role**
- Its line height changes per breakpoint? Add a Layout ratio variable
  `typography/<role>/line-height` (aliasing a `Typography/line-height/N%` primitive), a generated
  `typography/<role>/line-height-px` (scope line height only, Code Syntax
  `var(--typography-<role>-line-height)`), and bind the `-px` one in the style.
- Its line height doesn't change? Type the percentage in the style.
- Letter spacing: type the percentage. If no `Typography/spacing/N%` variable exists for it, add one
  (no scopes, Code Syntax `var(--typography-spacing-…)`) and the matching CSS token.

## 7. Pitfalls

- Binding a ratio (`1.3`) or spacing (`-0.32`) variable in Figma gives **1.3 px / −0.32 px**. That's
  why those variables have no scopes.
- A raw Figma export pasted over `tokens.css` loses the `@media` structure and the hand-maintained
  blocks.
- An export made with an exporter older than 1.2.1 leaks `-px` values into CSS and production
  (`line-height: 26px`), or breaks the spacing names.
- `px` line heights or letter spacing in components don't scale. Use the tokens.
