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
- **Responsive layout spacing**: `--spacing-layout-{xs|sm|md|lg|xl}` — values scale with the viewport breakpoint tier (e.g. `--spacing-layout-sm` = 12px mobile → 16px from 408px up). Related responsive tokens: `--container-padding`, `--container-narrow-padding`, `--container-width`.
- **Border radius**: `--border-radius-sm` (4px), `--border-radius-md` (8px)
- **Typography family**: `--typography-font-family-sans` (Inter, all UI), `--typography-font-family-mono` (SF Mono), `--typography-font-family-brand` (`'Kensington', 'Bebas Neue', 'Arial Narrow', sans-serif` — banner headlines only). **Kensington is Slevomat-proprietary and NOT in the repo** — Bebas Neue (Google Fonts) is the public fallback. Both faces are all-caps and single-weight, so brand text is always `text-transform: uppercase` at `--typography-brand-weight` (400) — never `--typography-weight-bold`, which synthesises a fake bold. To use the real font locally, see `packages/tokens/src/fonts/README.md`.
- **Typography size**: `--typography-size-{3xs|2xs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl}` (`sm` = 14px, `3xs` = 8px, `5xl` = 56px)
- **Typography weight**: `--typography-weight-{light|regular|medium|semibold|bold|black}`
- **Typography line-height**: `--typography-line-height-{90|100|110|125|130|133|138|140|143|150|157}` (value is a percentage, e.g. `138%`). Responsive composites `--typography-{heading-lg,heading-md,heading-sm,body-md,body-sm}-line-height` reference this scale and change per breakpoint. Brand composites `--typography-brand-{lg,xl}-{size,line-height}` scale at 1480px+ (`--typography-brand-weight` is a flat 400).
- **Color**: `--color-text-*`, `--color-surface-*`, `--color-border-*`, `--color-separator-default` (alpha — black 5% light / white 35% dark, so rules read on any surface; `--separator-color` and the accordion divider both resolve to it), `--color-interaction-{variant}-{surface|accent|border}` + `-hover-` variants
- **Component tokens**: `--{component}-{variant}-{state}-{property}` (e.g. `--button-primary-hover-surface`)

> There is NO bare numeric `--spacing-{n}` scale. The only `--spacing-*` tokens are the responsive `--spacing-layout-*` set. For fixed values use `--linear-sp-linear-{n}`, `--fibonachi-sp-fib-{n}`, or `--pixel-px-{n}`.

## Component conventions

- Custom element prefix: `minis-` (e.g. `<minis-button>`)
- Every component lives in `packages/components/src/components/{name}/`
  - `{name}.ts` — Lit component class + `@customElement` decorator
  - `{name}.styles.ts` — `css` tagged template, imported by the component
  - `{name}.stories.ts` — Storybook stories
- Export from `packages/components/src/index.ts`
- Every component **must** have `docs/ai-prompts/components/{name}.md` — update it whenever the component API changes

## Size naming convention

All components use **abbreviated size values matching the Figma `Size` variant names**:

| Value | Meaning              |
|-------|----------------------|
| `xs`  | Extra compact        |
| `sm`  | Compact              |
| `md`  | Default              |
| `lg`  | Spacious             |
| `xl`  | Extra spacious       |

Each component exposes only the subset it supports (e.g. `<minis-button>` = `sm | md | lg | xl`, `<minis-badge>` = `sm | md | xl`, `<minis-pill-counter>` = `xs | sm | md`).

> Never use full words `small`, `medium`, `large` as component `size` attribute values — they don't match the Figma variants and components will fall back to their default size.

## Changelog rules

Every change to components or tokens **must** be recorded in two places, in the same commit as the change:

1. **`CHANGELOG.md`** (repo root) — grouped by date (`## YYYY-MM-DD`), component sub-heading, bullet points.
2. **Storybook Changelog page** (`apps/storybook/stories/Introduction.stories.ts` → `Changelog` story) — same structure, styled HTML, newest date at the top.

**Token updates must always be logged.** Any added / renamed / removed / re-valued token (in `packages/tokens/src/tokens.css`, the foundation/light/dark files, or the Figma exports `tokens.json` / `tokens.rgb.json`) must appear in both changelog locations. Include:

- The CSS custom property name(s) affected (e.g. `--action-row-surface`).
- For new tokens: the value or what they reference (e.g. `var(--button-tertiary-surface)`).
- For changes: old value → new value.
- A "Tokens" sub-section under the relevant component, or a top-level "Tokens" sub-section when the change is foundation-wide.

## Storybook rules

- **NEVER** use `parameters: { options: { showPanel: false } }` — it persists globally to localStorage and hides the panel for all stories. Use `parameters: { controls: { disable: true } }` instead.
- **`apps/storybook/.storybook/manager.ts` MUST keep `showNav: true` and `showPanel: true`** in `addons.setConfig()`. These override any stale localStorage value that a bad deploy may have written — removing them causes the left panel to disappear on GitHub Pages for all visitors.
- Import components as side-effects: `import './button.js'`
- Use `html` tagged template from `lit`
- Icon slot: `<minis-icon slot="icon" name="…">` or `<svg slot="icon" …>`
- **Restart the dev server** after adding a new `*.stories.ts` file — the glob virtual module is built at startup.
- **The Tier toolbar tokens are generated from `tokens.json`** at build time by `apps/storybook/.storybook/tier-tokens.ts` — never hand-edit tier values in `preview.ts`. After a Figma token re-export, restart the dev server to pick up new values. The Tier dropdown only overrides *tokens*; it does not affect container-query components (page-header, card-grid) — those respond to real iframe width only.
- **The global decorator must not pad `layout: 'fullscreen'` stories** — padding shrinks container-query components below the viewport width and shifts their breakpoints (e.g. page-header showing mobile layout at the 768px tablet preset). Container-query component stories must set `layout: 'fullscreen'`.

## Figma

- File key: `mfiAVMWkxiBRGnegjqLMNW`
- Button component: node `284:5283` · Button docs/overview: node `378:4416`
- Accordion: page `4977:145` · `accordion-item` component set `4984:9556` · `accordion` list container `4984:9557` (the item's divider is an unmodified `separator` instance — no colour/height override)
- Separator: page `4977:346` · `separator` component `4987:147` (Figma only — no Lit component yet; colour is the alpha `--color-separator-default`, not `--color-border-subtle`)
- MCP setup: `claude mcp add --transport http figma https://mcp.figma.com/mcp --scope user`

## Figma Code Connect

Code Connect maps each Lit component to its Figma counterpart so Dev Mode shows real usage snippets.

### Every component = 3 files

| File | Purpose |
|---|---|
| `{component}.ts` | Lit Web Component |
| `{component}.stories.ts` | Storybook docs |
| `{component}.figma.ts` | Figma Code Connect mapping |

Never create a component without a `.figma.ts` file.

### `.figma.ts` template

```typescript
// IMPORTANT: import from the '/html' subpath — the package root only
// exports the React API and `{ html }` fails `tsc` (TS2614).
import figma, { html } from '@figma/code-connect/html';

figma.connect('FIGMA_NODE_URL', {
  props: {
    // figma.enum    → variant/type/size selectors
    // figma.boolean → disabled/loading/checked states
    // figma.string  → label/text/placeholder values
    // figma.instance → slot/icon/nested components
  },
  example: (props) => html`
    <minis-{component}
      ...mapped-attributes
    >
      ...slotted content
    </minis-{component}>
  `,
});
```

Get the Figma node URL: open Figma → Dev Mode → click the component → copy the URL from the browser address bar.

### Naming convention — Figma ↔ Code sync

| Figma Property | HTML Attribute | figma.ts mapping |
|---|---|---|
| `Variant` | `variant` | `figma.enum('Variant', {...})` |
| `Size` | `size` | `figma.enum('Size', {...})` |
| `Disabled` | `disabled` (boolean attr) | `figma.boolean('Disabled')` |
| `Label` | slot content | `figma.string('Label')` |
| `Icon` | slot or attr | `figma.instance('Icon')` |

### Publishing

```bash
# Dry-run parse (no publish)
pnpm figma:parse

# Publish to Figma Dev Mode
pnpm figma:publish
```

Scripts use `$FIGMA_ACCESS_TOKEN` from `.env.local` (never commit that file).

## Token exports

When tokens are updated in Figma, they are exported to two JSON files at the repo root:

- **`tokens.json`** — values in `oklch()` with `var()` references (use for reading token structure, names, and relationships)
- **`tokens.rgb.json`** — fully resolved values in `#hex` / `rgba()` (use when you need the actual colour values)

These are the primary source of truth for token discovery. Alternatively, use the Figma MCP (`mcp__figma__get_variable_defs`) to query variables directly from the Figma file.

### Figma-export naming drift (Layout collection)

Some `cssName`s in `tokens.json` differ from the names `tokens.css` and the components actually use. When reading `tokens.json`, translate:

| tokens.json `cssName` | tokens.css / components |
|---|---|
| `--typography-heading-large-*` | `--typography-heading-lg-*` |
| `--typography-heading-medium-*` | `--typography-heading-md-*` |
| `--typography-heading-small-*` | `--typography-heading-sm-*` |
| `--typography-mega-poster-size` | `--typography-heading-2xl-size` |
| `--typography-poster-size` | `--typography-heading-xl-size` |

The brand (Kensington) composites `--typography-brand-{lg,xl}-*`, `--typography-brand-weight`, the `--typography-font-family-*` set, the hand-written `FONTS` comment block at the top of `tokens.css`, and `--container-bleeding-edge-padding` exist **only** in `tokens.css` — they are not in the Figma Layout collection. **A Figma re-export must preserve them** (they are marked `HAND-MAINTAINED` in the file). `apps/storybook/.storybook/tier-tokens.ts` maintains the same alias table for the Storybook Tier simulation; update both if the export naming changes.

## Common pitfalls

- **No bare `--spacing-{n}` scale** — the only `--spacing-*` tokens are the responsive `--spacing-layout-*` set; a numeric `--spacing-4`-style scale does not exist.
- **Never commit font binaries** — Kensington is proprietary; `packages/tokens/src/fonts/*.woff2` is git-ignored and the `@font-face` lives in a build-generated `dist/fonts/kensington.css`, never in `tokens.css`. See `packages/tokens/src/fonts/README.md`.
- **Dark mode = `<html data-mode="dark">`** — `tokens.css` contains the `[data-mode="dark"]` override block. Never link `dist/foundation/dark.css` (deprecated legacy file, hardcoded hex, no toggle).
- **Avoid `var(--a, 1px 2px)` multi-value fallbacks** in Lit `css` templates — invalid CSS crashes the module.
- **No duplicate `@customElement` registrations** — check existing tag names before adding a new component.
- **TypeScript strict mode** (`noUnusedLocals`, `noUnusedParameters`) — unused imports/params fail the Vite build.
- **Avoid `disabled` unless interaction is structurally impossible** — prefer keeping components active and displaying a `<minis-alert>` or inline message that explains what the user must do first. Only use `disabled` when the action truly cannot be taken (e.g. a locked premium feature). See `docs/ai-prompts/principles.md`.
- **Two responsive mechanisms — don't mix them up**: page-level spacing/typography respond to the *viewport* (media-query-driven tokens in `tokens.css`); components that rearrange their own internals (page-header, card-grid) use *container queries* on their own width. New layout-switching components must use container queries with the breakpoint hardcoded from the `--breakpoint-*` scale + a comment (CSS custom properties cannot be used in `@container`/`@media` conditions). See `docs/ai-prompts/layouts/index.md` → "Two Responsive Mechanisms".
- **`100000px` in `tokens.json` means "full width" (100%)** — Figma cannot mix `%` and `px` in the same variable collection, so unbounded widths are encoded as `100000px`. Always translate to `100%` in CSS. Only actual numeric values (e.g. `752px`, `1240px`) represent real constraints.

## AI-agent docs

Full component references with API tables, token lists, usage examples, and copy-paste prompts:

- `docs/ai-prompts/index.md` — navigation index
- `docs/ai-prompts/getting-started.md` — setup and token reference
- `docs/ai-prompts/principles.md` — design principles (e.g. prefer active over disabled)
- `docs/ai-prompts/components/button.md`
- `docs/ai-prompts/components/pill-counter.md`
- `docs/ai-prompts/components/icon.md`
- `docs/ai-prompts/components/alert.md`
- `docs/ai-prompts/components/message.md`
- `docs/ai-prompts/components/navigation.md`
- `docs/ai-prompts/components/container.md`
- `docs/ai-prompts/components/topbar.md`
- `docs/ai-prompts/components/checkbox.md`
- `docs/ai-prompts/components/action-row.md`
- `docs/ai-prompts/components/badge.md`
- `docs/ai-prompts/components/accordion.md`
