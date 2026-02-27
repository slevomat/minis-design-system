import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './pill-counter.js';

const meta: Meta = {
  title: 'Components/Pill Counter',
  component: 'minis-pill-counter',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm', 'xs'],
      description: 'md — general use · sm — inside icon+label buttons · xs — inside icon-only buttons',
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
  },
  render: (args) => html`
    <minis-pill-counter size=${args.size}>3</minis-pill-counter>
  `,
};

// ─── All sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <minis-pill-counter size="md">3</minis-pill-counter>
        <span style="font-family: monospace; font-size: 11px; color: #666;">md</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <minis-pill-counter size="sm">3</minis-pill-counter>
        <span style="font-family: monospace; font-size: 11px; color: #666;">sm</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <minis-pill-counter size="xs">3</minis-pill-counter>
        <span style="font-family: monospace; font-size: 11px; color: #666;">xs</span>
      </div>
    </div>
  `,
};

// ─── In context: button with icon + label (sm pill) ──────────────────────────

export const InButtonWithLabel: Story = {
  name: 'In context — icon + label button (sm)',
  render: () => html`
    <p style="font-family: monospace; font-size: 12px; color: #666; margin-bottom: 12px;">
      Used automatically by &lt;minis-button counter="…"&gt; — shown here for reference
    </p>
    <div style="display: flex; align-items: center; gap: 8px; background: #088107; border-radius: 4px; padding: 12px 16px; width: fit-content;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM5.21 5H3V3H1v2h2l3.6 7.59L5.25 15c-.16.28-.25.61-.25.95C5 17.1 5.9 18 7 18h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 5H5.21z"/>
      </svg>
      <span style="color: white; font-size: 14px; font-weight: 600;">Button text</span>
      <span style="padding-left: 8px; display: inline-flex;">
        <minis-pill-counter size="sm">3</minis-pill-counter>
      </span>
    </div>
  `,
};

// ─── In context: icon-only button (xs pill) ───────────────────────────────────

export const InIconOnlyButton: Story = {
  name: 'In context — icon-only button (xs)',
  render: () => html`
    <p style="font-family: monospace; font-size: 12px; color: #666; margin-bottom: 12px;">
      Used automatically by &lt;minis-button icon-only counter="…"&gt; — shown here for reference
    </p>
    <div style="position: relative; background: #088107; border-radius: 4px; padding: 12px; width: fit-content; display: inline-flex;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM5.21 5H3V3H1v2h2l3.6 7.59L5.25 15c-.16.28-.25.61-.25.95C5 17.1 5.9 18 7 18h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 5H5.21z"/>
      </svg>
      <span style="position: absolute; top: 3px; right: 3px; display: inline-flex;">
        <minis-pill-counter size="xs">3</minis-pill-counter>
      </span>
    </div>
  `,
};

// ─── Higher counts ────────────────────────────────────────────────────────────

export const HigherCounts: Story = {
  name: 'Higher counts',
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <minis-pill-counter size="md">0</minis-pill-counter>
      <minis-pill-counter size="md">9</minis-pill-counter>
      <minis-pill-counter size="md">12</minis-pill-counter>
      <minis-pill-counter size="md">99</minis-pill-counter>
      <minis-pill-counter size="md">999</minis-pill-counter>
    </div>
  `,
};
