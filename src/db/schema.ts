import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import type { ProjectStatus } from "@/lib/project-types";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  tech: text("tech").array().notNull().default([]),
  status: text("status").$type<ProjectStatus>().notNull().default("Active"),
  github: text("github"),
  live: text("live"),
  featured: boolean("featured").notNull().default(false),
  /** Lower comes first. Ties fall back to newest first. */
  sortOrder: integer("sort_order").notNull().default(0),
  /** Key of a premade doodle template. Used when `doodleSvg` is null. */
  doodleTemplate: text("doodle_template"),
  /** Sanitized markup from an uploaded SVG. Wins over the template. */
  doodleSvg: text("doodle_svg"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ProjectRecord = typeof projects.$inferSelect;
export type NewProjectRecord = typeof projects.$inferInsert;
