---
category: Typography
---

# SectionHeading

The three-part section opener: eyebrow, serif headline, trailing note.

## Writing headlines

The headline should be a **direct question or a flat clinical statement** — never a benefit claim:

- "Is Electrolyte Dysfunction affecting you?"
- "Ask your trainer which option is right for you."
- "When the moment comes, how long will you last?"
- "Possible side effects include:"

Not: "Hydrate smarter", "Fuel your performance", "Electrolytes that work as hard as you do".

The eyebrow carries filing language — `Self-assessment / Form ED-04`, `Treatment selection / Form LNG-RX`, `Adverse reactions`. The trailing note is a short instruction: `Check all that apply.`

Set `tone="danger"` to turn the eyebrow red for adverse-reaction sections. Use `stacked` in narrow columns.

```jsx
<SectionHeading
  eyebrow="Self-assessment / Form ED-04"
  title="Is Electrolyte Dysfunction affecting you?"
  note="Check all that apply."
/>
```
