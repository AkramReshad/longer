# Longer page patterns

How the components assemble into the surfaces Longer actually ships.

## The storefront sequence

The canonical long-form page, in order. Each step alternates surface tone so the page reads like a printed leaflet rather than a scroll:

| # | Section | Tone | Components |
|---|---|---|---|
| 1 | Header | `white` | `Wordmark`, `FinePrint`, `Button` (secondary) |
| 2 | Hero | `paper` | `Overline`, `SectionHeading`, `Button` ×2, `FinePrint`, `RxSeal`, `VerticalIndex` |
| 3 | Safety bar | — | `SafetyAlert` |
| 4 | Self-assessment | `deep` | `SectionHeading`, `SymptomChecklist` |
| 5 | Product panel | `blue` | `Overline`, `SectionHeading`, `SpecList`, `VerticalIndex` |
| 6 | Trial evidence | `deep` | `SectionHeading`, `PullQuote`, `StatBlock` |
| 7 | Side effects | `paper` | `SectionHeading` (danger), `Marquee` |
| 8 | Treatment line-up | `white` | `SectionHeading`, `TreatmentCard` ×3 |
| 9 | Prescribing info | — | `PrescribingInsert` |
| 10 | Testimonial | `white` | `PatientQuote` |
| 11 | Enrollment | `blue` | `SectionHeading`, `WaitlistForm` |
| 12 | Footer | `white` | `Wordmark`, `FinePrint` |

Never run three consecutive sections in the same tone. The blue product panel and the deep self-assessment are the two anchors — everything else is paper or white between them.

## Rules that hold everywhere

- **One `SafetyAlert` per screen.** A second reads as decoration.
- **One `RxSeal` per screen.** It certifies a surface; repetition kills it.
- **One `primary` Button per section**, paired with one `secondary`.
- **Serif for anything large, sans for anything small.** No exceptions — that split is the entire typographic system.
- **Square corners.** `--lngr-radius` is `0` and should stay `0`.
- **Red is regulatory.** Warnings, adverse reactions, form ticks, and the enrollment submit. Never decorative.

## Landing page (short form)

For paid-traffic and TikTok landing pages, compress to five sections:

Hero → `SafetyAlert` → `SymptomChecklist` → `StatBlock` or `PatientQuote` → `WaitlistForm`.

Keep `PrescribingInsert` off short pages. It rewards a scroll that a landing page does not earn, and it dilutes when skimmed.

## Writing occasions

Longer's use cases are physical and specific. Anchor copy to one of these rather than to a generic "lifestyle":

mile 20 · pregame · hangover · heat · cramps · gym · festival · long day · wedding · night shift

A section that names an occasion outperforms one that names a benefit.
