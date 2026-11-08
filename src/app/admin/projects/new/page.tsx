import { ProjectForm } from "@/components/admin/project-form";
import { requireAdmin } from "@/lib/auth";

// Admin is private and per-request, so it is allowed to block on navigation instead of showing a static shell.
export const instant = false;

export default async function NewProjectPage() {
  await requireAdmin();
  return (
    <section className="pb-10 pt-14">
      <h1 className="mb-8 text-[2rem] font-semibold tracking-tight text-ink">Add project</h1>
      <ProjectForm />
    </section>
  );
}
