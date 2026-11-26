import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sidebar-layout.js';
import '../container/container.js';

const meta: Meta = {
  title: 'Components/Sidebar Layout',
  component: 'minis-sidebar-layout',
  tags: ['autodocs'],
  // Container-query component: no decorator padding, or it switches late.
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj;

const block = (label: string, h: number) => html`
  <div style="background:var(--color-surface-faded,#f1f3f5);border:1px dashed var(--color-border,#cbccce);border-radius:var(--border-radius-lg,12px);padding:16px;min-height:${h}px;box-sizing:border-box;font-family:var(--typography-font-family-sans,Inter,sans-serif);font-size:14px;color:var(--color-text-secondary,#666)">
    ${label}
  </div>
`;

export const Default: Story = {
  name: 'Default',
  render: () => html`
    <div style="padding:var(--spacing-layout-lg) 0">
      <minis-container>
        <minis-sidebar-layout>
          <main>${block('Main — fluid. 592px at a 1008px viewport, 824px from 1240px.', 480)}</main>
          <aside slot="sidebar">${block('Sidebar — fixed 320px (--layout-sidebar-width). Below the main column under 1008px.', 240)}</aside>
        </minis-sidebar-layout>
      </minis-container>
    </div>
  `,
};

export const InMediumContainer: Story = {
  name: 'In a medium container',
  render: () => html`
    <div style="padding:var(--spacing-layout-lg) 0">
      <minis-container variant="medium">
        <minis-sidebar-layout>
          <main>${block('Main — 592px from 1008px (944px content − 32px gap − 320px).', 360)}</main>
          <aside slot="sidebar">${block('Sidebar — order summary', 200)}</aside>
        </minis-sidebar-layout>
      </minis-container>
    </div>
  `,
};
