export type InsertSection = {
  /** Section heading — `Indications and usage`, `Drug interactions`. */
  readonly term: string;
  /** The body copy, set in the serif at leaflet size. */
  readonly body: string;
};

export type PrescribingInsertProps = {
  /** Product name. Defaults to `Longer™`. */
  readonly title?: string;
  /** Italic serif line under the title. */
  readonly deck?: string;
  /** Vertical text on the left spine. */
  readonly spine?: string;
  /** Leaflet sections, laid out across columns. */
  readonly sections: readonly InsertSection[];
  /** Boxed notice in the blue panel. */
  readonly notice?: string;
  /** Document code, e.g. `LNG-PI-001 / REV 07.26`. */
  readonly code?: string;
  readonly className?: string;
};

/**
 * The full prescribing information leaflet.
 *
 * The densest surface in the system and the one that sells the premise: real
 * leaflet structure, real section headings, real typographic hierarchy, with
 * the content doing the work. Set it in long stretches of small serif — the
 * reader should feel the obligation to skim it.
 *
 * Never break register here. This panel is where the joke is load-bearing, so
 * every line must read as though a regulator approved it.
 */
export function PrescribingInsert({
  title = 'Longer™',
  deck,
  spine = 'FULL PRESCRIBING INFORMATION',
  sections,
  notice,
  code,
  className
}: PrescribingInsertProps) {
  const classes = ['lngr-insert', className].filter(Boolean).join(' ');

  const columns: InsertSection[][] = [[], [], []];
  sections.forEach((section, index) => {
    const target = columns[index % 3];
    if (target) target.push(section);
  });

  return (
    <section className={classes}>
      <div className="lngr-insert__spine">{spine}</div>

      <div className="lngr-insert__main">
        <div className="lngr-insert__rx" aria-hidden="true">
          Rx
        </div>
        <h2 className="lngr-insert__title">{title}</h2>
        {deck ? <p className="lngr-insert__deck">{deck}</p> : null}

        <div className="lngr-insert__columns">
          {columns.map((column, index) => (
            <article className="lngr-insert__column" key={index}>
              {column.map((section) => (
                <div key={section.term}>
                  <h3 className="lngr-insert__term">{section.term}</h3>
                  <p className="lngr-insert__body">{section.body}</p>
                </div>
              ))}
            </article>
          ))}
        </div>
      </div>

      <aside className="lngr-insert__notice">
        <strong className="lngr-insert__notice-title">Important</strong>
        {notice ? <p className="lngr-insert__notice-body">{notice}</p> : null}
        {code ? <span className="lngr-insert__code">{code}</span> : null}
      </aside>
    </section>
  );
}
