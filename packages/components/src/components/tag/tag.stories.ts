import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './tag.js';
import '@minis/icons';

const meta: Meta = {
  title: 'Components/Tag',
  component: 'minis-tag',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '<a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=2523-339" target="_blank" rel="noopener noreferrer">Open in Figma ↗</a>',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['static', 'clickable', 'dismissible'],
      description: 'Visual and behavioural variant',
    },
    pressed: {
      control: 'boolean',
      description: 'Toggle / selected state (clickable variant only)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state (clickable variant only)',
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  args: {
    variant: 'static',
    pressed: false,
    disabled: false,
  },
  render: (args) => html`
    <minis-tag
      variant=${args.variant}
      ?pressed=${args.pressed}
      ?disabled=${args.disabled}
    >
      <minis-icon slot="icon" name="credit-card" size="14"></minis-icon>
      Platba na zálohu
    </minis-tag>
  `,
};

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
      <minis-tag variant="static">
        <minis-icon slot="icon" name="credit-card" size="14"></minis-icon>
        Static
      </minis-tag>

      <minis-tag variant="clickable">
        <minis-icon slot="icon" name="credit-card" size="14"></minis-icon>
        Clickable
      </minis-tag>

      <minis-tag variant="dismissible">
        <minis-icon slot="icon" name="credit-card" size="14"></minis-icon>
        Dismissible
      </minis-tag>
    </div>
  `,
};

// ─── Without icon ─────────────────────────────────────────────────────────────

export const WithoutIcon: Story = {
  name: 'Without icon',
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
      <minis-tag variant="static">Static</minis-tag>
      <minis-tag variant="clickable">Clickable</minis-tag>
      <minis-tag variant="dismissible">Dismissible</minis-tag>
    </div>
  `,
};

// ─── Toggle (clickable + pressed) ─────────────────────────────────────────────

export const Toggle: Story = {
  name: 'Toggle (clickable)',
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center; font-family: sans-serif; font-size: 13px; color: #555;">
      <minis-tag
        variant="clickable"
        @toggle=${(e: CustomEvent) => {
          const icon = (e.target as Element).querySelector('minis-icon[slot="icon"]') as HTMLElement & { name: string };
          if (icon) icon.name = e.detail.pressed ? 'heart-fill' : 'heart';
        }}
      >
        <minis-icon slot="icon" name="heart" size="14"></minis-icon>
        Oblíbené
      </minis-tag>
      <span>Click to toggle favourite ↑</span>
    </div>
  `,
};

// ─── Dismissed list ───────────────────────────────────────────────────────────

export const DismissibleList: Story = {
  name: 'Dismissible list',
  render: () => {
    const labels = ['Praha', 'Restaurace', 'Do 500 Kč', 'Víkend'];

    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px;';

    const renderList = () => {
      container.innerHTML = '';
      labels.forEach((label, i) => {
        const tag = document.createElement('minis-tag') as HTMLElement & { variant: string };
        tag.variant = 'dismissible';
        tag.textContent = label;
        tag.addEventListener('dismiss', () => {
          labels.splice(i, 1);
          renderList();
        });
        container.appendChild(tag);
      });
    };

    renderList();
    return container;
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States',
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
      <minis-tag variant="clickable">Default</minis-tag>
      <minis-tag variant="clickable" pressed>Pressed</minis-tag>
      <minis-tag variant="clickable" disabled>Disabled</minis-tag>
    </div>
  `,
};
