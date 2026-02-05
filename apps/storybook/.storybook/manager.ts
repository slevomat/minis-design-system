import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',

  // Branding
  brandTitle: 'Mini*S Design System',
  brandUrl: 'https://www.slevomat.cz',
  // brandImage: '/minis-logo.svg', // Můžete přidat logo, pokud máte

  // Barvy UI
  colorPrimary: '#E5007A', // Slevomat růžová
  colorSecondary: '#E5007A',

  // Toolbar
  barTextColor: '#666666',
  barSelectedColor: '#E5007A',
  barHoverColor: '#E5007A',
  barBg: '#FFFFFF',

  // Formuláře
  inputBg: '#FFFFFF',
  inputBorder: '#E0E0E0',
  inputTextColor: '#333333',

  // Text
  textColor: '#333333',
  textInverseColor: '#FFFFFF',

  // Pozadí
  appBg: '#F8F8F8',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E0E0E0',
  appBorderRadius: 4,
});

addons.setConfig({
  theme,
});
