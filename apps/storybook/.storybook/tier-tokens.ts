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
 * Storybook Tier toolbar values = Figma Layout modes, one to one, named like
 * the breakpoint each starts at (G12, decided 2026-11-26 — plan 030). tokens.css
 * has one media query per mode, so every tier here is exactly one CSS tier.
 * 3xl / 4xl only change --page-width, so the widest entry ("2xl+") uses `2xl`.
 */
export const TIERS: { value: string; title: string; right: string; minWidth: number }[] = [
  { value: 'default', title: 'default', right: '<360px', minWidth: 0 },
  { value: '2xs', title: '2xs', right: '360–407px', minWidth: 360 },
  { value: 'xs', title: 'xs', right: '408–599px', minWidth: 408 },
  { value: 'sm', title: 'sm', right: '600–767px', minWidth: 600 },
  { value: 'md', title: 'md', right: '768–1007px', minWidth: 768 },
  { value: 'lg', title: 'lg', right: '1008–1255px', minWidth: 1008 },
  { value: 'xl', title: 'xl', right: '1256–1479px', minWidth: 1256 },
  { value: '2xl', title: '2xl – 4xl', right: '≥1480px', minWidth: 1480 },
];

/** The widest tier: the default, and the one a manual Tier choice applies on top of. */
export const WIDEST_TIER = '2xl';

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
  TIERS.map(({ value }) => [value, collectMode(layoutModes[value], []).join(';\n')])
);

/** Viewport width → tier, using the same breakpoints as the tokens.css media queries. */
export function tierFromWidth(px: number): string {
  let tier = TIERS[0].value;
  for (const t of TIERS) if (px >= t.minWidth) tier = t.value;
  return tier;
}
