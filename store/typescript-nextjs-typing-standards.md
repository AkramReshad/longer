# TypeScript / Next.js Typing Standards

Last updated: 2026-05-14

## Goal

Refactor Next.js frontends to the upper bound of what TypeScript, React, and the App Router can enforce.

TypeScript is structurally typed and runtime-erased. The standard compensates by combining strict compiler settings, type-aware linting, runtime schema validation at every external boundary, branded domain values, discriminated unions, and explicit Server/Client boundaries.

The philosophy: TypeScript is **load-bearing infrastructure**. Code that does not pass strict compile, lint, static-analysis, build, and test gates does not merge.

---

## Toolchain

### Required

- **Current stable TypeScript.** Minimum TypeScript 6.0. Upgrade with the stable compiler line as it moves.
- **Current stable Next.js App Router.** Minimum Next.js 16 and React 19.2.
- **Strict `tsconfig.json`.** `strict` is the floor.
- **typescript-eslint** with type-aware `strictTypeChecked` rules.
- **Prettier** for formatting.
- **Zod 4** for runtime validation. Zod schemas are the source of truth for boundary parsing.
- **ts-pattern** for complex exhaustive matching.
- **TanStack Query** for client-side server state, cache, polling, and mutation workflows.
- **React Hook Form + Zod resolver** for client-heavy forms.
- **server-only** for server-only modules.

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2024",
    "lib": ["ES2024", "DOM"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "noEmit": true,
    "incremental": true,

    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,

    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noPropertyAccessFromIndexSignature": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,

    "allowJs": false,
    "skipLibCheck": false,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noUncheckedSideEffectImports": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,

    "types": ["node", "react", "react-dom"],
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Tests may use a separate `tsconfig.test.json` that adds `vitest`, `jsdom`, or Playwright ambient types. Build and app configs stay strict.

### `next.config.ts`

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: false
  }
};

export default nextConfig;
```

`typedRoutes` is stable. Do not use `experimental.typedRoutes`. Next.js 16 removed `next lint` and the `eslint` config option from `next.config`; lint through the ESLint CLI.

### ESLint

Use flat config with Next rules plus type-aware TypeScript rules:

```ts
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...nextVitals,
  ...nextTypescript,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: false,
          allowBoolean: true,
          allowNever: false,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false
        }
      ]
    }
  }
);
```

Custom lint owns project-specific rules: cast quarantine, DTO/entity confinement, direct `process.env`, raw JSON parsing, raw `fetch`, client/server import boundaries, nullable state bundles, and non-exhaustive domain state.

### Verification Loop

Every change runs before merge:

```bash
pnpm prettier --check .
pnpm eslint . --max-warnings=0
pnpm next typegen
pnpm tsc --noEmit
pnpm test
pnpm build
```

UI behavior changes also run the frontend's browser verification suite.

---

## Forbidden List

- `any`: banned. Wrap unsafe dependencies in adapters that return `unknown`, then parse.
- Non-null assertion `!`: banned.
- `// @ts-ignore`: banned. `// @ts-expect-error` requires a reason, issue link, and a test proving the intended failure.
- Type assertions with `as`: banned except `as const`, `satisfies`, framework quarantines, and tested boundary adapters.
- Double assertions such as `as unknown as T`: quarantined boundary/test infrastructure only.
- `Function`, `Object`, and `{}` as types: banned. Use a specific function signature, `unknown`, or a specific object shape.
- Vague `object`: allowed only as an intentional generic constraint that excludes primitives.
- `unknown` use before narrowing: banned.
- Raw `JSON.parse`: banned outside schema-backed parser helpers.
- Raw `response.json()` entering app code: banned. Resource APIs parse responses through schemas.
- Direct `process.env`: banned outside typed env modules.
- TypeScript `enum` and `const enum`: banned. Use `as const` objects plus derived unions.
- Mutable public state: banned. Expose readonly values, readonly arrays, immutable objects, or read-only stores.
- Default exports: banned except Next.js file conventions that require them.
- Client components by default: banned. Server Components are the default; `'use client'` is pushed to the smallest interactive leaf.
- API routes for first-party form mutations: banned. Use Server Actions for product mutations.
- `useEffect` for derived state: banned. Derive during render, use memoization only when it removes real cost.
- Floating promises: banned.
- Axios, Moment, full Lodash, class components, untyped CSS-in-JS: banned without explicit justification.

---

## Required Patterns

### Product Types and Sum Types

Product types are `A` and `B` and `C`, usually object types. Sum types are `A` or `B` or `C`, usually discriminated unions. Use `kind` as the discriminator.

```ts
type MediaAsset =
  | { readonly kind: 'ready'; readonly id: MediaAssetId; readonly playbackUrl: MediaUrl }
  | { readonly kind: 'failed'; readonly id: MediaAssetId; readonly reason: FailureReason };

function describe(asset: MediaAsset): string {
  switch (asset.kind) {
    case 'ready':
      return asset.playbackUrl;
    case 'failed':
      return asset.reason;
  }
}
```

Rules: every state machine is a discriminated union; variant-required fields are non-null; no status plus nullable companion fields; `switch` over discriminated unions has no `default`; complex matching uses `ts-pattern(...).exhaustive()`.

### Boundary Shape vs Domain Shape

Wire payloads, route params, search params, form data, storage values, SDK callbacks, and database rows are boundary shapes. Domain types are truth. Boundary types do not leave their layer.

```ts
import { z } from 'zod/v4';

const MediaAssetDto = z.discriminatedUnion('processing_status', [
  z.object({
    processing_status: z.literal('READY'),
    id: z.string().uuid(),
    playback_url: z.string().url()
  }),
  z.object({
    processing_status: z.literal('FAILED'),
    id: z.string().uuid(),
    failed_reason: z.string().min(1)
  })
]);

type MediaAssetDto = z.infer<typeof MediaAssetDto>;

function mediaAssetFromDto(dto: MediaAssetDto): MediaAsset {
  switch (dto.processing_status) {
    case 'READY':
      return {
        kind: 'ready',
        id: MediaAssetId.parse(dto.id),
        playbackUrl: MediaUrl.parse(dto.playback_url)
      };
    case 'FAILED':
      return {
        kind: 'failed',
        id: MediaAssetId.parse(dto.id),
        reason: FailureReason.parse(dto.failed_reason)
      };
  }
}
```

Backend responses parse at resource API boundaries. Components, hooks, and domain services receive domain types.

### Branded Types

Raw IDs and constrained primitives do not cross API, repository, service, domain, or UI boundaries.

```ts
declare const brand: unique symbol;
type Brand<T, Name extends string> = T & { readonly [brand]: Name };

type CompanyId = Brand<string, 'CompanyId'>;

const CompanyId = {
  parse(value: string): CompanyId {
    if (!value) throw new Error('CompanyId cannot be blank');
    return value as CompanyId;
  }
};
```

Provide schema helpers and serializers at boundaries. Do not expose the raw value except inside adapters.

### Expected Fallibility

Expected fallibility is represented in the return type. Use domain-specific discriminated results by default.

```ts
type SaveSurveyResult =
  | { readonly kind: 'saved'; readonly surveyId: SurveyId }
  | { readonly kind: 'validation_failed'; readonly issues: readonly SurveyIssue[] }
  | { readonly kind: 'conflict'; readonly message: string }
  | { readonly kind: 'network_failed'; readonly retryable: boolean };
```

`neverthrow` is approved when generic composition makes the code clearer. Exceptions remain for programmer errors, impossible invariants, cancellation/abort control, and infrastructure failures that are immediately normalized into typed results.

### Environment

No direct `process.env` outside env modules. Server env parsing must be lazy enough to avoid import-time build failures in Next.js, then fail fast when runtime code asks for missing configuration.

```ts
import 'server-only';
import { z } from 'zod/v4';

const ServerEnv = z.object({
  API_BASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(1)
});

let cachedEnv: z.infer<typeof ServerEnv> | null = null;

export function getServerEnv() {
  cachedEnv ??= ServerEnv.parse(process.env);
  return cachedEnv;
}
```

Client env is limited to `NEXT_PUBLIC_*` values and parsed in a dedicated client-safe env module.

### Server and Client Components

Server Components are default. Client Components are leaf adapters for browser APIs, local UI state, event handlers, and interactive controls. Data crossing Server to Client boundaries must be serializable: no functions, classes, `Date`, `Map`, `Set`, database rows, SDK objects, or secrets.

Use `server-only` in modules that access secrets, cookies, auth, databases, privileged SDKs, or server-only env. Use explicit prop types for Client Components.

### Next.js Route Types

Use generated route types and `PageProps<'/route'>`.

```tsx
export default async function Page(props: PageProps<'/campaigns/[id]'>) {
  const { id } = await props.params;
  const searchParams = await props.searchParams;
  const campaignId = CampaignId.parse(id);
  const query = CampaignQuery.parse(searchParams);
  return <CampaignPage campaignId={campaignId} query={query} />;
}
```

`params` and `searchParams` are promises in the current App Router contract. Parse route params and search params before use.

### Server Actions and Route Handlers

Server Actions are the standard for first-party product mutations. Every Server Action validates authentication, authorization, input shape, and expected output shape. Treat Server Action arguments as untrusted input.

Route Handlers are standard for public HTTP APIs, webhooks, media/download proxies, tracking proxies, streaming, external clients, and protocol-level integrations.

### Forms

Use Server Actions plus `useActionState` for progressively enhanced first-party forms. Use React Hook Form plus Zod resolver for browser-heavy forms with complex client validation or dynamic field arrays. Both paths parse input on the server.

### Client Server-State

Use TanStack Query for client-side server state. Query keys are readonly tuples. Query functions return parsed domain types. Mutations return typed result contracts. Cache invalidation targets the smallest owning resource.

### React State

Use `useState` for genuinely local UI state. Use `useReducer` with discriminated actions for workflows with multiple transitions. URL state owns shareable filters, pagination, and sort. Server state owns backend data.

---

## Library Choices

### Required

- **Zod 4** for validation and schema inference.
- **typescript-eslint** with type-aware strict rules.
- **ts-pattern** for complex exhaustive matching.
- **TanStack Query** for client server-state.
- **React Hook Form + Zod resolver** for client-heavy forms.
- **server-only** for server-only modules.
- **Prettier** for formatting.

### Approved With Justification

- **Zod Mini** for bundle-constrained client modules.
- **neverthrow** for composable typed results.
- **Drizzle** or **Prisma** for direct database access, with row-to-domain mapping at repository boundaries.
- **tRPC**, **Hono RPC**, or generated OpenAPI clients for separate typed RPC surfaces.
- **ky** for a thin fetch wrapper when schema-backed resource clients still own parsing.
- **date-fns** for display formatting.
- **Temporal** when runtime/polyfill support is explicitly part of the app standard.
- **Effect** for isolated async orchestration or a full typed-effect architecture after explicit adoption.
- **MSW** for network tests.
- **Vitest** for unit/component tests.
- **Playwright** for end-to-end browser tests.

### Banned Without Explicit Justification

- **axios**.
- **moment**.
- Full **lodash** imports.
- Runtime schema libraries that do not infer TypeScript types.
- Untyped SDK wrappers.
- Untyped CSS-in-JS.
- Class components.

---

## Refactoring Strategy

This is not a ratchet plan. The target is global strict compliance.

1. **Foundation:** upgrade TypeScript, Next.js, React, ESLint, Zod, test tooling, and route typegen; enable strict compiler and lint gates.
2. **Unsound patterns:** remove `any`, non-null assertions, unsafe casts, direct env access, raw JSON parsing, raw response typing, default exports, and mutable public state.
3. **Boundaries:** add schemas for env, route params, search params, FormData, route-handler payloads, backend responses, storage, third-party callbacks, and SDK results.
4. **Domain modeling:** add branded IDs/constrained primitives; convert nullable bundles and status fields to discriminated unions; type expected fallibility.
5. **Next.js architecture:** enforce Server Component default, leaf Client Components, Server Actions for product mutations, Route Handlers for HTTP surfaces, and serializable server-to-client props.
6. **Architecture gates:** add custom lint/Konsist-style checks for DTO confinement, env modules, raw fetch/JSON, cast quarantine, route typing, exhaustive state, and client/server import boundaries.

---

## Non-Negotiables Summary

1. Current stable TypeScript; minimum TypeScript 6.0.
2. Current stable Next.js App Router; minimum Next.js 16.
3. Strict `tsconfig`; `skipLibCheck: false`; `allowJs: false`.
4. Type-aware `typescript-eslint`; zero warnings.
5. Zero `any`, non-null assertions, `@ts-ignore`, and unjustified casts.
6. Zod 4 schemas at every external boundary.
7. No direct `process.env` outside typed env modules.
8. No raw JSON or unvalidated backend responses entering app code.
9. Discriminated unions for state and expected outcomes.
10. Exhaustive matching through compiler checks or `ts-pattern`.
11. Branded types for every domain identifier and constrained primitive.
12. Server Components by default; Client Components are leaf adapters.
13. Server Actions for first-party mutations; Route Handlers for HTTP surfaces.
14. Typed routes, `PageProps<'/route'>`, and `next typegen`.
15. CI blocks any regression on any of the above.

Everything else is negotiable. These rules are not.
