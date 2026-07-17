# Mini*S Design System — Principles

Design decisions and rules for how to use components correctly and consistently.

---

## Prefer active states over disabled

**Rule:** Use `disabled` only when interaction is truly impossible — not just conditional or blocked by an incomplete prerequisite. When a component *could* work but requires something from the user first, keep it active and explain the requirement instead.

### Why

Disabled elements are silent. They offer no feedback, are frequently invisible to assistive technologies, and leave users guessing about what went wrong or what they need to do. An active component paired with a `<minis-alert>` or inline message is clearer, more accessible, and more forgiving.

### Prefer this

```html
<minis-alert variant="warning">
  Complete your billing address before placing your order.
</minis-alert>
<minis-button variant="primary">Place order</minis-button>
```

### Over this

```html
<!-- Avoid: gives no hint about what is missing or how to fix it -->
<minis-button variant="primary" disabled>Place order</minis-button>
```

### When `disabled` is appropriate

Use it only when **all** of these apply:

1. **The action is structurally impossible** for this user — not just blocked by missing data. Examples: a premium feature unavailable on the current plan; a field pre-filled from an external read-only source.
2. **No action exists** that would make it available in this session.
3. **Removing it from the tab order** is actually correct — the user should not be able to focus or interact with it at all.

When in doubt, keep it active and explain with an alert.

### Related components

- [`<minis-alert>`](./components/alert.md) — use for prerequisite messages and contextual warnings
- [`<minis-button>`](./components/button.md) · [`<minis-checkbox>`](./components/checkbox.md) · [`<minis-action-row>`](./components/action-row.md) · [`<minis-tile>`](./components/tile.md) · [`<minis-tag>`](./components/tag.md) — all expose `disabled`; apply this principle to each

---

## Style with tokens, never hardcoded values

**Rule:** Every color, spacing, radius, and typography value comes from a design token (`--color-*`, `--spacing-layout-*`, `--linear-sp-linear-*`, `--typography-*`, `--border-radius-*`). Never write raw hex colors or magic pixel values in consumer code or new components.

### Why

Tokens are what make the system work as a *system*: they carry both light **and** dark values, scale with the viewport tier, and stay in sync with Figma. A hardcoded value opts out of all three silently — it looks right today and breaks the moment the theme, mode, or breakpoint changes.

### Prefer this

```css
.card {
  background: var(--color-surface-primary);
  color: var(--color-text-primary);
  padding: var(--spacing-layout-md);
  border-radius: var(--border-radius-md);
}
```

### Over this

```css
/* Avoid: wrong in dark mode, ignores responsive spacing, drifts from Figma */
.card {
  background: #ffffff;
  color: #000000;
  padding: 16px;
  border-radius: 8px;
}
```

---

## Dark mode comes free — if you follow the token rule

**Rule:** Never write component-level dark-mode styling. Dark mode is toggled globally with `<html data-mode="dark">`; `tokens.css` overrides all semantic color tokens in one place. If something looks wrong in dark mode, the fix is to use the right semantic token — not to add a dark override.

### Why

Every `<minis-*>` component only references semantic tokens, so a single attribute switches the whole page. Local dark-mode CSS (`@media (prefers-color-scheme)`, per-component `[data-mode]` rules, hardcoded dark colors) creates a second source of truth that drifts from the token definitions.

```html
<html data-mode="dark">  <!-- that's the entire integration -->
```

---

## Use abbreviated size values only

**Rule:** The `size` attribute accepts the abbreviated Figma variant names — `xs | sm | md | lg | xl` (each component exposes only its subset). Never use full words like `small`, `medium`, `large`.

### Why

Size values mirror the Figma `Size` variant names one-to-one, so designs translate to code without a mapping step. An unrecognized value fails **silently**: the component renders at its default size with no error or warning — `size="small"` looks like it works until you compare it with the design.

### Prefer this

```html
<minis-button size="sm">Save</minis-button>
```

### Over this

```html
<!-- Avoid: "small" is not a valid value — silently falls back to md -->
<minis-button size="small">Save</minis-button>
```

---

## Respect the two responsive mechanisms

**Rule:** Page-level spacing and typography respond to the **viewport** through tokens (`--spacing-layout-*`, `--container-padding`, `--typography-heading-*`) — you never write media queries for spacing. Components that rearrange their own internals (`<minis-page-header>`, `<minis-card-grid>`) use **container queries** on their own width — they adapt to the box they're placed in, not the screen.

### Why

Mixing the two causes subtle bugs: a media query duplicates what the tokens already do (and drifts from the tier definitions), while assuming a container-responsive component tracks the viewport leads to "wrong layout" surprises when it sits in a narrow panel. New layout-switching components must use container queries, with the breakpoint hardcoded from the `--breakpoint-*` scale plus a comment (CSS custom properties cannot be used inside `@container`/`@media` conditions).

See [Layouts → Two Responsive Mechanisms](./layouts/index.md#two-responsive-mechanisms--when-to-use-which) for the full tier tables and the narrow-embed caveat.

---

## Brand font is for banner headlines only

**Rule:** `--typography-font-family-brand` (Kensington Compressed Bold) is reserved for banner and campaign headlines — the `<minis-page-header>` heading and equivalent hero moments. Everything else — headings, body copy, UI labels, numbers — uses Inter (`--typography-font-family-sans`).

### Why

Kensington is a display face: it works at large sizes in uppercase, and its impact comes from scarcity. Used in body text or UI controls it becomes hard to read and dilutes the brand moment it was designed for.

### Prefer this

```css
.hero-headline { font-family: var(--typography-font-family-brand); }
.section-title { font-family: var(--typography-font-family-sans); }
```

### Over this

```css
/* Avoid: brand face outside banner headlines */
.nav-item { font-family: var(--typography-font-family-brand); }
```
