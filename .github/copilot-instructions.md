# Academy Frontend - Copilot Instructions

## Architecture Overview

**Tech Stack**: React 18 + TypeScript + Vite + Tailwind CSS + Zustand + TanStack Query
**Build**: `npm run build` → produces optimized bundle, **Dev**: `npm run dev` on port 5173

### Core Patterns

**State Management**:

- Global auth state via Zustand ([src/stores/useAuthStore.ts](src/stores/useAuthStore.ts)) — persists token/user in localStorage
- Auth flows: `useAuthCheck()` initializes on app load, `useAuthSync()` syncs across tabs
- Query caching with TanStack Query (5min staleTime, no refetchOnWindowFocus)

**API Communication**:

- Wrapped axios client at [src/api/client.ts](src/api/client.ts) — all requests go through here
- Feature services in `features/{feature}/services/api.ts` (e.g., [src/features/auth/services/api.ts](src/features/auth/services/api.ts))
- Token auto-included via axios interceptor in [src/api/axios.ts](src/api/axios.ts)

**Routing**:

- Role-based access: [src/app/router/ProtectedRoute.tsx](src/app/router/ProtectedRoute.tsx) requires auth + role check
- [src/app/router/GuestRoute.tsx](src/app/router/GuestRoute.tsx) redirects authenticated users away
- Routes defined in [src/app/router/routesConfig.tsx](src/app/router/routesConfig.tsx)

## Feature Structure

Each feature in `src/features/{featureName}/` follows this layout:

```
services/api.ts     → API calls via `client`
types/              → TypeScript interfaces
validations/        → Zod schemas (if present)
components/         → Feature-specific UI components
hooks/              → Feature custom hooks
pages/              → Route pages
```

Example: Auth feature at [src/features/auth/](src/features/auth/) manages login, token refresh, and user verification.

## Component & Styling Conventions

**UI Components** (shadcn/ui-inspired):

- Located at [src/components/ui/](src/components/ui/) — use `class-variance-authority` for variants
- Example: [src/components/ui/Button.tsx](src/components/ui/Button.tsx) — compose with `cn()` utility for className merging
- Reusable components export from [src/components/common/](src/components/common/)

**Tailwind CSS**:

- HSL color variables defined in CSS (--primary, --destructive, etc.)
- Tailwind extends via [tailwind.config.js](tailwind.config.js) — use predefined color palette
- Dark mode via `darkMode: ["class"]` — toggle by adding/removing `dark` class on root

## Development Workflow

- **Lint**: `npm run lint` (eslint, strict mode)
- **Type Check**: `npm run typecheck` (tsc --noEmit)
- **Test**: `npm run test` (vitest with jsdom)
- **Format**: `npm run format` (prettier)
- **Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/) — format: `<type>[scope]: <description>`

## Critical Developer Tasks

**Adding API endpoints**:

1. Create/update service in `features/{feature}/services/api.ts`
2. Use `client.get/post/put/delete()` wrapper
3. Wrap calls in TanStack Query `useQuery/useMutation` at component level

**Adding protected routes**:

1. Import route in [src/app/router/routesConfig.tsx](src/app/router/routesConfig.tsx)
2. Wrap with `ProtectedRoute` component, pass required role
3. Verify role enum in auth types

**Adding form validation**:

- Use React Hook Form + Zod (see [src/features/auth/validations/](src/features/auth/validations/) for examples)
- Import `useForm` from 'react-hook-form' with `zodResolver`

## Path Aliases & Imports

- `@/` resolves to `src/` (configured in [tsconfig.json](tsconfig.json))
- Always use `@/` for relative imports across the app — improves readability and refactoring safety

## Key Files to Understand First

1. [src/app/App.tsx](src/app/App.tsx) — entry point, provider setup
2. [src/stores/useAuthStore.ts](src/stores/useAuthStore.ts) — global state, token persistence
3. [src/api/client.ts](src/api/client.ts) — HTTP wrapper
4. [src/app/router/router.tsx](src/app/router/router.tsx) — route composition
5. [src/components/ui/Button.tsx](src/components/ui/Button.tsx) — component pattern example
