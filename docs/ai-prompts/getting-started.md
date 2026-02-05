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
  
  <!-- Load Design Tokens -->
  <link rel="stylesheet" href="node_modules/@minis/tokens/dist/index.css">
  
  <!-- Load Web Components -->
  <script type="module">
    import '@minis/components';
  </script>
  
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
- Apply Mini*S design tokens (--color-*, --spacing-*, etc.)
- Follow the structure from [relevant .md file]
- Make it responsive using --breakpoint-* tokens

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
--spacing-xs, --spacing-sm, --spacing-md, --spacing-lg, --spacing-xl
--spacing-inset-sm                     /* Padding */
--spacing-stack-md                     /* Margin */
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

## Component Prefix

All Mini*S components use the `minis-` prefix:

```html
<minis-button variant="primary">Click me</minis-button>
```

## Next Steps

1. Browse [Component Library](./components/README.md)
2. Explore [Pattern Library](./patterns/README.md)
3. Check [Template Examples](./templates/README.md)
