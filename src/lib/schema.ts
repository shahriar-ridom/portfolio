import { profile, siteUrl, socials } from "@/data/profile";
import { projects } from "@/data/projects";

const personId = `${siteUrl}/#person`;

export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: profile.fullName,
  alternateName: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
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

export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    {
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
          codeRepository: p.github,
          programmingLanguage: p.tech,
          author: { "@id": personId },
          ...(p.live ? { url: p.live } : {}),
        },
      })),
    },
  ],
};

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
