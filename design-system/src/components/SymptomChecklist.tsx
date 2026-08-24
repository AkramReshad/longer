export type Symptom = {
  /** Two-digit index, e.g. `01`. */
  readonly index: string;
  /** The symptom, in the patient's language. */
  readonly title: string;
  /** One flat sentence describing it. */
  readonly copy: string;
  /** Draw the tick. Hovering a row previews the same state. */
  readonly checked?: boolean;
};

export type SymptomChecklistProps = {
  readonly items: readonly Symptom[];
  /** Use on light surfaces. Defaults to the dark-surface rules. */
  readonly light?: boolean;
  readonly className?: string;
};

/**
 * The self-assessment checklist.
 *
 * Rows invert on hover and stamp an off-register red tick, so the reader
 * diagnoses themselves by moving down the list. Copy is straight-faced: the
 * symptom does the work, never a punchline.
 */
export function SymptomChecklist({
  items,
  light = false,
  className
}: SymptomChecklistProps) {
  const classes = [
    'lngr-symptoms',
    light ? 'lngr-symptoms--light' : null,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {items.map((item) => (
        <article
          key={item.title}
          className={`lngr-symptom${item.checked ? ' lngr-symptom--checked' : ''}`}
        >
          <span className="lngr-symptom__index">{item.index}</span>
          <div className="lngr-symptom__box" aria-hidden="true" />
          <h3 className="lngr-symptom__title">{item.title}</h3>
          <p className="lngr-symptom__copy">{item.copy}</p>
        </article>
      ))}
    </div>
  );
}
