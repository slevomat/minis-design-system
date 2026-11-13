---
id: 026
title: Rules hook — explain the broken rule while the AI is still editing
status: draft
created: 2026-11-13
updated: 2026-11-13
owner: Lexislav
---

# 026 — Rules hook: explain the broken rule while the AI is still editing

> **Gap G5 in plan 003, turned into a plan** (2026-11-13). Rollout phase 3 ("Registry and
> skills", January 2027). Complements CI (plans 011, 022); doesn't replace it.

## Context

The brief proposes a "mod for rule reminders (hook)": when a CSS, Stylus or Latte file is edited,
check the change (tokens, registry) and tell the user and the AI right away which rule it breaks
and what to use instead; at the start of a session, briefly remind the core rules. Audience:
anyone building with AI in Claude Code.

Claude Code can run hooks on tool calls: after an `Edit`/`Write` (`PostToolUse`) a script sees the
changed file and can return a message the agent reads; at `SessionStart` a hook can add context.
Hooks can ship inside a **Claude Code plugin** (plans 010, 019), so a person can enable them
without changing the repo they work in.

What it doesn't reach: **Copilot**, the main agent in production (plan 017), has no hooks. There,
Stylelint in their editor and CI is the in-session feedback.

## The problem

- **CI tells you after the fact.** A vibe-coding session writes twenty files with hex colours,
  then CI fails and the next session has to clean up.
- **The rules are in docs the agent may not open.** A hook puts the right rule in front of it at
  the moment it breaks one.
- **Plan 011's checks run in CI only.** The same rule logic could answer in session.

## Constraints

- **Same rules, same logic as CI.** The hook calls 011's Stylelint config and 013's registry
  check; it never has rules of its own, or the two disagree.
- **Advice, not a block.** The hook explains; CI blocks. A hook that refuses edits gets disabled.
- **Fast:** under a second per edit, only on changed files.
- **Nothing installed in production's repo without their team** (plan 020). The hook ships in a
  plugin a person enables.
- **Quiet:** one short message per broken rule, with the replacement token or registry item.

## Approach

1. **`PostToolUse` on `Edit`/`Write`** for `*.css`, `*.styl`, `*.ts` (Lit `css`), `*.latte`:
   - run the token rule (011) on the changed file only and turn each violation into "rule 2:
     `#e5e5e5` → `var(--color-border-subtle)` (or `$color-border-subtle` in Stylus)";
   - for a new component file, check the registry (013) and say "rule 1/5: there's `tag` in the
     registry; extend it, or register this as Local".
2. **`SessionStart`**: five lines with the core rules and where the registry is. No more.
3. **Shipped in the Mini*S Claude Code plugin** (019 phase 4), enabled per user, so it works in
   this repo, in sandbox projects and, if a designer chooses, in their production checkout.
4. **For Copilot users**: nothing new; production's Stylelint already explains violations, and the
   deprecation map (017 question 8) makes Mini*S renames show up there.

**Rejected:**

- **A git pre-commit hook.** Later than the edit, and blocks instead of explaining.
- **Rules written into the hook.** They'd drift from CI.
- **Blocking edits from the hook.** Turns the guardrail into a gate the brief explicitly avoids.

## Phases

- [ ] **Phase 0 — Prerequisites:** 011's config runnable on a single file; 013's registry
      readable offline.
- [ ] **Phase 1 — Prototype in this repo** (project hook in `.claude/settings.json`), token rule
      only; tune message wording on real sessions.
- [ ] **Phase 2 — Registry rule** for new component files.
- [ ] **Phase 3 — `SessionStart` reminder.**
- [ ] **Phase 4 — Move into the plugin** (019 phase 4) and document enabling it.

## Dependencies

- **011** — the rule logic; **013** — the registry check; **025** — the rule wording.
- **019 / 010** — the plugin that carries the hook.
- **020** — whether designers may use it in their production checkout.

## Open questions

1. **Which file types in production?** `*.latte` checks need a Latte-aware parser, or only class
   names against the registry.
2. **Do designers in production use Claude Code at all,** or only Copilot? (017 counted 6 Claude
   trailers since August, at least one from a non-core contributor.)
3. **How noisy is acceptable?** One message per file, or per violation?
4. **Should the hook also suggest the fix** (edit the file), or only explain? Explaining keeps the
   person in charge.
