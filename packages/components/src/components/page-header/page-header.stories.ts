import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './page-header.js';
import '../button/button.js';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Components/Page Header',
  component: 'minis-page-header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4642-396" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35em;font-size:.875em;color:var(--color-text-accent-link,#006eb9);text-decoration:none;border:1px solid currentColor;border-radius:4px;padding:.2em .55em;line-height:1.4"><svg width="13" height="13" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 57c5.523 0 10-4.477 10-10v-10H10c-5.523 0-10 4.477-10 10s4.477 10 10 10z" fill="#0ACF83"/><path d="M0 29c0-5.523 4.477-10 10-10h10v20H10C4.477 39 0 34.523 0 29z" fill="#A259FF"/><path d="M0 10C0 4.477 4.477 0 10 0h10v20H10C4.477 20 0 15.523 0 10z" fill="#F24E1E"/><path d="M20 0h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H20V0z" fill="#FF7262"/><path d="M40 29c0 5.523-4.477 10-10 10s-10-10-10-10 4.477-10 10-10 10 4.477 10 10z" fill="#1ABCFE"/></svg> Open in Figma ↗</a></p>
<p>Full-width branded banner for category and campaign pages. Responsive: horizontal layout on desktop (≥768 px) with content left and image right; stacked layout on mobile with the image on top.</p>
<ul>
  <li><strong>5 themes</strong>: <code>brand</code> (cyan, default), <code>yellow</code>, <code>blue</code>, <code>pink</code>, <code>green</code>.</li>
  <li><strong>Default slot</strong>: heading HTML — supports <code>&lt;br&gt;</code> for line breaks.</li>
  <li><strong><code>image</code> slot</strong>: decorative photo. Provide a PNG with a transparent blob-shaped background for the signature organic look.</li>
  <li><strong><code>button</code> slot</strong>: optional CTA — use <code>&lt;minis-button variant="transparent" size="xl"&gt;</code>.</li>
  <li><strong><code>description</code></strong> attribute: optional body copy below the heading.</li>
  <li><strong><code>tag</code></strong> attribute: optional countdown/label pill above the heading.</li>
  <li><strong><code>no-badge</code></strong> boolean (default <code>false</code>): hides the Brand/Badge checkmark seal next to the heading.</li>
</ul>
<p>The badge seal is <strong>typography-relative</strong>: it sizes off the heading font-size (<code>--page-header-badge-size</code>, default <code>0.8em</code>), sits exactly centred on the <strong>last line's line-height</strong>, and keeps a <code>0.27em</code> gap after that line's text (<code>--page-header-badge-gap</code>) — for any number of heading lines, at every breakpoint. Keep the heading slot inline-level; a block-level child pushes the badge onto its own line.</p>
        `,
      },
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['brand', 'blue', 'yellow', 'pink', 'green'],
      description: 'Color theme — sets background and text colors',
    },
    description: {
      control: 'text',
      description: 'Optional body text shown below the heading',
    },
    tag: {
      control: 'text',
      description: 'Optional countdown/label pill above the heading',
    },
    'no-badge': {
      control: 'boolean',
      description: 'Hide the Brand/Badge checkmark seal (shown by default)',
    },
  },
  args: {
    theme: 'brand',
    description: 'Dnešní 30% sleva navíc vám nesmí uniknout. Pořiďte si dovolenou u moře za ještě lepší cenu. Ale pozor – akce platí jen dnes.',
    tag: '',
    'no-badge': false,
  },
};

export default meta;
type Story = StoryObj;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  render: (args) => html`
    <minis-page-header
      theme="${args.theme}"
      description="${args.description}"
      tag="${args.tag}"
      ?no-badge="${args['no-badge']}"
    >
      Ušetřete za pobyt<br>v italském Rimini
      <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:11px;color:rgba(255,255,255,.6);text-align:center">
        image slot
      </div>
    </minis-page-header>
  `,
};

// ─── All Themes ───────────────────────────────────────────────────────────────

export const AllThemes: Story = {
  name: 'All Themes',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'All five color themes with description and badge.' },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:0">
      ${(['brand', 'yellow', 'blue', 'pink', 'green'] as const).map(
        (theme) => html`
          <minis-page-header
            theme="${theme}"
            description="Dnešní 30% sleva navíc vám nesmí uniknout. Pořiďte si dovolenou u moře za ještě lepší cenu."
          >
            Ušetřete za pobyt<br>v italském Rimini
            <div
              slot="image"
              style="width:100%;height:100%;background:rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:11px;color:rgba(255,255,255,.6)"
            >${theme}</div>
          </minis-page-header>
        `
      )}
    </div>
  `,
};

// ─── With CTA Button ──────────────────────────────────────────────────────────

export const WithButton: Story = {
  name: 'With CTA Button',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Place a <code>&lt;minis-button variant="transparent" size="xl"&gt;</code> in the <code>button</code> slot for a call-to-action.',
      },
    },
  },
  render: () => html`
    <minis-page-header
      theme="brand"
      description="Dnešní 30% sleva navíc vám nesmí uniknout. Pořiďte si dovolenou u moře za ještě lepší cenu. Ale pozor – akce platí jen dnes."
    >
      Ušetřete za pobyt<br>v italském Rimini
      <minis-button slot="button" variant="transparent" size="xl">Mrknout na volné termíny</minis-button>
      <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:11px;color:rgba(255,255,255,.6)">photo</div>
    </minis-page-header>
  `,
};

// ─── With Tag ─────────────────────────────────────────────────────────────────

export const WithTag: Story = {
  name: 'With Tag',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'The <code>tag</code> attribute shows a small countdown/label pill above the heading.',
      },
    },
  },
  render: () => html`
    <minis-page-header
      theme="yellow"
      tag="Do 1. června zbývá 6 dní"
      description="Dnešní 30% sleva navíc vám nesmí uniknout. Pořiďte si dovolenou u moře za ještě lepší cenu."
    >
      Ušetřete za pobyt<br>v italském Rimini
      <minis-button slot="button" variant="transparent" size="xl">Zobrazit akci</minis-button>
      <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:11px;color:rgba(255,255,255,.6)">photo</div>
    </minis-page-header>
  `,
};

// ─── No Badge ─────────────────────────────────────────────────────────────────

export const NoBadge: Story = {
  name: 'No Badge',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Add the <code>no-badge</code> attribute to hide the Brand/Badge seal.' },
    },
  },
  render: () => html`
    <minis-page-header
      theme="blue"
      description="Dnešní 30% sleva navíc vám nesmí uniknout."
      no-badge
    >
      Ušetřete za pobyt<br>v italském Rimini
      <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:11px;color:rgba(255,255,255,.6)">photo</div>
    </minis-page-header>
  `,
};

// ─── Badge Anchoring ──────────────────────────────────────────────────────────

export const BadgeAnchoring: Story = {
  name: 'Badge Anchoring',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
The badge always lands on the <strong>last line</strong> of the heading, centred on that
line's line-height, with a <code>0.27em</code> gap after the text — one line or five, at any
breakpoint. Size (<code>0.8em</code>) and gap (<code>0.27em</code>) are <code>em</code>-relative, so both scale
with the responsive heading font-size.
<br><br>
Override per instance with <code>--page-header-badge-size</code> and
<code>--page-header-badge-gap</code> (last example below).
        `,
      },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:0">
      <minis-page-header theme="brand">
        One line
        <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15)"></div>
      </minis-page-header>

      <minis-page-header theme="yellow">
        Two lines<br>of heading
        <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15)"></div>
      </minis-page-header>

      <minis-page-header theme="green">
        Three lines<br>of a longer<br>page heading
        <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15)"></div>
      </minis-page-header>

      <minis-page-header
        theme="pink"
        style="--page-header-badge-size:1.4em;--page-header-badge-gap:0.5em"
        description="--page-header-badge-size: 1.4em · --page-header-badge-gap: 0.5em"
      >
        Custom size<br>and gap
        <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15)"></div>
      </minis-page-header>
    </div>
  `,
};

// ─── Mobile Layout ────────────────────────────────────────────────────────────

export const MobileLayout: Story = {
  name: 'Mobile Layout',
  parameters: {
    controls: { disable: true },
    viewport: { defaultViewport: 'iphone6' },
    docs: {
      description: {
        story: 'Mobile layout (≤767 px): image on top, content stacked below. This story opens with the Storybook viewport set to iPhone 6 (375 px) so the mobile layout is visible immediately.',
      },
    },
  },
  render: () => html`
    <minis-page-header
      theme="brand"
      tag="Do 1. června zbývá 6 dní"
      description="Dnešní 30% sleva navíc vám nesmí uniknout."
    >
      Ušetřete za pobyt<br>v italském Rimini
      <minis-button slot="button" variant="transparent" size="xl">Zjistit více</minis-button>
      <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:11px;color:rgba(255,255,255,.6)">photo</div>
    </minis-page-header>
  `,
};

// ─── Content Variants ─────────────────────────────────────────────────────────

export const ContentVariants: Story = {
  name: 'Content Variants',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Heading only · Heading + description · Full (tag, description, button).' },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:0">
      <minis-page-header theme="pink">
        Heading only<br>no extras
        <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15)"></div>
      </minis-page-header>

      <minis-page-header
        theme="green"
        description="With description but no button or tag."
      >
        Heading and<br>description
        <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15)"></div>
      </minis-page-header>

      <minis-page-header
        theme="brand"
        tag="Do 1. června zbývá 6 dní"
        description="Dnešní 30% sleva navíc vám nesmí uniknout. Pořiďte si dovolenou u moře za ještě lepší cenu."
      >
        Full header<br>all features
        <minis-button slot="button" variant="transparent" size="xl">Zjistit více</minis-button>
        <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15)"></div>
      </minis-page-header>
    </div>
  `,
};
