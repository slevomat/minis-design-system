import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './menu.js';
import '../navigation/navigation-item.js';
import '@minis/icons';

const meta: Meta = {
  title: 'Components/Navigations/Menu',
  component: 'minis-menu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<p>A labelled trigger that opens a panel of items below it.</p>
<p>It was built for the navigation overflow — <code>&lt;minis-navigation&gt;</code> collapses items that do not fit into a menu labelled "Další" — and is usable anywhere a small dropdown of links or buttons is needed.</p>
<p>Slotted children become menu items: they get <code>role="menuitem"</code> and a roving tabindex. Arrow keys move between them, <kbd>Escape</kbd> closes and returns focus to the trigger, a click outside closes, and <kbd>Tab</kbd> lets focus leave without stranding an open panel.</p>
<p>Use <code>placement="end"</code> when the trigger sits near the right edge of its container, so the panel opens inwards.</p>
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Trigger label' },
    open: { control: 'boolean', description: 'Open state (reflected)' },
    placement: {
      control: 'inline-radio',
      options: ['start', 'end'],
      description: 'Which edge of the trigger the panel aligns to',
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  args: {
    label: 'Další',
    open: false,
    placement: 'start',
  },
  render: (args) => html`
    <div style="padding-bottom:220px">
      <minis-menu label=${args.label} placement=${args.placement} ?open=${args.open}>
        <minis-navigation-item href="/fotodarky">Fotodárky</minis-navigation-item>
        <minis-navigation-item href="/potraviny">Potraviny</minis-navigation-item>
        <minis-navigation-item href="/prakticke">Praktické</minis-navigation-item>
        <minis-navigation-item href="/darky">Dárky</minis-navigation-item>
        <minis-navigation-item href="/benefity">Benefity</minis-navigation-item>
      </minis-menu>
    </div>
  `,
};

// ─── Placement ───────────────────────────────────────────────────────────────

export const Placement: Story = {
  name: 'Placement — start vs end',
  render: () => html`
    <div style="display:flex;justify-content:space-between;padding-bottom:220px">
      <minis-menu label="Aligned to start" placement="start">
        <minis-navigation-item href="/a">První položka</minis-navigation-item>
        <minis-navigation-item href="/b">Druhá položka</minis-navigation-item>
      </minis-menu>

      <minis-menu label="Aligned to end" placement="end">
        <minis-navigation-item href="/a">První položka</minis-navigation-item>
        <minis-navigation-item href="/b">Druhá položka</minis-navigation-item>
      </minis-menu>
    </div>
  `,
};

// ─── With a leading icon ─────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: 'With a trigger icon',
  render: () => html`
    <div style="padding-bottom:220px">
      <minis-menu label="Kategorie">
        <minis-icon slot="icon" name="categories" size="24"></minis-icon>
        <minis-navigation-item href="/cestovani">Cestování</minis-navigation-item>
        <minis-navigation-item href="/zbozi" active>Zboží</minis-navigation-item>
        <minis-navigation-item href="/potraviny">Potraviny</minis-navigation-item>
      </minis-menu>
    </div>
  `,
};
