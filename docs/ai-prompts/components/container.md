# Container Component — AI Prompt Reference

## Component Overview

**Tag:** `<minis-container>`
**Description:** Responsive layout wrapper that applies `--container-*` tokens for max-width, horizontal padding, and auto centering. Use it as the outermost page-level wrapper for content sections.

---

## API

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'default' \| 'narrow'` | `'default'` | Container width variant |

### Slots

| Slot | Description |
|------|-------------|
| `(default)` | Main content |

---

## Design Tokens Used

The component consumes responsive tokens defined in `@minis/tokens`. The tokens themselves change at media-query breakpoints — the component has no internal media queries.

| Token | Description | Base | 408px+ | 1256px+ |
|-------|-------------|------|--------|---------|
| `--container-padding` | Horizontal padding (default variant) | 8px | 16px | 32px |
| `--container-narrow-padding` | Horizontal padding (narrow variant) | 8px | 16px | 32px |
| `--container-width` | Max-width (default variant) | 100000px | — | — |
| `--container-narrow-width` | Max-width (narrow variant) | 100000px | — | — |

---

## Usage Examples

### Basic — full-width container

```html
<minis-container>
  <h1>Page title</h1>
  <p>Content with responsive horizontal padding.</p>
</minis-container>
```

### Narrow container

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

> Create a page section using `<minis-container>` to wrap content with responsive horizontal padding. Use `variant="narrow"` for article/text-heavy content. The container auto-centres and respects the design system's breakpoint-based padding tokens (8px → 16px → 32px).

---

**Last updated:** 2026-03-19
