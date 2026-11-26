# Deal Detail Page — AI Layout Reference

A hotel/experience deal page on Slevomat. Breadcrumbs + save toggle, photo gallery, deal title, tabbed navigation, then main content on the left and widgets on the right.

**Width level:** browsing page → the **default (wide) container**, 1240px. **Main + sidebar:**
`<minis-sidebar-layout>` — fluid main, fixed 320px sidebar, side by side from 1008px. See
[Layouts → Three width levels](./index.md#three-width-levels).

**Figma:** [Deal Page 2XL](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=3569-1201)

> **Production:** the live deal detail splits 779 / 357px with a ~40px gap and stacks below
> 1008px. Mini*S stacks at the same breakpoint and standardises the split on one rule for every
> main + sidebar page: 824 + 32 + 320px at 1240px+ (decided 2026-11-26, plan 030). See
> [Production Reference](./production-reference.md#main--sidebar-each-component-does-its-own-split).

---

## Page Sections (top to bottom)

### 1. Header Band

White background with bottom border. Contains the brand topbar and main category navigation.
This is **identical on every page** — see [layouts/index.md](./index.md) for the full pattern.

```html
<div style="background: var(--color-surface-primary, white); border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);">
  <minis-container>

    <!-- Brand topbar -->
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

    <!-- Main category navigation (no href = renders as buttons, no page refresh) -->
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
```

### 2. Breadcrumbs Row

A row inside the container with breadcrumbs on the left and a "Uložit" (save/favourite) toggle tag with heart icon on the right. Uses flexbox with `justify-content: space-between`.

```html
<minis-container>
  <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--spacing-layout-sm) 0;">

    <!-- Breadcrumbs (left) -->
    <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 8px; font-size: var(--typography-size-sm); color: var(--color-text-secondary);">
      <a href="/" style="color: var(--color-text-secondary); text-decoration: none;">Slevomat</a>
      <span>›</span>
      <a href="/cestovani" style="color: var(--color-text-secondary); text-decoration: none;">Cestování</a>
      <span>›</span>
      <span style="color: var(--color-text-primary);">Hotel Marvelous</span>
    </nav>

    <!-- Save toggle (right) -->
    <minis-tag variant="toggle">
      <minis-icon slot="icon" name="heart" size="20"></minis-icon>
      Uložit
    </minis-tag>

  </div>
</minis-container>
```

**Toggle behaviour:** The `<minis-tag variant="toggle">` persists pressed state and fires a `toggle` event. Consumer **must** listen and swap icon: `heart` ↔ `heart-fill`:

```js
document.querySelectorAll('minis-tag[variant="toggle"]').forEach(tag => {
  tag.addEventListener('toggle', (e) => {
    const icon = tag.querySelector('minis-icon[slot="icon"]');
    if (icon) icon.setAttribute('name', e.detail.pressed ? 'heart-fill' : 'heart');
  });
});
```

### 3. Photo Gallery

Photo gallery using the card-grid component with the `photogallery` variant.

```html
<minis-container>
  <minis-card-grid variant="photogallery">
    <img src="photo-1.jpg" alt="Hotel exterior" />  <!-- Featured: spans 3 cols × 3 rows -->
    <img src="photo-2.jpg" alt="Room" />             <!-- Wide: spans 2 cols × 2 rows -->
    <img src="photo-3.jpg" alt="Pool" />             <!-- Small thumbnail -->
    <img src="photo-4.jpg" alt="Restaurant" />       <!-- Small thumbnail -->
  </minis-card-grid>
</minis-container>
```

> **Exactly 4 slots.** The photogallery variant uses a 5-col × 3-row CSS grid with 4 positioned items: item 1 (large featured, 3 cols × 3 rows), item 2 (wide, 2 cols × 2 rows), items 3–4 (small thumbnails). Extra items will overflow and break the layout.

### 4. Deal Title

The deal title sits inside the container, below the gallery.

```html
<minis-container>
  <h1 style="font-size: var(--typography-heading-xl-size); font-weight: var(--typography-weight-bold); margin: var(--spacing-layout-sm) 0 var(--spacing-layout-md);">
    Hotel Marvelous Spa & Wellness ****
  </h1>
</minis-container>
```

### 5. Tab Navigation Band

> **Rule: Tab navigation is ALWAYS wrapped in a full-width band** with `--color-surface-primary` background and `--color-border-subtle` top+bottom borders. The `<minis-navigation variant="tabs">` sits inside a `<minis-container>` within that band. This pattern is never used without the wrapping band.

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

### 6. Content Area (Main + Sidebar)

`<minis-sidebar-layout>` inside the container: **main content** in the default slot (fluid),
**widgets** in `slot="sidebar"` (fixed 320px, right). Gap `--spacing-layout-lg` (32px from
1008px). Below a 1008px viewport it stacks: main first, sidebar under it. No grid, no media
queries of your own.

```html
<minis-container>
  <minis-sidebar-layout class="deal-content">

    <!-- Main content (left, fluid) -->
    <main class="deal-stack">
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
      <div class="deal-card deal-card--faded">
        <!-- More content sections -->
      </div>
    </main>

    <!-- Widgets (right, 320px) -->
    <aside slot="sidebar" class="deal-stack">
      <div class="deal-card">
        <!-- Pricing widget, booking CTA -->
      </div>
      <div class="deal-card deal-card--faded">
        <!-- Additional info, map, etc. -->
      </div>
    </aside>

  </minis-sidebar-layout>
</minis-container>
```

---

## CSS for the Content Area

```css
/* Page background */
body {
  background: var(--color-background);
  margin: 0;
  font-family: var(--typography-font-family-sans, Inter, sans-serif);
  color: var(--color-text-primary, black);
}

/* Vertical breathing room around the main + sidebar block */
.deal-content {
  padding-top: var(--spacing-layout-md);
  padding-bottom: var(--spacing-layout-md);
}

/* Cards stacked inside each column */
.deal-stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-layout-md);
}

/* Section cards */
.deal-card {
  background: var(--color-surface-primary, white);
  border-radius: var(--border-radius-xl, 16px);
  padding: var(--spacing-layout-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-layout-sm);
}

.deal-card--faded {
  background: var(--color-surface-faded, #f1f3f5);
}

/* No responsive rules needed: <minis-sidebar-layout> stacks below 1008px itself. */
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
  <link rel="stylesheet" href="/vendor/tokens.rgb.css" />
  <link rel="stylesheet" href="/vendor/tokens.css" />
  <script type="importmap">
    {
      "imports": {
        "lit": "https://esm.sh/lit@3",
        "lit/": "https://esm.sh/lit@3/",
        "lit-html": "https://esm.sh/lit-html@3",
        "lit-html/": "https://esm.sh/lit-html@3/",
        "lit-element": "https://esm.sh/lit-element@4",
        "lit-element/": "https://esm.sh/lit-element@4/",
        "@lit/reactive-element": "https://esm.sh/@lit/reactive-element@2",
        "@lit/reactive-element/": "https://esm.sh/@lit/reactive-element@2/"
      }
    }
  </script>
  <script type="module" src="/vendor/components/index.js"></script>
  <script type="module" src="/vendor/icons/index.js"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap">
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      background: var(--color-background);
      margin: 0;
      font-family: var(--typography-font-family-sans, Inter, sans-serif);
      color: var(--color-text-primary, black);
    }
    .deal-content {
      padding-top: var(--spacing-layout-md);
      padding-bottom: var(--spacing-layout-md);
    }
    .deal-stack {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-layout-md);
    }
    .deal-card {
      background: var(--color-surface-primary, white);
      border-radius: var(--border-radius-xl, 16px);
      padding: var(--spacing-layout-lg);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-layout-sm);
    }
    .deal-card--faded {
      background: var(--color-surface-faded, #f1f3f5);
    }
  </style>
</head>
<body>

  <!-- 1. Header band -->
  <div style="background: var(--color-surface-primary); border-bottom: 1px solid var(--color-border-subtle, #e3e4e6);">
    <minis-container>
      <minis-topbar>
        <svg slot="logo" viewBox="0 0 124 30" height="30"><!-- Slevomat logo --></svg>
        <minis-button slot="actions" variant="tertiary" size="sm">
          <minis-icon slot="icon" name="heart-fill" size="16"></minis-icon>
          Oblíbené
        </minis-button>
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

  <!-- 2. Breadcrumbs + save toggle -->
  <minis-container>
    <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--spacing-layout-sm) 0;">
      <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 8px; font-size: var(--typography-size-sm); color: var(--color-text-secondary);">
        <a href="/" style="color: var(--color-text-secondary); text-decoration: none;">Slevomat</a>
        <span>›</span>
        <a href="/cestovani" style="color: var(--color-text-secondary); text-decoration: none;">Cestování</a>
        <span>›</span>
        <span style="color: var(--color-text-primary);">Hotel Marvelous</span>
      </nav>
      <minis-tag variant="toggle">
        <minis-icon slot="icon" name="heart" size="20"></minis-icon>
        Uložit
      </minis-tag>
    </div>
  </minis-container>

  <!-- 3. Photo gallery -->
  <minis-container>
    <minis-card-grid variant="photogallery">
      <img src="photo-1.jpg" alt="Main photo" />
      <img src="photo-2.jpg" alt="Photo 2" />
      <img src="photo-3.jpg" alt="Photo 3" />
      <img src="photo-4.jpg" alt="Photo 4" />
    </minis-card-grid>
  </minis-container>

  <!-- 4. Deal title -->
  <minis-container>
    <h1 style="font-size: var(--typography-heading-xl-size); font-weight: var(--typography-weight-bold); margin: var(--spacing-layout-sm) 0 var(--spacing-layout-md);">
      Hotel Marvelous Spa & Wellness ****
    </h1>
  </minis-container>

  <!-- 5. Tab navigation band (ALWAYS wrapped in full-width surface band) -->
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

  <!-- 6. Content: main (fluid) + sidebar (320px), stacks below 1008px -->
  <minis-container>
    <minis-sidebar-layout class="deal-content">
      <main class="deal-stack">
        <div class="deal-card">
          <h2 style="font-size: var(--typography-heading-xl-size); font-weight: var(--typography-weight-bold);">
            Hotel Marvelous Spa & Wellness ****
          </h2>
          <p>3 dny (2 noci) pro 2 osoby s polopenzí a neomezeným wellness...</p>
          <minis-button variant="primary">
            <minis-icon slot="icon" name="star-fill"></minis-icon>
            Zobrazit nabídku
          </minis-button>
        </div>
        <div class="deal-card deal-card--faded">Secondary content</div>
      </main>
      <aside slot="sidebar" class="deal-stack">
        <div class="deal-card">Pricing widget</div>
        <div class="deal-card deal-card--faded">Additional info</div>
      </aside>
    </minis-sidebar-layout>
  </minis-container>

  <!-- Toggle tag: swap heart icon on press -->
  <script type="module">
    document.querySelectorAll('minis-tag[variant="toggle"]').forEach(tag => {
      tag.addEventListener('toggle', (e) => {
        const icon = tag.querySelector('minis-icon[slot="icon"]');
        if (icon) icon.setAttribute('name', e.detail.pressed ? 'heart-fill' : 'heart');
      });
    });
  </script>

</body>
</html>
```

---

## Key Layout Rules

1. **Tab navigation band** — `<minis-navigation variant="tabs">` is ALWAYS wrapped in a full-width `<div>` with `background: var(--color-surface-primary)` and `border: 1px solid var(--color-border-subtle)` on top and bottom. The `<minis-container>` goes inside that band.

2. **Main + sidebar** — `<minis-sidebar-layout>` inside the default `<minis-container>`: main left (fluid), sidebar right (320px), gap `--spacing-layout-lg`. Below 1008px it stacks, main first. Don't build a 12-column grid for it.

3. **Breadcrumbs row** — Always between header band and photo gallery. Flexbox row with `justify-content: space-between`. Breadcrumbs left, save toggle right.

4. **Section order** — Header → Breadcrumbs → Photo Gallery → Title → Tab Band → Main + sidebar.

5. **Navigation items** — In prototypes, omit `href` on `<minis-navigation-item>` so they render as `<button>` elements (no page refresh on click). Only add `href` when linking to real pages.

6. **Photogallery = exactly 4 items** — The `variant="photogallery"` CSS grid positions exactly 4 children. Extra items overflow and break the layout.

7. **Toggle tag icon swap** — `<minis-tag variant="toggle">` toggles `pressed` internally, but icon swap (e.g. `heart` ↔ `heart-fill`) requires consumer JavaScript listening to the `toggle` event.

---

## AI Copy-Paste Prompt

> Create a deal detail page for **[Hotel Name]** using the Mini*S design system.
> Use the deal-detail layout:
> 1. Header band with `<minis-topbar>` + `<minis-navigation variant="main-nav">` (full 11 Slevomat categories)
> 2. Breadcrumbs row with `<minis-tag variant="toggle">` save button (heart icon) on the right
> 3. Photo gallery with `<minis-card-grid variant="photogallery">` (exactly 4 photos)
> 4. Deal title as `<h1>` using `--typography-heading-xl-size`
> 5. Tab navigation in a full-width surface-primary band with border-subtle borders: `<minis-navigation variant="tabs">` (Nabídka, Hodnocení, O hotelu, Tipy na výlet, Dotazy)
> 6. `<minis-sidebar-layout>`: main content in the default slot, price box and widgets in `slot="sidebar"` (320px, right). It stacks below 1008px by itself.
> Wrap every band in the default `<minis-container>` (wide, 1240px — a browsing page). Use `--spacing-layout-*` tokens for spacing.
> Background: `var(--color-background)`. Cards: `var(--color-surface-primary)` with `var(--border-radius-xl)`.

---

**Last updated:** 2026-11-26
