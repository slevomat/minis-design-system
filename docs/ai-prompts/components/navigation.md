# Navigation & Navigation Item

Two components for horizontal navigational UI patterns, based on slevomat.cz production usage.

- `<minis-navigation>` — the scrollable nav bar wrapper
- `<minis-navigation-item>` — an individual link or tab item

---

## `<minis-navigation>`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'horizontal' \| 'tabs'` | `'horizontal'` | Visual pattern |
| `aria-label` | `string` | `'Navigation'` | Accessible label for the inner `<nav>` element — always provide a meaningful value |

### Slots

| Slot | Description |
|---|---|
| _(default)_ | `<minis-navigation-item>` elements |
| `actions` | Right-aligned content (e.g. a `<minis-tag variant="toggle">` favourite button) |

### Variants

- **`horizontal`** — top-level category navigation bar (homepage). Bottom border under the whole bar; active item gets a blue underline + bold text.
- **`tabs`** — product detail tab switcher (e.g. Nabídka / Hodnocení / O hotelu). Same border and active indicator.

---

## `<minis-navigation-item>`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `href` | `string` | `''` | Destination URL. Renders `<a href>` when set, `<button>` otherwise |
| `active` | `boolean` | `false` | Marks the current/active item — blue underline (2px) + bold text |
| `color` | `'default' \| 'positive'` | `'default'` | Colour accent. See details below |

### `color` prop

| Value | Default state | Hover | Active |
|---|---|---|---|
| `default` | Normal text colour | Blue underline appears | Blue text + blue underline + bold |
| `positive` | Normal text colour, **icon is green** | Green text + green underline | Green text + green underline + bold |

The `positive` value is for special tabs like "Pro přírodu" (eco/sustainability): the icon is green at rest, but the text only turns green on hover or when active.

### Slots

| Slot | Description |
|---|---|
| _(default)_ | Label text |
| `icon` | Leading icon (20×20px). Use `<minis-icon slot="icon" size="20">` or `<svg slot="icon">` |

### Render element

| Condition | Renders as |
|---|---|
| `href` is set | `<a href="...">` |
| no `href` | `<button type="button">` |

### Bold-width reservation

Active items are bold (`font-weight: 700`). To prevent sibling items from shifting position when the active item widens, the component automatically measures the label text and reserves bold-width space via a CSS `::after` ghost (invisible, zero-height, bold copy of the text set via `data-label` on the label element). No layout shift occurs.

---

## Tokens

| Token | Default | Description |
|---|---|---|
| `--navigation-gap` | `24px` | Gap between items in the nav bar |
| `--navigation-border-color` | `--color-border` | Bottom border of the nav bar |
| `--navigation-item-padding-y` | `8px` | Vertical padding inside each item (no horizontal padding) |
| `--navigation-item-gap` | `8px` | Gap between icon and label within an item |
| `--navigation-item-icon-size` | `20px` | Icon width/height |
| `--navigation-item-accent` | `--color-text-primary` | Default item text colour |
| `--navigation-item-active-accent` | `--color-text-accent-link` | Active item text colour (blue) |
| `--navigation-item-active-border-color` | `--color-text-accent-link` | Active underline colour |
| `--navigation-item-active-border-width` | `2px` | Active underline thickness |
| `--navigation-item-hover-border-color` | `--color-text-accent-link` | Hover underline colour |

Positive (green) states use `--color-text-accent-positive` directly (no override token needed).

---

## Usage examples

### Horizontal category nav

```html
<minis-navigation variant="horizontal" aria-label="Hlavní menu">
  <minis-navigation-item href="/kampan">
    <minis-icon slot="icon" name="star" size="20"></minis-icon>
    Extra slevy
  </minis-navigation-item>
  <minis-navigation-item href="/cestovani" active>Cestování</minis-navigation-item>
  <minis-navigation-item href="/zbozi">Zboží</minis-navigation-item>
  <minis-navigation-item href="/potraviny">Potraviny</minis-navigation-item>
  <minis-navigation-item href="/darky">Dárky</minis-navigation-item>
</minis-navigation>
```

### Product detail tabs

```html
<minis-navigation variant="tabs" aria-label="Záložky produktu">
  <minis-navigation-item href="?#nabidka" active>Nabídka</minis-navigation-item>
  <minis-navigation-item href="?tab=hodnoceni">Hodnocení</minis-navigation-item>
  <minis-navigation-item href="?tab=o-podniku">O hotelu</minis-navigation-item>
  <minis-navigation-item href="?tab=dotazy">Dotazy</minis-navigation-item>
  <minis-navigation-item href="?tab=pro-prirodu" color="positive">
    <minis-icon slot="icon" name="leaf" size="20"></minis-icon>
    Pro přírodu
  </minis-navigation-item>
</minis-navigation>
```

### Tabs with right-aligned toggle tag (favourite)

```html
<minis-navigation variant="tabs" aria-label="Záložky produktu">
  <minis-navigation-item active>Nabídka</minis-navigation-item>
  <minis-navigation-item>Hodnocení</minis-navigation-item>
  <minis-navigation-item>O hotelu</minis-navigation-item>

  <minis-tag slot="actions" variant="toggle" id="fav-tag">
    <minis-icon slot="icon" name="heart" id="fav-icon"></minis-icon>
    Uložit
  </minis-tag>
</minis-navigation>
<script>
  document.querySelector('#fav-tag').addEventListener('toggle', (e) => {
    document.querySelector('#fav-icon').name = e.detail.pressed ? 'heart-fill' : 'heart';
  });
</script>
```

### SPA / JS-driven navigation (no href, click activates)

```html
<minis-navigation variant="tabs" aria-label="Záložky" id="tabs">
  <minis-navigation-item active>Nabídka</minis-navigation-item>
  <minis-navigation-item>Hodnocení</minis-navigation-item>
  <minis-navigation-item>O hotelu</minis-navigation-item>
</minis-navigation>
<script>
  const nav = document.querySelector('#tabs');
  nav.addEventListener('click', (e) => {
    const item = e.target.closest('minis-navigation-item');
    if (!item) return;
    nav.querySelectorAll('minis-navigation-item').forEach(el => el.removeAttribute('active'));
    item.setAttribute('active', '');
  });
</script>
```

---

## Accessibility notes

- Always provide a meaningful `aria-label` on `<minis-navigation>` — it becomes the `<nav aria-label>`.
- Items with `href` render as `<a>` — announced as links by screen readers.
- Items without `href` render as `<button>` — appropriate for SPA/JS-driven navigation.
- Active state is visual only. For full ARIA tab widget semantics in complex SPAs, consider wrapping in `role="tablist"` / `role="tab"` / `role="tabpanel"`.
- Focus ring: `outline: 2px solid --color-border-focus`, `outline-offset: 2px`.

---

## AI copy-paste prompt

```
Using Mini*S Lit Web Components, build a [horizontal category nav / product detail tab bar].
Container: <minis-navigation variant="[horizontal|tabs]" aria-label="...">
Items: <minis-navigation-item [href="..."] [active] [color="positive"]>Label</minis-navigation-item>
For eco/sustainability items use color="positive" with an icon in the icon slot.
For a right-aligned favourite button use: <minis-tag slot="actions" variant="toggle">...</minis-tag>
Mark the current page/tab with the active attribute.
```
