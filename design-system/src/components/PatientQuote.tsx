export type PatientQuoteProps = {
  /** Uppercase label. Defaults to `Patient-reported outcome`. */
  readonly label?: string;
  /** The testimonial. Set enormous — this is a full-screen moment. */
  readonly quote: string;
  /** Attribution. Vague credentials land better than named ones. */
  readonly attribution?: string;
  readonly className?: string;
};

/**
 * The full-bleed patient testimonial.
 *
 * One per page, given its own screen. The quote is set at display scale so the
 * reader has nowhere else to look — the comedy comes from the seriousness of
 * the presentation, not from the line trying to be funny.
 */
export function PatientQuote({
  label = 'Patient-reported outcome',
  quote,
  attribution,
  className
}: PatientQuoteProps) {
  const classes = ['lngr-quote', className].filter(Boolean).join(' ');

  return (
    <section className={classes} aria-label="Patient testimonial">
      <p className="lngr-quote__label">{label}</p>
      <blockquote className="lngr-quote__body">{quote}</blockquote>
      {attribution ? (
        <cite className="lngr-quote__attribution">{attribution}</cite>
      ) : null}
    </section>
  );
}
