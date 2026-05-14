import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './checkbox.js';

const meta: Meta = {
  title: 'Components/Inputs/Checkbox',
  component: 'minis-checkbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4192-5095" target="_blank" rel="noopener noreferrer">Open in Figma ↗</a></p>
<p>Binary selection input. Two states are covered today: <strong>unchecked</strong> and <strong>checked</strong>, each with a hover variant. More states (indeterminate, error, disabled visual) will be added later.</p>`,
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    checked: false,
    disabled: false,
  },
  render: (args) => html`
    <minis-checkbox ?checked=${args.checked} ?disabled=${args.disabled}>
      ${args.label ?? 'Accept terms'}
    </minis-checkbox>
  `,
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {};

export const Unchecked: Story = {
  args: { checked: false },
};

export const Checked: Story = {
  args: { checked: true },
};

export const WithoutLabel: Story = {
  render: () => html`
    <div style="display:flex; gap:16px; align-items:center;">
      <minis-checkbox></minis-checkbox>
      <minis-checkbox checked></minis-checkbox>
    </div>
  `,
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:grid; grid-template-columns: repeat(2, max-content); gap: 16px 32px; align-items:center;">
      <minis-checkbox>Default</minis-checkbox>
      <minis-checkbox checked>Default · checked</minis-checkbox>
      <minis-checkbox disabled>Disabled</minis-checkbox>
      <minis-checkbox checked disabled>Disabled · checked</minis-checkbox>
    </div>
  `,
};
