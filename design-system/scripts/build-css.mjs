/**
 * Concatenates the source stylesheets into one shipped file and copies the
 * brand fonts next to it, so `dist/longer-ds.css` is self-contained.
 */
import { mkdirSync, copyFileSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, 'src');
const dist = join(root, 'dist');
const order = ['tokens.css', 'fonts.css', 'base.css', 'components.css'];

mkdirSync(join(dist, 'fonts'), { recursive: true });

const sheet = order
  .map((name) => `/* ---- ${name} ---- */\n${readFileSync(join(src, name), 'utf8')}`)
  .join('\n\n');

writeFileSync(join(dist, 'longer-ds.css'), `${sheet}\n`);

// Tokens ship separately too, as the design agent's palette reference.
writeFileSync(join(dist, 'tokens.css'), readFileSync(join(src, 'tokens.css'), 'utf8'));

const fontDir = join(root, 'assets', 'fonts');
for (const file of readdirSync(fontDir)) {
  copyFileSync(join(fontDir, file), join(dist, 'fonts', file));
}

console.log(`css: dist/longer-ds.css (${sheet.length} bytes), fonts copied`);
