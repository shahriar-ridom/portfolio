import type { Metadata } from "next";
import { Suspense } from "react";

// Admin is private and per-request, so it is allowed to block on navigation instead of showing a static shell.
export const instant = false;

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin pages read cookies and the live database, so they render per request.
  return <Suspense fallback={<p className="py-20 text-ink-soft">Loading…</p>}>{children}</Suspense>;
}
