import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './pill-counter.js';
import '../button/button.js';

const meta: Meta = {
  title: 'Components/Pill Counter',
  component: 'minis-pill-counter',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '<a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=583-11887" target="_blank" rel="noopener noreferrer">Open in Figma ↗</a>',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm', 'xs'],
      description: 'lg — 18px · md — 15px · sm — 11px (inside icon+label buttons) · xs — 8px (inside icon-only buttons)',
    },
    'bg-color': {
      control: 'text',
      description: 'Background color — any CSS value or token. Defaults to feedback success.',
    },
    'text-color': {
      control: 'text',
      description: 'Text color — any CSS value or token. Defaults to primary interaction surface.',
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  args: {
    size: 'md',
    'bg-color': '',
    'text-color': '',
  },
  render: (args) => html`
    <div style="display:inline-flex;padding:12px;border-radius:4px;background:var(--color-surface-faded,#f1f3f5);">
      <minis-pill-counter
        size=${args.size}
        bg-color=${args['bg-color'] || ''}
        text-color=${args['text-color'] || ''}
      >3</minis-pill-counter>
    </div>
  `,
};

// ─── All sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => html`
    <div style="display:flex;gap:24px;align-items:flex-end;flex-wrap:wrap;padding:12px;background:var(--color-surface-faded,#f1f3f5);border-radius:4px;">
      ${(['lg', 'md', 'sm', 'xs'] as const).map(size => html`
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <minis-pill-counter size=${size}>3</minis-pill-counter>
          <span style="font-family:monospace;font-size:11px;color:var(--color-text-secondary,#666)">${size}</span>
        </div>
      `)}
    </div>
  `,
};

// ─── Custom colors ────────────────────────────────────────────────────────────

export const CustomColors: Story = {
  name: 'Custom colors',
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;padding:12px;background:var(--color-surface-faded,#f1f3f5);border-radius:4px;">
      <minis-pill-counter size="md">3</minis-pill-counter>
      <minis-pill-counter size="md" bg-color="var(--color-feedback-error-surface,#e53935)" text-color="#fff">5</minis-pill-counter>
      <minis-pill-counter size="md" bg-color="var(--color-feedback-success-surface,#43a047)" text-color="#fff">12</minis-pill-counter>
      <minis-pill-counter size="md" bg-color="var(--color-text-primary,#000)" text-color="var(--color-core-white,#fff)">99</minis-pill-counter>
    </div>
  `,
};

// ─── Higher counts ────────────────────────────────────────────────────────────

export const HigherCounts: Story = {
  name: 'Higher counts',
  render: () => html`
    <div style="display:inline-flex;gap:12px;align-items:center;padding:12px;border-radius:4px;background:var(--color-surface-faded,#f1f3f5);">
      <minis-pill-counter size="md">0</minis-pill-counter>
      <minis-pill-counter size="md">9</minis-pill-counter>
      <minis-pill-counter size="md">12</minis-pill-counter>
      <minis-pill-counter size="md">99</minis-pill-counter>
      <minis-pill-counter size="md">999</minis-pill-counter>
    </div>
  `,
};

// ─── In context: button with icon + label ────────────────────────────────────

export const InButtonWithLabel: Story = {
  name: 'In context — icon + label button',
  render: () => html`
    <p style="font-family:monospace;font-size:12px;color:#666;margin-bottom:12px;">
      Used automatically by &lt;minis-button counter="…"&gt; — md/lg button uses <strong>md</strong> pill, sm button uses <strong>sm</strong> pill
    </p>
    <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
      <minis-button variant="cta-buy" size="md" counter="3">
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM5.21 5H3V3H1v2h2l3.6 7.59L5.25 15c-.16.28-.25.61-.25.95C5 17.1 5.9 18 7 18h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 5H5.21z"/></svg>
        md button
      </minis-button>
      <minis-button variant="cta-buy" size="sm" counter="3">
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM5.21 5H3V3H1v2h2l3.6 7.59L5.25 15c-.16.28-.25.61-.25.95C5 17.1 5.9 18 7 18h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 5H5.21z"/></svg>
        sm button
      </minis-button>
    </div>
  `,
};

// ─── In context: icon-only button ────────────────────────────────────────────

export const InIconOnlyButton: Story = {
  name: 'In context — icon-only button',
  render: () => html`
    <p style="font-family:monospace;font-size:12px;color:#666;margin-bottom:12px;">
      Used automatically by &lt;minis-button icon-only counter="…"&gt; — md/lg button uses <strong>sm</strong> pill, sm button uses <strong>xs</strong> pill. Icon dims to 75% opacity.
    </p>
    <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
      <minis-button variant="cta-buy" size="md" icon-only counter="3">
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM5.21 5H3V3H1v2h2l3.6 7.59L5.25 15c-.16.28-.25.61-.25.95C5 17.1 5.9 18 7 18h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 5H5.21z"/></svg>
      </minis-button>
      <minis-button variant="cta-buy" size="sm" icon-only counter="3">
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM5.21 5H3V3H1v2h2l3.6 7.59L5.25 15c-.16.28-.25.61-.25.95C5 17.1 5.9 18 7 18h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 5H5.21z"/></svg>
      </minis-button>
    </div>
  `,
};
