---
category: Brand
---

# VerticalIndex

The sideways reference strip. Tiny uppercase filing data set vertically along a panel edge — SKU code, flavour, trial status.

Nobody is meant to read it comfortably. It exists to make the surface feel catalogued, the way a pharmaceutical carton carries batch data down its side.

```jsx
<VerticalIndex items={['LONGER / LNG-01', 'BLUE RASPBERRY', 'CLINICAL TRIAL PENDING']} />
```

Position it absolutely against a section edge. Use `inverse` on blue and near-black surfaces, and `horizontal` when it runs along a bottom edge instead.

Good entries: SKU codes, flavour names, `CLINICAL TRIAL PENDING`, `REV 07.26`, `LOT 001`.
