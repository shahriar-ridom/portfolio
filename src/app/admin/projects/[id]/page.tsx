import { notFound } from "next/navigation";
import { adminGetProject } from "@/db/queries";
import { ProjectForm } from "@/components/admin/project-form";
import { requireAdmin } from "@/lib/auth";
import { isTemplateKey } from "@/lib/doodle";
import { defaultDoodleTemplate } from "@/lib/doodle-templates";

// Admin is private and per-request, so it is allowed to block on navigation instead of showing a static shell.
export const instant = false;

export default async function EditProjectPage({ params }: PageProps<"/admin/projects/[id]">) {
  await requireAdmin();
  const id = Number.parseInt((await params).id, 10);
  if (!Number.isInteger(id)) notFound();
  const p = await adminGetProject(id);
  if (!p) notFound();

  return (
    <section className="pb-10 pt-14">
      <h1 className="mb-8 text-[2rem] font-semibold tracking-tight text-ink">Edit {p.name}</h1>
      <ProjectForm
        id={p.id}
        storedUploadMarkup={p.doodleSvg}
        initial={{
          name: p.name,
          slug: p.slug,
          description: p.description,
          tech: p.tech.join(", "),
          status: p.status,
          github: p.github ?? "",
          live: p.live ?? "",
          featured: p.featured,
          sortOrder: String(p.sortOrder),
          doodleSource: p.doodleSvg ? "upload" : "template",
          doodleTemplate: p.doodleTemplate && isTemplateKey(p.doodleTemplate) ? p.doodleTemplate : defaultDoodleTemplate,
        }}
      />
    </section>
  );
}
