---
read_when: Start here when entering the Longer workspace or deciding which project document is authoritative.
last_updated: 2026-07-10
---

# Longer

Longer is an electrolyte powder brand built around a deadpan pharmaceutical premise: **Electrolyte Dysfunction**.

## Document hierarchy

Read in this order:

1. `AGENTS.md` — durable brand, voice, operating, and compliance guardrails.
2. `current_state.md` — canonical operating state and next decisions.
3. `tech-stack.md` — canonical storefront and integration decisions.
4. `longer-brand-doc.md` — archived May 2026 brainstorming; useful for idea mining, not current truth.

When documents conflict, the higher item in this list wins. Update `current_state.md` or `tech-stack.md` when an active decision changes.

## Active storefront

The canonical validation storefront is the Next.js application in `store/`. Its root route uses the Clinical direction. The other concept routes are retained as internal studies.

```sh
cd store
pnpm install
pnpm run dev
```

See `tech-stack.md` for build, waitlist, and deployment details.
