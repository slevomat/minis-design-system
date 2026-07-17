import type { Preview } from '@storybook/web-components';
import { html } from 'lit';
import { TIER_TOKENS } from './tier-tokens';

/**
 * Token overrides per Layout collection tier (mirrors Figma "Layout" variable
 * modes). Generated from tokens.json at build time — see ./tier-tokens.ts.
 *
 * Injected as a <style> block on :root so they take effect regardless of the
 * actual iframe width. The viewport addon resizes the iframe from the Manager
 * frame without updating any Storybook global — tier tokens therefore cannot be
 * derived from globals.viewport. Instead a window resize listener reads
 * window.innerWidth directly and picks the matching tier (see below).
 */

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

      // Fullscreen stories (e.g. page-header) must span the full iframe width —
      // any wrapper padding shrinks the component below the viewport width and
      // breaks container-query breakpoints (mobile layout showing at a 768px
      // viewport because the container is only 720px wide).
      const isFullscreen = context.parameters?.layout === 'fullscreen';

      return html`
        <div style="
          background: var(--color-background);
          color: var(--color-text-primary);
          padding: ${isFullscreen ? '0' : '24px'};
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
