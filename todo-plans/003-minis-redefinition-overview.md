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
Success is measured by consistency, not by how many components run in production.

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

## Rollout phases and the plans behind them

Phases and dates are from the brief ("Plán zavedení"); dates are indicative and no target numbers
are set yet.

| Phase | When | What | Plans | Gap — no plan yet |
|---|---|---|---|---|
| **0. Agreement** | Nov 2026 | Team commitment, approval group, where Mini*S lives in the Nette repo, close decisions 1–3 | — | **G1** |
| **1. Tokens in Nette** | Nov–Dec | Automatic export, versioned package + Style Dictionary source, baseline of adoption | 012 distribution · 001 heritage/curve · 016 letter spacing (in progress) · 015 line height (in progress) · 017 production audit · 009 token-update skill (optional) | **G2** automatic export |
| **2. Checks** | Dec–Jan | Stylus-aware "tokens only" with baseline, `var()` fallback rule, a11y in CI | 011 Stylelint | **G3** a11y in CI |
| **3. Registry and skills** | Jan | `registry.json` + schema, `AGENTS.md`, contribution skill, minis-app registers Local, distribution | 013 registry · 005 contribution · 006 minis-app · 010 distribution · 007 todo-plan skill · 008 bug report · 018 changelog sync | **G4** AGENTS.md · **G5** rules hook |
| **4. Recipes and first review** | Feb | Three Latte + Stylus recipes, porting guide for Latte/Nette, first monthly review | 014 porting rules · 004 Latte skill (needs recipes) | **G6** recipes · **G7** review process |
| **5. Expansion** | from Mar 2027 | Claude Design, finish typography in production, runtime tokens, mobile token names, icons in the production webfont | 015, 016 (typography foundation done) · 012 phase 5 (mobile) | **G8** runtime tokens · **G9** Claude Design · **G10** icons |

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
| 005 | Contribution skill | draft | 0 / 4 | registry schema (013) |
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
| 017 | Production reference audit | draft | 0 / 11 | where the audit script lives; read-only clone `../slevomat` |
| 018 | Changelog sync skill | draft | 0 / 6 | Figma-side contract in `minis-figma-docs` |

**The three blockers that hold most of the rest:**

1. **Canonical token names** (decision 3 = 011 question 2 = 012 question 1). Blocks 011, 012, 013
   and the final form of 014. First precedent already set: the exporter's letter-spacing naming
   rules (plan 016) apply equally to CSS, JSON and Style Dictionary keys.
2. **The registry** (013). Blocks 004, 005, 006 and the review process (G7).
3. **Where Mini*S lives in the Nette repo** (G1). Decides how 010, 011, 012 and 014 reach production.

## Gaps — work the brief asks for that has no plan yet

None of these exists as a file. They are proposals; each becomes a plan when the owner says so,
and takes the next free number (019 onwards).

| Gap | What | Phase | Notes |
|---|---|---|---|
| **G1** | Team agreement: walkthrough of the brief, name the approval group, agree where Mini*S lives in the Nette repo, close decisions 1–3 (then 4, 5, 8) | 0 | Gates 011–014. Open: who signs off; tie-break in the approval group. |
| **G2** | Automatic token export: Figma → PR in this repo, so tokens never lag | 1 | Exporter 1.2.1 already stamps version and settings into `$metadata`. Needs a check that the Figma REST API variables endpoint works on the Professional plan. |
| **G3** | Accessibility in CI: contrast of token pairs (light, dark, Gift) and an axe run over Storybook, warning first | 2 | `@storybook/addon-a11y` exists but nothing fails a build; CI is build + typecheck + lint only. |
| **G4** | `AGENTS.md` and the AI-doc layer (decision 4): core rules for all environments, `CLAUDE.md` slimmed, component docs generated from the registry | 3 | Production already has its own `AGENTS.md` and `doc/ai/skills/` — Mini*S joins them, it doesn't replace them. |
| **G5** | Rules hook: explain which rule an edit breaks, in session; reminds the rules at session start | 3 | Design-only today; needs 011's config. Complements CI. |
| **G6** | The first three Latte + Stylus recipes with AI descriptions, from the lead developer's snippets | 4 | Pick by usage in production; plan 017 gives the usage counts. Candidate: deal card (002). |
| **G7** | Monthly registry review and the proposal/approval process (`proposed` → decision in `meta`) | 4 | Fields belong in 013's schema; could be folded into 013 or 005. |
| **G8** | Runtime tokens in production (CSS custom properties for themes and dark mode) | 5 | First step is the decision whether product wants Gift or dark mode there at all. |
| **G9** | Mini*S in Claude Design | 5 | Mostly questions: what format it accepts, who can publish. |
| **G10** | Icons into the production webfont; icon path in the contribution skill | 5 | 51 `figma-only` icons are missing in production; nobody owns the webfont step. |

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
      (it unblocks the most), then G6 and G7 (they unblock 004–006).
- [ ] **Phase 2 — Resolve the overlaps:** 009 vs G2; G7 into 013 or its own plan; 001 phase 5 vs
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
5. Open questions in the brief that no plan owns: vibe-coding output as PRs or hand-over; who
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
