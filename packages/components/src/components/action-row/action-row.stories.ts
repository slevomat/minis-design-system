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
  title: 'Components/Navigations/Action Row',
  component: 'minis-action-row',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4192-4135&t=XnXEUQQ4da0KbQdm-11" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35em;font-size:.875em;color:var(--color-text-accent-link,#006eb9);text-decoration:none;border:1px solid currentColor;border-radius:4px;padding:.2em .55em;line-height:1.4"><svg width="13" height="13" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 57c5.523 0 10-4.477 10-10v-10H10c-5.523 0-10 4.477-10 10s4.477 10 10 10z" fill="#0ACF83"/><path d="M0 29c0-5.523 4.477-10 10-10h10v20H10C4.477 39 0 34.523 0 29z" fill="#A259FF"/><path d="M0 10C0 4.477 4.477 0 10 0h10v20H10C4.477 20 0 15.523 0 10z" fill="#F24E1E"/><path d="M20 0h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H20V0z" fill="#FF7262"/><path d="M40 29c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z" fill="#1ABCFE"/></svg> Open in Figma ↗</a></p>
<p>Interactive list row used to build vertical menus, dropdowns, filter lists and similar option groups. Always clickable. May optionally lead with an <strong>icon</strong>, carry a <strong>checkbox</strong>, and end with a <strong>counter pill</strong> that always sits directly after the label.</p>
<p>Two layouts, matching the Figma <code>Breakpoint</code> variant. <strong>desktop</strong> is the 32px row with everything packed to the left. <strong>xs</strong> is the 56px mobile row that always ends with a trailing action pinned to the right edge — an <code>arrow-right</code> chevron, or the checkbox when <code>variant="checkbox"</code>.</p>`,
      },
    },
  },
  argTypes: {
    variant: { control: { type: 'inline-radio' }, options: ['none', 'icon', 'checkbox'] },
    breakpoint: { control: { type: 'inline-radio' }, options: ['desktop', 'xs'] },
    state: { control: { type: 'inline-radio' }, options: [undefined, 'default', 'hover', 'active'] },
    active: { control: 'boolean' },
    checked: { control: 'boolean', if: { arg: 'variant', eq: 'checkbox' } },
    disabled: { control: 'boolean' },
    counter: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    variant: 'none',
    breakpoint: 'desktop',
    active: false,
    checked: false,
    disabled: false,
    counter: '',
    label: 'ActionRow label',
  },
  render: (args) => html`
    <div style=${args.breakpoint === 'xs' ? 'width:330px;' : 'width:280px;'}>
      <minis-action-row
        variant=${args.variant}
        breakpoint=${args.breakpoint}
        state=${args.state ?? ''}
        ?active=${args.active}
        ?checked=${args.variant === 'checkbox' && args.checked}
        ?disabled=${args.disabled}
        counter=${args.counter ?? ''}
      >
        ${args.variant === 'none' ? '' : wheelIcon}
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
  name: 'All variants — desktop',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div
      style="display:grid; grid-template-columns: repeat(3, 220px); gap: 8px 24px; align-items:center;"
    >
      <minis-action-row>ActionRow label</minis-action-row>
      <minis-action-row variant="icon">${wheelIcon} ActionRow label</minis-action-row>
      <minis-action-row variant="checkbox">${wheelIcon} ActionRow label</minis-action-row>

      <minis-action-row state="hover">ActionRow label</minis-action-row>
      <minis-action-row variant="icon" state="hover">${wheelIcon} ActionRow label</minis-action-row>
      <minis-action-row variant="checkbox" state="hover">${wheelIcon} ActionRow label</minis-action-row>

      <minis-action-row ?active=${true}>ActionRow label</minis-action-row>
      <minis-action-row variant="icon" ?active=${true}>${wheelIcon} ActionRow label</minis-action-row>
      <minis-action-row variant="checkbox" ?active=${true} ?checked=${true}>${wheelIcon} ActionRow label</minis-action-row>

      <minis-action-row ?disabled=${true}>ActionRow label</minis-action-row>
      <minis-action-row variant="icon" ?disabled=${true}>${wheelIcon} ActionRow label</minis-action-row>
      <minis-action-row variant="checkbox" ?disabled=${true}>${wheelIcon} ActionRow label</minis-action-row>
    </div>
  `,
};

export const AllVariantsXs: Story = {
  name: 'All variants — xs',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div
      style="display:grid; grid-template-columns: repeat(3, 330px); gap: 8px 24px; align-items:center;"
    >
      <minis-action-row breakpoint="xs">ActionRow label</minis-action-row>
      <minis-action-row breakpoint="xs" variant="icon">${wheelIcon} ActionRow label</minis-action-row>
      <minis-action-row breakpoint="xs" variant="checkbox">${wheelIcon} ActionRow label</minis-action-row>

      <minis-action-row breakpoint="xs" state="hover">ActionRow label</minis-action-row>
      <minis-action-row breakpoint="xs" variant="icon" state="hover">${wheelIcon} ActionRow label</minis-action-row>
      <minis-action-row breakpoint="xs" variant="checkbox" state="hover">${wheelIcon} ActionRow label</minis-action-row>

      <minis-action-row breakpoint="xs" ?active=${true}>ActionRow label</minis-action-row>
      <minis-action-row breakpoint="xs" variant="icon" ?active=${true}>${wheelIcon} ActionRow label</minis-action-row>
      <minis-action-row breakpoint="xs" variant="checkbox" ?active=${true} ?checked=${true}>${wheelIcon} ActionRow label</minis-action-row>

      <minis-action-row breakpoint="xs" ?disabled=${true}>ActionRow label</minis-action-row>
      <minis-action-row breakpoint="xs" variant="icon" ?disabled=${true}>${wheelIcon} ActionRow label</minis-action-row>
      <minis-action-row breakpoint="xs" variant="checkbox" ?disabled=${true}>${wheelIcon} ActionRow label</minis-action-row>
    </div>
  `,
};

export const XsMobileList: Story = {
  name: 'xs — mobile list',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'The xs row is the full-width mobile pattern: a 56px tap target with the action pinned to the right edge. Rows that navigate end with a chevron; rows that select end with a checkbox.',
      },
    },
  },
  render: () => html`
    <div style="width:330px; display:flex; flex-direction:column; gap:2px;">
      <minis-action-row breakpoint="xs" variant="icon">${wheelIcon} Travel</minis-action-row>
      <minis-action-row breakpoint="xs" variant="icon" counter="12">${wheelIcon} Experiences</minis-action-row>
      <minis-action-row breakpoint="xs" variant="icon">${wheelIcon} Beauty and relaxation</minis-action-row>
      <minis-action-row breakpoint="xs">Restaurants and bars</minis-action-row>
    </div>
  `,
};

export const XsFilters: Story = {
  name: 'xs — filter list',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="width:330px; display:flex; flex-direction:column; gap:2px;">
      <minis-action-row breakpoint="xs" variant="checkbox" counter="128">${wheelIcon} Travel</minis-action-row>
      <minis-action-row breakpoint="xs" variant="checkbox" counter="64" ?checked=${true}>${wheelIcon} Experiences</minis-action-row>
      <minis-action-row breakpoint="xs" variant="checkbox" counter="42">${wheelIcon} Beauty and relaxation</minis-action-row>
      <minis-action-row breakpoint="xs" variant="checkbox" counter="11">${wheelIcon} Restaurants and bars</minis-action-row>
    </div>
  `,
};

export const AsMenu: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <div
      style="width:240px; padding:8px; border:1px solid var(--color-border-subtle); border-radius:var(--border-radius-lg); background:var(--color-surface-primary); display:flex; flex-direction:column; gap:2px;"
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
      <minis-action-row variant="checkbox" counter="128">Travel</minis-action-row>
      <minis-action-row variant="checkbox" counter="64" ?checked=${true}>Experiences</minis-action-row>
      <minis-action-row variant="checkbox" counter="42">Beauty and relaxation</minis-action-row>
      <minis-action-row variant="checkbox" counter="11">Restaurants and bars</minis-action-row>
    </div>
  `,
};
