import { FinePrint, LongerProvider } from '@longer/ds';

export function RegulatoryDisclaimer() {
  return (
    <LongerProvider tone="white">
      <div style={{ padding: 40 }}>
        <FinePrint centered>
          This statement has not been evaluated by the Food and Drug
          Administration. This product is not intended to diagnose, treat, cure,
          or prevent any disease.
        </FinePrint>
      </div>
    </LongerProvider>
  );
}

export function HeroFineprint() {
  return (
    <LongerProvider>
      <div style={{ padding: 40 }}>
        <FinePrint>
          For sexual, athletic, and social performance. Individual stamina may
          vary.
        </FinePrint>
      </div>
    </LongerProvider>
  );
}
