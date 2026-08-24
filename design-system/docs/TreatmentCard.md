---
category: Commerce
---

# TreatmentCard

A single treatment option in the SKU line-up. Named and coded like a prescription product, so a flavour range reads as a course of treatment.

Lay three across a bordered grid. Mark exactly one `primary` — it draws the blue rule across the top edge.

## Naming SKUs

Every flavour gets a code and a pharmaceutical name. The code does the clinical work; the name carries the joke:

| Code | Name | Status |
|---|---|---|
| `LNG-01` | Blue Pill | First-line option |
| `LNG-02` | Watermelonafil | Extended release |
| `LNG-03` | PED Pineapple | Performance enhancing drink |

The `-afil` suffix (sildenafil, tadalafil) is the strongest device in the range — use it on at least one SKU.

Notes are uppercase trial language: `INITIAL THERAPY`, `UNDER CLINICAL REVIEW`.

```jsx
<TreatmentCard code="LNG-01" name="Blue Pill" status="First-line option" note="INITIAL THERAPY" primary />
```

Omit `image` and a clinical plinth stands in — use that until product photography exists.
