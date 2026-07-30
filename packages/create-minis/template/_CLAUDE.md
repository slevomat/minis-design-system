# {{PROJECT_NAME}} — Mini*S Prototype

This project uses the **Mini*S Design System** (Lit Web Components + CSS custom properties).
All components, tokens, and icons are pre-loaded in `public/vendor/` (served as static assets by Vite).

## Quick Start

- Edit `index.html` to build your page
- Use `<minis-*>` web components directly in HTML
- Style with `var(--token-name)` CSS custom properties
- Run `pnpm dev` for hot-reloading dev server

## Available Components

| Tag | Description |
|-----|-------------|
| `<minis-topbar>` | Brand identity bar — logo (left) + action buttons (right) |
| `<minis-navigation>` | Scrollable nav bar (`variant="horizontal"` or `variant="tabs"`) |
| `<minis-navigation-item>` | Nav link/tab inside `<minis-navigation>` |
| `<minis-container>` | Responsive layout wrapper (auto padding + max-width) |
| `<minis-button>` | Button with variants: `primary`, `secondary`, `tertiary`, `danger`, `cta-buy`, `transparent` |
| `<minis-tag>` | Compact pill: `static`, `clickable`, `toggle`, `dismissible` |
| `<minis-alert>` | Contextual feedback: `notice`, `success`, `error`, `warning` |
| `<minis-message>` | Notification card with visual, title, description |
| `<minis-icon>` | SVG icon: `<minis-icon name="heart-fill" size="20">` |
| `<minis-pill-counter>` | Numeric badge (used inside buttons or standalone) |
| `<minis-card-grid>` | Responsive grid: `navigation`, `navigation-small`, `photogallery` |

## Component Size Values

All components use full English words for sizes: `small`, `medium` (default), `large`.
Exception: `<minis-button>` uses `sm`, `md`, `lg`, `xl`.

## Key Token Patterns

```css
/* Typography */
var(--typography-font-family-sans)        /* Inter — all UI text */
var(--typography-font-family-brand)       /* banner headlines ONLY (see note below) */
var(--typography-size-sm)                 /* 14px */
var(--typography-size-md)                 /* 16px */
var(--typography-weight-bold)             /* 700 */
var(--typography-brand-weight)            /* 400 — always, for brand headlines */
var(--typography-heading-xl-size)         /* responsive: 24→32px */

/* Colors */
var(--color-text-primary)                /* main text */
var(--color-text-secondary)              /* muted text */
var(--color-surface-primary)             /* white card bg */
var(--color-surface-faded)               /* light grey bg */
var(--color-background)                  /* page background */
var(--color-border-subtle)               /* light border */
var(--color-border)                      /* standard border */

/* Spacing (responsive — scales with viewport) */
var(--spacing-layout-sm)                 /* 12→16px */
var(--spacing-layout-md)                 /* 16→24px */
var(--spacing-layout-lg)                 /* 20→32px */
var(--spacing-layout-xl)                 /* 32→48px */

/* Fixed spacing */
var(--linear-sp-linear-3)               /* 12px */
var(--linear-sp-linear-4)               /* 16px */
var(--linear-sp-linear-6)               /* 24px */

/* Border radius */
var(--border-radius-sm)                  /* 4px */
var(--border-radius-md)                  /* 8px */
var(--border-radius-xl)                  /* 16px */
```

> There are NO `--spacing-*` tokens (only `--spacing-layout-*`). For fixed spacing use `--linear-sp-linear-{n}` or `--pixel-px-{n}`.

## Full API Reference

See `docs/ai-prompts/` for complete component docs:
- `docs/ai-prompts/components/` — per-component API tables, slots, tokens, usage examples
- `docs/ai-prompts/layouts/` — full page layout instructions (deal detail, checkout)
- `docs/ai-prompts/getting-started.md` — setup and complete token reference

## Live Storybook

Visual reference: https://slevomat.github.io/minis-design-system/

## Page Structure Pattern

Every Slevomat page follows this structure:

```html
<!-- Full-width header band -->
<div style="background: var(--color-surface-primary); border-bottom: 1px solid var(--color-border-subtle);">
  <minis-container>
    <minis-topbar>
      <svg slot="logo">...</svg>
      <minis-button slot="actions" variant="cta-buy" size="sm">Cart</minis-button>
    </minis-topbar>
    <minis-navigation variant="horizontal" aria-label="Main menu">
      <minis-navigation-item active>Category</minis-navigation-item>
    </minis-navigation>
  </minis-container>
</div>

<!-- Page content -->
<minis-container>
  <!-- Your content here -->
</minis-container>
```
