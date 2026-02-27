import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Design Tokens',
  parameters: {
    options: { showPanel: false },
  },
};

export default meta;
type Story = StoryObj;

const tableStyles = `
  border-collapse:collapse;width:100%;margin:1rem 0
`;
const thStyles = `
  padding:.75rem 1rem;text-align:left;background:var(--color-surface-faded,#f1f3f5);border:1px solid var(--color-border,#cbccce)
`;
const tdStyles = `
  padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)
`;
const swatch = (color: string) =>
  `<span style="display:inline-block;width:16px;height:16px;background:${color};border:1px solid var(--color-border,#cbccce);border-radius:2px;vertical-align:middle;margin-right:6px"></span>`;

export const Overview: Story = {
  name: 'Overview',
  render: () => html`
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1>Design Tokens</h1>
      <p>Design tokens are the atomic values of our design system — named entities that store visual attributes. They create a <strong>single source of truth</strong> for colors, typography, spacing, and other design decisions across all platforms.</p>

      <h2>Why Tokens?</h2>
      <table style="${tableStyles}">
        <thead><tr><th style="${thStyles}">Benefit</th><th style="${thStyles}">Description</th></tr></thead>
        <tbody>
          <tr><td style="${tdStyles}"><strong>Consistent Visual Language</strong></td><td style="${tdStyles}">A unified look and feel across all products</td></tr>
          <tr><td style="${tdStyles}"><strong>Faster Design-to-Code</strong></td><td style="${tdStyles}">Streamlined handoffs and implementation</td></tr>
          <tr><td style="${tdStyles}"><strong>Easy Theme Switching</strong></td><td style="${tdStyles}">Effortless transitions between Light and Dark modes</td></tr>
          <tr><td style="${tdStyles}"><strong>Scalable Maintenance</strong></td><td style="${tdStyles}">Update a value once, and it reflects everywhere</td></tr>
        </tbody>
      </table>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Usage in Code</h2>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>.my-element {
  color: var(--color-text-primary);
  background: var(--color-surface-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
}</code></pre>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Light / Dark Mode Principle</h2>
      <blockquote style="border-left:4px solid var(--color-interaction-primary-surface,#006eb9);padding:.5rem 1rem;margin:1rem 0;background:var(--color-surface-faded,#f1f3f5)">
        <strong>Golden Rule:</strong> Always use the Foundation palette. Never reference <code>.Primitives</code> or <code>.Heritage</code> directly.
      </blockquote>
      <ul>
        <li>✅ <strong>DRY Principle</strong> — modes defined only once in Foundation</li>
        <li>✅ <strong>Easy Maintenance</strong> — update mode logic in one place</li>
        <li>✅ <strong>Guaranteed Consistency</strong> — eliminates color conflicts between layers</li>
        <li>✅ <strong>Scalability</strong> — adding new modes only requires Foundation changes</li>
      </ul>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Colors — Text</h2>
      <table style="${tableStyles}">
        <thead><tr><th style="${thStyles}">Token</th><th style="${thStyles}">Value</th></tr></thead>
        <tbody>
          <tr><td style="${tdStyles}"><code>--color-text-primary</code></td><td style="${tdStyles}">${swatch('#000000')}#000000</td></tr>
          <tr><td style="${tdStyles}"><code>--color-text-secondary</code></td><td style="${tdStyles}">${swatch('#6b6b70')}#6b6b70</td></tr>
          <tr><td style="${tdStyles}"><code>--color-text-accent-link</code></td><td style="${tdStyles}">${swatch('#006eb9')}#006eb9</td></tr>
          <tr><td style="${tdStyles}"><code>--color-text-accent-link-hover</code></td><td style="${tdStyles}">${swatch('#005685')}#005685</td></tr>
          <tr><td style="${tdStyles}"><code>--color-text-accent-danger</code></td><td style="${tdStyles}">${swatch('#d2381d')}#d2381d</td></tr>
          <tr><td style="${tdStyles}"><code>--color-text-accent-positive</code></td><td style="${tdStyles}">${swatch('#088107')}#088107</td></tr>
          <tr><td style="${tdStyles}"><code>--color-text-accent-attention</code></td><td style="${tdStyles}">${swatch('#996600')}#996600</td></tr>
        </tbody>
      </table>

      <h2>Colors — Surface & Background</h2>
      <table style="${tableStyles}">
        <thead><tr><th style="${thStyles}">Token</th><th style="${thStyles}">Value</th></tr></thead>
        <tbody>
          <tr><td style="${tdStyles}"><code>--color-background</code></td><td style="${tdStyles}">${swatch('#ffffff')}#ffffff</td></tr>
          <tr><td style="${tdStyles}"><code>--color-surface-primary</code></td><td style="${tdStyles}">${swatch('#ffffff')}#ffffff</td></tr>
          <tr><td style="${tdStyles}"><code>--color-surface-faded</code></td><td style="${tdStyles}">${swatch('#f1f3f5')}#f1f3f5</td></tr>
        </tbody>
      </table>

      <h2>Colors — Feedback</h2>
      <table style="${tableStyles}">
        <thead><tr><th style="${thStyles}">Token</th><th style="${thStyles}">Value</th></tr></thead>
        <tbody>
          <tr><td style="${tdStyles}"><code>--color-feedback-error</code></td><td style="${tdStyles}">${swatch('#d2381d')}#d2381d</td></tr>
          <tr><td style="${tdStyles}"><code>--color-feedback-error-light</code></td><td style="${tdStyles}">${swatch('#ffefec')}#ffefec</td></tr>
          <tr><td style="${tdStyles}"><code>--color-feedback-success</code></td><td style="${tdStyles}">${swatch('#088107')}#088107</td></tr>
          <tr><td style="${tdStyles}"><code>--color-feedback-success-light</code></td><td style="${tdStyles}">${swatch('#e9fce9')}#e9fce9</td></tr>
          <tr><td style="${tdStyles}"><code>--color-feedback-warning</code></td><td style="${tdStyles}">${swatch('#ffa400')}#ffa400</td></tr>
          <tr><td style="${tdStyles}"><code>--color-feedback-info</code></td><td style="${tdStyles}">${swatch('#006eb9')}#006eb9</td></tr>
        </tbody>
      </table>

      <h2>Colors — Interaction Variants</h2>
      <table style="${tableStyles}">
        <thead><tr><th style="${thStyles}">Variant</th><th style="${thStyles}">Surface</th><th style="${thStyles}">Border</th><th style="${thStyles}">Accent (text)</th></tr></thead>
        <tbody>
          <tr><td style="${tdStyles}"><strong>Primary</strong></td><td style="${tdStyles}">${swatch('#006eb9')}#006eb9</td><td style="${tdStyles}">${swatch('#006eb9')}#006eb9</td><td style="${tdStyles}">${swatch('#ffffff')}#ffffff</td></tr>
          <tr><td style="${tdStyles}"><strong>Secondary</strong></td><td style="${tdStyles}">${swatch('#ffffff')}#ffffff</td><td style="${tdStyles}">${swatch('#cbccce')}#cbccce</td><td style="${tdStyles}">${swatch('#000000')}#000000</td></tr>
          <tr><td style="${tdStyles}"><strong>Tertiary</strong></td><td style="${tdStyles}">transparent</td><td style="${tdStyles}">transparent</td><td style="${tdStyles}">${swatch('#006eb9')}#006eb9</td></tr>
          <tr><td style="${tdStyles}"><strong>Danger</strong></td><td style="${tdStyles}">${swatch('#ffffff')}#ffffff</td><td style="${tdStyles}">${swatch('#d2381d')}#d2381d</td><td style="${tdStyles}">${swatch('#d2381d')}#d2381d</td></tr>
          <tr><td style="${tdStyles}"><strong>CTA Buy</strong></td><td style="${tdStyles}">${swatch('#088107')}#088107</td><td style="${tdStyles}">${swatch('#088107')}#088107</td><td style="${tdStyles}">${swatch('#ffffff')}#ffffff</td></tr>
        </tbody>
      </table>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Spacing</h2>
      <table style="${tableStyles}">
        <thead><tr><th style="${thStyles}">Token</th><th style="${thStyles}">Value</th><th style="${thStyles}">Preview</th></tr></thead>
        <tbody>
          ${(['xs:4', 'sm:8', 'md:16', 'lg:24', 'xl:32', '2xl:48', '3xl:64'] as const).map(v => {
            const [name, px] = v.split(':');
            return `<tr>
              <td style="${tdStyles}"><code>--spacing-${name}</code></td>
              <td style="${tdStyles}">${px}px</td>
              <td style="${tdStyles}"><div style="height:12px;background:var(--color-interaction-primary-surface,#006eb9);width:${px}px;border-radius:2px"></div></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>

      <h2>Border Radius</h2>
      <table style="${tableStyles}">
        <thead><tr><th style="${thStyles}">Token</th><th style="${thStyles}">Value</th><th style="${thStyles}">Preview</th></tr></thead>
        <tbody>
          ${(['none:0', 'sm:4px', 'md:8px', 'lg:12px', 'xl:16px', 'full:9999px'] as const).map(v => {
            const [name, val] = v.split(':');
            return `<tr>
              <td style="${tdStyles}"><code>--border-radius-${name}</code></td>
              <td style="${tdStyles}">${val}</td>
              <td style="${tdStyles}"><div style="width:40px;height:40px;background:var(--color-interaction-primary-surface,#006eb9);border-radius:${val}"></div></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>

      <h2>Elevation</h2>
      <table style="${tableStyles}">
        <thead><tr><th style="${thStyles}">Token</th><th style="${thStyles}">Preview</th></tr></thead>
        <tbody>
          ${([
            ['none', 'none'],
            ['xs', '0 1px 2px rgba(0,0,0,0.05)'],
            ['sm', '0 1px 3px rgba(0,0,0,0.1)'],
            ['md', '0 4px 6px rgba(0,0,0,0.1)'],
            ['lg', '0 10px 15px rgba(0,0,0,0.1)'],
            ['xl', '0 20px 25px rgba(0,0,0,0.1)'],
          ] as const).map(([name, val]) => `<tr>
              <td style="${tdStyles}"><code>--elevation-${name}</code></td>
              <td style="${tdStyles}"><div style="width:60px;height:40px;background:#fff;box-shadow:${val};border-radius:4px;border:1px solid var(--color-border-subtle,#e3e4e6)"></div></td>
            </tr>`).join('')}
        </tbody>
      </table>

      <h2>Breakpoints</h2>
      <table style="${tableStyles}">
        <thead><tr><th style="${thStyles}">Token</th><th style="${thStyles}">Value</th></tr></thead>
        <tbody>
          ${(['xs:320px', 'sm:640px', 'md:768px', 'lg:1024px', 'xl:1280px', '2xl:1536px'] as const).map(v => {
            const [name, val] = v.split(':');
            return `<tr><td style="${tdStyles}"><code>--breakpoint-${name}</code></td><td style="${tdStyles}">${val}</td></tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `,
};
