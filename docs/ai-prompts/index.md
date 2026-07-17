# Mini*S Design System - AI Prompt Library

Complete guide for using Mini*S with AI code generation tools (Cursor, Claude Code, etc.).

## Quick Navigation

### 📦 Components
Individual UI elements with props and variants.

- [Alert](./components/alert.md) - Contextual feedback: notice, success, error, warning
- [Button](./components/button.md) - Primary actions, variants, sizes, icon support, counter pill
- [Icon](./components/icon.md) - SVG icons via `<minis-icon>`, currentColor theming, a11y
- [Message](./components/message.md) - Notification card with visual, title, description and close button
- [Pill Counter](./components/pill-counter.md) - Numeric badge used in buttons and standalone
- [Navigation](./components/navigation.md) - Horizontal scrollable nav bar: category nav or tab switcher
- [Tag](./components/tag.md) - Compact pill label: static, clickable (with toggle), or dismissible
- [Card Grid](./components/card-grid.md) - Responsive grid layouts: navigation (featured), navigation-small (uniform), photogallery (asymmetric)
- [Container](./components/container.md) - Responsive layout wrapper with auto-centering and breakpoint-based padding
- [Topbar](./components/topbar.md) - Brand identity bar with logo and action buttons, sits above navigation
- [Checkbox](./components/checkbox.md) - Binary selection input with checked / unchecked states and hover
- [Action Row](./components/action-row.md) - Interactive list row for vertical menus and filters (label · icon · checkbox + optional counter)
- [Tile](./components/tile.md) - Vertical icon-based navigation tile for primary shortcuts, typically arranged in a grid
- [Badge](./components/badge.md) - Decorative scalloped seal badge with a white checkmark; three color variants (pink, yellow, blue)
- [Page Header](./components/page-header.md) - Full-width branded banner for category/campaign pages; 5 themes, responsive layout, image + CTA slots

[→ All Components](./components/README.md)

### 💡 Principles
Design decisions and rules for how to use components correctly.

- [Prefer active states over disabled](./principles.md#prefer-active-states-over-disabled) — keep components interactive and show contextual guidance instead of silently disabling them
- [Style with tokens, never hardcoded values](./principles.md#style-with-tokens-never-hardcoded-values) — tokens carry dark mode and responsive scaling; raw hex/px silently opts out
- [Dark mode comes free](./principles.md#dark-mode-comes-free--if-you-follow-the-token-rule) — `<html data-mode="dark">` is the entire integration; never write per-component dark CSS
- [Use abbreviated size values only](./principles.md#use-abbreviated-size-values-only) — `sm`/`md`/`lg`, never `small`/`medium`/`large` (invalid values silently fall back)
- [Respect the two responsive mechanisms](./principles.md#respect-the-two-responsive-mechanisms) — viewport tokens for page spacing, container queries for component layout
- [Brand font is for banner headlines only](./principles.md#brand-font-is-for-banner-headlines-only) — Kensington for hero moments; Inter for everything else

[→ All Principles](./principles.md)

### 🧩 Patterns
Composable UI patterns combining multiple components.

- None documented yet — see [Patterns overview](./patterns/README.md)

### 📐 Layouts
Full page layout instructions for AI agents to vibe-code responsive pages.

- [Layout System Overview](./layouts/index.md) - Breakpoint tiers, spacing tokens, grid system, page structure
- [Deal Detail](./layouts/deal-detail.md) - Hotel/experience detail: photo gallery, tabs, aside + main split
- [Checkout (Košík)](./layouts/checkout.md) - Single-column checkout flow: narrow container, stacked cards, step tabs

[→ All Layouts](./layouts/)

### 📄 Templates
Full page layouts and structures.

- None documented yet — use the [Layouts](./layouts/index.md) guides in the meantime

## How to Use with AI

### For Cursor
```
Include the relevant .md file in your Cursor chat context, then:

"Create a login page using the Auth Page template from Mini*S"
```

### For Claude Code
```
Attach the .md file and prompt:

"Build a hero section following the Hero Section pattern, 
use the primary button for CTA, include heading and description"
```

## Design Token Usage

All components/patterns/templates use Mini*S tokens:

```html
<!-- Load tokens first (contains light AND dark values) -->
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/tokens.css">

<!-- Then use components -->
<script type="module">
  import '@minis/components';
</script>
```

### Dark mode

Dark mode is toggled with a single attribute — **do not** load a separate stylesheet:

```html
<html data-mode="dark">
```

`tokens.css` contains a `[data-mode="dark"]` block that overrides all semantic color
tokens (`--color-text-*`, `--color-border-*`, `--color-interaction-*`, `--color-background`, …).
Components consume only semantic tokens, so they switch automatically — no component-level
work needed. Remove the attribute (or set `data-mode="light"`) to return to light mode.

> ⚠️ `dist/foundation/dark.css` is a deprecated legacy file with hardcoded hex values and
> no toggle mechanism. Never link it — it permanently forces stale dark colors.

## Development Workflow

1. **Select** component/pattern/template from this index
2. **Open** the relevant .md file
3. **Copy** the AI prompt or code example
4. **Paste** into your AI tool
5. **Customize** the generated code as needed

---

**Last updated:** 2026-07-17
