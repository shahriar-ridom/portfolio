import type { ProjectStatus } from "@/lib/project-types";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const live = status === "Active";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[0.8rem] text-ink-soft">
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${live ? "bg-ink" : "border border-ink-soft"}`}
      />
      {status}
    </span>
  );
}
