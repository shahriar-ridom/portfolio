import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const headerMap = new Map<string, string>();
vi.mock("next/headers", () => ({ headers: async () => ({ get: (k: string) => headerMap.get(k) ?? null }) }));

import { clientIp, hit } from "@/lib/rate-limit";

beforeEach(() => {
  vi.useFakeTimers();
  headerMap.clear();
});
afterEach(() => vi.useRealTimers());

describe("hit", () => {
  it("allows up to limit then blocks with retry seconds", () => {
    expect(hit("a", 2, 10_000)).toBe(0);
    expect(hit("a", 2, 10_000)).toBe(0);
    expect(hit("a", 2, 10_000)).toBe(10);
  });

  it("resets after window", () => {
    hit("b", 1, 1000);
    expect(hit("b", 1, 1000)).toBeGreaterThan(0);
    vi.advanceTimersByTime(1001);
    expect(hit("b", 1, 1000)).toBe(0);
  });

  it("tracks keys independently", () => {
    hit("c", 1, 1000);
    expect(hit("d", 1, 1000)).toBe(0);
  });
});

describe("clientIp", () => {
  it("prefers x-real-ip", async () => {
    headerMap.set("x-real-ip", "1.1.1.1");
    headerMap.set("x-forwarded-for", "2.2.2.2");
    expect(await clientIp()).toBe("1.1.1.1");
  });

  it("uses first x-forwarded-for entry", async () => {
    headerMap.set("x-forwarded-for", "2.2.2.2, 3.3.3.3");
    expect(await clientIp()).toBe("2.2.2.2");
  });

  it("falls back to unknown", async () => {
    expect(await clientIp()).toBe("unknown");
  });
});
