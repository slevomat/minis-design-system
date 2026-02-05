# Mini*S Design System

Modern Web Components design system built with Lit + TypeScript, designed for **AI-agent readiness** with structured prompts and instructions for seamless AI-assisted development.

## 🏗️ Project Structure

```
minis-design-system/
├── packages/
│   ├── tokens/          # Design tokens (CSS)
│   └── components/      # Web Components (Lit)
├── apps/
│   └── storybook/       # Interactive documentation
└── docs/
    ├── ai-prompts/      # AI agent instructions & prompts
    └── examples/        # Working code examples
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

### Docs Structure

```
docs/
├── ai-prompts/              # AI agent instructions & prompts
│   ├── index.md             # Main entry point for AI tools
│   ├── getting-started.md   # Quick start guide for AI agents
│   ├── components/          # Component-specific AI instructions
│   │   ├── README.md        # Components overview
│   │   └── button.md        # Button component prompt
│   ├── patterns/            # Composable UI patterns
│   │   └── README.md        # Patterns overview
│   └── templates/           # Full page layout templates
│       └── README.md        # Templates overview
└── examples/                # Working code examples
    └── simple-landing.html  # Example landing page
```

## 🤖 AI-Agent Readiness

Mini*S is designed with **AI-first documentation** - structured prompts and instruction sets that enable AI agents (Cursor, Claude Code, GitHub Copilot, etc.) to generate consistent, design-system-compliant code.

### AI Prompts Library (`docs/ai-prompts/`)

- **Components** - Individual UI elements with props, variants, and usage examples
- **Patterns** - Composable UI patterns combining multiple components
- **Templates** - Full page layouts and structures

### How AI Agents Use Mini*S

1. **Load context** - AI reads the relevant `.md` instruction file
2. **Understand tokens** - AI learns available design tokens and CSS variables
3. **Generate code** - AI produces code that follows Mini*S conventions
4. **Stay consistent** - All generated code uses the same token system

### Example AI Workflow

```
# In Cursor or Claude Code
"Create a login form using Mini*S components and tokens"

# AI will:
# 1. Reference docs/ai-prompts/components/
# 2. Use @minis/tokens CSS variables
# 3. Generate <minis-button> and other components
# 4. Follow established patterns
```

## 📄 License

MIT
