#!/usr/bin/env node
// What changed between two token exports: added, removed, renamed, re-valued.
//
//   pnpm tokens:diff                          working tokens.json + tokens.rgb.json vs HEAD  (procedure step 5)
//   pnpm tokens:diff --file tokens.rgb.json   one file only
//   pnpm tokens:diff --group layout           one group (the Storybook Tier feed is tokens.json → layout)
//   pnpm tokens:diff --old git:origin/master  compare against another ref
//   pnpm tokens:diff --old-file a.json --new-file b.json
//   pnpm tokens:diff --expect-removed --typography-spacing-n3,--foo
//
// The diff is the report the owner reads before merging into tokens.css, and the source for
// the changelog entries. A token that disappeared WITHOUT being listed in --expect-removed
// makes the exit code 1: a removed name is an alarm, not a detail.

import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { REPO_ROOT, collectLeaves, modeOf, readJson, readJsonFromGit, sameValue } from './lib/export-utils.mjs';

const FILES = ['tokens.json', 'tokens.rgb.json'];

/** Typography first, then the rest alphabetically. */
const byName = (a, b) => {
  const ta = a.startsWith('--typography-') ? 0 : 1;
  const tb = b.startsWith('--typography-') ? 0 : 1;
  return ta - tb || a.localeCompare(b);
};

/**
 * Compare two parsed exports. Returns
 *   { meta, groups: { [group]: { added, removed, renamed, changed } }, removedNames }
 * Names are cssNames; for Layout a name can exist in several modes, so `changed` entries
 * carry the per-mode before/after.
 */
export function diffExports(oldJson, newJson, { group } = {}) {
  const index = (json) => {
    const byGroup = new Map();
    for (const l of collectLeaves(json)) {
      if (group && l.group !== group) continue;
      if (!byGroup.has(l.group)) byGroup.set(l.group, new Map());
      const names = byGroup.get(l.group);
      if (!names.has(l.cssName)) names.set(l.cssName, new Map());
      names.get(l.cssName).set(modeOf(l) ?? '', { value: l.value, key: l.key });
    }
    return byGroup;
  };
  const a = index(oldJson);
  const b = index(newJson);
  const out = { meta: metaDiff(oldJson, newJson), groups: {}, removedNames: [] };

  for (const g of new Set([...a.keys(), ...b.keys()])) {
    const A = a.get(g) ?? new Map();
    const B = b.get(g) ?? new Map();
    const added = [...B.keys()].filter((n) => !A.has(n));
    const removed = [...A.keys()].filter((n) => !B.has(n));
    const changed = [];
    for (const [name, oldModes] of A) {
      if (!B.has(name)) continue;
      const newModes = B.get(name);
      const modeChanges = [];
      for (const m of new Set([...oldModes.keys(), ...newModes.keys()])) {
        const o = oldModes.get(m)?.value;
        const n = newModes.get(m)?.value;
        if (o === undefined) modeChanges.push({ mode: m, from: null, to: n });
        else if (n === undefined) modeChanges.push({ mode: m, from: o, to: null });
        else if (!sameValue(String(o), String(n))) modeChanges.push({ mode: m, from: o, to: n });
      }
      if (modeChanges.length) changed.push({ name, modes: modeChanges });
    }
    // A rename candidate: one name left, one arrived, same value(s), same first and last name
    // segment. Reported as a candidate only; the exporter can't tell a rename from a delete +
    // add, and neither can this script.
    const sig = (M, name) => JSON.stringify([...M.get(name)].map(([m, v]) => [m, v.value]).sort());
    const renamed = [];
    const taken = new Set();
    const firstSeg = (n) => n.split('-')[2];
    const lastSeg = (n) => n.split('-').pop();
    const pairs = [];
    for (const r of removed) {
      for (const n of added) {
        if (sig(B, n) === sig(A, r) && firstSeg(n) === firstSeg(r) && lastSeg(n) === lastSeg(r)) pairs.push({ r, n, d: editDistance(r, n) });
      }
    }
    const takenOld = new Set();
    for (const { r, n } of pairs.sort((x, y) => x.d - y.d)) {
      if (takenOld.has(r) || taken.has(n)) continue;
      takenOld.add(r);
      taken.add(n);
      renamed.push({ from: r, to: n });
    }
    const stillRemoved = removed.filter((r) => !takenOld.has(r));
    const stillAdded = new Set(added.filter((n) => !taken.has(n)));
    out.groups[g] = {
      added: [...stillAdded].sort(byName),
      removed: stillRemoved.sort(byName),
      renamed: renamed.sort((x, y) => byName(x.from, y.from)),
      changed: changed.sort((x, y) => byName(x.name, y.name)),
    };
    out.removedNames.push(...removed);
  }
  return out;
}

function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

function metaDiff(o, n) {
  const pick = (j) => ({ version: j.$metadata?.exporterVersion ?? '?', date: j.$metadata?.exportDate ?? '?', mode: j.$metadata?.exportMode ?? '?' });
  return { old: pick(o), new: pick(n) };
}

const fmtModes = (modes) => {
  const same = modes.length > 1 && modes.every((m) => m.from === modes[0].from && m.to === modes[0].to);
  if (same) return `(all ${modes.length} modes) ${modes[0].from} → ${modes[0].to}`;
  return modes.map((m) => `${m.mode ? `[${m.mode}] ` : ''}${m.from ?? '∅'} → ${m.to ?? '∅'}`).join('; ');
};

export function formatDiff(label, diff) {
  const lines = [`## ${label}`, `exporter ${diff.meta.old.version} → ${diff.meta.new.version}   (${diff.meta.old.date.slice(0, 10)} → ${diff.meta.new.date.slice(0, 10)})`];
  let total = 0;
  const groupNames = Object.keys(diff.groups).sort((x, y) => (x === 'typography' ? -1 : y === 'typography' ? 1 : x === 'layout' ? -1 : y === 'layout' ? 1 : x.localeCompare(y)));
  for (const g of groupNames) {
    const d = diff.groups[g];
    const n = d.added.length + d.removed.length + d.renamed.length + d.changed.length;
    if (!n) continue;
    total += n;
    lines.push('', `### ${g}  (${n})`);
    if (d.renamed.length) { lines.push('Renamed (same value, new name; candidates):'); for (const r of d.renamed) lines.push(`  ${r.from} → ${r.to}`); }
    if (d.removed.length) { lines.push('REMOVED:'); for (const r of d.removed) lines.push(`  ${r}`); }
    if (d.added.length) { lines.push('Added:'); for (const r of d.added) lines.push(`  ${r}`); }
    if (d.changed.length) { lines.push('Re-valued:'); for (const c of d.changed) lines.push(`  ${c.name}  ${fmtModes(c.modes)}`); }
  }
  if (!total) lines.push('', 'No token changed.');
  return { text: lines.join('\n'), total };
}

// ---------------------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------------------

const HELP = `diff-export — what changed between two token exports

  --file <name>          tokens.json | tokens.rgb.json (default: both)
  --old <git:REF>        what to compare against (default git:HEAD)
  --old-file <path>      compare against a file instead of git
  --new-file <path>      the new export (default: the working file in the repo root)
  --group <name>         only one group (color, layout, typography, …)
  --expect-removed <a,b> names the change announced as removed; any other removal fails
  --json                 machine-readable output`;

function parseArgs(argv) {
  const o = { old: 'git:HEAD', expectRemoved: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === '--file') o.file = next();
    else if (a === '--old') o.old = next();
    else if (a === '--old-file') o.oldFile = next();
    else if (a === '--new-file') o.newFile = next();
    else if (a === '--group') o.group = next();
    else if (a === '--expect-removed') o.expectRemoved = next().split(',').map((s) => s.trim()).filter(Boolean);
    else if (a === '--json') o.json = true;
    else if (a === '--help' || a === '-h') o.help = true;
    else throw new Error(`Unknown argument: ${a}`);
  }
  return o;
}

function main() {
  const o = parseArgs(process.argv.slice(2));
  if (o.help) { console.log(HELP); return 0; }
  const files = o.file ? [o.file] : (o.oldFile || o.newFile ? [path.basename(o.newFile ?? o.oldFile)] : FILES);
  let code = 0;
  const all = {};
  for (const f of files) {
    const newPath = o.newFile ? path.resolve(o.newFile) : path.join(REPO_ROOT, f);
    const oldJson = o.oldFile ? readJson(path.resolve(o.oldFile)) : readJsonFromGit(o.old.replace(/^git:/, ''), path.basename(f));
    const diff = diffExports(oldJson, readJson(newPath), { group: o.group });
    const unexpected = diff.removedNames.filter((n) => !o.expectRemoved.includes(n));
    all[f] = { ...diff, unexpectedRemovals: unexpected };
    if (!o.json) {
      const { text } = formatDiff(f, diff);
      console.log(text);
      const tier = diff.groups.layout;
      if (f === 'tokens.json' && !o.group) {
        const n = tier ? tier.added.length + tier.removed.length + tier.renamed.length + tier.changed.length : 0;
        console.log(`\nStorybook Tier (layout group of tokens.json): ${n ? `${n} change(s), the Tier toolbar will show them after a restart` : 'unchanged'}`);
      }
      if (unexpected.length) console.log(`\n✗ ${unexpected.length} removed name(s) were not announced: ${unexpected.slice(0, 10).join(', ')}${unexpected.length > 10 ? ', …' : ''}\n  Say so in the step-0 summary and pass them in --expect-removed, or find out why they vanished.`);
      console.log('');
    }
    if (unexpected.length) code = 1;
  }
  if (o.json) console.log(JSON.stringify(all, null, 2));
  return code;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { process.exitCode = main(); } catch (e) { console.error(`diff-export: ${e.message}`); process.exitCode = 2; }
}

