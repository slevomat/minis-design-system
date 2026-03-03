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

| Size | Dimensions | Use in                                                         |
|------|------------|----------------------------------------------------------------|
| `md` | 15×15px    | General use — standalone, lists, headlines; md/lg label buttons |
| `sm` | 11×11px    | Inside sm label buttons (icon + label); md/lg icon-only buttons |
| `xs` | 8×8px      | Inside sm icon-only buttons                                    |

Single-digit values render as a circle; multi-digit values expand horizontally into a pill (capsule) shape.

## Design Tokens Used

```css
--color-core-white      /* Pill background */
--color-text-primary    /* Pill text colour */
--radius-radius-full    /* Border radius (full pill shape) */

/* Overridable via CSS custom properties */
--pill-counter-bg       /* defaults to --color-core-white */
--pill-counter-color    /* defaults to --color-text-primary */

/* Pixel tokens used for sizing */
--pixel-px-15   /* md height, min-width */
--pixel-px-12   /* md font-size */
--pixel-px-11   /* sm height, min-width */
--pixel-px-10   /* sm font-size */
--pixel-px-8    /* xs height, min-width, font-size */
--pixel-px-4    /* md horizontal padding */
--pixel-px-2    /* sm horizontal padding */
--pixel-px-1    /* xs horizontal padding */
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

`<minis-button>` selects the correct pill size automatically based on button size and mode:

| Button size | Label mode (icon + label) | Icon-only mode |
|-------------|--------------------------|----------------|
| `sm`        | `sm` pill                | `xs` pill      |
| `md`        | `md` pill                | `sm` pill      |
| `lg`        | `md` pill                | `sm` pill      |

When `icon-only` is set, the icon dims to 75% opacity so the floating pill reads clearly.

```html
<!-- md pill chosen automatically (md button + label) -->
<minis-button variant="cta-buy" counter="3">
  <svg slot="icon" ...></svg>
  Cart
</minis-button>

<!-- sm pill chosen automatically (sm button + label) -->
<minis-button variant="cta-buy" size="sm" counter="3">
  <svg slot="icon" ...></svg>
  Cart
</minis-button>

<!-- sm pill, floating top-right, icon at 75% opacity (md icon-only) -->
<minis-button variant="cta-buy" icon-only counter="3" aria-label="Cart, 3 items">
  <svg slot="icon" ...></svg>
</minis-button>

<!-- xs pill, floating top-right, icon at 75% opacity (sm icon-only) -->
<minis-button variant="cta-buy" size="sm" icon-only counter="3" aria-label="Cart, 3 items">
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

Sizes:
  md (15×15px) — general use, standalone, md/lg label buttons
  sm (11×11px) — sm label buttons, md/lg icon-only buttons
  xs  (8×8px)  — sm icon-only buttons

Single-digit → circle. Multi-digit → capsule (expands horizontally).

Note: When using with <minis-button>, use the counter="…" attribute on the button instead —
it selects the correct pill size automatically based on button size and icon-only mode.
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
- Don't manually compose a pill inside a button — always use `counter="…"` on `<minis-button>`

---

**Related:**
- [Button Component](./button.md) — uses pill-counter internally via `counter` attribute
- Figma source: node `688:2895`, file `mfiAVMWkxiBRGnegjqLMNW`
- Figma docs: node `583:11887`, file `mfiAVMWkxiBRGnegjqLMNW`
