import type { ReactNode } from 'react';

export type SectionHeadingProps = {
  /** Small uppercase label above the title — a form or section code. */
  readonly eyebrow?: string;
  /** The headline, set large in the serif. */
  readonly title: ReactNode;
  /** Short uppercase note in the trailing column — an instruction. */
  readonly note?: string;
  /** Stack the three parts instead of laying them across a wide grid. */
  readonly stacked?: boolean;
  /** `danger` turns the eyebrow red for adverse-reaction sections. */
  readonly tone?: 'default' | 'danger';
  readonly className?: string;
};

/**
 * The three-part section opener: eyebrow, serif headline, trailing note.
 *
 * The headline should be a direct question or a flat clinical statement —
 * "Is Electrolyte Dysfunction affecting you?" — never a benefit claim.
 */
export function SectionHeading({
  eyebrow,
  title,
  note,
  stacked = false,
  tone = 'default',
  className
}: SectionHeadingProps) {
  const classes = [
    'lngr-heading',
    stacked ? 'lngr-heading--stacked' : null,
    tone === 'danger' ? 'lngr-heading--danger' : null,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes}>
      <p className="lngr-heading__eyebrow">{eyebrow}</p>
      <h2 className="lngr-heading__title">{title}</h2>
      <p className="lngr-heading__note">{note}</p>
    </header>
  );
}
