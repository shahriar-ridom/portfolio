import type { Metadata, Viewport } from "next";
import "./globals.css";
import fontFile from "./fonts/SourceSans3-latin-var.woff2";
import { SiteShell } from "@/components/site-shell";
import { JsonLd } from "@/components/json-ld";
import { websiteSchema } from "@/lib/schema";
import { profile, siteUrl } from "@/data/profile";

const fontHref = typeof fontFile === "string" ? (fontFile as string) : (fontFile as { src?: string }).src;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} — ${profile.role}`, template: `%s — ${profile.name}` },
  description: profile.siteDescription,
  applicationName: `${profile.name}'s portfolio`,
  authors: [{ name: profile.fullName, url: siteUrl }],
  creator: profile.fullName,
  keywords: ["Rust developer", "Linux apps", "GTK4", "Hyprland", "Next.js", "systems programming"],
  openGraph: {
    type: "website",
    siteName: `${profile.name}'s portfolio`,
    locale: "en_US",
    title: `${profile.name} — ${profile.role}`,
    description: profile.siteDescription,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: `${profile.name} — ${profile.role}`, description: profile.siteDescription },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        {/* next/font emits no preload for this static shell; request the font at the top of <head>. */}
        <link rel="preload" href={fontHref} as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen">
        <JsonLd data={websiteSchema} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
