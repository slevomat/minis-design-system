---
id: 005
title: minis-app — sandbox skill that registers new work as Local
status: draft
created: 2026-10-29
updated: 2026-10-29
owner: Lexislav
---

# 005 — minis-app: sandbox skill that registers new work as Local

> **Depends on the registry (`registry.json`) and on the contribution skill (004).** Neither exists
> yet. Distribution: see plan 009.

## Context

Mini*S is being redefined as shared rules and decisions anyone, human or AI, builds with.
Production runs on Nette/Latte; the web components are not what production renders. A planned
`registry.json` (shadcn format, MiniS fields in `meta`) will list everything that exists. New work
starts at tier **Local** and is promoted after 3+ uses in a monthly registry review. Ideation only.

## The problem

`.claude/skills/minis-app/SKILL.md` scaffolds a web-component prototype with `pnpm create-prototype`
and builds it. When something is missing it says: build it in the prototype's own CSS, call it
*prototype-local*, and **don't touch the monorepo**. Under the new model that loses the work — the
registry never hears of it, so it can never reach 3 uses and be promoted.

## Constraints

- **minis-app stays the sandbox skill on web components.** It is not the production skill (that is
  003) and must not fire in the Nette repo.
- Registering is a registry entry, not a component. The skill still never adds components to the
  monorepo as a side effect.
- Everything else in the skill (topbar variant, background token, non-negotiables, browser
  verification) is unchanged.

## Approach

- Before Step 4 builds any screen, check `registry.json` — not only `docs/ai-prompts/components/` —
  for existing items.
- Replace "When the design system itself is missing something" with a call to the contribution
  path (004): extend if close, otherwise build in the prototype and **register as Local**.
- Say up front, in the description, that this is the sandbox and point to 003 for the Nette repo.
- Replace "Using this skill outside the monorepo" (`cp -r` by hand) with whatever 009 decides.

**Rejected:** retiring minis-app in favour of the Latte skill (the sandbox stays the fastest way to
try an idea); letting it add components to the monorepo (that is the review's decision).

## Phases

- [ ] **Phase 1 — Rewrite** the missing-component section and add the registry check, once 004
      exists.
- [ ] **Phase 2 — Scope the trigger:** update the description so it doesn't fire in the Nette repo.
- [ ] **Phase 3 — Distribution:** swap the copy instructions for 009's channel.

## Open questions

1. **Where does a Local item's code live once registered?** Prototypes are scaffolded outside the
   monorepo (e.g. `~/prototypy/<name>`) and may be deleted — a registry entry pointing there rots.
2. **Does a throwaway prototype register anything at all**, or only items someone intends to reuse?
3. **Should `create-prototype` copy `registry.json` into the prototype**, the way it copies
   `docs/ai-prompts/` today, or should the skill read it from the source?
4. **How do we keep minis-app from triggering in the Nette repo** when someone there says "build me
   a page"?
