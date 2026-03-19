# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] – 2026-03-15

### Added

#### CI/CD
- Fixed YAML syntax error in `.github/workflows/ci.yml` (malformed `run:` inside `with:` block in the `web` job)
- Added `deploy.yml` — Vercel production deployment workflow triggered on GitHub releases
- Added `security.yml` — dependency vulnerability scanning (`npm audit`) + secret scanning for all packages, runs on push/PR and weekly schedule
- Added `release.yml` — automated GitHub Release creation from version tags (`v*.*.*`)

#### Application (app-nextjs)
- **Admin Dashboard** (`/admin`) — system overview, user management with RBAC roles, server health bars (CPU/Memory/Storage), API monitoring table, audit log timeline
- **Developer Dashboard** (`/developer`) — API metrics panel, live log viewer, deployment status, feature flags, API endpoint tester console, rate-limit quota bars, environment config viewer
- **Users Page** (`/users`) — searchable user table with role badges, plan badges, status indicators, and action buttons
- **Settings Page** (`/settings`) — profile editor, notification toggles, password change, appearance selector, language/region selector
- **Docs Page** (`/docs`) — documentation index, external resource links, API quick reference with link to developer console
- **Navigation component** (`components/navigation.tsx`) — sticky tab-based nav with 7 tabs: Home, Dashboard, Users, Admin, Developer, Settings, Docs; keyboard-accessible, responsive, mobile-scrollable
- **API health endpoint** (`/api/health`) — returns `{ status, timestamp, version }` (Edge Runtime); version sourced from `NEXT_PUBLIC_APP_VERSION` env var
- **API metrics endpoint** (`/api/metrics`) — returns `{ timestamp, version, requests: { total, errors, rate_per_minute }, performance: { p50_latency_ms, p95_latency_ms, p99_latency_ms } }` (Edge Runtime); version sourced from `NEXT_PUBLIC_APP_VERSION` env var
- **PWA manifest** (`public/manifest.json`) — installable web app with Neo Glow theme color

#### Layout & Navigation
- Updated `app/layout.tsx` to include global `<Navigation />` and PWA manifest link
- Navigation wraps all pages with sticky, backdrop-blurred top bar

#### Documentation
- Created `CHANGELOG.md` (this file) following Keep-a-Changelog format

### Changed

- `app/layout.tsx` — added `Navigation` import and `<main>` wrapper, added `manifest` metadata

### Fixed

- CI `web` job: removed duplicate `npm ci`, moved `DATABASE_URL` env to job level, corrected YAML structure so `run` is no longer a stray property inside a `uses` step block

### Security

- Added `security.yml` workflow with `npm audit --audit-level=high` for both `backend/` and `app-nextjs/`
- Added secret scanning step to detect hardcoded credentials in source files
- `deploy.yml` uses `secrets.VERCEL_TOKEN` and `secrets.DATABASE_URL` — no secrets committed to source

[1.0.0]: https://github.com/SMSDAO/Cinemai/releases/tag/v1.0.0
