import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { contactSchema } from "@/lib/schema";
import { profile, socials } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Shahriar about a project, a collaboration, or just to say hello.",
  alternates: { canonical: "/contact" },
};

const row =
  "group flex items-center gap-3 py-3 text-ink transition-colors hover:text-ink-soft";

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-heading" className="grid gap-12 pb-4 pt-14 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:pt-20">
      <JsonLd data={contactSchema} />
      <div className="max-w-sm">
        <h1 id="contact-heading" className="text-[2.4rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.85rem]">
          Let&apos;s build something together.
        </h1>
        <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">
          Have a project, a question, or just want to say hello? Send a message and I&apos;ll get back to you.
        </p>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          <li>
            <a className={row} href={socials.email.href}>
              <Mail size={19} strokeWidth={1.25} aria-hidden />
              {profile.email}
            </a>
          </li>
          <li>
            <a className={row} href={socials.github.href} target="_blank" rel="noreferrer">
              <Github size={19} strokeWidth={1.25} />
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a className={row} href={socials.linkedin.href} target="_blank" rel="noreferrer">
              <Linkedin size={19} strokeWidth={1.25} />
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="relative">
        <ContactForm />
      </div>
    </section>
  );
}
