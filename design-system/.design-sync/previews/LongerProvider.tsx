import {
  Button,
  FinePrint,
  LongerProvider,
  Overline,
  SectionHeading,
  Wordmark
} from '@longer/ds';

export function PaperSurface() {
  return (
    <LongerProvider tone="paper">
      <div style={{ display: 'grid', gap: 20, padding: 48 }}>
        <Overline symbol="Rx">Patient information / Issue 001</Overline>
        <SectionHeading stacked title="Are you suffering from ED?" />
        <FinePrint>
          Electrolyte Dysfunction can happen to any man.
        </FinePrint>
      </div>
    </LongerProvider>
  );
}

export function BlueSurface() {
  return (
    <LongerProvider tone="blue">
      <div style={{ display: 'grid', gap: 20, padding: 48, justifyItems: 'start' }}>
        <Wordmark inverse size="2.8rem" />
        <SectionHeading stacked eyebrow="Introducing LNG-01" title="Blue Pill." />
        <Button variant="danger" trailing="→">
          Improve my performance
        </Button>
      </div>
    </LongerProvider>
  );
}

export function DeepSurface() {
  return (
    <LongerProvider tone="deep">
      <div style={{ display: 'grid', gap: 20, padding: 48 }}>
        <Overline tone="inverse">Self-assessment / Form ED-04</Overline>
        <SectionHeading
          stacked
          title="Is Electrolyte Dysfunction affecting you?"
          note="Check all that apply."
        />
      </div>
    </LongerProvider>
  );
}

export function WhiteSurface() {
  return (
    <LongerProvider tone="white">
      <div style={{ display: 'grid', gap: 20, padding: 48, justifyItems: 'start' }}>
        <Wordmark size="2.8rem" />
        <SectionHeading
          stacked
          eyebrow="Treatment selection / Form LNG-RX"
          title="Ask your trainer which option is right for you."
        />
      </div>
    </LongerProvider>
  );
}
