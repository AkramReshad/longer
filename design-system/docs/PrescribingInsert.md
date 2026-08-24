---
category: Regulatory
---

# PrescribingInsert

The full prescribing information leaflet — the densest surface in the system and the one that sells the premise.

Real leaflet structure, real section headings, real typographic hierarchy, with the content doing the work. Set in long stretches of small serif so the reader feels the obligation to skim it.

**Never break register here.** This panel is where the joke is load-bearing: every line must read as though a regulator approved it.

## Section headings

Use the genuine leaflet vocabulary, in this order where possible:

`Indications and usage` · `Dosage and administration` · `Warnings and precautions` · `Drug interactions` · `Adverse reactions` · `Patient counseling`

Sections flow across three columns automatically.

## Writing the bodies

Each body is 1–2 flat clinical sentences. The comedy comes from specificity delivered without inflection:

> **Dosage and administration** — Mix one stick pack with 16–24 fl oz of water. Take approximately 30 minutes before activity. Maintain eye contact.

> **Drug interactions** — Longer may interact with poor judgment, direct sunlight, loud music, and the belief that tomorrow is someone else's problem.

Land the absurdity in the last clause, after the sentence has established its clinical footing.

```jsx
<PrescribingInsert
  title="Longer™"
  deck="For men experiencing a lack of performance."
  sections={sections}
  notice="For oral hydration only. Not for parenteral use. Not for the emotionally unavailable."
  code="LNG-PI-001 / REV 07.26"
/>
```
