import type { ReactNode } from 'react';

export type OverlineProps = {
  /** Label text. Rendered uppercase. */
  readonly children?: ReactNode;
  /** Leading glyph set in the serif — conventionally `Rx`. */
  readonly symbol?: string;
  /** Colour treatment. `danger` is reserved for adverse-reaction sections. */
  readonly tone?: 'blue' | 'inverse' | 'danger';
  readonly className?: string;
};

/**
 * The small uppercase label that opens a section.
 *
 * Carries the leaflet's filing language — form numbers, issue numbers,
 * section codes — and optionally the serif `Rx` glyph that sets the
 * pharmaceutical register.
 */
export function Overline({
  children,
  symbol,
  tone = 'blue',
  className
}: OverlineProps) {
  const classes = [
    'lngr-overline',
    tone === 'blue' ? null : `lngr-overline--${tone}`,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <p className={classes}>
      {symbol ? (
        <span className="lngr-overline__symbol">{symbol}</span>
      ) : null}
      {children}
    </p>
  );
}
