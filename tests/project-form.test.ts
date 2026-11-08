import { describe, expect, it } from "vitest";
import { parseProjectForm, slugify } from "@/lib/project-form";

const form = (o: Record<string, string> = {}) => {
  const f = new FormData();
  const base = { name: "My Project", description: "A thing.", ...o };
  for (const [k, v] of Object.entries(base)) f.set(k, v);
  return f;
};

describe("slugify", () => {
  it("normalizes", () => {
    expect(slugify("  Hello, World! ")).toBe("hello-world");
    expect(slugify("---")).toBe("");
  });
});

describe("parseProjectForm", () => {
  it("parses minimal valid form with defaults", async () => {
    const r = await parseProjectForm(form(), false);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.project).toMatchObject({
        slug: "my-project",
        tech: [],
        status: "Active",
        github: null,
        live: null,
        featured: false,
        sortOrder: 0,
        doodleSvg: null,
      });
    }
  });

  it("requires name and description", async () => {
    const r = await parseProjectForm(form({ name: "", description: "" }), false);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.state.errors!)).toEqual(expect.arrayContaining(["name", "description", "slug"]));
  });

  it("dedupes tech case-insensitively, keeps order", async () => {
    const r = await parseProjectForm(form({ tech: "React, next, react , ,Next,Go" }), false);
    expect(r.ok && r.project.tech).toEqual(["React", "next", "Go"]);
  });

  it("limits tech to 12", async () => {
    const tech = Array.from({ length: 13 }, (_, i) => `t${i}`).join(",");
    const r = await parseProjectForm(form({ tech }), false);
    expect(!r.ok && r.state.errors?.tech).toBeTruthy();
  });

  it("rejects non-http urls", async () => {
    const r = await parseProjectForm(form({ github: "javascript:alert(1)", live: "not a url" }), false);
    expect(!r.ok && Object.keys(r.state.errors!)).toEqual(expect.arrayContaining(["github", "live"]));
  });

  it("rejects non-integer sortOrder", async () => {
    const r = await parseProjectForm(form({ sortOrder: "abc" }), false);
    expect(!r.ok && r.state.errors?.sortOrder).toBeTruthy();
  });

  it("falls back on bad status", async () => {
    const r = await parseProjectForm(form({ status: "Bogus" }), false);
    expect(r.ok && r.project.status).toBe("Active");
  });

  it("upload source needs file unless one is stored", async () => {
    const missing = await parseProjectForm(form({ doodleSource: "upload" }), false);
    expect(!missing.ok && missing.state.errors?.doodleFile).toBeTruthy();
    const kept = await parseProjectForm(form({ doodleSource: "upload" }), true);
    expect(kept.ok && kept.project.doodleSvg).toBeUndefined();
  });

  it("rejects wrong file type and oversize file", async () => {
    const f = form({ doodleSource: "upload" });
    f.set("doodleFile", new File(["x"], "a.png", { type: "image/png" }));
    const r = await parseProjectForm(f, false);
    expect(!r.ok && r.state.errors?.doodleFile).toMatch(/svg/i);

    const big = form({ doodleSource: "upload" });
    big.set("doodleFile", new File(["x".repeat(100_001)], "a.svg", { type: "image/svg+xml" }));
    const r2 = await parseProjectForm(big, false);
    expect(!r2.ok && r2.state.errors?.doodleFile).toMatch(/100 KB/);
  });

  it("sanitizes valid svg upload", async () => {
    const f = form({ doodleSource: "upload" });
    const svg = `<svg viewBox="0 0 10 10"><script>alert(1)</script><path d="M0 0L10 10"/></svg>`;
    f.set("doodleFile", new File([svg], "a.svg", { type: "image/svg+xml" }));
    const r = await parseProjectForm(f, false);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.project.doodleSvg).toContain("<path");
      expect(r.project.doodleSvg).not.toContain("script");
    }
  });
});
