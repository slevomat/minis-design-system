# Action Row — `<minis-action-row>`

Interactive list-style row for building vertical menus, dropdown items, filter lists and similar option groups. Always clickable. The row may lead with an **icon**, carry a **checkbox**, and end with a **counter pill**.

Two layouts, matching the Figma `Breakpoint` variant:

| `breakpoint` | Height | Layout |
| --- | --- | --- |
| `desktop` (default) | 32px | `[checkbox] [icon] label [counter]` — everything packed left |
| `xs` | 56px | `[icon] label [counter] … [chevron \| checkbox]` — action pinned to the right edge |

On `xs` the trailing action is a checkbox for `variant="checkbox"` and an `arrow-right` chevron otherwise. It is an explicit attribute, not a container query — the row is used inside dropdowns and narrow sidebars where a width-driven switch would fire at the wrong moment.

> ListItems are read-only; ActionRow is always interactive.

**Figma**: [ActionRow component](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4192-4135&t=XnXEUQQ4da0KbQdm-11)

## API

| Prop       | Type                                 | Default     | Description                                                                  |
| ---------- | ------------------------------------ | ----------- | ---------------------------------------------------------------------------- |
| `variant`  | `'none' \| 'icon' \| 'checkbox'`     | `'none'`    | `checkbox` adds a checkbox (leading on desktop, trailing on `xs`). A slotted `icon` renders in **every** variant. |
| `breakpoint` | `'desktop' \| 'xs'`                | `'desktop'` | Layout breakpoint. `xs` is the 56px mobile row with a trailing action.       |
| `state`    | `'default' \| 'hover' \| 'active'`   | `undefined` | Force a visual state (useful for docs / demos). Hover otherwise applied on `:hover`. |
| `active`   | `boolean`                            | `false`     | Persistent active highlight (e.g. currently selected menu item).             |
| `checked`  | `boolean`                            | `false`     | Checkbox checked state (only with `variant="checkbox"`).                     |
| `disabled` | `boolean`                            | `false`     | Disable interaction.                                                         |
| `counter`  | `string`                             | `undefined` | If set, renders a trailing `<minis-pill-counter size="lg">`.                 |

## Slots

| Slot        | Purpose                                                           |
| ----------- | ----------------------------------------------------------------- |
| (default)   | Label text                                                        |
| `icon`      | Leading icon (24×24). Renders in every variant when slotted.       |

## Events

| Event    | When                                          | `detail`              |
| -------- | --------------------------------------------- | --------------------- |
| `change` | Checkbox toggled (`variant="checkbox"` only). | `{ checked: boolean }`|
| `click`  | Native click bubbles                          | —                     |

## Tokens used

Component-level tokens (defined in `@minis/tokens`):

- `--action-row-border-radius` → 8px (`--border-radius-md`)
- `--action-row-surface` → transparent (default), `--action-row-hover-surface` → #e6f7fc, `--action-row-active-surface` → #f1f3f5
- `--action-row-text` → `--color-text-primary` (black in light / near-white in dark)
- `--action-row-icon` → `--button-tertiary-text` (tertiary-action blue, `#006eb9` in light mode) — applied to the slotted `icon` slot
- `--action-row-padding-x` (8px) / `--action-row-padding-y` (3px)
- `--action-row-padding-x-icon-only` (3px) — leading inset when `variant="icon"`
- `--action-row-padding-x-checkbox` (5px) — leading inset when `variant="checkbox"`
- `--action-row-gap-icon` (8px) — icon ↔ label and label ↔ counter
- `--action-row-gap-checkbox` (13px) — checkbox ↔ label
- `--action-row-height` (32px) / `--action-row-xs-height` (56px) — row height per breakpoint
- `--action-row-xs-action-size` (24px) — `xs` trailing action box
- `--action-row-xs-action` → `--action-row-icon` — `xs` trailing chevron colour

The leading inset follows the *icon*, not the variant: `padding-left` drops to `--action-row-padding-x-icon-only` (3px) whenever an icon is slotted, and `variant="checkbox"` overrides it to `--action-row-padding-x-checkbox` (5px). On `xs` both insets are dropped — padding is a plain 8px on each side. Typography: `--typography-size-sm` (14px), `--typography-weight-medium` (500), Inter. The trailing counter is rendered as `<minis-pill-counter size="lg">` (18×18) with white background and primary-text foreground.

## Examples

```html
<!-- Label only -->
<minis-action-row>Profile</minis-action-row>

<!-- With icon + counter -->
<minis-action-row variant="icon" counter="3">
  <minis-icon slot="icon" name="bell"></minis-icon>
  Notifications
</minis-action-row>

<!-- Filter list -->
<minis-action-row variant="checkbox" counter="128">Cestování</minis-action-row>
<minis-action-row variant="checkbox" counter="64" checked>Zážitky</minis-action-row>

<!-- Currently active menu item -->
<minis-action-row variant="icon" active>
  <minis-icon slot="icon" name="settings"></minis-icon>
  Settings
</minis-action-row>

<!-- xs (mobile) — navigates, so it ends with a chevron -->
<minis-action-row breakpoint="xs" variant="icon">
  <minis-icon slot="icon" name="settings"></minis-icon>
  Settings
</minis-action-row>

<!-- xs (mobile) — selects, so it ends with a checkbox; the icon still leads -->
<minis-action-row breakpoint="xs" variant="checkbox" counter="128" checked>
  <minis-icon slot="icon" name="bell"></minis-icon>
  Travel
</minis-action-row>
```

## Accessibility

- `role="button"`, focusable (`tabindex=0`); `Enter` / `Space` activate the row.
- `variant="checkbox"` exposes `role="checkbox"` + `aria-checked` instead; other variants expose `aria-pressed` for `active`.
- On `xs` the row is 56px tall, comfortably above the 44px minimum tap target.
- Disabled rows expose `aria-disabled="true"` and are removed from tab order.

## When to use

- **Dropdown menus** (profile, account, more-actions)
- **Filter lists** (with checkbox + counter)
- **Vertical navigation** in sidebars (with icon + optional counter)

## When NOT to use

- For destructive/primary form actions → use `<minis-button>`
- For non-interactive labels → use `<minis-tag variant="static">`

> **Prefer active over disabled.** Reach for `disabled` only when interaction is structurally impossible. For cases where the row is blocked by a missing prerequisite, keep it active and show a `<minis-alert>` or contextual message instead. See [Design Principles → Prefer active states over disabled](../principles.md#prefer-active-states-over-disabled).

## Copy-paste prompt

> Use `<minis-action-row>` from `@minis/components` to build a vertical filter list. Each row should use `variant="checkbox"` with a `counter` showing the result count. Selected filters should set `checked`. Highlight the actively focused filter with `active`. Wrap the list in a 240-280px wide container.
