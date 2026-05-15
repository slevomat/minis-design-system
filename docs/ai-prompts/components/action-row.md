# Action Row — `<minis-action-row>`

Interactive list-style row for building vertical menus, dropdown items, filter lists and similar option groups. Always clickable. The row may lead with an **icon** OR a **checkbox** (mutually exclusive) and may end with a **counter pill**.

> ListItems are read-only; ActionRow is always interactive.

**Figma**: [ActionRow component](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4192-4135&t=XnXEUQQ4da0KbQdm-11)

## API

| Prop       | Type                                 | Default     | Description                                                                  |
| ---------- | ------------------------------------ | ----------- | ---------------------------------------------------------------------------- |
| `variant`  | `'none' \| 'icon' \| 'checkbox'`     | `'none'`    | Leading content. Only one of `icon` / `checkbox` allowed.                    |
| `state`    | `'default' \| 'hover' \| 'active'`   | `undefined` | Force a visual state (useful for docs / demos). Hover otherwise applied on `:hover`. |
| `active`   | `boolean`                            | `false`     | Persistent active highlight (e.g. currently selected menu item).             |
| `checked`  | `boolean`                            | `false`     | Checkbox checked state (only with `variant="checkbox"`).                     |
| `disabled` | `boolean`                            | `false`     | Disable interaction.                                                         |
| `counter`  | `string`                             | `undefined` | If set, renders a trailing `<minis-pill-counter size="lg">`.                 |

## Slots

| Slot        | Purpose                                                           |
| ----------- | ----------------------------------------------------------------- |
| (default)   | Label text                                                        |
| `icon`      | Leading icon (24×24). Use with `variant="icon"`.                  |

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

Row height is fixed at 32px (`--pixel-px-32`). Typography: `--typography-size-sm` (14px), `--typography-weight-medium` (500), Inter. The trailing counter is rendered as `<minis-pill-counter size="lg">` (18×18) with white background and primary-text foreground.

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
```

## Accessibility

- `role="button"`, focusable (`tabindex=0`); `Enter` / `Space` activate the row.
- Active rows expose `aria-pressed="true"`.
- Disabled rows expose `aria-disabled="true"` and are removed from tab order.

## When to use

- **Dropdown menus** (profile, account, more-actions)
- **Filter lists** (with checkbox + counter)
- **Vertical navigation** in sidebars (with icon + optional counter)

## When NOT to use

- For destructive/primary form actions → use `<minis-button>`
- For non-interactive labels → use `<minis-tag variant="static">`

## Copy-paste prompt

> Use `<minis-action-row>` from `@minis/components` to build a vertical filter list. Each row should use `variant="checkbox"` with a `counter` showing the result count. Selected filters should set `checked`. Highlight the actively focused filter with `active`. Wrap the list in a 240-280px wide container.
