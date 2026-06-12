# Badge — AI Prompt Reference

A decorative brand symbol: a scalloped seal badge with a white checkmark. Purely visual — no interaction, no slots, no events. Used to communicate trust, verification, or quality certification.

---

## Quick Copy-Paste Prompt

```
Add a badge symbol (pink, default xl size):
<minis-badge color="pink"></minis-badge>

XS/SM headline companion (32 px):
<minis-badge color="pink" size="sm"></minis-badge>

Headline companion (43 px):
<minis-badge color="pink" size="md"></minis-badge>
```

---

## API

### Element

`<minis-badge>`

### Properties / Attributes

| Attribute | Type                                      | Default  | Description                       |
|-----------|-------------------------------------------|----------|-----------------------------------|
| `color`   | `'pink' \| 'yellow' \| 'blue' \| 'brand'` | `'pink'` | Color variant of the seal badge   |
| `size`    | `'sm' \| 'md' \| 'xl'`                    | `'xl'`   | Size: sm 32 px · md 43 px · xl 82 px |

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
| `brand`  | `--badge-brand` | `#00b2e5` | Slevomat brand cyan            |

---

## Sizing

Use the `size` attribute to select a named size. The SVG scales proportionally and is always square.

| `size` | px  | Use case                              |
|--------|-----|---------------------------------------|
| `sm`   | 32  | XS/SM breakpoint headline companion  |
| `md`   | 43  | Headline companion (≥ MD breakpoints) |
| `xl`   | 82  | Default — standalone hero badge       |

```html
<!-- XS/SM headline companion -->
<minis-badge color="pink" size="sm"></minis-badge>

<!-- Headline companion, larger viewports -->
<minis-badge color="pink" size="md"></minis-badge>

<!-- Default (82 px) -->
<minis-badge color="pink"></minis-badge>
```

---

## Colors — Token Reference

The component uses the branding semantic tokens (added 2026-06-11). These alias the primitives so a single Figma variable change propagates automatically.

| Variant  | Branding token          | Primitive alias       | Resolved hex |
|----------|-------------------------|-----------------------|--------------|
| `pink`   | `--color-branding-pink` | `--color-pink-45`     | `#cf2e41`    |
| `yellow` | `--color-branding-yellow` | `--color-yellow-75` | `#d4a017` ≈  |
| `blue`   | `--color-branding-blue` | `--color-blue-45`     | `#006eb9`    |
| `brand`  | `--color-branding-brand` | `--color-blue-65`    | `#00b2e5`    |

> Note: `yellow` resolves to `--color-yellow-75` (a warm golden amber), not `--color-yellow-45` (the warning/alert yellow).

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
