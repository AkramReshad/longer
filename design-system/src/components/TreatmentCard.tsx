export type TreatmentCardProps = {
  /** SKU code, e.g. `LNG-01`. */
  readonly code: string;
  /** Product name, e.g. `Blue Pill`, `Watermelonafil`. */
  readonly name: string;
  /** Regulatory-sounding status, e.g. `First-line option`. */
  readonly status?: string;
  /** Product image. Omit and a clinical plinth stands in. */
  readonly image?: string;
  /** Alt text for the product image. */
  readonly imageAlt?: string;
  /** Footer note, e.g. `INITIAL THERAPY`. */
  readonly note?: string;
  /** Mark as the lead SKU — draws the blue rule across the top edge. */
  readonly primary?: boolean;
  readonly className?: string;
};

/**
 * A single treatment option in the SKU line-up.
 *
 * Named and coded like a prescription product, so a flavour range reads as a
 * course of treatment. Lay three across a bordered grid; mark exactly one
 * `primary`.
 */
export function TreatmentCard({
  code,
  name,
  status,
  image,
  imageAlt,
  note,
  primary = false,
  className
}: TreatmentCardProps) {
  const classes = [
    'lngr-treatment',
    primary ? 'lngr-treatment--primary' : null,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classes}>
      <div className="lngr-treatment__meta">
        <span>{code}</span>
        <span>{status}</span>
      </div>

      {image ? (
        <img className="lngr-treatment__image" src={image} alt={imageAlt ?? name} />
      ) : (
        <div className="lngr-treatment__plinth" aria-hidden="true" />
      )}

      <h3 className="lngr-treatment__name">{name}</h3>
      {note ? <small className="lngr-treatment__note">{note}</small> : null}
    </article>
  );
}
