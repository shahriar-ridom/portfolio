# Shahriar Ridom's Portfolio

A personal website where I show the software I build, say a little about who I am, and let people get in touch.

It is a clean, light, minimalist site with hand-drawn line art. It is fast, works well with a keyboard and screen readers, and is easy for me to update without touching code.

## What is this site?

Visitors can:

- **Home (`/`)**: meet me and see my featured projects.
- **Projects (`/projects`)**: browse everything I've built. Each project also has its own page (`/projects/<name>`) with a description, the tech used, its status, and links to the source code and live demo.
- **About (`/about`)**: read how I work, what I'm interested in, and the tools I use.
- **Contact (`/contact`)**: send me a message through a form that is delivered straight to my inbox.

I also have a private **admin panel (`/admin`)**. After I sign in with a password, I can add, edit, reorder and delete projects from the browser. I can also pick or upload a small doodle for each one. No code change or redeploy is needed.

## Why does it exist?

- **A home for my work.** One place that shows what I build: native Linux apps in Rust and GTK4, systems tools, and web projects.
- **A way to be found and contacted.** Recruiters, collaborators and curious people can see my work and reach me.
- **A project in itself.** I built the site with the same care I'd put into any product: performance, accessibility, SEO and security.

## Technology

| Area | What I used |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router, Turbopack, Cache Components) |
| UI | React 19 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (works with Neon, Supabase or any Postgres) |
| Database toolkit | [Drizzle ORM](https://orm.drizzle.team) and drizzle-kit |
| Email | [Resend](https://resend.com) HTTP API |
| Icons | `lucide-react` plus two custom outline icons |
| Font | Source Sans 3, self-hosted |
| Hosting | Built for [Vercel](https://vercel.com), but runs anywhere Node.js does |

### Highlights

- **Fast.** Pages are cached, CSS is inlined, there are no raster images (illustrations are inline SVG), and there is very little client-side JavaScript.
- **Accessible.** It has a skip link, visible focus outlines, proper landmarks, AA contrast, labelled form fields, and it respects "reduce motion".
- **SEO-ready.** It has page titles and descriptions, canonical URLs, a sitemap, `robots.txt`, generated social share images, and structured data (JSON-LD).
- **Safe.** Contact and login are rate-limited, and the contact form has a honeypot to catch bots. Admin sessions are signed cookies, and uploaded SVG doodles are sanitized. The server refuses to start in production with a broken config.
- **Honest contact form.** It validates in the browser and again on the server. If email isn't configured, it says the message wasn't sent. It never pretends it was.

## Run it yourself

You need Node.js 20 or newer and a Postgres database.

```bash
# 1. Install dependencies
npm install

# 2. Create your settings file
cp .env.example .env.local
# then fill in the values (see the table below)

# 3. Create the database table
npm run db:push

# 4. Start the dev server at http://localhost:3000
npm run dev
```

Then open `/admin`, sign in, and add your first project.

### Settings (`.env.local`)

| Variable | Required? | What it does |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Postgres connection string |
| `ADMIN_PASSWORD` | For admin | Password for `/admin` (12+ characters recommended) |
| `SESSION_SECRET` | For admin | Long random string, 32+ characters. Generate one with `openssl rand -base64 48` |
| `NEXT_PUBLIC_SITE_URL` | In production | Your public URL, used for canonical links, the sitemap and structured data |
| `RESEND_API_KEY` | For contact form | Your Resend API key |
| `CONTACT_FROM_EMAIL` | For contact form | Verified sender, e.g. `Portfolio <contact@your-domain.com>` |
| `CONTACT_TO_EMAIL` | Optional | Where messages go. Defaults to the email in `src/data/profile.ts` |

### Useful commands

```bash
npm run dev         # development server
npm run build       # production build
npm start           # serve the production build
npm run lint        # check code style
npx tsc --noEmit    # type check
npm run db:push     # sync the database schema
```

## Making it yours

- **Personal info** (name, email, bio, social links, About page text): edit `src/data/profile.ts`.
- **Projects**: use the admin panel at `/admin`. They are stored in the database.
- **Look and feel** (colours, spacing, fonts): the design tokens are in `src/app/globals.css`.

## Project layout

```
src/
  app/            Pages and routes (home, projects, about, contact, admin)
  components/     UI pieces (header, footer, hero, project rows, forms, admin tools)
  components/illustrations/   Hand-drawn SVG art
  data/profile.ts Personal info and About content
  db/             Database connection, schema and queries
  lib/            Auth, rate limiting, validation, SEO, doodle handling
```

## Contact

- Email: [info@ridom.dev](mailto:info@ridom.dev)
- GitHub: [shahriar-ridom](https://github.com/shahriar-ridom)
- LinkedIn: [shahriar-ridom](https://www.linkedin.com/in/shahriar-ridom)
