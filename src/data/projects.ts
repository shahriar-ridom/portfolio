export type ProjectStatus = "Active" | "Experimental" | "Stable" | "Planned";

export type Project = {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
  github: string;
  live?: string;
};

const gh = (repo: string) => `https://github.com/shahriar-ridom/${repo}`;

export const projects: Project[] = [
  {
    slug: "hyprdeck",
    name: "Hyprdeck",
    description:
      "A dotfile manager for Hyprland. Keep your configs in one place, switch setups, and sync them across machines.",
    tech: ["Rust", "Hyprland"],
    status: "Active",
    github: gh("hyprdeck"),
  },
  {
    slug: "luma",
    name: "Luma",
    description:
      "A native Linux file manager with a calm interface, built to feel at home on a GTK4 desktop.",
    tech: ["Rust", "GTK4"],
    status: "Active",
    github: gh("luma"),
  },
  {
    slug: "luma-music",
    name: "Luma Music",
    description:
      "A native music player for local libraries. Plays through GStreamer and keeps the interface out of the way.",
    tech: ["Rust", "GTK4", "GStreamer"],
    status: "Active",
    github: gh("luma-music"),
  },
  {
    slug: "appdrop",
    name: "AppDrop",
    description:
      "Drop in an AppImage and it installs: menu entry, icon, and a clean way to remove it later.",
    tech: ["Rust", "GTK4"],
    status: "Active",
    github: gh("appdrop"),
  },
  {
    slug: "sessionbar",
    name: "SessionBar",
    description:
      "A small productivity bar for Hyprland that tracks focus sessions right from your desktop.",
    tech: ["Quickshell", "QML", "Hyprland"],
    status: "Active",
    github: gh("sessionbar"),
  },
  {
    slug: "native-whatsapp",
    name: "Native WhatsApp Client",
    description:
      "An experimental WhatsApp client for Linux that wraps the web app in a native window.",
    tech: ["Rust", "WebKitGTK"],
    status: "Experimental",
    github: gh("native-whatsapp"),
  },
  {
    slug: "fullstack-blog",
    name: "Full-stack Blog",
    description:
      "A blogging application with authoring, publishing, and a fast reading experience.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "Stable",
    github: gh("fullstack-blog"),
  },
];
