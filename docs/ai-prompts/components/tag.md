# `<minis-tag>` — AI Agent Reference

**Custom element**: `minis-tag`
**Package**: `@minis/components`
**Figma**: [Tag component](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=2523-339) · [Functionality overview](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=3456-4228)

---

## Purpose

A compact pill-shaped label used to communicate metadata, applied filters, or lightweight interactive states. Three variants cover the main use cases:

| Variant | Use case |
|---|---|
| `static` | Read-only label (e.g. "Platba na zálohu", category badge) |
| `clickable` | Lightweight action — open modal, toggle filter, toggle favourite. **Not** a form submit button. |
| `dismissible` | Applied filter that the user can remove; built-in ✕ fires a `dismiss` event |

---

## API

### Properties / Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `variant` | `"static" \| "clickable" \| "dismissible"` | `"static"` | Visual and behavioural variant |
| `pressed` | `boolean` | `false` | Toggle/selected state. Only meaningful on `clickable`. Sets `aria-pressed` on the inner `<button>`. |
| `disabled` | `boolean` | `false` | Disables the tag. Only meaningful on `clickable`. |

### Slots

| Slot | Description |
|---|---|
| *(default)* | Label text |
| `icon` | Leading icon. Use `<minis-icon slot="icon" name="…">` or an `<svg slot="icon">`. Renders at 14×14 px. |

### Events

| Event | Detail | When |
|---|---|---|
| `toggle` | `{ pressed: boolean }` | `clickable` variant — fired when the user clicks and the pressed state changes |
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
| `--tag-clickable-pressed-surface` | `--color-interaction-secondary-hover-surface` | Pressed/selected background |
| `--tag-clickable-pressed-border` | `--color-interaction-secondary-hover-surface` | Pressed/selected border |
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
  <minis-icon slot="icon" name="credit-card"></minis-icon>
  Platba na zálohu
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

### Clickable tag — simple action

```html
<!-- Opens a modal, does NOT submit a form -->
<minis-tag variant="clickable" id="info-tag">Více informací</minis-tag>
<script>
  document.querySelector('#info-tag').addEventListener('click', () => {
    openModal();
  });
</script>
```

### Clickable tag — toggle (e.g. favourite)

```html
<minis-tag variant="clickable" id="fav-tag">
  <minis-icon slot="icon" name="heart" id="fav-icon"></minis-icon>
  Oblíbené
</minis-tag>
<script>
  document.querySelector('#fav-tag').addEventListener('toggle', (e) => {
    document.querySelector('#fav-icon').name = e.detail.pressed ? 'heart-fill' : 'heart';
  });
</script>
```

The `pressed` attribute can also be set declaratively for server-rendered initial state:

```html
<minis-tag variant="clickable" pressed>
  <minis-icon slot="icon" name="heart-fill"></minis-icon>
  Oblíbené
</minis-tag>
```

---

## Accessibility notes

- **`static`**: rendered as a `<div>` — purely informational, no interaction.
- **`clickable`**: rendered as a native `<button type="button">` with `aria-pressed`. Focus ring is visible on keyboard navigation.
- **`dismissible`**: rendered as a `<div role="group">` containing a `<button aria-label="Remove">` for the ✕ icon.
- The `icon` slot content should include `aria-hidden="true"` when it is decorative.
- Clickable tags must not be used to submit forms — use `<minis-button>` for that.

---

## Copy-paste prompt for AI agents

> Create a dismissible tag set that acts as applied filters. Each tag has a label and fires a `dismiss` event to remove itself. Use `<minis-tag variant="dismissible">` from `@minis/components`. Import the component as a side-effect (`import '@minis/components'`). Load tokens from `@minis/tokens/dist/index.css`. Labels: "Praha", "Restaurace", "Do 500 Kč".
