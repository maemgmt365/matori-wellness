/* =========================================================
   MATORI · team orbit + unboxing depth (loaded after app.js)
   Overrides Pages.ourStory with the orbit and deepens the
   unboxing camera. Kept separate so app.js stays stable.
   ========================================================= */

/* Four slots on the ring. Real partners replace these in FOUNDERS (data.js). */
while (FOUNDERS.length < 4) FOUNDERS.push({ name: null, role: null, bio: null, contribution: null, headshot: null, linkedin: null });

const partnerView = (f, i) => ({
  n: String(i + 1).padStart(2, "0"),
  name: f.name || `Founding Partner ${String(i + 1).padStart(2, "0")}`,
  role: f.role || "Role to be announced",
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
        <p class="lead measure">Four partners, one ring. Turn it to bring each one forward.</p>
      </div>
      <div class="orbit" id="orbit" style="--a:0deg">
        <div class="orbit-stage" id="orbit-stage" tabindex="0" role="group" aria-label="Team ring. Drag or use the arrow keys to turn it.">
          <div class="orbit-scene">
            <div class="orbit-world">
              ${geoConstruct("orbit-geo")}
              <div class="orbit-equator orbit-equator--outer"></div>
              <div class="orbit-equator"></div>
              <div class="orbit-ticks" aria-hidden="true">${Array.from({ length: 36 }, (_, k) => `<span style="--k:${k}"></span>`).join("")}</div>
              ${P.map((p, i) => `
                <div class="orbit-node" data-node="${i}" style="--i:${i}">
                  <button type="button" class="orbit-disc" data-pick="${i}" aria-label="${esc(p.name)}">
                    ${p.headshot ? `<img src="${esc(p.headshot)}" alt="">` : `<span class="orbit-initial">${esc(p.initials)}</span>`}
                    <span class="anchor" data-anchor="node-${i}"></span>
                  </button>
                  <span class="orbit-tag">${esc(p.name)}</span>
                </div>`).join("")}
            </div>
          </div>
          <svg class="lab-lines" aria-hidden="true">
            <polyline class="cl-line" points=""/>
            <circle class="cl-ring2" r="0"/><circle class="cl-ring1" r="0"/>
            <g class="cl-ticks">${[0, 1, 2, 3].map(() => `<line x1="0" y1="0" x2="0" y2="0"/>`).join("")}</g>
          </svg>
          <div class="orbit-card" id="orbit-card" aria-live="polite">
            <p class="label"></p><h3 class="h3"></h3><p class="orbit-role"></p><p class="orbit-bio"></p><p class="orbit-contrib"></p><a class="text-link orbit-link" href="#" hidden rel="noopener" target="_blank">LinkedIn profile</a>
          </div>
          <div class="orbit-controls">
            <button type="button" class="icon-btn" data-turn="-1" aria-label="Previous partner">Previous</button>
            <span class="meta orbit-count"></span>
            <button type="button" class="icon-btn" data-turn="1" aria-label="Next partner">Next</button>
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
  const stage = document.getElementById("orbit-stage"), card = document.getElementById("orbit-card");
  const line = root.querySelector(".cl-line"), ring1 = root.querySelector(".cl-ring1"), ring2 = root.querySelector(".cl-ring2");
  const ticks = [...root.querySelectorAll(".cl-ticks line")], count = root.querySelector(".orbit-count");
  const instant = reduceMotion();
  let a = 0, target = 0, active = -1, t0 = 0, dragging = false, sx = 0, s0 = 0, pid = null, raf = 0;

  const setAngle = (v) => { a = v; root.style.setProperty("--a", a.toFixed(2) + "deg"); };
  const nearest = (v) => Math.round(v / step) * step;
  const show = (i) => {
    if (i === active) return; active = i; const p = P[i];
    card.querySelector(".label").textContent = `${p.n} / ${String(N).padStart(2, "0")}`;
    card.querySelector("h3").textContent = p.name; card.querySelector(".orbit-role").textContent = p.role;
    card.querySelector(".orbit-bio").textContent = p.bio; card.querySelector(".orbit-contrib").textContent = p.contribution;
    const l = card.querySelector(".orbit-link"); l.hidden = !p.linkedin; if (p.linkedin) l.href = p.linkedin;
    count.textContent = `${p.n} of ${String(N).padStart(2, "0")}`;
    root.querySelectorAll(".orbit-node").forEach((n, j) => n.classList.toggle("is-front", j === i));
    t0 = performance.now() + (instant ? -2000 : 350);
  };
  const frontIndex = () => (((Math.round(-a / step) % N) + N) % N);

  const animate = () => {
    if (!dragging) { const d = target - a; if (Math.abs(d) > 0.05) setAngle(a + d * 0.12); else if (a !== target) setAngle(target); }
    show(frontIndex());
    // card pull + ring draw, anchored to the front node
    const an = anchorPoint(stage, `node-${active}`);
    if (an) {
      const W = stage.clientWidth, H = stage.clientHeight, cw = card.offsetWidth, ch = card.offsetHeight;
      const settled = Math.abs(target - a) < 1.5 && !dragging;
      const tPull = settled ? ease((performance.now() - t0) / 650) : 0, tRing = settled ? ease((performance.now() - t0 + 250) / 450) : 0;
      root.style.setProperty("--g", tRing.toFixed(3));
      root.classList.toggle("is-settled", settled);
      const docked = W < 760;
      const fx = docked ? (W - cw) / 2 : Math.min(W - cw - 24, an.x + 150), fy = docked ? H - ch - 16 : Math.max(16, Math.min(H - ch - 16, an.y - ch / 2));
      const cx = lerp(an.x - cw / 2, fx, tPull), cy = lerp(an.y - ch / 2, fy, tPull);
      card.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px) scale(${(0.82 + 0.18 * tPull).toFixed(3)})`;
      card.style.opacity = tPull.toFixed(3);
      const ax = docked ? cx + cw / 2 : cx, ay = docked ? cy : cy + 28;
      const ex = lerp(an.x, docked ? an.x : an.x + 70, tPull), ey = lerp(an.y, docked ? ay - 26 : ay, tPull);
      line.setAttribute("points", `${an.x.toFixed(1)},${an.y.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)} ${ax.toFixed(1)},${ay.toFixed(1)}`);
      line.style.opacity = tPull > 0.02 ? 1 : 0;
      [ring1, ring2].forEach((c) => { c.setAttribute("cx", an.x.toFixed(1)); c.setAttribute("cy", an.y.toFixed(1)); });
      ring1.setAttribute("r", (46 * tRing).toFixed(1)); ring2.setAttribute("r", (62 * tRing).toFixed(1)); ring2.style.opacity = tRing * 0.7; ring1.style.opacity = tRing;
      ticks.forEach((l, k) => { const g = (Math.PI / 2) * k + Math.PI / 4 + (1 - tRing) * 0.6, r0 = 68 * tRing, r1 = 78 * tRing;
        l.setAttribute("x1", (an.x + r0 * Math.cos(g)).toFixed(1)); l.setAttribute("y1", (an.y + r0 * Math.sin(g)).toFixed(1));
        l.setAttribute("x2", (an.x + r1 * Math.cos(g)).toFixed(1)); l.setAttribute("y2", (an.y + r1 * Math.sin(g)).toFixed(1)); });
    }
  };
  const turn = (dir) => { target = nearest(target) - dir * step; };
  const pick = (i) => { const cur = frontIndex(); let d = i - cur; if (d > N / 2) d -= N; if (d < -N / 2) d += N; target = nearest(target) - d * step; };
  const down = (e) => { if (e.target.closest("button")) return; dragging = true; pid = e.pointerId; sx = e.clientX; s0 = a; stage.setPointerCapture?.(pid); };
  const move = (e) => { if (!dragging || e.pointerId !== pid) return; setAngle(s0 + (e.clientX - sx) * 0.45); };
  const up = (e) => { if (!dragging || e.pointerId !== pid) return; dragging = false; stage.releasePointerCapture?.(pid); target = nearest(a); };
  const key = (e) => { if (e.key === "ArrowLeft") { e.preventDefault(); turn(-1); } else if (e.key === "ArrowRight") { e.preventDefault(); turn(1); } };
  const click = (e) => { const t = e.target.closest("[data-turn]"); if (t) return turn(+t.dataset.turn); const p = e.target.closest("[data-pick]"); if (p) pick(+p.dataset.pick); };
  stage.addEventListener("pointerdown", down); stage.addEventListener("pointermove", move); stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);
  stage.addEventListener("keydown", key); root.addEventListener("click", click);
  setAngle(0); if (instant) show(0);
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
  }
};

/* Unboxing depth: the camera dollies in, the carton comes toward you,
   and the patch finishes close to the lens. */
Object.assign(UNBOX_TIMELINE, {
  rigZ:   [[0, -520], [0.14, -40], [0.50, -40], [0.70, 60], [0.86, 140]],
  rigY:   [[0, 60], [0.36, 40], [0.50, 110], [0.68, 240], [0.86, 280]],
  patchZ: [[0.82, 0], [0.89, 220], [0.99, 240]],
  patchS: [[0.84, 1], [0.90, 1.25], [0.99, 1.3]]
});
