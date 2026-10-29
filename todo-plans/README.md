# Todo Plans

Long-lived plans for work we intend to do but are not doing yet.

A plan lives here when the work is too big to hold in a ticket, spans more than one release, or
needs its reasoning preserved so the next person (or the next AI session) doesn't re-derive it from
scratch. Short-lived tasks belong in the issue tracker, not here.

---

## Rules

**Naming** — `NNN-kebab-case-title.md`, three-digit zero-padded, allocated sequentially.
Numbers are permanent: never renumber, never reuse a number, never delete a plan file. A plan that
dies gets `status: abandoned` and a note explaining why — the dead end is the useful part.

**Frontmatter** — every plan starts with:

```yaml
---
id: 001
title: Short descriptive title
status: draft | ready | in-progress | done | abandoned
created: YYYY-MM-DD
updated: YYYY-MM-DD
owner: name or "unassigned"
---
```

**Status meanings**

| Status | Meaning |
|---|---|
| `draft` | Still being written; open questions unanswered. Do not start work. |
| `ready` | Agreed and actionable. Work may start when someone picks it up. |
| `in-progress` | Someone is executing it. Phase checkboxes track progress. |
| `done` | Fully landed. Kept for the reasoning, not the instructions. |
| `abandoned` | Will not happen. Must say why. |

**Structure** — a plan should carry, in this order: the problem, the constraints (especially the
ones that are non-negotiable), the approach and why alternatives were rejected, phased steps with
checkboxes, and an explicit **Open questions** section. A plan with no open questions section is
usually a plan that hasn't been thought about hard enough.

**Keep the index below current** — one row per plan.

**Plans live on `master`, never on a branch.** Commit a new or updated plan straight to `master`
in its own commit, touching only `todo-plans/` and the CLAUDE.md "Current plans" list — never
mixed into a feature branch. On a branch, two plans written in parallel grab the same number and
collide in the index; on `master` the next number is always visible to everyone.

---

## Working with plans (for AI agents)

- **A plan is not an instruction to act.** Finding a `ready` plan is never authorisation to start
  executing it. Wait for the user to ask for that plan by name or number.
- **Writing or updating a plan is normal work** and needs no special ceremony — but changing a
  plan's `status` is the user's call, not yours.
- **Update the plan as reality diverges from it.** When work lands, tick the phase boxes and bump
  `updated`. When a decision inside a plan turns out wrong, edit the plan and say what changed —
  don't leave a stale plan next to working code.
- **Answers to open questions go back into the plan**, in the plan, not only in chat. Chat is lost;
  the file is not.
- **Landing plan work still follows the normal changelog rules** in `CLAUDE.md` — component and
  token changes get logged in `CHANGELOG.md` and the Storybook Changelog story regardless of which
  plan they came from.

---

## Index

| # | Plan | Status | Updated |
|---|---|---|---|
| 001 | [Move the colour ramps onto a curve](001-colour-ramps-to-curve.md) | `draft` | 2026-08-11 |
| 002 | [Deal Card and Promo Card components](002-deal-card-and-promo-card.md) | `draft` | 2026-09-10 |
| 003 | [Latte UI-building skill for the Nette repo](003-latte-ui-skill.md) | `draft` | 2026-10-29 |
| 004 | [Contribution skill — reuse, extend, or register as Local](004-contribution-skill.md) | `draft` | 2026-10-29 |
| 005 | [minis-app — sandbox skill that registers new work as Local](005-minis-app-register-local.md) | `draft` | 2026-10-29 |
| 006 | [Todo-plan writing skill](006-todo-plan-skill.md) | `draft` | 2026-10-29 |
| 007 | [Bug-reporting skill and /minis-bug command](007-bug-report-skill.md) | `draft` | 2026-10-29 |
| 008 | [Token-update skill (optional)](008-token-update-skill.md) | `draft` | 2026-10-29 |
| 009 | [Distributing Mini*S skills and commands](009-skill-distribution.md) | `draft` | 2026-10-29 |
| 010 | [Enforce "tokens only" with Stylelint](010-stylelint-tokens-only.md) | `draft` | 2026-10-29 |
