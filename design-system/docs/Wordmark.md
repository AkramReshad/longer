---
category: Brand
---

# Wordmark

The Longer wordmark, set in Instrument Serif.

Typographic by default, so it scales cleanly, inverts with a colour change, and stays crisp at any size without shipping an asset.

The brand's own logo is a **lockup**, not just the word: a figure mark, `LONGER`, and an `ELECTROLYTE DYSFUNCTION` descriptor. The type-only form is a fallback — prefer the real asset via `src` wherever the host app can serve it.

```jsx
<Wordmark size="4rem" />
<Wordmark inverse />          {/* on blue and near-black surfaces */}
<Wordmark trademark />        {/* adds ™ — use in leaflet contexts */}
```

When the host app can serve the logo file, pass `src` to render the full brand
lockup instead — the mark, the word, and the `ELECTROLYTE DYSFUNCTION`
descriptor. Use this in real product headers and footers; the typographic form
is the fallback for surfaces that cannot serve the asset.

```jsx
<Wordmark src="/brand/logo/horizontal_blue.svg" />
```

Header lockups pair the wordmark with a clinical one-liner: *"Clinical hydration. No prescription required."*

Never set the wordmark in the sans, never letterspace it, and never place it on a busy photographic area without a scrim.
