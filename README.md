# Mini*S Design System

Modern Web Components design system built with Lit + TypeScript.

## 🏗️ Project Structure

```
minis-design-system/
├── packages/
│   ├── tokens/          # Design tokens (CSS)
│   └── components/      # Web Components (Lit)
└── apps/
    └── storybook/       # Documentation
```

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Build tokens
cd packages/tokens
pnpm build

# Run Storybook
cd ../..
pnpm storybook
```

## 📦 Packages

### @minis/tokens
Design tokens exported as CSS custom properties.

```bash
pnpm add @minis/tokens
```

```html
<link rel="stylesheet" href="@minis/tokens/dist/index.css">
```

### @minis/components
Lit-based Web Components.

```bash
pnpm add @minis/components
```

```html
<script type="module">
  import '@minis/components';
</script>

<minis-button variant="primary">Click me</minis-button>
```

## 🔄 Workflow: Figma → Code

### 1. Update Tokens
```bash
# Export CSS from Figma
# Replace files in packages/tokens/src/

# Rebuild
cd packages/tokens
pnpm build
```

### 2. Components Auto-Update
Components use CSS variables - they update automatically when tokens change.

### 3. View in Storybook
```bash
pnpm storybook
```

## 🎨 Token Architecture

- **Foundation** - Colors, Typography, Sizing (light/dark themes)
  - Light mode: `foundation/light/`
  - Dark mode: `foundation/dark/`
  - Includes: border, feedback, interaction, surface, text, background
- **Layout** - Spacing, Border, Elevation (responsive)
- **Breakpoints** - Responsive breakpoints
- **Themes** - default (light), gift

## 🧩 Creating Components

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('minis-my-component')
export class MyComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: var(--spacing-md);
      background: var(--color-surface-primary);
      border-radius: var(--border-radius-md);
    }
  `;

  @property() text = 'Hello';

  render() {
    return html`<div>${this.text}</div>`;
  }
}
```

## 📚 Documentation

Run Storybook:
```bash
pnpm storybook
```

Build static docs:
```bash
pnpm build-storybook
```

## 🤖 AI-Powered Prototyping

See `docs/ai-prompts/` for AI-friendly component documentation:
- **Components** - Individual UI elements
- **Patterns** - Composable UI patterns
- **Templates** - Full page layouts

Perfect for use with Cursor, Claude Code, and other AI tools.

## 📄 License

MIT
