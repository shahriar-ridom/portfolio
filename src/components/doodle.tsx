"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders already-sanitized doodle markup and draws it on the first time it
 * scrolls into view. Without JS, or with reduced motion, it's simply drawn.
 * The initial (hidden) state lives in CSS under `@media (scripting: enabled)`,
 * so server HTML never flashes the finished drawing before the animation.
 */
export function Doodle({
  markup,
  label,
  className = "w-[78%]",
}: {
  markup: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fire only when (nearly) the whole drawing sits inside the viewport, with the bottom 15% trimmed off:
    // 80% of it visible. Roughly "properly on screen", not "just peeking in".
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.8, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 240 150"
      role="img"
      aria-label={label}
      className={`doodle ${drawn ? "is-drawn" : ""} ${className}`}
      fill="none"
      stroke="#232323"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "#232323" }}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
