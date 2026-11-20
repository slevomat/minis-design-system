# Layouts — Production Reference (slevomat.cz)

How page layout is **actually built** on the Slevomat production site, measured on 2026-11-13, and
how it compares with the Mini*S layout tokens and guides. This is reference material for writing
Mini*S layout guides. It is not a recipe in itself.

The page has three parts, and they are kept apart on purpose:

1. **[Observed in production](#1-observed-in-production)**: facts from the production repo and the
   live site. Nothing in this part is a recommendation.
2. **[Compared with Mini*S](#2-compared-with-minis)**: where the Mini*S tokens and guides match
   production and where they differ.
3. **[Recommendations and open questions](#3-recommendations-and-open-questions)**: proposals for
   the Mini*S layout guides. Only open question 2 (container padding) is decided so far.

The method and its limits are at the end, in [Evidence and method](#4-evidence-and-method).

**Visual summary in Figma:** the findings are drawn to scale on the
[Production layouts: slevomat.cz](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=6255-1204)
report card, on the Layouts page of the Mini*S file.

---

## 1. Observed in production

### 1.1 Breakpoints

Production breakpoints (`app/stylus/plugins/media-queries.styl`, mirrored in `app/js/dom/device.ts`).
All are `min-width`:

| Mixin | Width |
|---|---|
| `+mobile-small()` | 360px |
| `+mobile()` | 408px |
| `+tablet()` | 600px |
| `+tablet-wide()` | 768px |
| `+desktop()` | 1008px |
| `+desktop-wide()` | 1256px |
| `+desktop-extra-wide()` | 1480px |

### 1.2 Layout primitives in the code

Class usage in all Latte templates under `app/ui` (production commit `bb1847f86e4`, counted as
class tokens in `class="…"` / `n:class="…"`):

| Primitive | Uses | Files | Definition |
|---|---|---|---|
| `grid-wrap` | 424 | 245 | width 100%, **max 1008px**, side padding 8px → 16px (408px+) → 32px (1008px+) |
| `grid-wrap--wide` | 253 | 158 | raises the max width to **1240px** |
| `grid` | 114 | 99 | row of grid items (csswizardry grids: `inline-block` items, gutter as `padding-left`, the row cancels it with a negative margin) |
| `grid__item` | 205 | 101 | 100% wide by default |
| `desktop--one-half` | 76 | 47 | 50% from 1008px |
| `desktop--one-third` | 56 | 33 | 33.3% from 1008px |
| `desktop--two-thirds` | 28 | 28 | 66.6% from 1008px |
| `grid--center` / `grid--rev` | 11 / 1 | 7 / 1 | centred / reversed row |
| `flex-wrapper` | 64 | 63 | max 1240px, 0 padding below 1008px, 32px and `display: flex` from 1008px |
| `flex-wrapper--reverse` / `--wide` | 20 / 19 | 20 / 19 | reversed row / block between 1008 and 1255px |
| `layout-wrapper` | 53 | 44 | **no side padding below 1008px**; from 1008px max 1008px + 32px, from 1256px max 1240px |
| `layout-wrapper--wide` | 43 | 36 | full width from 1008px |
| `homepage-layout` | 18 | 18 | positioning wrapper for page bands |
| `full-width-container` | 5 | 5 | full-bleed background band |

What the code shows:

- **The public site exposes only ½, ⅓ and ⅔ column classes.** The frontend bundle
  (`index-frontend.styl`) loads `_simple-grid.styl`. Quarter widths exist only as Stylus
  placeholders: the cart extends `$desktop--three-quarters`.
- **The 12-column CSS grid (`_real-grid.styl`) is not on the public site.** Only the admin
  (`index-admin.styl`) and partner (`index-partner.styl`) bundles load it.
- **There are three overlapping container systems**: `grid-wrap`, `flex-wrapper` and
  `layout-wrapper`. They differ in their padding rules.

### 1.3 What the live site renders

Measured on www.slevomat.cz at 375, 768, 1280 and 1500px viewport width. The pages were the
homepage, a category listing (`/praha/restaurace-bary/burger`), a deal detail, the magazine, the
login page and the cart (with one item in it).

#### Containers

| Container | 375 | 768 | 1280 / 1500 | Seen on |
|---|---|---|---|---|
| `grid-wrap grid-wrap--wide`: **wide** | full width, 8px padding | full width, 16px padding | **1240px**, 32px padding (1176px content) | every page, for all page content |
| `grid-wrap` without `--wide`: **narrow** | 8px | 16px | **1008px**, 32px padding (944px content) | login, cart |
| `flex-wrapper` (4 per page) | 0 padding | 0 padding | 1240px, 32px, `display: flex` | **site chrome only**: header, horizontal navigation, flash messages, user menu |
| `layout-wrapper` | — | — | — | **not on any measured page** |

- Containers almost never sit inside each other. The only nesting seen was on the category page,
  where `grid-wrap` sits inside the full-bleed bands `homepage-layout` and `full-width-container`.

#### The cart: a narrow container plus a reading column

| Viewport | `.cart-wrapper.grid-wrap` | `.cart-content` |
|---|---|---|
| 375 | full width, 8px padding | full width, with an 8px left gutter |
| 768 | full width, 16px padding | **704px**, centred |
| 1280 | **1008px**, 32px padding | 704px, centred |
| 1500 | 1008px, 32px padding | 704px, centred |

- `.cart-content` has `max-width: 704px` (`app/stylus/cart.styl`) and is an `inline-block` grid
  item. Its gutter is padding (8px on mobile, 16px from 1008px). **On desktop the usable text width
  is about 688px.**
- The cart is a single column at every width, with no sidebar.
- The cart page also hides the footer link columns (`.footer__columns { display: none }`).

#### Main + sidebar: each component does its own split

None of the `grid__item` or `desktop--*` column classes rendered on the measured pages. Each page
component splits its own content with flexbox. Widths at 1280px, inside a 1176px content box:

| Page | Main | Sidebar | Ratio | Gap (derived) | Sidebar side |
|---|---|---|---|---|---|
| Deal detail (`rf-product-detail__tab`) | `__main` 779px | `__sidebar` 357px | ~2.2 : 1 | ~40px | right |
| Category (`flex-wrapper`) | `main-content` 844px | `filters` 300px | ~2.8 : 1 | ~32px | right |
| Magazine (`magazine__content-container`) | `magazine__content` 864px | `magazine__sidebar` 288px | 3 : 1 | ~24px | right |

The gap is 1176px minus the two measured widths. It was not read from a `gap` property, because
none of these rows sets one.

On mobile all three stack into a single column.

#### CSS grid: only inside components

`display: grid` with two or more columns appears only inside components, never as a page grid:

| Component | Columns | Gap |
|---|---|---|
| `products` (category listing cards) | 2 at 1280px | 16px |
| `dashboard-matrix` (homepage tiles) | 5 / 3 on mobile, 4 on desktop | 8px |
| `posts-grid` (homepage magazine teasers) | 3 | 8px |
| `sliding-gallery__items` (deal gallery) | 3 | 4px |
| `user-navigation__grid` (user menu) | 2 | 8px |

### 1.4 The layout model production uses

Taken together, production uses three width levels:

1. **Wide container**, 1240px max, side padding 8 / 16 / 32px. Used for browsing pages: the
   homepage, listings, deal detail and the magazine.
2. **Narrow container**, 1008px max, the same padding. Used for task pages: the cart and login,
   and probably the rest of checkout.
3. **Reading/form column**, about 700px (704px box, about 688px usable), centred inside the
   narrow container. Seen in the cart.

Inside the wide container, two-column pages put a **main column and a right sidebar** side by side
from 1008px up. The ratio (2:1 to 3:1) and the gap (24–40px) vary from component to component.

---

## 2. Compared with Mini*S

The Mini*S values come from `packages/tokens/src/tokens.css`, `<minis-container>`
(`container.styles.ts`) and the existing guides ([index](./index.md),
[Deal Detail](./deal-detail.md), [Checkout](./checkout.md)).

| Topic | Production | Mini*S | Verdict |
|---|---|---|---|
| Breakpoints | 360 / 408 / 600 / 768 / 1008 / 1256 / 1480 | `--breakpoint-2xs` … `-2xl` = 360 / 408 / 600 / 768 / 1008 / 1256 / 1480 (+ 1920, 2560) | **Same scale** |
| Wide container width | max 1240px | `--container-width`: 100% → 1240px at 1256px | **Same in practice** (production caps at a 1240px viewport, Mini*S at 1256px, so they differ only in a 16px band) |
| Container padding | 8 → 16 (408px) → **32 (1008px)** | `--container-padding`: 8 → 16 (408px) → **32 (1008px)** | **Same** since 2026-11-20 (Mini*S reached 32px only at 1256px before) |
| Narrow container | **1008px** box (944px content at 32px padding) | `--container-narrow-width` **752px** from 768px (720px content at 16px, 688px at 32px) | **Different level.** Mini*S "narrow" is production's *reading column*, not its narrow container |
| Reading/form column | 704px box, ~688px text | Mini*S narrow from 1008px: 752 − 2×32 = **688px** content | **Matches from 1008px**; at 768–1007px Mini*S gives 720px |
| Page column system | ½ ⅓ ⅔ (¼ ¾ as placeholders), no 12-col grid on the public site | Guides prescribe a 12-column CSS grid | **Differs** |
| Main + sidebar | Flex per component, ratio 2.2 : 1 to 3 : 1, gap 24–40px, sidebar on the right | Deal Detail: 8 + 4 columns (2 : 1), gap `--spacing-layout-xl` = 48px from 408px, aside on the right | **Same idea, different numbers.** Mini*S's 48px is wider than any production gap |
| Grids inside components | CSS grid, 4–16px gaps | `<minis-card-grid>` with container queries | **Same idea** |
| Checkout | Narrow 1008px container + 704px column | [Checkout](./checkout.md): `<minis-container variant="narrow">` (752px) | Mini*S has **one level where production has two** |

There were two mismatches worth knowing about before writing guides. The first is now fixed.

- **The 1008–1255px band (fixed 2026-11-20).** Production switches to desktop layouts, including
  32px padding and side-by-side columns, at 1008px. Mini*S kept 16px padding until 1256px; its
  container padding now also reaches 32px at 1008px. Side-by-side columns are still open
  question 4.
- **What "narrow" means.** Mini*S `variant="narrow"` is close to production's 704px
  reading/form column, and production's 1008px narrow container has no Mini*S counterpart. A
  checkout built with `variant="narrow"` matches the cart's text column, but anything production
  puts in the 1008px box outside that column (the step header and the full-width messages, for
  example) gets narrower.

---

## 3. Recommendations and open questions

These are **proposals for the Mini*S layout guides**. They describe what Mini*S could document or
change. They are not production facts, and nothing here is decided.

### Proposals

1. **Document the three-level model**: wide container, narrow container, reading/form column. It
   is how production is built, and it gives designers a simple choice: browsing page, task page,
   or text/form.
2. **One main + sidebar rule** in place of today's per-component ratios. A candidate is 2 : 1
   (8 + 4 of 12, or simply `2fr 1fr`) with the sidebar on the right, stacking below 1008px, and
   one gap token. Production's measured range (2.2 : 1 to 3 : 1, 24–40px) is the evidence; the
   decision is a design call.
3. **Present the 12-column grid as an optional tool, not the page system.** Production pages need
   only a main + sidebar split and a few fractions (½, ⅓, ⅔, ¾). Card and tile grids belong inside
   components (`<minis-card-grid>`).
4. **Don't document `flex-wrapper` or `layout-wrapper` as patterns.** In production,
   `flex-wrapper` carries only the site chrome, which Mini*S covers with `<minis-topbar>` and
   `<minis-navigation>`, and `layout-wrapper` didn't render on any measured page.

### Open questions for the layout guide

1. **Should Mini*S standardise the sidebar ratio and the gap?** If so, which ratio (2 : 1, 3 : 1,
   or a fixed sidebar width such as 300–360px) and which gap token? Today's Deal Detail guide uses
   `--spacing-layout-xl` (48px), wider than any measured production gap (24–40px).
2. ~~**Should Mini*S container padding reach 32px at 1008px, like production**, or stay at 1256px?~~
   **Resolved 2026-11-20: yes.** `--container-padding` and `--container-narrow-padding` are 32px
   from 1008px (Figma Layout mode `lg`), logged in `CHANGELOG.md`.
3. **Does Mini*S need a 1008px container level?** For example, a third `<minis-container>`
   variant, or renaming today's `narrow` (752px) to something like `reading`, with a new `narrow`
   at 1008px. Renaming is an API change for `<minis-container>`.
4. **Should the main + sidebar split switch at 1008px (production) or 768px?** The Deal Detail
   guide stacks below 768px, so between 768 and 1007px it shows two columns where production shows
   one.
5. **Are pages behind login (user account, checkout steps after the cart) built the same way?**
   They weren't measured. `layout-wrapper` (96 uses in the code) is most likely there.

---

## 4. Evidence and method

- **Date:** 2026-11-13. **Production code:** `../slevomat` at `bb1847f86e4` (2026-11-06),
  read-only.
- **Code counts:** a Python scan of every `*.latte` under `app/ui` that splits `class="…"` and
  `n:class="…"` values into tokens and counts exact class names. Dynamic classes built in PHP or
  JS are not counted.
- **Live measurements:** taken in a logged-out desktop Chrome. Each page was loaded into hidden,
  same-origin `<iframe>`s of fixed width (375 / 768 / 1280 / 1500px) on www.slevomat.cz, and
  `getBoundingClientRect()` plus `getComputedStyle()` (max-width, padding, display, gap) were read
  for the container classes, every `display: grid` element with 2+ columns, and every row with
  two or more large children (> 200px wide). The reusable method is recorded in
  `todo-plans/017-production-reference-audit.md`.
- **Pages measured:** homepage, category listing, deal detail
  (`/akce/2466560-3hod-plavba-jachtou-s-kapitanem-v-praze-ci-na-orliku`), magazine, login, and
  the cart with one item (an empty cart shows a different template).

**Limits:**

- Five page types plus the cart. Pages behind login, other checkout steps, travel and partner
  pages were not measured.
- The 375px frames reported widths of 364px because the test frame showed an 11px classic
  scrollbar. On a phone the container is the full 375px.
- Live results reflect the A/B tests and campaign state of that day, for a logged-out visitor.
- The gaps in 1.3 are derived from widths, not read from a CSS `gap` value.

---

**Last updated:** 2026-11-20
