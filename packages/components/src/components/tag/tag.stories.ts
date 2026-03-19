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
        component: `<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=2523-339" target="_blank" rel="noopener noreferrer">Open in Figma ↗</a></p>
<p>A compact pill-shaped label for displaying metadata, applied filters, or lightweight interactive states.</p>
<ul>
  <li><strong>static</strong> — read-only label for displaying metadata or category badges. No interaction.</li>
  <li><strong>clickable</strong> — same look, but clickable. Use for subtle actions like opening a modal or tooltip with more info about the tag. Returns to default state after click — no persistent state. Do NOT use as a form submit button.</li>
  <li><strong>toggle</strong> — works like a toggle/checkbox button. Persists pressed/unpressed state. Use for active selection: Like button, favourite, active filter. Icon typically switches between outline and filled version (e.g. heart ↔ heart-fill).</li>
  <li><strong>dismissible</strong> — applied filter the user can remove. Built-in ✕ button fires a <code>dismiss</code> event.</li>
</ul>`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['static', 'clickable', 'toggle', 'dismissible'],
      description: 'Visual and behavioural variant. See component description above for when to use each.',
    },
    pressed: {
      control: 'boolean',
      description: 'Toggle / selected state (toggle variant only)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state (clickable and toggle variants only)',
    },
    'icon-only': {
      control: 'boolean',
      description: 'Icon-only mode — hides the label (toggle variant only)',
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
    'icon-only': false,
  },
  render: (args) => html`
    <minis-tag
      variant=${args.variant}
      ?pressed=${args.pressed}
      ?disabled=${args.disabled}
      ?icon-only=${args['icon-only']}
    >
      <minis-icon slot="icon" name="credit-card" size="20"></minis-icon>
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
        <minis-icon slot="icon" name="credit-card" size="20"></minis-icon>
        Static
      </minis-tag>

      <minis-tag variant="clickable">
        <minis-icon slot="icon" name="credit-card" size="20"></minis-icon>
        Clickable
      </minis-tag>

      <minis-tag
        variant="toggle"
        @toggle=${(e: CustomEvent) => {
          const icon = (e.target as Element).querySelector('minis-icon[slot="icon"]') as HTMLElement & { name: string };
          if (icon) icon.name = e.detail.pressed ? 'heart-fill' : 'heart';
        }}
      >
        <minis-icon slot="icon" name="heart"></minis-icon>
        Toggle
      </minis-tag>

      <minis-tag variant="dismissible">
        <minis-icon slot="icon" name="credit-card" size="20"></minis-icon>
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

// ─── Clickable ────────────────────────────────────────────────────────────────

export const Clickable: Story = {
  name: 'Clickable',
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display:flex;gap:12px;align-items:center;font-family:sans-serif;font-size:13px;color:#555;';

    const tag = document.createElement('minis-tag') as HTMLElement & { variant: string };
    tag.variant = 'clickable';
    tag.textContent = 'Zobrazit na mapě';
    const hint = document.createElement('span');
    hint.textContent = '← click fires an action (no state change)';

    tag.addEventListener('click', () => {
      hint.textContent = '← action triggered! (tag stays default)';
      setTimeout(() => { hint.textContent = '← click fires an action (no state change)'; }, 1500);
    });

    container.appendChild(tag);
    container.appendChild(hint);
    return container;
  },
};

// ─── Toggle ───────────────────────────────────────────────────────────────────

export const Toggle: Story = {
  name: 'Toggle',
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center; font-family: sans-serif; font-size: 13px; color: #555;">
      <minis-tag
        variant="toggle"
        @toggle=${(e: CustomEvent) => {
          const icon = (e.target as Element).querySelector('minis-icon[slot="icon"]') as HTMLElement & { name: string };
          if (icon) icon.name = e.detail.pressed ? 'heart-fill' : 'heart';
        }}
      >
        <minis-icon slot="icon" name="heart"></minis-icon>
        Oblíbené
      </minis-tag>
      <span>← pressed state persists</span>
    </div>
  `,
};

// ─── Toggle icon-only ─────────────────────────────────────────────────────────

export const ToggleIconOnly: Story = {
  name: 'Toggle icon-only',
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center; font-family: sans-serif; font-size: 13px; color: #555;">
      <minis-tag
        variant="toggle"
        icon-only
        @toggle=${(e: CustomEvent) => {
          const icon = (e.target as Element).querySelector('minis-icon[slot="icon"]') as HTMLElement & { name: string };
          if (icon) icon.name = e.detail.pressed ? 'heart-fill' : 'heart';
        }}
      >
        <minis-icon slot="icon" name="heart"></minis-icon>
      </minis-tag>
      <minis-tag variant="toggle" icon-only pressed>
        <minis-icon slot="icon" name="heart-fill"></minis-icon>
      </minis-tag>
      <minis-tag variant="toggle" icon-only disabled>
        <minis-icon slot="icon" name="heart"></minis-icon>
      </minis-tag>
      <span>← default / pressed / disabled</span>
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
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <span style="font-family: sans-serif; font-size: 12px; color: #888; width: 80px;">clickable</span>
        <minis-tag variant="clickable">Default</minis-tag>
        <minis-tag variant="clickable" disabled>Disabled</minis-tag>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <span style="font-family: sans-serif; font-size: 12px; color: #888; width: 80px;">toggle</span>
        <minis-tag variant="toggle">Default</minis-tag>
        <minis-tag variant="toggle" pressed>Pressed</minis-tag>
        <minis-tag variant="toggle" disabled>Disabled</minis-tag>
      </div>
    </div>
  `,
};
