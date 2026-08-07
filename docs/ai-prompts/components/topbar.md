# Topbar Component — AI Prompt Reference

## Component Overview

**Tag:** `<minis-topbar>` (Figma: **TopBar**)
**Description:** The top bar is meant to be used at the top of any Slevomat web page or vibe-coded app — both purposes have their own variant. Logo on the left, actions (or the app name) on the right. It sits above `<minis-navigation>` and `<minis-page-header>`.

> **Naming.** The tag was `<minis-header>` until 2026-03-20, when it was renamed to `<minis-topbar>` so it would not be confused with `<minis-page-header>` (the hero). The Figma component followed on 2026-08-07 (*Header* → *TopBar*), so both sides now use the same name.

> **Every Mini*S page has one.** Whatever you vibe-code — prototype, internal tool, client app — it opens with `<minis-topbar>` on a `var(--color-background)` page. See [principles.md](../principles.md#every-prototype-starts-with-the-background-token-and-a-topbar).

### Variants — one per place it is used

| `variant` | Used for | Right-hand side |
|---|---|---|
| `web` (default) | The Slevomat website | Action buttons — shortcuts, account, cart |
| `vibe-apps` | Vibe-coded apps and prototypes built on this design system | The app's own name (`app-name`) |

---

## Figma

- Component set: `5156:9287` (variant property `Property 1` = `web` \| `vibe-apps`)
- File: `mfiAVMWkxiBRGnegjqLMNW`
- URL: https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=5156-9287

---

## Component files

| File | Purpose |
|---|---|
| `packages/components/src/components/topbar/topbar.ts` | Lit component |
| `packages/components/src/components/topbar/topbar.styles.ts` | Scoped CSS |
| `packages/components/src/components/topbar/topbar.stories.ts` | Storybook stories |
| `packages/components/src/components/topbar/topbar.figma.ts` | Figma Code Connect |

---

## API

### Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `variant` | `'web' \| 'vibe-apps'` | `'web'` | Where the header is used. Reflected. |
| `app-name` | `string` | `''` | App name shown on the right. **`vibe-apps` only** — ignored in `web`. |

### Slots

| Slot | Description |
|------|-------------|
| `logo` | Brand logo (left) — typically an `<img>` or `<svg>`, max-height 30px |
| `search` | Optional search field, **`web` variant only**. The design system has no input component yet, so nothing is rendered for you — slot your own. The slot reserves no width while it is empty. |
| `actions` | Right-side action buttons — several `<minis-button>` elements. Available in both variants; in `vibe-apps` they render after the app name. |

### CSS Custom Properties

| Token | Default | Description |
|-------|---------|-------------|
| `--topbar-height` | `64px` | Minimum bar height (`min-height`, so tall slotted content grows it) |
| `--topbar-logo-gap` | `16px` | Space after the logo |
| `--topbar-search-width` | `300px` | Search slot width (shrinks on narrow bars) |
| `--topbar-search-gap` | `48px` | Space between search and the actions group |
| `--topbar-actions-gap` | `10px` | Gap between action items |
| `--topbar-app-name-size` | `--typography-heading-lg-size` | App name font size (`vibe-apps`) |
| `--topbar-app-name-color` | `--color-text-primary` | App name colour (`vibe-apps`) |

### CSS shadow parts

`topbar`, `logo`, `search`, `actions`, `app-name`

---

## Placement

```
<minis-topbar>          ← this component (Figma: TopBar)
<minis-navigation>      ← main category navigation
<minis-page-header>     ← hero, first content element
… rest of the page …
```

The topbar is **layout-neutral**: no background and no max-width of its own. Wrap it in `<minis-container>` (or your own full-bleed white band) to get the page's 1240px measure and responsive padding. `<minis-page-header>`, by contrast, is full-bleed and must stay *outside* the container.

---

## Usage Examples

### Web — logo, search and actions

```html
<minis-container>
  <minis-topbar variant="web">
    <img slot="logo" src="/logo.svg" alt="Slevomat" />
    <input slot="search" type="search" aria-label="Hledat" placeholder="Co potřebujete nalézt?" />
    <minis-button slot="actions" variant="tertiary" size="sm">
      <minis-icon slot="icon" name="heart-fill" size="16"></minis-icon>
      Oblíbené
    </minis-button>
    <minis-button slot="actions" variant="tertiary" size="sm">
      <minis-icon slot="icon" name="stick" size="16"></minis-icon>
      Neoblíbené
    </minis-button>
    <minis-button slot="actions" variant="cta-buy" size="sm">
      <minis-icon slot="icon" name="cart-fill"></minis-icon>
      Košík
    </minis-button>
  </minis-topbar>
</minis-container>
```

### Vibe apps — logo and app name

```html
<minis-container>
  <minis-topbar variant="vibe-apps" app-name="My app">
    <img slot="logo" src="/logo.svg" alt="Slevomat" />
  </minis-topbar>
</minis-container>
```

### Combined with navigation (typical page layout)

```html
<minis-container>
  <minis-topbar>
    <img slot="logo" src="/logo.svg" alt="Slevomat" />
    <minis-button slot="actions" variant="cta-buy">
      <minis-icon slot="icon" name="cart-fill"></minis-icon>
      Košík
    </minis-button>
  </minis-topbar>
  <minis-navigation variant="horizontal">
    <minis-navigation-item href="/" active>Home</minis-navigation-item>
    <minis-navigation-item href="/deals">Deals</minis-navigation-item>
  </minis-navigation>
</minis-container>
```

---

## Design Notes (from Figma)

- Bar height is 64px (`min-height`), background is `--color-surface-primary` on the band that wraps it
- Logo area has 16px right padding; the logo itself is 124×30
- Right-side buttons use `variant="tertiary" size="sm"` for secondary actions (Oblíbené, Neoblíbené) and `variant="cta-buy"` for the cart button
- Icons in tertiary buttons use `size="16"` (sm button size)
- Actions gap is 10px
- `vibe-apps` app name: Heading/lg — `--typography-heading-lg-size` (20px → 24px at ≥1480px), `--typography-weight-semibold`, line-height 1.25, letter-spacing −1% (`-0.01em`)
- The search field in the Figma frame is a **screenshot of the live site**, not a design-system component (Roboto italic, hardcoded black border) — do not copy its styling. Slot a real input and style it with the DS tokens.
- The avatar + credit pill in the Figma frame are likewise a pasted screenshot; build them from `<minis-button>` / your own markup in the `actions` slot.

---

## Known gaps (from the Figma roadmap, 2026-08-07)

- **The `web` variant is not yet fully aligned with production.** Treat it as the design-system approximation of the live Slevomat header, not a pixel-accurate copy.
- **No breakpoint variants yet.** Both variants are desktop layouts — there is no mobile/`xs` arrangement in Figma or in code, so the bar simply stays a single row and its contents shrink. Don't invent a mobile layout; wait for the Figma variants.

---

## Accessibility

- The topbar is a structural wrapper — add `role="banner"` or use a `<header>` element around it for landmark navigation.
- Logo should have meaningful `alt` text.
- Give the slotted search input an `aria-label` (or a visually hidden `<label>`) — the placeholder is not a label.
- In `vibe-apps` the app name renders as a `<span>`, not a heading, so it does not compete with the page's `<h1>`.

---

**Last updated:** 2026-08-07
