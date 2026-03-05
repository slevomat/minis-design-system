# minis-icon

## Overview
`<minis-icon>` renders a named SVG icon from the Slevomat icon library. All icons are 24×24px by default, use `fill="currentColor"` (inheriting the surrounding text color), and require no additional CSS.

## Package
```
@minis/icons
```

## Custom element tag
```html
<minis-icon>
```

## API

| Attribute | Type   | Default  | Description |
|-----------|--------|----------|-------------|
| `name`    | string | `close`  | Icon identifier. See icon list below. |
| `size`    | number | `24`     | Width and height in px. |
| `label`   | string | —        | Accessible label. When set: `role="img" aria-label="{label}"`. When absent: `aria-hidden="true"` (decorative). |

## Available icons (219 total)

### UI / Actions
`arrow-classic` `arrow-down` `arrow-left` `arrow-right` `arrow-up` `bin` `check` `checkbox` `checkbox-partly` `circle-arrow` `circle-check` `circle-check-fill` `circle-close` `circle-close-fill` `circle-plus` `circle-plus-fill` `close` `closed` `copy` `dislike` `download` `edit` `error` `expand` `eye` `eye-off` `eye1` `feedback` `filters` `like` `like1` `lock` `menu` `menuburger` `no` `radio-checked` `radio-unchecked` `refresh` `reload` `search` `settings` `share` `share-ios` `single-image` `sort` `stop` `switch`

### Navigation & Location
`arrival` `circle-question` `crossroads` `departure` `globus` `home` `home1` `on-map` `position` `position1`

### Commerce & Finance
`apple-pay` `card` `cart-fill` `cart-outline` `cashback` `circle-dollar-fill` `credit-card` `deposit` `fksp` `gift` `no-credit-card` `package` `percentage` `qr-code` `voucher-outline` `wallet`

### Communication & Media
`bell` `bubble` `camera` `file-text` `flag` `mail` `mail1` `message` `microfon` `photo-gallery` `printer` `signal` `no-signal` `no-wifi` `smartphone` `tumblr` `wifi` `wifi1`

### People & Identity
`avatar` `children` `children1` `club` `handicap` `person-outline` `team` `user` `userpc` `users` `wheelchair` `wheelchair-not-accessible`

### Travel & Transport
`bike-cableway` `bike-rental` `bike-room` `bike-trails` `bus` `bus1` `car` `car1` `car2` `cross-country-trails` `ev-charger` `no-parking` `no-transfer` `parking` `plane` `plane1` `plane2` `scooter-rental` `skibus` `train` `train1` `train2` `travel` `truck` `walk`

### Accommodation & Amenities
`bed` `childrens-cot` `game-room` `indoor-pool` `kids-corner` `outdoor-pool` `own-kitchen` `salt-cave` `sauna` `ski-pass` `ski-room` `ski-school` `ski-slopes` `snowpark` `spa-procedures` `swimming-areas` `thermal-pool` `water-park` `wellness` `wellness-procedures` `whirlpool-bath` `wine-cellar` `wooden-soaking-tub`

### Food & Dining
`cake` `food` `meal` `meal1` `restaurant`

### Nature & Outdoors
`countryside` `flake` `iceberg` `sea` `ski-slopes` `surroundings`

### Documents & Business
`benefits` `box` `building` `calendar` `calendar-upcoming` `calendar1` `calendar2` `categories` `chest` `contract-signing` `document` `document1` `document2` `goods` `growth` `one-contract` `other-services` `partnership` `reservation` `term` `verified`

### Status & Feedback
`circle-info-fill` `default` `dislike` `error` `event-busy` `no-smoking` `not-pet-friendly` `sad` `smile` `stop`

### Misc / Brand
`airballoon` `animation-program` `babysitting` `beauty` `bestseller` `bulb` `children-lift` `children-lift-poma` `children-pool` `circle-dollar-fill` `clock` `czech` `fitness` `fun` `golf` `heart` `heart-fill` `hearts` `light` `paw` `phone` `playground` `qr-code` `slevomat` `slovakia` `star` `star-fill` `stay` `stick` `suitcase` `suitcase-checked` `switch`

## Usage examples

```html
<!-- Decorative icon (aria-hidden, default) -->
<minis-icon name="cart-fill"></minis-icon>

<!-- Custom size -->
<minis-icon name="star" size="16"></minis-icon>

<!-- Semantic / labelled icon -->
<minis-icon name="close" label="Close dialog"></minis-icon>

<!-- In minis-button icon slot — label mode -->
<minis-button variant="primary">
  <minis-icon slot="icon" name="cart-fill"></minis-icon>
  Add to cart
</minis-button>

<!-- In minis-button icon slot — icon-only mode -->
<minis-button variant="secondary" icon-only>
  <minis-icon slot="icon" name="search"></minis-icon>
</minis-button>

<!-- Color via CSS currentColor -->
<minis-icon name="heart-fill" style="color: red;"></minis-icon>
```

## Setup

```ts
// Import once at app entry (registers <minis-icon> custom element)
import '@minis/icons';
```

Or import individually:
```ts
import '@minis/icons/dist/icon.js';
```

## Color & theming
Icons inherit color from their CSS context via `currentColor`. No tokens needed — just set `color` on the element or a parent.

## Accessibility
- **Decorative** (no `label`): `aria-hidden="true"` — screen readers skip it.
- **Semantic** (with `label`): `role="img" aria-label="{label}"` — screen readers announce the label.
- When an icon is the only content inside a button, either set `label` on the icon **or** add `aria-label` directly on the button.

## Adding new icons
1. Export the path template from `packages/icons/src/icons/{name}.ts`
2. Add the import + key to `packages/icons/src/registry.ts`
3. Add to `ALL_ICONS` in `apps/storybook/stories/Icons.stories.ts`

**Note:** `default`, `package`, `switch`, `document` are JavaScript reserved words — their export variable names use an `Icon` suffix (e.g. `defaultIcon`) but their registry key and `name` attribute remain unchanged.

## Copy-paste prompt for AI agents

> Render a `<minis-icon>` with `name="cart-fill"` inside a `<minis-button variant="primary">` using the `slot="icon"` attribute. Import `@minis/icons` as a side-effect before using it. Do not pass `aria-hidden` manually — the component handles accessibility automatically. Available icon names are listed in `docs/ai-prompts/components/icon.md`.
