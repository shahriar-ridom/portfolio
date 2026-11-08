import Link from "next/link";
import { adminListProjects } from "@/db/queries";
import { requireAdmin } from "@/lib/auth";
import { logout } from "./actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { buttonGhost } from "@/components/admin/styles";

// Admin is private and per-request, so it is allowed to block on navigation instead of showing a static shell.
export const instant = false;

export default async function AdminPage() {
  await requireAdmin();
  const rows = await adminListProjects();

  return (
    <section className="pb-10 pt-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[2rem] font-semibold tracking-tight text-ink">Projects</h1>
          <p className="mt-1 text-ink-soft">{rows.length} total</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/projects/new" className={buttonGhost}>Add project</Link>
          <form action={logout}>
            <button type="submit" className="text-[0.9rem] text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <ul className="mt-8 divide-y divide-line border-y border-line">
        {rows.length === 0 && <li className="py-8 text-ink-soft">No projects yet.</li>}
        {rows.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div>
              <p className="font-medium text-ink">
                {p.name}
                {p.featured && <span className="ml-2 rounded-full border border-line px-2 py-0.5 text-[0.75rem] font-normal text-ink-soft">Featured</span>}
              </p>
              <p className="text-[0.85rem] text-ink-soft">/{p.slug} · {p.status} · {p.tech.join(", ") || "no tech listed"}</p>
            </div>
            <div className="flex items-center gap-4 text-[0.9rem]">
              <Link href={`/admin/projects/${p.id}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                Edit<span className="sr-only"> {p.name}</span>
              </Link>
              <DeleteButton id={p.id} name={p.name} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
