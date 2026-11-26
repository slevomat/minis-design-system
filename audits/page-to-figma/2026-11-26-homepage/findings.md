# Homepage — findings (pass 4)

Run: `https://www.slevomat.cz/`, captured 2026-11-26, widths 375 / 768 / 1280, mode light.
Rebuild: Figma MiniS DS → page "Production rebuilds" (`6462:142`), frames `6465:142` (1280),
`6465:2363` (768), `6465:4483` (375). Mapping and coverage: [mapping.md](mapping.md).

Ids are `home-<width>-<nn>`. A finding seen at every width carries the 1280 id. Values and
classes only; no page content. "Feeds" names the plan that should pick the finding up
(021 review agenda, 023 recipes, 027 runtime tokens, 030 layout, G12/G13 in plan 003).

## Missing in Mini*S

| Id | What production has | Classes / partial | Closest Mini*S | Proposed fix | Feeds |
|---|---|---|---|---|---|
| home-1280-01 | Locality picker above the content | `.homepage__locality`, `.localities` — `ProductList/Homepage.default.latte` | — | new component or Local candidate | 021 |
| home-1280-02 | Seasonal countdown pill (gradient, rad 12) | `.xmas-countdown` — `Homepage.default.latte` | — | Local candidate (seasonal) | 021 |
| home-1280-03 | Campaign branding banner, image-led, 1176 × 230, rad 12 | `.branding-banner` — `Homepage/_topBanner.latte` | Promo Card | Local candidate | 021 |
| home-1280-04 | Magazine post card (hero 580 × 424, author avatar, title) | `.posts-grid__post` — `Magazine/_postsGrid.latte` | Promo Card | new component (editorial card) | 021, 023 |
| home-1280-05 | Point-of-interest card (horizontal, image 134, title + 2 icon rows) | `.point-of-interest__item` — `Dashboard/Blocks/PoisBlockControl.latte` | — | new component | 021, 023 |
| home-1280-06 | USP strip (white, rad 12, `typo-heading-xl` + 6 items) | `.usps--homepage` — `app/ui/_usps.latte` | — | new component | 021, 023 |
| home-1280-07 | Site footer (7 columns, bottom links, social, legal) | `.footer` — `app/ui/@layout.latte` | — | new component | 021 |
| home-1280-08 | Inline prompt with actions (two buttons under the text) | `.municipality-note` — `ProductList/_localitiesNote.latte` | Message (no actions slot) | new variant: Message with actions | 021, 023 |
| home-1280-09 | Brand-theme band surface (purple `#110a40`) | `.brand-theme--brand` — `Homepage/Blocks/GiftsBlockControl.latte` | `--color-purple-15` (primitive only) | new token: schema surface | 027 |
| home-1280-10 | Homepage grid with one 2 × 2 tile among 1 × 1 tiles | `.dashboard-matrix__item--big` — `HomepageGrid/_gridItem.latte` | Promo Card (one size) | new variant or a grid recipe | 023, 030 |

## Conflicts

| Id | Property | Mini*S | Production | Kind | Feeds |
|---|---|---|---|---|---|
| home-1280-11 | Danger text colour | `--color-text-accent-danger` `#d2381d` | `#bc0000` (11 uses) | literal / value | 021, 014 |
| home-1280-12 | Deal Card price label surface | `--color-interaction-cta-buy-surface` `#088107` | `#078a06` (32 uses) | value (near match) | 021 |
| home-1280-13 | Deal Card name type | `Heading/sm` 18/24 at `xl` | `typo-heading-sm` rendered 16/21.3 600 | component | 021 |
| home-1280-14 | Deal Card height in a carousel | 308 (`Carousel HP`) | 272–285 | component | 021 |
| home-1280-15 | Promo tile text placement | text below the image | text over the photo, square tile | component | 021, 023 |
| home-1280-16 | Magazine type | `Body/sm` 14/22, `Caption/sm` 14/21 | `typo-body-sm` rendered 18/22, `typo-caption-sm` 16/24 (local overrides) | literal | 021 |
| home-1280-17 | Brand headline sizes | `Brand/Heading/xl` 32 at `xl` (scales at 1480) | Kensington 42/46 (gifts), 48/53 and 24/26 (promo badges) | value | 021, plan 009 |
| home-1280-18 | Inline prompt treatment | one Message style | shadow + rad 12 (top), border + rad 8 (nearest block) | production inconsistency | 021 |
| home-1280-19 | Small button | `Button` `Size=small` | 32 px, padding 4 16; secondary weight 500 vs primary 600 | component | 021 |
| home-375-20 | Header on mobile | `TopBar` `web` is one 1440 layout in Figma | 52 px tall, search hidden below 768 | component (Figma) | 021 |

## Method notes (not findings)

- Promo Card titles and `Brand/*` text styles use Kensington, which plugin scripts can't load in
  MiniS DS. The rebuild puts each tile's title in the card's subtitle and sets the gifts title in
  `Heading/xl` with the layer named "apply Brand/Heading/xl by hand".
- Images are placeholder frames bound to `Color/Surface/faded`: Figma's page capture can't run
  on slevomat.cz (its CSP blocks the capture script) and this setup has no Playwright.
- Nothing in this run touched G12/G13: the homepage's container widths and paddings equal the
  Figma Layout values decided in plan 030 (8 / 16 / 32, 1240).
