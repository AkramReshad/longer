export type PullQuoteProps = {
  /** The quoted line. */
  readonly quote: string;
  /** Attribution, set uppercase in the sans. */
  readonly cite?: string;
  readonly className?: string;
};

/**
 * The inline rule-marked quote.
 *
 * The quieter counterpart to `PatientQuote` — sits inside a section beside
 * other copy rather than taking a screen of its own. Its rule inherits
 * `currentColor`, so it works on any surface.
 */
export function PullQuote({ quote, cite, className }: PullQuoteProps) {
  const classes = ['lngr-pullquote', className].filter(Boolean).join(' ');

  return (
    <figure className={classes}>
      <blockquote className="lngr-pullquote__body">{quote}</blockquote>
      {cite ? <cite className="lngr-pullquote__cite">{cite}</cite> : null}
    </figure>
  );
}
