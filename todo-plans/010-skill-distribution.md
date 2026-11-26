---
id: 010
title: Distributing Mini*S skills and commands
status: draft
created: 2026-10-29
updated: 2026-11-26
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
(004–009), a slash command (`/minis:bug`, 008), the Nette repo, and people who never clone this
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
| 2026-11-21 | **Mini*S ships as a Claude Code plugin in a marketplace.** Every Mini*S skill is in it, so one install gives a person all of them as slash commands (e.g. `/minis:page-to-figma`, plan 031). It is a very important channel, not the main deliverable and not the only channel: Copilot users in the Nette repo still get plain files (option B), and claude.ai / Claude Design users get the Skill Hub (plan 019). | Owner's decision. Closes "leaning A, undecided" below. |
| 2026-11-26 | **Q1 — the repo is public.** `gh repo view slevomat/minis-design-system` → `PUBLIC`. Installing needs no GitHub access. Whether every designer *has* a GitHub account stays open for 008 (filing issues). | Checked, not decided. |
| 2026-11-26 | **Q5 — the plugin lives in this repo**, at `plugins/minis/`. Skill folders there are the single source; `.claude/skills/minis-*` are symlinks to them so `/minis-app` keeps working in this repo. | One source: a skill and the tokens/docs it describes change in one commit, no sync job. Owner's choice. |
| 2026-11-26 | **Q7 — this repo is its own public marketplace** (`.claude-plugin/marketplace.json`, marketplace name `minis-design-system`): `/plugin marketplace add slevomat/minis-design-system`, `/plugin install minis@minis-design-system`. The plugin is text-only; Kensington is not in the repo and never ships, Slevomat marks stay under `NOTICE`. A Slevomat org marketplace can list it later. | The repo is already public; no access to wait for. Owner's choice. |
| 2026-11-26 | **Q8 — repo-bound skills go in the plugin with a guard**: each checks for a Mini*S checkout (`packages/tokens` + `tokens.json`) first and stops with a clear message elsewhere. | One install gives the DS owner everything. Owner's choice. |
| 2026-11-26 | **Q4 — the plugin has its own semver**, starting at 0.1.0, in `plugins/minis/.claude-plugin/plugin.json` only; released as the git tag `minis--v<version>` (`claude plugin tag`). Skills read tokens and docs from the checkout or Storybook at run time instead of embedding values. Tying the version to a token release waits for plan 012 (phase 6). | Claude Code caches a plugin by version, so a version is needed now; no token releases exist yet. Owner's choice. |
| 2026-11-26 | **Every Mini*S skill is beta** for now, marked in all docs, each `SKILL.md` and the Figma READ-ME card. Dropping the label is the owner's call. | Owner's request. |

### Plugin roster

Every skill that exists or is planned, with its command. **Naming:** the plugin is called `minis`,
so Claude Code namespaces each skill as `/minis:<skill>` (e.g. `/minis:page-to-figma`); skill
folders inside the plugin drop the `minis-` prefix (`app`, `figma-docs`, `page-to-figma` …). In
this repo the project skills keep their current names (`/minis-app`) until the plugin pilot
(phase 3) moves them. Options go in the command's arguments (e.g. `/minis:page-to-figma
skip-audit`, plan 031). Command names are proposals until the
skill is written; the skill's own plan has the details. **The plugin grows slowly, one command at a
time, each added only once its skill works.** First wave: the two that exist (`/minis:app`,
`/minis:figma-docs`) and `/minis:page-to-figma` (plan 031) as the first new one; the rest follow
their plans' order (plan 003, "Recommended order").

| Command | Skill | For whom | Plan | State |
|---|---|---|---|---|
| `/minis:app` | Scaffold and verify a prototype on the web components | Anyone prototyping outside production | 006, 019 | **Shipped 0.1.0, beta** (`plugins/minis/skills/app/`) |
| `/minis:figma-docs` | Documentation cards in the MiniS DS Figma file | DS team, designers | — | **Shipped 0.1.0, beta** (`plugins/minis/skills/figma-docs/`) |
| `/minis:page-to-figma` | Rebuild a production page in Figma, with findings frames | DS team, designers | 031 | **Shipped 0.1.0, beta** (`plugins/minis/skills/page-to-figma/`) — first new command |
| `/minis:contribute` | Search the registry → extend → build as Local | Anyone building with AI | 005 | Planned (needs 013) |
| `/minis:latte` | Build UI from Latte recipes | Designers and developers in the Nette repo | 004 | Planned (needs 023, 013); Copilot gets the same rules as plain files (B) |
| `/minis:bug` | Guided bug report → GitHub issue | Anyone | 008 | Planned |
| `/minis:token-update` | Figma export → checks → `tokens.css` → changelogs, typography first | DS owner, inside a Mini*S checkout | 009 | Built as a project skill (`.claude/skills/minis-token-update/`); joins the plugin once 009 phase 3 has run it on a real change |
| `/minis:changelog` | One change written to every changelog | DS owner, inside a Mini*S checkout | 018 | Planned |
| `/minis:todo-plan` | Write and update todo plans by the conventions | Anyone proposing larger work | 007 | Planned |
| (hook, opt-in) | Explain a broken rule while editing | Anyone building with AI in Claude Code | 026 | Planned |

### Candidates (not on the roster yet)

Skills the other plans imply but don't name as commands (collected 2026-11-21). A candidate is not a
decision: it joins the roster table above only when someone agrees to build it, and it still has to
work as a skill before it ships. "Can start" says what each one waits for.

**For the DS team, inside a Mini*S checkout**

| Command | What it does | From | Can start |
|---|---|---|---|
| `/minis:new-component` | Scaffold a component with every file CLAUDE.md requires: `.ts`, `.styles.ts`, story, `.figma.ts`, `docs/ai-prompts` doc, `index.ts` export in the same commit, both changelogs, the Storybook dev-resource link in Figma; checks tag duplicates and size naming | CLAUDE.md conventions | **Now** |
| `/minis:figma-check` | Compare Figma variables with `tokens.css` mode by mode; list every conflict | G12, G13, 024 | **Now** — wanted before 024 automates exports |
| `/minis:audit` | Run the production audit and report the three success metrics, as a dated snapshot to compare against | 017 | When 017's script exists |
| `/minis:review-prep` | Build the monthly review agenda (new Locals, proposals, items used in 3+ places, 031 findings, the metric); afterwards write the record | 021 | After 020 names the approval group |
| `/minis:release` | Cut a versioned token release: semver from the diff, notes from the changelogs, regenerate downstream copies (Claude design system, Skill Hub, Nette files) | 012, 018, 019, 024 | After 012 |
| `/minis:icon` | Add an icon: search icons and aliases, Figma grid rules, export to `packages/icons` + `registry.ts`, the webfont hand-over pack | 028 | Mostly now; the webfont step needs the lead developer |

**For anyone building UI (designers, developers, vibe-coders)**

| Command | What it does | From | Can start |
|---|---|---|---|
| `/minis:token` | "Which token is this?" — a hex, px or production Stylus variable in, the semantic Mini*S token out; never guesses names; the rules hook (026) reuses it | 011, 014, 017 | **Now**; better after 017 phase 3 (primitive → semantic map) |
| `/minis:check` | Review a diff or PR against the seven core rules, mainly the judgement ones CI can't check (1, 6, 7); works on Nette PRs too | 011, 022, 005 | Partly now; complete with 013 |
| `/minis:a11y` | Token-pair contrast plus the manual WCAG checklist for a component, recipe or page | 022 | After 022 phase 0 (the pair list) |
| `/minis:migrate` | Rewrite a Stylus or CSS file from literals and primitives to semantic tokens; report what didn't map | 011, 017, 027 | After 017 phase 3 |
| `/minis:handoff` | Turn a vibe-coded prototype into a hand-over: components used, Locals to register, gaps, matching recipes — a proposal for production, not code to paste | 006, 019, 005 | Partly now; better with 013 and 023 |
| `/minis:brand-theme` | A new campaign or brand theme along production's 10-step `BrandColorScheme` checklist, mapped to a Mini*S schema | 027, 017 | After 027 phase 0 (product confirms) |

**For the Nette repo**

| Command | What it does | From | Can start |
|---|---|---|---|
| `/minis:recipe` | Turn a production partial into a recipe: Latte partial, Stylus with KSS, registry entry, a11y checklist; optionally the matching web component | 023, 014 | After 023 phase 0 (format agreed) |
| `/minis:port` | Move a pattern between web component, Latte recipe and Figma; report where they diverge and which side wins | 014 | After 014's `common.md` |

**Options of existing commands, not new commands** — to keep the roster slow:

- `/minis:contribute search` — "does X exist?", step 1 of the contribution path without building.
- Layout from the 030 guides — an option of `/minis:app` and `/minis:latte` once 030 decides.
- `/minis:page-to-figma measure` — pass 1's fixed-width breakpoint measuring on its own.
- Regenerating the Claude design system and Skill Hub copies — a step of `/minis:release`.

**Suggested next after `/minis:page-to-figma`:** `/minis:new-component` (no dependencies, used
constantly), `/minis:token` (the most useful one for designers and developers; 011 and 026 need
the same lookup), `/minis:figma-check` (settles G12 / G13 before 024).

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
- [x] **Phase 2 — Plugin skeleton:** `plugin.json` and a marketplace entry, in this repo or a
      separate one (question 5); install it once from a clean machine and check that the commands
      appear. *Done 2026-11-26:* `plugins/minis/` + `.claude-plugin/marketplace.json`, both pass
      `claude plugin validate`. Clean install tested with a fresh `CLAUDE_CONFIG_DIR` from the branch
      served over git HTTP: installed to the cache as 0.1.0, `minis:app` and `minis:figma-docs` listed
      in the session's commands. Still to do after the push: the same install from
      `slevomat/minis-design-system` on GitHub.
- [x] **Phase 3 — Pilot with the two skills that exist**, `minis-app` and `minis-figma-docs`;
      replace `minis-app`'s "Using this skill outside the monorepo" section with the plugin install.
      Shared with plan 019 phase 4. *Done 2026-11-26:* moved to `plugins/minis/skills/{app,figma-docs}`;
      `.claude/skills/minis-*` are symlinks (transition names). `/minis:app`'s steps (clone → install
      → build → `create-prototype`) checked from a clean clone. A full model run of either command
      wasn't possible headlessly here (the standalone CLI isn't logged in on this machine).
- [x] **Phase 4 — First new command: `/minis:page-to-figma`** once plan 031 phase 6 has written
      the skill. *Done 2026-11-26:* merged from `page-to-figma-031` (bf397af), moved to
      `plugins/minis/skills/page-to-figma/`, part of 0.1.0 (owner chose to wait for it rather than
      ship it in 0.2.0). Clean install lists all three commands.
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
8. **Repo-bound skills** (`/minis:token-update`, `/minis:changelog`) — in the plugin with a "needs a
   Mini*S checkout" guard, or kept out of it?
