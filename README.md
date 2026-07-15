# Weekly Wrapped — Frontend

The web client for **Weekly Wrapped**, a "Spotify Wrapped"-style tracker that turns your logged daily activities (coding, workout, reading, spending, etc.) into a weekly dashboard and a shareable recap card.

Built with **Next.js 16 (App Router)** and **React 19**, this app handles authentication, activity logging, a weekly analytics dashboard, and a public/private "wrapped" recap page you can share with a link.

## Features

- **Auth** — email/password login and registration, with JWT access/refresh tokens stored in cookies and silently refreshed via middleware.
- **Dashboard** — weekly stat cards, an activity chart, and a category-composition breakdown with an auto-generated insight summary.
- **Activity log** — full CRUD for daily activities in a server-paginated table, with category filtering, a create/edit dialog, and a delete confirmation dialog.
- **Weekly recap ("Wrapped")** — generate a shareable recap for the current week; view it privately with a "copy link" action, or publicly at a slug-based URL with Open Graph/Twitter meta tags for social sharing.
- Indonesian-language UI copy throughout (labels, confirmations, toasts).

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Data fetching / caching | TanStack Query v5 (thin `useFetch` / `useMutate` wrapper hooks) |
| Tables | TanStack Table v8 (generic `DataTable` with server-side pagination) |
| Forms & validation | React Hook Form + Zod |
| UI | shadcn/ui on Radix primitives, Tailwind CSS v4, `next-themes`, `lucide-react` |
| Charts | Recharts |
| HTTP client | Axios (three configured instances, see below) |
| Notifications | Sonner |
| Containerization | Docker (multi-stage build, Next.js standalone output) |

## Project Structure

```
src/
├── api/            # Axios call definitions grouped by domain (auth, activity, dashboard, recap)
├── app/
│   ├── (auth)/      # /login, /register — public auth pages
│   ├── (root)/      # /, /activities, /recap/[slug] — authenticated app shell + sidebar
│   ├── w/[slug]/    # Public, server-rendered recap page (no auth required)
│   ├── api/
│   │   ├── auth/    # Route handlers that set httpOnly-style auth cookies after login/register
│   │   └── proxy/   # Catch-all proxy that forwards browser requests to the backend API
│   └── actions/     # Server actions (e.g. logout)
├── components/
│   ├── data-tables/ # Reusable DataTable, column header, pagination, toolbar, row actions
│   ├── dialog/      # Reusable confirm dialog
│   ├── input/        # Reusable form inputs wired for React Hook Form (input, select, date, textarea)
│   ├── navbar/       # Sidebar + nav links
│   └── ui/           # shadcn/ui primitives
├── constant/         # API path constants, sidebar link definitions
├── features/         # Feature modules (activities, auth, dashboard, recap) — components + hooks per feature
├── lib/              # Axios instances, TanStack Query wrappers, Zod schemas, misc utils
├── types/             # Shared TypeScript types (data models, request params, API response envelope)
├── config.ts          # Centralized env var access
└── proxy.ts            # Next.js middleware — route protection + token refresh
```

The codebase follows a **feature-based structure**: cross-cutting primitives live in `components/`, `lib/`, and `api/`, while page-specific logic (components + hooks) is grouped under `features/<name>/`.

## Architecture Notes

### Auth flow

- On login/register, the Next.js route handlers (`app/api/auth/*`) call the backend, then set `accessToken`, `refreshToken`, and `expiresAt` as cookies on the response — the browser never talks to the backend directly for these calls.
- `src/proxy.ts` (Next.js middleware) runs on every non-static request: it checks token expiry, silently calls the backend's `/refresh` endpoint when the access token has expired, and redirects unauthenticated users to `/login` (or authenticated users away from `/login` / `/register`).
- `app/actions/auth.ts` is a server action that clears auth cookies and redirects on logout.

### Talking to the backend (BFF proxy pattern)

Three Axios instances are configured in `src/lib/axios.ts`, each for a different purpose:

- `apiForAuth` → calls the backend directly, used only for login/register.
- `apiClient` → points at `/api/proxy`, a catch-all Next.js route handler that forwards the request server-side to the backend and attaches the `Authorization` header from the `accessToken` cookie. This is what the client-side data-fetching hooks use, and it's what avoids exposing the backend origin (and CORS) to the browser.
- `apiClientToBE` → calls the backend directly with the token attached via an interceptor, used for the recap endpoints.

### Data fetching

`src/lib/query.ts` wraps TanStack Query's `useQuery`/`useMutation` in two small generics — `useFetch` and `useMutate` — so every feature hook (`useActivity`, `useDashboard`, `useRecap`, etc.) shares consistent typing and error handling (`AxiosError`). Query keys are namespaced per feature (see `activityKeys`, `dashboardKeys`).

### Tables

`components/data-tables/data-table.tsx` is a generic, reusable table built on TanStack Table that supports both client-side and server-side (`manualPagination`) pagination, loading skeleton rows, error states, and empty states. The Activities page uses it in server-pagination mode, feeding `page`/`limit` params back into the `useActivity` query.

## Getting Started

### Prerequisites

- Node.js 22+
- A running instance of the Weekly Wrapped backend API (or any API compatible with the endpoints in `src/constant/services.ts`)

### Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL the browser uses for direct auth calls (`apiForAuth`) |
| `INTERNAL_API_URL` | Backend base URL used server-side by middleware, route handlers, and the proxy (defaults to `/api/v1`) |
| `REQUIRE_SECURE_COOKIES` | Set to `true` in production to mark auth cookies as `Secure` |

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to `/login` until you sign in.

### Build

```bash
npm run build
npm run start
```

### Docker

The included `Dockerfile` is a 3-stage build (deps → build → standalone runner):

```bash
docker build --build-arg NEXT_PUBLIC_API_URL=https://your-api.example.com -t weekly-wrapped-fe .
docker run -p 3000:3000 --env INTERNAL_API_URL=http://backend:8080/api/v1 weekly-wrapped-fe
```

## Key Routes

| Route | Description |
|---|---|
| `/login`, `/register` | Auth pages |
| `/` | Weekly dashboard (stats, chart, insight) |
| `/activities` | Activity log CRUD table |
| `/recap/[slug]` | Private recap viewer (owner-only, with copy-link) |
| `/w/[slug]` | Public, server-rendered recap page with social preview metadata |

## License

No license file is currently published in this repository — all rights reserved by the author unless a license is added.
