import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import paletteData from './palette-data.json';

/** Wrap a raw HTML string so Storybook docs can render it correctly. */
const r = (s: string) => html`${unsafeHTML(s)}`;

const meta: Meta = {
  title: 'Design Tokens',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

const ts = `border-collapse:collapse;width:100%;margin:1rem 0`;
const th = `padding:.75rem 1rem;text-align:left;background:var(--color-surface-faded,#f1f3f5);border:1px solid var(--color-border,#cbccce)`;
const td = `padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce);vertical-align:middle`;

const sw = (v: string) =>
  `<span style="display:inline-block;width:24px;height:24px;background:var(${v});border:1px solid var(--color-border,#cbccce);border-radius:4px;vertical-align:middle;margin-right:8px;flex-shrink:0"></span>`;

const colorRow = (v: string, label: string) =>
  `<tr><td style="${td}"><div style="display:flex;align-items:center">${sw(v)}<code>${v}</code></div></td><td style="${td}">${label}</td></tr>`;

type PaletteEntry = { hex: string | null; rgb: string | null; oklch: string | null; heritage: string };
const pd = paletteData as unknown as Record<string, PaletteEntry>;

const copyBtn = (value: string) =>
  `<button data-copy=${JSON.stringify(value)}
    title="Copy ${value}"
    style="margin-left:6px;padding:1px 5px;font-size:.7em;border:1px solid var(--color-border,#cbccce);border-radius:3px;background:var(--color-surface-faded,#f5f5f5);color:var(--color-text-secondary,#666);cursor:pointer;vertical-align:middle;line-height:1.4;flex-shrink:0">⎘</button>`;

const copyRow = (label: string, value: string | null) => {
  if (!value) return '';
  return `<div style="display:flex;align-items:center;gap:6px;line-height:1.8">
    <span style="font-size:.72em;font-weight:600;color:var(--color-text-secondary,#999);width:44px;flex-shrink:0;font-variant-numeric:tabular-nums">${label}</span>
    <code style="font-size:.78em;color:var(--color-text-secondary,#6b6b70)">${value}</code>
    ${copyBtn(value)}
  </div>`;
};

const paletteRow = (v: string) => {
  const entry = pd[v];
  const heritage = entry?.heritage
    ? `<div style="margin-top:3px;font-size:.73em;color:var(--color-text-secondary,#6b6b70);font-style:italic">${entry.heritage}</div>`
    : '';
  // When the hex field is already an rgba()/rgb() value (e.g. alpha tokens), show it
  // with the correct label and skip the separate rgb row (it would be identical).
  const hexVal = entry?.hex ?? null;
  const isAlpha = hexVal !== null && (hexVal.startsWith('rgba(') || hexVal.startsWith('rgb('));
  const hexRow = isAlpha ? copyRow('rgba', hexVal) : copyRow('hex', hexVal);
  const rgbRow = isAlpha ? '' : copyRow('rgb', entry?.rgb ?? null);
  return `<tr>
    <td style="${td}">
      <div style="display:flex;align-items:center;gap:6px">
        <code style="font-size:.82em;font-weight:600">${v}</code>
        ${copyBtn(v)}
      </div>
      ${heritage}
    </td>
    <td style="${td}">
      <div style="display:flex;align-items:flex-start;gap:12px">
        <span style="display:inline-block;width:72px;height:58px;background:var(${v});border:1px solid var(--color-border,#cbccce);border-radius:4px;flex-shrink:0"></span>
        <div style="display:flex;flex-direction:column;justify-content:center;min-height:58px">
          ${copyRow('oklch', entry?.oklch ?? null)}
          ${hexRow}
          ${rgbRow}
        </div>
      </div>
    </td>
  </tr>`;
};

const interactionRow = (label: string, surface: string, border: string, accent: string) =>
  `<tr>
    <td style="${td}"><strong>${label}</strong></td>
    <td style="${td}"><div style="display:flex;align-items:center">${sw(surface)}<code>${surface}</code></div></td>
    <td style="${td}"><div style="display:flex;align-items:center">${sw(border)}<code>${border}</code></div></td>
    <td style="${td}"><div style="display:flex;align-items:center">${sw(accent)}<code>${accent}</code></div></td>
  </tr>`;

const hr = `<hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>`;

export const Overview: Story = {
  name: 'Overview',
  render: () => r(`
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1>Design Tokens</h1>
      <p>Design tokens are the atomic values of our design system — named entities that store visual attributes. They create a <strong>single source of truth</strong> for colors, typography, spacing, and other design decisions across all platforms.</p>

      <h2>Why Tokens?</h2>
      <table style="${ts}">
        <thead><tr><th style="${th}">Benefit</th><th style="${th}">Description</th></tr></thead>
        <tbody>
          <tr><td style="${td}"><strong>Consistent Visual Language</strong></td><td style="${td}">A unified look and feel across all products</td></tr>
          <tr><td style="${td}"><strong>Faster Design-to-Code</strong></td><td style="${td}">Streamlined handoffs and implementation</td></tr>
          <tr><td style="${td}"><strong>Easy Theme Switching</strong></td><td style="${td}">Effortless transitions between Light and Dark modes, Classic and Gift schemas</td></tr>
          <tr><td style="${td}"><strong>Scalable Maintenance</strong></td><td style="${td}">Update a value once, and it reflects everywhere</td></tr>
        </tbody>
      </table>

      ${hr}

      <h2>Token Architecture</h2>
      <p>Tokens are organised in three layers:</p>
      <table style="${ts}">
        <thead><tr><th style="${th}">Layer</th><th style="${th}">Example</th><th style="${th}">Description</th></tr></thead>
        <tbody>
          <tr><td style="${td}"><strong>Primitives</strong></td><td style="${td}"><code>--color-blue-45</code></td><td style="${td}">Raw palette values (OKLCH + HEX). Never use directly in product code.</td></tr>
          <tr><td style="${td}"><strong>Foundation</strong></td><td style="${td}"><code>--color-interaction-primary-surface</code></td><td style="${td}">Semantic tokens — what to use in product code. Auto-switch on theme change.</td></tr>
          <tr><td style="${td}"><strong>Component</strong></td><td style="${td}"><code>--button-primary-surface</code></td><td style="${td}">Component-scoped tokens that reference Foundation layer.</td></tr>
        </tbody>
      </table>

      <blockquote style="border-left:4px solid var(--color-interaction-primary-surface,#006eb9);padding:.5rem 1rem;margin:1rem 0;background:var(--color-surface-faded,#f1f3f5)">
        <strong>Golden Rule:</strong> Always use <strong>Foundation</strong> tokens in product code. Never reference <code>--color-blue-*</code> primitives directly.
      </blockquote>

      <h2>Usage in Code</h2>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto"><code>.my-element {
  color: var(--color-text-primary);
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
}</code></pre>
    </div>
  `),
};

export const Colors: Story = {
  name: 'Colors',
  render: () => r(`
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1>Colors — Foundation Tokens</h1>
      <p>These are the <strong>semantic color tokens</strong> you should use in product code. They automatically adapt to the active theme (Classic / Gift) and mode (Light / Dark).</p>

      <h2>Text</h2>
      <table style="${ts}">
        <thead><tr><th style="${th}">Token</th><th style="${th}">Role</th></tr></thead>
        <tbody>
          ${colorRow('--color-text-primary', 'Primary text — headings, body copy')}
          ${colorRow('--color-text-secondary', 'Secondary / muted text')}
          ${colorRow('--color-text-accent-link', 'Hyperlink colour')}
          ${colorRow('--color-text-accent-link-hover', 'Hyperlink hover')}
          ${colorRow('--color-text-accent-danger', 'Error / destructive text')}
          ${colorRow('--color-text-accent-positive', 'Success / positive text')}
          ${colorRow('--color-text-accent-attention', 'Warning / attention text')}
        </tbody>
      </table>

      <h2>Surface &amp; Background</h2>
      <table style="${ts}">
        <thead><tr><th style="${th}">Token</th><th style="${th}">Role</th></tr></thead>
        <tbody>
          ${colorRow('--color-background', 'Page / app background')}
          ${colorRow('--color-surface-primary', 'Card / panel background')}
          ${colorRow('--color-surface-faded', 'Subtle / faded surface, e.g. table headers')}
        </tbody>
      </table>

      <h2>Border</h2>
      <table style="${ts}">
        <thead><tr><th style="${th}">Token</th><th style="${th}">Role</th></tr></thead>
        <tbody>
          ${colorRow('--color-border', 'Default border')}
          ${colorRow('--color-border-subtle', 'Subtle / low-emphasis border')}
          ${colorRow('--color-border-strong', 'High-emphasis border')}
          ${colorRow('--color-border-focus', 'Focus ring')}
          ${colorRow('--color-border-invalid', 'Invalid / error state border')}
          ${colorRow('--color-border-valid', 'Valid / success state border')}
        </tbody>
      </table>

      <h2>Feedback</h2>
      <table style="${ts}">
        <thead><tr><th style="${th}">Token</th><th style="${th}">Role</th></tr></thead>
        <tbody>
          ${colorRow('--color-feedback-error', 'Error — icon, text')}
          ${colorRow('--color-feedback-error-light', 'Error — background')}
          ${colorRow('--color-feedback-success', 'Success — icon, text')}
          ${colorRow('--color-feedback-success-light', 'Success — background')}
          ${colorRow('--color-feedback-warning', 'Warning — icon, text')}
          ${colorRow('--color-feedback-warning-light', 'Warning — background')}
          ${colorRow('--color-feedback-info', 'Info — icon, text')}
          ${colorRow('--color-feedback-info-light', 'Info — background')}
        </tbody>
      </table>

      <h2>Interaction Variants</h2>
      <p>Each variant exposes <code>surface</code>, <code>border</code>, and <code>accent</code> (text/icon) tokens, plus hover states.</p>
      <table style="${ts}">
        <thead><tr><th style="${th}">Variant</th><th style="${th}">Surface</th><th style="${th}">Border</th><th style="${th}">Accent</th></tr></thead>
        <tbody>
          ${interactionRow('Primary', '--color-interaction-primary-surface', '--color-interaction-primary-border', '--color-interaction-primary-accent')}
          ${interactionRow('Secondary', '--color-interaction-secondary-surface', '--color-interaction-secondary-border', '--color-interaction-secondary-accent')}
          <tr>
            <td style="${td}"><strong>Tertiary</strong></td>
            <td style="${td}">transparent</td>
            <td style="${td}">transparent</td>
            <td style="${td}"><div style="display:flex;align-items:center">${sw('--color-interaction-tertiary-accent')}<code>--color-interaction-tertiary-accent</code></div></td>
          </tr>
          ${interactionRow('Danger', '--color-interaction-danger-surface', '--color-interaction-danger-border', '--color-interaction-danger-accent')}
          ${interactionRow('CTA Buy', '--color-interaction-cta-buy-surface', '--color-interaction-cta-buy-border', '--color-interaction-cta-buy-accent')}
          ${interactionRow('Transparent', '--color-interaction-transparent-surface', '--color-interaction-transparent-border', '--color-interaction-transparent-accent')}
        </tbody>
      </table>
    </div>
  `),
};

export const Palette: Story = {
  name: 'Color Palette',
  render: () => r(`
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1>Color Palette — Primitives</h1>
      <p>Raw color primitives. These form the foundation of all semantic tokens. <strong>Do not use these directly in product code</strong> — use Foundation tokens instead.</p>
      <p style="font-size:.875em;color:var(--color-text-secondary,#6b6b70)">Each row shows OKLCH (used at runtime), HEX, and RGB values. Click ⎘ to copy any value or token name. Italic text is the legacy Heritage reference.</p>

      <h2>Blue</h2>
      <table style="${ts}"><thead><tr><th style="${th}">Token</th><th style="${th}">Values</th></tr></thead><tbody>
        ${paletteRow('--color-blue-25')}
        ${paletteRow('--color-blue-35')}
        ${paletteRow('--color-blue-45')}
        ${paletteRow('--color-blue-55')}
        ${paletteRow('--color-blue-65')}
        ${paletteRow('--color-blue-75')}
        ${paletteRow('--color-blue-85')}
        ${paletteRow('--color-blue-90')}
        ${paletteRow('--color-blue-95')}
        ${paletteRow('--color-blue-99')}
      </tbody></table>

      <h2>Green</h2>
      <table style="${ts}"><thead><tr><th style="${th}">Token</th><th style="${th}">Values</th></tr></thead><tbody>
        ${paletteRow('--color-green-25')}
        ${paletteRow('--color-green-35')}
        ${paletteRow('--color-green-45')}
        ${paletteRow('--color-green-48')}
        ${paletteRow('--color-green-55')}
        ${paletteRow('--color-green-65')}
        ${paletteRow('--color-green-75')}
        ${paletteRow('--color-green-85')}
        ${paletteRow('--color-green-95')}
      </tbody></table>

      <h2>Grey</h2>
      <table style="${ts}"><thead><tr><th style="${th}">Token</th><th style="${th}">Values</th></tr></thead><tbody>
        ${paletteRow('--color-grey-10')}
        ${paletteRow('--color-grey-20')}
        ${paletteRow('--color-grey-25')}
        ${paletteRow('--color-grey-30')}
        ${paletteRow('--color-grey-35')}
        ${paletteRow('--color-grey-40')}
        ${paletteRow('--color-grey-50')}
        ${paletteRow('--color-grey-60')}
        ${paletteRow('--color-grey-70')}
        ${paletteRow('--color-grey-80')}
        ${paletteRow('--color-grey-90')}
        ${paletteRow('--color-grey-95')}
        ${paletteRow('--color-grey-98')}
      </tbody></table>

      <h2>Red</h2>
      <table style="${ts}"><thead><tr><th style="${th}">Token</th><th style="${th}">Values</th></tr></thead><tbody>
        ${paletteRow('--color-red-15')}
        ${paletteRow('--color-red-25')}
        ${paletteRow('--color-red-35')}
        ${paletteRow('--color-red-40')}
        ${paletteRow('--color-red-45')}
        ${paletteRow('--color-red-55')}
        ${paletteRow('--color-red-65')}
        ${paletteRow('--color-red-75')}
        ${paletteRow('--color-red-85')}
        ${paletteRow('--color-red-95')}
      </tbody></table>

      <h2>Yellow</h2>
      <table style="${ts}"><thead><tr><th style="${th}">Token</th><th style="${th}">Values</th></tr></thead><tbody>
        ${paletteRow('--color-yellow-25')}
        ${paletteRow('--color-yellow-35')}
        ${paletteRow('--color-yellow-45')}
        ${paletteRow('--color-yellow-55')}
        ${paletteRow('--color-yellow-65')}
        ${paletteRow('--color-yellow-75')}
        ${paletteRow('--color-yellow-85')}
        ${paletteRow('--color-yellow-95')}
      </tbody></table>

      <h2>Gold</h2>
      <table style="${ts}"><thead><tr><th style="${th}">Token</th><th style="${th}">Values</th></tr></thead><tbody>
        ${paletteRow('--color-gold-25')}
        ${paletteRow('--color-gold-35')}
        ${paletteRow('--color-gold-45')}
        ${paletteRow('--color-gold-55')}
        ${paletteRow('--color-gold-65')}
        ${paletteRow('--color-gold-75')}
        ${paletteRow('--color-gold-85')}
        ${paletteRow('--color-gold-95')}
      </tbody></table>

      <h2>Orange</h2>
      <table style="${ts}"><thead><tr><th style="${th}">Token</th><th style="${th}">Values</th></tr></thead><tbody>
        ${paletteRow('--color-orange-25')}
        ${paletteRow('--color-orange-35')}
        ${paletteRow('--color-orange-45')}
        ${paletteRow('--color-orange-55')}
        ${paletteRow('--color-orange-65')}
        ${paletteRow('--color-orange-75')}
        ${paletteRow('--color-orange-85')}
        ${paletteRow('--color-orange-95')}
      </tbody></table>

      <h2>Pink</h2>
      <table style="${ts}"><thead><tr><th style="${th}">Token</th><th style="${th}">Values</th></tr></thead><tbody>
        ${paletteRow('--color-pink-25')}
        ${paletteRow('--color-pink-35')}
        ${paletteRow('--color-pink-45')}
        ${paletteRow('--color-pink-55')}
        ${paletteRow('--color-pink-65')}
        ${paletteRow('--color-pink-75')}
        ${paletteRow('--color-pink-85')}
        ${paletteRow('--color-pink-90')}
        ${paletteRow('--color-pink-95')}
      </tbody></table>

      <h2>Purple</h2>
      <table style="${ts}"><thead><tr><th style="${th}">Token</th><th style="${th}">Values</th></tr></thead><tbody>
        ${paletteRow('--color-purple-15')}
        ${paletteRow('--color-purple-20')}
        ${paletteRow('--color-purple-25')}
        ${paletteRow('--color-purple-35')}
        ${paletteRow('--color-purple-45')}
        ${paletteRow('--color-purple-55')}
        ${paletteRow('--color-purple-65')}
        ${paletteRow('--color-purple-75')}
        ${paletteRow('--color-purple-80')}
        ${paletteRow('--color-purple-85')}
        ${paletteRow('--color-purple-95')}
      </tbody></table>

      <h2>Core</h2>
      <table style="${ts}"><thead><tr><th style="${th}">Token</th><th style="${th}">Values</th></tr></thead><tbody>
        ${paletteRow('--color-core-black')}
        ${paletteRow('--color-core-white')}
        ${paletteRow('--color-core-transparent')}
      </tbody></table>

      <h2>Black Alpha</h2>
      <table style="${ts}"><thead><tr><th style="${th}">Token</th><th style="${th}">Values</th></tr></thead><tbody>
        ${paletteRow('--color-black-a-black-a5')}
        ${paletteRow('--color-black-a-black-a10')}
        ${paletteRow('--color-black-a-black-a60')}
        ${paletteRow('--color-black-a-black-a100')}
      </tbody></table>

      <h2>White Alpha</h2>
      <table style="${ts}"><thead><tr><th style="${th}">Token</th><th style="${th}">Values</th></tr></thead><tbody>
        ${paletteRow('--color-white-a-white-a5')}
        ${paletteRow('--color-white-a-white-a10')}
        ${paletteRow('--color-white-a-white-a100')}
      </tbody></table>

      <script>
        (function() {
          document.addEventListener('click', function(e) {
            var btn = e.target.closest('[data-copy]');
            if (!btn) return;
            var text = btn.getAttribute('data-copy');
            navigator.clipboard.writeText(text).then(function() {
              var prev = btn.textContent;
              btn.textContent = '✓';
              setTimeout(function() { btn.textContent = prev; }, 1200);
            });
          });
        })();
      </script>
    </div>
  `),
};

export const Spacing: Story = {
  name: 'Spacing & Layout',
  render: () => r(`
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1>Spacing &amp; Layout</h1>

      <h2>Layout Spacing</h2>
      <p>Responsive layout spacing tokens — values change at breakpoints.</p>
      <table style="${ts}">
        <thead><tr><th style="${th}">Token</th><th style="${th}">Default value</th><th style="${th}">Preview</th></tr></thead>
        <tbody>
          ${[
            ['--spacing-layout-none', '0px'],
            ['--spacing-layout-xs', '8px'],
            ['--spacing-layout-sm', '16px'],
            ['--spacing-layout-md', '24px'],
            ['--spacing-layout-lg', '32px'],
            ['--spacing-layout-xl', '48px'],
          ].map(([token, val]) => `<tr>
            <td style="${td}"><code>${token}</code></td>
            <td style="${td}">${val}</td>
            <td style="${td}"><div style="height:12px;background:var(--color-interaction-primary-surface,#006eb9);width:var(${token},${val});border-radius:2px;min-width:2px"></div></td>
          </tr>`).join('')}
        </tbody>
      </table>

      <h2>Border Radius</h2>
      <table style="${ts}">
        <thead><tr><th style="${th}">Token</th><th style="${th}">Value</th><th style="${th}">Preview</th></tr></thead>
        <tbody>
          ${[
            ['--border-radius-none', '0px'],
            ['--border-radius-sm', '4px'],
            ['--border-radius-md', '8px'],
            ['--border-radius-lg', '12px'],
            ['--border-radius-xl', '16px'],
            ['--border-radius-full', '9999px'],
          ].map(([token, val]) => `<tr>
            <td style="${td}"><code>${token}</code></td>
            <td style="${td}">${val}</td>
            <td style="${td}"><div style="width:40px;height:40px;background:var(--color-interaction-primary-surface,#006eb9);border-radius:var(${token},${val})"></div></td>
          </tr>`).join('')}
        </tbody>
      </table>

      <h2>Breakpoints &amp; Layout Tiers</h2>
      <p>The <strong>Layout collection</strong> in Figma uses named modes (2xs → 4xl) to define responsive values. In CSS, these collapse into <strong>4 media-query tiers</strong> where values actually change. The toolbar Viewport switcher simulates these tiers.</p>
      <table style="${ts}">
        <thead><tr>
          <th style="${th}">CSS Tier</th>
          <th style="${th}">Figma modes</th>
          <th style="${th}">Media query</th>
          <th style="${th}">--spacing-layout-<br>xs / sm / md / lg / xl</th>
          <th style="${th}">--container-<br>padding</th>
          <th style="${th}">Type scale<br>(heading-large / mega-poster)</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style="${td}"><strong>2xs / xs</strong><br><span style="font-size:12px;color:var(--color-text-secondary,#666)">Mobile smallest</span></td>
            <td style="${td}"><code>2xs</code> · <code>xs</code></td>
            <td style="${td}"><code>max-width: 407px</code></td>
            <td style="${td}">4 / 12 / 16 / 20 / 32px</td>
            <td style="${td}">8px</td>
            <td style="${td}">20px / 24px</td>
          </tr>
          <tr>
            <td style="${td}"><strong>sm</strong><br><span style="font-size:12px;color:var(--color-text-secondary,#666)">Mobile – Tablet</span></td>
            <td style="${td}"><code>sm</code></td>
            <td style="${td}"><code>min-width: 408px</code> – <code>767px</code></td>
            <td style="${td}">8 / 16 / 24 / 32 / 48px</td>
            <td style="${td}">16px</td>
            <td style="${td}">20px / 24px</td>
          </tr>
          <tr>
            <td style="${td}"><strong>md / lg</strong><br><span style="font-size:12px;color:var(--color-text-secondary,#666)">Desktop</span></td>
            <td style="${td}"><code>md</code> · <code>lg</code></td>
            <td style="${td}"><code>min-width: 768px</code> – <code>1255px</code></td>
            <td style="${td}">8 / 16 / 24 / 32 / 48px</td>
            <td style="${td}">16px</td>
            <td style="${td}">24px / 32px ↑</td>
          </tr>
          <tr>
            <td style="${td}"><strong>xl → 4xl</strong><br><span style="font-size:12px;color:var(--color-text-secondary,#666)">Wide desktop</span></td>
            <td style="${td}"><code>xl</code> · <code>2xl</code> · <code>3xl</code> · <code>4xl</code></td>
            <td style="${td}"><code>min-width: 1256px</code></td>
            <td style="${td}">8 / 16 / 24 / 32 / 48px</td>
            <td style="${td}">32px ↑</td>
            <td style="${td}">24px / 40px ↑</td>
          </tr>
        </tbody>
      </table>

      <h2>All Breakpoint Tokens</h2>
      <table style="${ts}">
        <thead><tr><th style="${th}">Token</th><th style="${th}">Value</th><th style="${th}">Preview</th></tr></thead>
        <tbody>
          ${[
            ['--breakpoint-2xs', '360px'],
            ['--breakpoint-xs',  '408px'],
            ['--breakpoint-sm',  '600px'],
            ['--breakpoint-md',  '768px'],
            ['--breakpoint-lg',  '1008px'],
            ['--breakpoint-xl',  '1256px'],
            ['--breakpoint-2xl', '1480px'],
            ['--breakpoint-3xl', '1920px'],
            ['--breakpoint-4xl', '2560px'],
          ].map(([token, val]) => `<tr>
            <td style="${td}"><code>${token}</code></td>
            <td style="${td}">${val}</td>
            <td style="${td}"><div style="height:8px;background:var(--color-interaction-primary-surface,#006eb9);width:calc(${val} / 2560px * 100%);border-radius:2px;min-width:2px;max-width:100%"></div></td>
          </tr>`).join('')}
        </tbody>
      </table>

      <h2>Linear Spacing Scale</h2>
      <p>Base 4px grid. Used as building blocks for spacing and sizing.</p>
      <table style="${ts}">
        <thead><tr><th style="${th}">Token</th><th style="${th}">Value</th><th style="${th}">Preview</th></tr></thead>
        <tbody>
          ${[
            ['--linear-sp-linear-1', '4px'],
            ['--linear-sp-linear-2', '8px'],
            ['--linear-sp-linear-3', '12px'],
            ['--linear-sp-linear-4', '16px'],
            ['--linear-sp-linear-5', '20px'],
            ['--linear-sp-linear-6', '24px'],
            ['--linear-sp-linear-8', '32px'],
            ['--linear-sp-linear-10', '40px'],
            ['--linear-sp-linear-12', '48px'],
            ['--linear-sp-linear-14', '56px'],
            ['--linear-sp-linear-16', '64px'],
          ].map(([token, val]) => `<tr>
            <td style="${td}"><code>${token}</code></td>
            <td style="${td}">${val}</td>
            <td style="${td}"><div style="height:10px;background:var(--color-interaction-primary-surface,#006eb9);width:${val};border-radius:2px;min-width:2px"></div></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `),
};

export const Typography: Story = {
  name: 'Typography',
  render: () => r(`
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1>Typography Tokens</h1>

      <h2>Font Families</h2>
      <table style="${ts}">
        <thead><tr><th style="${th}">Token</th><th style="${th}">Preview</th></tr></thead>
        <tbody>
          <tr><td style="${td}"><code>--typography-font-family-sans</code></td><td style="${td}"><span style="font-family:Inter,sans-serif">Inter — The quick brown fox jumps over the lazy dog</span></td></tr>
          <tr><td style="${td}"><code>--typography-font-family-mono</code></td><td style="${td}"><span style="font-family:'SF Mono',monospace">SF Mono — const value = 42;</span></td></tr>
        </tbody>
      </table>

      <h2>Font Sizes</h2>
      <table style="${ts}">
        <thead><tr><th style="${th}">Token</th><th style="${th}">Value</th><th style="${th}">Preview</th></tr></thead>
        <tbody>
          ${[
            ['--typography-size-2xs', '10px'],
            ['--typography-size-xs', '12px'],
            ['--typography-size-xs-plus', '13px'],
            ['--typography-size-sm', '14px'],
            ['--typography-size-md', '16px'],
            ['--typography-size-lg', '18px'],
            ['--typography-size-xl', '20px'],
            ['--typography-size-2xl', '24px'],
            ['--typography-size-3xl', '32px'],
            ['--typography-size-4xl', '40px'],
          ].map(([token, val]) => `<tr>
            <td style="${td}"><code>${token}</code></td>
            <td style="${td}">${val}</td>
            <td style="${td}"><span style="font-size:${val};line-height:1.2">Aa</span></td>
          </tr>`).join('')}
        </tbody>
      </table>

      <h2>Font Weights</h2>
      <table style="${ts}">
        <thead><tr><th style="${th}">Token</th><th style="${th}">Value</th><th style="${th}">Preview</th></tr></thead>
        <tbody>
          ${[
            ['--typography-weight-light', '300'],
            ['--typography-weight-regular', '400'],
            ['--typography-weight-medium', '500'],
            ['--typography-weight-semibold', '600'],
            ['--typography-weight-bold', '700'],
            ['--typography-weight-black', '900'],
          ].map(([token, val]) => `<tr>
            <td style="${td}"><code>${token}</code></td>
            <td style="${td}">${val}</td>
            <td style="${td}"><span style="font-weight:${val}">The quick brown fox jumps over the lazy dog</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `),
};

export const TextStyles: Story = {
  name: 'Text Styles',
  render: () => r(`
    <div style="max-width:860px;font-family:var(--typography-font-family-sans,Inter,sans-serif);line-height:1.6;color:var(--color-text-primary,#000)">
      <h1 style="font-size:32px;font-weight:600;margin:0 0 8px">Text Styles</h1>
      <p style="font-size:16px;font-weight:400;margin:0 0 40px;color:var(--color-text-secondary,#666)">Composite text styles combining size, weight, and line-height. Responsive sizes change at breakpoints.</p>

      ${hr}

      <h2 style="font-size:22px;font-weight:700;margin:0 0 4px">Headings</h2>
      <p style="font-size:14px;color:var(--color-text-secondary,#666);margin:0 0 16px">All heading sizes from 2XL (large claims) down to SM. Responsive — sizes change at breakpoints.</p>
      <table style="${ts}">
        <thead><tr><th style="${th}">Style</th><th style="${th}">Token</th><th style="${th}">Spec</th><th style="${th}">Preview</th></tr></thead>
        <tbody>
          <tr>
            <td style="${td}"><strong>Heading / 2XL</strong></td>
            <td style="${td}"><code>--typography-heading-2xl-size</code></td>
            <td style="${td}"><span data-live-spec="--typography-heading-2xl-size" data-weight="600" data-lh="1.25"></span></td>
            <td style="${td}"><span style="font-size:var(--typography-heading-2xl-size,40px);font-weight:600;line-height:1.25;display:block">Heading 2XL</span></td>
          </tr>
          <tr>
            <td style="${td}"><strong>Heading / XL</strong></td>
            <td style="${td}"><code>--typography-heading-xl-size</code></td>
            <td style="${td}"><span data-live-spec="--typography-heading-xl-size" data-weight="600" data-lh="1.25"></span></td>
            <td style="${td}"><span style="font-size:var(--typography-heading-xl-size,32px);font-weight:600;line-height:1.25;display:block">Heading XL</span></td>
          </tr>
          <tr>
            <td style="${td}"><strong>Heading / LG</strong></td>
            <td style="${td}"><code>--typography-heading-lg-size</code></td>
            <td style="${td}"><span data-live-spec="--typography-heading-lg-size" data-weight="600" data-lh="1.25"></span></td>
            <td style="${td}"><span style="font-size:var(--typography-heading-lg-size,24px);font-weight:600;line-height:1.25;display:block">Heading LG</span></td>
          </tr>
          <tr>
            <td style="${td}"><strong>Heading / MD</strong></td>
            <td style="${td}"><code>--typography-heading-md-size</code></td>
            <td style="${td}"><span data-live-spec="--typography-heading-md-size" data-weight="500" data-lh="1.33"></span></td>
            <td style="${td}"><span style="font-size:var(--typography-heading-md-size,20px);font-weight:500;line-height:1.33;display:block">Heading MD</span></td>
          </tr>
          <tr>
            <td style="${td}"><strong>Heading / SM</strong></td>
            <td style="${td}"><code>--typography-heading-sm-size</code></td>
            <td style="${td}"><span data-live-spec="--typography-heading-sm-size" data-weight="500" data-lh="1.38"></span></td>
            <td style="${td}"><span style="font-size:var(--typography-heading-sm-size,18px);font-weight:500;line-height:1.38;display:block">Heading SM</span></td>
          </tr>
        </tbody>
      </table>

      <script>
        (function() {
          var WEIGHT_NAMES = { '600': 'semibold', '500': 'medium', '400': 'regular' };
          function updateSpecs() {
            var spans = document.querySelectorAll('[data-live-spec]');
            spans.forEach(function(el) {
              var prop = el.getAttribute('data-live-spec');
              var weight = el.getAttribute('data-weight') || '400';
              var lh = el.getAttribute('data-lh') || '1.5';
              var val = getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
              el.textContent = val + ' / ' + lh + ' / ' + (WEIGHT_NAMES[weight] || weight);
            });
          }
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', updateSpecs);
          } else {
            updateSpecs();
          }
          // Re-run when the viewport-tokens style tag changes (toolbar switch)
          function attachObserver() {
            var vtEl = document.getElementById('minis-viewport-tokens');
            if (vtEl) {
              new MutationObserver(updateSpecs).observe(vtEl, { childList: true, subtree: true, characterData: true });
            } else {
              // Watch head for the style element to appear, then attach
              var headObs = new MutationObserver(function() {
                var el = document.getElementById('minis-viewport-tokens');
                if (el) { headObs.disconnect(); new MutationObserver(updateSpecs).observe(el, { childList: true, subtree: true, characterData: true }); }
              });
              headObs.observe(document.head, { childList: true });
            }
          }
          attachObserver();
        })();
      </script>

      ${hr}

      <h2 style="font-size:22px;font-weight:700;margin:0 0 4px">Body</h2>
      <p style="font-size:14px;color:var(--color-text-secondary,#666);margin:0 0 16px">Main group for all readable text. Same size across all breakpoints.</p>
      <table style="${ts}">
        <thead><tr><th style="${th}">Style</th><th style="${th}">Tokens</th><th style="${th}">Spec</th><th style="${th}">Preview</th></tr></thead>
        <tbody>
          <tr>
            <td style="${td}"><strong>Body / MD</strong></td>
            <td style="${td}"><code>--typography-size-md</code></td>
            <td style="${td}">16px / 1.5 / regular</td>
            <td style="${td}"><span style="font-size:var(--typography-size-md,16px);font-weight:400;line-height:1.5;display:block">The quick brown fox jumps over the lazy dog</span></td>
          </tr>
          <tr>
            <td style="${td}"><strong>Body / SM</strong></td>
            <td style="${td}"><code>--typography-size-sm</code></td>
            <td style="${td}">14px / 1.5 / regular</td>
            <td style="${td}"><span style="font-size:var(--typography-size-sm,14px);font-weight:400;line-height:1.5;display:block">The quick brown fox jumps over the lazy dog</span></td>
          </tr>
        </tbody>
      </table>

      ${hr}

      <h2 style="font-size:22px;font-weight:700;margin:0 0 4px">Caption</h2>
      <p style="font-size:14px;color:var(--color-text-secondary,#666);margin:0 0 16px">Small text for UI elements like pills, labels, descriptions. Same size across all breakpoints.</p>
      <table style="${ts}">
        <thead><tr><th style="${th}">Style</th><th style="${th}">Tokens</th><th style="${th}">Spec</th><th style="${th}">Preview</th></tr></thead>
        <tbody>
          <tr>
            <td style="${td}"><strong>Caption / S</strong></td>
            <td style="${td}"><code>--typography-size-sm</code></td>
            <td style="${td}">14px / 1.5 / regular</td>
            <td style="${td}"><span style="font-size:var(--typography-size-sm,14px);font-weight:400;line-height:1.5;display:block">Caption small text</span></td>
          </tr>
          <tr>
            <td style="${td}"><strong>Caption / XS</strong></td>
            <td style="${td}"><code>--typography-size-xs</code></td>
            <td style="${td}">12px / 1.33 / regular</td>
            <td style="${td}"><span style="font-size:var(--typography-size-xs,12px);font-weight:400;line-height:1.33;display:block">Caption extra small text</span></td>
          </tr>
          <tr>
            <td style="${td}"><strong>Caption / XXS</strong></td>
            <td style="${td}"><code>--typography-size-2xs</code></td>
            <td style="${td}">10px / 1.4 / regular</td>
            <td style="${td}"><span style="font-size:var(--typography-size-2xs,10px);font-weight:400;line-height:1.4;display:block">Caption extra extra small text</span></td>
          </tr>
        </tbody>
      </table>

      ${hr}

      <h2 style="font-size:22px;font-weight:700;margin:0 0 16px">Usage</h2>
      <pre style="background:var(--color-surface-faded,#f1f3f5);padding:1rem;border-radius:4px;overflow-x:auto;font-size:13px"><code>/* Heading / 2XL — large claims */
.claim { font-size: var(--typography-heading-2xl-size); font-weight: var(--typography-weight-semibold); line-height: 1.25; }

/* Heading / XL */
h1 { font-size: var(--typography-heading-xl-size); font-weight: var(--typography-weight-semibold); line-height: 1.25; }

/* Heading / LG */
h2 { font-size: var(--typography-heading-lg-size); font-weight: var(--typography-weight-semibold); line-height: 1.25; }

/* Heading / MD */
h3 { font-size: var(--typography-heading-md-size); font-weight: var(--typography-weight-medium); line-height: 1.33; }

/* Heading / SM */
h4 { font-size: var(--typography-heading-sm-size); font-weight: var(--typography-weight-medium); line-height: 1.38; }

/* Body / default */
p { font-size: var(--typography-size-md); font-weight: var(--typography-weight-regular); line-height: 1.5; }

/* Caption */
.label { font-size: var(--typography-size-xs); font-weight: var(--typography-weight-regular); line-height: 1.33; }</code></pre>
    </div>
  `),
};
