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

## Available icons (287 + 25 deprecated aliases)

Grouped by section of the [Slevomat Icons](https://www.figma.com/design/lZsWlkVSBRTlpI2vKpnAXT/Slevomat-Icons?node-id=2-4) Figma library (Icons 2.0). The `name` is the Figma component name without its set prefix — `Icon/figma-only/plus` → `plus`, `Icon/usp/rocket` → `rocket`. The same grouping is exported at runtime as `iconSets`.

### Core (193)
General UI icons — the main production set.

`ai-charles` `airballoon` `animation-program` `apple-pay` `arrival` `arrow-classic` `arrow-left` `arrow-right` `avatar` `babysitting` `beauty` `bed` `bell` `benefits` `bestseller` `bike-cableway` `bike-rental` `bike-room` `bike-trails` `bin` `birthday` `box` `bubble` `building` `bus` `cake` `calendar` `calendar-upcoming` `camera` `car` `card` `cart-fill` `cart-outline` `cashback` `categories` `check` `checkbox` `checkbox-partly` `children` `children-lift` `children-lift-poma` `children-pool` `childrens-cot` `circle-arrow` `circle-check` `circle-check-fill` `circle-close-fill` `circle-info-fill` `circle-plus` `circle-plus-fill` `circle-question` `clock` `close` `closed` `club` `contract-signing` `copy` `countryside` `credit-card` `credits-outline` `cross-country-trails` `crossroads` `czech` `default` `departure` `deposit` `document` `download` `edit` `ev-charger` `expand` `explore` `eye` `eye-off` `feedback` `file-text` `filters` `fitness` `fksp` `flake` `food` `fun` `game-room` `gift` `globus` `golf` `goods` `growth` `handicap` `heart` `heart-fill` `hearts` `home` `iceberg` `indoor-pool` `kids-corner` `light` `like-outline` `like-fill` `lock` `mail` `meal` `menu` `menuburger` `message` `money-bag-outline` `moon` `no` `no-credit-card` `no-parking` `no-smoking` `no-wifi` `not-pet-friendly` `on-map` `one-contract` `other-services` `outdoor-pool` `outside` `own-kitchen` `package` `parking` `paw` `percentage` `phone` `photo-library-gallery-images` `plane` `playground` `position` `practical` `printer` `qr-code` `radio-checked` `radio-unchecked` `refresh` `reload` `reservation` `restaurant` `sad` `salt-cave` `sauna` `scooter-rental` `sea` `search` `settings` `share` `share-ios` `signal` `single-image` `ski-pass` `ski-room` `ski-school` `ski-slopes` `skibus` `slovakia` `smartphone` `smile` `snowpark` `sort` `spa-procedures` `star` `star-fill` `stay` `stick` `stop` `suitcase` `suitcase-checked` `sun` `surroundings` `swimming-areas` `switch` `team` `thermal-pool` `train` `travel` `truck` `tumblr` `user` `userpc` `users` `verified` `voucher-outline` `walk` `wallet` `water-park` `wellness` `wellness-procedures` `wheel` `wheelchair` `wheelchair-not-accessible` `whirlpool-bath` `wifi` `wine-cellar` `wooden-soaking-tub`

### UI icons (51)
Figma `Icon/figma-only/*` — drawn in Figma, not yet in the production webfont (plus, minus, outline variants, login/sign-out…).

`anniversary` `arrow-down` `arrow-up` `bell-outline` `book` `chat-outline` `checkmark` `chest-outline` `circle-close` `circle-dolar-fill` `dislike` `download-outline` `error-fill` `event-busy` `eye-off-outline` `eye-outline` `flag` `foodstuff` `form-review` `gifted-voucher` `home-outline` `home1` `local-activity-icon-1` `lock-outline` `login` `loyalty` `mail-drafts` `mail-outline` `microfon` `minus` `money-bag-fill` `my-location` `news-paper-outline` `no-transfer` `other-services-filled` `partnership` `person-outline` `phone-outline` `plus` `redeem` `search-outline` `settings-outline` `share-outline` `sign-out` `slevomat` `smartphone-2` `smartphone-icon-1` `star-shine` `stars` `support-agent-icon` `whatsapp`

### S-icons (8)
From the `icon-slevomat-frontend` webfont.

`calendar-lock` `circle-check-outline` `detect-location` `gift-replacement` `robot` `symbol` `trophy` `user-outline`

### Premise (6)
Venue amenities on accommodation detail.

`bike-trail` `car-charger` `chair` `family-room` `kid` `pool`

### USP (9)
Marketing benefits and selling points.

`bulb` `calendar-with-clock` `contact-place` `customer-support` `fast-delivery` `rating` `rocket` `safety` `star-discount`

### HR (5)
HR / careers icons.

`code` `gear` `image` `palette` `thumbs-up`

### Admins (1)
From the admins icon webfont.

`nigh-lock`

### Allergens (14)
EU allergens 1–14, mono.

`brokoli` `coconut` `cow` `egg-holder` `fish` `grayscale` `lobster` `mussels` `mustard` `nut` `nuts` `nuts2` `peas` `s02`

### Not included

- **Colour sets** — flags, colour allergens, socials, brand & third-party logos, menu and benefits keep their own colours in Figma; `<minis-icon>` is mono (`currentColor`), so they are not shipped.
- `usp/fortune-wheel` — multicolour.
- `hr/bulb` — clashes with `usp/bulb`, which is the drawing `bulb` has always rendered.
- **Legacy** and **Uncategorised** sections — Figma marks their names as provisional.

### Deprecated aliases

Icons 2.0 merged duplicate drawings. The old names still render — as the icon they were merged into — but use the target name in new code. Exported at runtime as `iconAliases`.

| Deprecated name | Renders as |
|---|---|
| `bus1` | `bus` |
| `calendar1` | `calendar` |
| `calendar2` | `calendar` |
| `car1` | `car` |
| `car2` | `car` |
| `chest` | `chest-outline` |
| `children1` | `children` |
| `circle-dollar-fill` | `circle-dolar-fill` |
| `document1` | `document` |
| `document2` | `document` |
| `error` | `error-fill` |
| `eye1` | `eye` |
| `like` | `like-fill` |
| `like1` | `like-fill` |
| `mail1` | `mail` |
| `meal1` | `meal` |
| `no-signal` | `no-wifi` |
| `photo-gallery` | `photo-library-gallery-images` |
| `plane1` | `plane` |
| `plane2` | `plane` |
| `position1` | `position` |
| `term` | `calendar` |
| `train1` | `train` |
| `train2` | `train` |
| `wifi1` | `wifi` |

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

## Adding or updating icons
The Figma library is the source of truth: [Slevomat Icons → Icons](https://www.figma.com/design/lZsWlkVSBRTlpI2vKpnAXT/Slevomat-Icons?node-id=2-4). Every glyph sits on a 24×24 frame with a 20px live area, centred on its ink, with a single black fill.

1. Export the component as SVG from Figma and put its inner markup in `packages/icons/src/icons/{name}.ts` as an `svg` template. Drop `fill="black"` so it inherits `currentColor`; a stroke becomes `stroke="currentColor"` plus `fill="none"`.
2. Add the import, the `icons` key, and the name to its section in `iconSets` in `packages/icons/src/registry.ts`.
3. The Storybook grid reads `iconSets`, so nothing else needs editing.

**Note:** JavaScript reserved words (`default`, `package`, `switch`, `document`) get an `Icon` suffix on their export variable (e.g. `defaultIcon`); the registry key and `name` attribute stay unchanged.

## Copy-paste prompt for AI agents

> Render a `<minis-icon>` with `name="cart-fill"` inside a `<minis-button variant="primary">` using the `slot="icon"` attribute. Import `@minis/icons` as a side-effect before using it. Do not pass `aria-hidden` manually — the component handles accessibility automatically. Available icon names are listed in `docs/ai-prompts/components/icon.md`; avoid the deprecated aliases.
