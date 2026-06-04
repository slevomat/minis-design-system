# `<minis-card-grid>` — AI Agent Reference

**Custom element**: `minis-card-grid`
**Package**: `@minis/components`
**Figma**: [Card grid component](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=3583-12247)

---

## Purpose

A pure **layout component** for arranging cards or photos into responsive grids. It provides the grid structure only — it does not render any cards itself. Slot any content (card components, `<img>`, `<a>`, `<div>`) as direct children.

Typical use cases:

- **Photo galleries** — hotel or venue detail pages where one large hero image is accompanied by smaller thumbnails.
- **Category navigation** — homepage grids of clickable category cards (with or without a featured tile).

Three variants cover these patterns:

| Variant | Use case |
|---|---|
| `navigation` | Homepage category navigation — featured card top-left (2 cols wide), wide card bottom-right. **6 slots.** |
| `navigation-small` | Compact category navigation — uniform 4-column grid. Use `rows` attribute to control row count: `rows="2"` (default, **8 slots**) or `rows="3"` (**12 slots**, mobile collapses to 4×2 scroll strip). |
| `photogallery` | Hotel/venue detail page photo preview — large main photo left, wide image top-right, two small thumbnails bottom-right. **4 slots.** |

---

## API

### Properties / Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `variant` | `"navigation" \| "navigation-small" \| "photogallery"` | `"navigation"` | Grid layout variant |
| `rows` | `number` | `2` | Number of rows for `navigation-small` variant (2 or 3). Ignored for other variants. |
| `vertical-slots` | `"0" \| "1" \| "2"` | `"0"` | Number of tall vertical photo slots in the `navigation` variant (desktop only). See subvariant details below. Ignored for other variants. |

### Slots

| Slot | Description |
|---|---|
| *(default)* | Card or image elements. Grid placement is automatic — order matters. |

### Events

None.

---

## Variant details

### `navigation`

4-column, 2-row grid with 6 slots. Desktop only. Mobile collapses to a 4×2 horizontal scroll strip.

Three subvariants controlled by `vertical-slots`:

#### `vertical-slots="0"` (default)

Standard layout — featured wide card top-left, wide card bottom-right.

```
col1  col2  col3  col4
[ 1 ——— 1 ] [ 2 ] [ 3 ]
[ 4 ] [ 5 ] [——6——————]
```

- Item 1: `grid-column: span 2` (featured, top-left)
- Items 2–5: single columns
- Item 6: `grid-column: span 2` (wide, bottom-right)

#### `vertical-slots="1"`

One tall vertical photo — item 2 spans both rows in column 3.

```
col1  col2  col3  col4
[ 1 ——— 1 ] [ 2 ] [ 3 ]
[ 4 ] [ 5 ] [ 2 ] [ 6 ]
```

- Item 1: col 1–2, row 1 (featured)
- Item 2: col 3, rows 1–2 (tall vertical photo)
- Item 3: col 4, row 1
- Item 4: col 1, row 2
- Item 5: col 2, row 2
- Item 6: col 4, row 2

#### `vertical-slots="2"`

Two tall vertical photos — items 1 and 2 span both rows. Items 3–6 fill the right two columns as a 2×2 grid.

```
col1  col2  col3  col4
[ 1 ] [ 2 ] [ 3 ] [ 5 ]
[ 1 ] [ 2 ] [ 4 ] [ 6 ]
```

- Item 1: col 1, rows 1–2 (tall vertical photo)
- Item 2: col 2, rows 1–2 (tall vertical photo)
- Item 3: col 3, row 1
- Item 4: col 3, row 2
- Item 5: col 4, row 1
- Item 6: col 4, row 2

**Mobile (all subvariants):** 3-column × 2-row horizontal scroll strip — 3 items per row, 6 items total. Each cell is `--card-grid-xs-item-size` (default 172px) square. Total height = `calc(2 × 172px + 8px gap) = 352px`. The grid is 3 × 172px = 516px wide, extending beyond a 390px viewport so the third column peeks and invites scrolling. All special placements (featured, wide, vertical) are reset — every item becomes a uniform square.

### `navigation-small`

- Desktop (default, `rows="2"`): 4-column × 2-row uniform grid, all 8 cells equal
- Desktop (`rows="3"`): 4-column × 3-row uniform grid, all 12 cells equal
- Mobile: same horizontal scroll strip as `navigation` (always 2 rows)

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
| `navigation` | 584px | 352px (2-row × 3-col horizontal scroll strip — 3 items per row) |
| `navigation-small` (rows=2) | 296px | 352px (2-row × 4-col horizontal scroll strip) |
| `navigation-small` (rows=3) | 448px | 352px (2-row × 4-col horizontal scroll strip) |
| `photogallery` | 352px | 210px |

Override the height with the `--card-grid-height` CSS custom property:

```html
<minis-card-grid variant="navigation-small" rows="3" style="--card-grid-height:500px">…</minis-card-grid>
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

Use travel-themed placeholder images from Unsplash (`https://images.unsplash.com/photo-{id}?w={width}&h={height}&fit=crop`). Every `<img>` inside the grid should have `style="width:100%;height:100%;object-fit:cover"`.

```html
<minis-card-grid variant="navigation" style="height:420px">
  <!-- Item 1: featured (2-col wide on desktop) -->
  <a href="/wellness">
    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop" alt="Beach resort" style="width:100%;height:100%;object-fit:cover" />
  </a>
  <a href="/mountains">
    <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=400&fit=crop" alt="Mountains" style="width:100%;height:100%;object-fit:cover" />
  </a>
  <a href="/city">
    <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=300&h=400&fit=crop" alt="Paris" style="width:100%;height:100%;object-fit:cover" />
  </a>
  <a href="/lakes">
    <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=400&fit=crop" alt="Lake" style="width:100%;height:100%;object-fit:cover" />
  </a>
  <a href="/safari">
    <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=300&h=400&fit=crop" alt="Safari" style="width:100%;height:100%;object-fit:cover" />
  </a>
  <!-- Item 6: wide (2-col wide on desktop) -->
  <a href="/islands">
    <img src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&h=400&fit=crop" alt="Tropical island" style="width:100%;height:100%;object-fit:cover" />
  </a>
</minis-card-grid>
```

### Navigation-small (2 rows, default)

```html
<minis-card-grid variant="navigation-small">
  <a href="/beach"><img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop" alt="Beach" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/mountains"><img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=300&fit=crop" alt="Mountains" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/city"><img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=300&h=300&fit=crop" alt="Paris" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/lake"><img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=300&fit=crop" alt="Lake" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/safari"><img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=300&h=300&fit=crop" alt="Safari" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/desert"><img src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&h=300&fit=crop" alt="Desert" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/forest"><img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&h=300&fit=crop" alt="Forest" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/island"><img src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=300&h=300&fit=crop" alt="Island" style="width:100%;height:100%;object-fit:cover" /></a>
</minis-card-grid>
```

### Navigation-small (3 rows)

```html
<minis-card-grid variant="navigation-small" rows="3">
  <a href="/beach"><img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop" alt="Beach" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/mountains"><img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=300&fit=crop" alt="Mountains" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/city"><img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=300&h=300&fit=crop" alt="Paris" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/lake"><img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=300&fit=crop" alt="Lake" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/safari"><img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=300&h=300&fit=crop" alt="Safari" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/desert"><img src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&h=300&fit=crop" alt="Desert" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/forest"><img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&h=300&fit=crop" alt="Forest" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/island"><img src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=300&h=300&fit=crop" alt="Island" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/canyon"><img src="https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=300&h=300&fit=crop" alt="Canyon" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/waterfall"><img src="https://images.unsplash.com/photo-1432405972618-c6b0cfba8672?w=300&h=300&fit=crop" alt="Waterfall" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/camping"><img src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&h=300&fit=crop" alt="Camping" style="width:100%;height:100%;object-fit:cover" /></a>
  <a href="/cruise"><img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=300&h=300&fit=crop" alt="Cruise" style="width:100%;height:100%;object-fit:cover" /></a>
</minis-card-grid>
```

### Photogallery

```html
<minis-card-grid variant="photogallery" style="height:352px">
  <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop" alt="Hotel pool" style="width:100%;height:100%;object-fit:cover" />
  <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop" alt="Hotel exterior" style="width:100%;height:100%;object-fit:cover" />
  <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&h=200&fit=crop" alt="Hotel room" style="width:100%;height:100%;object-fit:cover" />
  <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&h=200&fit=crop" alt="Hotel lobby" style="width:100%;height:100%;object-fit:cover" />
</minis-card-grid>
```

---

## Placeholder images

When prototyping with `<minis-card-grid>`, always use real travel-themed photos from Unsplash. Use the URL pattern:

```
https://images.unsplash.com/photo-{id}?w={width}&h={height}&fit=crop
```

This ensures the grid looks realistic in previews. All images above are freely licensed via Unsplash.

---

## Accessibility notes

- The component is a layout wrapper with no ARIA role of its own.
- Slotted `<a>` or `<button>` elements provide their own semantics.
- Ensure each slotted image has a meaningful `alt` attribute.
- On mobile, `photogallery` hides items 2–4 via `display: none` — they are removed from the accessibility tree. If this is not desired, use `visibility: hidden` on slotted items manually.

---

## Copy-paste prompt for AI agents

> Create a homepage category navigation grid using `<minis-card-grid variant="navigation">` from `@minis/components`. Slot 6 `<a>` elements, each containing an `<img>` with `width:100%;height:100%;object-fit:cover`. Use travel-themed placeholder photos from Unsplash (`https://images.unsplash.com/photo-{id}?w=300&h=400&fit=crop`). The first and last items are visually wider on desktop (the component handles this automatically). Set `style="height:420px"` on the grid. Import the component as a side-effect: `import '@minis/components'`. Load tokens from `@minis/tokens/dist/index.css`.
