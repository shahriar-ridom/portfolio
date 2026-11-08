import type { MetadataRoute } from "next";
import { getProjects } from "@/db/queries";
import { siteUrl } from "@/data/profile";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const latest = projects.reduce((m, p) => (p.updatedAt > m ? p.updatedAt : m), "");
  const lastModified = latest ? new Date(latest) : undefined;
  return [
    { url: siteUrl, lastModified, priority: 1 },
    { url: `${siteUrl}/projects`, lastModified, priority: 0.8 },
    ...projects.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      priority: 0.7,
    })),
    { url: `${siteUrl}/about`, priority: 0.5 },
    { url: `${siteUrl}/contact`, priority: 0.4 },
  ];
}
