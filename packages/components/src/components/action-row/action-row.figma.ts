// IMPORTANT: import from the '/html' subpath — the package root only
// exports the React API and `{ html }` fails `tsc` (TS2614).
import figma, { html } from '@figma/code-connect/html';

// ── ActionRow ─────────────────────────────────────────────────────────────────
// Figma component set "ActionRow" (4202:3867).
// Properties: Variant (Label|w/ Icon|w/ Checkbox), State (Default|Hover|Active|
// Disabled), Breakpoint (desktop|xs), Show Counter (BOOLEAN), Show visuals
// (BOOLEAN).
//
// Hover has no code equivalent — it is a CSS :hover state, so it maps to the
// default rendering. `desktop` is the default breakpoint and `Label` the
// default variant, so both are left out of the snippet. The label is plain text
// inside the Figma component (not a text property), so the snippet hard-codes it.
// Show visuals has no code equivalent and is left unmapped.
figma.connect(
  'https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4202-3867',
  {
    props: {
      variant: figma.enum('Variant', {
        'w/ Icon': 'icon',
        'w/ Checkbox': 'checkbox',
      }),
      breakpoint: figma.enum('Breakpoint', {
        xs: 'xs',
      }),
      active: figma.enum('State', {
        Active: true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      counter: figma.boolean('Show Counter', {
        true: 'counter="3"',
        false: undefined,
      }),
    },
    example: ({ variant, breakpoint, active, disabled, counter }) => html`
      <minis-action-row
        variant=${variant}
        breakpoint=${breakpoint}
        ?active=${active}
        ?disabled=${disabled}
        ${counter}
      >
        <minis-icon slot="icon" name="settings"></minis-icon>
        ActionRow label
      </minis-action-row>
    `,
  },
);
