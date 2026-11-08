import { defaultDoodleTemplate, doodleTemplates } from "./doodle-templates";

/**
 * Doodle pipeline. Everything that reaches the page as markup goes through
 * `buildDoodle`: an allowlist rebuild (not a blacklist), so uploaded SVGs can't
 * carry scripts, event handlers, external references or styles.
 *
 * The output also carries what the draw-on animation needs: every stroked shape
 * gets `pathLength="1"`, a `d` class and a stagger index (`--i`).
 */

const SHAPES = new Set(["path", "rect", "circle", "ellipse", "line", "polyline", "polygon"]);
// Containers whose children we keep. Anything else is dropped; the ones below
// are dropped *with* their children because they define things rather than draw.
const KEEP_CHILDREN = new Set(["g"]);
const DROP_WITH_CONTENT = new Set([
  "defs", "clippath", "mask", "style", "script", "foreignobject", "symbol",
  "pattern", "marker", "metadata", "title", "desc", "filter", "lineargradient",
  "radialgradient", "animate", "set", "animatetransform", "animatemotion", "use", "image",
]);

const GEOMETRY_ATTRS = new Set([
  "d", "x", "y", "cx", "cy", "r", "rx", "ry", "x1", "y1", "x2", "y2", "points", "width", "height",
]);
const PAINT_ATTRS = new Set([
  "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "stroke-dasharray",
  "stroke-dashoffset", "stroke-miterlimit", "opacity", "fill-opacity", "stroke-opacity",
  "fill-rule", "clip-rule", "transform",
]);

const SAFE_VALUE = /^[A-Za-z0-9\s.,%#()+\-]*$/;
const MAX_BYTES = 100_000;
const MAX_ELEMENTS = 400;

// Target frame: the viewBox the site draws doodles in, and the area an upload is fitted into.
const FRAME = { w: 240, h: 150 };
const FIT = { w: 200, h: 120 };

const num = (v: string | undefined) => {
  if (!v) return NaN;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : NaN;
};

function parseAttrs(src: string): Record<string, string> {
  const out: Record<string, string> = {};
  const re = /([^\s=\/>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const name = m[1].toLowerCase();
    const value = (m[2] ?? m[3] ?? "").trim();
    // Keep the original casing for the few camelCase attrs we care about: none are allowed.
    out[name] = value;
  }
  return out;
}

function safe(name: string, value: string): boolean {
  if (!SAFE_VALUE.test(value)) return false;
  if (/url\s*\(|javascript|data:/i.test(value)) return false;
  if (name === "fill" || name === "stroke") {
    return /^(none|currentcolor|#[0-9a-f]{3,8}|(rgb|rgba|hsl|hsla)\([\d\s.,%]+\)|[a-z]+)$/i.test(value);
  }
  return true;
}

type Piece = { tag: string; attrs: Record<string, string>; selfClose: boolean; close: boolean };

function tokenize(source: string): Piece[] {
  const cleaned = source
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .replace(/<\?[\s\S]*?\?>/g, "");
  const out: Piece[] = [];
  const re = /<(\/?)([a-zA-Z][\w:.-]*)((?:"[^"]*"|'[^']*'|[^'">])*?)(\/?)>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(cleaned))) {
    out.push({
      close: m[1] === "/",
      tag: m[2].toLowerCase(),
      attrs: m[1] === "/" ? {} : parseAttrs(m[3]),
      selfClose: m[4] === "/",
    });
  }
  return out;
}

type Built = { markup: string; shapes: number };

function rebuild(pieces: Piece[]): Built {
  let out = "";
  let shapes = 0;
  const stack: string[] = [];
  let skipTag: string | null = null;
  let skipDepth = 0;

  for (const p of pieces) {
    if (skipTag) {
      if (p.tag === skipTag && !p.selfClose) skipDepth += p.close ? -1 : 1;
      if (skipDepth === 0) skipTag = null;
      continue;
    }
    if (p.close) {
      if (KEEP_CHILDREN.has(p.tag) && stack[stack.length - 1] === p.tag) {
        stack.pop();
        out += `</${p.tag}>`;
      }
      continue;
    }
    if (DROP_WITH_CONTENT.has(p.tag)) {
      if (!p.selfClose) {
        skipTag = p.tag;
        skipDepth = 1;
      }
      continue;
    }
    if (KEEP_CHILDREN.has(p.tag)) {
      out += `<${p.tag}${paint(p.attrs)}>`;
      if (p.selfClose) out += `</${p.tag}>`;
      else stack.push(p.tag);
      continue;
    }
    if (SHAPES.has(p.tag)) {
      if (++shapes > MAX_ELEMENTS) throw new DoodleError("That SVG has too many shapes. Simplify it and try again.");
      const attrs = { ...pick(p.attrs, GEOMETRY_ATTRS), ...pick(p.attrs, PAINT_ATTRS) };
      // Dashed or explicitly unstroked shapes can't "draw on", so they fade in instead.
      const fadeOnly = "stroke-dasharray" in attrs || attrs["stroke"] === "none";
      const extra = fadeOnly
        ? ` class="d-fade" style="--i:${shapes}"`
        : ` class="d" pathLength="1" style="--i:${shapes}"`;
      out += `<${p.tag}${serialize(attrs)}${extra}/>`;
    }
    // Everything else (nested <svg>, <a>, <text>, ...) is dropped; its children are still walked.
  }
  while (stack.length) out += `</${stack.pop()}>`;
  return { markup: out, shapes };
}

const pick = (attrs: Record<string, string>, allowed: Set<string>) => {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(attrs)) if (allowed.has(k) && safe(k, v)) out[k] = v;
  return out;
};
const paint = (attrs: Record<string, string>) => serialize(pick(attrs, PAINT_ATTRS));
const serialize = (attrs: Record<string, string>) =>
  Object.entries(attrs).map(([k, v]) => ` ${k}="${v}"`).join("");

export class DoodleError extends Error {}

/** Markup for a premade template, normalized for the animation. Cached at module load. */
const templateCache = new Map<string, string>(
  doodleTemplates.map((t) => [t.key, rebuild(tokenize(t.markup)).markup]),
);

export function templateMarkup(key: string | null | undefined): string {
  return templateCache.get(key ?? "") ?? templateCache.get(defaultDoodleTemplate)!;
}

export const isTemplateKey = (key: string) => templateCache.has(key);

/**
 * Turn an uploaded SVG file's text into safe, fitted markup.
 * Throws DoodleError with a message fit to show the admin.
 */
export function buildDoodle(svgText: string): string {
  if (svgText.length > MAX_BYTES) throw new DoodleError("That SVG is too large (100 KB max).");
  const pieces = tokenize(svgText);
  const root = pieces.find((p) => p.tag === "svg" && !p.close);
  if (!root) throw new DoodleError("That file doesn't look like an SVG.");

  const { markup, shapes } = rebuild(pieces);
  if (shapes === 0) {
    throw new DoodleError(
      "No drawable shapes found. Use an SVG made of paths and basic shapes (text, images and gradients are ignored).",
    );
  }

  // Work out the source box so the upload can be centered in the frame.
  const vb = (root.attrs["viewbox"] ?? "").split(/[\s,]+/).map(num);
  let [minX, minY, w, h] = vb.length === 4 && vb.every(Number.isFinite) ? vb : [0, 0, NaN, NaN];
  if (!(w > 0) || !(h > 0)) {
    w = num(root.attrs["width"]);
    h = num(root.attrs["height"]);
    minX = 0;
    minY = 0;
  }
  if (!(w > 0) || !(h > 0)) {
    w = FRAME.w;
    h = FRAME.h;
  }

  const s = Math.min(FIT.w / w, FIT.h / h);
  const tx = (FRAME.w - w * s) / 2 - minX * s;
  const ty = (FRAME.h - h * s) / 2 - minY * s;
  const r = (n: number) => Math.round(n * 1000) / 1000;

  // Root-level paint carries over; stroke width falls back to the site's 2px, corrected for the fit scale.
  const rootPaint = pick(root.attrs, PAINT_ATTRS);
  delete rootPaint["transform"];
  rootPaint["stroke-width"] ??= String(r(2 / s));
  rootPaint["fill"] ??= "#232323";
  // Default to an ink outline so filled-only artwork (most exported SVGs) still has a stroke to draw on.
  rootPaint["stroke"] ??= "#232323";

  return `<g transform="translate(${r(tx)} ${r(ty)}) scale(${r(s)})"${serialize(rootPaint)}>${markup}</g>`;
}

/** Final markup for a project: upload wins, then the chosen template, then the default. */
export function resolveDoodle(p: { doodleSvg: string | null; doodleTemplate: string | null }): string {
  // Uploads saved before outlines became the default carry stroke="none" on their wrapper; upgrade them on read.
  const upload = p.doodleSvg?.replace(/^(<g transform="[^"]*"[^>]*?) stroke="none"/, '$1 stroke="#232323"');
  return upload ?? templateMarkup(p.doodleTemplate);
}
