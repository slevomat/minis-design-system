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
