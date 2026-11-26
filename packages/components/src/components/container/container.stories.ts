import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './container.js';

const meta: Meta = {
  title: 'Components/Container',
  component: 'minis-container',
  tags: ['autodocs'],
  // Full width, no decorator padding: the container's max-widths and padding
  // follow the real viewport.
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'medium', 'narrow'],
      description:
        'Width level: `default` (wide, 1240px) for browsing pages, `medium` (1008px) for task pages, `narrow` (752px) for a reading / form column',
    },
  },
};

export default meta;
type Story = StoryObj;

const demoBlockStyle = 'background:var(--color-surface-faded,#f1f3f5);padding:16px;border-radius:8px;border:1px dashed var(--color-border,#cbccce);font-family:var(--typography-font-family-sans,Inter,sans-serif);font-size:14px;color:var(--color-text-secondary,#666)';
const captionStyle = 'background:var(--color-surface-faded,#f1f3f5);padding:8px 0;font-family:var(--typography-font-family-sans,Inter,sans-serif);font-size:12px;color:var(--color-text-secondary,#666);text-align:center';

export const Playground: Story = {
  name: 'Playground',
  args: {
    variant: 'default',
  },
  render: (args) => html`
    <minis-container variant=${args.variant}>
      <div style=${demoBlockStyle}>
        Content inside <code>&lt;minis-container variant="${args.variant}"&gt;</code>.
        Resize the viewport: padding changes at 408px and 1008px, the caps apply from 768px (narrow) and 1008px (medium, default).
      </div>
    </minis-container>
  `,
};

export const WidthLevels: Story = {
  name: 'Width levels',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:4px;background:var(--color-border,#cbccce)">
      <div style=${captionStyle}>default — wide, max 1240px from 1008px · browsing pages: homepage, listings, deal detail, magazine</div>
      <minis-container>
        <div style=${demoBlockStyle}><strong>default</strong> — 944px content at 1008px, 1176px from 1240px</div>
      </minis-container>
      <div style=${captionStyle}>medium — max 1008px from 1008px · task pages: cart, login, checkout</div>
      <minis-container variant="medium">
        <div style=${demoBlockStyle}><strong>medium</strong> — 944px content from 1008px</div>
      </minis-container>
      <div style=${captionStyle}>narrow — max 752px from 768px · reading / form column</div>
      <minis-container variant="narrow">
        <div style=${demoBlockStyle}><strong>narrow</strong> — 720px content at 768–1007px, 688px from 1008px</div>
      </minis-container>
    </div>
  `,
};

export const ResponsiveDemo: Story = {
  name: 'Responsive padding',
  render: () => html`
    <minis-container>
      <div style=${demoBlockStyle}>
        <p style="margin:0 0 8px"><strong>Responsive padding</strong> (all three variants, Figma Layout modes in brackets):</p>
        <table style="border-collapse:collapse;font-size:13px;width:100%">
          <thead>
            <tr style="background:var(--color-surface-faded,#e9ecef)">
              <th style="padding:6px 10px;text-align:left;border:1px solid var(--color-border,#cbccce)">Viewport</th>
              <th style="padding:6px 10px;text-align:left;border:1px solid var(--color-border,#cbccce)">Padding</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:6px 10px;border:1px solid var(--color-border,#cbccce)">&lt; 408px (default, 2xs)</td><td style="padding:6px 10px;border:1px solid var(--color-border,#cbccce)">8px</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--color-border,#cbccce)">408–1007px (xs, sm, md)</td><td style="padding:6px 10px;border:1px solid var(--color-border,#cbccce)">16px</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--color-border,#cbccce)">≥ 1008px (lg and up)</td><td style="padding:6px 10px;border:1px solid var(--color-border,#cbccce)">32px</td></tr>
          </tbody>
        </table>
      </div>
    </minis-container>
  `,
};
