import Link from "next/link";
import { Suspense } from "react";
import { Mail, CircleUserRound } from "lucide-react";
import { Github } from "./icons";
import { NavLinks } from "./nav-links";
import { navLinks, profile, socials } from "@/data/profile";

const iconClass =
  "grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-wash";

export function SiteHeader() {
  return (
    <header className="grid grid-cols-[1fr_auto] items-center gap-y-3 pt-7 sm:pt-9 md:grid-cols-[1fr_auto_1fr]">
      <Link
        href="/"
        className="col-start-1 row-start-1 justify-self-start whitespace-nowrap text-left text-[1.35rem] font-semibold tracking-tight text-ink sm:text-[1.65rem]"
      >
        {profile.fullName}
      </Link>

      <nav
        aria-label="Primary"
        className="col-span-2 row-start-2 border-t border-line pt-3 md:col-span-1 md:col-start-2 md:row-start-1 md:border-0 md:pt-0"
      >
        {/* usePathname is dynamic on routes with params (admin edit), so give it a static fallback. */}
        <Suspense
          fallback={
            <ul className="flex justify-center gap-8 text-[0.95rem]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1 text-ink-soft">{l.label}</Link>
                </li>
              ))}
            </ul>
          }
        >
          <NavLinks />
        </Suspense>
      </nav>

      <div className="col-start-2 row-start-1 flex items-center justify-self-end gap-1 md:col-start-3">
        <a href={socials.email.href} aria-label="Send an email" className={iconClass}>
          <Mail size={20} strokeWidth={1.25} aria-hidden />
        </a>
        <a
          href={socials.github.href}
          aria-label="GitHub (opens in a new tab)"
          target="_blank"
          rel="noreferrer"
          className={iconClass}
        >
          <Github size={20} />
        </a>
        <Link href="/contact" aria-label="Contact page" className={iconClass}>
          <CircleUserRound size={20} strokeWidth={1.25} aria-hidden />
        </Link>
      </div>
    </header>
  );
}
