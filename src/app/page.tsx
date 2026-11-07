import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { ProjectsSection } from "@/components/projects-section";
import { homeSchema } from "@/lib/schema";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: { absolute: `${profile.name} — Developer building native Linux apps, Rust tools and web projects` },
  description: profile.siteDescription,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema} />
      <Hero />
      <ProjectsSection />
    </>
  );
}
