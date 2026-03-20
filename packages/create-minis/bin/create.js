#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MONOREPO_ROOT = resolve(__dirname, '..', '..', '..');
const TEMPLATE_DIR = resolve(__dirname, '..', 'template');

// ── Parse args ──────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h') || args.length === 0) {
  console.log(`
  Usage: create-minis <target-directory>

  Scaffold a Mini*S prototype project with Vite, design tokens,
  components, icons, and AI prompt docs — ready for vibe-coding.

  Example:
    node packages/create-minis/bin/create.js ~/prototypy/my-deal
    cd ~/prototypy/my-deal
    pnpm install
    pnpm dev
`);
  process.exit(args.length === 0 ? 1 : 0);
}

const targetDir = resolve(args[0]);
const projectName = basename(targetDir);

// ── Validate ────────────────────────────────────────────────────────────────────

if (existsSync(targetDir)) {
  console.error(`\n  Error: Directory already exists: ${targetDir}\n`);
  process.exit(1);
}

// Check that dist directories exist
const distPaths = {
  tokens: resolve(MONOREPO_ROOT, 'packages/tokens/dist'),
  components: resolve(MONOREPO_ROOT, 'packages/components/dist'),
  icons: resolve(MONOREPO_ROOT, 'packages/icons/dist'),
};

const missingDists = Object.entries(distPaths)
  .filter(([, p]) => !existsSync(p))
  .map(([name]) => name);

if (missingDists.length > 0) {
  console.error(`\n  Error: Missing built packages: ${missingDists.join(', ')}`);
  console.error(`  Run \`pnpm build\` in the monorepo root first.\n`);
  process.exit(1);
}

const aiPromptsDir = resolve(MONOREPO_ROOT, 'docs/ai-prompts');
if (!existsSync(aiPromptsDir)) {
  console.error(`\n  Error: AI prompt docs not found at ${aiPromptsDir}\n`);
  process.exit(1);
}

// ── Create project ──────────────────────────────────────────────────────────────

console.log(`\n  Creating Mini*S prototype: ${projectName}`);
console.log(`  Target: ${targetDir}\n`);

mkdirSync(targetDir, { recursive: true });

// Copy and transform template files
function copyTemplate(templateFile, outputFile, replacements = {}) {
  let content = readFileSync(resolve(TEMPLATE_DIR, templateFile), 'utf-8');
  for (const [key, value] of Object.entries(replacements)) {
    content = content.replaceAll(key, value);
  }
  writeFileSync(resolve(targetDir, outputFile), content);
}

const replacements = { '{{PROJECT_NAME}}': projectName };

copyTemplate('_index.html', 'index.html', replacements);
copyTemplate('_package.json', 'package.json', replacements);
copyTemplate('_vite.config.js', 'vite.config.js');
copyTemplate('_CLAUDE.md', 'CLAUDE.md', replacements);

console.log('  ✓ Template files');

// Copy vendor files into public/ so Vite serves them as plain static assets
// (no module resolution — bare "lit" imports are handled by the browser import map)
const vendorDir = resolve(targetDir, 'public/vendor');
cpSync(distPaths.tokens, vendorDir, { recursive: true });
cpSync(distPaths.components, resolve(vendorDir, 'components'), { recursive: true });
cpSync(distPaths.icons, resolve(vendorDir, 'icons'), { recursive: true });

console.log('  ✓ Vendor files (tokens, components, icons)');

// Copy AI prompt docs
cpSync(aiPromptsDir, resolve(targetDir, 'docs/ai-prompts'), { recursive: true });

console.log('  ✓ AI prompt docs');

// ── Done ────────────────────────────────────────────────────────────────────────

console.log(`
  Done! Next steps:

    cd ${targetDir}
    pnpm install
    pnpm dev

  Then open http://localhost:5173 and start vibe-coding.
  AI agents (Claude Code, Cursor) will pick up CLAUDE.md automatically.
`);
