# Checkout (Košík) Page — AI Layout Reference

Single-column checkout flow on Slevomat: stacked content cards, no sidebar. Used for cart, order summary, payment, and confirmation steps.

**Width levels:** a task page uses two of the [three levels](./index.md#three-width-levels), as
production's cart does:

- **`<minis-container variant="medium">`** (1008px) for the full-width parts of the step: the
  step tabs, the page heading, messages that belong to the whole step.
- **`<minis-container variant="narrow">`** (752px box, 688px content from 1008px) for the reading
  / form column: the cards and the final action.

> **Production:** the live cart is a 1008px `grid-wrap` with a 704px content column (about 688px
> of usable text) — the same two levels (decided 2026-11-26, plan 030). See
> [Production Reference](./production-reference.md#the-cart-a-narrow-container-plus-a-reading-column).

---

## Page Sections (top to bottom)

### 1. Header Band

Same as all Slevomat pages: `<minis-topbar>` followed by `<minis-navigation variant="main-nav">`
(mandatory on every page of the site; the full category list is in
[Deal Detail → Header Band](./deal-detail.md#1-header-band)). The header uses the default (wide)
container like every page; only the content below narrows.

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
    <minis-navigation variant="main-nav" aria-label="Hlavní menu">
      <!-- the 11 Slevomat categories, as on Deal Detail -->
    </minis-navigation>
  </minis-container>
</div>
```

### 2. Checkout Steps (optional)

A step indicator for a multi-step checkout, in the **medium** container. Tab navigation always
sits in a full-width surface band with borders top and bottom ([Layouts](./index.md#tab-navigation-band)).

```html
<div style="background: var(--color-surface-primary, white); border-top: 1px solid var(--color-border-subtle, #e3e4e6); border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);">
  <minis-container variant="medium">
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

All content sits in the narrow reading / form column. Each logical section is a card.

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
  background: var(--color-background);
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
      background: var(--color-background);
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

  <!-- 1. Header band (default container, like every page) -->
  <div style="background: var(--color-surface-primary); border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);">
    <minis-container>
      <minis-topbar>
        <svg slot="logo" viewBox="0 0 124 30" height="30"><!-- logo --></svg>
        <minis-button slot="actions" variant="cta-buy">
          <minis-icon slot="icon" name="cart-fill"></minis-icon>
          Košík
        </minis-button>
      </minis-topbar>
      <minis-navigation variant="main-nav" aria-label="Hlavní menu">
        <minis-navigation-item active>
          <minis-icon slot="icon" name="star" size="20"></minis-icon>
          Extra slevy
        </minis-navigation-item>
        <minis-navigation-item>Cestování</minis-navigation-item>
        <minis-navigation-item>Zážitky a zábava</minis-navigation-item>
        <minis-navigation-item>Krása a relax</minis-navigation-item>
        <minis-navigation-item>Restaurace a bary</minis-navigation-item>
        <minis-navigation-item>Zboží</minis-navigation-item>
        <minis-navigation-item>Fotodárky</minis-navigation-item>
        <minis-navigation-item>Potraviny</minis-navigation-item>
        <minis-navigation-item>Praktické</minis-navigation-item>
        <minis-navigation-item>Dárky</minis-navigation-item>
        <minis-navigation-item>Benefity</minis-navigation-item>
      </minis-navigation>
    </minis-container>
  </div>

  <!-- 2. Checkout steps (medium container, in a bordered surface band) -->
  <div style="background: var(--color-surface-primary); border-top: 1px solid var(--color-border-subtle, #e3e4e6); border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);">
    <minis-container variant="medium">
      <minis-navigation variant="tabs">
        <minis-navigation-item active>1. Košík</minis-navigation-item>
        <minis-navigation-item>2. Dodací údaje</minis-navigation-item>
        <minis-navigation-item>3. Platba</minis-navigation-item>
        <minis-navigation-item>4. Potvrzení</minis-navigation-item>
      </minis-navigation>
    </minis-container>
  </div>

  <!-- 3. Content (narrow reading / form column) -->
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
| Page type | Browsing | Task |
| Container | `<minis-container>` (wide, 1240px) | `variant="medium"` (1008px) for the steps + `variant="narrow"` (752px) for the cards |
| Columns | `<minis-sidebar-layout>`: main + 320px sidebar | One column, no sidebar |
| Navigation | main-nav + tabs | main-nav + tabs (checkout steps) |
| Photo gallery | Yes | No |
| Primary CTA | `variant="primary"` | `variant="cta-buy" size="xl"` |

---

## AI Copy-Paste Prompt

> Create a checkout (košík) page using the Mini*S design system.
> It's a task page: the step tabs go in `<minis-container variant="medium">` (1008px), the content cards in a single column in `<minis-container variant="narrow">` (752px).
> Header band (default container) with `<minis-topbar>` (logo + cart button) followed by `<minis-navigation variant="main-nav">` with the Slevomat categories.
> Checkout step tabs with `<minis-navigation variant="tabs">` (Košík, Dodací údaje, Platba, Potvrzení) in a full-width surface band with borders top and bottom.
> Stack content in `.checkout-card` sections (white, `--border-radius-xl`, `--spacing-layout-lg` padding).
> Final CTA: `<minis-button variant="cta-buy" size="xl">`.
> Background: `var(--color-background)`. Use `--spacing-layout-*` tokens for all gaps.

---

**Last updated:** 2026-11-26
