import { beforeEach, describe, expect, it, vi } from "vitest";

const store = new Map<string, string>();
vi.mock("next/headers", () => ({
  cookies: async () => ({
    set: (k: string, v: string) => store.set(k, v),
    get: (k: string) => (store.has(k) ? { value: store.get(k) } : undefined),
    delete: (k: string) => store.delete(k),
  }),
}));
vi.mock("next/server", () => ({ connection: async () => {} }));
vi.mock("next/navigation", () => ({
  redirect: (to: string) => {
    throw new Error(`REDIRECT:${to}`);
  },
}));

import { adminConfigured, checkPassword, endSession, isAdmin, requireAdmin, startSession } from "@/lib/auth";

beforeEach(() => {
  store.clear();
  vi.useRealTimers();
  process.env.SESSION_SECRET = "s".repeat(32);
  process.env.ADMIN_PASSWORD = "hunter2";
});

describe("checkPassword", () => {
  it("matches only correct password", () => {
    expect(checkPassword("hunter2")).toBe(true);
    expect(checkPassword("wrong")).toBe(false);
  });
  it("false when unconfigured", () => {
    delete process.env.ADMIN_PASSWORD;
    expect(checkPassword("")).toBe(false);
    expect(adminConfigured()).toBe(false);
  });
});

describe("session", () => {
  it("start -> isAdmin true, end -> false", async () => {
    await startSession();
    expect(await isAdmin()).toBe(true);
    await endSession();
    expect(await isAdmin()).toBe(false);
  });

  it("rejects tampered cookie", async () => {
    await startSession();
    const [payload, mac] = store.get("admin_session")!.split(".");
    store.set("admin_session", `${Number(payload) + 1000}.${mac}`);
    expect(await isAdmin()).toBe(false);
  });

  it("rejects expired session", async () => {
    vi.useFakeTimers();
    await startSession();
    vi.advanceTimersByTime(25 * 60 * 60 * 1000);
    expect(await isAdmin()).toBe(false);
  });

  it("password change revokes session", async () => {
    await startSession();
    process.env.ADMIN_PASSWORD = "other";
    expect(await isAdmin()).toBe(false);
  });

  it("requireAdmin redirects when logged out", async () => {
    await expect(requireAdmin()).rejects.toThrow("REDIRECT:/admin/login");
  });

  it("short secret throws", async () => {
    process.env.SESSION_SECRET = "short";
    await expect(startSession()).rejects.toThrow(/SESSION_SECRET/);
  });
});
