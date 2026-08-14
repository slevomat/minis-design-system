# {{PROJECT_NAME}} — Mini*S Prototype

This project uses the **Mini*S Design System** (Lit Web Components + CSS custom properties).
All components, tokens, and icons are pre-loaded in `public/vendor/` (served as static assets by Vite).

## Quick Start

- Edit `index.html` to build your page
- Use `<minis-*>` web components directly in HTML
- Style with `var(--token-name)` CSS custom properties
- Run `pnpm dev` for hot-reloading dev server

## Two rules that apply to every page — no exceptions

1. **Page background is `var(--color-background)`.** Never `#fff`, `white`, or a hand-picked
   grey — the token carries dark mode and the colour schemas, a hardcoded value opts out of both.
   (`--color-surface-primary` is for *components* on top of the page: cards, panels, the band
   behind the topbar.)
2. **The page opens with `<minis-topbar>`, set to the right variant:**

   | You are building… | `variant` |
   |---|---|
   | Something on the **Slevomat website** | `web` (default) |
   | **Any other app** — internal tool, dashboard, admin, client-facing app, one-off prototype | `vibe-apps` + `app-name="…"` |

   Never hand-roll a header bar, and never leave the page without one.

```html
<minis-topbar variant="vibe-apps" app-name="Refund Console">
  <svg slot="logo">...</svg>
</minis-topbar>
```

## Available Components

| Tag | Description |
|-----|-------------|
| `<minis-topbar>` | Top bar for any Slevomat page or app. `variant="web"` = logo, optional search, actions on the right; `variant="vibe-apps"` = logo + `app-name` on the left, nothing else |
| `<minis-navigation>` | Nav bar. `variant="main-nav"` = the site menu, once per page under the topbar; `variant="tabs"` = in-page tab switcher |
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
    <!-- variant="web" for the Slevomat website;
         variant="vibe-apps" app-name="…" for any other app -->
    <minis-topbar variant="web">
      <svg slot="logo">...</svg>
      <minis-button slot="actions" variant="cta-buy" size="sm">Cart</minis-button>
    </minis-topbar>
    <minis-navigation variant="main-nav" aria-label="Main menu">
      <minis-navigation-item active>Category</minis-navigation-item>
    </minis-navigation>
  </minis-container>
</div>

<!-- Page content -->
<minis-container>
  <!-- Your content here -->
</minis-container>
```
