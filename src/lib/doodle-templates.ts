/**
 * Premade doodles. Raw inner-SVG markup in a 240x150 space, stroked by the
 * wrapper (2px, round caps). Add one here and it shows up in the admin picker.
 */
export const doodleTemplates = [
  {
    key: "squiggle",
    label: "Squiggle",
    markup: `<path d="M40 104 C60 40 90 40 100 80 S140 124 160 62 S196 50 204 82"/><circle cx="58" cy="42" r="8"/><path d="M180 112 L196 126 M196 112 L180 126"/>`,
  },
  {
    key: "dotfiles",
    label: "Panels",
    markup: `<rect x="28" y="24" width="84" height="102" rx="8"/><rect x="122" y="24" width="90" height="46" rx="8"/><rect x="122" y="80" width="90" height="46" rx="8"/><path d="M42 44 H92 M42 58 H78 M136 42 H190 M136 98 H176"/>`,
  },
  {
    key: "folder",
    label: "Folder",
    markup: `<path d="M36 44 H92 L104 56 H204 V120 H36 Z"/><rect x="62" y="30" width="46" height="56" rx="5" fill="#fff"/><path d="M72 46 H98 M72 58 H92 M72 70 H98"/><path d="M36 70 H204"/>`,
  },
  {
    key: "music",
    label: "Record",
    markup: `<circle cx="96" cy="78" r="48"/><circle cx="96" cy="78" r="30"/><circle cx="96" cy="78" r="6"/><path d="M176 100 V44 L206 38 V92"/><ellipse cx="166" cy="102" rx="11" ry="8"/><ellipse cx="196" cy="94" rx="11" ry="8"/>`,
  },
  {
    key: "package",
    label: "Package",
    markup: `<path d="M62 66 L120 44 L178 66 V114 L120 134 L62 114 Z"/><path d="M62 66 L120 88 L178 66 M120 88 V134"/><path d="M120 14 V54 M104 40 L120 56 L136 40"/>`,
  },
  {
    key: "bar",
    label: "Status bar",
    markup: `<rect x="20" y="30" width="200" height="30" rx="15"/><circle cx="40" cy="45" r="5"/><path d="M62 45 H108"/><circle cx="170" cy="45" r="9"/><path d="M170 40 V45 L174 48"/><rect x="62" y="82" width="116" height="44" rx="8" stroke-dasharray="4 6"/>`,
  },
  {
    key: "chat",
    label: "Chat window",
    markup: `<rect x="30" y="22" width="180" height="108" rx="10"/><path d="M30 44 H210"/><path d="M50 62 H128 V86 H98 L86 98 V86 H50 Z"/><path d="M190 90 H116 V114 H146 L158 126 V114 H190 Z"/>`,
  },
  {
    key: "document",
    label: "Document + pen",
    markup: `<rect x="44" y="20" width="110" height="114" rx="8"/><path d="M60 44 H122 M60 62 H138 M60 76 H132 M60 90 H110"/><path d="M150 124 L206 52 L222 64 L166 136 L148 140 Z" fill="#fff"/><path d="M198 62 L214 74"/>`,
  },
  {
    key: "terminal",
    label: "Terminal",
    markup: `<rect x="34" y="26" width="172" height="98" rx="10"/><path d="M34 48 H206"/><circle cx="50" cy="37" r="3"/><circle cx="62" cy="37" r="3"/><path d="M56 70 L72 82 L56 94"/><path d="M86 96 H124"/>`,
  },
  {
    key: "globe",
    label: "Globe",
    markup: `<circle cx="120" cy="75" r="48"/><ellipse cx="120" cy="75" rx="20" ry="48"/><path d="M72 75 H168 M80 52 H160 M80 98 H160"/>`,
  },
  {
    key: "phone",
    label: "Phone",
    markup: `<rect x="82" y="16" width="76" height="118" rx="12"/><path d="M108 28 H132"/><circle cx="120" cy="120" r="5"/><path d="M96 52 H144 M96 68 H132 M96 84 H140"/>`,
  },
  {
    key: "chip",
    label: "Chip",
    markup: `<rect x="74" y="34" width="92" height="82" rx="8"/><rect x="96" y="56" width="48" height="38" rx="4"/><path d="M92 34 V20 M120 34 V20 M148 34 V20 M92 116 V130 M120 116 V130 M148 116 V130 M74 56 H60 M74 94 H60 M166 56 H180 M166 94 H180"/>`,
  },
  {
    key: "rocket",
    label: "Rocket",
    markup: `<path d="M120 18 C150 40 152 84 140 108 H100 C88 84 90 40 120 18 Z"/><circle cx="120" cy="62" r="11"/><path d="M100 90 L78 116 L100 112 M140 90 L162 116 L140 112 M112 120 L120 138 L128 120"/>`,
  },
  {
    key: "code",
    label: "Code brackets",
    markup: `<path d="M88 36 L48 75 L88 114"/><path d="M152 36 L192 75 L152 114"/><path d="M130 28 L110 122"/>`,
  },
  {
    key: "database",
    label: "Database",
    markup: `<ellipse cx="120" cy="36" rx="52" ry="16"/><path d="M68 36 V114 C68 123 91 130 120 130 S172 123 172 114 V36"/><path d="M68 62 C68 71 91 78 120 78 S172 71 172 62"/><path d="M68 88 C68 97 91 104 120 104 S172 97 172 88"/>`,
  },
] as const;

export type DoodleTemplateKey = (typeof doodleTemplates)[number]["key"];
export const defaultDoodleTemplate: DoodleTemplateKey = "squiggle";
