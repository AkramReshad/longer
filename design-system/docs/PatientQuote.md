---
category: Evidence
---

# PatientQuote

The full-bleed patient testimonial. One per page, given its own screen.

The quote is set at display scale so the reader has nowhere else to look. The comedy comes from the seriousness of the presentation, not from the line trying to be funny.

## Writing the quote

Testimonials report an outcome with total sincerity and no self-awareness:

- "The maid of honor, two bridesmaids, and a waitress. All thanks to Longer."
- "My wife used to laugh, now she's the one tapping out."

Attribution should be vague and faintly institutional — `— Best man, hydration history unknown`, `— Flacyd Johnson, cohort`. Named-with-credentials reads as a real endorsement and breaks the bit; anonymous-with-role keeps it in the pharmaceutical register.

Keep quotes short. At display scale, anything past ~15 words stops being a monument and becomes a paragraph.

```jsx
<PatientQuote
  label="Patient-reported outcome"
  quote="The maid of honor, two bridesmaids, and a waitress. All thanks to Longer."
  attribution="— Best man, hydration history unknown"
/>
```
