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

      <h2>How to Use</h2>
      <p>To deploy the design system in Figma, simply <strong>enable this library in your design file</strong> and you are good to go.</p>
      <p><strong>The rules for consistent design are simple:</strong></p>
      <ul>
        <li>Follow the design system processes</li>
        <li>Use the provided tokens and components</li>
        <li>Never use custom values for color, spacing, gaps, or typography</li>
        <li>Always use predefined variables in the Mini*S semantic layer</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Component Architecture</h2>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Level</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Description</th>
        </tr></thead>
        <tbody>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Base Components</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Atomic building blocks (Buttons, Inputs, Badges). Strictly governed — never detach.</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)"><strong>Complex Templates</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">"Detach and use" — high-level patterns, customize content while starting from a standardized foundation.</td></tr>
        </tbody>
      </table>
      <p><strong>Mode-Based Appearance:</strong> Light and Dark modes are handled via CSS variables — not component variants. This keeps the library lean and maintainable.</p>

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

export const Changelog: Story = {
  name: 'Changelog',
  render: () => html`
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1 style="font-size:2rem;margin-bottom:.25rem">Changelog</h1>
      <p style="color:var(--color-text-secondary,#666);margin-top:0">Notable changes to Mini*S components and tokens, newest first.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <!-- ═══════════════════════════════════════════════════════════
           2026-03-19 (button sizes)
           ═══════════════════════════════════════════════════════════ -->
      <h2 style="font-size:1.25rem;margin-bottom:.25rem">2026-03-19</h2>

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
      <h2 style="font-size:1.25rem;margin-bottom:.25rem">2026-03-13</h2>

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
      <h2 style="font-size:1.25rem;margin-bottom:.25rem">2026-03-13</h2>

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
      <h2 style="font-size:1.25rem;margin-bottom:.25rem">2026-03-12</h2>

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
      <h2 style="font-size:1.25rem;margin-bottom:.25rem">2026-03-07</h2>

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
      <h2 style="font-size:1.25rem;margin-bottom:.25rem">2026-03-06</h2>

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
      <h2 style="font-size:1.25rem;margin-bottom:.25rem">2026-03-05</h2>

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
      <h2 style="font-size:1.25rem;margin-bottom:.25rem">2026-03-03</h2>

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
