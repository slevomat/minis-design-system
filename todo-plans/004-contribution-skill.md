---
id: 004
title: Contribution skill — reuse, extend, or register as Local
status: draft
created: 2026-10-29
updated: 2026-10-29
owner: Lexislav
---

# 004 — Contribution skill: reuse, extend, or register as Local

> **Depends on the registry (`registry.json`).** It doesn't exist yet, nor does its schema. This
> skill is the registry's main client and can't be written before the schema is settled.
> Used by plans 003 and 005. Distribution: see plan 009.

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
- One copy of the path. Other skills (003, 005) call this one instead of restating it.

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

## Phases

- [ ] **Phase 0 — Prerequisite:** registry schema, tier definitions and review process agreed
      (probably a plan of its own — see question 1).
- [ ] **Phase 1 — Write the path** with one worked example per step.
- [ ] **Phase 2 — Wire it in:** 003 and 005 call this skill instead of carrying the logic.
- [ ] **Phase 3 — Pilot through one monthly review** and adjust what a registry entry must
      carry, based on what the review actually needed.

## Open questions

1. **Does the registry need its own plan** — schema, `meta` fields, tiers, review cadence? These
   aren't skill questions, and this plan shouldn't decide them in passing.
2. **Where does `registry.json` live and who can write to it?** If it's in this repo, a designer
   in the Nette repo registers a Local item through a cross-repo PR — is that acceptable?
3. **How are uses counted** — a field people bump by hand, a scan of the codebases, or the review
   counting by eye?
4. **Where does a flagged gap go** — a GitHub issue (ties to 007), a `meta` field on the item, or
   the review agenda?
5. **Is name + description search good enough**, or does the registry need tags/synonyms so
   "tile" finds "card"?
