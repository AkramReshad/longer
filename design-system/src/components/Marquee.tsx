export type MarqueeProps = {
  /** The phrases to scroll. Rendered uppercase and separated by a red bullet. */
  readonly items: readonly string[];
  /** Seconds for one full pass. Defaults to `32`. */
  readonly duration?: number;
  /** The separator glyph. Defaults to `•`. */
  readonly separator?: string;
  readonly className?: string;
};

/**
 * The scrolling side-effects band.
 *
 * Runs the adverse-reaction list past the reader at display scale. The track is
 * duplicated so the loop is seamless, and the animation is disabled under
 * `prefers-reduced-motion`.
 *
 * Effects should be phrased as clinical outcomes that happen to be desirable —
 * "INCREASED STAMINA", "BETTER FINISHES" — never as jokes about side effects.
 */
export function Marquee({
  items,
  duration = 32,
  separator = '•',
  className
}: MarqueeProps) {
  const classes = ['lngr-marquee', className].filter(Boolean).join(' ');
  const track = [...items, ...items];

  return (
    <div
      className={classes}
      aria-hidden="true"
      style={{ ['--lngr-marquee-duration' as string]: `${duration}s` }}
    >
      <div className="lngr-marquee__track">
        {track.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i className="lngr-marquee__sep"> {separator} </i>
          </span>
        ))}
      </div>
    </div>
  );
}
