# FemmeFluence Africa — Website

React + TypeScript + Vite + Tailwind CSS + React Router, with build-time prerendering and a
Vercel Serverless Function stub for form handling.

Built against the [FFA Website Technical Document & Build Specification v0.2](https://docs.google.com/document/d/1cKFbfL0HdXixW_m-ksm_lxCdSpOV3j4bYQ96yfKXfvw/edit).
Note: the spec's Section 9 decides **Next.js (App Router)**, not plain React/Vite — this repo
deliberately deviates from that (decision made in-session). The prerendering and `/api` setup
below exist specifically to close the gaps that deviation opens up.

## Structure

- `src/routes.tsx` — single source of truth mapping each URL to its page component, `<title>`
  and meta description. Read by both the client router and the SSR entry.
- `src/pages/` — one file per site route (Home, Who We Are, The Community, How We Grow, Our
  Work, Stories & Ideas, Get Involved, Contact), matching the sitemap in Section 4 of the spec.
- `src/layouts/SiteLayout.tsx` — header nav, footer, and the primary "Join the Community" CTA.
- `src/entry-client.tsx` / `src/entry-server.tsx` — browser hydration entry and the SSR entry
  used only at build time to prerender each route to static HTML (see below).
- `src/index.css` — Tailwind entry point + brand tokens (`--color-purple-top`, `--color-lilac`,
  `--color-gold`) from Section 8. Typeface is Google Sans (loaded from Google Fonts).
- `api/join.ts` — Vercel Serverless Function stub for the community-join form. Not wired to
  Google Sheets or Brevo yet — see the TODO in the file.
- `legacy-tac-onepager/` — the pre-existing static one-pager for The Amazon Conference. Per
  Section 3 of the spec, TAC has its own separate site; this folder is preserved as reference,
  not part of the FFA build.

## Why prerendering

A plain Vite SPA renders everything client-side, so a link shared to WhatsApp or Facebook (whose
scrapers don't execute JS) wouldn't see per-page titles/descriptions — breaking Section 7's SEO
baseline. `npm run build` now does three passes: build the client bundle, build an SSR bundle of
`entry-server.tsx`, then run `scripts/prerender.mjs`, which renders each route from
`src/routes.tsx` to real static HTML under `dist/<route>/index.html`. `entry-client.tsx`
hydrates that markup in the browser.

Note: `react-helmet-async` was tried first but dropped — its v3 release detects React 19 and
switches entirely to native DOM head-hoisting, which silently breaks the server-string
extraction API this prerender pattern needs. `src/routes.tsx` + a small `MetaSync` component
replace it with no dependency.

## Scripts

```
npm run dev            # start local dev server
npm run build           # type-check + client build + SSR build + prerender
npm run build:client     # client bundle only
npm run build:server     # SSR bundle only (used by prerender)
npm run prerender         # run prerender against an existing dist/
npm run preview            # serve the prerendered dist/ locally
npm run lint                 # oxlint
```

## Status

Scaffold, not a finished build. Home hero/audience-recognition and Who We Are are drafted from
the spec's ready copy; other routes are stubs listing what's still pending per Section 13 of the
spec. `api/join.ts` returns 501 until Google Sheets + Brevo credentials exist.
