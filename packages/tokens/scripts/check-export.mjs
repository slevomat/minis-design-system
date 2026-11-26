#!/usr/bin/env node
// Validates a Figma token export (and, with --css, the merged tokens.css against it).
//
//   pnpm tokens:check                      checks tokens.json + tokens.rgb.json  (procedure step 5)
//   pnpm tokens:check --css                also checks packages/tokens/src/tokens.css (step 7)
//   pnpm tokens:check --refs none          check only tokens.rgb.json
//   pnpm tokens:check --group-file typography.json   a single-group file made for production
//   node packages/tokens/scripts/check-export.mjs --help
//
// Exit code 1 when any check fails. A failure stops the token-update procedure
// (.claude/skills/minis-token-update/SKILL.md). Warnings never fail unless --strict.
//
// What each check protects against is written down in plan 009 (todo-plans/) and
// docs/ai-prompts/typography.md §6.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  DEFAULT_CSS,
  DEFAULT_REFS,
  DEFAULT_RESOLVED,
  MIN_EXPORTER_VERSION,
  cascadeAt,
  collectLeaves,
  compareVersions,
  cssDeclaredNames,
  modeOf,
  parseNumeric,
  readJson,
  readTokensCss,
  resolveVars,
  sameValue,
  spacingNameToEm,
} from './lib/export-utils.mjs';

/** The letter-spacing set (plan 016). Override with --spacing-set when a change announces a new one. */
export const DEFAULT_SPACING_SET = ['n2', 'n1', 'n0_3', '0', '3'];

/** Names a re-export must keep. A missing one means the exporter settings were wrong. */
export const SENTINELS_PRESENT = ['--color-border', '--color-separator', '--color-interaction-primary-surface'];
/** Names that must not exist: a `-default` guessed from Figma. */
export const SENTINELS_ABSENT = ['--color-border-default'];

/** Live only in tokens.css (or are hand-merged there); a merge must keep every one. */
export const HAND_MAINTAINED_NAMES = [
  '--typography-font-family-brand',
  '--typography-brand-weight',
  '--typography-brand-lg-size',
  '--typography-brand-lg-line-height',
  '--typography-brand-xl-size',
  '--typography-brand-xl-line-height',
  '--container-bleeding-edge-padding',
];

const pass = (check, message) => ({ level: 'pass', check, message });
const warn = (check, message, details = [], extra = null) => ({ level: 'warn', check, message, details, extra });
const fail = (check, message, details = []) => ({ level: 'fail', check, message, details });

// ---------------------------------------------------------------------------------------
// Checks on one export file
// ---------------------------------------------------------------------------------------

/**
 * `partial: true` is a single-group file (production's `typography.json`, `layout.json`, …):
 * the checks for groups it doesn't hold are skipped instead of failing. `breakpoints` is where a
 * Layout mode's width comes from when the file has no `breakpoints` group of its own.
 */
export function checkExport(json, { label, kind, minVersion = MIN_EXPORTER_VERSION, spacingSet = DEFAULT_SPACING_SET, partial = false, breakpoints = null }) {
  const r = [];
  const meta = json.$metadata;

  // 1. exporter version and settings (the only trace of the plugin's per-machine settings)
  if (!meta || typeof meta !== 'object') {
    r.push(fail('metadata', `${label}: no $metadata block, so the exporter version and settings can't be verified`));
  } else {
    const v = meta.exporterVersion;
    if (!v) r.push(fail('exporter-version', `${label}: $metadata.exporterVersion is missing`));
    else if (compareVersions(v, minVersion) < 0)
      r.push(fail('exporter-version', `${label}: exporter ${v} is older than the required ${minVersion}`));
    else r.push(pass('exporter-version', `${label}: exporter ${v} (needs >= ${minVersion})`));

    const naming = meta.settings?.naming ?? {};
    const required = {
      'naming.removeCollectionName': naming.removeCollectionName,
      'naming.omitDefaultFromName': naming.omitDefaultFromName,
      'naming.removeModeSuffix': naming.removeModeSuffix,
      includeOriginReference: meta.settings?.includeOriginReference,
    };
    const off = Object.entries(required).filter(([, val]) => val !== true).map(([k]) => k);
    if (off.length) r.push(fail('exporter-settings', `${label}: plugin setting(s) not ON: ${off.join(', ')}`, ['A fresh plugin install has them OFF, which renames every token. Fix the settings on this machine and export again.']));
    else r.push(pass('exporter-settings', `${label}: all four plugin settings are ON`));

    const expectMode = kind === 'resolved' ? 'resolved' : 'references';
    if (meta.exportMode !== expectMode)
      r.push(fail('export-mode', `${label}: exportMode is "${meta.exportMode}", expected "${expectMode}"`));
  }

  const leaves = collectLeaves(json);
  if (leaves.length === 0) {
    r.push(fail('tokens', `${label}: no tokens found`));
    return r;
  }

  const groups = new Set(leaves.map((l) => l.group));
  const need = (g) => !partial || groups.has(g);
  if (partial) r.push(pass('scope', `${label}: single-group file (${[...groups].join(', ')}); checks for other groups are skipped`));

  // 2. no Figma-only -px variable may leave Figma
  const px = leaves.filter((l) => /line-height-px$/.test(l.cssName) || l.path.includes('line-height-px'));
  if (px.length) r.push(fail('no-line-height-px', `${label}: ${px.length} "line-height-px" token(s) in the export; they are Figma-only and the exporter must skip them`, px.slice(0, 10).map((l) => `${l.key}  ${l.cssName}`)));
  else r.push(pass('no-line-height-px', `${label}: no "line-height-px" token`));

  // 3. self-references (exporter < 1.3.1 in references mode)
  const selfRef = leaves.filter((l) => typeof l.value === 'string' && l.value.replace(/\s/g, '') === `var(${l.cssName})`);
  if (selfRef.length) r.push(fail('self-reference', `${label}: ${selfRef.length} token(s) that reference themselves`, selfRef.map((l) => `${l.cssName}: ${l.value}`)));
  else r.push(pass('self-reference', `${label}: no self-referencing value`));

  // 4. sentinel names (colour names: only meaningful where the colour group is)
  const names = new Set(leaves.map((l) => l.cssName));
  const missing = need('color') ? SENTINELS_PRESENT.filter((n) => !names.has(n)) : [];
  const forbidden = SENTINELS_ABSENT.filter((n) => names.has(n));
  if (missing.length || forbidden.length)
    r.push(fail('sentinel-names', `${label}: naming settings look wrong`, [
      ...missing.map((n) => `missing: ${n}`),
      ...forbidden.map((n) => `must not exist: ${n}`),
    ]));
  else r.push(pass('sentinel-names', `${label}: ${need('color') ? 'sentinel names present, none forbidden' : 'no forbidden name (the colour sentinels need the colour group)'}`));

  if (need('typography')) {
    // 5. letter spacing: exactly the announced set, value derived from the name
    const spacing = leaves.filter((l) => l.cssName.startsWith('--typography-spacing-'));
    const gotSet = spacing.map((l) => l.cssName.replace('--typography-spacing-', '')).sort();
    const wantSet = [...spacingSet].sort();
    const spacingProblems = [];
    if (JSON.stringify(gotSet) !== JSON.stringify(wantSet))
      spacingProblems.push(`set is {${gotSet.join(', ')}}, expected {${wantSet.join(', ')}}`);
    for (const l of spacing) {
      const em = spacingNameToEm(l.cssName);
      const parsed = parseNumeric(l.value);
      if (em === null) spacingProblems.push(`${l.cssName}: name doesn't follow the percentage convention`);
      else if (!parsed || (parsed.n !== 0 && parsed.unit !== 'em') || Math.abs(parsed.n - em) > 1e-9)
        spacingProblems.push(`${l.cssName}: value ${l.value}, the name says ${em}em`);
    }
    if (spacingProblems.length) r.push(fail('letter-spacing', `${label}: letter-spacing tokens are off`, spacingProblems));
    else r.push(pass('letter-spacing', `${label}: letter-spacing set {${gotSet.join(', ')}} with values matching the names`));

    // 6. line-height ratio primitives: the value is the percentage in the name
    const ratioProblems = leaves
      .filter((l) => /^--typography-line-height-\d+$/.test(l.cssName))
      .filter((l) => l.value !== `${l.cssName.split('-').pop()}%`)
      .map((l) => `${l.cssName}: ${l.value}`);
    if (ratioProblems.length) r.push(fail('line-height-ratios', `${label}: ratio value doesn't match its name`, ratioProblems));
    else r.push(pass('line-height-ratios', `${label}: line-height ratio values match their names`));
  }

  if (need('layout')) {
    // 7. Layout composites: ratios stay ratios, sizes stay px, in every mode
    const layout = leaves.filter((l) => l.group === 'layout');
    const compProblems = [];
    for (const l of layout) {
      if (/^--typography-[\w-]+-line-height$/.test(l.cssName)) {
        const ok = kind === 'resolved' ? /^\d+(\.\d+)?%$/.test(l.value) : /^var\(--typography-line-height-\d+\)$/.test(l.value);
        if (!ok) compProblems.push(`${l.key}: ${l.cssName} = ${l.value} (a ratio must be ${kind === 'resolved' ? 'a percentage' : 'a ratio primitive reference'}, never pixels)`);
      } else if (/^--typography-[\w-]+-size$/.test(l.cssName) && kind === 'resolved' && !/^\d+(\.\d+)?px$/.test(l.value)) {
        compProblems.push(`${l.key}: ${l.cssName} = ${l.value} (a size must be px)`);
      }
    }
    if (compProblems.length) r.push(fail('typography-composites', `${label}: Layout typography composites have the wrong kind of value`, compProblems.slice(0, 20)));
    else r.push(pass('typography-composites', `${label}: Layout line heights are percentages${kind === 'resolved' ? ', sizes are px' : ' (primitive references)'} in every mode`));

    // 8. every Layout mode can be mapped to a width, and has the same typography names
    const modes = [...new Set(layout.map(modeOf))];
    const bp = Object.keys(json.breakpoints ?? breakpoints ?? {});
    const unmapped = modes.filter((m) => m !== 'default' && !bp.includes(m));
    if (unmapped.length) r.push(fail('layout-modes', `${label}: Layout mode(s) with no matching breakpoint: ${unmapped.join(', ')}`, ['The css check maps a mode to a width through the "breakpoints" group; it cannot compare a mode it can\'t map.']));
    else r.push(pass('layout-modes', `${label}: ${modes.length} Layout modes, all mapped through "breakpoints"`));

    const typoByMode = new Map(modes.map((m) => [m, new Set()]));
    for (const l of layout) if (l.cssName.startsWith('--typography-')) typoByMode.get(modeOf(l)).add(l.cssName);
    const union = new Set([...typoByMode.values()].flatMap((s) => [...s]));
    const uneven = [];
    for (const [m, s] of typoByMode) {
      const gone = [...union].filter((n) => !s.has(n));
      if (gone.length) uneven.push(`${m}: lacks ${gone.join(', ')}`);
    }
    if (uneven.length) r.push(warn('layout-modes-even', `${label}: typography names differ between Layout modes`, uneven));
  }

  return r;
}

// ---------------------------------------------------------------------------------------
// Checks across the two export files
// ---------------------------------------------------------------------------------------

export function checkPair(refs, resolved, labels = { refs: 'tokens.json', resolved: 'tokens.rgb.json' }) {
  const r = [];
  const va = refs.$metadata?.exporterVersion;
  const vb = resolved.$metadata?.exporterVersion;
  if (va && vb && va !== vb)
    r.push(fail('same-version', `${labels.refs} is exporter ${va} but ${labels.resolved} is ${vb}`, ['Export both files in the same plugin session ("Export all") from the same plugin version.']));
  else if (va && vb) r.push(pass('same-version', `both exports are exporter ${va}`));

  // Compare by CSS name, not by position. Exporter 1.3.1 leaves out, in references mode, a
  // `.Components` alias whose CSS name equals its Layout variable's (`--accordion-padding-y`),
  // because the Layout variable already defines that name. The resolved export keeps it. Same
  // name, different position is fine; a name present in only one file is not.
  const la = collectLeaves(refs);
  const lb = collectLeaves(resolved);
  const na = new Set(la.map((l) => l.cssName));
  const nb = new Set(lb.map((l) => l.cssName));
  const onlyA = [...na].filter((n) => !nb.has(n));
  const onlyB = [...nb].filter((n) => !na.has(n));
  if (onlyA.length || onlyB.length)
    r.push(fail('same-tokens', `${labels.refs} and ${labels.resolved} hold different token names`, [
      ...onlyA.slice(0, 10).map((n) => `only in ${labels.refs}: ${n}`),
      ...onlyB.slice(0, 10).map((n) => `only in ${labels.resolved}: ${n}`),
    ]));
  else {
    r.push(pass('same-tokens', `both files define the same ${na.size} token names`));
    const ka = new Set(la.map((l) => `${l.key}|${l.cssName}`));
    const omitted = lb.filter((l) => !ka.has(`${l.key}|${l.cssName}`)).map((l) => `${l.key}  ${l.cssName}`);
    if (omitted.length) r.push(pass('same-tokens-omitted', `${labels.refs} omits ${omitted.length} alias(es) whose name another token already defines (exporter 1.3.1 behaviour)`));
  }
  return r;
}

// ---------------------------------------------------------------------------------------
// A single-group file (production's typography.json, layout.json, …)
// ---------------------------------------------------------------------------------------

/**
 * Checks one exporter file that holds one top-level group, in resolved mode. Runs the checks
 * that apply to the groups it has, takes Layout mode widths from `repoResolved.breakpoints`
 * when the file has no `breakpoints` of its own, and checks the group **equals the repo's own
 * export of it**: a production file that differs from `tokens.rgb.json` means production and
 * this repo are about to disagree, which is what the token-update procedure exists to prevent.
 */
export function checkGroupFile(json, { label, repoResolved = null, minVersion = MIN_EXPORTER_VERSION, spacingSet = DEFAULT_SPACING_SET }) {
  const r = checkExport(json, { label, kind: 'resolved', minVersion, spacingSet, partial: true, breakpoints: repoResolved?.breakpoints ?? null });
  if (!repoResolved) {
    r.push(warn('group-matches-repo', `${label}: no tokens.rgb.json to compare the group with`));
    return r;
  }
  const mine = collectLeaves(json);
  const groups = new Set(mine.map((l) => l.group));
  const theirs = collectLeaves(repoResolved).filter((l) => groups.has(l.group));
  const byKey = (leaves) => new Map(leaves.map((l) => [`${l.key}|${l.cssName}`, l.value]));
  const a = byKey(mine);
  const b = byKey(theirs);
  const problems = [];
  for (const [k, v] of a) {
    if (!b.has(k)) problems.push(`only in ${label}: ${k}`);
    else if (!sameValue(String(v), String(b.get(k)))) problems.push(`${k}: ${label} ${v}  tokens.rgb.json ${b.get(k)}`);
  }
  for (const k of b.keys()) if (!a.has(k)) problems.push(`only in tokens.rgb.json: ${k}`);
  if (problems.length) r.push(fail('group-matches-repo', `${label}: differs from tokens.rgb.json in ${problems.length} place(s) (export the group in the same session as the repo files)`, problems.slice(0, 15).concat(problems.length > 15 ? [`… and ${problems.length - 15} more`] : [])));
  else r.push(pass('group-matches-repo', `${label}: identical to the ${[...groups].join(', ')} group of tokens.rgb.json (${a.size} tokens)`));
  return r;
}

// ---------------------------------------------------------------------------------------
// Checks of the merged tokens.css against the resolved export (step 7)
// ---------------------------------------------------------------------------------------

export function checkCss(resolved, cssText, { spacingSet = DEFAULT_SPACING_SET } = {}) {
  const r = [];
  const css = readTokensCss(cssText);
  const base = css.tiers[0].decls;

  if (css.tiers.length < 3 || base.size < 100) {
    r.push(fail('tokens.css reads', `tokens.css parsed into ${css.tiers.length} tier(s) and ${base.size} base tokens; its shape changed and this script no longer understands it`));
    return r;
  }
  r.push(pass('tokens.css reads', `tokens.css parsed: ${css.tiers.length} tiers (${css.tiers.map((t) => t.minWidth).join(', ')} px), ${base.size} base tokens`));

  if (/line-height-px/.test(cssText)) r.push(fail('css-no-px', 'tokens.css mentions "line-height-px"; those variables are Figma-only'));
  else r.push(pass('css-no-px', 'tokens.css has no "line-height-px"'));

  const declared = cssDeclaredNames(css);
  const lost = [...HAND_MAINTAINED_NAMES, ...SENTINELS_PRESENT].filter((n) => !declared.has(n));
  const bad = SENTINELS_ABSENT.filter((n) => declared.has(n));
  if (!/HAND-MAINTAINED/.test(cssText)) lost.push('the FONTS block marker "HAND-MAINTAINED"');
  if (lost.length || bad.length)
    r.push(fail('css-hand-maintained', 'tokens.css lost hand-maintained or sentinel content', [...lost.map((n) => `missing: ${n}`), ...bad.map((n) => `must not exist: ${n}`)]));
  else r.push(pass('css-hand-maintained', 'hand-maintained tokens, the FONTS marker and sentinel names are all in tokens.css'));

  // letter spacing in css
  const baseResolved = (n) => resolveVars(base.get(n) ?? '', base);
  const cssSpacing = [...declared].filter((n) => n.startsWith('--typography-spacing-'));
  const spProblems = [];
  const gotSet = cssSpacing.map((n) => n.replace('--typography-spacing-', '')).sort();
  if (JSON.stringify(gotSet) !== JSON.stringify([...spacingSet].sort())) spProblems.push(`set is {${gotSet.join(', ')}}, expected {${[...spacingSet].sort().join(', ')}}`);
  for (const n of cssSpacing) {
    const em = spacingNameToEm(n);
    if (em === null || !sameValue(baseResolved(n), em === 0 ? '0' : `${em}em`)) spProblems.push(`${n}: ${base.get(n)} (the name says ${em}em)`);
  }
  if (spProblems.length) r.push(fail('css-letter-spacing', 'tokens.css letter-spacing tokens are off', spProblems));
  else r.push(pass('css-letter-spacing', `tokens.css letter-spacing {${gotSet.join(', ')}} matches the names`));

  // Layout tokens per mode against the cascade at that mode's width
  const widths = { default: 0 };
  for (const [name, node] of Object.entries(resolved.breakpoints ?? {})) widths[name] = parseInt(node.value, 10);
  const typoDiff = [];
  const typoMissing = [];
  const otherDiff = [];
  const otherMissing = new Set();
  let typoChecked = 0;
  const unmapped = new Set();

  for (const l of collectLeaves(resolved).filter((x) => x.group === 'layout')) {
    const mode = modeOf(l);
    if (!(mode in widths)) { unmapped.add(mode); continue; }
    const cascade = cascadeAt(css, widths[mode]);
    const isTypo = /^--typography-[\w-]+-(size|line-height)$/.test(l.cssName) && !/^--typography-(size|line-height)-/.test(l.cssName);
    const expected = l.value === '100000px' ? '100%' : l.value;
    if (!cascade.has(l.cssName)) {
      if (isTypo) typoMissing.push(`${mode}: ${l.cssName} is in the export but not in tokens.css`);
      else otherMissing.add(l.cssName);
      continue;
    }
    const actual = resolveVars(cascade.get(l.cssName), cascade);
    if (isTypo) typoChecked++;
    if (!sameValue(actual, expected)) {
      const line = `${mode} (${widths[mode]}px): ${l.cssName}  css ${actual}  Figma ${expected}`;
      (isTypo ? typoDiff : otherDiff).push(line);
    }
  }
  if (unmapped.size) r.push(fail('css-layout-modes', `Layout mode(s) not mappable to a width: ${[...unmapped].join(', ')}`));
  if (typoDiff.length || typoMissing.length)
    r.push(fail('css-typography', `tokens.css typography differs from the export in ${typoDiff.length + typoMissing.length} place(s)`, [...typoMissing, ...typoDiff].slice(0, 40)));
  else r.push(pass('css-typography', `tokens.css matches the export for all ${typoChecked} Layout size and line-height values across every mode`));

  const otherLines = [...otherDiff, ...[...otherMissing].map((n) => `not in css: ${n}`)];
  if (otherLines.length) {
    const shown = otherLines.slice(0, 12);
    if (otherLines.length > 12) shown.push(`… and ${otherLines.length - 12} more (use --verbose)`);
    r.push(warn('css-layout-other', `${otherDiff.length} other Layout value(s) differ and ${otherMissing.size} name(s) are not in tokens.css (known divergences G12/G13, listed, not judged)`, shown, { all: otherLines }));
  }
  return r;
}

// ---------------------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------------------

const HELP = `check-export — validate a Figma token export

  --refs <file|none>      references export (default: tokens.json)
  --resolved <file|none>  resolved export (default: tokens.rgb.json)
  --group-file <file>     a single-group exporter file (production's typography.json, layout.json, …);
                          repeatable. Checked on its own terms and compared with tokens.rgb.json.
                          When given alone, tokens.json / tokens.rgb.json are not checked
                          (pass --refs / --resolved to check them too)
  --css [file]            also check the merged tokens.css against the resolved export
  --min-version <x.y.z>   oldest acceptable exporter (default ${MIN_EXPORTER_VERSION})
  --spacing-set <a,b,…>   the letter-spacing names a change announced (default ${DEFAULT_SPACING_SET.join(',')})
  --strict                warnings fail too
  --verbose               print every detail line
  --json                  machine-readable output`;

function parseArgs(argv) {
  const o = { refs: DEFAULT_REFS, resolved: DEFAULT_RESOLVED, css: null, minVersion: MIN_EXPORTER_VERSION, spacingSet: DEFAULT_SPACING_SET, groupFiles: [], explicit: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === '--refs') { o.refs = next(); o.explicit = true; }
    else if (a === '--resolved') { o.resolved = next(); o.explicit = true; }
    else if (a === '--group-file') o.groupFiles.push(next());
    else if (a === '--css') o.css = argv[i + 1] && !argv[i + 1].startsWith('--') ? next() : DEFAULT_CSS;
    else if (a === '--min-version') o.minVersion = next();
    else if (a === '--spacing-set') o.spacingSet = next().split(',').map((s) => s.trim()).filter(Boolean);
    else if (a === '--strict') o.strict = true;
    else if (a === '--verbose') o.verbose = true;
    else if (a === '--json') o.json = true;
    else if (a === '--help' || a === '-h') o.help = true;
    else throw new Error(`Unknown argument: ${a}`);
  }
  return o;
}

export function runChecks(o) {
  const results = [];
  const groupOnly = o.groupFiles.length > 0 && !o.explicit;
  const load = (file, kind, label) => {
    if (!file || file === 'none') return null;
    const p = path.resolve(file);
    if (!fs.existsSync(p)) { results.push(fail('file', `${label}: ${p} does not exist`)); return null; }
    const json = readJson(p);
    results.push(...checkExport(json, { label, kind, minVersion: o.minVersion, spacingSet: o.spacingSet }));
    return json;
  };
  let refs = null;
  let resolved = null;
  if (!groupOnly) {
    refs = load(o.refs, 'references', path.basename(o.refs ?? 'tokens.json'));
    resolved = load(o.resolved, 'resolved', path.basename(o.resolved ?? 'tokens.rgb.json'));
    if (refs && resolved) results.push(...checkPair(refs, resolved, { refs: path.basename(o.refs), resolved: path.basename(o.resolved) }));
  } else if (fs.existsSync(path.resolve(o.resolved))) {
    resolved = readJson(path.resolve(o.resolved)); // the reference for breakpoints and the match check
  }
  for (const file of o.groupFiles) {
    const p = path.resolve(file);
    if (!fs.existsSync(p)) { results.push(fail('file', `${path.basename(file)}: ${p} does not exist`)); continue; }
    results.push(...checkGroupFile(readJson(p), { label: path.basename(file), repoResolved: resolved, minVersion: o.minVersion, spacingSet: o.spacingSet }));
  }
  if (o.css) {
    if (!resolved) results.push(fail('css', 'the css check needs the resolved export (tokens.rgb.json)'));
    else results.push(...checkCss(resolved, fs.readFileSync(path.resolve(o.css), 'utf8'), { spacingSet: o.spacingSet }));
  }
  return results;
}

export function exitCode(results, strict = false) {
  return results.some((x) => x.level === 'fail' || (strict && x.level === 'warn')) ? 1 : 0;
}

function main() {
  const o = parseArgs(process.argv.slice(2));
  if (o.help) { console.log(HELP); return 0; }
  const results = runChecks(o);
  if (o.json) { console.log(JSON.stringify(results, null, 2)); return exitCode(results, o.strict); }
  const icon = { pass: '✓', warn: '!', fail: '✗' };
  for (const x of results) {
    console.log(`${icon[x.level]} ${x.message}`);
    const lines = o.verbose && x.extra?.all ? x.extra.all : x.details ?? [];
    for (const d of lines) console.log(`    ${d}`);
  }
  const f = results.filter((x) => x.level === 'fail').length;
  const w = results.filter((x) => x.level === 'warn').length;
  console.log(`\n${f ? `${f} check(s) failed` : 'All checks passed'}${w ? `, ${w} warning(s)` : ''}.`);
  return exitCode(results, o.strict);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { process.exitCode = main(); } catch (e) { console.error(`check-export: ${e.message}`); process.exitCode = 2; }
}
