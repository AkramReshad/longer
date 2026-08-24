---
category: Regulatory
---

# SpecList

The dosing and administration table. Rules inherit `currentColor`, so it sits on blue, paper, or near-black without configuration.

## Writing specs

Keep terms clinical and values specific. A real onset time earns the joke that follows it — the pattern is three straight rows, then one that lands:

| Route | Oral hydration |
|---|---|
| Flavor | Blue raspberry |
| Onset | 30 minutes before physical activity |
| Duration | Long enough to become someone else's problem |

Standard terms: `Route`, `Flavor`, `Onset`, `Duration`, `Strength`, `Storage`, `Supply`.

```jsx
<SpecList items={specs} />
```
