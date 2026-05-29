import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './button.js';
import '@minis/icons';

const iconStar = html`<minis-icon slot="icon" name="star"></minis-icon>`;
const iconCart = html`<minis-icon slot="icon" name="cart-fill"></minis-icon>`;
const iconBin = html`<minis-icon slot="icon" name="close"></minis-icon>`;

const meta: Meta = {
  title: 'Components/Button',
  component: 'minis-button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '<a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=378-4416" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35em;font-size:.875em;color:var(--color-text-accent-link,#006eb9);text-decoration:none;border:1px solid currentColor;border-radius:4px;padding:.2em .55em;line-height:1.4"><svg width="13" height="13" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 57c5.523 0 10-4.477 10-10v-10H10c-5.523 0-10 4.477-10 10s4.477 10 10 10z" fill="#0ACF83"/><path d="M0 29c0-5.523 4.477-10 10-10h10v20H10C4.477 39 0 34.523 0 29z" fill="#A259FF"/><path d="M0 10C0 4.477 4.477 0 10 0h10v20H10C4.477 20 0 15.523 0 10z" fill="#F24E1E"/><path d="M20 0h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H20V0z" fill="#FF7262"/><path d="M40 29c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z" fill="#1ABCFE"/></svg> Open in Figma ↗</a>',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'cta-buy', 'transparent'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the button',
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
      <minis-button variant="primary" size="md">${iconStar} Medium</minis-button>
      <minis-button variant="primary" size="lg">${iconStar} Large</minis-button>
      <minis-button variant="primary" size="xl">${iconStar} XL</minis-button>
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
      <minis-button variant="primary" size="xl" icon-only>${iconStar}</minis-button>
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
      <minis-button variant="primary" size="md">Medium</minis-button>
      <minis-button variant="primary" size="lg">Large</minis-button>
      <minis-button variant="primary" size="xl">XL</minis-button>
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

      <!-- Sizes with counter (sm button → sm pill, md/lg/xl button → md pill) -->
      <minis-button variant="cta-buy" size="sm" counter="5">${iconCart} Small</minis-button>
      <minis-button variant="cta-buy" size="lg" counter="5">${iconCart} Large</minis-button>
      <minis-button variant="cta-buy" size="xl" counter="5">${iconCart} XL</minis-button>
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
