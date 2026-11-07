"use client";

import { useActionState, useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { sendMessage } from "@/app/contact/actions";
import {
  contactLimits,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactState,
  type ContactValues,
} from "@/lib/contact";

const initial: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-2xl border bg-white px-4 py-3 text-[1rem] text-ink placeholder:text-ink-soft border-control transition-colors hover:border-ink focus:border-ink aria-[invalid=true]:border-[#9a4a4a] aria-[invalid=true]:border-2";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: ContactField;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.9rem] text-ink">
        {label} <span className="text-ink-soft">(required)</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.85rem] text-[#9a4a4a]">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const [clientErrors, setClientErrors] = useState<ContactErrors | null>(null);

  const errors = clientErrors ?? state.errors ?? {};
  const v = state.values;
  const props = (id: ContactField) => ({
    id,
    name: id,
    required: true,
    "aria-required": true,
    "aria-invalid": errors[id] ? true : undefined,
    "aria-describedby": errors[id] ? `${id}-error` : undefined,
  });

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-line bg-wash p-8">
        <CheckCircle2 size={26} strokeWidth={1.25} />
        <p className="mt-4 text-[1.25rem] font-semibold text-ink">Message sent</p>
        <p className="mt-1 text-ink-soft">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="space-y-5"
      onSubmit={(e) => {
        const f = new FormData(e.currentTarget);
        const values = Object.fromEntries(
          (["name", "email", "subject", "message"] as const).map((k) => [k, String(f.get(k) ?? "")]),
        ) as ContactValues;
        const found = validateContact(values);
        if (Object.keys(found).length > 0) {
          e.preventDefault();
          setClientErrors(found);
          e.currentTarget.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
        } else {
          setClientErrors(null);
        }
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input {...props("name")} defaultValue={v?.name} autoComplete="name" maxLength={contactLimits.name} className={inputClass} placeholder="Your name" />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input {...props("email")} defaultValue={v?.email} type="email" autoComplete="email" className={inputClass} placeholder="you@example.com" />
        </Field>
      </div>
      <Field id="subject" label="Subject" error={errors.subject}>
        <input {...props("subject")} defaultValue={v?.subject} maxLength={contactLimits.subject} className={inputClass} placeholder="What's this about?" />
      </Field>
      <Field id="message" label="Message" error={errors.message}>
        <textarea {...props("message")} defaultValue={v?.message} rows={6} maxLength={contactLimits.message} className={`${inputClass} resize-y`} placeholder="Tell me a bit about your idea or question." />
      </Field>

      {/* honeypot */}
      <div hidden>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {(state.status === "error" || state.status === "unavailable") && !clientErrors && (
        <p role="alert" className="flex items-start gap-2.5 rounded-2xl border border-line bg-wash px-4 py-3 text-[0.95rem] text-ink">
          <AlertCircle size={18} strokeWidth={1.5} className="mt-0.5 shrink-0" />
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full border border-ink px-7 py-2.5 text-[0.95rem] text-ink transition-[background-color,color,transform,opacity] duration-300 hover:bg-ink hover:text-white active:scale-[0.97] disabled:opacity-60"
      >
        {pending && <Loader2 size={16} className="animate-spin" />}
        {pending ? "Sending" : "Send message"}
      </button>
    </form>
  );
}
