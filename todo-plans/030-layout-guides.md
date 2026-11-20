---
id: 030
title: Layout guides — page layout rules grounded in production
status: draft
created: 2026-11-20
updated: 2026-11-20
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

- [ ] Open question 1: sidebar ratio and gap token
- [ ] Open question 2: a 1008px container level, and what to call the levels
- [ ] Open question 3: stacking breakpoint for main + sidebar
- [ ] Record each answer here under "Decided" and in `production-reference.md` section 3

### Phase 2 — Measure what's missing

- [ ] Pages behind login and the checkout steps after the cart, with the method in plan 017
      ("Layout — 2026-11-13"). The user signs in; Claude never enters credentials.
- [ ] Add the results to `production-reference.md` and to the Figma report card

### Phase 3 — Tokens and component (only what phase 1 decides)

- [ ] Gap token for main + sidebar, if one is decided: Figma Layout collection, exports,
      `tokens.css`, both changelogs
- [ ] `<minis-container>` variant or rename for the 1008px level, if decided: component, styles,
      `.figma.ts`, story, `docs/ai-prompts/components/container.md`, Figma component, migration note
- [ ] Storybook Tier toolbar and the Containers diagrams in Figma (Breakpoints & Containers page)
      still match

### Phase 4 — Guides

- [ ] `docs/ai-prompts/layouts/index.md`: the three-level model, the main + sidebar rule, the
      12-column grid as an optional tool, the page structure diagram
- [ ] `deal-detail.md` and `checkout.md` follow the decisions; their "Production differs" notes go
      once the difference is gone
- [ ] Figma: the layout templates on the Layouts page (web and vibe-apps sections) match the
      guides; close the questions on the report card

### Phase 5 — Hand-over

- [ ] Porting note for production (plan 014) and registry entries for the layout rules (plan 013),
      once those exist

## Open questions

The numbering here is this plan's. The matching question in `production-reference.md` section 3
is given in brackets.

1. **Should Mini*S standardise the sidebar ratio and the gap?** (reference question 1) Candidates:
   2 : 1 (8 + 4 of 12, or `2fr 1fr`), 3 : 1, or a fixed sidebar of 300–360px. And which gap token:
   today's guide uses `--spacing-layout-xl` (48px), wider than any measured production gap
   (24–40px).
2. **Does Mini*S need a 1008px container level?** (reference question 3) Options: a third
   `<minis-container>` variant, or renaming today's `narrow` (752px) to something like `reading`
   with a new `narrow` at 1008px. The rename is a breaking API change.
3. **Should main + sidebar stack below 1008px (production) or below 768px (today's guide)?**
   (reference question 4) Between 768 and 1007px the guide shows two columns where production
   shows one.
4. **Are pages behind login built the same way?** (reference question 5) Not measured.
   `layout-wrapper` (96 uses in the code) most likely lives there.
5. **Does G12 have to land first?** The guides use `--spacing-layout-*` for gaps, and Figma and
   `tokens.css` disagree on those values today (plan 003, gap G12). Writing guides on values that
   are about to change means rewriting them.

## Related

- **017** Production reference audit — the measuring method and the layout slice
- **003** Gap G12 — layout spacing values and the Figma mode ↔ CSS tier mapping
- **014** Porting rules — which side wins when Mini*S and production differ
- **013** Registry — where the layout rules get registered
