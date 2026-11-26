# Container Component — AI Prompt Reference

## Component Overview

**Tag:** `<minis-container>`
**Description:** Responsive layout wrapper that applies `--container-*` tokens for max-width, horizontal padding, and auto centering. Use it as the outermost page-level wrapper for content sections.
**Figma:** `container` component set (Breakpoints & Containers page, node `6444:148`), `Variant` = `default | medium | narrow`, one `Content` slot.

### Which variant — the three width levels

Mini*S follows production's three width levels (plan 030, decided 2026-11-26; facts in
[Production Reference](../layouts/production-reference.md)):

| Variant | Max width | Content width from 1008px | Use for | Production |
|---|---|---|---|---|
| `default` | 1240px from 1008px | 944px at 1008, 1176px from 1240 | **Browsing pages**: homepage, listings, deal detail, magazine | `grid-wrap--wide` |
| `medium` | 1008px from 1008px | 944px | **Task pages**: cart, login, checkout steps | `grid-wrap` |
| `narrow` | 752px from 768px | 688px (720px at 768–1007) | **Reading / form column**: article text, a single form | the cart's 704px column |

Below 1008px `default` and `medium` are both full width; `narrow` is full width below 768px.
A task page usually nests a `narrow` column inside a `medium` page: the medium container carries
the full-width parts (step header, messages), the narrow one the form. For a main column with a
sidebar, put [`<minis-sidebar-layout>`](./sidebar-layout.md) inside `default` or `medium`.

---

## API

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'default' \| 'medium' \| 'narrow'` | `'default'` | Width level — see the table above |

### Slots

| Slot | Description |
|------|-------------|
| `(default)` | Main content |

---

## Design Tokens Used

The component consumes responsive tokens defined in `@minis/tokens`. The tokens themselves change at media-query breakpoints — the component has no internal media queries.

| Token | Description | < 408px | 408px+ | 768px+ | 1008px+ |
|-------|-------------|------|--------|--------|---------|
| `--container-padding` | Horizontal padding (`default`, `medium`) | 8px | 16px | 16px | 32px |
| `--container-narrow-padding` | Horizontal padding (`narrow`) | 8px | 16px | 16px | 32px |
| `--container-width` | Max-width (`default`) | 100% | 100% | 100% | 1240px |
| `--container-medium-width` | Max-width (`medium`) | 100% | 100% | 100% | 1008px |
| `--container-narrow-width` | Max-width (`narrow`) | 100% | 100% | 752px | 752px |

(Figma stores "100%" as `100000px`; see CLAUDE.md → Common pitfalls.)

---

## Usage Examples

### Basic — full-width container

```html
<minis-container>
  <h1>Page title</h1>
  <p>Content with responsive horizontal padding.</p>
</minis-container>
```

### Task page — medium container with a narrow form column

```html
<minis-container variant="medium">
  <h1>Košík</h1>
  <minis-alert>Full-width message for the whole step</minis-alert>
</minis-container>
<minis-container variant="narrow">
  <form><!-- the form, 688px wide on desktop --></form>
</minis-container>
```

### Narrow container — reading column

```html
<minis-container variant="narrow">
  <article>
    <h1>Article title</h1>
    <p>Narrower max-width for long-form reading.</p>
  </article>
</minis-container>
```

### Composing with other components

```html
<minis-container>
  <minis-navigation variant="main-nav">
    <minis-navigation-item href="/" active>Home</minis-navigation-item>
    <minis-navigation-item href="/deals">Deals</minis-navigation-item>
  </minis-navigation>
  <minis-card-grid variant="navigation">
    <div>Card 1</div>
    <div>Card 2</div>
    <div>Card 3</div>
    <div>Card 4</div>
  </minis-card-grid>
</minis-container>
```

---

## Accessibility

- No special ARIA roles needed — the container is purely structural.
- Uses a `<div>` wrapper internally; semantic landmarks should be placed inside the slot by the consumer.

---

## Copy-Paste AI Prompt

> Wrap each page band in `<minis-container>`. Pick the width level by page type: default (1240px) for browsing pages, `variant="medium"` (1008px) for task pages such as the cart, login or checkout, `variant="narrow"` (752px) for a text or form column. The container auto-centres and uses the breakpoint-based padding tokens (8px → 16px from 408px → 32px from 1008px). For main + sidebar, nest `<minis-sidebar-layout>` inside it.

---

**Last updated:** 2026-11-26
