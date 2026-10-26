/* =========================================================
   MATORI · components
   Pure functions returning HTML strings. No dependencies.
   ========================================================= */

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Mark redrawn from the packaging render: two arched peaks, sun and rays.
   Replace with the original vector logo when supplied. */
const MARK_INNER = `<path d="M3 45 L15.4 25.6 Q18.8 20.6 22.2 25.6 L34 45"/>
    <path d="M35 39.4 L42.4 25.6 Q45.8 20.6 49.2 25.6 L61.5 45"/>
    <circle cx="32.2" cy="17.2" r="3.7" fill="currentColor" stroke="none"/>
    <path d="M32.2 2.4v5.6M22.6 6.6l4.6 4.8M41.8 6.6l-4.6 4.8M17.6 14l6.4 1.8M46.8 14l-6.4 1.8" stroke-width="2.4"/>`;
/* Wordmark drawn as geometry (thin strokes, hexagon O), matching the embossed logo lockup.
   Fill/stroke come from the shared #copper-grad gradient defined in index.html. */
const WORDMARK_SVG = (cls = "") => `<svg class="wordmark-svg ${cls}" viewBox="0 0 566 108" fill="none" stroke="url(#copper-grad-wm)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="MATORI"><g transform="translate(5 4)">
    <polyline points="0,100 0,0 42,70 84,0 84,100"/>
    <polyline points="118,100 160,0 202,100"/><line x1="136" y1="60" x2="184" y2="60"/>
    <line x1="236" y1="0" x2="308" y2="0"/><line x1="272" y1="0" x2="272" y2="100"/>
    <polygon points="380,0 418,25 418,75 380,100 342,75 342,25"/>
    <line x1="452" y1="0" x2="452" y2="100"/><path d="M452 0 H490 Q518 0 518 27 Q518 54 490 54 H452"/><line x1="486" y1="54" x2="518" y2="100"/>
    <line x1="552" y1="0" x2="552" y2="100"/>
  </g></svg>`;
const MARK_SVG = (cls = "") => `<svg class="${cls}" viewBox="0 0 64 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${MARK_INNER}</svg>`;

/* Blurred olive-branch shadow for the hero wall and stone tile */
function leafShadow(cls = "") {
  let leaves = "";
  const pts = 15;
  for (let i = 0; i < pts; i++) {
    const t = i / (pts - 1);
    const x = 20 + t * 300 + Math.sin(t * 3) * 20, y = 10 + t * 230 + Math.cos(t * 2.2) * 18;
    const side = i % 2 ? 1 : -1, ang = (side * 48 + t * 30).toFixed(0);
    leaves += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="30" ry="4.6" transform="rotate(${ang} ${x.toFixed(0)} ${y.toFixed(0)}) translate(${side * 24} 0)"/>`;
  }
  return `<svg class="${cls}" viewBox="0 0 360 280" aria-hidden="true" fill="currentColor"><path d="M10 0 Q 120 90 330 250" stroke="currentColor" stroke-width="3" fill="none"/>${leaves}</svg>`;
}




/* Honeycomb clusters, as printed on the Honey Glow box: outline hexagons with a few filled in honey */

const ICON = {
  mark: MARK_SVG,
  hex: (cls = "") => `<svg class="${cls}" viewBox="0 0 32 28" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M8.5 1.5h15L31 14l-7.5 12.5h-15L1 14z"/></svg>`
};

const flag = (text = "Placeholder", kind = "") => `<span class="flag ${kind ? "flag--" + kind : ""}">${esc(text)}</span>`;
const statusFlag = (status) => ({
  pending: flag("To be confirmed"),
  proposed: flag("Proposed", "info"),
  concept: flag("Concept", "info"),
  confirmed: flag("Confirmed", "ok")
}[status] || "");

const productBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug || (p.aliases || []).includes(slug));

/* ---------- Hexagon rigid box (Honey Glow packaging) ----------
   Geometry (concept): 7.5 in point to point, 6.5 in flat to flat, split lid:
   the back half of the top hinges open. Modelled with the hexagon face toward
   the camera (standing) so the same object lies flat with --rx.
   opts.unbox: pouches + two-sided wearable inside for the unboxing sequence. */
function carton(p, opts = {}) {
  const { unbox = false, rx = -6, ry = -18, id = "", anchors = [] } = opts;
  const A = (face) => anchors.filter((a) => a.face === face).map((a) => a.dot
    ? `<button type="button" class="anchor anchor-dot" data-anchor="${a.id}" data-pick="${a.id}" style="left:${a.x}%;top:${a.y}%" aria-label="Show detail: ${esc(a.title)}"></button>`
    : `<span class="anchor" data-anchor="${a.id}" style="left:${a.x}%;top:${a.y}%"></span>`).join("");
  /* Front face: the approved packaging artwork (same render as the hero), so the
     3D box matches the printed box exactly, bear included. */
  const front = `<img class="hart-img" src="__ASSET:hg-face.webp__" alt="" draggable="false">${A("front")}`;
  const lidInner = `
    <div class="hart-lid">
      <span class="hart-lid-line">${esc(p.lidLine[0])}</span>
      <span class="hart-lid-sub">${esc(p.lidLine[1])}</span>
    </div>`;
  const pouch = (k) => `
    <div class="hb-pouch" style="--k:${k}">
      <div class="pouch-face">${ICON.mark("pouch-mark")}<span class="pouch-word">${WORDMARK_SVG()}</span><span class="pouch-sub">${esc(p.boxName.join(" "))}</span></div>
    </div>`;
  const interior = `
    <div class="hb-floor board-navy">
      ${[1, 2, 3].map(pouch).join("")}
      ${unbox ? pouchRig(p, A) : pouch(0)}
    </div>`;
  const back = `
    <div class="hart hart-back">
      ${ICON.mark("hart-mark")}
      <div class="hart-word">${WORDMARK_SVG()}</div>
      <div class="hart-back-name">${esc(p.boxName.join(" "))}</div>
      <div class="hart-back-sub">${p.benefit.map(esc).join(" • ")}</div>
      <div class="hart-back-cols">
        <div><h5>how to use</h5>${(p.howTo || []).map((t, i) => `<p>${i + 1}. ${esc(t)}</p>`).join("")}</div>
        <div><h5>ingredients</h5><p>${p.ingredients.map((i) => esc(i.name.replace(/ \(.*\)/, ""))).join(", ")}.</p><h5>caution</h5><p>For external use only. Do not use on broken or irritated skin. Avoid the eyes.</p></div>
      </div>
      <div class="hart-back-foot"><b>28 wearables</b><span>4 pouches of 7 • 4-week supply</span></div>
    </div>`;
  const sides = [0, 1, 2, 3, 4, 5].map((k) => `<div class="hb-side board-navy" style="--k:${k}">${k === 4 ? `<span class="hb-side-text">${esc(p.name)} · ${esc(p.count.join(" "))}</span>` : ""}</div>`).join("");
  return `
    <div class="carton hexbox" ${id ? `id="${id}"` : ""} style="--cat:${p.cat};--rx:${rx}deg;--ry:${ry}deg">
      <div class="hb-back board-cream">${back}</div>
      ${interior}
      ${sides}
      <div class="hb-front-low board-cream">${front}</div>
      <div class="hb-lid-wrap">
        <div class="hb-lid board-cream">${front}</div>
        <div class="hb-lid-inner board-cream">${lidInner}</div>
      </div>
    </div>`;
}

/* Pouch rig for the unboxing: the fourth pouch lifts out, tears, and the wearable rises. */
const pouchRig = (p, A = () => "") => `
  <div class="face u-sachet hb-pouch hb-pouch--rig" style="--k:0">
    ${A("sachet")}
    <div class="us-patch">
      <div class="usp-face usp-front">${patchArt()}${A("patch")}</div>
      <div class="usp-face usp-back">
        <span class="usp-adh"></span>
        <span class="usp-liner usp-liner-l"></span><span class="usp-liner usp-liner-r"></span>
      </div>
    </div>
    <div class="us-body pouch-face">${ICON.mark("pouch-mark")}<span class="pouch-word">${WORDMARK_SVG()}</span><span class="pouch-sub">${esc(p.boxName.join(" "))}</span></div>
    <div class="us-tear"></div>
  </div>`;

const patchArt = (cls = "") => `<svg class="patch ${cls}" viewBox="0 0 90 100" aria-hidden="true">
  <path d="M45 3 L86 26.5 L86 73.5 L45 97 L4 73.5 L4 26.5 Z" fill="rgba(240,216,170,.6)" stroke="rgba(240,216,170,.6)" stroke-width="6" stroke-linejoin="round"/>
  <path d="M45 10 L80 30 L80 70 L45 90 L10 70 L10 30 Z" fill="#F3E2C4" stroke="#F3E2C4" stroke-width="5" stroke-linejoin="round"/>
  <g transform="translate(25 35) scale(.63)" fill="none" stroke="#5A3614" color="#5A3614" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${MARK_INNER}</g>
</svg>`;

const renderNote = (text = "Concept render. Not a photograph of the finished product.") => `<p class="meta">${esc(text)}</p>`;

function productCard(p) {
  return `
    <a class="cat-card" href="#/products/${p.slug}" style="--cat:${p.cat}">
      <div class="cat-visual stage" aria-hidden="true">${carton(p, { rx: -6, ry: -22 })}</div>
      <span class="label"><span class="hex-dot"></span>${esc(p.category)}</span>
      <h3 class="h3">${esc(p.name)}</h3>
      <p>${esc(p.short)}</p>
      <p class="ingredients">${p.ingredients.filter((i) => i.name !== "Trace cofactors").map((i) => esc(i.name.replace(/ \(.*\)/, ""))).join(", ")}</p>
    </a>`;
}
