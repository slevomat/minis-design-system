# Pill Counter Component - AI Prompt Guide

## Component Overview

The `<minis-pill-counter>` component displays a numeric badge (pill). It is a sub-component used
inside `<minis-button>` to show item counts, but can also be used standalone — behind labels,
list items, headlines, etc.

**Tag:** `<minis-pill-counter>`

## API

### Attributes

| Attribute | Type   | Default | Values                                                  |
|-----------|--------|---------|---------------------------------------------------------|
| `size`    | string | `"md"`  | `md`, `sm`, `xs`                                        |

### Slots

| Slot        | Description          |
|-------------|----------------------|
| *(default)* | The numeric value    |

### Size context

Each size has a designated context — do not mix them:

| Size | Use in                                     |
|------|--------------------------------------------|
| `md` | General use — standalone, lists, headlines |
| `sm` | Inside icon + label buttons                |
| `xs` | Inside icon-only buttons                   |

## Design Tokens Used

```css
--color-core-white      /* Pill background */
--color-text-primary    /* Pill text colour */
--radius-radius-full    /* Border radius (full pill shape) */

/* Typography sizing via pixel tokens */
--pixel-px-12   /* md font-size */
--pixel-px-11   /* md line-height */
--pixel-px-15   /* md min-width */
--pixel-px-10   /* sm font-size */
--pixel-px-8    /* sm line-height / xs font-size */
--pixel-px-11   /* sm min-width */
--pixel-px-8    /* xs min-width */
--pixel-px-6    /* xs line-height */
```

## Usage Examples

### Standalone (md)

```html
<minis-pill-counter>3</minis-pill-counter>
```

### All sizes

```html
<minis-pill-counter size="md">12</minis-pill-counter>
<minis-pill-counter size="sm">12</minis-pill-counter>
<minis-pill-counter size="xs">12</minis-pill-counter>
```

### Used via minis-button (automatic — preferred)

`<minis-button>` selects the correct size automatically:
- `sm` when the button has a label (icon + label variant)
- `xs` when the button is icon-only

```html
<!-- sm pill chosen automatically -->
<minis-button variant="cta-buy" counter="3">
  <svg slot="icon" ...></svg>
  Cart
</minis-button>

<!-- xs pill chosen automatically -->
<minis-button variant="cta-buy" icon-only counter="3" aria-label="Cart, 3 items">
  <svg slot="icon" ...></svg>
</minis-button>
```

### Standalone behind a label

```html
<div style="display: flex; align-items: center; gap: 8px;">
  <span>Messages</span>
  <minis-pill-counter>5</minis-pill-counter>
</div>
```

## AI Copy-Paste Prompt

```
Add a pill counter badge using the Mini*S pill-counter component:

<minis-pill-counter size="md">3</minis-pill-counter>

Sizes: md (default, general use) | sm (inside icon+label buttons) | xs (inside icon-only buttons)

Note: When using with <minis-button>, use the counter="…" attribute on the button instead —
it will render the correct pill size automatically.
```

## Accessibility

- The pill is purely visual — ensure surrounding context (e.g. a button's `aria-label`) communicates
  the count to screen readers when using `xs` or `sm` inside icon-only buttons.

## Do's and Don'ts

### ✅ Do

- Use `md` for standalone use cases (badges next to labels, headlines, list items)
- Use the `counter` attribute on `<minis-button>` rather than composing manually — it picks the right size
- Display numeric strings only — the pill is designed for numbers

### ❌ Don't

- Don't use `sm` or `xs` standalone — these sizes are calibrated for use inside buttons
- Don't put text or icons inside the pill — numbers only

---

**Related:**
- [Button Component](./button.md) — uses pill-counter internally via `counter` attribute
- Figma source: node `688:2895`, file `mfiAVMWkxiBRGnegjqLMNW`
- Figma docs: node `583:11887`, file `mfiAVMWkxiBRGnegjqLMNW`
