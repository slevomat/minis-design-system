# `<minis-tag>` — AI Agent Reference

**Custom element**: `minis-tag`
**Package**: `@minis/components`
**Figma**: [Tag component](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=2523-339) · [Functionality overview](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=3456-4228)

---

## Purpose

A compact pill-shaped label used to display metadata, applied filters, or lightweight interactive states. Four variants cover the main use cases:

| Variant | Use case |
|---|---|
| `static` | Read-only label for displaying metadata or category badges (e.g. "Platba na zálohu"). No interaction. |
| `clickable` | Same visual as static, but clickable. Use for subtle actions like opening a modal or a tooltip with more info about the tag. **Returns to default state after click — no persistent state.** Do NOT use as a form submit button. |
| `toggle` | Works like a toggle/checkbox button visually. Persists pressed/unpressed state. Use for active selection (e.g. Like button, favourite, active filter). The icon typically switches between outline and filled version (e.g. `heart` ↔ `heart-fill`). |
| `dismissible` | Applied filter that the user can remove. Built-in ✕ button fires a `dismiss` event. |

---

## API

### Properties / Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `variant` | `"static" \| "clickable" \| "toggle" \| "dismissible"` | `"static"` | Visual and behavioural variant |
| `pressed` | `boolean` | `false` | Toggle/selected state. Only meaningful on `toggle`. Sets `aria-pressed` on the inner `<button>`. Can be set declaratively for server-rendered initial state. |
| `disabled` | `boolean` | `false` | Disables the tag. Only meaningful on `clickable` and `toggle`. |

### Slots

| Slot | Description |
|---|---|
| *(default)* | Label text |
| `icon` | Leading icon. Use `<minis-icon slot="icon" name="…" size="14">`. Renders at 14×14 px. |

### Events

| Event | Detail | When |
|---|---|---|
| `toggle` | `{ pressed: boolean }` | `toggle` variant — fired when the user clicks and the pressed state changes |
| `dismiss` | — | `dismissible` variant — fired when the ✕ button is clicked |

---

## CSS Custom Properties (tokens)

All tokens fall back to semantic interaction tokens that respect light/dark mode automatically.

| Token | Default value | Description |
|---|---|---|
| `--tag-gap` | `4px` | Gap between icon and label |
| `--tag-padding-y` | `4px` | Vertical padding |
| `--tag-padding-x` | `12px` | Horizontal padding |
| `--tag-min-height` | `30px` | Minimum height |
| `--tag-border-radius` | `9999px` | Full pill shape |
| `--tag-icon-size` | `14px` | Icon slot size |
| `--tag-static-surface` | `--color-interaction-secondary-hover-surface` | Static background |
| `--tag-static-border` | `--color-interaction-secondary-hover-surface` | Static border |
| `--tag-static-accent` | `--color-interaction-secondary-accent` | Static text/icon colour |
| `--tag-clickable-border` | `--color-interaction-secondary-border` | Clickable default border |
| `--tag-clickable-accent` | `--color-interaction-secondary-accent` | Clickable text/icon colour |
| `--tag-clickable-hover-surface` | `--color-interaction-secondary-hover-surface` | Hover background |
| `--tag-clickable-hover-border` | `--color-interaction-secondary-hover-surface` | Hover border |
| `--tag-toggle-border` | `--color-interaction-secondary-border` | Toggle default border |
| `--tag-toggle-accent` | `--color-interaction-secondary-accent` | Toggle text/icon colour |
| `--tag-toggle-hover-surface` | `--color-interaction-secondary-hover-surface` | Toggle hover background |
| `--tag-toggle-hover-border` | `--color-interaction-secondary-hover-surface` | Toggle hover border |
| `--tag-toggle-pressed-surface` | `--color-interaction-secondary-hover-surface` | Toggle pressed background |
| `--tag-toggle-pressed-border` | `--color-interaction-secondary-hover-surface` | Toggle pressed border |
| `--tag-dismissible-surface` | `--color-interaction-secondary-hover-surface` | Dismissible background |
| `--tag-dismissible-border` | `--color-interaction-secondary-hover-surface` | Dismissible border |
| `--tag-dismissible-accent` | `--color-interaction-secondary-accent` | Dismissible text/icon colour |
| `--tag-dismissible-padding-end` | `6px` | Reduced end padding (fits ✕ button) |

---

## Usage examples

### Static tag

```html
<minis-tag>Platba na zálohu</minis-tag>

<minis-tag>
  <minis-icon slot="icon" name="credit-card" size="14"></minis-icon>
  Platba na zálohu
</minis-tag>
```

### Clickable tag — opens a modal or tooltip

```html
<!-- Fires a click event; tag returns to default state immediately -->
<minis-tag variant="clickable" id="info-tag">Více informací</minis-tag>
<script>
  document.querySelector('#info-tag').addEventListener('click', () => {
    openModal(); // or showTooltip(), etc.
  });
</script>
```

### Toggle tag — like button / favourite / active filter

```html
<minis-tag variant="toggle" id="fav-tag">
  <minis-icon slot="icon" name="heart" size="14" id="fav-icon"></minis-icon>
  Oblíbené
</minis-tag>
<script>
  document.querySelector('#fav-tag').addEventListener('toggle', (e) => {
    document.querySelector('#fav-icon').name = e.detail.pressed ? 'heart-fill' : 'heart';
  });
</script>
```

Initial pressed state (e.g. already liked, server-rendered):

```html
<minis-tag variant="toggle" pressed>
  <minis-icon slot="icon" name="heart-fill" size="14"></minis-icon>
  Oblíbené
</minis-tag>
```

### Dismissible tag (applied filter)

```html
<minis-tag variant="dismissible" id="filter-tag">Praha</minis-tag>
<script>
  document.querySelector('#filter-tag').addEventListener('dismiss', (e) => {
    e.target.remove(); // or update parent state
  });
</script>
```

---

## Accessibility notes

- **`static`**: rendered as a `<div>` — purely informational, no interaction.
- **`clickable`**: rendered as a native `<button type="button">`. No `aria-pressed` — it has no persistent state. Focus ring visible on keyboard navigation.
- **`toggle`**: rendered as a native `<button type="button" aria-pressed="true|false">`. Screen readers announce the pressed state. Focus ring visible on keyboard navigation.
- **`dismissible`**: rendered as a `<div role="group">` containing a `<button aria-label="Remove">` for the ✕ icon.
- The `icon` slot content is decorative — `<minis-icon>` handles `aria-hidden` automatically when no `label` attribute is set.
- `clickable` and `toggle` tags must not be used to submit forms — use `<minis-button>` for that.

---

## Choosing the right variant

| Question | Answer → variant |
|---|---|
| Is this just informational? | `static` |
| Does clicking open something (modal, tooltip)? | `clickable` |
| Does clicking change a persistent state (like, save, active filter)? | `toggle` |
| Can the user remove it? | `dismissible` |

---

## Copy-paste prompt for AI agents

> Create a dismissible tag set that acts as applied filters. Each tag has a label and fires a `dismiss` event to remove itself. Use `<minis-tag variant="dismissible">` from `@minis/components`. Import the component as a side-effect (`import '@minis/components'`). Load tokens from `@minis/tokens/dist/index.css`. Labels: "Praha", "Restaurace", "Do 500 Kč".

> Create a toggle tag that works as a Like / favourite button. Use `<minis-tag variant="toggle">` with `<minis-icon slot="icon" name="heart" size="14">`. Listen to the `toggle` event and swap the icon `name` to `heart-fill` when `e.detail.pressed` is `true`, back to `heart` when `false`. Import `@minis/icons` for the icon component.
