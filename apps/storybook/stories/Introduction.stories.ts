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
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><a href="https://github.com/slevomat/figma-plugins/tree/master/minis-designtokens-exporter" target="_blank" rel="noopener" style="color:var(--color-interaction-primary-surface,#006eb9)"><strong>Mini*S design tokens exporter</strong></a></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">✅ Active</td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Simplifies exchange of design tokens between design and development</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><a href="https://github.com/slevomat/figma-plugins/tree/master/minis-heritage-cleaner" target="_blank" rel="noopener" style="color:var(--color-interaction-primary-surface,#006eb9)"><strong>Mini*S heritage cleaner</strong></a></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">⚠️ Deprecating</td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Removes Heritage layer, moves reference to description</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><a href="https://github.com/slevomat/figma-plugins/tree/master/minis-color-docs-generator" target="_blank" rel="noopener" style="color:var(--color-interaction-primary-surface,#006eb9)"><strong>Mini*S Color docs generator</strong></a></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">🚧 In progress</td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Generates palette swatch overview in a unified way</td></tr>
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

export const DesignPrinciples: Story = {
  name: 'Design Principles',
  render: () => html`
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1 style="font-size:2rem;margin-bottom:.5rem">Design Principles</h1>
      <p>A set of principles that express our shared vision of what makes Slevomat products great. They were created in-house during an internal workshop spanning design, product, engineering, brand and copy.</p>
      <blockquote style="border-left:4px solid var(--color-interaction-primary-surface,#006eb9);padding:.5rem 1rem;margin:1rem 0;background:var(--color-surface-faded,#f1f3f5)">
        <em>They stem from our own vision, reflect our customers' needs, and align with our tone of voice and visual style.</em>
      </blockquote>

      <nav style="margin:1.5rem 0;padding:1rem 1.25rem;background:var(--color-surface-faded,#f1f3f5);border:1px solid var(--color-border,#cbccce);border-radius:6px">
        <strong style="display:block;margin-bottom:.5rem">Contents</strong>
        <ol style="margin:0;padding-left:1.25rem">
          <li><a href="#proc" style="color:var(--color-interaction-primary-surface,#006eb9)">Why we need them</a></li>
          <li><a href="#princip-1" style="color:var(--color-interaction-primary-surface,#006eb9)">Usability and reliability as the baseline experience</a></li>
          <li><a href="#princip-2" style="color:var(--color-interaction-primary-surface,#006eb9)">Visual refinement</a></li>
          <li><a href="#princip-3" style="color:var(--color-interaction-primary-surface,#006eb9)">Clearly worth it</a></li>
          <li><a href="#princip-4" style="color:var(--color-interaction-primary-surface,#006eb9)">Experience without embellishment</a></li>
          <li><a href="#princip-5" style="color:var(--color-interaction-primary-surface,#006eb9)">We design the user journey, not just screens</a></li>
          <li><a href="#princip-6" style="color:var(--color-interaction-primary-surface,#006eb9)">We show direction and leave room to explore</a></li>
          <li><a href="#princip-7" style="color:var(--color-interaction-primary-surface,#006eb9)">Design that surprises</a></li>
          <li><a href="#pouziti" style="color:var(--color-interaction-primary-surface,#006eb9)">How to use them</a></li>
          <li><a href="#design-patterns" style="color:var(--color-interaction-primary-surface,#006eb9)">Design patterns (components)</a></li>
        </ol>
      </nav>

      <h2 id="proc" style="scroll-margin-top:1rem">Why we need them</h2>
      <p>Designing products requires fast decisions made constantly by many different people. To decide consistently — across design, engineering, product, copy and brand — we need a shared idea of what good design and a quality product mean to us.</p>
      <p>Our products won't feel consistent unless everyone works from the same understanding of what "quality" means.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2 id="princip-1" style="scroll-margin-top:1rem">#1 — Usability and reliability as the baseline experience</h2>
      <p><strong>What it means.</strong> Slevomat's design is intuitive; it guides users clearly, naturally and without needless thinking. Design isn't just about looks for us — above all it's about how well it works. The interface has to be usable, reliable and snappy on a train, at home on Wi-Fi, and on an older device alike. We stick to proven patterns and don't experiment at the expense of usability. Mobile is the baseline, but we keep desktop in mind too.</p>
      <p><strong>Why.</strong> Even the prettiest design means nothing when the page jumps around, loads slowly, or doesn't work as it should. Quality doesn't show through animation alone, but through everything working, making sense, and not letting users down at the moment that matters. Design must be clear, accessible and consistent — ready even for the moments when technology fails or the user just isn't at their best.</p>
      <p><strong>How you can tell in practice:</strong></p>
      <ul>
        <li>The interface loads fast and smoothly; nothing jumps around or disappears during interaction.</li>
        <li>Components behave consistently and predictably — what looks like a button behaves like a button.</li>
        <li>The design stays clear and usable even in tougher conditions (weak signal, smaller screen).</li>
        <li>Critical situations are handled with fallbacks; clear error messages, skeletons and loading states keep the user in context.</li>
        <li>Everything important works equally well on mobile and desktop, without needing a manual or support.</li>
        <li><strong>We meet accessibility standards</strong> — sufficient colour contrast (WCAG AA), legibility in poor conditions, keyboard and screen-reader support, and consideration for users with motor or visual needs.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2 id="princip-2" style="scroll-margin-top:1rem">#2 — Visual refinement (even a rich offering can look clear)</h2>
      <p><strong>What it means.</strong> Slevomat's design works with a rich offering, yet never feels cluttered. Even varied content can stay clear when handled with care and judgement. This isn't austere minimalism, but visual refinement — we're a colourful service, but we don't come across like a flashing flyer. We show what matters at the right time and in a way that feels clear even to someone just getting to know us. Every word, button and card is written with care and respect for people's attention.</p>
      <p><strong>Why.</strong> In a world full of noise, the design that wins is the one that helps rather than distracts. Refinement, good copy and visual harmony make orientation easier for everyone — from the digitally fluent to the less confident. Even a rich offering can be understandable and easy to grasp. Users move through the service without stress and without needing a manual.</p>
      <p><strong>How you can tell in practice:</strong></p>
      <ul>
        <li>We show only what truly matters at a given moment; we add the rest only when it genuinely makes sense.</li>
        <li>Texts are understandable and speak the language of an ordinary person, not advertising newspeak.</li>
        <li>The interface structure matches how people think — we don't push them down a path, we guide them naturally.</li>
        <li>Even with a lot to offer, we feel clear thanks to a strong visual hierarchy and consistency across the whole interface.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2 id="princip-3" style="scroll-margin-top:1rem">#3 — Clearly worth it</h2>
      <p><strong>What it means.</strong> With us, it's always clear why something is worth it. Value is key and has its place in the design, but it doesn't have to shout. The user quickly grasps why an offer is a good deal — whether it's the price, a bundle, a benefit or a time-limited promotion. We help them easily recognise what delivers the most value, without overwhelm and without pressure. We present good deals legibly, clearly, and in the context of the whole journey.</p>
      <p><strong>Why.</strong> On Slevomat, people naturally expect a smart purchase. When the value stands out at first glance, trust grows, decisions get shorter, and users don't have to look elsewhere. They don't need to switch between tabs or verify whether it's cheaper somewhere else. They see that with us it makes sense. We help people decide quickly, with confidence and without doubt.</p>
      <p><strong>How you can tell in practice:</strong></p>
      <ul>
        <li>It's obvious at first glance why an offer is worth it — be it the price, a combination of services, or added value.</li>
        <li>We use visual accents (tags, icons, highlights) that draw attention to the best choices, without pressure.</li>
        <li>We communicate offers fairly, clearly and without tricks — including bundles, time-limited promotions or add-on benefits.</li>
        <li>Users feel they don't need to look anything up elsewhere. The value is evident, trustworthy and understandable.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2 id="princip-4" style="scroll-margin-top:1rem">#4 — Experience without embellishment (authentic design you can trust)</h2>
      <p><strong>What it means.</strong> We build design on truthfulness and openness. We show things as they really are — whether it's a photo, text, or the overall impression of an experience. We believe trust grows where we embellish nothing and promise no more than we can deliver. The very first contact with the content should feel like an invitation into a real experience, not a marketing bubble.</p>
      <p><strong>Why.</strong> Trust isn't something you can design in a single decision — it's built in every detail. Authenticity, tone, visuals and the atmosphere of the interface together shape whether a person believes what they see. We want them to be sure that what they're choosing matches reality, and that Slevomat speaks straight.</p>
      <p><strong>How you can tell in practice:</strong></p>
      <ul>
        <li>We choose photos and 3D illustrations so they naturally evoke the atmosphere of a real experience — without exaggeration, but visually appealing.</li>
        <li>Texts describe reality, not dreams; we'd rather admit a limitation than promise something that won't come true.</li>
        <li>Ratings, reviews and others' experiences are easily accessible and become a natural part of decision-making.</li>
        <li>The whole design inspires trust — from visuals through tone of voice to the small details that confirm we stand behind what we offer.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2 id="princip-5" style="scroll-margin-top:1rem">#5 — We design the user journey, not just screens</h2>
      <p><strong>What it means.</strong> Our design starts from understanding what people really need and the situation they're in. Whether they came for inspiration, comparison or to buy right away, we create an environment that makes sense to them in that moment, at their own pace. Every step, button and piece of text is created with an eye on where the person is heading and how to get them there as smoothly as possible. UX research is foundational for us.</p>
      <p><strong>Why.</strong> Every user is different, but our approach is always grounded in research, observation and feedback. When we understand intent, emotions and obstacles, we can create design that guides with confidence while staying out of the way. Every touchpoint, from the first offer to the booking, is thought through so it makes sense to the user in the context of what they're doing.</p>
      <p><strong>How you can tell in practice:</strong></p>
      <ul>
        <li>We make design decisions based on research — we listen to people, watch their behaviour, and reflect their needs, motivations and obstacles.</li>
        <li>When designing screens we consider the whole context: what comes before and what follows. We don't just deal with UI, but with the entire customer journey and its touchpoints.</li>
        <li>We think about what happens after the purchase — how the user gets to the venue, what awaits them there, how they rate the experience.</li>
        <li>We don't deal with individual screens in isolation, but with the whole story: from the first visit to how a person remembers the experience.</li>
        <li>We test in real situations, not in an ideal world — the way people actually use Slevomat.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2 id="princip-6" style="scroll-margin-top:1rem">#6 — We show direction and leave room to explore</h2>
      <p><strong>What it means.</strong> Slevomat's design helps the user find what they're looking for, while also leaving room to discover something they didn't expect. We stand behind what's good; we know what makes sense and we know how to recommend it. We don't hide behind pure analytics — we're not afraid to be a guide who advises when needed. At the same time we respect that every user sometimes wants to explore in their own way.</p>
      <p><strong>Why.</strong> Everyone arrives with a different intent — some know exactly what they want, others are looking for inspiration. We're neither a passive catalogue nor machine personalisation. We're a brand that understands experiences, understands its users, and has the courage to say: "This is good." So the design balances guidance and freedom: it helps, but doesn't push.</p>
      <p><strong>How you can tell in practice:</strong></p>
      <ul>
        <li>The user can search for exactly what they need, but right next to it they come across something they wouldn't have looked for themselves.</li>
        <li>We recommend with judgement — not only based on data, but also through a curated selection.</li>
        <li>Our interface doesn't force a decision, but helps it mature by offering sense and inspiration at the same time.</li>
        <li>Elements like "Recommended for you", "Our tips" or "Discover more" act as gentle guidance, not a directive.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2 id="princip-7" style="scroll-margin-top:1rem">#7 — Design that surprises (even a small moment can turn planning into an experience)</h2>
      <p><strong>What it means.</strong> Slevomat's design aims not only to serve, but also to delight. This isn't playfulness for its own sake, but deliberate moments that add depth and emotion to the experience. Where it makes sense, we allow ourselves to surprise — always with judgement, never at the expense of usability. A purchase can become a moment of inspiration where a person thinks "I didn't expect that, but I like it."</p>
      <p><strong>Why.</strong> People don't remember every feature, but they remember how they felt while using it. A strong experience doesn't come from function alone, but also from emotion. When design can spark curiosity, surprise in a detail, and at the same time not disrupt the main path, it leaves an impression. And that impression often decides whether a person comes back.</p>
      <p><strong>How you can tell in practice:</strong></p>
      <ul>
        <li>The user doesn't feel overwhelmed, but as if they're discovering.</li>
        <li>Photos, illustrations and texts don't just sell a discount — they create an appetite to experience something.</li>
        <li>Offer cards catch attention not only with the price, but with a detail that grabs the eye and stays in mind.</li>
        <li>Offers make sense in context and help discover even what the user wasn't originally looking for.</li>
        <li>The occasional small visual or textual surprise doesn't get in the way of orientation, but delights at the right moment.</li>
        <li>Even an ordinary purchase can start with a moment: "I wouldn't have expected that, but I want it."</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2 id="pouziti" style="scroll-margin-top:1rem">How to use them</h2>
      <p>For every product decision (feature design, screen design, copy, brand), go through all 7 principles and ask yourself: <strong>am I honouring each of them, or am I breaking one — and why?</strong></p>
      <p>For an automated check there's the <code>slevomat-design-principles</code> skill — send it a feature description or a screenshot and you'll get structured feedback against all 7 principles.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h1 id="design-patterns" style="font-size:2rem;margin-bottom:.5rem;scroll-margin-top:1rem">Design patterns</h1>
      <p>Rules for using components correctly and consistently — beyond the API.</p>

      <h2>Every prototype starts with the background token and a topbar</h2>
      <p><strong>Rule:</strong> Whenever you vibe-code anything with this design system — a prototype, a demo page, an internal tool, a full app — two things are non-negotiable: the page background is <code>var(--color-background)</code> (never <code>#fff</code>, never a hand-picked grey — the token carries dark mode and the colour schemas), and the page opens with <code>&lt;minis-topbar&gt;</code> set to the right variant.</p>
      <table style="border-collapse:collapse;margin:.75rem 0">
        <thead><tr><th style="text-align:left;padding:.35rem .75rem .35rem 0">You are building…</th><th style="text-align:left;padding:.35rem 0"><code>variant</code></th></tr></thead>
        <tbody>
          <tr><td style="padding:.35rem .75rem .35rem 0">Something on the <strong>Slevomat website</strong></td><td style="padding:.35rem 0"><code>web</code></td></tr>
          <tr><td style="padding:.35rem .75rem .35rem 0"><strong>Any other app</strong> — internal tools, dashboards, admin, client-facing apps, one-off prototypes</td><td style="padding:.35rem 0"><code>vibe-apps</code> + <code>app-name="…"</code></td></tr>
        </tbody>
      </table>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>body { background: var(--color-background); color: var(--color-text-primary); }

&lt;minis-container&gt;
  &lt;minis-topbar variant="vibe-apps" app-name="Refund Console"&gt;
    &lt;img slot="logo" src="/logo.svg" alt="Slevomat" /&gt;
  &lt;/minis-topbar&gt;
&lt;/minis-container&gt;</code></pre>
      <p>The topbar is what makes a page read as Slevomat rather than as a generic bootstrap of components, and its two variants exist precisely so one component covers both jobs. Rolling your own header bar — or skipping it — is the fastest way to make a prototype look off-system. Note <code>--color-background</code> is the <em>page</em> surface; <code>--color-surface-primary</code> is for components sitting on top of it.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Prefer active states over disabled</h2>
      <p><strong>Rule:</strong> Use <code>disabled</code> only when interaction is truly impossible — not just conditional or blocked by an incomplete prerequisite. When a component <em>could</em> work but requires something from the user first, keep it active and explain the requirement instead.</p>

      <h3>Why</h3>
      <p>Disabled elements are silent. They offer no feedback, are frequently invisible to assistive technologies, and leave users guessing about what went wrong or what they need to do. An active component paired with a <code>&lt;minis-alert&gt;</code> or inline message is clearer, more accessible, and more forgiving.</p>

      <h4>Prefer this</h4>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>&lt;minis-alert variant="warning"&gt;
  Complete your billing address before placing your order.
&lt;/minis-alert&gt;
&lt;minis-button variant="primary"&gt;Place order&lt;/minis-button&gt;</code></pre>

      <h3>Over this</h3>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>&lt;!-- Avoid: gives no hint about what is missing or how to fix it --&gt;
&lt;minis-button variant="primary" disabled&gt;Place order&lt;/minis-button&gt;</code></pre>

      <h3>When <code>disabled</code> is appropriate</h3>
      <p>Use it only when <strong>all</strong> of these apply:</p>
      <ol>
        <li><strong>The action is structurally impossible</strong> for this user — not just blocked by missing data. Examples: a premium feature unavailable on the current plan; a field pre-filled from an external read-only source.</li>
        <li><strong>No action exists</strong> that would make it available in this session.</li>
        <li><strong>Removing it from the tab order</strong> is actually correct — the user should not be able to focus or interact with it at all.</li>
      </ol>
      <blockquote style="border-left:4px solid var(--color-interaction-primary-surface,#006eb9);padding:.5rem 1rem;margin:1rem 0;background:var(--color-surface-faded,#f1f3f5)">
        When in doubt, keep it active and explain with an alert.
      </blockquote>

      <h3>Components with <code>disabled</code></h3>
      <p>This principle applies to all components that expose a <code>disabled</code> attribute: <code>&lt;minis-button&gt;</code>, <code>&lt;minis-checkbox&gt;</code>, <code>&lt;minis-action-row&gt;</code>, <code>&lt;minis-tile&gt;</code>, <code>&lt;minis-tag&gt;</code>.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Style with tokens, never hardcoded values</h2>
      <p><strong>Rule:</strong> Every color, spacing, radius, and typography value comes from a design token (<code>--color-*</code>, <code>--spacing-layout-*</code>, <code>--linear-sp-linear-*</code>, <code>--typography-*</code>). Never write raw hex colors or magic pixel values.</p>
      <p>Tokens carry both light <strong>and</strong> dark values, scale with the viewport tier, and stay in sync with Figma. A hardcoded value opts out of all three silently — it looks right today and breaks the moment the theme, mode, or breakpoint changes.</p>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>/* Prefer */   background: var(--color-surface-primary);  padding: var(--spacing-layout-md);
/* Avoid  */   background: #ffffff;                        padding: 16px;</code></pre>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Dark mode comes free — if you follow the token rule</h2>
      <p><strong>Rule:</strong> Never write component-level dark-mode styling. Dark mode is toggled globally with <code>&lt;html data-mode="dark"&gt;</code> — <code>tokens.css</code> overrides all semantic color tokens in one place. If something looks wrong in dark mode, use the right semantic token instead of adding a dark override.</p>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>&lt;html data-mode="dark"&gt;  &lt;!-- that's the entire integration --&gt;</code></pre>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Use abbreviated size values only</h2>
      <p><strong>Rule:</strong> The <code>size</code> attribute accepts the abbreviated Figma variant names — <code>xs | sm | md | lg | xl</code> (each component exposes only its subset). Never use full words like <code>small</code> or <code>large</code>: an unrecognized value fails <strong>silently</strong> and the component renders at its default size.</p>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>&lt;minis-button size="sm"&gt;Save&lt;/minis-button&gt;     &lt;!-- Prefer --&gt;
&lt;minis-button size="small"&gt;Save&lt;/minis-button&gt;  &lt;!-- Avoid: silently falls back to md --&gt;</code></pre>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Respect the two responsive mechanisms</h2>
      <p><strong>Rule:</strong> Page-level spacing and typography respond to the <strong>viewport</strong> through tokens (<code>--spacing-layout-*</code>, <code>--container-padding</code>) — you never write media queries for spacing. Components that rearrange their own internals (<code>&lt;minis-page-header&gt;</code>, <code>&lt;minis-card-grid&gt;</code>) use <strong>container queries</strong> on their own width — they adapt to the box they're placed in, not the screen.</p>
      <p>New layout-switching components must use container queries, with the breakpoint hardcoded from the <code>--breakpoint-*</code> scale plus a comment (CSS custom properties cannot be used inside <code>@container</code>/<code>@media</code> conditions).</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Brand font is for banner headlines only</h2>
      <p><strong>Rule:</strong> <code>--typography-font-family-brand</code> (Kensington Compressed Bold) is reserved for banner and campaign headlines — the <code>&lt;minis-page-header&gt;</code> heading and equivalent hero moments. Everything else — headings, body copy, UI labels, numbers — uses Inter (<code>--typography-font-family-sans</code>).</p>
      <p>Kensington is a display face: it works at large sizes in uppercase, and its impact comes from scarcity. Used in body text or UI controls it becomes hard to read and dilutes the brand moment it was designed for.</p>
      <p>Kensington is Slevomat-proprietary and is <strong>not distributed with this design system</strong>. Where it is not installed, the token falls back to <a href="https://fonts.google.com/specimen/Bebas+Neue" target="_blank" rel="noopener" style="color:var(--color-interaction-primary-surface,#006eb9)">Bebas Neue</a> (Google Fonts). Both faces are all-caps and single-weight, so always pair the brand family with <code>--typography-brand-weight</code> (400) and uppercase text — requesting bold only produces synthetic bolding.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <p>
        <a href="https://slevomat.github.io/minis-design-system" style="color:var(--color-interaction-primary-surface,#006eb9)">Live Storybook</a> ·
        <a href="https://github.com/slevomat/minis-design-system" style="color:var(--color-interaction-primary-surface,#006eb9)">GitHub</a>
      </p>
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
           2026-08-07 (summer branding, badge & page header colours, topbar variants, action row xs)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-08-07" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-08-07</h2>
        <button class="cl-copy-btn" data-anchor="2026-08-07">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="margin-top:1rem">Summer branding colour — new token, badge variant, page header theme</h3>
      <p>Figma added <code>Color/Branding/summer</code> and rebuilt the Badge and PageHeader component sets around it. The design system follows.</p>

      <h4 style="margin-top:.75rem">Tokens</h4>
      <ul>
        <li><strong>New <code>--color-branding-summer</code></strong> → <code>var(--color-yellow-45)</code> (<code>#ffa400</code>), a campaign orange. Joins <code>--color-branding-{pink,yellow,blue,brand,green}</code>. Light and dark resolve to the same value, matching the Figma export.</li>
        <li><em>Not the same as <code>--color-branding-yellow</code>:</em> <code>yellow</code> is <code>--color-yellow-75</code> (<code>#ffd666</code>, pale gold), <code>summer</code> is <code>--color-yellow-45</code> (<code>#ffa400</code>, saturated orange).</li>
      </ul>

      <h4 style="margin-top:.75rem"><code>minis-badge</code></h4>
      <ul>
        <li><strong>Two new <code>color</code> values: <code>green</code> and <code>summer</code></strong> — the full set is now <code>pink</code> (default) · <code>yellow</code> · <code>blue</code> · <code>brand</code> · <code>green</code> · <code>summer</code>, matching the Figma <code>color</code> variant one-to-one.</li>
        <li><strong>New <code>--badge-check-color</code> custom property</strong> (default <code>var(--color-core-white)</code>) — the checkmark was a hardcoded <code>white</code> in the SVG and could not be recoloured. It is a variable now because the page header's <code>green</code> theme needs a blue mark on its yellow seal. Existing usage is unchanged.</li>
        <li>New <strong>Custom Checkmark Color</strong> story; <em>All Variants</em> shows all six colours.</li>
      </ul>

      <h4 style="margin-top:.75rem"><code>minis-page-header</code></h4>
      <ul>
        <li><strong>New <code>summer</code> theme</strong> — surface <code>--color-branding-summer</code>, text <code>--color-green-95</code> (the same pale tone the <code>green</code> theme uses, per Figma). Themes are now <code>brand</code> (default) · <code>yellow</code> · <code>blue</code> · <code>pink</code> · <code>green</code> · <code>summer</code>.</li>
        <li><strong>The badge seal colour per theme was rebuilt.</strong> It used to be "pink on everything, brand on the pink theme". Figma now specifies a distinct pairing per theme, each chosen so the seal reads against its own surface: <code>brand</code>→<code>pink</code>, <code>yellow</code>→<code>summer</code> (was <code>pink</code>), <code>blue</code>→<code>brand</code> (was <code>pink</code>), <code>pink</code>→<code>blue</code> (was <code>brand</code>), <code>green</code>→<code>yellow</code> with a blue checkmark (was <code>pink</code>), <code>summer</code>→<code>green</code>.</li>
        <li><strong>New <code>--page-header-badge-check</code> custom property</strong> — the checkmark colour, forwarded to the badge's <code>--badge-check-color</code>. Defaults to white; <code>theme="green"</code> sets it to <code>--color-branding-blue</code>, because a white mark on the pale gold seal has too little contrast.</li>
        <li>The mapping lives in one <code>BADGE_COLOR_BY_THEME</code> record rather than a ternary, so adding a theme is a single line.</li>
      </ul>

      <h3 style="margin-top:1rem"><code>minis-app</code> skill — scaffold and build an app end to end</h3>
      <ul>
        <li><strong>New skill at <code>.claude/skills/minis-app/SKILL.md</code></strong>, committed with the design system so it can't drift from the components it describes. Invoked when someone asks to create, start or vibe-code an app/prototype/page with Mini*S. It asks what is being built (which decides the topbar variant), runs <code>pnpm build &amp;&amp; pnpm create-prototype</code>, starts the dev server in the browser, builds the requested screens from <code>docs/ai-prompts/</code>, and verifies the result (console, screenshot, mobile width, dark mode) before reporting done.</li>
        <li>Carries the non-negotiables as a checklist: background token, topbar variant, tokens-only styling, abbreviated sizes, page-header outside the container / topbar inside it, borders vs separators, avoid <code>disabled</code>, no per-component dark CSS.</li>
        <li><strong>Human-readable skill listing</strong> — skills were only discoverable by reading source files. Added a <strong>Skills</strong> section to the Vibe Coding Guide (what a skill is, what each one does, what to say to trigger it, where it lives), an <strong>AI Skills</strong> table in the repo <code>README.md</code>, and a pointer in <code>docs/ai-prompts/index.md</code>. Both <code>minis-app</code> and the externally-provided <code>slevomat-design-principles</code> are listed.</li>
        <li><strong>Scaffold fix found while testing it:</strong> <code>packages/create-minis/template/_index.html</code> loaded <code>&lt;minis-icon&gt;</code> twice — both <code>/vendor/components/index.js</code> and <code>/vendor/icons/index.js</code>, though the components bundle already inlines the icon component. Every generated prototype threw <code>NotSupportedError: … "minis-icon" has already been used with this registry</code> on load. Dropped the second script tag; icons render unchanged.</li>
      </ul>

      <h3 style="margin-top:1rem">AI docs — the vibe-coding rule: background token + topbar</h3>
      <p>A single rule now stated in every place an agent (Claude Code, Cursor, or a human) looks, so generated prototypes stop drifting off-system: <em>whatever you vibe-code — prototype, demo, internal tool, full app — the page background is <code>var(--color-background)</code> (never a hardcoded colour), and the page opens with <code>&lt;minis-topbar&gt;</code>: <code>variant="web"</code> when working on the Slevomat website, <code>variant="vibe-apps"</code> + <code>app-name="…"</code> for any other internal or external app.</em></p>
      <ul>
        <li><strong><code>docs/ai-prompts/principles.md</code></strong> — new first principle, "Every prototype starts with the background token and a topbar", with prefer/avoid examples and the reasoning (<code>--color-background</code> is the page surface, <code>--color-surface-primary</code> is for components on top of it).</li>
        <li><strong><code>docs/ai-prompts/getting-started.md</code></strong> — the HTML skeleton now includes the topbar, and the copy-paste AI prompt template carries both requirements.</li>
        <li><strong><code>CLAUDE.md</code></strong> — new "Vibe-coding rule" section; <strong><code>docs/ai-prompts/index.md</code></strong> lists the principle first.</li>
        <li><strong>Prototype scaffold</strong> — <code>packages/create-minis/template/_CLAUDE.md</code> (the generated project's own AI context file) leads with the two rules; <code>_index.html</code> sets <code>variant="web"</code> explicitly with a comment pointing at <code>vibe-apps</code>.</li>
        <li><strong>Design Principles page</strong> (this Storybook) — same rule as the first design pattern.</li>
        <li><strong><code>docs/examples/simple-landing.html</code></strong> — replaced its hand-rolled <code>&lt;header class="topbar"&gt;</code> with <code>&lt;minis-topbar variant="web"&gt;</code>, and fixed six <code>size="small"</code> values that violated the abbreviated-size rule.</li>
      </ul>

      <h3 style="margin-top:1rem">Topbar (Figma: <strong>Header</strong>) — <code>web</code> and <code>vibe-apps</code> variants</h3>
      <p>The Figma <em>Header</em> component set (<code>5156:9287</code>) gained a second variant for vibe-coded apps. <code>&lt;minis-topbar&gt;</code> now covers both — the tag keeps its name (renamed from <code>&lt;minis-header&gt;</code> in March 2026 to keep it apart from <code>&lt;minis-page-header&gt;</code>), and existing markup is unaffected: <code>web</code> is the default and renders exactly as before.</p>
      <ul>
        <li><strong><code>variant</code> property</strong> — <code>'web' | 'vibe-apps'</code>, default <code>'web'</code>, reflected. Maps 1:1 to the Figma <code>Property 1</code> variant. <code>web</code> is the Slevomat website header (logo, optional search, action buttons); <code>vibe-apps</code> is the header for vibe-coded apps and prototypes (logo left, app name right).</li>
        <li><strong><code>app-name</code> attribute</strong> — <code>vibe-apps</code> only. Right-aligned <code>&lt;span&gt;</code> (not a heading, so it doesn't compete with the page <code>&lt;h1&gt;</code>) in Heading/lg: <code>--typography-heading-lg-size</code>, <code>--typography-weight-semibold</code>, line-height 1.25, letter-spacing <code>-0.01em</code> (Figma's −1%).</li>
        <li><strong>New <code>search</code> slot</strong> (<code>web</code> only) — the design system has no input component yet, so nothing is rendered for you. The slot is hidden while empty, so a topbar without search keeps the original logo-left / actions-right layout with no phantom gap.</li>
        <li><strong><code>actions</code> slot works in both variants</strong> — in <code>vibe-apps</code> the buttons render after the app name.</li>
        <li><strong>Bar height is now <code>min-height</code></strong> instead of a fixed <code>height</code>, so tall slotted content grows the bar instead of overflowing it.</li>
        <li><strong><code>topbar.figma.ts</code> added</strong> — the component had no Code Connect file at all.</li>
        <li>New <strong>Web — logo, search, actions</strong>, <strong>Vibe apps — logo + app name</strong> and <strong>Vibe apps — with an action</strong> stories; the Playground gained <code>variant</code> and <code>app-name</code> controls.</li>
        <li><strong>Figma component set renamed <em>Header</em> → <em>TopBar</em></strong> (<code>5156:9287</code>), matching the code tag. The variant property is unchanged (<code>Property 1</code> = <code>web</code> | <code>vibe-apps</code>), so the Code Connect mapping still resolves.</li>
        <li>Documented the Figma roadmap gaps: the <code>web</code> variant is not yet fully aligned with production, and there are no breakpoint variants — both variants are desktop-only layouts.</li>
        <li>Docs rewritten (<code>docs/ai-prompts/components/topbar.md</code>) — variant table, Figma↔code naming note, placement (topbar → navigation → page-header, wrapped in <code>&lt;minis-container&gt;</code>), and a warning that the search field and avatar in the Figma frame are pasted screenshots of the live site, not design-system components.</li>
      </ul>

      <h4 style="margin-bottom:.25rem">Tokens</h4>
      <ul>
        <li><strong><code>--topbar-logo-gap</code></strong> (new) → <code>16px</code> — space after the logo, previously hardcoded as <code>--linear-sp-linear-4</code>.</li>
        <li><strong><code>--topbar-search-width</code></strong> (new) → <code>300px</code> — search slot width (Figma: 300px).</li>
        <li><strong><code>--topbar-search-gap</code></strong> (new) → <code>48px</code> — space between search and the actions group.</li>
        <li><strong><code>--topbar-app-name-size</code></strong> (new) → <code>var(--typography-heading-lg-size)</code> — <code>vibe-apps</code> app name size.</li>
        <li><strong><code>--topbar-app-name-color</code></strong> (new) → <code>var(--color-text-primary)</code> — <code>vibe-apps</code> app name colour.</li>
        <li><strong><code>--topbar-height</code></strong> — unchanged at <code>64px</code>, now applied as <code>min-height</code> rather than <code>height</code>.</li>
      </ul>

      <h3 style="margin-top:1rem">Page Header — definition and placement clarified</h3>
      <ul>
        <li>Documented that page headers are also known as <strong>heroes</strong>, come in the brand colour themes, and are the <strong>first content element</strong> of a page — placed directly under the Slevomat header (<code>&lt;minis-topbar&gt;</code>) and the main navigation (<code>&lt;minis-navigation&gt;</code>).</li>
        <li>Added a <strong>Placement</strong> section: <strong>one page header per page</strong>, at the very top of the content area, never mid-page and never two stacked; it sits <strong>outside</strong> <code>&lt;minis-container&gt;</code> — its root is already a full-bleed colour strip that applies <code>--container-padding</code> and centres a 1240px inner container, so nesting it would inset the background from the viewport edges and double the padding.</li>
        <li>Wording synced across the component JSDoc, this Storybook docs page, <code>docs/ai-prompts/components/page-header.md</code> and both AI-prompt indexes. No API or visual change.</li>
      </ul>

      <h3 style="margin-top:1rem">Action Row — <code>breakpoint="xs"</code> mobile layout, and the full state matrix in Figma</h3>
      <p>The Figma set already had an <code>xs</code> (mobile) breakpoint but only in its <code>Default</code> state, and the web component knew nothing about it at all. Both sides now cover the same 24 combinations.</p>
      <ul>
        <li><strong><code>breakpoint</code> property</strong> — <code>'desktop' | 'xs'</code>, default <code>'desktop'</code>, reflected. Maps 1:1 to the Figma <code>Breakpoint</code> variant. It is an explicit attribute, not a container query: the row is used inside dropdowns and narrow sidebars where a width-driven switch would fire at the wrong moment.</li>
        <li><strong><code>xs</code> layout</strong> — 56px row (up from 32px), plain 8px padding on both sides, and a <strong>trailing action pinned to the right edge</strong>: an <code>arrow-right</code> chevron, or the checkbox when <code>variant="checkbox"</code>. The label group (icon, label, counter) stays left.</li>
        <li><strong>The leading icon is no longer mutually exclusive with the checkbox.</strong> Figma's <code>w/ Checkbox</code> variant has always shown a checkbox <em>and</em> a leading icon; the component rendered one or the other. The <code>icon</code> slot now renders in every variant whenever something is slotted into it. Existing markup is unaffected — the icon box collapses when empty, so the flex gap leaves no hole.</li>
        <li><strong>Leading inset now follows the icon, not the variant</strong> — <code>padding-left</code> drops to 3px whenever an icon is present, with <code>variant="checkbox"</code> still overriding to 5px. Matches Figma's per-variant padding (8 / 3 / 5).</li>
        <li><strong>ARIA corrected for the checkbox variant</strong> — <code>variant="checkbox"</code> now exposes <code>role="checkbox"</code> + <code>aria-checked</code> instead of <code>role="button"</code> + <code>aria-pressed</code>.</li>
        <li>New <strong>All variants — xs</strong>, <strong>xs — mobile list</strong> and <strong>xs — filter list</strong> stories, a <code>breakpoint</code> control on the Playground, and a <code>Disabled</code> row added to the desktop grid, which previously stopped at <code>Active</code>.</li>
        <li><strong><code>action-row.figma.ts</code> added</strong> — the component had no Code Connect file at all.</li>
      </ul>

      <h4 style="margin-bottom:.25rem">Tokens</h4>
      <ul>
        <li><strong><code>--action-row-height</code></strong> (new) → <code>var(--pixel-px-32)</code> (32px) — desktop row height, previously hardcoded in the stylesheet.</li>
        <li><strong><code>--action-row-xs-height</code></strong> (new) → <code>var(--linear-sp-linear-14)</code> (56px) — xs row height.</li>
        <li><strong><code>--action-row-xs-action-size</code></strong> (new) → <code>var(--pixel-px-24)</code> (24px) — xs trailing action box.</li>
        <li><strong><code>--action-row-xs-action</code></strong> (new) → <code>var(--action-row-icon)</code> — xs trailing chevron colour, the same tertiary blue (<code>#006eb9</code>) Figma binds to the arrow.</li>
      </ul>

      <h4 style="margin-bottom:.25rem">Figma</h4>
      <ul>
        <li><strong>9 variants added to the <code>ActionRow</code> component set</strong> (<code>4202:3867</code>), taking it from 15 to the full 24: <code>State</code> = <code>Hover</code> / <code>Active</code> / <code>Disabled</code> for each of <code>Label</code>, <code>w/ Icon</code>, <code>w/ Checkbox</code> at <code>Breakpoint=xs</code>. The <code>State</code> property already declared all four values — only the <code>xs</code> rows were missing.</li>
        <li>No new Figma variables: the xs states reuse exactly what desktop uses — the hover surface (<code>#e6f7fc</code>), the active surface (<code>#f1f3f5</code>), and the same white <code>disabler</code> overlay at 60% opacity for <code>Disabled</code>.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-08-06 (separator: opacity-based colour)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-08-06" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-08-06</h2>
        <button class="cl-copy-btn" data-anchor="2026-08-06">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="margin-top:1rem">Accordion — <code>size="compact"</code> variant (no horizontal inset)</h3>
      <p>A compact row for accordions nested inside an already-padded container (card, narrow column, drawer), where the default 16px inset stacks on the parent's padding and knocks the headings out of alignment with everything around them.</p>
      <ul>
        <li><strong><code>size</code> on both <code>&lt;minis-accordion&gt;</code> and <code>&lt;minis-accordion-item&gt;</code></strong> — <code>'default' | 'compact'</code>, default <code>'default'</code>, reflected. Set it on the container and it is pushed down to every item (same mechanism as <code>heading-level</code>); set it per item only for a deliberately mixed list.</li>
        <li><strong><code>compact</code> zeroes the horizontal padding only</strong> — trigger and panel left/right go to 0. Vertical padding, type scale, chevron and dividers are untouched: despite the name it trims the <em>inset</em>, not the density — rows stay exactly as tall as they are at <code>default</code>.</li>
        <li><strong>Naming</strong> — the accordion is the one component <em>not</em> on the abbreviated <code>xs/sm/md/lg/xl</code> scale: the values are <code>default</code> and <code>compact</code> in Figma <em>and</em> in code, identical strings on both sides.</li>
        <li><strong>Tokens</strong> — new <code>--accordion-compact-padding-x</code> → <code>var(--linear-sp-linear-0)</code> (0) · Figma <code>.Components → Accordion/compact/padding/x</code>.</li>
        <li><strong>Figma</strong> — <code>accordion-item</code> (<code>4984:9556</code>) gained a <code>Size</code> property (6 variants → 12), and the <code>accordion</code> container is now a component set with <code>Size=default</code> / <code>Size=compact</code>. Existing instances are unaffected: the originals became the <code>default</code> variants. Note the container's <code>Size</code> cannot reach items dropped into its Slot — Figma has no property forwarding into slot content — whereas in code <code>&lt;minis-accordion size="compact"&gt;</code> always wins over its children.</li>
        <li>New <strong>Size — compact</strong> story comparing both sizes in the same padded card, plus a <code>size</code> control on the Playground.</li>
      </ul>

      <h3 style="margin-top:1rem">Code Connect — <code>figma connect publish</code> was failing for every component</h3>
      <p><code>page-header.figma.ts</code> used ternaries inside its <code>html</code> template (<code>${"${description ? 'description=\"…\"' : ''}"}</code>). The HTML parser only accepts prop placeholders there, so it threw <em>"Expected a call expression as a placeholder in the template, got ConditionalExpression"</em> — and because the CLI parses every mapping file as one batch, that one file took down the whole publish, including components whose mappings were fine.</p>
      <ul>
        <li><strong>Conditional markup now lives in the boolean's value mapping</strong> — the pattern <code>button.figma.ts</code> already used for its counter: <code>figma.boolean('Description', { true: 'description="…"', false: undefined })</code>, and likewise for <code>Tag</code>, <code>Button</code> and the inverted <code>Badge</code> → <code>no-badge</code>.</li>
        <li>The accordion container mapping moved to the new component set (<code>5136-9716</code>) — mapping the <code>Size=default</code> variant would only have covered half the set.</li>
        <li><strong>Rule for new <code>.figma.ts</code> files</strong>: no ternaries and no logic of any kind inside the <code>html</code> template — only <code>${'${prop}'}</code> placeholders. <code>pnpm figma:parse</code> catches it before a publish does.</li>
      </ul>

      <h3 style="margin-top:1rem">Separator — opacity-based colour, and the accordion now follows it</h3>
      <p>The separator rule was a solid grey (<code>--color-border-subtle</code> → <code>#e3e4e6</code>), which only reads correctly on white. It is now an alpha colour, so the same token works on faded surfaces, tinted banners and photography without a per-surface override. In Figma the <code>accordion-item</code> divider dropped its colour/height override, so the accordion consumes the same rule.</p>
      <ul>
        <li><strong>Tokens</strong>
          <ul>
            <li><strong>New <code>--color-white-a-white-a35</code></strong> (primitive) → <code>oklch(1 0 0 / 0.35)</code> = <code>rgba(255,255,255,0.35)</code> · Figma <code>.Primitives → Color/white-a/white-a35</code>.</li>
            <li><strong>New <code>--color-separator-default</code></strong> (foundation) → light <code>var(--color-black-a-black-a5)</code> (black 5%, <code>#0000000d</code>), dark <code>var(--color-white-a-white-a35)</code> (white 35%) · Figma <code>Foundation → Color/Separator/default</code>.</li>
            <li><code>--separator-color</code> — <code>var(--color-border-subtle)</code> → <code>var(--color-separator-default)</code>. <code>--separator-height</code> unchanged (<code>var(--border-width-thin)</code>, 1px).</li>
            <li>Both new tokens listed on the <strong>Design Tokens</strong> page (Border table and White Alpha palette).</li>
          </ul>
        </li>
        <li><strong>Accordion dividers are now the shared separator rule</strong> — black 5% instead of solid grey-90, visibly lighter and correct on non-white surfaces. Matches Figma, where the divider is now an <em>unmodified</em> <code>separator</code> instance: <code>accordion-item</code> no longer binds <code>Accordion/default/border</code> / <code>Accordion/border/width</code> at all. <code>--accordion-border-color</code> → <code>var(--separator-color)</code> and <code>--accordion-border-width</code> → <code>var(--separator-height)</code>; the names stay as hooks so a single accordion can still be restyled without touching every rule in the system.</li>
        <li><strong>Docs — Borders vs. Separators</strong>. Borders wrap content (cards, inputs, buttons) and are <em>solid</em>, because a border defines an object's edge. Separators (dividers) split content inside a block (accordion rows, list items, section breaks) and use an <em>alpha</em> colour, because a divider only has to read as a break and must do so on every surface it lands on — one alpha token covers a faded panel, a tinted banner and a photo, where a solid grey tuned for white goes muddy on a mid-tone and vanishes on a dark one. Written up in <code>docs/ai-prompts/getting-started.md</code> (comparison table + example), on the <strong>Design Tokens → Colors</strong> page (Border table lead-in, plus a separate <strong>Separator</strong> section), and as a <code>CLAUDE.md</code> pitfall.</li>
        <li>No Lit <code>&lt;minis-separator&gt;</code> yet — these tokens stay registered ahead of the component.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-07-30 (brand font: Kensington out of repo, Bebas Neue fallback)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-07-30" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-07-30</h2>
        <button class="cl-copy-btn" data-anchor="2026-07-30">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="margin-top:1rem">Brand font — Kensington removed from the repository, Bebas Neue fallback</h3>
      <p>Kensington Compressed Bold is Slevomat-proprietary. It is no longer committed or redistributed, so this repo can be shared without shipping a licensed typeface. Kensington remains the <em>definition</em> — still first in the brand stack, still what Figma uses — but it is now resolved from your machine rather than from the repo.</p>
      <ul>
        <li><strong>The woff2 is gone from the repo</strong> — deleted, git-ignored, and purged from git history. <code>packages/tokens/src/fonts/README.md</code> documents how to enable the real font locally.</li>
        <li><strong>Two zero-config ways to get it back</strong> — install Kensington on your machine (resolved via <code>local()</code>: no files, no network request), or drop the woff2 into <code>packages/tokens/src/fonts/</code> and run <code>pnpm --filter tokens build</code>. Storybook and <code>create-minis</code> prototypes pick either up automatically.</li>
        <li><strong>Public fallback is <a href="https://fonts.google.com/specimen/Bebas+Neue" target="_blank" rel="noopener">Bebas Neue</a></strong> (Google Fonts, OFL) — a condensed all-caps display face with near-identical proportions. Verified to render Czech diacritics (both <code>latin</code> and <code>latin-ext</code> subsets are served).</li>
        <li><strong><code>@font-face</code> no longer lives in <code>tokens.css</code></strong> — the tokens build now generates <code>dist/fonts/kensington.css</code>, always with <code>local('Kensington Compressed Bold'), local('Kensington')</code> and with the <code>url(...)</code> source appended <em>only</em> when the woff2 is present. The file is written either way, so consumers link it unconditionally and never hit a 404.</li>
        <li><strong><code>Bebas+Neue</code> added to the existing Google Fonts request</strong> (one combined <code>&lt;link&gt;</code>) and the overlay linked in Storybook, the <code>create-minis</code> template, and <code>docs/examples/simple-landing.html</code>.</li>
        <li><strong>Licensing</strong> — added a root <code>LICENSE</code> with <strong>verbatim, unmodified MIT</strong> (the README claimed MIT with no file present). Scope notes went into a new <code>NOTICE</code> file instead of the licence body: appending text to MIT drops it below GitHub's template-similarity threshold, and the repo reported <code>spdx_id: NOASSERTION</code> rather than <code>MIT</code>. <code>NOTICE</code> records that the grant covers code/tokens/docs and conveys no rights to Slevomat brand assets (Kensington, the Slevomat name, logos) — a clarification, not a restriction, since a copyright licence never conveys trademark rights — plus Inter and Bebas Neue credits (OFL, referenced not redistributed).</li>
        <li><strong>New "Project scope" section in <code>README.md</code></strong> — Mini*S is built for Slevomat's own products and internal prototyping: no support, no external contributions, APIs change without notice. This is deliberately a <strong>statement of intent, not a licence condition</strong> — an "internal use only" clause inside MIT would contradict its "without restriction … any person obtaining a copy" grant and leave the licence self-contradictory and non-standard.</li>
      </ul>

      <h4 style="margin-top:1rem">Tokens</h4>
      <ul>
        <li><code>--typography-font-family-brand</code> — <code>'Kensington'</code> → <code>'Kensington', 'Bebas Neue', 'Arial Narrow', sans-serif</code>.</li>
        <li><strong>New <code>--typography-brand-weight</code></strong> → <code>400</code>. Both brand faces are single-weight (Kensington ships Bold only, Bebas Neue ships 400 only), so requesting 700 synthesised a fake bold on the fallback. Requesting 400 renders Bebas Neue correctly <em>and</em> still resolves to Kensington, because the generated <code>@font-face</code> declares <code>font-weight: 400 700</code>.</li>
        <li><strong>Removed</strong> the <code>@font-face</code> block from the top of <code>tokens.css</code>. That <code>FONTS</code> section is now a comment explaining how fonts load, marked <code>HAND-MAINTAINED — preserve on Figma re-export</code> along with <code>--typography-font-family-*</code> and <code>--typography-brand-*</code>, none of which exist in <code>tokens.json</code>.</li>
      </ul>

      <h4 style="margin-top:1rem">Page Header</h4>
      <ul>
        <li><code>.heading</code> now uses <code>--typography-brand-weight</code> (400) instead of <code>--typography-weight-bold</code> (700), and its <code>font-family</code> fallback chain is <code>'Kensington', 'Bebas Neue', sans-serif</code> instead of <code>'Kensington', serif</code>.</li>
        <li>Brand Badge anchoring needed no change — <code>firstUpdated()</code> already re-measures the word-space advance on <code>document.fonts.ready</code>, so it adapts to whichever face lands (measured 0.120 em for Kensington vs 0.178 em for Bebas Neue).</li>
        <li>⚠️ <strong>Code and Figma will diverge for anyone without Kensington.</strong> Bebas Neue is taller and narrower, so brand headlines re-flow slightly.</li>
        <li><strong>Warning callout added to the Page Header docs page</strong> — the licensed Kensington font is required for a 1:1 match with Figma, Bebas Neue is substituted otherwise, how to tell which face you are currently looking at, and the two ways to enable the real one. Mirrored in <code>docs/ai-prompts/components/page-header.md</code>.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-07-25 (accordion: production row heights)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-07-25" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-07-25</h2>
        <button class="cl-copy-btn" data-anchor="2026-07-25">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="margin-top:1rem">Accordion</h3>
      <ul>
        <li>
          <strong>Row heights matched to production</strong> — content box is now <strong>62px</strong> below 768px and <strong>72px</strong> from 768px up (was ~65px at both). Row pitch including the 1px divider is 63 / 73.
          <ul>
            <li><strong>Why it was stuck at 65</strong> — <code>.trigger</code> is a centred flex row, so its height is <code>max(heading line box, chevron)</code>. The 24px chevron was taller than the heading at <em>both</em> breakpoints (22.08px XS, 23.94px LG), pinning every row to 65px so the height never responded to padding or the type ramp.</li>
            <li><strong>New <code>--accordion-icon-size</code></strong> → <code>var(--pixel-px-20)</code>. A 20px chevron sits under the line box at both breakpoints, so type drives row height again. <code>&lt;minis-icon&gt;</code> writes width/height inline on its <code>&lt;svg&gt;</code>, so the template passes <code>size="20"</code> as well as setting <code>--minis-icon-size</code> from the token.</li>
            <li><strong><code>--accordion-padding-y</code> is now responsive</strong> — 20px (<code>--linear-sp-linear-5</code>) below 768px → 24px (<code>--linear-sp-linear-6</code>) from 768px up. No typography token was touched.</li>
            <li><strong>New <code>COMPONENT RESPONSIVE OVERRIDES</code> section at the end of <code>tokens.css</code></strong> — <code>:root</code> inside a media query has the same specificity as a bare <code>:root</code>, so a component override placed with the existing layout-tier media queries (which sit <em>before</em> the component block) would lose the cascade to the component default. Component-level responsive overrides must come after the component block.</li>
            <li><strong>Figma</strong> — new <code>accordion/padding/y</code> in the <strong>Layout</strong> collection carrying the per-tier values (20 for <code>default/2xs/xs/sm</code>, 24 for <code>md</code>+), with <code>.Components → Accordion/padding/y</code> re-pointed to alias it, mirroring how <code>typography/heading/sm/size</code> already works (<code>.Components</code> has only one mode). Added <code>Accordion/icon/size</code> → <code>pixel/px-20</code>; chevrons resized to 20×20 and bound.</li>
            <li>⚠️ <strong>Known 1px gap at LG</strong> — Figma measures the content box at 73, not 72. The <code>Heading/sm</code> text style binds <code>fontSize</code>, <code>fontStyle</code> and <code>fontFamily</code> to variables but <strong>not <code>lineHeight</code></strong>, which is hardcoded at 138%, so Figma computes 18 × 138% = 24.84 → 25 where CSS uses the 133% tier value → 23.94. Fix is to bind that style's <code>lineHeight</code> to the existing <code>typography/heading/sm/line-height</code> Layout variable. Not changed here — it is a shared text style affecting every component that uses it. XS matches exactly (62 / 63 in both).</li>
          </ul>
        </li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-07-24 (accordion: new component + tokens)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-07-24" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-07-24</h2>
        <button class="cl-copy-btn" data-anchor="2026-07-24">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="margin-top:1rem">Separator <em style="font-weight:400;font-size:.85em">(new Figma component)</em></h3>
      <ul>
        <li><strong>New <code>separator</code> Figma component</strong> (node <code>4987:147</code>) on the previously empty ↳ Separator page (<code>4977:346</code>) — a horizontal 1px rule, width-filling, colour and height variable-bound. Its first consumer is the <code>accordion-item</code> divider.</li>
        <li>No Lit component yet — <code>&lt;minis-separator&gt;</code> is not implemented. The tokens below are registered ahead of it, matching the existing "upcoming component" precedent for card-grid and menu-item.</li>
        <li>
          <strong>Tokens</strong> — new <code>/* Separator (upcoming component) */</code> block in <code>packages/tokens/src/tokens.css</code>, mirrored as <code>Separator/*</code> variables in <code>.Components</code>:
          <code>--separator-color</code> → <code>var(--color-border-subtle)</code>;
          <code>--separator-height</code> → <code>var(--border-width-thin)</code> (1px).
        </li>
      </ul>

      <h3 style="margin-top:1rem">Accordion <em style="font-weight:400;font-size:.85em">(new component)</em></h3>
      <ul>
        <li>
          <strong>New <code>&lt;minis-accordion&gt;</code> + <code>&lt;minis-accordion-item&gt;</code></strong> —
          vertical expand/collapse list for FAQ sections, built from the Figma "Accordeon" page
          (<code>node-id=4977-145</code>). Each row is a bold heading on the left with a blue
          <code>arrow-down</code> chevron on the right, separated by 1px dividers; opening a row reveals its
          panel below.
          <ul>
            <li><strong><code>&lt;minis-accordion&gt;</code></strong> — <code>single</code> (exclusive mode: opening one item closes the others), <code>bordered</code> (rule above the first and below the last item too), <code>heading-level</code> (ARIA level applied to every child item, default <code>3</code>; <code>0</code> omits the heading role). Read-only <code>items</code> getter returns the child items in DOM order.</li>
            <li><strong><code>&lt;minis-accordion-item&gt;</code></strong> — <code>heading</code> (string), <code>open</code> (reflected), <code>disabled</code>, <code>heading-level</code>. Slots: default (panel content), <code>heading</code> (custom heading markup). Fires <code>toggle</code> with <code>{ open: boolean }</code>, bubbling and composed — that is how <code>single</code> mode closes siblings. CSS parts: <code>trigger</code>, <code>panel</code>.</li>
            <li><strong>Responsive typography, no container query</strong> — the heading uses <code>--typography-heading-sm-size</code> / <code>-line-height</code>: 16px/138% below 768px, 18px/133% from 768px up. The component only rescales, it never rearranges its internals, so the viewport-driven tokens are the correct mechanism. Row height ends up 65px desktop / ~57px mobile for a single-line heading; long headings wrap and the chevron stays vertically centred.</li>
            <li><strong>Panel animation</strong> uses <code>grid-template-rows: 0fr → 1fr</code> (no measured height); the chevron rotates 180° when open. Both are suppressed under <code>prefers-reduced-motion: reduce</code>.</li>
            <li><strong>Accessibility</strong> — the trigger is a real <code>&lt;button type="button"&gt;</code> with <code>aria-expanded</code> / <code>aria-controls</code>; the panel is a <code>role="region"</code> labelled by the trigger and <code>inert</code> while closed, so closed content stays out of the tab order.</li>
            <li>Exported from <code>@minis/components</code>; AI docs added at <code>docs/ai-prompts/components/accordion.md</code> and linked from the index.</li>
          </ul>
        </li>
        <li>
          <strong>Built in Figma</strong> on the previously empty ↳ Accordeon page (<code>4977:145</code>):
          <ul>
            <li><strong><code>accordion-item</code> component set</strong> (node <code>4984:9556</code>) — 6 variants, <code>State</code> (Default / Hover / Disabled) × <code>Open</code> (True / False), plus <code>Label</code> and <code>Body</code> TEXT properties. Every fill, stroke, stroke-weight, padding and gap is bound to an <code>Accordion/*</code> variable — binding audit reports <strong>0 unbound properties</strong>.</li>
            <li><strong><code>accordion</code> component</strong> (node <code>4984:9557</code>) — list container with four stacked <code>accordion-item</code> instances, <code>Show divider</code> off on the last row.</li>
            <li><strong><code>Show divider</code> boolean property</strong> on <code>accordion-item</code> (default <code>true</code>). The bottom rule is no longer a frame stroke — it is a nested <code>separator</code> instance as the item's last child, so a boolean property can toggle its visibility (Figma booleans drive layer visibility only, not stroke weight). Colour/height are overridden to <code>Accordion/default/border</code> / <code>Accordion/border/width</code>, keeping the accordion's own tokens authoritative. <strong>No code change</strong> — the CSS already hides the last rule via <code>:last-of-type</code>. Chosen over an <code>Item + Separator + Item</code> sibling structure, which would put a node on the canvas with no DOM counterpart and force designers to hand-maintain the alternation on every add/remove/reorder.</li>
            <li><strong>XS / LG demo frames</strong> use explicit Layout-collection mode overrides (<code>xs</code> / <code>lg</code>) to show the 16px → 18px heading shift without resizing anything.</li>
            <li>The chevron is a real instance of <code>Icon/arrow-down</code> from the <strong>Slevomat Icons</strong> library, rotated 180° when open — not a redrawn vector.</li>
            <li>The heading uses the <code>Heading/sm</code> text style, whose <code>fontSize</code> is already bound to <code>typography/heading/sm/size</code>, so the Figma component inherits the responsive type ramp automatically.</li>
            <li><strong>Code Connect is wired</strong> in <code>accordion.figma.ts</code> for both nodes: <code>Label</code> → <code>heading</code>, <code>Body</code> → slot content, <code>Open</code> → <code>open</code>, <code>State=Disabled</code> → <code>disabled</code>. Parses clean via <code>pnpm figma:parse</code>.</li>
            <li>⚠️ <strong>Known divergence</strong> — the Figma <code>Heading/sm</code> text style is Inter <strong>Semi Bold (600)</strong>; the CSS <code>--accordion-heading-weight</code> is <strong>Bold (700)</strong>. Figma follows the text style; pick one before this ships.</li>
          </ul>
        </li>
        <li>
          <strong>Tokens</strong> — new <code>/* Accordion */</code> block in <code>packages/tokens/src/tokens.css</code>:
          <code>--accordion-surface</code> → <code>var(--color-core-transparent)</code>;
          <code>--accordion-border-color</code> → <code>var(--color-border-subtle)</code>;
          <code>--accordion-border-width</code> → <code>1px</code>;
          <code>--accordion-padding-x</code> → <code>var(--linear-sp-linear-4)</code> (16px);
          <code>--accordion-padding-y</code> → <code>var(--linear-sp-linear-5)</code> (20px);
          <code>--accordion-panel-padding-bottom</code> → <code>var(--linear-sp-linear-5)</code> (20px);
          <code>--accordion-gap</code> → <code>var(--linear-sp-linear-4)</code> (16px);
          <code>--accordion-heading-text</code> → <code>var(--color-text-primary)</code>;
          <code>--accordion-heading-hover-text</code> → <code>var(--color-text-accent-link)</code>;
          <code>--accordion-heading-weight</code> → <code>var(--typography-weight-bold)</code>;
          <code>--accordion-icon-color</code> → <code>var(--button-tertiary-text)</code>;
          <code>--accordion-panel-text</code> → <code>var(--color-text-primary)</code>;
          <code>--accordion-transition-duration</code> → <code>200ms</code>.
        </li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-07-17 (page header: storybook regrouping)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-07-17" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-07-17</h2>
        <button class="cl-copy-btn" data-anchor="2026-07-17">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="margin-top:1rem">Page Header</h3>
      <ul>
        <li>
          <strong>Badge is now typography-relative and anchored to the heading's last line.</strong>
          The seal sizes off the heading font-size (<code>0.8em</code> — ≈26px at the 32px heading, ≈45px at the 56px heading),
          sits exactly centred on the <strong>last line's line-height</strong>, and keeps a <strong>0.27em gap</strong> after the end of
          that line — for any number of heading lines, at every breakpoint. Previously two fixed-px badges were rendered:
          a <code>md</code> (43px) one bottom-aligned beside the whole heading block on desktop, and an <code>sm</code> (32px) one
          absolutely positioned at the heading's top-right on mobile.
          <ul>
            <li><strong>Implementation</strong> — the badge is an inline box inside the <code>&lt;h1&gt;</code>, after the slot. Its anchor is <code>height: 1lh</code> with <code>vertical-align: top</code>, so its box coincides with the last line's line-height band regardless of the font's ascent/descent metrics; the seal is centred inside it. Sizing and centring are pure CSS. The gap needs one JS assist: slotted markup usually ends in a whitespace text node that renders as a word space before the badge, making the gap ~1.12em for some authors and 1.00em for others depending only on HTML formatting. The component now emits exactly one space in its template — any slotted trailing space collapses into it — and measures that space's advance in the heading font (on <code>slotchange</code> and after <code>document.fonts.ready</code>), publishing it as the <code>--_space-advance</code> ratio that the anchor's margin subtracts.</li>
            <li><strong>Fallback</strong> — <code>height: 1.1em</code> is declared before <code>height: 1lh</code> for browsers without the <code>lh</code> unit (pre-Chrome 109 / Safari 16.4 / Firefox 120).</li>
            <li><strong>Consequences</strong> — the heading slot must stay inline-level (a block child pushes the badge onto its own line), and the badge may wrap to its own line on narrow viewports like any inline content.</li>
            <li><strong>Tokens</strong> — added <code>--page-header-badge-size</code> (<code>0.8em</code>) and <code>--page-header-badge-gap</code> (<code>0.27em</code>), both overridable per instance. Added the <code>badge-anchor</code> and <code>badge</code> CSS shadow parts.</li>
          </ul>
        </li>
        <li><strong>Storybook grouping changed</strong> — moved out of the "Brand" folder: story path is now <code>Components/Page Header</code> (was <code>Components/Brand/Page Header</code>). PageHeader has been adopted across all page types, not just brand/campaign pages, so it no longer belongs under the Brand grouping. No API, prop, or token changes — <code>theme="brand"</code> remains a valid theme value.</li>
        <li><strong>XS/mobile vertical padding reduced to 24px</strong> (was 40px), realigned to Figma. The root padding on the sub-768px breakpoint now uses the <code>--linear-sp-linear-6</code> spacing token instead of a hardcoded <code>40px</code>.</li>
        <li><strong>AI docs refreshed</strong> (<code>docs/ai-prompts/components/page-header.md</code>) — removed stale references to <code>--page-header-image-radius</code>, the −3deg image rotation, and the circular mobile image; documented that the layout switch is a container query on the component's own width, not a viewport media query.</li>
      </ul>

      <h3 style="margin-top:1rem">Badge</h3>
      <ul>
        <li><strong>New <code>--badge-size</code> custom property</strong> drives the seal's width/height, enabling fluid sizing off any unit — e.g. <code>--badge-size: 0.8em</code> to track the surrounding font-size (used by Page Header). The <code>size</code> attribute (<code>sm</code> 32px · <code>md</code> 43px · <code>xl</code> 82px) is now a shorthand that sets this property; setting <code>--badge-size</code> directly overrides it. No visual change to existing usage.</li>
      </ul>

      <h3 style="margin-top:1rem">Storybook</h3>
      <ul>
        <li><strong>Tier toolbar tokens are now generated from <code>tokens.json</code></strong> (<code>.storybook/tier-tokens.ts</code>) instead of a hand-copied table in <code>preview.ts</code> — the Tier simulation can no longer drift from the Figma export. Each Storybook tier maps to a representative Figma Layout mode (<code>2xs_xs</code>→xs, <code>sm</code>→sm, <code>md_lg</code>→lg, <code>xl</code>→2xl); <code>100000px</code> is translated to <code>100%</code> and the export names are aliased to the tokens.css names. Tiers now also simulate <code>--container-width</code> / <code>--container-narrow-width</code> / <code>--page-width</code>.</li>
        <li><strong>Fullscreen stories no longer get the 24px decorator padding.</strong> The global preview decorator padded every story, which shrank full-width components below the iframe width and broke container-query breakpoints — Page Header showed its mobile layout at the 768px "tablet" viewport (container was only 720px). Stories with <code>layout: 'fullscreen'</code> now render edge-to-edge, so the layout switch happens exactly at 768px.</li>
      </ul>

      <h3 style="margin-top:1rem">Docs</h3>
      <ul>
        <li><strong>Dark mode documented correctly</strong> — <code>docs/ai-prompts/index.md</code> and <code>getting-started.md</code> now document <code>&lt;html data-mode="dark"&gt;</code> as the only dark-mode mechanism. The old instruction to link <code>dist/foundation/dark.css</code> was removed (legacy file with hardcoded hex values and no toggle) and <code>packages/tokens/src/index.css</code> carries a deprecation notice.</li>
        <li><strong><code>--spacing-layout-*</code> guidance fixed</strong> — CLAUDE.md and <code>getting-started.md</code> claimed no <code>--spacing-*</code> tokens exist; the responsive <code>--spacing-layout-{xs|sm|md|lg|xl}</code> set is real and now documented. The unimplementable "use <code>--breakpoint-*</code> tokens in media queries" advice was replaced with the viewport-scaling layout tokens.</li>
        <li>Removed dead links to nonexistent pattern/template docs and deleted two empty brace-expansion artifact directories.</li>
        <li><strong>Five new design principles</strong> in <code>docs/ai-prompts/principles.md</code> and the Design Principles page (previously only "Prefer active states over disabled"): style with tokens, never hardcoded values · dark mode comes free if you follow the token rule · use abbreviated size values only · respect the two responsive mechanisms · brand font is for banner headlines only.</li>
        <li><strong>Components README rebuilt</strong> (<code>docs/ai-prompts/components/README.md</code>) — now lists all 16 component docs (previously only Button + "coming soon"); removed naming examples showing nonexistent components. <code>getting-started.md</code> gained a "Token Export Files" section (the <code>100000px</code> full-width sentinel and the Figma-export naming drift) so external AI tools reading <code>tokens.json</code> don't need CLAUDE.md.</li>
        <li><strong>"How to Use with AI" rewritten as a real context-loading guide</strong> (<code>docs/ai-prompts/index.md</code>) — the folder is documented as a self-contained context pack with a load order (index + getting-started + principles, then per-component docs), concrete setup for Claude Code, Cursor and chat tools, and example prompts referencing files that actually exist (the old section referenced a never-written "Auth Page template" and "Hero Section pattern").</li>
        <li><strong>Responsive architecture documented</strong> — new "Two Responsive Mechanisms" section in <code>docs/ai-prompts/layouts/index.md</code>: viewport-driven tokens for page-level spacing/typography vs container queries for component-internal layout, the convention for new layout-switching components, and the narrow-embed caveat. CLAUDE.md gained the matching pitfall plus a table of the Figma-export naming drift (<code>heading-large</code>/<code>poster</code>/<code>mega-poster</code> → <code>heading-lg</code>/<code>heading-xl</code>/<code>heading-2xl</code>).</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-06-18 (button large/xl padding)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-06-18" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-06-18</h2>
        <button class="cl-copy-btn" data-anchor="2026-06-18">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="margin-top:1rem">Tile</h3>
      <ul>
        <li><strong>Labels now wrap to up to 3 lines</strong> (then ellipsis), realigned to Figma (node <code>4208:4297</code>). Previously labels were single-line with truncation.</li>
        <li><strong>Content is top-aligned</strong> — the icon and first label line start at the same level for every tile in a row, regardless of how many lines a neighbouring label takes (the tile fills the grid cell with <code>height: 100%</code> and <code>justify-content: flex-start</code>).</li>
        <li><strong>Counter pill recoloured to tertiary blue</strong> with white text (was an inverted black pill).</li>
      </ul>

      <h3 style="margin-top:1rem">Tile · Tokens</h3>
      <ul>
        <li><code>--tile-counter-surface</code> retargeted <code>var(--button-secondary-text)</code> → <code>var(--button-tertiary-text)</code> (blue <code>#006eb9</code>).</li>
        <li><code>--tile-counter-text</code> retargeted <code>var(--button-secondary-surface)</code> → <code>var(--color-core-white)</code>.</li>
        <li>Added <code>--tile-label-line-height</code> (<code>var(--pixel-px-18)</code> = 18px) and <code>--tile-label-max-lines</code> (<code>3</code>). Removed <code>--tile-label-row-height</code> (label row is no longer fixed-height).</li>
      </ul>

      <h3 style="margin-top:1rem">Button</h3>
      <ul>
        <li><strong>Large &amp; XL horizontal padding widened to 48px</strong> to match Figma (node <code>284:5283</code>). The <code>lg</code> and <code>xl</code> sizes now use a more spacious <code>--button-large-padding-x</code> (48px, was 16px); vertical padding (12px) is unchanged.</li>
        <li><strong>New <code>full-width</code> boolean attribute</strong> (Figma "Fill container" sizing). <code>&lt;minis-button full-width&gt;</code> stretches the button to its container's width and centres the content — no consumer CSS needed. Use for stacked, full-width layouts such as the <code>xs</code> breakpoint or a mobile sheet. By default the button still hugs its content (<code>display: inline-block</code>).</li>
      </ul>

      <h3 style="margin-top:1rem">Tokens</h3>
      <ul>
        <li><strong><code>--button-large-padding-x</code> retargeted</strong> to <code>var(--linear-sp-linear-12)</code> (48px), was <code>var(--linear-sp-linear-4)</code> (16px). Affects both the <code>lg</code> and <code>xl</code> button sizes. Fallbacks in <code>button.styles.ts</code> updated <code>16px</code> → <code>48px</code> to match.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-06-12 (quality fixes: checkbox forms, no-icon/no-badge, build & CI)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-06-12" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-06-12</h2>
        <button class="cl-copy-btn" data-anchor="2026-06-12">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="margin-top:1rem">Tag</h3>
      <ul>
        <li><strong>New <code>in-color</code> boolean attribute</strong> on the <code>toggle</code> variant (mirrors the Figma "In Color" property). When set, the icon renders in the brand/danger accent (<code>--color-interaction-danger-accent</code>, red) and the hover tint uses the danger palette; the label and borders stay neutral. Typical use: a red "like"/favourite heart. Works with <code>icon-only</code> too.</li>
        <li><strong>Toggle state model aligned to Figma</strong> — the toggled state no longer paints a background. Default and toggled share the resting surface; the outline ↔ filled icon (swapped by the consumer) is the state indicator, and <strong>hover</strong> is the only state that tints the background.</li>
        <li><strong>Icon-only toggle is now borderless</strong> over a primary (white) surface (<code>--color-surface-primary</code>) — these sit over photos.</li>
        <li>Added <code>tag.figma.ts</code> Code Connect mapping for the <code>tag/toggle</code> Figma component (maps <code>Icon only</code>, <code>State</code>, <code>In Color</code>).</li>
        <li><strong>Tokens</strong> (component override hooks): added <code>--tag-toggle-surface</code>, <code>--tag-toggle-icon-only-surface</code>, <code>--tag-toggle-color-accent</code>, <code>--tag-toggle-color-hover-surface</code>, <code>--tag-toggle-color-hover-border</code>; <code>--tag-toggle-hover-border</code> now defaults to the neutral border colour; removed <code>--tag-toggle-pressed-surface</code> / <code>--tag-toggle-pressed-border</code>.</li>
      </ul>

      <h3 style="margin-top:1rem">Tokens</h3>
      <ul>
        <li><strong><code>--color-branding-green</code> retargeted to primitive green 45</strong> — now <code>var(--color-green-45)</code> (<code>#088107</code>), was <code>var(--color-green-35)</code> (<code>#136110</code>). Brightens the <code>green</code> page-header theme; matches the updated Figma <code>Color/Branding/green</code> variable.</li>
        <li><strong>New <code>--button-primary-hover-shadow</code></strong> — the primary button's layered blue-toned hover <code>box-shadow</code> (five <code>rgba(0, 71, 120, …)</code> layers), previously hardcoded in <code>button.styles.ts</code>, is now a component token.</li>
        <li><code>button.styles.ts</code> and <code>message.styles.ts</code> now reference <code>var(--button-primary-hover-shadow)</code> / <code>var(--message-shadow)</code> without hardcoded fallbacks. Rendered values unchanged.</li>
      </ul>

      <h3 style="margin-top:1rem">Badge</h3>
      <ul>
        <li><strong>New <code>brand</code> color variant</strong> — <code>&lt;minis-badge color="brand"&gt;</code> paints the seal in Slevomat brand cyan via <code>--color-branding-brand</code> (<code>var(--color-blue-65)</code> → <code>#00b2e5</code>). Joins <code>pink</code> (default), <code>yellow</code>, and <code>blue</code>.</li>
        <li><strong>Code Connect mapping fixed</strong> — <code>badge.figma.ts</code> referenced a non-existent <code>Color</code> property (the Figma variant property is lowercase <code>color</code>) and didn't map <code>Size</code>. Both now mapped.</li>
      </ul>

      <h3 style="margin-top:1rem">Checkbox</h3>
      <ul>
        <li><strong>Form association via ElementInternals</strong> — <code>&lt;minis-checkbox name="…" value="…"&gt;</code> now actually submits with a surrounding <code>&lt;form&gt;</code>. Previously the hidden native input lived inside Shadow DOM where forms cannot see it, so <code>name</code>/<code>value</code> were silently ignored.</li>
        <li>Participates in <code>form.reset()</code> (restores initial checked state) and <code>&lt;fieldset disabled&gt;</code>.</li>
        <li>Redundant hidden <code>&lt;input&gt;</code> removed; keyboard, ARIA and click behaviour unchanged.</li>
      </ul>

      <h3 style="margin-top:1rem">Alert</h3>
      <ul>
        <li><strong>BREAKING</strong>: <code>icon</code> attribute replaced by <code>no-icon</code>. <code>icon="false"</code> never worked — HTML boolean attributes are true whenever present. Use <code>&lt;minis-alert no-icon&gt;</code> to hide the icon (shown by default).</li>
      </ul>

      <h3 style="margin-top:1rem">Page Header</h3>
      <ul>
        <li><strong>BREAKING</strong>: <code>badge</code> attribute replaced by <code>no-badge</code>, for the same reason as Alert's <code>icon</code>. The seal is shown by default; use <code>&lt;minis-page-header no-badge&gt;</code> to hide it.</li>
        <li><strong>Badge color realigned to Figma</strong> — the checkmark seal is now red (<code>color="pink"</code>) on every theme, except the <code>pink</code> theme, which uses a brand-cyan seal (<code>color="brand"</code>) for contrast. Desktop (<code>md</code>) and mobile (<code>sm</code>) badges now share the same color (previously a per-theme pink/yellow mix that differed between breakpoints).</li>
      </ul>

      <h3 style="margin-top:1rem">Build &amp; tooling</h3>
      <ul>
        <li><strong>Fixed broken package build</strong> — the three <code>*.figma.ts</code> Code Connect files imported <code>html</code> from the React-only root of <code>@figma/code-connect</code>, failing <code>tsc</code> (TS2614). They now import from <code>@figma/code-connect/html</code> and are excluded from the build tsconfig.</li>
        <li><strong>New CI workflow</strong> — <code>pnpm build</code> + <code>pnpm lint</code> run on every push and pull request.</li>
        <li>Added <code>.eslintignore</code> — lint previously crashed on a symlink loop in <code>storybook-static</code>; also removed dead code it flagged (unused imports/helpers in navigation &amp; page-header stories and the tokens build script).</li>
        <li><strong>Size naming convention corrected in CLAUDE.md</strong> — components use abbreviated sizes matching Figma variant names (<code>xs | sm | md | lg | xl</code>); the documented full-word convention never matched the shipped code.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-06-11 (badge size attribute)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-06-11" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-06-11</h2>
        <button class="cl-copy-btn" data-anchor="2026-06-11">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="margin-top:1rem">Page Header</h3>
      <ul>
        <li><strong>New component <code>&lt;minis-page-header&gt;</code></strong> — full-width branded banner for category and campaign pages.</li>
        <li><strong>5 themes</strong>: <code>brand</code> (cyan, default), <code>blue</code>, <code>yellow</code>, <code>pink</code>, <code>green</code> — uses <code>--color-branding-*</code> tokens for the background.</li>
        <li><strong>Responsive layout</strong>: horizontal on desktop (≥768 px) — content left, image right; stacked on mobile — image top, content below.</li>
        <li><strong>Slots</strong>: default (heading HTML), <code>image</code> (decorative photo), <code>button</code> (CTA).</li>
        <li><strong>Attributes</strong>: <code>description</code> (string), <code>tag</code> (string, countdown pill), <code>badge</code> (boolean, default <code>true</code> — shows Brand/Badge seal).</li>
        <li>Desktop layout corrected to match Figma: all content left-aligned; heading row is natural-width so the Brand/Badge seal sits right after the last line of heading text — not pushed to the far right.</li>
        <li>Mobile badge uses yellow on most themes, pink on the yellow theme.</li>
        <li><strong>Responsive layout now uses CSS container queries</strong> — <code>@container page-header (min-width: 768px)</code> with <code>container-type: inline-size</code> on <code>:host</code>. The component responds to its own rendered width so the Storybook viewport toolbar correctly switches between layouts.</li>
        <li>Storybook: added <strong>Mobile Layout</strong> story; use the viewport toolbar (device icon) to resize the canvas below 768 px to see mobile layout.</li>
      </ul>

      <h3 style="margin-top:1rem">Storybook / preview.ts</h3>
      <ul>
        <li><strong>xl viewport tier</strong> now injects <code>--typography-brand-xl-size: var(--typography-size-5xl)</code> (56 px) and <code>--typography-brand-xl-line-height: var(--typography-line-height-100)</code> — matches the Figma 1480 px+ breakpoint value when the xl tier is selected in the Storybook toolbar.</li>
        <li><strong>Tier toolbar renamed</strong> from <code>viewport</code> to <code>tier</code> in <code>globalTypes</code>, freeing <code>globals.viewport</code> for the standard Storybook viewport addon. The device-selector icon in the toolbar now actually resizes the iframe so container queries respond.</li>
        <li><strong>One-click viewport + tier sync</strong> — selecting a device preset (e.g. "Small mobile") now automatically applies the matching tier tokens AND updates the Tier toolbar label. A <code>window resize</code> listener reads <code>window.innerWidth</code> when the viewport addon resizes the iframe and derives the correct tier. The Tier dropdown remains available for forcing a specific tier at responsive (full) width.</li>
      </ul>

      <h3 style="margin-top:1rem">Tokens</h3>
      <p><strong>New <code>--color-branding-*</code> tokens</strong> — semantic aliases over colour primitives:</p>
      <ul>
        <li><code>--color-branding-pink</code> → <code>var(--color-pink-45)</code></li>
        <li><code>--color-branding-yellow</code> → <code>var(--color-yellow-75)</code></li>
        <li><code>--color-branding-blue</code> → <code>var(--color-blue-45)</code></li>
        <li><code>--color-branding-brand</code> → <code>var(--color-blue-65)</code></li>
        <li><code>--color-branding-green</code> → <code>var(--color-green-35)</code></li>
      </ul>
      <p><strong>New <code>--font-text-bold</code></strong> — <code>var(--typography-weight-bold)</code> in light; overridden to <code>var(--typography-weight-semibold)</code> in dark.</p>

      <h3 style="margin-top:1rem">Badge</h3>
      <ul>
        <li><strong>Colors now use branding semantic tokens</strong> — <code>--color-branding-pink/yellow/blue</code> instead of primitives. The <code>yellow</code> variant now resolves to <code>--color-yellow-75</code> (warm golden amber) instead of <code>--color-yellow-45</code>.</li>
        <li><strong>New <code>size</code> attribute</strong> — <code>sm</code> 32 px, <code>md</code> 43 px, <code>xl</code> 82 px (default).</li>
        <li><code>sm</code> is intended for XS/SM breakpoint headlines; <code>md</code> for headline companions on larger viewports.</li>
        <li>Existing usage without <code>size</code> is unaffected — defaults to <code>xl</code>.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-06-05 (brand-check new component + tokens)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-06-05" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-06-05</h2>
        <button class="cl-copy-btn" data-anchor="2026-06-05">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="margin-top:1rem">Badge</h3>
      <p><strong>New component <code>&lt;minis-badge&gt;</code></strong></p>
      <ul>
        <li>Decorative scalloped seal badge with a white checkmark — three color variants: <code>pink</code> (default), <code>yellow</code>, <code>blue</code>.</li>
        <li>Natural size 82×82 px; scale freely via CSS <code>width</code> / <code>height</code>.</li>
        <li>Inline SVG — no external assets, no slots, no events.</li>
        <li>Colors use existing primitive tokens: <code>--color-pink-45</code>, <code>--color-yellow-45</code>, <code>--color-blue-45</code>.</li>
        <li>Storybook path: <strong>Components / Brand / Badge</strong>.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-06-04 (card-grid navigation vertical-slots)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-06-04" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-06-04</h2>
        <button class="cl-copy-btn" data-anchor="2026-06-04">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="margin-top:1rem">Card Grid</h3>
      <p><strong><code>&lt;minis-card-grid&gt;</code> navigation variant — <code>vertical-slots</code> subvariants (desktop only)</strong></p>
      <ul>
        <li>New attribute <code>vertical-slots</code> (<code>"0" | "1" | "2"</code>, default <code>"0"</code>) on <code>&lt;minis-card-grid variant="navigation"&gt;</code>.</li>
        <li><code>vertical-slots="0"</code> — unchanged standard layout: featured wide card top-left, wide card bottom-right.</li>
        <li><code>vertical-slots="1"</code> — item 2 spans both rows in col 3 (one tall vertical photo). Layout: <code>[C1 C1 C2 C3] / [C4 C5 C2 C6]</code>.</li>
        <li><code>vertical-slots="2"</code> — items 2 and 4 each span both rows (two tall vertical photos in cols 1–2). Layout: <code>[C4 C2 C1 C3] / [C4 C2 C5 C6]</code>.</li>
        <li>All three subvariants collapse to the same 3×2 horizontal scroll strip on mobile (&lt;768px).</li>
      </ul>
      <p><strong>Bug fix — mobile height for <code>navigation</code> variants</strong></p>
      <ul>
        <li>Previous mobile height was <code>172px</code> (1 row), clipping the second row — the breakpoint switch appeared to have no effect.</li>
        <li>Fixed to <code>352px</code> (<code>calc(2 × --card-grid-xs-item-size + --card-grid-gap)</code>), matching the Figma xs spec. Applies to <code>navigation</code>, <code>navigation-small</code> (rows=2 and rows=3).</li>
      </ul>
      <p><strong>Bug fix — navigation mobile grid: 3 columns for equal row distribution</strong></p>
      <ul>
        <li>With 4 columns and 6 items: row 1 had 4, row 2 had 2 (unequal). Fixed to <strong>3 columns</strong>: 3 items per row in both rows. Grid is 3 × 172px = 516px — the third column peeks at ~390px to invite scrolling.</li>
      </ul>
      <p><strong>Improvement — container queries replace media queries</strong></p>
      <ul>
        <li>All <code>@media (max-width: 767px)</code> replaced with <code>@container (max-width: 767px)</code>. <code>:host</code> is now <code>container-type: inline-size</code>. An inner <code>.host-wrapper</code> div carries height and overflow.</li>
        <li>The Storybook breakpoint switcher now correctly triggers the mobile layout.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-05-29 (tokens: Kensington + new typography scale)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-05-29" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-05-29</h2>
        <button class="cl-copy-btn" data-anchor="2026-05-29">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="margin-top:1rem">Tokens</h3>
      <p><strong>Kensington — brand typeface name corrected &amp; new typography scale tokens (Figma sync)</strong></p>
      <ul>
        <li><code>@font-face</code> font-family name corrected: <code>'Kensington Compressed Bold'</code> → <code>'Kensington'</code> (matches Figma family name).</li>
        <li><code>--typography-font-family-brand</code> updated: <code>'Kensington Compressed Bold'</code> → <code>'Kensington'</code>.</li>
        <li>New <code>--typography-line-height-110: 110%</code> — tight line-height for brand headlines.</li>
        <li>New <code>--typography-size-3xs: var(--linear-sp-linear-2)</code> — 8px, smallest size in the scale.</li>
        <li>New <code>--typography-size-5xl: var(--linear-sp-linear-14)</code> — 56px, largest size in the scale.</li>
        <li>New brand heading composite responsive tokens:
          <ul>
            <li><code>--typography-brand-lg-size</code> — 24px base → 32px at 1480px+</li>
            <li><code>--typography-brand-lg-line-height: var(--typography-line-height-110)</code></li>
            <li><code>--typography-brand-xl-size</code> — 32px base → 56px at 1480px+</li>
            <li><code>--typography-brand-xl-line-height: var(--typography-line-height-110)</code></li>
          </ul>
        </li>
        <li><code>@font-face</code> added for <code>'Kensington'</code> typeface; font file distributed via <code>@minis/tokens</code> dist.</li>
      </ul>

      <h3 style="margin-top:1rem">Docs</h3>
      <ul>
        <li>Storybook <strong>Design Tokens → Typography → Font Families</strong> — updated brand row to <code>'Kensington'</code>.</li>
        <li>Storybook <strong>Design Tokens → Typography → Font Sizes</strong> — added <code>--typography-size-3xs</code> (8px) and <code>--typography-size-5xl</code> (56px).</li>
        <li>Storybook <strong>Design Tokens → Typography → Line Heights</strong> — added <code>--typography-line-height-110</code> (110%).</li>
        <li>Storybook <strong>Design Tokens → Text Styles</strong> — new "Brand Headings" section with <em>Brand / LG</em> and <em>Brand / XL</em> responsive live previews.</li>
        <li>Typography section in <code>docs/ai-prompts/getting-started.md</code> — all three font-family tokens documented.</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-05-28 (docs: design principles)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-05-28" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-05-28</h2>
        <button class="cl-copy-btn" data-anchor="2026-05-28">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="font-size:1rem;margin:.75rem 0 .25rem">Docs — Design Principles</h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <p style="margin:0 0 .5rem"><strong>New: Design Principles section</strong> — establishes the first system-wide design principle: <em>Prefer active states over disabled</em>.</p>
        <ul style="margin:0;padding-left:1.25rem">
          <li>New <code>docs/ai-prompts/principles.md</code> — canonical reference with rationale, before/after code examples, and the 3-condition rule for when <code>disabled</code> is actually appropriate.</li>
          <li>New <strong>Design Principles</strong> Storybook story under Introduction.</li>
          <li><code>docs/ai-prompts/index.md</code> — Principles navigation section added.</li>
          <li><code>CLAUDE.md</code> — rule added to Common pitfalls so Claude Code follows it automatically.</li>
          <li><code>docs/ai-prompts/components/{button,checkbox,action-row,tile,tag}.md</code> — callout added near each component's <code>disabled</code> documentation, linking to the principles page.</li>
        </ul>
      </div>

      <h3 style="font-size:1rem;margin:.75rem 0 .25rem">Checkbox — indeterminate state</h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <p style="margin:0 0 .5rem"><strong>Indeterminate state added</strong> — new <code>indeterminate</code> boolean attribute displays a dash inside the box, using the same filled-blue background as the checked state.</p>
        <ul style="margin:0;padding-left:1.25rem">
          <li>Hover and disabled variants supported for the indeterminate state.</li>
          <li>Clicking an indeterminate checkbox resolves to <code>checked=true, indeterminate=false</code>.</li>
          <li><code>aria-checked</code> now outputs <code>"mixed"</code> when indeterminate (ARIA 1.2 tri-state checkbox).</li>
          <li><code>change</code> event detail extended: <code>{ checked: boolean, indeterminate: boolean }</code>.</li>
          <li>New <strong>Indeterminate</strong> story; <strong>States</strong> story updated to a 3-column grid.</li>
        </ul>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-05-22 (tokens: dark mode background + surface)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-05-22" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-05-22</h2>
        <button class="cl-copy-btn" data-anchor="2026-05-22">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="font-size:1rem;margin:.75rem 0 .25rem">Tokens — dark mode colours</h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <p style="margin:0 0 .5rem"><strong>Dark mode background and surface tokens updated</strong> to match production dark mode colours.</p>
        <ul style="margin:0;padding-left:1.25rem">
          <li><code>--color-background</code> (dark): <code>var(--color-core-black)</code> → <code>var(--color-grey-10)</code></li>
          <li><code>--color-surface-primary</code> (dark): <code>var(--color-grey-20)</code> → <code>var(--color-grey-25)</code></li>
          <li><code>--color-surface-faded</code> (dark): <code>var(--color-grey-10)</code> → <code>var(--color-grey-25)</code></li>
        </ul>
        <p style="margin:.5rem 0 0;font-size:.875rem;color:var(--color-text-secondary,#666)">Both classic and gift schema dark-mode overrides updated.</p>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-05-21 (tokens: typography line-height export fix)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-05-21" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-05-21</h2>
        <button class="cl-copy-btn" data-anchor="2026-05-21">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="font-size:1rem;margin:.75rem 0 .25rem">Tokens — typography line-height</h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:0;padding-left:1.25rem">
          <li><strong>Line-height scale export fixed.</strong> The Figma token exporter plugin now emits the <code>typography/line-height</code> collection correctly — previously Figma stored meaningless internal floats and produced CSS-invalid variable names containing <code>%</code>.</li>
          <li>Renamed scale tokens <code>--typography-line-height-percentage-{n}%</code> → <code>--typography-line-height-{n}</code> (the trailing <code>%</code>, invalid in a CSS custom property name, is gone).</li>
          <li>Values changed from unitless ratios to percentages — e.g. <code>--typography-line-height-138</code> is now <code>138%</code> (was <code>1.38</code>).</li>
          <li>New token <code>--typography-line-height-90</code> (<code>90%</code>).</li>
          <li>Responsive tokens <code>--typography-heading-{lg,md,sm}-line-height</code>, <code>--typography-body-md-line-height</code>, <code>--typography-body-sm-line-height</code> now reference the renamed scale.</li>
          <li>Body responsive line-height tokens renamed <code>--typography-body-line-height</code> → <code>--typography-body-md-line-height</code> and <code>--typography-body-s-line-height</code> → <code>--typography-body-sm-line-height</code>, aligning the Layout collection with the <code>body/md</code> · <code>body/sm</code> text-style tiers — body text styles now resolve their <code>line-height</code> to a <code>var()</code> reference instead of a frozen value.</li>
          <li>Caption text style <code>--typography-caption-s</code> renamed to <code>--typography-caption-sm</code>, consistent with the <code>xs</code> / <code>xxs</code> siblings.</li>
          <li>Heading MD and SM weights corrected to <strong>semibold (600)</strong> to match the Figma text styles — Storybook previously showed them as medium (500).</li>
          <li>Components updated to the new names: <code>&lt;minis-alert&gt;</code>, <code>&lt;minis-button&gt;</code>, <code>&lt;minis-checkbox&gt;</code>, <code>&lt;minis-navigation-item&gt;</code>, <code>&lt;minis-pill-counter&gt;</code>.</li>
        </ul>
      </div>

      <h3 style="font-size:1rem;margin:.75rem 0 .25rem">Storybook</h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:0;padding-left:1.25rem">
          <li><strong>Design Tokens → Typography</strong> — new <em>Line Heights</em> table documenting the full <code>--typography-line-height-{n}</code> scale with rendered previews.</li>
          <li><strong>Design Tokens → Text Styles</strong> — new <em>Responsive line-heights</em> table. Heading and Body previews and Spec columns read live values and re-flow when the Viewport toolbar tier changes.</li>
          <li><strong>Design Tokens → Text Styles</strong> — each row's Token column leads with the Figma composite text-style token (<code>--typography-heading-sm</code>, <code>--typography-body-md</code>…) and lists the <code>size</code> + <code>line-height</code> tokens it resolves to. Headings, Body and Caption tables now share one consistent layout.</li>
          <li>The Viewport switcher now overrides the responsive line-height tokens per tier, so line-heights visibly tighten/loosen across <strong>2xs/xs · sm · md/lg · xl</strong>.</li>
        </ul>
      </div>

      <h3 style="font-size:1rem;margin:.75rem 0 .25rem">Tile</h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:0;padding-left:1.25rem">
          <li><strong>Storybook docs updated</strong> — <em>Grid Example</em> story replaced by <em>Navigation Grid</em>: a realistic 4-column shortcut grid (Moje nákupy, Košík, Oblíbené, Profil, Dárky, Extra slevy, Cashback, Benefity) demonstrating the primary grid usage pattern with <code>gap:8px</code> (<code>--linear-sp-linear-2</code>) on both axes and optional counter pills.</li>
        </ul>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-05-15 (new component: tile + storybook: Navigations folder)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-05-15" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-05-15</h2>
        <button class="cl-copy-btn" data-anchor="2026-05-15">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-tile&gt;</code> — New component
      </h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:0;padding-left:1.25rem">
          <li>Vertical, icon-based navigation tile for primary shortcuts — typically arranged in a 4-column homepage grid.</li>
          <li>Renders as <code>&lt;button&gt;</code> by default; as <code>&lt;a&gt;</code> when <code>href</code> is set.</li>
          <li>Props: <code>href</code> (string), <code>counter</code> (string — inline pill after label), <code>disabled</code> (boolean).</li>
          <li>Required slots: <code>icon</code> (24×24 px, use <code>&lt;minis-icon slot="icon"&gt;</code>) and default slot (label text).</li>
          <li>States: <code>default</code>, <code>hover</code> (blue-tinted surface), <code>disabled</code> (opacity 0.6, no pointer events).</li>
          <li>Fixed height <strong>70 px</strong>: 1 px border + 12 px top pad + 24 px icon + 4 px gap + 16 px label row + 12 px bottom pad + 1 px border.</li>
          <li>Icon colour: blue <code>#006eb9</code> via <code>--tile-icon-color</code> — separate from label colour (black).</li>
          <li>Counter pill uses inverted colours: black background (<code>--tile-counter-surface</code>), white text (<code>--tile-counter-text</code>).</li>
          <li><code>:host</code> enforces <code>min-width: calc(2 × --tile-padding-x)</code> = 64 px — x-padding (32 px each side) is always visible; labels truncate with <code>…</code> rather than padding collapsing.</li>
          <li>Grid: use <code>repeat(N, 1fr)</code> for equal-width columns. Reduce column count in tighter spaces — do not shrink tiles to squeeze more columns in.</li>
          <li>New tokens: <code>--tile-surface</code>, <code>--tile-border</code>, <code>--tile-text</code>, <code>--tile-icon-color</code>, <code>--tile-hover-surface</code>, <code>--tile-counter-surface</code>, <code>--tile-counter-text</code>, <code>--tile-padding-top</code>, <code>--tile-padding-bottom</code>, <code>--tile-padding-x</code>, <code>--tile-gap-elements-y</code>, <code>--tile-gap-elements-x</code>, <code>--tile-label-row-height</code>.</li>
          <li>Storybook stories: Playground, States, With Counter, As Link, Grid Example — under <strong>Components / Navigations / Tile</strong>.</li>
          <li>AI prompt reference: <code>docs/ai-prompts/components/tile.md</code>.</li>
        </ul>
      </div>

      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-action-row&gt;</code> — Tokens
      </h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:0;padding-left:1.25rem">
          <li><code>--action-row-text</code> updated: now references <code>--color-text-primary</code> (was <code>--color-interaction-secondary-accent</code>). Same value in light mode; slightly different in dark mode.</li>
          <li><code>--action-row-icon</code> added: references <code>--button-tertiary-text</code> (blue <code>#006eb9</code>). Leading icons in <code>variant="icon"</code> now use the tertiary-action blue, separate from the text colour.</li>
        </ul>
      </div>

      <h3 style="font-size:1rem;margin:.75rem 0 .25rem">Storybook</h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:0;padding-left:1.25rem">
          <li>Navigation and Action Row components grouped under a new <strong>Navigations</strong> folder, reflecting their shared role in building all kinds of navigation and menus.</li>
        </ul>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-05-14 (new components: action-row, checkbox + token sync)
           ═══════════════════════════════════════════════════════════ -->
      <div class="cl-heading">
        <h2 id="2026-05-14" style="font-size:1.25rem;margin-bottom:.25rem;margin-top:0">2026-05-14</h2>
        <button class="cl-copy-btn" data-anchor="2026-05-14">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="copy-label">Copy link</span>
        </button>
      </div>

      <h3 style="display:flex;align-items:center;gap:.5rem;font-size:1rem;margin:.75rem 0 .25rem">
        <code style="background:var(--color-surface-faded,#f1f3f5);padding:.2rem .5rem;border-radius:4px">&lt;minis-action-row&gt;</code>
      </h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:0;padding-left:1.25rem">
          <li><strong>New component</strong> — interactive list row for vertical menus, dropdowns and filter lists. Always clickable.</li>
          <li>Leading <code>variant</code> (mutually exclusive): <code>none</code> (label only), <code>icon</code> (24×24 icon slot), <code>checkbox</code> (leading <code>&lt;minis-checkbox&gt;</code>).</li>
          <li>States: <code>default</code> / <code>hover</code> (auto on hover or forced via <code>state="hover"</code>) / <code>active</code> (persistent highlight). Hover wins over active — an active row turns blue-tinted on hover.</li>
          <li>Optional trailing counter via <code>counter</code> prop — always sits directly after the label, rendered as <code>&lt;minis-pill-counter size="lg"&gt;</code> with white background and primary text.</li>
          <li><code>checked</code> property only applies to <code>variant="checkbox"</code>.</li>
          <li>
            New design tokens added in <code>@minis/tokens</code>:
            <code>--action-row-border-radius</code>,
            <code>--action-row-surface</code>,
            <code>--action-row-text</code>,
            <code>--action-row-hover-surface</code>,
            <code>--action-row-active-surface</code>,
            <code>--action-row-padding-x</code>,
            <code>--action-row-padding-y</code>,
            <code>--action-row-padding-x-icon-only</code>,
            <code>--action-row-padding-x-checkbox</code>,
            <code>--action-row-gap-icon</code>,
            <code>--action-row-gap-checkbox</code>.
          </li>
          <li>AI prompt doc added at <code>docs/ai-prompts/components/action-row.md</code>.</li>
        </ul>
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

      <h3 style="font-size:1rem;margin-bottom:.25rem">Tokens (Figma sync)</h3>
      <div style="border-left:3px solid var(--color-interaction-primary-surface,#006eb9);padding:.75rem 1rem 0 1rem;margin:.5rem 0 1rem 0">
        <ul style="margin:0;padding-left:1.25rem">
          <li><strong>New button tokens</strong> — <code>--button-padding-x-icon-only</code> and <code>small</code>/<code>large</code> variants; <code>--button-gap-addon</code> (8px), <code>--button-gap-spacer</code> (2px) and size variants; <code>--button-icon-opacity</code> (1) + <code>--button-icon-opacity-icon-only-counter-pill</code> (0.75)</li>
          <li><strong>New</strong> <code>--cardgrid-gap</code>, <code>--menu-item-gap</code> for upcoming components</li>
          <li><strong>New typography line-height composites</strong> (responsive at md+): <code>--typography-body-line-height</code>, <code>--typography-body-s-line-height</code>, <code>--typography-heading-{lg,md,sm}-line-height</code></li>
          <li><strong>New layout tokens</strong>: <code>--container-bleeding-edge-padding</code> (0 → 16px lg → 32px xl+) and <code>--page-width</code> (tracks current breakpoint)</li>
          <li><strong>New effect tokens</strong>: <code>--effect-background-blur-10</code>, <code>--effect-elevation</code></li>
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
      <!--  PART 0 — SKILLS                                             -->
      <!-- ═══════════════════════════════════════════════════════════════ -->

      <h2 id="skills" style="scroll-margin-top:1rem">Skills — shortcuts you can just ask for</h2>
      <p>A <strong>skill</strong> is a set of instructions your AI assistant loads on demand. You don't run a command or read the file — you describe what you want in plain language, and the assistant picks the matching skill up automatically. You can also invoke one by name with a slash, e.g. <code>/minis-app</code>.</p>

      <table style="width:100%;border-collapse:collapse;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce);width:18%">Skill</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">What it does</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce);width:28%">Say something like</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top"><strong><code>minis-app</code></strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top">Builds a whole app or prototype from scratch: sets the project up, picks the right topbar variant, writes your screens with real Mini*S components and tokens, then checks the result in a browser (desktop, mobile and dark mode) before telling you it's done.</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top"><em>"Build me an app for handling refund requests"</em><br/><br/><em>"Make a landing page for the summer campaign"</em></td>
          </tr>
          <tr>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top"><strong><code>slevomat-design-principles</code></strong></td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top">Reviews a feature description or a screenshot against the 7 Slevomat design principles and gives structured feedback.</td>
            <td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:top"><em>"Check this screen against our design principles"</em></td>
          </tr>
        </tbody>
      </table>

      <h3>Where they live</h3>
      <ul>
        <li><strong><code>minis-app</code></strong> ships with this design system, at <code>.claude/skills/minis-app/</code>. It works automatically when your AI tool runs inside the design system repo. To use it from another folder, copy it once:
          <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto;margin:.5rem 0"><code>cp -r &lt;design-system-repo&gt;/.claude/skills/minis-app ~/.claude/skills/</code></pre>
          Re-copy it after the design system changes, so the skill keeps matching the components.</li>
        <li><strong><code>slevomat-design-principles</code></strong> is not shipped in this repo — it comes from the wider Slevomat AI setup. If your assistant doesn't know it, ask whoever set up your tooling.</li>
      </ul>

      <p style="color:var(--color-text-secondary,#6b6b70)">Skills are added as the design system grows. If you find yourself explaining the same multi-step routine to your AI assistant more than twice, that routine probably wants to be a skill — see the <strong>Contribution guide</strong>.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!--  PART 1 — QUICK START                                        -->
      <!-- ═══════════════════════════════════════════════════════════════ -->

      <h2>Quick Start (5 minutes)</h2>
      <blockquote style="border-left:4px solid var(--color-interaction-primary-surface,#006eb9);padding:.5rem 1rem;margin:1rem 0;background:var(--color-surface-faded,#f1f3f5)">
        <strong>Using Claude Code?</strong> Skip the manual steps — the <code>minis-app</code> skill (in the design system repo at <code>.claude/skills/minis-app/</code>) does all of this for you: it asks what you're building, scaffolds the project, picks the right topbar variant, builds your screens from the component docs, and checks the result in a browser. Just say what you want to build.
      </blockquote>
      <p>Prefer to do it by hand? Three steps.</p>

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
