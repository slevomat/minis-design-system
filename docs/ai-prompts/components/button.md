# Button Component - AI Prompt Guide

## Component Overview

The `<minis-button>` component provides primary interface actions with multiple variants, sizes,
icon support, and an optional counter pill badge.

**Tag:** `<minis-button>`

## API

### Attributes

| Attribute   | Type    | Default     | Values                                                                    |
|-------------|---------|-------------|---------------------------------------------------------------------------|
| `variant`   | string  | `"primary"` | `primary`, `secondary`, `tertiary`, `danger`, `cta-buy`, `transparent`   |
| `size`      | string  | `"md"`      | `sm`, `md`, `lg`                                                          |
| `disabled`  | boolean | `false`     | —                                                                         |
| `icon-only` | boolean | `false`     | Renders only the icon slot; counter pill floats top-right                 |
| `counter`   | string  | —           | Number string e.g. `"3"`. Inline pill when label present, floating when `icon-only` |
| `type`      | string  | `"button"`  | `button`, `submit`, `reset`                                               |

### Slots

| Slot        | Description                                    |
|-------------|------------------------------------------------|
| *(default)* | Button label text                              |
| `icon`      | Icon element placed before the label (any SVG) |

## Design Tokens Used

All tokens are `--button-*` component tokens resolved through the design token cascade.

```css
/* Structure */
--button-border-radius        /* 4px (--border-radius-sm) */
--button-border-width         /* 1px */
--button-gap-elements         /* 4px gap between icon and label */

/* Padding per size */
--button-padding-x            /* md: 12px */
--button-padding-y            /* md: 8px */
--button-small-padding-x      /* sm: 8px */
--button-small-padding-y      /* sm: 3px */
--button-large-padding-x      /* lg: 16px */
--button-large-padding-y      /* lg: 12px */

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

Place the icon in the `icon` slot — it renders before the label automatically.

```html
<minis-button variant="primary">
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
  Label
</minis-button>
```

### Icon only

Add the `icon-only` boolean attribute. Always include `aria-label` for accessibility.

```html
<minis-button variant="primary" icon-only aria-label="Add to favourites">
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
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
<minis-button size="md">Default</minis-button>
<minis-button size="lg">Big</minis-button>
```

### Disabled state

```html
<minis-button variant="primary" disabled>Unavailable</minis-button>
```

### Counter pill — inline (icon + label)

```html
<minis-button variant="cta-buy" counter="3">
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM5.21 5H3V3H1v2h2l3.6 7.59L5.25 15c-.16.28-.25.61-.25.95C5 17.1 5.9 18 7 18h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 5H5.21z"/>
  </svg>
  Cart
</minis-button>
```

### Counter pill — floating (icon only)

When `icon-only` is set, the pill floats in the top-right corner of the button.

```html
<minis-button variant="cta-buy" icon-only counter="3" aria-label="Cart, 3 items">
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM5.21 5H3V3H1v2h2l3.6 7.59L5.25 15c-.16.28-.25.61-.25.95C5 17.1 5.9 18 7 18h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 5H5.21z"/>
  </svg>
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
<minis-button variant="primary" size="lg">
  Get Started
</minis-button>
```

### CTA Buy with cart icon

```html
<minis-button variant="cta-buy">
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM5.21 5H3V3H1v2h2l3.6 7.59L5.25 15c-.16.28-.25.61-.25.95C5 17.1 5.9 18 7 18h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 5H5.21z"/>
  </svg>
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
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
  Delete item
</minis-button>
```

## AI Copy-Paste Prompt

```
Create a button using the Mini*S minis-button component:

<!-- Label only -->
<minis-button variant="primary" size="md">Label</minis-button>

<!-- Icon + Label -->
<minis-button variant="primary" size="md">
  <svg slot="icon" ...></svg>
  Label
</minis-button>

<!-- Icon only (requires aria-label) -->
<minis-button variant="primary" size="md" icon-only aria-label="Action description">
  <svg slot="icon" ...></svg>
</minis-button>

<!-- With counter pill -->
<minis-button variant="cta-buy" counter="5">
  <svg slot="icon" ...></svg>
  Cart
</minis-button>

Variants:  primary | secondary | tertiary | danger | cta-buy | transparent
Sizes:     sm | md | lg
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
- Use `size="lg"` for prominent hero CTAs, `size="sm"` for compact toolbars

### ❌ Don't

- Don't use more than one `variant="primary"` button per section
- Don't use `variant="transparent"` on light backgrounds (contrast will fail)
- Don't use `icon-only` without `aria-label`
- Don't use buttons for navigation — use `<a>` links instead
- Don't nest buttons inside links
- Don't use `loading` — not yet implemented (planned roadmap item)

---

**Related:**
- [Card with Action Pattern](../patterns/card-with-action.md)
- [Landing Page Template](../templates/landing-page.md)
- Figma source: node `284:5283`, file `mfiAVMWkxiBRGnegjqLMNW`
