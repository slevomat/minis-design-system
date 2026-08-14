# Navigation & Navigation Item

[Open in Figma ↗](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=5226-5557&t=pHPts4rDDA6R6smX-11)

The Navigation component consists of a set of elements used to build the main Slevomat menu, as well as contextual tab navigation on product detail pages.

- `<minis-navigation>` — the scrollable nav bar wrapper
- `<minis-navigation-item>` — an individual link or tab item

---

## `<minis-navigation>`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'main-nav' \| 'tabs'` | `'main-nav'` | Visual pattern. The legacy value `horizontal` is accepted and normalised to `main-nav` |
| `breakpoint` | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` | `'md'` | **`main-nav` only.** Width at which the bar stops scrolling and starts collapsing overflow into the menu. Measured against the component's **own width**. Ignored by `tabs` |
| `overflow-label` | `string` | `'Další'` | **`main-nav` only.** Label of the menu holding the items that did not fit |
| `aria-label` | `string` | `'Navigation'` | Accessible label for the inner `<nav>` element — always provide a meaningful value |

### Slots

| Slot | Description |
|---|---|
| _(default)_ | `<minis-navigation-item>` elements |
| `actions` | Right-aligned content (e.g. a `<minis-tag variant="toggle">` favourite button) |

### Variants

- **`main-nav`** — the site's main category navigation. Items are **distributed across the full container width** (`justify-content: space-between`). Bottom border under the whole bar; active item gets a blue underline + bold text.
- **`tabs`** — in-page contextual tab switcher (e.g. Nabídka / Hodnocení / O hotelu). Items are **left-aligned with a 24px gap**. Same border and active indicator.

### Too many items to fit — `main-nav` only

A nav bar with eleven categories will not fit every screen. `main-nav` has two behaviours, split by
`breakpoint`:

| Component width | Behaviour |
|---|---|
| **at or below** the breakpoint | The bar **scrolls horizontally** — swipe or drag sideways. No menu, every item stays in the row. |
| **above** the breakpoint | Items that do not fit **collapse into a `<minis-menu>`** at the trailing end, labelled by `overflow-label` ("Další"). |

Three things worth knowing:

- **The breakpoint is measured on the component's own width, not the viewport**, so a nav placed in
  a narrow column behaves like a nav on a narrow screen. The comparison happens in JS (a
  `ResizeObserver`), because deciding how many items fit needs measurement that CSS cannot do.
- **The active item is never hidden in the menu.** If it would overflow, it stays in the row and the
  last item that fits is pushed into the menu instead — so the current page is always visible. That
  is why the row can read `Extra slevy · Cestování · Zážitky · Krása · Benefity · Další` with the
  middle categories in the menu.
- **Above the breakpoint the bar is no longer a scroll container.** It has to be: `overflow-x: auto`
  makes the vertical axis a scrollport too, which would clip the open panel.

**`tabs` never collapses.** A tab bar scrolls at every width, so no tab is ever hidden behind a
menu — tabs are in-page content and burying one is more surprising than a bar that scrolls. This
also matches Figma, where the `Tabs` variant has no "Další" item. `breakpoint` and `overflow-label`
have no effect on `tabs`.

```html
<!-- Collapse from lg (1008px) up; scroll below it -->
<minis-navigation variant="main-nav" breakpoint="lg" aria-label="Hlavní menu">…</minis-navigation>

<!-- Rename the overflow trigger -->
<minis-navigation variant="main-nav" overflow-label="More" aria-label="Main menu">…</minis-navigation>
```

The menu itself is [`<minis-menu>`](./menu.md) — the same public component you can use on its own.
Items it holds get `role="menuitem"`, `tabindex="-1"` and an `in-menu` attribute;
`<minis-navigation-item>` reads `in-menu` to render as a full-width panel row instead of an
underlined tab.

### Where each variant may appear

**`main-nav` appears exactly once per page, at the very top, directly under `<minis-topbar>`.**
Together they are the mandatory opening of every Slevomat web page:

```
<minis-topbar variant="web">   ← always first
<minis-navigation variant="main-nav">  ← always second, only once
<minis-page-header>            ← hero, first content element
… rest of the page …
```

Never place a second `main-nav` further down the page, never use it for in-page section
switching, and never open a Slevomat web page without it. For anything contextual inside the
page — product detail tabs, filter switchers — use `variant="tabs"`, which may appear more than
once and never sits at the top of the page.

Vibe-coded apps (`<minis-topbar variant="vibe-apps">`) are the exception: they are not Slevomat
web pages, so a main nav is optional there.

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
| `icon` | Leading icon (24×24px). Use `<minis-icon slot="icon" size="24">` or `<svg slot="icon">` |

### `in-menu` attribute

Set by `<minis-menu>` on every item it holds — you never write it yourself. It switches the item
from a nav-row tab (fixed 38px box, underline) to a panel row (full width, left-aligned, hover
surface, no underline).

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
| `--navigation-gap` | `--linear-sp-linear-6` (24px) | Gap between items (`tabs`); minimum gap before scrolling for `main-nav` |
| `--menu-*` | see [`menu.md`](./menu.md) | The overflow menu's panel, trigger and row tokens |
| `--navigation-border-color` | `--color-border` | Bottom border of the nav bar |
| `--navigation-item-height` | `38px` | Item box height (off the pixel scale — Figma value) |
| `--navigation-item-padding-bottom` | `--fibonachi-sp-fib-2` (2px) | Gap between label and underline (no horizontal padding) |
| `--navigation-item-gap` | `--menu-item-gap` (4px) | Gap between icon and label within an item |
| `--navigation-item-icon-size` | `--pixel-px-24` (24px) | Icon width/height |
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
<minis-navigation variant="main-nav" aria-label="Hlavní menu">
  <minis-navigation-item href="/extra-slevy">
    <minis-icon slot="icon" name="star" size="24"></minis-icon>
    Extra slevy
  </minis-navigation-item>
  <minis-navigation-item href="/cestovani" active>Cestování</minis-navigation-item>
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
```

### Product detail tabs

```html
<minis-navigation variant="tabs" aria-label="Záložky produktu">
  <minis-navigation-item href="?#nabidka" active>Nabídka</minis-navigation-item>
  <minis-navigation-item href="?tab=hodnoceni">Hodnocení</minis-navigation-item>
  <minis-navigation-item href="?tab=o-podniku">O hotelu</minis-navigation-item>
  <minis-navigation-item href="?tab=dotazy">Dotazy</minis-navigation-item>
  <minis-navigation-item href="?tab=pro-prirodu" color="positive">
    <minis-icon slot="icon" name="leaf" size="24"></minis-icon>
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
Using Mini*S Lit Web Components, build a [main site navigation / in-page tab bar].
Container: <minis-navigation variant="[main-nav|tabs]" aria-label="...">
main-nav goes once per page directly under <minis-topbar>; tabs are for in-page switching.
Items: <minis-navigation-item [href="..."] [active] [color="positive"]>Label</minis-navigation-item>
For eco/sustainability items use color="positive" with an icon in the icon slot.
For a right-aligned favourite button use: <minis-tag slot="actions" variant="toggle">...</minis-tag>
Mark the current page/tab with the active attribute.
Overflow: set breakpoint="md" (default) to scroll below that width and collapse into the
"Další" menu above it; overflow-label renames that trigger.
```
