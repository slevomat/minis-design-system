# Checkout (Košík) Page — AI Layout Reference

Single-column checkout flow on Slevomat. Narrow container, stacked content cards, no aside. Used for cart, order summary, payment, and confirmation steps.

---

## Page Sections (top to bottom)

### 1. Header Band

Same as all pages — brand header with simplified actions (typically just logo + cart).

```html
<div style="background: var(--color-surface-primary, white); border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);">
  <minis-container>
    <minis-topbar>
      <svg slot="logo" viewBox="0 0 124 30" height="30"><!-- Slevomat logo SVG --></svg>
      <minis-button slot="actions" variant="cta-buy">
        <minis-icon slot="icon" name="cart-fill"></minis-icon>
        Košík
      </minis-button>
    </minis-topbar>
  </minis-container>
</div>
```

### 2. Checkout Steps (optional)

A simple step indicator or navigation for multi-step checkout.

```html
<div style="background: var(--color-surface-primary, white); border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);">
  <minis-container variant="narrow">
    <minis-navigation variant="tabs">
      <minis-navigation-item active>1. Košík</minis-navigation-item>
      <minis-navigation-item>2. Dodací údaje</minis-navigation-item>
      <minis-navigation-item>3. Platba</minis-navigation-item>
      <minis-navigation-item>4. Potvrzení</minis-navigation-item>
    </minis-navigation>
  </minis-container>
</div>
```

### 3. Content — Stacked Cards

All content sits in a single narrow column. Each logical section is a card.

```html
<minis-container variant="narrow">
  <div class="checkout-content">

    <!-- Order summary -->
    <div class="checkout-card">
      <h2 style="font-size: var(--typography-heading-lg-size); font-weight: var(--typography-weight-bold);">
        Váš košík
      </h2>
      <!-- Cart items -->
    </div>

    <!-- Customer info -->
    <div class="checkout-card">
      <h2 style="font-size: var(--typography-heading-lg-size); font-weight: var(--typography-weight-bold);">
        Dodací údaje
      </h2>
      <!-- Form fields -->
    </div>

    <!-- Payment -->
    <div class="checkout-card">
      <h2 style="font-size: var(--typography-heading-lg-size); font-weight: var(--typography-weight-bold);">
        Způsob platby
      </h2>
      <!-- Payment options -->
    </div>

    <!-- Action -->
    <div class="checkout-actions">
      <minis-button variant="cta-buy" size="xl">
        <minis-icon slot="icon" name="cart-fill"></minis-icon>
        Objednat a zaplatit
      </minis-button>
    </div>

  </div>
</minis-container>
```

---

## CSS

```css
body {
  background: var(--color-background, #fcfdff);
  margin: 0;
  font-family: var(--typography-font-family-sans, Inter, sans-serif);
  color: var(--color-text-primary, black);
}

.checkout-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-layout-md);
  padding-top: var(--spacing-layout-md);
  padding-bottom: var(--spacing-layout-xl);
}

.checkout-card {
  background: var(--color-surface-primary, white);
  border-radius: var(--border-radius-xl, 16px);
  padding: var(--spacing-layout-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-layout-sm);
}

.checkout-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: var(--spacing-layout-sm);
}
```

---

## Complete Page Skeleton

```html
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Košík — Slevomat</title>
  <link rel="stylesheet" href="node_modules/@minis/tokens/dist/index.css" />
  <script type="module">import '@minis/components';</script>
  <style>
    body {
      background: var(--color-background, #fcfdff);
      margin: 0;
      font-family: var(--typography-font-family-sans, Inter, sans-serif);
      color: var(--color-text-primary, black);
    }
    .checkout-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-layout-md);
      padding-top: var(--spacing-layout-md);
      padding-bottom: var(--spacing-layout-xl);
    }
    .checkout-card {
      background: var(--color-surface-primary, white);
      border-radius: var(--border-radius-xl, 16px);
      padding: var(--spacing-layout-lg);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-layout-sm);
    }
    .checkout-actions {
      display: flex;
      justify-content: flex-end;
      padding-top: var(--spacing-layout-sm);
    }
  </style>
</head>
<body>

  <!-- 1. Header band -->
  <div style="background: var(--color-surface-primary); border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);">
    <minis-container>
      <minis-topbar>
        <svg slot="logo" viewBox="0 0 124 30" height="30"><!-- logo --></svg>
        <minis-button slot="actions" variant="cta-buy">
          <minis-icon slot="icon" name="cart-fill"></minis-icon>
          Košík
        </minis-button>
      </minis-topbar>
    </minis-container>
  </div>

  <!-- 2. Checkout steps -->
  <div style="background: var(--color-surface-primary); border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);">
    <minis-container variant="narrow">
      <minis-navigation variant="tabs">
        <minis-navigation-item active>1. Košík</minis-navigation-item>
        <minis-navigation-item>2. Dodací údaje</minis-navigation-item>
        <minis-navigation-item>3. Platba</minis-navigation-item>
        <minis-navigation-item>4. Potvrzení</minis-navigation-item>
      </minis-navigation>
    </minis-container>
  </div>

  <!-- 3. Content -->
  <minis-container variant="narrow">
    <div class="checkout-content">

      <div class="checkout-card">
        <h2 style="font-size: var(--typography-heading-lg-size); font-weight: var(--typography-weight-bold);">
          Váš košík
        </h2>
        <p>3 dny (2 noci) pro 2 osoby — Hotel Marvelous Spa ****</p>
        <p style="font-size: var(--typography-size-xl); font-weight: var(--typography-weight-bold);">
          4 990 Kč
        </p>
      </div>

      <div class="checkout-card">
        <h2 style="font-size: var(--typography-heading-lg-size); font-weight: var(--typography-weight-bold);">
          Dodací údaje
        </h2>
        <!-- form fields here -->
      </div>

      <div class="checkout-card">
        <h2 style="font-size: var(--typography-heading-lg-size); font-weight: var(--typography-weight-bold);">
          Způsob platby
        </h2>
        <!-- payment options here -->
      </div>

      <div class="checkout-actions">
        <minis-button variant="cta-buy" size="xl">
          <minis-icon slot="icon" name="cart-fill"></minis-icon>
          Objednat a zaplatit
        </minis-button>
      </div>

    </div>
  </minis-container>

</body>
</html>
```

---

## Key Differences from Deal Detail

| Aspect | Deal Detail | Checkout |
|--------|-------------|----------|
| Container | `<minis-container>` (full) | `<minis-container variant="narrow">` |
| Grid | 12-col, aside (4) + main (8) | Single column, no grid |
| Navigation | horizontal + tabs | tabs only (checkout steps) |
| Photo gallery | Yes | No |
| Primary CTA | `variant="primary"` | `variant="cta-buy" size="xl"` |

---

## AI Copy-Paste Prompt

> Create a checkout (košík) page using the Mini*S design system.
> Use a single-column layout with `<minis-container variant="narrow">`.
> Header band with `<minis-topbar>` (logo + cart button).
> Checkout step tabs with `<minis-navigation variant="tabs">` (Košík, Dodací údaje, Platba, Potvrzení).
> Stack content in `.checkout-card` sections (white, `--border-radius-xl`, `--spacing-layout-lg` padding).
> Final CTA: `<minis-button variant="cta-buy" size="xl">`.
> Background: `var(--color-background)`. Use `--spacing-layout-*` tokens for all gaps.

---

**Last updated:** 2026-03-19
