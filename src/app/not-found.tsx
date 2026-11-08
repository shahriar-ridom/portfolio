import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pb-10 pt-20 md:pt-28">
      <p className="text-[0.95rem] text-ink-soft">404</p>
      <h1 className="mt-3 text-[2.4rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.85rem]">
        That page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-[1.05rem] text-ink-soft">
        It may have moved or never existed. Try one of these instead.
      </p>
      <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-ink">
        {[["/", "Home"], ["/projects", "Projects"], ["/about", "About"], ["/contact", "Contact"]].map(([href, label]) => (
          <li key={href}>
            <Link href={href} className="underline decoration-line-strong underline-offset-4 hover:decoration-ink">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
