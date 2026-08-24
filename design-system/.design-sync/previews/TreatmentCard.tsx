import { LongerProvider, TreatmentCard } from '@longer/ds';

export function TreatmentLineup() {
  return (
    <LongerProvider tone="white">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          padding: 32
        }}
      >
        <TreatmentCard
          primary
          code="LNG-01"
          name="Blue Pill"
          status="First-line option"
          note="INITIAL THERAPY"
        />
        <TreatmentCard
          code="LNG-02"
          name="Watermelonafil"
          status="Extended release"
          note="UNDER CLINICAL REVIEW"
        />
        <TreatmentCard
          code="LNG-03"
          name="PED Pineapple"
          status="Performance enhancing drink"
          note="UNDER CLINICAL REVIEW"
        />
      </div>
    </LongerProvider>
  );
}

export function FirstLineOption() {
  return (
    <LongerProvider tone="white">
      <div style={{ padding: 32, maxWidth: 420 }}>
        <TreatmentCard
          primary
          code="LNG-01"
          name="Blue Pill"
          status="First-line option"
          note="INITIAL THERAPY"
        />
      </div>
    </LongerProvider>
  );
}
