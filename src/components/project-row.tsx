import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Github } from "./icons";
import type { Project } from "@/lib/project-types";
import { ProjectVisual } from "./illustrations/project-visual";
import { StatusBadge } from "./status-badge";

const linkClass =
  "inline-flex items-center gap-1.5 text-[0.95rem] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink";

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article className="group grid [contain-intrinsic-size:auto_560px] [content-visibility:auto] items-center gap-6 border-t border-line py-10 first:border-t-0 md:grid-cols-2 md:gap-14">
      <div className={flip ? "md:order-2" : ""}>
        <ProjectVisual markup={project.doodle} label={project.name} />
      </div>
      <div className="max-w-md">
        <StatusBadge status={project.status} />
        <h3 className="mt-4 text-[1.75rem] font-semibold leading-tight tracking-tight text-ink">
          <Link href={`/projects/${project.slug}`} className="underline-offset-4 hover:underline">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 text-[1.02rem] leading-relaxed text-ink-soft">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink-soft" aria-label="Technologies">
          {project.tech.map((t, i) => (
            <li key={`${t}-${i}`} className="flex items-center gap-3">
              {t}
              {i < project.tech.length - 1 && <span aria-hidden className="h-3 w-px bg-line-strong" />}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className={linkClass}>
              <Github size={17} />
              Source on GitHub<span className="sr-only"> for {project.name} (opens in a new tab)</span>
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className={linkClass}>
              Live demo<span className="sr-only"> of {project.name} (opens in a new tab)</span>
              <ArrowUpRight size={17} strokeWidth={1.25} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
