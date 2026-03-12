# Message Component — AI Prompt Reference

## Component Overview

**Tag:** `<minis-message>`
**File:** `packages/components/src/components/message/message.ts`

A notification card that shows a title, optional description, optional visual thumbnail, and an optional close/dismiss button.

---

## API

### Properties / Attributes

| Property   | Attribute  | Type                        | Default      | Description                          |
|------------|------------|-----------------------------|--------------|--------------------------------------|
| `layout`   | `layout`   | `'vertical' \| 'horizontal'` | `'vertical'` | Card layout direction                |
| `visual`   | `visual`   | `boolean`                   | `true`       | Show the visual (thumbnail) slot     |
| `closable` | `closable` | `boolean`                   | `true`       | Show the close / dismiss button      |

All properties reflect to attributes.

### Slots

| Slot      | Description                                 |
|-----------|---------------------------------------------|
| `visual`  | Thumbnail image or icon (40×40 in vertical, 32×32 in horizontal) |
| `title`   | The main message headline                   |
| *(default)* | Supplementary description text            |

### Events

| Event   | Detail | Description                              |
|---------|--------|------------------------------------------|
| `close` | —      | Dispatched when the close button is clicked |

---

## Layout

### Vertical (default)

```
┌─────────────────────────────────┐
│ [visual]  [title text…] [close] │
│           [description text…]   │
└─────────────────────────────────┘
```

- `.message` → `flex-direction: row`, visual + body side by side
- `.body` → `flex-direction: column`, header + description stacked
- `.header` → `flex-direction: row`, `justify-content: space-between`, title + close button, `align-items: flex-start`

### Horizontal

```
┌──────────────────────────────────────────┐
│  [visual]  [title]  [description…]  [✕]  │
└──────────────────────────────────────────┘
```

- Single row, all items vertically centered
- Description truncates with `text-overflow: ellipsis`

---

## CSS Custom Properties

| Token                | Default                        | Description              |
|----------------------|--------------------------------|--------------------------|
| `--message-surface`  | `var(--color-surface-primary)` | Card background          |
| `--message-border`   | `var(--color-border)`          | Card border color        |
| `--message-border-radius` | `var(--border-radius-md)` | Card corner radius (8px) |
| `--message-shadow`   | `0px 1px 4px …, 0px 4px 24px …` | Card drop shadow        |
| `--message-padding`  | `var(--linear-sp-linear-2)`    | Inner padding (8px), vertical only |
| `--message-gap`      | `var(--linear-sp-linear-2)`    | Gap between elements (8px) |

---

## Usage Examples

```html
<!-- Vertical with visual and close button (default) -->
<minis-message>
  <img slot="visual" src="thumb.jpg" alt="" />
  <span slot="title">Pokračovat v posledním hledání</span>
  Dotaz, který může být dost komplexní.
</minis-message>

<!-- Horizontal, no close button -->
<minis-message layout="horizontal" closable="false">
  <img slot="visual" src="thumb.jpg" alt="" />
  <span slot="title">Pokračovat v posledním hledání</span>
  Dotaz, který může být dost komplexní.
</minis-message>

<!-- Without visual -->
<minis-message visual="false">
  <span slot="title">System maintenance tonight</span>
  We'll be down for 30 minutes at midnight.
</minis-message>

<!-- Listen for close -->
<minis-message id="msg">
  <span slot="title">Hello</span>
  This message can be dismissed.
</minis-message>
<script>
  document.getElementById('msg').addEventListener('close', () => {
    document.getElementById('msg').remove();
  });
</script>
```

---

## Copy-Paste AI Prompt

```
Create a <minis-message> notification card using the Mini*S design system.
- layout: vertical (default) or horizontal
- Slots: visual (img/icon), title (span), default (description text)
- Boolean attributes: visual (default true), closable (default true)
- Listen to the `close` event to dismiss the card
- The close button is a <minis-button variant="tertiary" size="medium" icon-only> rendered internally
- Vertical layout: visual left, then body column with [title + close button] row on top and description below
- Horizontal layout: all items in a single row, description truncates with ellipsis
```

---

## Notes

- The close button is rendered internally as `<minis-button variant="tertiary" size="medium" icon-only>` — do not slot one in manually.
- In vertical layout the close button sits in the `.header` row alongside the title (`align-items: flex-start`), so it aligns with the top of the title text.
- Visual slot dimensions: 40×40px (vertical), 32×32px (horizontal). Images are `object-fit: cover`.
