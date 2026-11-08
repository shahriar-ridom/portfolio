"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { adminConfigured, checkPassword, endSession, requireAdmin, startSession } from "@/lib/auth";
import { clientIp, hit } from "@/lib/rate-limit";
import { parseProjectForm, type ProjectFormState } from "@/lib/project-form";

export type LoginState = { message?: string };

export async function login(_prev: LoginState, data: FormData): Promise<LoginState> {
  if (!adminConfigured()) {
    return { message: "Admin isn't configured. Set ADMIN_PASSWORD and SESSION_SECRET in the environment." };
  }
  // 8 attempts per 15 minutes per IP, plus a global cap so rotating IPs can't brute-force either.
  const wait = Math.max(hit(`login:${await clientIp()}`, 8, 15 * 60_000), hit("login:all", 60, 15 * 60_000));
  if (wait > 0) return { message: `Too many attempts. Try again in ${Math.ceil(wait / 60)} min.` };
  await new Promise((r) => setTimeout(r, 600));
  const password = data.get("password");
  if (typeof password !== "string" || !checkPassword(password)) return { message: "Wrong password." };
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

export async function saveProject(_prev: ProjectFormState, data: FormData): Promise<ProjectFormState> {
  await requireAdmin();

  const idRaw = data.get("id");
  const id = typeof idRaw === "string" && idRaw ? Number.parseInt(idRaw, 10) : null;

  let hasStoredUpload = false;
  if (id !== null) {
    const [existing] = await db.select({ svg: projects.doodleSvg }).from(projects).where(eq(projects.id, id)).limit(1);
    if (!existing) return { message: "That project no longer exists." };
    hasStoredUpload = existing.svg !== null;
  }

  const parsed = await parseProjectForm(data, hasStoredUpload);
  if (!parsed.ok) return parsed.state;
  const { doodleSvg, ...rest } = parsed.project;

  try {
    if (id === null) {
      await db.insert(projects).values({ ...rest, doodleSvg: doodleSvg ?? null });
    } else {
      await db
        .update(projects)
        .set({ ...rest, ...(doodleSvg === undefined ? {} : { doodleSvg }), updatedAt: new Date() })
        .where(eq(projects.id, id));
    }
  } catch (err) {
    if ((err as { code?: string }).code === "23505") {
      return {
        message: "Fix the errors below and try again.",
        errors: { slug: "Another project already uses that slug." },
        values: {
          ...parsed.project,
          tech: parsed.project.tech.join(", "),
          github: parsed.project.github ?? "",
          live: parsed.project.live ?? "",
          sortOrder: String(parsed.project.sortOrder),
          doodleSource: doodleSvg === null ? "template" : "upload",
        },
      };
    }
    console.error("saveProject failed", err);
    return { message: "Couldn't save the project. Check the server logs." };
  }

  updateTag("projects");
  redirect("/admin");
}

export async function deleteProject(data: FormData) {
  await requireAdmin();
  const id = Number.parseInt(String(data.get("id") ?? ""), 10);
  if (Number.isInteger(id)) {
    await db.delete(projects).where(eq(projects.id, id));
    updateTag("projects");
  }
  redirect("/admin");
}
