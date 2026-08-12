---
read_when: Read before creating, exporting, or placing the Longer logo in storefront, packaging, campaign, or partner materials.
last_updated: 2026-08-08
---

# Longer brand assets

## Approved logo system

The woman silhouette is the canonical Longer mark. Use only these configurations:

| Asset | Configuration | Primary use |
| --- | --- | --- |
| `logos/mark/blue.png` | Blue symbol | Avatars, app icons, small placements |
| `logos/mark/white.png` | White symbol | Dark or photographic backgrounds |
| `logos/logo/horizontal_blue.svg` | Blue horizontal logo | Website headers, email headers, wide placements |
| `logos/logo/horizontal_white.svg` | White horizontal logo | Dark or photographic backgrounds |
| `logos/logo/horizontal_white.png` | White horizontal logo, raster export | Applications without SVG support |
| `logos/logo/stacked_blue.png` | Blue stacked logo | Packaging fronts, social graphics, vertical placements |
| `logos/logo/stacked_white.png` | White stacked logo | Dark or photographic backgrounds |

Blue configurations use Pantone 2935 C, represented digitally as `#0057B8`. White configurations use `#FFFFFF`. Do not redraw the silhouette, substitute another color, alter the proportions, or reconstruct a logo from separate elements.

## Typography

`fonts/InstrumentSerif-Regular.ttf` is the canonical wordmark font source. The descriptor uses a bold grotesque sans-serif treatment with wide tracking, as fixed in the approved lockups.

## Storefront exports

The canonical assets live in `logos/logo/` and `logos/mark/`. `store/scripts/sync-brand-assets.mjs` copies all seven approved files into matching directories under `store/public/brand/` for deployment. Run from `store/`:

```sh
pnpm brand:sync
```

The storefront runs this automatically before development and production builds. `store/app/icon.png` and `store/app/apple-icon.png` are framework-required derivatives of the canonical mark.
