# Mini*S Design System — Contributor Quick Start

For people working **on** the design system: components, tokens, Storybook. Building a prototype
or app **with** it instead? Read [`docs/vibe-coding-guide.md`](docs/vibe-coding-guide.md).

`CLAUDE.md` is the full rulebook (token naming, size values, Storybook rules, common pitfalls).
This page is the short path through it.

## 1. Install, build, run Storybook

You need Node.js and **pnpm** — never npm or yarn.

```bash
pnpm install       # all workspace dependencies
pnpm build         # builds every package: tokens, icons, components
pnpm storybook     # http://localhost:6006
```

Storybook loads component stories straight from `packages/components/src/**/*.stories.ts` and the
pages in `apps/storybook/stories/`. **Restart it** after adding a new `*.stories.ts` file or after
a token re-export — the story list and the Tier toolbar values are both built at startup.

## 2. Updating tokens from Figma

Tokens are designed as Figma variables and exported with the in-house plugin
**`minis-designtokens-exporter`** (from the [Mini*S Figma plugin set](https://github.com/slevomat/figma-plugins)).

**Before exporting, check the plugin settings.** Two of them shape every CSS name, are **OFF by
default**, and are stored per machine — an export from a fresh install renames every token:

| Setting | Must be |
|---|---|
| Remove collection name from variables | ON |
| Omit "default" from variable names | ON |

Then:

1. **Export** from Figma. The export lands in three places:
   - `tokens.json` (repo root) — `oklch()` values with `var()` references; read this for names and relationships
   - `tokens.rgb.json` (repo root) — fully resolved `#hex` / `rgba()` values
   - `packages/tokens/src/tokens.css` — the CSS custom properties the components use
2. **Keep the hand-maintained parts of `tokens.css`.** These are not in Figma and must survive the
   re-export: the `FONTS` comment block at the top (marked `HAND-MAINTAINED`), the brand
   typography composites `--typography-brand-*`, the `--typography-font-family-*` set and
   `--container-bleeding-edge-padding`. Dark mode must stay on the `[data-mode="dark"]` selector.
3. **Spot-check** that `--color-border`, `--color-separator` and
   `--color-interaction-primary-surface` still exist. If they don't, the settings above were off.
4. **Rebuild the tokens:**

   ```bash
   cd packages/tokens && pnpm build
   ```

   This copies `tokens.css` into `dist/` and generates `dist/tokens.rgb.css` and the Storybook
   palette data from the two JSON files.
5. **Log every added, renamed, removed or re-valued token** in `CHANGELOG.md` and in the Storybook
   Changelog page, in the same commit (see "Changelog rules" in `CLAUDE.md`).

Some Layout-collection names in `tokens.json` differ from the ones `tokens.css` uses (e.g.
`--typography-heading-large-*` → `--typography-heading-lg-*`). The translation table is in
`CLAUDE.md` → "Figma-export naming drift".

## 3. Adding a component

Every component lives in `packages/components/src/components/{name}/` with four files:

| File | What it is |
|---|---|
| `{name}.ts` | Lit component class with `@customElement('minis-{name}')` |
| `{name}.styles.ts` | `css` tagged template, imported by the component |
| `{name}.stories.ts` | Storybook stories |
| `{name}.figma.ts` | Figma Code Connect mapping — import from `@figma/code-connect/html`; must pass `pnpm figma:parse` |

A small existing component such as `badge/` shows the shape. Then, **in the same commit**:

- **Export it** from `packages/components/src/index.ts` — a component committed without its export
  fails CI.
- **Document it** in `docs/ai-prompts/components/{name}.md` (API table, tokens, usage, copy-paste
  prompt), and add it to `docs/ai-prompts/index.md` and to the AI-agent docs list in `CLAUDE.md`.
- **Log it** in `CHANGELOG.md` and the Storybook Changelog page.

Conventions that catch people out:

- **Sizes use the Figma `Size` variant names** — `xs | sm | md | lg | xl`, never `small` / `large`.
- **Tokens only** — no hardcoded colours or pixel values. There is no bare `--spacing-{n}` scale;
  use `--spacing-layout-*`, `--linear-sp-linear-{n}`, `--fibonachi-sp-fib-{n}` or `--pixel-px-{n}`.
- **Check the tag name is free** — a duplicate `@customElement` registration throws.
- **TypeScript is strict** — an unused import or parameter fails the build.
- **Figma Dev Mode link** — if the component has a Figma component set, add a
  `Storybook — <Component>` dev resource link to it (see `CLAUDE.md` → "Plan limitation").

## Before opening a PR

CI runs the first three on every pull request (Node 20, pnpm 9):

```bash
pnpm build
pnpm typecheck
pnpm lint
pnpm figma:parse    # only if you touched a .figma.ts file
```

Work on a branch and open a PR against `master`.
