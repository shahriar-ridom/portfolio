export const profile = {
  name: "Shahriar",
  fullName: "Shahriar Ridom",
  role: "Developer",
  email: "shahriarridom.info@gmail.com",
  intro: "Hello, I'm Shahriar.",
  headline: "I Build Things for the Digital World.",
  summary:
    "I'm a developer interested in software engineering, native Linux applications, systems programming, and web technologies.",
  siteDescription:
    "Shahriar's portfolio: native Linux apps, Rust tools, and web projects.",
} as const;

export const socials = {
  email: { label: "Email", href: `mailto:${profile.email}` },
  github: { label: "GitHub", href: "https://github.com/shahriar-ridom" },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/shahriar-ridom" },
} as const;

export const navLinks = [
  { label: "Main Portfolio", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/about" },
] as const;

export const about = {
  introduction: [
    "I'm Shahriar, a developer who likes software that feels native: fast to start, light on memory, and at home on the desktop it runs on.",
    "Most of my recent work is Linux-first. I build desktop tools in Rust and GTK4, script my Hyprland setup, and tinker with the small utilities that make a daily workflow smoother.",
  ],
  approach: [
    {
      title: "Start small, ship early",
      body: "I get a rough version working first, then refine it. A working tool teaches more than a perfect plan.",
    },
    {
      title: "Respect the platform",
      body: "Native toolkits, standard formats, and sensible defaults. If the system already does something well, I use it.",
    },
    {
      title: "Keep it readable",
      body: "Simple code, honest names, small interfaces. Future me is the main reader of everything I write.",
    },
  ],
  interests: [
    "Systems programming",
    "Linux desktop",
    "Rust",
    "Web development",
    "Tiling window managers",
    "Developer tooling",
  ],
  toolbox: [
    { group: "Languages", items: ["Rust", "TypeScript", "JavaScript", "QML", "Bash"] },
    { group: "Desktop", items: ["GTK4", "GStreamer", "WebKitGTK", "Quickshell", "Hyprland"] },
    { group: "Web", items: ["Next.js", "React", "Tailwind CSS", "Node.js"] },
    { group: "Daily tools", items: ["Neovim", "Git", "Arch Linux", "Linux terminal"] },
  ],
} as const;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
