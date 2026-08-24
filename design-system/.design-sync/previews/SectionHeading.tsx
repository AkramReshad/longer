import { LongerProvider, SectionHeading } from '@longer/ds';

export function DiagnosisHeading() {
  return (
    <LongerProvider tone="deep">
      <div style={{ padding: 48 }}>
        <SectionHeading
          eyebrow="Self-assessment / Form ED-04"
          title="Is Electrolyte Dysfunction affecting you?"
          note="Check all that apply."
        />
      </div>
    </LongerProvider>
  );
}

export function AdverseReactions() {
  return (
    <LongerProvider>
      <div style={{ padding: 48 }}>
        <SectionHeading
          tone="danger"
          eyebrow="Adverse reactions"
          title="Possible side effects include:"
        />
      </div>
    </LongerProvider>
  );
}

export function TreatmentSelection() {
  return (
    <LongerProvider tone="white">
      <div style={{ padding: 48 }}>
        <SectionHeading
          eyebrow="Treatment selection / Form LNG-RX"
          title="Ask your trainer which option is right for you."
        />
      </div>
    </LongerProvider>
  );
}

export function Stacked() {
  return (
    <LongerProvider tone="white">
      <div style={{ padding: 48, maxWidth: 520 }}>
        <SectionHeading
          stacked
          eyebrow="Clinical enrollment now open"
          title="See if Longer is right for you."
          note="Cohort 001 is limited to 500 participants."
        />
      </div>
    </LongerProvider>
  );
}
