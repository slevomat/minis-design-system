# minis-icon

## Overview
`<minis-icon>` renders a named SVG icon from the Slevomat icon library. All icons are 24×24px by default, use `fill="currentColor"` (inheriting the surrounding text color), and require no additional CSS.

## Package
```
@minis/icons
```

## Custom element tag
```html
<minis-icon>
```

## API

| Attribute | Type   | Default  | Description |
|-----------|--------|----------|-------------|
| `name`    | string | `close`  | Icon identifier. See icon list below. |
| `size`    | number | `24`     | Width and height in px. |
| `label`   | string | —        | Accessible label. When set: `role="img" aria-label="{label}"`. When absent: `aria-hidden="true"` (decorative). |

## Available icons (MVP set)

| Name | Usage |
|------|-------|
| `arrow-down` | Collapse, dropdown |
| `arrow-left` | Back, previous |
| `arrow-right` | Forward, next |
| `arrow-up` | Expand, scroll up |
| `bell` | Notifications |
| `cart-fill` | Cart (filled) |
| `cart-outline` | Cart (outline) |
| `check` | Success, confirmation |
| `circle-check-fill` | Success state indicator |
| `circle-close-fill` | Error / remove indicator |
| `circle-info-fill` | Info indicator |
| `close` | Dismiss, remove |
| `error` | Warning / error state |
| `heart` | Favourite (outline) |
| `heart-fill` | Favourite (filled) |
| `search` | Search |
| `settings` | Settings, configuration |
| `star` | Rating (outline) |
| `star-fill` | Rating (filled) |
| `user` | User profile |

## Usage examples

```html
<!-- Decorative icon (aria-hidden, default) -->
<minis-icon name="cart-fill"></minis-icon>

<!-- Custom size -->
<minis-icon name="star" size="16"></minis-icon>

<!-- Semantic / labelled icon -->
<minis-icon name="close" label="Close dialog"></minis-icon>

<!-- In minis-button icon slot — label mode -->
<minis-button variant="primary">
  <minis-icon slot="icon" name="cart-fill"></minis-icon>
  Add to cart
</minis-button>

<!-- In minis-button icon slot — icon-only mode -->
<minis-button variant="secondary" icon-only>
  <minis-icon slot="icon" name="search"></minis-icon>
</minis-button>

<!-- Color via CSS currentColor -->
<minis-icon name="heart-fill" style="color: red;"></minis-icon>
```

## Setup

```ts
// Import once at app entry (registers <minis-icon> custom element)
import '@minis/icons';
```

Or import individually:
```ts
import '@minis/icons/dist/icon.js';
```

## Color & theming
Icons inherit color from their CSS context via `currentColor`. No tokens needed — just set `color` on the element or a parent.

## Accessibility
- **Decorative** (no `label`): `aria-hidden="true"` — screen readers skip it.
- **Semantic** (with `label`): `role="img" aria-label="{label}"` — screen readers announce the label.
- When an icon is the only content inside a button, either set `label` on the icon **or** add `aria-label` directly on the button.

## Adding new icons
1. Export the path template from `packages/icons/src/icons/{name}.ts`
2. Add the import + key to `packages/icons/src/registry.ts`
3. Re-export from `packages/icons/src/index.ts`
4. Add to the MVP list in this doc

## Copy-paste prompt for AI agents

> Render a `<minis-icon>` with `name="cart-fill"` inside a `<minis-button variant="primary">` using the `slot="icon"` attribute. Import `@minis/icons` as a side-effect before using it. Do not pass `aria-hidden` manually — the component handles accessibility automatically.
