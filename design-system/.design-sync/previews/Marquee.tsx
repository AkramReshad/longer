import { LongerProvider, Marquee, SectionHeading } from '@longer/ds';

const effects = [
  'INCREASED STAMINA',
  'EXTENDED PERFORMANCE',
  'IMPROVED CONFIDENCE',
  'HARDER EFFORTS',
  'ANOTHER ROUND',
  'BETTER FINISHES'
];

export function SideEffects() {
  return (
    <LongerProvider>
      <div style={{ padding: '40px 0' }}>
        <Marquee items={effects} />
      </div>
    </LongerProvider>
  );
}

export function WithSectionHeading() {
  return (
    <LongerProvider>
      <div style={{ padding: '40px 0' }}>
        <div style={{ padding: '0 40px 32px' }}>
          <SectionHeading
            tone="danger"
            eyebrow="Adverse reactions"
            title="Possible side effects include:"
          />
        </div>
        <Marquee items={effects} />
      </div>
    </LongerProvider>
  );
}
