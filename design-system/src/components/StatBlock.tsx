export type Stat = {
  /** The figure, set large in the serif. Fractions read as trial data. */
  readonly figure: string;
  /** What it measures, in one clinical line. */
  readonly label: string;
};

export type StatBlockProps = {
  readonly items: readonly Stat[];
  /** Drop the tinted panel and inherit the surface. */
  readonly plain?: boolean;
  readonly className?: string;
};

/**
 * The trial-data panel.
 *
 * Figures are presented with total confidence and no source. Fractions carry
 * the register better than percentages, and one figure in the set should be
 * quietly impossible.
 */
export function StatBlock({ items, plain = false, className }: StatBlockProps) {
  const classes = ['lngr-stats', plain ? 'lngr-stats--plain' : null, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {items.map((item) => (
        <div className="lngr-stat" key={item.label}>
          <strong className="lngr-stat__figure">{item.figure}</strong>
          <span className="lngr-stat__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
