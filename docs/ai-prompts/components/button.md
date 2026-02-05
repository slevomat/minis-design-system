# Button Component - AI Prompt Guide

## Component Overview

The `<minis-button>` component provides primary interface actions with multiple variants and states.

**Tag:** `<minis-button>`

## API

### Attributes

| Attribute | Type | Default | Values |
|-----------|------|---------|--------|
| `variant` | string | `"primary"` | `primary`, `secondary`, `tertiary`, `danger`, `cta-buy` |
| `size` | string | `"md"` | `sm`, `md`, `lg` |
| `disabled` | boolean | `false` | `true`, `false` |
| `loading` | boolean | `false` | `true`, `false` |
| `type` | string | `"button"` | `button`, `submit`, `reset` |

### Slots

| Slot | Description |
|------|-------------|
| (default) | Button text or content |

## Design Tokens Used

```css
/* Colors */
--color-interaction-primary-surface
--color-interaction-primary-hover-surface
--color-interaction-primary-accent
--color-interaction-secondary-surface
--color-interaction-tertiary-surface
--color-interaction-danger-surface
--color-interaction-cta-buy-surface

/* Spacing */
--spacing-inset-xs, -sm, -md, -lg

/* Layout */
--border-radius-md
--border-width-medium

/* Focus */
--color-border-focus
```

## Usage Examples

### Basic Button

```html
<minis-button>Click me</minis-button>
```

### All Variants

```html
<minis-button variant="primary">Primary</minis-button>
<minis-button variant="secondary">Secondary</minis-button>
<minis-button variant="tertiary">Tertiary</minis-button>
<minis-button variant="danger">Delete</minis-button>
<minis-button variant="cta-buy">Buy Now</minis-button>
```

### Sizes

```html
<minis-button size="sm">Small</minis-button>
<minis-button size="md">Medium</minis-button>
<minis-button size="lg">Large</minis-button>
```

### States

```html
<minis-button disabled>Disabled</minis-button>
<minis-button loading>Loading...</minis-button>
```

### In Forms

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

### Button Group

```html
<div style="display: flex; gap: var(--spacing-sm);">
  <minis-button variant="primary">Save</minis-button>
  <minis-button variant="secondary">Cancel</minis-button>
</div>
```

### Loading State

```html
<minis-button variant="primary" loading>
  Processing...
</minis-button>
```

## AI Copy-Paste Prompt

```
Create a button using Mini*S button component:

<minis-button variant="primary" size="md">
  [Button Text]
</minis-button>

Variants available: primary, secondary, tertiary, danger, cta-buy
Sizes available: sm, md, lg
Additional attributes: disabled, loading, type
```

## Accessibility

- Uses semantic `<button>` element
- Supports keyboard navigation (Tab, Enter, Space)
- Includes `aria-busy` for loading state
- Properly disabled state with `disabled` attribute
- Focus visible outline via `--color-border-focus` token

## Do's and Don'ts

### ✅ Do

- Use `variant="primary"` for main actions
- Use `variant="secondary"` for alternative actions
- Use `variant="danger"` for delete/remove actions
- Use `variant="cta-buy"` for purchase actions
- Use `loading` state for async operations
- Group related buttons with consistent spacing

### ❌ Don't

- Don't use more than one primary button per section
- Don't nest buttons inside links
- Don't use buttons for navigation (use links instead)
- Don't omit button text (use icon + text, not icon alone)

---

**Related:**
- [Card with Action Pattern](../patterns/card-with-action.md)
- [Landing Page Template](../templates/landing-page.md)
