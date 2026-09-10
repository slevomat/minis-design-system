---
id: 002
title: Deal Card and Promo Card components
status: draft
created: 2026-09-10
updated: 2026-09-10
owner: Lexislav
---

# 002 — Deal Card and Promo Card components

## ▶ Where we left off (2026-09-10) — start here

**State:** the API for all three components is drafted (see "Proposed API"), and **nothing is
built yet**. Work resumes with Phase 0.5 (`<minis-sale-label>`) once the items below are answered.

**Waiting on the owner — needed before building:**

1. **Approve the Proposed API** (sale label, price label, deal card) or say what to change.
2. **Question 9** — rename the label `Size` values in Figma `Small | Medium` → `sm | md`?
   (Recommended: yes.)
3. **Question 8** — a `stay-short` slot for the carousel "1 noc" text? (Recommended: yes.)

**Waiting on the owner — not blocking v1:**

4. **Question 4** — are the sale / price labels used elsewhere on the site? (Being checked.)
5. **Question 10** — the carousel container. Figma renamed card-grid `navigation-small` →
   `Carousel` (2026-09-10); the code side still needs a decision and probably its own plan (003).
   Blocks only the `usage="carousel"` stories.
6. **Question 11** — which file are the `_Sale Label` / `_Price Label` sources in (to read
   `Highlight`, `Reverse`, `Just …`)?

**Figma to-dos on the owner's side:** rename `Card usage` → `Usage`; remove the `Content` axis;
label `Size` values (question 9); Promo Card `Breakpoint` → container query + semantic colour.

**Has a recommendation, taken as the default unless the owner objects:** question 2 (400px
threshold), 5 (headline as slot or attribute), 6 (rename the `.deal-card` class in the
deal-detail docs), 7 (static countdown text in v1).

**Decided so far:** ship as beta and iterate · `usage="list | carousel"` · the card hides the
carousel rows itself · no `type` on the card — the label components carry that state · labels
are separate components · feature chips are `<minis-tag>` · no outer padding · container query
for density · 2:1 image.

## The problem

Two new components are designed in Figma (page `161:8120`, "↳ Banners, Cards"):

- **Deal Card** (`5495:768`) — promotes a Slevomat deal/product in listings and carousels.
- **Promo Card** (`5495:409`) — a banner that can take a Deal Card's slot in the same grid.

Both are already hand-built on production. The Figma file is a first iteration, and it is
**not a component spec — it is a snapshot of production DOM at four page widths.** Layer names are
production HTML classes (`article.product`, `a.product__link`, `::before`,
`span.__h2d-remove-before`), which points to an HTML-to-Figma import. That explains why values are
hardcoded and why the variant axes mirror the pages the snapshots were taken on, not how the
component should behave.

## Decision: ship first, iterate after — but get the API right up front

Agreed 2026-09-10. Production already runs these cards hand-built, so waiting for a perfect Figma
file costs more than it saves. We build the components now, label them **beta**, and fix the
visuals over the following weeks.

The dividing line is **API vs. visuals**:

- **Visuals** (colours, spacing, font sizes, token bindings) live inside the component. Fixing them
  later changes nothing for consumers → safe to ship imperfect.
- **API** (attribute names, variant values, slot structure) gets copied into every production
  template. A wrong API means every later fix is a breaking change → must be right in v1.

Code Connect absorbs the gap in the meantime: `figma.enum('Type', …)` can map one Figma value onto
several attributes, so Dev Mode shows correct code while Figma is still being cleaned up.

## Measured state (2026-09-10, Deal Card)

Read from the Figma file via the Plugin API. Nothing in the file was changed.

### The variant matrix

28 variants = `Content` (4) × `Type` (7).

- `Content`: `Desktop` · `Mobile` · `Carousel HP` · `Carousel Vypis`
- `Type`: `Default` · `Bundle` · `Sale` · `Sale Last Minute` · `Sale Firts Minute` ·
  `Sale Countdown` · `Sale Countdown Urgen` (typos are in the file)

### The four `Content` values are really two layouts

| | Desktop | Mobile | Carousel HP | Carousel Výpis |
|---|---|---|---|---|
| Frame width | 414 | 320 (**304 content + 8 + 8 root padding**) | 288 | 244 |
| Image | 2:1, radius 12 | 2:1, radius 8 | 2:1, top 12 / bottom 0 | 2:1, top 12 / bottom 0 |
| Card chrome | none | none | text box bordered, bottom radius 8 | same |
| Text padding / gap | 0 / 16 | 0 / 16 | 8 all sides / 12 | 8 all sides / 12 |
| Title | 18px `Heading/md` | 16px `Heading/sm` | 16px `Heading/sm` | 16px `Heading/sm` |
| Features row, "N varianty nabídky", distance line | yes | yes | — | — |
| Price unit | "1 noc / 2 os." | "1 noc / 2 os." | "1 noc" | "1 noc" |

Findings:

1. **Carousel HP and Carousel Výpis are identical** in every measured value; only the width
   differs. Different title wrapping and the "Be.." truncation are width effects. → one variant.
2. **Desktop and Mobile differ only in title size, image radius and the gutter.** → one variant +
   a container query on the card's own width.
3. **List vs. carousel is not a width effect.** The carousel card gains chrome and drops three
   content rows. At 304 vs 288px the two are 16px apart; a width threshold would flip a 300px
   carousel card into the list look. → an explicit attribute.
4. **The Mobile variants bake in the page gutter.** All 7 Mobile variants have `0 8 0 8` root
   padding; none of the other 21 do. As a result the sticky note's "Mobile výpis >320px" is
   measured *including* the gutter — the real card is 304px, which would fall into the "<320"
   tier. Media-query thinking inside what must be an element query.
5. **The image is 2:1 in every variant** → `aspect-ratio: 2 / 1`, no per-variant heights. (The
   inner `picture` layer is 207px tall everywhere and clipped — an import artefact.)
6. **Sticky notes disagree with the file on label sizes.** Notes say carousels use
   "sale label size: small / price label size: small"; in the file `_Sale Label` is identical in all
   four layouts (50px wide, 14px text). Likely a Figma limitation — responsive typography is weak
   there — so **the file is not a reliable source for label sizes; production is.**
   *Update 2026-09-10:* both library labels have a real `Size` = `Small | Medium` variant, so the
   notes describe an existing option — the carousel instances were simply left at `Medium`. In
   code, `carousel` usage sets the labels to `small`; confirm against production.
7. **Corner radii don't match inside the carousel card:** image top corners 12, bordered text box
   bottom corners 8.

### Variable bindings → code tokens

The card's own chrome is bound to variables. The raw values sit only in sub-elements that came in
with the import. Every value — bound or raw — already has a code token; nothing new is needed yet.

| Where | Figma | Code token |
|---|---|---|
| Carousel card border (`div.product__texts`) | bound `Color/Border/subtle` | `--color-border-subtle` |
| Price label border (`div.product__label`) | bound `Color/Feedback/info` | `--color-feedback-info` (via the price label component) |
| Title | `Heading/md` / `Heading/sm` text styles | `--typography-heading-md-*` / `-sm-*` |
| Meta text | `Caption/sm` text style | `--typography-size-sm` |
| Feature tags border (`a.tags__item`) | **raw** `#cbccce` (grey-80) | replaced by `<minis-tag>` clickable → `--color-interaction-secondary-border` |
| Feature tag labels | **raw** 14px, raw fill | replaced by `<minis-tag>` |
| Feature-scroll chevron ring | **raw** `#e3e4e6` (grey-90) | `--color-border-subtle` |
| "1 noc / 2 os." price unit | raw 14px semibold, fill bound `Color/Feedback/info` | part of the price label component |
| Image radius, Desktop & carousel | 12px | `--border-radius-lg` |
| Image radius, Mobile; carousel bottom | 8px | `--border-radius-md` |

Radii were not checked for variable bindings. Feature tags are 30px tall in Figma; `--tag-height`
is 32px.

### Promo Card (less investigated)

- `Breakpoint` axis (`Desktop` 414×316 / `Mobile` 320×306) — same problem as Deal Card's
  `Content`: should be a container query, not an attribute.
- Uses the primitive `Color/pink/pink-45` directly instead of a semantic token.
- Is 316px tall next to 457–518px Deal Cards, yet it is meant to take a Deal Card's slot.
- The headline ("Last minute pobyty se slevou") is **live text**, not part of the image — uppercase
  condensed brand type (Kensington / Bebas Neue fallback) with raw size and fill, no text style.
  In code it is text content in the brand font (`--typography-font-family-brand`,
  `--typography-brand-weight`, `text-transform: uppercase`).

## Constraints

- **Production must keep working.** Production already renders these cards hand-built. v1 matches
  current production pixels; visual changes come after, one at a time, so nothing moves on
  production by surprise.
- **v1 API is the target API.** No attribute may be named after a Figma axis we already know is
  wrong (`content="carousel-hp"`, `type="sale-countdown-urgent"`, `breakpoint="mobile"`).
- **The card owns no outer spacing.** Gutter and gap belong to the parent (`gap`,
  `--container-padding`, `<minis-card-grid>` / carousel track).
- **Container queries are hardcoded** from the `--breakpoint-*` scale with a comment — CSS custom
  properties cannot be used in `@container` conditions (see `CLAUDE.md`).
- **Figma ↔ code naming:** the attribute uses the Figma property's exact value strings.

## Approach

### Deal Card

```html
<minis-deal-card usage="list">…</minis-deal-card>      <!-- default -->
<minis-deal-card usage="carousel">…</minis-deal-card>
```

- **Card usage `list | carousel`** — decided 2026-09-10. Figma already has the property:
  `Card usage` = `list | carousel` (default `list`) on the Deal Card set. It carries the chrome and
  content-density choice (finding 3). Attribute: **`usage`** (decided 2026-09-10); the Figma
  property is renamed `Card usage` → `Usage` to keep the match one-to-one.
- **When to use which** (goes into the AI doc and Storybook, in these words):
  - `list` — general listings: search results, category pages, any vertical list of deals.
  - `carousel` — inside `<minis-card-grid>`. "Carousel" and "card grid" are the same thing here:
    Deal and Promo Cards are placed in card grids / the small navigation, and `<minis-card-grid>`
    is being renamed to *carousel* because that name is easier to understand. **Figma: done
    2026-09-10** (`navigation-small` → `Carousel`). Code: still `variant="navigation-small"` —
    renaming it is a breaking change to card-grid, tracked in question 10.
- **Rows hidden in `carousel`** — the component hides the features row, the "N varianty nabídky"
  line and the distance line itself (decided 2026-09-10), so production renders the same markup
  in every context.
- **Container query on the card's own width** — inside `list` only: title `Heading/md` → `Heading/sm`,
  image radius `lg` → `md` below the threshold (finding 2).
- **No root padding** (finding 4).
- **No `Type` in code.** Inspected 2026-09-10: every Deal Card `Type` is a pass-through of the
  library `_Sale Label` `Content` variant, plus `_Price Label` switching `Price` ↔ `Sale`. The card
  slots the two label components and owns none of their state:

  | Deal Card `Type` | `_Sale Label` `Content` | `_Price Label` `Content` | Example text |
  |---|---|---|---|
  | `Default` | `Sale` (empty — not shown) | `Price` | 5 960 Kč · 1 noc / 2 os. |
  | `Sale` | `Sale` | `Sale` | - 8 % · 2 190 Kč ~~2 390 Kč~~ |
  | `Sale Countdown` | `Sale Countdown` | `Sale` | Až 15 % · do 23. března |
  | `Sale Countdown Urgen` | `Sale Countdown Urgent` | `Sale` | Až 30 % · Koupit do 23:12:22 |
  | `Sale Last Minute` | `Sale Last Minute` | `Sale` | Až 7 % · Last minute |
  | `Sale Firts Minute` | `Sale First Minute` | `Sale` | Až 7 % · First minute |
  | `Bundle` | `Bundle` | `Price` | Výhodný balíček |

  All `_Price Label` instances in the card use `Size=Medium, Highlight=True, Reverse=False`.
- Feature tags are `<minis-tag>` instances, not a new chip.
- **Sale label and price label become their own components** (decided 2026-09-10). Deal Card
  composes them. Whether they are reused elsewhere on the site is being checked (question 4) — it
  decides their API breadth and Storybook placement, not whether they exist.

Figma follows the same model: `Card usage` (`list`, `carousel`) replaces `Content`, carousels
merged, Desktop/Mobile collapsed, `Type` split into boolean / instance props.

### Promo Card

- Container query instead of `Breakpoint`.
- Semantic surface token instead of `pink-45`.
- Stretches to the grid row height when placed next to Deal Cards; the image fills.

### Why not the alternatives

- **Port the Figma variants as-is** (`content` × `type` attributes) — fastest, but every
  later cleanup renames attribute values in production templates.
- **Fix Figma fully before writing code** — blocks on a design iteration while production
  keeps running hand-built, untokenised cards.
- **Drive list vs. carousel purely by container width** — the two layouts overlap in width
  (304 vs 288px); the chrome difference is contextual, not a function of size.
- **`placement="list | carousel"`** — `placement` already means dropdown alignment
  (`start | end`) on `<minis-menu>`; reusing it with a different meaning confuses people and agents.

## Proposed API — for approval (drafted 2026-09-10)

Derived from the Figma instances inside the Deal Card. It covers only what the card uses;
everything else is additive later (non-breaking). Nothing here is built yet.

### `<minis-sale-label>`

```html
<minis-sale-label>- 8 %</minis-sale-label>
<minis-sale-label>Výhodný balíček</minis-sale-label>
<minis-sale-label>Až 7 %<span slot="detail">Last minute</span></minis-sale-label>
<minis-sale-label>
  Až 30 %
  <span slot="detail">Koupit do 23:12:22 <minis-icon name="circle-info-fill" size="16"></minis-icon></span>
</minis-sale-label>
```

| API | Values | Figma |
|---|---|---|
| `size` | `sm \| md` (default `md`) | `Size` = `Small \| Medium` — see question 9 |
| default slot | main segment (filled) | discount / bundle text |
| `detail` slot | second segment (outlined); empty → single segment | countdown / urgent / last- / first-minute text |

- Figma `Content` (6 values) maps to **which slots are filled**, not to an attribute — Code Connect
  translates. In Figma, `Sale Countdown` and `Sale Countdown Urgent` differ only in their text.
- Tokens (from the bound variables): main surface `--color-feedback-warning`, text
  `--color-text-primary`; detail surface `--color-surface-primary` with a 1px
  `--color-feedback-warning` border; radius `--border-radius-md` on the outer corners only;
  padding 6px / 8px; 14px `--typography-weight-semibold` (no text style in Figma). Component
  tokens `--sale-label-*` get logged when built.

### `<minis-price-label>`

```html
<minis-price-label>5 960 Kč<span slot="stay">1 noc / 2 os.</span></minis-price-label>
<minis-price-label>
  2 190 Kč
  <s slot="original">2 390 Kč</s>
  <span slot="stay">1 noc / 2 os. <minis-icon name="circle-info-fill" size="16"></minis-icon></span>
</minis-price-label>
```

| API | Values | Figma |
|---|---|---|
| `size` | `sm \| md` (default `md`) | `Size` = `Medium \| Small` — see question 9 |
| default slot | current price, `Heading/sm` | `Price` text |
| `original` slot | struck-through original price, 14px regular; filled → sale look | `Content` `Price` ↔ `Sale` |
| `stay` slot | outlined segment: stay configuration + optional icon; empty → price only | `Just Price` / `Just Sale` |

- `Highlight` and `Reverse` are **not in v1** — the card only uses `Highlight=True, Reverse=False`,
  and what the others look like is unknown (question 11).
- Tokens: price segment surface `--color-feedback-info`, text `--color-interaction-primary-accent`;
  stay segment surface `--color-surface-primary`, 1px border and text `--color-feedback-info`.
- Accessibility: the original price goes in `<s>`, plus visually hidden context ("původní cena"),
  because a strikethrough alone is not announced.

### `<minis-deal-card>`

```html
<minis-deal-card usage="list" href="/deal/123">
  <img slot="image" src="…" alt="…">
  <minis-tag slot="action" variant="toggle" icon-only in-color aria-label="Přidat do oblíbených">…</minis-tag>
  <span slot="title">Luxusní apartmány v Beskydech až pro 6 osob</span>
  <span slot="variants">3 varianty nabídky</span>
  <span slot="rating">…</span>
  <minis-sale-label slot="labels">…</minis-sale-label>
  <minis-price-label slot="labels">…</minis-price-label>
  <span slot="provider">Apartmány Domovjanka</span>
  <span slot="location">Beskydy</span>
  <span slot="distance">cca 50 km / 45 min</span>
  <minis-tag slot="features" variant="clickable">Platba na zálohu</minis-tag>
</minis-deal-card>
```

| API | Values | Notes |
|---|---|---|
| `usage` | `list \| carousel` (default `list`) | Figma `Usage` |
| `href` | URL | The card renders one `<a>` around image + texts — matches the Figma/production structure (`a.product__link`). |
| slots | `image`, `action`, `title`, `variants`, `rating`, `labels`, `provider`, `location`, `distance`, `features` | |

- **`action` and `features` sit outside the link** — interactive elements can't be nested in an
  `<a>`. Figma has the same structure: the features row is a sibling of `a.product__link`.
- **`carousel`** hides `variants`, `distance` and `features`, adds the border + inset text, and
  sets `size="sm"` on the slotted labels. It pushes the value down the same way
  `<minis-accordion>` pushes `size` to its items.
- **`list`** has a container query on the card's own width: title `Heading/md` → `Heading/sm`, and
  image radius `--border-radius-lg` → `--border-radius-md` below the threshold (question 2).
- No `type`, no `size`. The image is `aspect-ratio: 2 / 1`.
- The favourite button is proposed as `<minis-tag variant="toggle" icon-only in-color>`. The Figma
  button is a white 32px circle over the photo, so check visually before relying on it.

## Phases

### Phase 0 — Verify against production (no code)

- [ ] Real label sizes (sale label, price label) per layout — the Figma file can't be trusted here.
- [ ] Real width threshold between list-desktop and list-mobile, measured on the card.
- [ ] Which rows production hides in carousels, and whether they are omitted or CSS-hidden.
- [x] Inspect every `Type` in detail — done 2026-09-10: `Type` is a pass-through of the label
      components, see Approach → "No `Type` in code".
- [ ] Does production already name these variants/states? Prefer its names where sane.

### Phase 0.5 — Sale label and price label (beta)

Deal Card composes these, so they land first. Each gets the full file set (`.ts`, `.styles.ts`,
`.stories.ts`, `.figma.ts`), an `index.ts` export, an AI doc, and changelog entries.

- [x] Collect every state — they already exist as Figma library components (2026-09-10):
      - `_Sale Label` (set key `f4f4aa0a806ae7627e31dc762ad600de80961604`, 12 variants):
        `Content` = `Sale | Sale Countdown | Sale Countdown Urgent | Sale Last Minute |
        Sale First Minute | Bundle`, `Size` = `Small | Medium`, one TEXT prop per content.
      - `_Price Label` (set key `d2695423a6ccb27b8ef2379364dba3477e7d51f6`, 15 variants):
        `Content` = `Price | Sale | Just Price | Just Sale`, `Size` = `Medium | Small`,
        `Highlight` = `True | False`, `Reverse` = `False | True`; TEXT props `Price`,
        `Original price`, `Stay configuration`.
- [ ] API proposal for `<minis-sale-label>` and `<minis-price-label>` — drafted 2026-09-10 (see
      "Proposed API"), awaiting approval.
- [x] Check for overlap with `<minis-badge>` / `<minis-tag>` — none. Badge is a decorative seal;
      tag is a single-segment pill. Neither has two segments or a price layout.
- [ ] Figma: the labels are `_`-prefixed. Decide whether that stays once they are reused outside
      the card (question 4).

### Phase 1 — Deal Card v1 (beta)

- [ ] `deal-card.ts`, `deal-card.styles.ts`, `deal-card.stories.ts`, `deal-card.figma.ts`.
- [ ] Export from `packages/components/src/index.ts` — same commit as the component directory.
- [ ] `docs/ai-prompts/components/deal-card.md`, listed in `CLAUDE.md` and `docs/ai-prompts/index.md`.
- [ ] Stories: `list` and `carousel`, a resizable container demo, inside `<minis-card-grid>` and a
      carousel track. Container-query stories use `layout: 'fullscreen'`.
- [ ] Beta label in Storybook, the AI doc, and the changelog entry.
- [ ] `CHANGELOG.md` + Storybook Changelog story.

### Phase 2 — Promo Card v1 (beta)

- [ ] Same file set and docs as Phase 1.
- [ ] Story showing a Promo Card in a row of Deal Cards, both variants.

### Phase 3 — Figma cleanup (parallel, does not block code)

- [x] `Card usage` property added (`list | carousel`, default `list`) — 2026-09-10.
- [ ] Rename `Card usage` → `Usage` (matches the `usage` attribute).
- [ ] Remove the `Content` axis — it now duplicates `Card usage` (Carousel HP / Výpis always
      pair with `carousel`, Desktop / Mobile with `list`); merge the two carousels. Brings the set
      from 28 variants down to 14 before `Type` is split.
- [ ] Remove Desktop/Mobile from the variant set; document the container-query behaviour instead.
- [ ] Remove the 8px root padding from Mobile.
- [ ] Split `Type` into props; fix "Firts" / "Urgen".
- [ ] Bind the unbound text and colour values listed above.
- [ ] Promo Card: drop `Breakpoint`, replace `pink-45` with a semantic token.
- [ ] Fill in the `xxx` placeholders in the doc frames.
- [ ] Update `.figma.ts` mappings to the cleaned-up props.

### Phase 4 — Visual iteration

- [ ] Align carousel radii (12 top vs 8 bottom).
- [ ] Feature tag height 30px vs `--tag-height` 32px.
- [ ] Feature row that scrolls sideways inside the card, with a chevron button — keep, wrap, or truncate?
- [ ] Label sizes per Phase 0 findings.

### Phase 5 — Out of beta

- [ ] Remove beta labels once the API has survived Phase 4 without a breaking change.

## Open questions

1. ~~**Attribute name for Card usage.**~~ *Answered 2026-09-10:* `usage="list | carousel"`; the
   Figma property is renamed `Card usage` → `Usage`.
2. **List threshold.** The sticky note says 400px. The spacing tokens step at 408px. Use 400, or
   snap to the breakpoint scale? Either works for current widths (304 vs 414).
3. ~~**Hidden rows in `carousel`**~~ *Answered 2026-09-10:* the component hides them itself.
4. **Are the sale and price labels used elsewhere on the site?** *Partly answered 2026-09-10:*
   they will be separate components either way. Being checked with production (owner: Lexislav).
   If yes → general-purpose API, own Storybook section. If card-only → narrow API, documented
   under Deal Card. A hint: the Slevomat team library already has a `global/sale-percentages`
   component (2024), which suggests production already shows sale percentages outside the cards.
5. ~~**Promo Card headline** — live text or part of the image?~~ *Answered 2026-09-10:* live text
   in Figma. Remaining: slot or attribute? A slot allows line breaks and markup; an attribute keeps
   the brand styling locked.
6. **Naming collision:** `docs/ai-prompts/layouts/deal-detail.md` and the create-minis template use
   a `.deal-card` CSS class for *section panels on the deal detail page* — a different concept.
   Rename that class (e.g. `.deal-section`) before `<minis-deal-card>` ships, so agents don't
   conflate them?
7. **Does the urgent countdown tick?** "Koupit do 23:12:22" looks like a live timer. Does
   `<minis-sale-label>` run the countdown itself (needs an end-time attribute), or does it show
   whatever text it is given? *Recommendation:* static text in v1. Adding an end-time attribute
   later is non-breaking.
8. **Short stay text in carousel.** The carousel price label shows "1 noc" where the list shows
   "1 noc / 2 os.". A component can't shorten text, and "same markup everywhere" (question 3)
   rules out the page sending different text. *Recommendation:* a second slot `stay-short`; the
   price label shows it at `size="sm"`, falling back to `stay`.
9. **Label `Size` values are full words in Figma** (`Small | Medium`), while every other
   component uses `sm | md`. The `CLAUDE.md` rule says the attribute uses the Figma string, which
   would give `size="Small"`. *Recommendation:* rename the Figma values to `sm | md`.
10. **`<minis-card-grid>` can't hold Deal Cards today.** Every variant has a fixed height
    (`navigation-small` = 296px for 2 rows, i.e. ~144px per row) and square 172px cells on mobile,
    and it paints a faded background behind each slot — it was built for image tiles. Carousel
    Deal Cards are 244–288px wide and 286–349px tall. `usage="carousel"` needs a container with
    content height and a horizontal scroll track: a new card-grid mode, or the carousel rename
    turned into its own component. Needs a decision, probably its own plan, before the Deal Card
    carousel stories can be real.
    *Update 2026-09-10:* Figma renamed the card-grid `navigation-small` variant to `Carousel`.
    Follow-ups on the code side (none started):
    - rename `variant="navigation-small"` → `variant="carousel"` in `<minis-card-grid>`. This is
      breaking: changelog entry, AI doc, stories, `.figma.ts` mapping. Decide whether the old
      value stays as a deprecated alias;
    - give the carousel variant content height and a horizontal scroll track with a fixed card
      width (244 / 288px from the Deal Card carousel sizes), and no faded slot background behind
      cards;
    - update `docs/ai-prompts/components/card-grid.md` and the Deal Card "when to use" wording to
      say `<minis-card-grid variant="carousel">`.
    - **The Figma link in `card-grid.md` is dead** — node `3583:12247` no longer exists (checked
      2026-09-10), so the rename above comes from the owner and hasn't been checked in the file yet.
      Find the current Card grid component set, fix the link, and check the new variant names
      before touching `card-grid.figma.ts`.
11. **What do `_Price Label` `Highlight`, `Reverse` and `Just Price` / `Just Sale` look like, and
    which file are the label sources in?** They are unpublished (`_` prefix), so they can't be
    imported by key or found through library search. Not needed for v1.
