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
        component: `<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4192-5095" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35em;font-size:.875em;color:var(--color-text-accent-link,#006eb9);text-decoration:none;border:1px solid currentColor;border-radius:4px;padding:.2em .55em;line-height:1.4"><svg width="13" height="13" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 57c5.523 0 10-4.477 10-10v-10H10c-5.523 0-10 4.477-10 10s4.477 10 10 10z" fill="#0ACF83"/><path d="M0 29c0-5.523 4.477-10 10-10h10v20H10C4.477 39 0 34.523 0 29z" fill="#A259FF"/><path d="M0 10C0 4.477 4.477 0 10 0h10v20H10C4.477 20 0 15.523 0 10z" fill="#F24E1E"/><path d="M20 0h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H20V0z" fill="#FF7262"/><path d="M40 29c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z" fill="#1ABCFE"/></svg> Open in Figma ↗</a></p>
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
