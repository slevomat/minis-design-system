// IMPORTANT: import from the '/html' subpath — the package root only
// exports the React API and `{ html }` fails `tsc` (TS2614).
import figma, { html } from '@figma/code-connect/html';

// NOTE: no ternaries (or any other expression) inside the `html` template —
// the HTML parser only accepts prop placeholders there, and a conditional
// fails the whole `figma connect parse|publish` run with
// "Expected a call expression as a placeholder in the template".
// Conditional markup belongs in the boolean's value mapping instead, the same
// way `button.figma.ts` handles its counter.
//
// Keep every mapped html`` value on one line — it is emitted into the Dev Mode
// snippet verbatim, newlines and indentation included.
//
// `Breakpoint` is not mapped: the component switches layout itself with a
// container query on its own width.
figma.connect(
  'https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4642-396',
  {
    props: {
      layout: figma.enum('Layout', {
        Inspirations: 'inspirations',
      }),
      theme: figma.enum('Theme', {
        Brand: 'brand',
        Yellow: 'yellow',
        Summer: 'summer',
        Pink: 'pink',
        Green: 'green',
        Blue: 'blue',
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
      location: figma.boolean('Location', {
        true: 'location="v Rosovicích a okolí"',
        false: undefined,
      }),
      // prettier-ignore
      message: figma.boolean('Message', {
        true: html`<div slot="message" role="status">Message on product — see the Message docs</div>`,
        false: undefined,
      }),
      // prettier-ignore
      more: figma.boolean('Collapsible', {
        true: html`<p slot="more">Extra content revealed by “Více informací”.</p>`,
        false: undefined,
      }),
      // prettier-ignore
      button: figma.boolean('Button', {
        true: html`<minis-button slot="button" variant="transparent" size="xl">Text výzvy k akci</minis-button>`,
        false: undefined,
      }),
      // prettier-ignore
      image: figma.boolean('Visuals', {
        true: html`<img slot="image" src="photo.png" alt="" />`,
        false: undefined,
      }),
      // prettier-ignore
      controls: figma.boolean('Controls', {
        true: html`<input slot="controls" type="search" placeholder="Kam chcete vyrazit?" /><minis-button slot="controls" variant="transparent" size="lg" full-width>Vyhledat</minis-button>`,
        false: undefined,
      }),
    },
    example: ({ layout, theme, noBadge, description, tag, location, message, more, button, image, controls }) => html`
      <minis-page-header layout=${layout} theme=${theme} ${description} ${tag} ${location} ${noBadge}>
        Nadpis stránky<br />druhý řádek ${message} ${more} ${button} ${image} ${controls}
      </minis-page-header>
    `,
  },
);
