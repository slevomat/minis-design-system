# Badge — AI Prompt Reference

A decorative brand symbol: a scalloped seal badge with a white checkmark. Purely visual — no interaction, no slots, no events. Used to communicate trust, verification, or quality certification.

---

## Quick Copy-Paste Prompt

```
Add a badge symbol (pink variant, default size):
<minis-badge color="pink"></minis-badge>
```

---

## API

### Element

`<minis-badge>`

### Properties / Attributes

| Attribute | Type                         | Default  | Description                       |
|-----------|------------------------------|----------|-----------------------------------|
| `color`   | `'pink' \| 'yellow' \| 'blue'` | `'pink'` | Color variant of the seal badge   |

### Slots

None — the component is self-contained inline SVG.

### Events

None.

---

## Color Variants

| Value    | Token           | Hex       | Usage                          |
|----------|-----------------|-----------|--------------------------------|
| `pink`   | `--badge-pink`  | `#cf2e41` | Default — Slevomat brand red   |
| `yellow` | `--badge-yellow`| `#ffa400` | Warm accent / attention        |
| `blue`   | `--badge-blue`  | `#006eb9` | Slevomat brand blue            |

---

## Sizing

| Size  | Use case                        |
|-------|---------------------------------|
| 43 px | Minimum — companion for headlines |
| 82 px | Default (Figma natural size)    |

Override via CSS `width` / `height` — the SVG scales proportionally and is always square.

```html
<!-- Headline companion (43 px) -->
<div style="display:flex;align-items:center;gap:12px">
  <h2>Ověřený prodejce</h2>
  <minis-badge color="pink" style="width:43px;height:43px"></minis-badge>
</div>

<!-- Default (82 px) -->
<minis-badge color="pink"></minis-badge>
```

---

## Colors — Primitive Token Reference

No new tokens are introduced. The component uses existing primitives directly:

| Variant  | Primitive token       | Resolved hex |
|----------|-----------------------|--------------|
| `pink`   | `--color-pink-45`     | `#cf2e41`    |
| `yellow` | `--color-yellow-45`   | `#ffa400`    |
| `blue`   | `--color-blue-45`     | `#006eb9`    |

---

## Usage Examples

```html
<!-- Pink (default) -->
<minis-badge></minis-badge>

<!-- Yellow variant -->
<minis-badge color="yellow"></minis-badge>

<!-- Blue variant, custom size -->
<minis-badge color="blue" style="width:48px;height:48px"></minis-badge>

<!-- Inline with text -->
<span style="display:inline-flex;align-items:center;gap:8px">
  <minis-badge color="pink" style="width:24px;height:24px"></minis-badge>
  Verified merchant
</span>
```

---

## Files

| File               | Path                                                       |
|--------------------|------------------------------------------------------------|
| Component          | `packages/components/src/components/badge/badge.ts`        |
| Styles             | `packages/components/src/components/badge/badge.styles.ts` |
| Stories            | `packages/components/src/components/badge/badge.stories.ts`|
| Figma Code Connect | `packages/components/src/components/badge/badge.figma.ts`  |

---

## Figma

Node: `4605:441` in file `mfiAVMWkxiBRGnegjqLMNW`
