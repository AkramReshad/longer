## Building with Longer

Longer is an electrolyte powder that dresses as prescription medication. Every
surface must read as a real pharmaceutical document that happens to be selling
hydration. Build clinical, not cute — the design never admits it is joking.

### Wrapping (required)

Every composition must be wrapped in `LongerProvider`. It sets the surface
tone, the typographic defaults, and the box-sizing reset the rest of the system
assumes. **Components rendered outside it inherit the host page's fonts and
render unstyled** — this is the single most common way a Longer design goes
wrong.

```jsx
<LongerProvider tone="blue">
  <Overline symbol="Rx">Introducing LNG-01</Overline>
  <SectionHeading stacked title="Blue Pill." />
  <SpecList items={[{ term: 'Route', value: 'Oral hydration' }]} />
</LongerProvider>
```

Four tones set the ground: `paper` (default warm off-white), `white`, `blue`
(brand blue, white text), `deep` (near-black navy, white text). Sections
alternate the way a printed leaflet alternates panels — never run three
consecutive sections in the same tone. Applied as `.lngr-tone-paper`,
`.lngr-tone-white`, `.lngr-tone-blue`, `.lngr-tone-deep` on the root.

### Styling idiom: tokens, not utility classes

There is **no utility-class vocabulary**. Components style themselves; you style
your own layout glue with CSS custom properties. Reach for `var(--lngr-*)` and
never invent a hex value — the palette is small on purpose.

| Family | Tokens |
|---|---|
| Blues | `--lngr-blue` `--lngr-blue-deep` `--lngr-blue-black` `--lngr-blue-tint` `--lngr-sky` |
| Grounds | `--lngr-paper` `--lngr-white` `--lngr-ink` `--lngr-insert` |
| Regulatory red | `--lngr-red` `--lngr-red-deep` |
| Rules | `--lngr-line` `--lngr-line-soft` `--lngr-line-invert` `--lngr-hairline` |
| Type faces | `--lngr-font-serif` `--lngr-font-sans` |
| Display scale | `--lngr-display-xl` `--lngr-display-lg` `--lngr-display-md` `--lngr-display-sm` |
| Text scale | `--lngr-text-lg` `--lngr-text-md` `--lngr-text-sm` `--lngr-label` `--lngr-fineprint` |
| Space | `--lngr-space-1` … `--lngr-space-7` |
| Motion | `--lngr-ease` `--lngr-fast` `--lngr-slow` |

Three rules hold everywhere:

- **Serif for anything large, sans for anything small.** `--lngr-font-serif`
  (Instrument Serif) carries headlines, doses, figures, and quotes;
  `--lngr-font-sans` carries labels, eyebrows, and fine print. That split is the
  entire typographic system.
- **Square corners.** `--lngr-radius` is `0`. Keep it `0` — clinical packaging
  does not round.
- **Red is regulatory.** Warnings, adverse reactions, form ticks, and the
  enrollment submit. Never decorative.

### Composition rules

One `SafetyAlert` per screen. One `RxSeal` per screen. One `primary` Button per
section, paired with one `secondary` (which is a serif underline, not a second
box). `PrescribingInsert` is the densest surface and belongs on long pages only.

### Where the truth lives

- `_ds/<folder>/styles.css` and its `@import` closure — this is the whole
  styling truth: the token definitions, the Instrument Serif `@font-face`, and
  every component rule. Read it before styling. Tokens are defined at the top of
  `_ds_bundle.css`, which `styles.css` imports.
- `components/<group>/<Name>/<Name>.prompt.md` — per-component usage, including
  how to write the copy for that component. The copy guidance is not optional
  flavour; it is what keeps the brand's premise intact.
- `guidelines/page-patterns.md` — the canonical section order for a full
  storefront and for short-form landing pages.

### Voice

Write like a pharmaceutical ad that got cursed into selling electrolytes.
Clinical seriousness, medical-ad cadence, plausible dosing language, straight-
faced innuendo, specific physical occasions (mile 20, pregame, hangover, heat,
cramps). Never explain the joke, never use wink language, and never fall back to
generic CPG copy like "hydrate smarter" or "fuel your lifestyle".
