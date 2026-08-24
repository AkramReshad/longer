---
category: Evidence
---

# StatBlock

The trial-data panel. Figures presented with total confidence and no source.

## Writing figures

Fractions carry the clinical register better than percentages — `3/4` reads as trial data, `75%` reads as marketing.

**One figure in the set should be quietly impossible.** That's the tell that rewards a second look, and it must never be flagged:

- **3/4** — Americans suffer from Electrolyte Dysfunction
- **5/4** — Women agree that finishing matters
- **01** — Packet administered before the relationship deteriorated

Labels stay flat and clinical. Three figures is the standard set.

```jsx
<StatBlock items={stats} />
```

Use `plain` to drop the tinted panel and inherit the surface.
