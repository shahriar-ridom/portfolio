const S = {
  stroke: "#232323",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Hand-drawn line scene: a developer lying on the floor, laptop in front, ideas floating above. */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 540 400"
      width="540"
      height="400"
      focusable="false"
      role="img"
      aria-label="Line drawing of a developer lying on the floor beside a laptop, surrounded by floating code windows"
      className={className}
      fill="none"
      {...S}
    >
      {/* ground */}
      <path d="M24 322 C140 326 300 318 516 324" stroke="#cfd2d1" />
      <path d="M60 334 C160 337 260 333 330 335" stroke="#e1e3e2" />

      {/* floating things */}
      <g className="animate-drift" style={{ ["--r" as string]: "-6deg", ["--delay" as string]: "0ms", transformOrigin: "290px 90px" }}>
        <rect x="250" y="62" width="106" height="70" rx="9" fill="#fff" />
        <path d="M250 82 H356" />
        <circle cx="262" cy="72" r="2" />
        <circle cx="272" cy="72" r="2" />
        <circle cx="282" cy="72" r="2" />
        <path d="M264 96 H300 M264 108 H324 M264 120 H292" />
      </g>
      <g className="animate-drift" style={{ ["--r" as string]: "5deg", ["--delay" as string]: "900ms", transformOrigin: "408px 160px" }}>
        <rect x="372" y="136" width="82" height="56" rx="9" fill="#fff" />
        <path d="M404 152 L392 164 L404 176 M424 152 L436 164 L424 176 M418 150 L410 178" />
      </g>
      <g className="animate-drift" style={{ ["--r" as string]: "-4deg", ["--delay" as string]: "1600ms", transformOrigin: "160px 120px" }}>
        <rect x="118" y="92" width="76" height="52" rx="9" fill="#fff" />
        <path d="M134 108 H178 M134 120 H166 M134 132 H174" />
        <path d="M118 108 V128" stroke="none" />
      </g>
      <g className="animate-drift" style={{ ["--delay" as string]: "400ms" }}>
        {/* braces */}
        <path d="M486 92 C476 92 478 104 478 110 C478 116 472 118 470 118 C472 118 478 120 478 126 C478 132 476 144 486 144" />
        <path d="M500 92 C510 92 508 104 508 110 C508 116 514 118 516 118 C514 118 508 120 508 126 C508 132 510 144 500 144" />
      </g>
      {/* sparkles & dots */}
      <path d="M222 60 V76 M214 68 H230" />
      <path d="M436 70 V82 M430 76 H442" />
      <path d="M72 168 V182 M65 175 H79" />
      <circle cx="338" cy="176" r="3" />
      <circle cx="96" cy="118" r="3" />
      <circle cx="470" cy="206" r="3" />
      <circle cx="226" cy="150" r="2.5" />
      {/* lightbulb */}
      <g>
        <path d="M60 232 C44 220 46 196 62 190 C78 186 90 200 86 216 C84 224 78 228 76 236 H62 Z" fill="#fff" />
        <path d="M63 244 H76 M65 250 H74" />
        <path d="M70 176 V168 M52 182 L46 176 M88 182 L94 176" />
      </g>

      {/* plant */}
      <path d="M22 322 L26 296 H50 L54 322 Z" fill="#fff" />
      <path d="M38 296 C38 280 32 270 24 266 M38 296 C38 276 44 266 54 262 M38 296 V262" />

      {/* trousers: lying leg + shoe */}
      <path d="M326 280 L452 298 L458 318 L332 318 Z" fill="#232323" />
      <path d="M452 296 C470 292 490 298 494 310 L496 318 L456 318 Z" fill="#fff" />
      <path d="M458 308 H494" strokeWidth={1.6} />
      {/* trousers: raised leg + shoe */}
      <path d="M318 288 L386 216 L414 232 L348 312 Z" fill="#232323" />
      <path d="M386 216 L414 226 L468 262 L456 282 L402 250 Z" fill="#232323" />
      <path d="M462 258 L486 252 C496 252 502 262 500 272 L470 284 Z" fill="#fff" />
      <path d="M470 276 L498 266" strokeWidth={1.6} />

      {/* laptop */}
      <path d="M70 262 L142 254 L148 318 L64 322 Z" fill="#fff" />
      <path d="M84 276 L78 286 L86 296 M106 276 L112 286 L104 296 M98 274 L92 298" strokeWidth={1.8} />
      <path d="M52 322 L156 316 L168 330 L38 334 Z" fill="#fff" />

      {/* torso */}
      <path d="M212 278 C246 258 300 258 336 278 L338 318 C300 324 252 322 216 316 Z" fill="#fff" />
      <path d="M326 282 C334 292 334 308 332 320" strokeWidth={1.8} />
      <path d="M262 272 C268 290 268 304 262 318" strokeWidth={1.4} stroke="#b8bbba" />

      {/* arm & hand holding head */}
      <path d="M200 278 L226 316 L246 306 L222 268 Z" fill="#fff" />
      <path d="M204 270 C196 252 198 244 208 242 C220 240 224 252 220 266 Z" fill="#fff" />

      {/* hair back + bun */}
      <circle cx="150" cy="224" r="12" fill="#232323" />
      {/* head */}
      <path d="M156 236 C154 214 170 204 188 206 C204 208 214 222 210 240 C206 258 186 264 172 258 C162 254 158 246 156 236 Z" fill="#fff" />
      {/* hair */}
      <path d="M154 238 C150 208 176 196 200 208 C212 214 214 228 212 234 C204 222 192 218 178 222 C168 226 160 232 154 238 Z" fill="#232323" />
      {/* face */}
      <path d="M186 238 C190 235 194 235 197 238" strokeWidth={1.8} />
      <path d="M194 252 C198 254 202 253 204 250" strokeWidth={1.8} />
      <path d="M206 242 C208 244 207 247 204 247" strokeWidth={1.6} />
      <path d="M188 250 C189 252 192 252 193 250" stroke="none" />
      {/* hand under chin */}
      <path d="M200 262 C208 268 218 266 222 258 C224 252 218 248 212 250 C206 252 202 256 200 262 Z" fill="#fff" />
    </svg>
  );
}
