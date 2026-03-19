import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './container.js';

const meta: Meta = {
  title: 'Components/Container',
  component: 'minis-container',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'narrow'],
      description: 'Container width variant',
    },
  },
};

export default meta;
type Story = StoryObj;

const demoBlockStyle = 'background:var(--color-surface-faded,#f1f3f5);padding:16px;border-radius:8px;border:1px dashed var(--color-border,#cbccce);font-family:var(--typography-font-family-sans,Inter,sans-serif);font-size:14px;color:var(--color-text-secondary,#666)';

export const Playground: Story = {
  name: 'Playground',
  args: {
    variant: 'default',
  },
  render: (args) => html`
    <minis-container variant=${args.variant}>
      <div style=${demoBlockStyle}>
        Content inside <code>&lt;minis-container variant="${args.variant}"&gt;</code>.
        Resize the viewport to see responsive padding changes at 408px, 768px, and 1256px.
      </div>
    </minis-container>
  `,
};

export const DefaultVsNarrow: Story = {
  name: 'Default vs Narrow',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:4px;background:var(--color-border,#cbccce)">
      <div style="background:var(--color-surface-faded,#f1f3f5);padding:8px 0;font-family:var(--typography-font-family-sans,Inter,sans-serif);font-size:12px;color:var(--color-text-secondary,#666);text-align:center">
        default — max-width 1240px from 1256px+ · 100% below
      </div>
      <minis-container>
        <div style=${demoBlockStyle}>
          <strong>default</strong> — full width on mobile, caps at 1240px on wide screens
        </div>
      </minis-container>
      <div style="background:var(--color-surface-faded,#f1f3f5);padding:8px 0;font-family:var(--typography-font-family-sans,Inter,sans-serif);font-size:12px;color:var(--color-text-secondary,#666);text-align:center">
        narrow — max-width 752px from 768px+ · 100% below
      </div>
      <minis-container variant="narrow">
        <div style=${demoBlockStyle}>
          <strong>narrow</strong> — full width on mobile, caps at 752px from 768px+
        </div>
      </minis-container>
    </div>
  `,
};

export const ResponsiveDemo: Story = {
  name: 'Responsive padding',
  render: () => html`
    <minis-container>
      <div style=${demoBlockStyle}>
        <p style="margin:0 0 8px"><strong>Responsive padding tiers:</strong></p>
        <table style="border-collapse:collapse;font-size:13px;width:100%">
          <thead>
            <tr style="background:var(--color-surface-faded,#e9ecef)">
              <th style="padding:6px 10px;text-align:left;border:1px solid var(--color-border,#cbccce)">Viewport</th>
              <th style="padding:6px 10px;text-align:left;border:1px solid var(--color-border,#cbccce)">Padding</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:6px 10px;border:1px solid var(--color-border,#cbccce)">≤ 407px</td><td style="padding:6px 10px;border:1px solid var(--color-border,#cbccce)">8px</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--color-border,#cbccce)">408–767px</td><td style="padding:6px 10px;border:1px solid var(--color-border,#cbccce)">16px</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--color-border,#cbccce)">768–1255px</td><td style="padding:6px 10px;border:1px solid var(--color-border,#cbccce)">16px</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--color-border,#cbccce)">≥ 1256px</td><td style="padding:6px 10px;border:1px solid var(--color-border,#cbccce)">32px</td></tr>
          </tbody>
        </table>
      </div>
    </minis-container>
  `,
};
