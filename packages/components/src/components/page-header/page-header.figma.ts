// IMPORTANT: import from the '/html' subpath — the package root only
// exports the React API and `{ html }` fails `tsc` (TS2614).
import figma, { html } from '@figma/code-connect/html';

// NOTE: no ternaries (or any other expression) inside the `html` template —
// the HTML parser only accepts prop placeholders there, and a conditional
// fails the whole `figma connect parse|publish` run with
// "Expected a call expression as a placeholder in the template".
// Conditional markup belongs in the boolean's value mapping instead, the same
// way `button.figma.ts` handles its counter.
figma.connect(
  'https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4642-396',
  {
    props: {
      theme: figma.enum('Theme', {
        Brand: 'brand',
        Blue: 'blue',
        Yellow: 'yellow',
        Pink: 'pink',
        Green: 'green',
      }),
      // `no-badge` is the inverse of the Figma boolean: the badge shows by default.
      noBadge: figma.boolean('Badge', {
        true: undefined,
        false: 'no-badge',
      }),
      description: figma.boolean('Description', {
        true: 'description="Your description text here."',
        false: undefined,
      }),
      tag: figma.boolean('Tag', {
        true: 'tag="Do 1. června zbývá 6 dní"',
        false: undefined,
      }),
      // Keep this on one line — the mapped value is emitted into the Dev Mode
      // snippet verbatim, newlines and indentation included.
      // prettier-ignore
      button: figma.boolean('Button', {
        true: html`<minis-button slot="button" variant="transparent" size="xl">Text výzvy k akci</minis-button>`,
        false: undefined,
      }),
    },
    example: ({ theme, noBadge, description, tag, button }) => html`
      <minis-page-header theme=${theme} ${description} ${tag} ${noBadge}>
        Nadpis stránky<br />druhý řádek ${button}
        <img slot="image" src="photo.png" alt="" />
      </minis-page-header>
    `,
  },
);
