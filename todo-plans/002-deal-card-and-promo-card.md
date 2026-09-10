---
id: 002
title: Deal Card and Promo Card components
status: draft
created: 2026-09-10
updated: 2026-09-10
owner: Lexislav
---

# 002 — Deal Card and Promo Card components

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
<minis-deal-card variant="list">…</minis-deal-card>      <!-- default -->
<minis-deal-card variant="carousel">…</minis-deal-card>
```

- **`variant="list | carousel"`** — the chrome and content-density choice (finding 3). Replaces
  `Content`. Name still open — see question 1.
- **Container query on the card's own width** — inside `list` only: title `Heading/md` → `Heading/sm`,
  image radius `lg` → `md` below the threshold (finding 2).
- **No root padding** (finding 4).
- **`Type` decomposed into composable pieces** rather than one enum: discount label, countdown
  (with an urgent state), last/first-minute marker, bundle. Exact decomposition to be confirmed
  in Phase 0 — only `Default` and `Sale` were inspected in detail.
- Feature tags are `<minis-tag>` instances, not a new chip.
- **Sale label and price label become their own components** (decided 2026-09-10). Deal Card
  composes them. Whether they are reused elsewhere on the site is being checked (question 4) — it
  decides their API breadth and Storybook placement, not whether they exist.

Figma follows the same model: `Content` → `Variant` (`List`, `Carousel`), carousels merged,
Desktop/Mobile collapsed, `Type` split into boolean / instance props.

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

## Phases

### Phase 0 — Verify against production (no code)

- [ ] Real label sizes (sale label, price label) per layout — the Figma file can't be trusted here.
- [ ] Real width threshold between list-desktop and list-mobile, measured on the card.
- [ ] Which rows production hides in carousels, and whether they are omitted or CSS-hidden.
- [ ] Inspect every `Type` in detail (Bundle, Last/First Minute, Countdown, Countdown Urgent) and
      write down the composable pieces.
- [ ] Does production already name these variants/states? Prefer its names where sane.

### Phase 0.5 — Sale label and price label (beta)

Deal Card composes these, so they land first. Each gets the full file set (`.ts`, `.styles.ts`,
`.stories.ts`, `.figma.ts`), an `index.ts` export, an AI doc, and changelog entries.

- [ ] Collect every variant from the Deal Card `Type`s (discount "- 8 %", "Až 30 %", countdown
      "Koupit do 23:12:22", urgent state, price with strikethrough + unit).
- [ ] Check for overlap with `<minis-badge>` / `<minis-tag>` before creating new tags.
- [ ] Figma: publish them as standalone components the Deal Card instances.

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

- [ ] `Content` → `Variant` (`List`, `Carousel`); merge the two carousels.
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

1. **Attribute name for list/carousel.** `variant` (recommended — matches
   `<minis-navigation variant="main-nav | tabs">` and the `CLAUDE.md` Figma `Variant` → `variant`
   rule) or `layout`? `placement` is ruled out (taken by `<minis-menu>`). Values `list | carousel`
   are agreed.
2. **List threshold.** The sticky note says 400px. The spacing tokens step at 408px. Use 400, or
   snap to the breakpoint scale? Either works for current widths (304 vs 414).
3. **Hidden rows in `carousel`** — does the component hide the features / variants / distance
   slots itself, or do consumers simply not pass them?
4. **Are the sale and price labels used elsewhere on the site?** *Partly answered 2026-09-10:*
   they will be separate components either way. Being checked with production (owner: Lexislav).
   If yes → general-purpose API, own Storybook section. If card-only → narrow API, documented
   under Deal Card.
5. ~~**Promo Card headline** — live text or part of the image?~~ *Answered 2026-09-10:* live text
   in Figma. Remaining: slot or attribute? A slot allows line breaks and markup; an attribute keeps
   the brand styling locked.
6. **Naming collision:** `docs/ai-prompts/layouts/deal-detail.md` and the create-minis template use
   a `.deal-card` CSS class for *section panels on the deal detail page* — a different concept.
   Rename that class (e.g. `.deal-section`) before `<minis-deal-card>` ships, so agents don't
   conflate them?
