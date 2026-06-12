import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4605-441',
  {
    props: {
      color: figma.enum('Color', {
        Pink: 'pink',
        Yellow: 'yellow',
        Blue: 'blue',
      }),
    },
    example: ({ color }) => html`
      <minis-badge color="${color}"></minis-badge>
    `,
  },
);
