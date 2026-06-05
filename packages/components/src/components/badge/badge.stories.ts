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
  <li>Three color variants: <code>pink</code> (default), <code>yellow</code>, <code>blue</code>.</li>
  <li>Natural size is <strong>82×82 px</strong>; override with CSS <code>width</code> / <code>height</code> as needed.</li>
  <li>No slots, no events — place it inline next to text or inside a card.</li>
</ul>
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['pink', 'yellow', 'blue'],
      description: 'Color variant of the badge symbol',
    },
  },
  args: {
    color: 'pink',
  },
  render: (args) => html`
    <minis-badge color=${args.color}></minis-badge>
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
        story: 'All three color variants side by side at the default 82×82 px size.',
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
    </div>
  `,
};

// ─── Custom Size ──────────────────────────────────────────────────────────────

export const CustomSize: Story = {
  name: 'Custom Size',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Override <code>width</code> and <code>height</code> via CSS to scale the badge.',
      },
    },
  },
  render: () => html`
    <div style="display:flex;gap:24px;align-items:flex-end;flex-wrap:wrap">
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <minis-badge color="blue" style="width:40px;height:40px"></minis-badge>
        <span style="font-size:12px;color:var(--color-text-secondary,#888)">40px</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <minis-badge color="blue" style="width:82px;height:82px"></minis-badge>
        <span style="font-size:12px;color:var(--color-text-secondary,#888)">82px (default)</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <minis-badge color="blue" style="width:120px;height:120px"></minis-badge>
        <span style="font-size:12px;color:var(--color-text-secondary,#888)">120px</span>
      </div>
    </div>
  `,
};
