---
id: 005
title: Contribution skill — reuse, extend, or register as Local
status: draft
created: 2026-10-29
updated: 2026-11-13
owner: Lexislav
---

# 005 — Contribution skill: reuse, extend, or register as Local

> **Depends on the registry (`registry.json`).** It doesn't exist yet, nor does its schema. This
> skill is the registry's main client and can't be written before the schema is settled.
> Used by plans 004 and 006. Distribution: see plan 010.

## Context

Mini*S is being redefined as shared rules and decisions anyone, human or AI, builds with. The
planned `registry.json` (shadcn format, MiniS fields in `meta`) lists everything that exists, and
every tool checks it before building anything new. New work starts at tier **Local** and is
promoted to **Recipe** or **Core** after 3+ uses, decided in a **monthly registry review**. All of
this is ideation; nothing is decided.

## The problem

Without a shared decision path, every person and every agent builds new instead of reusing, and
the same card gets built five times in five places. The path has to be identical wherever someone
builds — in this repo, in a sandbox prototype, in the Nette repo — or the registry stops being
the single list of what exists.

## Constraints

- **The skill never promotes.** Promotion is the monthly review's call, the same way a todo plan
  is not authorisation to act. The skill registers and flags; people decide.
- **Extending must not break existing users.** Adding a variant or a token is fine; changing a
  default or re-valuing a token is not a "small extension" (see 001 for why heritage values are
  untouchable).
- One copy of the path. Other skills (004, 006) call this one instead of restating it.

## Approach

A three-step decision path, each step ending in a visible outcome:

1. **Search** `registry.json` by name, description and category. Match → use it, stop.
2. **Near match → extend** with a variant or tokens, and **flag the gap** (what was missing, where
   it came up). Never fork a near-copy.
3. **No match → build new as Local** and add a registry entry: tier `Local`, owner, where it is
   used, date. This is use #1.

**Rejected:** each skill carrying its own copy of the path (it drifts); automatic promotion at
3 uses (the count is a signal for the review, not a decision); a free-form "ask in Slack first"
step (unsearchable, no record).

## The production path — proposal (2026-11-13)

Most new UI is built in the production repo, not here: the lead developer writes Latte and
Stylus by hand and often designs in code, and designers vibe-code there with an AI agent (mostly
GitHub Copilot). Facts behind this section: plan 017, slice "AI layer, token pipeline and
guardrails". The three-step path above stays the same; **what changes in production is how
step 3, "register as Local", happens.** It reuses a rule production already has, so nobody
there has to learn a new step.

1. **Build as usual in production.** The agent follows production's `AGENTS.md` and
   `doc/ai/skills/` (Stylus, Latte controls, web components). Mini*S adds no gate here.
2. **Search first, there.** In production the "registry" an agent can see today is the KSS
   styleguide (96 entries, sections Brand, Content, Feedback, Guidance, Navigation, Selection,
   buttons, forms…) and `app/stylus/components/`. Step 1 of the path reads those until
   `registry.json` is published to a URL the agent can fetch (plan 013 phase 4).
3. **"Register as Local" = write the KSS block.** Production's own
   `doc/ai/skills/styleguide-documentation.md` already requires a KSS block for every new shared
   component, on an existing styleguide page, so BackstopJS covers it with no new scenario. In
   production that block **is** the registration: name, description, markup and modifiers are all
   there.
4. **Mini*S harvests, nobody files.** Each month, before the registry review, the plan 017 script
   lists new partials in `app/stylus/components/` and elements in `app/js/components/` since
   the last run, parses their KSS blocks, counts their uses in Latte, and writes candidate
   `registry.json` entries (tier per plan 013 question 1, `implementations.web.ref` = the file
   and the styleguide section). New components without a KSS block (49 of 79 partials today)
   are listed as gaps for production to document under their own rule, not as Mini*S entries.
5. **The monthly review decides** (as above: this skill never promotes). A harvested component
   with 3+ uses can be proposed for Recipe. Promotion means Mini*S takes over the decisions:
   tokens (new or extended), a Figma component, the registry description, and optionally a
   reference web component. The production Latte + Stylus stays the behavioural reference
   (core rule 7).
6. **Decisions flow back into production by the channels it already has:**
   - **Token values and new tokens** go Figma → exporter → `build/style-dictionary/tokens/*.json`
     → `_variables.styl`. Today the lead developer runs that by hand; the last import is from
     2026-08-12 (017 open question 7, gap G2).
   - **Renames and retirements** go into a deprecation map that production's
     `slevomat/no-deprecated-variable` Stylelint rule reads (017 open question 8). The build
     tells the next agent; nobody has to.
   - **Rules for agents** go in as one file in production's skill format (plain Markdown, no
     frontmatter) plus one row in `AGENTS.md`'s Skills Index. Short Mini*S notes go into the
     skills that already own the topic (`stylus.md`, `figma.md`). Plan 010 owns the channel.
7. **The other direction stays as planned:** prompts outside production use `minis-app` and the
   web components (plan 006) and register Local here, in `registry.json`.

**What this answers, as proposals until the production developer agrees:** question 2 (a
designer in the Nette repo registers nothing cross-repo; the KSS block is the registration and
Mini*S harvests it), question 3 (uses are counted by the 017 scan, not by hand), question 4 (a
gap from production is a missing KSS block or a harvest candidate on the review agenda).

**Questions for the production developer** (collected in plan 003, "Production → Mini*S"):

1. Is the KSS block a good enough "registration" for new shared components, and would you
   accept a reminder for the 49 partials without one?
2. Can the Mini*S skill and its Skills Index row live in your `AGENTS.md` / `doc/ai/skills/`,
   or would you rather we publish it through `slevomat/claude-plugin-slevomat-documentation`?
   Copilot doesn't load Claude plugins.
3. Would your Stylelint config read a deprecation map Mini*S generates?
4. Who runs the token import (`build/style-dictionary/config.js`), and how often should it run?
5. When you build something new in production, would you want to see it on the monthly review
   agenda automatically (harvest), or only when you put it there?

## Phases

- [ ] **Phase 0 — Prerequisite:** registry schema, tier definitions and review process agreed
      (probably a plan of its own — see question 1).
- [ ] **Phase 1 — Write the path** with one worked example per step.
- [ ] **Phase 2 — Wire it in:** 004 and 006 call this skill instead of carrying the logic.
- [ ] **Phase 3 — Pilot through one monthly review** and adjust what a registry entry must
      carry, based on what the review actually needed.

## Open questions

1. **Does the registry need its own plan** — schema, `meta` fields, tiers, review cadence? These
   aren't skill questions, and this plan shouldn't decide them in passing.
2. **Where does `registry.json` live and who can write to it?** If it's in this repo, a designer
   in the Nette repo registers a Local item through a cross-repo PR — is that acceptable?
   *Proposal (2026-11-13): no cross-repo PR — the KSS block is the registration in production and
   Mini*S harvests it. See "The production path".*
3. **How are uses counted** — a field people bump by hand, a scan of the codebases, or the review
   counting by eye? *Proposal: a scan (plan 017's script counts class uses in Latte).*
4. **Where does a flagged gap go** — a GitHub issue (ties to 008), a `meta` field on the item, or
   the review agenda? *Proposal for production gaps: the harvest list on the review agenda.*
5. **Is name + description search good enough**, or does the registry need tags/synonyms so
   "tile" finds "card"?
