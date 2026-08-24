export type WordmarkProps = {
  /** The brand name. Defaults to `Longer`. */
  readonly children?: string;
  /** Render in white for blue and near-black surfaces. */
  readonly inverse?: boolean;
  /** Any CSS length. Sets the wordmark's cap height. Defaults to `3.4rem`. */
  readonly size?: string;
  /** Show the trademark mark after the name. */
  readonly trademark?: boolean;
  /**
   * Render the brand lockup asset instead of type. Use when the host app can
   * serve the logo file and the full lockup (mark + descriptor) is wanted.
   */
  readonly src?: string;
  readonly className?: string;
};

/**
 * The Longer wordmark.
 *
 * Set in Instrument Serif by default, so it scales cleanly and inverts with a
 * colour change without shipping an asset. The brand's real logo is a lockup
 * (figure mark + word + descriptor) — pass `src` to render it wherever the host
 * app can serve the file.
 */
export function Wordmark({
  children = 'Longer',
  inverse = false,
  size,
  trademark = false,
  src,
  className
}: WordmarkProps) {
  const classes = [
    'lngr-wordmark',
    inverse ? 'lngr-wordmark--inverse' : null,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const label = `${children} — Electrolyte Dysfunction`;

  if (src !== undefined) {
    return (
      <span className={classes} aria-label={label} role="img">
        <img className="lngr-wordmark__image" src={src} alt="" />
      </span>
    );
  }

  return (
    <span
      className={classes}
      style={size ? { ['--lngr-wordmark-size' as string]: size } : undefined}
      aria-label={label}
    >
      {children}
      {trademark ? (
        <span className="lngr-wordmark__tm" aria-hidden="true">
          ™
        </span>
      ) : null}
    </span>
  );
}
