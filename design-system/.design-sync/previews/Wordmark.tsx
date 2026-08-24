import { FinePrint, LongerProvider, Wordmark } from '@longer/ds';

export function Default() {
  return (
    <LongerProvider>
      <div style={{ padding: 40 }}>
        <Wordmark />
      </div>
    </LongerProvider>
  );
}

export function WithTrademark() {
  return (
    <LongerProvider>
      <div style={{ padding: 40 }}>
        <Wordmark trademark size="4.4rem" />
      </div>
    </LongerProvider>
  );
}

export function Inverse() {
  return (
    <LongerProvider tone="blue">
      <div style={{ padding: 40 }}>
        <Wordmark inverse />
      </div>
    </LongerProvider>
  );
}

export function HeaderLockup() {
  return (
    <LongerProvider tone="white">
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 24,
          padding: '28px 40px',
          borderBottom: '1px solid var(--lngr-line-soft)'
        }}
      >
        <Wordmark size="2.6rem" />
        <FinePrint>Clinical hydration. No prescription required.</FinePrint>
      </div>
    </LongerProvider>
  );
}
