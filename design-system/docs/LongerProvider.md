---
category: Foundations
---

# LongerProvider

Root wrapper for every Longer composition. Establishes surface tone, typographic defaults, and the box-sizing reset the rest of the system assumes.

**Wrap the whole page in it once.** Components rendered outside it inherit the host page's fonts and will not look like Longer.

## Tones

| Tone | Surface | Use for |
|---|---|---|
| `paper` (default) | Warm off-white `#f5f3ec` | Default page ground, side-effect sections |
| `white` | Pure white, blue text | Treatment line-ups, testimonial screens |
| `blue` | Longer blue, white text | Product panels, enrollment screens |
| `deep` | Near-black navy, white text | Self-assessment / diagnosis sections |

Sections alternate tones the way a printed leaflet alternates panels. Never run three of the same tone in a row.

```jsx
<LongerProvider tone="deep">
  <SectionHeading eyebrow="Self-assessment / Form ED-04" title="Is Electrolyte Dysfunction affecting you?" note="Check all that apply." />
  <SymptomChecklist items={symptoms} />
</LongerProvider>
```
