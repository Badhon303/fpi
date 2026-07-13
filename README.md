# Forum for Policy Insight (FPI) Bangladesh

Institutional website for FPI Bangladesh — a national, independent, non-partisan
platform for evidence-based policy dialogue, research, and stakeholder engagement.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**,
**GSAP** (signature convening animation), and **Framer Motion** (micro-interactions).

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint (next/core-web-vitals)
```

## Design language — "Institutional Dossier"

A serious, editorial, think-tank aesthetic. Deep ink navy, warm parchment, forest
green, and brass accents; Fraunces (display serif) + Inter (sans) + IBM Plex Mono
(labels). Hairline rules, generous whitespace, and restrained, purposeful motion.

Design tokens live in `tailwind.config.ts` and `src/app/globals.css`.

## Signature element — the Convening Diagram

`src/components/ConveningDiagram.tsx` renders an SVG where four stakeholder nodes
(Policymakers, Business & Industry, Research & Academia, Civil Society) slide in
along curved paths and connect into a central **FPI** node. Three variants:

- `hero` — full animated diagram (GSAP timeline + MotionPathPlugin)
- `divider` — simplified static 3-node connector between sections
- `footer-mark` — static diamond mark used as the de-facto logo motif

All motion respects `prefers-reduced-motion`; GSAP ScrollTriggers are scoped via
`gsap.context` in `src/hooks/useGSAP.ts` so they clean up on route changes.

## Content

All site copy is drawn verbatim from the source institutional profile and lives in
one typed source of truth: `src/content/site.ts`. Editing copy there updates every
page.

## Pages

- `/` — Home (animated hero + section overview of all content)
- `/about` — Who we are, mission & vision, principles, governance, funding
- `/what-we-do` — Six functional areas + initial research priorities
- `/trade-policy` — Priority focus, scope of work, Bangladesh–US Business Forum 2026
- `/membership` — Five membership categories + charter terms
- `/contact` — Routing info + validated inquiry form
  (supports `?inquiry=Membership` prefill)

## Contact form

`src/components/ContactForm.tsx` (React Hook Form + Zod) posts to
`src/app/api/contact/route.ts`. The API route **validates and logs** the inquiry —
it is a stub. To enable real delivery, implement the `deliver()` function
(e.g. Resend or SMTP). No secrets are committed; add any provider keys via
environment variables.

## Notes / assumptions

- **Logo:** `public/fpi-logo.png` is the provided FPI wordmark (navy + brass with a
  growth-chart icon). It is used in the header on solid backgrounds; a reversed
  text wordmark is shown over the dark hero.
- **Fonts:** loaded via `next/font/google` and self-hosted at build time. A network
  connection is needed the first time they are fetched; otherwise the site falls
  back to Georgia / system-ui gracefully.
- **Founding stage:** the site consistently notes that the Governing Board and
  Secretariat are currently being constituted, per the source document.
