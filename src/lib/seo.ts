import type { Metadata } from "next";
import { profile } from "@/data/profile";

/**
 * Per-page metadata. A page's `openGraph` replaces the root one wholesale, so the shared
 * fields live here and every page gets its own url/title/canonical.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const full = absoluteTitle ? title : `${title} — ${profile.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: `${profile.name}'s portfolio`, locale: "en_US", title: full, description, url: path },
    twitter: { card: "summary_large_image", title: full, description },
  };
}
