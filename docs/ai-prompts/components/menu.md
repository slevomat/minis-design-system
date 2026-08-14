# Menu

A labelled trigger that opens a panel of items below it.

It was built for the navigation overflow — `<minis-navigation>` collapses the items that do not fit
into a menu labelled "Další" — and is usable anywhere a small dropdown of links or buttons is
needed.

> **No Figma component yet.** This is the one Mini*S component whose design does not exist in the
> Figma file, so it has no `.figma.ts` mapping. It was built from the navigation overflow
> requirement. Design it in Figma before treating its visual details as settled.

---

## `<minis-menu>`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `''` | Trigger label |
| `open` | `boolean` | `false` | Open state. Reflected, so `:host([open])` styling works |
| `placement` | `'start' \| 'end'` | `'start'` | Which edge of the trigger the panel lines up with |

### Slots

| Slot | Description |
|---|---|
| _(default)_ | Menu items — links, buttons, or `<minis-navigation-item>` |
| `icon` | Optional leading icon in the trigger |

### Events

| Event | Detail | Fires |
|---|---|---|
| `toggle` | `{ open: boolean }` | After the menu opens or closes |

### CSS parts

`trigger`, `panel`

### Methods

| Method | Description |
|---|---|
| `syncItems()` | Re-stamps `role="menuitem"`, `tabindex="-1"` and `in-menu` on the current items. Called automatically on slotchange and on open; public because `<minis-navigation>` moves items in and out of the panel after its own measure pass, when no slotchange fires |

---

## What the menu does to its items

Slotted children are treated as menu items. On slotchange and on open, each one gets:

- `role="menuitem"` — a menu is only a menu if its items say so
- `tabindex="-1"` — roving tabindex; arrow keys move focus, Tab leaves the widget
- `in-menu` — the styling hook. Components read it to render themselves as a full-width panel row
  instead of whatever they look like in place. `<minis-navigation-item>` uses it to drop its
  underline and switch to a hover surface.

Give items an `href` (or make them buttons) so they still work without JavaScript.

---

## Keyboard and dismiss behaviour

| Key / action | Result |
|---|---|
| Click trigger | Toggles the panel |
| `ArrowDown` / `ArrowUp` | Opens the panel if closed; otherwise moves focus between items, wrapping at the ends |
| `Home` / `End` | First / last item |
| `Escape` | Closes and returns focus to the trigger. Bound on `document` while open, so it works even when focus never entered the panel |
| `Tab` | Lets focus leave naturally, closing the panel behind it |
| Click outside | Closes the panel |

---

## Placement

The panel is absolutely positioned against the trigger, so it needs room below it.

Use `placement="end"` when the trigger sits near the right edge of its container — the panel then
opens inwards instead of pushing past the viewport. `<minis-navigation>` sets `end` on its overflow
menu for exactly this reason.

There is no collision detection: the panel does not flip or shift on its own.

---

## Tokens

| Token | Default | Description |
|---|---|---|
| `--menu-surface` | `--color-surface-primary` | Panel background |
| `--menu-border-color` | `--color-border` | Panel border |
| `--menu-border-radius` | `--border-radius-md` (8px) | Panel corner radius |
| `--menu-shadow` | `--effect-elevation` | Panel shadow |
| `--menu-padding` | `--linear-sp-linear-2` (8px) | Panel inset |
| `--menu-offset` | `--linear-sp-linear-1` (4px) | Gap between trigger and panel |
| `--menu-min-width` | `200px` | Panel minimum width |
| `--menu-max-height` | `70vh` | Panel scrolls beyond this |
| `--menu-z-index` | `100` | Panel stacking |
| `--menu-trigger-height` | `--navigation-item-height` (38px) | Trigger box height, so it sits in a nav row |
| `--menu-trigger-padding-bottom` | `--navigation-item-padding-bottom` (2px) | Space above the trigger underline |
| `--menu-trigger-gap` | `--menu-item-gap` (4px) | Icon ↔ label ↔ chevron |
| `--menu-trigger-icon-size` | `--navigation-item-icon-size` (24px) | Trigger icon box |
| `--menu-trigger-text` | `--color-text-primary` | Trigger label colour |
| `--menu-trigger-accent` | `--color-text-accent-link` | Trigger colour on hover and while open |
| `--menu-item-gap` | `--linear-sp-linear-1` (4px) | Icon ↔ label inside an item |
| `--menu-item-padding-y` | `--linear-sp-linear-2` (8px) | Item row padding |
| `--menu-item-padding-x` | `--linear-sp-linear-3` (12px) | Item row padding |
| `--menu-item-border-radius` | `--border-radius-sm` (4px) | Item hover shape |
| `--menu-item-hover-surface` | `--color-surface-faded` | Item hover background |

---

## Usage examples

### Standalone menu

```html
<minis-menu label="Kategorie">
  <minis-icon slot="icon" name="categories" size="24"></minis-icon>
  <minis-navigation-item href="/cestovani">Cestování</minis-navigation-item>
  <minis-navigation-item href="/zbozi" active>Zboží</minis-navigation-item>
  <minis-navigation-item href="/potraviny">Potraviny</minis-navigation-item>
</minis-menu>
```

### Near the right edge

```html
<minis-menu label="Další" placement="end">
  <a href="/darky">Dárky</a>
  <a href="/benefity">Benefity</a>
</minis-menu>
```

### Reacting to open/close

```html
<minis-menu label="Další" id="more"></minis-menu>
<script>
  document.querySelector('#more').addEventListener('toggle', (e) => {
    console.log(e.detail.open ? 'opened' : 'closed');
  });
</script>
```

### Inside navigation

You do not build this one by hand — `<minis-navigation>` creates it. See
[`navigation.md`](./navigation.md) → "Too many items to fit".

---

## Accessibility notes

- Trigger is a `<button>` with `aria-haspopup="menu"`, `aria-expanded` and `aria-controls`.
- Panel is `role="menu"`, labelled by the trigger.
- Items get `role="menuitem"` on the light-DOM element. When the item is a component that renders
  its own `<a>` in shadow DOM (like `<minis-navigation-item>`), a screen reader announces the link
  inside the menu item — acceptable, but worth knowing.
- Focus returns to the trigger on `Escape` and on toggle-to-close.

---

## Known gaps

- **No Figma design**, therefore no Code Connect mapping.
- **No custom trigger slot** — the trigger is the built-in button with `label`, an optional icon and
  a chevron. A `trigger` slot can be added when a use case needs it.
- **No collision detection or flipping** — use `placement` to pick a side.
- **Chevron is `arrow-down`** from `@minis/icons`; the icon set has no dedicated chevron.

---

## AI copy-paste prompt

```
Using Mini*S Lit Web Components, build a dropdown menu.
Container: <minis-menu label="…" [placement="start|end"]>
Items: links, buttons, or <minis-navigation-item> in the default slot — the menu stamps
role="menuitem", tabindex="-1" and in-menu on them automatically.
Optional trigger icon: <minis-icon slot="icon" name="…" size="24">
Listen for the `toggle` event ({ open: boolean }) if you need to react to open/close.
Use placement="end" when the trigger sits near the right edge of its container.
```
