---
id: 003
title: Mini*S redefinition — overview of the rollout and every plan in it
status: draft
created: 2026-11-13
updated: 2026-11-20
owner: Lexislav
---

# 003 — Mini*S redefinition: overview of the rollout and every plan in it

> **Start here.** This file is the full picture of the Mini*S redefinition, written so it covers
> everything in the presentation, and a map of the plans that carry it out: which plan covers which
> part, what is blocked on what, and in which order to work ("Recommended order"). It carries no
> work of its own. The source of truth for the *why* is the brief (Czech, 23 Oct 2026, revised
> since). Keep this file current whenever a plan is added, moves status, or changes what it depends
> on (phase 0 below).
>
> **Where things live.**
>
> | Source | Where | Language |
> |---|---|---|
> | Brief, repo copy (source of truth for the *why*) | `docs/MiniS redefined guardrails, not a UI kit.md` | Czech |
> | Brief, live version | <https://claude.ai/artifact/1fwLit8Shd9Z2DtyMY7zk8> | Czech |
> | Presentation, 17 slides (16–17 added 2026-11-13) | <https://claude.ai/artifact/W85J8tcMEBTgxbttnVHxka> | Czech |
> | Presentation in Figma (same 17 slides, frames "01 Cover" … "17 Do produkce a zpět") | [MiniS DS → "MiniS re-fit – prezentace"](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=5995-149) | Czech |
> | The plans explained for the team agreement (8 frames: map of plans, what 020 closes, decisions 1–8, commitments, pattern path, questions for production, what can start now; added 2026-11-13) | [MiniS DS → "MiniS re-fit – plány k dohodě"](https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=6247-302) | Czech |
> | Contribution diagram | Figma `mfiAVMWkxiBRGnegjqLMNW`, page READ-ME → "Contribution model" | — |
>
> The presentation is from 29 Oct 2026, updated on 13 Nov 2026 (cover, platforms, adoption,
> next steps, and two new slides: the rollout order and the paths into production). Where this
> file and the presentation still differ, this file is newer. The chat handoff of 2026-11-05 says to export
> the live brief before trusting the repo copy; the repo copy is newer than that handoff's copy and
> has dropped its "floor" and "harvest" wording.
>
> **Numbering.** Plans 003–017 were renumbered to 004–018 on 2026-11-13 to make room for this
> overview. Old numbers in git history, commit messages and the changelogs of that time are
> decoded in the table at the end.

## The redefinition in full

This section follows the presentation slide by slide, in its four parts, and says for each part
which plans carry it. Slide numbers refer to both the claude.ai deck and the Figma frames.

### Part 1 — Why Mini*S changes: what a year taught us (slides 1–6)

**The goals don't change, the route does** (slide 2):

| Goal | What it means | Served by |
|---|---|---|
| One experience | Slevomat looks and behaves the same on the web, for partners and in the app | 012, 014, 023, 029 |
| Faster development | Ready decisions and patterns instead of designing and coding from zero | 023, 004, 005, 019 |
| Fewer duplicates, less debt | One pattern instead of five similar ones; fewer hardcoded values | 011, 013, 005, 017 |
| Quality and accessibility | Proven patterns and WCAG as the default, not a later fix | 022, 023 |
| One language | Design, development, product and AI use the same names for the same things | 003 decision 3, 013, 025 |
| Easy changes | Rebrand, themes or dark mode by changing tokens, not hundreds of files | 012, 024, 027 |

**What a year taught us** (slide 3). For about a year Mini*S was built the classic way, as a UI
kit: Lit web components, Storybook, Figma. The promise "a component library everyone imports"
didn't come true here, for three reasons:

- **Production runs on Nette** (Latte + Stylus). The Mini*S web components don't live there, and
  nobody ever promised a move to React or Lit.
- **The lead developer designs in code**, as he always has. His patterns are in production, not
  in Mini*S.
- **Designers vibe-code on production.** Since late October 2026 they may design with AI on top of
  the production code.

Measured by components in production, Mini*S would look like a failure; that phase was largely
discovery.

**The value moved, it didn't disappear** (slide 4): **AI doesn't need our components, it needs our
decisions.** Down the stack, **tokens** are used by everyone, including people vibing with AI, and
the mobile app already took their values; that's real adoption. Up the stack, **decisions**: when
UI comes from prompts, someone has to say what the spacing is, which variants exist and what is
not allowed. Without clear decisions every prompt produces a slightly different product.

**A garden, not Lego** (slide 5). Lego is finished bricks from one factory; a garden is the
conditions in which whatever anyone plants can grow. The analogy explains; the documents keep the
plain terms (registry, review, Local).

| In the garden | In Mini*S | Plans |
|---|---|---|
| Soil | Tokens, the foundation | 012, 024, 001, 015, 016 |
| Tools | Skills, Stylelint, the registry | 005, 004, 006, 011, 013, 025, 026 |
| Rules of care | The seven core rules | below; 011, 022, 021 |
| Fence and beds | Guardrails: plant freely, just not on the path | 020, 011, 022 |
| Seeds from anyone | New work as Local; the labels are registry entries | 005, 006, 013 |
| A gardener who doesn't guard the gate | The registry review moves what took root into the main bed (Local → Recipe → Core) | 021 |

*A garden, not a wilderness:* weeds will grow (duplicates, hardcoded values, copies with no
registry entry). Weeding is part of the care, done regularly, automatically in CI and at the
registry review.

**Three conditions** (slide 6). A design system makes sense here only if:

1. **It lives where UI is built**: in the Nette repo, as tokens, skills and the registry → 020,
   010, 012, 025.
2. **Its rules are checked by machines**; a design system that only advises is ignored → 011,
   022, 013 phase 2, 026.
3. **Success is UI consistency**, not the number of imported components → 017 measure 5.

How we'll know: the share of values from tokens in the Nette repo (~18 % on 2026-10-29), new items
built without a registry entry, and the number of Local patterns promoted. Plan 017's script
reports all three (measure 5); the monthly review (021) looks at them.

### Part 2 — What Mini*S is now and where it's used (slides 7–9)

**An agreement, not a construction kit** (slide 7): a shared set of decisions, rules and recipes
that let anyone, human or AI, build UI that looks and behaves like Slevomat, in any environment.
Three principles:

- **Rules instead of approval.** Nobody waits for a yes; the rules are the guardrails inside which
  people build freely.
- **Every rule comes with a helper:** a token, a recipe, a skill or a lint rule, so following the
  rule is the easiest path. A rule without a helper is only a wish.
- **Independent of environment.** Latte, web components, Figma and AI each get the decisions in
  their own form (014).

**Roles of the old pieces.** Figma stays the source of truth for tokens and a surface for design
and review (024, 018). The web components become the reference implementation and the vibe-coding
sandbox, not a production dependency, and are ready if the mobile app takes them (019, 006, 029).

**Six platforms, each different** (slide 8):

| Platform | Environment | How it gets Mini*S | Plans |
|---|---|---|---|
| Web | Nette/Latte (`slevomat/slevomat`) | Tokens through Style Dictionary → Stylus; recipes and skills in the Nette repo | 012, 023, 010, 017 |
| Web FE for people (B2C) | unclear how it differs from "Web" (open question 5) | — | 013 platform keys |
| Admin | Same Nette repo (`app/ui/Admin`, `index-admin.styl`), to confirm | Same token layer as the web | 017, 013 |
| Slevomat for Partners | Same Nette repo (`app/ui/PartnerAdmin`, `index-partner.styl`, partner guide), to confirm | Same token layer as the web | 017, 013 |
| Vibe-coding apps | Web components (sandbox) | Web components, tokens, the `minis-app` skill, the Claude design system | 019, 006 |
| Mobile app | Its own code (released) | Took the token values; names and structure planned; production builds a `Tokens.kt` | 029 |

*(The presentation says "zjišťujeme" for Admin and Partners. The production clone shows both live
in the same repo with their own Stylus entry files and the shared `settings/` layer; the Nette
team's 2026-10-29 analysis says the same.)*

**Adoption is real, but far from the goal** (slide 9). The presentation shows the Nette team's
numbers from 2026-10-29; plan 017 has measured since. Both, side by side:

| | Nette team analysis, 2026-10-29 (in the presentation) | Plan 017, 2026-11-05/06 and 2026-11-13 |
|---|---|---|
| Share of variable uses from Mini*S | ~18 % (1,157 of 6,435); 133 of 557 exported names used | colours "nearly all tokens", 64 % of colour refs are primitives |
| Hardcoded values | ~1,300 hex · 14,400 px · 986 font sizes | 84 hex (besides `#fff`/`#000`) · 15,486 px · 59 `letter-spacing` |
| Tokens at runtime | build-time only (Style Dictionary → Stylus → literal CSS) | same, **but** dark mode switches at runtime through `light-dark()` and brand themes are custom properties |
| Heritage colour aliases | 90 in `colors.styl` to redirect ("the fastest lever") | **already retired by Nette on 2026-11-02** |
| Typography | 21 of 66 names used, "barely adopted" | used indirectly: `typo-*` classes in ~826 Latte files |
| Token import | — | by hand (`build/style-dictionary/config.js`, no script target); last export 2026-08-12, before plan 016's renames |
| AI layer | — | `AGENTS.md` + 33 skills in a passive-index format; **Copilot is the main agent** (184 vs 6 Claude trailers since August); Mini*S named in one skill only |

Another route to adoption (slide 9): **Mini*S in Claude Design and vibe-coded apps** built on the
tokens and components. Adoption doesn't have to start in production code → plan 019.

### Part 3 — How it works: foundation, registry, rules, contribution, roles (slides 10–14)

**The foundation — what everyone gets** (slide 10):

| Piece | What it is | Plans |
|---|---|---|
| Tokens | Colours, spacing, radius, typography, layout; from Figma as CSS variables (Stylus variables in production) | 012, 024, 001, 015, 016, 027, 029 |
| Recipes | Proven patterns as Latte + Stylus (and HTML/CSS), with a note on when to use them | 023, 002 |
| Skills | How to build Slevomat UI with Mini*S; `AGENTS.md` and skill files in the repo | 004, 025, 010, 019, 007, 008, 018 |
| Contribution skill | The decision path, and registering new work as Local | 005, 006 |
| Porting rules | How tokens and recipes move into Latte and web components, and which side wins | 014 |

Above all of it, **`registry.json`**: the single list of what exists. Every tool looks there
before anything new is built.

**The registry: one list of everything that exists** (slide 11) → plan 013.

- Before anything new is built, the AI in the Nette repo, the contribution skill and CI all look
  there.
- **shadcn format**, which AI tools know; Mini*S fields live in `meta` (`tier`, `aliases`,
  `whenToUse` / `whenNotToUse`, `variants`, `tokens`, `usedIn`, `status`, `decision`,
  `implementations`).
- **Production components go in as they are**; a facelift is a separate, later step (decision 7).
- **Implementation status per platform** for every pattern (proposal, decision 8).
- Used for discovery (shadcn MCP server), not for installing anything into Nette.

**Seven core rules** (slide 12). What a machine can check, CI checks on every PR; what needs
judgement, the skills guide and the monthly registry review verifies. Automated checks take the
personal edge out of the debate: nobody has to tell anyone they broke a rule, the build does.

| # | Rule | What it means | Checked by | Plans |
|---|---|---|---|---|
| 1 | Don't reinvent the wheel | Registry → extend by variant or tokens → only then build new; never copy an existing item | judgement: contribution skill + review | 005, 013, 021 |
| 2 | Tokens only | No hardcoded hex, px or fonts | CI: Stylelint with a baseline (new violations only) | 011, 026 |
| 3 | Accessibility | WCAG 2.2 AA: contrast, focus, labels, keyboard | CI: a11y test, token-pair contrast | 022 |
| 4 | Every element has a description | A valid registry entry | CI: registry check | 013 |
| 5 | New starts as **Local** | Registered at once as Local | CI: registry check | 005, 006, 013 |
| 6 | Promotion on evidence and approval | A proposal in the registry; to Recipe and Core only what's in 3+ places and approved | judgement: monthly review | 021 |
| 7 | One reference | Values from Mini*S tokens; behaviour from production Latte for now, Mini*S long term | judgement: porting rules | 014 |

**Tiers:** Local → Recipe → Core (names stay English). Nobody needs permission to build a Local;
the monthly review promotes, merges or retires.

**Contribution: build without approval, contribute with approval** (slide 13) → 005, 021.

1. **Search the registry** — what already exists?
2. **Extend by variant or tokens**, and report the gap.
3. **Build as Local** and register it at once.
4. **Recipe** — in 3+ places and an approved proposal.
5. **Core** — the foundation everyone builds from next time.

Proposals are recorded and decided: each is a registry item with `meta.status: proposed`; at the
monthly review the DS owner with the lead developer and design (product as needed) approves,
merges, returns or rejects it, and the decision and reason go into `meta.decision`. Work from any
source goes through the same automated checks and starts as Local. In production, the KSS block
production already requires is the registration (005, "The production path"). **Icons have their
own path:** drawn in the Slevomat Icons Figma file, to production through the webfont → 028.

**Roles: everyone contributes** (slide 14):

| Role | Builds by | Gets from Mini*S | Owes back | Plans |
|---|---|---|---|---|
| Designer in the Nette repo | Prompting AI over production Latte | Skills and the contribution skill in the repo, Latte recipes, tokens | Keep the core rules; register Local work | 010, 023, 005, 025 |
| Lead developer | Writing Latte by hand, often designing | Tokens, recipes, porting rules for Latte | Co-owns the registry review; his patterns are the first Recipe candidates | 014, 021, 023 |
| Anyone with a prompt elsewhere | Vibe-coding in the web-component sandbox or Claude Design | Web components, skills, tokens, the design system | Treat the output as a proposal, not production | 019, 006 |
| DS owner (Lexa) | Curating, not gatekeeping | The registry and its review, porting rules | Keep tokens, skills and descriptions current | 021, 024, 018 |

The biggest shift is the first row: when designers work in the production repo, Latte recipes and
skills inside that repo matter more than a library in Figma.

**Shared responsibility** (brief, "Společná odpovědnost"; not in the presentation). The
redefinition doesn't work without a commitment from everyone who builds Slevomat UI: keep the core
rules even in a hurry and handle exceptions openly in the registry; search first and report gaps;
register everything new; take part in the monthly review; treat a failed CI check as a bug to
fix. Mini*S commits in return to keeping tokens, recipes, skills and the registry current, so the
rules are the easiest path. Without it Mini*S falls back to "documentation nobody reads" → plan 020.

### Part 4 — What's next and what's being decided (slide 15)

**"We start in the Nette repo"** — the presentation's next steps, and where each stands now:

| Next step (slide 15) | Plan | State on 2026-11-13 |
|---|---|---|
| Agree with the Nette team where Mini*S lives in their repo | 020 | Planned; step 0 of the recommended order |
| `AGENTS.md` and the contribution skill in the Nette repo | 025, 005, 010 | Planned; production's format and channel known (017) |
| Token check with a baseline, blocking only new violations | 011 | Planned; extends production's existing Stylelint |
| Redirect the colour aliases in `colors.styl` to Mini*S | — | **Done by the Nette team on 2026-11-02** |
| Automatic token export instead of manual | 024 | Planned |
| The three most used patterns as Latte + Stylus recipes | 023 | Planned; button, message, tag proposed |
| Set up `registry.json` and fill it | 013 | Planned; `status` and `decision` fields added |

**Being decided** (slide 15): heritage colours as a token layer, only token fallbacks in `var()`,
canonical token names, AI docs generated from the registry, no longer requiring Code Connect,
implementation status per platform. These are decisions 1–5 and 8 in "Decisions waiting to be
closed" below; decision 6 (mobile app) and 7 (production components as they are) are accepted.

**Agreement so far** (from the chat handoff, 2026-11-05; the brief doesn't record it): on
2026-11-02 the Nette lead developer accepted the redefinition, updated colours are on Nette
master, and Nette's Stylelint already guides AI in migrating variables to them. Phases 1–2 have
effectively started on their side; this is why plan 020 is about writing the agreement down and
naming the approval group, not about getting a first yes.

## Recommended order — which plan to read and work on when

Added 2026-11-13, when every gap got a plan. **Plan numbers say when a plan was written, not when
to do it** (they're permanent; see `README.md`). This is the order that follows from the
dependencies. Each step can start when the one before it has closed what it blocks, not when it's
fully done.

**Step 0 — Agreement (November).** Everything else waits for it.

| # | Plan | Why here |
|---|---|---|
| 1 | **020** Team agreement | Names the approval group, says where Mini*S lives in the Nette repo, closes decisions 1–3 (decision 3 = canonical names, which blocks 011–014) |
| — | inputs: **017** production audit, **005** "The production path" | The facts and the five questions to bring to the meeting |

**Step 1 — Tokens everywhere, from one source (November–December).**

| # | Plan | Why here |
|---|---|---|
| 2 | **024** Automatic token export (absorbs **009**) | Stops the copies from lagging; every later output regenerates from it |
| 3 | **012** Token distribution | Versioned package + shared Style Dictionary source for production (and later mobile, 029) |
| 4 | **017** Production audit script | The adoption baseline and the three success metrics, before anything changes |
| — | finish **015**, **016** (in progress) | Typography foundation; already mostly done |

**Step 2 — Checks (December–January).** Ship together, both warning-first with a baseline.

| # | Plan | Why here |
|---|---|---|
| 5 | **011** Stylelint "tokens only" | Rule 2 by machine; extends production's existing config |
| 6 | **022** Accessibility checks | Rule 3 by machine: token-pair contrast, axe over Storybook |

**Step 3 — Registry, review and the AI layer (January).**

| # | Plan | Why here |
|---|---|---|
| 7 | **013** `registry.json` | Unblocks 004, 005, 006, 021, 025, 026 |
| 8 | **021** Monthly review and approval | Rules 5 and 6; the first review is in step 4 |
| 9 | **005** Contribution skill | The registry's main client; in production the KSS block is the registration |
| 10 | **025** `AGENTS.md` and AI docs | Core rules for every tool (decision 4) |
| 11 | **010** Skill distribution (production) · **019** vibe-coders (everything else) | How the skills reach people |
| 12 | **006** `minis-app` registers Local · **026** rules hook | Built on the registry and the plugin |

**Step 4 — Recipes and the first review (February).**

| # | Plan | Why here |
|---|---|---|
| 13 | **014** Porting rules | The Latte guide the recipes follow |
| 14 | **023** First three recipes (deal card from **002** next) | The foundation piece production uses directly |
| 15 | **004** Latte UI-building skill | Needs recipes and the registry to point at |

**Step 5 — Expansion (from March 2027).** Order by need, not dependency.

| # | Plan | Why here |
|---|---|---|
| 16 | **027** Runtime tokens | Only after product confirms themes / dark mode are wanted |
| 17 | **028** Icons to production | Hand-over packs for the webfonts |
| 18 | **029** Mobile app tokens | Needs a mobile team contact |
| 19 | **001** Colour ramps → curve | Long-term; gated by a production developer's review |

**Any time, low priority:** **007** todo-plan skill, **008** bug-report skill, **018** changelog
sync (useful as soon as 024 automates exports).

**Can start now, without plan 020:** 017's script, 019 phases 0–1 (record the Claude design
system, hosted runtime), 022 phases 0–1 (pair list, contrast script in this repo), 024 phases 0–1
(verify options, manual one-command path), finishing 015 and 016. None of them touches production.

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
| Mini*S → production | Recipes | Latte + Stylus partial with a KSS block on an existing styleguide page, covered by BackstopJS | 004, 014, 023 |
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
| **1. Tokens in Nette** | Nov–Dec | Automatic export, versioned package + Style Dictionary source, baseline of adoption | 012 distribution · 001 heritage/curve · 016 letter spacing (in progress) · 015 line height (in progress) · 017 production audit · 009 token-update skill (optional) · 024 automatic export | — |
| **2. Checks** | Dec–Jan | Stylus-aware "tokens only" with baseline, `var()` fallback rule, a11y in CI | 011 Stylelint · 022 accessibility checks | — |
| **3. Registry and skills** | Jan | `registry.json` + schema, `AGENTS.md`, contribution skill, minis-app registers Local, distribution | 013 registry · 005 contribution · 006 minis-app · 010 distribution · 007 todo-plan skill · 008 bug report · 018 changelog sync · 025 AGENTS.md · 026 rules hook | — |
| **4. Recipes and first review** | Feb | Three Latte + Stylus recipes, porting guide for Latte/Nette, first monthly review | 014 porting rules · 004 Latte skill (needs recipes) · 021 review and approval · 023 first recipes | — |
| **5. Expansion** | from Mar 2027 | Claude Design, finish typography in production, runtime tokens, mobile token names, icons in the production webfont | 015, 016 (typography foundation done) · 012 phase 5 (mobile) · 019 vibe-coders (G9, started early: the design system is already exported) · 027 runtime tokens · 028 icons · 029 mobile app | — |

**Plans that fit no phase:**

- **001 colour ramps → curve** — long-term work, not a rollout step. Its heritage layer is close to
  decision 1 (heritage as a legacy token layer), but 001 schedules that *after* the curve
  (its phase 5) while decision 1 wants it *now*. Reconcile when decision 1 is closed. **Keep.**
- **002 Deal Card and Promo Card** — a component plan from before the redefinition. Its Figma
  analysis makes the deal card the strongest candidate for one of the three first Latte recipes
  (G6), more than a new web component. **Keep, re-scope in plan 023 phase 5.**
- **007 todo-plan skill, 008 bug report skill** — in the brief's skills table but in no rollout
  phase; low priority, ship through 010. **Keep.**
- **009 token-update skill** — optional, and overlaps with plan 024 (automatic export, was G2), which takes it as its phase 1, and with the
  typography procedure its phase 7 carries. **Merge or close** once 024 starts.

## All plans at a glance

Status as of 2026-11-13. "Open" counts unticked phase checkboxes.

| # | Plan | Status | Phases (done / open) | Blocked on / waits for |
|---|---|---|---|---|
| 001 | Colour ramps → curve | draft | 0 / 24 | production developer's review (gates every phase) |
| 002 | Deal Card, Promo Card | draft | 4 / 28 | Phase 0 checks against production |
| 003 | *this overview* | draft | — | — |
| 004 | Latte UI-building skill | draft | 0 / 4 | recipes (023) + registry (013) |
| 005 | Contribution skill | draft | 0 / 4 | registry schema (013); production path proposed 2026-11-13, needs the production developer |
| 006 | minis-app registers Local | draft | 0 / 3 | 005, registry |
| 007 | Todo-plan skill | draft | 0 / 4 | nothing; ships via 010 |
| 008 | Bug-report skill, `/minis-bug` | draft | 0 / 4 | who can open GitHub issues (its Q1–2) |
| 009 | Token-update skill (optional) | draft | 0 / 3 | becomes plan 024's phase 1 (manual export path) |
| 010 | Skill distribution | draft | 0 / 4 | channel choice: plugin, copied files or package |
| 011 | Stylelint "tokens only" | draft | 0 / 14 | **decisions 2 and 3** (fallbacks, canonical names); Stylus support |
| 012 | Token distribution, Style Dictionary | draft | 0 / 16 | **decision 3**; production already builds with Style Dictionary |
| 013 | `registry.json` | draft | 0 / 6 | `meta` fields, production tier, platform keys |
| 014 | Porting rules | draft | 0 / 5 | decision 3, registry; Latte part needs the lead developer |
| 015 | Responsive line height in Figma | **in-progress** | 11 / 3 | Style Dictionary build run on the new `$metadata` (production side); typography procedure as a skill. Exporter 1.3.0 "Line heights" command done 2026-11-20 |
| 016 | Letter-spacing tokens (high priority) | **in-progress** | 11 / 1 | only the `page-header` docs row |
| 017 | Production reference audit | draft | 0 / 11 | where the audit script lives; read-only clone `../slevomat`. Two hand-made slices done (layout; AI layer and tokens), 2026-11-13 |
| 018 | Changelog sync skill | draft | 0 / 6 | Figma-side contract in `minis-figma-docs` |
| 019 | Mini*S for vibe-coders | draft | 0 / 6 | access to two Slevomat repos (asked 2026-11-13); link of the existing Claude design system; Skill Hub owners |
| 020 | Team agreement | draft | 0 / 5 | the walkthrough meeting; who signs off |
| 021 | Monthly review and approval | draft | 0 / 5 | 020 (approval group), 013 (`status`, `decision` added 2026-11-13) |
| 022 | Accessibility checks | draft | 0 / 6 | pair list from design; ships with 011 in phase 2 |
| 023 | First three recipes | draft | 0 / 6 | 020 (where files live, who merges); recipe format with the lead developer |
| 024 | Automatic token export | draft | 0 / 5 | Figma plan's REST access; exporter network access; absorbs 009 |
| 025 | `AGENTS.md` and the AI-doc layer | draft | 0 / 5 | decision 4 (020); registry (013) for generated docs |
| 026 | Rules hook | draft | 0 / 5 | 011 config and 013 registry runnable per file; plugin (019) |
| 027 | Runtime tokens in production | draft | 0 / 5 | product's requirement (themes, dark mode) |
| 028 | Icons to production | draft | 0 / 4 | lead developer's IcoMoon workflow; registry icon question |
| 029 | Mobile app tokens | draft | 0 / 5 | a mobile team contact; takes over 012 phase 5 |

**The three blockers that hold most of the rest:**

1. **Canonical token names** (decision 3 = 011 question 2 = 012 question 1). Blocks 011, 012, 013
   and the final form of 014. First precedent already set: the exporter's letter-spacing naming
   rules (plan 016) apply equally to CSS, JSON and Style Dictionary keys.
2. **The registry** (013). Blocks 004, 005, 006 and the review process (G7).
3. **Where Mini*S lives in the Nette repo** (G1). Decides how 010, 011, 012 and 014 reach production.

## Gaps — work the brief asks for that has no plan yet

None of these exists as a file. They are proposals; each becomes a plan when the owner says so,
and takes the next free number (030 onwards). As of 2026-11-13 every gap
below has a plan; the table stays as the record of where each plan came from.

| Gap | What | Phase | Notes |
|---|---|---|---|
| ~~**G1**~~ | **Now plan 020** (2026-11-13). Team agreement: walkthrough of the brief, name the approval group, agree where Mini*S lives in the Nette repo, close decisions 1–3 (then 4, 5, 8) | 0 | Gates 011–014. Open: who signs off; tie-break in the approval group. |
| ~~**G2**~~ | **Now plan 024** (2026-11-13). Automatic token export: Figma → PR in this repo, so tokens never lag | 1 | Production lags too: its import is manual and was last run 2026-08-12, and this repo's `tokens.rgb.json` is from 2026-03-13 (017). Exporter 1.2.1 already stamps version and settings into `$metadata`. Needs a check that the Figma REST API variables endpoint works on the Professional plan — it is likely Enterprise-only; fallback: the exporter plugin opens the PR through the GitHub API. |
| ~~**G3**~~ | **Now plan 022** (2026-11-13). Accessibility in CI: contrast of token pairs (light, dark, Gift) and an axe run over Storybook, warning first | 2 | `@storybook/addon-a11y` exists but nothing fails a build; CI is build + typecheck + lint only. |
| ~~**G4**~~ | **Now plan 025** (2026-11-13). `AGENTS.md` and the AI-doc layer (decision 4): core rules for all environments, `CLAUDE.md` slimmed, component docs generated from the registry | 3 | Production already has its own `AGENTS.md` and `doc/ai/skills/` — Mini*S joins them, it doesn't replace them. Their format is plain Markdown with an index row (no frontmatter), and Copilot is the main agent there, so a Claude-only channel misses most sessions (017). |
| ~~**G5**~~ | **Now plan 026** (2026-11-13). Rules hook: explain which rule an edit breaks, in session; reminds the rules at session start | 3 | Design-only today; needs 011's config, and 011 itself should extend Nette's existing Stylelint config rather than add one (answered in 011, 2026-11-06). Complements CI. |
| ~~**G6**~~ | **Now plan 023** (2026-11-13). The first three Latte + Stylus recipes with AI descriptions, from the lead developer's snippets | 4 | Pick by usage in production; plan 017 gives the usage counts. Candidate: deal card (002). A recipe in production is a Latte + Stylus partial with a KSS block, so BackstopJS covers it for free. |
| ~~**G7**~~ | **Now plan 021** (2026-11-13). Monthly registry review and the proposal/approval process | 4 | `status` and `decision` added to 013's `meta` the same day. |
| ~~**G8**~~ | **Now plan 027** (2026-11-13). Runtime tokens in production (CSS custom properties for themes and dark mode) | 5 | First step is the decision whether product wants Gift or dark mode there at all. Partly there already: dark mode switches at runtime through `light-dark()` and brand themes are CSS custom properties (017). |
| ~~**G9**~~ | Mini*S in Claude Design | 5 | **Now plan 019** (2026-11-13), widened to every non-production channel: Claude Design, the Skill Hub, a Claude Code plugin, the AI Hub and a hosted runtime. |
| ~~**G10**~~ | **Now plan 028** (2026-11-13). Icons into the production webfont; icon path in the contribution skill | 5 | 51 `figma-only` icons are missing in production; nobody owns the webfont step. |
| ~~**G11**~~ | **Now plan 029** (2026-11-13). Mobile app: take over MiniS token names and structure (decision 6, accepted) | 5 | Only a late phase of 012 today. Values are already taken over, and Style Dictionary already writes `Tokens.kt`. Open whether the app also takes the web components. |

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
- **Typography method** — Figma, exporter 1.3.0 (1.2.1 for the export rules, 1.3.0 adds the
  Line heights command) and CSS — is in plans 015 and 016 and
  `docs/ai-prompts/typography.md`.

## Phases

- [ ] **Phase 0 — Keep this file true.** On every plan added, renamed, closed or re-statused, and
      on every closed decision, update the tables above in the same commit.
- [ ] **Phase 1 — Turn gaps into plans, one at a time**, in the owner's order. Suggested first: G1
      (it unblocks the most), then G6 and G7 (they unblock 004–006). *(2026-11-13: G1 → 020,
      G7 → 021, G9 → 019, G3 → 022, G6 → 023. G2 → 024, G4 → 025, G5 → 026, G8 → 027, G10 → 028, G11 → 029. No gaps left.)*
- [ ] **Phase 2 — Resolve the overlaps:** ~~009 vs G2~~ (009 is 024's phase 1); ~~G7 into 013 or its own plan~~ (own plan 021, fields in 013); 001 phase 5 vs
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
