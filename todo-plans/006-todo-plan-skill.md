---
id: 006
title: Todo-plan writing skill
status: draft
created: 2026-10-29
updated: 2026-10-29
owner: Lexislav
---

# 006 — Todo-plan writing skill

> No dependency on the registry or on Latte recipes. Distribution: see plan 009.

## The problem

The todo-plan conventions — sequential `NNN-kebab-title.md` numbering, permanent numbers,
frontmatter (`id`, `title`, `status`, `created`, `updated`, `owner`), the five statuses, the index
table, the required structure and **"a plan is not authorisation to act"** — live only in
`CLAUDE.md` and `todo-plans/README.md`. Anyone outside this repo (the Nette repo, other teams) and
any agent working there has none of it. The "not authorisation" rule matters most there: an agent
that finds a `ready` plan should not start executing it.

## Constraints

- **One source of truth.** The skill and `todo-plans/README.md` must not drift apart.
- **Repo-agnostic.** No Mini*S paths, tokens or components in the skill; the plans folder and index
  are found, not hardcoded.
- **Status changes stay the user's call.** The skill writes and updates plans; it never moves a plan
  to `ready`/`in-progress`/`done` on its own and never starts one.

## Approach

A skill covering: finding existing plans before writing a new one; allocating the next number (the
highest of the index **and** the filenames, never reused); the frontmatter template; the section
order (problem, constraints, approach and rejected alternatives, phased checkboxes, open
questions); adding the index row; and, if the repo keeps one, the "Current plans" list in
`CLAUDE.md`. If a repo has no `todo-plans/` yet, it bootstraps one from a README template bundled
with the skill.

**Rejected:** leaving the rules in `CLAUDE.md` only (doesn't travel); moving plans into an issue
tracker (the point is reasoning kept next to the code, in review with it).

## Phases

- [ ] **Phase 1 — Extract** the rules into a `SKILL.md` plus a README template.
- [ ] **Phase 2 — Dogfood:** write the next plan in this repo with the skill and compare against
      the README by hand.
- [ ] **Phase 3 — Single source:** make this repo's README the template plus the index (or point
      the README at the skill — question 2); shorten the `CLAUDE.md` section to a pointer.
- [ ] **Phase 4 — Ship** through 009.

## Open questions

1. **Mini*S-branded or generic?** A generic `todo-plans` skill travels further; a `minis-` name
   makes the owner obvious.
2. **Which is canonical — the skill or the README?** Recommended: the skill, with the README
   generated from its template.
3. **Two branches allocating the same number at once** — this set of plans is an example. Rule
   proposal: the later-merged branch renumbers before merge (numbers are permanent only once
   merged). Agree?
4. **Should the skill touch `CLAUDE.md` in other repos**, which may have no "Current plans" list?
