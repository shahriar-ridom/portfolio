import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { pgClient?: ReturnType<typeof postgres> };

function client() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set. See .env.example.");
  // prepare:false keeps this compatible with pooled connections (Neon, pgbouncer).
  return postgres(url, { prepare: false, max: 5 });
}

const pg = (globalForDb.pgClient ??= client());
if (process.env.NODE_ENV !== "production") globalForDb.pgClient = pg;

export const db = drizzle(pg, { schema });
