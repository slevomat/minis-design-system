# `<minis-card-grid>` — AI Agent Reference

**Custom element**: `minis-card-grid`
**Package**: `@minis/components`
**Figma**: [Card grid component](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=3583-12247)

---

## Purpose

A responsive CSS-grid wrapper for holding cards or images. It is a **pure layout component** — it does not render any cards itself, it only provides the grid structure. Slot any content (card components, `<img>`, `<a>`, `<div>`) as children.

Three variants cover the main Slevomat page patterns:

| Variant | Use case |
|---|---|
| `navigation` | Homepage category navigation — featured card top-left (2 cols wide), wide card bottom-right. **6 slots.** |
| `navigation-small` | Compact category navigation — uniform 4×2 grid, all cells equal. **8 slots.** |
| `navigation-small-3` | Same as `navigation-small` but 3 rows. **12 slots.** Mobile collapses to 4×2 scroll strip. |
| `photogallery` | Hotel/venue detail page photo preview — large main photo left, wide image top-right, two small thumbnails bottom-right. **4 slots.** |

---

## API

### Properties / Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `variant` | `"navigation" \| "navigation-small" \| "navigation-small-3" \| "photogallery"` | `"navigation"` | Grid layout variant |

### Slots

| Slot | Description |
|---|---|
| *(default)* | Card or image elements. Grid placement is automatic — order matters. |

### Events

None.

---

## Variant details

### `navigation`

- Desktop: 4-column grid, 2 rows
  - Item 1: `grid-column: span 2` (featured, top-left)
  - Items 2–5: single columns
  - Item 6: `grid-column: span 2` (wide, bottom-right)
- Mobile (`<768px`): horizontal scroll strip, 4 × 2 equal cells (`--card-grid-xs-item-size`, default 172px)
- **Slot exactly 6 items**

### `navigation-small`

- Desktop: 4-column × 2-row uniform grid, all 8 cells equal
- Mobile: same horizontal scroll strip as `navigation`

### `navigation-small-3`

- Desktop: 4-column × 3-row uniform grid, all 12 cells equal
- Mobile: collapses to 4×2 scroll strip (same as `navigation-small` mobile)

### `photogallery`

- Desktop: 5-column × 3-row grid
  - Item 1: `col 1–3 / row 1–3` (large main image)
  - Item 2: `col 4–5 / row 1–2` (wide top-right)
  - Item 3: `col 4 / row 3` (small thumbnail)
  - Item 4: `col 5 / row 3` (small thumbnail)
- Mobile: only item 1 shown, full width. Items 2–4 are hidden (`display: none`)
- **Slot exactly 4 items**

---

## Sizing

Each variant has a built-in default height matching the Figma spec:

| Variant | Desktop height | Mobile height |
|---|---|---|
| `navigation` | 584px | 172px (scroll strip) |
| `navigation-small` | 296px | 172px (scroll strip) |
| `navigation-small-3` | 448px | 172px (4×2 scroll strip) |
| `photogallery` | 352px | 210px |

Override the height with the `--card-grid-height` CSS custom property:

```html
<!-- 3-row navigation-small needs a taller height -->
<minis-card-grid variant="navigation-small" style="--card-grid-height:448px">…</minis-card-grid>
```

---

## CSS Custom Properties

| Token | Default | Description |
|---|---|---|
| `--card-grid-gap` | `8px` | Gap between grid cells |
| `--card-grid-border-radius` | `var(--border-radius-xl, 16px)` | Outer corner radius |
| `--card-grid-height` | variant-specific (see Sizing table) | Override the component height |
| `--card-grid-slot-bg` | `var(--color-surface-faded)` | Background of each slotted item |
| `--card-grid-xs-item-size` | `172px` | Fixed cell size on mobile scroll (navigation variants) |

---

## Usage examples

### Navigation grid

```html
<minis-card-grid variant="navigation" style="height:420px">
  <!-- Item 1: featured (2-col wide on desktop) -->
  <a href="/wellness">
    <img src="wellness.jpg" alt="Wellness" style="width:100%;height:100%;object-fit:cover" />
  </a>
  <a href="/sport"><img src="sport.jpg" alt="Sport" /></a>
  <a href="/travel"><img src="travel.jpg" alt="Travel" /></a>
  <a href="/food"><img src="food.jpg" alt="Food" /></a>
  <a href="/beauty"><img src="beauty.jpg" alt="Beauty" /></a>
  <!-- Item 6: wide (2-col wide on desktop) -->
  <a href="/gifts"><img src="gifts.jpg" alt="Gifts" /></a>
</minis-card-grid>
```

### Navigation-small (2 rows)

```html
<minis-card-grid variant="navigation-small" style="height:296px">
  <a href="/wellness"><img src="wellness.jpg" /></a>
  <a href="/sport"><img src="sport.jpg" /></a>
  <a href="/travel"><img src="travel.jpg" /></a>
  <a href="/food"><img src="food.jpg" /></a>
  <a href="/beauty"><img src="beauty.jpg" /></a>
  <a href="/fitness"><img src="fitness.jpg" /></a>
  <a href="/city"><img src="city.jpg" /></a>
  <a href="/gifts"><img src="gifts.jpg" /></a>
</minis-card-grid>
```

### Photogallery

```html
<minis-card-grid variant="photogallery" style="height:352px">
  <img src="main.jpg" alt="Main photo" style="width:100%;height:100%;object-fit:cover" />
  <img src="wide.jpg" alt="View" style="width:100%;height:100%;object-fit:cover" />
  <img src="thumb1.jpg" alt="Detail 1" style="width:100%;height:100%;object-fit:cover" />
  <img src="thumb2.jpg" alt="Detail 2" style="width:100%;height:100%;object-fit:cover" />
</minis-card-grid>
```

---

## Accessibility notes

- The component is a layout wrapper with no ARIA role of its own.
- Slotted `<a>` or `<button>` elements provide their own semantics.
- Ensure each slotted image has a meaningful `alt` attribute.
- On mobile, `photogallery` hides items 2–4 via `display: none` — they are removed from the accessibility tree. If this is not desired, use `visibility: hidden` on slotted items manually.

---

## Copy-paste prompt for AI agents

> Create a homepage category navigation grid using `<minis-card-grid variant="navigation">` from `@minis/components`. Slot 6 `<a>` elements, each containing an `<img>` with `width:100%;height:100%;object-fit:cover`. The first and last items are visually wider on desktop (the component handles this automatically). Set `style="height:420px"` on the grid. Import the component as a side-effect: `import '@minis/components'`. Load tokens from `@minis/tokens/dist/index.css`.
