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

console.log('\n✅ Token build complete!');
