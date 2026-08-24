import type { ReactNode } from 'react';

export type LongerProviderProps = {
  /** The composition to render inside the Longer surface. */
  readonly children?: ReactNode;
  /** Base surface tone. Defaults to `paper`. */
  readonly tone?: 'paper' | 'white' | 'blue' | 'deep';
  /** Extra class names appended to the root element. */
  readonly className?: string;
};

/**
 * Root wrapper for every Longer composition.
 *
 * Establishes the surface tone, the typographic defaults, and the box-sizing
 * reset the rest of the system assumes. Wrap the whole page in it once —
 * components rendered outside it inherit the host page's fonts and will not
 * look like Longer.
 */
export function LongerProvider({
  children,
  tone = 'paper',
  className
}: LongerProviderProps) {
  const classes = ['lngr-root', `lngr-tone-${tone}`, className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
}
