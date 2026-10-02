import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './message.js';
import '../button/button.js';

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
  parameters: {
    docs: {
      description: {
        component: `
<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=2513-8181" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35em;font-size:.875em;color:var(--color-text-accent-link,#006eb9);text-decoration:none;border:1px solid currentColor;border-radius:4px;padding:.2em .55em;line-height:1.4"><svg width="13" height="13" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 57c5.523 0 10-4.477 10-10v-10H10c-5.523 0-10 4.477-10 10s4.477 10 10 10z" fill="#0ACF83"/><path d="M0 29c0-5.523 4.477-10 10-10h10v20H10C4.477 39 0 34.523 0 29z" fill="#A259FF"/><path d="M0 10C0 4.477 4.477 0 10 0h10v20H10C4.477 20 0 15.523 0 10z" fill="#F24E1E"/><path d="M20 0h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H20V0z" fill="#FF7262"/><path d="M40 29c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z" fill="#1ABCFE"/></svg> Message overview ↗</a> <a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=2517-9568" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35em;font-size:.875em;color:var(--color-text-accent-link,#006eb9);text-decoration:none;border:1px solid currentColor;border-radius:4px;padding:.2em .55em;line-height:1.4"><svg width="13" height="13" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 57c5.523 0 10-4.477 10-10v-10H10c-5.523 0-10 4.477-10 10s4.477 10 10 10z" fill="#0ACF83"/><path d="M0 29c0-5.523 4.477-10 10-10h10v20H10C4.477 39 0 34.523 0 29z" fill="#A259FF"/><path d="M0 10C0 4.477 4.477 0 10 0h10v20H10C4.477 20 0 15.523 0 10z" fill="#F24E1E"/><path d="M20 0h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H20V0z" fill="#FF7262"/><path d="M40 29c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z" fill="#1ABCFE"/></svg> Message standalone ↗</a> <a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=5651-2996" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35em;font-size:.875em;color:var(--color-text-accent-link,#006eb9);text-decoration:none;border:1px solid currentColor;border-radius:4px;padding:.2em .55em;line-height:1.4"><svg width="13" height="13" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 57c5.523 0 10-4.477 10-10v-10H10c-5.523 0-10 4.477-10 10s4.477 10 10 10z" fill="#0ACF83"/><path d="M0 29c0-5.523 4.477-10 10-10h10v20H10C4.477 39 0 34.523 0 29z" fill="#A259FF"/><path d="M0 10C0 4.477 4.477 0 10 0h10v20H10C4.477 20 0 15.523 0 10z" fill="#F24E1E"/><path d="M20 0h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H20V0z" fill="#FF7262"/><path d="M40 29c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z" fill="#1ABCFE"/></svg> Message on product ↗</a></p>
<div style="background:var(--alert-warning-color-surface);border:1px solid var(--alert-warning-color-border);border-radius:8px;padding:.75rem 1rem;margin:1rem 0">
  <strong>Draft concept only.</strong> The communication components have not been through a proper design decision yet. Both variants below are rough drafts — the API, naming and visuals may change. Roadmap: design alignment → component design.
</div>
<p>Component for contextual communication with users. Figma currently has two variants:</p>
<ul>
  <li><strong>Message standalone</strong> (Figma <code>Message/Message standalone</code>, formerly just <code>Message</code>) — flows in layouts. Implemented as <code>&lt;minis-message&gt;</code> with <code>layout="vertical | horizontal"</code>.</li>
  <li><strong>Message on product</strong> (Figma <code>Message/Message on product</code>) — a full-width tinted banner used in <strong>page headers</strong> for now. <em>No Lit component yet</em> — the <strong>On product</strong> story shows the agreed markup built from tokens.</li>
</ul>
`,
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Card layout direction',
    },
    noVisual: {
      name: 'no-visual',
      control: 'boolean',
      description: 'Hide the visual thumbnail — no space is reserved for it',
    },
    noClose: {
      name: 'no-close',
      control: 'boolean',
      description: 'Hide the close / dismiss button — no space is reserved for it',
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Standalone — Playground',
  args: {
    layout: 'vertical',
    noVisual: false,
    noClose: false,
  },
  render: (args) => html`
    <minis-message
      layout=${args.layout}
      ?no-visual=${args.noVisual}
      ?no-close=${args.noClose}
      style="max-width:320px"
    >
      ${thumbSvg}
      <span slot="title">Pokračovat v posledním hledání a pátrání</span>
      Dotaz z Charlese, který může být dost komplexní a tak nevím kolik tu může stači řádků.
    </minis-message>
  `,
};

// ─── Standalone: Vertical (default) ───────────────────────────────────────────────────────

export const Vertical: Story = {
  name: 'Standalone — Vertical',
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
  name: 'Standalone — Horizontal',
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
  name: 'Standalone — Both layouts',
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
  name: 'Standalone — Without visual',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px">
      <minis-message no-visual style="max-width:320px">
        <span slot="title">System maintenance tonight</span>
        We'll be down for 30 minutes at midnight. Please save your work.
      </minis-message>
      <minis-message layout="horizontal" no-visual style="max-width:724px">
        <span slot="title">System maintenance tonight</span>
        We'll be down for 30 minutes at midnight. Please save your work.
      </minis-message>
    </div>
  `,
};

// ─── Not closable ─────────────────────────────────────────────────────────────

export const NotClosable: Story = {
  name: 'Standalone — Not closable',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px">
      <minis-message no-close style="max-width:320px">
        ${thumbSvg}
        <span slot="title">Pokračovat v posledním hledání</span>
        Dotaz, který může být dost komplexní.
      </minis-message>
      <minis-message layout="horizontal" no-close style="max-width:724px">
        ${thumbSvg}
        <span slot="title">Pokračovat v posledním hledání</span>
        Dotaz, který může být dost komplexní.
      </minis-message>
    </div>
  `,
};

// ─── Dismiss ──────────────────────────────────────────────────────────────────

const showAgain = (e: Event) => {
  (e.currentTarget as HTMLElement)
    .closest('.dismiss-demo')
    ?.querySelectorAll('minis-message')
    .forEach((m) => {
      m.hidden = false;
      m.style.opacity = '';
    });
};

const fadeOut = (e: Event) => {
  e.preventDefault();
  const msg = e.currentTarget as HTMLElement;
  msg.animate({ opacity: [1, 0] }, 200).finished.then(() => { msg.hidden = true; });
};

export const Dismiss: Story = {
  name: 'Standalone — Dismiss',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'The close button hides the message by default (sets `hidden`). The `close` event is cancelable — call `event.preventDefault()` to take over, e.g. to animate it out, persist the dismissal, or wait for the server. The second message fades out that way.',
      },
    },
  },
  render: () => html`
    <div class="dismiss-demo" style="display:flex;flex-direction:column;align-items:flex-start;gap:16px">
      <minis-message style="max-width:320px">
        ${thumbSvg}
        <span slot="title">Closes itself</span>
        Default behaviour — no listener needed.
      </minis-message>
      <minis-message style="max-width:320px" @close=${fadeOut}>
        ${thumbSvg}
        <span slot="title">Custom dismissal</span>
        The page calls preventDefault() and fades it out.
      </minis-message>
      <minis-button variant="secondary" size="sm" @click=${showAgain}>Show again</minis-button>
    </div>
  `,
};

// ─── On product (draft, no component yet) ────────────────────────────────────
// Figma: Message/Message on product (5651:2996). Used in page headers.
// Plain markup + tokens until the communication components get a proper
// design decision — do not promote this to a Lit component without one.

export const OnProduct: Story = {
  name: 'On product (draft)',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Tinted banner for page headers. No `<minis-message>` API yet — copy the markup. Surface `--alert-warning-color-surface`, border `--color-gold-85`, radius `--border-radius-lg`, padding `--linear-sp-linear-4` / `--spacing-layout-xxl`, bold 14px text with an inline `--color-orange-65` link, underlined on hover.',
      },
    },
  },
  render: () => html`
    <style>
      .message-on-product a { color: var(--color-orange-65); text-decoration: none; }
      .message-on-product a:hover { text-decoration: underline; }
    </style>
    <div
      class="message-on-product"
      role="status"
      style="
        box-sizing:border-box;
        max-width:746px;
        background:var(--alert-warning-color-surface);
        border:1px solid var(--color-gold-85);
        border-radius:var(--border-radius-lg);
        padding:var(--linear-sp-linear-4) var(--spacing-layout-xxl);
        font-family:var(--typography-font-family-sans);
        font-size:var(--typography-size-sm);
        font-weight:var(--typography-weight-bold);
        line-height:1.5;
        color:var(--color-text-primary);
      "
    >
      Nový poklad je tu a s ním i pořádná porce kreditů. Jste zvědaví, co na vás čeká?
      <a href="#">Vyzvednout poklad</a>
    </div>
  `,
};
