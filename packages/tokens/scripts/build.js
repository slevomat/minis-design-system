import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

// Create dist directories
const dirs = [
  distDir,
  path.join(distDir, 'foundation'),
  path.join(distDir, 'themes')
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Function to concatenate CSS files from a directory
function concatenateCSS(dir, outputFile) {
  if (!fs.existsSync(dir)) {
    console.warn(`⚠ Directory not found: ${dir}`);
    return;
  }
  
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.css'));
  const content = files.map(file => {
    const filePath = path.join(dir, file);
    return `/* ${file} */\n${fs.readFileSync(filePath, 'utf-8')}\n`;
  }).join('\n');
  
  fs.writeFileSync(outputFile, content);
  console.log(`✓ Built ${path.relative(distDir, outputFile)}`);
}

// Copy the canonical tokens.css (Figma export) as the main output
const tokensSrc = path.join(srcDir, 'tokens.css');
fs.copyFileSync(tokensSrc, path.join(distDir, 'index.css'));
console.log('✓ Built index.css (from tokens.css)');

// Also expose it as tokens.css for direct import
fs.copyFileSync(tokensSrc, path.join(distDir, 'tokens.css'));
console.log('✓ Built tokens.css');

// Convert a hex or rgba() string to an rgb()/rgba() string, or return the input unchanged.
function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return null;
  // Already rgba() / rgb() — return as-is
  if (hex.startsWith('rgba(') || hex.startsWith('rgb(')) return hex;
  // var() reference — no conversion possible
  if (hex.startsWith('var(')) return null;
  const h = hex.replace('#', '');
  if (h.length === 6) {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
  if (h.length === 8) {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const a = Math.round((parseInt(h.slice(6, 8), 16) / 255) * 100) / 100;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return null;
}

// Collect all leaf tokens from a JSON tree into an ordered array: { cssName, value, comment? }
function collectTokens(node, results = []) {
  if (node && typeof node === 'object') {
    if ('cssName' in node && 'value' in node) {
      results.push({ cssName: node.cssName, value: node.value, comment: node.comment });
    } else {
      for (const child of Object.values(node)) {
        collectTokens(child, results);
      }
    }
  }
  return results;
}

// Generate tokens.rgb.css + palette-data.json from tokens.rgb.json and tokens.json
const rgbJsonPath = path.join(__dirname, '../../../tokens.rgb.json');
const oklchJsonPath = path.join(__dirname, '../../../tokens.json');

if (fs.existsSync(rgbJsonPath)) {
  const rgbJson = JSON.parse(fs.readFileSync(rgbJsonPath, 'utf-8'));
  const rgbTokens = collectTokens(rgbJson);

  // tokens.rgb.css
  const declarations = rgbTokens.map(({ cssName, value }) => `  ${cssName}: ${value};`).join('\n');
  const css = [
    '/**',
    ' * Minis Design System - Global Tokens (HEX/RGB)',
    ` * Generated from tokens.rgb.json on ${new Date().toISOString()}`,
    ' * Use this file instead of tokens.css for environments without OKLCH support.',
    ' */',
    '',
    ':root {',
    declarations,
    '}',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(distDir, 'tokens.rgb.css'), css);
  console.log('✓ Built tokens.rgb.css');

  // palette-data.json — joins OKLCH values + heritage comments from tokens.json
  if (fs.existsSync(oklchJsonPath)) {
    const oklchJson = JSON.parse(fs.readFileSync(oklchJsonPath, 'utf-8'));
    const oklchMap = new Map(collectTokens(oklchJson).map(t => [t.cssName, t]));

    const palette = {};
    for (const { cssName, value: hex, comment: rgbComment } of rgbTokens) {
      const oklchEntry = oklchMap.get(cssName);
      const rawHeritage = rgbComment || (oklchEntry && oklchEntry.comment) || '';
      palette[cssName] = {
        hex,
        rgb: hexToRgb(hex),
        oklch: oklchEntry ? oklchEntry.value : null,
        heritage: rawHeritage.replace(/^Heritage reference:\s*/i, ''),
      };
    }

    const paletteJsonPath = path.join(__dirname, '../../../apps/storybook/stories/palette-data.json');
    fs.writeFileSync(paletteJsonPath, JSON.stringify(palette, null, 2));
    console.log('✓ Built apps/storybook/stories/palette-data.json');
  }
} else {
  console.warn('⚠ tokens.rgb.json not found, skipping tokens.rgb.css and palette-data.json');
}

console.log('\n✅ Token build complete!');
