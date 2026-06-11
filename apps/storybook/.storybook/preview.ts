import type { Preview } from '@storybook/web-components';
import { html } from 'lit';

/**
 * Token overrides per Layout collection tier (mirrors Figma "Layout" variable modes).
 *
 * Injected as a <style> block on :root so they take effect regardless of the
 * actual iframe width. The viewport addon resizes the iframe from the Manager
 * frame without updating any Storybook global — tier tokens therefore cannot be
 * derived from globals.viewport. Instead a window resize listener reads
 * window.innerWidth directly and picks the matching tier (see below).
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
    --typography-heading-2xl-size: var(--typography-size-2xl);
    --typography-heading-xl-size: var(--typography-size-2xl);
    --typography-heading-lg-size: var(--typography-size-xl);
    --typography-heading-md-size: var(--typography-size-lg);
    --typography-heading-sm-size: var(--typography-size-md);
    --typography-heading-lg-line-height: var(--typography-line-height-130);
    --typography-heading-md-line-height: var(--typography-line-height-133);
    --typography-heading-sm-line-height: var(--typography-line-height-138);
    --typography-body-md-line-height: var(--typography-line-height-138);
    --typography-body-sm-line-height: var(--typography-line-height-143);
  `,
  sm: `
    --spacing-layout-xs: var(--linear-sp-linear-2);
    --spacing-layout-sm: var(--linear-sp-linear-4);
    --spacing-layout-md: var(--linear-sp-linear-6);
    --spacing-layout-lg: var(--linear-sp-linear-8);
    --spacing-layout-xl: var(--linear-sp-linear-12);
    --container-padding: var(--linear-sp-linear-4);
    --container-narrow-padding: var(--linear-sp-linear-4);
    --typography-heading-2xl-size: var(--typography-size-2xl);
    --typography-heading-xl-size: var(--typography-size-2xl);
    --typography-heading-lg-size: var(--typography-size-xl);
    --typography-heading-md-size: var(--typography-size-lg);
    --typography-heading-sm-size: var(--typography-size-md);
    --typography-heading-lg-line-height: var(--typography-line-height-130);
    --typography-heading-md-line-height: var(--typography-line-height-133);
    --typography-heading-sm-line-height: var(--typography-line-height-138);
    --typography-body-md-line-height: var(--typography-line-height-138);
    --typography-body-sm-line-height: var(--typography-line-height-143);
  `,
  md_lg: `
    --spacing-layout-xs: var(--linear-sp-linear-2);
    --spacing-layout-sm: var(--linear-sp-linear-4);
    --spacing-layout-md: var(--linear-sp-linear-6);
    --spacing-layout-lg: var(--linear-sp-linear-8);
    --spacing-layout-xl: var(--linear-sp-linear-12);
    --container-padding: var(--linear-sp-linear-4);
    --container-narrow-padding: var(--linear-sp-linear-4);
    --typography-heading-2xl-size: var(--typography-size-3xl);
    --typography-heading-xl-size: var(--typography-size-3xl);
    --typography-heading-lg-size: var(--typography-size-2xl);
    --typography-heading-md-size: var(--typography-size-xl);
    --typography-heading-sm-size: var(--typography-size-lg);
    --typography-heading-lg-line-height: var(--typography-line-height-125);
    --typography-heading-md-line-height: var(--typography-line-height-130);
    --typography-heading-sm-line-height: var(--typography-line-height-133);
    --typography-body-md-line-height: var(--typography-line-height-150);
    --typography-body-sm-line-height: var(--typography-line-height-157);
  `,
  xl: `
    --spacing-layout-xs: var(--linear-sp-linear-2);
    --spacing-layout-sm: var(--linear-sp-linear-4);
    --spacing-layout-md: var(--linear-sp-linear-6);
    --spacing-layout-lg: var(--linear-sp-linear-8);
    --spacing-layout-xl: var(--linear-sp-linear-12);
    --container-padding: var(--linear-sp-linear-8);
    --container-narrow-padding: var(--linear-sp-linear-8);
    --typography-heading-2xl-size: var(--typography-size-4xl);
    --typography-heading-xl-size: var(--typography-size-3xl);
    --typography-heading-lg-size: var(--typography-size-2xl);
    --typography-heading-md-size: var(--typography-size-xl);
    --typography-heading-sm-size: var(--typography-size-lg);
    --typography-heading-lg-line-height: var(--typography-line-height-125);
    --typography-heading-md-line-height: var(--typography-line-height-130);
    --typography-heading-sm-line-height: var(--typography-line-height-133);
    --typography-body-md-line-height: var(--typography-line-height-150);
    --typography-body-sm-line-height: var(--typography-line-height-157);
    --typography-brand-xl-size: var(--typography-size-5xl);
    --typography-brand-xl-line-height: var(--typography-line-height-100);
  `,
};

function tierFromWidth(px: number): string {
  if (px <= 407) return '2xs_xs';
  if (px <= 767) return 'sm';
  if (px <= 1255) return 'md_lg';
  return 'xl';
}

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

function emitTierGlobal(tier: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((window as any).__STORYBOOK_ADDONS_CHANNEL__ as any)?.emit('updateGlobals', { globals: { tier } });
}

// Track the Tier dropdown value so the resize listener can reference it.
let _manualTier = 'xl';
// Prevents the decorator from treating a resize-triggered globals update as a user selection.
let _resizeEmitting = false;

// When the viewport addon resizes the iframe, re-derive tier from the new width.
// Device presets take precedence (narrow wins); manual Tier dropdown wins when wide.
window.addEventListener('resize', () => {
  const autoTier = tierFromWidth(window.innerWidth);
  const tier = autoTier !== 'xl' ? autoTier : _manualTier;
  applyViewportTokens(tier);
  _resizeEmitting = true;
  emitTierGlobal(tier);
});

const preview: Preview = {
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-mode', 'dark');
      } else {
        document.documentElement.removeAttribute('data-mode');
      }

      const globalTier: string = context.globals.tier || 'xl';
      if (_resizeEmitting) {
        _resizeEmitting = false; // globals update came from resize, not from Tier dropdown
      } else {
        _manualTier = globalTier; // user clicked the Tier dropdown — store their choice
      }
      const autoTier = tierFromWidth(window.innerWidth);
      const tier = autoTier !== 'xl' ? autoTier : _manualTier;
      applyViewportTokens(tier);

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
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
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
    tier: {
      name: 'Tier',
      description: 'Simulate Layout collection tiers (mirrors Figma modes)',
      defaultValue: 'xl',
      toolbar: {
        icon: 'grid',
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
