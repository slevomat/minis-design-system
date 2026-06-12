# Checkbox

Binary selection control with three selection states: unchecked, checked, and indeterminate (dash).

- Custom element: `<minis-checkbox>`
- Source: `packages/components/src/components/checkbox/`
- Figma: [node 4192:5150](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4192-5150)

## API

| Attribute / Prop | Type    | Default | Description |
|------------------|---------|---------|-------------|
| `checked`        | boolean | `false` | Checked state. Reflected. |
| `indeterminate`  | boolean | `false` | Indeterminate state — shows a dash. Reflected. Clicking resolves to `checked=true`. |
| `disabled`       | boolean | `false` | Disabled state. Reflected. |
| `name`           | string  | —       | Form field name — set as an attribute; submitted with the surrounding `<form>`. |
| `value`          | string  | `"on"`  | Form field value submitted while checked. |

### Slots

| Slot      | Description           |
|-----------|-----------------------|
| (default) | Optional label text.  |

### Events

| Event    | Detail                                        | When |
|----------|-----------------------------------------------|------|
| `change` | `{ checked: boolean, indeterminate: boolean }` | State changed (click, space, enter). |

## Tokens

- Size: `18×18px`, border `1px`, radius `var(--border-radius-sm)` (4px)
- Unchecked: surface `var(--input-surface)`, border `var(--input-border)`
- Unchecked hover: border `var(--input-border-hover)`
- Checked / Indeterminate: surface `var(--color-interaction-primary-surface)`, border `var(--color-interaction-primary-border)`
- Checked / Indeterminate hover: surface `var(--button-primary-hover-surface)`, border `var(--button-primary-hover-border)`
- Checkmark / Dash: `var(--color-core-white)`

## Examples

```html
<minis-checkbox>Subscribe to newsletter</minis-checkbox>

<minis-checkbox checked>Accept terms</minis-checkbox>

<minis-checkbox indeterminate>Select all</minis-checkbox>

<minis-checkbox disabled>Not available</minis-checkbox>
```

> **Prefer active over disabled.** Reach for `disabled` only when interaction is structurally impossible. For cases where the checkbox is blocked by a missing prerequisite, keep it active and show a `<minis-alert>` or contextual message explaining why. See [Design Principles → Prefer active states over disabled](../principles.md#prefer-active-states-over-disabled).

```js
document.querySelector('minis-checkbox').addEventListener('change', (e) => {
  console.log(e.detail.checked, e.detail.indeterminate);
});
```

### Indeterminate pattern (select-all)

```js
const selectAll = document.querySelector('#select-all');
const items = document.querySelectorAll('.item-checkbox');

items.forEach(item => {
  item.addEventListener('change', () => {
    const checkedCount = [...items].filter(i => i.checked).length;
    selectAll.indeterminate = checkedCount > 0 && checkedCount < items.length;
    selectAll.checked = checkedCount === items.length;
  });
});

selectAll.addEventListener('change', (e) => {
  items.forEach(item => { item.checked = e.detail.checked; });
});
```

## Accessibility

- Host element has `role="checkbox"` and reflects `aria-checked` (`"true"` / `"false"` / `"mixed"`) and `aria-disabled`.
- Keyboard: `Space` / `Enter` toggles when focused. Clicking an indeterminate checkbox resolves to `checked`.
- Form-associated via ElementInternals (`static formAssociated`): submits `value` under `name` while checked, resets with `form.reset()`, and honours `<fieldset disabled>`.

## Copy-paste prompt

> Add a `<minis-checkbox>` labelled "Save card for next time" to the payment form. It must default to checked and dispatch a `change` event so we can update the order summary.
