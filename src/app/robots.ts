import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/data/profile";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments are closed to crawlers entirely.
  if (!isIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: "/admin" }, sitemap: `${siteUrl}/sitemap.xml` };
}
