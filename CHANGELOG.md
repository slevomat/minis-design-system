# Changelog

All notable changes to this project will be documented in this file.

## 2026-09-10

### Tokens — separator colour follows the exporter naming rule

The Figma token exporter drops every `default` path segment, so `Foundation → Color/Separator/default` exports as `--color-separator`. The shipped name `--color-separator-default` was hand-added and would have disappeared on the next export.

- **`--color-separator-default` → `--color-separator`** (renamed, **no alias**). Values unchanged: light `var(--color-black-a-black-a5)` (black 5%), dark `var(--color-white-a-white-a35)` (white 35%).
- **`--separator-color`**: `var(--color-separator-default)` → `var(--color-separator)`.
- **Breaking** only for code that references `--color-separator-default` directly — switch to `--color-separator`, or to `--separator-color` for dividers. Components consume `--separator-color` (the accordion divider included) and are unaffected.

## 2026-08-14

### Menu / navigation — dropdown rows had no hover in Safari

Menu rows styled and hovered correctly in Chrome but not in Safari. Two WebKit-sensitive mechanisms, both replaced with engine-independent ones:

- **`:host([in-menu])` styling → a class inside the shadow tree.** WebKit does not reliably re-evaluate `:host()` attribute selectors when the attribute is added after first render, which is exactly what the menu does when it stamps `in-menu` at runtime. `<minis-navigation-item>` now exposes `in-menu` as a reactive property and mirrors it to a class on its internal `.item`; the styles key off `.item.in-menu`. Attribute → property → re-render runs through `attributeChangedCallback`, which every engine handles correctly.
- **`assignedElements({ flatten: true })` → an explicit nested-slot walk.** `<minis-navigation>` forwards overflow items through its own `<slot name="overflow">`, so what is directly assigned to the menu is that slot element, not the items. The menu now resolves nested slots by hand instead of trusting WebKit's flattening.
- The item's host `display` is now set by the shadow root that slots it (`slot[name="overflow"]::slotted(*)` in navigation, `.panel ::slotted(*)` in the menu), rather than by a `:host([in-menu])` rule.
- `<minis-navigation>` also stamps `in-menu`, `role` and `tabindex` on items as it moves them, so panel styling never waits on slot resolution or a slotchange that some engines skip for forwarded slots.

### New component `<minis-menu>`

A labelled trigger that opens a panel of items below it. Built for the navigation overflow and usable on its own.

- **Props**: `label`, `open` (reflected), `placement` (`start | end`).
- **Slots**: default (menu items), `icon` (leading icon in the trigger).
- **Fires** `toggle` with `{ open: boolean }`. **CSS parts**: `trigger`, `panel`.
- **Item handling** — slotted children get `role="menuitem"`, `tabindex="-1"` and an `in-menu` attribute. `in-menu` is the styling hook a component reads to render itself as a full-width panel row; `syncItems()` is public so `<minis-navigation>` can re-stamp items after it moves them.
- **Keyboard**: arrow keys move between items (wrapping), `Home`/`End` jump to the ends, `Escape` closes and returns focus to the trigger, `Tab` lets focus leave and closes behind it, a click outside closes. `Escape` is bound on `document` while open, so it works even when focus never entered the panel.
- **No Figma component exists yet**, so this is the one component without a `.figma.ts`. Documented as a known gap in `docs/ai-prompts/components/menu.md`; the chevron uses `arrow-down` because the icon set has no chevron.

### Navigation — overflow behaviour

A bar with eleven categories does not fit every screen. `main-nav` now has two behaviours, split by the new `breakpoint` prop and measured against the component's **own width** (a `ResizeObserver`, since deciding how many items fit is measurement CSS cannot do). **`tabs` is unaffected** — a tab bar scrolls at every width, matching Figma, where the `Tabs` variant has no "Další" item.

- **New `breakpoint` prop** (`2xs | xs | sm | md | lg | xl | 2xl | 3xl | 4xl`, default `md`). At or below it the bar scrolls horizontally as before; above it, items that don't fit collapse into a trailing `<minis-menu>`. `main-nav` only — ignored by `tabs`.
- **New `overflow-label` prop** (default `Další`) — the label of that menu. `main-nav` only.
- **The active item is never hidden in the menu.** If it would overflow, it stays in the row and the last item that fits is pushed into the menu instead, so the current page is always visible.
- **Above the breakpoint the bar is no longer a scroll container** (`overflow: visible`). It has to be: `overflow-x: auto` makes the vertical axis a scrollport too, which would clip the open panel.
- `<minis-navigation-item>` renders as a full-width panel row when the menu stamps `in-menu` on it — no underline, hover is a surface.

### Navigation — realigned with the updated Figma component

The Figma component set ([5226:5557](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=5226-5557)) now carries two variants, `main nav` and `Tabs`. The component follows.

- **`variant="horizontal"` → `variant="main-nav"`**, matching the Figma variant name. The old value still works: it is silently normalised to `main-nav`, so existing prototypes keep rendering. Docs, stories and the `create-minis` template have moved to the new name.
- **`main-nav` now distributes its items across the full container width** (`justify-content: space-between`), as in Figma. `tabs` keeps items left-aligned with the 24px gap. Both variants keep the bottom border.
- **Items no longer shrink** — the bar scrolls instead (`flex-shrink: 0` on slotted items), which is what makes the distributed `main-nav` layout hold.
- **An empty `actions` slot is dropped from the layout.** The slot is a flex item with `margin-inline-start: auto`; while empty, that auto margin absorbed all the free space and `main-nav` had nothing left to distribute, so items stayed packed left. It is now `hidden` (`display: none`) until something is slotted into it. With content, it still pushes to the right edge as before.
- **Item box matches Figma**: fixed 38px height with a 2px gap above the underline, replacing the previous `8px 0` vertical padding.
- **Item icons are 24px**, up from 20px. Story and doc examples now use `<minis-icon slot="icon" size="24">`.
- **Icon ↔ label gap is 4px**, down from 8px, and now reads the existing `--menu-item-gap` token.
- **Placement rule documented**: `main-nav` appears exactly once per page, directly under `<minis-topbar>`, and the two together are mandatory on every Slevomat web page; `tabs` is for in-page switching, may repeat, and never sits at the top. Written into `docs/ai-prompts/components/navigation.md`, `docs/ai-prompts/principles.md`, `CLAUDE.md` and the `minis-app` skill.
- **Code Connect added** — `packages/components/src/components/navigation/navigation.figma.ts` maps the Figma `Variant` property to the `variant` attribute. The component had no `.figma.ts` before.
- Figma links in the docs and the story now point at `5226-5557` instead of the retired `4135-3385`.

#### Tokens

- **`--navigation-item-gap`** — `var(--linear-sp-linear-2)` (8px) → `var(--menu-item-gap)` (4px)
- **`--navigation-item-icon-size`** — `var(--pixel-px-20)` (20px) → `var(--pixel-px-24)` (24px)
- **New `--navigation-item-height`** → `38px` (literal — 38 is not on the pixel scale)
- **New `--navigation-item-padding-bottom`** → `var(--fibonachi-sp-fib-2)` (2px)
- **Removed `--navigation-item-padding-y`** — replaced by the height + bottom-padding pair above

#### Tokens — menu

The `--menu-item-gap` token existed already (commented "upcoming component"); the rest are new and back `<minis-menu>`.

- **`--menu-surface`** → `var(--color-surface-primary)`
- **`--menu-border-color`** → `var(--color-border)`
- **`--menu-border-radius`** → `var(--border-radius-md)` (8px)
- **`--menu-shadow`** → `var(--effect-elevation)`
- **`--menu-padding`** → `var(--linear-sp-linear-2)` (8px)
- **`--menu-offset`** → `var(--linear-sp-linear-1)` (4px)
- **`--menu-min-width`** → `200px` (literal — off the pixel scale)
- **`--menu-max-height`** → `70vh`
- **`--menu-z-index`** → `100`
- **`--menu-trigger-height`** → `var(--navigation-item-height)` (38px)
- **`--menu-trigger-padding-bottom`** → `var(--navigation-item-padding-bottom)` (2px)
- **`--menu-trigger-gap`** → `var(--menu-item-gap)` (4px)
- **`--menu-trigger-icon-size`** → `var(--navigation-item-icon-size)` (24px)
- **`--menu-trigger-text`** → `var(--color-text-primary)`
- **`--menu-trigger-accent`** → `var(--color-text-accent-link)`
- **`--menu-item-padding-y`** → `var(--linear-sp-linear-2)` (8px)
- **`--menu-item-padding-x`** → `var(--linear-sp-linear-3)` (12px)
- **`--menu-item-border-radius`** → `var(--border-radius-sm)` (4px)
- **`--menu-item-hover-surface`** → `var(--color-surface-faded)`

## 2026-08-11

### New `todo-plans/` folder

Long-lived plans for work we intend to do but are not doing yet now live in `todo-plans/`, numbered
`NNN-kebab-title.md` with a status in frontmatter. Conventions are in `todo-plans/README.md` and
summarised in `CLAUDE.md`. Numbers are permanent and plans are never deleted — a dead plan is marked
`abandoned` with the reason, because the dead end is the useful part.

- **[001 — Move the colour ramps onto a curve](todo-plans/001-colour-ramps-to-curve.md)** (`draft`).
  The ramps are not generated: 40 of 94 primitives are heritage anchors — the original Slevomat
  colour scheme, slotted into whichever step number they landed nearest — so a step number is a
  position in the ramp rather than a lightness, and there is no rule to extend when adding steps.
  The plan splits the two jobs those tokens are doing: heritage colours get a frozen namespace,
  ramps become generated output fitted to stay within a small ΔE of the 24 values that are both
  heritage-anchored and actually consumed. **Heritage values must keep working unchanged until
  production has fully adopted MiniS and its tokens** — every phase is built around that.

### Colour primitives — new darkest `-10` step on every ramp

#### Tokens

Eight new primitives extend each colour ramp one step below its current darkest value. `--color-grey-10` already existed and is unchanged.

- **`--color-blue-10`** → `oklch(0.21 0.04 239)` (`#041b29`)
- **`--color-gold-10`** → `oklch(0.49 0.1 111)` (`#636512`)
- **`--color-green-10`** → `oklch(0.26 0.08 142)` (`#062d04`)
- **`--color-orange-10`** → `oklch(0.27 0.08 37)` (`#451405`)
- **`--color-pink-10`** → `oklch(0.27 0.09 15)` (`#490c18`)
- **`--color-purple-10`** → `oklch(0.15 0.07 279)` (`#070427`)
- **`--color-red-10`** → `oklch(0.28 0.1 27)` (`#4f0a0a`)
- **`--color-yellow-10`** → `oklch(0.36 0.07 75)` (`#523709`)

Each value continues the straight-line L and C slope of its ramp's two darkest existing steps, holding hue fixed, with chroma clamped to what sRGB can express at that lightness. All eight are in gamut and clear 4.5:1 against white text (lowest is `gold-10` at 6.18:1).

> **The step number is a position in the ramp, not a lightness.** `blue-25` sits at L 0.34 while `gold-25` sits at L 0.56, so `-10` is not a uniform darkness tier — `purple-10` is L 0.15 while `gold-10` is L 0.49. This matches how the existing palette already behaves.

> **`gold-10` and `yellow-10` do not read as gold and yellow.** sRGB has no dark saturated yellow; below roughly L 0.45 the hue turns olive/brown. They exist to complete the ramps — do not use them as brand gold or brand yellow. The Color Palette story carries the same caveat.

No semantic/Foundation tokens point at these yet — nothing consumes them.

**Figma follow-up:** `tokens.css` is a Figma export. These eight need to be added as Figma variables, or the next export will drop them.

### `minis-topbar`

- **`vibe-apps`: the app name moved to the left.** Figma redesigned the vibe-apps header ([node `5156:9285`](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=5156-9285)) so `app-name` sits directly beside the logo instead of on the right-hand side. The name is now rendered outside the `actions` group, 32px from the logo artwork (the logo's existing 16px right padding plus a new 16px gap), matching the Figma frame's 156px text offset.
- **`vibe-apps` carries no actions.** The variant is logo + app name and nothing else, so it no longer renders the `actions` slot (it already did not render `search`). Anything passed to `slot="actions"` on a `vibe-apps` topbar stays unassigned and is not displayed — put those controls in the page body instead. **Breaking** for any prototype that slotted buttons into a `vibe-apps` bar; the `web` variant is unchanged.
- Storybook: the *Vibe apps — with an action* story was removed, since the arrangement it showed no longer exists.

#### Tokens

- **New `--topbar-app-name-gap`** (default `var(--linear-sp-linear-4)` = 16px) — the space between the logo group and the app name. A fixed step rather than `--spacing-layout-*` because the Figma frame specifies 16px at desktop, where the responsive layout tokens are 24px/32px.

## 2026-08-07

### Summer branding colour — new token, badge variant, page header theme

Figma added `Color/Branding/summer` and rebuilt the Badge and PageHeader component sets around it. The design system follows.

#### Tokens

- **New `--color-branding-summer`** → `var(--color-yellow-45)` (`#ffa400`), a campaign orange. Joins `--color-branding-{pink,yellow,blue,brand,green}`. Light and dark resolve to the same value, matching the Figma export — so it lives in the light foundation block only, like the rest of the branding palette.

> Note: `--color-branding-yellow` (`--color-yellow-75`, `#ffd666`) and `--color-branding-summer` (`--color-yellow-45`, `#ffa400`) are two different warm tones. `yellow` is the pale gold; `summer` is the saturated orange.

#### `minis-badge`

- **Two new `color` values: `green` and `summer`** — `<minis-badge color="green">` paints the seal `--color-branding-green` (`#088107`), `color="summer"` paints it `--color-branding-summer` (`#ffa400`). The full set is now `pink` (default) · `yellow` · `blue` · `brand` · `green` · `summer`, matching the Figma `color` variant one-to-one.
- **New `--badge-check-color` custom property** (default `var(--color-core-white)`) — the checkmark was a hardcoded `white` in the SVG and could not be recoloured. It is now a variable, because the page header's `green` theme needs a blue mark on its yellow seal. Existing usage is unchanged: the default resolves to the same white.
- Storybook: *All Variants* shows all six colours; new **Custom Checkmark Color** story demonstrates `--badge-check-color`.
- Code Connect (`badge.figma.ts`): `green` and `summer` added to the `color` enum mapping.

#### `minis-page-header`

- **New `summer` theme** — `--page-header-surface: var(--color-branding-summer)`, text `--color-green-95` (the same pale text tone the `green` theme uses, per Figma). Themes are now `brand` (default) · `yellow` · `blue` · `pink` · `green` · `summer`.
- **Badge seal colour per theme was rebuilt.** It used to be "pink on everything, brand on the pink theme". Figma now specifies a distinct pairing per theme, each chosen so the seal reads against its own surface:

  | theme | badge seal (was) | badge seal (now) |
  |---|---|---|
  | `brand` | `pink` | `pink` |
  | `yellow` | `pink` | `summer` |
  | `blue` | `pink` | `brand` |
  | `pink` | `brand` | `blue` |
  | `green` | `pink` | `yellow` + blue checkmark |
  | `summer` | — | `green` |

- **New `--page-header-badge-check` custom property** — the checkmark colour, forwarded to the badge's `--badge-check-color`. Defaults to white; `theme="green"` sets it to `--color-branding-blue`, because a white mark on the pale gold seal has too little contrast.
- The mapping lives in one `BADGE_COLOR_BY_THEME` record in `page-header.ts` rather than a ternary, so adding a theme is a single line.
- Storybook: *All Themes* covers all six; the theme control gained `summer`.
- Code Connect (`page-header.figma.ts`): `summer` added to the `Theme` enum mapping.

### `minis-app` skill — scaffold and build an app end to end

- **New skill at `.claude/skills/minis-app/SKILL.md`**, committed with the design system so it can't drift from the components it describes. Invoked when someone asks to create, start or vibe-code an app/prototype/page with Mini*S. It: asks what is being built (which decides the topbar variant), runs `pnpm build && pnpm create-prototype`, writes the project's `.claude/launch.json`, starts the dev server in the Browser pane, builds the requested screens from `docs/ai-prompts/`, and verifies the result (console, screenshot, mobile width, dark mode) before reporting done.
- Carries the non-negotiables as a checklist: background token, topbar variant, tokens-only styling, abbreviated sizes, page-header outside the container / topbar inside it, borders vs separators, avoid `disabled`, no per-component dark CSS.
- Tells the agent to say so explicitly when it has to build something the design system lacks (input, modal, table, avatar) — prototype-local, not design system.
- Includes the one-line copy into `~/.claude/skills/` for use outside the monorepo.
- **Human-readable skill listing** — skills were only discoverable by reading source files. Added a **Skills** section to the Storybook *Vibe Coding Guide* (what a skill is, what each one does, what to say to trigger it, where it lives), an **AI Skills** table in the repo `README.md`, and a short pointer in `docs/ai-prompts/index.md`. Both `minis-app` and the externally-provided `slevomat-design-principles` are listed.

#### Scaffold fix (found while testing the skill)

- **`packages/create-minis/template/_index.html` loaded `<minis-icon>` twice.** The template pulled in both `/vendor/components/index.js` and `/vendor/icons/index.js`, but the components bundle already inlines the icon component — so every generated prototype threw `NotSupportedError: … "minis-icon" has already been used with this registry` on load. Dropped the second script tag and documented why in a comment. Icons render unchanged.

### AI docs — the vibe-coding rule: background token + topbar

A single rule now stated in every place an agent (Claude Code, Cursor, or a human) looks, so generated prototypes stop drifting off-system:

> Whatever you vibe-code — prototype, demo, internal tool, full app — the page background is `var(--color-background)` (never a hardcoded colour), and the page opens with `<minis-topbar>`: `variant="web"` when working on the Slevomat website, `variant="vibe-apps"` + `app-name="…"` for any other internal or external app.

Written into:

- **`docs/ai-prompts/principles.md`** — new first principle, "Every prototype starts with the background token and a topbar", with prefer/avoid examples and the reasoning (`--color-background` is the page surface, `--color-surface-primary` is for components on top of it).
- **`docs/ai-prompts/getting-started.md`** — the HTML skeleton now includes the topbar, and the copy-paste AI prompt template carries both requirements.
- **`docs/ai-prompts/index.md`** — listed first in the principles index.
- **`CLAUDE.md`** — new "Vibe-coding rule" section.
- **`packages/create-minis/template/_CLAUDE.md`** — the scaffolded project's own AI context file leads with the two rules; `_index.html` sets `variant="web"` explicitly with a comment pointing at `vibe-apps`.
- **Storybook → Design Principles** — same rule as the first design pattern.
- **`docs/examples/simple-landing.html`** — replaced its hand-rolled `<header class="topbar">` with `<minis-topbar variant="web">`, and fixed six `size="small"` values that violated the abbreviated-size rule.

### Topbar — `web` and `vibe-apps` variants

The Figma component set (`5156:9287`) gained a second variant for vibe-coded apps, and was renamed *Header* → **TopBar** so the two sides finally match. `<minis-topbar>` now covers both variants, and existing markup is unaffected: `web` is the default and renders exactly as before.

- **`variant` property** — `'web' | 'vibe-apps'`, default `'web'`, reflected. Maps 1:1 to the Figma `Property 1` variant. `web` is the Slevomat website header (logo, optional search, action buttons); `vibe-apps` is the header for vibe-coded apps and prototypes (logo left, app name right).
- **`app-name` attribute** — string, `vibe-apps` only. Rendered right-aligned as a `<span>` (not a heading, so it doesn't compete with the page `<h1>`) in Heading/lg: `--typography-heading-lg-size`, `--typography-weight-semibold`, line-height 1.25, letter-spacing `-0.01em` (Figma's −1%).
- **New `search` slot** (`web` only) — the design system has no input component yet, so nothing is rendered for you. The slot is `hidden` while empty (tracked via `slotchange`), so a topbar without search keeps the original logo-left / actions-right layout with no phantom gap.
- **`actions` slot works in both variants** — in `vibe-apps` the buttons render after the app name.
- **Bar height is now `min-height`** instead of a fixed `height`, so tall slotted content grows the bar instead of overflowing it.
- **`topbar.figma.ts` added** — the component had no Code Connect file. Maps `Property 1` to `variant`, the app name and the per-variant trailing content.
- New stories: **Web — logo, search, actions**, **Vibe apps — logo + app name**, **Vibe apps — with an action**; the Playground gained `variant` and `app-name` controls.
- **Figma component set renamed *Header* → *TopBar*** (`5156:9287`), matching the code tag. The variant property is unchanged (`Property 1` = `web` \| `vibe-apps`), so the Code Connect mapping still resolves.
- Documented the Figma roadmap gaps: the `web` variant is not yet fully aligned with production, and there are no breakpoint variants — both variants are desktop-only layouts.
- Docs: `docs/ai-prompts/components/topbar.md` rewritten — variant table, Figma↔code naming note, placement (topbar → navigation → page-header, wrapped in `<minis-container>`), and a warning that the search field and avatar in the Figma frame are pasted screenshots of the live site, not design-system components.

#### Tokens

- **`--topbar-logo-gap`** (new) → `16px` — space after the logo, previously hardcoded as `--linear-sp-linear-4`.
- **`--topbar-search-width`** (new) → `300px` — search slot width (Figma: 300px).
- **`--topbar-search-gap`** (new) → `48px` — space between search and the actions group.
- **`--topbar-app-name-size`** (new) → `var(--typography-heading-lg-size)` — `vibe-apps` app name size.
- **`--topbar-app-name-color`** (new) → `var(--color-text-primary)` — `vibe-apps` app name colour.
- **`--topbar-height`** — unchanged at `64px`, now applied as `min-height` rather than `height`.

### Page Header — definition and placement clarified

- Documented that page headers are also known as **heroes**, come in the brand colour themes, and are the **first content element** of a page — placed directly under the Slevomat header (`<minis-topbar>`) and the main navigation (`<minis-navigation>`).
- Added a **Placement** section: **one page header per page**, at the very top of the content area, never mid-page and never two stacked; it sits **outside** `<minis-container>` — its root is already a full-bleed colour strip that applies `--container-padding` and centres a 1240px inner container, so nesting it would inset the background from the viewport edges and double the padding.
- Wording synced across the component JSDoc, the Storybook docs page, `docs/ai-prompts/components/page-header.md`, `docs/ai-prompts/index.md` and `docs/ai-prompts/components/README.md`. No API, token or visual change.

### Action Row — `breakpoint="xs"` mobile layout, and the full state matrix in Figma

The Figma set already had an `xs` (mobile) breakpoint but only in its `Default` state, and the web component knew nothing about it at all. Both sides now cover the same 24 combinations.

- **`breakpoint` property** — `'desktop' | 'xs'`, default `'desktop'`, reflected. Maps 1:1 to the Figma `Breakpoint` variant. It is an explicit attribute, not a container query: the row is used inside dropdowns and narrow sidebars where a width-driven switch would fire at the wrong moment, and Storybook / Code Connect need to address both layouts directly.
- **`xs` layout** — 56px row (up from 32px), plain 8px padding on both sides (the desktop leading inset is dropped), and a **trailing action pinned to the right edge**: an `arrow-right` chevron, or the checkbox when `variant="checkbox"`. The label group (icon, label, counter) stays left.
- **The leading icon is no longer mutually exclusive with the checkbox.** Figma's `w/ Checkbox` variant has always shown a checkbox *and* a leading icon; the component rendered one or the other. The `icon` slot now renders in every variant whenever something is slotted into it, detected via `slotchange`. Existing markup is unaffected — a row with no slotted icon renders exactly as before, and the icon box collapses so the flex gap leaves no hole.
- **Leading inset now follows the icon, not the variant** — `padding-left` drops to 3px whenever an icon is present (previously only for `variant="icon"`), with `variant="checkbox"` still overriding to 5px. Matches Figma's per-variant padding (8 / 3 / 5).
- **`role`/ARIA corrected for the checkbox variant** — `variant="checkbox"` now exposes `role="checkbox"` + `aria-checked` instead of `role="button"` + `aria-pressed`. Other variants keep `role="button"` + `aria-pressed`.
- New stories: **All variants — xs** (the full 3×4 grid), **xs — mobile list**, **xs — filter list**, plus a `breakpoint` control on the Playground and a `Disabled` row added to the desktop grid, which previously stopped at `Active`.
- **`action-row.figma.ts` added** — the component had no Code Connect file. Maps `Variant`, `Breakpoint` and `State` (`Hover` falls through to the default rendering, as it is a CSS `:hover`).
- Storybook filter-list labels translated to English.

#### Tokens

- **`--action-row-height`** (new) → `var(--pixel-px-32)` (32px) — desktop row height, previously hardcoded in the stylesheet.
- **`--action-row-xs-height`** (new) → `var(--linear-sp-linear-14)` (56px) — xs row height.
- **`--action-row-xs-action-size`** (new) → `var(--pixel-px-24)` (24px) — xs trailing action box.
- **`--action-row-xs-action`** (new) → `var(--action-row-icon)` — xs trailing chevron colour, the same tertiary blue (`#006eb9`) Figma binds to the arrow.

#### Figma

- **9 variants added to the `ActionRow` component set** (`4202:3867`), taking it from 15 to the full 24: `State` = `Hover` / `Active` / `Disabled` for each of `Label`, `w/ Icon`, `w/ Checkbox` at `Breakpoint=xs`. The `State` property already declared all four values — only the `xs` rows were missing.
- No new Figma variables: the xs states reuse exactly what desktop uses — the hover surface (`--action-row-hover-surface`, `#e6f7fc`), the active surface (`--action-row-active-surface`, `#f1f3f5`), and the same absolutely-positioned white `disabler` overlay at 60% opacity for `Disabled`.

## 2026-08-06

### Accordion — `size="compact"` variant (no horizontal inset)

A compact row for accordions nested inside an already-padded container (card, narrow column, drawer), where the default 16px inset would stack on the parent's padding and knock the headings out of alignment with everything around them.

- **`size` property on both `<minis-accordion>` and `<minis-accordion-item>`** — `'default' | 'compact'`, default `'default'`, reflected. Set it on the container and it is pushed down to every item (same mechanism as `heading-level`: applied on `slotchange` and whenever `size` changes); set it per item only for a deliberately mixed list.
- **`compact` zeroes the horizontal padding only** — trigger and panel left/right go to 0. Vertical padding, type scale, chevron and dividers are untouched, so despite the name it trims the *inset*, not the density — rows stay exactly as tall as they are at `default`.
- New **Size — compact** story showing both sizes in the same padded card, plus a `size` control on the Playground.
- **Naming**: the accordion is the one component **not** on the abbreviated `xs/sm/md/lg/xl` scale — the values are `default` and `compact` in Figma *and* in code, identical strings on both sides. Recorded as an explicit exception in `CLAUDE.md` → Size naming convention.

#### Tokens

- **`--accordion-compact-padding-x`** (new) → `var(--linear-sp-linear-0)` (0) · Figma `.Components → Accordion/compact/padding/x` → `linear/sp-linear-0`.

#### Figma

- **New `Size` variant property on the `accordion-item` component set** (`4984:9556`), values `default` / `compact` — 6 variants became 12. The originals were renamed to carry `Size=default`, so every instance already on a canvas keeps its look. The `compact` variants bind `trigger` and `panel` `paddingLeft` / `paddingRight` to the new variable.
- **The `accordion` list container is now a component set too** (`5136:9716`), variants `Size=default` / `Size=compact`; the original component (`4984:9557`) *is* the `Size=default` variant, so existing instances follow it unbroken. Its slot items are pre-set to the matching size.
  - ⚠️ **The container's `Size` does not reach items a designer drops into the Slot** — Figma has no property forwarding into slot content. It sets the size of the default content only; swapped-in items keep their own `Size`. The component description says so. Code has no such limit: `<minis-accordion size="compact">` always wins over its children.
  - The empty `Frame 42` wrapper that held the old container was removed by Figma when the component moved out of it.
- ⚠️ **Known gap in the three `Size=compact, Open=True` item variants**: their `panel` is a plain frame, not a slot. Cloning a variant through the Plugin API drops slot-ness (and the `Label` / `Show divider` property wiring — those two I rebound, verified rendering). Practical effect: panel content in a compact *open* row can be edited directly but not replaced through the `panel` slot property. There is no `createSlot` in the Plugin API, so fixing it means duplicating those three variants by hand in the Figma UI. Everything else — labels, dividers, states, padding — is correct.
- `accordion.figma.ts` maps `figma.enum('Size', { compact: 'compact' })` on the item, and the container mapping moved from `4984-9557` to the new set `5136-9716` (mapping the `Size=default` variant would only have covered half the set) with the same `Size` enum.

### Code Connect — `figma connect publish` was failing for every component

`page-header.figma.ts` used ternaries inside its `html` template (`${description ? 'description="…"' : ''}`). The HTML parser only accepts prop placeholders there, so it threw `Expected a call expression as a placeholder in the template, got ConditionalExpression` — and because the CLI parses all files as one batch, that single file took down the whole publish, including components whose own mappings were fine.

- **Conditional markup now lives in the boolean's value mapping**, the pattern `button.figma.ts` already used for its counter: `figma.boolean('Description', { true: 'description="…"', false: undefined })`, and likewise for `Tag`, `Button` and the inverted `Badge` → `no-badge`.
- The `Button` mapping is kept on one line and marked `prettier-ignore` — the mapped value is emitted into the Dev Mode snippet verbatim, newlines and indentation included.
- `pnpm figma:parse` now reports all five mapping files clean. **Rule for new `.figma.ts` files**: no ternaries, no logic of any kind inside the `html` template — only `${prop}` placeholders.

### Separator — opacity-based colour, and the accordion now follows it

The separator rule was a solid grey (`--color-border-subtle` → `#e3e4e6`), which only reads correctly on white. It is now an alpha colour, so the same token works on faded surfaces, tinted banners and photography without a per-surface override. In Figma the `accordion-item` divider dropped its colour/height override, so the accordion consumes the same rule.

#### Tokens

- **`--color-white-a-white-a35`** (new primitive) → `oklch(1 0 0 / 0.35)` (`rgba(255,255,255,0.35)`) · Figma `.Primitives → Color/white-a/white-a35`.
- **`--color-separator-default`** (new foundation token) → light `var(--color-black-a-black-a5)` (black 5%, `#0000000d`), dark `var(--color-white-a-white-a35)` (white 35%) · Figma `Foundation → Color/Separator/default`.
- **`--separator-color`**: `var(--color-border-subtle)` → `var(--color-separator-default)`.
- `--separator-height` unchanged (`var(--border-width-thin)`, 1px).
- Both new tokens added to the Storybook **Design Tokens** page (Border table and White Alpha palette).

#### Accordion

- **Dividers are now the shared separator rule**, black 5% instead of solid grey-90 — visibly lighter, and correct on non-white surfaces. Matches Figma, where the divider is now an **unmodified** `separator` instance: `accordion-item` no longer binds `Accordion/default/border` / `Accordion/border/width` at all (verified on the component set `4984:9556` — it resolves `--separator-color` `#0000000d` and `--separator-height` `1`).
- `--accordion-border-color` → `var(--separator-color)`, `--accordion-border-width` → `var(--separator-height)`. The names are kept as hooks so a single accordion can still be restyled without touching every rule in the system; the component CSS is unchanged apart from its hard-coded fallback (`#e6e6e6` → `rgba(0, 0, 0, 0.05)`).
- The unused `Accordion/default/border` and `Accordion/border/width` variables still exist in the Figma `.Components` collection — worth deleting there if nothing else binds them.

#### Docs — Borders vs. Separators

The distinction is now written down, so neither family gets reached for by mistake:

- **`docs/ai-prompts/getting-started.md`** → new "Borders vs. Separators" section under Colors: comparison table (purpose / colour / component tokens) plus the reasoning and a two-line CSS example.
- **Storybook → Design Tokens → Colors**: the Border table gained a lead-in ("borders wrap content, solid colour"), and the separator token moved out of it into its own **Separator** section explaining why dividers use alpha.
- **`CLAUDE.md`** → new bullet under Common pitfalls.

> Borders wrap content — cards, inputs, buttons — and are solid, because a border defines an object's edge. Separators (dividers) split content inside a block — accordion rows, list items, section breaks — and use an alpha colour, because a divider only has to read as a break and must do so on every surface it lands on. One alpha token covers a faded panel, a tinted banner and a photo; a solid grey tuned for white goes muddy on a mid-tone and vanishes on a dark one.

#### Not changed

- No Lit `<minis-separator>` yet; these tokens remain registered ahead of the component.
- `tokens.json` / `tokens.rgb.json` were **not** replaced from the new export. That export renames every variable (`--color-black-a-black-a10` → `--color-primitives-black-a-black-a10`, `--button-*` → `--components-button-*`, `--linear-sp-linear-*` → `--scales-linear-sp-linear-*`), which no longer matches `tokens.css`; adopting it is a separate migration, and `tokens.rgb.json` would go stale in the meantime.

## 2026-07-30

### Brand font — Kensington removed from the repository, Bebas Neue fallback

Kensington Compressed Bold is Slevomat-proprietary. It is no longer committed or redistributed, so this repo can be shared without shipping a licensed typeface. Kensington remains the *definition* — it is still first in the brand stack and still what Figma uses — but it is now resolved from the machine rather than from the repo.

- **`packages/tokens/src/fonts/kensington-compressed-bold.woff2` deleted** and the path git-ignored (`*.woff2|woff|ttf|otf` under that folder). The blob was also purged from git history. A new `packages/tokens/src/fonts/README.md` documents how to enable the real font locally.
- **Two zero-config ways to get the real font**: install it on your machine (resolved via `local()`, no files, no network request), or drop the woff2 back into `packages/tokens/src/fonts/` and run `pnpm --filter tokens build` (self-hosted). Storybook and `create-minis` prototypes pick either up automatically.
- **Public fallback is [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue)** (Google Fonts, OFL) — a condensed all-caps display face with near-identical proportions. Verified: renders Czech diacritics (`latin` + `latin-ext` subsets both served).
- **`@font-face` no longer lives in `tokens.css`.** `packages/tokens/scripts/build.js` now generates `dist/fonts/kensington.css` on every build — always with `local('Kensington Compressed Bold'), local('Kensington')`, and with `url('./kensington-compressed-bold.woff2')` appended **only when the file is present**. The file is written either way, so consumers link it unconditionally and never hit a 404. The build logs which branch it took.
- **`Bebas+Neue` added to the existing Google Fonts request** (one combined `<link>`, not a second one) and the overlay linked in all three consumers: `apps/storybook/.storybook/preview-head.html`, `packages/create-minis/template/_index.html`, `docs/examples/simple-landing.html`.
- **`@minis/tokens` `exports`**: added `"./fonts/*": "./dist/fonts/*"` — `dist/fonts` shipped via `files` but was unreachable through the `exports` map.
- **Licensing**: added a root `LICENSE` — **verbatim, unmodified MIT** (`README.md` claimed MIT with no file present). Scope notes live in a new `NOTICE` file, not in `LICENSE`: appending text to the MIT body drops it below GitHub's template-similarity threshold, so the repo reported `spdx_id: NOASSERTION` instead of `MIT`. `NOTICE` records that the grant covers code/tokens/docs and conveys no rights to Slevomat brand assets (Kensington, the Slevomat name, logos) — a clarification rather than a restriction, since a copyright licence never conveys trademark rights — plus credits for Inter and Bebas Neue (both OFL, referenced not redistributed).
- **`README.md` → "Project scope"**: Mini*S is built for Slevomat's own products and internal prototyping — no support, no external contributions, APIs change without notice. Deliberately a **statement of intent, not a licence condition**: an "internal use only" clause inside MIT would contradict its "without restriction … any person obtaining a copy" grant and make the licence self-contradictory and non-standard.

#### Tokens

- **`--typography-font-family-brand`**: `'Kensington'` → `'Kensington', 'Bebas Neue', 'Arial Narrow', sans-serif`.
- **`--typography-brand-weight`** (new) → `400`. Both brand faces are single-weight — Kensington ships Bold only and Bebas Neue ships 400 only — so requesting 700 synthesised a fake bold on the fallback. Requesting 400 renders Bebas Neue correctly *and* still resolves to Kensington, because the generated `@font-face` declares `font-weight: 400 700`.
- **Removed**: the `@font-face` block at the top of `tokens.css` (moved to the generated `dist/fonts/kensington.css`). The `FONTS` section is now a comment explaining how fonts are loaded, marked `HAND-MAINTAINED — preserve on Figma re-export` along with `--typography-font-family-*` and `--typography-brand-*`, none of which exist in `tokens.json`.

#### Page Header

- `.heading` now uses `--typography-brand-weight` (400) instead of `--typography-weight-bold` (700), and its `font-family` fallback chain is `'Kensington', 'Bebas Neue', sans-serif` instead of `'Kensington', serif`.
- No change needed to the Brand Badge anchoring: `firstUpdated()` already re-measures the word-space advance on `document.fonts.ready`, so it adapts to whichever face lands (measured 0.120 em for Kensington vs 0.178 em for Bebas Neue).
- ⚠️ **Code and Figma will diverge for anyone without Kensington.** Bebas Neue is taller and narrower, so brand headlines re-flow slightly.
- **Warning callout added to the Storybook Page Header docs page** (`page-header.stories.ts` → `parameters.docs.description.component`): the licensed Kensington font is required for a 1:1 match with Figma, Bebas Neue is substituted otherwise, how to tell which face you are currently looking at, and the two ways to enable the real font. Mirrored in `docs/ai-prompts/components/page-header.md` under "Heading typography".

## 2026-07-25

### Accordion

- **Row heights matched to production**: content box is now **62px** below 768px and **72px** from 768px up (was ~65px at both). Row pitch including the 1px divider is 63 / 73.
  - **Root cause of the old behaviour**: `.trigger` is a centred flex row, so its height is `max(heading line box, chevron)`. The 24px chevron was taller than the heading at *both* breakpoints (22.08px at XS, 23.94px at LG), so it pinned every row to 65px and the height never responded to padding or the type ramp.
  - **`--accordion-icon-size`** (new token) → `var(--pixel-px-20)`. Dropping the chevron to 20px puts it under the line box at both breakpoints, so the type now drives row height. `<minis-icon>` writes width/height inline on its `<svg>`, so the template passes `size="20"` as well as setting `--minis-icon-size` from the token.
  - **`--accordion-padding-y` is now responsive**: 20px (`--linear-sp-linear-5`) below 768px → 24px (`--linear-sp-linear-6`) from 768px up. No typography token was touched.
  - **New `COMPONENT RESPONSIVE OVERRIDES` section at the end of `tokens.css`.** `:root` inside a media query has the same specificity as a bare `:root`, so a component override placed with the existing layout-tier media queries (which sit *before* the component block) would lose the cascade to the component default. Component-level responsive overrides must go after the component block.
  - **Figma**: new `accordion/padding/y` in the **Layout** collection carrying the per-tier values (20 for `default/2xs/xs/sm`, 24 for `md`+), with `.Components → Accordion/padding/y` re-pointed to alias it — mirroring how `typography/heading/sm/size` already works, since `.Components` has only one mode. Added `Accordion/icon/size` → `pixel/px-20`. Chevron instances resized to 20×20 and bound to the new token.
  - **Known 1px gap at LG**: Figma measures the row content box at 73, not 72. The `Heading/sm` text style binds `fontSize`, `fontStyle` and `fontFamily` to variables but **not `lineHeight`**, which is hardcoded at 138% — so Figma computes 18 × 138% = 24.84 → 25 where CSS uses the 133% tier value → 23.94. The fix is to bind that style's `lineHeight` to the existing `typography/heading/sm/line-height` Layout variable (already holding 138% for `2xs–sm`, 133% for `md`+). Not changed here: it is a shared text style affecting every component that uses it. XS matches exactly (62 / 63 in both).

## 2026-07-24

### Separator (new Figma component)

- **New `separator` Figma component** (node `4987:147`) on the previously empty ↳ Separator page (`4977:346`) — a horizontal 1px rule, width-filling, colour and height variable-bound. Its first consumer is the `accordion-item` divider.
- No Lit component yet — `<minis-separator>` is not implemented. The CSS tokens below are registered ahead of it, matching the existing "upcoming component" precedent for card-grid and menu-item.

#### Tokens

Added a `/* Separator (upcoming component) */` block in `packages/tokens/src/tokens.css`, mirrored as `Separator/*` Figma variables in `.Components`:

- `--separator-color` → `var(--color-border-subtle)` · Figma `Separator/default/color` → `Color/Border/subtle`
- `--separator-height` → `var(--border-width-thin)` (1px) · Figma `Separator/height` → `border/width/thin`

### Accordion (new component)

- **New `<minis-accordion>` + `<minis-accordion-item>`** — vertical expand/collapse list for FAQ sections, built from the Figma "Accordeon" page (`node-id=4977-145`). Each row is a bold heading on the left with a blue `arrow-down` chevron on the right, separated by 1px dividers; opening a row reveals its panel below.
  - `<minis-accordion>` props: `single` (exclusive mode — opening one item closes the others), `bordered` (rule above the first and below the last item too), `heading-level` (ARIA level applied to every child item, default `3`, `0` omits the heading role). Read-only `items` getter returns the child items in DOM order.
  - `<minis-accordion-item>` props: `heading` (string), `open` (reflected), `disabled`, `heading-level`. Slots: default (panel content), `heading` (custom heading markup). Fires `toggle` with `{ open: boolean }` — bubbles and composed, which is how `single` mode closes siblings. CSS parts: `trigger`, `panel`.
  - **Responsive typography, no container query.** The heading uses `--typography-heading-sm-size` / `-line-height`: 16px/138% below 768px, 18px/133% from 768px up. The component only rescales, it never rearranges its internals, so the viewport-driven tokens are the correct mechanism. Row height ends up 65px desktop / ~57px mobile for a single-line heading; long headings wrap and the chevron stays vertically centred.
  - **Panel animation** uses `grid-template-rows: 0fr → 1fr` (no measured height). Chevron rotates 180° when open. Both are suppressed under `prefers-reduced-motion: reduce`.
  - **Accessibility**: trigger is a real `<button type="button">` with `aria-expanded` / `aria-controls`; the panel is a `role="region"` labelled by the trigger and `inert` while closed, so closed content stays out of the tab order.
  - Exported from `@minis/components`; AI docs added at `docs/ai-prompts/components/accordion.md` and linked from the index.

#### Figma

The component was **built in Figma** on the previously empty ↳ Accordeon page (`4977:145`):

- **`accordion-item` component set** (node `4984:9556`) — 6 variants, `State` (Default / Hover / Disabled) × `Open` (True / False), plus `Label` and `Body` TEXT properties. Every fill, stroke, stroke-weight, padding and gap is bound to an `Accordion/*` variable — a binding audit reports **0 unbound properties**.
- **`accordion` component** (node `4984:9557`) — the list container, four `accordion-item` instances stacked vertically, with `Show divider` turned off on the last row.
- **`Show divider` boolean property** on `accordion-item` (default `true`). The bottom rule is no longer a frame stroke — it is a nested **`separator`** instance as the item's last child, so a boolean property can toggle its visibility (Figma booleans can only drive layer visibility, not stroke weight). Its colour/height are overridden to `Accordion/default/border` / `Accordion/border/width`, keeping the accordion's own tokens authoritative. No code change: the CSS already hides the last rule via `:last-of-type`.
  - Chosen over an `Item + Separator + Item` sibling structure, which would put a node on the canvas with no DOM counterpart (nothing for Code Connect to map) and force designers to hand-maintain the alternation on every add/remove/reorder.
- **XS / LG demo frames** using explicit Layout-collection mode overrides (`xs` / `lg`) to show the 16px → 18px heading shift without resizing anything.
- The chevron is a real instance of `Icon/arrow-down` from the **Slevomat Icons** library (rotated 180° when open), not a redrawn vector.
- The heading uses the `Heading/sm` text style, whose `fontSize` is already bound to `typography/heading/sm/size` — so the Figma component inherits the responsive type ramp automatically.
- **Code Connect is now wired** in `accordion.figma.ts` for both nodes, mapping `Label` → `heading`, `Body` → slot content, `Open` → `open`, `State=Disabled` → `disabled`. Parses clean via `pnpm figma:parse`.
- ⚠️ **Known divergence**: the Figma `Heading/sm` text style is Inter **Semi Bold (600)**; the CSS `--accordion-heading-weight` is **Bold (700)**. Figma follows the text style. Pick one before this ships.

#### Tokens

Added a new `/* Accordion */` block in `packages/tokens/src/tokens.css`. The same 11 tokens were created as Figma variables in the `.Components` collection (`Accordion/*`), each aliased to the same Foundation/.Scales variable the CSS resolves to, each explicitly scoped (no `ALL_SCOPES`), and each carrying its `var(--accordion-*)` name as WEB code syntax so Dev Mode surfaces the real custom property:

- `--accordion-surface` → `var(--color-core-transparent)`
- `--accordion-border-color` → `var(--color-border-subtle)` · `--accordion-border-width` → `1px`
- `--accordion-padding-x` → `var(--linear-sp-linear-4)` (16px) · `--accordion-padding-y` → `var(--linear-sp-linear-5)` (20px)
- `--accordion-panel-padding-bottom` → `var(--linear-sp-linear-5)` (20px)
- `--accordion-gap` → `var(--linear-sp-linear-4)` (16px — heading ↔ chevron)
- `--accordion-heading-text` → `var(--color-text-primary)` · `--accordion-heading-hover-text` → `var(--color-text-accent-link)`
- `--accordion-heading-weight` → `var(--typography-weight-bold)` (700)
- `--accordion-icon-color` → `var(--button-tertiary-text)` (tertiary blue)
- `--accordion-panel-text` → `var(--color-text-primary)`
- `--accordion-transition-duration` → `200ms`

## 2026-07-17

### Page Header

- **Badge is now typography-relative and anchored to the heading's last line.** The seal sizes off the heading font-size (`0.8em` — ≈26px at the 32px heading, ≈45px at the 56px heading), sits exactly centred on the **last line's line-height**, and keeps a **0.27em gap** after the end of that line — for any number of heading lines, at every breakpoint. Previously two fixed-px badges were rendered: a `md` (43px) one bottom-aligned beside the whole heading block on desktop, and an `sm` (32px) one absolutely positioned at the heading's top-right on mobile.
  - **Implementation**: the badge is an inline box inside the `<h1>`, after the slot. Its anchor is `height: 1lh` with `vertical-align: top`, so its box coincides with the last line's line-height band regardless of the font's ascent/descent metrics; the seal is centred inside it. Sizing and centring are pure CSS. The gap needs one JS assist: the slotted markup usually ends in a whitespace text node that renders as a word space before the badge (making the gap ~1.12em for some authors and 1.00em for others, depending only on HTML formatting). The component now emits exactly one space in its template — any slotted trailing space collapses into it — and measures that space's advance in the heading font (`_measureSpace()`, on `slotchange` and after `document.fonts.ready`), publishing it as the `--_space-advance` ratio that the anchor's margin subtracts.
  - **Fallback**: `height: 1.1em` is declared before `height: 1lh` for browsers without the `lh` unit (pre-Chrome 109 / Safari 16.4 / Firefox 120).
  - **Consequences**: the heading slot must stay inline-level (a block child pushes the badge onto its own line), and the badge may wrap to its own line on narrow viewports like any inline content. The `.badge-desktop` / `.badge-mobile` internal classes are gone.
  - **Tokens**: added `--page-header-badge-size` (`0.8em`) and `--page-header-badge-gap` (`0.27em`), both overridable per instance. Added the `badge-anchor` and `badge` CSS shadow parts.
- **Storybook grouping changed**: moved out of the "Brand" folder — story path is now `Components/Page Header` (was `Components/Brand/Page Header`). PageHeader has been adopted across all page types, not just brand/campaign pages, so it no longer belongs under the Brand grouping. No API, prop, or token changes — `theme="brand"` remains a valid theme value.
- **XS/mobile vertical padding reduced to 24px** (was 40px), realigned to Figma. The root padding on the sub-768px breakpoint now uses the `--linear-sp-linear-6` spacing token instead of a hardcoded `40px`.
- **AI docs refreshed** (`docs/ai-prompts/components/page-header.md`): removed stale references to `--page-header-image-radius`, the −3deg image rotation, and the circular mobile image — the image is clipped with the blob `mask-image` on both breakpoints. Documented that the layout switch is a container query on the component's own width, not a viewport media query.

### Badge

- **New `--badge-size` custom property** drives the seal's width/height, enabling fluid sizing off any unit — e.g. `--badge-size: 0.8em` to track the surrounding font-size (used by Page Header). The `size` attribute (`sm` 32px · `md` 43px · `xl` 82px) is now a shorthand that sets this property; setting `--badge-size` directly overrides it. No visual change to existing usage.

### Storybook

- **Tier toolbar tokens are now generated from `tokens.json`** (`apps/storybook/.storybook/tier-tokens.ts`) instead of a hand-copied table in `preview.ts` — the Tier simulation can no longer drift from the Figma export. The generator maps each Storybook tier to a representative Figma Layout mode (`2xs_xs`→xs, `sm`→sm, `md_lg`→lg, `xl`→2xl), translates `100000px`→`100%`, and aliases the Figma export names to the tokens.css names (`heading-large`→`heading-lg`, `poster`→`heading-xl`, `mega-poster`→`heading-2xl`, …). Behaviour refinements vs the old table: tiers now also simulate `--container-width` / `--container-narrow-width` / `--page-width` (xl tier gets the 1240px cap and 752px narrow cap); the xl tier adds `--typography-brand-lg-size` 32px; and `--typography-brand-xl-line-height` is no longer forced to 100% (tokens.css keeps 110% at every tier).
- **Fullscreen stories no longer get the 24px decorator padding.** The global preview decorator padded every story, which shrank full-width components below the iframe width and broke container-query breakpoints — Page Header showed its mobile layout at the 768px "tablet" viewport (container was only 720px). Stories with `layout: 'fullscreen'` now render edge-to-edge, so the layout switch happens exactly at 768px.

### Docs

- **Dark mode documented correctly**: `docs/ai-prompts/index.md` and `getting-started.md` now document `<html data-mode="dark">` as the only dark-mode mechanism. The old instruction to link `dist/foundation/dark.css` was removed (that legacy file force-applies hardcoded dark hex values with no toggle) and `packages/tokens/src/index.css` carries a deprecation notice.
- **`--spacing-layout-*` guidance fixed**: CLAUDE.md and `getting-started.md` claimed no `--spacing-*` tokens exist; the responsive `--spacing-layout-{xs–xl}` set is real and now documented. The unimplementable "use `--breakpoint-*` tokens in media queries" advice was replaced with the viewport-scaling layout tokens.
- Removed dead links to nonexistent pattern/template docs and deleted two empty brace-expansion artifact directories (`packages/tokens/src/foundation/{light,dark}`, `docs/ai-prompts/{components,patterns,templates}`).
- **Five new design principles** in `docs/ai-prompts/principles.md` (previously only "Prefer active states over disabled"): *Style with tokens, never hardcoded values* · *Dark mode comes free — if you follow the token rule* · *Use abbreviated size values only* · *Respect the two responsive mechanisms* · *Brand font is for banner headlines only*. Each follows the Rule/Why/Prefer-Over format; mirrored in the Storybook "Design Principles" page and linked from `docs/ai-prompts/index.md`.
- **Components README rebuilt** (`docs/ai-prompts/components/README.md`): now lists all 16 component docs (previously only Button + "coming soon") and the naming examples use real components — the old ones showed `<minis-input>` and `<minis-card>`, which don't exist. `getting-started.md` gained a "Token Export Files" section covering the `100000px` = full-width sentinel and the Figma-export naming drift, so external AI tools reading `tokens.json` don't need CLAUDE.md.
- **"How to Use with AI" rewritten as a real context-loading guide** (`docs/ai-prompts/index.md`): the folder is now documented as a self-contained context pack with a load order (index + getting-started + principles, then per-component docs), concrete setup for Claude Code (this repo and consuming projects), Cursor (`.cursor/rules` pointer or `@`-mentions), and chat tools, plus example prompts referencing files that actually exist — the old section referenced an "Auth Page template" and "Hero Section pattern" that were never written.
- **Responsive architecture documented** — new "Two Responsive Mechanisms" section in `docs/ai-prompts/layouts/index.md`: viewport-driven tokens (media queries) for page-level spacing/typography vs container queries for component-internal layout (page-header, card-grid), the convention for new layout-switching components, and the narrow-embed caveat with a local token-override example. CLAUDE.md gained the matching pitfall entry plus a table of the Figma-export naming drift (`heading-large`/`poster`/`mega-poster` → `heading-lg`/`heading-xl`/`heading-2xl`; brand composites and `--container-bleeding-edge-padding` are tokens.css-only). The container-token table in layouts/index.md now shows the real `100%`/`1240px`/`752px` values instead of the raw `100000px` sentinel.

## 2026-06-18

### Tile

- **Labels now wrap to up to 3 lines** (then ellipsis), realigned to Figma ([node `4208:4297`](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4208-4297)). Previously labels were single-line with truncation.
- **Content is top-aligned** — the icon and first label line start at the same level for every tile in a row, regardless of how many lines a neighbouring label takes (the tile fills the grid cell with `height: 100%` and `justify-content: flex-start`).
- **Counter pill recoloured to tertiary blue** with white text (was an inverted black pill).
- **Tokens**: `--tile-counter-surface` retargeted `var(--button-secondary-text)` → `var(--button-tertiary-text)` (blue `#006eb9`); `--tile-counter-text` retargeted `var(--button-secondary-surface)` → `var(--color-core-white)`. Added `--tile-label-line-height` (`var(--pixel-px-18)` = 18px) and `--tile-label-max-lines` (`3`). Removed `--tile-label-row-height` (the label row is no longer fixed-height).

### Button

- **Large & XL horizontal padding widened to 48px** to match Figma ([node `284:5283`](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=284-5283)). The `lg` and `xl` sizes now use a more spacious `--button-large-padding-x` (48px, was 16px); vertical padding (12px) is unchanged.
- **New `full-width` boolean attribute** (Figma "Fill container" sizing). `<minis-button full-width>` stretches the button to its container's width and centres the content — no consumer CSS needed. Use for stacked, full-width layouts such as the `xs` breakpoint or a mobile sheet. By default the button still hugs its content (`display: inline-block`).

### Tokens

- **`--button-large-padding-x` retargeted** to `var(--linear-sp-linear-12)` (48px), was `var(--linear-sp-linear-4)` (16px). Affects both the `lg` and `xl` button sizes. Fallbacks in `button.styles.ts` updated `16px` → `48px` to match.

## 2026-06-12

### Tag

- **New `in-color` boolean attribute** on the `toggle` variant (mirrors the Figma "In Color" property). When set, the icon renders in the brand/danger accent (`--color-interaction-danger-accent`, red) and the hover tint uses the danger palette; the label and borders stay neutral. Typical use: a red "like"/favourite heart. Works with `icon-only` too.
- **Toggle state model aligned to Figma** — the toggled/pressed state no longer paints a background surface. Default and toggled share the resting surface; the outline ↔ filled icon (swapped by the consumer) is the only state indicator, and **hover** is the only state that tints the background. Previously the pressed state filled with `--color-interaction-secondary-hover-surface`.
- **Icon-only toggle is now borderless** over a primary (white) surface (`--color-surface-primary`) — these sit over photos, so a solid surface reads better than an outline.
- Added `tag.figma.ts` Code Connect mapping for the `tag/toggle` Figma component (maps `Icon only`, `State`, and `In Color`).
- **Tokens** (component override hooks, CSS-only): added `--tag-toggle-surface` (`transparent`), `--tag-toggle-icon-only-surface` (`var(--color-surface-primary)`), `--tag-toggle-color-accent` (`var(--color-interaction-danger-accent)`), `--tag-toggle-color-hover-surface` (`var(--color-interaction-danger-hover-surface)`), `--tag-toggle-color-hover-border` (`var(--color-interaction-secondary-border)`). `--tag-toggle-hover-border` now defaults to `var(--color-interaction-secondary-border)` (was the hover-surface colour). Removed `--tag-toggle-pressed-surface` / `--tag-toggle-pressed-border` (toggled no longer changes surface).

### Page Header

- **Badge color realigned to Figma** ([node `4642:396`](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4642-396)). The checkmark seal is now red (`color="pink"`) on every theme, with the single exception of the `pink` theme, which uses a brand-cyan seal (`color="brand"`) for contrast. Desktop (`md`) and mobile (`sm`) badges now share the same color. Previously the color varied per theme and differed between desktop and mobile (a pink/yellow mix).
- Internals: the two getters `_badgeColorDesktop` / `_badgeColorMobile` were replaced by a single `_badgeColor` getter.

### Tokens

- **`--color-branding-green` retargeted to primitive green 45** — now `var(--color-green-45)` (`#088107`), was `var(--color-green-35)` (`#136110`). Brightens the `green` page-header theme surface; matches the updated Figma `Color/Branding/green` variable.
- **New `--button-primary-hover-shadow`** — the primary button's layered blue-toned hover `box-shadow` (five `rgba(0, 71, 120, …)` layers), previously hardcoded in `button.styles.ts`, is now a component token next to the other `--button-primary-hover-*` tokens.
- `button.styles.ts` and `message.styles.ts` now reference `var(--button-primary-hover-shadow)` / `var(--message-shadow)` without hardcoded fallbacks — multi-value `var()` fallbacks in Lit `css` templates are a documented pitfall, and `--message-shadow` already existed in `tokens.css`. Rendered values unchanged.

### Badge

- **New `brand` color variant** — `<minis-badge color="brand">` paints the seal in Slevomat brand cyan via `--color-branding-brand` (`var(--color-blue-65)` → `#00b2e5`). Joins `pink` (default), `yellow`, and `blue`. Mapped in `badge.figma.ts`, stories, and the AI-prompt doc.
- **Code Connect mapping fixed**: `badge.figma.ts` referenced a non-existent `Color` property (the Figma variant property is lowercase `color` with lowercase values) and didn't map `Size` at all. Both now mapped; `figma connect publish` validation passes.

### Checkbox

- **Form association via ElementInternals** (`static formAssociated = true`) — `<minis-checkbox name="…" value="…">` now actually submits with a surrounding `<form>`. Previously the hidden native `<input>` lived inside Shadow DOM where forms cannot see it, so `name`/`value` were silently ignored.
- Participates in `form.reset()` (restores initial checked state) and `<fieldset disabled>` via `formResetCallback` / `formDisabledCallback`.
- The redundant hidden `<input type="checkbox">` and the inline wrapper styles were removed; behaviour (keyboard, ARIA, click) is unchanged.

### Alert

- **BREAKING**: `icon` attribute replaced by `no-icon`. `icon="false"` never worked — HTML boolean attributes are true whenever present, so the icon could not be disabled from markup. Use `<minis-alert no-icon>` to hide the icon; it is shown by default.

### Page Header

- **BREAKING**: `badge` attribute replaced by `no-badge` for the same reason as Alert's `icon`. The seal is shown by default; use `<minis-page-header no-badge>` to hide it.

### Build & tooling

- **Fixed broken package build**: the three `*.figma.ts` Code Connect files imported `html` from `@figma/code-connect` (React-only root export), failing `tsc` with TS2614. They now import from `@figma/code-connect/html`; `*.figma.ts` is also excluded from the build tsconfig (the Figma CLI parses these files independently).
- **New CI workflow** (`.github/workflows/ci.yml`) — runs `pnpm build` + `pnpm lint` on every push and pull request, so type errors can no longer land silently on master.
- Added `.eslintignore` (`dist/`, `storybook-static/`, `node_modules/`) — lint previously crashed on a symlink loop inside `storybook-static`.
- Removed dead code flagged by lint: unused `html` import (navigation stories), unused `placeholderImg` helper (page-header stories), unused `concatenateCSS` (tokens build script).

### Docs

- **Size naming convention corrected in CLAUDE.md**: the documented `small | medium | large` full-word convention never matched the shipped components. Components use abbreviated sizes matching the Figma `Size` variant names (`xs | sm | md | lg | xl`, each component exposing its own subset).
- `.figma.ts` template in CLAUDE.md fixed to import from `@figma/code-connect/html`.

## 2026-06-11

### Page Header

- **New component `<minis-page-header>`** — full-width branded banner for category and campaign pages.
- **5 themes**: `brand` (cyan, default), `blue`, `yellow`, `pink`, `green` — background uses `--color-branding-*` tokens.
- **Responsive layout**: horizontal on desktop (≥768 px) — content left, image right; stacked on mobile — image top, content below.
- **Slots**: default (heading HTML), `image` (decorative photo), `button` (CTA).
- **Attributes**: `description` (string body copy), `tag` (string countdown pill), `badge` (boolean, default `true` — shows Brand/Badge seal).
- Desktop layout corrected to match Figma: all content left-aligned; heading row is natural-width (`width: auto`, `flex: none`) so the Brand/Badge seal sits right after the last line of the heading — not pushed to the far right.
- Mobile badge uses yellow on most themes, pink on the yellow theme.
- **Responsive layout now uses CSS container queries** (`@container page-header (min-width: 768px)`) with `container-type: inline-size` on `:host`. The component responds to its own rendered width rather than the browser viewport, so the Storybook viewport toolbar correctly switches between mobile and desktop layouts.
- Storybook: added **Mobile Layout** story; use the Storybook viewport toolbar (device icon) to resize the canvas below 768 px to see the mobile layout.

### Storybook / preview.ts

- **xl viewport tier** now injects `--typography-brand-xl-size: var(--typography-size-5xl)` and `--typography-brand-xl-line-height: var(--typography-line-height-100)` so the brand heading displays at 56 px when the xl tier is selected in the toolbar, matching the Figma 1480 px+ breakpoint.
- **Tier toolbar renamed** from `viewport` to `tier` in `globalTypes`, freeing up `globals.viewport` for the standard Storybook viewport addon (included in `@storybook/addon-essentials`). The viewport addon's device selector now actually resizes the iframe so container queries respond.
- **One-click viewport + tier sync**: selecting a device preset (e.g. "Small mobile") now automatically applies the matching tier tokens AND updates the Tier toolbar label. A `window resize` listener in the preview iframe reads `window.innerWidth` when the viewport addon resizes the iframe and derives the correct tier — no second manual click needed. The Tier dropdown remains available for forcing a specific tier at full (responsive) width.

### Tokens

- **New `--color-branding-*` tokens** — semantic aliases over primitives, added to the Foundation light section:
  - `--color-branding-pink` → `var(--color-pink-45)`
  - `--color-branding-yellow` → `var(--color-yellow-75)`
  - `--color-branding-blue` → `var(--color-blue-45)`
  - `--color-branding-brand` → `var(--color-blue-65)`
  - `--color-branding-green` → `var(--color-green-35)`
- **New `--font-text-bold`** — `var(--typography-weight-bold)` in light mode; overridden to `var(--typography-weight-semibold)` in dark mode.
- Export date bumped to `2026-06-11T13:39:48.548Z`.

### Badge

- **Colors now use branding semantic tokens** instead of primitives directly:
  - `pink` → `var(--color-branding-pink)` (was `--color-pink-45`, same resolved value)
  - `yellow` → `var(--color-branding-yellow)` (was `--color-yellow-45`; now resolves to `--color-yellow-75` — warm golden amber)
  - `blue` → `var(--color-branding-blue)` (was `--color-blue-45`, same resolved value)
- **New `size` attribute** — `sm` (32 px), `md` (43 px), `xl` (82 px, default).
- `sm` targets XS/SM breakpoint headlines; `md` is the former recommended minimum for headline companions; `xl` is unchanged default.
- Existing usage without `size` is unaffected — defaults to `xl` (82 px).

## 2026-06-05

### Badge

- **New component `<minis-badge>`** — decorative scalloped seal badge with a white checkmark; three color variants: `pink` (default), `yellow`, `blue`.
- Colors use existing primitive tokens: `--color-pink-45`, `--color-yellow-45`, `--color-blue-45`.
- Natural size 82×82 px; scalable via CSS `width`/`height`.
- Inline SVG — no external assets, no slots, no events.
- Storybook path: `Components/Brand/Badge`.

## 2026-06-04

### Card Grid

**`navigation` variant — `vertical-slots` subvariants (desktop only)**

- New attribute `vertical-slots` (`"0" | "1" | "2"`, default `"0"`) on `<minis-card-grid variant="navigation">`.
- `vertical-slots="0"` — unchanged standard layout: featured wide card top-left, wide card bottom-right.
- `vertical-slots="1"` — item 2 spans both rows in col 3 (one tall vertical photo). Other five items unchanged.
- `vertical-slots="2"` — items 2 and 4 each span both rows (two tall vertical photos in cols 1–2); items 1, 3, 5, 6 fill the right two columns.
- All three subvariants collapse to the same 4×2 horizontal scroll strip on mobile (`<768px`).

**Bug fix — mobile height for navigation variants**

- Previous mobile height was `172px` (one row), which clipped the second row and made the breakpoint switch appear to have no effect.
- Fixed to `calc(2 × --card-grid-xs-item-size + --card-grid-gap)` = **352px** (2 rows × 172px + 8px gap), matching the Figma xs spec.
- Applies to `navigation`, `navigation-small` (rows=2), and `navigation-small` (rows=3) variants.

**Bug fix — navigation mobile grid: 3 columns for equal row distribution**

- With 4 columns and 6 items: row 1 = 4, row 2 = 2 (unequal). Fixed to **3 columns**: 3 items per row in both rows. Grid is 3 × 172px = 516px wide — the third column peeks at ~390px to invite scrolling.

**Improvement — container queries for responsive behaviour**

- All `@media (max-width: 767px)` replaced with `@container (max-width: 767px)`. `:host` is now `container-type: inline-size`. An inner `.host-wrapper` div carries height and overflow so it can respond to container queries.
- The Storybook breakpoint switcher now correctly triggers the mobile layout (narrows the CSS container, not the viewport).

## 2026-05-29

### Tokens

**Kensington — brand typeface and new typography scale tokens (Figma sync)**

- `@font-face` font-family name corrected from `'Kensington Compressed Bold'` → `'Kensington'` to match Figma's family name.
- Token `--typography-font-family-brand` updated accordingly: `'Kensington Compressed Bold'` → `'Kensington'`.
- New token `--typography-line-height-110: 110%` — between `--typography-line-height-100` and `--typography-line-height-125`. Used by brand headings.
- New token `--typography-size-3xs: var(--linear-sp-linear-2)` — 8px, smallest size in the scale (below `--typography-size-2xs`).
- New token `--typography-size-5xl: var(--linear-sp-linear-14)` — 56px, largest size in the scale (above `--typography-size-4xl`).
- New brand heading composite responsive tokens:
  - `--typography-brand-lg-size` — 24px base, scales to 32px at 1480px+
  - `--typography-brand-lg-line-height: var(--typography-line-height-110)` — fixed 110%
  - `--typography-brand-xl-size` — 32px base, scales to 56px at 1480px+
  - `--typography-brand-xl-line-height: var(--typography-line-height-110)` — fixed 110%

**Kensington Compressed Bold — brand typeface added** *(previous entry, kept for reference)*

- New `@font-face` declaration in `packages/tokens/src/tokens.css` for the `'Kensington'` typeface served from `./fonts/kensington-compressed-bold.woff2`.
- Font file added to `packages/tokens/src/fonts/` and distributed via `@minis/tokens` dist.
- Build script updated to copy `src/fonts/` → `dist/fonts/` on every `pnpm build`.

### Docs

- **Typography section** updated in `docs/ai-prompts/getting-started.md` — documents all three font-family tokens and explains when to use Kensington vs. Inter.
- **Storybook Design Tokens → Typography → Font Families** updated with corrected `'Kensington'` name and preview.
- **Storybook Design Tokens → Typography → Font Sizes** — added `--typography-size-3xs` (8px) and `--typography-size-5xl` (56px) rows.
- **Storybook Design Tokens → Typography → Line Heights** — added `--typography-line-height-110` (110%) row.
- **Storybook Design Tokens → Text Styles** — new "Brand Headings" section documenting `Brand / LG` and `Brand / XL` with live responsive previews and usage examples.

## 2026-05-28

### Docs

**New: Design Principles section** — establishes the first system-wide design principle: Prefer active states over disabled.

- New `docs/ai-prompts/principles.md` — canonical reference with rationale, before/after code examples, and the 3-condition rule for when `disabled` is actually appropriate.
- New **Design Principles** Storybook story under Introduction.
- `docs/ai-prompts/index.md` — Principles navigation section added.
- `CLAUDE.md` — rule added to Common pitfalls so Claude Code follows it automatically.
- `docs/ai-prompts/components/{button,checkbox,action-row,tile,tag}.md` — callout added near each component's `disabled` documentation, linking to the principles page.

### Checkbox

- **Indeterminate state added** — new `indeterminate` boolean attribute (reflected) displays a dash inside the checkbox box using the same filled blue background as the checked state.
- Hover and disabled variants work for the indeterminate state.
- Clicking an indeterminate checkbox resolves to `checked=true, indeterminate=false`.
- `aria-checked` now outputs `"mixed"` when indeterminate (ARIA 1.2 tri-state checkbox).
- `change` event detail extended: `{ checked: boolean, indeterminate: boolean }`.
- `States` Storybook story updated to a 3-column grid covering all three selection states × disabled.
- New `Indeterminate` story added.

## 2026-05-22

### Tokens

**Dark mode background and surface tokens updated** to match production dark mode colours.

- `--color-background` (dark): `var(--color-core-black)` → `var(--color-grey-10)` (`oklch(0.23 0.01 275)`)
- `--color-surface-primary` (dark): `var(--color-grey-20)` → `var(--color-grey-25)` (`oklch(0.35 0.01 234)`)
- `--color-surface-faded` (dark): `var(--color-grey-10)` → `var(--color-grey-25)` (`oklch(0.35 0.01 234)`)

Both classic and gift schema dark-mode overrides (`--schemas-classic-*` and `--schemas-gift-*`) updated.

## 2026-05-21

### Tokens

**Typography line-height export fixed** — the Figma token exporter plugin now emits the `typography/line-height` scale correctly. Previously Figma stored meaningless internal floats and produced CSS-invalid variable names containing `%`.

- Renamed scale tokens `--typography-line-height-percentage-{100,125,130,133,138,140,143,150,157}%` → `--typography-line-height-{n}`. The trailing `%` — invalid in a CSS custom property name — is gone.
- Values changed from unitless ratios to percentages: e.g. `--typography-line-height-138` is now `138%` (was `1.38`).
- New token `--typography-line-height-90` (`90%`).
- The responsive line-height tokens (`--typography-heading-{lg,md,sm}-line-height`, `--typography-body-md-line-height`, `--typography-body-sm-line-height`) now reference the renamed scale.
- Body responsive line-height tokens renamed `--typography-body-line-height` → `--typography-body-md-line-height` and `--typography-body-s-line-height` → `--typography-body-sm-line-height`, aligning the Layout collection variables with the `body/md` · `body/sm` text-style tiers. The Figma body text styles now resolve their `line-height` to these `var()` references instead of a frozen value (headings already did).
- Caption text style `--typography-caption-s` renamed to `--typography-caption-sm`, consistent with the `xs` / `xxs` siblings and the `sm` tier naming used elsewhere.
- Heading MD and SM weights corrected to **semibold (600)** to match the Figma text styles — Storybook previously rendered them as medium (500).
- Components updated to the new names: `<minis-alert>`, `<minis-button>`, `<minis-checkbox>`, `<minis-navigation-item>`, `<minis-pill-counter>`.

### Storybook

- **Design Tokens → Typography** — new "Line Heights" table documenting the full `--typography-line-height-{n}` scale with rendered previews.
- **Design Tokens → Text Styles** — new "Responsive line-heights" table. Heading and Body previews and Spec columns now read live values and re-flow when the Viewport toolbar tier changes.
- **Design Tokens → Text Styles** — each row's Token column now leads with the Figma composite text-style token (`--typography-heading-sm`, `--typography-body-md`…) and lists the `size` + `line-height` tokens it resolves to underneath. Headings, Body and Caption tables share one consistent layout.
- The Viewport switcher (`preview.ts`) now also overrides the responsive line-height tokens per tier, so line-heights visibly tighten/loosen across 2xs/xs · sm · md/lg · xl.

### Tile

- **Storybook docs updated** — `Grid Example` story replaced by `Navigation Grid`: a realistic 4-column shortcut grid (Moje nákupy, Košík, Oblíbené, Profil, Dárky, Extra slevy, Cashback, Benefity) demonstrating the primary grid usage pattern with `gap:8px` (`--linear-sp-linear-2`) on both axes and optional counter pills.

## 2026-05-15

### Tile

**New component** `<minis-tile>` ([Figma ↗](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4208-4230))

A vertical, icon-based navigation tile for primary shortcuts, typically arranged in a 4-column homepage grid.

#### API

| Prop | Type | Default | Description |
|---|---|---|---|
| `href` | `string` | `''` | Destination URL — renders `<a>` when set, `<button>` otherwise |
| `counter` | `string` | — | Inline counter pill after the label; omit or pass `""` to hide |
| `disabled` | `boolean` | `false` | Prevents interaction; reduces opacity to 0.6 |

| Slot | Required | Description |
|---|---|---|
| `icon` | **Yes** | Navigation icon 24×24 px — use `<minis-icon slot="icon" name="…">` |
| _(default)_ | **Yes** | Label text — short, ideally one word |

#### States

- `default` — white surface, grey border
- `hover` — blue-tinted surface (`--tile-hover-surface`)
- `disabled` — opacity 0.6, `pointer-events: none`, `cursor: not-allowed`

#### Visual spec

- Fixed height **70 px**: 1 px border + 12 px top padding + 24 px icon + 4 px gap + 16 px label row + 12 px bottom padding + 1 px border
- Icon colour: **blue** `#006eb9` (`--tile-icon-color`) — separate from the label colour (black)
- Counter pill: inverted colours — background = `--tile-counter-surface` (black), text = `--tile-counter-text` (white)
- Label row height fixed at 16 px; the 18 px pill overflows this row but is clipped by the tile's `overflow: hidden`
- `:host` enforces `min-width: calc(2 × --tile-padding-x)` = 64 px — x-padding is always visible; labels truncate with `…` rather than padding collapsing

#### New tokens

| Token | Value | Resolved | Purpose |
|---|---|---|---|
| `--tile-surface` | `var(--button-secondary-surface)` | `#fff` | Default background |
| `--tile-border` | `var(--button-secondary-border)` | `#cbccce` | Border colour |
| `--tile-text` | `var(--button-secondary-text)` | `#000` | Label text colour |
| `--tile-icon-color` | `var(--button-tertiary-text)` | `#006eb9` | Icon colour (blue) |
| `--tile-hover-surface` | `var(--button-secondary-hover-surface)` | `#e6f7fc` | Hover background |
| `--tile-counter-surface` | `var(--button-secondary-text)` | `#000` | Counter pill background (inverted) |
| `--tile-counter-text` | `var(--button-secondary-surface)` | `#fff` | Counter pill text (inverted) |
| `--tile-padding-top` | `var(--linear-sp-linear-3)` | `12 px` | Top padding |
| `--tile-padding-bottom` | `var(--linear-sp-linear-3)` | `12 px` | Bottom padding |
| `--tile-padding-x` | `var(--linear-sp-linear-8)` | `32 px` | Horizontal padding (each side) |
| `--tile-gap-elements-y` | `var(--linear-sp-linear-1)` | `4 px` | Gap: icon → label row |
| `--tile-gap-elements-x` | `var(--linear-sp-linear-2)` | `8 px` | Gap: label → counter pill |
| `--tile-label-row-height` | `var(--pixel-px-16)` | `16 px` | Fixed label row height |

#### Grid layout

- Use `repeat(N, 1fr)` for equal-width columns. **Do not use `minmax(0, 1fr)`** — it removes the tile's enforced minimum width and can collapse the padding.
- Size the container so the widest label fits. Reference: "Moje nákupy" (no counter) needs ~155 px tile width → ~644 px for a 4-column grid with 8 px gaps.
- **In tighter spaces, reduce the column count** (`repeat(3, 1fr)`, `repeat(2, 1fr)`) rather than shrinking tiles below a readable label width.

#### Storybook stories

Added under **Components / Navigations / Tile**: Playground, States, With Counter, As Link, Grid Example.

#### Docs

AI prompt reference added at `docs/ai-prompts/components/tile.md`.

### Action Row

#### Tokens

- `--action-row-text` updated: now references `--color-text-primary` (was `--color-interaction-secondary-accent`). Same value in light mode; slightly different in dark mode (near-white `--color-grey-95` instead of pure white).
- `--action-row-icon` added: references `--button-tertiary-text` (`--color-interaction-tertiary-accent`, blue `#006eb9`). Leading icons in the `variant="icon"` row are now styled with the tertiary-action blue, separate from the text colour.

### Storybook

- Navigation and Action Row components grouped under a new **Navigations** folder, reflecting their shared role in building all kinds of navigation and menus.

## 2026-05-14

### Action Row

- **New component** `<minis-action-row>` — interactive list row for vertical menus, dropdowns and filter lists
  - Leading `variant` (mutually exclusive): `none` (label only) · `icon` (leading icon slot, 24×24) · `checkbox` (leading `<minis-checkbox>`)
  - States: `default`, `hover` (auto on pointer hover, or forced via `state="hover"`), `active` (persistent highlight). Hover wins over active — an active row turns blue-tinted on hover.
  - Optional trailing counter via `counter` prop — always rendered directly after the label, using `<minis-pill-counter size="lg">` with white background and primary text colour (per Figma).
  - Props: `variant`, `state`, `active`, `checked` (checkbox variant only), `disabled`, `counter`
  - Slots: default (label), `icon` (only for `variant="icon"`)
  - Event: `change` → `{ checked: boolean }` (checkbox variant)
  - Keyboard: `Enter` / `Space` activate
- **New tokens** in `@minis/tokens` for the component:
  `--action-row-border-radius`, `--action-row-surface`, `--action-row-text`,
  `--action-row-hover-surface`, `--action-row-active-surface`,
  `--action-row-padding-x`, `--action-row-padding-y`,
  `--action-row-padding-x-icon-only`, `--action-row-padding-x-checkbox`,
  `--action-row-gap-icon`, `--action-row-gap-checkbox`
- AI prompt doc added at `docs/ai-prompts/components/action-row.md`

### Checkbox

- **New component** `<minis-checkbox>` — binary selection input
  - Initial states: `unchecked` / `checked`, each with hover styling
  - Props: `checked`, `disabled`, `name`, `value`
  - Slot: default (label)
  - Event: `change` → `{ checked: boolean }`
  - Keyboard: `Space` / `Enter` to toggle; `role="checkbox"`, `aria-checked`, `aria-disabled` reflected
  - Storybook reorganized — checkbox stories live under `Components/Inputs/Checkbox`
- AI prompt doc added at `docs/ai-prompts/components/checkbox.md`

### Tokens (Figma export sync)

- **New button tokens** for upcoming variants/spacing:
  - `--button-padding-x-icon-only` (8px), `--button-small-padding-x-icon-only` (3px), `--button-large-padding-x-icon-only` (12px)
  - `--button-gap-addon` (8px), `--button-gap-spacer` (2px) — plus matching `small-*` and `large-*` variants
  - `--button-icon-opacity` (1) and `--button-icon-opacity-icon-only-counter-pill` (0.75)
- **New `--cardgrid-gap`** token (= `--spacing-layout-xs`)
- **New `--menu-item-gap`** token (4px) for upcoming menu component
- **New typography line-height composite tokens**, responsive:
  - `--typography-body-line-height` (138% base → 150% md+)
  - `--typography-body-s-line-height` (143% base → 157% md+)
  - `--typography-heading-{lg,md,sm}-line-height` step down at md+
- **New layout tokens**:
  - `--container-bleeding-edge-padding` (0 base → 16px lg → 32px xl+)
  - `--page-width` (tracks current breakpoint tier)
- **New effect tokens**: `--effect-background-blur-10`, `--effect-elevation` (drop-shadow recipe for cards)
- *Note:* `--actionrow-*` tokens from the raw Figma export were superseded by the `--action-row-*` family above (used by the shipped `<minis-action-row>` component) and are not added to `tokens.css`.

## 2026-04-24

### Button

- **Updated** `--button-border-radius` from `--border-radius-sm` (4px) to `--border-radius-md` (8px)

## 2026-04-02

### Card Grid

- **Merged** `navigation-small-3` variant into `navigation-small` — removed standalone variant in favour of a `rows` attribute
- **New property** `rows` (number, reflected) on `<minis-card-grid>` — controls row count for `navigation-small` variant: `rows="2"` (default, 8 slots) or `rows="3"` (12 slots)
- Playground story now dynamically renders the correct number of slots based on selected variant and rows
- AI prompt doc (`docs/ai-prompts/components/card-grid.md`) updated with new API, travel-themed Unsplash placeholder images

### Button

- **Updated** icon sizing tokens — each button size now has its own dedicated icon size instead of a shared value for md/lg/xl
  - `sm` button: 16px (unchanged, now uses `--button-icon-sizing-xs`)
  - `md` button: 20px (was 24px, now uses `--button-icon-sizing-sm`)
  - `lg` button: 22px (was 24px, now uses `--button-icon-sizing-md`)
  - `xl` button: 24px (unchanged, now uses `--button-icon-sizing-lg`)
- **New token** `--button-icon-sizing-lg` (24px) added to the icon sizing scale
- **Changed** `--button-icon-sizing-sm` from 18px → 20px, `--button-icon-sizing-md` from 20px → 22px
- Icon sizing tokens (`--button-icon-sizing-*`) now exported to `tokens.css`

## 2026-03-20

### Topbar (renamed from Header)

- **Renamed** `<minis-header>` → `<minis-topbar>` for semantic clarity — the component is a brand identity bar (logo, shortcuts, cart), not a generic page header
- Custom element tag: `minis-topbar`, class: `MinisTopbar`
- CSS tokens renamed: `--header-height` → `--topbar-height`, `--header-actions-gap` → `--topbar-actions-gap`
- AI prompt doc moved: `docs/ai-prompts/components/header.md` → `topbar.md`
- All layout docs and navigation examples updated with full 11-item Slevomat category nav list

## 2026-03-19

### Layouts (AI Prompt Docs)

- **New `docs/ai-prompts/layouts/` directory** — layout instruction files for AI agents to vibe-code responsive pages
- **Layout system overview** (`layouts/index.md`) — breakpoint tiers, spacing tokens, 12-column grid, container, section cards, page structure pattern
- **Deal detail layout** (`layouts/deal-detail.md`) — hotel/experience page: header band, photo gallery, tabbed navigation, 4-col aside + 8-col main content grid, responsive mobile stacking, complete page skeleton with copy-paste AI prompt
- **Checkout layout** (`layouts/checkout.md`) — single-column checkout flow with `<minis-container variant="narrow">`, step tabs, stacked cards, CTA button

### Header

- **New component** `<minis-header>` — main brand bar (64px height) with logo slot (left) and actions slot (right)
- Slot-based: `logo` for brand mark, `actions` for `<minis-button>` elements
- Figma buttons mapped to: `variant="tertiary" size="sm"` for secondary actions, `variant="cta-buy"` for cart
- **Fix:** stories import corrected from broken relative path to `@minis/icons`
- **Fix:** logo replaced with real Slevomat wordmark SVG (`fill="#00B2E5"`) — previous version used reconstructed icon paths with `currentColor`
- **Fix:** Košík (`cta-buy`) button given `size="sm"` to match the tertiary action buttons
- **Fix:** `::slotted([slot="actions"])` gets `display: flex !important` — overrides `inline-block` from button's own `:host` shadow styles so all action buttons align on the same vertical axis (`!important` required because `::slotted()` in parent shadow tree has lower precedence than `:host` in the slotted element's own shadow tree)

### Container

- **New component** `<minis-container>` — responsive layout wrapper that applies `--container-*` tokens for max-width, horizontal padding (8→16→32px), and auto centering
- **`narrow` variant** — uses `--container-narrow-width` and `--container-narrow-padding` for narrower content areas (e.g. articles)
- No internal media queries — responsive behaviour comes from the token layer in `tokens.css`
- **Fix:** container widths corrected — `100000px` Figma placeholder replaced with `100%` on mobile, `752px` narrow from 768px+, `1240px` default from 1256px+
- **Fix:** `tokens` dist rebuilt to apply width changes (was serving stale `100000px` values)
- **Fix:** Default vs Narrow story updated to show page background so width difference is visible

### Card Grid

- **New component** `<minis-card-grid>` — responsive CSS-grid layout wrapper for cards and images
- **`navigation` variant** — 4-col grid, item 1 spans 2 cols (featured), item 6 spans 2 cols (wide mirror); mobile: horizontal scroll strip with equal-size cells
- **`navigation-small` variant** — uniform 4-col grid, row count determined by number of slotted items (8 = 2 rows, 12 = 3 rows); same mobile behaviour
- **`photogallery` variant** — asymmetric 5-col layout: large main photo (3-col × 3-row), wide image top-right (2-col × 2-row), two small thumbnails bottom-right; mobile: only main photo shown
- Pure layout wrapper — slots any content (cards, images, links)

### Tag

- **New: `icon-only` attribute on `toggle` variant** — hides the label and renders the tag as a square icon button (same height as width). Requires an icon in the `icon` slot. Useful for compact favourite/like buttons in tight layouts.

### Button

- **Font size by size** — `sm` uses `--typography-size-sm` (14px); `md`, `lg`, `xl` use `--typography-size-md` (16px)
- **Breaking: size values renamed** — `small` → `sm`, `medium` → `md`, `large` → `lg` to align with the rest of the design system's naming convention
- **New size `xl`** (48px height, `--pixel-px-48`) — the largest button for prominent hero CTAs
- **Heights adjusted**: `sm` 24px (`--pixel-px-24`), `md` 32px (`--pixel-px-32`), `lg` 40px (`--pixel-px-40`), `xl` 48px (`--pixel-px-48`)
- Icon-only variant uses the same height token for width (square) for all four sizes
- Default size updated from `medium` to `md`

## 2026-03-13

### Navigation & Navigation Item

- **New components** `<minis-navigation>` and `<minis-navigation-item>` — horizontal scrollable navigation bar based on slevomat.cz production patterns (`horizontal-nav__section` and `navigation__links`)
- `<minis-navigation>` variants: `horizontal` (category nav bar) · `tabs` (product detail tab switcher)
- `<minis-navigation-item>` props:
  - `href` — renders `<a>` when set, `<button>` otherwise
  - `active` — blue underline (2px) + bold text for the current page/tab
  - `color="positive"` — green accent (`--color-text-accent-positive`): icon is green at rest; text + underline turn green on hover and active
- Icon slot (20×20px) for leading icons
- `actions` slot on `<minis-navigation>` for right-aligned content (e.g. `<minis-tag variant="toggle">` favourite button)
- Horizontal overflow scroll with hidden scrollbar
- **No layout shift on active**: label reserves bold width via CSS `::after` ghost (`data-label` attribute + `height:0; visibility:hidden; font-weight:bold`) — sibling items never shift position when active changes
- Typography: Inter, 16px (`--typography-size-md`), 1.5 line-height; no horizontal padding on items
- Navigation tokens added to `packages/tokens/src/tokens.css`: `--navigation-gap`, `--navigation-border-color`, `--navigation-item-padding-y`, `--navigation-item-gap`, `--navigation-item-icon-size`, `--navigation-item-accent`, `--navigation-item-active-accent`, `--navigation-item-active-border-color`, `--navigation-item-active-border-width`, `--navigation-item-hover-border-color`
- AI prompt doc: `docs/ai-prompts/components/navigation.md`

### Tag

- **New component** `<minis-tag>` — compact pill-shaped label with four variants:
  - `static` — read-only label (default), rendered as a `<div>`
  - `clickable` — lightweight action (open modal/tooltip), rendered as a `<button>`; returns to default state after click, no persistent state
  - `toggle` — toggle/checkbox-style button, rendered as `<button aria-pressed>`; persists pressed state, fires `toggle` event with `{ pressed: boolean }` detail; icon typically switches outline ↔ filled (e.g. `heart` ↔ `heart-fill`)
  - `dismissible` — applied filter with built-in ✕ button; fires `dismiss` event
- Fixed height `32px`; typography fully inherited from context
- Icon slot sizes: `20×20px` for static/clickable/dismissible, `24×24px` for toggle
- Padding: `4px` vertical, `6px` horizontal; gap `4px`
- `pressed` boolean attribute for pre-selected toggle state (`toggle` variant only)
- `disabled` boolean attribute (`clickable` and `toggle` variants)
- All colours via `--color-interaction-secondary-*` tokens — light/dark mode automatic
- AI prompt doc: `docs/ai-prompts/components/tag.md`
- **Padding tokens aligned with Figma**: `--tag-padding-x` (8px, with icon), `--tag-padding-x-noicon` (16px, label only), `--tag-padding-y` (0px)
- **Dismiss button** replaced plain `<button>` with `<minis-button variant="tertiary" size="small" icon-only>` — inherits full tertiary button styling and focus/hover states
- **Padding applies contextually**: `--tag-padding-x-noicon` (16px) when no icon; `--tag-padding-x` (8px) when icon is present via `.tag--has-icon` class

### Tokens

- **Tag component tokens** added to `packages/tokens/src/tokens.css`: `--tag-height`, `--tag-padding-x`, `--tag-padding-y`, `--tag-gap-elements`, `--tag-icon-size`, `--tag-toggle-icon-size`
- **Tag tokens updated** from Figma export: `--tag-padding-x` → `var(--spacing-layout-xs)` (8px); added `--tag-padding-x-noicon` → `var(--spacing-layout-sm)` (16px); `--tag-padding-y` → `var(--spacing-layout-none)` (0px); `--tag-gap-elements` → `var(--linear-sp-linear-1)` (4px); added `--tag-gap-icon-correction` → `var(--pixel-px-2)`

### Storybook

- **Story source panel**: added `docs.source.excludeDecorators: true` globally in `preview.ts` — decorator wrapper div no longer appears in the "Show code" examples, so users see only the component markup when copying code snippets.

## [Unreleased]

### Changed

- **Alert**: updated typography to use design tokens — `--typography-font-family-sans` (Inter), `--typography-weight-regular`, `--typography-line-height-percentage-133%` (1.33)
- **Alert**: icon and text use `align-items: flex-start`; when icon is visible, content gets `margin-top/bottom: var(--pixel-px-3)` (3px) for optical alignment with the icon
- **Alert (Storybook)**: added Figma link (`node-id=2513-8007`) to the component docs page, consistent with Button and Pill Counter

## 2026-03-12

### Button

- **`size` fallback**: `size` property now normalises invalid or missing values to `'medium'` via a setter. Attribute is reflected so CSS selectors always match a valid value.

### Message

- **Vertical layout redesign**: replaced column-flex + absolute-positioned close button with a proper flex-row structure: visual left, body column right (`.body` = column: `.header` row with title + close button, then description below).
- **Close button alignment**: `.header` uses `align-items: flex-start` so the close button aligns with the top of the title text.
- **Bug fix**: close button was using invalid `size="md"` — corrected to `size="medium"`.
- **AI prompt doc**: added `docs/ai-prompts/components/message.md`.

## 2026-03-07

### Button

- **Accessibility fix**: ARIA attributes (`aria-label`, `aria-labelledby`, `aria-describedby`) set on `<minis-button>` are now forwarded to the inner `<button>` element. Screen readers will correctly announce icon-only buttons with `aria-label`.
- **Accessibility fix**: In `icon-only` mode the label `<slot>` is now visually hidden (`.visually-hidden` pattern) instead of removed from the DOM, so any slotted text is preserved in the accessibility tree and contributes to the button's accessible name.
- Host element gets `role="none"` to avoid a redundant button role announcement from the custom element wrapper.
