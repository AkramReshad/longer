---
read_when: Read before changing the storefront architecture, deployment, waitlist capture, or commerce integration. This is the canonical technical decision record.
last_updated: 2026-07-10
---

# Longer technical stack

## Current decision

Use the existing Next.js storefront for validation.

The active application lives in `store/` and uses:

- Next.js 16 App Router;
- React 19;
- TypeScript with strict typechecking;
- vanilla CSS in `store/app/globals.css`;
- `next/image` for product assets;
- a Next.js route handler for waitlist submissions.

The earlier Shopify Dawn decision is superseded. There is no Shopify theme in the current repository.

## Active routes

| Route | Status | Purpose |
| --- | --- | --- |
| `/` | Canonical | Clinical validation storefront |
| `/api/waitlist` | Canonical | Validates and forwards waitlist submissions |
| `/clinical` | Redirect | Legacy concept URL redirects to `/` |
| `/performance` | Redirect | Legacy concept URL redirects to `/` |
| `/pharma` | Redirect | Legacy concept URL redirects to `/` |

Prototype components and assets are retained for creative reference. Their former public routes redirect to the canonical storefront.

## Waitlist integration

The browser submits JSON to `/api/waitlist`. The server validates the email, rejects bot submissions through a honeypot, and forwards this payload to `WAITLIST_WEBHOOK_URL`:

```json
{
  "email": "patient@example.com",
  "source": "storefront",
  "createdAt": "ISO-8601 timestamp"
}
```

Copy `store/.env.example` into the deployment environment and configure:

```sh
NEXT_PUBLIC_SITE_URL=https://example.com
WAITLIST_WEBHOOK_URL=https://example.com/longer-waitlist
```

The receiving email platform remains an open decision.

Add rate limiting and publish an accurate privacy policy before enabling public capture.

## Local workflow

Run from `store/`:

```sh
pnpm install
pnpm run dev
pnpm run typecheck
pnpm run build
pnpm start
```

Browser verification uses the `longer` workspace in `.context-tools.toml` and `http://127.0.0.1:3000`.

## Commerce boundary

The current site is a validation surface, not a commerce backend. Shopify remains a plausible later system for products, checkout, orders, customer data, and TikTok Shop integration. Adopt it when the product is ready for transactions; no Shopify implementation decision is active today.

## Upgrade triggers

Revisit the stack when one of these becomes true:

- preorders or live checkout are required;
- Shopify customer or product data must render in the storefront;
- waitlist volume requires a dedicated CRM integration;
- deployment or analytics constraints materially slow validation.
