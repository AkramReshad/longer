export type RxSealProps = {
  /** The glyph at the centre. Defaults to `Rx`. */
  readonly symbol?: string;
  /** Small uppercase text beneath the glyph. */
  readonly caption?: string;
  /** Any CSS length. Defaults to `142px`. */
  readonly size?: string;
  /** Rotation, in degrees. A slight tilt reads as a stamp. Defaults to `8`. */
  readonly rotate?: number;
  /** Render in white for blue and near-black surfaces. */
  readonly inverse?: boolean;
  readonly className?: string;
};

/**
 * The double-ruled `Rx` stamp.
 *
 * A dispensing seal, applied over product photography or in the corner of a
 * panel. Deliberately off-axis — a stamp pressed by hand, not a logo.
 */
export function RxSeal({
  symbol = 'Rx',
  caption,
  size,
  rotate,
  inverse = false,
  className
}: RxSealProps) {
  const classes = [
    'lngr-rx-seal',
    inverse ? 'lngr-rx-seal--inverse' : null,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const style: Record<string, string> = {};
  if (size !== undefined) style['--lngr-seal-size'] = size;
  if (rotate !== undefined) style['--lngr-seal-rotate'] = `${rotate}deg`;

  return (
    <div className={classes} style={style}>
      <strong className="lngr-rx-seal__symbol">{symbol}</strong>
      {caption ? (
        <span className="lngr-rx-seal__caption">{caption}</span>
      ) : null}
    </div>
  );
}
