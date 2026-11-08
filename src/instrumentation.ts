/** Runs once at server start: fail fast on broken config instead of at the first request. */
export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.NODE_ENV !== "production") return;
  const { ADMIN_PASSWORD, SESSION_SECRET, DATABASE_URL, NEXT_PUBLIC_SITE_URL } = process.env;
  if (!DATABASE_URL) throw new Error("DATABASE_URL is not set.");
  if (ADMIN_PASSWORD && (!SESSION_SECRET || SESSION_SECRET.length < 32)) {
    throw new Error("SESSION_SECRET must be at least 32 characters when ADMIN_PASSWORD is set.");
  }
  if (ADMIN_PASSWORD && ADMIN_PASSWORD.length < 12) console.warn("ADMIN_PASSWORD is shorter than 12 characters.");
  if (!NEXT_PUBLIC_SITE_URL && !process.env.VERCEL_ENV) {
    console.warn("NEXT_PUBLIC_SITE_URL is not set: canonicals and the sitemap will use http://localhost:3000.");
  }
}
