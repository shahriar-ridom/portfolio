"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveProject } from "@/app/admin/actions";
import { defaultDoodleTemplate } from "@/lib/doodle-templates";
import { projectStatuses } from "@/lib/project-types";
import type { ProjectFormState, ProjectFormValues } from "@/lib/project-form";
import { DoodlePicker } from "./doodle-picker";
import { buttonGhost, buttonPrimary, errorText, field, hint, label } from "./styles";

type Props = {
  id?: number;
  initial?: ProjectFormValues;
  storedUploadMarkup?: string | null;
};

const blank: ProjectFormValues = {
  name: "",
  slug: "",
  description: "",
  tech: "",
  status: "Active",
  github: "",
  live: "",
  featured: false,
  sortOrder: "0",
  doodleSource: "template",
  doodleTemplate: defaultDoodleTemplate,
};

export function ProjectForm({ id, initial = blank, storedUploadMarkup = null }: Props) {
  const [state, action, pending] = useActionState<ProjectFormState, FormData>(saveProject, {});
  const v = state.values ?? initial;
  const e = state.errors ?? {};

  const text = (name: keyof ProjectFormValues, title: string, opts: { hint?: string; placeholder?: string; type?: string } = {}) => (
    <div>
      <label htmlFor={name} className={label}>{title}</label>
      <input
        id={name}
        name={name}
        type={opts.type ?? "text"}
        defaultValue={String(v[name])}
        placeholder={opts.placeholder}
        aria-invalid={e[name] ? true : undefined}
        className={field}
      />
      {opts.hint && !e[name] && <p className={hint}>{opts.hint}</p>}
      {e[name] && <p role="alert" className={errorText}>{e[name]}</p>}
    </div>
  );

  return (
    // key remounts the fields with fresh defaults when the server hands back corrected values.
    <form action={action} key={state.values ? "server" : "initial"} className="grid max-w-2xl gap-6">
      {id !== undefined && <input type="hidden" name="id" value={id} />}

      {text("name", "Name")}
      {text("slug", "Slug", { hint: "Lowercase, hyphenated. Leave empty to generate it from the name." })}

      <div>
        <label htmlFor="description" className={label}>Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={v.description}
          aria-invalid={e.description ? true : undefined}
          className={field}
        />
        {e.description && <p role="alert" className={errorText}>{e.description}</p>}
      </div>

      {text("tech", "Technologies", { hint: "Comma separated: Rust, GTK4, GStreamer" })}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="status" className={label}>Status</label>
          <select id="status" name="status" defaultValue={v.status} className={field}>
            {projectStatuses.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        {text("sortOrder", "Sort order", { type: "number", hint: "Lower numbers come first." })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {text("github", "GitHub URL", { placeholder: "https://github.com/…" })}
        {text("live", "Live URL", { placeholder: "https://…" })}
      </div>

      <label className="flex items-center gap-3 text-[0.95rem] text-ink">
        <input type="checkbox" name="featured" defaultChecked={v.featured} className="size-4 accent-[#353535]" />
        Feature on the home page
      </label>

      <DoodlePicker
        initialSource={v.doodleSource}
        initialTemplate={v.doodleTemplate}
        storedUploadMarkup={storedUploadMarkup}
        error={e.doodleFile}
      />

      {state.message && <p role="alert" className={errorText}>{state.message}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className={buttonPrimary}>
          {pending ? "Saving…" : id === undefined ? "Add project" : "Save changes"}
        </button>
        <Link href="/admin" className={buttonGhost}>Cancel</Link>
      </div>
    </form>
  );
}
