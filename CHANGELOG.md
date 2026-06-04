# Changelog

All notable changes to this project will be documented in this file.

## 2026-06-04

### Card Grid

**`navigation` variant — `vertical-slots` subvariants (desktop only)**

- New attribute `vertical-slots` (`"0" | "1" | "2"`, default `"0"`) on `<minis-card-grid variant="navigation">`.
- `vertical-slots="0"` — unchanged standard layout: featured wide card top-left, wide card bottom-right.
- `vertical-slots="1"` — item 2 spans both rows in col 3 (one tall vertical photo). Other five items unchanged.
- `vertical-slots="2"` — items 2 and 4 each span both rows (two tall vertical photos in cols 1–2); items 1, 3, 5, 6 fill the right two columns.
- All three subvariants collapse to the same 4×2 horizontal scroll strip on mobile (`<768px`).

**Bug fix — mobile height for navigation variants**

- Previous mobile height was `172px` (one row), which clipped the second row and made the breakpoint switch appear to have no effect.
- Fixed to `calc(2 × --card-grid-xs-item-size + --card-grid-gap)` = **352px** (2 rows × 172px + 8px gap), matching the Figma xs spec.
- Applies to `navigation`, `navigation-small` (rows=2), and `navigation-small` (rows=3) variants.

**Bug fix — navigation mobile grid: 3 columns for equal row distribution**

- With 4 columns and 6 items: row 1 = 4, row 2 = 2 (unequal). Fixed to **3 columns**: 3 items per row in both rows. Grid is 3 × 172px = 516px wide — the third column peeks at ~390px to invite scrolling.

**Improvement — container queries for responsive behaviour**

- All `@media (max-width: 767px)` replaced with `@container (max-width: 767px)`. `:host` is now `container-type: inline-size`. An inner `.host-wrapper` div carries height and overflow so it can respond to container queries.
- The Storybook breakpoint switcher now correctly triggers the mobile layout (narrows the CSS container, not the viewport).

## 2026-05-29

### Tokens

**Kensington — brand typeface and new typography scale tokens (Figma sync)**

- `@font-face` font-family name corrected from `'Kensington Compressed Bold'` → `'Kensington'` to match Figma's family name.
- Token `--typography-font-family-brand` updated accordingly: `'Kensington Compressed Bold'` → `'Kensington'`.
- New token `--typography-line-height-110: 110%` — between `--typography-line-height-100` and `--typography-line-height-125`. Used by brand headings.
- New token `--typography-size-3xs: var(--linear-sp-linear-2)` — 8px, smallest size in the scale (below `--typography-size-2xs`).
- New token `--typography-size-5xl: var(--linear-sp-linear-14)` — 56px, largest size in the scale (above `--typography-size-4xl`).
- New brand heading composite responsive tokens:
  - `--typography-brand-lg-size` — 24px base, scales to 32px at 1480px+
  - `--typography-brand-lg-line-height: var(--typography-line-height-110)` — fixed 110%
  - `--typography-brand-xl-size` — 32px base, scales to 56px at 1480px+
  - `--typography-brand-xl-line-height: var(--typography-line-height-110)` — fixed 110%

**Kensington Compressed Bold — brand typeface added** *(previous entry, kept for reference)*

- New `@font-face` declaration in `packages/tokens/src/tokens.css` for the `'Kensington'` typeface served from `./fonts/kensington-compressed-bold.woff2`.
- Font file added to `packages/tokens/src/fonts/` and distributed via `@minis/tokens` dist.
- Build script updated to copy `src/fonts/` → `dist/fonts/` on every `pnpm build`.

### Docs

- **Typography section** updated in `docs/ai-prompts/getting-started.md` — documents all three font-family tokens and explains when to use Kensington vs. Inter.
- **Storybook Design Tokens → Typography → Font Families** updated with corrected `'Kensington'` name and preview.
- **Storybook Design Tokens → Typography → Font Sizes** — added `--typography-size-3xs` (8px) and `--typography-size-5xl` (56px) rows.
- **Storybook Design Tokens → Typography → Line Heights** — added `--typography-line-height-110` (110%) row.
- **Storybook Design Tokens → Text Styles** — new "Brand Headings" section documenting `Brand / LG` and `Brand / XL` with live responsive previews and usage examples.

## 2026-05-28

### Docs

**New: Design Principles section** — establishes the first system-wide design principle: Prefer active states over disabled.

- New `docs/ai-prompts/principles.md` — canonical reference with rationale, before/after code examples, and the 3-condition rule for when `disabled` is actually appropriate.
- New **Design Principles** Storybook story under Introduction.
- `docs/ai-prompts/index.md` — Principles navigation section added.
- `CLAUDE.md` — rule added to Common pitfalls so Claude Code follows it automatically.
- `docs/ai-prompts/components/{button,checkbox,action-row,tile,tag}.md` — callout added near each component's `disabled` documentation, linking to the principles page.

### Checkbox

- **Indeterminate state added** — new `indeterminate` boolean attribute (reflected) displays a dash inside the checkbox box using the same filled blue background as the checked state.
- Hover and disabled variants work for the indeterminate state.
- Clicking an indeterminate checkbox resolves to `checked=true, indeterminate=false`.
- `aria-checked` now outputs `"mixed"` when indeterminate (ARIA 1.2 tri-state checkbox).
- `change` event detail extended: `{ checked: boolean, indeterminate: boolean }`.
- `States` Storybook story updated to a 3-column grid covering all three selection states × disabled.
- New `Indeterminate` story added.

## 2026-05-22

### Tokens

**Dark mode background and surface tokens updated** to match production dark mode colours.

- `--color-background` (dark): `var(--color-core-black)` → `var(--color-grey-10)` (`oklch(0.23 0.01 275)`)
- `--color-surface-primary` (dark): `var(--color-grey-20)` → `var(--color-grey-25)` (`oklch(0.35 0.01 234)`)
- `--color-surface-faded` (dark): `var(--color-grey-10)` → `var(--color-grey-25)` (`oklch(0.35 0.01 234)`)

Both classic and gift schema dark-mode overrides (`--schemas-classic-*` and `--schemas-gift-*`) updated.

## 2026-05-21

### Tokens

**Typography line-height export fixed** — the Figma token exporter plugin now emits the `typography/line-height` scale correctly. Previously Figma stored meaningless internal floats and produced CSS-invalid variable names containing `%`.

- Renamed scale tokens `--typography-line-height-percentage-{100,125,130,133,138,140,143,150,157}%` → `--typography-line-height-{n}`. The trailing `%` — invalid in a CSS custom property name — is gone.
- Values changed from unitless ratios to percentages: e.g. `--typography-line-height-138` is now `138%` (was `1.38`).
- New token `--typography-line-height-90` (`90%`).
- The responsive line-height tokens (`--typography-heading-{lg,md,sm}-line-height`, `--typography-body-md-line-height`, `--typography-body-sm-line-height`) now reference the renamed scale.
- Body responsive line-height tokens renamed `--typography-body-line-height` → `--typography-body-md-line-height` and `--typography-body-s-line-height` → `--typography-body-sm-line-height`, aligning the Layout collection variables with the `body/md` · `body/sm` text-style tiers. The Figma body text styles now resolve their `line-height` to these `var()` references instead of a frozen value (headings already did).
- Caption text style `--typography-caption-s` renamed to `--typography-caption-sm`, consistent with the `xs` / `xxs` siblings and the `sm` tier naming used elsewhere.
- Heading MD and SM weights corrected to **semibold (600)** to match the Figma text styles — Storybook previously rendered them as medium (500).
- Components updated to the new names: `<minis-alert>`, `<minis-button>`, `<minis-checkbox>`, `<minis-navigation-item>`, `<minis-pill-counter>`.

### Storybook

- **Design Tokens → Typography** — new "Line Heights" table documenting the full `--typography-line-height-{n}` scale with rendered previews.
- **Design Tokens → Text Styles** — new "Responsive line-heights" table. Heading and Body previews and Spec columns now read live values and re-flow when the Viewport toolbar tier changes.
- **Design Tokens → Text Styles** — each row's Token column now leads with the Figma composite text-style token (`--typography-heading-sm`, `--typography-body-md`…) and lists the `size` + `line-height` tokens it resolves to underneath. Headings, Body and Caption tables share one consistent layout.
- The Viewport switcher (`preview.ts`) now also overrides the responsive line-height tokens per tier, so line-heights visibly tighten/loosen across 2xs/xs · sm · md/lg · xl.

### Tile

- **Storybook docs updated** — `Grid Example` story replaced by `Navigation Grid`: a realistic 4-column shortcut grid (Moje nákupy, Košík, Oblíbené, Profil, Dárky, Extra slevy, Cashback, Benefity) demonstrating the primary grid usage pattern with `gap:8px` (`--linear-sp-linear-2`) on both axes and optional counter pills.

## 2026-05-15

### Tile

**New component** `<minis-tile>` ([Figma ↗](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4208-4230))

A vertical, icon-based navigation tile for primary shortcuts, typically arranged in a 4-column homepage grid.

#### API

| Prop | Type | Default | Description |
|---|---|---|---|
| `href` | `string` | `''` | Destination URL — renders `<a>` when set, `<button>` otherwise |
| `counter` | `string` | — | Inline counter pill after the label; omit or pass `""` to hide |
| `disabled` | `boolean` | `false` | Prevents interaction; reduces opacity to 0.6 |

| Slot | Required | Description |
|---|---|---|
| `icon` | **Yes** | Navigation icon 24×24 px — use `<minis-icon slot="icon" name="…">` |
| _(default)_ | **Yes** | Label text — short, ideally one word |

#### States

- `default` — white surface, grey border
- `hover` — blue-tinted surface (`--tile-hover-surface`)
- `disabled` — opacity 0.6, `pointer-events: none`, `cursor: not-allowed`

#### Visual spec

- Fixed height **70 px**: 1 px border + 12 px top padding + 24 px icon + 4 px gap + 16 px label row + 12 px bottom padding + 1 px border
- Icon colour: **blue** `#006eb9` (`--tile-icon-color`) — separate from the label colour (black)
- Counter pill: inverted colours — background = `--tile-counter-surface` (black), text = `--tile-counter-text` (white)
- Label row height fixed at 16 px; the 18 px pill overflows this row but is clipped by the tile's `overflow: hidden`
- `:host` enforces `min-width: calc(2 × --tile-padding-x)` = 64 px — x-padding is always visible; labels truncate with `…` rather than padding collapsing

#### New tokens

| Token | Value | Resolved | Purpose |
|---|---|---|---|
| `--tile-surface` | `var(--button-secondary-surface)` | `#fff` | Default background |
| `--tile-border` | `var(--button-secondary-border)` | `#cbccce` | Border colour |
| `--tile-text` | `var(--button-secondary-text)` | `#000` | Label text colour |
| `--tile-icon-color` | `var(--button-tertiary-text)` | `#006eb9` | Icon colour (blue) |
| `--tile-hover-surface` | `var(--button-secondary-hover-surface)` | `#e6f7fc` | Hover background |
| `--tile-counter-surface` | `var(--button-secondary-text)` | `#000` | Counter pill background (inverted) |
| `--tile-counter-text` | `var(--button-secondary-surface)` | `#fff` | Counter pill text (inverted) |
| `--tile-padding-top` | `var(--linear-sp-linear-3)` | `12 px` | Top padding |
| `--tile-padding-bottom` | `var(--linear-sp-linear-3)` | `12 px` | Bottom padding |
| `--tile-padding-x` | `var(--linear-sp-linear-8)` | `32 px` | Horizontal padding (each side) |
| `--tile-gap-elements-y` | `var(--linear-sp-linear-1)` | `4 px` | Gap: icon → label row |
| `--tile-gap-elements-x` | `var(--linear-sp-linear-2)` | `8 px` | Gap: label → counter pill |
| `--tile-label-row-height` | `var(--pixel-px-16)` | `16 px` | Fixed label row height |

#### Grid layout

- Use `repeat(N, 1fr)` for equal-width columns. **Do not use `minmax(0, 1fr)`** — it removes the tile's enforced minimum width and can collapse the padding.
- Size the container so the widest label fits. Reference: "Moje nákupy" (no counter) needs ~155 px tile width → ~644 px for a 4-column grid with 8 px gaps.
- **In tighter spaces, reduce the column count** (`repeat(3, 1fr)`, `repeat(2, 1fr)`) rather than shrinking tiles below a readable label width.

#### Storybook stories

Added under **Components / Navigations / Tile**: Playground, States, With Counter, As Link, Grid Example.

#### Docs

AI prompt reference added at `docs/ai-prompts/components/tile.md`.

### Action Row

#### Tokens

- `--action-row-text` updated: now references `--color-text-primary` (was `--color-interaction-secondary-accent`). Same value in light mode; slightly different in dark mode (near-white `--color-grey-95` instead of pure white).
- `--action-row-icon` added: references `--button-tertiary-text` (`--color-interaction-tertiary-accent`, blue `#006eb9`). Leading icons in the `variant="icon"` row are now styled with the tertiary-action blue, separate from the text colour.

### Storybook

- Navigation and Action Row components grouped under a new **Navigations** folder, reflecting their shared role in building all kinds of navigation and menus.

## 2026-05-14

### Action Row

- **New component** `<minis-action-row>` — interactive list row for vertical menus, dropdowns and filter lists
  - Leading `variant` (mutually exclusive): `none` (label only) · `icon` (leading icon slot, 24×24) · `checkbox` (leading `<minis-checkbox>`)
  - States: `default`, `hover` (auto on pointer hover, or forced via `state="hover"`), `active` (persistent highlight). Hover wins over active — an active row turns blue-tinted on hover.
  - Optional trailing counter via `counter` prop — always rendered directly after the label, using `<minis-pill-counter size="lg">` with white background and primary text colour (per Figma).
  - Props: `variant`, `state`, `active`, `checked` (checkbox variant only), `disabled`, `counter`
  - Slots: default (label), `icon` (only for `variant="icon"`)
  - Event: `change` → `{ checked: boolean }` (checkbox variant)
  - Keyboard: `Enter` / `Space` activate
- **New tokens** in `@minis/tokens` for the component:
  `--action-row-border-radius`, `--action-row-surface`, `--action-row-text`,
  `--action-row-hover-surface`, `--action-row-active-surface`,
  `--action-row-padding-x`, `--action-row-padding-y`,
  `--action-row-padding-x-icon-only`, `--action-row-padding-x-checkbox`,
  `--action-row-gap-icon`, `--action-row-gap-checkbox`
- AI prompt doc added at `docs/ai-prompts/components/action-row.md`

### Checkbox

- **New component** `<minis-checkbox>` — binary selection input
  - Initial states: `unchecked` / `checked`, each with hover styling
  - Props: `checked`, `disabled`, `name`, `value`
  - Slot: default (label)
  - Event: `change` → `{ checked: boolean }`
  - Keyboard: `Space` / `Enter` to toggle; `role="checkbox"`, `aria-checked`, `aria-disabled` reflected
  - Storybook reorganized — checkbox stories live under `Components/Inputs/Checkbox`
- AI prompt doc added at `docs/ai-prompts/components/checkbox.md`

### Tokens (Figma export sync)

- **New button tokens** for upcoming variants/spacing:
  - `--button-padding-x-icon-only` (8px), `--button-small-padding-x-icon-only` (3px), `--button-large-padding-x-icon-only` (12px)
  - `--button-gap-addon` (8px), `--button-gap-spacer` (2px) — plus matching `small-*` and `large-*` variants
  - `--button-icon-opacity` (1) and `--button-icon-opacity-icon-only-counter-pill` (0.75)
- **New `--cardgrid-gap`** token (= `--spacing-layout-xs`)
- **New `--menu-item-gap`** token (4px) for upcoming menu component
- **New typography line-height composite tokens**, responsive:
  - `--typography-body-line-height` (138% base → 150% md+)
  - `--typography-body-s-line-height` (143% base → 157% md+)
  - `--typography-heading-{lg,md,sm}-line-height` step down at md+
- **New layout tokens**:
  - `--container-bleeding-edge-padding` (0 base → 16px lg → 32px xl+)
  - `--page-width` (tracks current breakpoint tier)
- **New effect tokens**: `--effect-background-blur-10`, `--effect-elevation` (drop-shadow recipe for cards)
- *Note:* `--actionrow-*` tokens from the raw Figma export were superseded by the `--action-row-*` family above (used by the shipped `<minis-action-row>` component) and are not added to `tokens.css`.

## 2026-04-24

### Button

- **Updated** `--button-border-radius` from `--border-radius-sm` (4px) to `--border-radius-md` (8px)

## 2026-04-02

### Card Grid

- **Merged** `navigation-small-3` variant into `navigation-small` — removed standalone variant in favour of a `rows` attribute
- **New property** `rows` (number, reflected) on `<minis-card-grid>` — controls row count for `navigation-small` variant: `rows="2"` (default, 8 slots) or `rows="3"` (12 slots)
- Playground story now dynamically renders the correct number of slots based on selected variant and rows
- AI prompt doc (`docs/ai-prompts/components/card-grid.md`) updated with new API, travel-themed Unsplash placeholder images

### Button

- **Updated** icon sizing tokens — each button size now has its own dedicated icon size instead of a shared value for md/lg/xl
  - `sm` button: 16px (unchanged, now uses `--button-icon-sizing-xs`)
  - `md` button: 20px (was 24px, now uses `--button-icon-sizing-sm`)
  - `lg` button: 22px (was 24px, now uses `--button-icon-sizing-md`)
  - `xl` button: 24px (unchanged, now uses `--button-icon-sizing-lg`)
- **New token** `--button-icon-sizing-lg` (24px) added to the icon sizing scale
- **Changed** `--button-icon-sizing-sm` from 18px → 20px, `--button-icon-sizing-md` from 20px → 22px
- Icon sizing tokens (`--button-icon-sizing-*`) now exported to `tokens.css`

## 2026-03-20

### Topbar (renamed from Header)

- **Renamed** `<minis-header>` → `<minis-topbar>` for semantic clarity — the component is a brand identity bar (logo, shortcuts, cart), not a generic page header
- Custom element tag: `minis-topbar`, class: `MinisTopbar`
- CSS tokens renamed: `--header-height` → `--topbar-height`, `--header-actions-gap` → `--topbar-actions-gap`
- AI prompt doc moved: `docs/ai-prompts/components/header.md` → `topbar.md`
- All layout docs and navigation examples updated with full 11-item Slevomat category nav list

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
