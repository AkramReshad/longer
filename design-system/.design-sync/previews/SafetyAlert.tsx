import { LongerProvider, SafetyAlert } from '@longer/ds';

export function FourHourWarning() {
  return (
    <LongerProvider>
      <SafetyAlert
        label="Important safety information"
        statement="If performance lasts longer than four hours, call your doctor."
        note="Scroll for full prescribing information"
      />
    </LongerProvider>
  );
}

export function ConfidenceWarning() {
  return (
    <LongerProvider>
      <SafetyAlert
        label="Adverse reactions"
        statement="Discontinue use if confidence becomes medically significant."
        note="See full prescribing information"
      />
    </LongerProvider>
  );
}

export function NeutralNotice() {
  return (
    <LongerProvider>
      <SafetyAlert
        tone="blue"
        label="Trial enrollment"
        statement="Cohort 001 is limited to 500 participants."
        note="Enrollment closes when capacity is reached"
      />
    </LongerProvider>
  );
}
