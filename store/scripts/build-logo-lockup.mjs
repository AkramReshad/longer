import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const icon = readFileSync(join(root, 'app/icon.png')).toString('base64');
const font = readFileSync(join(root, 'public/logos/instrument-serif.ttf')).toString('base64');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="244" viewBox="0 0 1080 244" role="img" aria-labelledby="title description">
  <title id="title">Longer</title>
  <desc id="description">Longer — Electrolyte Dysfunction</desc>
  <defs>
    <style>
      @font-face { font-family: "Instrument Serif"; src: url("data:font/truetype;base64,${font}") format("truetype"); font-weight: 400; }
      .wordmark { font-family: "Instrument Serif", Georgia, serif; font-size: 180px; font-weight: 400; letter-spacing: -5px; }
      .descriptor { font-family: Arial, Helvetica, sans-serif; font-size: 32px; font-weight: 700; letter-spacing: 1px; }
    </style>
  </defs>
  <image href="data:image/png;base64,${icon}" x="0" y="0" width="205" height="244" preserveAspectRatio="xMidYMid meet" />
  <g fill="#0057b8">
    <text class="wordmark" x="224" y="157">LONGER</text>
    <text class="descriptor" x="232" y="220">ELECTROLYTE DYSFUNCTION</text>
  </g>
</svg>`;

writeFileSync(join(root, 'public/logos/longer-horizontal-lockup.svg'), svg);
