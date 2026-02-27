import type { Preview } from '@storybook/web-components';
import { html } from 'lit';

/**
 * Token overrides per Layout collection tier.
 * Injects CSS custom properties directly on :root so the toolbar switcher
 * works regardless of actual window/iframe width (media queries alone won't
 * respond to a max-width constraint on a wrapper element).
 *
 * Values sourced from tokens.json Layout collection modes.
 */
const TIER_TOKENS: Record<string, string> = {
  '2xs_xs': `
    --spacing-layout-xs: var(--linear-sp-linear-1);
    --spacing-layout-sm: var(--linear-sp-linear-3);
    --spacing-layout-md: var(--linear-sp-linear-4);
    --spacing-layout-lg: var(--linear-sp-linear-5);
    --spacing-layout-xl: var(--linear-sp-linear-8);
    --container-padding: var(--linear-sp-linear-2);
    --container-narrow-padding: var(--linear-sp-linear-2);
    --typography-mega-poster-size: var(--typography-size-2xl);
    --typography-poster-size: var(--typography-size-2xl);
    --typography-heading-large-size: var(--typography-size-xl);
    --typography-heading-medium-size: var(--typography-size-lg);
    --typography-heading-small-size: var(--typography-size-md);
  `,
  sm: `
    --spacing-layout-xs: var(--linear-sp-linear-2);
    --spacing-layout-sm: var(--linear-sp-linear-4);
    --spacing-layout-md: var(--linear-sp-linear-6);
    --spacing-layout-lg: var(--linear-sp-linear-8);
    --spacing-layout-xl: var(--linear-sp-linear-12);
    --container-padding: var(--linear-sp-linear-4);
    --container-narrow-padding: var(--linear-sp-linear-4);
    --typography-mega-poster-size: var(--typography-size-2xl);
    --typography-poster-size: var(--typography-size-2xl);
    --typography-heading-large-size: var(--typography-size-xl);
    --typography-heading-medium-size: var(--typography-size-lg);
    --typography-heading-small-size: var(--typography-size-md);
  `,
  md_lg: `
    --spacing-layout-xs: var(--linear-sp-linear-2);
    --spacing-layout-sm: var(--linear-sp-linear-4);
    --spacing-layout-md: var(--linear-sp-linear-6);
    --spacing-layout-lg: var(--linear-sp-linear-8);
    --spacing-layout-xl: var(--linear-sp-linear-12);
    --container-padding: var(--linear-sp-linear-4);
    --container-narrow-padding: var(--linear-sp-linear-4);
    --typography-mega-poster-size: var(--typography-size-3xl);
    --typography-poster-size: var(--typography-size-3xl);
    --typography-heading-large-size: var(--typography-size-2xl);
    --typography-heading-medium-size: var(--typography-size-xl);
    --typography-heading-small-size: var(--typography-size-lg);
  `,
  xl: `
    --spacing-layout-xs: var(--linear-sp-linear-2);
    --spacing-layout-sm: var(--linear-sp-linear-4);
    --spacing-layout-md: var(--linear-sp-linear-6);
    --spacing-layout-lg: var(--linear-sp-linear-8);
    --spacing-layout-xl: var(--linear-sp-linear-12);
    --container-padding: var(--linear-sp-linear-8);
    --container-narrow-padding: var(--linear-sp-linear-8);
    --typography-mega-poster-size: var(--typography-size-4xl);
    --typography-poster-size: var(--typography-size-3xl);
    --typography-heading-large-size: var(--typography-size-2xl);
    --typography-heading-medium-size: var(--typography-size-xl);
    --typography-heading-small-size: var(--typography-size-lg);
  `,
};

function applyViewportTokens(tier: string) {
  const id = 'minis-viewport-tokens';
  let el = document.getElementById(id) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = `:root { ${TIER_TOKENS[tier] ?? TIER_TOKENS['xl']} }`;
}

const preview: Preview = {
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-mode', 'dark');
      } else {
        document.documentElement.removeAttribute('data-mode');
      }

      const viewport = context.globals.viewport || 'xl';
      applyViewportTokens(viewport);

      return html`
        <div style="
          background: var(--color-background);
          color: var(--color-text-primary);
          padding: 24px;
          min-height: 100%;
          box-sizing: border-box;
        ">
          ${story()}
        </div>
      `;
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
    viewport: {
      name: 'Viewport',
      description: 'Simulate Layout collection tiers (mirrors Figma modes)',
      defaultValue: 'xl',
      toolbar: {
        icon: 'mobile',
        items: [
          { value: '2xs_xs', title: '2xs / xs', right: '≤407px' },
          { value: 'sm',     title: 'sm',       right: '408–767px' },
          { value: 'md_lg',  title: 'md / lg',  right: '768–1255px' },
          { value: 'xl',     title: 'xl – 4xl', right: '≥1256px' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
