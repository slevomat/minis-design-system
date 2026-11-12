import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=6135-1939',
  {
    props: {
      variant: figma.enum('Variant', {
        default: 'default',
        broken: 'broken',
        'black friday': 'black-friday',
      }),
      language: figma.enum('Language', {
        CZ: 'cz',
        SK: 'sk',
      }),
    },
    example: ({ variant, language }) => html`
      <minis-wheel-of-fortune variant="${variant}" language="${language}"></minis-wheel-of-fortune>
    `,
  },
);
