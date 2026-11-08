export const projectStatuses = ["Active", "Experimental", "Stable", "Planned"] as const;
export type ProjectStatus = (typeof projectStatuses)[number];

/** A project as the public site sees it. */
export type Project = {
  id: number;
  slug: string;
  name: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
  github: string | null;
  live: string | null;
  featured: boolean;
  /** ISO timestamp of the last edit. */
  updatedAt: string;
  /** Ready-to-render, already sanitized doodle markup (inner SVG, 240x150 space). */
  doodle: string;
};
