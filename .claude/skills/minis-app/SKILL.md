---
name: minis-app
description: Scaffold and build an app or prototype with the Mini*S design system — Slevomat web pages, internal tools, dashboards, admin UIs, client-facing apps. Use when the user wants to create, start, or vibe-code a new app, prototype, page, or demo with Mini*S / minis- components, or asks to "make me an app for X" in this design system. Handles project scaffolding, the mandatory topbar + background rules, building the screens from the component docs, and verifying the result in a browser.
---

# Build an app with Mini*S

Takes a request like *"an app for handling refund requests"* or *"a landing page for the summer campaign"* from nothing to a running, on-system page.

## Before anything else: two questions you must be able to answer

1. **What is being built?** — this picks the topbar variant, and it is not optional:

   | Building… | `variant` |
   |---|---|
   | A page on the **Slevomat website** (category, campaign, deal, checkout…) | `web` |
   | **Anything else** — internal tool, dashboard, admin, client-facing app, one-off prototype | `vibe-apps` + `app-name="…"` |

2. **What is it called?** — needed for `app-name` on the `vibe-apps` variant and for the project folder.

If the user's request doesn't make both clear, ask once, briefly, then proceed. Don't guess `web` — most requests that name an app are `vibe-apps`.

## Step 1 — Locate the design system

The scaffolder lives in the Mini*S monorepo. Find it:

- If the current directory is the monorepo (`packages/create-minis/` exists), use it.
- Otherwise ask the user for the path, or look for `~/Projekty/Slevomat/minis-design-system`.

## Step 2 — Scaffold

From the monorepo root:

```bash
pnpm build && pnpm create-prototype <target-dir>
```

`pnpm build` is required — the scaffolder copies `dist/` output for tokens, components and icons, and fails if they are missing. Pick a target directory outside the monorepo (e.g. `~/prototypy/<name>`); the command refuses to overwrite an existing folder.

The generated project contains `index.html`, its own `CLAUDE.md`, `public/vendor/` (tokens + components + icons), and a full copy of `docs/ai-prompts/`. **Read the generated `CLAUDE.md` and `docs/ai-prompts/index.md` before writing any markup** — they are the authority on the component API, not your memory.

Then:

```bash
cd <target-dir> && pnpm install
```

## Step 3 — Get it running and visible

Write `.claude/launch.json` in the new project so the dev server runs in the Browser pane (never start it with a plain Bash command):

```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "prototype", "runtimeExecutable": "pnpm", "runtimeArgs": ["dev"], "port": 5173 }
  ]
}
```

Then `preview_start` with `{name: "prototype"}`. Keep it running while you build — hot reload means you can check each screen as you add it.

## Step 4 — Build the screens

Start from the scaffolded `index.html` (it already has a topbar, navigation and sample content) and replace its body with what the user actually asked for.

**Non-negotiables — check every one before you call the page done:**

| Rule | What it means |
|---|---|
| Background | `body { background: var(--color-background); }` — never `#fff`, `white`, or a hand-picked grey. `--color-surface-primary` is for components *on top of* the page (cards, panels, the band behind the topbar). |
| Topbar | The page opens with `<minis-topbar>` on the variant decided above. Never hand-roll a header bar, never omit it. |
| Main nav | On a **Slevomat web page**, `<minis-navigation variant="main-nav">` goes directly under the topbar — mandatory, and exactly once per page. In-page switching uses `variant="tabs"`. Vibe apps may skip the main nav. |
| Tokens only | Every colour, space, radius and font comes from a `var(--…)` token. A raw hex or px value silently opts out of dark mode and the responsive scale. |
| Sizes | `xs \| sm \| md \| lg \| xl` only — never `small`/`medium`/`large`, which fail silently and fall back to the default size. (Accordion is the one exception: `default \| compact`.) |
| Page header | `<minis-page-header>` is the hero: one per page, first content element, **outside** `<minis-container>` (it is full-bleed and owns its own padding). The topbar, by contrast, goes **inside** the container. |
| Borders vs separators | A border encloses (solid `--color-border-*`); a separator divides (alpha `--separator-color`). Never swap them. |
| Avoid `disabled` | Keep controls active and explain what's missing with a `<minis-alert>` or inline message, unless the action is structurally impossible. |
| Dark mode | Comes free from the tokens. Never write per-component dark CSS; `<html data-mode="dark">` is the whole integration. |

Reach for existing components before writing custom markup — check `docs/ai-prompts/components/` in the generated project. Custom CSS is for layout composition, not for rebuilding something that already exists.

## Step 5 — Verify, don't assume

Before reporting done:

- `read_console_messages` and `preview_logs` — no errors.
- `computer {action: "screenshot"}` — the page actually looks right; share it with the user.
- `resize_window` to `mobile` and reload — layout still holds. Note that `<minis-topbar>` has **no mobile variant yet** (see `docs/ai-prompts/components/topbar.md` → Known gaps); don't invent one, and say so if the bar looks cramped.
- Toggle `<html data-mode="dark">` via `javascript_tool` and screenshot — any element that stays stubbornly light is a hardcoded colour you need to replace with a token.

## When the design system itself is missing something

If the app needs a component that doesn't exist (there is no input, select, modal, table or avatar component yet), build it from tokens in the prototype's own CSS, and **tell the user it is prototype-local, not design system** — so it doesn't get mistaken for an on-system pattern later. Don't add components to the monorepo as a side effect of building an app.

## Using this skill outside the monorepo

It is committed at `.claude/skills/minis-app/` in the design system repo so it stays in sync with the components. To use it from any project on this machine:

```bash
cp -r <monorepo>/.claude/skills/minis-app ~/.claude/skills/
```

Re-copy after the design system changes — or symlink it instead to track the repo automatically.
