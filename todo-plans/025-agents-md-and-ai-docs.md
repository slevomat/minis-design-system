---
id: 025
title: AGENTS.md and the AI-doc layer — core rules for every tool, parts per environment
status: draft
created: 2026-11-13
updated: 2026-11-13
owner: Lexislav
---

# 025 — AGENTS.md and the AI-doc layer: core rules for every tool, parts per environment

> **Gap G4 in plan 003, turned into a plan** (2026-11-13). Rollout phase 3 ("Registry and
> skills", January 2027). Carries decision 4 of plan 003: the registry is the source of the AI
> docs, and `CLAUDE.md` splits into `AGENTS.md` plus a part per environment.

## Context

Mini*S's AI layer today is written for Claude Code in this repo:

- **`CLAUDE.md`** (334 lines): stack, token naming, the vibe-coding rule, size names, todo-plan
  rules, changelog rules, Storybook rules, Figma, Code Connect, token exports, pitfalls. Only
  Claude Code reads it, and only here.
- **`docs/ai-prompts/`**: index, getting started, principles, typography, layouts, and one file per
  component (16). Prose; maintained by hand next to the components.
- **Skills**: `minis-app`, `minis-figma-docs` (`.claude/skills/`).

Elsewhere `AGENTS.md` is the shared format: **production** has one (424 lines, a Skills Index,
Copilot as the main agent; plan 017), and the **Slevomat AI Hub** uses it as the "universal"
entry for Claude, Copilot, Cursor and Gemini (plan 019). Decision 4 (to validate) says Mini*S
should follow: core rules for every environment in `AGENTS.md`, environment parts beside it, and
component docs generated from the registry.

## The problem

- **The core rules aren't written anywhere a non-Claude tool reads.** Copilot in production,
  Cursor or Gemini users never see them.
- **`CLAUDE.md` mixes three audiences:** rules for anyone building with Mini*S, rules for working
  on this repo (changelogs, Storybook, todo plans), and Figma/exporter procedures.
- **Component docs are hand-written prose** next to the code, so they drift from the API and
  can't be checked (plan 013's reason for a registry).

## Constraints

- **The seven core rules are stated once** and linked everywhere else.
- **Each environment's own format wins:** production's `doc/ai/skills/` + Skills Index row
  (plan 010), the Skill Hub's validator (019), Claude Code's `SKILL.md`.
- **Short.** The core file has to fit in an agent's always-on context, like production's index.
- **Nothing in this repo breaks for Claude Code:** `CLAUDE.md` keeps working (it can import
  `AGENTS.md` with `@AGENTS.md`).

## Approach

1. **`AGENTS.md` at the root of this repo**: what Mini*S is (two paragraphs), the seven core
   rules, the token naming in brief, where the registry and the porting guides are, and a skills
   index in production's format (name, path, "Use when").
2. **Parts per environment**, each one page, owned by plan 014: Latte/Nette, web components,
   Figma. They're the same files production and the Skill Hub get in their own format.
3. **`CLAUDE.md` keeps only what is about working on this repo** (changelogs, Storybook, todo
   plans, Code Connect, exporter procedure) and imports `AGENTS.md`.
4. **Component docs generated from `registry.json`** (decision 4) once plan 013 exists:
   `docs/ai-prompts/components/*.md` become output, with a check that nobody edits them by hand.
5. **Copies for other places** are generated, never edited: the production skill file and index
   row (010), the Skill Hub skill (019), the AI Hub pointer (019).

**Rejected:**

- **Keeping `CLAUDE.md` as the only file.** Claude-only, this-repo-only.
- **One huge `AGENTS.md`.** Production's is 424 lines because it holds code style; Mini*S's core
  is rules and pointers, not procedures.
- **Hand-written copies per tool** (`.cursorrules`, `copilot-instructions.md`). They drift.

## Phases

- [ ] **Phase 0 — Validate decision 4** (plan 020's walkthrough).
- [ ] **Phase 1 — Write `AGENTS.md`** from `CLAUDE.md` and the brief's rules; `CLAUDE.md` imports
      it and drops the moved parts.
- [ ] **Phase 2 — Environment parts** with plan 014 (Latte, web components, Figma).
- [ ] **Phase 3 — Generated copies** for production (010) and the Skill Hub (019).
- [ ] **Phase 4 — Component docs from the registry** (after 013 phase 1), with a CI check.

## Dependencies

- **013** — the registry the component docs are generated from.
- **014** — the environment parts; **010** and **019** — where the copies go.
- **020** — validates decision 4.
- **026** — the rules hook quotes the same rules.

## Open questions

1. **Language:** English here (like the code), Czech for the Skill Hub, both for production?
2. **Does production want a Mini*S section in its `AGENTS.md`**, or only a Skills Index row
   pointing at one Mini*S file?
3. **Which `CLAUDE.md` parts are environment rules and which are repo procedures?** A line-by-line
   pass decides; some (exporter settings) are both.
4. **Generated component docs:** Markdown files committed, or rendered on the fly by the shadcn MCP
   server (013 phase 4)?
