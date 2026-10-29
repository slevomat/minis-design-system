---
id: 003
title: Latte UI-building skill for the Nette repo
status: draft
created: 2026-10-29
updated: 2026-10-29
owner: Lexislav
---

# 003 — Latte UI-building skill for the Nette repo

> **Depends on Latte recipes existing, and on the registry (`registry.json`).** Neither exists yet.
> This skill cannot be written before there is at least a first set of recipes to point at.
> Distribution: see plan 009. Unknown-item path: see plan 004.

## Context

Mini*S is being redefined from "a UI kit people import" to "shared rules and decisions anyone,
human or AI, builds with". Production runs on **Nette/Latte**, not on our web components, and
designers now vibe-code directly in the production Nette repo. The planned foundation is tokens,
Latte recipes, skills, a contribution skill, porting rules, and a `registry.json` (shadcn format,
MiniS fields in `meta`) listing everything that exists, which every tool checks before building
anything new. All of this is ideation; nothing is decided.

## The problem

An agent working in the Nette repo knows nothing about Mini*S. Left alone it writes hand-rolled
markup with hex colours and invented spacing, which is exactly what the system exists to prevent.
`minis-app` doesn't help: it scaffolds a web-component sandbox, a different runtime from production.

## Constraints

- **Production conventions win.** The skill adds Mini*S rules on top of how the Nette repo already
  works; it must not contradict its developers. Needs a production developer's review, like 001.
- **The recipe list can't be hand-maintained in the skill.** It goes stale the moment a recipe is
  added. It has to come from `registry.json`.
- Not every Mini*S rule carries over. The topbar rule doesn't apply (production has its own
  header); dark mode may not exist there. Each rule needs a yes/no for production.

## Approach

One skill, loaded in the Nette repo, that:

1. Checks `registry.json` for a Recipe/Core item matching the need, before writing markup.
2. Uses the recipe as documented (its Latte `{include}`/`{embed}` and parameters).
3. When nothing matches, hands over to the contribution skill (004) — no ad-hoc markup.
4. Carries the rules that hold on production (tokens only, borders vs separators, prefer active
   over `disabled`, size names) as a short table plus dos and don'ts collected from production devs.

**Rejected:** a large `CLAUDE.md` section in the Nette repo (no triggering, mixes with the
production team's own instructions, grows without bound); porting the web components into
production (contradicts the redefinition); teaching `minis-app` Latte too (different runtime and
verification; muddles when each fires — see 005).

## Phases

- [ ] **Phase 0 — Prerequisites (other work):** first Latte recipes exist; `registry.json` lists
      them; distribution decided (009).
- [ ] **Phase 1 — Content:** go through `docs/ai-prompts/principles.md` rule by rule and mark
      production yes/no; collect dos and don'ts from production devs; define how the skill reads the
      recipe list out of the registry.
- [ ] **Phase 2 — Pilot:** one designer, one real page in the Nette repo; log every place the agent
      went off-system and fix the skill, not the page.
- [ ] **Phase 3 — Ship** through the channel chosen in 009.

## Open questions

1. **Where do Latte recipes live** — this repo, the Nette repo, or a package of their own? That
   decides whether the skill can link to recipe files by path.
2. **Does production load Mini*S tokens today**, or does the skill need a mapping from production's
   existing CSS variables to Mini*S tokens?
3. **Which Mini*S rules hold on production?** Dark mode, the size scale, the topbar/background
   rules — each needs an explicit yes/no.
4. **Who on the production side owns the dos and don'ts** and reviews changes to them?
5. **How does the agent verify its work in the Nette repo** — is there a local dev server it can
   preview, and what does "looks right" mean without Storybook?
