# Header Component — AI Prompt Reference

## Component Overview

**Tag:** `<minis-header>`
**Description:** Main brand bar that sits above `<minis-navigation>`. Contains a logo on the left and action buttons on the right.

---

## API

### Attributes

None — the header is a pure slot-based layout component.

### Slots

| Slot | Description |
|------|-------------|
| `logo` | Brand logo (left side) — typically an `<img>` or `<svg>`, max-height 30px |
| `actions` | Right-side action buttons — use multiple `<minis-button>` elements |

### CSS Custom Properties

| Token | Default | Description |
|-------|---------|-------------|
| `--header-height` | `64px` | Total header height |
| `--header-actions-gap` | `10px` | Gap between action items |

---

## Usage Examples

### Basic with logo and action buttons

```html
<minis-header>
  <img slot="logo" src="/logo.svg" alt="Slevomat" />
  <minis-button slot="actions" variant="tertiary" size="sm">
    <minis-icon slot="icon" name="heart-fill" size="16"></minis-icon>
    Oblibene
  </minis-button>
  <minis-button slot="actions" variant="tertiary" size="sm">
    <minis-icon slot="icon" name="stick" size="16"></minis-icon>
    Neoblibene
  </minis-button>
  <minis-button slot="actions" variant="cta-buy">
    <minis-icon slot="icon" name="cart-fill"></minis-icon>
    Kosik
  </minis-button>
</minis-header>
```

### Combined with navigation (typical page layout)

```html
<minis-container>
  <minis-header>
    <img slot="logo" src="/logo.svg" alt="Slevomat" />
    <minis-button slot="actions" variant="cta-buy">
      <minis-icon slot="icon" name="cart-fill"></minis-icon>
      Kosik
    </minis-button>
  </minis-header>
  <minis-navigation variant="horizontal">
    <minis-navigation-item href="/" active>Home</minis-navigation-item>
    <minis-navigation-item href="/deals">Deals</minis-navigation-item>
  </minis-navigation>
</minis-container>
```

---

## Design Notes (from Figma)

- Header height is 64px
- Logo area has 16px right padding
- Right-side buttons use `variant="tertiary" size="sm"` for secondary actions (Oblibene, Neoblibene) and `variant="cta-buy"` for the cart button
- Icons in tertiary buttons use `size="16"` (sm button size)
- Actions gap is 10px

---

## Accessibility

- The header is a structural wrapper — add `role="banner"` or use a `<header>` element around it for landmark navigation.
- Logo should have meaningful `alt` text.

---

**Last updated:** 2026-03-19
