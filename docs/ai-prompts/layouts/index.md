# Layouts — AI Prompt Reference

Instructions for assembling full page layouts from Mini*S components and design tokens.
These are **not** components — they are composition guides for AI agents to vibe-code responsive pages.

The rules below follow how production (slevomat.cz) is built. The owner decided them on
2026-11-26 (plan `todo-plans/030-layout-guides.md`); the measurements behind them are in the
[Production Reference](./production-reference.md).

---

## Available Layouts

- [Deal Detail](./deal-detail.md) — browsing page: photo gallery, tabs, main + sidebar
- [Checkout (Košík)](./checkout.md) — task page: step tabs in the medium container, cards in the narrow column

## Production Reference

- [Production Reference (slevomat.cz)](./production-reference.md): how production builds its
  layouts, measured on the live site on 2026-11-13: containers, the reading column, the main +
  sidebar splits, the layout spacing variables, and how all of it compares with Mini*S. **Read it
  before changing container or layout tokens or writing a new layout guide.**

---

## Three Width Levels

Every page picks its width level from **what kind of page it is**. All three are
`<minis-container>` variants:

| Level | Markup | Max width | Content from 1008px | Page type |
|---|---|---|---|---|
| **Wide** | `<minis-container>` | 1240px | 944px at 1008, 1176px from 1240 | **Browsing**: homepage, listings, deal detail, magazine |
| **Medium** | `<minis-container variant="medium">` | 1008px | 944px | **Task**: cart, login, checkout steps |
| **Narrow** | `<minis-container variant="narrow">` | 752px (from 768px) | 688px | **Reading / form column**: article text, a single form |

- Below 1008px, wide and medium are both full width (minus 8px / 16px padding); narrow is full
  width below 768px.
- A task page usually combines two levels: **medium** for the parts that span the whole step (step
  tabs, heading, step-wide messages) and **narrow** for the form or cards. See [Checkout](./checkout.md).
- The site header (topbar + main nav) always uses the **wide** container, whatever the page type.
- Production's names: wide = `grid-wrap--wide`, medium = `grid-wrap`, narrow = the cart's 704px
  column.

## Main + Sidebar

One rule for every page with a sidebar (deal detail, listing with filters, magazine):
**`<minis-sidebar-layout>`** inside a wide or medium container.

| | |
|---|---|
| Main column | fluid, default slot |
| Sidebar | **320px fixed** (`--layout-sidebar-width`), `slot="sidebar"`, always on the **right** |
| Gap | `--spacing-layout-lg` (32px from 1008px) |
| Stacking | one column below a **1008px** viewport, main first |
| Widths | 592 + 32 + 320 at 1008px · 824 + 32 + 320 (2.6 : 1) from 1240px |

```html
<minis-container>
  <minis-sidebar-layout>
    <main><!-- content --></main>
    <aside slot="sidebar"><!-- widgets --></aside>
  </minis-sidebar-layout>
</minis-container>
```

Don't build your own grid or media queries for this. Production splits each page differently
(2.2 : 1 to 3 : 1, 24–40px gaps); Mini*S standardises on this one. Full API:
[sidebar-layout.md](../components/sidebar-layout.md).

## The 12-Column Grid Is Optional

There is **no page-level 12-column grid**. Production's public site doesn't load one, and no
measured page needed more than main + sidebar. Use:

- `<minis-sidebar-layout>` for main + sidebar,
- `<minis-card-grid>` for card and tile grids (they belong inside components),
- a plain CSS grid only for a one-off split inside a section — halves, thirds, two-thirds:

```css
/* Optional: a one-off split inside a section, not a page grid */
.split {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--spacing-layout-md);
}
@media (min-width: 1008px) { /* --breakpoint-lg, as main + sidebar */
  .split { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

---

## Responsive Layout System

### Breakpoint tiers = Figma Layout modes

All layout spacing and container padding is driven by CSS custom properties that change at
breakpoint tiers. **You never write media queries for spacing** — the tokens handle it.

Each tier is one mode of the Figma Layout collection, named like the breakpoint it starts at
(G12, decided 2026-11-26). Production's `_variables.styl` uses the same modes on the same
breakpoints. In Figma, set a frame's Layout mode to the tier of its width.

| Tier / Figma mode | Viewport | Media query |
|------|----------|---------------|
| `default` | < 360px | none (`:root`) |
| `2xs` | 360–407px | `@media (min-width: 360px)` |
| `xs` | 408–599px | `@media (min-width: 408px)` |
| `sm` | 600–767px | `@media (min-width: 600px)` |
| `md` | 768–1007px | `@media (min-width: 768px)` |
| `lg` | 1008–1255px | `@media (min-width: 1008px)` |
| `xl` | 1256–1479px | `@media (min-width: 1256px)` |
| `2xl` / `3xl` / `4xl` | 1480 / 1920 / 2560px+ | `@media (min-width: 1480px)` … |

### Layout Spacing Tokens

| Token | default | 2xs | xs | sm | md | lg+ |
|-------|------|-----|----|----|----|-----|
| `--spacing-layout-none` | 0 | 0 | 0 | 0 | 0 | 0 |
| `--spacing-layout-xs` | 4px | 4px | 4px | 8px | 8px | 8px |
| `--spacing-layout-sm` | 8px | 12px | 12px | 16px | 16px | 16px |
| `--spacing-layout-md` | 12px | 16px | 16px | 16px | 20px | 24px |
| `--spacing-layout-lg` | 16px | 16px | 16px | 20px | 24px | 32px |
| `--spacing-layout-xl` | 20px | 20px | 24px | 32px | 32px | 48px |
| `--spacing-layout-xxl` | 24px | 24px | 24px | 24px | 24px | 24px |

### Container Tokens

| Token | < 408 | 408+ | 768+ | 1008+ |
|-------|----|----|----|----|
| `--container-padding` | 8px | 16px | 16px | 32px |
| `--container-narrow-padding` | 8px | 16px | 16px | 32px |
| `--container-width` | 100% | 100% | 100% | 1240px |
| `--container-medium-width` | 100% | 100% | 100% | 1008px |
| `--container-narrow-width` | 100% | 100% | 752px | 752px |
| `--layout-sidebar-width` | 320px | 320px | 320px | 320px |

### Responsive Typography (Headings)

| Token | < 768 | 768+ | 1256+ |
|-------|------|-------------|--------------|
| `--typography-heading-2xl-size` | 24px | 32px | 40px |
| `--typography-heading-xl-size` | 24px | 32px | 32px |
| `--typography-heading-lg-size` | 20px | 24px | 24px |
| `--typography-heading-md-size` | 18px | 20px | 20px |
| `--typography-heading-sm-size` | 16px | 18px | 18px |

---

## Two Responsive Mechanisms — When to Use Which

The system deliberately uses **two** responsive mechanisms. Understanding the split
prevents subtle layout bugs:

**1. Viewport-driven tokens (media queries)** — spacing, container padding/width,
and typography tokens change with the *browser viewport* via media queries baked
into `tokens.css`. Consumers never write these media queries; they just use the
tokens. Use this for page-level layout: section spacing, heading sizes.

**2. Container queries (component-internal layout)** — components that rearrange
their own internals (`<minis-page-header>`, `<minis-card-grid>`) use
`@container (min-width: …)` on **their own width** (`container-type: inline-size`
on `:host`). They adapt to whatever box they're placed in, not to the screen.

**Convention for new components:** if a component changes its internal layout at
a breakpoint, use a container query, and pick the breakpoint from the
`--breakpoint-*` scale (hardcode the number with a comment — CSS custom
properties cannot be used inside `@container` or `@media` conditions).

**The one exception — `<minis-sidebar-layout>`** combines both: a media query for the
page breakpoint (1008px) and a container query as a guard (own width ≥ 944px). Container padding
jumps 16 → 32px at 1008px, so the content box is wider at a 1007px viewport (975px) than at
1008px (944px); a container query alone can't express "stack below 1008px".

**Known caveat:** a container-responsive component that also consumes
viewport-driven tokens (e.g. `--container-padding`) can mismatch when placed in
a narrow box on a wide screen — it renders its mobile layout with desktop
spacing. These components are designed to sit at (near) full page width. If you
must embed one in a narrow panel, override the viewport tokens locally on the
host element:

```css
.sidebar minis-page-header { --container-padding: var(--linear-sp-linear-4); }
```

---

## Common Layout Primitives

### Container wrapper

```html
<minis-container>                  <!-- wide: browsing pages -->
<minis-container variant="medium"> <!-- task pages -->
<minis-container variant="narrow"> <!-- reading / form column -->
```

### Main + sidebar

```html
<minis-sidebar-layout>
  <main>…</main>
  <aside slot="sidebar">…</aside>
</minis-sidebar-layout>
```

### Section Cards

Content sections use white or faded background cards:

```css
.section-card {
  background: var(--color-surface-primary, white);
  border-radius: var(--border-radius-xl, 16px);
  padding: var(--spacing-layout-lg);
}

.section-card--faded {
  background: var(--color-surface-faded, #f1f3f5);
}
```

### Header Band

The topbar + main navigation sit in a white band with a bottom border, in the **wide** container
on every page:

```css
.header-band {
  background: var(--color-surface-primary, white);
  border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);
}
```

### Tab Navigation Band

> **Rule:** `<minis-navigation variant="tabs">` is **ALWAYS** wrapped in a full-width band with surface-primary background and border-subtle borders on top and bottom. Never place tab navigation without this wrapper.

```html
<div style="background: var(--color-surface-primary, white); border-top: 1px solid var(--color-border-subtle, #e3e4e6); border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);">
  <minis-container>
    <minis-navigation variant="tabs">
      <minis-navigation-item active>Tab 1</minis-navigation-item>
      <minis-navigation-item>Tab 2</minis-navigation-item>
    </minis-navigation>
  </minis-container>
</div>
```

---

## Page Structure Pattern

Every page is a vertical stack of full-width bands; each band holds one container of the page's
width level:

```
┌───────────────────────────────────────────────┐
│  Header band (white, border-bottom)           │
│  ┌─ Container (wide, always) ───────────────┐ │
│  │  <minis-topbar>                          │ │
│  │  <minis-navigation variant="main-nav">   │ │
│  └──────────────────────────────────────────┘ │
├───────────────────────────────────────────────┤
│  Page bands — container = the page's level:   │
│  browsing → wide · task → medium + narrow     │
│  ┌─ Container ──────────────────────────────┐ │
│  │  breadcrumbs, gallery, title …           │ │
│  └──────────────────────────────────────────┘ │
├───────────────────────────────────────────────┤
│  Tab band (white, border top + bottom)        │
│  ┌─ Container ──────────────────────────────┐ │
│  │  <minis-navigation variant="tabs">       │ │
│  └──────────────────────────────────────────┘ │
├───────────────────────────────────────────────┤
│  Content                                      │
│  ┌─ Container ──────────────────────────────┐ │
│  │  <minis-sidebar-layout>                  │ │
│  │  ┌─ Main (fluid) ──────┐ ┌─ Sidebar ───┐ │ │
│  │  │  content cards      │ │  320px      │ │ │
│  │  └─────────────────────┘ └─────────────┘ │ │
│  │  (stacked below 1008px, main first)      │ │
│  └──────────────────────────────────────────┘ │
└───────────────────────────────────────────────┘
```

Background: `var(--color-background)` (the page background token; never a hardcoded colour).

---

**Last updated:** 2026-11-26
