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
| `--container-width` | 100000px | — | — | — |
| `--container-narrow-width` | 100000px | — | — | — |

### Responsive Typography (Headings)

| Token | base | md (768px+) | xl (1256px+) |
|-------|------|-------------|--------------|
| `--typography-heading-2xl-size` | 24px | 32px | 40px |
| `--typography-heading-xl-size` | 24px | 32px | 32px |
| `--typography-heading-lg-size` | 20px | 24px | 24px |
| `--typography-heading-md-size` | 18px | 20px | 20px |
| `--typography-heading-sm-size` | 16px | 18px | 18px |

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
  column-gap: 48px; /* desktop gutter */
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
│  Hero / Photo gallery               │
│  ┌─ Container ────────────────────┐ │
│  │  <minis-card-grid>             │ │
│  └────────────────────────────────┘ │
├─────────────────────────────────────┤
│  Sub-navigation (tabs)              │
├─────────────────────────────────────┤
│  Content area                        │
│  ┌─ Container ────────────────────┐ │
│  │  12-col grid                   │ │
│  │  ┌─ Aside (4 col) ──┐ ┌─ Main (8 col) ──┐ │
│  │  │  Filters / info   │ │  Content cards   │ │
│  │  └───────────────────┘ └──────────────────┘ │
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘
```

Background: `var(--color-background, #fcfdff)` (the subtle off-white page background).

---

**Last updated:** 2026-03-20
