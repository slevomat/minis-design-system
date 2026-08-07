# Components Library

Individual UI components for building interfaces. Every component has a full AI-prompt reference with API tables, real token names, usage examples, and a copy-paste prompt.

## Available Components

- [Action Row](./action-row.md) - Interactive list row for vertical menus and filters (label · icon · checkbox + optional counter)
- [Alert](./alert.md) - Contextual feedback: notice, success, error, warning
- [Badge](./badge.md) - Decorative scalloped seal badge with a white checkmark; three color variants
- [Button](./button.md) - Primary actions, variants, sizes, icon support, counter pill
- [Card Grid](./card-grid.md) - Responsive grid layouts: navigation (featured), navigation-small (uniform), photogallery (asymmetric)
- [Checkbox](./checkbox.md) - Binary selection input with checked / unchecked states and hover
- [Container](./container.md) - Responsive layout wrapper with auto-centering and breakpoint-based padding
- [Icon](./icon.md) - SVG icons via `<minis-icon>`, currentColor theming, a11y
- [Message](./message.md) - Notification card with visual, title, description and close button
- [Navigation](./navigation.md) - Horizontal scrollable nav bar: category nav or tab switcher
- [Page Header](./page-header.md) - Hero banner; first content element under the topbar + navigation; 5 brand themes, responsive layout
- [Pill Counter](./pill-counter.md) - Numeric badge used in buttons and standalone
- [Tag](./tag.md) - Compact pill label: static, clickable, toggle, or dismissible
- [Tile](./tile.md) - Vertical icon-based navigation tile for primary shortcuts, typically in a grid
- [Topbar](./topbar.md) - The bar at the top of any Slevomat web page or vibe-coded app; `web` + `vibe-apps` variants, logo / search / actions slots

## Component Naming

All components use the `minis-` prefix:
- `<minis-button>`
- `<minis-page-header>`
- `<minis-navigation>`

## Using Components

Each component page includes:
- **API documentation** - Props, slots, events
- **Design tokens** - Which tokens are used
- **Usage examples** - Copy-paste code
- **AI prompts** - Ready for Cursor/Claude Code
- **Accessibility notes** - ARIA, keyboard support
