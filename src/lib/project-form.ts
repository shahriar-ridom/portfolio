import { buildDoodle, DoodleError, isTemplateKey } from "./doodle";
import { defaultDoodleTemplate } from "./doodle-templates";
import { projectStatuses, type ProjectStatus } from "./project-types";

export type ProjectFormValues = {
  name: string;
  slug: string;
  description: string;
  tech: string;
  status: ProjectStatus;
  github: string;
  live: string;
  featured: boolean;
  sortOrder: string;
  doodleSource: "template" | "upload";
  doodleTemplate: string;
};

export type ProjectFormState = {
  message?: string;
  errors?: Partial<Record<keyof ProjectFormValues | "doodleFile", string>>;
  values?: ProjectFormValues;
};

export type ParsedProject = {
  name: string;
  slug: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
  github: string | null;
  live: string | null;
  featured: boolean;
  sortOrder: number;
  doodleTemplate: string;
  /** undefined = leave the stored upload alone, null = clear it, string = new upload. */
  doodleSvg: string | null | undefined;
};

const text = (d: FormData, k: string) => {
  const v = d.get(k);
  return typeof v === "string" ? v.trim() : "";
};

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const isHttpUrl = (v: string) => {
  try {
    return ["http:", "https:"].includes(new URL(v).protocol);
  } catch {
    return false;
  }
};

export async function parseProjectForm(
  data: FormData,
  hasStoredUpload: boolean,
): Promise<{ ok: true; project: ParsedProject } | { ok: false; state: ProjectFormState }> {
  const statusRaw = text(data, "status");
  const values: ProjectFormValues = {
    name: text(data, "name"),
    slug: text(data, "slug"),
    description: text(data, "description"),
    tech: text(data, "tech"),
    status: (projectStatuses as readonly string[]).includes(statusRaw) ? (statusRaw as ProjectStatus) : "Active",
    github: text(data, "github"),
    live: text(data, "live"),
    featured: data.get("featured") === "on",
    sortOrder: text(data, "sortOrder") || "0",
    doodleSource: text(data, "doodleSource") === "upload" ? "upload" : "template",
    doodleTemplate: isTemplateKey(text(data, "doodleTemplate")) ? text(data, "doodleTemplate") : defaultDoodleTemplate,
  };

  const errors: NonNullable<ProjectFormState["errors"]> = {};
  if (!values.name) errors.name = "Name is required.";
  else if (values.name.length > 80) errors.name = "Keep the name under 80 characters.";

  const slug = values.slug ? slugify(values.slug) : slugify(values.name);
  if (!slug) errors.slug = "Slug can't be empty.";
  values.slug = slug;

  if (!values.description) errors.description = "Add a short description.";
  else if (values.description.length > 400) errors.description = "Keep it under 400 characters.";

  // Trim, drop blanks, and drop case-insensitive duplicates (keeps first spelling and order).
  const seen = new Set<string>();
  const tech = values.tech
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t && !seen.has(t.toLowerCase()) && seen.add(t.toLowerCase()));
  if (tech.length > 12) errors.tech = "Up to 12 technologies.";

  if (values.github && !isHttpUrl(values.github)) errors.github = "Enter a full http(s) URL.";
  if (values.live && !isHttpUrl(values.live)) errors.live = "Enter a full http(s) URL.";

  const sortOrder = Number.parseInt(values.sortOrder, 10);
  if (!Number.isInteger(sortOrder)) errors.sortOrder = "Use a whole number.";

  let doodleSvg: string | null | undefined = null;
  if (values.doodleSource === "upload") {
    const file = data.get("doodleFile");
    if (file instanceof File && file.size > 0) {
      if (file.size > 100_000) errors.doodleFile = "That file is over 100 KB.";
      else if (!/\.svg$/i.test(file.name) && file.type !== "image/svg+xml") errors.doodleFile = "Upload an .svg file.";
      else {
        try {
          doodleSvg = buildDoodle(await file.text());
        } catch (e) {
          if (e instanceof DoodleError) errors.doodleFile = e.message;
          else throw e;
        }
      }
    } else if (hasStoredUpload) {
      doodleSvg = undefined; // keep what's stored
    } else {
      errors.doodleFile = "Choose an SVG file, or pick a template instead.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, state: { message: "Fix the errors below and try again.", errors, values } };
  }

  return {
    ok: true,
    project: {
      name: values.name,
      slug,
      description: values.description,
      tech,
      status: values.status,
      github: values.github || null,
      live: values.live || null,
      featured: values.featured,
      sortOrder,
      doodleTemplate: values.doodleTemplate,
      doodleSvg,
    },
  };
}
