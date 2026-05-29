/* Chuck's Creator — app logic
 * Recreated from the "Chuck's Creator!" Freeform board (Fun Time Studios LLC).
 * Pure vanilla JS, no build step. All art is inline SVG so it works offline.
 *
 * Currency: ChuckBux (CB). CB-0 = free. Numbers = how many CB to buy.
 * PRIZE items must be bought with a Prize Token (⭐), which you earn when
 * Chuck approves a creation ("Give it to Chuck!").
 * The store only sells when the sign says OPEN.
 */

/* ----------------------------------------------------------------------- *
 *  Art helpers
 * ----------------------------------------------------------------------- */
const svg = (inner, vb = "0 0 100 100") =>
  `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

// Simple round face used for the "Normal" base characters.
const face = (skin, smile) =>
  svg(
    `<circle cx="50" cy="52" r="44" fill="${skin}"/>` +
      `<path d="M28 47 a9 9 0 0 1 18 0 Z" fill="#1d1d1d"/>` +
      `<path d="M54 47 a9 9 0 0 1 18 0 Z" fill="#1d1d1d"/>` +
      `<path d="M34 64 Q50 80 66 64" stroke="${smile}" stroke-width="4" fill="none" stroke-linecap="round"/>`
  );

const ART = {
  /* ---- Characters: base faces ---- */
  faceLight: face("#f4c89f", "#9a5b34"),
  faceDark: face("#6b4226", "#3a2414"),
  faceGray: face("#c2c2c2", "#666"),

  caticature: svg(
    `<polygon points="24,16 40,44 16,42" fill="#9aa0a6"/>` +
      `<polygon points="76,16 60,44 84,42" fill="#9aa0a6"/>` +
      `<circle cx="50" cy="54" r="36" fill="#bcc1c6"/>` +
      `<circle cx="38" cy="50" r="4.5" fill="#222"/>` +
      `<circle cx="62" cy="50" r="4.5" fill="#222"/>` +
      `<path d="M50 58 l-5 5 h10 z" fill="#e0608a"/>` +
      `<path d="M50 63 q-7 7 -15 4 M50 63 q7 7 15 4" stroke="#555" fill="none" stroke-width="2.5"/>` +
      `<path d="M28 54 h-14 M28 60 h-15 M72 54 h14 M72 60 h15" stroke="#888" stroke-width="1.6"/>`
  ),

  caticature2: svg(
    `<ellipse cx="50" cy="74" rx="26" ry="30" fill="#cfd3d7"/>` +
      `<polygon points="30,40 40,58 22,58" fill="#cfd3d7"/>` +
      `<polygon points="70,40 60,58 78,58" fill="#cfd3d7"/>` +
      `<circle cx="50" cy="42" r="22" fill="#dfe2e5"/>` +
      `<circle cx="43" cy="40" r="3" fill="#222"/>` +
      `<circle cx="57" cy="40" r="3" fill="#222"/>` +
      `<path d="M50 45 l-3 3 h6 z" fill="#e0608a"/>` +
      `<path d="M40 100 v-10 M60 100 v-10" stroke="#aab" stroke-width="5" stroke-linecap="round"/>`,
    "0 0 100 110"
  ),

  /* ---- Premade characters ---- */
  shep: svg(
    `<rect x="37" y="98" width="9" height="24" rx="3" fill="#f4c89f"/>` +
      `<rect x="54" y="98" width="9" height="24" rx="3" fill="#f4c89f"/>` +
      `<ellipse cx="42" cy="124" rx="9" ry="5" fill="#e84a8a"/>` +
      `<ellipse cx="58" cy="124" rx="9" ry="5" fill="#e84a8a"/>` +
      `<rect x="30" y="64" width="40" height="38" rx="10" fill="#59d0d6"/>` +
      `<rect x="20" y="68" width="12" height="9" rx="4" fill="#f4c89f"/>` +
      `<rect x="68" y="68" width="12" height="9" rx="4" fill="#f4c89f"/>` +
      `<circle cx="50" cy="40" r="22" fill="#f4c89f"/>` +
      `<path d="M28 36 q22 -30 44 0 q-10 -10 -22 -10 q-12 0 -22 10" fill="#f3d34a"/>` +
      `<rect x="31" y="36" width="38" height="11" rx="4" fill="#111"/>` +
      `<circle cx="40" cy="41.5" r="4" fill="#2b2b2b"/>` +
      `<circle cx="60" cy="41.5" r="4" fill="#2b2b2b"/>`,
    "0 0 100 130"
  ),

  chaz: svg(
    `<circle cx="50" cy="80" r="28" fill="#1c1c1c"/>` +
      `<rect x="14" y="70" width="20" height="9" rx="4" fill="#f5891f"/>` +
      `<rect x="66" y="70" width="20" height="9" rx="4" fill="#f5891f"/>` +
      `<rect x="36" y="104" width="10" height="20" rx="4" fill="#f5891f"/>` +
      `<rect x="54" y="104" width="10" height="20" rx="4" fill="#f5891f"/>` +
      `<circle cx="50" cy="34" r="20" fill="#1c1c1c"/>` +
      `<circle cx="42" cy="34" r="7" fill="#7e57c2"/>` +
      `<circle cx="58" cy="34" r="7" fill="#7e57c2"/>` +
      `<circle cx="42" cy="34" r="3" fill="#fff"/>` +
      `<circle cx="58" cy="34" r="3" fill="#fff"/>`,
    "0 0 100 130"
  ),

  boringMan: svg(
    `<rect x="38" y="96" width="9" height="26" fill="#9e9e9e"/>` +
      `<rect x="53" y="96" width="9" height="26" fill="#9e9e9e"/>` +
      `<rect x="32" y="58" width="36" height="42" rx="6" fill="#9e9e9e"/>` +
      `<rect x="20" y="62" width="13" height="8" fill="#9e9e9e"/>` +
      `<rect x="67" y="62" width="13" height="8" fill="#9e9e9e"/>` +
      `<circle cx="50" cy="36" r="20" fill="#bdbdbd"/>` +
      `<circle cx="43" cy="34" r="2.5" fill="#444"/>` +
      `<circle cx="57" cy="34" r="2.5" fill="#444"/>` +
      `<line x1="42" y1="44" x2="58" y2="44" stroke="#444" stroke-width="2"/>`,
    "0 0 100 130"
  ),

  bonMan: svg(
    `<rect x="34" y="60" width="42" height="46" fill="#6d4c2f"/>` +
      `<rect x="22" y="66" width="14" height="9" fill="#6d4c2f"/>` +
      `<rect x="74" y="66" width="14" height="9" fill="#6d4c2f"/>` +
      `<rect x="40" y="106" width="11" height="18" fill="#6d4c2f"/>` +
      `<rect x="59" y="106" width="11" height="18" fill="#6d4c2f"/>` +
      `<circle cx="55" cy="38" r="20" fill="#bdbdbd"/>` +
      `<circle cx="48" cy="36" r="2.5" fill="#333"/>` +
      `<circle cx="62" cy="36" r="2.5" fill="#333"/>` +
      `<path d="M48 46 q7 6 14 0" stroke="#333" stroke-width="2" fill="none"/>`,
    "0 0 100 130"
  ),

  clo: svg(
    `<path d="M22 60 a28 30 0 0 1 56 0 v28 q-7 -8 -14 0 q-7 8 -14 0 q-7 -8 -14 0 q-7 8 -14 0 Z" fill="#e23b34"/>` +
      `<circle cx="40" cy="52" r="9" fill="#fff"/>` +
      `<circle cx="60" cy="52" r="9" fill="#fff"/>` +
      `<circle cx="41" cy="53" r="4" fill="#1d1d1d"/>` +
      `<circle cx="59" cy="53" r="4" fill="#1d1d1d"/>` +
      `<path d="M44 66 q6 6 12 0" stroke="#7a1410" stroke-width="3" fill="none" stroke-linecap="round"/>`
  ),

  /* ---- Backgrounds (landscape, fill the stage) ---- */
  bgSky: svg(
    `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ec8f2"/><stop offset="1" stop-color="#dff3ff"/></linearGradient></defs>` +
      `<rect width="160" height="100" fill="url(#sky)"/>` +
      `<circle cx="132" cy="24" r="14" fill="#ffe14d"/>` +
      `<ellipse cx="40" cy="34" rx="22" ry="11" fill="#fff"/>` +
      `<ellipse cx="78" cy="50" rx="18" ry="9" fill="#fff"/>`,
    "0 0 160 100"
  ),
  bgClouds: svg(
    `<rect width="160" height="100" fill="#bfe6ff"/>` +
      `<ellipse cx="34" cy="30" rx="24" ry="12" fill="#fff"/>` +
      `<ellipse cx="96" cy="22" rx="28" ry="13" fill="#fff"/>` +
      `<ellipse cx="120" cy="62" rx="22" ry="11" fill="#fff"/>` +
      `<ellipse cx="50" cy="74" rx="26" ry="12" fill="#fff"/>`,
    "0 0 160 100"
  ),
  bgFields: svg(
    `<rect width="160" height="60" fill="#9bd8f5"/>` +
      `<rect y="60" width="160" height="40" fill="#7cc24a"/>` +
      `<circle cx="28" cy="22" r="12" fill="#ffe14d"/>` +
      `<path d="M0 60 q40 -16 80 0 q40 16 80 0 v40 H0 Z" fill="#8fd157"/>`,
    "0 0 160 100"
  ),
  bgSunset: svg(
    `<defs><linearGradient id="set" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a3c"/><stop offset="0.6" stop-color="#ff5e7e"/><stop offset="1" stop-color="#6a2c70"/></linearGradient></defs>` +
      `<rect width="160" height="100" fill="url(#set)"/>` +
      `<circle cx="80" cy="62" r="20" fill="#ffd86b"/>`,
    "0 0 160 100"
  ),
  bgMountains: svg(
    `<rect width="160" height="100" fill="#cdeaff"/>` +
      `<polygon points="10,90 50,28 90,90" fill="#8d99ae"/>` +
      `<polygon points="36,90 36,90 50,28 62,52" fill="#6b7587"/>` +
      `<polygon points="70,90 110,38 150,90" fill="#9aa6bd"/>` +
      `<polygon points="50,28 44,40 56,40" fill="#fff"/>` +
      `<polygon points="110,38 104,50 116,50" fill="#fff"/>`,
    "0 0 160 100"
  ),
  bgNight: svg(
    `<rect width="160" height="100" fill="#10193a"/>` +
      `<circle cx="128" cy="26" r="13" fill="#f7f3c6"/>` +
      `<circle cx="123" cy="22" r="13" fill="#10193a"/>` +
      `<g fill="#fff"><circle cx="20" cy="20" r="1.5"/><circle cx="48" cy="38" r="1.2"/><circle cx="70" cy="16" r="1.6"/><circle cx="96" cy="46" r="1.2"/><circle cx="40" cy="64" r="1.4"/><circle cx="140" cy="62" r="1.3"/></g>`,
    "0 0 160 100"
  ),

  /* ---- Picture frames (outlines) ---- */
  frameSquare: svg(`<rect x="10" y="10" width="80" height="80" rx="6" fill="none" stroke="#333" stroke-width="5"/>`),
  frameCircle: svg(`<circle cx="50" cy="50" r="40" fill="none" stroke="#333" stroke-width="5"/>`),
  frameTriangle: svg(`<polygon points="50,12 90,86 10,86" fill="none" stroke="#333" stroke-width="5" stroke-linejoin="round"/>`),
  frameStar: svg(`<polygon points="50,8 61,38 94,38 67,58 77,90 50,70 23,90 33,58 6,38 39,38" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/>`),
  frameHeart: svg(`<path d="M50 86 C12 58 16 22 40 22 C50 22 50 32 50 32 C50 32 50 22 60 22 C84 22 88 58 50 86 Z" fill="none" stroke="#333" stroke-width="5"/>`),
  frameSpeech: svg(`<path d="M14 18 h72 a6 6 0 0 1 6 6 v40 a6 6 0 0 1 -6 6 H44 l-16 16 v-16 H14 a6 6 0 0 1 -6 -6 V24 a6 6 0 0 1 6 -6 Z" fill="none" stroke="#333" stroke-width="5" stroke-linejoin="round"/>`),
  frameArrow: svg(`<path d="M10 50 H66 M66 50 l-18 -18 M66 50 l-18 18 M70 30 V70" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/>`),

  /* ---- Decor ---- */
  clock: svg(`<circle cx="50" cy="50" r="40" fill="#fff" stroke="#333" stroke-width="5"/><line x1="50" y1="50" x2="50" y2="24" stroke="#333" stroke-width="4" stroke-linecap="round"/><line x1="50" y1="50" x2="70" y2="50" stroke="#333" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="50" r="3.5" fill="#333"/>`),
  speaker: svg(`<rect x="28" y="10" width="44" height="80" rx="8" fill="#37474f"/><circle cx="50" cy="34" r="11" fill="#90a4ae"/><circle cx="50" cy="34" r="5" fill="#263238"/><circle cx="50" cy="66" r="16" fill="#90a4ae"/><circle cx="50" cy="66" r="7" fill="#263238"/>`),
  trophy: svg(`<path d="M30 16 h40 v12 a20 20 0 0 1 -40 0 Z" fill="#ffca28"/><path d="M30 20 h-12 a10 10 0 0 0 12 12 M70 20 h12 a10 10 0 0 1 -12 12" fill="none" stroke="#ffca28" stroke-width="5"/><rect x="44" y="48" width="12" height="16" fill="#ffb300"/><rect x="32" y="64" width="36" height="10" rx="3" fill="#ffb300"/><rect x="26" y="74" width="48" height="10" rx="3" fill="#f9a825"/>`),
  diamond: svg(`<polygon points="30,26 70,26 90,46 50,90 10,46" fill="#5ecbe8"/><polygon points="30,26 70,26 60,46 40,46" fill="#9be3f5"/><polygon points="10,46 40,46 50,90" fill="#3fb3d6"/><polygon points="90,46 60,46 50,90" fill="#3fb3d6"/>`),
  snowflake: svg(`<g stroke="#4fc3f7" stroke-width="4" stroke-linecap="round"><line x1="50" y1="12" x2="50" y2="88"/><line x1="18" y1="30" x2="82" y2="70"/><line x1="82" y1="30" x2="18" y2="70"/><path d="M50 12 l-8 8 M50 12 l8 8 M50 88 l-8 -8 M50 88 l8 -8"/></g>`),
  globe: svg(`<circle cx="50" cy="50" r="40" fill="#4fa3e0"/><path d="M30 30 q20 14 0 40 M50 12 v76 M14 44 q36 16 72 0 M62 22 q-18 28 0 56" fill="none" stroke="#2e7d32" stroke-width="4"/><circle cx="50" cy="50" r="40" fill="none" stroke="#1b4f72" stroke-width="4"/>`),

  /* ---- Assets / stickers ---- */
  nameTag: svg(`<rect x="10" y="22" width="80" height="56" rx="6" fill="#fff" stroke="#c62828" stroke-width="3"/><rect x="10" y="22" width="80" height="18" rx="6" fill="#e53935"/><text x="50" y="35" font-size="9" fill="#fff" text-anchor="middle" font-family="Arial">HELLO</text><text x="50" y="62" font-size="11" fill="#333" text-anchor="middle" font-family="Arial">my name</text>`),
  badge1: svg(`<circle cx="50" cy="50" r="40" fill="#fdd835" stroke="#f9a825" stroke-width="5"/><text x="50" y="66" font-size="48" fill="#7a5c00" text-anchor="middle" font-family="Arial" font-weight="bold">1</text>`),
  badge2: svg(`<circle cx="50" cy="50" r="40" fill="#bdbdbd" stroke="#9e9e9e" stroke-width="5"/><text x="50" y="66" font-size="48" fill="#424242" text-anchor="middle" font-family="Arial" font-weight="bold">2</text>`),
  badge3: svg(`<circle cx="50" cy="50" r="40" fill="#d7a06a" stroke="#a9784a" stroke-width="5"/><text x="50" y="66" font-size="48" fill="#5d3a1a" text-anchor="middle" font-family="Arial" font-weight="bold">3</text>`),
  starSticker: svg(`<polygon points="50,8 61,38 94,38 67,58 77,90 50,70 23,90 33,58 6,38 39,38" fill="#ffd54f" stroke="#f9a825" stroke-width="3" stroke-linejoin="round"/>`),
  power: svg(`<circle cx="50" cy="50" r="40" fill="#e53935"/><line x1="50" y1="24" x2="50" y2="50" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M34 38 a22 22 0 1 0 32 0" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`),
  laptop: svg(`<rect x="22" y="22" width="56" height="38" rx="4" fill="#37474f"/><rect x="27" y="27" width="46" height="28" fill="#80d8ff"/><path d="M14 64 h72 l6 10 H8 Z" fill="#90a4ae"/>`),

  /* ---- Objects ---- */
  flower: svg(`<line x1="50" y1="50" x2="50" y2="92" stroke="#2e7d32" stroke-width="5"/><path d="M50 70 q-16 -4 -20 8 M50 78 q16 -4 20 8" fill="none" stroke="#2e7d32" stroke-width="4"/><g fill="#ec407a"><circle cx="50" cy="30" r="12"/><circle cx="32" cy="42" r="12"/><circle cx="68" cy="42" r="12"/><circle cx="40" cy="58" r="12"/><circle cx="60" cy="58" r="12"/></g><circle cx="50" cy="44" r="10" fill="#fdd835"/>`),
  sword: svg(`<path d="M50 8 L58 60 H42 Z" fill="#cfd8dc" stroke="#90a4ae" stroke-width="2"/><rect x="34" y="60" width="32" height="8" rx="3" fill="#8d6e63"/><rect x="46" y="68" width="8" height="20" rx="3" fill="#5d4037"/><circle cx="50" cy="90" r="5" fill="#ffca28"/>`),
  shield: svg(`<path d="M50 10 L84 22 V52 Q84 80 50 92 Q16 80 16 52 V22 Z" fill="#42a5f5" stroke="#1565c0" stroke-width="4"/><path d="M50 10 V92 M16 40 H84" stroke="#bbdefb" stroke-width="4"/>`),
  gem: svg(`<polygon points="50,12 78,34 64,88 36,88 22,34" fill="#ab47bc"/><polygon points="50,12 78,34 50,40 22,34" fill="#ce93d8"/><polygon points="22,34 50,40 36,88" fill="#8e24aa"/>`),
};

/* "Chuck" mascot for the approval dialog. */
const CHUCK = svg(
  `<rect x="36" y="96" width="11" height="26" rx="4" fill="#59d0d6"/>` +
    `<rect x="53" y="96" width="11" height="26" rx="4" fill="#59d0d6"/>` +
    `<ellipse cx="41" cy="124" rx="10" ry="5" fill="#e84a8a"/>` +
    `<ellipse cx="59" cy="124" rx="10" ry="5" fill="#e84a8a"/>` +
    `<rect x="30" y="62" width="40" height="40" rx="12" fill="#f5891f"/>` +
    `<rect x="18" y="66" width="13" height="10" rx="4" fill="#f4c89f"/>` +
    `<rect x="69" y="66" width="13" height="10" rx="4" fill="#f4c89f"/>` +
    `<circle cx="50" cy="40" r="22" fill="#f4c89f"/>` +
    `<path d="M28 36 a22 22 0 0 1 44 0 q-22 -16 -44 0" fill="#6d4c2f"/>` +
    `<circle cx="41" cy="42" r="9" fill="#fff" stroke="#222" stroke-width="2"/>` +
    `<circle cx="59" cy="42" r="9" fill="#fff" stroke="#222" stroke-width="2"/>` +
    `<circle cx="41" cy="43" r="4.5" fill="#1d1d1d"/>` +
    `<circle cx="59" cy="43" r="4.5" fill="#1d1d1d"/>` +
    `<path d="M42 52 q8 7 16 0" stroke="#a85b2b" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  "0 0 100 130"
);

/* ----------------------------------------------------------------------- *
 *  Catalog  (price: 0 = free, number = CB cost, "prize" = needs a token)
 * ----------------------------------------------------------------------- */
const CATALOG = [
  // Characters
  { id: "faceLight", name: "Normal (Light)", cat: "Characters", price: 0 },
  { id: "faceDark", name: "Normal (Dark)", cat: "Characters", price: 0 },
  { id: "faceGray", name: "Normal (Gray)", cat: "Characters", price: 0 },
  { id: "boringMan", name: "Boring Man", cat: "Characters", price: 0 },
  { id: "caticature", name: "Caticature", cat: "Characters", price: 5 },
  { id: "caticature2", name: "Caticature 2", cat: "Characters", price: 7 },
  { id: "clo", name: "Clo", cat: "Characters", price: 8 },
  { id: "bonMan", name: "Bon Man", cat: "Characters", price: 5 },
  { id: "shep", name: "Shep", cat: "Characters", price: 10 },
  { id: "chaz", name: "CHAZ", cat: "Characters", price: 10 },

  // Backgrounds
  { id: "bgSky", name: "Sky", cat: "Backgrounds", price: 0, bg: true },
  { id: "bgClouds", name: "Clouds", cat: "Backgrounds", price: 0, bg: true },
  { id: "bgFields", name: "Fields", cat: "Backgrounds", price: 3, bg: true },
  { id: "bgSunset", name: "Sunset", cat: "Backgrounds", price: 3, bg: true },
  { id: "bgMountains", name: "Mountains", cat: "Backgrounds", price: 5, bg: true },
  { id: "bgNight", name: "Night", cat: "Backgrounds", price: "prize", bg: true },

  // Picture frames
  { id: "frameSquare", name: "Square", cat: "Frames", price: 0 },
  { id: "frameCircle", name: "Circle", cat: "Frames", price: 0 },
  { id: "frameTriangle", name: "Triangle", cat: "Frames", price: 2 },
  { id: "frameSpeech", name: "Speech", cat: "Frames", price: 3 },
  { id: "frameArrow", name: "Arrow", cat: "Frames", price: 2 },
  { id: "frameHeart", name: "Heart", cat: "Frames", price: 4 },
  { id: "frameStar", name: "Star", cat: "Frames", price: 4 },

  // Decor
  { id: "snowflake", name: "Snowflake", cat: "Decor", price: 2 },
  { id: "clock", name: "Clock", cat: "Decor", price: 3 },
  { id: "speaker", name: "Speaker", cat: "Decor", price: 4 },
  { id: "globe", name: "Globe", cat: "Decor", price: 5 },
  { id: "trophy", name: "Trophy", cat: "Decor", price: "prize" },
  { id: "diamond", name: "Diamond", cat: "Decor", price: "prize" },

  // Assets / stickers
  { id: "nameTag", name: "Name Tag", cat: "Assets", price: 0 },
  { id: "starSticker", name: "Star", cat: "Assets", price: 1 },
  { id: "badge1", name: "#1 Badge", cat: "Assets", price: 2 },
  { id: "badge2", name: "#2 Badge", cat: "Assets", price: 2 },
  { id: "badge3", name: "#3 Badge", cat: "Assets", price: 2 },
  { id: "power", name: "Power", cat: "Assets", price: 2 },
  { id: "laptop", name: "Laptop", cat: "Assets", price: 6 },

  // Objects
  { id: "flower", name: "Flower", cat: "Objects", price: 0 },
  { id: "shield", name: "Shield", cat: "Objects", price: 4 },
  { id: "sword", name: "Sword", cat: "Objects", price: 5 },
  { id: "gem", name: "Gem", cat: "Objects", price: "prize" },
];

const CATEGORIES = ["Characters", "Backgrounds", "Frames", "Decor", "Assets", "Objects"];
const byId = (id) => CATALOG.find((c) => c.id === id);

/* ----------------------------------------------------------------------- *
 *  State (persisted to localStorage)
 * ----------------------------------------------------------------------- */
const STORAGE_KEY = "chucks-creator-v1";
const START_CB = 25;

const defaultState = () => ({
  cb: START_CB,
  prizes: 0,
  approvals: 0,
  open: true,
  bg: null,
  items: [], // { uid, id, x, y, scale, z }
  activeTab: "Characters",
});

let state = loadState();
let selectedUid = null;
let zCounter = 1;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const s = { ...defaultState(), ...JSON.parse(raw) };
      zCounter = s.items.reduce((m, it) => Math.max(m, it.z || 0), 1) + 1;
      return s;
    }
  } catch (e) {
    /* ignore corrupt storage */
  }
  return defaultState();
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    /* storage may be unavailable; app still works in-memory */
  }
}

/* ----------------------------------------------------------------------- *
 *  DOM refs
 * ----------------------------------------------------------------------- */
const el = (id) => document.getElementById(id);
const stage = el("stage");
const bgLayer = el("bgLayer");
const emptyHint = el("emptyHint");
const catalogEl = el("catalog");
const tabsEl = el("tabs");
const cbEl = el("cbCount");
const prizeEl = el("prizeCount");
const signBtn = el("signBtn");

/* ----------------------------------------------------------------------- *
 *  Rendering
 * ----------------------------------------------------------------------- */
function renderWallet() {
  cbEl.textContent = state.cb;
  prizeEl.textContent = state.prizes;
}

function renderSign() {
  signBtn.textContent = state.open ? "Sign: OPEN!" : "Sign: Closed";
  signBtn.className = "sign " + (state.open ? "open" : "closed");
}

function renderTabs() {
  tabsEl.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const b = document.createElement("button");
    b.className = "tab" + (cat === state.activeTab ? " active" : "");
    b.textContent = cat;
    b.onclick = () => {
      state.activeTab = cat;
      save();
      renderTabs();
      renderCatalog();
    };
    tabsEl.appendChild(b);
  });
}

function priceLabel(item) {
  if (item.price === 0) return { text: "CB-0 (Free)", cls: "free" };
  if (item.price === "prize") return { text: "★ PRIZE", cls: "prize" };
  return { text: "CB-" + item.price, cls: "cost" };
}

function renderCatalog() {
  catalogEl.innerHTML = "";
  CATALOG.filter((c) => c.cat === state.activeTab).forEach((item) => {
    const card = document.createElement("button");
    card.className = "card";
    const pl = priceLabel(item);
    const locked = item.price === "prize" && state.prizes < 1;
    if (locked) card.classList.add("locked");
    card.innerHTML =
      `<div class="thumb">${ART[item.id]}</div>` +
      `<div class="name">${item.name}</div>` +
      `<div class="price ${pl.cls}">${pl.text}</div>`;
    card.onclick = () => buy(item);
    catalogEl.appendChild(card);
  });
}

function renderBg() {
  bgLayer.innerHTML = state.bg ? ART[state.bg] : "";
}

function renderItems() {
  // remove existing placed nodes
  stage.querySelectorAll(".placed").forEach((n) => n.remove());
  state.items.forEach((it) => stage.appendChild(makeNode(it)));
  emptyHint.style.display = state.items.length || state.bg ? "none" : "flex";
}

function makeNode(it) {
  const node = document.createElement("div");
  node.className = "placed" + (it.uid === selectedUid ? " selected" : "");
  node.style.left = it.x + "px";
  node.style.top = it.y + "px";
  node.style.width = 90 * it.scale + "px";
  node.style.height = 90 * it.scale + "px";
  node.style.zIndex = it.z;
  node.dataset.uid = it.uid;
  node.innerHTML = ART[it.id];
  attachDrag(node, it);
  return node;
}

function renderAll() {
  renderWallet();
  renderSign();
  renderTabs();
  renderCatalog();
  renderBg();
  renderItems();
}

/* ----------------------------------------------------------------------- *
 *  Buying / placing
 * ----------------------------------------------------------------------- */
function buy(item) {
  if (!state.open) {
    toast("The store is Closed! Flip the sign to OPEN.");
    return;
  }
  if (item.price === "prize") {
    if (state.prizes < 1) {
      toast("You need a ★ Prize to buy this! Give a creation to Chuck.");
      return;
    }
    state.prizes -= 1;
  } else if (item.price > 0) {
    if (state.cb < item.price) {
      toast(`Not enough ChuckBux! That costs CB-${item.price}.`);
      return;
    }
    state.cb -= item.price;
  }

  if (item.bg) {
    state.bg = item.id;
    toast(`Background set: ${item.name}`);
  } else {
    placeItem(item.id);
    toast(`Added ${item.name}!`);
  }
  save();
  renderAll();
}

function placeItem(id) {
  const rect = stage.getBoundingClientRect();
  const offset = (state.items.length % 6) * 16;
  state.items.push({
    uid: "i" + Date.now() + Math.floor(Math.random() * 1000),
    id,
    x: Math.max(10, rect.width / 2 - 45 + offset),
    y: Math.max(10, rect.height / 2 - 45 + offset),
    scale: 1,
    z: zCounter++,
  });
}

/* ----------------------------------------------------------------------- *
 *  Selection + item tools
 * ----------------------------------------------------------------------- */
function select(uid) {
  selectedUid = uid;
  renderItems();
  updateItemTools();
}

function updateItemTools() {
  const tools = el("itemTools");
  tools.style.display = selectedUid ? "flex" : "none";
}

function selectedItem() {
  return state.items.find((i) => i.uid === selectedUid);
}

function bumpScale(delta) {
  const it = selectedItem();
  if (!it) return;
  it.scale = Math.min(3, Math.max(0.4, +(it.scale + delta).toFixed(2)));
  save();
  renderItems();
}

function bringToFront() {
  const it = selectedItem();
  if (!it) return;
  it.z = zCounter++;
  save();
  renderItems();
}

function deleteSelected() {
  if (!selectedUid) return;
  state.items = state.items.filter((i) => i.uid !== selectedUid);
  selectedUid = null;
  save();
  renderItems();
  updateItemTools();
}

/* ----------------------------------------------------------------------- *
 *  Dragging (pointer events, works with mouse + touch)
 * ----------------------------------------------------------------------- */
function attachDrag(node, it) {
  node.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    select(it.uid);
    bringToFront();
    const start = { px: e.clientX, py: e.clientY, x: it.x, y: it.y };
    node.classList.add("dragging");
    node.setPointerCapture(e.pointerId);

    const move = (ev) => {
      const rect = stage.getBoundingClientRect();
      const w = node.offsetWidth;
      const h = node.offsetHeight;
      it.x = clamp(start.x + (ev.clientX - start.px), 0, rect.width - w);
      it.y = clamp(start.y + (ev.clientY - start.py), 0, rect.height - h);
      node.style.left = it.x + "px";
      node.style.top = it.y + "px";
    };
    const up = (ev) => {
      node.classList.remove("dragging");
      node.releasePointerCapture(ev.pointerId);
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerup", up);
      save();
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerup", up);
  });
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/* ----------------------------------------------------------------------- *
 *  Give it to Chuck! (approval -> reward loop)
 * ----------------------------------------------------------------------- */
const CHUCK_LINES = [
  "Wow, this is awesome! Approved! ✅",
  "I love it! That's so creative! Approved!",
  "Chuck says: this one's a keeper! Approved!",
  "Amazing work! Chuck approves!",
  "Cool creation! Approved — keep going!",
];

function giveToChuck() {
  if (!state.bg && state.items.length === 0) {
    toast("Make something first, then give it to Chuck!");
    return;
  }
  const reward = 8;
  state.cb += reward;
  state.prizes += 1;
  state.approvals += 1;
  save();
  renderWallet();
  renderCatalog();

  const line = CHUCK_LINES[Math.floor(Math.random() * CHUCK_LINES.length)];
  el("chuckArt").innerHTML = CHUCK;
  el("chuckLine").textContent = line;
  el("chuckReward").textContent = `+${reward} ChuckBux and +1 ★ Prize!`;
  el("modalBack").classList.add("show");
}

function closeModal() {
  el("modalBack").classList.remove("show");
}

/* ----------------------------------------------------------------------- *
 *  Misc actions
 * ----------------------------------------------------------------------- */
function toggleSign() {
  state.open = !state.open;
  save();
  renderSign();
}

function clearBg() {
  state.bg = null;
  save();
  renderAll();
}

function startOver() {
  if (!confirm("Clear the whole board and reset your ChuckBux?")) return;
  state = defaultState();
  selectedUid = null;
  zCounter = 1;
  save();
  renderAll();
  updateItemTools();
}

let toastTimer = null;
function toast(msg) {
  const t = el("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ----------------------------------------------------------------------- *
 *  Wire up
 * ----------------------------------------------------------------------- */
function init() {
  renderAll();
  updateItemTools();

  signBtn.onclick = toggleSign;
  el("giveBtn").onclick = giveToChuck;
  el("clearBgBtn").onclick = clearBg;
  el("resetBtn").onclick = startOver;
  el("modalOk").onclick = closeModal;
  el("modalBack").onclick = (e) => {
    if (e.target === el("modalBack")) closeModal();
  };

  el("biggerBtn").onclick = () => bumpScale(0.2);
  el("smallerBtn").onclick = () => bumpScale(-0.2);
  el("frontBtn").onclick = bringToFront;
  el("deleteBtn").onclick = deleteSelected;

  // Click empty stage to deselect
  stage.addEventListener("pointerdown", (e) => {
    if (e.target === stage || e.target === bgLayer || e.target.closest(".bg-layer")) {
      selectedUid = null;
      renderItems();
      updateItemTools();
    }
  });

  // Keyboard: Delete removes the selected item
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Delete" || e.key === "Backspace") && selectedUid) {
      // don't hijack typing in inputs (none here, but safe)
      if (document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        deleteSelected();
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
