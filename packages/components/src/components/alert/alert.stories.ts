import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './alert.js';

const meta: Meta = {
  title: 'Components/Alert',
  component: 'minis-alert',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['notice', 'success', 'error', 'warning'],
      description: 'Visual variant — communicates the nature of the message',
    },
    icon: {
      control: 'boolean',
      description: 'Show the variant icon (default: true)',
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  args: {
    variant: 'notice',
    icon: true,
  },
  render: (args) => html`
    <minis-alert variant=${args.variant} ?icon=${args.icon}>
      Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
    </minis-alert>
  `,
};

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 520px;">
      <minis-alert variant="notice">
        Notice — informational context for the user.
      </minis-alert>
      <minis-alert variant="success">
        Success — action completed successfully.
      </minis-alert>
      <minis-alert variant="error">
        Error — something went wrong, please fix the issues below.
      </minis-alert>
      <minis-alert variant="warning">
        Warning — proceed with caution.
      </minis-alert>
    </div>
  `,
};

// ─── Without icon ─────────────────────────────────────────────────────────────

export const WithoutIcon: Story = {
  name: 'Without icon',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 520px;">
      <minis-alert variant="notice" ?icon=${false}>
        Notice without icon.
      </minis-alert>
      <minis-alert variant="success" ?icon=${false}>
        Success without icon.
      </minis-alert>
      <minis-alert variant="error" ?icon=${false}>
        Error without icon.
      </minis-alert>
      <minis-alert variant="warning" ?icon=${false}>
        Warning without icon.
      </minis-alert>
    </div>
  `,
};

// ─── In form context ──────────────────────────────────────────────────────────

export const InFormContext: Story = {
  name: 'In form context',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 520px; font-family: sans-serif;">
      <div>
        <label style="display: block; font-size: 14px; margin-bottom: 4px;">Email address</label>
        <input type="email" value="bad-email" style="display: block; width: 100%; padding: 8px; border: 1px solid #d2381d; border-radius: 4px; font-size: 14px; box-sizing: border-box;" />
        <div style="margin-top: 6px;">
          <minis-alert variant="error">Please enter a valid email address.</minis-alert>
        </div>
      </div>
      <div>
        <label style="display: block; font-size: 14px; margin-bottom: 4px;">Username</label>
        <input type="text" value="john_doe" style="display: block; width: 100%; padding: 8px; border: 1px solid #088107; border-radius: 4px; font-size: 14px; box-sizing: border-box;" />
        <div style="margin-top: 6px;">
          <minis-alert variant="success">Username is available.</minis-alert>
        </div>
      </div>
    </div>
  `,
};
