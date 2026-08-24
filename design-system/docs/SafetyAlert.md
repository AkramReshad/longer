---
category: Regulatory
---

# SafetyAlert

The full-bleed regulatory alert bar. Sits directly beneath the hero and between major sections, interrupting the page the way a boxed warning interrupts a leaflet.

**One per screen.** A second bar reads as decoration and kills the effect.

## Writing the statement

The statement is the payload. It must read as a genuine boxed warning and land as innuendo without ever winking:

- "If performance lasts longer than four hours, call your doctor."
- "Do not operate heavy machinery while adequately hydrated."
- "Discontinue use if confidence becomes medically significant."

Never explain it. Never soften it into a benefit claim ("stay hydrated longer!"), and never add wink language.

The `label` and `note` carry the regulatory scaffolding — `Important safety information`, `Scroll for full prescribing information` — which is what makes the centre statement believable.

```jsx
<SafetyAlert
  label="Important safety information"
  statement="If performance lasts longer than four hours, call your doctor."
  note="Scroll for full prescribing information"
/>
```

Use `tone="blue"` for neutral notices; red is reserved for warnings.
