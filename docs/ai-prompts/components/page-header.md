# `<minis-page-header>` — AI prompt reference

Page headers — also called **heroes** — come in the brand colour themes and open a page: they are the **first content element**, placed directly under the Slevomat header (`<minis-topbar>`) and the main navigation (`<minis-navigation>`). Full-width branded banner that switches between a horizontal layout (desktop ≥768 px: content left, image right) and a stacked layout (mobile: image top, content below).

---

## Placement

```
<minis-topbar>          ← Slevomat header
<minis-navigation>      ← main navigation
<minis-page-header>     ← hero — first content element on the page
… rest of the page content …
```

- **One page header per page**, at the very top of the content area — never mid-page and never stacked with a second one.
- It sits **outside** `<minis-container>`. The component's root is already a full-bleed colour strip that applies `--container-padding` itself and centres a 1240px inner container — the same job `<minis-container>` does. Nesting it would inset the coloured background from the viewport edges and double the horizontal padding.
  ```html
  <minis-page-header theme="brand">…</minis-page-header>
  <minis-container>… rest of the page …</minis-container>
  ```
- Not every page needs one — it marks category and campaign pages. Ordinary detail or transactional pages start straight with content.

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
| `theme` | `'brand' \| 'blue' \| 'yellow' \| 'pink' \| 'green' \| 'summer'` | `'brand'` | Background color theme |
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
| `--page-header-badge-size` | `0.8em` | Badge seal size. Relative to the heading font-size — keep it in `em` so it stays proportional at every breakpoint. |
| `--page-header-badge-gap` | `0.27em` | Horizontal gap between the end of the heading's last line and the badge. Also `em`-relative. |
| `--page-header-badge-check` | white (blue on `theme="green"`) | Colour of the badge's checkmark. |

### CSS shadow parts

| Part | Description |
|---|---|
| `root`, `container`, `content`, `heading-row`, `heading`, `tag`, `description`, `image-area` | Layout elements |
| `badge-anchor` | Inline box that positions the badge on the heading's last line |
| `badge` | The `<minis-badge>` seal itself |

---

## Theme color mapping

| `theme` | Background token | Text color token | Badge seal |
|---|---|---|---|
| `brand` | `--color-branding-brand` (cyan) | `--color-blue-25` (dark) | `pink` |
| `yellow` | `--color-branding-yellow` | `--color-blue-25` (dark) | `summer` |
| `blue` | `--color-branding-blue` | `--color-blue-95` (light) | `brand` |
| `pink` | `--color-branding-pink` | `--color-pink-95` (light) | `blue` |
| `green` | `--color-branding-green` | `--color-green-95` (light) | `yellow`, blue checkmark |
| `summer` | `--color-branding-summer` (orange) | `--color-green-95` (light) | `green` |

The seal colour is **derived from the theme** — there is no attribute for it. Each pairing
comes from Figma and is picked so the seal reads against its own surface rather than
disappearing into it. The `green` theme is the only one that also recolours the checkmark
(blue instead of white), because a white mark on the pale gold seal has too little contrast.

---

## Layout details

The layout switch is a **CSS container query** on the component's own width
(`@container page-header (min-width: 768px)`), not a viewport media query — the
component adapts to the width of whatever it is placed in.

**Desktop (container ≥768 px)**
- Root: full width, `min-height: 328px`, `padding: 0 var(--container-padding)`, centered inner container
- Container: `max-width: 1240px`, flex row, `padding: 70px 0`
- Content column (left): flex column, `align-items: flex-start`, `gap: --spacing-layout-sm`
- Image area (right): `290×280px`, clipped to the scalloped organic blob shape via CSS `mask-image` (from Figma Path 1443)

**Mobile (container <768 px)**
- Root: `padding: var(--linear-sp-linear-6) var(--container-padding, 14px)` (24px vertical)
- Container: flex column, `align-items: center`, `gap: 24px`
- Image area (top): `160×160px`, clipped to the same blob shape via CSS `mask-image` (smaller variant)
- Content (below): centered text

The badge is **not** breakpoint-specific — the same em-relative seal is used at every
size (see below).

---

## Badge positioning

The Brand/Badge seal is rendered **inline, at the end of the heading's last line**.
Three rules hold at every breakpoint and for any number of heading lines:

1. **Size tracks the font size** — `--page-header-badge-size` defaults to `0.8em`, so
   the seal scales automatically with the responsive heading (≈26px at the 32px
   heading, ≈45px at the 56px heading). No `size` attribute is set on the badge; the
   page header drives `--badge-size` directly.
2. **Vertically centred on the last line's line-height** — exactly, not approximately.
3. **`0.27em` gap after the last line's text** — `--page-header-badge-gap`.

### How it works (CSS, plus one measurement)

The centring and sizing are **pure CSS**, no JS:

```css
.badge-anchor {
  display: inline-flex;
  align-items: center;
  vertical-align: top;
  height: 1lh;          /* one line-height, the CSS `lh` unit */
  width: var(--page-header-badge-size, 0.8em);
}
```

The anchor is an inline box exactly `1lh` tall. Because it is the same height as the
line's strut and is aligned to the **top of the line box**, its box coincides with that
line's line-height band — so centring the seal inside it centres it on the line-height,
independent of the font's ascent/descent metrics. Being inline, it automatically lands
on the *last* line, whether the heading has one line or five. A seal larger than the
line-height simply overflows the band without changing the line height.

`height: 1.1em` is declared before `height: 1lh` as a fallback for browsers without the
`lh` unit (pre-Chrome 109 / Safari 16.4 / Firefox 120).

**The one thing CSS can't do**: the slotted heading markup usually ends with a
whitespace text node (any newline before `<img slot="image">`), which renders as a word
space in front of the badge. That made the gap `1.12em` for some authors and `1.00em`
for others, depending purely on how they formatted their HTML. So the component:

- emits exactly one space in its own template before the anchor — any trailing space in
  the slotted markup collapses into it, so there is always **exactly one** space; and
- measures that space's advance in the heading's font (`_measureSpace()`, re-run on
  `slotchange` and after `document.fonts.ready`) and publishes it as the
  `--_space-advance` ratio, which the anchor's margin subtracts:

```css
margin-left: calc(var(--page-header-badge-gap, 0.27em) - var(--_space-advance, 0) * 1em);
```

The ratio is stored relative to the font size, so it survives the responsive size step
without re-measuring.

### Consequences to know

- **Keep the heading slot inline-level.** A block-level child would push the badge onto
  its own line.
- **The badge can wrap.** On narrow viewports, if the last line plus the gap plus the
  seal doesn't fit, the badge wraps to a line of its own — the same as any inline
  content. Shorten the heading or lower `--page-header-badge-size` if that's unwanted.
- To override per instance:
  ```css
  minis-page-header.hero { --page-header-badge-size: 1em; --page-header-badge-gap: 0.5em; }
  ```

---

## Heading typography

| Property | Token | Value |
|---|---|---|
| Font family | `--typography-font-family-brand` | `'Kensington', 'Bebas Neue', 'Arial Narrow', sans-serif` |
| Font weight | `--typography-brand-weight` | 400 |
| Font size | `--typography-brand-xl-size` | 32px (mobile) → 56px (desktop ≥xl) |
| Line height | `--typography-brand-xl-line-height` | 1.1 |
| Letter spacing | `--typography-spacing-extra-wide` | 1px |
| Transform | — | `uppercase` |

> **The brand face is not distributed.** Kensington Compressed Bold is
> Slevomat-proprietary and not committed to the repo. Where it is not installed the
> heading renders in **Bebas Neue** (Google Fonts) — taller and narrower than
> Kensington, so headlines re-flow and **the rendered heading will not match Figma
> pixel-for-pixel**. The badge anchor adapts automatically: `firstUpdated()`
> re-measures the word-space advance on `document.fonts.ready`, whichever face lands.
> Weight is 400 rather than bold because both faces are single-weight — asking for
> 700 only produces synthetic bolding. See `packages/tokens/src/fonts/README.md` for
> how to enable the real font locally.

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
