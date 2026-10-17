/* =========================================================
   MATORI · content data
   Edit this file to change products, founders, FAQ and copy.
   Anything marked `null` or `status: "pending"` renders as a
   clearly labeled placeholder on the site.
   ========================================================= */

const SITE = {
  name: "MATORI",
  tagline: "Wellness, worn differently.",
  /* publicMode: true hides internal review labels ("Photography needed",
     placeholder founder cards, draft notes). Set false for internal review. */
  publicMode: true,
  contactEmail: null,            // e.g. "hello@matoriwellness.com". Enables footer contact + email fallback for the form
  formEndpoint: null,            // e.g. a Formspree URL "https://formspree.io/f/xxxxxxx". Inquiries POST here as JSON
  launchStatus: "In development. Products are not yet available for purchase.",
  pricing: { single: 47, subscription: 39, preliminary: true }
};

/* ---------- Products (proposed formulations) ---------- */
const PRODUCTS = [const PRODUCTS = [
   {
      slug: "morning-energy",
      aliases: ["efficient-energy", "clean-energy"],
      name: "Morning Energy",
      boxName: ["Morning", "Energy"],
      mark: "sunrise",
      side: "#5E3220",
      benefit: ["Clean energy", "Mental focus", "Lasting performance"], // from packaging render
      category: "Morning energy and focus",
      cat: "var(--cat-energy)",
      timeOfDay: "Morning",
      short: "A morning patch concept for steady energy and focus through the working day.",
      purpose: "Morning Energy is being developed as a morning patch. The proposed formula combines caffeine with L-Theanine, a pairing that is widely studied, alongside vitamin B12. Final purpose statements will follow formulation and claims review.",
      ingredients: [
         { name: "Caffeine", role: "A stimulant naturally present in coffee, tea and cacao.", dose: null },
         { name: "L-Theanine", role: "An amino acid found in tea leaves, often studied alongside caffeine.", dose: null },
         { name: "Vitamin B12 (methylcobalamin)", role: "Contributes to normal energy-yielding metabolism.", dose: null }
         ],
      considerations: [
         { title: "Caffeine", text: "Total daily caffeine from all sources matters. Guidance for caffeine sensitivity, pregnancy, heart conditions and late-day use must be confirmed before launch." }
         ]
   },
   {
      slug: "everyday-essentials",
      aliases: ["cellular-essentials"],
      name: "Everyday Essentials",
      boxName: ["Everyday", "Essentials"],
      mark: "sun",
      side: "#4A3A2C",
      benefit: ["Daily essentials", "Core nutrients", "Everyday routine"], // placeholder benefit line
      category: "Everyday micronutrients",
      cat: "var(--cat-cellular)",
      timeOfDay: "Every day",
      short: "A daily patch concept for foundational micronutrients.",
      purpose: "Everyday Essentials is being developed as an everyday nutrient patch. The proposed formula centers on vitamins D3, K2 and B12, with additional trace cofactors still under evaluation.",
      ingredients: [
         { name: "Vitamin D3", role: "A fat-soluble vitamin involved in calcium absorption and bone maintenance.", dose: null },
         { name: "Vitamin K2 (MK-7)", role: "A form of vitamin K involved in calcium metabolism.", dose: null },
         { name: "Vitamin B12", role: "Contributes to normal energy-yielding metabolism.", dose: null },
         { name: "Trace cofactors", role: "Still being defined by the formulation team.", dose: null }
         ],
      considerations: [
         { title: "Vitamin K", text: "Vitamin K can interact with anticoagulant medications such as warfarin. Product-specific guidance must be confirmed before launch." },
         { title: "Vitamin D", text: "Upper intake limits apply across all sources. Dosing guidance will follow final formulation." }
         ]
   },
   {
      slug: "evening-unwind",
      aliases: ["sleep"],
      name: "Evening Unwind",
      boxName: ["Evening", "Unwind"],
      mark: "moon",
      side: "#2E3238",
      benefit: ["Wind down", "Evening routine", "Overnight recovery"], // placeholder benefit line
      category: "Evening wind-down",
      cat: "var(--cat-sleep)",
      timeOfDay: "Evening",
      short: "An evening patch concept built around winding down and overnight recovery.",
      purpose: "Evening Unwind is being developed as an evening routine patch. The proposed formula pairs ingredients commonly associated with the body's sleep and relaxation processes. Final purpose statements will follow formulation and claims review.",
      ingredients: [
         { name: "Melatonin", role: "A hormone involved in regulating the sleep and wake cycle.", dose: null },
         { name: "L-Theanine", role: "An amino acid found in tea leaves, studied in the context of relaxation.", dose: null },
         { name: "5-HTP", role: "A compound the body uses in producing serotonin.", dose: null }
         ],
      considerations: [
         { title: "Melatonin", text: "Can cause drowsiness. Guidance for pregnancy, breastfeeding, children and people taking sedating medications must be confirmed before launch." },
         { title: "5-HTP", text: "May interact with serotonergic medications, including certain antidepressants. This formula requires product-specific safety and regulatory review before it is marketed or recommended." }
         ]
   }
   ];

/* Specs shared by all products (concept references from the founder questionnaire) */
const SPECS = [
  { k: "Format", v: "Transdermal patch", status: "concept" },
  { k: "Patch shape", v: "Rounded hexagon", status: "proposed" },
  { k: "Patch sizes", v: "34.6 mm, 40.4 mm, 46.2 mm", status: "proposed" },
  { k: "Count", v: "30 wearables per carton", status: "proposed" },
  { k: "Packaging", v: "Sliding kraft carton, individually sealed pouches", status: "proposed" },
  { k: "Wear duration", v: null, status: "pending" },
  { k: "Adhesive and materials", v: null, status: "pending" }
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
   { from: 0.00, to: 0.16, title: "The carton", body: "A slim kraft sleeve printed in a single copper ink. Drag to turn it in your hand." },
   { from: 0.16, to: 0.34, title: "Turn it over", body: "Dark brown side panels and a matchbox build. The back carries the formula and directions.", dl: [["Carton", "3.5 × 6 × 0.75 in (concept)"]] },
   { from: 0.34, to: 0.52, title: "Slide the tray", body: "Press the thumb notch and the kraft inner tray rises out of the sleeve." },
   { from: 0.52, to: 0.76, title: "Lift the sachet", body: "A clear sachet with a printed card holds the wearables. Tear at the top to open.", dl: [["Contents", "30 wearables (proposed)"]] },
   { from: 0.76, to: 1.01, title: "Peel and wear", body: "Peel the two-part liner, press onto clean, dry skin and hold for a few seconds. Placement and wear time will be confirmed through testing.", dl: [["Sizes", "34.6, 40.4, 46.2 mm (proposed)"]], cta: { label: "Explore Morning Energy", href: "#/products/morning-energy" } }
   ];

/* v4: one smooth full turn during "Turn it over" (pausing on the back), and the carton is facing
   front again before the next title appears. Every other step happens front-on.
      ry runs past 360 after the turn; the sachet's counter-rotation normalises it in mountUnbox. */
const UNBOX_TIMELINE = {
     ry:      [[0, -30], [0.16, -24], [0.20, -24], [0.25, 156], [0.27, 156], [0.32, 336], [0.52, 342], [0.76, 346]],
     rx:      [[0, -6], [0.30, -10], [0.50, -12]],
     rigZ:    [[0, -160], [0.14, 0], [0.62, 40], [0.86, 120]],
     rigY:    [[0, 40], [0.36, 40], [0.50, 110], [0.68, 260], [0.86, 300]],
     slide:   [[0.36, 0], [0.50, -0.42]],
     sachetY: [[0.54, 0], [0.66, -0.62]],
     sachetZ: [[0.64, 0], [0.72, 110]],
     face:    [[0.62, 0], [0.72, 1]],
     boxFade: [[0.64, 1], [0.74, 0.22]],
     tear:    [[0.70, 0], [0.76, 1]],
     patchY:  [[0.77, 0], [0.83, -170], [0.89, -110], [0.95, -30]],
     patchZ:  [[0.81, 0], [0.88, 220], [0.95, 240]],
     patchS:  [[0.83, 1], [0.89, 1.25], [0.95, 1.3]],
     patchRy: [[0.85, 0], [0.88, 180], [0.91, 180], [0.95, 360]],
     peel:    [[0.88, 0], [0.91, 1]],
     sFade:   [[0.85, 1], [0.90, 0.08]]
};

/* ---------- Patch sizes (proposed; load per size intentionally not published) ---------- */
const SIZES = [
  { name: "Small", mm: 34.6 },
  { name: "Medium", mm: 40.4 },
  { name: "Large", mm: 46.2 }
];

/* ---------- Science: per-ingredient general reference ---------- */
/* Molecular weights are standard published values (g/mol, rounded). */
const INGREDIENT_SCIENCE = [
  { name: "Melatonin", mw: 232, note: "Small and moderately lipophilic. Transdermal delivery has been investigated in research settings." },
  { name: "L-Theanine", mw: 174, note: "Small but highly water-soluble, which generally makes passive skin permeation harder." },
  { name: "5-HTP", mw: 220, note: "Small molecule. Published transdermal evidence is limited." },
  { name: "Caffeine", mw: 194, note: "Widely used as a model compound in skin permeation research." },
  { name: "Vitamin D3", mw: 385, note: "Lipophilic. Human evidence for transdermal patches is limited and mixed." },
  { name: "Vitamin K2 (MK-7)", mw: 649, note: "Above the size range usually associated with easy passive permeation." },
  { name: "Vitamin B12 (methylcobalamin)", mw: 1344, note: "Large molecule, well above the commonly cited size range. Delivery would depend heavily on formulation." }
];

/* ---------- Assessment goals ---------- */
const GOALS = [
  {
    id: "sleep", product: "evening-unwind", title: "Sleep and recovery",
    blurb: "Winding down in the evening and recovering overnight.",
    next: "Start with the basics that shape sleep for everyone: a consistent schedule, light exposure early in the day, and a dim, cool room at night. The Evening Unwind concept is designed to sit inside an evening routine like this, not replace it.",
    read: "How transdermal delivery differs from oral supplements"
  },
  {
    id: "energy", product: "morning-energy", title: "Daytime focus and energy",
    blurb: "Steady energy through the working day.",
    next: "It helps to know your current caffeine intake from coffee, tea and other sources before adding anything new. The Morning Energy concept is intended as a measured daytime option within that total.",
    read: "Why ingredient properties matter"
  },
  {
    id: "nutrients", product: "everyday-essentials", title: "Everyday nutrient routine",
    blurb: "Covering foundational micronutrients day to day.",
    next: "Diet comes first, and only a blood test can show an actual deficiency. If you are curious about your levels, a conversation with a healthcare professional is the right starting point. Everyday Essentials is being designed as a simple daily routine.",
    read: "What is known about each proposed ingredient"
  }
];

/* ---------- FAQ ---------- */
const FAQ = [
  {
    group: "About MATORI",
    items: [
      { q: "What is MATORI?", a: "MATORI is developing transdermal wellness patches organised around three routines: sleep and recovery, daytime energy, and core micronutrients. The products are currently in development." },
      { q: "Can I buy MATORI patches now?", a: "Not yet. Formulations, testing and pricing are still being finalised. Preliminary pricing is $47 for a single carton and $39 per month for a subscription, subject to change." },
      { q: "Why a patch?", a: "A patch fits into a routine without anything to swallow or mix. Whether a given ingredient is well suited to delivery through the skin depends on the ingredient and formulation, which is why each product is being evaluated individually." }
    ]
  },
  {
    group: "Wear and application",
    items: [
      { q: "What size is a patch?", a: "Three sizes are in development: 34.6 mm, 40.4 mm and 46.2 mm across. Which sizes launch, and for which products, is still being decided." },
      { q: "How long do I wear a patch?", a: "Wear duration has not been confirmed yet. It will be set for each product once its finished formulation and adhesion have been tested." },
      { q: "Where should I apply it?", a: "Placement guidance will be confirmed through testing. As a general rule for skin patches: apply to clean, dry, intact skin and avoid irritated or broken areas." },
      { q: "Can I shower or train while wearing one?", a: "Water and sweat resistance will be confirmed through adhesion testing before launch." },
      { q: "What if my skin is sensitive?", a: "Skin compatibility testing is part of product development. Remove any patch that causes irritation, and speak with a healthcare professional if you have a skin condition." }
    ]
  },
  {
    group: "Ingredients and safety",
    items: [
      { q: "What is in each patch?", a: "Each product page lists the proposed ingredients. Final formulas and doses will be published once confirmed." },
      { q: "Can I use MATORI with medication?", a: "Some proposed ingredients, including melatonin, 5-HTP, caffeine and vitamin K, can interact with medications or conditions. Check with a healthcare professional before using any supplement if you take medication, are pregnant or breastfeeding." },
      { q: "Has MATORI been clinically tested?", a: "Not yet. MATORI will publish what testing has been done on its finished products and clearly separate that from general scientific literature." }
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
