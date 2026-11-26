# Sidebar Layout Component — AI Prompt Reference

## Component Overview

**Tag:** `<minis-sidebar-layout>`
**Description:** The one main + sidebar layout of Mini*S: a fluid main column and a fixed 320px
sidebar on the right, separated by `--spacing-layout-lg`. It goes side by side from a 1008px
viewport, as in production, and stacks into one column, main first, below that — or whenever it
is narrower than 944px.
**Figma:** `sidebar-layout` component set (Breakpoints & Containers page, node `6444:155`),
`Layout` = `columns | stacked`, slots `Main` and `Sidebar`. In Figma pick `columns` from the `lg`
Layout mode up and `stacked` below; in code the switch is automatic.

Decided 2026-11-26 (plan 030, questions 1 and 3). Production splits main + sidebar per component
at ratios from 2.2 : 1 to 3 : 1 with 24–40px gaps; Mini*S standardises on one rule.

---

## API

### Attributes

None. The layout has one shape on purpose.

### Slots

| Slot | Description |
|------|-------------|
| `(default)` | Main column content |
| `sidebar` | Sidebar content: right column side by side, below the main column when stacked |

### CSS parts

| Part | Description |
|------|-------------|
| `main` | Wrapper of the main column |
| `sidebar` | Wrapper of the sidebar |

---

## Widths

Inside `<minis-container>` (32px padding from 1008px):

| Viewport | Container content | Layout |
|---|---|---|
| < 1008px | full width minus 8 / 16px | stacked: main, then sidebar, gap 16–24px |
| 1008px | 944px | 592 + 32 + 320 |
| 1240px+ (default container) | 1176px | 824 + 32 + 320 (2.6 : 1) |
| 1008px+ (medium container) | 944px | 592 + 32 + 320 |

## Design Tokens Used

| Token | Value | Use |
|---|---|---|
| `--layout-sidebar-width` | 320px | Sidebar column width (side by side only) |
| `--spacing-layout-lg` | 16 → 20 (600px) → 24 (768px) → 32px (1008px) | Gap, both directions |

Side by side needs **both** conditions:

- **viewport ≥ 1008px** (`@media`, `--breakpoint-lg`) — the decided stacking breakpoint. It has to
  be a media query: container padding jumps 16 → 32px at 1008px, so the content box is 975px at a
  1007px viewport but 944px at 1008px, and a container query alone would switch at about 976px.
- **own width ≥ 944px** (`@container`, = 1008 − 2 × 32px) — so inside a narrower box (e.g. a
  `narrow` container) it stays stacked.

This is the one Mini*S component that combines the two responsive mechanisms; see
[Layouts → Two Responsive Mechanisms](../layouts/index.md).

---

## Usage Examples

### Deal detail

```html
<minis-container>
  <minis-sidebar-layout>
    <main>
      <section><!-- description --></section>
      <section><!-- what's included --></section>
    </main>
    <aside slot="sidebar">
      <!-- price box, map -->
    </aside>
  </minis-sidebar-layout>
</minis-container>
```

### Listing with filters

Production's category page has the filters on the right too. Keep the source order (results,
then filters); on mobile, show filters behind a button rather than reordering.

```html
<minis-container>
  <minis-sidebar-layout>
    <div><!-- result cards --></div>
    <aside slot="sidebar" aria-label="Filtry"><!-- filters --></aside>
  </minis-sidebar-layout>
</minis-container>
```

---

## Accessibility

- The component adds no landmarks. Slot a `<main>` (once per page) and an `<aside>` as the page
  needs them.
- Source order = reading order = stacked order: main first, sidebar second. Don't reorder
  visually.

## Don'ts

- Don't build a 12-column grid for a main + sidebar page — use this component.
- Don't override `--layout-sidebar-width` per page; a different sidebar width is a design-system
  decision (plan 030).
- Don't put it in a `narrow` container — it never gets wide enough to go side by side.

---

## Copy-Paste AI Prompt

> For a page with a main column and a sidebar (deal detail, listing with filters, magazine),
> nest `<minis-sidebar-layout>` inside `<minis-container>`. Main content goes in the default slot,
> the sidebar in `slot="sidebar"`. The sidebar is a fixed 320px on the right from a 1008px
> viewport; below that it stacks under the main column. Don't write your own grid or media
> queries for it.

---

**Last updated:** 2026-11-26
