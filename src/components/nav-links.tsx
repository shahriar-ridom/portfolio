"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/profile";

/** Only client piece of the header: it needs the pathname to mark the current page. */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex justify-center gap-8 text-[0.95rem]">
      {navLinks.map((link) => {
        const active = link.href === pathname;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className="group relative inline-block py-1 text-ink-soft transition-colors hover:text-ink aria-[current=page]:text-ink"
            >
              {link.label}
              <span
                aria-hidden
                className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-300 ${
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
