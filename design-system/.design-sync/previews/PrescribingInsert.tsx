import { LongerProvider, PrescribingInsert } from '@longer/ds';

const sections = [
  {
    term: 'Indications and usage',
    body: 'Longer is indicated for men seeking more stamina, more confidence, and a stronger finish in the bedroom, workouts, nights out, and other forms of physical activity.'
  },
  {
    term: 'Dosage and administration',
    body: 'Mix one stick pack with 16–24 fl oz of water. Take approximately 30 minutes before activity. Maintain eye contact.'
  },
  {
    term: 'Warnings and precautions',
    body: 'Use caution around training partners, romantic partners, open bars, finish lines, and anyone with prior knowledge of your history.'
  },
  {
    term: 'Drug interactions',
    body: 'Longer may interact with poor judgment, direct sunlight, loud music, and the belief that tomorrow is someone else’s problem.'
  },
  {
    term: 'Adverse reactions',
    body: 'The most commonly observed reactions were increased confidence, extended duration, repeat performance, and questions about the blue packet.'
  },
  {
    term: 'Patient counseling',
    body: 'If performance lasts longer than four hours, call your doctor to brag.'
  }
];

export function FullLeaflet() {
  return (
    <LongerProvider>
      <PrescribingInsert
        title="Longer™"
        deck="For men experiencing a lack of performance."
        sections={sections}
        notice="For oral hydration only. Not for parenteral use. Not for the emotionally unavailable."
        code="LNG-PI-001 / REV 07.26"
      />
    </LongerProvider>
  );
}

export function AbbreviatedInsert() {
  return (
    <LongerProvider>
      <PrescribingInsert
        title="Watermelonafil"
        deck="Extended-release hydration for prolonged exertion."
        spine="ABBREVIATED PRESCRIBING INFORMATION"
        sections={sections.slice(0, 3)}
        notice="Individual stamina may vary."
        code="LNG-PI-002 / REV 08.26"
      />
    </LongerProvider>
  );
}
