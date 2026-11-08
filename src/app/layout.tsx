import type { Metadata, Viewport } from "next";
import "./globals.css";
import fontFile from "./fonts/SourceSans3-latin-var.woff2";
import { SiteShell } from "@/components/site-shell";
import { JsonLd } from "@/components/json-ld";
import { websiteSchema } from "@/lib/schema";
import { isIndexable, profile, siteUrl } from "@/data/profile";

const fontHref = typeof fontFile === "string" ? (fontFile as string) : (fontFile as { src?: string }).src;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} — ${profile.role}`, template: `%s — ${profile.name}` },
  description: profile.siteDescription,
  applicationName: `${profile.name}'s portfolio`,
  authors: [{ name: profile.fullName, url: siteUrl }],
  creator: profile.fullName,
  openGraph: {
    type: "website",
    siteName: `${profile.name}'s portfolio`,
    locale: "en_US",
    title: `${profile.name} — ${profile.role}`,
    description: profile.siteDescription,
  },
  twitter: { card: "summary_large_image", title: `${profile.name} — ${profile.role}`, description: profile.siteDescription },
  robots: isIndexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

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
