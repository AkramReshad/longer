import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const storeRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = join(storeRoot, '..');
const sourceRoot = join(workspaceRoot, 'brand', 'logos');
const publicRoot = join(storeRoot, 'public', 'brand');

const assets = [
  'longer-mark.png',
  'longer-lockup-horizontal.svg',
  'longer-lockup-stacked.png'
];

mkdirSync(publicRoot, { recursive: true });

for (const asset of assets) {
  copyFileSync(join(sourceRoot, asset), join(publicRoot, asset));
}
