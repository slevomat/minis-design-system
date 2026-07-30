# Mini*S Design System

Modern Web Components design system built with Lit + TypeScript, designed for **AI-agent readiness** with structured prompts and instructions for seamless AI-assisted development.

**→ [Live Storybook](https://slevomat.github.io/minis-design-system)** · **[GitHub](https://github.com/slevomat/minis-design-system)** · **[Figma Plugins](https://github.com/slevomat/figma-plugins)**

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

### Related: Figma Plugins

Figma plugins for Mini*S design-to-code workflow: [github.com/slevomat/figma-plugins](https://github.com/slevomat/figma-plugins)

## 🔗 Figma MCP — AI Design Integration

Connect Figma directly to Claude Code so you can reference live designs in AI prompts — extract tokens, generate components, and keep code in sync with design without manual copy-paste.

### Setup

**1. Install Claude Code CLI**
```bash
brew install --cask claude-code
```

**2. Add the Figma MCP server**
```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp --scope user
```

**3. Authenticate**
- Start a Claude Code session: `claude`
- Type `/mcp` → select **Figma** → **Authenticate** → **Allow Access** in the browser
- Type `/mcp` again to confirm "Connected to figma"

### Example prompts

```
# Extract design tokens from a Figma file
"Extract all color and spacing tokens from this Figma file and compare with our existing tokens: https://www.figma.com/..."

# Generate a component from a Figma frame
"Generate a Lit web component for this button variant: https://www.figma.com/..."

# Sync check
"What CSS variables are missing in our tokens to match this design: https://www.figma.com/..."
```

> Tip: In Figma, right-click any frame or component → **Copy link to selection** to get the URL.

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

To export Tokens, use Mini*S tokens exporter from [Mini*S Figma plugin set](https://github.com/slevomat/figma-plugins). 

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

**Live:** [slevomat.github.io/minis-design-system](https://slevomat.github.io/minis-design-system) · **GitHub:** [github.com/slevomat/minis-design-system](https://github.com/slevomat/minis-design-system)

Run locally (available at **http://localhost:6006**):
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
│   ├── principles.md        # Design principles (e.g. prefer active over disabled)
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

- **Principles** - System-wide design rules (e.g. [prefer active states over disabled](docs/ai-prompts/principles.md))
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

MIT — see [LICENSE](./LICENSE). Scope notes and third-party credits are in [NOTICE](./NOTICE).

### Project scope

Mini*S is built for **Slevomat's own products and internal prototyping**. It is not a
general-purpose UI library and it is not a supported product:

- no support, SLA, or release guarantees — treat it as read-only unless you work at Slevomat;
- external contributions and feature requests are not accepted;
- APIs, tokens, and component names change whenever Slevomat's design needs change, without notice or a deprecation period.

The code is MIT-licensed, so you are free to read, fork, and reuse it — just don't
expect it to stay still or to be maintained for anyone else's use case.

### Third-party assets

| Asset | Licence | Notes |
|---|---|---|
| [Inter](https://fonts.google.com/specimen/Inter) | SIL Open Font License 1.1 | All UI typography. Loaded from Google Fonts, not bundled. |
| [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) | SIL Open Font License 1.1 | Public fallback for the brand display face. Loaded from Google Fonts, not bundled. |
| **Kensington Compressed Bold** | Proprietary — Slevomat | **Not included in this repository and not redistributed.** |

`--typography-font-family-brand` names Kensington first, so Slevomat machines that
have the font render the real brand face; everyone else gets Bebas Neue
automatically. Nothing needs to be configured either way. To enable Kensington
locally, see [`packages/tokens/src/fonts/README.md`](./packages/tokens/src/fonts/README.md).

The MIT licence covers the code, tokens, and documentation here. It does not convey
rights to Slevomat brand assets — the Kensington typeface, the Slevomat name, logos,
and brand imagery — because a copyright licence never conveys trademark rights.
