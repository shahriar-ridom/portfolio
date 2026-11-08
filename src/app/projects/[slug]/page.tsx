import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Github } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { ProjectVisual } from "@/components/illustrations/project-visual";
import { StatusBadge } from "@/components/status-badge";
import { getProjectBySlug, getProjects } from "@/db/queries";
import { projectSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const linkClass =
  "inline-flex items-center gap-1.5 text-[0.95rem] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink";

export async function generateStaticParams() {
  const projects = await getProjects();
  // Cache Components needs at least one sample param to validate the route at build time.
  return projects.length > 0 ? projects.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = await getProjectBySlug((await params).slug);
  if (!project) return { title: "Project not found", robots: { index: false } };
  return pageMetadata({
    title: project.name,
    description: project.description.slice(0, 160),
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = await getProjectBySlug((await params).slug);
  if (!project) notFound();

  return (
    <article className="pb-6 pt-14 md:pt-20">
      <JsonLd data={projectSchema(project)} />
      <nav aria-label="Breadcrumb">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-[0.95rem] text-ink-soft hover:text-ink">
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden /> All projects
        </Link>
      </nav>
      <div className="mt-8 grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="max-w-md">
          <StatusBadge status={project.status} />
          <h1 className="mt-4 text-[2.4rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.85rem]">
            {project.name}
          </h1>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">{project.description}</p>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink-soft" aria-label="Technologies">
            {project.tech.map((t, i) => (
              <li key={`${t}-${i}`} className="flex items-center gap-3">
                {t}
                {i < project.tech.length - 1 && <span aria-hidden className="h-3 w-px bg-line-strong" />}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className={linkClass}>
                <Github size={17} />
                Source on GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className={linkClass}>
                Live demo<span className="sr-only"> (opens in a new tab)</span>
                <ArrowUpRight size={17} strokeWidth={1.25} aria-hidden />
              </a>
            )}
          </div>
        </div>
        <ProjectVisual markup={project.doodle} label={project.name} />
      </div>
    </article>
  );
}
