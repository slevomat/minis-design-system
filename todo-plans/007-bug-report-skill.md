---
id: 007
title: Bug-reporting skill and /minis-bug command
status: draft
created: 2026-10-29
updated: 2026-10-29
owner: Lexislav
---

# 007 — Bug-reporting skill and `/minis-bug` command

> No hard dependency on the registry or Latte recipes, but the list of platforms a bug can be in
> grows with them (see question 5). Distribution: see plan 009.

## The problem

Mini*S bugs reach us as chat messages without the information needed to reproduce them. With
designers now building in the production Nette repo, more people hit Mini*S problems and fewer of
them know where to report one. The repo has no issue templates (`.github/` holds only workflows).

## Constraints

- **Creating an issue is outward-facing.** The skill shows the complete draft and gets an explicit
  yes before it files anything.
- **`gh issue create` can't attach images.** A screenshot needs another route (see question 3).
- **Screenshots from production or admin pages may contain customer data.** The skill warns before
  anything is attached.
- Works both as a skill the agent picks up ("this button is broken") and as an explicit
  `/minis-bug` command — in Claude Code a skill named `minis-bug` is invocable as `/minis-bug`.

## Approach

The skill walks the person through, prefilling what it can from context:

1. **What** is wrong, in one sentence.
2. **Where:** component or token; platform (web component, Latte recipe, Figma, tokens); browser
   and OS; light or dark mode.
3. **Steps to reproduce.**
4. **Expected vs actual.**
5. **Screenshot.**

It then searches open issues for duplicates (`gh issue list --search`), shows the draft, and on
confirmation files it in `slevomat/minis-design-system` with a `bug` label. A matching
`.github/ISSUE_TEMPLATE/bug.yml` with the same fields keeps reports filed by hand in the same shape.

**Rejected:** an issue form alone (no prefill, no help in an agent session); Slack-only intake (no
tracking, nothing to link a fix to).

## Phases

- [ ] **Phase 1 — Answer questions 1–2**; they decide whether the last step files an issue or
      hands off a report.
- [ ] **Phase 2 — Write the skill** and the matching issue form (fields defined once, used by both).
- [ ] **Phase 3 — Pilot** with two or three designers; check the issues are reproducible without
      follow-up questions.
- [ ] **Phase 4 — Ship** through 009.

## Open questions

1. **Who has permission to create issues** in `slevomat/minis-design-system`? Org members only?
   Is the repo private, so that reporters need repo access, not just a GitHub account?
2. **What happens for people without GitHub access?** Options: the skill produces a formatted report
   to paste into a Slack channel or email, and a named triager files it. Who is that triager?
3. **Screenshots:** hand off to the browser with `gh issue create --web` so the person pastes the
   image there, or upload it somewhere and link it?
4. **Labels and triage:** a component label per issue? Who triages, and how fast?
5. **Bugs in Latte recipes** — this repo, or the Nette repo? Depends on where recipes live (003,
   question 1).
