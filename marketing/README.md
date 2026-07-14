---
read_when: Read before operating Klaviyo resources or changing the marketing workspace layout.
last_updated: 2026-07-13
---

# Longer Marketing

## Klaviyo

Store Klaviyo resources as raw API objects at `klaviyo/{resource}/{id}.json`:

```text
klaviyo/flows/RPMkwd.json
klaviyo/segments/QWpLR3.json
klaviyo/lists/RH9PSK.json
```

The Klaviyo object ID is the filename. The parent directory supplies the resource type. Resolve names from `attributes.name`; resource names should remain unique.

The Klaviyo CLI manages campaigns, flows, segments, and content blocks. `klaviyo/scripts/pull_lists.py` and `klaviyo/scripts/ensure_lists.py` cover lists. Store list metadata only; profiles and memberships remain in Klaviyo.
