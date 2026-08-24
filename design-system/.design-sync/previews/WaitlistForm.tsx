import { LongerProvider, SectionHeading, WaitlistForm } from '@longer/ds';

async function noop(): Promise<void> {
  return;
}

export function EnrollmentPanel() {
  return (
    <LongerProvider tone="blue">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(320px, 0.55fr)',
          alignItems: 'center',
          gap: 64,
          padding: '64px 48px'
        }}
      >
        <SectionHeading
          stacked
          eyebrow="Clinical enrollment now open"
          title="See if Longer is right for you."
          note="Cohort 001 is limited to 500 participants."
        />
        <WaitlistForm
          buttonLabel="Improve my performance"
          source="storefront"
          onSubmit={noop}
        />
      </div>
    </LongerProvider>
  );
}

export function Standalone() {
  return (
    <LongerProvider tone="blue">
      <div style={{ padding: '48px 48px 64px', maxWidth: 460 }}>
        <WaitlistForm buttonLabel="Enroll in cohort 001" onSubmit={noop} />
      </div>
    </LongerProvider>
  );
}
