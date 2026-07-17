/**
 * Tier-token generator for the Storybook "Tier" toolbar.
 *
 * Derives the per-tier token overrides directly from the Figma export
 * `tokens.json` (Layout collection modes) at build time, so the Storybook
 * simulation can never drift from the source of truth. Previously this was
 * a hand-copied table in preview.ts that had to be updated on every token
 * change (and had already drifted).
 *
 * Kept in sync automatically: when tokens are re-exported from Figma,
 * Storybook picks the new values up on the next dev-server start / build.
 */
import tokensJson from '../../../tokens.json';

/**
 * The Figma export uses a few token names that differ from the names
 * tokens.css (and the components) actually use. Only the *names* are
 * aliased here — the values always come from tokens.json.
 */
const CSS_NAME_ALIASES: Record<string, string> = {
  '--typography-heading-large-size': '--typography-heading-lg-size',
  '--typography-heading-large-line-height': '--typography-heading-lg-line-height',
  '--typography-heading-medium-size': '--typography-heading-md-size',
  '--typography-heading-medium-line-height': '--typography-heading-md-line-height',
  '--typography-heading-small-size': '--typography-heading-sm-size',
  '--typography-heading-small-line-height': '--typography-heading-sm-line-height',
  '--typography-mega-poster-size': '--typography-heading-2xl-size',
  '--typography-poster-size': '--typography-heading-xl-size',
};

/**
 * Storybook Tier toolbar value → representative Figma Layout mode.
 * The toolbar groups the 10 Figma modes into 4 tiers; the representative
 * mode is the one whose values match the tokens.css media-query tier.
 * ("xl – 4xl" uses the `2xl` mode because that is where the 1240px
 * container cap and large typography live.)
 */
const TIER_MODE: Record<string, string> = {
  '2xs_xs': 'xs',
  sm: 'sm',
  md_lg: 'lg',
  xl: '2xl',
};

/**
 * Brand (Kensington) heading composites are NOT part of the Figma Layout
 * collection — they exist only in tokens.css, scaling at the 1480px+ media
 * query. Injected for the xl tier so the simulation matches tokens.css.
 */
const XL_BRAND_EXTRAS = [
  '--typography-brand-lg-size: var(--typography-size-3xl)',
  '--typography-brand-xl-size: var(--typography-size-5xl)',
];

interface TokenLeaf {
  value: string;
  cssName: string;
}

function isLeaf(node: unknown): node is TokenLeaf {
  return (
    typeof node === 'object' && node !== null && 'cssName' in node && 'value' in node
  );
}

function collectMode(node: Record<string, unknown>, out: string[]): string[] {
  for (const child of Object.values(node)) {
    if (isLeaf(child)) {
      const name = CSS_NAME_ALIASES[child.cssName] ?? child.cssName;
      // Figma cannot mix % and px in one variable collection, so unbounded
      // widths are exported as 100000px — always translate to 100% in CSS.
      const value = child.value === '100000px' ? '100%' : child.value;
      out.push(`${name}: ${value}`);
    } else if (typeof child === 'object' && child !== null) {
      collectMode(child as Record<string, unknown>, out);
    }
  }
  return out;
}

const layoutModes = tokensJson.layout as unknown as Record<string, Record<string, unknown>>;

/** Tier name → CSS declaration list, injected on :root by preview.ts. */
export const TIER_TOKENS: Record<string, string> = Object.fromEntries(
  Object.entries(TIER_MODE).map(([tier, mode]) => {
    const decls = collectMode(layoutModes[mode], []);
    if (tier === 'xl') decls.push(...XL_BRAND_EXTRAS);
    return [tier, decls.join(';\n')];
  })
);
