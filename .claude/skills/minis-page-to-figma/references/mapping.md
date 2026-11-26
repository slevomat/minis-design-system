# Mapping rules — pass 2

How a captured production block becomes a Mini*S component, a token-built frame or a gap, and
how a captured value becomes a Mini*S variable, a conflict or "no token". The pilot run on the
homepage (2026-11-26) is the worked example; its table is in the run folder
(`audits/page-to-figma/2026-11-26-homepage/mapping.md`).

**Never guess a name.** Component names come from the Figma inventory below (verified
2026-11-26) and `docs/ai-prompts/components/*.md`; variable names from the Figma file or
`tokens.css`. If something here fails to resolve, look it up by name and fix this file.

## 1. Blocks → components

A block is matched **by role, not by values** (owner, 2026-11-26): a production button with
another radius is a Mini*S Button plus a conflict note. It is a **gap** only when no Mini*S
component plays that role, or the role needs a variant Mini*S doesn't have (then: closest
component + "missing variant").

Decide in this order and stop at the first hit:

1. **Site chrome.** Header with logo/search/user actions → `TopBar` (`Property 1=web`). The
   category bar under it → `Navigation` (`Variant=main nav`). These two are mandatory on every
   Slevomat page (CLAUDE.md, vibe-coding rule), so they're always instances even when production's
   differ.
2. **Class → component table** (below). Production class names are stable; trust them over looks.
3. **Role by structure**, when no class matches: a pill-shaped link/label → `tag`; a row of icon +
   label shortcuts in a grid → `Tile` in `card grid/navigation`; a dismissible notice → `alert` or
   `Message`; a card with photo, title, price → `Deal Card`.
4. **Token-built frame.** A layout wrapper with no component role (a section band, a row, a
   heading above a carousel): auto-layout frame, every fill, gap, padding, radius and text bound or
   styled. Not a gap — layout is supposed to be built from tokens.
5. **Gap.** Anything left that has a component role Mini*S doesn't cover (footer, USP strip,
   search banner…). Built from tokens like 4, named `not Mini*S — <what it is>`.

### Class → component (production `../slevomat` @ `bb1847f86e4` → Figma MiniS DS)

| Production (class / partial) | Mini*S component (Figma name, set id) | Properties to set |
|---|---|---|
| `header`, `.header` chrome in `flex-wrapper` | `TopBar` `5156:9287` | `Property 1=web` |
| horizontal category navigation (`.main-navigation*`, `.simple-nav*`) | `Navigation` `5226:5557` (+ `Navigation-item` `3470:607`) | `Variant=main nav` |
| `.button` | `Button` `284:5283` | see Button table |
| `.tags__item` (`_tags.styl`) | `tag` `2523:339` | `Variant=Clickable`, `State=Default` |
| toggle filter tags | `tag/toggle` `3805:1161` | |
| `.product-card`, `products-carousel` items | `Deal Card` `5495:768` | `Card usage=carousel` + `Content=Carousel HP` on the homepage, `list` + `Desktop`/`Mobile` on listings |
| promo/branding tiles, magazine teasers with photo | `Promo Card` `5495:409` | `Breakpoint=Desktop|Mobile` |
| `.dashboard-matrix` icon tiles | `Tile` `4208:4618` inside `card grid/navigation` `3729:5817` | `breakpoint` per width |
| hero / campaign band with headline + controls | `PageHeader` `4642:396` | `Layout`, `Theme`, `Breakpoint` |
| `.messages`, flash messages | `alert` `1751:351` / `Message/Message standalone` `2517:9568` | |
| `.harmonica` (accordion) | `accordion` `5136:9716` / `accordion-item` `4984:9556` | `Size=default` |
| counters in pills | `Pill_counter` `688:2895` | |
| `.checkbox` inputs | `checkbox` `4192:5150` | |
| horizontal rules / list dividers | `separator` `4987:147` | |
| filter rows in a side panel | `ActionRow` `4202:3867` | |

Not in Mini*S today (always a gap if met): site footer, USP strip (`.usps`), search banner /
locality picker, rating stars, price block outside a Deal Card, breadcrumbs, pagination
(`.button--paginator` is a Button, the paginator around it isn't), countdown banners.

### Button

| Production | `Type` | `Size` (production height) |
|---|---|---|
| `.button` (default blue) | `Primary` | `medium` (40 px, padding 8 16, line-height 22) |
| `.button--secondary` | `Secondary` | |
| `.button--tertiary` | `Tertialy` (sic, Figma name) | |
| `.button--buy` | `CTA - buy` | |
| `.button--danger` | `Danger` | |
| `.button--secondary-transparent` | `Transparent` | |
| `.button--small` | — | `small` (padding 2 12) |
| `.button--gift`, `--premium`, `--xmas`, `--login*` | gap: missing variant | closest `Primary` |

Figma `Size` values are `small/medium/large/xl` (the Figma names; the Lit attribute uses
`sm/md/lg/xl`).

## 2. Text → text styles

Production's `typo-*` classes map one to one to Mini*S text styles (`_typography.styl`):

| Production class | Figma text style |
|---|---|
| `typo-heading-2xl` / `-xl` / `-lg` / `-md` / `-sm` | `Heading/2xl` / `xl` / `lg` / `md` / `sm` |
| `typo-body-md` / `typo-body-sm` | `Body/md` / `Body/sm` |
| `typo-caption-sm` / `-xs` / `-xxs` | `Caption/sm` / `xs` / `xxs` |
| `typo-brand-heading-xl` | `Brand/Heading/xl` |
| + `typo-bold` / `typo-semi-bold` / `typo-medium` | same style, weight overridden → note it (Figma has no bold variants of Body) |

Text without a `typo-*` class: pick the style with the same size and line height (± 1 px); weight
differences are a conflict, not a reason to skip the style. Nothing matches within ± 1 px → **no
token**, closest style applied, logged.

Text colour: bind to `Color/Text/*` by role (primary, secondary, accent/link, accent/positive,
accent/danger, accent/attention); on a coloured surface use the component's own accent.

## 3. Values → variables

Compare the **resolved** production value with the **resolved** Mini*S value
(`tokens.rgb.json`). Bind to the variable; record the outcome:

| Outcome | When | Written as |
|---|---|---|
| **tokenised** | exact match (colour ΔE < 1, length equal) | bound, nothing logged |
| **conflict** | same role, different value (Mini*S radius 8, production 4) | bound to the Mini*S variable; conflict row with both values |
| **literal where a token exists** | production hardcodes a value that equals a Mini*S token (rule 2) | bound; conflict row, kind `literal` |
| **no token** | no Mini*S variable has the role or value | closest variable bound, `no token` row; never type the raw value |
| **Figma ≠ tokens.css** | the variable's Figma value differs from `tokens.css` (G12 / G13) | conflict row, kind `figma-vs-css` |

Where to look, in order:

- **Colours:** Foundation semantic first (`Color/Surface/*`, `Color/Text/*`, `Color/Border/*`,
  `Color/Interaction/*`, `Color/Feedback/*`, `Color/background`, `Color/Separator/default`). A
  primitive (`.Primitives`, `.Heritage`) only inside a specimen, never on a rebuild: no semantic
  match = conflict or no token.
- **Spacing (padding, gap):** `spacing/layout/*` for page-level spacing between bands and columns
  (responsive, Layout modes); `linear/sp-linear-*` (4 px steps) inside blocks;
  `fibonachi/sp-fib-*` where the value is a Fibonacci step; `pixel/px-*` only for the odd
  1–14 px values.
- **Radius:** `border/radius/*` (Layout) → none 0 / sm 4 / md 8 / lg 12 / xl 16 / full.
- **Widths:** `container/width`, `container/padding`, `container/narrow/width`; plan 030 decides
  the rest. Don't bind a block width to a token that isn't a layout decision.
- **Borders:** `border/width/thin`; a line that *divides* content is a separator
  (`Color/Separator/default`), a line that *wraps* is a border (`Color/Border/*`) — CLAUDE.md
  "Borders wrap, separators divide".

## 4. Widths and Layout modes

One rebuild frame per captured width. Set the Layout collection mode on the frame so responsive
variables resolve per width:

| Capture width | Layout mode | Why (Breakpoints collection, min-width) |
|---|---|---|
| 375 | `2xs` | 360 ≤ 375 < 408 |
| 768 | `md` | 768 ≤ 768 < 1008 |
| 1008 | `lg` | 1008 ≤ 1008 < 1256 |
| 1280 | `xl` | 1256 ≤ 1280 < 1480 |
| 1500 | `2xl` | 1480 ≤ 1500 < 1920 |

The mode is the largest `Breakpoints` value ≤ the width. Verify against the `Breakpoints` and
`Layout` collections before use (2026-11-26: 2xs 360, xs 408, sm 600, md 768, lg 1008, xl 1256,
2xl 1480, 3xl 1920, 4xl 2560).

## 5. Counting coverage

- **Blocks:** matched (instance) / token-built / gap. Repeated items count once per kind, with
  the repeat count beside them.
- **Values:** tokenised / conflict / literal / no token, from the capture's stats (every rendered
  value counted, not only the mapped blocks).
- Write both into the mapping table header and the Summary card.
