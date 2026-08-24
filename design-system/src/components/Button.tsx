import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = {
  readonly children?: ReactNode;
  /**
   * `primary` is the blue enrollment action. `secondary` is a serif
   * cross-reference, not a second box. `danger` is the red action used on
   * blue enrollment panels.
   */
  readonly variant?: 'primary' | 'secondary' | 'danger';
  /** Render as an anchor instead of a button. */
  readonly href?: string;
  /** Trailing glyph. Conventionally `→` on forms, `↓` on in-page jumps. */
  readonly trailing?: string;
  readonly disabled?: boolean;
  readonly type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  readonly onClick?: () => void;
  readonly className?: string;
};

/**
 * The Longer action.
 *
 * Square, uppercase, and heavy — a form-submission control, never a soft
 * consumer CTA. Pair one `primary` with one `secondary` per section.
 */
export function Button({
  children,
  variant = 'primary',
  href,
  trailing,
  disabled = false,
  type = 'button',
  onClick,
  className
}: ButtonProps) {
  const classes = ['lngr-btn', `lngr-btn--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {children}
      {trailing ? <span aria-hidden="true">{trailing}</span> : null}
    </>
  );

  if (href !== undefined) {
    return (
      <a className={classes} href={href}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
