import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './card-grid.js';

const meta: Meta = {
  title: 'Components/Card Grid',
  component: 'minis-card-grid',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=3583-12247" target="_blank" rel="noopener noreferrer">Open in Figma ↗</a></p>
<p>A responsive CSS-grid wrapper for cards or images. Four variants cover the main Slevomat page patterns:</p>
<ul>
  <li><strong>navigation</strong> — 4-column grid, 6 slots. Item 1 featured (2-col), item 6 wide (2-col). Default height: 584px. Mobile: horizontal scroll strip.</li>
  <li><strong>navigation-small</strong> — uniform 4×2 grid, 8 slots, all cells equal. Default height: 296px. Mobile: horizontal scroll strip.</li>
  <li><strong>navigation-small-3</strong> — uniform 4×3 grid, 12 slots, all cells equal. Default height: 448px. Mobile: 4×2 horizontal scroll strip (shows 8 items).</li>
  <li><strong>photogallery</strong> — asymmetric 5-column layout, 4 slots: large main photo left, wide image top-right, two small thumbnails bottom-right. Default height: 352px. Mobile: only first image shown (210px).</li>
</ul>
<p>Pure layout wrapper — slot any content. Override height via <code>--card-grid-height</code>. Slot background defaults to <code>--color-surface-faded</code>.</p>`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['navigation', 'navigation-small', 'navigation-small-3', 'photogallery'],
      description: 'Grid layout variant',
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Shared placeholder helper ────────────────────────────────────────────────

const p = (label = '') => html`
  <div style="
    display:flex;
    align-items:center;
    justify-content:center;
    height:100%;
    font-family:sans-serif;
    font-size:13px;
    color:var(--color-text-secondary,#6b7a8d);
  ">${label}</div>
`;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  args: { variant: 'navigation' },
  render: (args) => html`
    <minis-card-grid variant=${args.variant}>
      ${p('1')} ${p('2')} ${p('3')} ${p('4')} ${p('5')} ${p('6')}
    </minis-card-grid>
  `,
};

// ─── Navigation ───────────────────────────────────────────────────────────────

export const Navigation: Story = {
  name: 'Navigation',
  parameters: {
    docs: {
      description: {
        story: `4-column grid — <strong>6 slots</strong>. Item 1 spans 2 columns (featured), item 6 mirrors it on row 2. Default height: 584px. Typical use: homepage category navigation with a hero tile.`,
      },
    },
  },
  render: () => html`
    <minis-card-grid variant="navigation">
      ${p('1 — featured')} ${p('2')} ${p('3')} ${p('4')} ${p('5')} ${p('6 — wide')}
    </minis-card-grid>
  `,
};

// ─── Navigation Small — 2 rows ────────────────────────────────────────────────

export const NavigationSmall: Story = {
  name: 'Navigation Small',
  parameters: {
    docs: {
      description: {
        story: `Uniform 4×2 grid — <strong>8 slots</strong>, all cells equal. Default height: 296px. Use for compact category navigation where no item has higher visual priority.`,
      },
    },
  },
  render: () => html`
    <minis-card-grid variant="navigation-small">
      ${p('1')} ${p('2')} ${p('3')} ${p('4')}
      ${p('5')} ${p('6')} ${p('7')} ${p('8')}
    </minis-card-grid>
  `,
};

// ─── Navigation Small — 3 rows ────────────────────────────────────────────────

export const NavigationSmall3: Story = {
  name: 'Navigation Small — 3 rows',
  parameters: {
    docs: {
      description: {
        story: `Uniform 4×3 grid — <strong>12 slots</strong>, all cells equal. Default height: 448px. Mobile: shows as a 4×2 scroll strip (first 8 visible). Use when more categories need to be surfaced.`,
      },
    },
  },
  render: () => html`
    <minis-card-grid variant="navigation-small-3">
      ${p('1')}  ${p('2')}  ${p('3')}  ${p('4')}
      ${p('5')}  ${p('6')}  ${p('7')}  ${p('8')}
      ${p('9')}  ${p('10')} ${p('11')} ${p('12')}
    </minis-card-grid>
  `,
};

// ─── Photogallery ─────────────────────────────────────────────────────────────

export const Photogallery: Story = {
  name: 'Photogallery',
  parameters: {
    docs: {
      description: {
        story: `Asymmetric 5-column layout — <strong>4 slots</strong>:
<ol>
  <li>Large image — left, spanning 3 of 5 columns × all 3 rows</li>
  <li>Wide image — top-right, spanning 2 columns × 2 rows</li>
  <li>Small thumbnail — bottom-right col 4</li>
  <li>Small thumbnail — bottom-right col 5</li>
</ol>
Default height: 352px. Typical use: hotel/venue photo gallery preview. Mobile: only slot 1 shown (210px).`,
      },
    },
  },
  render: () => html`
    <minis-card-grid variant="photogallery">
      ${p('1 — main')} ${p('2 — wide')} ${p('3')} ${p('4')}
    </minis-card-grid>
  `,
};

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:40px">

      <div>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin:0 0 8px">navigation — 6 slots (584px)</p>
        <minis-card-grid variant="navigation">
          ${p('1')} ${p('2')} ${p('3')} ${p('4')} ${p('5')} ${p('6')}
        </minis-card-grid>
      </div>

      <div>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin:0 0 8px">navigation-small — 8 slots (296px)</p>
        <minis-card-grid variant="navigation-small">
          ${p('1')} ${p('2')} ${p('3')} ${p('4')}
          ${p('5')} ${p('6')} ${p('7')} ${p('8')}
        </minis-card-grid>
      </div>

      <div>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin:0 0 8px">navigation-small-3 — 12 slots (448px)</p>
        <minis-card-grid variant="navigation-small-3">
          ${p('1')}  ${p('2')}  ${p('3')}  ${p('4')}
          ${p('5')}  ${p('6')}  ${p('7')}  ${p('8')}
          ${p('9')}  ${p('10')} ${p('11')} ${p('12')}
        </minis-card-grid>
      </div>

      <div>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin:0 0 8px">photogallery — 4 slots (352px)</p>
        <minis-card-grid variant="photogallery">
          ${p('1')} ${p('2')} ${p('3')} ${p('4')}
        </minis-card-grid>
      </div>

    </div>
  `,
};
