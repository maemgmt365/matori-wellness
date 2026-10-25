/* =========================================================
   MATORI · content data
   Edit this file to change products, founders, FAQ and copy.
   Anything marked `null` or `status: "pending"` renders as a
   clearly labeled placeholder on the site.
   ========================================================= */

const SITE = {
  name: "MATORI",
  tagline: "Wear better wellness.",
  /* publicMode: true hides internal review labels ("Photography needed",
     placeholder founder cards, draft notes). Set false for internal review. */
  publicMode: true,
  contactEmail: null,            // e.g. "hello@matoriwellness.com". Enables footer contact + email fallback for the form
  formEndpoint: null,            // e.g. a Formspree URL "https://formspree.io/f/xxxxxxx". Inquiries POST here as JSON
  launchStatus: "In development. Launching early 2027. Not yet available for purchase.",
  pricing: { single: 47, subscription: 39, preliminary: true }
};

/* ---------- Products (proposed formulations) ---------- */
const PRODUCTS = [
  {
    slug: "honey-glow",
    aliases: ["deep-rest", "sleep", "efficient-energy", "clean-energy", "cellular-essentials"],   // old links land here
    name: "Honey Glow",
    boxName: ["honey", "glow"],
    benefit: ["nourish", "restore", "radiate"],
    lidLine: ["glow on.", "one wearable • every day"],
    count: ["4 weeks", "of wearables"],
    category: "Skin",
    cat: "var(--cat-skin)",
    timeOfDay: "Every day",
    short: "A daily skin wearable with copper peptide and honey. One wearable, every day, worn for up to eight hours. Four weeks to a box.",
    purpose: "Honey Glow is MATORI's first wearable: a cosmetic skin patch worn on the shoulder, trap or upper chest for up to eight hours. It pairs a copper peptide with honey extract and urea in a slow-release adhesive. Amounts below are the working formula and are not final.",
    ingredients: [
      { name: "Copper tripeptide-1 (GHK-Cu)", role: "A copper-binding peptide widely used in skincare for its association with skin renewal and firmness.", dose: "2 mg" },
      { name: "Pentylene glycol", role: "A humectant and skin-conditioning agent that also helps carry other ingredients.", dose: "3.5 mg" },
      { name: "Urea", role: "A humectant found naturally in skin. Helps skin hold water and feel softer.", dose: "2 mg" },
      { name: "Honey extract (Mel)", role: "Humectant and conditioning agent. Honey has a long history in skincare for softening and soothing.", dose: "1 mg" },
      { name: "Peppermint oil (Mentha piperita)", role: "Cooling sensation and scent.", dose: "1 mg" },
      { name: "Rosemary leaf oil (Rosmarinus officinalis)", role: "Scent, with antioxidant properties in cosmetic use.", dose: "0.65 mg" }
    ],
    considerations: [
      { title: "Essential oils", text: "Peppermint and rosemary oils can irritate sensitive skin. Patch test on a small area first. Stop use if irritation occurs." },
      { title: "Copper peptide", text: "Used widely in leave-on skincare. Stability in a wearable format, and how much reaches the skin over eight hours, will be confirmed through testing." },
      { title: "For external use only", text: "Do not use on broken or irritated skin. Avoid the eyes. Keep out of reach of children. Store in a cool, dry place." }
    ],
    howTo: [
      "Open one pouch and peel a wearable off the honeycomb sheet.",
      "Apply to clean, dry skin with little hair, like the shoulder, trap or upper chest.",
      "Wear for up to 8 hours, then peel off gently."
    ],
    howToNote: "One wearable a day. Reseal the pouch and keep the sheet flat."
  }
];

/* Specs shared by all products (concept references from the founder questionnaire) */
const SPECS = [
  { k: "Format", v: "Cosmetic skin wearable (topical patch)", status: "proposed" },
  { k: "Wearable shape", v: "Hexagon", status: "proposed" },
  { k: "Wearable size", v: "46.2 mm (40.4 mm alternative)", status: "proposed" },
  { k: "Formula load", v: "About 10 mg per wearable", status: "proposed" },
  { k: "Wear time", v: "Up to 8 hours, one a day", status: "proposed" },
  { k: "Count", v: "28 wearables: 4 pouches of 7", status: "proposed" },
  { k: "Packaging", v: "Hexagon rigid box, 7.5 in point to point, 6.5 in flat to flat, split lid", status: "proposed" },
  { k: "Adhesive and materials", v: "Acrylates copolymer adhesive", status: "proposed" }
];

/* ---------- Founders (data-driven; add a fourth by appending) ---------- */
const FOUNDERS = [
  { name: null, preferredName: null, role: null, bio: null, contribution: null, headshot: null, linkedin: null },
  { name: null, preferredName: null, role: null, bio: null, contribution: null, headshot: null, linkedin: null },
  { name: null, preferredName: null, role: null, bio: null, contribution: null, headshot: null, linkedin: null }
  // Fourth partner: copy one object above and fill it in. No layout change needed.
];

/* ---------- Unboxing sequence (scroll-driven) ----------
   Each step owns a slice of scroll progress (0 to 1). Copy is shown while
   progress is inside [from, to). TIMELINE keys are [progress, value] pairs;
   values ease between keys. Edit timing here, not in the animation code.   */
const UNBOX_STEPS = [
  { from: 0.00, to: 0.16, title: "The box", body: "A hexagon rigid box in kraft board, one brown ink, a gold edge and honeycomb running up the sides. Scroll to open it." },
  { from: 0.16, to: 0.36, title: "Turn it", body: "The back carries how to use, the full ingredient list and the cautions. Nothing hidden.", dl: [["Box", "7.5 × 6.5 in, hexagon (concept)"]] },
  { from: 0.36, to: 0.52, title: "Lift the lid", body: "The back half of the top hinges open. Inside the lid: glow on. One wearable, every day." },
  { from: 0.52, to: 0.70, title: "Four weeks", body: "Four pouches, one for each week. Seven wearables on a honeycomb sheet in each.", dl: [["Contents", "28 wearables"]] },
  { from: 0.70, to: 0.84, title: "Open a pouch", body: "Tear at the top, peel one wearable off the sheet, reseal the pouch." },
  { from: 0.84, to: 1.01, title: "Wear it", body: "Press onto clean, dry skin on the shoulder, trap or upper chest. Wear for up to eight hours, then peel off gently.", dl: [["Size", "46.2 mm hexagon (proposed)"]], cta: { label: "Discover Honey Glow", href: "#/products/honey-glow" } }
];

/* Rhythm: hold, move, hold. Nothing moves in the first 8% of scroll. Each step
   moves in its first ~40% and holds still for the rest so the copy can be read.  */
const UNBOX_TIMELINE = {
  ry:      [[0, -14], [0.17, -14], [0.24, 166], [0.30, 166], [0.36, -18], [0.45, -8]],                // front · turn to the back · hold · return to 3/4
  rx:      [[0, -6], [0.17, -6], [0.24, -10], [0.30, -10], [0.36, -8], [0.40, -8], [0.48, 30], [0.99, 30]],   // tips toward you so you look down into the open box
  rigZ:    [[0, 0]],
  rigY:    [[0, 50], [0.52, 50], [0.60, 95], [0.70, 95], [0.76, 150]],                   // camera follows the sachet, then the patch
  slide:   [[0.42, 0], [0.50, -0.42]],
  sachetY: [[0.53, 0], [0.60, -0.46]],
  sachetZ: [[0.55, 0], [0.64, 200]],
  face:    [[0.56, 0], [0.64, 1]],
  boxFade: [[0.56, 1], [0.64, 0.35], [0.84, 0.35], [0.90, 0]],                             // carton dims behind the sachet, leaves for the patch
  tear:    [[0.71, 0], [0.76, 1]],
  patchY:  [[0.74, 0], [0.80, -90], [0.86, -40], [0.92, 30]],
  patchZ:  [[0.85, 0], [0.91, 220]],
  patchS:  [[0.85, 1], [0.92, 1.9]],
  patchRy: [[0.86, 0], [0.90, 180], [0.93, 180], [0.97, 360]],                             // show liner, then face
  peel:    [[0.90, 0], [0.94, 1]],
  sFade:   [[0.85, 1], [0.90, 0]]
};

/* ---------- Patch sizes (proposed; load per size intentionally not published) ---------- */
const SIZES = [
  { name: "Alternative", mm: 40.4 },
  { name: "Proposed", mm: 46.2 }
];

/* ---------- Science: per-ingredient general reference ---------- */
/* Molecular weights are standard published values (g/mol, rounded). */
const INGREDIENT_SCIENCE = [
  { name: "Copper tripeptide-1 (GHK-Cu)", mw: 403, note: "A small peptide complexed with copper. Studied in topical skincare; delivery from a wearable depends on the adhesive matrix and wear time." },
  { name: "Urea", mw: 60, note: "Very small and water-loving. A long-established humectant and skin softener in topical products." },
  { name: "Pentylene glycol", mw: 104, note: "Small glycol. Humectant, and a common carrier that helps other ingredients spread and absorb." },
  { name: "Honey extract", mw: null, note: "A natural mixture, mostly sugars with trace acids and enzymes. Humectant and conditioning in cosmetic use." },
  { name: "Peppermint and rosemary oils", mw: null, note: "Volatile essential oils. Provide scent and a cooling feel; can irritate sensitive skin, which is why a patch test is advised." }
];

/* ---------- Assessment goals ---------- */
const GOALS = [
  {
    id: "hydrate", product: "honey-glow", title: "Dry or tight skin",
    blurb: "Skin that feels tight by the afternoon, especially on the shoulders and chest.",
    next: "Humectants like urea, glycol and honey draw and hold water in the outer layer of skin. Honey Glow is built around them, worn for up to eight hours so they sit against the skin rather than evaporating.",
    read: "How a wearable differs from a cream"
  },
  {
    id: "texture", product: "honey-glow", title: "Texture and tone",
    blurb: "Rough patches, unevenness, skin that has lost some bounce.",
    next: "Copper peptides are among the most studied cosmetic peptides for skin feel and firmness. Honey Glow pairs GHK-Cu with the humectants above. Results from the finished wearable will be published once tested.",
    read: "Why ingredient properties matter"
  },
  {
    id: "ritual", product: "honey-glow", title: "A simpler routine",
    blurb: "Too many steps, too many bottles.",
    next: "One wearable in the morning, peeled off in the evening. Nothing to rub in, nothing on your hands. Honey Glow is designed for people who want the care without the counter full of products.",
    read: "What is known about each ingredient"
  }
];

/* ---------- FAQ ---------- */
const FAQ = [
  {
    group: "About MATORI",
    items: [
      { q: "What is MATORI?", a: "MATORI is developing skin wearables: cosmetic patches worn for hours at a time. The first product, Honey Glow, pairs a copper peptide with honey and urea for everyday skin. It is in development for a 2027 launch." },
      { q: "Can I buy Honey Glow now?", a: "Not yet. Formula testing, packaging and pricing are still being finalised. Pricing will be published closer to launch." },
      { q: "Why a wearable instead of a cream?", a: "A wearable holds the ingredients against the skin for hours instead of minutes, keeps them off your hands and clothes, and takes one step instead of several. How much of each ingredient the skin takes up over eight hours is being measured on the finished wearable." }
    ]
  },
  {
    group: "Wear and application",
    items: [
      { q: "What size is a wearable?", a: "A hexagon, 46.2 mm across (a 40.4 mm alternative is still being evaluated). It sits flat and is discreet under a shirt." },
      { q: "How long do I wear one?", a: "Up to eight hours, one wearable a day. Peel off gently when you are done." },
      { q: "Where should I apply it?", a: "Clean, dry skin with little hair: the shoulder, trap or upper chest. Avoid broken or irritated skin and the area around the eyes." },
      { q: "Can I shower or train while wearing one?", a: "Water and sweat resistance will be confirmed through adhesion testing before launch. Until then, apply after showering, not before." },
      { q: "What if my skin is sensitive?", a: "Honey Glow contains peppermint and rosemary oils, which some skin reacts to. Try one on a small area first. Remove any wearable that causes irritation, and speak with a dermatologist if you have a skin condition." }
    ]
  },
  {
    group: "Ingredients and safety",
    items: [
      { q: "What is in it?", a: "Copper tripeptide-1, pentylene glycol, urea, honey extract, peppermint oil and rosemary leaf oil in an acrylates copolymer adhesive. Amounts are listed on the product page and are not final." },
      { q: "Is it a supplement or a medicine?", a: "Neither. Honey Glow is a cosmetic: it is designed to care for the look and feel of skin, not to treat a condition. Check with a doctor before use if you are pregnant, breastfeeding or under dermatological care." },
      { q: "Has it been tested?", a: "Skin compatibility and stability testing are part of development. MATORI will publish what has been tested on the finished wearable and keep it separate from general research on the ingredients." }
    ]
  }
];

/* ---------- Lab: interaction models (route #/lab, not in the nav) ---------- */
/* Model A: pick a detail, the carton turns to it and a line pulls the detail out.
   face: where the anchor lives (front, right, sachet). x/y: % position on that face.
   pose: carton angle (deg) and tray slide (fraction of height) when selected.   */
const CALLOUTS = [
  { id: "notch",   face: "front",  x: 50, y: 10, pose: { rx: -12, ry: -16, slide: 0 },     title: "Thumb notch",    text: "A 1.0 in cut-out on the sleeve. Push here and the tray rises." },
  { id: "mark",    face: "front",  x: 50, y: 21, pose: { rx: -6,  ry: -10, slide: 0 },     title: "The mark",       text: "Two peaks and a rising sun, printed in a single copper ink." },
  { id: "benefit", face: "front",  x: 56, y: 58, pose: { rx: -6,  ry: -26, slide: 0 },     title: "Product line",   text: "Name, tilde and a three-part benefit line, laid out the same on every product." },
  { id: "contour", face: "front",  x: 74, y: 86, pose: { rx: -14, ry: -34, slide: 0 },     title: "Contour print",  text: "Fine topographic lines rising from the corner, echoing the mountain in the mark." },
  { id: "side",    face: "right",  x: 50, y: 46, pose: { rx: -8,  ry: -66, slide: 0 },     title: "Side panels",    text: "Dark brown board on the long sides, matchbox style. 0.75 in deep (concept)." },
  { id: "tray",    face: "sachet", x: 50, y: 7,  pose: { rx: -16, ry: -22, slide: -0.42 }, title: "Tray and sachet", text: "The kraft tray slides out to reveal a clear, resealable sachet." }
];

/* Model B: exploded view. Each layer separates along the depth axis. */
const EXPLODE_PARTS = [
  { id: "x-sleeve", face: "front",       x: 50, y: 72, title: "Kraft sleeve",  text: "3.5 × 6 × 0.75 in (concept)" },
  { id: "x-tray",   face: "drawerRight", x: 50, y: 30, title: "Inner tray",    text: "Slides out through the open ends" },
  { id: "x-sachet", face: "sachet",      x: 50, y: 60, title: "Clear sachet",  text: "Resealable, with a printed card" },
  { id: "x-patch",  face: "patch",       x: 50, y: 50, title: "Patch",         text: "Rounded hexagon, three proposed sizes" }
];
