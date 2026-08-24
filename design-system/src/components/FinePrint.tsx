import type { ReactNode } from 'react';

export type FinePrintProps = {
  readonly children?: ReactNode;
  /** Centre the text — the usual treatment in a page footer. */
  readonly centered?: boolean;
  readonly className?: string;
};

/**
 * Small-set legal and disclaimer copy.
 *
 * The line that closes a page or sits beneath a hero action. Set small and
 * low-contrast on purpose: it should look like something nobody reads, which
 * is exactly why it is worth reading.
 */
export function FinePrint({
  children,
  centered = false,
  className
}: FinePrintProps) {
  const classes = [
    'lngr-fineprint',
    centered ? 'lngr-fineprint--centered' : null,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return <p className={classes}>{children}</p>;
}
