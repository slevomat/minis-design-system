---
id: 030
title: Layout guides — page layout rules grounded in production
status: draft
created: 2026-11-20
updated: 2026-11-27
owner: Lexislav
---

# 030 — Layout guides: page layout rules grounded in production

> Grew out of the production layout audit (plan 017, slice "Layout — 2026-11-13"). The measured
> facts live in [`docs/ai-prompts/layouts/production-reference.md`](../docs/ai-prompts/layouts/production-reference.md)
> and, drawn to scale, on the Figma report card
> [Production layouts: slevomat.cz](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=6255-1204)
> (Layouts page). This plan holds the decisions and the work. Link to those two for numbers;
> don't copy them here, or they drift.

## Problem

The Mini*S layout guides (`docs/ai-prompts/layouts/index.md`, `deal-detail.md`, `checkout.md`,
written in March 2026) were written before anyone measured production. They prescribe:

- a 12-column CSS grid as the page system,
- a main + sidebar split of 8 + 4 columns with a 48px gap, stacking below 768px,
- one narrow container (752px) for checkout.

Production builds pages differently: three width levels (wide 1240px, narrow 1008px, a ~704px
reading/form column), main + sidebar split per component with flexbox (2.2 : 1 to 3 : 1, gaps
24–40px), stacking below 1008px, and no page-level 12-column grid on the public site.

So a page vibe-coded from the guides doesn't line up with the production page next to it, and a
designer or developer reading the guides learns rules production doesn't follow. The guides are
also what AI agents read first when they build a page, so the mismatch multiplies.

## Constraints

- **Production is the reference, read-only.** `../slevomat` is never written to. Mini*S proposes;
  production adopts through the porting rules (plan 014), which also decide which side wins when
  they differ.
- **Tokens go through Figma first.** Any new or changed layout token is set in the Figma Layout
  collection (per mode), then in `tokens.json`, `tokens.rgb.json` and `tokens.css`, and logged in
  `CHANGELOG.md` and the Storybook Changelog (CLAUDE.md → Changelog rules). Check the Storybook
  Tier toolbar after every tier-dependent change.
- **Figma modes and CSS tiers don't line up yet** (gap G12 in plan 003). A token that changes per
  breakpoint must be checked in both, mode by mode.
- **Two responsive mechanisms stay.** Page layout follows viewport tokens; components that
  rearrange themselves use container queries (`docs/ai-prompts/layouts/index.md`).
- **`<minis-container>` is public API.** Renaming or re-meaning `variant="narrow"` breaks
  consumers: it needs a changelog entry with a migration note, the `.figma.ts` mapping, the story,
  the component doc and the Figma component.
- **Facts and proposals stay apart** in `production-reference.md`: observed, compared, proposed.

## Decided

| Date | Decision | Where it landed |
|---|---|---|
| 2026-11-20 | Container padding reaches 32px at 1008px, as in production (was 1256px). Both `--container-padding` and `--container-narrow-padding`; Figma Layout mode `lg`. The Storybook Tier toolbar split `md / lg` into two tiers. | Commit `a6b01d9`; `production-reference.md` question 2 |
| 2026-11-26 | **G12 values:** `--spacing-layout-*` take the Figma Layout collection values, which production's `_variables.styl` (`$layout-{mode}-spacing-*`) already carries mode for mode. `tokens.css` changes between 0 and 1007px; from 1008px up nothing changes. | G12 in plan 003; `tokens.css`, both changelogs |
| 2026-11-26 | **G12 tiers:** CSS media-query tiers map 1:1 to the Figma modes, named like the breakpoints: `default` < 360, `2xs` 360, `xs` 408, `sm` 600 (new CSS step), `md` 768, `lg` 1008, `xl` 1256, `2xl` 1480, `3xl` 1920, `4xl` 2560. Same as production's `+mobile-small()` … `+desktop-extra-wide()`. The Storybook Tier toolbar gets one entry per mode. | `tokens.css`, `tier-tokens.ts` |
| 2026-11-26 | **Container padding** is 16px from 408px (production live, `tokens.css`): Figma mode `xs` 8 → 16 for `--container-padding` and `--container-narrow-padding`. Figma `default` mode 32 → 8 (a leftover). | Figma Layout collection, exports |
| 2026-11-26 | **`--container-width`** caps at 1240px from mode `lg` (1008px), in Figma and CSS. Renders like production's unconditional `max-width: 1240px`. | Figma, exports, `tokens.css` |
| 2026-11-26 | **Q1 — main + sidebar:** fixed sidebar **320px** (new token `--layout-sidebar-width`, Figma `layout/sidebar/width`), main column fluid, gap `--spacing-layout-lg` (32px from 1008). Sidebar on the right. At 1008px: 592 + 32 + 320; at 1240px+: 824 + 32 + 320 (2.6 : 1). | `production-reference.md` question 1 |
| 2026-11-26 | **Q2 — 1008px level:** new `<minis-container variant="medium">`, max 1008px from 1008px (`--container-medium-width`, Figma `container/medium/width`), padding `--container-padding`. Non-breaking: `narrow` stays 752px as the reading/form column. Content at 1008px+: 944px. | `production-reference.md` question 3 |
| 2026-11-26 | **Q3 — stacking:** main + sidebar is one column below 1008px, as production. | `production-reference.md` question 4 |
| 2026-11-26 | **Primitive:** main + sidebar is a component, `<minis-sidebar-layout>` (default slot = main, `sidebar` slot). Side by side needs a 1008px+ viewport (media query) **and** an own width of 944px+ (container-query guard). Implementation finding, same day: a container query alone can't express "below 1008px" — container padding jumps 16 → 32px at 1008px, so the content box is 975px at a 1007px viewport and 944px at 1008px. Full component set. | commit `a575d46`; `sidebar-layout.md` |
| 2026-11-27 | **Figma page templates:** responsive page template components with one slot per section, switched **only by the Layout mode** in the appearance panel (no Breakpoint variant). First batch: listing (like /cestovani), deal detail, cart / checkout, homepage, magazine, vibe-app shell. Own page `↳ Page templates`; the Layouts page examples become instances. | phase 6 |
| 2026-11-27 | **Sidebar stacking in Figma** uses a Figma-only helper, `figma-only/sidebar/width` (container content width per mode below `lg`, 320px from `lg`), bound to the Sidebar slot's min and max width. The exporter skips the reserved `figma-only/` group (1.3.2) instead of exporting it as a CSS token. | phase 6 |

**G12 values after the decision** (px; Figma = production = new `tokens.css`; **bold** = a change in
`tokens.css`, *italic* = a change in Figma):

| Token | `default` < 360 | `2xs` 360 | `xs` 408 | `sm` 600 | `md` 768 | `lg` 1008 | `xl` 1256 | `2xl`+ 1480 |
|---|---|---|---|---|---|---|---|---|
| `--spacing-layout-xs` | 4 | 4 | **4** (was 8) | 8 | 8 | 8 | 8 | 8 |
| `--spacing-layout-sm` | **8** (was 12) | 12 | **12** (16) | 16 | 16 | 16 | 16 | 16 |
| `--spacing-layout-md` | **12** (16) | 16 | **16** (24) | **16** (24) | **20** (24) | 24 | 24 | 24 |
| `--spacing-layout-lg` | **16** (20) | **16** (20) | **16** (32) | **20** (32) | **24** (32) | 32 | 32 | 32 |
| `--spacing-layout-xl` | **20** (32) | **20** (32) | **24** (48) | **32** (48) | **32** (48) | 48 | 48 | 48 |
| `--container-padding` / `-narrow-padding` | *8* (Figma was 32) | 8 | *16* (Figma was 8) | 16 | 16 | 32 | 32 | 32 |
| `--container-width` | 100% | 100% | 100% | 100% | 100% | ***1240*** (was 100%) | ***1240*** (Figma was 100%) | 1240 |
| `--container-medium-width` (new) | 100% | 100% | 100% | 100% | 100% | 1008 | 1008 | 1008 |
| `--layout-sidebar-width` (new) | 320 | 320 | 320 | 320 | 320 | 320 | 320 | 320 |

`--spacing-layout-xxl` (24, fixed), `--container-narrow-width` (752 from 768) and
`--container-bleeding-edge-padding` don't change. Components that get tighter between 360 and
1007px: `alert` and `card-grid` (`xs`), `tag` (`xs`/`sm`), `page-header` (`sm`, `lg`).

## Approach

Build the guides on the model production actually uses, and make each of its choices one rule
instead of a per-component habit:

1. **Three width levels** as the backbone: wide container for browsing pages (homepage, listings,
   deal detail, magazine), narrow container for task pages (cart, login, checkout), and a
   reading/form column for text and forms. The guide tells a designer which one a page is.
2. **One main + sidebar rule**: one ratio, one gap token, one stacking breakpoint, sidebar on the
   right. Production's measured range is the evidence; the values are a design call (open
   questions 1 and 3).
3. **The 12-column grid becomes an optional tool**, not the page system. Card and tile grids stay
   inside components (`<minis-card-grid>`).

Rejected:

- **Copying production's container classes** (`grid-wrap`, `flex-wrapper`, `layout-wrapper`). They
  overlap and disagree on padding; production itself uses `flex-wrapper` only for site chrome, and
  `layout-wrapper` didn't render on any measured page.
- **Keeping the 12-column page grid as the system.** The public site doesn't load it (only the
  admin and partner bundles do), and no measured page needed more than a main + sidebar split.
- **Standardising nothing and documenting production's spread** (2.2 : 1 to 3 : 1, 24–40px). That
  is exactly the inconsistency a design system is supposed to remove.

## Phases

### Phase 1 — Decisions (owner + design)

- [x] Open question 1: sidebar ratio and gap token
- [x] Open question 2: a 1008px container level, and what to call the levels
- [x] Open question 3: stacking breakpoint for main + sidebar
- [x] Record each answer here under "Decided" and in `production-reference.md` section 3

### Phase 2 — Measure what's missing (moved to plan 032)

Moved out on 2026-11-27: the owner doesn't want pages behind login measured now. Plan
[032](032-logged-in-page-layouts.md) keeps it as a nice-to-have, starting with a code-only pass
that needs no sign-in. Nothing in this plan waits for it.

### Phase 3 — Tokens and component (only what phase 1 decides)

- [x] G12: Figma Layout collection fixes (`xs` and `default` container padding, `--container-width`
      from `lg`), re-export, `tokens.css` on 1:1 tiers, Storybook Tier toolbar per mode, both changelogs
- [x] Sidebar token `--layout-sidebar-width` (320px) and the gap rule (`--spacing-layout-lg`, no new
      gap token): Figma Layout collection, exports, `tokens.css`, both changelogs
- [x] `<minis-container variant="medium">` (1008px): component, styles, `.figma.ts`, story,
      `docs/ai-prompts/components/container.md`, Figma component. Non-breaking, so no migration note
- [x] `<minis-sidebar-layout>`: component, styles, story, `.figma.ts`, doc, `index.ts` export, Figma
      component — one commit
- [x] Storybook Tier toolbar and the Containers diagrams in Figma (Breakpoints & Containers page)
      still match

### Phase 4 — Guides

- [x] `docs/ai-prompts/layouts/index.md`: the three-level model, the main + sidebar rule, the
      12-column grid as an optional tool, the page structure diagram
- [x] `deal-detail.md` and `checkout.md` follow the decisions; their "Production differs" notes go
      once the difference is gone
- [x] Figma: the layout templates on the Layouts page (web and vibe-apps sections) match the
      guides; close the questions on the report card. Done 2026-11-26: every main + aside GRID
      frame (deal pages, homepage, blog; web and vibe-apps) is a `sidebar-layout` instance,
      `columns` from LG, `stacked` below; the cart templates already used the narrow column.
      Report card questions 1, 3, 4 resolved, 5 still open

### Phase 6 — Figma page templates (added 2026-11-27)

- [x] `figma-only/sidebar/width` in the Layout collection; six `page template/*` components with
      slots on `↳ Page templates`, width bound to `page/width`, containers and spacing bound to the
      Layout variables; responsive preview at `lg` / `md` / `2xs`; docs card
- [x] Layouts page examples (web and vibe-apps sections) replaced by template instances
- [x] Exporter 1.3.2 skips the `figma-only/` group (exporter repo, branch `feat/figma-only-group`);
      `pnpm tokens:check` fails on a `figma-only` token
- [x] Exporter 1.3.2 merged (slevomat/figma-plugins#7, 2026-11-27) and installed
- [x] Next token export (made with 1.3.2) passes `pnpm tokens:check`, with no `figma-only` token —
      checked 2026-11-27 on the references export (`tokens.json`, 12:10): all checks pass, no token
      changed against the committed export, so nothing was committed
- [ ] The page-to-figma skill (plan 031) fills a template instance instead of building frames
- [ ] Missing pieces the templates show: site footer, breadcrumbs, TopBar mobile variant,
      PageHeader following the Layout mode

### Phase 5 — Hand-over

- [ ] Porting note for production (plan 014) and registry entries for the layout rules (plan 013),
      once those exist

## Open questions

The numbering here is this plan's. The matching question in `production-reference.md` section 3
is given in brackets.

Questions 1–3 and 5 were answered on 2026-11-26 (see "Decided"); question 4 moved to plan 032 on 2026-11-27.

1. ~~**Should Mini*S standardise the sidebar ratio and the gap?**~~ Decided: fixed 320px sidebar, `--spacing-layout-lg` gap. (reference question 1) Candidates:
   2 : 1 (8 + 4 of 12, or `2fr 1fr`), 3 : 1, or a fixed sidebar of 300–360px. And which gap token:
   today's guide uses `--spacing-layout-xl` (48px), wider than any measured production gap
   (24–40px).
2. ~~**Does Mini*S need a 1008px container level?**~~ Decided: `variant="medium"`, non-breaking. (reference question 3) Options: a third
   `<minis-container>` variant, or renaming today's `narrow` (752px) to something like `reading`
   with a new `narrow` at 1008px. The rename is a breaking API change.
3. ~~**Should main + sidebar stack below 1008px (production) or below 768px (today's guide)?**~~ Decided: below 1008px.
   (reference question 4) Between 768 and 1007px the guide shows two columns where production
   shows one.
4. ~~**Are pages behind login built the same way?**~~ Moved to plan 032 (nice to have).
   (reference question 5) Not measured. `layout-wrapper` (96 uses in the code) most likely lives there.
5. ~~**Does G12 have to land first?**~~ Yes, and it did: G12 decided 2026-11-26 and lands before the guides. The guides use `--spacing-layout-*` for gaps, and Figma and
   `tokens.css` disagree on those values today (plan 003, gap G12). Writing guides on values that
   are about to change means rewriting them.

## Related

- **017** Production reference audit — the measuring method and the layout slice
- **003** Gap G12 — layout spacing values and the Figma mode ↔ CSS tier mapping
- **014** Porting rules — which side wins when Mini*S and production differ
- **013** Registry — where the layout rules get registered
- **032** Logged-in page layouts — the former phase 2 and question 4, as a nice-to-have
