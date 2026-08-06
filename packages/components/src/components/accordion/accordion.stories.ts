import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './accordion.js';
import '../button/button.js';
import '@minis/icons';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Components/Accordion',
  component: 'minis-accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4984-9556" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35em;font-size:.875em;color:var(--color-text-accent-link,#006eb9);text-decoration:none;border:1px solid currentColor;border-radius:4px;padding:.2em .55em;line-height:1.4"><svg width="13" height="13" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 57c5.523 0 10-4.477 10-10v-10H10c-5.523 0-10 4.477-10 10s4.477 10 10 10z" fill="#0ACF83"/><path d="M0 29c0-5.523 4.477-10 10-10h10v20H10C4.477 39 0 34.523 0 29z" fill="#A259FF"/><path d="M0 10C0 4.477 4.477 0 10 0h10v20H10C4.477 20 0 15.523 0 10z" fill="#F24E1E"/><path d="M20 0h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H20V0z" fill="#FF7262"/><path d="M40 29c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z" fill="#1ABCFE"/></svg> Open in Figma ↗</a></p>
<p>A vertical list of expand/collapse rows — the FAQ pattern. Each row shows a bold heading on the left and a blue chevron on the right, with a 1px divider between items.</p>
<ul>
  <li>Compose <code>&lt;minis-accordion&gt;</code> with one or more <code>&lt;minis-accordion-item&gt;</code> children.</li>
  <li>Add <code>single</code> for exclusive mode — opening one item closes the others.</li>
  <li><code>size="compact"</code> drops the row's horizontal inset to 0, so headings and panels run edge to edge. Use it when the accordion already sits inside a padded container and the two insets would otherwise stack. Row height is unchanged — it trims the inset, not the density.</li>
  <li>The heading scales with the viewport: <strong>16px</strong> below 768px, <strong>18px</strong> from 768px up (<code>--typography-heading-sm-size</code>). Long headings wrap onto several lines.</li>
  <li>The trigger is a real <code>&lt;button aria-expanded&gt;</code>; the panel is a labelled <code>role="region"</code>.</li>
</ul>
        `,
      },
    },
  },
  argTypes: {
    single: {
      control: 'boolean',
      description: 'Exclusive mode — opening an item closes every other one',
    },
    bordered: {
      control: 'boolean',
      description: 'Draws a rule above the first and below the last item as well',
    },
    headingLevel: {
      name: 'heading-level',
      control: { type: 'number', min: 0, max: 6 },
      description: 'ARIA heading level applied to each item trigger. `0` omits the role.',
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['default', 'compact'],
      description:
        'Row density, applied to every item. `compact` drops the horizontal inset to 0 so rows run edge to edge.',
    },
  },
  args: {
    single: false,
    bordered: false,
    headingLevel: 3,
    size: 'default',
  },
};

export default meta;
type Story = StoryObj;

// ─── Data ─────────────────────────────────────────────────────────────────────

const faq: Array<{ q: string; a: string }> = [
  {
    q: 'Jak rychle se mi kredity připíší?',
    a: 'Kredity se na váš účet připisují nejpozději do 24 hodin od potvrzení převodu. Ve většině případů je uvidíte v přehledu okamžitě.',
  },
  {
    q: 'Jak dlouho kredity platí?',
    a: 'Kredity platí 12 měsíců od data připsání. Platnost každé částky vidíte v detailu svého kreditového účtu.',
  },
  {
    q: 'Jak kredity uplatním?',
    a: 'Kredity se automaticky nabídnou v košíku. Stačí zaškrtnout, že je chcete použít, a částka se odečte z celkové ceny.',
  },
  {
    q: 'Mám méně kreditů, než je cena voucheru, vadí to?',
    a: 'Nevadí. Kredity pokryjí část ceny a zbytek doplatíte běžnou platební metodou.',
  },
  {
    q: 'Musím kredity vyčerpat na jeden nákup',
    a: 'Nemusíte. Kredity lze čerpat postupně napříč libovolným počtem nákupů, dokud nevyprší jejich platnost.',
  },
  {
    q: 'Kredity mi nejdou použít, proč?',
    a: 'Nejčastějším důvodem je, že se kredity nevztahují na danou kategorii nebo že už vypršela jejich platnost.',
  },
  {
    q: 'Mohu změnit kategorii?',
    a: 'Kategorii kreditů lze změnit jednou za zúčtovací období v nastavení vašeho účtu.',
  },
  {
    q: 'Lze převod zrušit a vrátit kredity zpět na benefity?',
    a: 'Převod je nevratný. Jakmile jsou kredity připsané, není možné je vrátit zpět do benefitního systému.',
  },
  {
    q: 'Je možné kredity prodloužit?',
    a: 'Platnost kreditů prodloužit nelze. Doporučujeme je vyčerpat před koncem platnosti.',
  },
];

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => html`
    <minis-accordion
      ?single=${args.single}
      ?bordered=${args.bordered}
      heading-level=${args.headingLevel}
      size=${args.size}
    >
      ${faq.map(
        (item) => html`
          <minis-accordion-item heading=${item.q}>${item.a}</minis-accordion-item>
        `
      )}
    </minis-accordion>
  `,
};

/** Exclusive mode — only one panel can be open at a time. */
export const SingleOpen: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <minis-accordion single>
      ${faq.slice(0, 5).map(
        (item, i) => html`
          <minis-accordion-item heading=${item.q} ?open=${i === 0}>
            ${item.a}
          </minis-accordion-item>
        `
      )}
    </minis-accordion>
  `,
};

/** Default (multi) mode — any number of panels may be open simultaneously. */
export const MultipleOpen: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <minis-accordion>
      ${faq.slice(0, 4).map(
        (item, i) => html`
          <minis-accordion-item heading=${item.q} ?open=${i === 0 || i === 2}>
            ${item.a}
          </minis-accordion-item>
        `
      )}
    </minis-accordion>
  `,
};

/**
 * `size="compact"` removes the row's horizontal inset (`--accordion-padding-x` → 0)
 * so headings, chevrons and panels align with the container's own edge. The
 * vertical rhythm and the dividers are untouched.
 *
 * Both accordions below sit in the same 24px-padded card. The `default` one
 * insets a further 16px, so its text no longer lines up with the card's title;
 * the `compact` one does.
 */
export const CompactSize: Story = {
  name: 'Size — compact (no horizontal inset)',
  parameters: { controls: { disable: true } },
  render: () => {
    const card = `
      background: var(--color-surface-primary, #fff);
      border: 1px solid var(--color-border-subtle, #e3e4e6);
      border-radius: var(--border-radius-md, 8px);
      padding: 24px;
      max-width: 520px;
    `;
    const title = `
      margin: 0 0 8px;
      font: inherit;
      font-size: var(--typography-size-sm, 14px);
      font-weight: var(--typography-weight-semibold, 600);
      color: var(--color-text-secondary, #6b6b70);
    `;
    return html`
      <div style="display:flex;flex-direction:column;gap:24px">
        <div style=${card}>
          <p style=${title}>size="default" — insets a further 16px</p>
          <minis-accordion>
            ${faq.slice(0, 3).map(
              (item, i) => html`
                <minis-accordion-item heading=${item.q} ?open=${i === 0}>
                  ${item.a}
                </minis-accordion-item>
              `
            )}
          </minis-accordion>
        </div>

        <div style=${card}>
          <p style=${title}>size="compact" — flush with the card padding</p>
          <minis-accordion size="compact">
            ${faq.slice(0, 3).map(
              (item, i) => html`
                <minis-accordion-item heading=${item.q} ?open=${i === 0}>
                  ${item.a}
                </minis-accordion-item>
              `
            )}
          </minis-accordion>
        </div>
      </div>
    `;
  },
};

/** All states side by side: closed, open, disabled. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <minis-accordion bordered>
      <minis-accordion-item heading="Closed (default)">
        Panel content, hidden until the item is opened.
      </minis-accordion-item>
      <minis-accordion-item heading="Open" open>
        Panel content, revealed. The chevron is rotated 180°.
      </minis-accordion-item>
      <minis-accordion-item heading="Disabled" disabled>
        This panel cannot be opened.
      </minis-accordion-item>
    </minis-accordion>
  `,
};

/**
 * Rich panel content — the default slot takes arbitrary markup, not just text.
 */
export const RichContent: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <minis-accordion single>
      <minis-accordion-item heading="Jak kredity uplatním?" open>
        <p style="margin:0 0 12px">Kredity se automaticky nabídnou v košíku:</p>
        <ol style="margin:0 0 16px;padding-left:20px">
          <li>Vložte voucher do košíku.</li>
          <li>Zaškrtněte <strong>Použít kredity</strong>.</li>
          <li>Doplatek uhraďte běžnou platební metodou.</li>
        </ol>
        <minis-button variant="tertiary" size="sm">Přejít do košíku</minis-button>
      </minis-accordion-item>
      <minis-accordion-item heading="Jak dlouho kredity platí?">
        12 měsíců od data připsání.
      </minis-accordion-item>
    </minis-accordion>
  `,
};

/**
 * Custom heading markup via the `heading` slot — use it when the heading needs
 * an icon, a counter or any other inline content.
 */
export const CustomHeading: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <minis-accordion>
      <minis-accordion-item>
        <span
          slot="heading"
          style="display:inline-flex;align-items:center;gap:8px"
        >
          <minis-icon name="circle-question" size="20"></minis-icon>
          Potřebujete poradit?
        </span>
        Napište nám na podpora@slevomat.cz, odpovídáme do 24 hodin.
      </minis-accordion-item>
      <minis-accordion-item heading="Kde najdu své vouchery?">
        V sekci Moje nákupy.
      </minis-accordion-item>
    </minis-accordion>
  `,
};
