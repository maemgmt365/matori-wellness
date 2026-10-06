/* =========================================================
   MATORI · team orbit + unboxing depth (loaded after app.js)
   Overrides Pages.ourStory with the orbit and deepens the
   unboxing camera. Kept separate so app.js stays stable.
   ========================================================= */

/* Four slots on the ring. Real partners replace these in FOUNDERS (data.js). */
while (FOUNDERS.length < 4) FOUNDERS.push({ name: null, role: null, bio: null, contribution: null, headshot: null, linkedin: null });
const DEFAULT_ROLES = ["Founder & CEO", "Founder & COO", "Partner & Chief Strategy Officer", "Partner & Chief Marketing Officer (to be confirmed)"];

const partnerView = (f, i) => ({
  n: String(i + 1).padStart(2, "0"),
  name: f.name || `Founding Partner ${String(i + 1).padStart(2, "0")}`,
  role: f.role || DEFAULT_ROLES[i] || "Partner",
  bio: f.bio || "Profile coming soon. Background, responsibilities and what this partner brings to MATORI will appear here.",
  contribution: f.contribution || "",
  initials: f.name ? f.name.split(" ").map((s) => s[0]).slice(0, 2).join("") : String(i + 1),
  headshot: f.headshot, linkedin: f.linkedin
});

function orbitHTML() {
  const P = FOUNDERS.map(partnerView);
  return `
  <section class="section section--alt orbit-section" id="team" aria-labelledby="team-title">
    <div class="wrap">
      <div class="grid-2" style="align-items:end">
        <h2 class="h2" id="team-title">Meet the team.</h2>
        <p class="lead measure">Four partners on one ring. Swipe to turn it: whoever comes forward grows, and the rest fall back.</p>
      </div>
      <div class="orbit" id="orbit" style="--a:0deg">
        <div class="orbit-stage" id="orbit-stage" tabindex="0" role="group" aria-label="Team ring. Swipe, drag, or use the arrow keys to turn it.">
          <div class="orbit-scene">
            <div class="orbit-world">
              ${geoConstruct("orbit-geo")}
              <div class="orbit-equator orbit-equator--outer"></div>
              <div class="orbit-equator"></div>
              ${P.map((p, i) => `
                <div class="orbit-node" data-node="${i}" style="--i:${i};--rel:0deg;--depth:1">
                  <article class="hexnode" data-pick="${i}" aria-label="${esc(p.name)}, ${esc(p.role)}">
                    <svg class="hex-frame" viewBox="0 0 86.6 100" preserveAspectRatio="none" aria-hidden="true"><polygon points="43.3,0 86.6,25 86.6,75 43.3,100 0,75 0,25"/><polygon class="inner" points="43.3,4 83.1,27 83.1,73 43.3,96 3.5,73 3.5,27"/></svg>
                    <div class="hex-portrait">${p.headshot ? `<img src="${esc(p.headshot)}" alt="Portrait of ${esc(p.name)}">` : `<span class="orbit-initial">${esc(p.initials)}</span>`}</div>
                    <div class="hex-text">
                      <p class="label">${p.n} / ${String(P.length).padStart(2, "0")}</p>
                      <h3 class="h3">${esc(p.name)}</h3>
                      <p class="orbit-role">${esc(p.role)}</p>
                      <p class="orbit-bio">${esc(p.bio)}</p>
                      ${p.linkedin ? `<a class="text-link" href="${esc(p.linkedin)}" rel="noopener" target="_blank">LinkedIn profile</a>` : ""}
                    </div>
                  </article>
                </div>`).join("")}
            </div>
          </div>
          <div class="orbit-controls">
            <button type="button" class="btn btn--ghost btn--small" data-turn="-1" aria-label="Previous partner">Previous</button>
            <span class="meta orbit-count" aria-live="polite"></span>
            <button type="button" class="btn btn--small" data-turn="1" aria-label="Next partner">Next</button>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

Pages.ourStory = () => `
  <header class="page-head"><div class="wrap">
    <span class="label">Our Story</span>
    <h1 class="display">Built around a better way to approach wellness.</h1>
    <p class="lead">MATORI started with a simple question: could everyday wellness be easier to keep up and more honest about how it works? Transdermal delivery offered a different format, and a reason to design the whole experience with care.</p>
  </div></header>
  ${orbitHTML()}
  <section class="section"><div class="wrap grid-2">
    <h2 class="h2">A shared vision</h2>
    <div class="serif-body measure">
      <p>We want to build a wellness brand that earns trust slowly: products that are pleasant to use, design that respects the person using it, and science described plainly, including its limits.</p>
    </div>
  </div></section>
  <section class="section section--alt final-cta"><div class="wrap">
    ${ICON.mark("final-mark")}
    <h2 class="h2">See what we're making.</h2>
    <div class="btn-row"><a class="btn" href="#/products">Explore MATORI</a><a class="btn btn--ghost" href="#/collaborate">Get in touch</a></div>
  </div></section>`;

function mountOrbit(root) {
  const P = FOUNDERS.map(partnerView), N = P.length, step = 360 / N;
  const stage = document.getElementById("orbit-stage"), nodes = [...root.querySelectorAll(".orbit-node")];
  const count = root.querySelector(".orbit-count");
  let a = 0, target = 0, active = -1, dragging = false, sx = 0, s0 = 0, pid = null, moved = false;

  const setAngle = (v) => { a = v; root.style.setProperty("--a", a.toFixed(2) + "deg"); };
  const nearest = (v) => Math.round(v / step) * step;
  const frontIndex = () => (((Math.round(-a / step) % N) + N) % N);

  const animate = () => {
    if (!dragging) { const d = target - a; if (Math.abs(d) > 0.05) setAngle(a + d * 0.1); else if (a !== target) setAngle(target); }
    const settled = Math.abs(target - a) < 1.5 && !dragging;
    const front = frontIndex();
    nodes.forEach((n, i) => {
      // angle of this node relative to the camera: 0 = front, 180 = back
      let rel = ((i * step + a) % 360 + 360) % 360; if (rel > 180) rel -= 360;
      const depth = Math.cos((rel * Math.PI) / 180);          // 1 front, -1 back
      n.style.setProperty("--rel", rel.toFixed(1) + "deg");
      n.style.setProperty("--depth", depth.toFixed(3));
      n.style.zIndex = String(Math.round((depth + 1) * 50));
      const front_ = i === front && depth > 0.6;
      n.classList.toggle("is-front", front_);
      n.querySelector(".hex-text").setAttribute("aria-hidden", String(!front_));
    });
    root.style.setProperty("--g", settled ? "1" : "0");
    if (front !== active) { active = front; count.textContent = `${P[front].n} of ${String(N).padStart(2, "0")}`; }
  };
  const turn = (dir) => { target = nearest(target) - dir * step; };
  const pick = (i) => { const cur = frontIndex(); let d = i - cur; if (d > N / 2) d -= N; if (d < -N / 2) d += N; target = nearest(target) - d * step; };
  const down = (e) => { if (e.target.closest("a, button")) return; dragging = true; moved = false; pid = e.pointerId; sx = e.clientX; s0 = a; stage.setPointerCapture?.(pid); };
  const move = (e) => { if (!dragging || e.pointerId !== pid) return; const dx = e.clientX - sx; if (Math.abs(dx) > 3) moved = true; setAngle(s0 + dx * 0.45); };
  const up = (e) => { if (!dragging || e.pointerId !== pid) return; dragging = false; stage.releasePointerCapture?.(pid); target = nearest(a); if (!moved) { const p = e.target.closest("[data-pick]"); if (p) pick(+p.dataset.pick); } };
  const key = (e) => { if (e.key === "ArrowLeft") { e.preventDefault(); turn(-1); } else if (e.key === "ArrowRight") { e.preventDefault(); turn(1); } };
  const click = (e) => { const t = e.target.closest("[data-turn]"); if (t) turn(+t.dataset.turn); };
  stage.addEventListener("pointerdown", down); stage.addEventListener("pointermove", move); stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);
  stage.addEventListener("keydown", key); root.addEventListener("click", click);
  setAngle(0); animate();
  const stop = whileVisible(stage, animate);
  return () => { stop(); stage.removeEventListener("pointerdown", down); stage.removeEventListener("pointermove", move); stage.removeEventListener("pointerup", up); stage.removeEventListener("pointercancel", up); stage.removeEventListener("keydown", key); root.removeEventListener("click", click); };
}

/* Hook the orbit into the page lifecycle without touching app.js */
const __mountPage = mountPage;
mountPage = function () {
  __mountPage();
  const o = document.getElementById("orbit");
  if (o) cleanup.push(mountOrbit(o));
  const rig = document.querySelector(".unbox-rig");
  if (rig && !rig.querySelector(".cage")) {
    // Hexagonal cage around the carton: six panels that peel open from the base as you scroll
    rig.insertAdjacentHTML("afterbegin", `<div class="cage" aria-hidden="true">${[0, 1, 2, 3, 4, 5].map((k) => `
      <div class="cage-panel" style="--k:${k}"><svg viewBox="0 0 100 190" fill="none" stroke="currentColor" stroke-width=".8">
        <polygon points="50,8 86,29 86,71 50,92 14,71 14,29"/><polygon points="50,30 68,40 68,60 50,70 32,60 32,40"/>
        <line x1="50" y1="92" x2="50" y2="182"/><line x1="14" y1="120" x2="86" y2="120"/><line x1="14" y1="150" x2="86" y2="150"/>
        <circle cx="50" cy="182" r="2.5" fill="currentColor"/></svg></div>`).join("")}</div>`);
    const layers = document.querySelector(".unbox-layers");
    if (layers && !layers.querySelector(".ul-geo-wall")) layers.insertAdjacentHTML("afterbegin", geoConstruct("ul-geo-wall"));
    // Mirror the carton's rotation onto the section so the constructions turn with the box
    const section = document.getElementById("unbox"), cartonEl = document.getElementById("unbox-carton");
    if (section && cartonEl) cleanup.push(whileVisible(section, () => {
      const ry = cartonEl.style.getPropertyValue("--ry") || "0deg";
      if (section.style.getPropertyValue("--ry") !== ry) section.style.setProperty("--ry", ry);
    }));
  }
};

/* Unboxing depth: the camera dollies in, the carton comes toward you,
   and the patch finishes close to the lens. */
Object.assign(UNBOX_TIMELINE, {
  rigZ:   [[0, -200], [0.14, 40], [0.50, 40], [0.70, 110], [0.86, 170]],
  rigY:   [[0, 60], [0.36, 40], [0.50, 120], [0.68, 310], [0.86, 330]],
  patchZ: [[0.82, 0], [0.89, 220], [0.99, 240]],
  patchS: [[0.84, 1], [0.90, 1.25], [0.99, 1.3]]
});
