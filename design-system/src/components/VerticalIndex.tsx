export type VerticalIndexProps = {
  /** Reference strings — SKU codes, flavour, trial status. */
  readonly items: readonly string[];
  /** Run left-to-right instead of vertically. */
  readonly horizontal?: boolean;
  /** Render in white for blue and near-black surfaces. */
  readonly inverse?: boolean;
  readonly className?: string;
};

/**
 * The sideways reference strip.
 *
 * Tiny uppercase filing data set vertically along a panel edge — SKU code,
 * flavour, trial status. Nobody is meant to read it comfortably; it exists to
 * make the surface feel catalogued.
 */
export function VerticalIndex({
  items,
  horizontal = false,
  inverse = false,
  className
}: VerticalIndexProps) {
  const classes = [
    'lngr-vindex',
    horizontal ? 'lngr-vindex--horizontal' : null,
    inverse ? 'lngr-vindex--inverse' : null,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside className={classes} aria-label="Product reference">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </aside>
  );
}
