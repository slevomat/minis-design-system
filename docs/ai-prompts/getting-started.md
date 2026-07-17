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
  
  <!-- Your content here -->
  
</body>
</html>
```

## AI Prompt Template

When asking AI to generate code, use this structure:

```
Create a [component/pattern/template name] using Mini*S Design System.

Requirements:
- Use Web Components with <minis-*> prefix
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
```

All typography across the Slevomat website and mobile app uses the variable Inter font family in various weights. The only exception is for banner headlines, which use the branded Kensington Compressed Bold typeface.

```css
/* Banner headline example */
.banner-headline {
  font-family: var(--typography-font-family-brand);
}
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
