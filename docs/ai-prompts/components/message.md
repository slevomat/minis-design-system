# Message Component — AI Prompt Reference

## Component Overview

**Tag:** `<minis-message>`
**File:** `packages/components/src/components/message/message.ts`

A notification card that shows a title, optional description, optional visual thumbnail, and an optional close/dismiss button.

> **Draft concept.** The communication components have not had a proper design decision yet. Figma
> (overview node `2513:8181`) has two rough variants; treat both as provisional:
>
> | Figma | Code | Use |
> |---|---|---|
> | `Message/Message standalone` (`2517:9568`, formerly `Message`) | `<minis-message>` — this doc | Flows in layouts |
> | `Message/Message on product` (`5651:2996`) | **No component** — plain markup, see [Message on product](#message-on-product-draft-no-component) | Page headers only, for now |

---

## API

### Properties / Attributes

| Property   | Attribute  | Type                        | Default      | Description                          |
|------------|------------|-----------------------------|--------------|--------------------------------------|
| `layout`   | `layout`   | `'vertical' \| 'horizontal'` | `'vertical'` | Card layout direction                |
| `noVisual` | `no-visual` | `boolean`                  | `false`      | Hide the visual thumbnail — no space is reserved for it |
| `noClose`  | `no-close`  | `boolean`                  | `false`      | Hide the close button — no space is reserved for it |

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
| `close` | —      | Dispatched when the close button is clicked. **Cancelable** — unless a listener calls `preventDefault()`, the message hides itself by setting `hidden`. Remove `hidden` to show it again. |

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
<minis-message layout="horizontal" no-close>
  <img slot="visual" src="thumb.jpg" alt="" />
  <span slot="title">Pokračovat v posledním hledání</span>
  Dotaz, který může být dost komplexní.
</minis-message>

<!-- Without visual -->
<minis-message no-visual>
  <span slot="title">System maintenance tonight</span>
  We'll be down for 30 minutes at midnight.
</minis-message>

<!-- Dismissal works out of the box — no listener needed -->
<minis-message>
  <span slot="title">Hello</span>
  The close button hides this message.
</minis-message>

<!-- Take over dismissal: animate, persist, or wait for the server -->
<minis-message id="msg">
  <span slot="title">Hello</span>
  This message fades out.
</minis-message>
<script>
  const msg = document.getElementById('msg');
  msg.addEventListener('close', (e) => {
    e.preventDefault();
    msg.animate({ opacity: [1, 0] }, 200).finished.then(() => msg.remove());
  });
</script>
```

---

## Copy-Paste AI Prompt

```
Create a <minis-message> notification card using the Mini*S design system.
- layout: vertical (default) or horizontal
- Slots: visual (img/icon), title (span), default (description text)
- Boolean attributes: no-visual (hides the thumbnail), no-close (hides the close button) — both off by default
- The close button hides the card on its own; call preventDefault() in a `close` listener only to customise dismissal
- The close button is a <minis-button variant="tertiary" size="md" icon-only> with <minis-icon name="circle-close-fill">, rendered internally
- Vertical layout: visual left, then body column with [title + close button] row on top and description below
- Horizontal layout: all items in a single row, description truncates with ellipsis
```

---

## Notes

- The close button is rendered internally as `<minis-button variant="tertiary" size="md" icon-only>` with `<minis-icon name="circle-close-fill">` (20px) — do not slot one in manually.
- Use `no-visual` / `no-close` to drop the thumbnail / close button. **Never write `visual="false"` or `closable="false"`** — those attributes no longer exist, and HTML boolean attributes are true whenever present anyway.
- In vertical layout the close button sits in the `.header` row alongside the title (`align-items: flex-start`), so it aligns with the top of the title text.
- Visual slot dimensions: 40×40px (vertical), 32×32px (horizontal). Images are `object-fit: cover`.

---

## Message on product (draft, no component)

A full-width tinted banner used inside page headers. There is **no Lit component** for it — do not
invent a `variant` on `<minis-message>`. Until the team decides on the communication components,
build it from tokens:

```html
<div role="status" style="
  background: var(--alert-warning-color-surface);
  border: 1px solid var(--color-gold-85);
  border-radius: var(--border-radius-lg);
  padding: var(--linear-sp-linear-4) var(--spacing-layout-xxl);
  font-family: var(--typography-font-family-sans);
  font-size: var(--typography-size-sm);
  font-weight: var(--typography-weight-bold);
  line-height: 1.5;
  color: var(--color-text-primary);">
  Nový poklad je tu a s ním i pořádná porce kreditů. Jste zvědaví, co na vás čeká?
  <a href="…" class="message-on-product-link">Vyzvednout poklad</a>
</div>

<style>
  .message-on-product-link { color: var(--color-orange-65); text-decoration: none; }
  .message-on-product-link:hover { text-decoration: underline; }
</style>
```

Storybook: **Components → Message → On product (draft)**.
