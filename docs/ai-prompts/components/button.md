# Button Component - AI Prompt Guide

## Component Overview

The `<minis-button>` component provides primary interface actions with multiple variants, sizes,
icon support, and an optional counter pill badge.

**Tag:** `<minis-button>`

**Width:** By default the button hugs its content (`display: inline-block`) — its width is driven by
the label/icon plus the size padding. To make it span the full width of its container (Figma "Fill
container" sizing — used for stacked layouts such as the `xs` breakpoint or a mobile sheet), add the
`full-width` boolean attribute. It stretches the host to `100%` and centres the content; no consumer
CSS required.

## API

### Attributes

| Attribute   | Type    | Default     | Values                                                                    |
|-------------|---------|-------------|---------------------------------------------------------------------------|
| `variant`   | string  | `"primary"` | `primary`, `secondary`, `tertiary`, `danger`, `cta-buy`, `transparent`   |
| `size`      | string  | `"md"`      | `sm`, `md`, `lg`, `xl`                                                    |
| `disabled`  | boolean | `false`     | —                                                                         |
| `icon-only` | boolean | `false`     | Renders only the icon slot; counter pill floats top-right                 |
| `full-width`| boolean | `false`     | Stretch to fill the container width (Figma "Fill container"); centres content |
| `counter`   | string  | —           | Number string e.g. `"3"`. Inline pill after label; floating top-right when `icon-only`. Pill size is chosen automatically based on button size — see table below. |
| `type`      | string  | `"button"`  | `button`, `submit`, `reset`                                               |

### Slots

| Slot        | Description                                                               |
|-------------|---------------------------------------------------------------------------|
| *(default)* | Button label text                                                         |
| `icon`      | Icon placed before the label. Use `<minis-icon slot="icon" name="…">` from `@minis/icons`. Raw SVG is also accepted. |

## Design Tokens Used

All tokens are `--button-*` component tokens resolved through the design token cascade.

```css
/* Structure */
--button-border-radius        /* 8px (--border-radius-md) */
--button-border-width         /* 1px */
--button-gap-elements         /* 4px gap between icon and label */

/* Padding per size */
--button-padding-x            /* md: 12px */
--button-padding-y            /* md: 8px */
--button-small-padding-x      /* sm: 8px */
--button-small-padding-y      /* sm: 3px */
--button-large-padding-x      /* lg + xl: 48px (spacious horizontal padding) */
--button-large-padding-y      /* lg + xl: 12px */

/* Icon sizing per button size */
--button-icon-sizing-xs       /* 16px — used by sm button */
--button-icon-sizing-sm       /* 20px — used by md button */
--button-icon-sizing-md       /* 22px — used by lg button */
--button-icon-sizing-lg       /* 24px — used by xl button */

/* Primary */
--button-primary-surface
--button-primary-text
--button-primary-border
--button-primary-hover-surface
--button-primary-hover-text
--button-primary-hover-border

/* Secondary */
--button-secondary-surface
--button-secondary-text
--button-secondary-border
--button-secondary-hover-surface
--button-secondary-hover-text
--button-secondary-hover-border

/* Tertiary */
--button-tertiary-surface
--button-tertiary-text
--button-tertiary-border
--button-tertiary-hover-surface
--button-tertiary-hover-text
--button-tertiary-hover-border

/* Danger */
--button-danger-surface
--button-danger-text
--button-danger-border
--button-danger-hover-surface
--button-danger-hover-text
--button-danger-hover-border

/* CTA Buy */
--button-cta-buy-surface
--button-cta-buy-text
--button-cta-buy-border
--button-cta-buy-hover-surface
--button-cta-buy-hover-text
--button-cta-buy-hover-border

/* Transparent */
--button-transparent-surface
--button-transparent-text
--button-transparent-border
--button-transparent-hover-surface
--button-transparent-hover-text
--button-transparent-hover-border

/* Focus */
--color-border-focus
```

## Usage Examples

### Label only

```html
<minis-button variant="primary">Buy now</minis-button>
```

### Icon + Label

Place the icon in the `icon` slot using `<minis-icon>` — it renders before the label automatically.

```html
<minis-button variant="primary">
  <minis-icon slot="icon" name="star"></minis-icon>
  Label
</minis-button>
```

### Icon only

Add the `icon-only` boolean attribute. Always include `aria-label` for accessibility.

```html
<minis-button variant="primary" icon-only aria-label="Add to favourites">
  <minis-icon slot="icon" name="star"></minis-icon>
</minis-button>
```

### All variants

```html
<minis-button variant="primary">Primary</minis-button>
<minis-button variant="secondary">Secondary</minis-button>
<minis-button variant="tertiary">Tertiary</minis-button>
<minis-button variant="danger">Delete</minis-button>
<minis-button variant="cta-buy">Buy Now</minis-button>

<!-- Transparent requires a dark background context -->
<div style="background: #555; padding: 8px;">
  <minis-button variant="transparent">Label</minis-button>
</div>
```

### All sizes

```html
<minis-button size="sm">Small</minis-button>
<minis-button size="md">Medium</minis-button>
<minis-button size="lg">Large</minis-button>
<minis-button size="xl">XL</minis-button>
```

### Disabled state

> **Prefer active over disabled.** Reach for `disabled` only when interaction is structurally impossible. For cases where the button is blocked by a missing prerequisite, keep it active and pair it with a `<minis-alert>` or contextual message instead. See [Design Principles → Prefer active states over disabled](../principles.md#prefer-active-states-over-disabled).

```html
<minis-button variant="primary" disabled>Unavailable</minis-button>
```

### Counter pill

The pill size is chosen automatically — never set it manually:

| Button size | Label mode (icon + label) | Icon-only mode               |
|-------------|--------------------------|------------------------------|
| `sm`        | `sm` pill (11×11px)      | `xs` pill (8×8px)            |
| `md`        | `md` pill (15×15px)      | `sm` pill (11×11px)          |
| `lg`        | `md` pill (15×15px)      | `sm` pill (11×11px)          |
| `xl`        | `md` pill (15×15px)      | `sm` pill (11×11px)          |

In icon-only mode the icon dims to 75% opacity so the floating pill is clearly readable.

```html
<!-- Inline pill (after label) — md pill auto-selected for md button -->
<minis-button variant="cta-buy" counter="3">
  <minis-icon slot="icon" name="cart-fill"></minis-icon>
  Cart
</minis-button>

<!-- Floating pill (top-right corner), icon at 75% opacity — sm pill auto-selected for md button -->
<minis-button variant="cta-buy" icon-only counter="3" aria-label="Cart, 3 items">
  <minis-icon slot="icon" name="cart-fill"></minis-icon>
</minis-button>
```

### In forms

```html
<form>
  <minis-button type="submit" variant="primary">Submit</minis-button>
  <minis-button type="reset" variant="secondary">Reset</minis-button>
</form>
```

## Common Patterns

### Primary CTA

```html
<minis-button variant="primary" size="xl">
  Get Started
</minis-button>
```

### CTA Buy with cart icon

```html
<minis-button variant="cta-buy">
  <minis-icon slot="icon" name="cart-fill"></minis-icon>
  Buy now
</minis-button>
```

### Button group

```html
<div style="display: flex; gap: var(--button-gap-elements);">
  <minis-button variant="primary">Save</minis-button>
  <minis-button variant="secondary">Cancel</minis-button>
</div>
```

### Danger action with icon

```html
<minis-button variant="danger">
  <minis-icon slot="icon" name="bin"></minis-icon>
  Delete item
</minis-button>
```

## AI Copy-Paste Prompt

```
Create a button using the Mini*S minis-button component:

<!-- Label only -->
<minis-button variant="primary" size="medium">Label</minis-button>

<!-- Icon + Label (use <minis-icon> from @minis/icons) -->
<minis-button variant="primary" size="medium">
  <minis-icon slot="icon" name="star"></minis-icon>
  Label
</minis-button>

<!-- Icon only (requires aria-label) -->
<minis-button variant="primary" size="medium" icon-only aria-label="Action description">
  <minis-icon slot="icon" name="star"></minis-icon>
</minis-button>

<!-- With counter pill -->
<minis-button variant="cta-buy" counter="5">
  <minis-icon slot="icon" name="cart-fill"></minis-icon>
  Cart
</minis-button>

Variants:  primary | secondary | tertiary | danger | cta-buy | transparent
Sizes:     sm | md | lg | xl
Booleans:  disabled  icon-only
Counter:   counter="<number string>"
Type:      type="button | submit | reset"

Note: transparent variant requires a dark background in the parent container.
Note: icon-only buttons must have aria-label for accessibility.
```

## Accessibility

- Uses a semantic `<button>` element internally
- Supports keyboard navigation (Tab, Enter, Space)
- `disabled` attribute fully prevents interaction and reduces opacity
- `icon-only` buttons **must** have `aria-label` on `<minis-button>` — there is no visible text for screen readers
- When using `counter`, include the count in `aria-label` for icon-only buttons (e.g. `aria-label="Cart, 3 items"`)
- Focus outline uses `--color-border-focus` token, visible on `:focus-visible`

## Do's and Don'ts

### ✅ Do

- Use `variant="primary"` for the single main action per section
- Use `variant="secondary"` for alternative or cancel actions
- Use `variant="danger"` for destructive actions (delete, remove)
- Use `variant="cta-buy"` for purchase/cart actions
- Use `variant="transparent"` only on dark or image backgrounds
- Always add `aria-label` when using `icon-only`
- Reflect the counter value in `aria-label` for icon-only buttons with `counter`
- Use `size="xl"` for prominent hero CTAs, `size="sm"` for compact toolbars

### ❌ Don't

- Don't use more than one `variant="primary"` button per section
- Don't use `variant="transparent"` on light backgrounds (contrast will fail)
- Don't use `icon-only` without `aria-label`
- Don't use buttons for navigation — use `<a>` links instead
- Don't nest buttons inside links
- Don't use `loading` — not yet implemented (planned roadmap item)
- Don't reach for `disabled` when the action is blocked by a missing prerequisite — prefer an active button paired with a `<minis-alert>`. See [Prefer active states over disabled](../principles.md#prefer-active-states-over-disabled)

---

**Related:**
- [Card with Action Pattern](../patterns/card-with-action.md)
- [Landing Page Template](../templates/landing-page.md)
- Figma source: node `284:5283`, file `mfiAVMWkxiBRGnegjqLMNW`
