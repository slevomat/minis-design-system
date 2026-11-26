// Tests for check-export.mjs, diff-export.mjs and lib/export-utils.mjs.
//   pnpm --filter @minis/tokens test
//
// Fixtures are built in memory, not read from tokens.json / tokens.rgb.json: those change with
// every re-export (tokens.json is expected to flip from failing to passing at the next one),
// and a test that follows them would break for the wrong reason.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkCss, checkExport, checkPair, exitCode } from './check-export.mjs';
import { diffExports } from './diff-export.mjs';
import { cascadeAt, compareVersions, readTokensCss, resolveVars, sameValue, spacingNameToEm } from './lib/export-utils.mjs';

const leaf = (cssName, value) => ({ value, type: 'float', cssName, origin: null });

/** A small export that satisfies every check. `kind` picks references vs resolved values. */
function makeExport({ kind = 'resolved', version = '1.3.1' } = {}) {
  const resolved = kind === 'resolved';
  const ratio = (n) => (resolved ? `${n}%` : `var(--typography-line-height-${n})`);
  return {
    $metadata: {
      exportMode: resolved ? 'resolved' : 'references',
      exporterVersion: version,
      settings: { naming: { removeCollectionName: true, omitDefaultFromName: true, removeModeSuffix: true }, includeOriginReference: true },
    },
    color: {
      border: leaf('--color-border', '#ccc'),
      separator: leaf('--color-separator', 'rgba(0,0,0,0.05)'),
      interaction: { primary: { surface: leaf('--color-interaction-primary-surface', '#c00') } },
    },
    breakpoints: { md: leaf('--breakpoint-md', '768px'), xs: leaf('--breakpoint-xs', '408px') },
    typography: {
      'line-height': { 130: leaf('--typography-line-height-130', '130%'), 125: leaf('--typography-line-height-125', '125%') },
      spacing: {
        n2: leaf('--typography-spacing-n2', '-0.02em'),
        n1: leaf('--typography-spacing-n1', '-0.01em'),
        n0_3: leaf('--typography-spacing-n0_3', '-0.003em'),
        0: leaf('--typography-spacing-0', '0'),
        3: leaf('--typography-spacing-3', '0.03em'),
      },
    },
    layout: {
      default: { typography: { heading: { lg: { size: leaf('--typography-heading-lg-size', resolved ? '20px' : 'var(--typography-size-xl)'), 'line-height': leaf('--typography-heading-lg-line-height', ratio(130)) } } } },
      md: { typography: { heading: { lg: { size: leaf('--typography-heading-lg-size', resolved ? '24px' : 'var(--typography-size-2xl)'), 'line-height': leaf('--typography-heading-lg-line-height', ratio(125)) } } } },
    },
  };
}

const failed = (results) => results.filter((r) => r.level === 'fail').map((r) => r.check);
const run = (json, kind = 'resolved', extra = {}) => checkExport(json, { label: 'x.json', kind, ...extra });

test('a clean export passes, in both modes', () => {
  assert.deepEqual(failed(run(makeExport())), []);
  assert.deepEqual(failed(run(makeExport({ kind: 'references' }), 'references')), []);
});

test('an exporter older than 1.3.1 fails', () => {
  assert.deepEqual(failed(run(makeExport({ version: '1.3.0' }))), ['exporter-version']);
  assert.deepEqual(failed(run(makeExport({ version: '1.10.0' }))), []);
});

test('a plugin naming setting that is OFF fails', () => {
  const j = makeExport();
  j.$metadata.settings.naming.omitDefaultFromName = false;
  assert.deepEqual(failed(run(j)), ['exporter-settings']);
});

test('a missing $metadata block fails', () => {
  const j = makeExport();
  delete j.$metadata;
  assert.ok(failed(run(j)).includes('metadata'));
});

test('a line-height-px token fails, however it is named or nested', () => {
  const j = makeExport();
  j.layout.md.typography.heading.lg['line-height-px'] = leaf('--typography-heading-lg-line-height-px', '30px');
  assert.ok(failed(run(j)).includes('no-line-height-px'));
});

test('a token that references itself fails', () => {
  const j = makeExport({ kind: 'references' });
  j.color.border.value = 'var(--color-border)';
  assert.deepEqual(failed(run(j, 'references')), ['self-reference']);
});

test('sentinel names: a missing one and a forbidden -default both fail', () => {
  const j = makeExport();
  delete j.color.separator;
  j.color.borderDefault = leaf('--color-border-default', '#ccc');
  assert.deepEqual(failed(run(j)), ['sentinel-names']);
});

test('the letter-spacing set must be exactly the announced one', () => {
  const j = makeExport();
  delete j.typography.spacing[3];
  assert.deepEqual(failed(run(j)), ['letter-spacing']);
  // a change that announces the smaller set passes
  assert.deepEqual(failed(run(j, 'resolved', { spacingSet: ['n2', 'n1', 'n0_3', '0'] })), []);
});

test('a letter-spacing value that disagrees with its name fails', () => {
  const j = makeExport();
  j.typography.spacing.n1.value = '-0.02em';
  assert.deepEqual(failed(run(j)), ['letter-spacing']);
});

test('a line-height ratio primitive must carry the percentage in its name', () => {
  const j = makeExport();
  j.typography['line-height'][130].value = '1.3';
  assert.ok(failed(run(j)).includes('line-height-ratios'));
});

test('a Layout line height in pixels fails in the resolved export', () => {
  const j = makeExport();
  j.layout.md.typography.heading.lg['line-height'].value = '30px';
  assert.deepEqual(failed(run(j)), ['typography-composites']);
});

test('a Layout mode with no breakpoint fails (the css check could not map it)', () => {
  const j = makeExport();
  j.layout['5xl'] = j.layout.md;
  assert.deepEqual(failed(run(j)), ['layout-modes']);
});

test('checkPair: different exporter versions fail, different token sets fail', () => {
  const refs = makeExport({ kind: 'references', version: '1.3.0' });
  const resolved = makeExport();
  assert.deepEqual(failed(checkPair(refs, resolved)), ['same-version']);
  const refs2 = makeExport({ kind: 'references' });
  delete refs2.color.border;
  assert.deepEqual(failed(checkPair(refs2, resolved)), ['same-tokens']);
  assert.deepEqual(failed(checkPair(makeExport({ kind: 'references' }), resolved)), []);
});

test('exitCode: failures fail, warnings only with strict', () => {
  assert.equal(exitCode([{ level: 'pass' }]), 0);
  assert.equal(exitCode([{ level: 'warn' }]), 0);
  assert.equal(exitCode([{ level: 'warn' }], true), 1);
  assert.equal(exitCode([{ level: 'fail' }]), 1);
});

// ---- tokens.css --------------------------------------------------------------------------

const filler = Array.from({ length: 110 }, (_, i) => `  --filler-${i}: ${i}px;`).join('\n');
const CSS = `/* FONTS — HAND-MAINTAINED, preserve on Figma re-export */
:root {
${filler}
  --color-border: #ccc;
  --color-separator: rgba(0,0,0,0.05);
  --color-interaction-primary-surface: #c00;
  --typography-font-family-brand: Kensington;
  --typography-brand-weight: 400;
  --typography-brand-lg-size: 24px;
  --typography-brand-lg-line-height: 110%;
  --typography-brand-xl-size: 32px;
  --typography-brand-xl-line-height: 110%;
  --container-bleeding-edge-padding: 0px;
  --typography-spacing-n2: -0.02em;
  --typography-spacing-n1: -0.01em;
  --typography-spacing-n0_3: -0.003em;
  --typography-spacing-0: 0;
  --typography-spacing-3: 0.03em;
  --typography-line-height-130: 130%;
  --typography-line-height-125: 125%;
  --typography-size-xl: 20px;
  --typography-size-2xl: 24px;
  --typography-heading-lg-size: var(--typography-size-xl);
  --typography-heading-lg-line-height: var(--typography-line-height-130);
}
@media (min-width: 408px) { :root { --page-width: 408px; } }
@media (min-width: 768px) {
  :root {
    --typography-heading-lg-size: var(--typography-size-2xl);
    --typography-heading-lg-line-height: var(--typography-line-height-125);
  }
}
[data-mode="dark"] { --color-border: #333; }
`;

test('tokens.css reader: tiers, cascade, var() resolution, dark block ignored', () => {
  const css = readTokensCss(CSS);
  assert.deepEqual(css.tiers.map((t) => t.minWidth), [0, 408, 768]);
  const at = (w) => cascadeAt(css, w);
  assert.equal(resolveVars('var(--typography-heading-lg-size)', at(0)), '20px');
  assert.equal(resolveVars('var(--typography-heading-lg-size)', at(768)), '24px');
  assert.equal(resolveVars('var(--typography-heading-lg-size)', at(600)), '20px');
  assert.equal(at(0).get('--color-border'), '#ccc'); // [data-mode="dark"] is not :root
});

test('css check: a matching tokens.css passes', () => {
  assert.deepEqual(failed(checkCss(makeExport(), CSS)), []);
});

test('css check: a typography value that differs from the export fails and names the mode', () => {
  const bad = CSS.replace('--typography-heading-lg-size: var(--typography-size-2xl);', '--typography-heading-lg-size: var(--typography-size-xl);');
  const res = checkCss(makeExport(), bad);
  assert.deepEqual(failed(res), ['css-typography']);
  assert.match(res.find((r) => r.check === 'css-typography').details.join('\n'), /md \(768px\)/);
});

test('css check: losing a hand-maintained token, the FONTS marker or a sentinel fails', () => {
  assert.deepEqual(failed(checkCss(makeExport(), CSS.replace('--typography-brand-weight: 400;', ''))), ['css-hand-maintained']);
  assert.deepEqual(failed(checkCss(makeExport(), CSS.replace('HAND-MAINTAINED', 'x'))), ['css-hand-maintained']);
  assert.deepEqual(failed(checkCss(makeExport(), CSS.replace('--color-separator:', '--color-sep:'))), ['css-hand-maintained']);
});

test('css check: a pasted -px value fails', () => {
  assert.ok(failed(checkCss(makeExport(), CSS + '\n:root { --typography-heading-lg-line-height-px: 26px; }')).includes('css-no-px'));
});

test('css check: a layout value that is only in Figma warns but does not fail (G12/G13)', () => {
  const j = makeExport();
  j.layout.md.container = { padding: leaf('--container-padding', '16px') };
  const res = checkCss(j, CSS);
  assert.deepEqual(failed(res), []);
  assert.ok(res.some((r) => r.level === 'warn' && r.check === 'css-layout-other'));
});

// ---- diff --------------------------------------------------------------------------------

test('diff: added, removed, renamed and re-valued tokens, and the removed-name alarm', () => {
  const a = makeExport();
  const b = makeExport();
  delete b.color.separator; // removed
  b.color.added = leaf('--color-new', '#fff'); // added
  delete b.typography.spacing.n2; // renamed …
  b.typography.spacing.n2b = leaf('--typography-letter-spacing-n2', '-0.02em'); // … same value, same first and last name segment
  b.layout.md.typography.heading.lg.size.value = '28px'; // re-valued, one mode only
  const d = diffExports(a, b);
  assert.deepEqual(d.groups.color.added, ['--color-new']);
  assert.deepEqual(d.groups.color.removed, ['--color-separator']);
  assert.deepEqual(d.groups.typography.renamed, [{ from: '--typography-spacing-n2', to: '--typography-letter-spacing-n2' }]);
  assert.deepEqual(d.groups.layout.changed.map((c) => [c.name, c.modes]), [['--typography-heading-lg-size', [{ mode: 'md', from: '24px', to: '28px' }]]]);
  assert.ok(d.removedNames.includes('--color-separator'));
});

test('diff: identical exports report nothing', () => {
  const d = diffExports(makeExport(), makeExport());
  assert.ok(Object.values(d.groups).every((g) => !g.added.length && !g.removed.length && !g.renamed.length && !g.changed.length));
});

// ---- helpers -----------------------------------------------------------------------------

test('helpers: versions, spacing names, number comparison', () => {
  assert.equal(compareVersions('1.3.1', '1.3.0'), 1);
  assert.equal(compareVersions('1.10.0', '1.9.9'), 1);
  assert.equal(compareVersions('1.3.1', '1.3.1'), 0);
  assert.equal(spacingNameToEm('--typography-spacing-n0_3'), -0.003);
  assert.equal(spacingNameToEm('--typography-spacing-3'), 0.03);
  assert.equal(spacingNameToEm('--typography-spacing-0'), 0);
  assert.equal(spacingNameToEm('--typography-size-xl'), null);
  assert.ok(sameValue('0', '0px'));
  assert.ok(sameValue('130%', '130%'));
  assert.ok(!sameValue('130%', '125%'));
  assert.ok(!sameValue('20px', '1.25rem'));
});
