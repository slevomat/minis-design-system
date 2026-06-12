import figma, { html } from '@figma/code-connect/html';

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
      badge: figma.boolean('Badge'),
      description: figma.boolean('Description'),
      button: figma.boolean('Button'),
      tag: figma.boolean('Tag'),
    },
    example: ({ theme, badge, description, button, tag }) => html`
      <minis-page-header
        theme="${theme}"
        ${description ? 'description="Your description text here."' : ''}
        ${tag ? 'tag="Do 1. června zbývá 6 dní"' : ''}
        ${badge ? '' : 'no-badge'}
      >
        Nadpis stránky<br>druhý řádek
        ${button ? html`<minis-button slot="button" variant="transparent" size="xl">Text výzvy k akci</minis-button>` : ''}
        <img slot="image" src="photo.png" alt="">
      </minis-page-header>
    `,
  },
);
