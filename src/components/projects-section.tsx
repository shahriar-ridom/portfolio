import { projects } from "@/data/projects";
import { socials } from "@/data/profile";
import { ProjectRow } from "./project-row";

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-t border-line pt-16">
      <div className="max-w-xl">
        <h2 id="projects-heading" className="text-[2rem] font-semibold tracking-tight text-ink sm:text-[2.25rem]">
          Things I&apos;ve Built.
        </h2>
        <p className="mt-3 text-[1.05rem] text-ink-soft">
          A collection of experiments, tools, and software I&apos;ve worked on.
        </p>
      </div>
      <div className="mt-10">
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <a
          href={socials.github.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-ink px-6 py-2.5 text-[0.95rem] text-ink transition-[background-color,color,transform] duration-300 hover:bg-ink hover:text-white active:scale-[0.97]"
        >
          See more on GitHub<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
