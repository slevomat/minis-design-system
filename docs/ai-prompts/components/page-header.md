# `<minis-page-header>` — AI prompt reference

Full-width branded banner used at the top of category and campaign pages. Switches between a horizontal layout (desktop ≥768 px: content left, image right) and a stacked layout (mobile: image top, content below).

---

## Figma

- Component node: `4642:396`
- File: `mfiAVMWkxiBRGnegjqLMNW`
- URL: https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4642-396

---

## Component files

| File | Purpose |
|---|---|
| `packages/components/src/components/page-header/page-header.ts` | Lit component |
| `packages/components/src/components/page-header/page-header.styles.ts` | Scoped CSS |
| `packages/components/src/components/page-header/page-header.stories.ts` | Storybook stories |
| `packages/components/src/components/page-header/page-header.figma.ts` | Figma Code Connect |

---

## API

### Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `theme` | `'brand' \| 'blue' \| 'yellow' \| 'pink' \| 'green'` | `'brand'` | Background color theme |
| `description` | `string` | `''` | Body copy shown below the heading. Omit to hide. |
| `tag` | `string` | `''` | Countdown/label text shown as a pill above the heading. Omit to hide. |
| `no-badge` | `boolean` | `false` | Hide the Brand/Badge checkmark seal next to the heading (shown by default) |

### Slots

| Slot | Description |
|---|---|
| *(default)* | **Heading HTML** — supports `<br>` for line breaks and any inline markup |
| `image` | Decorative photo. Ideally a PNG with a transparent blob-shaped background; any `<img>` is clipped to the container. |
| `button` | Optional CTA. Use `<minis-button variant="transparent" size="xl">`. |

### CSS custom properties (overridable)

| Property | Default | Description |
|---|---|---|
| `--page-header-surface` | per theme | Background color |
| `--page-header-text` | per theme | Heading and description text color |
| `--page-header-image-radius` | `0` (desktop) | `border-radius` on the image container at desktop |

---

## Theme color mapping

| `theme` | Background token | Text color token |
|---|---|---|
| `brand` | `--color-branding-brand` (cyan) | `--color-blue-25` (dark) |
| `yellow` | `--color-branding-yellow` | `--color-blue-25` (dark) |
| `blue` | `--color-branding-blue` | `--color-blue-95` (light) |
| `pink` | `--color-branding-pink` | `--color-pink-95` (light) |
| `green` | `--color-branding-green` | `--color-green-95` (light) |

---

## Layout details

**Desktop (≥768 px)**
- Root: full width, `min-height: 328px`, centered inner container
- Container: `max-width: 1240px`, flex row, `padding: 70px var(--container-padding)`
- Content column (left): flex column, `align-items: flex-start`, `gap: --spacing-layout-sm`
- Image area (right): `290×280px`, `overflow: hidden`
- Brand and Yellow themes: image rotated `−3deg`
- Badge: `md` (43px), red (pink) on every theme — brand (cyan) on the `pink` theme — bottom-aligned next to heading

**Mobile (<768 px)**
- Root: `padding: var(--linear-sp-linear-6) var(--container-padding, 14px)` (24px vertical)
- Container: flex column, `align-items: center`, `gap: 24px`
- Image area (top): `160×160px`, `border-radius: 50%` (circle)
- Content (below): centered text
- Badge: `sm` (32px), same color as desktop — red (pink) on every theme, brand (cyan) on the `pink` theme — absolute top-right of heading

---

## Heading typography

| Property | Token | Value |
|---|---|---|
| Font family | `--typography-font-family-brand` | Kensington |
| Font weight | `--typography-weight-bold` | 700 |
| Font size | `--typography-brand-xl-size` | 32px (mobile) → 56px (desktop ≥xl) |
| Line height | `--typography-brand-xl-line-height` | 1.1 |
| Letter spacing | `--typography-spacing-extra-wide` | 1px |
| Transform | — | `uppercase` |

---

## Usage examples

### Minimal

```html
<minis-page-header theme="brand">
  Ušetřete za pobyt<br>v italském Rimini
  <img slot="image" src="rimini.png" alt="">
</minis-page-header>
```

### With all optional elements

```html
<minis-page-header
  theme="yellow"
  tag="Do 1. června zbývá 6 dní"
  description="Dnešní 30% sleva navíc vám nesmí uniknout. Pořiďte si dovolenou u moře za ještě lepší cenu."
>
  Ušetřete za pobyt<br>v italském Rimini
  <img slot="image" src="rimini.png" alt="">
  <minis-button slot="button" variant="transparent" size="xl">Zobrazit akci</minis-button>
</minis-page-header>
```

### No badge

```html
<minis-page-header theme="pink" no-badge>
  Heading text
  <img slot="image" src="photo.png" alt="">
</minis-page-header>
```

---

## A11y notes

- The heading inside the component uses `<h1>`. If the page already has an `<h1>`, override the heading level by styling with CSS or wrapping in a custom heading slot.
- The `image` slot should include meaningful `alt` text or `alt=""` if decorative.
- The tag pill is a `<span>`, not an interactive element — purely informational.

---

## Copy-paste AI prompt

```
Create a <minis-page-header> with:
- theme="brand"
- Heading: "Ušetřete za pobyt<br>v italském Rimini"
- description="Dnešní 30% sleva vám nesmí uniknout."
- tag="Do 1. června zbývá 6 dní"
- no-badge (absent by default — badge is shown)
- button slot: <minis-button variant="transparent" size="xl">Zjistit více</minis-button>
- image slot: <img src="photo.png" alt="Rimini beach">
```
