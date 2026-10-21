# FemmeFluence Africa — Website

React + TypeScript + Vite + Tailwind CSS + React Router, with build-time prerendering and a
Vercel Serverless Function for the contact form.

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
- `src/links.ts` — `JOIN_URL`. Community sign-up lives on a separate site
  (www.femmefluenceafrica.org, with its own database and Resend emails); every "Join the
  Community" button links there. The spec's Google Sheets + Brevo join flow is dropped.
- `src/components/ContactForm.tsx` + `src/lib/contactForm.ts` — the Contact page form and its
  validation rules.
- `api/contact.ts` — Vercel Serverless Function for the contact form. Validates the submission,
  emails it to the contact inbox via Resend (visitor as Reply-To), then sends the visitor a
  confirmation.
- `src/components/NewsletterForm.tsx` + `src/lib/newsletterForm.ts` — newsletter sign-up form,
  shown in the site footer on every page.
- `api/newsletter.ts` — saves subscribers as Resend contacts in the newsletter segment and sends
  new subscribers a welcome email. Newsletters are sent from Resend → Broadcasts to that segment.
- `api/_lib/shared.ts` — checks shared by both form handlers: spam protection (hidden honeypot
  field, minimum fill time, JSON-only requests), a best-effort per-IP rate limit (5 per 10
  minutes, in memory) and Resend API calls. Not an endpoint itself (`_` prefix).
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

## Environment variables

Only the contact and newsletter forms need any. See `.env.example`.

| Name | What it is |
|---|---|
| `RESEND_API_KEY` | Resend API key with **full access** (a sending-only key can't save subscribers) |
| `EMAIL_FROM` | Sender for all website emails, on the verified domain, e.g. `Name <address@domain>` |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries (comma-separate for several) |
| `NEWSLETTER_SEGMENT_ID` | ID of the "Newsletter" segment in Resend → Audience → Segments |

If any are missing, the form shows an error and nothing is sent — it never reports a false
success.

## Testing the forms locally

`npm run dev` also runs the `api/*.ts` functions (via a small dev-only plugin in
`vite.config.ts`), so no Vercel CLI or project link is needed:

1. Copy `.env.example` to `.env.local` and fill in the blanks.
2. `npm run dev`, then send a test message on `/contact/` and subscribe via the footer form.

Every send shows up under **Emails** in the Resend dashboard, with its delivery status;
subscribers appear under **Audience → Contacts**.

Don't run `vercel link` / `vercel` from this folder until go-live — the domain currently serves
the live sign-up site, and this project must not be deployed over it.

## Status

Scaffold, not a finished build. Home hero/audience-recognition, Who We Are and Contact are
built; other routes are stubs listing what's still pending per Section 13 of the spec.
