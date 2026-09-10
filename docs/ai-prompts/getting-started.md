# Getting Started - Mini*S for AI Tools

Quick guide to start prototyping with Mini*S and AI code generation.

## Prerequisites

```bash
# Install Mini*S
pnpm add @minis/components @minis/tokens
```

## Basic HTML Setup

Every HTML file using Mini*S should start with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mini*S Prototype</title>
  
  <!-- Load Design Tokens (contains light AND dark values) -->
  <link rel="stylesheet" href="node_modules/@minis/tokens/dist/tokens.css">
  
  <!-- Load Web Components -->
  <script type="module">
    import '@minis/components';
  </script>
  
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: var(--typography-font-family-sans, Inter, sans-serif);
      background: var(--color-background);
      color: var(--color-text-primary);
    }
  </style>
</head>
<body>

  <!-- Every Mini*S page opens with the topbar.
       variant="web"       → you are building on the Slevomat website
       variant="vibe-apps" → any other app: internal tool, dashboard, client app, prototype -->
  <minis-container>
    <minis-topbar variant="vibe-apps" app-name="My app">
      <img slot="logo" src="/logo.svg" alt="Slevomat" />
    </minis-topbar>
  </minis-container>

  <!-- Your content here -->

</body>
</html>
```

> **Two rules that apply to every prototype**, no exceptions: the page background is
> `var(--color-background)` (never a hardcoded colour — it carries dark mode and the
> colour schemas), and the page starts with `<minis-topbar>` set to the right variant.
> See [principles.md](./principles.md#every-prototype-starts-with-the-background-token-and-a-topbar).

## AI Prompt Template

When asking AI to generate code, use this structure:

```
Create a [component/pattern/template name] using Mini*S Design System.

Requirements:
- Use Web Components with <minis-*> prefix
- Page background must be var(--color-background) — never a hardcoded colour
- Start the page with <minis-topbar>: variant="web" for the Slevomat website,
  variant="vibe-apps" app-name="…" for any other app or prototype
- Apply Mini*S design tokens (--color-*, --spacing-layout-*, --linear-sp-linear-*, etc.)
- Follow the structure from [relevant .md file]
- Make it responsive with the viewport-scaling layout tokens
  (--spacing-layout-*, --container-padding, --container-width) — they change
  automatically per breakpoint tier, so you rarely need to write media queries
  for spacing. See docs/ai-prompts/layouts/index.md for the tier table.

Specific needs:
[Your customizations here]
```

## Common Tokens Reference

### Colors
```css
--color-interaction-primary-surface    /* Primary button background */
--color-text-primary                   /* Main text */
--color-background                     /* Page background */
--color-surface-primary                /* Component background */
--color-border                         /* Borders */
--color-separator                      /* Separators / dividers */
```

#### Borders vs. Separators

Two different jobs, two different token families — don't substitute one for the other.

| | **Border** | **Separator** (divider) |
| --- | --- | --- |
| Purpose | Wraps content — cards, inputs, buttons, any enclosed block | Splits content inside a block — accordion rows, list items, section breaks |
| Colour | **Solid** (`--color-border`, `--color-border-subtle`, `--color-border-strong`, plus the `-focus` / `-valid` / `-invalid` states) | **Alpha** (`--color-separator` — black 5% light, white 35% dark) |
| Component tokens | `--{component}-border` / `-border-color` | `--separator-color`, `--separator-height` |

A border defines an object's edge, so it needs an opaque colour that stays put against whatever it encloses. A separator only has to be *visible enough to read as a break*, and it has to do that on every surface it lands on — a faded panel, a tinted banner, a photo. An alpha colour tints whatever is behind it instead of fighting it, so one token covers all of them; a solid grey tuned for white goes muddy on a mid-tone and disappears on a dark one.

```css
/* Border — encloses */
.card { border: var(--border-width-thin) solid var(--color-border-subtle); }

/* Separator — divides */
.faq-item + .faq-item { border-top: var(--separator-height) solid var(--separator-color); }
```

### Spacing
```css
/* Linear scale (4px steps) */
--linear-sp-linear-1   /* 4px  */
--linear-sp-linear-2   /* 8px  */
--linear-sp-linear-3   /* 12px */
--linear-sp-linear-4   /* 16px */

/* Fibonacci scale */
--fibonachi-sp-fib-3   /* 3px  */
--fibonachi-sp-fib-5   /* 5px  */
--fibonachi-sp-fib-8   /* 34px */ /* ← also used for medium button height */

/* Pixel exact */
--pixel-px-{n}         /* e.g. --pixel-px-22 = 22px */

/* Viewport-responsive layout scale (changes per breakpoint tier) */
--spacing-layout-{xs|sm|md|lg|xl}   /* e.g. sm = 12px mobile → 16px from 408px up */
```
> There is **no** bare numeric `--spacing-{n}` scale in this system — the only
> `--spacing-*` tokens are the responsive `--spacing-layout-*` set above. For
> fixed values use `--linear-sp-linear-{n}`, `--fibonachi-sp-fib-{n}`, or `--pixel-px-{n}`.

### Typography
```css
--typography-font-family-sans   /* Inter — all UI text, headings, body copy */
--typography-font-family-mono   /* SF Mono — code and numeric data */
--typography-font-family-brand  /* Kensington Compressed Bold — banner headlines only */
--typography-brand-weight       /* 400 — always; both brand faces are single-weight */
```

All typography across the Slevomat website and mobile app uses the variable Inter font family in various weights. The only exception is for banner headlines, which use the branded Kensington Compressed Bold typeface.

**Kensington is Slevomat-proprietary and is not distributed with this design system.** The brand token is a stack — `'Kensington', 'Bebas Neue', 'Arial Narrow', sans-serif` — so it renders Kensington where that font is installed and [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) (Google Fonts) everywhere else. Both are all-caps, single-weight display faces, so brand headlines are always uppercase at weight 400. See [principles → Brand font](./principles.md#brand-font-is-for-banner-headlines-only) and `packages/tokens/src/fonts/README.md`.

```css
/* Banner headline example */
.banner-headline {
  font-family: var(--typography-font-family-brand);
  font-weight: var(--typography-brand-weight);
  text-transform: uppercase;
}
```

Load both webfonts with a single Google Fonts request:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;900&display=swap">
```

### Interactive States
```css
--color-interaction-primary-surface
--color-interaction-primary-hover-surface
--color-interaction-secondary-surface
--color-interaction-tertiary-surface
--color-interaction-danger-surface
--color-interaction-cta-buy-surface
```

## Dark Mode

Toggle dark mode by setting one attribute on the root element — no extra stylesheet:

```html
<html data-mode="dark">
```

`tokens.css` ships a `[data-mode="dark"]` override block for all semantic color tokens.
Because components only ever reference semantic tokens, every `<minis-*>` component
switches automatically. Toggle at runtime with:

```js
document.documentElement.setAttribute('data-mode', 'dark'); // enable
document.documentElement.removeAttribute('data-mode');      // back to light
```

> Do **not** load `dist/foundation/dark.css` — it is a deprecated legacy file that
> permanently forces dark colors with no toggle.

## Token Export Files (for tools reading raw tokens)

Tokens are exported from Figma to two JSON files at the repo root — use them for
programmatic token discovery; use `tokens.css` names in actual code:

- **`tokens.json`** — values in `oklch()` with `var()` references (structure, names, relationships)
- **`tokens.rgb.json`** — fully resolved `#hex` / `rgba()` values (actual colors)

Two things to know when reading them:

1. **`100000px` means "full width"** — Figma cannot mix `%` and `px` in one
   variable collection, so unbounded widths are encoded as `100000px`. Always
   translate to `100%` in CSS. Real numeric values (`752px`, `1240px`) are real constraints.
2. **Some exported `cssName`s differ from the names used in code**: translate
   `--typography-heading-{large|medium|small}-*` → `--typography-heading-{lg|md|sm}-*`,
   `--typography-mega-poster-size` → `--typography-heading-2xl-size`, and
   `--typography-poster-size` → `--typography-heading-xl-size`. The brand
   (Kensington) composites `--typography-brand-*`, including
   `--typography-brand-weight`, exist only in `tokens.css`, not in the export —
   along with the `FONTS` comment block and `--typography-font-family-*`. A Figma
   re-export must preserve all of them.

## Component Prefix

All Mini*S components use the `minis-` prefix:

```html
<minis-button variant="primary">Click me</minis-button>
```

## Figma MCP Integration

You can connect Figma directly to Claude Code to reference live designs in your prompts. This enables extracting tokens, generating components, and syncing code with designs.

### Setup

```bash
# 1. Install Claude Code CLI (if not already installed)
brew install --cask claude-code

# 2. Add the Figma MCP server (one-time, applies to all projects)
claude mcp add --transport http figma https://mcp.figma.com/mcp --scope user
```

Then in a Claude Code session: type `/mcp` → select **Figma** → **Authenticate**.

### Usage

1. In Figma, right-click any frame or component → **Copy link to selection**
2. Paste the URL into your Claude Code prompt

```
# Generate a Lit component from a Figma frame
"Generate a Lit web component for this design using Mini*S tokens: https://www.figma.com/..."

# Extract tokens
"Extract all color tokens from this Figma file and list which ones are missing from our @minis/tokens package: https://www.figma.com/..."

# Component sync check
"Compare this Figma button design with our minis-button component and suggest what needs updating: https://www.figma.com/..."
```

## Next Steps

1. Browse [Component Library](./components/README.md)
2. Explore [Pattern Library](./patterns/README.md)
3. Check the [Layout guides](./layouts/index.md) for full-page composition
