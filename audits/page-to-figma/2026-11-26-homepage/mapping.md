# Homepage — mapping table (pass 2)

| | |
|---|---|
| Page | `https://www.slevomat.cz/` (homepage), logged out |
| Captured | 2026-11-26, Claude in Chrome, `capture.js` 1.4.0, mode `light` (the browser preferred dark; the capture removes production's `dark-mode` class inside its own iframe) |
| Widths | 375 (Layout mode `2xs`), 768 (`md`), 1280 (`xl`) |
| Document height | 7,729 / 8,077 / 8,050 px |
| Production code | `../slevomat` @ `bb1847f86e4` (read only) |
| Layout decisions | plan 030 "Decided", 2026-11-26 (branch `claude/layouts-030-35f511`) |

No deal texts, prices or images are recorded here (plan 031 constraint): classes, measured values
and counts only. Real content lives in the Figma rebuild.

## Coverage

Counted on the 1280 capture; 375 and 768 have the same blocks in a different arrangement.

| Blocks | Count |
|---|---|
| Matched to a Mini*S component (instance) | 8 kinds — TopBar, Navigation, Button, tag, Deal Card, Promo Card, Message (municipality note, closest), separator |
| Token-built frame (layout, no component role) | 5 kinds — page background, content block band, block heading row, carousel row, footer columns |
| Gap (no Mini*S component plays the role) | 7 kinds — locality picker, countdown pill, branding banner, magazine post card, point-of-interest card, USP strip, site footer |

| Values (from the capture's stats, 1280) | Tokenised | Conflict | Literal | No token |
|---|---|---|---|---|
| Text colours (≈ 600 uses, 11 values) | 4 values / 575 uses (`#000000`, `#6b6b70`, `#ffffff`, `#006eb9`) | 1 (`#bc0000` red text, 11 uses) | — | 6 values, 13 uses (brand-theme purples and campaign colours) |
| Backgrounds (286 uses, 12 values) | 6 (`#ffffff`, `#006eb9`, `#e3e4e6`, `#fcfdff`, `#ffd666`, `#6b6b70`) | 1 (`#078a06` price label vs `--color-interaction-cta-buy-surface` `#088107`, 32 uses) | — | 4 (`#ffba08` discount badge, `#bc0000`, `#110a40` brand theme, `#1b1c20` / `rgba(0,0,0,.4)` image placeholders and scrims) |
| Borders (148 uses) | `#cbccce` → `--color-border`, `#e3e4e6` → `--color-border-subtle`, `#006eb9` → primary border | — | — | `#ffa400`, `#f5dba9` (countdown / campaign) |
| Radii (297 uses) | 8 → `md`, 12 → `lg`, 9999 / 50 % → `full`, 4 → `sm` — all | — | — | — |
| Type (≈ 590 text nodes) | `typo-heading-lg` 24/30, `heading-md` 20/26, `body-md` 16/24, `body-sm` 14/22 — match Mini*S at `xl` | Deal Card name (`typo-heading-sm`) renders 16/21.3 600, Mini*S `Heading/sm` is 18/24 at `xl`; magazine post renders `typo-body-sm` at 18/22 and `typo-caption-sm` at 16/24 (local overrides) | — | Kensington headlines 42/46 (gifts band), 32/35 (USP), 24/26 and 48/53 (promo badges): no Mini*S brand size above 32 at `xl` |
| Letter spacing | −0.28 px at 14 px (= −2 %, `--typography-spacing-n2`), −0.32 px at 16 px | — | — | +1 % / +3 % on Kensington (no positive brand spacing token) |
| Spacing | container padding 8 / 16 / 32 and width 1240 = `--container-padding` / `--container-width` (plan 030) | — | — | 144 px top padding (28 uses: promo tile content offset), 10 px price-label padding |

## Blocks

Production class → Mini*S. Ids are the 1280 capture's outline ids (they change per capture).

| # | Production block | Partial (`../slevomat`) | Mini*S | Outcome | Notes |
|---|---|---|---|---|---|
| 1 | `header.header` › `.page-header` (64 px; 52 px at 375) | `app/ui/@layout.latte` | `TopBar` `Property 1=web` | match + conflicts | Search field inside the header from 768 up; Mini*S TopBar web carries its own search. Header height 64 vs TopBar's own. |
| 2 | `.horizontal-nav` (40 px, links `typo-body-md`, 3 px bottom indicator, gap 24) | `app/ui/ProductList/MainMenuControl.latte` | `Navigation` `Variant=main nav` | match | First item has an icon ("Black week"). |
| 3 | `.homepage__locality` › `.localities` (locality picker) | `app/ui/ProductList/Homepage.default.latte` | — | **gap** | Built from tokens, `not Mini*S — locality picker`. |
| 4 | `.xmas-countdown` (pill, gradient, rad 12) | `app/ui/ProductList/Homepage.default.latte` | — | **gap** | Seasonal; `not Mini*S — countdown`. |
| 5 | `.municipality-note` (white, rad 12, shadow, heading-md + body-md + two buttons) | `app/ui/ProductList/_localitiesNote.latte` | `Message/Message standalone` (closest) | match + conflicts | Role: an inline prompt with actions. Mini*S Message has no shadow variant; production has a close button. |
| 6 | `.button` / `.button--secondary` (32 px tall: padding 4 16, line-height 22) | `app/stylus/_button.styl` | `Button` `Type=Primary` / `Secondary`, `Size=small` | match + conflict | Production `.button` default is 40 px; here a size modifier makes it 32. Weight 600 vs 500 on secondary. |
| 7 | `.branding-banner--brand` (1176 × 230, rad 12, yellow) | `app/ui/ProductList/Homepage/_topBanner.latte` (external content) | — | **gap** | Campaign banner, image-led: `not Mini*S — branding banner`. |
| 8 | `.dashboard-matrix` (grid-4, gap 8, one 2×2 big tile + 288 tiles; grid-5 later) | `app/ui/HomepageGrid/HomepageGridControl.latte`, `_gridItem.latte` | `Promo Card` | match + conflicts | Photo tiles with a text overlay = Promo Card's role. **Not** `Tile` (the reference guessed Tile; corrected). Kensington discount badge on the big tile has no Mini*S counterpart. |
| 9 | `.content__block-title` (`h2 typo-heading-lg` + "show all" link with count) | `app/ui/ProductList/Homepage/Blocks/*BlockControl.latte` | token-built row (`Heading/lg` + link) | token-built | The gifts band uses Kensington 42 instead (see 11). |
| 10 | `.tags__item` (pill, rad 9999, border `#cbccce`, padding 4 12, 14/20) | `app/stylus/_tags.styl` | `tag` `Variant=Clickable` | match | Horizontal overflow row of 6–8 tags. |
| 11 | `.content__block--gifts` › `.brand-theme--brand` band (purple `#110a40`, image, rad 12, padding 32) | `app/ui/ProductList/Homepage/Blocks/GiftsBlockControl.latte` | token-built band | token-built + no token | Brand-theme surface has no Mini*S schema colour (`--color-purple-15` is a primitive). Plan 027 maps `.brand-theme--*` to schemas. |
| 12 | `article.product` in `.products-carousel` (272–288 × 272–285, rad 12, image 136 tall, price label, name, rating, info) | `app/ui/ProductList/_product.latte`, `Homepage/Blocks/_*BlockCarousel.latte` | `Deal Card` `Card usage=carousel`, `Content=Carousel HP` | match + conflicts | 4 visible per carousel at 1280, 32 loaded on the page. Price label green `#078a06` vs Mini*S `#088107`; name 16/21.3 vs `Heading/sm`. Rating and favourite button live inside Deal Card. |
| 13 | `.content__block--nearest` › `.municipality-note--hp-…` (border, rad 8) | `app/ui/ProductList/Homepage/Blocks/NearestProductsBlockControl.latte` | `Message` (closest) | match + conflicts | Same prompt as 5, but bordered instead of shadowed, rad 8 instead of 12. |
| 14 | `.posts-grid__post` (magazine: hero 580 × 424, author avatar, name) | `app/ui/ProductList/Homepage/Blocks/MagazineBlockControl.latte`, `app/ui/Magazine/_postsGrid.latte` | — | **gap** | Editorial card: `not Mini*S — magazine post`. Closest: Promo Card. |
| 15 | `.point-of-interest__item` (386 × 134, image 134, title bold 16/24, two icon rows) | `app/ui/ProductList/Dashboard/Blocks/PoisBlockControl.latte` | — | **gap** | Horizontal place card: `not Mini*S — point of interest card`. |
| 16 | `.usps--homepage` (white, rad 12, padding 24 48, `typo-heading-xl` + 4 items) | `app/ui/_usps.latte` | — | **gap** | `not Mini*S — USP strip`. |
| 17 | `footer.layout-footer` › `.footer` (7 columns, bottom links, social, logo, legal text `typo-caption-xs`) | `app/ui/@layout.latte` | — | **gap** | `not Mini*S — site footer`. Dividers between footer rows are `#e3e4e6` borders: separators by role. |
| 18 | `.desktop-bottom-bar`, `.ai-chat-fab`, connection notification | — | — | left out | Floating chrome, not page content. |

### Per width

| | 375 (`2xs`) | 768 (`md`) | 1280 (`xl`) |
|---|---|---|---|
| Container padding | 8 | 16 | 32 (content 1176 in 1240) |
| Header | 52, no search | 64, search 220 | 64, search 300 |
| Promo grid | 4 cols, big tile 165 | 4 cols, big tile 243 | 4 cols, big tile 584 × 288 |
| Carousel card | 288 wide, scrolls | 288 | 272–288, 4 visible |
| POI card | 294 × 142 | 360 × 134 | 386 × 134 |
| Footer | columns stacked (916 tall) | 745 | 7 columns |

## Capture notes (method)

- Production's dark mode is a `dark-mode` class on `<body>` from the `DARK_MODE` cookie or the
  system preference (`UIPresenter.php`); `capture.js` 1.2+ removes it inside the iframe.
- Lazy blocks load on IntersectionObserver against the top-level viewport: `capture.js` 1.4
  scrolls an on-screen, invisible iframe through the page before measuring. Before that, six
  category carousels and the magazine were skeletons.
- Carousel cards sit ~14 levels deep; `MAX_DEPTH` is 18 since 1.3.1.
