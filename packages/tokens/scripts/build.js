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

// Build Foundation - Light mode
concatenateCSS(
  path.join(srcDir, 'foundation/light'),
  path.join(distDir, 'foundation/light.css')
);

// Build Foundation - Dark mode
concatenateCSS(
  path.join(srcDir, 'foundation/dark'),
  path.join(distDir, 'foundation/dark.css')
);

// Build foundation index (references light/dark)
const foundationIndex = `/**
 * Foundation Tokens
 * 
 * Import light or dark mode:
 * @import './light.css';
 * @import './dark.css';
 */

/* Default to light mode */
@import './light.css';
`;

fs.writeFileSync(
  path.join(distDir, 'foundation.css'),
  foundationIndex.trim()
);
console.log('✓ Built foundation.css');

// Build Layout
concatenateCSS(
  path.join(srcDir, 'layout'),
  path.join(distDir, 'layout.css')
);

// Copy breakpoints
const breakpointsPath = path.join(srcDir, 'breakpoints/breakpoints.css');
if (fs.existsSync(breakpointsPath)) {
  fs.copyFileSync(
    breakpointsPath,
    path.join(distDir, 'breakpoints.css')
  );
  console.log('✓ Built breakpoints.css');
}

// Copy theme files
const themes = ['default.css', 'gift.css'];
themes.forEach(theme => {
  const srcPath = path.join(srcDir, 'themes', theme);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, path.join(distDir, 'themes', theme));
    console.log(`✓ Built themes/${theme}`);
  }
});

// Build main index.css
const indexContent = `/**
 * Mini*S Design Tokens
 * Complete token system with default (light) theme
 */

/* Foundation (Light mode by default) */
@import './foundation/light.css';

/* Layout Tokens */
@import './layout.css';

/* Breakpoints */
@import './breakpoints.css';
`;

fs.writeFileSync(path.join(distDir, 'index.css'), indexContent.trim());
console.log('✓ Built index.css');

console.log('\n✅ Token build complete!');
