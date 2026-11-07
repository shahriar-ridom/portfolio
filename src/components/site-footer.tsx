import { profile, socials } from "@/data/profile";

const link = "hover:text-ink underline-offset-4 hover:underline";

export function SiteFooter() {
  return (
    <footer className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-line py-8 text-sm text-ink-soft sm:flex-row">
      <p>© {profile.fullName}</p>
      <nav aria-label="Social links">
        <ul className="flex gap-5">
          <li>
            <a className={link} href={socials.github.href} target="_blank" rel="noreferrer">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a className={link} href={socials.linkedin.href} target="_blank" rel="noreferrer">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a className={link} href={socials.email.href}>
              Email
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
