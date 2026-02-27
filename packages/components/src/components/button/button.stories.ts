import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './button.js';

// Inline SVG icons used in stories
const iconStar = html`<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
const iconCart = html`<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM5.21 5H3V3H1v2h2l3.6 7.59L5.25 15c-.16.28-.25.61-.25.95C5 17.1 5.9 18 7 18h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 5H5.21z"/></svg>`;
const iconBin = html`<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;

const meta: Meta = {
  title: 'Components/Button',
  component: 'minis-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'cta-buy', 'transparent'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button (small / default / big)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    'icon-only': {
      control: 'boolean',
      description: 'Show only the icon, no label text',
    },
    counter: {
      control: 'text',
      description: 'Counter pill value (number as string). Shows a badge on the button.',
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    counter: '',
  },
  render: (args) => html`
    <minis-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?icon-only=${args['icon-only']}
      counter=${args.counter || null}
    >
      ${iconStar}
      Button label
    </minis-button>
  `,
};

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
      <minis-button variant="primary">${iconStar} Primary</minis-button>
      <minis-button variant="secondary">${iconStar} Secondary</minis-button>
      <minis-button variant="tertiary">${iconStar} Tertiary</minis-button>
      <minis-button variant="danger">${iconBin} Danger</minis-button>
      <minis-button variant="cta-buy">${iconCart} CTA Buy</minis-button>
      <div style="background:#555; padding:8px; border-radius:4px; display:inline-flex;">
        <minis-button variant="transparent">${iconBin} Transparent</minis-button>
      </div>
    </div>
  `,
};

// ─── All sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <minis-button variant="primary" size="sm">${iconStar} Small</minis-button>
      <minis-button variant="primary" size="md">${iconStar} Default</minis-button>
      <minis-button variant="primary" size="lg">${iconStar} Big</minis-button>
    </div>
  `,
};

// ─── Icon only ────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  name: 'Icon only',
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <minis-button variant="primary" size="sm" icon-only>${iconStar}</minis-button>
      <minis-button variant="primary" size="md" icon-only>${iconStar}</minis-button>
      <minis-button variant="primary" size="lg" icon-only>${iconStar}</minis-button>
      <minis-button variant="secondary" size="md" icon-only>${iconStar}</minis-button>
      <minis-button variant="cta-buy" size="md" icon-only>${iconCart}</minis-button>
      <minis-button variant="danger" size="md" icon-only>${iconBin}</minis-button>
      <div style="background:#555; padding:8px; border-radius:4px; display:inline-flex; gap:8px;">
        <minis-button variant="transparent" size="md" icon-only>${iconBin}</minis-button>
        <minis-button variant="transparent" size="lg" icon-only>${iconBin}</minis-button>
      </div>
    </div>
  `,
};

// ─── Label only ───────────────────────────────────────────────────────────────

export const LabelOnly: Story = {
  name: 'Label only',
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <minis-button variant="primary" size="sm">Small</minis-button>
      <minis-button variant="primary" size="md">Default</minis-button>
      <minis-button variant="primary" size="lg">Big</minis-button>
    </div>
  `,
};

// ─── Counter pill ─────────────────────────────────────────────────────────────

export const CounterPill: Story = {
  name: 'Counter pill',
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <!-- Icon + Label + counter -->
      <minis-button variant="cta-buy" counter="3">${iconCart} CTA Buy</minis-button>
      <minis-button variant="primary" counter="12">${iconStar} Primary</minis-button>
      <minis-button variant="danger" counter="1">${iconBin} Danger</minis-button>

      <!-- Icon only + counter (floating pill) -->
      <minis-button variant="cta-buy" icon-only counter="3">${iconCart}</minis-button>
      <minis-button variant="primary" icon-only counter="12">${iconStar}</minis-button>

      <!-- Sizes with counter -->
      <minis-button variant="cta-buy" size="sm" counter="5">${iconCart} Small</minis-button>
      <minis-button variant="cta-buy" size="lg" counter="5">${iconCart} Big</minis-button>
    </div>
  `,
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States',
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <minis-button variant="primary">${iconStar} Default</minis-button>
      <minis-button variant="primary" disabled>${iconStar} Disabled</minis-button>
    </div>
  `,
};

// ─── All variants × states grid ───────────────────────────────────────────────

export const VariantsAndStates: Story = {
  name: 'Variants & states',
  render: () => html`
    <style>
      .grid { display: grid; grid-template-columns: repeat(3, auto); gap: 12px; align-items: center; justify-items: start; }
      .grid-label { font-family: monospace; font-size: 12px; color: #666; white-space: nowrap; }
    </style>
    <div class="grid">
      <span class="grid-label">Variant</span>
      <span class="grid-label">Default</span>
      <span class="grid-label">Disabled</span>

      <span class="grid-label">primary</span>
      <minis-button variant="primary">${iconStar} Label</minis-button>
      <minis-button variant="primary" disabled>${iconStar} Label</minis-button>

      <span class="grid-label">secondary</span>
      <minis-button variant="secondary">${iconStar} Label</minis-button>
      <minis-button variant="secondary" disabled>${iconStar} Label</minis-button>

      <span class="grid-label">tertiary</span>
      <minis-button variant="tertiary">${iconStar} Label</minis-button>
      <minis-button variant="tertiary" disabled>${iconStar} Label</minis-button>

      <span class="grid-label">danger</span>
      <minis-button variant="danger">${iconBin} Label</minis-button>
      <minis-button variant="danger" disabled>${iconBin} Label</minis-button>

      <span class="grid-label">cta-buy</span>
      <minis-button variant="cta-buy">${iconCart} Label</minis-button>
      <minis-button variant="cta-buy" disabled>${iconCart} Label</minis-button>

      <span class="grid-label">transparent</span>
      <div style="background:#555; padding:8px; border-radius:4px;">
        <minis-button variant="transparent">${iconBin} Label</minis-button>
      </div>
      <div style="background:#555; padding:8px; border-radius:4px;">
        <minis-button variant="transparent" disabled>${iconBin} Label</minis-button>
      </div>
    </div>
  `,
};
