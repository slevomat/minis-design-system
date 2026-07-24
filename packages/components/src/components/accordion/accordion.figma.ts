// IMPORTANT: import from the '/html' subpath — the package root only
// exports the React API and `{ html }` fails `tsc` (TS2614).
import figma, { html } from '@figma/code-connect/html';

// ── accordion-item ────────────────────────────────────────────────────────────
// Figma component set "accordion-item" on the ↳ Accordeon page.
// Properties: Label (TEXT), Body (TEXT), State (Default|Hover|Disabled),
// Open (True|False). Hover has no code equivalent — it is a CSS :hover state,
// so it maps to the default rendering.
figma.connect(
  'https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4984-9556',
  {
    props: {
      label: figma.string('Label'),
      body: figma.string('Body'),
      open: figma.enum('Open', {
        True: true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ label, body, open, disabled }) => html`
      <minis-accordion-item
        heading=${label}
        ?open=${open}
        ?disabled=${disabled}
      >
        ${body}
      </minis-accordion-item>
    `,
  },
);

// ── accordion (list container) ────────────────────────────────────────────────
// Figma component "accordion" — a vertical stack of accordion-item instances.
// `single` has no Figma counterpart (it is runtime behaviour), so the snippet
// shows it as the recommended default for FAQ lists.
figma.connect(
  'https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4984-9557',
  {
    example: () => html`
      <minis-accordion single>
        <minis-accordion-item heading="Jak rychle se mi kredity připíší?">
          Kredity se na váš účet připisují nejpozději do 24 hodin od potvrzení převodu.
        </minis-accordion-item>
        <minis-accordion-item heading="Jak dlouho kredity platí?">
          12 měsíců od data připsání.
        </minis-accordion-item>
      </minis-accordion>
    `,
  },
);
