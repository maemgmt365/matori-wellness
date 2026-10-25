/* =========================================================
   MATORI · team orbit + unboxing depth (loaded after app.js)
   Overrides Pages.ourStory with the orbit and deepens the
   unboxing camera. Kept separate so app.js stays stable.
   ========================================================= */

/* Four slots on the ring. Real partners replace these in FOUNDERS (data.js). */
while (FOUNDERS.length < 4) FOUNDERS.push({ name: null, role: null, bio: null, contribution: null, headshot: null, linkedin: null });
/* Orbit layout: uneven spacing like planets, three distinct base sizes */
const ORBIT_ANGLES = [0, 70, 180, 260, 320, 130, 220, 40];
const ORBIT_BASES  = [1, .86, .94, .8, .9, .84, .96, .88];
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
        <p class="lead measure">Four partners in orbit. Turn the ring, or choose a person, and they come forward and open.</p>
      </div>
      <div class="orbit" id="orbit" style="--a:0deg">
        <div class="orbit-stage" id="orbit-stage" tabindex="0" role="group" aria-label="Team ring. Swipe, drag, or use the arrow keys to turn it.">
          <div class="orbit-scene">
            <div class="orbit-world">
              ${geoConstruct("orbit-geo")}
              <div class="orbit-equator"></div>
              <div class="orbit-sun" aria-hidden="true">
                <div class="aurora"><i></i><i></i><i></i></div>
                ${ICON.mark("orbit-sun-mark")}
              </div>
              ${P.map((p, i) => `
                <div class="orbit-node" data-node="${i}" style="--i:${i};--ang:${ORBIT_ANGLES[i % ORBIT_ANGLES.length]}deg;--base:${ORBIT_BASES[i % ORBIT_BASES.length]};--rel:0deg;--depth:1">
                  <article class="hexnode" data-pick="${i}" aria-label="${esc(p.name)}, ${esc(p.role)}">
                    <svg class="hex-frame" viewBox="0 0 86.6 100" preserveAspectRatio="none" aria-hidden="true"><polygon points="43.3,0 86.6,25 86.6,75 43.3,100 0,75 0,25"/><polygon class="inner" points="43.3,4 83.1,27 83.1,73 43.3,96 3.5,73 3.5,27"/><polygon class="ripple ripple--1" points="43.3,0 86.6,25 86.6,75 43.3,100 0,75 0,25"/><polygon class="ripple ripple--2" points="43.3,0 86.6,25 86.6,75 43.3,100 0,75 0,25"/></svg>
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
    <p class="lead">MATORI started with a simple question: could everyday skincare be simpler to keep up and more honest about how it works? A wearable offered a different format, and a reason to design the whole experience with care.</p>
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
  const P = FOUNDERS.map(partnerView), N = P.length;
  const ANG = P.map((_, i) => ORBIT_ANGLES[i % ORBIT_ANGLES.length]);
  const stage = document.getElementById("orbit-stage"), nodes = [...root.querySelectorAll(".orbit-node")];
  const count = root.querySelector(".orbit-count");
  let a = 0, target = 0, active = -1, dragging = false, sx = 0, s0 = 0, pid = null, moved = false, vel = 0, lastX = 0, lastT = 0;

  const norm = (d) => ((d % 360) + 360) % 360;
  const setAngle = (v) => { a = v; root.style.setProperty("--a", a.toFixed(2) + "deg"); };
  // node i faces the camera when a = -ANG[i] (mod 360)
  const relOf = (i, ang) => { let r = norm(ANG[i] + ang); if (r > 180) r -= 360; return r; };
  const frontAt = (ang) => { let best = 0, bd = 1e9; ANG.forEach((_, i) => { const d = Math.abs(relOf(i, ang)); if (d < bd) { bd = d; best = i; } }); return best; };
  const nearestStop = (ang) => { const i = frontAt(ang); return ang - relOf(i, ang); };   // snap so the nearest partner is exactly front
  const frontIndex = () => frontAt(a);

  const animate = () => {
    if (!dragging) { const d = target - a; if (Math.abs(d) > 0.05) setAngle(a + d * 0.09); else if (a !== target) setAngle(target); }
    const settled = Math.abs(target - a) < 1.5 && !dragging;
    const front = frontIndex();
    nodes.forEach((n, i) => {
      const rel = relOf(i, a);
      const depth = Math.cos((rel * Math.PI) / 180);          // 1 front, -1 back
      n.style.setProperty("--rel", rel.toFixed(1) + "deg");
      n.style.setProperty("--depth", depth.toFixed(3));
      n.style.zIndex = String(Math.round((depth + 1) * 50));
      const front_ = i === front && depth > 0.9;
      n.classList.toggle("is-front", front_);
      n.querySelector(".hex-text").setAttribute("aria-hidden", String(!front_));
    });
    root.style.setProperty("--g", settled ? "1" : "0");
    root.classList.toggle("is-settled", settled);
    if (front !== active) { active = front; count.textContent = `${P[front].n} of ${String(N).padStart(2, "0")}`; }
  };
  const turn = (dir) => {
    // next partner in that direction along the orbit
    const cur = frontAt(target); const order = ANG.map((v, i) => ({ v: norm(v - ANG[cur]), i })).sort((x, y) => x.v - y.v);
    const nxt = dir > 0 ? order[1] : order[order.length - 1];
    let d = relOf(nxt.i, target); target = target - d;
  };
  const pick = (i) => { target = target - relOf(i, target); };
  const down = (e) => { if (e.target.closest("a, button")) return; dragging = true; moved = false; pid = e.pointerId; sx = lastX = e.clientX; s0 = a; vel = 0; lastT = performance.now(); stage.setPointerCapture?.(pid); };
  const move = (e) => { if (!dragging || e.pointerId !== pid) return; const dx = e.clientX - sx; if (Math.abs(dx) > 3) moved = true; const t = performance.now(); vel = (e.clientX - lastX) / Math.max(1, t - lastT); lastX = e.clientX; lastT = t; setAngle(s0 + dx * 0.4); };
  const up = (e) => { if (!dragging || e.pointerId !== pid) return; dragging = false; stage.releasePointerCapture?.(pid); target = nearestStop(a + vel * 90); if (!moved) { const p = e.target.closest("[data-pick]"); if (p) pick(+p.dataset.pick); } };
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
  // Mirror the carton's rotation onto the section so the floor construction turns with the box
  const section = document.getElementById("unbox"), cartonEl = document.getElementById("unbox-carton");
  if (section && cartonEl) cleanup.push(whileVisible(section, () => {
    const ry = cartonEl.style.getPropertyValue("--ry") || "0deg";
    if (section.style.getPropertyValue("--ry") !== ry) section.style.setProperty("--ry", ry);
  }));
};
