# Tile — AI Prompt Reference

> Last updated: 2026-05-15

---

## Overview

`<minis-tile>` is a vertical, icon-based navigation tile for primary navigation shortcuts. It renders as a **button** by default or as an **anchor** when `href` is provided. Tiles are typically arranged in a grid layout (e.g. a 4-column shortcut row on a homepage).

Every tile **must** have an icon (24×24 px) and a label. An optional inline counter pill can appear right of the label.

---

## API

| Property   | Type      | Default | Description |
|------------|-----------|---------|-------------|
| `href`     | `string`  | `''`    | Destination URL. When set, renders `<a>`. Omit for `<button>`. |
| `counter`  | `string`  | —       | Counter value shown inline after the label. Empty/omitted = hidden. |
| `disabled` | `boolean` | `false` | Prevents interaction; reduces opacity to 0.6. |

### Slots

| Slot     | Required | Description |
|----------|----------|-------------|
| `icon`   | **Yes**  | Navigation icon (24×24 px). Use `<minis-icon slot="icon" name="…">` or an inline `<svg slot="icon">`. |
| _(default)_ | **Yes** | Label text. Short, ideally one word. |

### States

| State      | Trigger |
|------------|---------|
| `default`  | No interaction |
| `hover`    | `:hover` (CSS, automatic) |
| `disabled` | `disabled` attribute on the element |

---

## Design Tokens

| Token | Value | Purpose |
|-------|-------|---------|
| `--tile-surface` | `var(--button-secondary-surface)` | Default background |
| `--tile-border` | `var(--button-secondary-border)` | Border colour |
| `--tile-text` | `var(--button-secondary-text)` | Label text colour (black) |
| `--tile-icon-color` | `var(--button-tertiary-text)` | Icon colour (blue `#006eb9`) |
| `--tile-hover-surface` | `var(--button-secondary-hover-surface)` | Background on hover |
| `--tile-counter-surface` | `var(--button-secondary-text)` | Counter pill background (inverted) |
| `--tile-counter-text` | `var(--button-secondary-surface)` | Counter pill text (inverted) |
| `--tile-padding-top` | `var(--linear-sp-linear-3)` = 12 px | Top padding |
| `--tile-padding-bottom` | `var(--linear-sp-linear-3)` = 12 px | Bottom padding |
| `--tile-padding-x` | `var(--linear-sp-linear-8)` = 32 px | Horizontal padding (left + right, each side) |
| `--tile-gap-elements-y` | `var(--linear-sp-linear-1)` = 4 px | Gap: icon → label row |
| `--tile-gap-elements-x` | `var(--linear-sp-linear-2)` = 8 px | Gap: label text → counter |

---

## Usage Examples

### Button tile (no href)

```html
<minis-tile>
  <minis-icon slot="icon" name="voucher-outline"></minis-icon>
  Moje nákupy
</minis-tile>
```

### Link tile

```html
<minis-tile href="/moje-nakupy">
  <minis-icon slot="icon" name="voucher-outline"></minis-icon>
  Moje nákupy
</minis-tile>
```

### Tile with counter pill

```html
<minis-tile counter="3">
  <minis-icon slot="icon" name="voucher-outline"></minis-icon>
  Moje nákupy
</minis-tile>
```

### Disabled tile

```html
<minis-tile disabled>
  <minis-icon slot="icon" name="voucher-outline"></minis-icon>
  Moje nákupy
</minis-tile>
```

### 4-column grid layout

```html
<div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px;">
  <minis-tile counter="3">
    <minis-icon slot="icon" name="voucher-outline"></minis-icon>
    Moje nákupy
  </minis-tile>
  <minis-tile href="/kosik">
    <minis-icon slot="icon" name="cart-outline"></minis-icon>
    Košík
  </minis-tile>
  <minis-tile href="/oblibene">
    <minis-icon slot="icon" name="heart"></minis-icon>
    Oblíbené
  </minis-tile>
  <minis-tile href="/profil">
    <minis-icon slot="icon" name="user"></minis-icon>
    Profil
  </minis-tile>
</div>
```

#### Grid layout rules

- Use **`repeat(N, 1fr)`** — equal columns, each tile gets the same share of the container width.
- **Do not use `repeat(N, auto)` or `repeat(N, minmax(0, 1fr))`**:
  - `auto` gives each column its own min-content width → unequal columns.
  - `minmax(0, 1fr)` can shrink columns to 0, collapsing the tile's horizontal padding.
- The tile enforces `min-width: calc(2 × --tile-padding-x)` (64 px) so the 32 px left/right padding is **always visible**; labels truncate with `…` rather than the padding being sacrificed.
- Size the grid container so the widest expected label fits. A reference value: a tile showing "Moje nákupy" (no counter) needs roughly **155 px** of tile width (32 px pad + ~90 px text + 32 px pad + 1 px borders). For a 4-column grid with 8 px gaps that is a container of **~644 px**. Labels that do not fit truncate — this is intentional.
- **In tighter spaces, reduce the number of columns** rather than shrinking the container. Cramming more tiles into a narrow container leaves too little room for label text. Use `repeat(3, 1fr)` or `repeat(2, 1fr)` so each tile retains enough horizontal space for its label to read clearly.

---

## Accessibility

- Renders a native `<button type="button">` (keyboard focusable, activatable with Enter/Space) unless `href` is set.
- When `href` is set, renders as `<a>` — standard anchor keyboard behaviour applies.
- Counter pill has an `aria-label="(N)"` so screen readers announce the count inline with the label.
- `disabled` button is rendered with `disabled` attribute and `aria-disabled="true"`.
- Focusable via Tab; `:focus-visible` shows a `2px` outline (`--color-border-focus`).

---

## Copy-Paste Prompt

> Create a `<minis-tile>` navigation tile with an icon, a label, and a counter pill. Use a 4-column grid wrapper. The tile renders as a link when `href` is provided. Match the Mini\*S DS visual style: white background, 1 px border, 8 px border-radius, blue hover surface, inline inverted-colour counter pill.
