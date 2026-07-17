---
read_when: Read before creating, exporting, or placing the Longer logo in storefront, packaging, campaign, or partner materials.
last_updated: 2026-07-15
---

# Longer brand assets

## Approved logo system

The woman silhouette is the canonical Longer mark. Use only these configurations:

| Asset | Configuration | Primary use |
| --- | --- | --- |
| `logos/longer-mark.png` | Symbol | Avatars, app icons, small placements |
| `logos/longer-lockup-horizontal.svg` | Horizontal lockup | Website headers, email headers, wide placements |
| `logos/longer-lockup-stacked.png` | Stacked lockup | Packaging fronts, social graphics, vertical placements |

All configurations use Pantone 2935 C, represented digitally as `#0057B8`. Do not redraw the silhouette, substitute another blue, alter the proportions, or reconstruct a lockup from separate elements.

## Typography

`fonts/InstrumentSerif-Regular.ttf` is the canonical wordmark font source. The descriptor uses a bold grotesque sans-serif treatment with wide tracking, as fixed in the approved lockups.

## Storefront exports

The canonical assets live in this directory. `store/scripts/sync-brand-assets.mjs` copies the three approved files into `store/public/brand/` for deployment. Run from `store/`:

```sh
pnpm brand:sync
```

The storefront runs this automatically before development and production builds. `store/app/icon.png` and `store/app/apple-icon.png` are framework-required derivatives of the canonical mark.
