---
category: Commerce
---

# WaitlistForm

The trial-enrollment email capture — framed as clinical enrollment rather than a newsletter signup. That framing is the whole conversion mechanic.

Carries a honeypot field and reports status through `aria-live`. Supply `onSubmit` to wire your own handler, or leave it to POST `{ email, website, source }` to `action`.

## Writing the form

- **Button label is an outcome, never an action.** "Improve my performance", not "Sign up" or "Join waitlist".
- **Helper text stays deadpan.** "No spam. No vague wellness emails."
- **Success confirms enrollment.** "You are enrolled for trial notification."
- **Placeholder reinforces the frame.** `patient@example.com`.

Pair with copy that frames scarcity as trial capacity: *"Cohort 001 is limited to 500 participants. Participation begins with your email address."*

```jsx
<WaitlistForm
  buttonLabel="Improve my performance"
  source="storefront"
  onSubmit={async (email) => { await enroll(email); }}
/>
```

Sits on `tone="blue"` enrollment panels, where its red submit button and hard offset shadow carry the section.
