---
category: Actions
---

# Button

The Longer action. Square, uppercase, and heavy — a form-submission control, never a soft consumer CTA.

## Variants

| Variant | Form | Use |
|---|---|---|
| `primary` | Solid blue, uppercase, square | The enrollment action |
| `secondary` | Serif underline, no box | A leaflet cross-reference |
| `danger` | Solid red | Submit on blue enrollment panels |

**Pair one `primary` with one `secondary` per section.** `secondary` is deliberately not a box — two competing boxes flattens the hierarchy and reads like a generic SaaS hero.

## Writing labels

Primary labels are clinical invitations, not commands:

- "See if Longer is right for you"
- "Review treatment options"
- "Improve my performance"

Avoid "Shop now", "Get started", "Learn more".

```jsx
<Button variant="primary" href="#enrollment">See if Longer is right for you</Button>
<Button variant="secondary" href="#diagnosis">See how Electrolyte Dysfunction affects you.</Button>
```

Set `trailing` for the glyph — `→` on forms, `↓` on in-page jumps.
