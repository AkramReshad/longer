'use client';

import { type FormEvent, useState } from 'react';
import { Button } from './Button';

export type WaitlistFormState = 'idle' | 'submitting' | 'success' | 'error';

export type WaitlistFormProps = {
  /** Submit button label. Phrase it as an outcome, e.g. `Improve my performance`. */
  readonly buttonLabel: string;
  /** Endpoint posted to when `onSubmit` is not supplied. */
  readonly action?: string;
  /** Tags the submission with the surface it came from. */
  readonly source?: string;
  /** Field label. Defaults to `Email address`. */
  readonly label?: string;
  /** Input placeholder. Defaults to `patient@example.com`. */
  readonly placeholder?: string;
  /** Resting helper text beneath the button. */
  readonly idleMessage?: string;
  /** Confirmation text after a successful submission. */
  readonly successMessage?: string;
  /** Submit handler. Overrides the default POST to `action`. Throw to fail. */
  readonly onSubmit?: (email: string) => Promise<void>;
  readonly className?: string;
};

/**
 * The trial-enrollment email capture.
 *
 * Framed as clinical enrollment rather than a newsletter signup — that framing
 * is the whole conversion mechanic, so keep the button an outcome and the
 * helper text deadpan.
 *
 * Carries a honeypot field and reports status through `aria-live`. Supply
 * `onSubmit` to wire it to your own handler, or leave it to POST
 * `{ email, website, source }` to `action`.
 */
export function WaitlistForm({
  buttonLabel,
  action = '/api/waitlist',
  source = 'site',
  label = 'Email address',
  placeholder = 'patient@example.com',
  idleMessage = 'No spam. No vague wellness emails.',
  successMessage = 'You are enrolled for trial notification.',
  onSubmit,
  className
}: WaitlistFormProps) {
  const [state, setState] = useState<WaitlistFormState>('idle');
  const [message, setMessage] = useState(idleMessage);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setState('submitting');
    setMessage('Submitting trial request…');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get('email') ?? '');

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        const response = await fetch(action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            website: formData.get('website'),
            source
          })
        });

        const body = (await response.json()) as { readonly message?: string };

        if (!response.ok) {
          throw new Error(body.message ?? 'Trial notification could not be recorded.');
        }
      }

      setState('success');
      setMessage(successMessage);
      form.reset();
    } catch (error) {
      setState('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Trial notification could not be recorded.'
      );
    }
  }

  const classes = ['lngr-waitlist', className].filter(Boolean).join(' ');

  return (
    <form className={classes} onSubmit={handleSubmit} data-state={state}>
      <label className="lngr-waitlist__label">
        <span>{label}</span>
        <input
          className="lngr-waitlist__input"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={placeholder}
          required
        />
      </label>

      <label className="lngr-waitlist__honeypot" aria-hidden="true">
        <span>Website</span>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <Button
        className="lngr-waitlist__button"
        type="submit"
        variant="danger"
        disabled={state === 'submitting'}
        trailing="→"
      >
        {state === 'submitting' ? 'Submitting…' : buttonLabel}
      </Button>

      <p className="lngr-waitlist__message" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
