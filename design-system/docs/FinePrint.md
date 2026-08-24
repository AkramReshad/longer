---
category: Typography
---

# FinePrint

Small-set legal and disclaimer copy — the line that closes a page or sits beneath a hero action.

Set small and low-contrast on purpose: it should look like something nobody reads, which is exactly why it is worth reading.

```jsx
<FinePrint centered>
  This statement has not been evaluated by the Food and Drug Administration.
  This product is not intended to diagnose, treat, cure, or prevent any disease.
</FinePrint>
```

Two registers work here — the genuine disclaimer above, and the in-world one:

> For sexual, athletic, and social performance. Individual stamina may vary.

Keep them in separate `FinePrint` blocks; mixing real regulatory language with the bit inside one paragraph muddies both.
