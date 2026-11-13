---
id: 019
title: Mini*S for vibe-coders — one source, published to Claude Design, the Skill Hub and a plugin
status: draft
created: 2026-11-13
updated: 2026-11-13
owner: Lexislav
---

# 019 — Mini*S for vibe-coders: one source, published to Claude Design, the Skill Hub and a plugin

> **Gap G9 in plan 003, turned into a plan** (2026-11-13). The brief puts "Mini*S in Claude Design"
> in phase 5 (from March 2027). The owner has already exported Mini*S as a design system for
> Claude, so this plan catches up with that step and decides how it stays true. **Audience:
> people who build outside the production repo**: designers prototyping in Claude or Claude
> Design, internal tools, vibed apps. Production developers are served by plan 010 and the
> production path in plan 005, not by this plan.

## Context

Mini*S is being redefined from a UI kit into shared rules and decisions (plan 003). For the
production repo that means tokens, skills and recipes that fit production's own conventions. For
everyone else, the web components stay useful as the **reference implementation and vibe-coding
sandbox** (brief, "Kam patří Figma a webové komponenty"), and the brief counts that as a form of
adoption: "adopce tak nemusí začínat v produkčním kódu".

Today a vibe-coder can reach Mini*S in four ways, and none is maintained as a channel:

| Way in | State on 2026-11-13 |
|---|---|
| **Design system in Claude** (the owner's export) | Exists; the link isn't recorded in this repo, and it isn't among the owner's Design System artifacts on claude.ai (only "KOMA Family" is). Probably in Claude Design. A snapshot: nothing regenerates it |
| **`minis-app` skill** (`.claude/skills/minis-app/`) | Works inside this monorepo (`pnpm create-prototype`). Outside it, the instruction is `cp -r` into `~/.claude/skills/` |
| **Copying files** | `slevomat/ux-design-playground` (admin "vibekit") carries its own copies of `tokens.css` and `tokens.rgb.css` in `admin-padmin-vibekit/shared/`. Copies drift silently |
| **Storybook on GitHub Pages** | Docs only; `deploy-storybook.yml` publishes `storybook-static`, not linkable `tokens.css` or a component bundle |

Slevomat already runs AI channels this plan should join, not duplicate (found 2026-11-13):

| Channel | What it is | Reaches |
|---|---|---|
| **Skill Hub** — fed by `slevomat/design-skills` | Org skills for claude.ai / Claude Design. Five product-design skills in Czech (problem → mapping → competition → **design brief for Claude Design** → design principles). Owners per its README: Romana Trušinová, Michal Strnadel. `validate.py` encodes the Hub's limits; releases are tagged from `CHANGELOG.md` | claude.ai and Claude Design users |
| **Slevomat AI Hub** — `slevomat-ai-hub/` inside `slevomat/design-slevomat-context` | Tool-agnostic knowledge base (Claude, Copilot, Cursor, Gemini): `AGENTS.md`, company context, `context/brand/`, skills per team. Its `ux-design/` and `frontend/` skill folders are empty skeletons. Its README says to clone `slevomat/slevomat-ai-hub`, which the owner's account can't see | Anyone who clones it, any tool |
| **`slevomat/claude-plugin-slevomat-documentation`** | Claude plugin synced from production's `doc/knowledge-base/` by `.github/workflows/publish-docs.yml` | Claude users needing business knowledge |

**Access:** the owner can't see `claude-plugin-slevomat-documentation` or `slevomat-ai-hub`; on
2026-11-13 they asked Michal Strnadel for access. Open questions 2 and 3 wait for that.

## The problem

- **Every way in is a copy.** The Claude design system, the playground's `tokens.css` and a
  hand-copied `minis-app` each freeze Mini*S at the moment they were made. A token rename (plan
  016 renamed letter spacing; `Alert/success` was renamed) reaches none of them.
- **Vibed apps can't link to Mini*S.** There is no hosted `tokens.css` and no browser-loadable
  component bundle, so the only option is to copy.
- **Mini*S isn't in the channels people already use.** The Skill Hub has a design-principles skill
  and a "brief for Claude Design" skill, but neither knows Mini*S exists; the AI Hub's `ux-design/`
  and `frontend/` folders are empty.

## Constraints

- **One source.** Everything published is generated from this repo (tokens, `docs/ai-prompts/`,
  later `registry.json`). Nothing is edited by hand in a published copy.
- **Each channel has its own format, and its own rules win.** The Skill Hub: text files only,
  ≤ 3 path levels, a flat list where the name prefix is the category, frontmatter with a description
  ≤ 1,024 characters that says when **not** to use the skill, Czech, the company's vocabulary
  (`design-skills/validate.py`). A Claude Code plugin: `SKILL.md` with frontmatter, may run scripts.
  The AI Hub: plain Markdown + YAML, tool-agnostic.
- **Not for production.** Production code doesn't load the web components (plan 003). A vibed app
  is a draft, not production ("Výstup brát jako návrh, ne jako produkci", brief → Role).
- **Vibe-coding rule holds** (CLAUDE.md): `--color-background` page, `<minis-topbar>` first, and
  `variant="vibe-apps"` for anything that isn't the Slevomat website.
- **Brand font stays private.** Kensington is never published (CLAUDE.md pitfalls); hosted assets
  use the Bebas Neue fallback.
- **Private repos.** If a channel pulls from GitHub, every vibe-coder needs access (010 question 1).

## Approach

One source, four generated outputs, one link target.

1. **Hosted runtime — the link target.** Publish `tokens.css` (+ `tokens.rgb.css`) and a
   browser-loadable component bundle on GitHub Pages next to Storybook, at a versioned path
   (`/v/<version>/…`) plus `latest`. Today `@minis/components` builds ES modules with `lit` as a
   dependency, so the bundle needs `lit` inlined or an import map. Every other output below tells
   the reader to **link, never copy**.
2. **Claude design system**, regenerated from the repo on every release instead of exported by
   hand: README (rules, vibe-coding rule), tokens across themes, type scale, components with live
   previews from the hosted bundle. Its link is recorded here and in `docs/ai-prompts/index.md`.
3. **Skill Hub skill(s)** in `design-skills` format, proposed to its owners: e.g.
   `design-minis-tokens` and `design-minis-prototyp` (names follow their prefix rule). They point
   at the hosted runtime and say when not to use them (production code → production's own skills).
   The existing "brief for Claude Design" skill could link to Mini*S instead of describing a look.
4. **Claude Code plugin** from this repo (`.claude-plugin/marketplace.json`), for people who
   prototype in Claude Code: `minis-app` (scaffold + verify), a tokens/components reference skill,
   later the contribution skill (005). Replaces the `cp -r` instructions.
5. **AI Hub entry**: fill `ux-design/` (or `context/brand/`) with a short pointer to the hosted
   runtime and the Skill Hub skills, so Copilot, Cursor and Gemini users find Mini*S too.

**Rejected:**

- **Hand-exporting the design system on demand.** It's what exists, and it drifts on the first
  token change.
- **Copying `tokens.css` into each playground.** Same drift, many times over. The playground
  should link to the hosted file.
- **Publishing to npm first.** Not needed to link from a browser, and the package metadata isn't
  ready yet (missing `repository`, `NOTICE` not in `files`). Pages first, npm later with plan 012.
- **One Mini*S plugin for everyone.** Copilot users in production can't load it (010), and
  claude.ai users take skills from the Skill Hub, not from plugins.

## Phases

- [ ] **Phase 0 — Inventory and access.** Record the link of the existing Claude design system and
      what it contains; get access to the two repos (asked 2026-11-13); confirm who can publish to
      the Skill Hub and to Claude Design.
- [ ] **Phase 1 — Hosted runtime.** Build `tokens.css` and a self-contained component bundle into
      the Pages deploy at a versioned path; one demo page that links them with no build step.
- [ ] **Phase 2 — Regenerate the Claude design system** from the repo, linking the hosted bundle;
      decide how a release triggers it (plan 018's changelog sync is the natural hook).
- [ ] **Phase 3 — Skill Hub proposal.** Draft the skill(s) in `design-skills` format, pass its
      `validate.py`, and open a PR there with its owners.
- [ ] **Phase 4 — Claude Code plugin** with `minis-app`; rewrite `minis-app`'s "outside the
      monorepo" section to the plugin install. Shared with plan 010 phase 2.
- [ ] **Phase 5 — Point the copies at the source.** Offer `ux-design-playground` a PR replacing
      its copied tokens with the hosted link; add the AI Hub pointer.

## Dependencies

- **010** — channel choice for production; this plan takes the non-production channels.
- **012** — versioning: the hosted path's version is the token release version.
- **013 / 005 / 006** — once the registry exists, the outputs are generated from it and
  `minis-app` registers Local work (006).
- **018** — changelog sync as the trigger for regenerating the published outputs.
- **G2** (plan 003) — automatic token export; without it every output is only as fresh as the
  last manual export.

## Open questions

1. **Where is the existing Claude design system, and who can see it** (only the owner, the org)?
   Is it in Claude Design or a claude.ai Design System artifact?
2. **What is `slevomat-ai-hub` today** — the folder in `design-slevomat-context`, or a separate
   repo the owner can't see? (Access asked from Michal Strnadel, 2026-11-13.)
3. **What does `claude-plugin-slevomat-documentation` contain and who maintains it?** Could Mini*S
   join it instead of shipping its own plugin? (Same access request.)
4. **Who decides what enters the Skill Hub**, and does it accept a skill maintained in another
   repo (generated here, PR'd there)?
5. **Do all vibe-coders have GitHub access** to private Slevomat repos? If not, the hosted runtime
   must be public, or served from somewhere they can reach. (Shared with 010 question 1.)
6. **Is `lit` inlined in the bundle or loaded through an import map?** Inlining is simpler for
   vibe-coders; an import map is smaller when several bundles load.
7. **Language.** The Skill Hub is Czech; this repo's docs and Storybook are English. Generate both,
   or Czech only for the Hub?
