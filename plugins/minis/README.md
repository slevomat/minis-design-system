# `minis` — the Mini*S plugin for Claude Code

Every Mini*S skill as a slash command, in one install. The plugin lives in the design system repo
itself (`plugins/minis/`), and the repo is its own marketplace (`.claude-plugin/marketplace.json`),
so a skill and the tokens and docs it describes always change in the same commit.

> **Beta.** Every command is beta: it works and has been tested, but its steps and options may still
> change between releases (0.x). Tell the design-system team when something goes wrong.

## Install

In Claude Code:

```
/plugin marketplace add slevomat/minis-design-system
/plugin install minis@minis-design-system
```

Or from a shell:

```bash
claude plugin marketplace add slevomat/minis-design-system
claude plugin install minis@minis-design-system
```

The repo is public, so you need no GitHub access. Start a new session (or run `/reload-plugins`)
and type `/minis:` to see the commands.

## Commands

| Command | Status | For | What it does | Needs |
|---|---|---|---|---|
| `/minis:app` | Beta | Anyone prototyping | Scaffolds an app or prototype on the Mini*S web components, picks the topbar variant, builds the screens from the component docs, checks the result in a browser (desktop, mobile, dark) | A checkout of this repo (the skill offers to clone it), Node 20+, pnpm |
| `/minis:figma-docs` | Beta | Design-system team | Writes and updates the documentation cards in the MiniS DS Figma file from the internal docs kit | Figma MCP, edit access to the MiniS DS file |
| `/minis:page-to-figma` | Beta | Design-system team, designers | Rebuilds a live slevomat.cz page in the MiniS DS Figma file from Mini*S library instances and bound variables (1280 / 768 / 375), with findings cards beside it: what Mini*S is missing, where it conflicts with production. `/minis:page-to-figma / skip-audit` = rebuild only. Read-only on production. Plan 031 | Claude in Chrome connected (the in-app browser can't open slevomat.cz), Figma MCP with edit access to MiniS DS |

You can also just describe the task ("build me an app for refund requests"); Claude picks the skill
from its description. Options go after the command: `/minis:app a refund-requests admin tool`, `/minis:page-to-figma /cestovani skip-audit`.

More commands join one at a time, each only once its skill works. The roster and the candidates are
in [`todo-plans/010-skill-distribution.md`](../../todo-plans/010-skill-distribution.md). Skills that
only work inside a Mini*S checkout (the coming `/minis:token-update`, `/minis:changelog`) check for
one first and stop with a message anywhere else.

## Update

The plugin has its own version (`.claude-plugin/plugin.json`); you get changes when it goes up.

```
/plugin marketplace update minis-design-system
/plugin update minis@minis-design-system
/reload-plugins
```

Auto-update is off by default for non-official marketplaces. Turn it on in `/plugin` →
Marketplaces → `minis-design-system` if you want every release automatically. To stay on one
release, add the marketplace at a tag: `/plugin marketplace add slevomat/minis-design-system#minis--v0.1.0`.

## Turn it on for a whole project

To offer the plugin to everyone who opens a repo, commit this to that repo's `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "minis-design-system": {
      "source": { "source": "github", "repo": "slevomat/minis-design-system" }
    }
  },
  "enabledPlugins": {
    "minis@minis-design-system": true
  }
}
```

Each person still trusts the folder and installs it once (`claude plugin install minis@minis-design-system --scope project`).
Ask the repo's owners first. The production (Nette) repo gets Mini*S rules as plain files instead,
on its own terms (plan 010, phase 7).

## Inside this repo: `/minis-app` and friends still work

`.claude/skills/minis-app`, `minis-figma-docs` and `minis-page-to-figma` are symlinks to the plugin's
skill folders, so `/minis-app`, `/minis-figma-docs` and `/minis-page-to-figma` keep working here without
an install. They are transition names: use the `/minis:` ones going forward. Don't copy a skill into
`~/.claude/skills/` any more; a copy goes stale on the first token change.

## Working on the plugin

- A skill is `skills/<name>/SKILL.md`. The **folder name is the command** (`skills/app` →
  `/minis:app`); leave `name:` out of the frontmatter so the symlinked project skill keeps its own
  name. Refer to bundled files as `${CLAUDE_SKILL_DIR}/…`, which works both as a plugin skill and
  through the symlink.
- Try changes without installing: `claude --plugin-dir ./plugins/minis`.
- Check the manifests: `claude plugin validate plugins/minis` and `claude plugin validate .`.
- Release: bump `version` in `.claude-plugin/plugin.json` (never in `marketplace.json`), add an
  entry to `CHANGELOG.md` and the Storybook Changelog, commit, then `claude plugin tag plugins/minis`
  creates the tag `minis--v<version>`. Push the commit and the tag.

## What doesn't ship

The plugin is text and small scripts only. The Kensington typeface is proprietary and is not in this
repo or the plugin; the Slevomat name and marks are not covered by the MIT licence (see
[`NOTICE`](../../NOTICE)).

## Versions

| Version | Date | Commands |
|---|---|---|
| 0.1.0 | 2026-11-26 | `/minis:app`, `/minis:figma-docs`, `/minis:page-to-figma` |
