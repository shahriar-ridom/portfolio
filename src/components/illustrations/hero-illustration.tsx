const S = {
  stroke: "#232323",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Hand-drawn line scene: a bespectacled developer facing forward at a laptop, ideas floating above. */
export function HeroIllustration({ className }: { className?: string }) {
  // Draw-on: every stroked shape gets pathLength=1, a class, and a stagger index in source order
  // (ground, scene, person, laptop). The CSS lives in globals.css under `.hero-draw`.
  let n = 0;
  const d = () => ({ pathLength: 1, className: "h", style: { ["--i" as string]: n++ } });
  // Fill-only shapes (the eyes) can't be stroked on; they fade in with the face instead.
  const f = () => ({ className: "hf", style: { ["--i" as string]: n } });
  return (
    <svg
      viewBox="0 0 540 400"
      width="540"
      height="400"
      focusable="false"
      role="img"
      aria-label="Line drawing of a developer with glasses sitting at a laptop, surrounded by floating code windows"
      className={`hero-draw ${className ?? ""}`}
      fill="none"
      {...S}
    >
      {/* ground */}
      <path {...d()} d="M24 322 C140 326 300 318 516 324" stroke="#cfd2d1" />
      <path {...d()} d="M60 334 C160 337 260 333 330 335" stroke="#e1e3e2" />

      {/* floating things */}
      <g className="animate-drift" style={{ ["--r" as string]: "-6deg", ["--delay" as string]: "0ms", transformOrigin: "290px 90px" }}>
        <g transform="translate(0 -22)">
        <rect {...d()} x="250" y="62" width="106" height="70" rx="9" fill="#fff" />
        <path {...d()} d="M250 82 H356" />
        <circle {...d()} cx="262" cy="72" r="2" />
        <circle {...d()} cx="272" cy="72" r="2" />
        <circle {...d()} cx="282" cy="72" r="2" />
        <path {...d()} d="M264 96 H300 M264 108 H324 M264 120 H292" />
        </g>
      </g>
      <g className="animate-drift" style={{ ["--r" as string]: "5deg", ["--delay" as string]: "900ms", transformOrigin: "408px 160px" }}>
        <rect {...d()} x="372" y="136" width="82" height="56" rx="9" fill="#fff" />
        <path {...d()} d="M404 152 L392 164 L404 176 M424 152 L436 164 L424 176 M418 150 L410 178" />
      </g>
      <g className="animate-drift" style={{ ["--r" as string]: "-4deg", ["--delay" as string]: "1600ms", transformOrigin: "160px 120px" }}>
        <rect {...d()} x="118" y="92" width="76" height="52" rx="9" fill="#fff" />
        <path {...d()} d="M134 108 H178 M134 120 H166 M134 132 H174" />
        <path {...d()} d="M118 108 V128" stroke="none" />
      </g>
      <g className="animate-drift" style={{ ["--delay" as string]: "400ms" }}>
        {/* braces */}
        <path {...d()} d="M486 92 C476 92 478 104 478 110 C478 116 472 118 470 118 C472 118 478 120 478 126 C478 132 476 144 486 144" />
        <path {...d()} d="M500 92 C510 92 508 104 508 110 C508 116 514 118 516 118 C514 118 508 120 508 126 C508 132 510 144 500 144" />
      </g>
      {/* sparkles & dots */}
      <path {...d()} d="M222 60 V76 M214 68 H230" />
      <path {...d()} d="M436 70 V82 M430 76 H442" />
      <path {...d()} d="M72 168 V182 M65 175 H79" />
      <circle {...d()} cx="338" cy="176" r="3" />
      <circle {...d()} cx="96" cy="118" r="3" />
      <circle {...d()} cx="470" cy="206" r="3" />
      <circle {...d()} cx="226" cy="150" r="2.5" />
      {/* lightbulb */}
      <g>
        <path {...d()} d="M60 232 C44 220 46 196 62 190 C78 186 90 200 86 216 C84 224 78 228 76 236 H62 Z" fill="#fff" />
        <path {...d()} d="M63 244 H76 M65 250 H74" />
        <path {...d()} d="M70 176 V168 M52 182 L46 176 M88 182 L94 176" />
      </g>

      {/* plant */}
      <path {...d()} d="M22 322 L26 296 H50 L54 322 Z" fill="#fff" />
      <path {...d()} d="M38 296 C38 280 32 270 24 266 M38 296 C38 276 44 266 54 262 M38 296 V262" />

      {/* torso */}
      <path {...d()} d="M186 322 C186 280 210 260 244 256 L296 256 C330 260 354 280 354 322 Z" fill="#fff" />
      <path {...d()} d="M244 256 C252 272 288 272 296 256" strokeWidth={1.8} />
      <path {...d()} d="M270 270 V322" strokeWidth={1.4} stroke="#b8bbba" />
      {/* neck */}
      <path {...d()} d="M256 238 V258 M284 238 V258" />

      {/* ears */}
      <path {...d()} d="M231 196 C222 194 220 210 232 212" fill="#fff" />
      <path {...d()} d="M309 196 C318 194 320 210 308 212" fill="#fff" />
      {/* head */}
      <path {...d()} d="M230 190 C230 156 248 146 270 146 C292 146 310 156 310 190 C310 224 292 244 270 244 C248 244 230 224 230 190 Z" fill="#fff" />
      {/* hair */}
      <path {...d()} d="M229 192 C221 172 224 154 236 146 C232 136 236 126 244 120 C246 130 252 134 258 136 C260 126 266 118 276 114 C276 126 282 132 290 134 C296 128 304 126 312 128 C308 136 310 144 314 150 C320 162 318 178 311 192 C306 176 298 168 288 164 C268 170 244 170 234 180 C231 184 230 188 229 192 Z" fill="#232323" strokeLinejoin="round" />
      {/* eyebrows */}
      <path {...d()} d="M238 178 C244 174 254 174 262 177" strokeWidth={1.8} />
      <path {...d()} d="M278 177 C286 174 296 174 302 178" strokeWidth={1.8} />
      {/* eyes (blink) */}
      <ellipse {...f()} cx="250" cy="195" rx="3.4" ry="4.4" fill="#232323" stroke="none">
        <animate attributeName="ry" values="4.4;4.4;0.4;4.4;4.4" keyTimes="0;0.9;0.94;0.98;1" dur="4.5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse {...f()} cx="290" cy="195" rx="3.4" ry="4.4" fill="#232323" stroke="none">
        <animate attributeName="ry" values="4.4;4.4;0.4;4.4;4.4" keyTimes="0;0.9;0.94;0.98;1" dur="4.5s" repeatCount="indefinite" />
      </ellipse>
      {/* glasses */}
      <rect {...d()} x="234" y="182" width="32" height="26" rx="9" />
      <rect {...d()} x="274" y="182" width="32" height="26" rx="9" />
      <path {...d()} d="M266 192 C268 190 272 190 274 192" strokeWidth={1.8} />
      <path {...d()} d="M234 190 L229 188 M306 190 L311 188" strokeWidth={1.8} />
      {/* nose & smile */}
      <path {...d()} d="M270 200 C268 208 268 212 272 213" strokeWidth={1.6} />
      <path {...d()} d="M257 226 C264 232 276 232 283 226" strokeWidth={1.8} />

      {/* arms resting on desk */}
      <path {...d()} d="M190 322 C186 306 190 296 200 290" strokeWidth={1.8} />
      <path {...d()} d="M350 322 C354 306 350 296 340 290" strokeWidth={1.8} />

      {/* laptop (back to viewer) */}
      <path {...d()} d="M212 284 H328 L336 320 H204 Z" fill="#fff" />
      <circle {...d()} cx="270" cy="302" r="5" strokeWidth={1.8} />
      <path {...d()} d="M194 320 H346 L352 330 H188 Z" fill="#fff" />
    </svg>
  );
}
