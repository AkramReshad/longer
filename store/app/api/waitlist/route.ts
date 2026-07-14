import { NextResponse } from 'next/server';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KLAVIYO_API_URL = 'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs';
const KLAVIYO_REVISION = '2026-04-15';

type WaitlistPayload = {
  readonly email?: unknown;
  readonly source?: unknown;
  readonly website?: unknown;
};

type KlaviyoConfiguration = {
  readonly apiKey: string;
  readonly listId: string;
};

function klaviyoConfiguration(): KlaviyoConfiguration | undefined {
  const apiKey = process.env['KLAVIYO_API_KEY']?.trim();
  const listId = process.env['KLAVIYO_WAITLIST_LIST_ID']?.trim();

  if (!apiKey || !listId) {
    return undefined;
  }

  return { apiKey, listId };
}

function subscriptionPayload(email: string, source: string, listId: string): object {
  return {
    data: {
      type: 'profile-subscription-bulk-create-job',
      attributes: {
        custom_source: `Longer landing page: ${source}`,
        historical_import: false,
        profiles: {
          data: [
            {
              type: 'profile',
              attributes: {
                email,
                subscriptions: {
                  email: {
                    marketing: { consent: 'SUBSCRIBED' }
                  }
                }
              }
            }
          ]
        }
      },
      relationships: {
        list: {
          data: { type: 'list', id: listId }
        }
      }
    }
  };
}

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

  const configuration = klaviyoConfiguration();

  if (configuration === undefined) {
    return NextResponse.json(
      { message: 'Waitlist enrollment is temporarily unavailable. Please try again later.' },
      { status: 503 }
    );
  }

  const source = typeof payload.source === 'string' ? payload.source.trim().slice(0, 80) : 'site';

  let upstreamResponse: Response;

  try {
    upstreamResponse = await fetch(KLAVIYO_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Klaviyo-API-Key ${configuration.apiKey}`,
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Revision: KLAVIYO_REVISION
      },
      body: JSON.stringify(subscriptionPayload(email, source || 'site', configuration.listId)),
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
    const requestId = upstreamResponse.headers.get('x-request-id');
    console.error('Klaviyo waitlist enrollment failed.', {
      status: upstreamResponse.status,
      requestId
    });
    return NextResponse.json(
      { message: 'Trial notification could not be recorded. Please try again later.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: 'You are enrolled for trial notification.' }, { status: 201 });
}
