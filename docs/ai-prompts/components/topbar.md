# Topbar Component — AI Prompt Reference

## Component Overview

**Tag:** `<minis-topbar>`
**Description:** Brand identity bar that sits above `<minis-navigation>`. Contains the logo on the left and action buttons on the right (shortcuts, cart, etc.).

---

## API

### Attributes

None — the topbar is a pure slot-based layout component.

### Slots

| Slot | Description |
|------|-------------|
| `logo` | Brand logo (left side) — typically an `<img>` or `<svg>`, max-height 30px |
| `actions` | Right-side action buttons — use multiple `<minis-button>` elements |

### CSS Custom Properties

| Token | Default | Description |
|-------|---------|-------------|
| `--topbar-height` | `64px` | Total topbar height |
| `--topbar-actions-gap` | `10px` | Gap between action items |

---

## Usage Examples

### Basic with logo and action buttons

```html
<minis-topbar>
  <img slot="logo" src="/logo.svg" alt="Slevomat" />
  <minis-button slot="actions" variant="tertiary" size="sm">
    <minis-icon slot="icon" name="heart-fill" size="16"></minis-icon>
    Oblíbené
  </minis-button>
  <minis-button slot="actions" variant="tertiary" size="sm">
    <minis-icon slot="icon" name="stick" size="16"></minis-icon>
    Neoblíbené
  </minis-button>
  <minis-button slot="actions" variant="cta-buy">
    <minis-icon slot="icon" name="cart-fill"></minis-icon>
    Košík
  </minis-button>
</minis-topbar>
```

### Combined with navigation (typical page layout)

```html
<minis-container>
  <minis-topbar>
    <img slot="logo" src="/logo.svg" alt="Slevomat" />
    <minis-button slot="actions" variant="cta-buy">
      <minis-icon slot="icon" name="cart-fill"></minis-icon>
      Košík
    </minis-button>
  </minis-topbar>
  <minis-navigation variant="horizontal">
    <minis-navigation-item href="/" active>Home</minis-navigation-item>
    <minis-navigation-item href="/deals">Deals</minis-navigation-item>
  </minis-navigation>
</minis-container>
```

---

## Design Notes (from Figma)

- Topbar height is 64px
- Logo area has 16px right padding
- Right-side buttons use `variant="tertiary" size="sm"` for secondary actions (Oblíbené, Neoblíbené) and `variant="cta-buy"` for the cart button
- Icons in tertiary buttons use `size="16"` (sm button size)
- Actions gap is 10px

---

## Accessibility

- The topbar is a structural wrapper — add `role="banner"` or use a `<header>` element around it for landmark navigation.
- Logo should have meaningful `alt` text.

---

**Last updated:** 2026-03-20
