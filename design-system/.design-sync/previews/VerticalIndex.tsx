import { LongerProvider, VerticalIndex } from '@longer/ds';

export function ProductReference() {
  return (
    <LongerProvider>
      <div style={{ display: 'flex', justifyContent: 'flex-end', height: 400, padding: 32 }}>
        <VerticalIndex
          items={['LONGER / LNG-01', 'BLUE RASPBERRY', 'CLINICAL TRIAL PENDING']}
        />
      </div>
    </LongerProvider>
  );
}

export function OnBlue() {
  return (
    <LongerProvider tone="blue">
      <div style={{ display: 'flex', justifyContent: 'flex-end', height: 400, padding: 32 }}>
        <VerticalIndex
          inverse
          items={['PRESCRIPTION HYDRATION', 'LONGER', 'BLUE PILL', 'LNG-01']}
        />
      </div>
    </LongerProvider>
  );
}

export function Horizontal() {
  return (
    <LongerProvider>
      <div style={{ padding: 32 }}>
        <VerticalIndex horizontal items={['LOT 001', 'REV 07.26', 'LNG-PI-001']} />
      </div>
    </LongerProvider>
  );
}
