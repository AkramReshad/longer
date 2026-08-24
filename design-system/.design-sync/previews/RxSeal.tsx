import { LongerProvider, RxSeal } from '@longer/ds';

export function DispensingSeal() {
  return (
    <LongerProvider>
      <div style={{ padding: 48 }}>
        <RxSeal caption="For oral hydration only" />
      </div>
    </LongerProvider>
  );
}

export function CohortSeal() {
  return (
    <LongerProvider>
      <div style={{ padding: 48 }}>
        <RxSeal symbol="Rx" caption="Cohort 001" size="110px" rotate={-6} />
      </div>
    </LongerProvider>
  );
}

export function OnBlue() {
  return (
    <LongerProvider tone="blue">
      <div style={{ padding: 48 }}>
        <RxSeal inverse caption="Not for parenteral use" />
      </div>
    </LongerProvider>
  );
}
