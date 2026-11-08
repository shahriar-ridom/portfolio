import { asc, desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "./index";
import { projects, type ProjectRecord } from "./schema";
import { resolveDoodle } from "@/lib/doodle";
import type { Project } from "@/lib/project-types";

const order = [asc(projects.sortOrder), desc(projects.createdAt)] as const;

const toProject = (r: ProjectRecord): Project => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  description: r.description,
  tech: r.tech,
  status: r.status,
  github: r.github,
  live: r.live,
  featured: r.featured,
  updatedAt: r.updatedAt.toISOString(),
  doodle: resolveDoodle(r),
});

/** Public reads are cached and tagged; admin writes call updateTag("projects"). */
export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheTag("projects");
  cacheLife("days");
  return (await db.select().from(projects).orderBy(...order)).map(toProject);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  "use cache";
  cacheTag("projects");
  cacheLife("days");
  return (await db.select().from(projects).where(eq(projects.featured, true)).orderBy(...order)).map(toProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  "use cache";
  cacheTag("projects");
  cacheLife("days");
  const [row] = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  return row ? toProject(row) : null;
}

// Admin reads are never cached.
export const adminListProjects = () => db.select().from(projects).orderBy(...order);

export async function adminGetProject(id: number) {
  const [row] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return row ?? null;
}
