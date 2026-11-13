---
id: 022
title: Accessibility checks — token-pair contrast and an axe run, warning first
status: draft
created: 2026-11-13
updated: 2026-11-13
owner: Lexislav
---

# 022 — Accessibility checks: token-pair contrast and an axe run, warning first

> **Gap G3 in plan 003, turned into a plan** (2026-11-13). Rollout phase 2 ("Checks",
> December 2026 – January 2027), next to plan 011 (Stylelint). It's the machine half of core rule 3.

## Context

Core rule 3: **contrast, focus states, labels and keyboard control meet WCAG 2.2 AA**. The brief
says it's checked "automatically in CI: an a11y test and a contrast check of token pairs", and
lists quality and accessibility among the goals: "WCAG as the default, not a later fix".

**What exists on 2026-11-13:**

- **This repo:** `@storybook/addon-a11y` is installed and registered, so axe results show in the
  Storybook panel, but nothing fails a build. CI (`.github/workflows/ci.yml`) runs build,
  typecheck and lint only. `vitest` is configured in `@minis/components` with no test files. A
  few component docs mention contrast (`button.md`, `topbar.md`); no script checks it.
- **Tokens:** semantic colours in light and dark mode, and colour schemas
  (`--schemas-classic-*`, Gift) under `data-theme`. Their pairings are known (surface + accent,
  surface + text) but never measured together.
- **Production** (plan 017, commit `bb1847f86e4`): no axe, pa11y or Lighthouse in
  `package.json`; Latte templates hold 309 `aria-label` and 64 `aria-hidden`; Stylus has 85
  `:focus` rules and 6 `:focus-visible`. BackstopJS already renders every styleguide section and
  key pages in a headless browser, which an axe pass could reuse.

## The problem

- **The rule has no check.** An inaccessible token pair or component can ship today with green CI.
- **Contrast is a token decision, made per pair and per mode.** A new semantic colour can pass in
  light mode and fail in dark or Gift; nobody would notice until a page shows it.
- **Production is where users are,** and it has no automated a11y check at all. Mini*S can't add
  one there by itself (plan 020: production conventions win, production merges).

## Constraints

- **Warning first, then blocking**, with a baseline, the same as plan 011: existing violations
  are listed, new ones fail. Otherwise the first run blocks everything and gets switched off.
- **WCAG 2.2 AA is the bar:** 4.5:1 for text, 3:1 for large text, UI components and focus
  indicators (1.4.3, 1.4.11, 2.4.7, 2.4.11 "Focus Not Obscured", 2.5.8 "Target Size (Minimum)").
- **Automated checks catch part of it.** Keyboard order, labels that make sense and screen-reader
  flow need a manual check; the plan says which part is machine-checked and which isn't.
- **Tokens are the source of truth** (plan 014): contrast is checked on token pairs from
  `tokens.css`, not on hand-typed hex values.
- **Nothing is installed in production without its team** (plans 010, 020).

## Approach

Three layers, cheapest first:

1. **Token-pair contrast script** in this repo. A list of the pairs that are meant to go together
   (text on surface, accent on interaction surface, border on background, focus ring on every
   surface), resolved for light, dark and each colour schema. Report the ratio against the WCAG
   threshold; run in CI. The pair list lives next to the tokens, so a new token comes with its
   pairs. Its output also feeds the registry's `meta.tokens` (plan 013) and the Figma docs cards.
2. **axe over Storybook in CI.** Run every story through axe with the Storybook test runner (or
   Playwright on the static build), in light and dark mode. Warning mode with a baseline file;
   blocking for new stories once the baseline is clean.
3. **A proposal for production:** an axe pass in the existing BackstopJS run over the styleguide
   pages, plus the token-pair report for the Stylus variables. Offered through plan 020's channel,
   decided by the production team.

Plus a short **manual checklist** for what machines can't see (keyboard path, focus order, label
wording, screen-reader output), linked from every recipe (plan 023) and from the contribution
skill (plan 005).

**Rejected:**

- **Relying on the Storybook a11y panel.** It shows problems to whoever opens it; nothing stops a
  merge.
- **Lighthouse scores.** One number per page, not per component or token pair; hard to baseline.
- **Checking only the web components.** Production doesn't render them (plan 003), so the token
  pairs (which do reach production) matter more than the component markup.

## Phases

- [ ] **Phase 0 — Pair list.** Write the intended token pairs for text, interaction, border and
      focus, per mode and schema. Review it with design.
- [ ] **Phase 1 — Contrast script in CI**, warning mode; publish the first report with every pair
      below threshold. Fixing values is a token decision (plan 001 for heritage steps).
- [ ] **Phase 2 — axe over Storybook**, light and dark, warning mode with a baseline.
- [ ] **Phase 3 — Blocking** for new violations in both checks, once the baselines are agreed.
- [ ] **Phase 4 — Production proposal:** axe in BackstopJS over the styleguide, the contrast
      report on Stylus variables. Bring it to the production team (plan 020).
- [ ] **Phase 5 — Manual checklist**, linked from recipes (023), the contribution skill (005) and
      the docs.

## Dependencies

- **011** — the same warning → blocking rollout with a baseline; ship them together in phase 2.
- **001** — failing pairs on heritage steps can't be fixed by changing the value; they need a
  different pairing or plan 001's curve.
- **013** — the registry entry records which pairs an item uses and whether they pass.
- **020** — anything in production goes through the agreement.
- **023** — every recipe links the manual checklist and passes the automated checks.

## Open questions

1. **Which pairs are "meant to go together"?** Design owns that list; does it come from Figma (a
   variable collection or a docs card) or from this repo?
2. **Dark mode and Gift: same bar?** The brief doesn't say whether every schema must pass AA, or
   only the default.
3. **Test runner:** Storybook test runner (needs a running Storybook) or Playwright on the static
   build (simpler in CI)?
4. **Does the production team want an a11y check at all now**, or after the token check (011) has
   settled?
5. **Who owns the manual checklist** and when is it run: on every new recipe, or at the monthly
   review (plan 021)?
