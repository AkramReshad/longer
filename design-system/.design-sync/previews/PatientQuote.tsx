import { LongerProvider, PatientQuote } from '@longer/ds';

export function Testimonial() {
  return (
    <LongerProvider tone="white">
      <PatientQuote
        label="Patient-reported outcome"
        quote="The maid of honor, two bridesmaids, and a waitress. All thanks to Longer."
        attribution="— Best man, hydration history unknown"
      />
    </LongerProvider>
  );
}

export function CohortOutcome() {
  return (
    <LongerProvider tone="white">
      <PatientQuote
        label="Cohort 001 / Week 6"
        quote="My wife used to laugh. Now she's the one tapping out."
        attribution="— Flacyd Johnson, cohort"
      />
    </LongerProvider>
  );
}
