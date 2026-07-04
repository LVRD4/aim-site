# CLAUDE.md — Angela Ingram Media

Context for Claude Code. Read this fully before generating anything. This file reflects the approved mockup (`angela-ingram-mockup.html`) — build the real site to match it.

## What we're building

A marketing site for **Angela Ingram** — Strategic Communications & Media Relations consultant, Cincinnati, OH. Brand **AIM (Angela Ingram Media)**, tagline **"Aim Higher. Deliver With Impact."** Premium, navy + gold, headshot-forward, with a Cincinnati skyline behind the hero. Showcases her work, story, and services; visitors reach her via a contact form OR direct email/phone.

## ⚠️ IMPORTANT — Image, video & font rights (read every time)

**Never put any photo, video, font, or asset into the build that Angela doesn't own or have a license for.**

- The **Cincinnati skyline image in the hero is a PLACEHOLDER** (likely stock) and **must be replaced with a licensed or owned photo before launch.**
- The **training-carousel photos** and **videography thumbnails** are placeholders too — only ship real media Angela has rights to.
- Do **not** pull images from the web/Google into the build. If real media isn't available yet, keep a styled placeholder and leave a `// TODO: licensed asset` comment.
- Prefer assets Angela uploads through the CMS over anything hardcoded.

## Stack (do not substitute without asking)

- Next.js (App Router) + TypeScript, React Server Components
- Tailwind CSS v4 (`@theme` tokens in `globals.css`)
- **Sanity** CMS — Studio embedded at `/studio`
- Embla carousel (`embla-carousel-react`, `embla-carousel-autoplay`)
- `lite-youtube-embed` for video
- Vercel hosting, GitHub repo
- Contact form handler: a Next.js Route Handler using **Resend** (or Formspree if she prefers no backend)

## Design tokens (her exact palette — use these names)

```css
@theme inline {
  --color-deep: #20445c; /* primary brand: hero, deep sections, buttons */
  --color-deepest: #173140; /* footer, deepest layering, gradient ends */
  --color-gold: #c2a878; /* sharp accent — use sparingly */
  --color-light: #dce6ec; /* light section backgrounds */
  --color-line: #d9d9d9; /* borders, dividers */
  --color-gray: #3c5462; /* muted body text */
  --color-ink: #152734; /* near-black headings on light */
}
```

- Headings: refined serif (Fraunces). Body: clean sans (Inter). Script accent (Pinyon Script) for Angela's signature only.
- Hero background = the skyline photo, partly desaturated + navy-tinted, under a left→right navy gradient (≈.94 → .50) so white text stays readable. Skyline shows strongest in the center gap between text and portrait.
- **Apply the `frontend-design` skill.** Must look custom and premium — no templated defaults.

## Page architecture (single home page + `/studio`)

1. **Sticky nav** — AIM wordmark · Home / About / Services / Contact · "Contact Angela" button (→ #contact).
2. **Hero** — skyline-photo background; eyebrow, serif headline (one word emphasized in gold), lead, two CTAs, social row; framed portrait with the "Aim Higher. Deliver With Impact." banner (mirrors her cover).
3. **About** — bio + script signature on the left; **Experience** list on the right (see data below).
4. **Services overview** — 4 cards (Training, Consultation, Videography, Public Speaking & MC). Each card is an anchor link that scrolls to its detail section.
5. **Training** (#training) — copy + bullet list + **photo carousel** (training photos only).
6. **Consultation** (#consultation) — copy + bullet list + image.
7. **Videography** (#videography, dark) — copy + **video thumbnail grid**; clicking a thumbnail opens a modal player (embedded YouTube via `lite-youtube`) and each tile also links out to YouTube.
8. **Public Speaking & MC** (#speaking) — copy + bullet list + image.
9. **Contact** (#contact, dark) — **contact form** (name, email, subject, message) AND direct options (mailto, tel, socials).
10. **Footer** — wordmark, nav, copyright.
    (There is **no** testimonials/reviews section — it was removed.)

## CMS: make text, photos, and videos editable in Sanity (most of the page)

Angela should be able to edit nearly everything without a developer. Model it so each section reads from Sanity:

| Document                   | Editable fields                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `siteSettings` (singleton) | logo, tagline, email, phone, social links, nav labels, contact-form recipient email                                        |
| `hero` (singleton)         | eyebrow, headline + emphasized word, lead, CTA labels, **heroBackgroundImage** (skyline), **portraitImage**, taglineBanner |
| `about` (singleton)        | bio (portable text), signatureName                                                                                         |
| `experience`               | role, organization, location, startDate, endDate, isCurrent, order (see data below)                                        |
| `service`                  | key (`training`/`consultation`/`videography`/`speaking`), title, summary (card), detailIntro, bulletPoints[], image, order |
| `trainingPhoto`            | image, caption, displayFrom, displayUntil, order — feeds the Training carousel                                             |
| `videoItem`                | title, youtubeId (or url), customThumbnail (optional), displayFrom, displayUntil, order — feeds the Videography grid       |

- **Images:** Sanity image fields with hotspot/crop; render via `urlFor()` + `next/image`.
- **Videos:** store `youtubeId`; render with `lite-youtube-embed`. Support an optional uploaded thumbnail.
- **Text:** all headings/body that vary by section come from Sanity, not hardcoded strings.
- **Scheduled media** (photos/videos appear or rotate on a schedule): filter queries by `now()` against `displayFrom`/`displayUntil`; use ISR (`revalidate`) or a Sanity webhook for on-demand revalidation.

## Experience data (real — seed these into Sanity)

1. Founder & Principal Consultant — Angela Ingram Media — Present _(current)_
2. Senior Communications Strategist & Instructor — Julie Parker Communications — Jan 2025–Present _(current)_
3. Director of Communications — Louisville Metro Police Department, Louisville, KY — Jan 2022–Jan 2025 (3 yrs)
4. Communications Coordinator — Forest Hills School District, Cincinnati, OH — Oct 2020–Dec 2021 (1 yr)
5. General Assignment Reporter & Fill-in Anchor — WKRC, Local 12 News, Cincinnati, OH — Dec 2006–Oct 2020 (14 yrs)
6. General Assignment Reporter & Fill-in Anchor — WSBT, News 22, South Bend, IN — May 2001–Nov 2006 (5 yrs)

## Services (4)

Training · Consultation · Videography (storytelling) · Public Speaking & MC. Each gets a card (overview) and a detail section. Training detail = photo carousel. Videography detail = video grid with in-site player + YouTube links.

## Contact form

- Fields: name, email, subject, message. Submit via a Next.js Route Handler that emails `siteSettings.contactRecipient` using **Resend** (`RESEND_API_KEY`). Validate, handle errors in the form's own voice, show a success state.
- Keep the **direct** options alongside it (mailto with prefilled subject/body, tel, socials). Angela originally wanted no form; she now wants both — ship both.
- No backend secrets in the client; the API key lives in Vercel env vars only.

## Conventions

- Server Components by default; `"use client"` only for carousel, video modal, and the form.
- Centralize GROQ in `sanity/queries.ts` with typed helpers (`next-sanity`).
- Accessibility: semantic landmarks, CMS-driven alt text, keyboard-navigable carousel + modal, visible focus, `prefers-reduced-motion` respected.
- Anchor links scroll smoothly to service sections.

## Env

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

## Build order

1. Scaffold Next.js + Tailwind v4 + deps. 2. Tokens, fonts, Nav/Footer. 3. Sanity config + schemas + `/studio` + client/queries. 4. Hero (skyline bg + portrait). 5. About + Experience. 6. Services overview + 4 detail sections. 7. Training carousel. 8. Videography grid + video modal. 9. Contact form (Resend route) + direct options. 10. Scheduled-media filtering + revalidation. 11. Seed content; deploy; QA on mobile.

## Ownership

Angela owns the Vercel + Sanity accounts and domain; we're collaborators. No personal credentials in the repo.
