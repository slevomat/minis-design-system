---
id: 016
title: Production reference audit — what the Slevomat repo tells the refit
status: draft
created: 2026-11-06
updated: 2026-11-06
owner: Lexislav
---

# 016 — Production reference audit — what the Slevomat repo tells the refit

> Reads one repo and writes to another. The production Slevomat repo is cloned at
> `../slevomat` (`slevomat/slevomat`, `master`) with **read-only access**. Everything this plan
> produces lands in this repo. Nothing is proposed to production until the Slevomat team agrees
> (plan 009 and the future PR with Mini*S tools, agents and skills).

## Context

Mini*S is being redefined from a UI kit into guardrails ("mantinely") that anyone, human or AI,
builds with. Most of those guardrails have to work in production, and until now we have reasoned
about production second-hand: the Nette team's adoption analysis (29. 10. 2026, in the refit
brief → "Adopce tokenů v Nette repozitáři") and the token audit in plan 014. With a local clone we
can measure production ourselves, repeatably, and with commit hashes.

A first look (2026-11-05/06, production at `bb1847f86e4`) found that production is further along
than the brief assumes, and in places differently from how plans 010 and 013 assume:

- **The token pipeline exists.** `build/style-dictionary/` builds the "MiniS DS" Figma export into
  `app/stylus/settings/_variables.styl` (729 variables) and `doc/tokens/kotlin/Tokens.kt`. The
  heritage colour aliases in `colors.styl` were retired on 2026-11-02, and paired semantic aliases
  (`$color-surface-primary` → `$color-light-…` / `$color-dark-…`) were added in
  `settings/color-semantic.styl`. That is the "fastest way to raise adoption" from the brief,
  already done.
- **Colours are nearly all tokens, spacing almost not at all.** Outside `settings/`, production's
  Stylus sources (383 files in `app/stylus/`) hold 4,122 `$color-*` references, but only 84 hex literals besides `#fff` / `#000` (those
  two are on Stylelint's allow-list). They also hold **15,486 raw `px` values** and 59
  `letter-spacing` declarations, and the Latte templates use 12,346 `u-*` utility classes.
- **Most colour references are primitives, not semantic tokens.** 2,619 of the 4,122 (64 %) are
  ramp steps (`$color-grey-90` alone 554×, `$color-blue-45` 196×), and 679 are explicit
  `$color-dark-*`. So dark mode is written out property by property, not carried by the token.
- **Guardrails already run there.** Stylelint parses Stylus (`postcss-styl` + `stylelint-stylus`).
  `scale-unlimited/declaration-strict-value` covers colour, `box-shadow`, `border-radius` and
  `font-weight`, and 10 custom plugins in `build/stylelint-plugins/` include
  `no-deprecated-variable`, `dark-default-equivalent` and `background-color-for-light-dark`.
  Production also runs colorguard, a KSS styleguide (`bin/phing generate-styleguide`, `Markup:`
  blocks in 39 Stylus files) and **BackstopJS visual regression over that styleguide**.
- **Their web components aren't ours.** `app/js/components/` holds 23 light-DOM custom elements:
  no Shadow DOM, no Lit (`doc/ai/skills/web-components.md`). Mini*S Lit components can't be
  dropped in. What ports is the recipe (tokens, anatomy, states, class names) as Latte + Stylus.
- **They have their own AI layer.** `AGENTS.md` plus 30+ skills in `doc/ai/skills/` (`stylus.md`,
  `figma.md`, `latte-controls.md`, `modals.md`, `styleguide-documentation.md`,
  `brand-themes.md`, …). These are the production conventions that plans 003 and 013 have to
  build on.
- **Component usage is measurable.** Ranking the classes in 2,470 Latte templates:
  `button` 3,053 · `grid-wrap`/`grid`/`container` ~1,650 · `content-message` + `message` 594 ·
  `tags` 363 · `tooltip` 355 · `the-datepicker-wrapper` 333 · `message-overlay` 310 ·
  `product-detail-harmonica` 280 · `loader` 258 · `autocomplete` 257 · `process-steps` 173 ·
  `dropdown` 153.

The numbers differ from the Nette team's 29. 10. analysis (about 1,300 hex and 14,400 px there).
Part of that is the 2. 11. alias retirement, part is counting method. That is why this plan wants
one repeatable script rather than more one-off counts.

## The problem

- **Plans read production second-hand.** Plans 001, 003, 010, 011, 012 and 013 each need a fact
  about production, and each carries its own assumption or a dated count.
- **No usage-ranked component list.** The Mini*S component set grew from Figma and design needs,
  not from what production renders most. Tooltip, datepicker, autocomplete, loader, steps and
  dropdown are among production's most used blocks and have no Mini*S counterpart.
- **No primitive → semantic map.** Moving production from `$color-grey-90` to semantic tokens
  needs to know what each primitive is *used for* (border, text, surface), property by property.
  Plan 001 needs the same data to see which heritage steps production really depends on.
- **Plan 010 is designed for CSS custom properties.** Production compiles Stylus variables to
  literal CSS, so there are no Mini*S custom properties at runtime. A guardrail there has to check
  `$variables`, and it should extend the Stylelint setup production already has.

## Constraints

- **Read-only.** Never edit, commit, branch or push in `../slevomat`. `git pull --ff-only` to
  refresh is fine. Scripts and results live in this repo.
- **Production conventions win** (as in plan 003). The audit describes production, it doesn't
  grade it. Recommendations that touch production go through the Slevomat team.
- **Every number carries the production commit hash and the date**, and comes from the committed
  script, so it can be re-run and compared.
- **Heritage colours stay untouched** (plan 001). The audit measures their use, it proposes no
  value changes.
- **No production code or proprietary assets get copied into this repo.** Results are counts,
  names and short pattern descriptions. Brand fonts stay out (CLAUDE.md → Kensington).
- The user is an external contractor. Results are hand-over material and must read without this
  repo's `CLAUDE.md`.

## Approach

One small audit script in this repo, run against the clone. It writes a dated, committed snapshot
(Markdown summary + JSON data). The snapshot feeds the other plans, and each plan links to it
instead of keeping its own counts.

What the script measures:

1. **Token adoption.** `$color-*` by type (primitive / semantic / paired dark / light), hex and
   `px` literals per property, raw `letter-spacing` and `font-size`. Typography class usage
   (`typo-*`), as the brief asks for.
2. **Component usage.** Class frequency in Latte templates per component block, mapped to Stylus
   files in `app/stylus/components/` and to light-DOM elements in `app/js/components/`.
3. **Primitive usage by property.** Each primitive × the CSS property it's used for, e.g.
   `$color-grey-90` → `border-color` 300×, `color` 120×. This is the draft primitive → semantic map.
4. **Guardrail inventory.** Stylelint rules and plugins, the strict-value property list,
   colorguard, KSS coverage, BackstopJS scenarios. Diffed on every run, so it shows when
   production adds a rule.

**Rejected:**

- **Counting by hand in chat.** It is what we did on 2026-11-05. The numbers are lost with the
  conversation and can't be compared later.
- **Asking the Nette team to re-run their analysis.** That costs their time, and we can't see the
  method. We should still ask for their script (open question 2) so the two counts reconcile.
- **Measuring the built CSS instead of the sources.** Stylus compiles tokens to literals, so the
  output can't tell a token from a hardcoded value.

## Phases

- [ ] **Phase 0 — Audit script and first snapshot.** Script (location: open question 1), first
      snapshot with the production hash, reconciled against the 29. 10. numbers (or with the
      difference explained).
- [ ] **Phase 1 — Component set by usage.** Rank production blocks and mark each as covered by
      Mini*S / partially covered / missing. Hand the list to plan 012 as the production-tier
      candidates and to the refit brief as the component-set priority. Candidates for the next
      Mini*S components come from the top of the "missing" list.
- [ ] **Phase 2 — Variant harvest.** For the top ~12 blocks, read the production Stylus and
      Latte and write down the variants, states, sizes and brand-theme overrides that exist.
      Compare them with the Mini*S API (`docs/ai-prompts/components/*.md`) and list the gaps on
      both sides.
- [ ] **Phase 3 — Primitive → semantic map.** From measure 3, propose a semantic token for each
      common primitive × property pair, with counts. Feed it to plan 001 (which heritage steps
      production depends on), plan 011 (alias layer) and plan 013 (`latte.md` mapping).
- [ ] **Phase 4 — Guardrail gap list for plan 010.** Start from production's Stylelint, not from
      scratch. Candidates:
  - [ ] Add spacing (`padding`, `margin`, `gap`) and `font-size` / `letter-spacing` to
        `declaration-strict-value`, in warning mode with a baseline (the brief's "block only new
        violations").
  - [ ] Feed `no-deprecated-variable` from a Mini*S deprecation list, so a token rename here
        becomes a lint message there.
  - [ ] A rule preferring semantic over primitive `$color-*` in `app/stylus/components/`.
  - [ ] Mini*S recipes as KSS entries on an existing styleguide page, so BackstopJS covers them
        with no new scenario (`doc/ai/skills/styleguide-documentation.md`).
- [ ] **Phase 5 — Convention digest for plans 003 and 013.** One page summarising the production
      skills that constrain a Latte recipe: light-DOM components, KSS comments, no inline styles
      (506 `style="…"` still exist), Phing checks (`check-latte-fast`, `spell-check-fast`), brand
      themes. Links to their files, no copied text.
- [ ] **Phase 6 — Hand-over and review.** Fold the results into the refit brief (section
      "Současný stav a mezery") and walk them with a production developer, together with plan
      001's review gate. Agree what, if anything, goes into the future PR to production.

## Dependencies

- **001** — Phase 3 is the production half of its measured constraint set.
- **010** — Phase 4 turns it from "new config" into "extend production's config". This plan
  answers 010's open question 5 (see below).
- **011** — the pipeline already exists. Alignment, not introduction.
- **012** — Phase 1 is the production-tier inventory. **013 / 003** — Phases 3 and 5.
- **009** — how anything from here reaches production.

## Open questions

1. **Where do the script and the snapshots live?** Proposal: `scripts/production-audit/` plus
   `docs/production-audit/YYYY-MM-DD.md` (+ `.json`). Are the snapshots committed, or only the
   latest?
2. **Can we get the Nette team's 29. 10. analysis script?** Without it the two counts can't be
   reconciled exactly.
3. **What counts as a production component** for plan 012: only `app/stylus/components/` and
   `app/js/components/`, or also page-level blocks like `product-detail-harmonica` and
   `message-overlay`?
4. **Do utility classes count as adoption?** 12,346 `u-*` uses are tokens by proxy if the
   utilities themselves are built from tokens. Check `app/stylus/utilities/` before deciding.
5. **Who reviews the results on the production side**, and is it the same person as for plan
   001?
6. **How often to re-run?** On demand before each plan that needs production facts, or on a
   schedule (e.g. monthly with the registry review the brief proposes)?
