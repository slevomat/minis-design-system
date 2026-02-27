import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './message.js';

// Sample thumbnail used across stories (inline SVG placeholder — replace with real img in product)
const thumbSvg = html`
  <svg slot="visual" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" style="display:block;width:100%;height:100%">
    <rect width="40" height="40" rx="4" fill="#c8d8e8"/>
    <rect x="8" y="16" width="24" height="16" rx="2" fill="#6b8fad"/>
    <circle cx="14" cy="14" r="5" fill="#a8c4da"/>
    <polygon points="8,32 20,18 28,26 34,20 34,32" fill="#4a7a9b"/>
  </svg>
`;

const meta: Meta = {
  title: 'Components/Message',
  component: 'minis-message',
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Card layout direction',
    },
    visual: {
      control: 'boolean',
      description: 'Show the visual thumbnail slot',
    },
    closable: {
      control: 'boolean',
      description: 'Show the close / dismiss button',
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  args: {
    layout: 'vertical',
    visual: true,
    closable: true,
  },
  render: (args) => html`
    <minis-message
      layout=${args.layout}
      ?visual=${args.visual}
      ?closable=${args.closable}
      style="max-width:320px"
    >
      ${thumbSvg}
      <span slot="title">Pokračovat v posledním hledání a pátrání</span>
      Dotaz z Charlese, který může být dost komplexní a tak nevím kolik tu může stači řádků.
    </minis-message>
  `,
};

// ─── Vertical (default) ───────────────────────────────────────────────────────

export const Vertical: Story = {
  name: 'Vertical',
  render: () => html`
    <minis-message style="max-width:320px">
      ${thumbSvg}
      <span slot="title">Pokračovat v posledním hledání a pátrání</span>
      Dotaz z Charlese, který může být dost komplexní a tak nevím kolik tu může stači řádků.
    </minis-message>
  `,
};

// ─── Horizontal ───────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  name: 'Horizontal',
  render: () => html`
    <minis-message layout="horizontal" style="max-width:724px">
      ${thumbSvg}
      <span slot="title">Pokračovat v posledním hledání</span>
      Dotaz z Charlese, který může být dost komplexní a tak nevím kolik tu může stači řádků.
    </minis-message>
  `,
};

// ─── Both layouts ─────────────────────────────────────────────────────────────

export const BothLayouts: Story = {
  name: 'Both layouts',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px">
      <div>
        <p style="font-size:13px;color:var(--color-text-secondary,#666);margin:0 0 8px;font-family:inherit">Vertical</p>
        <minis-message style="max-width:320px">
          ${thumbSvg}
          <span slot="title">Pokračovat v posledním hledání a pátrání</span>
          Dotaz z Charlese, který může být dost komplexní a tak nevím kolik tu může stači řádků.
        </minis-message>
      </div>
      <div>
        <p style="font-size:13px;color:var(--color-text-secondary,#666);margin:0 0 8px;font-family:inherit">Horizontal</p>
        <minis-message layout="horizontal" style="max-width:724px">
          ${thumbSvg}
          <span slot="title">Pokračovat v posledním hledání</span>
          Dotaz z Charlese, který může být dost komplexní a tak nevím kolik tu může stači řádků.
        </minis-message>
      </div>
    </div>
  `,
};

// ─── Without visual ───────────────────────────────────────────────────────────

export const WithoutVisual: Story = {
  name: 'Without visual',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px">
      <minis-message ?visual=${false} style="max-width:320px">
        <span slot="title">System maintenance tonight</span>
        We'll be down for 30 minutes at midnight. Please save your work.
      </minis-message>
      <minis-message layout="horizontal" ?visual=${false} style="max-width:724px">
        <span slot="title">System maintenance tonight</span>
        We'll be down for 30 minutes at midnight. Please save your work.
      </minis-message>
    </div>
  `,
};

// ─── Not closable ─────────────────────────────────────────────────────────────

export const NotClosable: Story = {
  name: 'Not closable',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px">
      <minis-message ?closable=${false} style="max-width:320px">
        ${thumbSvg}
        <span slot="title">Pokračovat v posledním hledání</span>
        Dotaz, který může být dost komplexní.
      </minis-message>
      <minis-message layout="horizontal" ?closable=${false} style="max-width:724px">
        ${thumbSvg}
        <span slot="title">Pokračovat v posledním hledání</span>
        Dotaz, který může být dost komplexní.
      </minis-message>
    </div>
  `,
};
