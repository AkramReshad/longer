import { LongerProvider, SpecList } from '@longer/ds';

export function DosingTable() {
  return (
    <LongerProvider tone="blue">
      <div style={{ padding: 40, maxWidth: 560 }}>
        <SpecList
          items={[
            { term: 'Route', value: 'Oral hydration' },
            { term: 'Flavor', value: 'Blue raspberry' },
            { term: 'Onset', value: '30 minutes before physical activity' },
            {
              term: 'Duration',
              value: 'Long enough to become someone else’s problem'
            }
          ]}
        />
      </div>
    </LongerProvider>
  );
}

export function OnPaper() {
  return (
    <LongerProvider>
      <div style={{ padding: 40, maxWidth: 560 }}>
        <SpecList
          items={[
            { term: 'Strength', value: 'LNG-01 / full dose' },
            { term: 'Supply', value: '30 stick packs' },
            { term: 'Storage', value: 'Store below 25°C. Keep dry.' }
          ]}
        />
      </div>
    </LongerProvider>
  );
}
