---
read_when: Read before making strategy, product, storefront, content, packaging, or operations decisions for Longer. This is the canonical operating snapshot.
last_updated: 2026-07-15
---

# Longer current state

## Brand

Longer is a legitimate electrolyte powder built around one deadpan pharmaceutical premise:

> Are you suffering from ED? Electrolyte Dysfunction.

The company was renamed from Endure because Endure was unavailable. Longer is the only active brand name. Files or browser artifacts containing Endure are legacy assets and are not active direction.

The product must remain credible CPG. The pharmaceutical framing earns attention; taste, formulation, packaging, fulfillment, and compliance determine whether the business retains customers.

## Current decisions

- **Validation sequence:** content → waitlist → co-packer quotes → demand signal → production → DTC and TikTok Shop.
- **Hero SKU:** Blue Pill, currently positioned as blue raspberry.
- **Logo system:** the woman silhouette is the canonical mark. Approved configurations are the mark, horizontal lockup, and stacked lockup in Pantone 2935 C / `#0057B8`. Source assets and the Instrument Serif font live in `brand/`.
- **Additional flavor candidates:** Watermelonafil and PED Pineapple remain under review.
- **Storefront direction:** the canonical validation storefront is an outrageous pharmaceutical campaign built around the Clinical hero. It commits to diagnosis, treatment, warnings, adverse reactions, prescribing information, patient outcomes, and product theater across the entire page.
- **Creative mandate:** push the campaign until it attracts objection, then decide what to pull back. Compliance review happens after the strongest version exists; creative work should not pre-negotiate against imagined objections.
- **Campaign direction:** the Performance concept is useful for TikTok and paid creative. It is not the storefront identity.
- **Archived concept:** the Pharma study contains useful visual-system work but includes medical-food language and treatment claims that must not ship.
- **Implementation:** the active storefront is a Next.js app in `store/`. The root route `/` is the canonical page.

## Storefront status

The canonical page now includes:

- responsive desktop and mobile compositions;
- local Longer product assets;
- a diagnosis-led hero and red safety-information band;
- a symptom self-assessment, Blue Pill product reveal, field-study sequence, adverse-reaction ticker, treatment selection, full prescribing insert, patient outcome, and waitlist close;
- email validation, spam trapping, loading, success, and error states;
- direct server-side Klaviyo enrollment through `/api/waitlist`;
- social metadata and a production-safe title and description.

The waitlist enrolls submissions into Klaviyo list `RH9PSK` using server-only credentials. Until `KLAVIYO_API_KEY` and `KLAVIYO_WAITLIST_LIST_ID` are configured, the form provides an explicit temporary-unavailability state.

The routes `/clinical`, `/performance`, and `/pharma` redirect to the canonical storefront. Their components and assets remain in the repository as internal concept studies.

## Product status

The formula is directional rather than final. Existing mineral targets and Gatorlyte comparisons are working hypotheses. Final ingredients, quantities, Nutrition Facts, serving directions, and claims depend on manufacturer development and regulatory review.

Co-packer research remains parallel to validation. Existing lead names in brainstorming material are unverified working leads and should be revalidated before outreach.

## Immediate next decisions

1. Build and activate the Klaviyo clinical-enrollment welcome flow.
2. Publish an accurate privacy policy and add rate limiting before enabling public email capture.
3. Obtain regulatory review before publishing final formula quantities, packaging claims, dosing language, or paid ads.
4. Build and post the first content-validation batch against the canonical storefront.

## Production trigger

Do not place inventory orders from aesthetic confidence alone. Production follows a defined demand signal from content, waitlist conversion, customer comments, and co-packer economics. The exact threshold remains an open decision.
