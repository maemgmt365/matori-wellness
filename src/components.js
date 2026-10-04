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

/* Fine-line geometric construction (inspired by geometric linework tattoos):
   compass circles, an inscribed hexagon, star triangles, radial axes and node dots.
   Every stroke uses pathLength=1 so CSS can "draw" it via --g1..--g4 (0 to 1). */
function geoConstruct(cls = "") {
  const C = 500, R = 470, r2 = 300, hex = [], tri1 = [], tri2 = [];
  for (let i = 0; i < 6; i++) { const a = (Math.PI / 3) * i - Math.PI / 2; hex.push([C + r2 * Math.cos(a), C + r2 * Math.sin(a)]); }
  hex.forEach((p, i) => (i % 2 ? tri2 : tri1).push(p));
  const pts = (arr) => arr.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");
  const L = (x1, y1, x2, y2) => `<line pathLength="1" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
  const Ci = (x, y, rr) => `<circle pathLength="1" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr}"/>`;
  const dot = (x, y, rr = 4) => `<circle class="geo-dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr}"/>`;
  let ticks = "";
  for (let i = 0; i < 72; i++) { const a = (Math.PI * 2 * i) / 72, l = i % 6 ? 10 : 22; ticks += L(C + R * Math.cos(a), C + R * Math.sin(a), C + (R - l) * Math.cos(a), C + (R - l) * Math.sin(a)); }
  const petals = hex.map(([x, y]) => Ci(x, y, 150)).join("");
  return `<svg class="geo ${cls}" viewBox="0 0 1000 1000" fill="none" stroke="currentColor" aria-hidden="true">
    <g class="g1">${Ci(C, C, R)}${L(C - R - 20, C, C + R + 20, C)}${L(C, C - R - 20, C, C + R + 20)}
      ${dot(C - R, C)}${dot(C + R, C)}${dot(C, C - R)}${dot(C, C + R)}</g>
    <g class="g2"><polygon pathLength="1" points="${pts(hex)}"/>${Ci(C, C, r2)}${hex.map(([x, y]) => L(C, C, x, y)).join("")}${hex.map(([x, y]) => dot(x, y, 5)).join("")}</g>
    <g class="g3">${petals}<polygon pathLength="1" points="${pts(tri1)}"/><polygon pathLength="1" points="${pts(tri2)}"/>${Ci(C, C, 150)}</g>
    <g class="g4">${ticks}${Ci(C, C, R + 26)}${dot(C, C, 6)}</g>
  </svg>`;
}

/* Fine topographic waves rising from the lower right, as on the carton and sachet */
function contourSVG(cls = "") {
  const hills = [{ c: 168, a: 92, w: 52 }, { c: 92, a: 52, w: 46 }];
  let paths = "";
  hills.forEach((h, k) => {
    for (let i = 0; i < 13; i++) {
      const amp = h.a - i * 5.2, wid = h.w + i * 4, base = 122 + i * 0.6 - k * 2;
      let d = "";
      for (let x = -10; x <= 210; x += 10) {
        const y = base - amp * Math.exp(-(((x - h.c) / wid) ** 2)) - (x / 210) * (18 - i);
        d += (x === -10 ? "M" : "L") + x + " " + y.toFixed(1) + " ";
      }
      paths += `<path d="${d}"/>`;
    }
  });
  return `<svg class="${cls}" viewBox="0 0 200 120" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width=".45" aria-hidden="true">${paths}</svg>`;
}

const ICON = {
  mark: MARK_SVG,
  contour: contourSVG,
  tilde: (cls = "") => `<svg class="${cls}" viewBox="0 0 40 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2 6 C7 1 11 1 15 5 S24 9 28 5 S35 1 38 4"/></svg>`,
  waves: (cls = "") => `<svg class="${cls}" viewBox="0 0 200 40" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width=".7" aria-hidden="true">
    <path d="M0 12 C30 4 50 20 80 12 S130 4 160 12 S190 18 200 14"/><path d="M0 18 C30 10 52 26 82 18 S132 10 162 18 S190 24 200 20"/>
    <path d="M0 24 C32 16 54 32 84 24 S134 16 164 24 S192 30 200 26"/><path d="M0 30 C34 22 56 38 86 30 S136 22 166 30 S194 36 200 32"/></svg>`,
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

/* ---------- Carton ----------
   opts.unbox: full sachet rig (tear strip, card, two-sided patch) for the unboxing sequence
   opts.rx/ry: starting angle                                  */
function carton(p, opts = {}) {
  const { unbox = false, rx = -10, ry = -28, id = "", anchors = [] } = opts;
  // Anchors: zero-size markers whose on-screen position drives callout lines (Lab)
  const A = (face) => anchors.filter((a) => a.face === face).map((a) => a.dot
    ? `<button type="button" class="anchor anchor-dot" data-anchor="${a.id}" data-pick="${a.id}" style="left:${a.x}%;top:${a.y}%" aria-label="Show detail: ${esc(a.title)}"></button>`
    : `<span class="anchor" data-anchor="${a.id}" style="left:${a.x}%;top:${a.y}%"></span>`).join("");
  const front = `
    <div class="art">
      ${ICON.mark("art-mark")}
      <div class="art-word">MATORI</div>
      <div class="art-tag">Wear your wellness</div>
      <div class="art-sku">
        <div class="art-name">${p.boxName.map(esc).join("<br>")}</div>
        ${ICON.tilde("art-tilde")}
        <div class="art-benefit">${esc(p.benefit.slice(0, 2).join(" / "))}<br>${esc(p.benefit[2] || "")}</div>
      </div>
      ${ICON.contour("art-contour")}
      <div class="art-count"><b>30</b><span>Wearables</span></div>
    </div>
    ${A("front")}`;
  const back = `
    <div class="art-back">
      <h5>Proposed formula</h5>
      <ul>${p.ingredients.map((i) => `<li><span>${esc(i.name)}</span><span>TBC</span></li>`).join("")}</ul>
      <h5>Use</h5>
      <p style="margin:0">Apply to clean, dry skin. Directions to be confirmed.</p>
    </div>`;
  const side = `<div class="art-side"><span class="vert">${esc(p.name)}</span><span class="dim" aria-hidden="true"></span><span class="vert">30 wearables</span></div>${A("right")}`;
  const sideL = `<div class="art-side"><span class="vert">MATORI</span><span class="vert">Wear your wellness</span></div>`;

  // Tray is always present (its top end closes the open sleeve); sachet only where it can be seen
  const tray = `
    <div class="drawer">
      <div class="face kraft d-back"></div>
      ${unbox ? sachetRig(p, A) : `<div class="face d-sachet"><span class="card"></span>${A("sachet")}</div>`}
      <div class="face kraft d-left"></div>
      <div class="face kraft d-right">${A("drawerRight")}</div>
      <div class="face kraft d-top"></div>
      <div class="face kraft d-bottom"></div>
    </div>`;

  return `
    <div class="carton" ${id ? `id="${id}"` : ""} style="--cat:${p.cat};--rx:${rx}deg;--ry:${ry}deg">
      ${tray}
      <div class="sleeve">
        <div class="face kraft f-back">${back}</div>
        <div class="face board-dark f-left">${sideL}</div>
        <div class="face board-dark f-right">${side}</div>
        <div class="face kraft f-front">${front}</div>
      </div>
    </div>`;
}

/* Sachet rig used inside the carton during unboxing.
   Lives in the carton's 3D space so it lifts out of the real tray. */
const sachetRig = (p, A = () => "") => `
  <div class="face u-sachet">
    ${A("sachet")}
    <div class="us-patch">
      <div class="usp-face usp-front">${patchArt()}${A("patch")}</div>
      <div class="usp-face usp-back">
        <span class="usp-adh"></span>
        <span class="usp-liner usp-liner-l"></span><span class="usp-liner usp-liner-r"></span>
      </div>
    </div>
    <div class="us-body">
      <div class="pouch-card">
        ${ICON.mark("art-mark")}
        <div class="pw">MATORI</div>
        <div class="ps"><b>${p.boxName.map(esc).join("<br>")}</b>${ICON.tilde("art-tilde")}<span>${esc(p.benefit.slice(0, 2).join(" / "))}</span><span>${esc(p.benefit[2] || "")}</span></div>
        ${ICON.contour("art-contour")}
      </div>
    </div>
    <div class="us-tear"></div>
  </div>`;

/* Clear sachet with printed card (hero still life) */
const sachetArt = (p) => `
  <div class="pouch-body"></div>
  <div class="pouch-card">
    ${ICON.mark("art-mark")}
    <div class="pw">MATORI</div>
    <div class="ps"><b>${p.boxName.map(esc).join("<br>")}</b>${ICON.tilde("art-tilde")}<span>${esc(p.benefit.slice(0, 2).join(" / "))}</span><span>${esc(p.benefit[2] || "")}</span></div>
    ${ICON.contour("art-contour")}
  </div>`;

/* Patch: rounded pointy-top hexagon, cream face, translucent rim, dark brown mark (per patch renders) */
const patchArt = (cls = "") => `<svg class="patch ${cls}" viewBox="0 0 90 100" aria-hidden="true">
  <path d="M45 3 L86 26.5 L86 73.5 L45 97 L4 73.5 L4 26.5 Z" fill="rgba(244,232,218,.55)" stroke="rgba(244,232,218,.55)" stroke-width="6" stroke-linejoin="round"/>
  <path d="M45 10 L80 30 L80 70 L45 90 L10 70 L10 30 Z" fill="#F0E5D7" stroke="#F0E5D7" stroke-width="5" stroke-linejoin="round"/>
  <g transform="translate(25 35) scale(.63)" fill="none" stroke="#3E2B21" color="#3E2B21" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${MARK_INNER}</g>
</svg>`;

const renderNote = (text = "Concept render. Not a photograph of the finished product.") => `<p class="meta">${esc(text)}</p>`;

const photoPlaceholder = (caption, cls = "", style = "") =>
  `<div class="ph ${cls}" style="${style}" role="img" aria-label="Image placeholder: ${esc(caption)}"><span class="ph-caption dev-only">Photography needed: ${esc(caption)}</span></div>`;

/* ---------- Product card (homepage + overview) ---------- */
function productCard(p) {
  return `
    <a class="cat-card" href="#/products/${p.slug}" style="--cat:${p.cat}">
      <div class="cat-visual stage" aria-hidden="true">${carton(p, { rx: -6, ry: -22 })}</div>
      <span class="label"><span class="hex-dot"></span>${esc(p.category)}</span>
      <h3 class="h3">${esc(p.name)}</h3>
      <p>${esc(p.short)}</p>
      <p class="ingredients">Proposed: ${p.ingredients.filter((i) => i.name !== "Trace cofactors").map((i) => esc(i.name.replace(/ \(.*\)/, ""))).join(", ")}</p>
    </a>`;
}

/* ---------- Founder card ---------- */
function founderCard(f, i) {
  const n = i + 1;
  const name = f.name || `Founding Partner ${n}`;
  const initials = f.name ? f.name.split(" ").map((s) => s[0]).slice(0, 2).join("") : String(n);
  const portrait = f.headshot
    ? `<img src="${esc(f.headshot)}" alt="Portrait of ${esc(f.name)}" loading="lazy">`
    : photoPlaceholder(`headshot, partner ${n}`, "", "height:100%");
  return `
    <article class="founder-card">
      <div class="portrait">${portrait}</div>
      <h3 class="h3">${esc(name)}</h3>
      <p class="role">${f.role ? esc(f.role) : "Title and role to be supplied"}</p>
      ${f.name ? "" : `<p class="dev-only">${flag("Awaiting partner questionnaire")}</p>`}
      <p>${f.bio ? esc(f.bio) : "A short professional biography will appear here: background, relevant accomplishments and the experience this partner brings."}</p>
      <p class="contrib">${f.contribution ? esc(f.contribution) : "A few sentences on what this partner contributes to MATORI and why they joined."}</p>
      ${f.linkedin ? `<a class="text-link" href="${esc(f.linkedin)}" rel="noopener" target="_blank">LinkedIn profile</a>` : ""}
    </article>`;
}
