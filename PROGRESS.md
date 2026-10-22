# FemmeFluence Africa Website — Progress

Last updated: 22 October 2026

This file tracks what's done, what's left and what's been decided. Update it at the end of
each working session. For how the code is organised, see `README.md`.

## Ground rules (until the owner approves go-live)

- **Develop and test locally only.** Don't deploy, run `vercel link` / `vercel`, change DNS or
  touch production settings.
- **www.femmefluenceafrica.org is the live sign-up site.** It's a separate project; nothing in
  this repo may disrupt it, its API endpoints, its Resend integration or its settings.
- **Final URL plan:** the main website will live at `www.femmefluenceafrica.org/` and the sign-up
  page will move to `www.femmefluenceafrica.org/signup`. Don't make that change until go-live.
- **Never invent content:** no made-up testimonials, figures or email addresses.

## Done

### Homepage (redesigned, tested at screen widths from 320px to 1440px)
- [x] Opening section: "It needs women who are *becoming*." with an arch-shaped photo, gold
      rising arcs and the Join button
- [x] Our belief: founding story, founder quote, four directions (Identity, Competence,
      Influence, Vision)
- [x] Impact: figures from the September 2026 Impact Snapshot, with proportional gold bars
- [x] Find your way in: 5 ways to take part
- [x] Programme highlights: The Amazon Conference, World-Class Woman Academy, Phoenix Circle
- [x] Final invitation to join

### Who We Are page (redesigned, tested at screen widths from 320px to 1440px)
- [x] Opening: "We believe *becoming* should start early.", the conviction, an "On this page"
      index and an overlapping two-photo composition
- [x] Our story (`#our-story`): big "2023", origin paragraphs, founder pull quote, what it grew
      into (chapters at UNN, UNICAL, EBSU; English, Igbo and French speakers)
- [x] What we believe (`#our-values`): the 7 values as a numbered list, plus 3 verified figures
- [x] Our vision (`#our-vision`): dark section with a gold sunrise; the four promises revealed in
      turn
- [x] Our team (`#our-team`): verified facts only (founder & convener; 80+ volunteers and team
      leads)
- [x] Keep exploring: The Community, How We Grow, Our Work teasers with photo hover, and Join
- [x] Footer "About" links land on the right sections

### Site-wide
- [x] Header: real FF logo, full menu on desktop (1280px and up), accessible full-screen menu
      on phones and tablets
- [x] Browser-tab icon replaced with the FF logo
- [x] Design: Fraunces headlines, Google Sans body text, extended purple / lilac / gold colours,
      "rising arc" visual motif
- [x] Photos: 8 conference photos, badge cropped off, AVIF/WebP at several sizes (8–60 KB each)
- [x] Gentle fade-in animations; switched off for "reduce motion" users; content never hidden
      if JavaScript fails
- [x] Skip-to-content link; pages open at the top; links to #sections scroll correctly
- [x] Every page prerendered to plain HTML (good link previews on WhatsApp/Facebook)
- [x] All "Join the Community" buttons link to www.femmefluenceafrica.org (same tab)
- [x] Animated gold underline for text links; shared link component for site, external and
      #anchor links
- [x] Headlines don't jump while fonts load: fixed line breaks on the two big headlines, plus a
      width-matched fallback font
- [x] Faint caption text darkened to meet WCAG AA contrast

### Forms and email (code complete; tested only against a simulated Resend)
- [x] Contact form on `/contact/`: enquiry emailed to the inbox (visitor set as Reply-To),
      confirmation emailed to the visitor
- [x] Newsletter sign-up in the footer of every page: subscriber saved in a Resend segment,
      welcome email to new subscribers, no duplicates
- [x] Both forms: checks in the browser and on the server, spam protection, rate limit,
      loading / success / error messages, never report a false success
- [x] `npm run dev` runs the forms' server code locally, so no Vercel connection is needed

## Not done yet

### Waiting on the owner
- [ ] **Footer details:** which social platforms use the "Femmefluenceafrica" handle; which
      contact email to show (hello@femmefluenceafrica.org, or contactfemmefluence@gmail.com
      until hello@ exists); logo in website purple or letterhead plum
- [ ] **Testimonials:** real quotes with names and permission (space is ready in Programme
      highlights)
- [ ] **Real email test:** create a full-access Resend API key and a "Newsletter" segment, then
      add `RESEND_API_KEY` and `NEWSLETTER_SEGMENT_ID` to `.env.local`
- [ ] **hello@femmefluenceafrica.org inbox:** create it (e.g. Resend Inboxes; needs receiving
      enabled on the domain, which is a DNS step)
- [ ] **Confirm** this GitHub repo is *not* connected to the Vercel project that serves
      www.femmefluenceafrica.org
- [ ] **Review the draft wording** on the homepage: the four-directions one-liners, the
      programme descriptions, the "Find your way in" rows and the conference description
- [ ] **Review the new wording on Who We Are:** the section headlines ("It began with a space
      young women rarely find.", "Seven convictions shape everything we do.", "See where
      becoming leads."), the team lines and the three teaser descriptions
- [ ] **Founder photo** for Who We Are (no photo is labelled as the founder until supplied)
- [ ] **Recognition and partners:** permission to mention the Youth Leadership Award (Dr.
      Christopher Irobunda Foundation, 2026) and the partners listed on the Impact Snapshot
- [ ] **Palette decision:** keep the current gold (#c59b4e) or move the whole site to the lighter
      #F3D57A suggested in the redesign brief

### Website build
- [ ] **Footer redesign (stage 4):** logo, contact details, social links, tidier link columns
- [ ] **Our Work page:** replace the outdated figures (1,000+ reached etc.) with the Snapshot
      figures; the conference link currently goes nowhere (`#`)
- [ ] **Redesign Contact** to match the new style
- [ ] **Broken section links:** the footer's Volunteer, Mentor, Partner and Sponsor links point to
      `/get-involved#…` sections that don't exist yet (fix when Get Involved is built)
- [ ] **Build the placeholder pages:** The Community, How We Grow, Get Involved, Stories & Ideas
      (Stories & Ideas is planned for phase 2)
- [ ] **Privacy policy page**, linked next to both forms
- [ ] **"Page not found" (404) page**
- [ ] **Decide on newsletter double opt-in** (subscribers confirm by email)

### Before go-live
- [ ] Plan and test routing so the main site serves `/` and the sign-up page serves `/signup`,
      without breaking either site's API endpoints (current `vercel.json` sends every unknown
      address to the homepage)
- [ ] Switch `JOIN_URL` in `src/links.ts` to the `/signup` address
- [ ] Add the environment variables in Vercel
- [ ] Check on a Vercel preview that the shared server file (`api/_lib/shared.ts`) loads
      correctly for both forms
- [ ] Optional: a Vercel Firewall rate-limit rule for `/api/*` (the built-in limit is
      best-effort)
- [ ] End-to-end test of both forms on the preview, then owner approval

### Housekeeping
- [ ] Update `README.md` (status section; it still says the site uses Google Sans only)
- [ ] Two photos aren't used yet (`attendees`, `speaker-joy`); use them on inner pages or remove
- [ ] The list of pages is kept twice (`src/routes.tsx` and `scripts/prerender.mjs`); keep them
      in sync or merge them

## Decisions made

| Decision | Detail |
|---|---|
| Sign-up | Handled by the separate sign-up site; the spec's Google Sheets + Brevo plan is dropped |
| Email | Resend for everything (contact form, newsletter); never Brevo |
| Newsletter | Collected on this website, stored as Resend contacts in a "Newsletter" segment |
| Contact inbox | hello@femmefluenceafrica.org; domain femmefluenceafrica.org is verified in Resend |
| Sender | `FemmeFluence Africa <hello@femmefluenceafrica.org>` (env var `EMAIL_FROM`) |
| Resend key | Must have **full access** (sending-only keys can't save subscribers) |
| Impact figures | September 2026 Impact Snapshot, except "100+ personally mentored" |
| Fonts | Fraunces for headlines (owner's choice over the spec's all-sans); Google Sans for body text |
| Italics | Only the word "becoming." in the headline; Fraunces' other italic letters look too quirky |
| Photos | Amazon Conference photos approved; more may come as Cloudinary links |
| Framework | React + Vite with prerendering (deliberate deviation from the spec's Next.js) |

## How to check the site locally

1. In this folder, run `npm run dev` and open `http://localhost:5173`.
2. Make the browser narrow, or use a phone on the same Wi-Fi (`npm run dev -- --host`, then open
   the "Network" address it shows).
3. Before committing, run `npm run build` and `npm run lint`; both should finish without errors.
