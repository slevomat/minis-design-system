---
id: 023
title: The first three recipes — Latte + Stylus pairs with an AI description
status: draft
created: 2026-11-13
updated: 2026-11-13
owner: Lexislav
---

# 023 — The first three recipes: Latte + Stylus pairs with an AI description

> **Gap G6 in plan 003, turned into a plan** (2026-11-13). Rollout phase 4 ("Recipes and first
> review", February 2027). Recipes are one of the five foundation pieces, and plans 004 (Latte
> skill), 014 (porting rules) and 021 (the first approved proposal) wait for them.

## Context

The brief defines a recipe as **a proven pattern written as markup and CSS, with a note on when to
use it**, for designers vibing in Latte, developers and AI. It's written once as a decision and
then ported: to Latte for production, to a web component for the docs and the vibing sandbox. For
now production Latte is the reference for behaviour and Mini*S tokens for values (core rule 7).
Because tokens are used in Stylus, not in Latte, **a recipe has to be a Latte + Stylus pair**
(brief, "Adopce tokenů v Nette repozitáři").

Phase 4's "done when" in the brief: **three of the most used patterns as recipes with an AI
description, starting from the lead developer's snippets**, and the first Local pattern approved
into the foundation.

**What production already has** (plan 017, commit `bb1847f86e4`):

- **A recipe shape, used once.** `app/ui/components/_status-info.latte` (added 2026-03-24) is a
  shared Latte partial called with `{embedTemplate '/components/_status-info.latte', title => …}`
  (11 uses), paired with `app/stylus/components/_status-info.styl`, which carries a KSS block, so
  BackstopJS covers it. `{embedTemplate}` is used 196 times in all, e.g. `_brandHeader.latte` 42×,
  `Admin/_table.latte` 109×.
- **Usage ranking** of classes in Latte: `button` 3,053 · `grid-wrap`/`grid`/`container` ~1,650 ·
  `content-message` + `message` 594 · `tags` 363 · `tooltip` 355 · `the-datepicker-wrapper` 333 ·
  `message-overlay` 310.
- **Layout is already documented** from production (`docs/ai-prompts/layouts/production-reference.md`,
  plan 017's layout slice).

## The problem

- **No recipe exists.** The Latte skill (004) has nothing to point at, the porting guide (014) has
  no worked example, and the review (021) has nothing to approve.
- **The most used patterns are hand-written markup.** `button` appears 3,053 times as classes in
  templates, not as one partial; every copy can drift.
- **"Recipe" isn't defined as files yet.** Where it lives, what it contains and how it's tested
  are open (plan 004 question 1).

## Constraints

- **Production conventions win** (plans 004, 020): the Latte half follows `latte-controls.md` /
  `{embedTemplate}` patterns, the Stylus half follows `stylus.md` (owner file, full BEM names,
  paired semantic aliases, `bin/phing check-css`) and gets a KSS block
  (`styleguide-documentation.md`).
- **Document what exists first.** A recipe starts from production's markup as it is (decision 7);
  facelifting it is a separate, later step.
- **Tokens only** (rule 2, plan 011) and **WCAG 2.2 AA** (rule 3, plan 022) for every recipe.
- **API names match Figma and the web components** (`variant`, `size` with `xs`–`xl`), so one
  recipe reads the same in all three (plan 014).
- **Mini*S delivers, production merges** (plan 020). The owner is an external contractor.

## Approach

**A recipe is four files and one registry entry:**

| Part | Where (proposal) | Content |
|---|---|---|
| Latte partial | production `app/ui/components/_<name>.latte` | Parameters named like the Figma properties; called with `{embedTemplate}` |
| Stylus partial | production `app/stylus/components/_<name>.styl` | Tokens only; KSS block on an existing styleguide page, so BackstopJS covers it |
| AI description | `registry.json` entry (plan 013) | Purpose, when to use and not, variants, tokens, implementations per platform |
| Reference web component | this repo, if one exists | Mirrors the recipe's behaviour; the vibing sandbox (plan 019) |
| Source of truth for the decision | this repo, `recipes/<name>.md` (until the registry carries it) | The decision, the parameters, the porting notes, the a11y checklist (022) |

**Choosing the first three:** by production usage (017), by how much Mini*S already has, and by
what the lead developer has snippets for. Candidates:

| Candidate | Production use | Mini*S today | Note |
|---|---|---|---|
| **Button** | `button` 3,053 | `<minis-button>`, Figma, docs | Highest use; the API is settled in Mini*S |
| **Message** | `content-message` + `message` 594 | `<minis-message>`, `<minis-alert>` | Clear variants; easy to check for a11y |
| **Tag** | `tags` 363 | `<minis-tag>` | Small, good first recipe |
| **Status info** | 11 uses | none | Already in recipe shape; can be documented as is |
| **Deal card** | many page-level variants | plan 002 (Figma analysis) | High value, bigger; plan 002 to be re-scoped as a recipe |
| Tooltip, datepicker | 355, 333 | none | Missing in Mini*S; later, via the review (021) |

Proposal for the first three: **button, message, tag**, with **status info** as a warm-up
(it's already in shape) and **deal card** as the first new recipe after them. The final pick is the
lead developer's and the approval group's (plan 020).

**Rejected:**

- **Porting the web components to Latte one by one.** It starts from Mini*S, not from what
  production renders, and contradicts "document what exists first".
- **A Nette Control per recipe.** Heavier (PHP class, factory, NEON) than a stateless partial
  needs; keep Controls for recipes with server logic.
- **Recipes only as documentation pages.** Nothing would use them; the partial is what makes the
  pattern reusable.

## Phases

- [ ] **Phase 0 — Define the recipe format** with the lead developer: the four parts above, where
      each lives, naming, `{embedTemplate}` vs Control. Answers plan 004 question 1.
- [ ] **Phase 1 — Warm-up: status info** documented as a recipe as it is (description, registry
      entry, a11y checklist), to test the format end to end.
- [ ] **Phase 2 — Button, message, tag**: from the lead developer's snippets and production
      markup, as Latte + Stylus pairs; tokens only; KSS; checks from 011 and 022.
- [ ] **Phase 3 — Hand over** to production as a PR they merge (plan 020); record each recipe's
      implementation status per platform in the registry.
- [ ] **Phase 4 — First review** (021): propose the three as Recipe tier; the first approved one
      closes the brief's phase 4.
- [ ] **Phase 5 — Deal card** as the first new recipe; re-scope plan 002 accordingly.

## Dependencies

- **020** — where Mini*S files live in the Nette repo and who merges them.
- **013** — registry entries carry the AI description; **021** — approval to the Recipe tier.
- **014** — porting rules; the first recipes are its worked examples. **004** — the Latte skill
  points at them.
- **011, 022** — every recipe passes the token and a11y checks.
- **017** — the usage ranking used to choose; re-run before phase 2.
- **002** — deal card, re-scoped as a recipe in phase 5.

## Open questions

1. **Where do recipe files live?** The Latte and Stylus halves in production (proposal above), the
   decision in this repo, or everything in this repo and copied over? (= plan 004 question 1.)
2. **`{embedTemplate}` partial or Nette Control** as the default recipe shape?
3. **How are 3,053 hand-written buttons migrated**, if at all? Recipe for new work only, or a
   gradual replacement with a Stylelint/Latte lint hint?
4. **Which snippets does the lead developer already have**, and are they the patterns he'd pick?
5. **Does a recipe need a reference web component** before it's approved, or is that optional?
