# Accordion — `<minis-accordion>` / `<minis-accordion-item>`

Vertical list of expand/collapse rows — the FAQ pattern. Each row shows a **bold heading** on the left and a **blue chevron** on the right, with a **1px divider** between items. Opening a row reveals its panel below the heading.

**Figma**: [accordion-item component set](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4984-9556) · [accordion list container](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4984-9557) — on the ↳ Accordeon page (`4977:145`). Code Connect is mapped in `accordion.figma.ts`.

Figma properties → code:

| Figma property | Values | Code |
| -------------- | ------ | ---- |
| `Label` (TEXT) | string | `heading` attribute |
| `Body` (TEXT)  | string | default slot (panel content) |
| `Open`         | `True` / `False` | `open` attribute |
| `State`        | `Default` / `Hover` / `Disabled` | `Hover` is CSS-only; `Disabled` → `disabled` |
| `Size`         | `default` / `compact` | `size` attribute — same two values in Figma and code. |
| `Show divider` | boolean, default `true` | No attribute — CSS handles it via `:last-of-type`. Turn it off on the **last row** of a list. |

The divider is a nested instance of the [separator](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4987-147) component (page `4977:346`). It carries **no colour/height override** — it uses the separator's own `Separator/default/color` (black 5%) and `Separator/height` (1px), so every rule in the system stays in one place.

> **Why a boolean and not an `Item + Separator + Item` structure**: in the DOM there is no separator element — the rule is `border-bottom` on the item, hidden on `:last-of-type`. A sibling separator would be a Figma-only node with no code counterpart, and would force designers to hand-maintain the alternation on every add/remove/reorder.

> Two elements: `<minis-accordion>` is the list container (dividers, exclusive mode); `<minis-accordion-item>` is a single row. Items must be direct children of the container.

## API — `<minis-accordion>`

| Prop            | Type      | Default | Description                                                                 |
| --------------- | --------- | ------- | --------------------------------------------------------------------------- |
| `single`        | `boolean` | `false` | Exclusive mode — opening an item closes every other one.                    |
| `bordered`      | `boolean` | `false` | Also draws a rule above the first and below the last item.                  |
| `heading-level` | `number`  | `3`     | ARIA heading level applied to every child item. `0` omits the heading role. |
| `size`          | `'default' \| 'compact'` | `'default'` | Row density, pushed down to every child item. `compact` drops the horizontal inset to 0. |

Read-only getter: `items` → `MinisAccordionItem[]` in DOM order.

## API — `<minis-accordion-item>`

| Prop            | Type      | Default | Description                                                                   |
| --------------- | --------- | ------- | ----------------------------------------------------------------------------- |
| `heading`       | `string`  | `''`    | Heading text. Ignored when the `heading` slot is used.                        |
| `open`          | `boolean` | `false` | Expanded state. Reflected — style with `minis-accordion-item[open]`.          |
| `disabled`      | `boolean` | `false` | Prevents opening/closing; trigger is a disabled `<button>`.                   |
| `heading-level` | `number`  | `3`     | Overwritten by the parent `<minis-accordion>` when it has one.                |
| `size`          | `'default' \| 'compact'` | `'default'` | Row density. Reflected. Overwritten by the parent `<minis-accordion>` when it has one. |

### `size="compact"` — no horizontal inset

`compact` sets the trigger's and panel's left/right padding to 0 (`--accordion-compact-padding-x`), so headings, chevrons and panel text align with the container's own edge. Vertical padding, type scale and dividers are unchanged — despite the name it trims the *inset*, not the density: rows stay exactly as tall as they are at `default`.

Reach for it when the accordion sits inside something that already provides horizontal padding (a card, a narrow column, a drawer); otherwise the two insets stack and the accordion text no longer lines up with its neighbours. A full-width, standalone accordion should stay `default`.

```html
<div class="card" style="padding: 24px">
  <minis-accordion size="compact" single>
    <minis-accordion-item heading="…">…</minis-accordion-item>
  </minis-accordion>
</div>
```

Set it on the container and every item follows; setting it per item is possible but only worth it for a deliberately mixed list.

## Slots

| Element                  | Slot        | Purpose                                                          |
| ------------------------ | ----------- | ---------------------------------------------------------------- |
| `<minis-accordion>`      | (default)   | `<minis-accordion-item>` elements                                |
| `<minis-accordion-item>` | (default)   | Panel content, revealed when open. Arbitrary markup allowed.     |
| `<minis-accordion-item>` | `heading`   | Custom heading markup (icon + text, counter, …). Overrides `heading`. |

## Events

| Event    | Fired on | When                              | `detail`            |
| -------- | -------- | --------------------------------- | ------------------- |
| `toggle` | item     | After the item opens or closes.   | `{ open: boolean }` |

The event bubbles and is composed, so it can be listened for on `<minis-accordion>` — that is how `single` mode closes the siblings.

## CSS parts

| Part      | Element                       |
| --------- | ----------------------------- |
| `trigger` | The clickable heading row     |
| `panel`   | The collapsible panel wrapper |

## Tokens used

Component-level tokens (defined in `@minis/tokens`):

- `--accordion-surface` → transparent
- `--accordion-border-color` → `--separator-color` → `--color-separator-default` (black 5% light / white 35% dark — alpha, so the rule reads on any surface) · `--accordion-border-width` → `--separator-height` (1px). The two `--accordion-border-*` names stay as hooks for restyling a single accordion; by default they follow the shared separator rule, matching Figma where the divider is an unmodified `separator` instance.
- `--accordion-padding-x` → 16px (`--linear-sp-linear-4`) — the `default` inset
- `--accordion-compact-padding-x` → 0 (`--linear-sp-linear-0`) — the `size="compact"` inset · Figma `Accordion/compact/padding/x`
- `--accordion-padding-y` → **responsive**: 20px (`--linear-sp-linear-5`) below 768px, 24px (`--linear-sp-linear-6`) from 768px up. The override lives in a media block at the **end** of `tokens.css` — `:root` inside a media query has the same specificity as a bare `:root`, so it has to come after the component block or the default silently wins.
- `--accordion-icon-size` → 20px (`--pixel-px-20`)
- `--accordion-panel-padding-bottom` → 20px (`--linear-sp-linear-5`)
- `--accordion-gap` → 16px (`--linear-sp-linear-4`) — heading ↔ chevron
- `--accordion-heading-text` → `--color-text-primary` · `--accordion-heading-hover-text` → `--color-text-accent-link`
- `--accordion-heading-weight` → `--typography-weight-bold` (700) — ⚠️ **known divergence**: the Figma `Heading/sm` text style is Inter **Semi Bold (600)**. The Figma component follows the text style; the CSS is 700. Align one or the other before this ships.
- `--accordion-icon-color` → `--button-tertiary-text` (tertiary blue `#006eb9` light / light blue in dark mode)
- `--accordion-panel-text` → `--color-text-primary`
- `--accordion-transition-duration` → 200ms

In Figma these live in the `.Components` collection as `Accordion/*`, each aliased to the same Foundation/.Scales token the CSS resolves to, and each carrying its `var(--accordion-*)` name as WEB code syntax so Dev Mode shows the real custom property.

**Typography is viewport-responsive, not container-responsive.** The heading uses `--typography-heading-sm-size` / `--typography-heading-sm-line-height`: **16px / 138%** below 768px, **18px / 133%** from 768px up. The Figma component gets the same behaviour from the `Heading/sm` text style, whose `fontSize` is bound to the `typography/heading/sm/size` Layout variable — switch a frame's Layout mode between `xs` and `lg` to preview both. Panel body text uses `--typography-size-md` (16px) with `--typography-body-md-line-height`. There is no container query — the accordion never rearranges its internals, it only rescales, so the media-query-driven tokens are the correct mechanism (see `docs/ai-prompts/layouts/index.md` → "Two Responsive Mechanisms").

### Row height

Matched to production. For a single-line heading:

| | padding-y ×2 | heading line box | **content box** | + 1px divider |
| --- | --- | --- | --- | --- |
| XS (< 768px) | 20 + 20 | 16 × 138% = 22.08 | **62** | 63 |
| LG (≥ 768px) | 24 + 24 | 18 × 133% = 23.94 | **72** | 73 |

This only works because the chevron is **20px** — smaller than the heading's line box at both breakpoints. `.trigger` is a centred flex row, so its height is `max(line box, chevron)`; a 24px icon would dominate both breakpoints and pin every row to 65px regardless of padding or type. If you change `--accordion-icon-size` above ~22px you take the row height back off the type ramp.

Long headings wrap onto multiple lines and the chevron stays vertically centred.

> ⚠️ **Figma reads 73 at LG, not 72.** The `Heading/sm` text style binds `fontSize`, `fontStyle` and `fontFamily` to variables but **not `lineHeight`** — it is hardcoded at 138%. So Figma computes 18 × 138% = 24.84 → 25 where CSS uses the 133% tier value → 23.94. The fix is to bind that style's `lineHeight` to the existing `typography/heading/sm/line-height` Layout variable (which already holds 138% for `2xs–sm` and 133% for `md+`). That is a shared text style, so it affects every component using it — not changed here.

## Behaviour notes

- The chevron is the `arrow-down` icon at 20px, rotated 180° when open. `<minis-icon>` writes width/height inline on its `<svg>`, so the template passes `size="20"` *and* the stylesheet sets `--minis-icon-size` from `--accordion-icon-size` — changing the token alone resizes the host box but not the glyph.
- The panel animates via `grid-template-rows: 0fr → 1fr`, so no height has to be measured. Both the rotation and the reveal are suppressed under `prefers-reduced-motion: reduce`.
- Hovering the trigger turns the whole heading `--color-text-accent-link` blue; the chevron keeps its own colour.
- `disabled` should be rare — prefer keeping the row open-able and explaining any precondition inside the panel. See `docs/ai-prompts/principles.md`.

## Accessibility

- The trigger is a real `<button type="button">` with `aria-expanded` and `aria-controls`.
- The panel is `role="region"` labelled by the trigger, and is `inert` while closed so its content is skipped by tab order and assistive tech.
- Each trigger is wrapped in `role="heading" aria-level="{heading-level}"`. Set `heading-level` to match the surrounding document outline (e.g. `2` when the accordion follows an `<h1>`), or `0` to drop the role when the accordion is not a set of headings.

## Examples

```html
<!-- FAQ, one panel open at a time -->
<minis-accordion single heading-level="2">
  <minis-accordion-item heading="Jak rychle se mi kredity připíší?">
    Kredity se připisují nejpozději do 24 hodin od potvrzení převodu.
  </minis-accordion-item>
  <minis-accordion-item heading="Jak dlouho kredity platí?" open>
    12 měsíců od data připsání.
  </minis-accordion-item>
</minis-accordion>
```

```html
<!-- Rich panel content + custom heading markup -->
<minis-accordion bordered>
  <minis-accordion-item>
    <span slot="heading">
      <minis-icon name="circle-question" size="20"></minis-icon>
      Potřebujete poradit?
    </span>
    <p>Napište nám, odpovídáme do 24 hodin.</p>
    <minis-button variant="tertiary" size="sm">Kontaktovat podporu</minis-button>
  </minis-accordion-item>
</minis-accordion>
```

```js
// React to opening
document.querySelector('minis-accordion').addEventListener('toggle', (e) => {
  console.log(e.target.heading, e.detail.open);
});
```

## Copy-paste prompt

> Build an FAQ section with the Mini*S design system. Use `<minis-accordion single>` with one `<minis-accordion-item heading="…">` per question and the answer as the item's default-slot content. Set `heading-level` to match the surrounding outline. If the accordion sits inside an already-padded container (card, narrow column, drawer), add `size="compact"` so the rows sit flush with that padding instead of insetting a further 16px. Do not restyle the headings or dividers — the component already uses `--typography-heading-sm-*` (16px mobile → 18px desktop) and `--accordion-border-color`. Import with `import '@minis/components'` and make sure `@minis/tokens/tokens.css` is loaded.
