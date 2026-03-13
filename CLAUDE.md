# Mini*S Design System — Claude Code Instructions

This file is loaded automatically by Claude Code and should be kept in sync with the codebase.
Detailed component docs for AI agents live in `docs/ai-prompts/`.

---

## Stack

- **Framework**: Lit Web Components (TypeScript)
- **Build**: Vite, pnpm monorepo (`pnpm` only — never npm or yarn)
- **Storybook**: v7, `@storybook/web-components`, app at `apps/storybook/`
- **Styling**: Lit `css` template literals + CSS custom properties (no Sass, no PostCSS)
- **Tokens**: `@minis/tokens` → `packages/tokens/src/tokens.css`

## Monorepo structure

```
packages/
  tokens/       @minis/tokens — all CSS custom property tokens
  icons/        @minis/icons  — SVG icon web component
  components/   @minis/components — Lit web components
apps/
  storybook/    Interactive docs (stories in apps/storybook/stories/ and packages/*/src/**/*.stories.ts)
docs/
  ai-prompts/   AI-agent instruction files per component — ALWAYS keep in sync
```

## Token naming conventions

- **Primitive pixel scale**: `--pixel-px-{n}` (e.g. `--pixel-px-22` = 22px)
- **Linear spacing**: `--linear-sp-linear-{n}` (e.g. `--linear-sp-linear-3` = 12px)
- **Fibonacci spacing**: `--fibonachi-sp-fib-{n}` (e.g. `--fibonachi-sp-fib-8` = 34px)
- **Border radius**: `--border-radius-sm` (4px), `--border-radius-md` (8px)
- **Typography family**: `--typography-font-family-sans` (Inter), `--typography-font-family-mono`
- **Typography size**: `--typography-size-{2xs|xs|sm|md|lg|xl|2xl|3xl|4xl}` (`sm` = 14px)
- **Typography weight**: `--typography-weight-{light|regular|medium|semibold|bold|black}`
- **Typography line-height**: `--typography-line-height-percentage-{100%|125%|…}` (value is a unitless ratio, e.g. `1`)
- **Color**: `--color-text-*`, `--color-surface-*`, `--color-border-*`, `--color-interaction-{variant}-{surface|accent|border}` + `-hover-` variants
- **Component tokens**: `--{component}-{variant}-{state}-{property}` (e.g. `--button-primary-hover-surface`)

> There are NO `--spacing-*` tokens. Use `--linear-sp-linear-{n}`, `--fibonachi-sp-fib-{n}`, or `--pixel-px-{n}`.

## Component conventions

- Custom element prefix: `minis-` (e.g. `<minis-button>`)
- Every component lives in `packages/components/src/components/{name}/`
  - `{name}.ts` — Lit component class + `@customElement` decorator
  - `{name}.styles.ts` — `css` tagged template, imported by the component
  - `{name}.stories.ts` — Storybook stories
- Export from `packages/components/src/index.ts`
- Every component **must** have `docs/ai-prompts/components/{name}.md` — update it whenever the component API changes

## Size naming convention

All components use **full English words** for size values:

| Value    | Meaning  |
|----------|----------|
| `small`  | Compact  |
| `medium` | Default  |
| `large`  | Spacious |

> Never use abbreviations `sm`, `md`, `lg` as component `size` attribute values.
> (Exception: `<minis-pill-counter>` uses `xs | sm | md` — its own internal scale, not changed.)

## Changelog rules

Every change to components or tokens **must** be recorded in two places, in the same commit as the change:

1. **`CHANGELOG.md`** (repo root) — grouped by date (`## YYYY-MM-DD`), component sub-heading, bullet points.
2. **Storybook Changelog page** (`apps/storybook/stories/Introduction.stories.ts` → `Changelog` story) — same structure, styled HTML, newest date at the top.

## Storybook rules

- **NEVER** use `parameters: { options: { showPanel: false } }` — it persists globally to localStorage and hides the panel for all stories. Use `parameters: { controls: { disable: true } }` instead.
- **`apps/storybook/.storybook/manager.ts` MUST keep `showNav: true` and `showPanel: true`** in `addons.setConfig()`. These override any stale localStorage value that a bad deploy may have written — removing them causes the left panel to disappear on GitHub Pages for all visitors.
- Import components as side-effects: `import './button.js'`
- Use `html` tagged template from `lit`
- Icon slot: `<minis-icon slot="icon" name="…">` or `<svg slot="icon" …>`
- **Restart the dev server** after adding a new `*.stories.ts` file — the glob virtual module is built at startup.

## Figma

- File key: `mfiAVMWkxiBRGnegjqLMNW`
- Button component: node `284:5283` · Button docs/overview: node `378:4416`
- MCP setup: `claude mcp add --transport http figma https://mcp.figma.com/mcp --scope user`

## Token exports

When tokens are updated in Figma, they are exported to two JSON files at the repo root:

- **`tokens.json`** — values in `oklch()` with `var()` references (use for reading token structure, names, and relationships)
- **`tokens.rgb.json`** — fully resolved values in `#hex` / `rgba()` (use when you need the actual colour values)

These are the primary source of truth for token discovery. Alternatively, use the Figma MCP (`mcp__figma__get_variable_defs`) to query variables directly from the Figma file.

## Common pitfalls

- **No `--spacing-*` tokens** — they don't exist in this system (outdated name).
- **Avoid `var(--a, 1px 2px)` multi-value fallbacks** in Lit `css` templates — invalid CSS crashes the module.
- **No duplicate `@customElement` registrations** — check existing tag names before adding a new component.
- **TypeScript strict mode** (`noUnusedLocals`, `noUnusedParameters`) — unused imports/params fail the Vite build.

## AI-agent docs

Full component references with API tables, token lists, usage examples, and copy-paste prompts:

- `docs/ai-prompts/index.md` — navigation index
- `docs/ai-prompts/getting-started.md` — setup and token reference
- `docs/ai-prompts/components/button.md`
- `docs/ai-prompts/components/pill-counter.md`
- `docs/ai-prompts/components/icon.md`
- `docs/ai-prompts/components/alert.md`
- `docs/ai-prompts/components/message.md`
