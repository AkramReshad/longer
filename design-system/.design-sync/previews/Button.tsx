import { Button, LongerProvider } from '@longer/ds';

export function Primary() {
  return (
    <LongerProvider>
      <div style={{ padding: 32 }}>
        <Button variant="primary">See if Longer is right for you</Button>
      </div>
    </LongerProvider>
  );
}

export function Secondary() {
  return (
    <LongerProvider>
      <div style={{ padding: 32 }}>
        <Button variant="secondary">
          See how Electrolyte Dysfunction affects you.
        </Button>
      </div>
    </LongerProvider>
  );
}

export function Danger() {
  return (
    <LongerProvider>
      <div style={{ padding: 32 }}>
        <Button variant="danger" trailing="→">
          Improve my performance
        </Button>
      </div>
    </LongerProvider>
  );
}

export function HeroPairing() {
  return (
    <LongerProvider>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          flexWrap: 'wrap',
          padding: 32
        }}
      >
        <Button variant="primary">See if Longer is right for you</Button>
        <Button variant="secondary">Review treatment options ↓</Button>
      </div>
    </LongerProvider>
  );
}

// Rendered as links: the `.lngr-root a` reset previously out-specified the
// secondary underline, so this pairing guards that regression.
export function AsLinks() {
  return (
    <LongerProvider>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          flexWrap: 'wrap',
          padding: 32
        }}
      >
        <Button variant="primary" href="#enrollment">
          See if Longer is right for you
        </Button>
        <Button variant="secondary" href="#diagnosis">
          See how Electrolyte Dysfunction affects you.
        </Button>
      </div>
    </LongerProvider>
  );
}

export function Disabled() {
  return (
    <LongerProvider>
      <div style={{ padding: 32 }}>
        <Button variant="primary" disabled>
          Submitting…
        </Button>
      </div>
    </LongerProvider>
  );
}
