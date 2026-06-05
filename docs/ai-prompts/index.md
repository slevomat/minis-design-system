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

[→ All Components](./components/README.md)

### 💡 Principles
Design decisions and rules for how to use components correctly.

- [Prefer active states over disabled](./principles.md#prefer-active-states-over-disabled) — keep components interactive and show contextual guidance instead of silently disabling them

[→ All Principles](./principles.md)

### 🧩 Patterns
Composable UI patterns combining multiple components.

- [Card with Action](./patterns/card-with-action.md) - Card + Button pattern

[→ All Patterns](./patterns/README.md)

### 📐 Layouts
Full page layout instructions for AI agents to vibe-code responsive pages.

- [Layout System Overview](./layouts/index.md) - Breakpoint tiers, spacing tokens, grid system, page structure
- [Deal Detail](./layouts/deal-detail.md) - Hotel/experience detail: photo gallery, tabs, aside + main split
- [Checkout (Košík)](./layouts/checkout.md) - Single-column checkout flow: narrow container, stacked cards, step tabs

[→ All Layouts](./layouts/)

### 📄 Templates
Full page layouts and structures.

- [Landing Page](./templates/landing-page.md) - Marketing landing page

[→ All Templates](./templates/README.md)

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
<!-- Load tokens first -->
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/index.css">

<!-- Or for dark mode -->
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/foundation/dark.css">

<!-- Then use components -->
<script type="module">
  import '@minis/components';
</script>
```

## Development Workflow

1. **Select** component/pattern/template from this index
2. **Open** the relevant .md file
3. **Copy** the AI prompt or code example
4. **Paste** into your AI tool
5. **Customize** the generated code as needed

---

**Last updated:** 2026-03-19
