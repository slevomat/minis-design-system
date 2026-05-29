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
        component: `<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=2523-339" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35em;font-size:.875em;color:var(--color-text-accent-link,#006eb9);text-decoration:none;border:1px solid currentColor;border-radius:4px;padding:.2em .55em;line-height:1.4"><svg width="13" height="13" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 57c5.523 0 10-4.477 10-10v-10H10c-5.523 0-10 4.477-10 10s4.477 10 10 10z" fill="#0ACF83"/><path d="M0 29c0-5.523 4.477-10 10-10h10v20H10C4.477 39 0 34.523 0 29z" fill="#A259FF"/><path d="M0 10C0 4.477 4.477 0 10 0h10v20H10C4.477 20 0 15.523 0 10z" fill="#F24E1E"/><path d="M20 0h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H20V0z" fill="#FF7262"/><path d="M40 29c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z" fill="#1ABCFE"/></svg> Open in Figma ↗</a></p>
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
