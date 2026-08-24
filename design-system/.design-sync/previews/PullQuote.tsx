import { LongerProvider, PullQuote } from '@longer/ds';

export function CohortRemark() {
  return (
    <LongerProvider tone="deep">
      <div style={{ padding: 48 }}>
        <PullQuote
          quote="My wife used to laugh, now she's the one tapping out"
          cite="— Flacyd Johnson, cohort"
        />
      </div>
    </LongerProvider>
  );
}

export function OnPaper() {
  return (
    <LongerProvider>
      <div style={{ padding: 48 }}>
        <PullQuote
          quote="I took one packet before the wedding. I do not remember the toast."
          cite="— Groomsman, cohort 001"
        />
      </div>
    </LongerProvider>
  );
}
