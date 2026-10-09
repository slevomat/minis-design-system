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
// Props shared by every Layout. `Layout` itself is not a prop: each layout has its
// own figma.connect below, filtered with `variant`, so the attribute is literal.
const sharedProps = {
  theme: figma.enum('Theme', {
    Brand: 'brand',
    Yellow: 'yellow',
    Summer: 'summer',
    Pink: 'pink',
    Green: 'green',
    Blue: 'blue',
  }),
  // `no-badge` is the inverse of the Figma boolean: the badge shows by default.
  // The `Slot [brandCheckmark]` slot properties are deliberately unmapped: they
  // only exist because Figma can't flow the seal to the end of the heading text.
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
};

// prettier-ignore
const imageProp = figma.boolean('Visuals', {
  true: html`<img slot="image" src="photo.png" alt="" />`,
  false: undefined,
});

figma.connect('https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4642-396', {
  variant: { Layout: 'Inspirations' },
  props: {
    ...sharedProps,
    image: imageProp,
    // prettier-ignore
    controls: figma.boolean('Controls', {
      true: html`<input slot="controls" type="search" placeholder="Kam chcete vyrazit?" /><minis-button slot="controls" variant="transparent" size="lg" full-width>Vyhledat</minis-button>`,
      false: undefined,
    }),
  },
  example: ({ theme, noBadge, description, tag, location, message, more, button, image, controls }) => html`
    <minis-page-header layout="inspirations" theme=${theme} ${description} ${tag} ${location} ${noBadge}>
      Nadpis stránky<br />druhý řádek ${message} ${more} ${button} ${image} ${controls}
    </minis-page-header>
  `,
});

// Content left has no controls: the `Controls` / `Controls body` properties
// still exist on the set but are unmapped here, and the component renders no
// controls area for this layout.
figma.connect('https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4642-396', {
  variant: { Layout: 'Content left' },
  props: {
    ...sharedProps,
    image: imageProp,
  },
  example: ({ theme, noBadge, description, tag, location, message, more, button, image }) => html`
    <minis-page-header layout="content-left" theme=${theme} ${description} ${tag} ${location} ${noBadge}>
      Nadpis stránky<br />druhý řádek ${message} ${more} ${button} ${image}
    </minis-page-header>
  `,
});

// Centric has no photo (`Visuals` is unmapped; the image slot isn't rendered).
// Its controls are Figma "_Centered controls" (Content=Categories): a row of
// `Clickable` tags → <minis-tag variant="clickable">.
figma.connect('https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4642-396', {
  variant: { Layout: 'Centric' },
  props: {
    ...sharedProps,
    // prettier-ignore
    controls: figma.boolean('Controls', {
      true: html`<minis-tag slot="controls" variant="clickable">Benefity</minis-tag><minis-tag slot="controls" variant="clickable">Papírové poukázky</minis-tag><minis-tag slot="controls" variant="clickable">FKSP</minis-tag><minis-tag slot="controls" variant="clickable">Dárkové poukazy</minis-tag>`,
      false: undefined,
    }),
  },
  example: ({ theme, noBadge, description, tag, location, message, more, button, controls }) => html`
    <minis-page-header layout="centric" theme=${theme} ${description} ${tag} ${location} ${noBadge}>
      Nadpis stránky<br />druhý řádek ${message} ${more} ${button} ${controls}
    </minis-page-header>
  `,
});
