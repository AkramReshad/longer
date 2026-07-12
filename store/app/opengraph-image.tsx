import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Longer — Electrolyte Dysfunction';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  const mark = readFileSync(join(process.cwd(), 'app/icon.png')).toString('base64');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          borderTop: '12px solid #0057b8'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${mark}`}
            width={116}
            height={184}
            alt=""
            style={{ objectFit: 'contain' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', color: '#0057b8' }}>
            <div
              style={{
                fontFamily: 'Georgia, Times New Roman, serif',
                fontSize: 126,
                lineHeight: 0.9,
                letterSpacing: -5
              }}
            >
              LONGER
            </div>
            <div
              style={{
                marginTop: 28,
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: 31,
                fontWeight: 700,
                letterSpacing: 1.5
              }}
            >
              ELECTROLYTE DYSFUNCTION
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
