const motifs: Record<string, React.ReactNode> = {
  hyprdeck: (
    <>
      <rect x="28" y="24" width="84" height="102" rx="8" />
      <rect x="122" y="24" width="90" height="46" rx="8" />
      <rect x="122" y="80" width="90" height="46" rx="8" />
      <path d="M42 44 H92 M42 58 H78 M136 42 H190 M136 98 H176" />
    </>
  ),
  luma: (
    <>
      <path d="M36 44 H92 L104 56 H204 V120 H36 Z" />
      <rect x="62" y="30" width="46" height="56" rx="5" fill="#fff" />
      <path d="M72 46 H98 M72 58 H92 M72 70 H98" />
      <path d="M36 70 H204" />
    </>
  ),
  "luma-music": (
    <>
      <circle cx="96" cy="78" r="48" />
      <circle cx="96" cy="78" r="30" />
      <circle cx="96" cy="78" r="6" />
      <path d="M176 100 V44 L206 38 V92" />
      <ellipse cx="166" cy="102" rx="11" ry="8" />
      <ellipse cx="196" cy="94" rx="11" ry="8" />
    </>
  ),
  appdrop: (
    <>
      <path d="M62 66 L120 44 L178 66 V114 L120 134 L62 114 Z" />
      <path d="M62 66 L120 88 L178 66 M120 88 V134" />
      <path d="M120 14 V54 M104 40 L120 56 L136 40" />
    </>
  ),
  sessionbar: (
    <>
      <rect x="20" y="30" width="200" height="30" rx="15" />
      <circle cx="40" cy="45" r="5" />
      <path d="M62 45 H108" />
      <circle cx="170" cy="45" r="9" />
      <path d="M170 40 V45 L174 48" />
      <rect x="62" y="82" width="116" height="44" rx="8" strokeDasharray="4 6" />
    </>
  ),
  "native-whatsapp": (
    <>
      <rect x="30" y="22" width="180" height="108" rx="10" />
      <path d="M30 44 H210" />
      <path d="M50 62 H128 V86 H98 L86 98 V86 H50 Z" />
      <path d="M190 90 H116 V114 H146 L158 126 V114 H190 Z" />
    </>
  ),
  "fullstack-blog": (
    <>
      <rect x="44" y="20" width="110" height="114" rx="8" />
      <path d="M60 44 H122 M60 62 H138 M60 76 H132 M60 90 H110" />
      <path d="M150 124 L206 52 L222 64 L166 136 L148 140 Z" fill="#fff" />
      <path d="M198 62 L214 74" />
    </>
  ),
};

export function ProjectVisual({ slug, label }: { slug: string; label: string }) {
  return (
    <div className="grid aspect-[8/5] w-full place-items-center rounded-[22px] bg-wash transition-colors duration-300 group-hover:bg-[#f0f1f0]">
      <svg
        viewBox="0 0 240 150"
        role="img"
        aria-label={`${label} illustration`}
        className="w-[78%] transition-transform duration-500 ease-out group-hover:-translate-y-1"
        fill="none"
        stroke="#232323"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {motifs[slug]}
      </svg>
    </div>
  );
}
