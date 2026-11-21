---
id: 010
title: Distributing Mini*S skills and commands
status: draft
created: 2026-10-29
updated: 2026-11-21
owner: Lexislav
---

# 010 — Distributing Mini*S skills and commands

> Referenced by plans 004–009. Partly depends on the registry: if `registry.json` ships through the
> same channel, that decision belongs here too (question 6).

## Context

Mini*S is being redefined from "a UI kit people import" to "shared rules and decisions anyone,
human or AI, builds with". Production runs on Nette/Latte, and designers vibe-code directly in the
production Nette repo. Skills are a core part of the planned foundation, next to tokens, Latte
recipes, porting rules and a `registry.json`. The direction is agreed (the Nette lead developer accepted the redefinition on 2026-11-02); the details here are proposals until the decisions in plan 003 are closed.

## The problem

Today there is one skill, `.claude/skills/minis-app/`, and the way to use it elsewhere is
`cp -r` into `~/.claude/skills/` and re-copy after every change. That doesn't scale to six skills
(004–009), a slash command (`/minis-bug`, 008), the Nette repo, and people who never clone this
repo.

## Constraints

- **Different skills work in different places:** 004 in the Nette repo; 006 wherever prototypes
  are built; 007 and 008 everywhere; 009 and 018 only inside a Mini*S checkout. The plugin carries
  them all (see "Decided"); a skill that needs a particular repo says so and stops outside it.
- **Version coupling.** A skill describes a particular set of tokens, recipes and registry entries;
  a stale copy confidently gives wrong instructions.
- **Access.** If this repo is private, every channel that pulls from it requires GitHub access.
- The Nette repo belongs to the production team. Anything we put there is on their terms.

## Decided

| Date | Decision | Why |
|---|---|---|
| 2026-11-21 | **Mini*S ships as a Claude Code plugin in a marketplace.** Every Mini*S skill is in it, so one install gives a person all of them as slash commands (e.g. `/minis-page-to-figma`, plan 031). It is a very important channel, not the main deliverable and not the only channel: Copilot users in the Nette repo still get plain files (option B), and claude.ai / Claude Design users get the Skill Hub (plan 019). | Owner's decision. Closes "leaning A, undecided" below. |

### Plugin roster

Every skill that exists or is planned, with its command. Command names are proposals until the
skill is written; the skill's own plan has the details. **The plugin grows slowly, one command at a
time, each added only once its skill works.** First wave: the two that exist (`/minis-app`,
`/minis-figma-docs`) and `/minis-page-to-figma` (plan 031) as the first new one; the rest follow
their plans' order (plan 003, "Recommended order").

| Command | Skill | For whom | Plan | State |
|---|---|---|---|---|
| `/minis-app` | Scaffold and verify a prototype on the web components | Anyone prototyping outside production | 006, 019 | **Exists** (`.claude/skills/minis-app/`) |
| `/minis-figma-docs` | Documentation cards in the MiniS DS Figma file | DS team, designers | — | **Exists** (`.claude/skills/minis-figma-docs/`) |
| `/minis-page-to-figma` | Rebuild a production page in Figma, with findings frames | DS team, designers | 031 | Planned — **first new command** |
| `/minis-contribute` | Search the registry → extend → build as Local | Anyone building with AI | 005 | Planned (needs 013) |
| `/minis-latte` | Build UI from Latte recipes | Designers and developers in the Nette repo | 004 | Planned (needs 023, 013); Copilot gets the same rules as plain files (B) |
| `/minis-bug` | Guided bug report → GitHub issue | Anyone | 008 | Planned |
| `/minis-token-update` | Figma export → checks → `tokens.css` → changelogs, typography first | DS owner, inside a Mini*S checkout | 009 | Planned |
| `/minis-changelog` | One change written to every changelog | DS owner, inside a Mini*S checkout | 018 | Planned |
| `/minis-todo-plan` | Write and update todo plans by the conventions | Anyone proposing larger work | 007 | Planned |
| (hook, opt-in) | Explain a broken rule while editing | Anyone building with AI in Claude Code | 026 | Planned |

## Approach — options

| Option | For | Against |
|---|---|---|
| **A. Claude Code plugin** in a marketplace repo; a project can enable it in its `.claude/settings.json` | One install, updates in place, bundles skills and commands; a repo can opt everyone in | Claude Code only; needs repo access; project-level enabling to be verified |
| **B. Copied files** committed into each consuming repo's `.claude/skills/` | Simplest; works for everyone who clones the Nette repo | Drifts; someone has to re-sync |
| **C. Part of a Mini*S package** (e.g. skills shipped with `@minis/tokens`) | Versioned with the tokens they describe | npm not published yet; writing into `.claude/` from a package is surprising |

**A is decided** (2026-11-21, see "Decided") for everyone on Claude Code. B stays the channel for
the Nette repo, where Copilot does most of the work; its files are generated from the same skill
sources, never maintained by hand.

**Production facts that weigh on this (2026-11-13, plan 017):**

- **Copilot is the main agent in the Nette repo**: 184 Copilot co-author trailers against 6 Claude
  ones since August. A Claude Code plugin (A) doesn't reach those sessions, so for the Nette repo
  **B is the primary channel, not the fallback**.
- **Their skill format differs from ours.** `doc/ai/skills/*.md` is plain Markdown with no
  frontmatter, listed in a Skills Index table in `AGENTS.md` (name, path, "Use when") that is
  always in context (`doc/ai/skills/skill-creation.md`). A Mini*S skill for production is
  that file plus that row; a `SKILL.md` with frontmatter would need translating.
- **Slevomat already ships a Claude plugin**: `.github/workflows/publish-docs.yml` syncs
  `doc/knowledge-base/` to `slevomat/claude-plugin-slevomat-documentation`. For Claude users
  outside the repo, joining that plugin is cheaper than starting our own (question 5).

**Channels Slevomat already runs outside production (2026-11-13):** the **Skill Hub** for
claude.ai and Claude Design (fed by `slevomat/design-skills`, with a validator that encodes its
limits), the tool-agnostic **Slevomat AI Hub** (`slevomat-ai-hub/` in
`slevomat/design-slevomat-context`), and the documentation plugin above. The owner can't see the
plugin repo or `slevomat/slevomat-ai-hub` yet (access asked from Michal Strnadel, 2026-11-13).

**Split by audience (2026-11-13):** this plan keeps the **production repo** (option B: their
`doc/ai/skills/` format + an `AGENTS.md` row) and the Claude Code plugin for Mini*S's own skills.
Vibe-coders outside production (Claude Design, the Skill Hub, the AI Hub, a hosted `tokens.css` and
component bundle) move to **plan 019**. Its phase 4 is this plan's phase 2.

## Phases

- [x] **Phase 1 — Pick a channel.** Plugin in a marketplace for Claude Code, decided 2026-11-21;
      plain files (B) for the Nette repo.
- [ ] **Phase 2 — Plugin skeleton:** `plugin.json` and a marketplace entry, in this repo or a
      separate one (question 5); install it once from a clean machine and check that the commands
      appear.
- [ ] **Phase 3 — Pilot with the two skills that exist**, `minis-app` and `minis-figma-docs`;
      replace `minis-app`'s "Using this skill outside the monorepo" section with the plugin install.
      Shared with plan 019 phase 4.
- [ ] **Phase 4 — First new command: `/minis-page-to-figma`** once plan 031 phase 6 has written
      the skill.
- [ ] **Phase 5 — Add the rest** from the roster one at a time, as each skill is written.
- [ ] **Phase 6 — Versions and staleness:** plugin version tied to the token / registry release it
      describes (question 4); a way to tell a user their copy is out of date.
- [ ] **Phase 7 — Nette files (B)** generated from the same skill sources in production's
      `doc/ai/skills/` format, with the `AGENTS.md` row, offered as a PR they merge (plan 020).

## Open questions

1. **Is `slevomat/minis-design-system` private, and do all designers have GitHub access?** (Shared
   with 008.)
2. **Is everyone on Claude Code**, or do some use other agents (Cursor, Codex…)? Plain-markdown
   skills may need an `AGENTS.md`-style fallback.
3. **Does the production team accept Mini*S-managed files in the Nette repo**, or only an enabled
   plugin?
4. **Version pinning:** how does a skill know which token/recipe/registry version it describes?
5. **Where does the plugin live** — this repo, or a separate `minis-skills` repo?
6. **Does `registry.json` travel through the same channel**, or is it fetched live?
7. **Which marketplace?** A Slevomat org marketplace (private, needs GitHub access, question 1),
   joining `claude-plugin-slevomat-documentation`'s marketplace, or a public one? Kensington and the
   Slevomat marks can't ship publicly (`NOTICE`).
8. **Repo-bound skills** (`/minis-token-update`, `/minis-changelog`) — in the plugin with a "needs a
   Mini*S checkout" guard, or kept out of it?
