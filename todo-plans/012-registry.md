---
id: 012
title: registry.json — the single inventory of everything Mini*S has
status: draft
created: 2026-10-29
updated: 2026-10-29
owner: Lexislav
---

# 012 — registry.json: the single inventory of everything Mini*S has

> **Unblocks 003, 004 and 005**, which all assume a registry and its schema. Shares the
> canonical-token-names question with 010 and 011: `meta.tokens` needs the same single name list.

## Context

Mini*S is being redefined as shared rules rather than a UI kit. Production runs on Nette/Latte;
designers now vibe-code in the production repo; the web components here are reference and
sandbox. `registry.json` is the shared source of truth about what exists: the AI in the Nette
repo, the contribution skill (004) and CI all consult it **before building anything new**.
Three rules from the redefinition depend on it:

- **Rule 4** — every item has a valid entry: purpose, when to use and when not, variants, tokens.
- **Rule 5** — anything new starts as **Local** and is registered at once.
- **Rule 6** — promotion to **Recipe** or **Core** after 3+ uses, decided in a monthly registry
  review.

The redefinition is still in ideation, so this plan is a draft.

## The problem

There is no single list. What exists is spread over `docs/ai-prompts/components/*.md` (16 web
components, prose), `packages/icons/src/registry.ts` (icon name → SVG), Storybook, Figma and
production code nobody has inventoried. An agent can't check "does this exist?" in one place, so
it builds new — and nothing can count uses or tell which platform has which pattern.

## Constraints

- **Format is the shadcn registry, as documented today** (ui.shadcn.com/docs/registry, checked
  2026-10-29): root `registry.json` with `$schema`, `name`, `homepage` and `items`; each item
  `name`, `type`, `title`, `description`, `files` (`path`, `type`), `registryDependencies`,
  `categories`, and `meta`, which takes any key/value pairs. Mini*S fields live only in `meta`.
- **Discovery, not installation.** The shadcn CLI install path assumes a React/Tailwind project;
  for Latte the registry is the inventory and the search index. Nothing is installed from it.
- **Every token name in an entry must exist** in `packages/tokens/src/tokens.css` — a registry
  that names invented tokens teaches agents to invent them (cf. `--color-border-default`).
- **Production components are documented as-is first.** Facelift and re-applying Mini*S to them
  is a separate, later step; the registry records reality, not the target.
- **The registry never promotes.** Tier changes come out of the monthly review (004's constraint).

## Approach

One `registry.json` in shadcn format. Proposed `meta` fields (draft — undecided ones are open
questions below):

| Field | Content |
|---|---|
| `tier` | `local` \| `recipe` \| `core` (open: a `production` tier for documented production components) |
| `aliases` | Other names people search by ("tile" ↔ "card", "hero" ↔ "page header") |
| `whenToUse` / `whenNotToUse` | Short lists; the Rule 4 content |
| `variants` | Attribute → allowed values, matching the Figma variant names |
| `tokens` | Component and semantic tokens the item uses |
| `usedIn` | Where it is used — the input for the 3+ uses count |
| `implementations` | One **required** key per platform: Web, Web FE B2C, Admin, Slevomat for Partners, vibecoding (web components), mobile app, Figma. Each `{ status: done \| partial \| missing \| n/a \| unknown, ref? }`, with a path or identifier when `done` |

CI rejects an entry with a missing platform key, so "not defined" is always stated as `unknown`
rather than left out. Across all items this gives a pattern × platform coverage matrix that also
feeds adoption measurement. (Proposal under validation.)

```json
{
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "Primary interface action with variants, sizes, icon and counter pill.",
  "files": [{ "path": "packages/components/src/components/button/button.ts", "type": "registry:ui" }],
  "registryDependencies": ["pill-counter", "icon"],
  "categories": ["action"],
  "meta": {
    "tier": "core",
    "aliases": ["cta", "action button"],
    "whenToUse": ["The main action of a view or form"],
    "whenNotToUse": ["Navigation between pages — use a link or minis-navigation"],
    "variants": { "variant": ["primary", "secondary", "tertiary", "danger", "cta-buy", "transparent"], "size": ["sm", "md", "lg", "xl"] },
    "tokens": ["--button-primary-surface", "--button-primary-hover-surface", "--button-border-radius", "--button-padding-x"],
    "usedIn": [],
    "implementations": {
      "web": { "status": "unknown" }, "web-fe-b2c": { "status": "unknown" },
      "admin": { "status": "unknown" }, "partners": { "status": "unknown" },
      "vibecoding": { "status": "done", "ref": "<minis-button>" },
      "mobile": { "status": "unknown" }, "figma": { "status": "done", "ref": "284:5283" }
    }
  }
}
```

**Scope of items:** the 16 web components; Latte recipes as they appear; components that live
only in production, documented as-is; icons (open: one item for the set or one per icon —
`@minis/icons` has 287 icons plus 25 deprecated aliases, and production icons come from
webfonts).

**Rejected:** a custom format (no MCP server, no tooling, and agents already know shadcn's);
keeping `docs/ai-prompts` as the inventory (prose, not checkable by CI, no tiers or platforms);
Mini*S fields at item top level (outside the shadcn schema, so validators and the MCP server may
reject them).

## Phases

- [ ] **Phase 0 — Settle `meta`.** Decide open questions 1–3; write a JSON Schema for `meta`.
- [ ] **Phase 1 — First registry.json** generated from what exists (the web components and their
      `docs/ai-prompts` files). Decide the direction of generation: registry → AI docs
      (preferred, one source) or docs → registry.
- [ ] **Phase 2 — CI check:** every component directory has an entry, every `files` path exists,
      required `meta` fields are non-empty, every `implementations` key is present, every
      `meta.tokens` entry exists in `tokens.css`.
- [ ] **Phase 3 — Production components**, added as-is together with the lead developer.
- [ ] **Phase 4 — Hosting and discovery.** Serve the index at a URL (e.g. GitHub Pages next to
      Storybook, which `deploy-storybook.yml` already publishes); try the shadcn MCP server
      (`shadcn mcp init --client claude`) in Claude Code. The consumer needs a `components.json`
      with a `registries` entry (`"@minis": "https://…/{name}.json"`) — the Nette repo would
      carry that file only for this.
- [ ] **Phase 5 — Connect** to the contribution skill (004) and the monthly registry review.

## Dependencies

- **004** contribution skill — the registry's main client (its open question 1 is answered by
  this plan existing); **003** and **005** read the registry through it. Distribution: **009**.
- **010** Stylelint and **011** token distribution — `meta.tokens` is checked against the same
  canonical name list both are blocked on.

## Open questions

1. **Production tier.** Do documented production components get their own tier (`production`),
   or enter as `local` / `core` by judgement?
2. **Icons.** One item for the whole set or one per icon? Production icons come from webfonts —
   does the registry list webfont glyphs, `@minis/icons` names, or both with a mapping?
3. **Platform keys.** Are "Web" and "Web FE B2C" separate platforms? Is the list closed?
4. **Where does the registry live** — this repo, the Nette repo, or written here and published
   to a URL? Ties to 004's question 2 (who can write a Local entry from the Nette repo).
5. **Who maintains entries for production components** — the lead developer, the designer who
   registers them, or the monthly review?
