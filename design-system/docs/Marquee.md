---
category: Evidence
---

# Marquee

The scrolling side-effects band. Runs the adverse-reaction list past the reader at display scale, separated by red bullets.

The track is duplicated internally so the loop is seamless, and the animation is disabled under `prefers-reduced-motion`.

## Writing effects

Phrase every item as a clinical outcome that happens to be desirable. Never as a joke about side effects:

`INCREASED STAMINA` · `EXTENDED PERFORMANCE` · `IMPROVED CONFIDENCE` · `HARDER EFFORTS` · `ANOTHER ROUND` · `BETTER FINISHES`

The inversion is the whole joke — a real drug ad scrolls its risks, Longer scrolls its benefits in exactly the same tone. Six items is a good loop.

Pair with a `SectionHeading` using `tone="danger"` and the eyebrow `Adverse reactions`.

```jsx
<SectionHeading tone="danger" eyebrow="Adverse reactions" title="Possible side effects include:" />
<Marquee items={effects} duration={32} />
```
