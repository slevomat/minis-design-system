import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './action-row.js';

const wheelIcon = html`
  <svg slot="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" height="24">
    <path
      d="M12 2.6c5.2 0 9.4 4.2 9.4 9.4s-4.2 9.4-9.4 9.4S2.6 17.2 2.6 12 6.8 2.6 12 2.6Zm0 1.5a7.9 7.9 0 1 0 0 15.8 7.9 7.9 0 0 0 0-15.8ZM12 7l1.6 3.3 3.6.5-2.6 2.6.6 3.6L12 15.3 8.8 17l.6-3.6L6.8 10.8l3.6-.5L12 7Z"
      fill="#006eb9"
    />
  </svg>
`;

const meta: Meta = {
  title: 'Components/Navigation/Action Row',
  component: 'minis-action-row',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4192-4135&t=XnXEUQQ4da0KbQdm-11" target="_blank" rel="noopener noreferrer">Open in Figma ↗</a></p>
<p>Interactive list row used to build vertical menus, dropdowns, filter lists and similar option groups. Always clickable. May optionally lead with an <strong>icon</strong> or a <strong>checkbox</strong> (mutually exclusive) and end with a <strong>counter pill</strong> that always sits directly after the label.</p>`,
      },
    },
  },
  argTypes: {
    variant: { control: { type: 'inline-radio' }, options: ['none', 'icon', 'checkbox'] },
    state: { control: { type: 'inline-radio' }, options: [undefined, 'default', 'hover', 'active'] },
    active: { control: 'boolean' },
    checked: { control: 'boolean', if: { arg: 'variant', eq: 'checkbox' } },
    disabled: { control: 'boolean' },
    counter: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    variant: 'none',
    active: false,
    checked: false,
    disabled: false,
    counter: '',
    label: 'ActionRow label',
  },
  render: (args) => html`
    <div style="width:280px;">
      <minis-action-row
        variant=${args.variant}
        state=${args.state ?? ''}
        ?active=${args.active}
        ?checked=${args.variant === 'checkbox' && args.checked}
        ?disabled=${args.disabled}
        counter=${args.counter ?? ''}
      >
        ${args.variant === 'icon' ? wheelIcon : ''}
        ${args.label}
      </minis-action-row>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {};

export const LabelOnly: Story = {
  render: () => html`
    <div style="width:280px; display:flex; flex-direction:column; gap:2px;">
      <minis-action-row>Default</minis-action-row>
      <minis-action-row state="hover">Hover</minis-action-row>
      <minis-action-row ?active=${true}>Active</minis-action-row>
    </div>
  `,
};

export const WithIcon: Story = {
  render: () => html`
    <div style="width:280px; display:flex; flex-direction:column; gap:2px;">
      <minis-action-row variant="icon">${wheelIcon} Default</minis-action-row>
      <minis-action-row variant="icon" state="hover">${wheelIcon} Hover</minis-action-row>
      <minis-action-row variant="icon" ?active=${true}>${wheelIcon} Active</minis-action-row>
    </div>
  `,
};

export const WithCheckbox: Story = {
  render: () => html`
    <div style="width:280px; display:flex; flex-direction:column; gap:2px;">
      <minis-action-row variant="checkbox">Default</minis-action-row>
      <minis-action-row variant="checkbox" state="hover">Hover</minis-action-row>
      <minis-action-row variant="checkbox" ?active=${true} ?checked=${true}>Active</minis-action-row>
    </div>
  `,
};

export const WithCounter: Story = {
  render: () => html`
    <div style="width:280px; display:flex; flex-direction:column; gap:2px;">
      <minis-action-row counter="3">Label + counter</minis-action-row>
      <minis-action-row variant="icon" counter="12">${wheelIcon} Icon + counter</minis-action-row>
      <minis-action-row variant="checkbox" counter="0">Checkbox + counter</minis-action-row>
    </div>
  `,
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <div
      style="display:grid; grid-template-columns: repeat(3, 220px); gap: 8px 24px; align-items:center;"
    >
      <minis-action-row>ActionRow label</minis-action-row>
      <minis-action-row variant="icon">${wheelIcon} ActionRow label</minis-action-row>
      <minis-action-row variant="checkbox">ActionRow label</minis-action-row>

      <minis-action-row state="hover">ActionRow label</minis-action-row>
      <minis-action-row variant="icon" state="hover">${wheelIcon} ActionRow label</minis-action-row>
      <minis-action-row variant="checkbox" state="hover">ActionRow label</minis-action-row>

      <minis-action-row ?active=${true}>ActionRow label</minis-action-row>
      <minis-action-row variant="icon" ?active=${true}>${wheelIcon} ActionRow label</minis-action-row>
      <minis-action-row variant="checkbox" ?active=${true} ?checked=${true}>ActionRow label</minis-action-row>
    </div>
  `,
};

export const AsMenu: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <div
      style="width:240px; padding:8px; border:1px solid var(--color-border-default, #e2e4e8); border-radius:12px; background:#fff; display:flex; flex-direction:column; gap:2px;"
    >
      <minis-action-row variant="icon">${wheelIcon} Profile</minis-action-row>
      <minis-action-row variant="icon" ?active=${true}>${wheelIcon} Settings</minis-action-row>
      <minis-action-row variant="icon" counter="2">${wheelIcon} Notifications</minis-action-row>
      <minis-action-row variant="icon">${wheelIcon} Sign out</minis-action-row>
    </div>
  `,
};

export const AsFilters: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="width:260px; display:flex; flex-direction:column; gap:2px;">
      <minis-action-row variant="checkbox" counter="128">Cestování</minis-action-row>
      <minis-action-row variant="checkbox" counter="64" ?checked=${true}>Zážitky a zábava</minis-action-row>
      <minis-action-row variant="checkbox" counter="42">Krása a relax</minis-action-row>
      <minis-action-row variant="checkbox" counter="11">Restaurace a bary</minis-action-row>
    </div>
  `,
};
