import { profile, siteUrl, socials } from "@/data/profile";
import type { Project } from "./project-types";

const personId = `${siteUrl}/#person`;

export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: profile.fullName,
  alternateName: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  description: profile.summary,
  jobTitle: "Software developer",
  knowsAbout: ["Rust", "Linux", "GTK", "Systems programming", "TypeScript", "Next.js"],
  sameAs: [socials.github.href, socials.linkedin.href],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: `${profile.name} — ${profile.role}`,
  description: profile.siteDescription,
  inLanguage: "en",
  publisher: { "@id": personId },
};

const projectList = (projects: Project[]) => ({
  "@type": "ItemList",
  name: "Projects",
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareSourceCode",
      name: p.name,
      description: p.description,
      codeRepositoryType: "GitHub",
      ...(p.github ? { codeRepository: p.github } : {}),
      programmingLanguage: p.tech,
      author: { "@id": personId },
      url: `${siteUrl}/projects/${p.slug}`,
    },
  })),
});

/** Person + project list. Used by the home page and /projects. */
export const projectsSchema = (projects: Project[]) => ({
  "@context": "https://schema.org",
  "@graph": [personSchema, projectList(projects)],
});

export const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${siteUrl}/about`,
  name: `About ${profile.name}`,
  mainEntity: personSchema,
};

export const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${siteUrl}/contact`,
  name: `Contact ${profile.name}`,
  about: { "@id": personId },
};

export const projectSchema = (p: Project) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareSourceCode",
      "@id": `${siteUrl}/projects/${p.slug}#project`,
      url: `${siteUrl}/projects/${p.slug}`,
      name: p.name,
      description: p.description,
      programmingLanguage: p.tech,
      author: { "@id": personId },
      dateModified: p.updatedAt,
      ...(p.github ? { codeRepository: p.github } : {}),
      ...(p.live ? { sameAs: [p.live] } : {}),
    },
    personSchema,
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${siteUrl}/projects` },
        { "@type": "ListItem", position: 3, name: p.name, item: `${siteUrl}/projects/${p.slug}` },
      ],
    },
  ],
});
