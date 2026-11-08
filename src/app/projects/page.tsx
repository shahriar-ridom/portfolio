import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ProjectRow } from "@/components/project-row";
import { getProjects } from "@/db/queries";
import { pageMetadata } from "@/lib/seo";
import { projectsSchema } from "@/lib/schema";
import { socials } from "@/data/profile";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: "Native Linux apps, Rust tools, and web projects by Shahriar: desktop tools, experiments, and web apps.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <section aria-labelledby="projects-page-heading" className="pt-14 md:pt-20">
      <JsonLd data={projectsSchema(projects)} />
      <div className="max-w-xl">
        <h1 id="projects-page-heading" className="text-[2.4rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.85rem]">
          Projects.
        </h1>
        <p className="mt-4 text-[1.05rem] text-ink-soft">
          Everything I&apos;ve built and kept: desktop tools, experiments, and web apps.
        </p>
      </div>
      <div className="mt-10">
        {projects.length === 0 ? (
          <p className="border-t border-line py-10 text-ink-soft">Nothing here yet. Check back soon.</p>
        ) : (
          projects.map((p, i) => <ProjectRow key={p.slug} project={p} index={i} />)
        )}
      </div>
      <p className="mt-4 text-center text-[0.95rem] text-ink-soft">
        More code lives on{" "}
        <a href={socials.github.href} target="_blank" rel="noreferrer" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
          GitHub<span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
    </section>
  );
}
