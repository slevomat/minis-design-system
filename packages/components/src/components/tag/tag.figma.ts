// IMPORTANT: import from the '/html' subpath — the package root only
// exports the React API and `{ html }` fails `tsc` (TS2614).
import figma, { html } from '@figma/code-connect/html';

// ── tag/toggle ────────────────────────────────────────────────────────────────
// The Figma "tag/toggle" component maps to <minis-tag variant="toggle">.
// Properties: Icon only (boolean), State (Default/Hover/Toggled/Disabled),
// In Color (boolean → red brand accent icon).
figma.connect(
  'https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=3805-1161',
  {
    props: {
      iconOnly: figma.boolean('Icon only'),
      pressed: figma.enum('State', {
        Toggled: true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      inColor: figma.boolean('In Color'),
      icon: figma.instance('Icon'),
    },
    example: ({ iconOnly, pressed, disabled, inColor, icon }) => html`
      <minis-tag
        variant="toggle"
        ?icon-only=${iconOnly}
        ?in-color=${inColor}
        ?pressed=${pressed}
        ?disabled=${disabled}
      >
        ${icon}
        Uložit
      </minis-tag>
    `,
  },
);
