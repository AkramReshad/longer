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
  const lockup = readFileSync(join(process.cwd(), 'public/logos/longer-horizontal-lockup.svg'), 'utf8');
  const encodedLockup = Buffer.from(lockup).toString('base64');

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
        <div style={{ display: 'flex', alignItems: 'center', transform: 'translateX(-55px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;base64,${encodedLockup}`}
            width={900}
            height={244}
            alt="Longer — Electrolyte Dysfunction"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
