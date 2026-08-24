export type SafetyAlertProps = {
  /** Leading uppercase label. Defaults to `Important safety information`. */
  readonly label?: string;
  /** The statement itself, set large in the serif. */
  readonly statement: string;
  /** Trailing uppercase note, right-aligned. */
  readonly note?: string;
  /** `red` for warnings, `blue` for neutral regulatory notices. */
  readonly tone?: 'red' | 'blue';
  readonly className?: string;
};

/**
 * The full-bleed regulatory alert bar.
 *
 * Sits directly beneath the hero and between major sections, interrupting the
 * page the way a boxed warning interrupts a leaflet. One per screen — a second
 * bar reads as decoration and kills the effect.
 */
export function SafetyAlert({
  label = 'Important safety information',
  statement,
  note,
  tone = 'red',
  className
}: SafetyAlertProps) {
  const classes = [
    'lngr-alert',
    tone === 'blue' ? 'lngr-alert--blue' : null,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="note">
      <span className="lngr-alert__label">{label}</span>
      <strong className="lngr-alert__statement">{statement}</strong>
      <span className="lngr-alert__note">{note}</span>
    </div>
  );
}
