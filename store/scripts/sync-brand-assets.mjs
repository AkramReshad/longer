import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const storeRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = join(storeRoot, '..');
const sourceRoot = join(workspaceRoot, 'brand', 'logos');
const publicRoot = join(storeRoot, 'public', 'brand');

const assets = [
  'mark/blue.png',
  'mark/white.png',
  'logo/horizontal_blue.svg',
  'logo/horizontal_white.svg',
  'logo/horizontal_white.png',
  'logo/stacked_blue.png',
  'logo/stacked_white.png'
];

mkdirSync(publicRoot, { recursive: true });

for (const asset of assets) {
  const destination = join(publicRoot, asset);
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(join(sourceRoot, asset), destination);
}
