'use client';

import { type FormEvent, useState } from 'react';

type WaitlistFormProps = {
  readonly buttonLabel: string;
  readonly source?: string;
};

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function WaitlistForm({ buttonLabel, source = 'site' }: WaitlistFormProps) {
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('No spam. No vague wellness emails.');

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setState('submitting');
    setMessage('Submitting trial request…');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'),
          website: formData.get('website'),
          source
        })
      });

      const body = (await response.json()) as { readonly message?: string };

      if (!response.ok) {
        throw new Error(body.message ?? 'Trial notification could not be recorded.');
      }

      setState('success');
      setMessage('You are enrolled for trial notification.');
      form.reset();
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Trial notification could not be recorded.');
    }
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit} data-state={state}>
      <label>
        <span>Email address</span>
        <input name="email" type="email" autoComplete="email" placeholder="patient@example.com" required />
      </label>
      <label className="waitlist-honeypot" aria-hidden="true">
        <span>Website</span>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <button type="submit" disabled={state === 'submitting'}>
        {state === 'submitting' ? 'Submitting…' : buttonLabel}
        <span aria-hidden="true">→</span>
      </button>
      <p aria-live="polite">{message}</p>
    </form>
  );
}
