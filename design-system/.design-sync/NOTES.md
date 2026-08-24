# design-sync notes — @longer/ds

## Repo facts

- The DS package is `design-system/` at the repo root. It is **not** the Next.js
  storefront in `store/` — that app is a consumer, not the library. Run every
  design-sync command with `design-system/` as cwd.
- Build is `pnpm build` = `tsc -p tsconfig.build.json && node scripts/build-css.mjs`.
  The CSS step concatenates `src/{tokens,fonts,base,components}.css` into
  `dist/longer-ds.css`, emits `dist/tokens.css` separately for `tokensGlob`, and
  copies Instrument Serif into `dist/fonts/`.
- Converter entry is `./dist/index.js`; `--node-modules ./node_modules`.

## Provenance

- Components were extracted from the shipped storefront's `bold-*` system
  (`store/app/bold-storefront.css` + `store/components/StorefrontPage.tsx`),
  rewritten as standalone primitives rather than page sections.
- **One canonical blue.** The storefront carried two near-identical blues:
  `--blue #0057b8` (the logo) and `--bold-blue #005bbb` (the storefront sheet).
  The DS standardises on the logo blue `#0057b8` as `--lngr-blue`. If Ace wants
  the storefront value back, it is a one-token edit in `src/tokens.css`.
- **`Wordmark` is typographic, not the SVG.** `brand/logos/logo/horizontal_blue.svg`
  is 126KB because it embeds Instrument Serif as base64. Since the DS ships that
  font, the wordmark renders as live text instead. Visually equivalent **provided
  the logo has no custom lettering** — unconfirmed with Ace as of this sync.
- The sans face is a system stack, not Geist. The storefront loads Geist via
  `next/font/google`; shipping it was not possible from repo assets and naming it
  in the CSS would trip `[FONT_MISSING]`. Longer's distinctive face is the serif.

## Render verification (important)

- **Playwright is not installed and Ace declined the ~200MB download.** Validate
  is run with `--no-render-check`, which prints a `[RENDER_SKIPPED]` warning —
  that warning is expected, not new.
- Previews are verified instead with the repo's `browser-use` CLI against a local
  `http-serve.mjs` of `ds-bundle/`. All 18 were screenshotted and reviewed.
- **`browser-use screenshot --url` reuses an already-open page and will silently
  serve a stale render after a rebuild.** Always `browser-use clean longer` and
  append a cache-busting query (`?v=N`) after rebuilding, or you will grade the
  previous build. This cost one full review cycle on the first pass.
- Screenshot `--output` paths resolve against the workspace root in
  `.context-tools.toml` (`store/`), not cwd. Pass absolute paths.

## Known render warns

- **`Marquee`** — screenshots catch the CSS animation mid-loop, so the leading
  phrase appears clipped at the left edge. The track is duplicated and the loop is
  seamless; it animates correctly in the DS pane. Not a defect.

## Fixes applied this sync

- Full-bleed components need `cardMode: "column"` or they wrap and clip inside the
  preview grid. Currently set for: SafetyAlert, SectionHeading, SymptomChecklist,
  PrescribingInsert, PatientQuote, StatBlock, Marquee, LongerProvider,
  TreatmentCard, WaitlistForm.
- `RxSeal` caption overflowed the inner ring. Every dimension now derives from
  `--lngr-seal-size` so the seal scales as one object.
- `VerticalIndex` labels wrapped mid-SKU. Added `white-space: nowrap`.

## Storefront integration (2026-08-23)

`store/` now consumes `@longer/ds` and `components/StorefrontPage.tsx` is built
from DS components. Repo is a pnpm workspace: root `package.json` +
`pnpm-workspace.yaml` (design-system, store), single lockfile at the root.

Landmines hit during that migration, all fixed — read before touching it again:

- **Class-name collision.** `store/app/globals.css` already owns a
  `.storefront-*` namespace (37 classes incl. `-hero`, `-diagnosis`, `-product`,
  `-header`, `-footer`). The page stylesheet was renamed to `.leaflet-*` and
  lives in `store/app/leaflet.css`. **Do not reintroduce `.storefront-*`** —
  globals.css loads after the DS, so its `background` silently beat
  `.lngr-tone-blue` and the Blue Pill panel rendered white.
- **`typescript: "latest"`.** store's devDeps pinned `latest`, which re-resolved
  to **TypeScript 7.0.2** the moment the old `store/pnpm-lock.yaml` was removed.
  Next 16 cannot use TS 7 — `next build` died with `The "id" argument must be of
  type string`. Now pinned `^5.9.3`. `@types/*` are still `latest` and are the
  same class of landmine.
- **Secondary Button lost its underline as a link.** `.lngr-root a` (0,1,1)
  out-specified `.lngr-btn--secondary` (0,1,0). Fixed with the doubled class
  `.lngr-btn.lngr-btn--secondary`. Previews missed it because every Button
  export rendered `<button>`; `previews/Button.tsx` now has an `AsLinks` export
  that guards it.
- **The logo is a lockup, not type.** `horizontal_blue.svg` carries a figure
  mark, `LONGER`, and an `ELECTROLYTE DYSFUNCTION` descriptor. `Wordmark` gained
  an optional `src` prop; the store passes the real asset. The typographic form
  is the fallback for surfaces that cannot serve a file (the DS previews).

- **The store serves Geist; the DS defaults to a system stack.** `store/app/globals.css`
  repoints `--lngr-font-sans` at `var(--font-geist)`. Without that override the
  storefront silently renders body copy in system-ui — it did exactly that for one
  build before it was caught. The serif is not overridden: the DS ships Instrument
  Serif itself, so `next/font`'s copy was removed to avoid loading it twice.

## Re-sync risks

- `guidelinesGlob` is `guides/**/*.md`. It was originally unset, which defaulted to
  `docs/*.md` and duplicated all 18 per-component docs into `guidelines/`. Don't
  drop that key.
- `docs/<Name>.md` frontmatter `category:` drives the DS pane grouping (Foundations,
  Brand, Typography, Actions, Regulatory, Evidence, Commerce). Adding a component
  without frontmatter silently drops it into `general`.
- The copy inside `docs/` and `.design-sync/previews/` is brand-canonical, not
  filler. It is what teaches the design agent Longer's voice. Review copy edits the
  way you'd review the storefront.
- `store/` renders DS components; a breaking DS change now breaks the live
  storefront. Run `pnpm build` at the repo root (builds DS then store) before
  uploading a DS change, and re-screenshot `/` — see the browser-use notes above.
- `.design-sync/conventions.md` cites specific token and class names. If tokens are
  renamed in `src/tokens.css`, re-validate those names against the fresh build
  before uploading — a header naming tokens that don't exist makes the agent emit
  silently unstyled output.
