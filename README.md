# Shahriar Ridom — Personal Portfolio

A minimalist, soft-UI developer portfolio built with Next.js (App Router), TypeScript and Tailwind CSS. The visual direction follows a supplied reference image: light, editorial, monochromatic, thin outline icons and hand-drawn line art.

## Contents

1. [Stack](#stack)
2. [Getting started](#getting-started)
3. [Project structure](#project-structure)
4. [Pages and features](#pages-and-features)
5. [Design system](#design-system)
6. [Content and data](#content-and-data)
7. [Contact form](#contact-form)
8. [Performance](#performance)
9. [SEO and structured data](#seo-and-structured-data)
10. [Accessibility](#accessibility)
11. [Verification status](#verification-status)
12. [Open items](#open-items)
13. [Decision log](#decision-log)

## Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16.4.5, App Router, Turbopack, Cache Components, partial prefetching |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Icons | `lucide-react` (thin outline, 1.25 stroke) plus two custom outline brand icons |
| Font | Source Sans 3, self-hosted variable woff2 |
| Email delivery | Resend HTTP API (no SDK dependency) |
| UI kit | shadcn/ui was not added; nothing genuinely required it |

## Getting started

```bash
npm install
npm run dev        # development server
npm run lint       # ESLint
npx tsc --noEmit   # type check
npm run build      # production build
npm start          # serve the production build
```

Copy `.env.example` to `.env.local` and fill it in (see [Contact form](#contact-form)). `.env*` is git-ignored except `.env.example`.

## Project structure

```
src/
  app/
    layout.tsx            Root layout, metadata, font preload, WebSite JSON-LD
    template.tsx          Remounts per navigation; drives the page fade
    page.tsx              Home: hero + projects
    about/page.tsx        About page
    contact/page.tsx      Contact page
    contact/actions.ts    Server action that validates and sends the message
    globals.css           Tokens, @font-face, keyframes, utilities
    fonts/                Self-hosted Source Sans 3 (Latin, wght 400-600)
    icon.svg              Favicon
    opengraph-image.tsx   Generated social share image (1200x630)
    robots.ts, sitemap.ts
  components/
    site-shell.tsx        Page frame, skip link, header/main/footer landmarks
    site-header.tsx       Wordmark, nav, icon links (server component)
    nav-links.tsx         Only client piece of the header (active-page state)
    site-footer.tsx
    hero.tsx
    projects-section.tsx, project-row.tsx, status-badge.tsx
    contact-form.tsx      Client form with validation and states
    json-ld.tsx           Safe JSON-LD script renderer
    icons.tsx             Custom GitHub and LinkedIn outline icons
    illustrations/
      hero-illustration.tsx   Hand-drawn line art scene
      project-visual.tsx      One small line-art visual per project
  data/
    profile.ts            Name, email, summary, socials, nav, About content, site URL
    projects.ts           The project list
  lib/
    contact.ts            Shared validation rules and form state types
    schema.ts             schema.org JSON-LD objects
```

## Pages and features

### Layout
- The site is full page: white background, no floating container. Content is centred with a 1200px maximum width and responsive side padding.
- Header: wordmark "Shahriar Ridom" pinned to the left, centred navigation (Main Portfolio, Projects, About), and email, GitHub and contact icon links on the right. On narrow screens the navigation moves to a second row.
- The active page is shown with an underline and `aria-current="page"`, so it does not rely on colour. Hover draws the underline in.
- Footer: name, plus GitHub, LinkedIn and email links.

### Home (`/`)
- Hero: short greeting, heading "I Build Things for the Digital World.", a short description, the primary button "Explore My Work" and the text link "Get in Touch".
- Hero illustration: hand-drawn monochrome SVG of a developer lying on the floor beside a laptop, with floating code windows, braces, a lightbulb and a plant.
- Projects ("Things I've Built."): seven alternating rows, not a card grid. Each row has a line-art visual, status badge, name, description, technologies, a GitHub link and an optional live-demo link. The section ends with one primary button, "See more on GitHub".

### About (`/about`)
Editorial two-column layout: personal introduction, how I work, interests, tools by group, social links, and a closing "Get in touch" button.

### Contact (`/contact`)
Welcome heading, invitation, email, GitHub and LinkedIn links, and a form with name, email, subject and message.

### Motion
- One staggered hero entrance and a short page fade on navigation.
- Slow floating hero illustration and drifting code windows.
- Hover underline on nav links, colour fill on buttons, slight lift on project visuals, press scale on buttons.
- Smooth scrolling.
- All animation and smooth scrolling are disabled under `prefers-reduced-motion: reduce`.

## Design system

Tokens live in the `@theme` block in `src/app/globals.css`.

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#ffffff` | Page background |
| `ink` | `#353535` | Primary text |
| `ink-soft` | `#6a6a6a` | Secondary text (WCAG AA on white) |
| `line` | `#eaeaea` | Decorative borders and dividers |
| `line-strong` | `#d4d6d5` | Stronger decorative borders |
| `control` | `#8a8d8c` | Form control borders (3:1 non-text contrast) |
| `wash` | `#f6f6f5` | Quiet panels and project visual backgrounds |

Typography is a single family, Source Sans 3, at weights 400 and 600, with generous line height and line lengths kept under about 80 characters. Illustrations use a 2.2px near-black stroke with round caps and joins. Accent colour is not used; hierarchy comes from weight, spacing and thin borders.

## Content and data

Edit content in two files, not in components:

- `src/data/profile.ts`: name, email, intro, summary, social links, navigation, About page content and `siteUrl`.
- `src/data/projects.ts`: each project has `slug`, `name`, `description`, `tech`, `status` (`Active`, `Experimental`, `Stable` or `Planned`), `github` and optional `live`.

Adding a project needs a new entry in `projects.ts` and a matching small drawing in the `motifs` map in `src/components/illustrations/project-visual.tsx`, keyed by `slug`.

Initial projects: Hyprdeck, Luma, Luma Music, AppDrop, SessionBar, Native WhatsApp Client, Full-stack Blog.

## Contact form

- Validation rules are shared in `src/lib/contact.ts` and run twice: in the browser for instant feedback (focus moves to the first invalid field) and again on the server in `src/app/contact/actions.ts`.
- The form works without JavaScript before hydration because it submits through a server action.
- A hidden honeypot field silently discards bot submissions.
- Delivery uses the Resend API. Required environment variables:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_FROM_EMAIL` | Verified sender, for example `Portfolio <contact@your-domain.com>` |
| `CONTACT_TO_EMAIL` | Optional recipient; defaults to the email in `profile.ts` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for canonical links, sitemap and JSON-LD |

- States: inline field errors, a success panel, a send-failure alert, and an "unavailable" alert. If the email service is not configured, the form says the message was not sent and points to the email address. It never reports success without actually sending.

## Performance

- CSS is inlined into the HTML (`experimental.inlineCss`), so no stylesheet request blocks first paint.
- The font is one self-hosted 26 KB Latin variable file, preloaded in `<head>`, with a metric-matched Arial fallback (`size-adjust`, ascent and descent overrides) to prevent layout shift. The preload URL and the `@font-face` URL are identical, so it downloads once.
- There are no raster images. Illustrations are inline SVG with fixed `width` and `height`. The favicon is SVG and the share image is generated at build time.
- Client JavaScript is limited to the nav active-state component and the contact form. The header and footer are server components. The rest is the Next and React runtime.
- Animations use only `transform` and `opacity`, the floating hero has a compositing hint, and transitions list specific properties instead of `transition-all`.
- The page fade starts at 40% opacity and the hero heading uses a transform-only entrance, so the largest text is never hidden at first paint.
- Project rows use `content-visibility: auto` with an intrinsic size reserve.
- All routes are statically prerendered.
- `X-Powered-By` is disabled. Responses carry `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and `Permissions-Policy`.

Measured on the production build: home page HTML is about 144 KB raw and 24 KB gzipped, with zero stylesheet links. The inlined CSS is repeated inside Next's page payload, a known side effect of the inline CSS option.

## SEO and structured data

- Root metadata: `metadataBase`, title template, description, keywords, authors, Open Graph, Twitter card, robots.
- Per-page titles, descriptions and canonical URLs for Home, About and Contact.
- `robots.txt`, `sitemap.xml`, favicon and a generated Open Graph image.
- Semantic HTML: `header`, `nav`, `main`, `footer`, one `h1` per page, `section` elements labelled by their headings, `article` per project, definition lists for About content.
- JSON-LD through `src/lib/schema.ts`, rendered by `JsonLd` (which escapes `<`):
  - all pages: `WebSite`
  - Home: `Person` plus an `ItemList` of projects as `SoftwareSourceCode`
  - About: `ProfilePage`
  - Contact: `ContactPage`
- One primary call to action per section: hero ("Explore My Work"), projects ("See more on GitHub"), About ("Get in touch") and Contact (submit). Other links are text links.

## Accessibility

- Skip link to main content; landmarks for banner, primary nav, main, social links nav and footer.
- Every interactive element is a native link, button or input and is keyboard operable. No focus traps.
- Visible 2px focus outline on every focusable element, using the element's own shape.
- Contrast meets WCAG AA for text; form control borders meet 3:1.
- Form fields have visible labels, "(required)" text, `aria-required`, `aria-invalid` and `aria-describedby` linking to error text. Errors and status use text and icons, not colour alone. Failure messages use `role="alert"`, success uses `role="status"`.
- Icon-only links have descriptive `aria-label`s. Links that open a new tab say so for screen readers.
- Layout uses rem units and a grid header that reflows, so text can be zoomed to 200%.
- Reduced motion is respected for all animations and smooth scrolling.

## Verification status

Done and passing:
- `npx tsc --noEmit`, `npm run lint` and `npm run build` pass.
- All routes return 200 from `next start`; HTML contains no stylesheet links, four JSON-LD blocks on Home, one on About and one on Contact, the canonical link, and the font preload.
- The hero illustration was rendered separately to PNG and reviewed.

Not done:
- No in-browser visual review of any page, because the development machine has no browser and the screenshot tool requires one.
- No Lighthouse or axe run, and no manual keyboard or screen reader pass.
- The contact form's real delivery has not been tested against Resend.

## Open items

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain. It defaults to `http://localhost:3000`, which makes canonical URLs, the sitemap and JSON-LD wrong until set.
2. Verify the guessed URLs in `src/data/profile.ts` (GitHub handle taken from git config, LinkedIn guessed) and the seven repository URLs in `src/data/projects.ts`. They also feed the structured data.
3. Review project descriptions; they go slightly beyond the original one-line briefs.
4. Configure Resend and the environment variables to enable the contact form.
5. Add live demo URLs (`live`) where they exist.
6. The public email `shahriarridom.info@gmail.com` is taken from the account context; confirm it is the one to publish.

## Decision log

- Interpreted "HELLO, I'M SHA HRIAR" as a typo and used "Hello, I'm Shahriar."
- Used a plain underline for the active nav item instead of the reference's strikethrough, which reads as "deleted".
- Projects are alternating rows rather than a card grid, following the brief's instruction not to fill every section with cards. The Projects nav link scrolls to `#projects` on the home page; there is no separate projects page.
- Dropped Lucide brand icons (removed upstream) in favour of two small custom outline icons.
- Replaced `next/font/google` with a self-hosted font plus manual preload, because Next emitted no preload for the static shell and shipped 15 `@font-face` rules.
- Chose Resend over a mailto-only form so the form can really send; without credentials it reports that honestly.
- Wordmark changed from "Shahriar" to "Shahriar Ridom" and pinned left; the footer and structured data already used the full name. Page titles still use "Shahriar".
- Context7 documentation lookups were unavailable (server connection timeout), so Next.js behaviour was checked against the docs bundled in `node_modules/next/dist/docs`.
