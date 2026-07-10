import { NextResponse } from 'next/server';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistPayload = {
  readonly email?: unknown;
  readonly source?: unknown;
  readonly website?: unknown;
};

export async function POST(request: Request): Promise<NextResponse> {
  let payload: WaitlistPayload;

  try {
    payload = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json({ message: 'Enter a valid email address.' }, { status: 400 });
  }

  if (typeof payload.website === 'string' && payload.website.length > 0) {
    return NextResponse.json({ message: 'You are enrolled for trial notification.' }, { status: 201 });
  }

  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ message: 'Enter a valid email address.' }, { status: 400 });
  }

  const webhookUrl = process.env['WAITLIST_WEBHOOK_URL'];

  if (webhookUrl === undefined) {
    return NextResponse.json(
      { message: 'Waitlist enrollment is temporarily unavailable. Please try again later.' },
      { status: 503 }
    );
  }

  const source = typeof payload.source === 'string' ? payload.source.trim().slice(0, 80) : 'site';

  let upstreamResponse: Response;

  try {
    upstreamResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source,
        createdAt: new Date().toISOString()
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8_000)
    });
  } catch {
    return NextResponse.json(
      { message: 'Trial notification could not be recorded. Please try again later.' },
      { status: 502 }
    );
  }

  if (!upstreamResponse.ok) {
    return NextResponse.json(
      { message: 'Trial notification could not be recorded. Please try again later.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: 'You are enrolled for trial notification.' }, { status: 201 });
}
