import { LongerProvider, SectionHeading, SymptomChecklist } from '@longer/ds';

const symptoms = [
  {
    index: '01',
    title: 'Finishing Early',
    copy: 'Losing stamina before you, your partner, or the occasion is satisfied.'
  },
  {
    index: '02',
    title: 'Difficulty maintaining performance',
    copy: 'Starting strong, then going soft when conditions become demanding.'
  },
  {
    index: '03',
    title: 'Failure to finish',
    copy: 'Plenty of initial enthusiasm. No convincing conclusion.'
  },
  {
    index: '04',
    title: 'Waking up dry',
    copy: 'The morning-after symptom following prolonged... activities.'
  }
];

export function SelfAssessment() {
  return (
    <LongerProvider tone="deep">
      <div style={{ padding: '56px 48px' }}>
        <SectionHeading
          eyebrow="Self-assessment / Form ED-04"
          title="Is Electrolyte Dysfunction affecting you?"
          note="Check all that apply."
        />
        <div style={{ marginTop: 48 }}>
          <SymptomChecklist items={symptoms} />
        </div>
      </div>
    </LongerProvider>
  );
}

export function WithCheckedRow() {
  return (
    <LongerProvider tone="deep">
      <div style={{ padding: '48px' }}>
        <SymptomChecklist
          items={[
            { ...symptoms[0], checked: true },
            symptoms[1],
            symptoms[2]
          ]}
        />
      </div>
    </LongerProvider>
  );
}

export function OnLightSurface() {
  return (
    <LongerProvider tone="white">
      <div style={{ padding: '48px' }}>
        <SymptomChecklist light items={symptoms.slice(0, 3)} />
      </div>
    </LongerProvider>
  );
}
