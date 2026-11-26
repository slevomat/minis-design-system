// IMPORTANT: import from the '/html' subpath — the package root only
// exports the React API and `{ html }` fails `tsc` (TS2614).
import figma, { html } from '@figma/code-connect/html';

// Figma: `container` component set (Breakpoints & Containers page). Its
// `Content` slot is not mapped: slot content can't be expressed in a snippet.
figma.connect(
  'https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=6444-148',
  {
    props: {
      variant: figma.enum('Variant', {
        default: 'default',
        medium: 'medium',
        narrow: 'narrow',
      }),
    },
    example: ({ variant }) => html`<minis-container variant=${variant}>…</minis-container>`,
  },
);
