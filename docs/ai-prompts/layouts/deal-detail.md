# Deal Detail Page — AI Layout Reference

A hotel/experience deal page on Slevomat. Photo gallery at top, tabbed navigation, then a two-column layout with filters/aside on the left and main content cards on the right.

**Figma:** [Deal Page 2XL](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=3569-1201)

---

## Page Sections (top to bottom)

### 1. Header Band

White background with bottom border. Contains the brand header and main category navigation.

```html
<div style="background: var(--color-surface-primary, white); border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);">
  <minis-container>

    <!-- Brand header -->
    <minis-topbar>
      <svg slot="logo" viewBox="0 0 124 30" height="30"><!-- Slevomat logo SVG --></svg>
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

    <!-- Main category navigation -->
    <minis-navigation variant="horizontal" aria-label="Hlavní menu">
      <minis-navigation-item href="/extra-slevy" active>
        <minis-icon slot="icon" name="star" size="20"></minis-icon>
        Extra slevy
      </minis-navigation-item>
      <minis-navigation-item href="/cestovani">Cestování</minis-navigation-item>
      <minis-navigation-item href="/zazitky">Zážitky a zábava</minis-navigation-item>
      <minis-navigation-item href="/krasa">Krása a relax</minis-navigation-item>
      <minis-navigation-item href="/restaurace">Restaurace a bary</minis-navigation-item>
      <minis-navigation-item href="/zbozi">Zboží</minis-navigation-item>
      <minis-navigation-item href="/fotodary">Fotodárky</minis-navigation-item>
      <minis-navigation-item href="/potraviny">Potraviny</minis-navigation-item>
      <minis-navigation-item href="/prakticke">Praktické</minis-navigation-item>
      <minis-navigation-item href="/darky">Dárky</minis-navigation-item>
      <minis-navigation-item href="/benefity">Benefity</minis-navigation-item>
    </minis-navigation>

  </minis-container>
</div>
```

### 2. Photo Gallery

Full-width photo gallery using the card-grid component. Sits on the page background.

```html
<minis-container>
  <div style="padding: var(--spacing-layout-md) 0;">
    <minis-card-grid variant="navigation">
      <img src="photo-1.jpg" alt="Hotel exterior" />
      <img src="photo-2.jpg" alt="Room" />
      <img src="photo-3.jpg" alt="Pool" />
      <img src="photo-4.jpg" alt="Restaurant" />
      <img src="photo-5.jpg" alt="Spa" />
      <img src="photo-6.jpg" alt="View" />
    </minis-card-grid>
  </div>
</minis-container>
```

**Layout:** 4-col × 2-row grid (584px desktop height). Item 1 spans 2 columns (featured). Mobile: horizontal scroll strip.

### 3. Deal Tab Navigation

Sticky white band with bottom + top border. Contains deal-specific tab navigation.

```html
<div style="background: var(--color-surface-primary, white); border-top: 1px solid var(--color-border-subtle, #e3e4e6); border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);">
  <minis-container>
    <minis-navigation variant="tabs">
      <minis-navigation-item active>Nabídka</minis-navigation-item>
      <minis-navigation-item>Hodnocení</minis-navigation-item>
      <minis-navigation-item>O hotelu</minis-navigation-item>
      <minis-navigation-item>Tipy na výlet</minis-navigation-item>
      <minis-navigation-item>Dotazy</minis-navigation-item>
    </minis-navigation>
  </minis-container>
</div>
```

**Gap between tabs:** `var(--spacing-layout-lg)` (32px on desktop, 20px on mobile).

### 4. Content Area (Aside + Main)

Two-column layout using a 12-column CSS grid: 4 columns for the aside, 8 for the main content.

```html
<minis-container>
  <div class="deal-content">

    <!-- Aside: 4 columns -->
    <aside class="deal-aside">
      <div class="deal-card">
        <!-- Filters, pricing, booking widget -->
        <h3 style="font-size: var(--typography-heading-md-size); font-weight: var(--typography-weight-bold);">
          Filtry
        </h3>
        <!-- filter content -->
      </div>
      <div class="deal-card deal-card--faded">
        <!-- Additional info -->
      </div>
    </aside>

    <!-- Main: 8 columns -->
    <main class="deal-main">
      <div class="deal-card">
        <h2 style="font-size: var(--typography-heading-xl-size); font-weight: var(--typography-weight-bold);">
          Hotel Marvelous Spa & Wellness ****
        </h2>
        <p style="color: var(--color-text-primary); font-size: var(--typography-size-md);">
          3 dny (2 noci) pro 2 osoby s polopenzí a neomezeným wellness...
        </p>
        <minis-button variant="primary">
          <minis-icon slot="icon" name="star-fill"></minis-icon>
          Zobrazit nabídku
        </minis-button>
      </div>
      <div class="deal-card">
        <!-- More content sections -->
        <minis-button variant="secondary">
          <minis-icon slot="icon" name="star-fill"></minis-icon>
          Další informace
        </minis-button>
      </div>
      <div class="deal-card deal-card--faded">
        <!-- Secondary sections -->
      </div>
    </main>

  </div>
</minis-container>
```

---

## CSS for the Content Grid

```css
/* Page background */
body {
  background: var(--color-background, #fcfdff);
  margin: 0;
  font-family: var(--typography-font-family-sans, Inter, sans-serif);
  color: var(--color-text-primary, black);
}

/* 12-column content grid */
.deal-content {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 48px;
  padding-top: var(--spacing-layout-md);
  padding-bottom: var(--spacing-layout-md);
}

.deal-aside {
  grid-column: 1 / span 4;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-layout-md);
}

.deal-main {
  grid-column: 5 / span 8;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-layout-md);
}

/* Section cards */
.deal-card {
  background: var(--color-surface-primary, white);
  border-radius: var(--border-radius-xl, 16px);
  padding: var(--spacing-layout-lg) 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.deal-card--faded {
  background: var(--color-surface-faded, #f1f3f5);
}

/* =====================
   RESPONSIVE: mobile stacking
   ===================== */
@media (max-width: 767px) {
  .deal-content {
    grid-template-columns: 1fr;
    column-gap: 0;
  }

  .deal-aside {
    grid-column: 1;
    order: 2; /* push aside below main on mobile */
  }

  .deal-main {
    grid-column: 1;
    order: 1;
  }
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
  <title>Hotel Marvelous — Slevomat</title>
  <link rel="stylesheet" href="node_modules/@minis/tokens/dist/index.css" />
  <script type="module">import '@minis/components';</script>
  <style>
    body {
      background: var(--color-background, #fcfdff);
      margin: 0;
      font-family: var(--typography-font-family-sans, Inter, sans-serif);
      color: var(--color-text-primary, black);
    }
    .deal-content {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      column-gap: 48px;
      padding-top: var(--spacing-layout-md);
      padding-bottom: var(--spacing-layout-md);
    }
    .deal-aside {
      grid-column: 1 / span 4;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-layout-md);
    }
    .deal-main {
      grid-column: 5 / span 8;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-layout-md);
    }
    .deal-card {
      background: var(--color-surface-primary, white);
      border-radius: var(--border-radius-xl, 16px);
      padding: var(--spacing-layout-lg) 10px;
    }
    .deal-card--faded {
      background: var(--color-surface-faded, #f1f3f5);
    }
    @media (max-width: 767px) {
      .deal-content { grid-template-columns: 1fr; column-gap: 0; }
      .deal-aside { grid-column: 1; order: 2; }
      .deal-main { grid-column: 1; order: 1; }
    }
  </style>
</head>
<body>

  <!-- 1. Header band -->
  <div style="background: var(--color-surface-primary); border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);">
    <minis-container>
      <minis-topbar>
        <svg slot="logo" viewBox="0 0 124 30" height="30"><!-- logo --></svg>
        <minis-button slot="actions" variant="tertiary" size="sm">
          <minis-icon slot="icon" name="heart-fill" size="16"></minis-icon>
          Oblíbené
        </minis-button>
        <minis-button slot="actions" variant="cta-buy">
          <minis-icon slot="icon" name="cart-fill"></minis-icon>
          Košík
        </minis-button>
      </minis-topbar>
      <minis-navigation variant="horizontal" aria-label="Hlavní menu">
        <minis-navigation-item href="/extra-slevy" active>
          <minis-icon slot="icon" name="star" size="20"></minis-icon>
          Extra slevy
        </minis-navigation-item>
        <minis-navigation-item href="/cestovani">Cestování</minis-navigation-item>
        <minis-navigation-item href="/zazitky">Zážitky a zábava</minis-navigation-item>
        <minis-navigation-item href="/krasa">Krása a relax</minis-navigation-item>
        <minis-navigation-item href="/restaurace">Restaurace a bary</minis-navigation-item>
        <minis-navigation-item href="/zbozi">Zboží</minis-navigation-item>
        <minis-navigation-item href="/fotodary">Fotodárky</minis-navigation-item>
        <minis-navigation-item href="/potraviny">Potraviny</minis-navigation-item>
        <minis-navigation-item href="/prakticke">Praktické</minis-navigation-item>
        <minis-navigation-item href="/darky">Dárky</minis-navigation-item>
        <minis-navigation-item href="/benefity">Benefity</minis-navigation-item>
      </minis-navigation>
    </minis-container>
  </div>

  <!-- 2. Photo gallery -->
  <minis-container>
    <div style="padding: var(--spacing-layout-md) 0;">
      <minis-card-grid variant="navigation">
        <img src="photo-1.jpg" alt="Main photo" />
        <img src="photo-2.jpg" alt="Photo 2" />
        <img src="photo-3.jpg" alt="Photo 3" />
        <img src="photo-4.jpg" alt="Photo 4" />
        <img src="photo-5.jpg" alt="Photo 5" />
        <img src="photo-6.jpg" alt="Photo 6" />
      </minis-card-grid>
    </div>
  </minis-container>

  <!-- 3. Deal tabs -->
  <div style="background: var(--color-surface-primary); border-top: 1px solid var(--color-border-subtle, #e3e4e6); border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);">
    <minis-container>
      <minis-navigation variant="tabs">
        <minis-navigation-item active>Nabídka</minis-navigation-item>
        <minis-navigation-item>Hodnocení</minis-navigation-item>
        <minis-navigation-item>O hotelu</minis-navigation-item>
        <minis-navigation-item>Tipy na výlet</minis-navigation-item>
        <minis-navigation-item>Dotazy</minis-navigation-item>
      </minis-navigation>
    </minis-container>
  </div>

  <!-- 4. Content: aside + main -->
  <minis-container>
    <div class="deal-content">
      <aside class="deal-aside">
        <div class="deal-card">Aside filters</div>
        <div class="deal-card deal-card--faded">Aside info</div>
      </aside>
      <main class="deal-main">
        <div class="deal-card">
          <h2>Hotel Marvelous Spa & Wellness ****</h2>
          <p>3 dny (2 noci) pro 2 osoby s polopenzí...</p>
          <minis-button variant="primary">
            <minis-icon slot="icon" name="star-fill"></minis-icon>
            Zobrazit nabídku
          </minis-button>
        </div>
        <div class="deal-card deal-card--faded">Secondary content</div>
      </main>
    </div>
  </minis-container>

</body>
</html>
```

---

## AI Copy-Paste Prompt

> Create a deal detail page for **[Hotel Name]** using the Mini*S design system.
> Use the deal-detail layout: header band with `<minis-topbar>` + `<minis-navigation variant="horizontal">`,
> photo gallery with `<minis-card-grid variant="navigation">` (6 hotel photos),
> deal tabs with `<minis-navigation variant="tabs">` (Nabídka, Hodnocení, O hotelu, Tipy na výlet, Dotazy),
> and a 12-column content grid with 4-col aside (filters) + 8-col main (deal cards with title, description, and buttons).
> Wrap everything in `<minis-container>`. Use `--spacing-layout-*` tokens for gaps.
> Background: `var(--color-background)`. Cards: `var(--color-surface-primary)` with `var(--border-radius-xl)`.
> On mobile (< 768px), stack aside below main. Replace hotel name, photos, and description with real content.

---

**Last updated:** 2026-03-20
