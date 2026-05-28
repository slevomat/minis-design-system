# Checkbox

Binary selection control. Initial release ships two selection states (unchecked / checked) each with a hover variant. Indeterminate and error visuals will be added later.

- Custom element: `<minis-checkbox>`
- Source: `packages/components/src/components/checkbox/`
- Figma: [node 4192:5150](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4192-5150)

## API

| Attribute / Prop | Type    | Default | Description |
|------------------|---------|---------|-------------|
| `checked`        | boolean | `false` | Checked state. Reflected. |
| `disabled`       | boolean | `false` | Disabled state. Reflected. |
| `name`           | string  | —       | Form field name. |
| `value`          | string  | `"on"`  | Form field value. |

### Slots

| Slot      | Description           |
|-----------|-----------------------|
| (default) | Optional label text.  |

### Events

| Event    | Detail                  | When |
|----------|-------------------------|------|
| `change` | `{ checked: boolean }`  | Checked state changed (click, space, enter). |

## Tokens

- Size: `18×18px`, border `1px`, radius `var(--border-radius-sm)` (4px)
- Unchecked: surface `var(--input-surface)`, border `var(--input-border)`
- Unchecked hover: border `var(--input-border-hover)`
- Checked: surface `var(--color-interaction-primary-surface)`, border `var(--color-interaction-primary-border)`
- Checked hover: surface `var(--button-primary-hover-surface)`, border `var(--button-primary-hover-border)`
- Checkmark: `var(--color-core-white)`

## Examples

```html
<minis-checkbox>Subscribe to newsletter</minis-checkbox>

<minis-checkbox checked>Accept terms</minis-checkbox>

<minis-checkbox disabled>Not available</minis-checkbox>
```

> **Prefer active over disabled.** Reach for `disabled` only when interaction is structurally impossible. For cases where the checkbox is blocked by a missing prerequisite, keep it active and show a `<minis-alert>` or contextual message explaining why. See [Design Principles → Prefer active states over disabled](../principles.md#prefer-active-states-over-disabled).

```js
document.querySelector('minis-checkbox').addEventListener('change', (e) => {
  console.log(e.detail.checked);
});
```

## Accessibility

- Host element has `role="checkbox"` and reflects `aria-checked` / `aria-disabled`.
- Keyboard: `Space` / `Enter` toggles when focused.
- A hidden native `<input type="checkbox">` participates in form submission via `name` / `value`.

## Copy-paste prompt

> Add a `<minis-checkbox>` labelled "Save card for next time" to the payment form. It must default to checked and dispatch a `change` event so we can update the order summary.
