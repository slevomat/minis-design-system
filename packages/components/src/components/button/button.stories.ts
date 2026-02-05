import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './button.js';

const meta: Meta = {
  title: 'Components/Button',
  component: 'minis-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'cta-buy'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: (args) => html`
    <minis-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
    >
      Primary Button
    </minis-button>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: var(--spacing-md, 16px); flex-wrap: wrap;">
      <minis-button variant="primary">Primary</minis-button>
      <minis-button variant="secondary">Secondary</minis-button>
      <minis-button variant="tertiary">Tertiary</minis-button>
      <minis-button variant="danger">Danger</minis-button>
      <minis-button variant="cta-buy">CTA Buy</minis-button>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: var(--spacing-md, 16px); align-items: center;">
      <minis-button size="sm">Small</minis-button>
      <minis-button size="md">Medium</minis-button>
      <minis-button size="lg">Large</minis-button>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; gap: var(--spacing-md, 16px); flex-wrap: wrap;">
      <minis-button variant="primary">Default</minis-button>
      <minis-button variant="primary" disabled>Disabled</minis-button>
      <minis-button variant="primary" loading>Loading</minis-button>
    </div>
  `,
};

export const Interactive: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
  render: (args) => html`
    <minis-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
    >
      Click me!
    </minis-button>
  `,
};
