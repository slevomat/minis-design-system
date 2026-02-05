# @minis/tokens

Design tokens for Mini*S Design System.

## Structure

### Foundation
Color tokens with light/dark mode variants:
- **Border** - border colors, focus, validation
- **Feedback** - error, info, success, warning
- **Interaction** - button states (primary, secondary, tertiary, danger, cta-buy)
- **Surface** - background surfaces
- **Text** - text colors and accents
- **Background** - page background

### Layout
Responsive layout tokens:
- **Spacing** - padding, margin, gaps
- **Border** - radius, width
- **Elevation** - shadows

### Breakpoints
Responsive breakpoints (xs, sm, md, lg, xl, 2xl)

### Themes
- **default** - Light mode (default)
- **gift** - Special gift theme

## Installation

```bash
pnpm add @minis/tokens
```

## Usage

### Basic (Light Mode)
```html
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/index.css">
```

### With Theme Selection
```html
<!-- Layout & Breakpoints -->
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/layout.css">
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/breakpoints.css">

<!-- Light Mode -->
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/foundation/light.css">

<!-- OR Dark Mode -->
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/foundation/dark.css">
```

### Using Themes
```html
<!-- Default theme (light) -->
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/themes/default.css">

<!-- Gift theme -->
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/themes/gift.css">
```

## Token Naming

### Foundation (Mode-specific)
```css
--color-border
--color-border-focus
--color-feedback-error
--color-interaction-primary-surface
--color-interaction-primary-hover-accent
--color-surface-primary
--color-text-primary
--color-background
```

### Layout (Mode-independent)
```css
--spacing-md
--spacing-inset-lg
--border-radius-md
--elevation-sm
```

### Breakpoints
```css
--breakpoint-md
--breakpoint-lg
```

## Updating Tokens

1. Export CSS from Figma
2. Replace files in `src/foundation/light/` or `src/foundation/dark/`
3. Run `pnpm build`

## File Structure

```
src/
├── foundation/
│   ├── light/              # Light mode tokens
│   │   ├── border.css
│   │   ├── feedback.css
│   │   ├── interaction.css
│   │   ├── surface.css
│   │   ├── text.css
│   │   └── background.css
│   ├── dark/               # Dark mode tokens
│   │   └── (same structure)
│   └── index.css
├── layout/
│   ├── spacing.css
│   ├── border.css
│   └── elevation.css
├── breakpoints/
│   └── breakpoints.css
├── themes/
│   ├── default.css
│   └── gift.css
└── index.css
```
