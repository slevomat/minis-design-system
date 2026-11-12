import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wheel-of-fortune.js';
import '../button/button.js';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Components/Brand/Wheel of Fortune',
  component: 'minis-wheel-of-fortune',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4112-2462" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35em;font-size:.875em;color:var(--color-text-accent-link,#006eb9);text-decoration:none;border:1px solid currentColor;border-radius:4px;padding:.2em .55em;line-height:1.4"><svg width="13" height="13" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 57c5.523 0 10-4.477 10-10v-10H10c-5.523 0-10 4.477-10 10s4.477 10 10 10z" fill="#0ACF83"/><path d="M0 29c0-5.523 4.477-10 10-10h10v20H10C4.477 39 0 34.523 0 29z" fill="#A259FF"/><path d="M0 10C0 4.477 4.477 0 10 0h10v20H10C4.477 20 0 15.523 0 10z" fill="#F24E1E"/><path d="M20 0h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H20V0z" fill="#FF7262"/><path d="M40 29c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z" fill="#1ABCFE"/></svg> Open in Figma ↗</a></p>
<p><strong>Placeholder.</strong> The animated wheel is being built in Rive by a separate team. Until it lands, this component draws a simplified wheel and spins it with CSS. The attributes, the <code>spin()</code> method and the events are the contract: the Rive version replaces only the internals, so code written against this placeholder keeps working.</p>
<ul>
  <li><code>variant</code>: <code>default</code> · <code>broken</code> · <code>black-friday</code> (Figma "black friday").</li>
  <li><code>language</code>: <code>cz</code> · <code>sk</code>, which switches the segment labels and the spin button (ZATOČIT / ZATOČIŤ).</li>
  <li>The spin button calls <code>spin()</code>. Call <code>spin(index)</code> yourself to land on a segment the server picked (0 = top, clockwise).</li>
  <li>Events: <code>minis-spin-start</code> (cancelable) and <code>minis-spin-end</code> with <code>{ index, label }</code>.</li>
  <li>Resize with <code>--wheel-of-fortune-size</code> (default 320px).</li>
</ul>
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'broken', 'black-friday'],
      description: 'Campaign look (Figma `Variant`)',
    },
    language: {
      control: 'inline-radio',
      options: ['cz', 'sk'],
      description: 'Market copy (Figma `Language`)',
    },
  },
  args: {
    variant: 'default',
    language: 'cz',
  },
  render: (args) => html`
    <minis-wheel-of-fortune variant=${args.variant} language=${args.language}></minis-wheel-of-fortune>
  `,
};

export default meta;
type Story = StoryObj;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(3,auto);gap:var(--linear-sp-linear-8);justify-content:start">
      ${(['default', 'broken', 'black-friday'] as const).flatMap((variant) =>
        (['cz', 'sk'] as const).map(
          (language) => html`
            <figure style="margin:0;display:grid;gap:var(--linear-sp-linear-2);justify-items:center">
              <minis-wheel-of-fortune
                variant=${variant}
                language=${language}
                style="--wheel-of-fortune-size:240px"
              ></minis-wheel-of-fortune>
              <figcaption style="font:var(--typography-size-sm) var(--typography-font-family-mono);color:var(--color-text-secondary)">
                ${variant} · ${language}
              </figcaption>
            </figure>
          `,
        ),
      )}
    </div>
  `,
};

// ─── Server-picked result ─────────────────────────────────────────────────────

export const ServerPickedResult: Story = {
  name: 'Server-picked result',
  parameters: { controls: { disable: true } },
  render: () => {
    const run = async (e: Event) => {
      const root = (e.target as HTMLElement).closest('div')!;
      const wheel = root.querySelector('minis-wheel-of-fortune')!;
      const out = root.querySelector('output')!;
      out.textContent = '…';
      const { index, label } = await wheel.spin(1);
      out.textContent = `Landed on segment ${index}: ${label}`;
    };
    return html`
      <div style="display:grid;gap:var(--linear-sp-linear-4);justify-items:start">
        <minis-wheel-of-fortune></minis-wheel-of-fortune>
        <minis-button variant="secondary" @click=${run}>spin(1) — land on VÝHRA</minis-button>
        <output style="font-family:var(--typography-font-family-mono)"></output>
      </div>
    `;
  },
};
