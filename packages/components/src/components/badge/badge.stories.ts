import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './badge.js';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Components/Brand/Badge',
  component: 'minis-badge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4605-692&t=rkdTibDNQvxbBYPb-11" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35em;font-size:.875em;color:var(--color-text-accent-link,#006eb9);text-decoration:none;border:1px solid currentColor;border-radius:4px;padding:.2em .55em;line-height:1.4"><svg width="13" height="13" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 57c5.523 0 10-4.477 10-10v-10H10c-5.523 0-10 4.477-10 10s4.477 10 10 10z" fill="#0ACF83"/><path d="M0 29c0-5.523 4.477-10 10-10h10v20H10C4.477 39 0 34.523 0 29z" fill="#A259FF"/><path d="M0 10C0 4.477 4.477 0 10 0h10v20H10C4.477 20 0 15.523 0 10z" fill="#F24E1E"/><path d="M20 0h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H20V0z" fill="#FF7262"/><path d="M40 29c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z" fill="#1ABCFE"/></svg> Open in Figma ↗</a></p>
<p>A decorative brand symbol — a scalloped seal badge with a white checkmark — used to communicate trust or verification. Purely visual, no interaction.</p>
<ul>
  <li>Four color variants: <code>pink</code> (default), <code>yellow</code>, <code>blue</code>, <code>brand</code>.</li>
  <li>Three sizes via the <code>size</code> attribute: <code>sm</code> 32 px (XS/SM headline), <code>md</code> 43 px (headline companion), <code>xl</code> 82 px (default).</li>
  <li>No slots, no events — place it inline next to text or inside a card.</li>
</ul>
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['pink', 'yellow', 'blue', 'brand'],
      description: 'Color variant of the badge symbol',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'xl'],
      description: 'Size: sm 32 px · md 43 px · xl 82 px (default)',
    },
  },
  args: {
    color: 'pink',
    size: 'xl',
  },
  render: (args) => html`
    <minis-badge color=${args.color} size=${args.size}></minis-badge>
  `,
};

export default meta;
type Story = StoryObj;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'All four color variants side by side at the default 82×82 px size.',
      },
    },
  },
  render: () => html`
    <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <minis-badge color="pink"></minis-badge>
        <span style="font-size:12px;color:var(--color-text-secondary,#888)">pink</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <minis-badge color="yellow"></minis-badge>
        <span style="font-size:12px;color:var(--color-text-secondary,#888)">yellow</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <minis-badge color="blue"></minis-badge>
        <span style="font-size:12px;color:var(--color-text-secondary,#888)">blue</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <minis-badge color="brand"></minis-badge>
        <span style="font-size:12px;color:var(--color-text-secondary,#888)">brand</span>
      </div>
    </div>
  `,
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
Use the <code>size</code> attribute to pick from three named sizes:
<code>sm</code> 32 px for XS/SM breakpoint headlines, <code>md</code> 43 px as a headline companion on larger viewports,
and <code>xl</code> 82 px (default) for standalone hero use.
        `,
      },
    },
  },
  render: () => html`
    <div style="display:flex;gap:32px;align-items:flex-end;flex-wrap:wrap">
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <minis-badge color="pink" size="sm"></minis-badge>
        <span style="font-size:12px;color:var(--color-text-secondary,#888)">sm — 32 px (XS/SM headline)</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <minis-badge color="pink" size="md"></minis-badge>
        <span style="font-size:12px;color:var(--color-text-secondary,#888)">md — 43 px (headline companion)</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <minis-badge color="pink" size="xl"></minis-badge>
        <span style="font-size:12px;color:var(--color-text-secondary,#888)">xl — 82 px (default)</span>
      </div>
    </div>

    <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:24px 0"/>

    <p style="font-size:12px;color:var(--color-text-secondary,#888);margin:0 0 12px">XS/SM headline (size="sm", 32 px)</p>
    <div style="display:flex;align-items:center;gap:8px">
      <h2 style="margin:0;font-size:20px;font-weight:600;line-height:1.2">Ověřený prodejce</h2>
      <minis-badge color="pink" size="sm"></minis-badge>
    </div>

    <p style="font-size:12px;color:var(--color-text-secondary,#888);margin:16px 0 12px">Headline companion (size="md", 43 px)</p>
    <div style="display:flex;align-items:center;gap:12px">
      <h2 style="margin:0;font-size:24px;font-weight:600;line-height:1.2">Ověřený prodejce</h2>
      <minis-badge color="pink" size="md"></minis-badge>
    </div>
  `,
};
