import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Overview',
  render: () => html`
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1 style="font-size:2rem;margin-bottom:.5rem">Mini*S Design System</h1>
      <p>Mini*S is a lightweight, single-file design system for Slevomat — built with Lit + TypeScript Web Components, designed for <strong>AI-agent readiness</strong> and a modern <strong>bidirectional Figma ↔ Code</strong> workflow.</p>
      <blockquote style="border-left:4px solid var(--color-interaction-primary-surface,#006eb9);padding:.5rem 1rem;margin:1rem 0;background:var(--color-surface-faded,#f1f3f5)">
        Here you can find basic info about Mini*S design system docs and the way they are organized and documented.
      </blockquote>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Core Requirements and Principles</h2>
      <blockquote style="border-left:4px solid var(--color-interaction-primary-surface,#006eb9);padding:.5rem 1rem;margin:1rem 0;background:var(--color-surface-faded,#f1f3f5)">
        <em>The design system should be as simple as possible, with minimal dependencies for designers.<br>
        All decisions are driven by the principle of simplicity — whether it is keeping documentation concise, or limiting the scope of designs and the number of components.</em>
      </blockquote>

      <h3>0 External Dependencies</h3>
      <p>By leveraging current AI capabilities, the design system's dependence on external proprietary solutions and plugins — such as Token Studio — is significantly reduced. Mini*S DS is supplemented with custom-built Figma plugins tailored to specific needs.</p>

      <h3>Bidirectional Design System</h3>
      <p>Mini*S is envisioned as a modern, two-way design system: design tokens flow from Figma to code, and the code structure informs Figma component architecture.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>How to Use — for Designers</h2>
      <p>Connect the <strong>Mini*S</strong> library to your Figma project — simply enable it in <em>Assets → Libraries</em> and all components and tokens are ready to use.</p>
      <p>To streamline your workflow, you can also use one of the Mini*S Figma plugins — see the <strong>Figma Plugins</strong> section below.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Figma Plugins</h2>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Plugin</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Status</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Description</th>
        </tr></thead>
        <tbody>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Mini*S design tokens exporter</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">✅ Active</td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Simplifies exchange of design tokens between design and development</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Mini*S heritage cleaner</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">⚠️ Deprecating</td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Removes Heritage layer, moves reference to description</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Mini*S Color docs generator</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">🚧 In progress</td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Generates palette swatch overview in a unified way</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Mini*S Palette generator</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">📋 TBD</td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Generates OKLCH-based palette from the DS manifest</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Mini*S Docs style exporter</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">📋 TBD</td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Exports components and helper styles/variables for plugins</td></tr>
        </tbody>
      </table>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Quick Start</h2>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>pnpm add @minis/components @minis/tokens</code></pre>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>&lt;link rel="stylesheet" href="@minis/tokens/dist/index.css"&gt;
&lt;script type="module"&gt;import '@minis/components';&lt;/script&gt;

&lt;minis-button variant="primary"&gt;Click me&lt;/minis-button&gt;</code></pre>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <p>
        <a href="https://slevomat.github.io/minis-design-system" style="color:var(--color-interaction-primary-surface,#006eb9)">Live Storybook</a> ·
        <a href="https://github.com/slevomat/minis-design-system" style="color:var(--color-interaction-primary-surface,#006eb9)">GitHub</a> ·
        <a href="https://github.com/slevomat/figma-plugins" style="color:var(--color-interaction-primary-surface,#006eb9)">Figma Plugins</a>
      </p>
      <p><strong>Head of Design:</strong> Michal — michal.strnadel@slevomat.cz</p>
      <p><strong>Author:</strong> Alexandr Hudeček &amp; Slevomat team</p>
    </div>
  `,
};

export const DeveloperGuide: Story = {
  name: 'Developer guide',
  render: () => html`
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1 style="font-size:2rem;margin-bottom:.5rem">Developer Guide</h1>
      <p>Mini*S components are standard <strong>Web Components</strong> built with <a href="https://lit.dev" style="color:var(--color-interaction-primary-surface,#006eb9)">Lit</a>. They work in any modern framework or plain HTML — no wrappers needed.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Installation</h2>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>pnpm add @minis/components @minis/tokens</code></pre>
      <p>Both packages ship full TypeScript types — no <code>@types/*</code> needed.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Setup</h2>
      <p>Load the token stylesheet once at the application root, then import components as ES modules:</p>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>&lt;!-- index.html --&gt;
&lt;link rel="stylesheet" href="node_modules/@minis/tokens/dist/index.css"&gt;</code></pre>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>// main entry (e.g. main.ts / main.js)
import '@minis/components';</code></pre>
      <p>With a bundler (Vite, Webpack) you can import the token CSS the same way:</p>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>import '@minis/tokens/dist/index.css';</code></pre>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Framework Integration</h2>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Framework</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Notes</th>
        </tr></thead>
        <tbody>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Vanilla HTML</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Works out of the box — use custom element tags directly.</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Vue 3</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Works natively. Add <code>compilerOptions.isCustomElement: (tag) => tag.startsWith('minis-')</code> in <code>vite.config.ts</code> to suppress unknown element warnings.</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>React 18+</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Web Components work in React but event binding uses <code>ref</code> for custom events. React 19 adds full Web Component support — no workarounds needed.</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Angular</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Add <code>CUSTOM_ELEMENTS_SCHEMA</code> to the module/component where Mini*S elements are used.</td></tr>
        </tbody>
      </table>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Theme &amp; Mode Switching</h2>
      <p>Appearance is driven entirely by CSS custom properties. Set attributes on any ancestor element (typically <code>&lt;html&gt;</code> or a wrapper <code>&lt;div&gt;</code>):</p>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Attribute</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Values</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Effect</th>
        </tr></thead>
        <tbody>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>data-mode</code></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>light</code> (default) · <code>dark</code></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Switches all color tokens to the dark palette</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>data-theme</code></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>classic</code> (default) · <code>gift</code></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Switches brand accent colors (e.g. CTA button)</td></tr>
        </tbody>
      </table>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>&lt;!-- dark mode --&gt;
&lt;html data-mode="dark"&gt;

&lt;!-- gift theme in dark mode --&gt;
&lt;div data-mode="dark" data-theme="gift"&gt;
  &lt;minis-button variant="cta-buy"&gt;Buy now&lt;/minis-button&gt;
&lt;/div&gt;</code></pre>
      <p>Toggle programmatically:</p>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>document.documentElement.dataset.mode = 'dark';
document.documentElement.dataset.theme = 'gift';</code></pre>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Using Design Tokens in Custom Code</h2>
      <p>Once <code>@minis/tokens/dist/index.css</code> is loaded, all tokens are available as CSS custom properties on <code>:root</code>. Use them directly in your own stylesheets or inline styles:</p>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>.my-element {
  color: var(--color-text-primary);
  background: var(--color-surface-faded);
  border-radius: var(--border-radius-sm);   /* 4px */
  padding: var(--linear-sp-linear-8);       /* 8px */
  gap: var(--fibonachi-sp-fib-8);           /* 8px */
}</code></pre>
      <p>Token categories:</p>
      <ul>
        <li><strong>Color</strong> — <code>--color-text-*</code>, <code>--color-surface-*</code>, <code>--color-border-*</code>, <code>--color-interaction-{variant}-{surface|accent|border}</code></li>
        <li><strong>Spacing (linear)</strong> — <code>--linear-sp-linear-{n}</code> (4, 8, 12, 16, 20, 24…)</li>
        <li><strong>Spacing (Fibonacci)</strong> — <code>--fibonachi-sp-fib-{n}</code> (2, 3, 5, 8, 13, 21…)</li>
        <li><strong>Border radius</strong> — <code>--border-radius-sm</code> (4px), <code>--border-radius-md</code> (8px)</li>
        <li><strong>Pixel scale</strong> — <code>--pixel-px-{n}</code></li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Component API Patterns</h2>
      <p>All Mini*S components follow the same conventions:</p>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Pattern</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Example</th>
        </tr></thead>
        <tbody>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">String attribute</td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>variant="secondary"</code>, <code>size="medium"</code></td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Boolean attribute</td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>disabled</code>, <code>icon-only</code> — presence = true, absence = false</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Named slot</td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>&lt;minis-icon slot="icon" name="…"&gt;</code> — use the <code>slot</code> attribute on a child element</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Default slot</td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Text content between tags — <code>&lt;minis-button&gt;Label&lt;/minis-button&gt;</code></td></tr>
        </tbody>
      </table>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>&lt;!-- label only --&gt;
&lt;minis-button variant="primary" size="medium"&gt;Buy now&lt;/minis-button&gt;

&lt;!-- icon + label + counter pill --&gt;
&lt;minis-button variant="secondary" counter="3"&gt;
  &lt;minis-icon slot="icon" name="cart-fill"&gt;&lt;/minis-icon&gt;
  Cart
&lt;/minis-button&gt;

&lt;!-- icon-only with counter --&gt;
&lt;minis-button variant="primary" icon-only counter="5"&gt;
  &lt;minis-icon slot="icon" name="star"&gt;&lt;/minis-icon&gt;
&lt;/minis-button&gt;

&lt;!-- disabled --&gt;
&lt;minis-button variant="primary" disabled&gt;Unavailable&lt;/minis-button&gt;</code></pre>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Browser Support</h2>
      <p>Mini*S targets <strong>evergreen browsers</strong> (Chrome, Firefox, Safari, Edge — last 2 major versions). No polyfills are required. Web Components with Shadow DOM and CSS custom properties are natively supported across all targets.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <p>
        <a href="https://slevomat.github.io/minis-design-system" style="color:var(--color-interaction-primary-surface,#006eb9)">Live Storybook</a> ·
        <a href="https://github.com/slevomat/minis-design-system" style="color:var(--color-interaction-primary-surface,#006eb9)">GitHub</a> ·
        <a href="https://github.com/slevomat/figma-plugins" style="color:var(--color-interaction-primary-surface,#006eb9)">Figma Plugins</a>
      </p>
      <p><strong>Head of Design:</strong> Michal — michal.strnadel@slevomat.cz</p>
      <p><strong>Author:</strong> Alexandr Hudeček &amp; Slevomat team</p>
    </div>
  `,
};

export const AIDesignIntegration: Story = {
  name: 'AI & Figma integration',
  render: () => html`
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1 style="font-size:2rem;margin-bottom:.5rem">AI &amp; Figma Integration</h1>
      <p>Mini*S is designed with <strong>AI-first documentation</strong> — structured prompts and instruction sets that enable AI agents (Cursor, Claude Code, GitHub Copilot, etc.) to generate consistent, design-system-compliant code.</p>
      <p>Connect Figma directly to Claude Code so you can reference live designs in AI prompts — extract tokens, generate components, and keep code in sync with design without manual copy-paste.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Figma MCP Setup</h2>
      <p><strong>1. Install Claude Code CLI</strong></p>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>brew install --cask claude-code</code></pre>

      <p><strong>2. Add the Figma MCP server</strong></p>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>claude mcp add --transport http figma https://mcp.figma.com/mcp --scope user</code></pre>

      <p><strong>3. Authenticate</strong></p>
      <ul>
        <li>Start a Claude Code session: <code>claude</code></li>
        <li>Type <code>/mcp</code> → select <strong>Figma</strong> → <strong>Authenticate</strong> → <strong>Allow Access</strong> in the browser</li>
        <li>Type <code>/mcp</code> again to confirm "Connected to figma"</li>
      </ul>
      <p><em>Tip: In Figma, right-click any frame or component → <strong>Copy link to selection</strong> to get a URL you can paste directly into your AI prompt.</em></p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Example AI Prompts</h2>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code># Extract design tokens from a Figma file
"Extract all color and spacing tokens from this Figma file and compare with our existing tokens: https://www.figma.com/..."

# Generate a component from a Figma frame
"Generate a Lit web component for this button variant: https://www.figma.com/..."

# Sync check
"What CSS variables are missing in our tokens to match this design: https://www.figma.com/..."

# In Cursor or Claude Code
"Create a login form using Mini*S components and tokens"</code></pre>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>AI Prompts Library</h2>
      <p>Every component has a matching <code>docs/ai-prompts/components/&lt;name&gt;.md</code> — the authoritative AI reference with API table, slots, real token names, usage examples, a11y notes, and a copy-paste prompt.</p>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Folder</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Contents</th>
        </tr></thead>
        <tbody>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>docs/ai-prompts/components/</code></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Individual UI elements — props, variants, usage examples</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>docs/ai-prompts/patterns/</code></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Composable UI patterns combining multiple components</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>docs/ai-prompts/templates/</code></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Full page layouts and structures</td></tr>
        </tbody>
      </table>

      <h2>How AI Agents Use Mini*S</h2>
      <ol>
        <li><strong>Load context</strong> — AI reads the relevant <code>.md</code> instruction file</li>
        <li><strong>Understand tokens</strong> — AI learns available design tokens and CSS variables</li>
        <li><strong>Generate code</strong> — AI produces code that follows Mini*S conventions</li>
        <li><strong>Stay consistent</strong> — All generated code uses the same token system</li>
      </ol>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Project Structure</h2>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>minis-design-system/
├── packages/
│   ├── tokens/          # Design tokens (CSS)
│   ├── icons/           # SVG icon library (@minis/icons)
│   └── components/      # Web Components (Lit)
├── apps/
│   └── storybook/       # Interactive documentation
└── docs/
    ├── ai-prompts/      # AI agent instructions &amp; prompts
    └── examples/        # Working code examples</code></pre>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <p>
        <a href="https://slevomat.github.io/minis-design-system" style="color:var(--color-interaction-primary-surface,#006eb9)">Live Storybook</a> ·
        <a href="https://github.com/slevomat/minis-design-system" style="color:var(--color-interaction-primary-surface,#006eb9)">GitHub</a> ·
        <a href="https://github.com/slevomat/figma-plugins" style="color:var(--color-interaction-primary-surface,#006eb9)">Figma Plugins</a>
      </p>
      <p><strong>Head of Design:</strong> Michal — michal.strnadel@slevomat.cz</p>
      <p><strong>Author:</strong> Alexandr Hudeček &amp; Slevomat team</p>
    </div>
  `,
};

const changelogHTML = `
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1 style="font-size:2rem;margin-bottom:.25rem">Changelog</h1>
      <p style="color:var(--color-text-secondary,#666);margin-top:0">Notable changes to Mini*S components and tokens, newest first.</p>

      <style>
        .cl-heading { display:flex; align-items:center; gap:.5rem; }
        .cl-copy-btn {
          display:inline-flex; align-items:center; gap:.3rem;
          background:none; border:1px solid var(--color-border,#cbccce);
          border-radius:4px; padding:.15rem .5rem; cursor:pointer;
          font-size:.75rem; color:var(--color-text-secondary,#666);
          opacity:0; transition:opacity 100ms ease;
          white-space:nowrap;
        }
        .cl-heading:hover .cl-copy-btn { opacity:.6; }
        .cl-copy-btn:hover { opacity:1 !important; }
        .cl-copy-btn svg { flex-shrink:0; }
      </style>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-05-14 (new component: checkbox)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-05-14" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-05-14</h2>
        <button class="cl-copy-btn" data-anchor="2026-05-14">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-checkbox&gt;</code>
      </h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:0;padding-left:1.25rem">
          <li><strong>New component</strong> — binary selection input with <code>checked</code> / <code>disabled</code> props, optional label slot, and a <code>change</code> event firing <code>{ checked }</code>.</li>
          <li>Initial states: unchecked &amp; checked, each with a hover variant. More states (indeterminate, error) will follow.</li>
          <li>Storybook reorganized — checkbox lives under <code>Components / Inputs / Checkbox</code>.</li>
          <li>AI prompt doc added at <code>docs/ai-prompts/components/checkbox.md</code>.</li>
        </ul>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-04-24 (button corner radius → md 8px)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-04-24" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-04-24</h2>
        <button class="cl-copy-btn" data-anchor="2026-04-24">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <!-- minis-button -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-button&gt;</code>
      </h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:0;padding-left:1.25rem">
          <li><strong>Updated</strong> <code>--button-border-radius</code> from <code>--border-radius-sm</code> (4px) to <code>--border-radius-md</code> (8px)</li>
        </ul>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-04-02 (card-grid rows property, button icon sizing)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-04-02" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-04-02</h2>
        <button class="cl-copy-btn" data-anchor="2026-04-02">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="font-size:1rem;margin-bottom:.25rem">Card Grid</h3>
      <ul>
        <li>Merged <code>navigation-small-3</code> variant into <code>navigation-small</code> — removed standalone variant in favour of a <code>rows</code> attribute</li>
        <li>New property <code>rows</code> (number, reflected) — controls row count for <code>navigation-small</code>: <code>rows="2"</code> (default, 8 slots) or <code>rows="3"</code> (12 slots)</li>
        <li>Playground story dynamically renders the correct number of slots based on selected variant and rows</li>
        <li>AI prompt doc updated with new API and travel-themed Unsplash placeholder images</li>
      </ul>
      <h3 style="font-size:1rem;margin-top:.5rem">Button</h3>
      <ul>
        <li><strong>Updated</strong> icon sizing tokens — each button size now has its own dedicated icon size instead of a shared value for md/lg/xl</li>
        <li><code>sm</code> → 16px (unchanged), <code>md</code> → 20px (was 24px), <code>lg</code> → 22px (was 24px), <code>xl</code> → 24px (unchanged)</li>
        <li><strong>New token</strong> <code>--button-icon-sizing-lg</code> (24px)</li>
        <li><strong>Changed</strong> <code>--button-icon-sizing-sm</code> 18→20px, <code>--button-icon-sizing-md</code> 20→22px</li>
        <li>Icon sizing tokens now exported to <code>tokens.css</code></li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-03-20 (topbar rename, full nav list)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-03-20" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-03-20</h2>
        <button class="cl-copy-btn" data-anchor="2026-03-20">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="font-size:1rem;margin-bottom:.25rem">Topbar <span style="font-weight:400;color:var(--color-text-secondary,#666)">(renamed from Header)</span></h3>
      <ul>
        <li>Renamed <code>&lt;minis-header&gt;</code> → <code>&lt;minis-topbar&gt;</code> for semantic clarity — it is a brand identity bar (logo, shortcuts, cart), not a generic page header</li>
        <li>CSS tokens renamed: <code>--header-height</code> → <code>--topbar-height</code>, <code>--header-actions-gap</code> → <code>--topbar-actions-gap</code></li>
        <li>AI prompt doc moved: <code>components/header.md</code> → <code>components/topbar.md</code></li>
        <li>All layout docs updated to <code>&lt;minis-topbar&gt;</code> with the full 11-item Slevomat category navigation list</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-03-19 (card-grid, tag icon-only, button sizes)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-03-19" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-03-19</h2>
        <button class="cl-copy-btn" data-anchor="2026-03-19">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <!-- layouts -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">Layouts (AI Prompt Docs)</code>
        <span style="background:var(--color-interaction-primary-surface,#006eb9);color:#fff;font-size:.7rem;padding:.15rem .5rem;border-radius:9999px;font-weight:600">NEW</span>
      </h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li><strong>New <code>docs/ai-prompts/layouts/</code> directory</strong> — layout instructions for AI agents to vibe-code responsive pages.</li>
          <li><strong>Layout system overview</strong> — breakpoint tiers, spacing tokens, 12-col grid, container primitives, page structure pattern.</li>
          <li><strong>Deal detail layout</strong> — hotel/experience page: header band, photo gallery, tabbed navigation, aside + main content grid, responsive mobile stacking, complete page skeleton.</li>
          <li><strong>Checkout (Košík) layout</strong> — single-column flow with <code>&lt;minis-container variant="narrow"&gt;</code>, step tabs, stacked cards.</li>
        </ul>
      </div>

      <!-- minis-header -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-header&gt;</code>
        <span style="background:var(--color-interaction-primary-surface,#006eb9);color:#fff;font-size:.7rem;padding:.15rem .5rem;border-radius:9999px;font-weight:600">NEW</span>
      </h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li><strong>New component</strong> — main brand bar (64px) with <code>logo</code> slot (left) and <code>actions</code> slot (right).</li>
          <li>Slot-based layout — use <code>&lt;minis-button&gt;</code> elements in the <code>actions</code> slot.</li>
          <li>Figma buttons mapped: <code>variant="tertiary" size="sm"</code> for secondary actions, <code>variant="cta-buy"</code> for cart.</li>
          <li><strong>Fix:</strong> stories import corrected from broken relative path to <code>@minis/icons</code>.</li>
          <li><strong>Fix:</strong> logo replaced with real Slevomat wordmark SVG — previous version used reconstructed icon paths with <code>currentColor</code>.</li>
          <li><strong>Fix:</strong> Košík (<code>cta-buy</code>) button given <code>size="sm"</code> to match the tertiary action buttons.</li>
          <li><strong>Fix:</strong> <code>::slotted([slot="actions"])</code> gets <code>display: flex !important</code> so all action buttons align on the same vertical axis — <code>!important</code> is required because <code>::slotted()</code> in a parent shadow tree has lower precedence than <code>:host</code> styles in the slotted element's own shadow tree.</li>
        </ul>
      </div>

      <!-- minis-container -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-container&gt;</code>
        <span style="background:var(--color-interaction-primary-surface,#006eb9);color:#fff;font-size:.7rem;padding:.15rem .5rem;border-radius:9999px;font-weight:600">NEW</span>
      </h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li><strong>New component</strong> — responsive layout wrapper that applies <code>--container-*</code> tokens for max-width, horizontal padding (8→16→32px), and auto centering.</li>
          <li><code>narrow</code> variant — uses <code>--container-narrow-width</code> and <code>--container-narrow-padding</code> for narrower content areas.</li>
          <li>No internal media queries — responsive behaviour comes from the token layer.</li>
          <li><strong>Fix:</strong> container widths corrected — <code>100000px</code> Figma placeholder replaced with <code>100%</code> on mobile, <code>752px</code> narrow from 768px+, <code>1240px</code> default from 1256px+.</li>
        </ul>
      </div>

      <!-- minis-card-grid -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-card-grid&gt;</code>
        <span style="background:var(--color-interaction-primary-surface,#006eb9);color:#fff;font-size:.7rem;padding:.15rem .5rem;border-radius:9999px;font-weight:600">NEW</span>
      </h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li><strong>New component</strong> — responsive CSS-grid layout wrapper for cards and images. Pure layout — slot any content.</li>
          <li><code>navigation</code> — 4-col grid, item 1 featured (2-col), item 6 wide (2-col); mobile: horizontal scroll strip.</li>
          <li><code>navigation-small</code> — uniform 4-col grid, row count from slot count (8 items = 2 rows, 12 = 3 rows); same mobile behaviour.</li>
          <li><code>photogallery</code> — asymmetric 5-col layout: large main photo left, wide image top-right, two small thumbnails bottom-right; mobile: only main photo shown.</li>
        </ul>
      </div>

      <!-- minis-tag -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-tag&gt;</code>
        <span style="background:var(--color-interaction-primary-surface,#006eb9);color:#fff;font-size:.7rem;padding:.15rem .5rem;border-radius:9999px;font-weight:600">NEW</span>
      </h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li><strong><code>icon-only</code> attribute on <code>toggle</code> variant</strong> — hides the label and renders the tag as a square icon button. Useful for compact favourite/like buttons in tight layouts.</li>
        </ul>
      </div>

      <!-- minis-button -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-button&gt;</code>
        <span style="background:var(--color-gold-45,#c89a00);color:#fff;font-size:.7rem;padding:.15rem .5rem;border-radius:9999px;font-weight:600">BREAKING</span>
      </h3>
      <div style="border-left:3px solid var(--color-gold-45,#c89a00);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li><strong>Font size per size</strong> — <code>sm</code> uses <code>--typography-size-sm</code> (14px); <code>md</code>, <code>lg</code>, <code>xl</code> use <code>--typography-size-md</code> (16px).</li>
          <li><strong>Size values renamed</strong> — <code>small</code> → <code>sm</code>, <code>medium</code> → <code>md</code>, <code>large</code> → <code>lg</code> to align with design system conventions.</li>
          <li><strong>New size <code>xl</code></strong> (48px height) — use for prominent hero CTAs.</li>
          <li><strong>Heights adjusted</strong>: <code>sm</code> 24px · <code>md</code> 32px · <code>lg</code> 40px · <code>xl</code> 48px.</li>
          <li>Icon-only variant uses height token for width (square) at all sizes.</li>
          <li>Default size changed from <code>medium</code> to <code>md</code>.</li>
        </ul>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-03-13 (navigation)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-03-13-nav" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-03-13</h2>
        <button class="cl-copy-btn" data-anchor="2026-03-13-nav">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <!-- minis-navigation + minis-navigation-item -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-navigation&gt; &amp; &lt;minis-navigation-item&gt;</code>
        <span style="background:var(--color-interaction-primary-surface,#006eb9);color:#fff;font-size:.7rem;padding:.15rem .5rem;border-radius:9999px;font-weight:600">NEW</span>
      </h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li><strong>New components</strong> — horizontal scrollable navigation bar based on slevomat.cz production patterns.</li>
          <li><code>&lt;minis-navigation&gt;</code> — wrapper with two variants:
            <ul style="margin:.25rem 0;padding-left:1.5rem">
              <li><code>horizontal</code> — top-level category nav bar (homepage menu)</li>
              <li><code>tabs</code> — product detail tab switcher (Nabídka / Hodnocení / O hotelu)</li>
            </ul>
          </li>
          <li><code>&lt;minis-navigation-item&gt;</code> — individual item:
            <ul style="margin:.25rem 0;padding-left:1.5rem">
              <li>Renders <code>&lt;a&gt;</code> when <code>href</code> is set, <code>&lt;button&gt;</code> otherwise</li>
              <li><code>active</code> — blue underline (2px) + bold text for the current page/tab</li>
              <li><code>color="positive"</code> — green accent: icon is green at rest; text + underline turn green on hover and active</li>
            </ul>
          </li>
          <li>Icon slot (20×20px) for leading icons.</li>
          <li><code>actions</code> slot for right-aligned content (e.g. <code>&lt;minis-tag variant="toggle"&gt;</code> favourite).</li>
          <li>Horizontal overflow scroll with hidden scrollbar.</li>
          <li><strong>No layout shift on active</strong>: label reserves bold width via CSS <code>::after</code> ghost — sibling items never move when active changes.</li>
          <li>Typography: Inter, 16px, no horizontal padding on items.</li>
        </ul>
      </div>

      <!-- Tokens -->
      <h3 style="font-size:1rem;margin:.75rem 0 .25rem">Tokens</h3>
      <div style="border-left:3px solid var(--color-border,#cbccce);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li>Navigation tokens added: <code>--navigation-gap</code>, <code>--navigation-border-color</code>, <code>--navigation-item-padding-y</code>, <code>--navigation-item-gap</code>, <code>--navigation-item-icon-size</code>, <code>--navigation-item-accent</code>, <code>--navigation-item-active-accent</code>, <code>--navigation-item-active-border-color</code>, <code>--navigation-item-active-border-width</code>, <code>--navigation-item-hover-border-color</code>.</li>
        </ul>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-03-13 (tag)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-03-13-tag" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-03-13</h2>
        <button class="cl-copy-btn" data-anchor="2026-03-13-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <!-- minis-tag -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-tag&gt;</code>
        <span style="background:var(--color-interaction-primary-surface,#006eb9);color:#fff;font-size:.7rem;padding:.15rem .5rem;border-radius:9999px;font-weight:600">NEW</span>
      </h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li><strong>New component</strong> — compact pill-shaped label with four variants:</li>
          <ul style="margin:.25rem 0;padding-left:1.5rem">
            <li><code>static</code> — read-only label/badge, no interaction</li>
            <li><code>clickable</code> — triggers a lightweight action (open modal/tooltip); returns to default state after click</li>
            <li><code>toggle</code> — persists pressed/unpressed state, fires <code>toggle</code> event; icon typically switches outline ↔ filled (e.g. <code>heart</code> ↔ <code>heart-fill</code>)</li>
            <li><code>dismissible</code> — applied filter with built-in ✕ button; fires <code>dismiss</code> event</li>
          </ul>
          <li>Fixed height <code>32px</code>; typography fully inherited from context.</li>
          <li>Icon sizes: <code>20×20px</code> for static/clickable/dismissible, <code>24×24px</code> for toggle.</li>
          <li><code>pressed</code> boolean attribute for pre-selected toggle state (<code>toggle</code> variant only).</li>
          <li><code>disabled</code> boolean attribute (<code>clickable</code> and <code>toggle</code> variants).</li>
          <li>All colours via <code>--color-interaction-secondary-*</code> tokens — light/dark mode automatic.</li>
          <li><strong>Padding tokens aligned with Figma</strong>: <code>--tag-padding-x</code> (8px with icon), <code>--tag-padding-x-noicon</code> (16px label-only), <code>--tag-padding-y</code> (0px) — padding switches automatically via <code>.tag--has-icon</code> class.</li>
          <li><strong>Dismiss button</strong>: replaced hand-rolled <code>&lt;button&gt;</code> with <code>&lt;minis-button variant="tertiary" size="small" icon-only&gt;</code> — inherits full tertiary button styling, hover, and focus states.</li>
        </ul>
      </div>

      <!-- tokens -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">Tokens</code>
      </h3>
      <div style="border-left:3px solid var(--color-border,#cbccce);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li>Tag component tokens added: <code>--tag-height</code>, <code>--tag-padding-x</code>, <code>--tag-padding-y</code>, <code>--tag-gap-elements</code>, <code>--tag-icon-size</code>, <code>--tag-toggle-icon-size</code>.</li>
          <li>Tag tokens updated from Figma: <code>--tag-padding-x</code> 8px (with icon); new <code>--tag-padding-x-noicon</code> 16px (label only); <code>--tag-padding-y</code> 0px; <code>--tag-gap-elements</code> 4px; new <code>--tag-gap-icon-correction</code> 2px.</li>
        </ul>
      </div>

      <!-- storybook -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">Storybook</code>
      </h3>
      <div style="border-left:3px solid var(--color-border,#cbccce);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li><strong>Story source panel:</strong> added <code>docs.source.excludeDecorators: true</code> globally in <code>preview.ts</code> — decorator wrapper div no longer appears in "Show code" examples, so users see only the component markup when copying code snippets.</li>
        </ul>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-03-12
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-03-12" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-03-12</h2>
        <button class="cl-copy-btn" data-anchor="2026-03-12">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <!-- minis-button -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-button&gt;</code>
      </h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li><strong>Size fallback:</strong> <code>size</code> property now normalises invalid or missing values to <code>'medium'</code> via a setter; attribute is reflected so CSS selectors always match a valid value.</li>
        </ul>
      </div>

      <!-- minis-message -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-message&gt;</code>
      </h3>
      <div style="border-left:3px solid var(--color-border,#cbccce);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li><strong>Vertical layout redesign:</strong> replaced column-flex + absolute-positioned close button with a proper flex-row structure — visual left, body column right (<code>.header</code> row: title + close button; description below).</li>
          <li><strong>Close button alignment:</strong> <code>.header</code> uses <code>align-items: flex-start</code> so the close button aligns with the top of the title text.</li>
          <li><strong>Bug fix:</strong> close button was using invalid <code>size="md"</code> — corrected to <code>size="medium"</code>.</li>
        </ul>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-03-07
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-03-07" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-03-07</h2>
        <button class="cl-copy-btn" data-anchor="2026-03-07">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <!-- minis-button -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-button&gt;</code>
      </h3>

      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li><strong>Accessibility fix:</strong> <code>aria-label</code>, <code>aria-labelledby</code>, and <code>aria-describedby</code> set on <code>&lt;minis-button&gt;</code> are now forwarded to the inner <code>&lt;button&gt;</code> element — screen readers correctly announce icon-only buttons.</li>
          <li><strong>Accessibility fix:</strong> In <code>icon-only</code> mode the label slot is now visually hidden instead of removed from the DOM, preserving slotted text in the accessibility tree.</li>
          <li>Host element receives <code>role="none"</code> to prevent a redundant button role announcement from the custom element wrapper.</li>
        </ul>
      </div>

      <!-- minis-alert -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-alert&gt;</code>
      </h3>

      <div style="border-left:3px solid var(--color-border,#cbccce);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li>Typography updated to use design tokens: <code>--typography-font-family-sans</code> (Inter), <code>--typography-weight-regular</code>, <code>--typography-line-height-percentage-133%</code> (1.33)</li>
          <li>Icon optical alignment: when icon is visible, content gets <code>margin-top/bottom: var(--pixel-px-3)</code> (3px) via <code>.icon ~ .content</code> selector</li>
          <li>Storybook docs page: added Figma link (node-id <code>2513-8007</code>), consistent with Button and Pill Counter</li>
        </ul>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-03-06
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-03-06" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-03-06</h2>
        <button class="cl-copy-btn" data-anchor="2026-03-06">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <!-- minis-button -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-button&gt;</code>
      </h3>

      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <p style="margin:.25rem 0 .5rem"><strong>Size naming aligned to design system convention</strong>
          <span style="display:inline-block;background:var(--color-surface-faded,#f1f3f5);border:1px solid var(--color-border,#cbccce);border-radius:4px;font-size:.75rem;padding:.1rem .4rem;margin-left:.5rem;vertical-align:middle">Breaking change</span>
        </p>
        <p style="margin:.25rem 0">The <code>size</code> attribute values have been renamed for consistency across all Mini*S components:</p>
        <table style="width:100%;border-collapse:collapse;margin:.75rem 0;font-size:.9rem">
          <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
            <th style="padding:.5rem .75rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Before</th>
            <th style="padding:.5rem .75rem;text-align:left;border:1px solid var(--color-border,#cbccce)">After</th>
            <th style="padding:.5rem .75rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Height</th>
          </tr></thead>
          <tbody>
            <tr><td style="padding:.5rem .75rem;border:1px solid var(--color-border,#cbccce)"><code>sm</code></td><td style="padding:.5rem .75rem;border:1px solid var(--color-border,#cbccce)"><code>small</code></td><td style="padding:.5rem .75rem;border:1px solid var(--color-border,#cbccce)">22px</td></tr>
            <tr><td style="padding:.5rem .75rem;border:1px solid var(--color-border,#cbccce)"><code>md</code> (default)</td><td style="padding:.5rem .75rem;border:1px solid var(--color-border,#cbccce)"><code>medium</code> (default)</td><td style="padding:.5rem .75rem;border:1px solid var(--color-border,#cbccce)">34px</td></tr>
            <tr><td style="padding:.5rem .75rem;border:1px solid var(--color-border,#cbccce)"><code>lg</code></td><td style="padding:.5rem .75rem;border:1px solid var(--color-border,#cbccce)"><code>large</code></td><td style="padding:.5rem .75rem;border:1px solid var(--color-border,#cbccce)">44px</td></tr>
          </tbody>
        </table>
        <p style="margin:.25rem 0 .75rem"><strong>Migrate:</strong> find-replace <code>size="sm"</code> → <code>size="small"</code>, <code>size="md"</code> → <code>size="medium"</code>, <code>size="lg"</code> → <code>size="large"</code>.</p>
      </div>

      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <p style="margin:.25rem 0 .5rem"><strong>Typography tokens applied to button text</strong></p>
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li><code>font-family</code> now uses <code>--typography-font-family-sans</code> (Inter)</li>
          <li><code>font-weight</code> now uses <code>--typography-weight-semibold</code> (600)</li>
          <li><code>font-size</code> uses <code>--typography-size-sm</code> (14px) — all sizes</li>
          <li><code>line-height</code> uses <code>--typography-line-height-percentage-100%</code> (1) — replaces hardcoded 20px</li>
        </ul>
      </div>

      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <p style="margin:.25rem 0 .5rem"><strong>Explicit height per size</strong></p>
        <p style="margin:.25rem 0 .75rem">Each size now enforces a fixed height via token or raw value (<code>small</code>: <code>--pixel-px-22</code> · <code>medium</code>: <code>--fibonachi-sp-fib-8</code> · <code>large</code>: <code>44px</code>), so button dimensions are predictable regardless of content.</p>
      </div>

      <!-- minis-pill-counter -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-pill-counter&gt;</code>
      </h3>

      <div style="border-left:3px solid var(--color-border,#cbccce);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <p style="margin:.25rem 0 .75rem">No API change. Button now passes the correct new size strings internally — pill sizes are still chosen automatically.</p>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-03-05
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-03-05" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-03-05</h2>
        <button class="cl-copy-btn" data-anchor="2026-03-05">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <!-- minis-button -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-button&gt;</code>
      </h3>

      <div style="border-left:3px solid var(--color-border,#cbccce);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li>Added counter pill color overrides per variant (<code>--pill-counter-bg</code>, <code>--pill-counter-color</code>)</li>
          <li>Added Storybook stories: Playground, AllVariants, AllSizes, IconOnly, LabelOnly, CounterPill, States, VariantsAndStates</li>
          <li>Updated AI prompt doc (<code>docs/ai-prompts/components/button.md</code>)</li>
        </ul>
      </div>

      <!-- minis-pill-counter -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-pill-counter&gt;</code>
      </h3>

      <div style="border-left:3px solid var(--color-border,#cbccce);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li>Sizes: <code>md</code> 15×15px · <code>sm</code> 11×11px · <code>xs</code> 8×8px</li>
          <li>Single digit → circle, multi-digit → capsule</li>
          <li>Used inside <code>&lt;minis-button&gt;</code> — floating (icon-only) or inline (label) mode</li>
        </ul>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-03-03
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-03-03" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-03-03</h2>
        <button class="cl-copy-btn" data-anchor="2026-03-03">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <!-- minis-button -->
      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-button&gt;</code>
      </h3>

      <div style="border-left:3px solid var(--color-border,#cbccce);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:.25rem 0 .75rem;padding-left:1.5rem">
          <li>Initial implementation imported from Figma — variants, sizes, icon slot, disabled state, transparent backdrop-filter</li>
          <li>AI prompt doc created</li>
        </ul>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <p style="color:var(--color-text-secondary,#666);font-size:.875rem">
        All changes are reflected in <a href="https://github.com/slevomat/minis-design-system" style="color:var(--color-interaction-primary-surface,#006eb9)">GitHub</a> and the <code>docs/ai-prompts/components/</code> instruction files.
      </p>
    </div>
`;

export const Changelog: Story = {
  name: 'Changelog',
  render: () => {
    const root = document.createElement('div');
    root.innerHTML = changelogHTML;

    // Wire up copy-link buttons
    root.querySelectorAll<HTMLButtonElement>('button[data-anchor]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-anchor')!;
        const url = `${window.location.origin}${window.location.pathname}?path=/story/introduction--changelog#${id}`;
        navigator.clipboard.writeText(url).then(() => {
          const label = btn.querySelector('.copy-label')!;
          label.textContent = 'Copied!';
          btn.style.opacity = '1';
          setTimeout(() => {
            label.textContent = 'Copy link';
            btn.style.opacity = '';
          }, 1500);
        });
      });
    });

    return root;
  },
};

export const VibeCodingGuide: Story = {
  name: 'Vibe Coding Guide',
  render: () => html`
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1 style="font-size:2rem;margin-bottom:.5rem">Vibe Coding Guide</h1>
      <p>Build fully functional page prototypes using Mini*S components and an AI coding assistant — <strong>no coding experience required</strong>. You describe what you want in natural language, and the AI writes the HTML and CSS for you.</p>

      <blockquote style="border-left:4px solid var(--color-interaction-primary-surface,#006eb9);padding:.5rem 1rem;margin:1rem 0;background:var(--color-surface-faded,#f1f3f5)">
        <strong>What is vibe coding?</strong> You use an AI tool (Claude Code, Cursor) to generate code by describing the design you want. The AI knows all Mini*S components, tokens, and layout patterns — you just tell it what to build.
      </blockquote>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!--  PART 1 — QUICK START                                        -->
      <!-- ═══════════════════════════════════════════════════════════════ -->

      <h2>Quick Start (5 minutes)</h2>
      <p>Get a working prototype running in three steps.</p>

      <h3>Step 1 — Prerequisites</h3>
      <p>You need two things installed on your machine:</p>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Tool</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">What it does</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Install</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Node.js</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Runs the dev server</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><a href="https://nodejs.org" style="color:var(--color-interaction-primary-surface,#006eb9)">nodejs.org</a> (LTS version)</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>pnpm</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Installs dependencies</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>npm install -g pnpm</code> (run in Terminal after installing Node.js)</td>
          </tr>
        </tbody>
      </table>
      <p>You also need an AI coding tool — pick one:</p>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Tool</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Best for</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Link</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Claude Code</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Terminal-based, runs in your project directory, reads CLAUDE.md automatically</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><a href="https://docs.anthropic.com/en/docs/claude-code" style="color:var(--color-interaction-primary-surface,#006eb9)">docs.anthropic.com</a></td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Cursor</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Visual editor with AI chat sidebar, good for seeing code + preview side by side</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><a href="https://cursor.com" style="color:var(--color-interaction-primary-surface,#006eb9)">cursor.com</a></td>
          </tr>
        </tbody>
      </table>

      <h3>Step 2 — Scaffold the project</h3>
      <p>Open Terminal, navigate to the design system repo, and run:</p>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code># Make sure packages are built first (one-time)
pnpm build

# Create your prototype project
pnpm create-prototype ~/prototypy/my-deal-page</code></pre>
      <p>This creates a complete project folder with all Mini*S components, tokens, icons, and AI documentation pre-loaded.</p>

      <h3>Step 3 — Start coding</h3>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>cd ~/prototypy/my-deal-page
pnpm install
pnpm dev</code></pre>
      <p>Open <code>http://localhost:5173</code> in your browser — you should see a page with the Slevomat topbar, navigation, and sample components. Now open the same folder in your AI tool and start describing what you want to build.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!--  PART 2 — COMPREHENSIVE TUTORIAL                             -->
      <!-- ═══════════════════════════════════════════════════════════════ -->

      <h2>Comprehensive Tutorial</h2>

      <h3>What you get in the project</h3>
      <p>The scaffolded project contains:</p>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">File / Folder</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Purpose</th>
        </tr></thead>
        <tbody>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>index.html</code></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Your page — edit this file to build your prototype</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>CLAUDE.md</code></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">AI context file — automatically read by Claude Code and Cursor. Contains component list, token reference, and page structure patterns.</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>public/vendor/</code></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Pre-built design system files (tokens CSS, components JS, icons JS). Don't edit these.</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>docs/ai-prompts/</code></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Detailed API docs for every component — the AI reads these to know exactly how each component works.</td></tr>
        </tbody>
      </table>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h3>How to talk to the AI</h3>
      <p>The AI understands natural language. You don't need to know HTML, CSS, or any code syntax. Here are examples of effective prompts:</p>

      <h4>Starting a page</h4>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>"Replace the sample content with a deal detail page. It should have:
- Photo gallery at the top (use placeholder images)
- Deal title and price
- A green CTA Buy button
- Description section with bullet points
- An info alert saying 'Limited time offer'"</code></pre>

      <h4>Modifying a section</h4>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>"Add a sidebar to the right of the main content.
Put a secondary button 'Add to favorites' with a heart icon,
and below it show 3 message cards with deal highlights."</code></pre>

      <h4>Styling and layout</h4>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>"Make the content area a two-column layout:
60% main content on the left, 40% sidebar on the right.
Add some spacing between sections.
Use the light grey background for the sidebar."</code></pre>

      <h4>Iterating quickly</h4>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>"The buttons are too close together — add more space between them."

"Change the alert from notice to success and update the text."

"Make the navigation item 'Cestovani' active instead of 'Extra slevy'."

"Remove the description section and replace it with a tab switcher
that has three tabs: Overview, Reviews, Location."</code></pre>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h3>Available Components</h3>
      <p>These are all the building blocks you can use. The AI knows them all — just describe what you need and reference component names if you want to be specific:</p>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Component</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">What it looks like</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Key variants</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Topbar</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Top blue logo bar with action buttons (favorites, cart)</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Slots: logo, actions</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Navigation</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Horizontal scrollable category nav or tab switcher</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>horizontal</code> (categories), <code>tabs</code> (tab switcher)</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Container</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Centered content wrapper with responsive padding</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>default</code> (wide), <code>narrow</code> (checkout-width)</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Button</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Clickable button with optional icon and counter badge</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>primary</code>, <code>secondary</code>, <code>tertiary</code>, <code>danger</code>, <code>cta-buy</code> (green)</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Tag</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Compact pill label/badge</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>static</code>, <code>clickable</code>, <code>toggle</code> (like/favourite), <code>dismissible</code></td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Alert</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Colored banner with icon for feedback messages</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>notice</code> (blue), <code>success</code> (green), <code>error</code> (red), <code>warning</code> (yellow)</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Message</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Notification card with image, title, description</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>vertical</code>, <code>horizontal</code> layout</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Icon</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">SVG icon from the icon library</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Set <code>name</code> (e.g. "heart-fill", "cart-fill", "star") and optional <code>size</code></td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Card Grid</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Responsive grid for cards</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>navigation</code> (featured), <code>navigation-small</code>, <code>photogallery</code></td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Pill Counter</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Small numeric badge (usually inside buttons)</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Sizes: <code>xs</code>, <code>sm</code>, <code>md</code></td>
          </tr>
        </tbody>
      </table>
      <p>Browse the <strong>Components</strong> section in this Storybook sidebar to see live interactive examples of each component.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h3>Page structure</h3>
      <p>Every Slevomat page follows a consistent structure. The AI already knows this, but it helps to understand the building blocks:</p>
      <div style="background:var(--color-surface-faded,#f1f3f5);padding:1.5rem;border-radius:8px;margin:1rem 0;font-family:monospace;font-size:14px;line-height:2">
        <div style="border:2px dashed var(--color-border,#cbccce);padding:8px 12px;margin-bottom:8px;border-radius:4px">
          <strong style="color:var(--color-interaction-primary-surface,#006eb9)">TOPBAR</strong> — Slevomat logo + Favorites + Cart
        </div>
        <div style="border:2px dashed var(--color-border,#cbccce);padding:8px 12px;margin-bottom:8px;border-radius:4px">
          <strong style="color:var(--color-interaction-primary-surface,#006eb9)">NAVIGATION</strong> — Extra slevy | Cestovani | Zazitky | ... | Benefity
        </div>
        <div style="border:2px dashed var(--color-border,#cbccce);padding:8px 12px;border-radius:4px">
          <strong style="color:var(--color-interaction-primary-surface,#006eb9)">CONTAINER</strong> — Your page content goes here
          <div style="border:1px dotted var(--color-border,#cbccce);padding:8px 12px;margin-top:8px;border-radius:4px;opacity:0.7">
            Headings, text, buttons, alerts, grids, cards...
          </div>
        </div>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h3>Tips for effective prompting</h3>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce);width:50%">Do</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce);width:50%">Don't</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top">Describe the <strong>layout</strong> you want: "two columns, sidebar on the right"</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top">Write HTML or CSS yourself — let the AI do it</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top">Reference <strong>component names</strong> when you know them: "add a cta-buy button"</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top">Worry about exact code syntax — the AI handles that</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top">Iterate in <strong>small steps</strong>: change one section at a time</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top">Try to describe an entire complex page in one prompt</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top">Ask the AI to <strong>"check the Storybook"</strong> for visual reference</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top">Edit files in <code>public/vendor/</code> — those are the design system source</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top">Say <strong>"undo that"</strong> or <strong>"go back"</strong> if something looks wrong</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top">Be afraid to experiment — nothing can break permanently</td>
          </tr>
        </tbody>
      </table>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h3>Adding more pages</h3>
      <p>Your prototype can have multiple pages. Ask the AI:</p>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>"Create a new page called checkout.html with the same header and navigation,
but use a narrow container and add tabs for Step 1, Step 2, Step 3."</code></pre>
      <p>The AI will create a new HTML file, copy the shared header structure, and update navigation links between pages.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h3>Working with Figma</h3>
      <p>If you have a Figma design you want to replicate:</p>
      <ol>
        <li>Share the Figma frame URL with the AI</li>
        <li>Ask: <em>"Build this design using Mini*S components. Use the Figma MCP to read the design."</em></li>
        <li>The AI will read the Figma frame and translate it into Mini*S components</li>
      </ol>
      <blockquote style="border-left:4px solid var(--color-interaction-primary-surface,#006eb9);padding:.5rem 1rem;margin:1rem 0;background:var(--color-surface-faded,#f1f3f5)">
        <strong>Note:</strong> This requires Figma MCP to be configured in your AI tool. Ask the design system team for setup help if needed.
      </blockquote>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h3>Troubleshooting</h3>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Problem</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Solution</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Components show as empty/unstyled boxes</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Check browser console for errors. The import map in <code>index.html</code> must be present. Ask the AI to fix it.</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>pnpm dev</code> fails</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Run <code>pnpm install</code> first. If that fails, check that Node.js and pnpm are installed.</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><code>create-prototype</code> says "Missing built packages"</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Run <code>pnpm build</code> in the design system repo first — the CLI copies built files.</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Colors or fonts look wrong</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Make sure the <code>&lt;link&gt;</code> tags for tokens CSS and Google Fonts are in the <code>&lt;head&gt;</code>. The template includes them by default.</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">The AI doesn't know a component</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Point it to the docs: <em>"Read docs/ai-prompts/components/button.md for the button API"</em></td>
          </tr>
        </tbody>
      </table>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h3>Example workflow</h3>
      <p>Here's a typical 15-minute session building a deal detail page:</p>
      <ol style="line-height:2">
        <li><strong>Scaffold:</strong> <code>pnpm create-prototype ~/prototypy/hotel-deal</code></li>
        <li><strong>Start:</strong> <code>cd ~/prototypy/hotel-deal && pnpm install && pnpm dev</code></li>
        <li><strong>Open AI tool</strong> in the project folder</li>
        <li><strong>Prompt:</strong> <em>"Replace the sample content with a hotel deal page. Show a big photo at the top, the hotel name, price with a green buy button, and a description."</em></li>
        <li><strong>Review</strong> in browser at localhost:5173</li>
        <li><strong>Refine:</strong> <em>"Add a tab switcher below the photo with tabs: Overview, Reviews, Map. Show the overview tab content by default."</em></li>
        <li><strong>Refine:</strong> <em>"Add a success alert at the top saying 'Last 3 vouchers available!'"</em></li>
        <li><strong>Refine:</strong> <em>"Make it look more like the Slevomat deal page — add a sidebar with the price card on the right."</em></li>
        <li><strong>Done!</strong> Share the HTML file or keep iterating.</li>
      </ol>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <p>
        <a href="https://slevomat.github.io/minis-design-system" style="color:var(--color-interaction-primary-surface,#006eb9)">Live Storybook</a> ·
        <a href="https://github.com/slevomat/minis-design-system" style="color:var(--color-interaction-primary-surface,#006eb9)">GitHub</a>
      </p>
      <p><strong>Need help?</strong> Ask the design system team or Head of Design: Michal — michal.strnadel@slevomat.cz</p>
    </div>
  `,
};

export const ContributionGuide: Story = {
  name: 'Contribution guide',
  render: () => html`
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1 style="font-size:2rem;margin-bottom:.5rem">Contribution Guide</h1>
      <p>Mini*S is a shared resource — maintained by designers and developers together. Whether you spotted an inconsistency, need a missing component, or want to improve documentation, your input is welcome. This guide applies to everyone using the system.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Before Proposing a Change</h2>
      <p>A few steps that save everyone time:</p>
      <ol>
        <li><strong>Check what already exists</strong> — Browse this Storybook and the Figma library. The component or token you need may already be there.</li>
        <li><strong>Validate the need</strong> — Is this a recurring pattern across multiple screens/features, or a one-off edge case? The DS prioritises recurring needs.</li>
        <li><strong>Align with your team first</strong> — Confirm the requirement has broader utility before escalating it as a DS change.</li>
      </ol>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Types of Contributions</h2>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Type</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Who</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">How</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>New component or variant</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Designer · Developer</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Raise with Head of Design. Provide a Figma frame or code prototype showing the intended behaviour.</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>New or changed token</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Designer · Developer</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Tokens must be agreed by both design and engineering — changes cascade across the entire system. Discuss before adding.</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Bug fix / code improvement</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Developer</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Open a PR against <code>master</code>. Include a Storybook story or screenshot demonstrating the fix.</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Documentation update</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Anyone</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Edit the relevant story or <code>docs/ai-prompts/</code> file and open a PR. No design review required for docs-only changes.</td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Feedback or question</strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Anyone</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Reach out to the Head of Design directly or raise it in your team's design-system channel.</td>
          </tr>
        </tbody>
      </table>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Checklist for Any Change</h2>
      <table style="border-collapse:collapse;width:100%;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Check</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Question</th>
        </tr></thead>
        <tbody>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">☐ <strong>No duplication</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Does an equivalent component, variant, or token already exist?</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">☐ <strong>Naming</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Does it follow the system's naming conventions (semantic, not descriptive)?</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">☐ <strong>Theme &amp; mode</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Does it work correctly in both light/dark mode and classic/gift theme?</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">☐ <strong>Design + code aligned</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Is the intent clear to both a designer and a developer?</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">☐ <strong>Documented</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Is the change reflected in the Storybook story and/or <code>docs/ai-prompts/</code>?</td></tr>
        </tbody>
      </table>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <p>
        <a href="https://slevomat.github.io/minis-design-system" style="color:var(--color-interaction-primary-surface,#006eb9)">Live Storybook</a> ·
        <a href="https://github.com/slevomat/minis-design-system" style="color:var(--color-interaction-primary-surface,#006eb9)">GitHub</a> ·
        <a href="https://github.com/slevomat/figma-plugins" style="color:var(--color-interaction-primary-surface,#006eb9)">Figma Plugins</a>
      </p>
      <p><strong>Head of Design:</strong> Michal — michal.strnadel@slevomat.cz</p>
      <p><strong>Author:</strong> Alexandr Hudeček &amp; Slevomat team</p>
    </div>
  `,
};
