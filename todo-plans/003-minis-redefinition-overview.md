---
id: 003
title: Mini*S redefinition — overview of the rollout and every plan in it
status: draft
created: 2026-11-13
updated: 2026-11-13
owner: Lexislav
---

# 003 — Mini*S redefinition: overview of the rollout and every plan in it

> **This is a map, not a work plan.** It doesn't carry work of its own; it says which plan covers
> which part of the redefinition, what is blocked on what, and what has no plan yet. The source of
> truth for the *why* is the brief, `docs/MiniS redefined guardrails, not a UI kit.md` (Czech,
> 23 Oct 2026, revised since). Keep this file current whenever a plan is added, moves status, or
> changes what it depends on (phase 1 below).
>
> **Where things live.** Brief, live version (Czech, claude.ai chat project):
> <https://claude.ai/artifact/1fwLit8Shd9Z2DtyMY7zk8>; deck, 15 slides (Czech):
> <https://claude.ai/artifact/W85J8tcMEBTgxbttnVHxka>; Figma `mfiAVMWkxiBRGnegjqLMNW`: deck mirror on page
> "Mini*S 2.0 (WIP)", contribution diagram on READ-ME → "Contribution model". The chat handoff of
> 2026-11-05 says to export the live brief before trusting the repo copy; the repo copy is newer
> than that handoff's copy and has dropped its "floor" and "harvest" wording.
>
> **Numbering.** Plans 003–017 were renumbered to 004–018 on 2026-11-13 to make room for this
> overview. Old numbers in git history, commit messages and the changelogs of that time are
> decoded in the table at the end.

## What the redefinition is

Mini*S started as a UI kit: Lit web components, Storybook, Figma. After about a year the owner's
conclusion is that this doesn't fit how Slevomat builds UI. Production is **Nette + Latte +
Stylus** and doesn't use the web components; the lead developer designs straight in code; since
late October designers may vibe-code on top of the production repo; everyone else prompts an AI
somewhere else. **AI doesn't need the components, it needs the decisions.**

So Mini*S is re-fitted as **shared rules and decisions anyone, human or AI, builds with** —
"a garden, not Lego": land (tokens), tools (skills, Stylelint, registry), rules of care, and
anyone may plant freely, just not on the path. The goals don't change (one experience, faster
development, fewer duplicates, accessibility, one language, easy rebrand); the route does.
Success is measured by consistency, not by how many components run in production. The brief's
three measures (share of values from tokens, new items without a registry entry, Local items
promoted) are reported by plan 017's script (measure 5) and reviewed monthly (plan 021).

**Foundation — five things every person and environment gets:** tokens · recipes (Latte + Stylus
pairs) · skills · a contribution skill · porting rules.

**Seven core rules** — checked by CI where a machine can, by the monthly registry review where
judgement is needed:

| # | Rule | Checked by |
|---|---|---|
| 1 | Don't reinvent — search the registry, extend by variant or tokens, build new last | judgement: contribution skill + review |
| 2 | Tokens only — no hardcoded hex, px or fonts | CI: Stylelint with a baseline |
| 3 | Accessibility — WCAG 2.2 AA | CI: a11y test, token-pair contrast |
| 4 | Every element has a description — a valid registry entry | CI: registry check |
| 5 | New work starts as **Local** and is registered at once | CI: registry check |
| 6 | Promotion on evidence and approval — 3+ uses, then approved | judgement: monthly review |
| 7 | One reference — values from Mini*S tokens; behaviour from production Latte for now | judgement: porting rules |

**Tiers:** Local → Recipe → Core. Nobody needs permission to build a Local; the monthly review
promotes, merges or retires.

**Roles of the old pieces.** Figma stays the source of truth for tokens and a surface for design
and review. The web components become the reference implementation and the vibe-coding sandbox,
not a production dependency (and are ready if the mobile app ever takes them).

**Where production stands** (two measurements that don't agree yet — plan 017 reconciles them):

| | Nette team analysis, 2026-10-29 | First look at the clone, 2026-11-05/06 (plan 017) |
|---|---|---|
| Share of variable uses from Mini*S | ~18 % (1,157 of 6,435) | colours "nearly all tokens", 64 % of colour refs are primitives |
| Hardcoded values | ~1,300 hex · 14,400 px · 986 font sizes | 84 hex (besides `#fff`/`#000`) · 15,486 px · 59 `letter-spacing` |
| Tokens at runtime | build-time only (Style Dictionary → Stylus → literal CSS) | same; `build/style-dictionary/` already exists |
| Heritage colour aliases | 90 in `colors.styl` to redirect | **already retired by Nette on 2026-11-02** |
| Typography | 21 of 66 names used, "barely adopted" | used indirectly: `typo-*` classes in ~826 Latte files |
| Token import | — | by hand (`build/style-dictionary/config.js`, no script target); last export 2026-08-12, so before plan 016's renames (017, 2026-11-13) |
| AI layer | — | `AGENTS.md` + 33 skills in a passive-index format; **Copilot is the main agent** (184 vs 6 Claude trailers since August); Mini*S named in one skill only (017, 2026-11-13) |

**Agreement so far** (from the chat handoff, 2026-11-05; the brief doesn't record it): on
2026-11-02 the Nette lead developer accepted the redefinition, updated colours are on Nette
master, and Nette's Stylelint already guides AI in migrating variables to them. Phases 1–2 have
effectively started on their side; this is why G1 is about writing the agreement down and naming
the approval group, not about getting a first yes.

## Production → Mini*S: how Mini*S reaches production and how contributions come back

Added 2026-11-13 from a read of the production clone (plan 017, slice "AI layer, token pipeline
and guardrails"). The point: **production already has a channel for each direction**, and the
plans should use them instead of building new ones. Details and the step list are in plan 005,
"The production path".

| Direction | What travels | Channel production already has | Plan |
|---|---|---|---|
| Mini*S → production | Token values, new tokens | Mini*S exporter → `build/style-dictionary/tokens/*.json` → `_variables.styl` (manual today) | 012, G2 |
| Mini*S → production | Renames, retired tokens | Stylelint `slevomat/no-deprecated-variable` rename map (51 entries, inline today) | 011 |
| Mini*S → production | Rules for agents | One skill file in their format + a Skills Index row in `AGENTS.md`; notes in `stylus.md` / `figma.md`; or their Claude plugin repo (`claude-plugin-slevomat-documentation`) | 010, G4 |
| Mini*S → production | Recipes | Latte + Stylus partial with a KSS block on an existing styleguide page, covered by BackstopJS | 004, 014, G6 |
| production → Mini*S | A new component | The KSS block their own skill already requires is the registration; Mini*S harvests new partials and elements monthly and puts them on the review agenda | 005, 013, 017 |
| production → Mini*S | Usage, adoption | The plan 017 scan (class counts, token families, guardrail inventory) | 017 |

What it means for the lead developer and the vibe-coding designers: **no new step on their side**
beyond what production already asks (a KSS block for a shared component). Everything Mini*S needs
from them is harvested, and everything they need from Mini*S arrives through a file, a token import
or a lint message.

**Questions for the production developer**, to take into G1 (the same five are in plan 005; 017
carries the measurement ones):

1. Is a KSS block enough of a "registration" for new shared components? 49 of the 79 partials in
   `app/stylus/components/` have none today.
2. Mini*S agent rules: a file in `doc/ai/skills/` with an `AGENTS.md` row, or the Claude plugin
   repo? Copilot doesn't read Claude plugins.
3. Would your Stylelint config read a deprecation map Mini*S generates?
4. Who runs the token import, and how often? Should G2 end in a PR to production as well?
5. Should new production components land on the monthly review agenda automatically?

## Rollout phases and the plans behind them

Phases and dates are from the brief ("Plán zavedení"); dates are indicative and no target numbers
are set yet.

| Phase | When | What | Plans | Gap — no plan yet |
|---|---|---|---|---|
| **0. Agreement** | Nov 2026 | Team commitment, approval group, where Mini*S lives in the Nette repo, close decisions 1–3 | 020 team agreement | — |
| **1. Tokens in Nette** | Nov–Dec | Automatic export, versioned package + Style Dictionary source, baseline of adoption | 012 distribution · 001 heritage/curve · 016 letter spacing (in progress) · 015 line height (in progress) · 017 production audit · 009 token-update skill (optional) | **G2** automatic export |
| **2. Checks** | Dec–Jan | Stylus-aware "tokens only" with baseline, `var()` fallback rule, a11y in CI | 011 Stylelint | **G3** a11y in CI |
| **3. Registry and skills** | Jan | `registry.json` + schema, `AGENTS.md`, contribution skill, minis-app registers Local, distribution | 013 registry · 005 contribution · 006 minis-app · 010 distribution · 007 todo-plan skill · 008 bug report · 018 changelog sync | **G4** AGENTS.md · **G5** rules hook |
| **4. Recipes and first review** | Feb | Three Latte + Stylus recipes, porting guide for Latte/Nette, first monthly review | 014 porting rules · 004 Latte skill (needs recipes) · 021 review and approval | **G6** recipes |
| **5. Expansion** | from Mar 2027 | Claude Design, finish typography in production, runtime tokens, mobile token names, icons in the production webfont | 015, 016 (typography foundation done) · 012 phase 5 (mobile) · 019 vibe-coders (G9, started early: the design system is already exported) | **G8** runtime tokens · **G10** icons · **G11** mobile app |

**Plans that fit no phase:**

- **001 colour ramps → curve** — long-term work, not a rollout step. Its heritage layer is close to
  decision 1 (heritage as a legacy token layer), but 001 schedules that *after* the curve
  (its phase 5) while decision 1 wants it *now*. Reconcile when decision 1 is closed. **Keep.**
- **002 Deal Card and Promo Card** — a component plan from before the redefinition. Its Figma
  analysis makes the deal card the strongest candidate for one of the three first Latte recipes
  (G6), more than a new web component. **Keep, re-scope when G6 starts.**
- **007 todo-plan skill, 008 bug report skill** — in the brief's skills table but in no rollout
  phase; low priority, ship through 010. **Keep.**
- **009 token-update skill** — optional, and overlaps with G2 (automatic export) and with the
  typography procedure its phase 7 carries. **Merge or close** once G2 is decided.

## All plans at a glance

Status as of 2026-11-13. "Open" counts unticked phase checkboxes.

| # | Plan | Status | Phases (done / open) | Blocked on / waits for |
|---|---|---|---|---|
| 001 | Colour ramps → curve | draft | 0 / 24 | production developer's review (gates every phase) |
| 002 | Deal Card, Promo Card | draft | 4 / 28 | Phase 0 checks against production |
| 003 | *this overview* | draft | — | — |
| 004 | Latte UI-building skill | draft | 0 / 4 | recipes (G6) + registry (013) |
| 005 | Contribution skill | draft | 0 / 4 | registry schema (013); production path proposed 2026-11-13, needs the production developer |
| 006 | minis-app registers Local | draft | 0 / 3 | 005, registry |
| 007 | Todo-plan skill | draft | 0 / 4 | nothing; ships via 010 |
| 008 | Bug-report skill, `/minis-bug` | draft | 0 / 4 | who can open GitHub issues (its Q1–2) |
| 009 | Token-update skill (optional) | draft | 0 / 3 | decision to do it at all; overlaps G2 |
| 010 | Skill distribution | draft | 0 / 4 | channel choice: plugin, copied files or package |
| 011 | Stylelint "tokens only" | draft | 0 / 14 | **decisions 2 and 3** (fallbacks, canonical names); Stylus support |
| 012 | Token distribution, Style Dictionary | draft | 0 / 16 | **decision 3**; production already builds with Style Dictionary |
| 013 | `registry.json` | draft | 0 / 6 | `meta` fields, production tier, platform keys |
| 014 | Porting rules | draft | 0 / 5 | decision 3, registry; Latte part needs the lead developer |
| 015 | Responsive line height in Figma | **in-progress** | 10 / 4 | verify export; exporter command; typography procedure as a skill |
| 016 | Letter-spacing tokens (high priority) | **in-progress** | 11 / 1 | only the `page-header` docs row |
| 017 | Production reference audit | draft | 0 / 11 | where the audit script lives; read-only clone `../slevomat`. Two hand-made slices done (layout; AI layer and tokens), 2026-11-13 |
| 018 | Changelog sync skill | draft | 0 / 6 | Figma-side contract in `minis-figma-docs` |
| 019 | Mini*S for vibe-coders | draft | 0 / 6 | access to two Slevomat repos (asked 2026-11-13); link of the existing Claude design system; Skill Hub owners |
| 020 | Team agreement | draft | 0 / 5 | the walkthrough meeting; who signs off |
| 021 | Monthly review and approval | draft | 0 / 5 | 020 (approval group), 013 (`status`, `decision` added 2026-11-13) |

**The three blockers that hold most of the rest:**

1. **Canonical token names** (decision 3 = 011 question 2 = 012 question 1). Blocks 011, 012, 013
   and the final form of 014. First precedent already set: the exporter's letter-spacing naming
   rules (plan 016) apply equally to CSS, JSON and Style Dictionary keys.
2. **The registry** (013). Blocks 004, 005, 006 and the review process (G7).
3. **Where Mini*S lives in the Nette repo** (G1). Decides how 010, 011, 012 and 014 reach production.

## Gaps — work the brief asks for that has no plan yet

None of these exists as a file. They are proposals; each becomes a plan when the owner says so,
and takes the next free number (022 onwards).

| Gap | What | Phase | Notes |
|---|---|---|---|
| ~~**G1**~~ | **Now plan 020** (2026-11-13). Team agreement: walkthrough of the brief, name the approval group, agree where Mini*S lives in the Nette repo, close decisions 1–3 (then 4, 5, 8) | 0 | Gates 011–014. Open: who signs off; tie-break in the approval group. |
| **G2** | Automatic token export: Figma → PR in this repo, so tokens never lag | 1 | Production lags too: its import is manual and was last run 2026-08-12, and this repo's `tokens.rgb.json` is from 2026-03-13 (017). Exporter 1.2.1 already stamps version and settings into `$metadata`. Needs a check that the Figma REST API variables endpoint works on the Professional plan — it is likely Enterprise-only; fallback: the exporter plugin opens the PR through the GitHub API. |
| **G3** | Accessibility in CI: contrast of token pairs (light, dark, Gift) and an axe run over Storybook, warning first | 2 | `@storybook/addon-a11y` exists but nothing fails a build; CI is build + typecheck + lint only. |
| **G4** | `AGENTS.md` and the AI-doc layer (decision 4): core rules for all environments, `CLAUDE.md` slimmed, component docs generated from the registry | 3 | Production already has its own `AGENTS.md` and `doc/ai/skills/` — Mini*S joins them, it doesn't replace them. Their format is plain Markdown with an index row (no frontmatter), and Copilot is the main agent there, so a Claude-only channel misses most sessions (017). |
| **G5** | Rules hook: explain which rule an edit breaks, in session; reminds the rules at session start | 3 | Design-only today; needs 011's config, and 011 itself should extend Nette's existing Stylelint config rather than add one (answered in 011, 2026-11-06). Complements CI. |
| **G6** | The first three Latte + Stylus recipes with AI descriptions, from the lead developer's snippets | 4 | Pick by usage in production; plan 017 gives the usage counts. Candidate: deal card (002). A recipe in production is a Latte + Stylus partial with a KSS block, so BackstopJS covers it for free. |
| ~~**G7**~~ | **Now plan 021** (2026-11-13). Monthly registry review and the proposal/approval process | 4 | `status` and `decision` added to 013's `meta` the same day. |
| **G8** | Runtime tokens in production (CSS custom properties for themes and dark mode) | 5 | First step is the decision whether product wants Gift or dark mode there at all. Partly there already: dark mode switches at runtime through `light-dark()` and brand themes are CSS custom properties (017). |
| ~~**G9**~~ | Mini*S in Claude Design | 5 | **Now plan 019** (2026-11-13), widened to every non-production channel: Claude Design, the Skill Hub, a Claude Code plugin, the AI Hub and a hosted runtime. |
| **G10** | Icons into the production webfont; icon path in the contribution skill | 5 | 51 `figma-only` icons are missing in production; nobody owns the webfont step. |
| **G11** | Mobile app: take over MiniS token names and structure (decision 6, accepted) | 5 | Only a late phase of 012 today. Values are already taken over, and Style Dictionary already writes `Tokens.kt`. Open whether the app also takes the web components. |

Dropped from an earlier gap list because things moved: *redirect `colors.styl` aliases* (Nette did
it on 2026-11-02) and *typography adoption* (plans 015, 016 and 014 cover it; what is left is
Brand XL and measuring `typo-*` class use, both noted there).

## Decisions waiting to be closed

From the brief ("Rozhodnutí k validaci"). Outcomes go here **and** into the plan they unblock.

| # | Decision | Status | Unblocks |
|---|---|---|---|
| 1 | Heritage colours as a legacy token layer (hidden `.heritage` collection in Figma) | to validate | 001 phase 5, G1 |
| 2 | Only token fallbacks in `var()`, no literals | to validate | 011 |
| 3 | `tokens.css` names are canonical | to validate (first precedent: plan 016) | 011, 012, 013, 014 |
| 4 | Registry is the source of AI docs; `CLAUDE.md` → `AGENTS.md` + per-environment parts | to validate | G4 |
| 5 | Stop requiring Code Connect; Figma key + Storybook link live in the registry | to validate | 013 |
| 6 | Mobile app is a third token-porting target | **accepted** | 012 phase 5 |
| 7 | Production components enter the registry as they are; tier open (`production`?) | **accepted** | 013 |
| 8 | Registry `implementations` has one required key per platform | to validate | 013 |

## Done outside the plans

Work for the redefinition that has no todo plan but should show up here:

- **`minis-figma-docs` skill** (12–13 Nov): documentation cards in Figma from an internal docs kit;
  20 components documented; five palette pages moved onto the kit; palette scripts replace the
  Color docs generator plugin, which is to be frozen. First step towards an AI-run design system.
- **Skills made visible**: list with audience in Storybook (Vibe Coding Guide → Skills), README,
  `docs/ai-prompts/index.md`, Figma READ-ME page.
- **Components and tokens**: Wheel of Fortune (placeholder until the Rive version), `Alert/success`
  rename (breaking), `--color-surface-transparent`, Accordion and ActionRow surfaces through
  Foundation.
- **Typography method** — Figma, exporter 1.2.1 and CSS — is in plans 015 and 016 and
  `docs/ai-prompts/typography.md`.

## Phases

- [ ] **Phase 0 — Keep this file true.** On every plan added, renamed, closed or re-statused, and
      on every closed decision, update the tables above in the same commit.
- [ ] **Phase 1 — Turn gaps into plans, one at a time**, in the owner's order. Suggested first: G1
      (it unblocks the most), then G6 and G7 (they unblock 004–006). *(2026-11-13: G1 → 020,
      G7 → 021, G9 → 019. Next: G3 accessibility before phase 2, G6 recipes before phase 4.)*
- [ ] **Phase 2 — Resolve the overlaps:** 009 vs G2; ~~G7 into 013 or its own plan~~ (own plan 021, fields in 013); 001 phase 5 vs
      decision 1; 017's measurement vs the Nette analysis.
- [ ] **Phase 3 — Mirror into the brief.** Replace the brief's "todo-plans" column with a pointer
      to this file once the numbers are stable.

## Open questions

1. **Who closes decisions 1–8**, and in which forum? Nothing in the repo says.
2. **Should the overview stay a plan, or become a generated page?** The register of plans, their
   status and their dependencies could be built from frontmatter (plan 007 territory).
3. **Which of the three production measurements is the adoption baseline?** The Nette analysis,
   plan 017's audit, or a repeatable script (017 phase 0)?
4. **Is the Czech brief or this file the one new people read first?** If this one, link it from
   the brief's opening.
5. Open questions in the brief that no plan owns: vibe-coding output as PRs or hand-over (partly
   answered 2026-11-13: Claude-assisted UI commits already land on production master as ordinary
   commits, see 017); who
   approves a CI-green PR that adds a Local; whether the mobile app takes the web components; what
   "Admin" and "Slevomat for Partners" run on; how "Web" differs from "Web FE B2C".

## Appendix — renumbering of 2026-11-13

Old → new. Applies to anything written before this date: commit messages (`docs(todo-plans): 014 —
…`), the Storybook and `CHANGELOG.md` entries that named a plan by number (updated in place), and
chat history. Plans 001 and 002 kept their numbers.

| Old | New | Plan |
|---|---|---|
| 003 | 004 | Latte UI-building skill |
| 004 | 005 | Contribution skill |
| 005 | 006 | minis-app registers Local |
| 006 | 007 | Todo-plan skill |
| 007 | 008 | Bug-report skill |
| 008 | 009 | Token-update skill |
| 009 | 010 | Skill distribution |
| 010 | 011 | Stylelint "tokens only" |
| 011 | 012 | Token distribution |
| 012 | 013 | `registry.json` |
| 013 | 014 | Porting rules |
| 014 | 015 | Responsive line height in Figma |
| 015 | 016 | Letter-spacing tokens |
| 016 | 017 | Production reference audit |
| 017 | 018 | Changelog sync skill |
