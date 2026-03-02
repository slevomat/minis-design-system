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

// Generate tokens.rgb.css from tokens.rgb.json (HEX/rgba values, same CSS variable names)
const rgbJsonPath = path.join(__dirname, '../../../tokens.rgb.json');
if (fs.existsSync(rgbJsonPath)) {
  const rgbJson = JSON.parse(fs.readFileSync(rgbJsonPath, 'utf-8'));

  function collectTokens(node, results = []) {
    if (node && typeof node === 'object') {
      if ('cssName' in node && 'value' in node) {
        results.push({ cssName: node.cssName, value: node.value });
      } else {
        for (const child of Object.values(node)) {
          collectTokens(child, results);
        }
      }
    }
    return results;
  }

  const tokens = collectTokens(rgbJson);
  const declarations = tokens.map(({ cssName, value }) => `  ${cssName}: ${value};`).join('\n');
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
} else {
  console.warn('⚠ tokens.rgb.json not found, skipping tokens.rgb.css');
}

console.log('\n✅ Token build complete!');
