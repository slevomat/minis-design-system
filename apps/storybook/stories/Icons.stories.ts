import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { iconSets, iconAliases } from '@minis/icons';
import '@minis/components'; // resolved to src via Vite alias in main.ts

// Grouped and ordered like the Figma library sections (Slevomat Icons → Icons 2.0).
const ALL_ICONS = Object.values(iconSets).flat().sort();

const meta: Meta = {
  title: 'Components/Icons',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

// ─── All icons grid ───────────────────────────────────────────────────────────

export const AllIcons: Story = {
  name: 'All icons',
  render: () => html`
    <style>
      .icon-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 8px;
        max-width: 900px;
      }
      .icon-cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        padding: 12px 8px;
        border: 1px solid var(--color-border, #cbccce);
        border-radius: 4px;
        cursor: default;
      }
      .icon-cell:hover {
        background: var(--color-surface-faded, #f1f3f5);
      }
      .icon-set {
        font-family: var(--typography-font-family-sans);
        font-size: var(--typography-size-md);
        margin: var(--linear-sp-linear-6) 0 var(--linear-sp-linear-3);
      }
      .icon-set span,
      .icon-note {
        color: var(--color-text-secondary, #666);
        font-weight: var(--typography-weight-regular);
      }
      .icon-note {
        font-family: var(--typography-font-family-sans);
        font-size: var(--typography-size-sm);
        margin: 0 0 var(--linear-sp-linear-3);
      }
      .icon-name {
        font-family: monospace;
        font-size: 10px;
        color: var(--color-text-secondary, #666);
        text-align: center;
        word-break: break-all;
      }
    </style>
    ${Object.entries(iconSets).map(([set, names]) => html`
      <h3 class="icon-set">${set} <span>${names.length}</span></h3>
      <div class="icon-grid">
        ${names.map(name => html`
          <div class="icon-cell" title="${name}">
            <minis-icon name="${name}" size="24"></minis-icon>
            <span class="icon-name">${name}</span>
          </div>
        `)}
      </div>
    `)}
    <h3 class="icon-set">Deprecated aliases <span>${Object.keys(iconAliases).length}</span></h3>
    <p class="icon-note">Merged into another icon in Icons 2.0. They still render — use the name after the arrow in new code.</p>
    <div class="icon-grid">
      ${Object.entries(iconAliases).map(([alias, target]) => html`
        <div class="icon-cell" title="${alias} → ${target}">
          <minis-icon name="${alias}" size="24"></minis-icon>
          <span class="icon-name">${alias} → ${target}</span>
        </div>
      `)}
    </div>
  `,
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  args: {
    name: 'star',
    size: 24,
    label: '',
  },
  argTypes: {
    name: {
      control: 'select',
      options: ALL_ICONS,
      description: 'Icon name',
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
      description: 'Width and height in px',
    },
    label: {
      control: 'text',
      description: 'Accessible label (empty = decorative, aria-hidden)',
    },
  },
  render: (args) => html`
    <div style="display:flex;align-items:center;gap:16px;padding:16px;">
      <minis-icon
        name=${args.name}
        size=${args.size}
        label=${args.label || null}
      ></minis-icon>
      <span style="font-family:monospace;font-size:13px;color:var(--color-text-secondary,#666)">
        &lt;minis-icon name="${args.name}" size="${args.size}"${args.label ? ` label="${args.label}"` : ''}&gt;&lt;/minis-icon&gt;
      </span>
    </div>
  `,
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  render: () => html`
    <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;padding:16px;">
      ${([12, 16, 20, 24, 32, 48] as const).map(size => html`
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <minis-icon name="star-fill" size="${size}"></minis-icon>
          <span style="font-family:monospace;font-size:11px;color:var(--color-text-secondary,#666)">${size}px</span>
        </div>
      `)}
    </div>
  `,
};

// ─── Color inheritance ────────────────────────────────────────────────────────

export const ColorInheritance: Story = {
  name: 'Color inheritance',
  render: () => html`
    <div style="display:flex;gap:16px;flex-wrap:wrap;padding:16px;align-items:center;">
      <minis-icon name="heart-fill" size="32" style="color:var(--color-interaction-primary-surface,#006eb9)"></minis-icon>
      <minis-icon name="heart-fill" size="32" style="color:#e53935"></minis-icon>
      <minis-icon name="heart-fill" size="32" style="color:#43a047"></minis-icon>
      <minis-icon name="heart-fill" size="32" style="color:var(--color-text-secondary,#666)"></minis-icon>
      <div style="background:#222;padding:8px;border-radius:4px;">
        <minis-icon name="heart-fill" size="32" style="color:#fff"></minis-icon>
      </div>
    </div>
  `,
};

// ─── In button slot ───────────────────────────────────────────────────────────

export const InButtonSlot: Story = {
  name: 'In button slot',
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;padding:16px;">
      <minis-button variant="primary">
        <minis-icon slot="icon" name="cart-fill"></minis-icon>
        Add to cart
      </minis-button>
      <minis-button variant="secondary">
        <minis-icon slot="icon" name="heart"></minis-icon>
        Save
      </minis-button>
      <minis-button variant="danger">
        <minis-icon slot="icon" name="close"></minis-icon>
        Remove
      </minis-button>
      <minis-button variant="primary" icon-only>
        <minis-icon slot="icon" name="search"></minis-icon>
      </minis-button>
      <minis-button variant="secondary" icon-only>
        <minis-icon slot="icon" name="bell"></minis-icon>
      </minis-button>
    </div>
  `,
};
