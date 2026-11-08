import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 24; // 1 day

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("SESSION_SECRET must be set to at least 32 characters.");
  return s;
}

// The key includes the password, so changing ADMIN_PASSWORD revokes every existing session.
const sign = (payload: string) => createHmac("sha256", `${secret()}:${process.env.ADMIN_PASSWORD ?? ""}`).update(payload).digest("base64url");

const sha = (v: string) => createHash("sha256").update(v).digest();

/** Constant-time password check against ADMIN_PASSWORD. False when the admin isn't configured. */
export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return timingSafeEqual(sha(candidate), sha(expected));
}

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET);

export async function startSession() {
  const expires = Date.now() + MAX_AGE * 1000;
  const payload = String(expires);
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  // Opt out of prerendering before touching the clock or cookies: auth is per request.
  await connection();
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [payload, mac] = value.split(".");
  if (!payload || !mac) return false;
  const expected = sign(payload);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  return Number(payload) > Date.now();
}

/** Call at the top of every admin page and every admin server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
