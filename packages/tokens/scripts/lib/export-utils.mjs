// Shared helpers for check-export.mjs and diff-export.mjs.
//
// Dependency-free on purpose: Node >= 20, no packages, so CI (plans 011/022/024) can run
// the checks without an install step. Method and the rules behind each check:
// .claude/skills/minis-token-update/ and docs/ai-prompts/typography.md.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(here, '../../../..');
export const DEFAULT_REFS = path.join(REPO_ROOT, 'tokens.json');
export const DEFAULT_RESOLVED = path.join(REPO_ROOT, 'tokens.rgb.json');
export const DEFAULT_CSS = path.join(REPO_ROOT, 'packages/tokens/src/tokens.css');

/** The oldest exporter that produces a trustworthy export (see plan 009, "Constraints"). */
export const MIN_EXPORTER_VERSION = '1.3.1';

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

/** `git show <ref>:<repo-relative path>`, parsed. Throws if the ref or file doesn't exist. */
export function readJsonFromGit(ref, relPath) {
  const out = execFileSync('git', ['show', `${ref}:${relPath}`], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  return JSON.parse(out);
}

/**
 * Every token in an export as { group, path, cssName, value, key }.
 * A token is any object with a `cssName`. `key` is `group/path/segments`, which includes
 * the Layout mode (`layout/md/typography/heading/lg/size`), so one cssName can occur in
 * several modes without colliding.
 */
export function collectLeaves(exportJson) {
  const leaves = [];
  const walk = (node, group, segs) => {
    if (node === null || typeof node !== 'object') return;
    if (typeof node.cssName === 'string') {
      leaves.push({
        group,
        path: segs,
        cssName: node.cssName,
        value: node.value,
        key: `${group}/${segs.join('/')}`,
      });
      return;
    }
    for (const [k, v] of Object.entries(node)) walk(v, group, [...segs, k]);
  };
  for (const [group, node] of Object.entries(exportJson)) {
    if (group === '$metadata') continue;
    walk(node, group, []);
  }
  return leaves;
}

/** Layout mode of a leaf (`default`, `2xs`, … `4xl`), or null for any other group. */
export function modeOf(leaf) {
  return leaf.group === 'layout' ? leaf.path[0] : null;
}

/** Compare two dotted versions: -1, 0, 1. Non-numeric parts count as 0. */
export function compareVersions(a, b) {
  const pa = String(a).split('.').map((n) => parseInt(n, 10) || 0);
  const pb = String(b).split('.').map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d !== 0) return d < 0 ? -1 : 1;
  }
  return 0;
}

/** `--typography-spacing-n0_3` → -0.003 (em). `n` = minus, `_` = decimal point, value is a percent. */
export function spacingNameToEm(cssName) {
  const m = /^--typography-spacing-(n?)(\d+(?:_\d+)?)$/.exec(cssName);
  if (!m) return null;
  const pct = parseFloat(m[2].replace('_', '.')) * (m[1] ? -1 : 1);
  return pct / 100;
}

/** `20px`, `130%`, `-0.02em`, `0` → { n, unit }; anything else → null. */
export function parseNumeric(value) {
  const m = /^(-?\d*\.?\d+)(px|%|em|rem)?$/.exec(String(value).trim());
  if (!m) return null;
  return { n: parseFloat(m[1]), unit: m[2] ?? '' };
}

/** Numbers equal within float noise; `0` and `0px` count as equal. */
export function sameValue(a, b) {
  const pa = parseNumeric(a);
  const pb = parseNumeric(b);
  if (pa && pb) {
    const unitOk = pa.unit === pb.unit || pa.n === 0 || pb.n === 0;
    return unitOk && Math.abs(pa.n - pb.n) < 1e-9;
  }
  return String(a).trim() === String(b).trim();
}

// ---------------------------------------------------------------------------------------
// tokens.css reader
// ---------------------------------------------------------------------------------------

/**
 * Reads the declarations that apply to `:root` from tokens.css, split by `min-width` tier.
 * Returns { tiers: [{ minWidth, decls: Map }] } sorted by minWidth, base tier first (0).
 *
 * Deliberately small, not a CSS parser: it understands exactly the shape tokens.css has
 * (top-level `:root { … }` and `@media (min-width: Npx) { :root { … } }`) and ignores every
 * other selector (`[data-mode="dark"]`, `[data-theme=…]`). If the shape changes, the
 * `tokens.css reads` check in check-export.mjs fails instead of silently reading nothing.
 */
export function readTokensCss(cssText) {
  const text = cssText.replace(/\/\*[\s\S]*?\*\//g, '');
  const tiers = new Map([[0, new Map()]]);
  let i = 0;

  const parseDecls = (body, into) => {
    for (const m of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) into.set(m[1], m[2].trim());
  };
  const matchBrace = (start) => {
    let depth = 0;
    for (let j = start; j < text.length; j++) {
      if (text[j] === '{') depth++;
      else if (text[j] === '}' && --depth === 0) return j;
    }
    throw new Error('tokens.css: unbalanced braces');
  };

  while (i < text.length) {
    const open = text.indexOf('{', i);
    if (open === -1) break;
    // Anything after the last `;` is this block's selector (skips a leading @import, etc.).
    const head = text.slice(i, open).split(';').pop().trim();
    const close = matchBrace(open);
    const body = text.slice(open + 1, close);
    const media = /^@media\s*\(\s*min-width\s*:\s*(\d+)px\s*\)$/.exec(head);
    if (media) {
      const minWidth = Number(media[1]);
      const decls = tiers.get(minWidth) ?? new Map();
      tiers.set(minWidth, decls);
      for (const inner of body.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
        if (inner[1].trim() === ':root') parseDecls(inner[2], decls);
      }
    } else if (head === ':root') {
      parseDecls(body, tiers.get(0));
    }
    i = close + 1;
  }
  return {
    tiers: [...tiers.entries()].sort((a, b) => a[0] - b[0]).map(([minWidth, decls]) => ({ minWidth, decls })),
  };
}

/** Every custom property declared on `:root` in any tier. */
export function cssDeclaredNames(css) {
  const names = new Set();
  for (const t of css.tiers) for (const n of t.decls.keys()) names.add(n);
  return names;
}

/** Cascade at a viewport width: base, then every tier with minWidth <= width, later wins. */
export function cascadeAt(css, width) {
  const out = new Map();
  for (const t of css.tiers) {
    if (t.minWidth > width) break;
    for (const [k, v] of t.decls) out.set(k, v);
  }
  return out;
}

/** Resolve `var(--x)` chains inside a cascade. Unresolvable → returns the text as is. */
export function resolveVars(value, cascade, seen = new Set()) {
  return value.replace(/var\(\s*(--[\w-]+)\s*(?:,[^)]*)?\)/g, (whole, name) => {
    if (seen.has(name) || !cascade.has(name)) return whole;
    return resolveVars(cascade.get(name), cascade, new Set([...seen, name]));
  });
}
