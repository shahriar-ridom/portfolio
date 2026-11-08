import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { ProjectsSection } from "@/components/projects-section";
import { getProjects } from "@/db/queries";
import { pageMetadata } from "@/lib/seo";
import { projectsSchema } from "@/lib/schema";
import { profile } from "@/data/profile";

export const metadata: Metadata = pageMetadata({
  title: `${profile.name} — Developer building native Linux apps and Rust tools`,
  description: profile.siteDescription,
  path: "/",
  absoluteTitle: true,
});

export default async function Home() {
  const projects = await getProjects();
  return (
    <>
      <JsonLd data={projectsSchema(projects)} />
      <Hero />
      <ProjectsSection />
    </>
  );
}
