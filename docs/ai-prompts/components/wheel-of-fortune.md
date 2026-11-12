# Wheel of Fortune — AI Prompt Reference

[Open in Figma ↗](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4112-2462) · [Component set ↗](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=6135-1939)

The Kolotoč game wheel from Slevomat promotions: twelve segments around a central spin button.

> **Placeholder.** A separate team is building the animated wheel in Rive. Until it lands, this
> component draws a simplified SVG wheel and spins it with a CSS transition. **The API below is the
> contract** (attributes, `spin()`, events, CSS custom properties). The Rive version replaces only the
> internals, so code written against the placeholder keeps working. Don't depend on the shadow DOM
> structure or on the exact look.

---

## Quick Copy-Paste Prompt

```
Default wheel, Czech copy:
<minis-wheel-of-fortune></minis-wheel-of-fortune>

Black Friday wheel, Slovak copy, 400 px:
<minis-wheel-of-fortune variant="black-friday" language="sk" style="--wheel-of-fortune-size:400px"></minis-wheel-of-fortune>
```

---

## API

### Element

`<minis-wheel-of-fortune>`

### Properties / Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'broken' \| 'black-friday'` | `'default'` | Campaign look. Figma `Variant` (`black friday` → `black-friday`). |
| `language` | `'cz' \| 'sk'` | `'cz'` | Segment labels and the spin button: ZATOČIT / ZATOČIŤ. Figma `Language` (`CZ`, `SK`). |
| `spinning` | `boolean` | `false` | Read-only state, reflected while the wheel turns. Don't set it. |

### Methods

| Method | Returns | Description |
|---|---|---|
| `spin(index?: number)` | `Promise<{ index, label }>` | Spins and lands on `index` (0 = top, clockwise; 12 segments). Random when omitted. Ignored while already spinning. |

The spin button calls `spin()` with a random target. When the server decides the prize, listen for
`minis-spin-start`, cancel it, and call `spin(index)` with the server's answer.

### Events

| Event | Detail | Description |
|---|---|---|
| `minis-spin-start` | — | Before the wheel turns. Cancelable: `preventDefault()` stops the spin. |
| `minis-spin-end` | `{ index: number, label: string }` | The wheel stopped. `label` is the segment text in the current language, uppercase. |

Both bubble and are composed. The result is also announced to screen readers.

### CSS custom properties

| Property | Default | Description |
|---|---|---|
| `--wheel-of-fortune-size` | `320px` | Width and height. |
| `--wheel-of-fortune-spin-duration` | `4.5s` | Spin length. Reduced motion drops it to near zero. |
| `--wheel-of-fortune-blue` / `-orange` / `-red` / `-dark` | `--color-blue-65` / `--color-orange-75` / `--color-pink-55` / `--color-grey-20` | Segment fills. |
| `--wheel-of-fortune-button` / `-button-hover` | `--color-blue-45` / `--color-orange-75` | Spin button, matches the Figma `_Spin button` default / hover. |

The wheel is illustration: fixed brand colours, no dark-mode switch.

### Slots

None.

---

## Variants

| Value | Segments |
|---|---|
| `default` | DNES TO NEVYŠLO · VÝHRA · DALŠÍ POKUS (SK: ĎALŠÍ POKUS), red / blue / orange, ×4 |
| `broken` | VÝHRA on every segment, blue / orange / red |
| `black-friday` | VÝHRA on every segment, blue / dark / dark |

---

## Differences from Figma (placeholder only)

- Flat segments and a plain round hub instead of the illustrated gear.
- Labels use `--typography-font-family-brand` (Kensington → Bebas Neue); the artwork uses League Gothic.
- A small pointer at the top marks the winning position. The artwork has none; Rive will decide.

---

## Figma

- Page `↳ Wheel of fortune` (`4112:2462`) · `WheelOfFortune` set `6135:1939` (`Variant` × `Language`, 2048 × 2048) · `_Spin button` set `6135:977` (`Language` × `State`).
