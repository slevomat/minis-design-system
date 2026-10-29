# @minis/tokens

Design tokens for Mini*S Design System.

## Structure

Everything ships in one file, `tokens.css`, exported from the Figma variables:

- **Colour** — primitives, foundation (`--color-text-*`, `--color-surface-*`, `--color-border*`, `--color-interaction-*`, `--color-background`) and component tokens
- **Dark mode** — a `[data-mode="dark"]` override block, toggled with `<html data-mode="dark">`
- **Colour schemas** — e.g. `[data-theme="gift"]`
- **Layout** — spacing (`--linear-sp-linear-*`, `--fibonachi-sp-fib-*`, responsive `--spacing-layout-*`), border radius, containers
- **Typography** — families, sizes, weights, line-heights, responsive composites
- **Breakpoints** — `--breakpoint-2xs` … `--breakpoint-4xl`

## Installation

```bash
pnpm add @minis/tokens
```

## Usage

```html
<!-- Optional hex/rgb fallback for browsers without OKLCH, loaded first -->
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/tokens.rgb.css">

<!-- All tokens, light + dark -->
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/tokens.css">

<!-- Optional Kensington brand-font overlay (see src/fonts/README.md) -->
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/fonts/kensington.css">
```

`dist/index.css` is an identical copy of `dist/tokens.css` and is the package's main entry
(`@import '@minis/tokens';`).

### Dark mode and schemas

```html
<html data-mode="dark">          <!-- dark mode -->
<html data-theme="gift">         <!-- gift colour schema -->
```

## Build output

| File | Package export |
|---|---|
| `dist/index.css` | `@minis/tokens` |
| `dist/tokens.css` | — (link the file directly) |
| `dist/tokens.rgb.css` | `@minis/tokens/tokens.rgb` |
| `dist/fonts/kensington.css` | `@minis/tokens/fonts/kensington.css` |

`tokens.rgb.css` is generated from `tokens.rgb.json` at the repo root.

## Updating Tokens

1. Export from Figma with the `minis-designtokens-exporter` plugin (`tokens.json`, `tokens.rgb.json`, CSS)
2. Replace `src/tokens.css`, keeping its `HAND-MAINTAINED` blocks
3. Run `pnpm --filter tokens build`

## Legacy source files

`src/foundation/`, `src/layout/`, `src/breakpoints/`, `src/themes/` and `src/index.css` are
pre-Figma-export leftovers. They are **not built or published** and their values have drifted from
`tokens.css` (different breakpoints, a bare `--spacing-*` scale that no longer exists). Don't use them.
