import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";
import { aboutSchema } from "@/lib/schema";
import { about, profile, socials } from "@/data/profile";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "About Shahriar: a developer building native Linux apps, Rust tools and web projects. How I work, what I'm into, and the tools I use.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="grid gap-12 pt-14 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:pt-20">
      <JsonLd data={aboutSchema} />
      <header className="max-w-sm md:sticky md:top-10 md:self-start">
        <h1 className="text-[2.4rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.85rem]">
          Hi, I&apos;m {profile.name}.
        </h1>
        <ul className="mt-8 flex gap-1">
          {[
            { href: socials.email.href, label: "Email", Icon: Mail },
            { href: socials.github.href, label: "GitHub", Icon: Github },
            { href: socials.linkedin.href, label: "LinkedIn", Icon: Linkedin },
          ].map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={href.startsWith("http") ? `${label} (opens in a new tab)` : label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:bg-wash"
              >
                <Icon size={19} strokeWidth={1.25} />
              </a>
            </li>
          ))}
        </ul>
      </header>

      <div className="max-w-xl space-y-14">
        <section className="space-y-4 text-[1.1rem] leading-[1.75] text-ink">
          {about.introduction.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>

        <section aria-labelledby="approach">
          <h2 id="approach" className="text-[1.5rem] font-semibold tracking-tight text-ink">
            How I work
          </h2>
          <dl className="mt-5 divide-y divide-line border-y border-line">
            {about.approach.map((a) => (
              <div key={a.title} className="py-5">
                <dt className="font-semibold text-ink">{a.title}</dt>
                <dd className="mt-1 leading-relaxed text-ink-soft">{a.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="interests">
          <h2 id="interests" className="text-[1.5rem] font-semibold tracking-tight text-ink">
            What I&apos;m into
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {about.interests.map((i) => (
              <li key={i} className="rounded-full border border-line px-4 py-1.5 text-[0.95rem] text-ink">
                {i}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="toolbox">
          <h2 id="toolbox" className="text-[1.5rem] font-semibold tracking-tight text-ink">
            Tools I use
          </h2>
          <dl className="mt-5 space-y-3">
            {about.toolbox.map((g) => (
              <div key={g.group} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
                <dt className="text-ink-soft">{g.group}</dt>
                <dd className="text-ink">{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="work-together" className="border-t border-line pt-10">
          <h2 id="work-together" className="text-[1.5rem] font-semibold tracking-tight text-ink">
            Want to work together?
          </h2>
          <p className="mt-2 text-ink-soft">Tell me about your project or idea.</p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-full border border-ink px-6 py-2.5 text-[0.95rem] text-ink transition-[background-color,color,transform] duration-300 hover:bg-ink hover:text-white active:scale-[0.97]"
          >
            Get in touch
          </Link>
        </section>
      </div>
    </div>
  );
}
