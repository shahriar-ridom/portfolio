"use client";

import { deleteProject } from "@/app/admin/actions";

export function DeleteButton({ id, name }: { id: number; name: string }) {
  return (
    <form
      action={deleteProject}
      onSubmit={(e) => {
        if (!confirm(`Delete "${name}"? This can't be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-red-700 underline decoration-red-200 underline-offset-4 hover:decoration-red-700">
        Delete<span className="sr-only"> {name}</span>
      </button>
    </form>
  );
}
