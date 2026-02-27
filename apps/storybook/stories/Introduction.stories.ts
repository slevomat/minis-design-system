import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Introduction',
  tags: ['autodocs'],
  parameters: {
    options: { showPanel: false },
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

      <p><strong>Head of Design:</strong> Michal — michal.strnadel@slevomat.cz</p>
    </div>
  `,
};
