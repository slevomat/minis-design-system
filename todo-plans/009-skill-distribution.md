---
id: 009
title: Distributing Mini*S skills and commands
status: draft
created: 2026-10-29
updated: 2026-10-29
owner: Lexislav
---

# 009 — Distributing Mini*S skills and commands

> Referenced by plans 003–008. Partly depends on the registry: if `registry.json` ships through the
> same channel, that decision belongs here too (question 6).

## Context

Mini*S is being redefined from "a UI kit people import" to "shared rules and decisions anyone,
human or AI, builds with". Production runs on Nette/Latte, and designers vibe-code directly in the
production Nette repo. Skills are a core part of the planned foundation, next to tokens, Latte
recipes, porting rules and a `registry.json`. Ideation only; nothing is decided.

## The problem

Today there is one skill, `.claude/skills/minis-app/`, and the way to use it elsewhere is
`cp -r` into `~/.claude/skills/` and re-copy after every change. That doesn't scale to six skills
(003–008), a slash command (`/minis-bug`, 007), the Nette repo, and people who never clone this
repo.

## Constraints

- **Different skills belong in different places:** 003 in the Nette repo; 005 wherever prototypes
  are built; 006 and 007 everywhere; 008 in this repo only.
- **Version coupling.** A skill describes a particular set of tokens, recipes and registry entries;
  a stale copy confidently gives wrong instructions.
- **Access.** If this repo is private, every channel that pulls from it requires GitHub access.
- The Nette repo belongs to the production team. Anything we put there is on their terms.

## Approach — options, none chosen

| Option | For | Against |
|---|---|---|
| **A. Claude Code plugin** in a marketplace repo; a project can enable it in its `.claude/settings.json` | One install, updates in place, bundles skills and commands; a repo can opt everyone in | Claude Code only; needs repo access; project-level enabling to be verified |
| **B. Copied files** committed into each consuming repo's `.claude/skills/` | Simplest; works for everyone who clones the Nette repo | Drifts; someone has to re-sync |
| **C. Part of a Mini*S package** (e.g. skills shipped with `@minis/tokens`) | Versioned with the tokens they describe | npm not published yet; writing into `.claude/` from a package is surprising |

Leaning **A**, with B as the fallback for the Nette repo if the production team prefers files they
can review. Undecided.

## Phases

- [ ] **Phase 1 — Answer questions 1–4** and pick a channel.
- [ ] **Phase 2 — Pilot with `minis-app`**, the one skill that exists, and replace its
      "Using this skill outside the monorepo" section.
- [ ] **Phase 3 — Add each new skill** (003–008) to the channel as it is written.
- [ ] **Phase 4 — Staleness:** a way to tell a user their copy is out of date.

## Open questions

1. **Is `slevomat/minis-design-system` private, and do all designers have GitHub access?** (Shared
   with 007.)
2. **Is everyone on Claude Code**, or do some use other agents (Cursor, Codex…)? Plain-markdown
   skills may need an `AGENTS.md`-style fallback.
3. **Does the production team accept Mini*S-managed files in the Nette repo**, or only an enabled
   plugin?
4. **Version pinning:** how does a skill know which token/recipe/registry version it describes?
5. **Where does the plugin live** — this repo, or a separate `minis-skills` repo?
6. **Does `registry.json` travel through the same channel**, or is it fetched live?
