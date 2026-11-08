import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { isAdmin } from "@/lib/auth";

// Admin is private and per-request, so it is allowed to block on navigation instead of showing a static shell.
export const instant = false;

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <section className="mx-auto max-w-sm pb-10 pt-16">
      <h1 className="text-[2rem] font-semibold tracking-tight text-ink">Admin</h1>
      <p className="mt-2 text-ink-soft">Sign in to manage projects.</p>
      <LoginForm />
    </section>
  );
}
