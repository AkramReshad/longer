import { LongerProvider, Overline } from '@longer/ds';

export function WithRxSymbol() {
  return (
    <LongerProvider>
      <div style={{ padding: 40 }}>
        <Overline symbol="Rx">Patient information / Issue 001</Overline>
      </div>
    </LongerProvider>
  );
}

export function PlainLabel() {
  return (
    <LongerProvider>
      <div style={{ padding: 40 }}>
        <Overline>Clinical enrollment now open</Overline>
      </div>
    </LongerProvider>
  );
}

export function Danger() {
  return (
    <LongerProvider>
      <div style={{ padding: 40 }}>
        <Overline tone="danger">Adverse reactions</Overline>
      </div>
    </LongerProvider>
  );
}

export function Inverse() {
  return (
    <LongerProvider tone="deep">
      <div style={{ padding: 40 }}>
        <Overline tone="inverse" symbol="Rx">
          Treatment selection / Form LNG-RX
        </Overline>
      </div>
    </LongerProvider>
  );
}
