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
<p>A responsive CSS-grid wrapper for cards or images. Three variants cover the main Slevomat page patterns:</p>
<ul>
  <li><strong>navigation</strong> — 4-column grid where the first card is featured (spans 2 cols) and the last card mirrors it on row 2. On mobile (&lt;768px) switches to a 2-row horizontally-scrollable equal-size scroll strip.</li>
  <li><strong>navigation-small</strong> — uniform 4-column grid, all cells equal. Supports any number of rows — slot 8 items for 2 rows, 12 for 3 rows. Same mobile behaviour as <code>navigation</code>.</li>
  <li><strong>photogallery</strong> — asymmetric 5-column layout: one large image left (3-col × 3-row), wide image top-right (2-col × 2-row), two small thumbnails bottom-right. On mobile only the first (large) image is shown.</li>
</ul>
<p>The component is a pure layout wrapper — slot any content (cards, images, <code>&lt;a&gt;</code> elements). Set a height via <code>style="height:…"</code> or the <code>--card-grid-height</code> token.</p>`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['navigation', 'navigation-small', 'photogallery'],
      description: 'Grid layout variant',
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Shared placeholder helper ────────────────────────────────────────────────

const placeholder = (label = '', color = '#e3eaf2') => html`
  <div style="
    background:${color};
    display:flex;
    align-items:center;
    justify-content:center;
    height:100%;
    font-family:sans-serif;
    font-size:13px;
    color:#6b7a8d;
    border-radius:4px;
  ">${label}</div>
`;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  args: {
    variant: 'navigation',
  },
  render: (args) => html`
    <minis-card-grid variant=${args.variant} style="height:420px;display:block">
      ${placeholder('1 — featured', '#d4e3f0')}
      ${placeholder('2')}
      ${placeholder('3')}
      ${placeholder('4')}
      ${placeholder('5')}
      ${placeholder('6 — wide', '#d4e3f0')}
    </minis-card-grid>
  `,
};

// ─── Navigation ───────────────────────────────────────────────────────────────

export const Navigation: Story = {
  name: 'Navigation',
  parameters: {
    docs: {
      description: {
        story: `4-column grid — slot exactly 6 items. The first item spans 2 columns (featured card), the last item mirrors it on the second row. Typical use: homepage category navigation with a hero tile.`,
      },
    },
  },
  render: () => html`
    <minis-card-grid variant="navigation" style="height:420px;display:block">
      ${placeholder('Featured', '#bdd4ea')}
      ${placeholder('Card 2')}
      ${placeholder('Card 3')}
      ${placeholder('Card 4')}
      ${placeholder('Card 5')}
      ${placeholder('Wide', '#bdd4ea')}
    </minis-card-grid>
  `,
};

// ─── Navigation Small — 2 rows ────────────────────────────────────────────────

export const NavigationSmall2Rows: Story = {
  name: 'Navigation Small — 2 rows',
  parameters: {
    docs: {
      description: {
        story: `Uniform 4-column grid, 2 rows — all 8 items equal size. Use for compact category navigation strips where no item has higher priority than others.`,
      },
    },
  },
  render: () => html`
    <minis-card-grid variant="navigation-small" style="height:296px;display:block">
      ${placeholder('1')}
      ${placeholder('2')}
      ${placeholder('3')}
      ${placeholder('4')}
      ${placeholder('5')}
      ${placeholder('6')}
      ${placeholder('7')}
      ${placeholder('8')}
    </minis-card-grid>
  `,
};

// ─── Navigation Small — 3 rows ────────────────────────────────────────────────

export const NavigationSmall3Rows: Story = {
  name: 'Navigation Small — 3 rows',
  parameters: {
    docs: {
      description: {
        story: `Same uniform 4-column grid, extended to 3 rows by slotting 12 items. Use when more categories need to be surfaced without a featured card.`,
      },
    },
  },
  render: () => html`
    <minis-card-grid variant="navigation-small" style="height:448px;display:block">
      ${placeholder('1')}  ${placeholder('2')}  ${placeholder('3')}  ${placeholder('4')}
      ${placeholder('5')}  ${placeholder('6')}  ${placeholder('7')}  ${placeholder('8')}
      ${placeholder('9')}  ${placeholder('10')} ${placeholder('11')} ${placeholder('12')}
    </minis-card-grid>
  `,
};

// ─── Photogallery ─────────────────────────────────────────────────────────────

export const Photogallery: Story = {
  name: 'Photogallery',
  parameters: {
    docs: {
      description: {
        story: `Asymmetric 5-column layout — slot exactly 4 items:
<ol>
  <li>Large image — left, spanning 3 of 5 columns × all 3 rows</li>
  <li>Wide image — top-right, spanning 2 columns × 2 rows</li>
  <li>Small thumbnail — bottom-right col 4</li>
  <li>Small thumbnail — bottom-right col 5</li>
</ol>
Typical use: hotel/venue detail page photo gallery preview. On mobile only the first (large) image is shown.`,
      },
    },
  },
  render: () => html`
    <minis-card-grid variant="photogallery" style="height:352px;display:block">
      ${placeholder('Main photo', '#bdd4ea')}
      ${placeholder('Wide', '#cfdde8')}
      ${placeholder('Thumb 3')}
      ${placeholder('Thumb 4')}
    </minis-card-grid>
  `,
};

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:40px">

      <div>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin:0 0 8px">navigation</p>
        <minis-card-grid variant="navigation" style="height:300px;display:block">
          ${placeholder('Featured', '#bdd4ea')}
          ${placeholder('2')}
          ${placeholder('3')}
          ${placeholder('4')}
          ${placeholder('5')}
          ${placeholder('Wide', '#bdd4ea')}
        </minis-card-grid>
      </div>

      <div>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin:0 0 8px">navigation-small (2 rows)</p>
        <minis-card-grid variant="navigation-small" style="height:200px;display:block">
          ${placeholder('1')} ${placeholder('2')} ${placeholder('3')} ${placeholder('4')}
          ${placeholder('5')} ${placeholder('6')} ${placeholder('7')} ${placeholder('8')}
        </minis-card-grid>
      </div>

      <div>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin:0 0 8px">navigation-small (3 rows)</p>
        <minis-card-grid variant="navigation-small" style="height:300px;display:block">
          ${placeholder('1')}  ${placeholder('2')}  ${placeholder('3')}  ${placeholder('4')}
          ${placeholder('5')}  ${placeholder('6')}  ${placeholder('7')}  ${placeholder('8')}
          ${placeholder('9')}  ${placeholder('10')} ${placeholder('11')} ${placeholder('12')}
        </minis-card-grid>
      </div>

      <div>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin:0 0 8px">photogallery</p>
        <minis-card-grid variant="photogallery" style="height:260px;display:block">
          ${placeholder('Main', '#bdd4ea')}
          ${placeholder('Wide', '#cfdde8')}
          ${placeholder('Thumb 3')}
          ${placeholder('Thumb 4')}
        </minis-card-grid>
      </div>

    </div>
  `,
};
