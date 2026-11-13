# Todo Plans

Long-lived plans for work we intend to do but are not doing yet.

A plan lives here when the work is too big to hold in a ticket, spans more than one release, or
needs its reasoning preserved so the next person (or the next AI session) doesn't re-derive it from
scratch. Short-lived tasks belong in the issue tracker, not here.

---

## Rules

**Naming** — `NNN-kebab-case-title.md`, three-digit zero-padded, allocated sequentially.
Numbers are permanent: never renumber, never reuse a number, never delete a plan file. (One
exception, by the owner: on 2026-11-13 plans 003–017 became 004–018 to make room for the overview
plan 003; the old → new table is at the end of that plan.) A plan that
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
| 003 | [Mini*S redefinition — overview of the rollout and every plan in it](003-minis-redefinition-overview.md) — **start here** | `draft` | 2026-11-13 |
| 004 | [Latte UI-building skill for the Nette repo](004-latte-ui-skill.md) | `draft` | 2026-10-29 |
| 005 | [Contribution skill — reuse, extend, or register as Local](005-contribution-skill.md) | `draft` | 2026-10-29 |
| 006 | [minis-app — sandbox skill that registers new work as Local](006-minis-app-register-local.md) | `draft` | 2026-10-29 |
| 007 | [Todo-plan writing skill](007-todo-plan-skill.md) | `draft` | 2026-10-29 |
| 008 | [Bug-reporting skill and /minis-bug command](008-bug-report-skill.md) | `draft` | 2026-10-29 |
| 009 | [Token-update skill (optional)](009-token-update-skill.md) | `draft` | 2026-11-06 |
| 010 | [Distributing Mini*S skills and commands](010-skill-distribution.md) | `draft` | 2026-10-29 |
| 011 | [Enforce "tokens only" with Stylelint](011-stylelint-tokens-only.md) | `draft` | 2026-11-06 |
| 012 | [Distribute tokens as a versioned package with a Style Dictionary source](012-token-distribution.md) | `draft` | 2026-11-06 |
| 013 | [registry.json — the single inventory of everything Mini*S has](013-registry.md) | `draft` | 2026-10-29 |
| 014 | [Porting rules — carrying tokens and recipes into each environment](014-porting-rules.md) | `draft` | 2026-11-06 |
| 015 | [Responsive line height in Figma text styles](015-responsive-line-height-in-figma.md) | `in-progress` | 2026-11-06 |
| 016 | [Letter-spacing tokens — one meaning in Figma, the exporter and CSS](016-letter-spacing-tokens.md) — **high priority** | `in-progress` | 2026-11-06 |
| 017 | [Production reference audit — what the Slevomat repo tells the refit](017-production-reference-audit.md) | `draft` | 2026-11-13 |
| 018 | [Changelog sync skill — one change, every changelog](018-changelog-sync-skill.md) | `draft` | 2026-11-12 |
