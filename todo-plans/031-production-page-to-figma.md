---
id: 031
title: Production page → Figma — rebuild a live page from Mini*S tokens and components
status: draft
created: 2026-11-21
updated: 2026-11-26
owner: Lexislav
---

# 031 — Production page → Figma: rebuild a live page from Mini*S tokens and components

> The visual half of the production audit (plan 017): 017 counts what production uses, this plan
> draws a production page in Figma from Mini*S library components and variables, and documents
> beside it, in docs-kit frames, what Mini*S is missing and where it conflicts with production. The
> gaps show on the canvas instead of in a table. Reads production only, so it doesn't wait for plan
> 020. Becomes a skill (`page-to-figma` in the `minis` plugin) once the method holds; distribution
> through plan 010: the skill ships in the Mini*S Claude Code plugin as `/minis:page-to-figma`,
> one of its first commands.

## Problem

Nobody can see today how far production is from Mini*S. The adoption numbers (plan 017, plan 003
→ "Adoption is real") say ~18 % of variable uses and 15,486 raw px values, but a designer can't
point at a screen and say "this card is a Mini*S tag, this one isn't anything we have". The
Figma file holds Mini*S components and tokens; the production pages exist only in the browser and
in Latte + Stylus. The one bridge so far is hand-made: the "Production layouts: slevomat.cz"
report card for plan 030, which draws layout boxes to scale and no components.

A repeatable rebuild would serve four plans at once:

- **023 recipes** — the rebuild is the mapping "production element → Mini*S component" made
  visible; elements that map cleanly are recipe candidates, the rest are gaps.
- **021 review** — every unmatched element is evidence for the monthly review (a Local candidate
  or a missing variant), with a screenshot and the page it came from.
- **030 layout guides** — the rebuild uses the measured widths and gaps, so a guide that doesn't
  fit the page is obvious.
- **G12 / G13** — where Figma variables and `tokens.css` disagree, the rebuild shows the Figma
  value next to the production value.

## Constraints

- **Production is read-only.** Neither the live site nor `../slevomat` is ever written to. Nothing
  logs in; pages behind login are out of scope until someone decides otherwise (question 2).
- **Live site through Claude in Chrome**, not the in-app browser: the pane loops on Cloudflare for
  slevomat.cz. To measure several widths without resizing, use same-origin fixed-width iframes and
  read computed styles there; Chrome JS results are cut at ~1,000 characters, so store them on
  `window` and read in chunks.
- **Only library instances and bound variables** in the rebuilt frame. No hardcoded hex, px or
  text styles, same rule as `minis-figma-docs` and core rule 2. A value with no matching variable
  is not typed in; it is marked as a gap.
- **Never guess a token or component name.** Names come from `tokens.css` and the Figma file
  (CLAUDE.md: `--color-border-default` doesn't exist). Until the registry (013) exists, component
  matches come from `docs/ai-prompts/components/*.md` and 023's mapping.
- **The output is a report, not a design.** It lives on its own page in the MiniS DS file
  (proposal: a "Production rebuilds" page), never in the published library, and never replaces a
  designer's file.
- **Real content stays out of the repo.** Screenshots and copied texts of live deals go to Figma
  only, not into `docs/` (copyright and stale prices).

## Approach

Four passes per page, each with its own output, so a run that stops halfway is still useful:

1. **Capture.** In Chrome, at the widths plan 030 measures (mobile, 768, 1008, 1240+): a
   screenshot, the landmark structure (header, main, sidebar, footer, repeated blocks), and for
   each block its computed colours, spacing, radius and type, plus its class names (`typo-*`,
   `u-*`, component partials). Output: a capture JSON in the run folder.
2. **Map.** Each block → a Mini*S component and variant, or a token-built frame, or **gap**.
   Each value → a Mini*S variable, or **mismatch** (Figma value vs production value), or **no
   token**. Class names help: production's `typo-*` classes map to Mini*S text styles one to one,
   its colour variables come from the Mini*S export. Output: a mapping table with a coverage count
   (blocks matched / gap; values tokenised / mismatch / no token).
3. **Build.** In Figma, one frame per width: library instances for matched blocks, auto-layout
   frames with bound variables for the rest, gap blocks drawn with a clearly marked placeholder
   style, and a legend card (docs kit) with the coverage numbers and the date of capture. The
   screenshot sits next to it at the same width for comparison.
4. **Document the findings, beside the page.** Next to each rebuilt width, a column of docs-kit
   cards (`minis-figma-docs`) that says what Mini*S is missing and where it conflicts with
   production. Every finding gets a numbered marker on the rebuilt frame and a row on a card, and
   an id (`<page>-<width>-<nn>`) that later travels to the review and the registry.
   - **Missing in Mini*S** — a production block with no Mini*S counterpart: screenshot crop, what
     production uses (classes, the partial's path in `../slevomat`, measured values), the closest
     Mini*S item if any, and the proposed kind of fix: new component, new variant, new token, or
     a Local candidate.
   - **Conflicts** — a block or value that exists on both sides but differs: Mini*S value vs
     production value per property (radius, spacing, colour, type, behaviour such as stacking
     width), with the source of each. Covers three kinds: Mini*S component ≠ production, Figma
     variable ≠ `tokens.css` (G12 / G13), and production literal where a token exists (rule 2).
   - **Summary** — the coverage numbers from pass 2, capture date and URL, the production commit
     the page was measured against when known, and links to the plans each finding feeds.

   The same findings are written to a plain list in the run folder (ids, kind, page, values,
   suggestion; no screenshots or copied content), so 021 can put them on the review agenda and
   013 can turn accepted ones into registry entries (`meta.status: proposed`).

**Option `skip-audit`** (`/minis:page-to-figma <url> skip-audit`). Rebuild only: passes 1–3 run,
pass 4 doesn't. No findings cards, no numbered markers, no findings list, no gap styling — blocks
without a Mini*S component are still built from tokens, just not called out. For when someone wants
the page in Figma to design on, not a report on Mini*S. The rules of pass 3 still hold (instances
and bound variables only), so a skip-audit page is never a place where hardcoded values creep in.
Default is the full run with findings.

**Engine.** The Figma MCP's code-to-design path (`figma-generate-design` skill, `use_figma`) does
the building; this plan adds the Mini*S rules on top: which page, which widths, how a block maps,
what counts as a gap. A straight page capture into Figma gives raw layers with literal values, the
opposite of what this plan needs, so it is at most the starting point for pass 1.

**Rejected:**

- **Rebuild by hand** — that's the plan 030 report card; useful once, not repeatable, and it
  skips components.
- **Render the Mini*S web components with production's content and capture that** — shows what
  Mini*S would look like, not how production differs from it.
- **Fully automatic, whole site** — the mapping needs judgement (is this a tag or a badge?); one
  page at a time, reviewed, is the useful unit.

## Phases

- [x] **Phase 0 — Pick pages and widths.** Three public pages that cover the most components by
      plan 017's usage counts (proposal: home, a category listing, a deal detail); widths from
      plan 030. Agree the Figma page and the legend layout.
- [x] **Phase 1 — Capture script** for Chrome: structure, computed values, classes, per width;
      tested on one page.
- [x] **Phase 2 — Mapping rules** written down: block → component, value → variable, what makes
      a gap. First mapping table for the pilot page, checked by hand.
- [ ] **Phase 3 — Build the pilot page in Figma** with instances, variables and the legend; review
      with a designer: is it readable, does it show what we need?
- [ ] **Phase 4 — Findings frames** for the pilot page: the "Missing in Mini*S", "Conflicts" and
      "Summary" cards beside each width, numbered markers on the rebuild, and the plain findings
      list in the run folder. Agree the card layout with a designer and add it to the docs kit as
      a template, so every run looks the same.
- [x] **Phase 5 — Feed the other plans.** Missing items to 021's agenda, recipe candidates to 023,
      layout misfits to 030, Figma ≠ `tokens.css` conflicts to G12 / G13 in plan 003.
- [x] **Phase 6 — Skill.** Write `page-to-figma` for the `minis` plugin (`/minis:page-to-figma`,
      plan 010) from phases 1–4, with the `skip-audit` option, so any page can be rebuilt, with or
      without findings, on request; repeat the pilot pages after a token release to show progress
      (findings closed since the last run).

**Progress, 2026-11-26.** Homepage pilot captured at 375 / 768 / 1280 (Chrome, logged out, light
mode), mapped, rebuilt and documented:

- Run folder `audits/page-to-figma/2026-11-26-homepage/`: `mapping.md` (coverage, block table),
  `findings.md` (20 findings: 10 missing, 10 conflicts).
- Figma MiniS DS, page **Production rebuilds** (`6462:142`): frames `6465:142` (1280), `6465:2363`
  (768), `6465:4483` (375); findings stack `6466:5806`; markers beside the frames, never inside.
- Skill `.claude/skills/minis-page-to-figma/` (SKILL.md, README, `capture.js` 1.4,
  `build.homepage.js`, `fill-template.py`, `references/mapping.md`). Tested end to end: the pilot as
  the full run, and a skip-audit rebuild from the committed script (no markers, no cards).
- **Still open:** phase 3's designer review of the rebuild, and phase 4's step of agreeing the
  card layout and adding it to the docs kit as a template (the stack is built from `Docs card —
  template` today). Phase 6's re-run after a token release comes later.
- **Method findings:** slevomat.cz's CSP blocks Figma's page capture, so images are placeholders
  unless a Playwright MCP is available. Kensington can't be loaded by plugin scripts, so Promo
  Card titles and `Brand/*` text can't be set (layer names ask for it by hand). Production renders
  dark when the browser prefers it; the capture measures light. Lazy blocks only load when the
  iframe is on screen; the capture scrolls an invisible one first.

## Dependencies

- **017** production audit — usage counts pick the pages; the rebuild is its visual counterpart.
- **023** recipes — shares the production → Mini*S mapping; **013** registry replaces the
  `docs/ai-prompts` lookup once it exists.
- **030** layout guides — widths and container levels; **G12 / G13** (plan 003) — known value
  disagreements the rebuild will hit.
- **`minis-figma-docs`** — Figma scripting rules and the docs kit for the legend card.
- **021** review — consumes the gap list.

## Answers

Owner's answers, 2026-11-26 (questions 1, 3, 4 and 9; the others stay open):

- **Q1 — pilot page: the homepage.** Listings and deal pages are where the skill will be used most
  often, so they come next, once the method holds on the homepage.
- **Q3 — where rebuilds live: wherever colleagues need them.** Designers will grab a rebuilt
  production page into their own files to work on it or document it. So the **rebuild frame is
  portable**: it uses only published library components and published variables, never the
  hidden docs kit, and nothing in it points at the findings cards. Runs land on a "Production
  rebuilds" page in MiniS DS, where the findings cards (docs kit, MiniS DS only) sit beside the
  rebuild as separate frames; a colleague copies the rebuild frame alone into their file.
- **Q4 — how strict a match is: role first, differences as notes.** A production block that plays
  the role of a Mini*S component (a button with another radius) is built as that Mini*S
  component, and the differences go on a conflict note. In skip-audit ("quiet") mode the notes are
  left out. Gap = no Mini*S component plays that role, or a needed variant is missing.
- **Q9 — skip-audit and gap blocks: layer name only.** Unmatched blocks look like the rest, but
  their layer is named `not Mini*S — <what it is>`, so anyone inspecting the frame can tell.

## Open questions

1. **Which pages first?** Home, category listing and deal detail are the proposal; is checkout
   more useful, given it's where plan 030 says the narrow container lives?
2. **Pages behind login** (account, orders, partner admin): out of scope, or with a test account
   the production team provides?
3. **Where do rebuilds live** — a "Production rebuilds" page in MiniS DS, or a separate Figma file
   so the library file stays light?
4. **How strict is a match?** Does a production button with a different radius count as a Mini*S
   button with a mismatch, or as a gap?
5. **Re-run cadence** — after every token release, monthly with the review, or on request only?
6. **Where do findings go after the Figma cards?** The plain list for the review (proposal), a
   GitHub issue per finding (ties to plan 008), or registry entries straight away once 013 exists?
7. **Does a conflict say which side should win?** The porting rules (014) decide that; should the
   card only state the difference, or also carry a recommendation?
8. **Does the production team want to see it?** It could become the picture for the plan 020
   walkthrough ("this is what's Mini*S today"), or stay an internal DS tool.
9. **`skip-audit` and gap blocks.** Without the audit, should unmatched blocks still look different
   (a faint outline), or exactly like the rest? Invisible is cleaner to design on, but hides that
   the block isn't Mini*S.
