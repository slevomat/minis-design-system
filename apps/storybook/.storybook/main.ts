import type { StorybookConfig } from '@storybook/web-components-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../packages/components/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: [
    { from: '../../../packages/tokens/dist', to: '/tokens' },
    '../public',
  ],
  async viteFinal(config) {
    return mergeConfig(config, {
      base: process.env.STORYBOOK_BASE_URL ?? '/',
      esbuild: {
        target: 'es2020',
      },
    });
  },
};

export default config;
