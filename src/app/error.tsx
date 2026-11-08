"use client";

export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <section className="pb-10 pt-20 md:pt-28">
      <h1 className="text-[2.4rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.85rem]">
        Something went wrong.
      </h1>
      <p className="mt-4 max-w-md text-[1.05rem] text-ink-soft">The page couldn&apos;t load. Try again in a moment.</p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-8 rounded-full border border-ink px-6 py-2.5 text-[0.95rem] text-ink transition-colors hover:bg-ink hover:text-white"
      >
        Try again
      </button>
    </section>
  );
}
