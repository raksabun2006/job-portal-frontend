# Job Portal — Frontend (React + Vite)

A complete React SPA wired to your local Laravel API (the backend from earlier),
styled with Tailwind CSS and set to use **Khmer OS Siem Reap** typography.

## 1. Install

```bash
npm install
cp .env.example .env
```

Edit `.env` and point `VITE_API_URL` at your running Laravel API:

```
# If running `php artisan serve` (default):
VITE_API_URL=http://127.0.0.1:8000/api

# If serving through XAMPP's Apache instead:
VITE_API_URL=http://localhost/job-portal-backend/public/api
```

## 2. Run

```bash
npm run dev
```

Opens at `http://localhost:5173`.

## 3. Important: CORS on the backend

Your Laravel API needs to allow requests from `http://localhost:5173`. In
`config/cors.php`:

```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:5173'],
```

If `config/cors.php` doesn't exist yet, publish it: `php artisan config:publish cors`
(Laravel 11+) or `php artisan vendor:publish --tag=cors` on older setups.

This app uses **Bearer token auth** (token returned by `/api/login`, stored in
`localStorage`, sent as `Authorization: Bearer <token>` on every request) —
not Sanctum's SPA cookie mode — so `supports_credentials` doesn't need to be
true and you don't need to configure `SANCTUM_STATEFUL_DOMAINS` on the frontend
side (the backend README already covers the server-side Sanctum config).

## 4. About the Khmer OS Siem Reap font

**Khmer OS Siem Reap** is a licensed font that ships pre-installed on many
Cambodian Windows/Mac setups, but it is *not* a web-safe font and isn't
available on a public CDN (like Google Fonts) — so it can't be fetched over
the network the way Latin fonts usually are in a web app.

This project references it by name in `tailwind.config.js` and `index.html`:

```css
font-family: "Khmer OS Siem Reap", "Noto Sans Khmer", system-ui, sans-serif;
```

- **If the font is installed locally** on the machine viewing the site, the
  browser will pick it up automatically via `local()` — no extra step needed.
- **If it's not installed**, the browser falls back to Noto Sans Khmer (if
  installed) or the system default — Khmer text will still render correctly,
  just in a different typeface.
- **To guarantee everyone sees Khmer OS Siem Reap** (recommended for
  production), you need to self-host the actual font files: obtain the
  `.ttf`/`.woff2` files (you must own a valid license — it's not open-source),
  drop them in `public/fonts/`, and add a proper `@font-face` block with `src:
  url(...)` in `index.html` pointing at those files instead of relying on
  `local()`.

## Project structure

```
src/
├── api/          # Axios client + one module per resource (auth, jobs, companies...)
├── pages/        # Home, Login, Register, Jobs, JobDetail, Company, Candidate, Employer, Admin
├── components/   # Navbar, Footer, JobCard, CompanyCard, StatusBadge, Pagination, etc.
├── layouts/      # MainLayout (public pages), DashboardLayout (role dashboards w/ sidebar)
├── hooks/        # useAuth, useDebounce
├── context/      # AuthContext (token storage, login/register/logout, current user)
└── routes/       # ProtectedRoute (auth + role guard)
```

## Notes on how auth/roles work

- On login/register, the API returns `{ user, token }`. The token is stored in
  `localStorage` and attached to every request via an Axios interceptor.
- `user.roles` is an array from Spatie Permission (e.g. `["candidate"]`).
  `useAuth().role` reads the first one to decide which dashboard to route to.
- `ProtectedRoute` redirects to `/login` if there's no user, or to `/` if the
  user's role isn't in `allowedRoles` for that route group.
- A 401 response anywhere clears the stored token and bounces to `/login`
  automatically (see the response interceptor in `src/api/axios.js`).

## A backend fix bundled alongside this delivery

While wiring the Employer "My Jobs" and Company profile pages (which need to
list jobs filtered by `company_id`), I found the backend's `JobService::list()`
didn't support that filter yet — it silently ignored the param. I patched
`app/Services/JobService.php` and `JobController::index` in the backend package
to add it (also loads `applications_count` and lets an employer see their own
draft/closed jobs, not just published ones). Re-copy those two files into your
Laravel project if you already set up the backend from the earlier delivery.
