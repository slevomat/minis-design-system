# Layouts — AI Prompt Reference

Instructions for assembling full page layouts from Mini*S components and design tokens.
These are **not** components — they are composition guides for AI agents to vibe-code responsive pages.

---

## Available Layouts

- [Deal Detail](./deal-detail.md) — Hotel/experience detail page: photo gallery, tabbed content, aside + main split
- [Checkout (Košík)](./checkout.md) — Single-column checkout flow: narrow container, stacked cards, step tabs

---

## Responsive Layout System

### Breakpoint Tiers

All layout spacing and container padding is driven by CSS custom properties that change at breakpoint tiers.
**You never write media queries for spacing** — the tokens handle it.

| Tier | Viewport | Token trigger |
|------|----------|---------------|
| **base** | ≤ 407px | default values |
| **sm** | 408–767px | `@media (min-width: 408px)` |
| **md** | 768–1255px | `@media (min-width: 768px)` |
| **xl** | ≥ 1256px | `@media (min-width: 1256px)` |

### Layout Spacing Tokens

These tokens automatically scale with the viewport tier:

| Token | base | sm (408px+) | md (768px+) | xl (1256px+) |
|-------|------|-------------|-------------|--------------|
| `--spacing-layout-none` | 0 | 0 | 0 | 0 |
| `--spacing-layout-xs` | 4px | 8px | 8px | 8px |
| `--spacing-layout-sm` | 12px | 16px | 16px | 16px |
| `--spacing-layout-md` | 16px | 24px | 24px | 24px |
| `--spacing-layout-lg` | 20px | 32px | 32px | 32px |
| `--spacing-layout-xl` | 32px | 48px | 48px | 48px |

### Container Tokens

| Token | base | sm | md | xl |
|-------|------|----|----|----|
| `--container-padding` | 8px | 16px | 16px | 32px |
| `--container-narrow-padding` | 8px | 16px | 16px | 32px |
| `--container-width` | 100% | 100% | 100% | 1240px |
| `--container-narrow-width` | 100% | 100% | 752px | 752px |

### Responsive Typography (Headings)

| Token | base | md (768px+) | xl (1256px+) |
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
tokens. Use this for page-level layout: grids, section spacing, heading sizes.

**2. Container queries (component-internal layout)** — components that rearrange
their own internals (`<minis-page-header>`, `<minis-card-grid>`) use
`@container (min-width: …)` on **their own width** (`container-type: inline-size`
on `:host`). They adapt to whatever box they're placed in, not to the screen.

**Convention for new components:** if a component changes its internal layout at
a breakpoint, use a container query, and pick the breakpoint from the
`--breakpoint-*` scale (hardcode the number with a comment — CSS custom
properties cannot be used inside `@container` or `@media` conditions).

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
<minis-container>
  <!-- content with responsive padding + max-width + auto centering -->
</minis-container>
```

### 12-Column CSS Grid

The standard content grid uses a 12-column layout. This is **not** a component — use plain CSS grid:

```css
.content-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: var(--spacing-layout-xl); /* 32px base → 48px on xl */
  padding-top: var(--spacing-layout-md);
  padding-bottom: var(--spacing-layout-md);
}

/* Mobile: stack to single column */
@media (max-width: 767px) {
  .content-grid {
    grid-template-columns: 1fr;
    column-gap: 0;
  }
}
```

### Section Cards

Content sections use white or faded background cards:

```css
.section-card {
  background: var(--color-surface-primary, white);
  border-radius: var(--border-radius-xl, 16px);
  padding: var(--spacing-layout-lg) 10px;
}

.section-card--faded {
  background: var(--color-surface-faded, #f1f3f5);
}
```

### Sticky Header Band

The header + main navigation sits in a white band with bottom border:

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

Every page follows this vertical stack:

```
┌─────────────────────────────────────┐
│  Header band (white, border-bottom) │
│  ┌─ Container ────────────────────┐ │
│  │  <minis-topbar>                │ │
│  │  <minis-navigation horizontal> │ │
│  └────────────────────────────────┘ │
├─────────────────────────────────────┤
│  Breadcrumbs + save toggle          │
│  ┌─ Container ────────────────────┐ │
│  │  [breadcrumbs]  [toggle tag]   │ │
│  └────────────────────────────────┘ │
├─────────────────────────────────────┤
│  Photo gallery                      │
│  ┌─ Container ────────────────────┐ │
│  │  <minis-card-grid>             │ │
│  └────────────────────────────────┘ │
├─────────────────────────────────────┤
│  Title                              │
├─────────────────────────────────────┤
│  Tab band (white, border top+bottom)│
│  ┌─ Container ────────────────────┐ │
│  │  <minis-navigation tabs>       │ │
│  └────────────────────────────────┘ │
├─────────────────────────────────────┤
│  Content area                       │
│  ┌─ Container ────────────────────┐ │
│  │  12-col grid (gap: layout-xl)  │ │
│  │  ┌─ Main (8 col) ──┐ ┌─ Aside (4 col) ──┐ │
│  │  │  Content cards   │ │  Widgets / info   │ │
│  │  └─────────────────┘ └───────────────────┘ │
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘
```

Background: `var(--color-background, #fcfdff)` (the subtle off-white page background).

---

**Last updated:** 2026-03-20
