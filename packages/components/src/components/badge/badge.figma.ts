import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4605-441',
  {
    props: {
      color: figma.enum('color', {
        brand: 'brand',
        yellow: 'yellow',
        summer: 'summer',
        pink: 'pink',
        green: 'green',
        blue: 'blue',
      }),
      size: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        xl: 'xl',
      }),
    },
    example: ({ color, size }) => html`
      <minis-badge color="${color}" size="${size}"></minis-badge>
    `,
  },
);
