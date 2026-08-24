---
category: Evidence
---

# SymptomChecklist

The self-assessment checklist. Rows invert on hover and stamp an off-register red tick, so the reader diagnoses themselves by moving down the list.

This is the brand's primary conversion mechanic: recognition, not persuasion.

## Writing symptoms

Each row is a two-digit index, a symptom title in the patient's own language, and one flat sentence describing it. The title carries the double meaning; the copy stays clinical.

- **Finishing Early** — Losing stamina before you, your partner, or the occasion is satisfied.
- **Difficulty maintaining performance** — Starting strong, then going soft when conditions become demanding.
- **Failure to finish** — Plenty of initial enthusiasm. No convincing conclusion.
- **Waking up dry** — The morning-after symptom following prolonged... activities.

Copy is straight-faced: the symptom does the work, never a punchline. Four rows is the right length — six starts to feel like a list of jokes.

```jsx
<SymptomChecklist items={symptoms} />
```

Set `checked` on a row to draw the tick statically. Use `light` on paper and white surfaces; the default rules are tuned for `tone="deep"`.
