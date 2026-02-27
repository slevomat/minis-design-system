import type { Preview } from '@storybook/web-components';

const preview: Preview = {
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-mode', 'dark');
      } else {
        document.documentElement.removeAttribute('data-mode');
      }
      return story();
    },
  ],
  parameters: {
    options: {
      storySort: {
        order: ['Introduction', 'Design Tokens', 'Contributing', 'Components'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: { disable: true },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', left: '☀️' },
          { value: 'dark', title: 'Dark', left: '🌙' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
