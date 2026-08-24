export type Spec = {
  /** Uppercase label — `Route`, `Flavor`, `Onset`, `Duration`. */
  readonly term: string;
  /** The value, set in the serif. */
  readonly value: string;
};

export type SpecListProps = {
  readonly items: readonly Spec[];
  readonly className?: string;
};

/**
 * The dosing and administration table.
 *
 * Rules inherit `currentColor`, so it sits on blue, paper, or near-black
 * without configuration. Keep terms clinical and values specific — a real
 * onset time earns the joke that follows it.
 */
export function SpecList({ items, className }: SpecListProps) {
  const classes = ['lngr-specs', className].filter(Boolean).join(' ');

  return (
    <dl className={classes}>
      {items.map((item) => (
        <div className="lngr-specs__row" key={item.term}>
          <dt className="lngr-specs__term">{item.term}</dt>
          <dd className="lngr-specs__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
