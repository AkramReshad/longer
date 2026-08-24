import { LongerProvider, StatBlock } from '@longer/ds';

const trialData = [
  { figure: '3/4', label: 'Americans suffer from Electrolyte Dysfunction' },
  { figure: '5/4', label: 'Women agree that finishing matters' },
  { figure: '01', label: 'Packet administered before the relationship deteriorated' }
];

export function TrialData() {
  return (
    <LongerProvider tone="deep">
      <div style={{ padding: 40 }}>
        <StatBlock items={trialData} />
      </div>
    </LongerProvider>
  );
}

export function PlainOnPaper() {
  return (
    <LongerProvider>
      <div style={{ padding: 40 }}>
        <StatBlock
          plain
          items={[
            { figure: '16–24', label: 'Fl oz of water per stick pack' },
            { figure: '30', label: 'Minutes before physical activity' },
            { figure: '4h', label: 'Consult your training partner beyond this point' }
          ]}
        />
      </div>
    </LongerProvider>
  );
}
