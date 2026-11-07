import Link from "next/link";
import { profile } from "@/data/profile";
import { HeroIllustration } from "./illustrations/hero-illustration";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="grid items-center gap-10 pb-16 pt-14 md:grid-cols-[1fr_1.15fr] md:gap-6 md:pb-24 md:pt-20">
      <div className="max-w-md">
        <p className="animate-rise text-[0.95rem] text-ink-soft" style={{ ["--delay" as string]: "60ms" }}>
          {profile.intro}
        </p>
        <h1
          id="hero-heading"
          className="animate-slide mt-3 text-[2.4rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.85rem]"
          style={{ ["--delay" as string]: "140ms" }}
        >
          I Build Things for the Digital World.
        </h1>
        <p
          className="animate-rise mt-5 text-[1.05rem] leading-relaxed text-ink-soft"
          style={{ ["--delay" as string]: "240ms" }}
        >
          {profile.summary}
        </p>
        <div
          className="animate-rise mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
          style={{ ["--delay" as string]: "340ms" }}
        >
          <Link
            href="/#projects"
            className="rounded-full border border-ink px-6 py-2.5 text-[0.95rem] text-ink transition-[background-color,color,transform] duration-300 hover:bg-ink hover:text-white active:scale-[0.97]"
          >
            Explore My Work
          </Link>
          <Link
            href="/contact"
            className="text-[0.95rem] text-ink-soft underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            Get in Touch
          </Link>
        </div>
      </div>
      <div className="animate-rise" style={{ ["--delay" as string]: "200ms" }}>
        <HeroIllustration className="animate-float mx-auto w-full max-w-[560px]" />
      </div>
    </section>
  );
}
