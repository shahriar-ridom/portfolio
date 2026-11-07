import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    priority: path === "" ? 1 : 0.7,
  }));
}
