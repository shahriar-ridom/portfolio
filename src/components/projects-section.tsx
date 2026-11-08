import Link from "next/link";
import { getFeaturedProjects, getProjects } from "@/db/queries";
import { ProjectRow } from "./project-row";

export async function ProjectsSection() {
  // Featured projects if any are flagged; otherwise the three newest.
  const featured = await getFeaturedProjects();
  const shown = featured.length > 0 ? featured : (await getProjects()).slice(0, 3);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-t border-line pt-16">
      <div className="max-w-xl">
        <h2 id="projects-heading" className="text-[2rem] font-semibold tracking-tight text-ink sm:text-[2.25rem]">
          Things I&apos;ve Built.
        </h2>
        <p className="mt-3 text-[1.05rem] text-ink-soft">
          A few favorites from a collection of experiments, tools, and software I&apos;ve worked on.
        </p>
      </div>
      <div className="mt-10">
        {shown.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Link
          href="/projects"
          className="rounded-full border border-ink px-6 py-2.5 text-[0.95rem] text-ink transition-[background-color,color,transform] duration-300 hover:bg-ink hover:text-white active:scale-[0.97]"
        >
          View all projects
        </Link>
      </div>
    </section>
  );
}
