import { describe, expect, it } from "vitest";
import { buildDoodle, DoodleError, isTemplateKey, resolveDoodle, templateMarkup } from "@/lib/doodle";
import { defaultDoodleTemplate, doodleTemplates } from "@/lib/doodle-templates";

describe("buildDoodle", () => {
  it("strips scripts, handlers, external refs", () => {
    const out = buildDoodle(
      `<svg viewBox="0 0 10 10"><script>x</script><path d="M0 0L5 5" onclick="evil()"/><use href="http://x"/><image href="a.png"/></svg>`,
    );
    expect(out).toContain("<path");
    for (const bad of ["script", "onclick", "<use", "<image", "http"]) expect(out).not.toContain(bad);
  });

  it("drops unsafe attribute values", () => {
    const out = buildDoodle(`<svg viewBox="0 0 10 10"><path d="M0 0L5 5" fill="url(#x)"/></svg>`);
    expect(out).not.toContain("url(");
  });

  it("throws DoodleError on garbage", () => {
    expect(() => buildDoodle("not svg")).toThrow(DoodleError);
  });

  it("throws on oversize input", () => {
    expect(() => buildDoodle(`<svg>${"x".repeat(100_001)}</svg>`)).toThrow(DoodleError);
  });
});

describe("templates", () => {
  it("every template key is valid and renders", () => {
    for (const t of doodleTemplates) {
      expect(isTemplateKey(t.key)).toBe(true);
      expect(templateMarkup(t.key)).toContain("<");
    }
  });

  it("rejects unknown key", () => {
    expect(isTemplateKey("nope")).toBe(false);
  });

  it("resolveDoodle prefers upload, else template, else default", () => {
    const up = buildDoodle(`<svg viewBox="0 0 10 10"><path d="M0 0L5 5"/></svg>`);
    expect(resolveDoodle({ doodleSvg: up, doodleTemplate: "squiggle" })).toBe(up);
    expect(resolveDoodle({ doodleSvg: null, doodleTemplate: null })).toBe(templateMarkup(defaultDoodleTemplate));
  });
});
