# Changelog

All notable changes to this project will be documented in this file.

## 2026-03-19

### Layouts (AI Prompt Docs)

- **New `docs/ai-prompts/layouts/` directory** — layout instruction files for AI agents to vibe-code responsive pages
- **Layout system overview** (`layouts/index.md`) — breakpoint tiers, spacing tokens, 12-column grid, container, section cards, page structure pattern
- **Deal detail layout** (`layouts/deal-detail.md`) — hotel/experience page: header band, photo gallery, tabbed navigation, 4-col aside + 8-col main content grid, responsive mobile stacking, complete page skeleton with copy-paste AI prompt
- **Checkout layout** (`layouts/checkout.md`) — single-column checkout flow with `<minis-container variant="narrow">`, step tabs, stacked cards, CTA button

### Header

- **New component** `<minis-header>` — main brand bar (64px height) with logo slot (left) and actions slot (right)
- Slot-based: `logo` for brand mark, `actions` for `<minis-button>` elements
- Figma buttons mapped to: `variant="tertiary" size="sm"` for secondary actions, `variant="cta-buy"` for cart
- **Fix:** stories import corrected from broken relative path to `@minis/icons`
- **Fix:** logo replaced with real Slevomat wordmark SVG (`fill="#00B2E5"`) — previous version used reconstructed icon paths with `currentColor`
- **Fix:** Košík (`cta-buy`) button given `size="sm"` to match the tertiary action buttons
- **Fix:** `::slotted([slot="actions"])` gets `display: flex !important` — overrides `inline-block` from button's own `:host` shadow styles so all action buttons align on the same vertical axis (`!important` required because `::slotted()` in parent shadow tree has lower precedence than `:host` in the slotted element's own shadow tree)

### Container

- **New component** `<minis-container>` — responsive layout wrapper that applies `--container-*` tokens for max-width, horizontal padding (8→16→32px), and auto centering
- **`narrow` variant** — uses `--container-narrow-width` and `--container-narrow-padding` for narrower content areas (e.g. articles)
- No internal media queries — responsive behaviour comes from the token layer in `tokens.css`
- **Fix:** container widths corrected — `100000px` Figma placeholder replaced with `100%` on mobile, `752px` narrow from 768px+, `1240px` default from 1256px+
- **Fix:** `tokens` dist rebuilt to apply width changes (was serving stale `100000px` values)
- **Fix:** Default vs Narrow story updated to show page background so width difference is visible

### Card Grid

- **New component** `<minis-card-grid>` — responsive CSS-grid layout wrapper for cards and images
- **`navigation` variant** — 4-col grid, item 1 spans 2 cols (featured), item 6 spans 2 cols (wide mirror); mobile: horizontal scroll strip with equal-size cells
- **`navigation-small` variant** — uniform 4-col grid, row count determined by number of slotted items (8 = 2 rows, 12 = 3 rows); same mobile behaviour
- **`photogallery` variant** — asymmetric 5-col layout: large main photo (3-col × 3-row), wide image top-right (2-col × 2-row), two small thumbnails bottom-right; mobile: only main photo shown
- Pure layout wrapper — slots any content (cards, images, links)

### Tag

- **New: `icon-only` attribute on `toggle` variant** — hides the label and renders the tag as a square icon button (same height as width). Requires an icon in the `icon` slot. Useful for compact favourite/like buttons in tight layouts.

### Button

- **Font size by size** — `sm` uses `--typography-size-sm` (14px); `md`, `lg`, `xl` use `--typography-size-md` (16px)
- **Breaking: size values renamed** — `small` → `sm`, `medium` → `md`, `large` → `lg` to align with the rest of the design system's naming convention
- **New size `xl`** (48px height, `--pixel-px-48`) — the largest button for prominent hero CTAs
- **Heights adjusted**: `sm` 24px (`--pixel-px-24`), `md` 32px (`--pixel-px-32`), `lg` 40px (`--pixel-px-40`), `xl` 48px (`--pixel-px-48`)
- Icon-only variant uses the same height token for width (square) for all four sizes
- Default size updated from `medium` to `md`

## 2026-03-13

### Navigation & Navigation Item

- **New components** `<minis-navigation>` and `<minis-navigation-item>` — horizontal scrollable navigation bar based on slevomat.cz production patterns (`horizontal-nav__section` and `navigation__links`)
- `<minis-navigation>` variants: `horizontal` (category nav bar) · `tabs` (product detail tab switcher)
- `<minis-navigation-item>` props:
  - `href` — renders `<a>` when set, `<button>` otherwise
  - `active` — blue underline (2px) + bold text for the current page/tab
  - `color="positive"` — green accent (`--color-text-accent-positive`): icon is green at rest; text + underline turn green on hover and active
- Icon slot (20×20px) for leading icons
- `actions` slot on `<minis-navigation>` for right-aligned content (e.g. `<minis-tag variant="toggle">` favourite button)
- Horizontal overflow scroll with hidden scrollbar
- **No layout shift on active**: label reserves bold width via CSS `::after` ghost (`data-label` attribute + `height:0; visibility:hidden; font-weight:bold`) — sibling items never shift position when active changes
- Typography: Inter, 16px (`--typography-size-md`), 1.5 line-height; no horizontal padding on items
- Navigation tokens added to `packages/tokens/src/tokens.css`: `--navigation-gap`, `--navigation-border-color`, `--navigation-item-padding-y`, `--navigation-item-gap`, `--navigation-item-icon-size`, `--navigation-item-accent`, `--navigation-item-active-accent`, `--navigation-item-active-border-color`, `--navigation-item-active-border-width`, `--navigation-item-hover-border-color`
- AI prompt doc: `docs/ai-prompts/components/navigation.md`

### Tag

- **New component** `<minis-tag>` — compact pill-shaped label with four variants:
  - `static` — read-only label (default), rendered as a `<div>`
  - `clickable` — lightweight action (open modal/tooltip), rendered as a `<button>`; returns to default state after click, no persistent state
  - `toggle` — toggle/checkbox-style button, rendered as `<button aria-pressed>`; persists pressed state, fires `toggle` event with `{ pressed: boolean }` detail; icon typically switches outline ↔ filled (e.g. `heart` ↔ `heart-fill`)
  - `dismissible` — applied filter with built-in ✕ button; fires `dismiss` event
- Fixed height `32px`; typography fully inherited from context
- Icon slot sizes: `20×20px` for static/clickable/dismissible, `24×24px` for toggle
- Padding: `4px` vertical, `6px` horizontal; gap `4px`
- `pressed` boolean attribute for pre-selected toggle state (`toggle` variant only)
- `disabled` boolean attribute (`clickable` and `toggle` variants)
- All colours via `--color-interaction-secondary-*` tokens — light/dark mode automatic
- AI prompt doc: `docs/ai-prompts/components/tag.md`
- **Padding tokens aligned with Figma**: `--tag-padding-x` (8px, with icon), `--tag-padding-x-noicon` (16px, label only), `--tag-padding-y` (0px)
- **Dismiss button** replaced plain `<button>` with `<minis-button variant="tertiary" size="small" icon-only>` — inherits full tertiary button styling and focus/hover states
- **Padding applies contextually**: `--tag-padding-x-noicon` (16px) when no icon; `--tag-padding-x` (8px) when icon is present via `.tag--has-icon` class

### Tokens

- **Tag component tokens** added to `packages/tokens/src/tokens.css`: `--tag-height`, `--tag-padding-x`, `--tag-padding-y`, `--tag-gap-elements`, `--tag-icon-size`, `--tag-toggle-icon-size`
- **Tag tokens updated** from Figma export: `--tag-padding-x` → `var(--spacing-layout-xs)` (8px); added `--tag-padding-x-noicon` → `var(--spacing-layout-sm)` (16px); `--tag-padding-y` → `var(--spacing-layout-none)` (0px); `--tag-gap-elements` → `var(--linear-sp-linear-1)` (4px); added `--tag-gap-icon-correction` → `var(--pixel-px-2)`

### Storybook

- **Story source panel**: added `docs.source.excludeDecorators: true` globally in `preview.ts` — decorator wrapper div no longer appears in the "Show code" examples, so users see only the component markup when copying code snippets.

## [Unreleased]

### Changed

- **Alert**: updated typography to use design tokens — `--typography-font-family-sans` (Inter), `--typography-weight-regular`, `--typography-line-height-percentage-133%` (1.33)
- **Alert**: icon and text use `align-items: flex-start`; when icon is visible, content gets `margin-top/bottom: var(--pixel-px-3)` (3px) for optical alignment with the icon
- **Alert (Storybook)**: added Figma link (`node-id=2513-8007`) to the component docs page, consistent with Button and Pill Counter

## 2026-03-12

### Button

- **`size` fallback**: `size` property now normalises invalid or missing values to `'medium'` via a setter. Attribute is reflected so CSS selectors always match a valid value.

### Message

- **Vertical layout redesign**: replaced column-flex + absolute-positioned close button with a proper flex-row structure: visual left, body column right (`.body` = column: `.header` row with title + close button, then description below).
- **Close button alignment**: `.header` uses `align-items: flex-start` so the close button aligns with the top of the title text.
- **Bug fix**: close button was using invalid `size="md"` — corrected to `size="medium"`.
- **AI prompt doc**: added `docs/ai-prompts/components/message.md`.

## 2026-03-07

### Button

- **Accessibility fix**: ARIA attributes (`aria-label`, `aria-labelledby`, `aria-describedby`) set on `<minis-button>` are now forwarded to the inner `<button>` element. Screen readers will correctly announce icon-only buttons with `aria-label`.
- **Accessibility fix**: In `icon-only` mode the label `<slot>` is now visually hidden (`.visually-hidden` pattern) instead of removed from the DOM, so any slotted text is preserved in the accessibility tree and contributes to the button's accessible name.
- Host element gets `role="none"` to avoid a redundant button role announcement from the custom element wrapper.
