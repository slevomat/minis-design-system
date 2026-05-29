import figma, { html } from '@figma/code-connect';

figma.connect(
  'https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=284-5283',
  {
    props: {
      variant: figma.enum('Type', {
        Primary: 'primary',
        Secondary: 'secondary',
        Tertialy: 'tertiary',
        Danger: 'danger',
        'CTA - buy': 'cta-buy',
        Transparent: 'transparent',
      }),
      size: figma.enum('Size', {
        small: 'sm',
        medium: 'md',
        large: 'lg',
        xl: 'xl',
      }),
      // Maps Figma's layout variant to the icon-only boolean attribute (or undefined = omitted)
      iconOnly: figma.enum('Variant', {
        'Icon + Label': undefined,
        Icon: 'icon-only',
        Label: undefined,
      }),
      disabled: figma.boolean('Disabled', {
        true: 'disabled',
        false: undefined,
      }),
      counter: figma.enum('Show counter', {
        True: 'counter="5"',
        False: undefined,
      }),
    },
    example: ({ variant, size, iconOnly, disabled, counter }) => html`
      <minis-button
        variant="${variant}"
        size="${size}"
        ${disabled}
        ${iconOnly}
        ${counter}
      >
        <minis-icon slot="icon" name="star"></minis-icon>
        Button label
      </minis-button>
    `,
  },
);
