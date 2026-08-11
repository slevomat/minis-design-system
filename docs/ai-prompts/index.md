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
- [Topbar](./components/topbar.md) - The bar at the top of any Slevomat web page or vibe-coded app; `web` (logo, search, actions) + `vibe-apps` (logo + app name only) variants
- [Checkbox](./components/checkbox.md) - Binary selection input with checked / unchecked states and hover
- [Action Row](./components/action-row.md) - Interactive list row for vertical menus and filters (label · icon · checkbox + optional counter)
- [Tile](./components/tile.md) - Vertical icon-based navigation tile for primary shortcuts, typically arranged in a grid
- [Badge](./components/badge.md) - Decorative scalloped seal badge with a white checkmark; three color variants (pink, yellow, blue)
- [Page Header](./components/page-header.md) - Hero banner; first content element under the topbar + navigation; 5 brand themes, responsive layout, image + CTA slots
- [Accordion](./components/accordion.md) - Expand/collapse list for FAQ sections; bold heading + blue chevron, optional exclusive (`single`) mode

[→ All Components](./components/README.md)

### 🤖 Skills

Packaged multi-step routines your AI assistant loads on demand.

- **`minis-app`** — scaffold and build a whole app or prototype end to end (project setup → topbar variant → screens → browser verification). Lives in the design system repo at `.claude/skills/minis-app/`; copy it to `~/.claude/skills/` to use it from any project.
- **`slevomat-design-principles`** — review a feature or screenshot against the 7 Slevomat design principles. Not part of this repo.

### 💡 Principles
Design decisions and rules for how to use components correctly.

- [Every prototype starts with the background token and a topbar](./principles.md#every-prototype-starts-with-the-background-token-and-a-topbar) — `var(--color-background)` for the page, `<minis-topbar>` at the top: `web` on the Slevomat website, `vibe-apps` for any other app
- [Prefer active states over disabled](./principles.md#prefer-active-states-over-disabled) — keep components interactive and show contextual guidance instead of silently disabling them
- [Style with tokens, never hardcoded values](./principles.md#style-with-tokens-never-hardcoded-values) — tokens carry dark mode and responsive scaling; raw hex/px silently opts out
- [Dark mode comes free](./principles.md#dark-mode-comes-free--if-you-follow-the-token-rule) — `<html data-mode="dark">` is the entire integration; never write per-component dark CSS
- [Use abbreviated size values only](./principles.md#use-abbreviated-size-values-only) — `sm`/`md`/`lg`, never `small`/`medium`/`large` (invalid values silently fall back)
- [Respect the two responsive mechanisms](./principles.md#respect-the-two-responsive-mechanisms) — viewport tokens for page spacing, container queries for component layout
- [Brand font is for banner headlines only](./principles.md#brand-font-is-for-banner-headlines-only) — Kensington (Bebas Neue fallback, not distributed) for hero moments; Inter for everything else. Always uppercase, always weight 400.

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

This folder is a **self-contained context pack** — it works in any AI coding tool
without CLAUDE.md or repository access. Load files in this order:

1. **Always**: this file (`index.md`) + [`getting-started.md`](./getting-started.md) + [`principles.md`](./principles.md)
   — setup, token reference, and the rules that keep generated code on-system.
2. **Per task**: the `components/*.md` file for each component you're using.
3. **For full pages**: the relevant `layouts/*.md` guide (breakpoint tiers, grid, page structure).

### Claude Code (this repository)

Nothing to load — `CLAUDE.md` wires the conventions in automatically and points here.
For deep dives, reference files directly in your prompt:

```
Look at docs/ai-prompts/components/page-header.md and build a campaign
page section using <minis-page-header theme="yellow"> with a CTA button.
```

### Claude Code (a different project consuming @minis/components)

Copy this folder into the project (e.g. `docs/minis/`) and add one line to that
project's `CLAUDE.md`:

```
Mini*S Design System reference: docs/minis/index.md — read getting-started.md
and principles.md before generating any UI; per-component docs in components/.
```

### Cursor

Create `.cursor/rules/minis.mdc` (or add to your rules) with the same pointer as
above, or `@`-mention the files per chat:

```
@docs/ai-prompts/getting-started.md @docs/ai-prompts/components/button.md
Create a product card with a cta-buy button and a favourite toggle tag.
```

### claude.ai / ChatGPT / other chat tools

Attach or paste `getting-started.md` + `principles.md` + the component files you
need, then prompt normally. Every component doc ends with a **copy-paste AI
prompt** you can use as a starting point.

### Example prompts that work with these docs

```
"Build the Deal Detail page from docs/ai-prompts/layouts/deal-detail.md
 with a yellow page header and a photo gallery."

"Create a horizontal category navigation following
 docs/ai-prompts/components/navigation.md, with 'Extra slevy' active."
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

1. **Select** component/layout from this index
2. **Open** the relevant .md file
3. **Copy** the AI prompt or code example
4. **Paste** into your AI tool
5. **Customize** the generated code as needed

---

**Last updated:** 2026-07-17
