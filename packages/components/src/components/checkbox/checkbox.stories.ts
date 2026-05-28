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
<p>Binary selection input with three states: <strong>unchecked</strong>, <strong>checked</strong>, and <strong>indeterminate</strong> (dash). All states support hover and disabled variants.</p>`,
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  render: (args) => html`
    <minis-checkbox
      ?checked=${args.checked && !args.indeterminate}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
    >
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

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const WithoutLabel: Story = {
  render: () => html`
    <div style="display:flex; gap:16px; align-items:center;">
      <minis-checkbox></minis-checkbox>
      <minis-checkbox checked></minis-checkbox>
      <minis-checkbox indeterminate></minis-checkbox>
    </div>
  `,
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:grid; grid-template-columns: repeat(3, max-content); gap: 16px 32px; align-items:center;">
      <minis-checkbox>Unchecked</minis-checkbox>
      <minis-checkbox checked>Checked</minis-checkbox>
      <minis-checkbox indeterminate>Indeterminate</minis-checkbox>
      <minis-checkbox disabled>Unchecked · disabled</minis-checkbox>
      <minis-checkbox checked disabled>Checked · disabled</minis-checkbox>
      <minis-checkbox indeterminate disabled>Indeterminate · disabled</minis-checkbox>
    </div>
  `,
};
