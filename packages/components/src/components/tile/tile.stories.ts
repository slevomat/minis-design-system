import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './tile.js';
import '@minis/icons';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Components/Navigations/Tile',
  component: 'minis-tile',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4208-4230&t=mtbinHhK8psdU6hq-11" target="_blank" rel="noopener noreferrer">Open in Figma ↗</a></p>
<p>A vertical, icon-based navigation tile used for primary navigation shortcuts. Typically arranged in a grid layout (e.g. a 4-column homepage shortcut row).</p>
<ul>
  <li>Always requires an icon (<code>icon</code> slot, 24×24 px) and label text (default slot).</li>
  <li>Optionally shows an inline counter pill next to the label via the <code>counter</code> attribute.</li>
  <li>Renders as <code>&lt;a&gt;</code> when <code>href</code> is set, <code>&lt;button&gt;</code> otherwise.</li>
</ul>
        `,
      },
    },
  },
  argTypes: {
    href: {
      control: 'text',
      description: 'Destination URL — renders `<a>` when set, `<button>` otherwise',
    },
    counter: {
      control: 'text',
      description: 'Counter value shown as an inline pill after the label. Leave empty to hide.',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and reduces opacity',
    },
    label: {
      control: 'text',
      description: 'Label text (slotted content)',
      table: { category: 'Slots' },
    },
  },
  args: {
    href: '',
    counter: '',
    disabled: false,
    label: 'Moje nákupy',
  },
  render: (args) => html`
    <minis-tile
      href=${args.href ?? ''}
      counter=${args.counter ?? ''}
      ?disabled=${args.disabled}
    >
      <minis-icon slot="icon" name="voucher-outline"></minis-icon>
      ${args.label}
    </minis-tile>
  `,
};

export default meta;
type Story = StoryObj;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
};

// ─── States ──────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Default, hover (mouse over) and disabled states side by side.',
      },
    },
  },
  render: () => html`
    <div style="display:flex; gap:12px; align-items:flex-start; flex-wrap:wrap;">
      <div style="display:flex; flex-direction:column; gap:6px; align-items:center;">
        <span style="font-size:12px; color:#666; font-family:monospace;">default</span>
        <minis-tile>
          <minis-icon slot="icon" name="voucher-outline"></minis-icon>
          Moje nákupy
        </minis-tile>
      </div>
      <div style="display:flex; flex-direction:column; gap:6px; align-items:center;">
        <span style="font-size:12px; color:#666; font-family:monospace;">disabled</span>
        <minis-tile ?disabled=${true}>
          <minis-icon slot="icon" name="voucher-outline"></minis-icon>
          Moje nákupy
        </minis-tile>
      </div>
    </div>
  `,
};

// ─── With Counter ─────────────────────────────────────────────────────────────

export const WithCounter: Story = {
  name: 'With Counter',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'The counter pill sits inline, directly after the label text.',
      },
    },
  },
  render: () => html`
    <div style="display:flex; gap:12px; align-items:flex-start; flex-wrap:wrap;">
      <minis-tile counter="3">
        <minis-icon slot="icon" name="voucher-outline"></minis-icon>
        Moje nákupy
      </minis-tile>
      <minis-tile counter="5 109">
        <minis-icon slot="icon" name="cart-outline"></minis-icon>
        Košík
      </minis-tile>
      <minis-tile counter="0" ?disabled=${true}>
        <minis-icon slot="icon" name="heart"></minis-icon>
        Oblíbené
      </minis-tile>
    </div>
  `,
};

// ─── As Link ─────────────────────────────────────────────────────────────────

export const AsLink: Story = {
  name: 'As Link',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'When `href` is provided the tile renders as an `<a>` element.',
      },
    },
  },
  render: () => html`
    <minis-tile href="/moje-nakupy">
      <minis-icon slot="icon" name="voucher-outline"></minis-icon>
      Moje nákupy
    </minis-tile>
  `,
};

// ─── Navigation Grid ──────────────────────────────────────────────────────────

export const NavigationGrid: Story = {
  name: 'Navigation Grid',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Primary use case: tiles arranged in a 4-column shortcut grid. ' +
          'The wrapper uses `display:grid` with `gap:8px` (`--linear-sp-linear-2`) on both axes.',
      },
    },
  },
  render: () => html`
    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; max-width:640px;">
      <minis-tile>
        <minis-icon slot="icon" name="voucher-outline"></minis-icon>
        Moje nákupy
      </minis-tile>
      <minis-tile counter="3">
        <minis-icon slot="icon" name="cart-outline"></minis-icon>
        Košík
      </minis-tile>
      <minis-tile counter="12">
        <minis-icon slot="icon" name="heart"></minis-icon>
        Oblíbené
      </minis-tile>
      <minis-tile>
        <minis-icon slot="icon" name="user"></minis-icon>
        Profil
      </minis-tile>
      <minis-tile>
        <minis-icon slot="icon" name="gift"></minis-icon>
        Dárky
      </minis-tile>
      <minis-tile counter="5">
        <minis-icon slot="icon" name="percentage"></minis-icon>
        Extra slevy
      </minis-tile>
      <minis-tile counter="2">
        <minis-icon slot="icon" name="cashback"></minis-icon>
        Cashback
      </minis-tile>
      <minis-tile>
        <minis-icon slot="icon" name="benefits"></minis-icon>
        Benefity
      </minis-tile>
    </div>
  `,
};
