---
id: 017
title: Production reference audit — what the Slevomat repo tells the refit
status: draft
created: 2026-11-06
updated: 2026-11-20
owner: Lexislav
---

# 017 — Production reference audit — what the Slevomat repo tells the refit

> Reads one repo and writes to another. The production Slevomat repo is cloned at
> `../slevomat` (`slevomat/slevomat`, `master`) with **read-only access**. Everything this plan
> produces lands in this repo. Nothing is proposed to production until the Slevomat team agrees
> (plan 010 and the future PR with Mini*S tools, agents and skills).

## Context

Mini*S is being redefined from a UI kit into guardrails ("mantinely") that anyone, human or AI,
builds with. Most of those guardrails have to work in production, and until now we have reasoned
about production second-hand: the Nette team's adoption analysis (29. 10. 2026, in the refit
brief → "Adopce tokenů v Nette repozitáři") and the token audit in plan 015. With a local clone we
can measure production ourselves, repeatably, and with commit hashes.

A first look (2026-11-05/06, production at `bb1847f86e4`) found that production is further along
than the brief assumes, and in places differently from how plans 011 and 014 assume:

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
  *(Refined 2026-11-13: the 66 paired aliases in `color-semantic.styl` compile to CSS
  `light-dark()`, so where they are used the mode **is** carried by the value at runtime. The
  explicit `$color-dark-*` uses are what is left. See the slice "AI layer, token pipeline and
  guardrails" below.)*
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
  `brand-themes.md`, …). These are the production conventions that plans 004 and 014 have to
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

- **Plans read production second-hand.** Plans 001, 004, 011, 012, 013 and 014 each need a fact
  about production, and each carries its own assumption or a dated count.
- **No usage-ranked component list.** The Mini*S component set grew from Figma and design needs,
  not from what production renders most. Tooltip, datepicker, autocomplete, loader, steps and
  dropdown are among production's most used blocks and have no Mini*S counterpart.
- **No primitive → semantic map.** Moving production from `$color-grey-90` to semantic tokens
  needs to know what each primitive is *used for* (border, text, surface), property by property.
  Plan 001 needs the same data to see which heritage steps production really depends on.
- **Plan 011 is designed for CSS custom properties.** Production compiles Stylus variables to
  literal CSS, so there are no Mini*S custom properties at runtime. A guardrail there has to check
  `$variables`, and it should extend the Stylelint setup production already has.

## Constraints

- **Read-only.** Never edit, commit, branch or push in `../slevomat`. `git pull --ff-only` to
  refresh is fine. Scripts and results live in this repo.
- **Production conventions win** (as in plan 004). The audit describes production, it doesn't
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
5. **The three success metrics from the brief** (added 2026-11-13; this script is their only
   owner). The brief says Mini*S succeeds when UI is consistent, measured three ways:
   - **share of values from tokens** in production (measure 1 already gives it; the baseline is
     open question 3 in plan 003);
   - **new items built without a registry entry**: new partials and elements since the last run
     (the harvest in plan 005) minus those with a KSS block or a `registry.json` entry;
   - **Local items promoted**: count of `meta.decision.outcome = approved` with a tier change
     since the last run, read from `registry.json` once it exists (plan 013).
   Each run reports the three numbers with their trend; plan 021 puts them on the review agenda.

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
      Mini*S / partially covered / missing. Hand the list to plan 013 as the production-tier
      candidates and to the refit brief as the component-set priority. Candidates for the next
      Mini*S components come from the top of the "missing" list.
- [ ] **Phase 2 — Variant harvest.** For the top ~12 blocks, read the production Stylus and
      Latte and write down the variants, states, sizes and brand-theme overrides that exist.
      Compare them with the Mini*S API (`docs/ai-prompts/components/*.md`) and list the gaps on
      both sides.
- [ ] **Phase 3 — Primitive → semantic map.** From measure 3, propose a semantic token for each
      common primitive × property pair, with counts. Feed it to plan 001 (which heritage steps
      production depends on), plan 012 (alias layer) and plan 014 (`latte.md` mapping).
- [ ] **Phase 4 — Guardrail gap list for plan 011.** Start from production's Stylelint, not from
      scratch. Candidates:
  - [ ] Add spacing (`padding`, `margin`, `gap`) and `font-size` / `letter-spacing` to
        `declaration-strict-value`, in warning mode with a baseline (the brief's "block only new
        violations").
  - [ ] Feed `no-deprecated-variable` from a Mini*S deprecation list, so a token rename here
        becomes a lint message there.
  - [ ] A rule preferring semantic over primitive `$color-*` in `app/stylus/components/`.
  - [ ] Mini*S recipes as KSS entries on an existing styleguide page, so BackstopJS covers them
        with no new scenario (`doc/ai/skills/styleguide-documentation.md`).
- [ ] **Phase 5 — Convention digest for plans 004 and 014.** (First draft: the skills table in
      the slice "AI layer, token pipeline and guardrails" below.) One page summarising the production
      skills that constrain a Latte recipe: light-DOM components, KSS comments, no inline styles
      (506 `style="…"` still exist), Phing checks (`check-latte-fast`, `spell-check-fast`), brand
      themes. Links to their files, no copied text.
- [ ] **Phase 6 — Hand-over and review.** Fold the results into the refit brief (section
      "Současný stav a mezery") and walk them with a production developer, together with plan
      001's review gate. Agree what, if anything, goes into the future PR to production.
- [ ] **Phase 7 — Success metrics.** Report measure 5 on every run, starting with the token share
      (available now) and adding the other two as the harvest (005) and the registry (013)
      land.

## Dependencies

- **001** — Phase 3 is the production half of its measured constraint set.
- **011** — Phase 4 turns it from "new config" into "extend production's config". This plan
  answers 011's open question 5 (see below).
- **012** — the pipeline already exists. Alignment, not introduction.
- **013** — Phase 1 is the production-tier inventory. **014 / 004** — Phases 3 and 5.
- **010** — how anything from here reaches production.

## Open questions

1. **Where do the script and the snapshots live?** Proposal: `scripts/production-audit/` plus
   `docs/production-audit/YYYY-MM-DD.md` (+ `.json`). Are the snapshots committed, or only the
   latest?
2. **Can we get the Nette team's 29. 10. analysis script?** Without it the two counts can't be
   reconciled exactly.
3. **What counts as a production component** for plan 013: only `app/stylus/components/` and
   `app/js/components/`, or also page-level blocks like `product-detail-harmonica` and
   `message-overlay`?
4. **Do utility classes count as adoption?** 12,346 `u-*` uses are tokens by proxy if the
   utilities themselves are built from tokens. Check `app/stylus/utilities/` before deciding.
5. **Who reviews the results on the production side**, and is it the same person as for plan
   001?
6. **How often to re-run?** On demand before each plan that needs production facts, or on a
   schedule (e.g. monthly with the registry review the brief proposes)? *(Proposal 2026-11-13:
   monthly, the week before the registry review, so the KSS harvest below lands on its agenda.)*
7. **Who runs the token import in production, and when?** `build/style-dictionary/config.js` has no
   npm script or Phing target, all 13 commits touching it are the lead developer's, and the last
   import is from 2026-08-12. Is a fresh import a step in G2 (automatic export), or does it stay
   manual on their side?
8. **Would production read a generated deprecation map?** `slevomat/no-deprecated-variable` takes
   its 51 renames inline in `build/stylelint-options.cjs`. A JSON file that Mini*S generates and
   their config `require()`s would turn every Mini*S token rename into a lint message there.
9. **Should the KSS styleguide be the production half of the registry** (see the slice below and
   plan 005), or only an input to it?

## Completed slices

### Layout — 2026-11-13

The first slice of the audit that is finished. It was done by hand while writing the Mini*S layout
guides, so it predates the Phase 0 script. Production code was at `bb1847f86e4`.

**Result:** [`docs/ai-prompts/layouts/production-reference.md`](../docs/ai-prompts/layouts/production-reference.md).
It covers the observed facts, the comparison with the Mini*S tokens, and proposals with open
questions, each in its own section.

Findings that matter beyond the layout guides:

- **Three width levels.** The wide container (`grid-wrap--wide`, 1240px), the narrow container
  (`grid-wrap`, 1008px; login, cart) and a ~704px reading/form column (cart). Side padding is
  8 / 16 / 32px at 408 / 1008px.
- **The token gap.** Mini*S `--container-padding` reached 32px at 1256px, production at 1008px;
  **fixed 2026-11-20** (`a6b01d9`), both now at 1008px. Mini*S `--container-narrow-width` (752px)
  matches production's reading column, and production's 1008px narrow container has no Mini*S
  equivalent. The layout decisions and guide work now live in plan 030; the token side is still a
  candidate for plans 012 and 014.
- **Main + sidebar is per component, not a shared grid.** Each page component splits with flex
  (ratios 2.2 : 1 to 3 : 1, gaps 24–40px, sidebar on the right). The 12-column `_real-grid` loads
  only in the admin and partner bundles. The public site has ½ ⅓ ⅔ column classes (¼ ¾ as
  placeholders), and none of them rendered on the measured pages.
- **Two of three container systems are effectively legacy.** `flex-wrapper` carries only the site
  chrome. `layout-wrapper` (96 uses in the code) didn't render on any logged-out page measured.
  That makes it a candidate for the Phase 1 "where is it used" check behind login.

**Reusable method.** This is the part the Phase 0 script should adopt.

1. **Code counts.** Walk `app/ui/**/*.latte`, split every `class="…"` / `n:class="…"` value into
   tokens, and count exact class names (plus the number of files each appears in). Dynamic
   classes from PHP or JS are missed, so say so next to the number.
2. **Live measurements.** Use Claude in Chrome on www.slevomat.cz. The in-app browser pane
   gets stuck in a Cloudflare challenge loop. Chrome windows can't shrink to phone widths, so
   don't resize the window. From any slevomat.cz tab, load the page into a **hidden same-origin
   `<iframe>` of fixed width** (e.g. 375 / 768 / 1280 / 1500px, height 900px, `left: -9999px`)
   and wait about 2.5s after `load`. Then read through `iframe.contentDocument` / `contentWindow`:
   - for each container class: rendered width (`getBoundingClientRect`), `max-width`, side
     padding, `display`, `gap`, and which container it sits inside;
   - every visible `display: grid` element with 2+ template columns (class, column count, gap);
   - every non-column flex/grid row with two or more children larger than about 200 × 150px,
     which finds the main + sidebar splits;
   - `iframe.contentWindow.location.pathname`, to catch redirects.
3. **Practicalities.** The tool returns about 1,000 characters at most, so keep results on
   `window` and read them in chunks. Navigating the tab clears the helper functions, so define
   them again after any navigation. The test frame shows an 11px classic scrollbar, so 375px
   reads as 364px. An empty `/kosik` redirects to `/`, so measuring the cart needs one item in it,
   which means asking the user, adding it, and removing it afterwards.
4. **Record** the date, production hash, logged-out state, page URLs and widths next to the
   numbers.

Not covered yet: pages behind login (user account, checkout after the cart), travel and partner
pages.

### AI layer, token pipeline and guardrails — 2026-11-13

Done by hand with the layout slice, at the same production commit `bb1847f86e4` (2026-11-06; the
clone was not refreshed). Layouts were the worked example for "can production answer a design
question?"; this slice records what the repo offers in general and how to measure it again.

**1. The AI layer and its format.** `AGENTS.md` (424 lines, since 2026-01-15) holds code style, the
directory map, a Specifications Index (payment, AI chat, push notifications, 38 files in
`doc/ai/spec/`) and a **Skills Index**: one table row per skill — name, path, "Use when". The 33
skills in `doc/ai/skills/` are plain Markdown: **no frontmatter**, imperative voice, 1,000–3,000
words, code from the repo, a closing checklist (`doc/ai/skills/skill-creation.md`). They are
*passive context*: the index is always loaded and the agent opens the file when a row matches.
Nothing depends on Claude Code's skill triggering, and that matters because **GitHub Copilot is the
main agent there**: 184 `Co-authored-by: Copilot` trailers against 6 Claude ones in the 2,946
commits since 2026-08-01. A Mini*S skill that reaches production has to be a file in this format
plus an index row; a Claude Code plugin alone would miss most sessions (plan 010).

Skills that matter for the design system:

| Skill | What it teaches | What it means for Mini*S |
|---|---|---|
| `stylus.md` | Where a style belongs (owner file, partial vs entry), tokens from `settings/_variables.styl`, paired semantic aliases or `light-dark()` for theme colours, breakpoint and `+dark()` mixins, full BEM names, `bin/phing check-css` | The only production doc that names Mini*S ("use a semantic alias or a generated MiniS primitive"). The natural home for Mini*S token rules; no separate skill needed for them |
| `styleguide-documentation.md` | Every shared component in `app/stylus/components/` gets a KSS block (`Markup:`, modifiers, `Style guide: Components.x`) on an existing styleguide page, so BackstopJS covers it with no new scenario | Production's own "register what you build" rule. The basis of the contribution path in plan 005 |
| `figma.md` | Figma MCP, extract all facts in one pass, confirm the grid before coding when there is no frame, reuse branding patterns | Doesn't name the MiniS Figma file or how a Figma variable maps to a Stylus name. A one-paragraph addition would close that |
| `brand-themes.md` | Ten-step checklist for a new `BrandColorScheme` across Stylus, banners, e-mails, Fortune wheel | Brand themes are already **runtime CSS custom properties** (`utilities/_brand-theme.styl`); relevant to G8 and to the Mini*S Wheel of Fortune |
| `web-components.md` | Light-DOM custom elements, no Shadow DOM, no framework, self-registering | Confirms Mini*S Lit components don't drop in; recipes port, components don't |
| `latte-controls.md` | Nette Controls: factory, NEON registration, `{control}`, signals | What a Latte recipe has to fit into (plans 004, 014) |
| `modals.md`, `image-processing.md` | Overlay system and its modifiers; the image/SVG pipeline | Candidates for registry entries as-is (decision 7) |
| `skill-creation.md` | The format above | The template any Mini*S skill for production follows |

**2. The token pipeline, in detail.**

- **Source:** five JSON files in `build/style-dictionary/tokens/` (colors, typography, layout,
  scales, shadows; plus `fonts.json`). They are **resolved exports of the "MiniS DS" Figma file by
  the Mini*S exporter** (`$metadata.exportDate` 2026-08-12, `cssName` fields), exported with
  "Remove collection name" **off**. Style Dictionary 5.7.1 (`build/style-dictionary/config.js`)
  then strips `-primitives|-theme|-default|-layout|-foundation` as plain substrings, which is
  looser than the exporter's whole-segment "omit default" rule. No npm script or Phing target runs
  it, and all 13 commits touching the pipeline are the lead developer's (2025-04-29 → 2026-08-12).
- **Output:** `app/stylus/settings/_variables.styl` (729 variables, 40 carry a
  `// Heritage reference:` comment) and `doc/tokens/kotlin/Tokens.kt` for the mobile app.
- **Names against `tokens.css`:** 138 names are identical. Where they differ:
  - semantic colours carry the mode in the name (`$color-light-surface-primary`,
    `$color-dark-surface-primary`); the 66 paired aliases in `settings/color-semantic.styl` give
    them Mini*S's names (`$color-surface-primary` → `light-dark(…)`);
  - the linear scale has a prefix (`$scales-linear-sp-linear-1` vs `--linear-sp-linear-1`); the
    Fibonacci and pixel scales and the `--breakpoint-*` tokens are absent (breakpoints live in
    `plugins/media-queries.styl`);
  - responsive layout values are one name per breakpoint tier (`$layout-sm-spacing-md`, 11 tiers ×
    31), not one name that changes with the viewport;
  - letter spacing sits inside the typography composites (`$typography-body-md-letter-spacing =
    -0.003em`), from before plan 016's `--typography-spacing-*` names.
- **Which side is behind can't be read from files.** This repo's own `tokens.rgb.json` is from
  2026-03-13, older than production's export. The Figma file is the only reference; the audit
  should compare both repos against a fresh export.
- **Dark mode at runtime:** `light-dark()` (paired aliases) plus the `+dark()` mixin
  (`.force-dark-mode` class or `prefers-color-scheme` with `.dark-mode`). So production already
  has runtime switching for colour mode and brand themes; G8 is narrower than it looks.

**3. Guardrails.** `build/stylelint-options.cjs`: `postcss-styl`, strict values for `/color$/`,
`box-shadow`, `border-radius`, `font-weight`; 10 plugins in `build/stylelint-plugins/`.
`slevomat/no-deprecated-variable` takes its rename map inline (51 entries, heritage → Mini*S
primitive), which is the hook for a generated Mini*S deprecation list (open question 8). The KSS
styleguide has **96 entries in 46 Stylus files**, in sections Brand, Content, Feedback, Guidance,
Navigation, Selection, buttons, forms, colors, typography, icons, messages, lists, shadows. Only
**30 of the 79** partials in `app/stylus/components/` carry a KSS block. BackstopJS has three
config commands in `app/ui/BackstopJS/` (styleguide, key pages, cart); the styleguide one renders
every section page plus the four icon-font demos at 1024px.

**4. How fast production grows.** 11 new shared components since 2026-03 (6 Stylus partials in
`app/stylus/components/`, 5 elements in `app/js/components/`), from 6 authors. The lead developer
wrote 66 of about 115 commits touching `app/stylus/` since 2026-09-01. Claude-assisted UI commits
appear since October (gift pages, cart gift services) from a contributor outside the regular
Stylus committers, so AI-built UI already lands in production. Whether that author is one of the
vibe-coding designers isn't visible from git. Two new components a month is few enough
to find by scanning; nobody has to register anything by hand.

**5. A distribution channel already exists.** `.github/workflows/publish-docs.yml` syncs
`doc/knowledge-base/` (177 business docs) to `slevomat/claude-plugin-slevomat-documentation` on
every push to master. Slevomat already ships a Claude plugin, so plan 010 can ask to join it
instead of creating one.

**Reusable method (code side).** Add to the Phase 0 script, next to the layout slice's method:

1. **Pin the commit:** `git -C ../slevomat log -1 --format='%h %ad' --date=short`. Refresh only
   with `git pull --ff-only`, and only when no other session is reading the clone.
2. **AI layer:** list `doc/ai/skills/*.md` with word counts; parse the Skills Index table in
   `AGENTS.md`; grep `doc/ai` and `AGENTS.md` for `MiniS` / `Mini*S`; count `Co-authored-by`
   trailers per agent since the last run.
3. **Token pipeline:** `$metadata.exportDate` of each file in `build/style-dictionary/tokens/`;
   `git log` on that folder; parse `_variables.styl` (`^\$name = value`) and diff the names
   against `packages/tokens/src/tokens.css` by family (color, typography, scales, layout).
4. **Guardrails:** the plugin list and strict-value properties from `build/stylelint-options.cjs`;
   the length of the `no-deprecated-variable` map; KSS blocks (`Style guide:` lines) per section;
   which partials in `app/stylus/components/` have none; BackstopJS scenario labels.
5. **New components since the last run:** `git log --diff-filter=A` on
   `app/stylus/components/*.styl` and `app/js/components/*`. This list is the harvest input
   for plan 005.
6. **Record** the date and commit next to every number, as the layout slice does.
