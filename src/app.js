/* =========================================================
   MATORI · pages, router, interactions
   Routes use the URL hash (#/products/sleep) so the site runs
   as a single static file anywhere. To move to a framework
   later, each page function maps 1:1 to a route component.
   ========================================================= */

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- PAGES ---------- */
const Pages = {};

Pages.home = () => `
  <section class="hero-scene" aria-labelledby="hero-title">
    <div class="scene-bg" aria-hidden="true">
      <div class="wall"></div>
      <div class="depth-layer" data-depth="-0.05">${leafShadow("leaf-shadow")}</div>
      <div class="stone-block"></div>
      <div class="ledge"></div>
    </div>
    <div class="wrap scene-grid">
      <div class="scene-copy">
        <span class="label label--rule">Precision transdermal wellness</span>
        <h1 class="display display--caps" id="hero-title">Wellness,<br>worn differently.</h1>
        <p class="lead">An intentional approach to everyday wellness. Explore a new format for sleep, daytime energy, and essential nutrients.</p>
        <div class="btn-row">
          <a class="btn" href="#/products">Explore MATORI</a>
          <a class="btn btn--ghost" href="#/assessment">Find your routine</a>
        </div>
        <ul class="hero-cats" aria-label="Product concepts">
          ${PRODUCTS.map((p) => `<li style="--cat:${p.cat}"><span class="hex-dot" aria-hidden="true"></span>${esc(p.name)}</li>`).join("")}
        </ul>
      </div>
      <div class="scene-products hero-intro" id="hero-products" aria-hidden="true">
        <div class="hero-geo-wrap" data-depth="0.04">${geoConstruct("hero-geo")}</div>
        <div class="sp sp-carton" data-par="1" data-depth="0.08"><div class="stage">${carton(PRODUCTS[1], { rx: -4, ry: -22 })}</div></div>
        <div class="sp sp-sachet" data-par="1.6" data-depth="0.16">${sachetArt(PRODUCTS[1])}</div>
        <div class="sp sp-patch" data-par="2.2" data-depth="0.3">${patchArt()}</div>
      </div>
    </div>
    <p class="scene-note meta">Concept render. Not a photograph of the finished product.</p>
  </section>

  <section class="mosaic" aria-label="About MATORI">
    <div class="tile tile-skin" role="img" aria-label="Image placeholder: patch worn on skin">
      ${patchArt("skin-patch")}
      <span class="ph-caption dev-only">Photography needed: patch worn on skin</span>
    </div>
    <div class="tile tile-text">
      <span class="label label--rule">About MATORI</span>
      <h2 class="h3">Considered science. Naturally inspired.</h2>
      <p>MATORI pairs transdermal delivery with carefully selected ingredients, designed to fit into the day without another pill to remember.</p>
      <a class="tile-link" href="#/our-story">Our story</a>
    </div>
    <a class="tile tile-studio" href="#/collaborate">
      <span class="ph-caption dev-only">Photography needed: studio interior</span>
      <span class="tile-overlay">Studio and wholesale partnerships</span>
    </a>
    <div class="tile tile-split">
      <div class="tile-stone" aria-hidden="true">${leafShadow("leaf-shadow leaf-shadow--tile")}${patchArt("stone-patch")}</div>
      <div class="tile-text tile-text--compact">
        <span class="label label--rule">The details matter</span>
        <h2 class="h3">Considered formulation. Intentional design.</h2>
        <a class="tile-link" href="#/science">The science</a>
      </div>
    </div>
  </section>

  <div class="attr-band" aria-label="Brand principles">
    <ul>${["Precision", "Sustained", "Cellular", "Clean", "High-performance"].map((w) => `<li>${w}</li>`).join("")}</ul>
  </div>

  <section class="section section--alt" aria-labelledby="cats-title">
    <div class="wrap">
      <div class="grid-2" style="align-items:end">
        <h2 class="h2" id="cats-title">Three routines, one system.</h2>
        <p class="lead measure">Each patch is designed for a moment in the day. The same kraft carton and copper ink across the range, with each product named for its moment.</p>
      </div>
      <div class="cat-grid">${PRODUCTS.map(productCard).join("")}</div>
      <p class="meta" style="margin-top:28px">Proposed formulations in development. Ingredients, doses and availability are not final.</p>
    </div>
  </section>

  <section class="section philosophy" aria-labelledby="phil-title">
    <div class="wrap">
      <div class="grid-2">
        <div>
          <h2 class="h2" id="phil-title">Less to take. More to consider.</h2>
          <p class="lead measure" style="margin-top:24px">Wellness should fit into the day you already have. MATORI is built around a few considered products rather than a cabinet of bottles.</p>
        </div>
        <figure class="still">
          <div class="still-frame"><img src="__ASSET:packaging-still.webp__" alt="MATORI Efficient Energy sachet beside its kraft carton, printed in copper ink" loading="lazy" width="640" height="854"></div>
          <figcaption class="meta">Concept render of the Efficient Energy sachet and carton.</figcaption>
        </figure>
      </div>
      <div class="philosophy-body">
        <div><h3>Fewer decisions</h3><p>Three routines that map to the day: evening, daytime, and every day. Nothing to measure or mix.</p></div>
        <div><h3>Honest about the science</h3><p>Delivery through the skin depends on the ingredient and the formula. We say what is known and what is still being tested.</p></div>
        <div><h3>Made to be kept</h3><p>A kraft carton, a clear resealable sachet and a shape designed to be worn without fuss.</p></div>
      </div>
    </div>
  </section>

  ${unboxHTML(PRODUCTS[1])}

  <section class="section" aria-labelledby="sizes-title">
    <div class="wrap grid-2">
      <figure class="size-board">
        <div class="size-board-surface" aria-hidden="true">
          ${SIZES.map((z) => `<div class="sb-item" style="--mm:${z.mm}">${patchArt()}<span class="sb-dim"><span>${z.mm} mm</span></span></div>`).join("")}
        </div>
        <figcaption class="meta">Shown at true relative scale. Concept render.</figcaption>
      </figure>
      <div>
        <span class="label">The patch</span>
        <h2 class="h2" id="sizes-title" style="margin:16px 0 20px">One shape, three sizes.</h2>
        <p class="lead measure">A rounded hexagon with a soft, translucent edge, designed to sit flat and stay discreet through the day.</p>
        <ul class="size-list">
          ${SIZES.map((z) => `<li><span class="size-name">${z.name}</span><span class="size-mm">${z.mm} mm across</span></li>`).join("")}
        </ul>
        <p class="meta">${flag("Proposed sizes")}Which sizes launch, and the dose for each, are still being confirmed.</p>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="sci-title">
    <div class="wrap">
      <div class="grid-2" style="align-items:end">
        <h2 class="h2" id="sci-title">Form follows function.</h2>
        <div>
          <p class="lead measure">Skin is built to keep things out. Whether an ingredient can pass through depends on its size, its chemistry and the patch that carries it.</p>
          <a class="text-link" href="#/science">Read the science</a>
        </div>
      </div>
      <div class="principles">
        <div><h3>The ingredient</h3><p>Molecular size and how readily a compound dissolves in oil or water shape how it behaves at the skin barrier.</p></div>
        <div><h3>The formulation</h3><p>Concentration, carrier and adhesive design determine how much is released and how evenly.</p></div>
        <div><h3>The evidence</h3><p>General research is a starting point. Claims about a MATORI patch will rest on testing of that finished patch.</p></div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="collab-title">
    <div class="wrap collab-band">
      <div>
        <h2 class="h2" id="collab-title">Good things happen when the right people connect.</h2>
        <p class="lead measure" style="margin-top:24px">We'd like to hear from creators, studios, practitioners and partners who share a commitment to thoughtful design and credible science.</p>
        <a class="btn" href="#/collaborate" style="margin-top:12px">Collaborate with MATORI</a>
      </div>
      <ul class="pathway-list">
        <li><span>Creator and community</span><span>Athletes, creators, community leaders</span></li>
        <li><span>Studio and practitioner</span><span>Fitness, Pilates, recovery, practice</span></li>
        <li><span>Strategic partnerships</span><span>Research, formulation, manufacturing</span></li>
      </ul>
    </div>
  </section>

  <section class="section section--alt final-cta" aria-labelledby="final-title">
    <div class="wrap">
      ${ICON.mark("final-mark")}
      <h2 class="h2" id="final-title">Start with the routine that fits your day.</h2>
      <div class="btn-row">
        <a class="btn" href="#/products">Explore MATORI</a>
        <a class="btn btn--ghost" href="#/assessment">Find your routine</a>
      </div>
    </div>
  </section>`;

function unboxHTML(p) {
  return `
  <section class="unbox" id="unbox" aria-labelledby="unbox-title" style="--p:0">
    <div class="unbox-sticky">
      <div class="unbox-layers" aria-hidden="true">
        ${geoConstruct("ul-geo")}
        ${ICON.mark("ul-mark")}
        ${ICON.contour("ul-contour")}
      </div>
      <div class="wrap unbox-grid">
        <div class="unbox-copy">
          <h2 class="h2" id="unbox-title">Open the box.</h2>
          <div class="unbox-panels">
            ${UNBOX_STEPS.map((s, i) => `
              <div class="unbox-panel" data-step="${i}" ${i ? 'aria-hidden="true"' : ""}>
                <p class="label">${String(i + 1).padStart(2, "0")} / ${String(UNBOX_STEPS.length).padStart(2, "0")}</p>
                <h3 class="h3">${esc(s.title)}</h3>
                <p>${esc(s.body)}</p>
                ${s.dl ? `<dl>${s.dl.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>` : ""}
                ${s.cta ? `<a class="btn btn--small" href="${s.cta.href}" style="margin-top:18px">${esc(s.cta.label)}</a>` : ""}
              </div>`).join("")}
          </div>
          <ol class="unbox-rail" aria-label="Unboxing steps">
            ${UNBOX_STEPS.map((s, i) => `<li><button type="button" data-goto="${i}" aria-label="Step ${i + 1}: ${esc(s.title)}"><span></span></button></li>`).join("")}
          </ol>
        </div>
        <div class="unbox-stage" id="unbox-stage" tabindex="0" role="group" aria-label="MATORI ${esc(p.name)} carton. Scroll to unpack it, drag or use the left and right arrow keys to turn it.">
          <div class="stage">
            <div class="unbox-rig">${carton(p, { unbox: true, rx: -4, ry: 205, id: "unbox-carton" })}</div>
          </div>
        </div>
      </div>
      <p class="unbox-hint meta" id="unbox-hint">Scroll to unpack. Drag to turn.</p>
      <p class="unbox-note meta">Concept render. Not a photograph of the finished product.</p>
    </div>
  </section>`;
}

Pages.lab = () => `
  <header class="page-head"><div class="wrap">
    <span class="label">Lab</span>
    <h1 class="display">Interaction models</h1>
    <p class="lead">Two ways to pull detail out of the product. Try both, then pick what carries into the main site. Drag either carton to turn it.</p>
  </div></header>

  <section class="section lab-model" id="lab-a" aria-labelledby="lab-a-title">
    <div class="wrap lab-grid">
      <div class="lab-side">
        <p class="label">Model A</p>
        <h2 class="h3" id="lab-a-title">Focus and pull</h2>
        <p class="lab-intro">Pick a detail. The carton turns to it, a ring opens on the spot, and a line pulls the detail out.</p>
        <ol class="lab-list">
          ${CALLOUTS.map((c, i) => `<li><button type="button" data-callout="${i}"><span class="n">${String(i + 1).padStart(2, "0")}</span>${esc(c.title)}</button></li>`).join("")}
        </ol>
        <button type="button" class="btn btn--ghost btn--small" id="lab-a-tour">Play tour</button>
      </div>
      <div class="lab-stage" id="lab-a-stage" tabindex="0" role="group" aria-label="Carton with detail callouts. Use arrow keys to turn it.">
        <div class="stage"><div class="lab-rig">${carton(PRODUCTS[1], { id: "lab-a-carton", rx: -12, ry: -16, anchors: CALLOUTS.map((c) => ({ ...c, dot: true })) })}</div></div>
        <svg class="lab-lines" aria-hidden="true">
          <polyline class="cl-line" points=""/>
          <circle class="cl-ring2" r="0"/><circle class="cl-ring1" r="0"/>
          <g class="cl-ticks">${[0, 1, 2, 3].map(() => `<line x1="0" y1="0" x2="0" y2="0"/>`).join("")}</g>
          <circle class="cl-dot" r="3"/>
        </svg>
        <div class="lab-card" id="lab-a-card" aria-live="polite"><p class="label"></p><h3 class="h4"></h3><p></p></div>
      </div>
    </div>
  </section>

  <section class="section section--alt lab-model" id="lab-b" aria-labelledby="lab-b-title">
    <div class="wrap lab-grid">
      <div class="lab-side">
        <p class="label">Model B</p>
        <h2 class="h3" id="lab-b-title">Exploded view</h2>
        <p class="lab-intro">Pull the layers apart along one axis. Lines tie each part back to the construction line and its label.</p>
        <label class="lab-range"><span>Explode</span><input type="range" id="lab-b-range" min="0" max="100" value="0"></label>
        <button type="button" class="btn btn--ghost btn--small" id="lab-b-play">Play</button>
      </div>
      <div class="lab-stage" id="lab-b-stage" tabindex="0" role="group" aria-label="Exploded carton. Use arrow keys to turn it.">
        <div class="stage"><div class="lab-rig">${carton(PRODUCTS[1], { id: "lab-b-carton", unbox: true, rx: -14, ry: -52, anchors: EXPLODE_PARTS })}</div></div>
        <svg class="lab-lines" aria-hidden="true">
          <polyline class="ex-axis" points=""/>
          ${EXPLODE_PARTS.map(() => `<g class="ex-node"><polyline class="ex-lead" points=""/><circle class="ex-ring" r="0"/><circle class="ex-dot" r="2.5"/></g>`).join("")}
        </svg>
        ${EXPLODE_PARTS.map((x) => `<div class="ex-label"><strong>${esc(x.title)}</strong><span>${esc(x.text)}</span></div>`).join("")}
      </div>
    </div>
    <div class="wrap"><p class="meta" style="margin-top:20px">Concept renders. Not photographs of the finished product.</p></div>
  </section>`;

Pages.products = () => `
  <header class="page-head"><div class="wrap">
    <span class="label">Products</span>
    <h1 class="display">Three routines, worn through the day.</h1>
    <p class="lead">Each MATORI patch is designed for a moment: evening, daytime or every day. All three are in development.</p>
  </div></header>
  <section class="section--tight"><div class="wrap product-rows">
    ${PRODUCTS.map((p) => `
      <a class="product-row" href="#/products/${p.slug}" style="--cat:${p.cat}">
        <div class="mini stage" aria-hidden="true">${carton(p, { rx: -6, ry: -24 })}</div>
        <div>
          <span class="label" style="display:flex;align-items:center;gap:10px"><span class="hex-dot"></span>${esc(p.category)} <span style="color:var(--ink-faint)">/ ${esc(p.timeOfDay)}</span></span>
          <h2 class="h2" style="margin:12px 0 14px">${esc(p.name)}</h2>
          <p class="measure" style="color:var(--ink-soft)">${esc(p.short)}</p>
          <p class="meta">Proposed: ${p.ingredients.map((i) => esc(i.name)).join(", ")}</p>
        </div>
        <span class="btn btn--ghost btn--small">View ${esc(p.name)}</span>
      </a>`).join("")}
  </div></section>
  <section class="section section--alt"><div class="wrap grid-2">
    <h2 class="h2">Pricing, when we launch.</h2>
    <div>
      <p class="lead">Preliminary pricing is $${SITE.pricing.single} for a single carton of 30 and $${SITE.pricing.subscription} per month by subscription.</p>
      <p class="meta">${flag("Preliminary")} Checkout and subscriptions are not available yet.</p>
    </div>
  </div></section>`;

Pages.product = (slug) => {
  const p = productBySlug(slug);
  if (!p) return Pages.notFound();
  if (p.slug !== slug) { history.replaceState(null, "", "#/products/" + p.slug); }
  const others = PRODUCTS.filter((x) => x.slug !== p.slug);
  return `
  <div class="wrap" style="--cat:${p.cat}">
    <nav class="breadcrumb" aria-label="Breadcrumb" style="padding-top:28px"><a href="#/products">Products</a> / ${esc(p.name)}</nav>
    <section class="pdp-hero">
      <div class="pdp-visual">
        <div class="niche" style="aspect-ratio:auto">
          <div class="niche-scene stage pdp-stage" id="pdp-stage" tabindex="0" role="group" aria-label="${esc(p.name)} carton, drag or use arrow keys to rotate" style="touch-action:pan-y;cursor:grab">
            ${carton(p, { rx: -8, ry: -26, id: "pdp-carton" })}
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:14px;flex-wrap:wrap">
          ${renderNote()}
          <button type="button" class="icon-btn" id="pdp-reset">Reset view</button>
        </div>
      </div>
      <div>
        <span class="label" style="display:flex;align-items:center;gap:10px"><span class="hex-dot"></span>${esc(p.category)}</span>
        <h1 class="display" style="font-size:clamp(2.75rem,1.8rem + 3.4vw,4.75rem);margin:16px 0 20px">${esc(p.name)}</h1>
        <p class="lead">${esc(p.short)}</p>
        <div class="price-block">
          <div><div class="amt">$${SITE.pricing.single}</div><div class="meta">Single carton, 30 wearables</div></div>
          <div><div class="amt">$${SITE.pricing.subscription}<small> / month</small></div><div class="meta">Subscription</div></div>
        </div>
        <p class="meta" style="margin-bottom:22px">${flag("Preliminary pricing")} Not yet available to purchase.</p>
        <div class="btn-row">
          <button type="button" class="btn" disabled aria-disabled="true">Checkout not yet available</button>
          <a class="btn btn--ghost" href="#/assessment">Find your routine</a>
        </div>
      </div>
    </section>

    <div class="pdp-sections">
      <nav class="pdp-toc" aria-label="On this page"><ul>
        ${[["purpose", "Purpose"], ["ingredients", "Ingredients"], ["specs", "Specifications"], ["apply", "How to apply"], ["safety", "Safety"], ["evidence", "Evidence"], ["faq", "Questions"]].map(([id, t]) => `<li><a href="#/products/${p.slug}" data-scroll="${id}">${t}</a></li>`).join("")}
      </ul></nav>
      <div>
        <section class="pdp-block" id="purpose"><h2>Purpose</h2><p class="serif-body measure-wide">${esc(p.purpose)}</p></section>

        <section class="pdp-block" id="ingredients">
          <h2>Proposed ingredients ${flag("Doses to be confirmed")}</h2>
          <div class="data-table-wrap"><table class="data-table">
            <thead><tr><th scope="col">Ingredient</th><th scope="col">What it is</th><th scope="col">Dose</th></tr></thead>
            <tbody>${p.ingredients.map((i) => `<tr><td>${esc(i.name)}</td><td>${esc(i.role)}</td><td class="num">${i.dose ? esc(i.dose) : "TBC"}</td></tr>`).join("")}</tbody>
          </table></div>
          <p class="meta" style="margin-top:14px">Proposed formulation. Feasibility of each ingredient in the finished patch is still being evaluated.</p>
        </section>

        <section class="pdp-block" id="specs">
          <h2>Specifications</h2>
          <div class="data-table-wrap"><table class="data-table">
            <tbody>
              <tr><th scope="row">Best used</th><td>${esc(p.timeOfDay)}</td><td>${statusFlag("proposed")}</td></tr>
              ${SPECS.map((s) => `<tr><th scope="row">${esc(s.k)}</th><td>${s.v ? esc(s.v) : "To be confirmed"}</td><td>${statusFlag(s.status)}</td></tr>`).join("")}
            </tbody>
          </table></div>
        </section>

        <section class="pdp-block" id="apply">
          <h2>How to apply ${flag("Draft")}</h2>
          <ol class="steps">
            <li><div><strong>Choose a spot.</strong> Clean, dry, intact skin. Recommended placement will be confirmed through testing.</div></li>
            <li><div><strong>Open one pouch.</strong> Tear at the notch and remove the patch.</div></li>
            <li><div><strong>Peel and press.</strong> Remove the two-part liner, press firmly and hold for a few seconds.</div></li>
            <li><div><strong>Wear, then remove.</strong> Wear duration to be confirmed. Peel off gently and discard.</div></li>
          </ol>
        </section>

        <section class="pdp-block" id="safety">
          <h2>Safety ${flag("Under review")}</h2>
          ${p.considerations.map((c) => `<div class="note-box"><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></div>`).join("")}
          <div class="note-box"><h3>General</h3><p>Do not apply to irritated or broken skin. Remove if irritation occurs. Speak with a healthcare professional before use if you are pregnant, breastfeeding, taking medication or have a medical condition. Final warnings will be set after product-specific safety and regulatory review.</p></div>
        </section>

        <section class="pdp-block" id="evidence">
          <h2>Evidence ${flag("Pending finished-product data")}</h2>
          <p class="measure-wide" style="color:var(--ink-soft)">Evidence for this product will be listed here in two parts: general research on the ingredients, and testing of the finished MATORI patch, including release and adhesion data. Neither has been published yet.</p>
          <a class="text-link" href="#/science">How MATORI approaches evidence</a>
        </section>

        <section class="pdp-block" id="faq">
          <h2>Questions</h2>
          ${FAQ[1].items.slice(0, 3).map(qa).join("")}
          <p style="margin-top:20px"><a class="text-link" href="#/faq">All questions</a></p>
        </section>
      </div>
    </div>
  </div>

  <section class="section section--alt" style="margin-top:var(--section)">
    <div class="wrap">
      <h2 class="h2">Also in the system</h2>
      <div class="cat-grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">${others.map(productCard).join("")}</div>
    </div>
  </section>`;
};

const qa = (item) => `<details class="qa"><summary>${esc(item.q)}</summary><div class="ans"><p>${esc(item.a)}</p></div></details>`;

Pages.science = () => {
  const sections = [
    ["what", "What transdermal delivery is"],
    ["barrier", "Skin as a barrier"],
    ["oral", "How it differs from oral supplements"],
    ["properties", "Why ingredient properties matter"],
    ["ingredients", "The proposed ingredients"],
    ["finished", "Evidence for the finished patch"],
    ["quality", "Quality and safety"],
    ["wear", "Wear, adhesion and skin"],
    ["refs", "References"]
  ];
  return `
  <header class="page-head"><div class="wrap">
    <span class="label">The Science</span>
    <h1 class="display">Form follows function.</h1>
    <p class="lead">How delivery through the skin works, what it depends on, and what we can and cannot say yet about MATORI patches.</p>
    <div class="evidence-key">${flag("General science", "info")} ${flag("MATORI product evidence: pending")}</div>
  </div></header>
  <div class="wrap sci-layout">
    <nav class="pdp-toc" aria-label="On this page" style="padding-top:48px"><ul>
      ${sections.map(([id, t]) => `<li><a href="#/science" data-scroll="${id}">${t}</a></li>`).join("")}
    </ul></nav>
    <div>
      <section class="sci-block" id="what"><h2>What transdermal delivery is</h2>
        <p>Transdermal delivery means a compound passes through the skin and into the body, rather than being swallowed. Patches have been used for decades for a small number of well-characterised medicines, such as nicotine and certain hormones.</p>
        <p>That track record shows the format can work for the right molecule in the right formulation. It does not mean every ingredient can be delivered this way.</p>
        ${flag("General science", "info")}
      </section>
      <section class="sci-block" id="barrier"><h2>Skin as a barrier</h2>
        <p>Skin's main job is protection. Its outermost layer, the stratum corneum, is a tightly packed arrangement of cells and lipids that limits what passes through.</p>
        <div class="layers" role="list">
          <div role="listitem"><strong>Stratum corneum</strong><span>The main barrier. Most compounds struggle to cross it.</span></div>
          <div role="listitem"><strong>Viable epidermis</strong><span>Living cell layers beneath the surface.</span></div>
          <div role="listitem"><strong>Dermis</strong><span>Contains the small blood vessels through which absorbed compounds can enter circulation.</span></div>
        </div>
        ${flag("General science", "info")}
      </section>
      <section class="sci-block" id="oral"><h2>How it differs from oral supplements</h2>
        <p>Swallowed supplements pass through the digestive system and liver before reaching circulation, and absorption varies by nutrient and person. A patch avoids that route, which can change how and when a compound arrives.</p>
        <p>Avoiding digestion is not automatically better. Many nutrients are absorbed well by mouth, and the skin admits far less than the gut for most compounds. The right format depends on the ingredient.</p>
        ${flag("General science", "info")}
      </section>
      <section class="sci-block" id="properties"><h2>Why ingredient properties matter</h2>
        <p>Compounds that pass through skin passively tend to be small, often cited as under about 500 daltons, and to dissolve reasonably well in both oil and water. Larger or very water-loving molecules usually need formulation help, and some may not be practical at all.</p>
        <p>Dose matters too. A patch can only hold and release a limited amount, so ingredients needed in large quantities are harder to deliver this way.</p>
        ${flag("General science", "info")}
      </section>
      <section class="sci-block" id="ingredients"><h2>The proposed ingredients</h2>
        <p>Molecular size is one useful signal, not a verdict. This table is general reference only and says nothing yet about MATORI's finished patches.</p>
        <div class="data-table-wrap"><table class="data-table">
          <thead><tr><th scope="col">Ingredient</th><th scope="col">Approx. molecular weight</th><th scope="col">General note</th></tr></thead>
          <tbody>${INGREDIENT_SCIENCE.map((i) => `<tr><td>${esc(i.name)}</td><td class="num">${i.mw.toLocaleString()} g/mol</td><td>${esc(i.note)}</td></tr>`).join("")}</tbody>
        </table></div>
        <p class="meta" style="margin-top:12px">${flag("General science", "info")} References to be added after review.</p>
      </section>
      <section class="sci-block" id="finished"><h2>Evidence for the finished patch</h2>
        <p>Claims about a MATORI product will rest on testing of that product: how much of each ingredient is released, over what period, and how well the patch stays on. That work has not been completed, so we make no product-specific absorption or duration claims.</p>
        ${flag("MATORI product evidence: pending")}
      </section>
      <section class="sci-block" id="quality"><h2>Quality and safety</h2>
        <p>Before launch, each product will be reviewed for ingredient quality, finished-product testing, skin compatibility and safety, including interactions for ingredients such as melatonin, 5-HTP, caffeine and vitamin K. Manufacturing and testing partners will be named here once confirmed.</p>
        ${flag("To be confirmed")}
      </section>
      <section class="sci-block" id="wear"><h2>Wear, adhesion and skin</h2>
        <p>Wear time, water resistance and placement depend on the adhesive and the patch design, and will be confirmed through testing. As with any skin patch, apply to clean, intact skin and remove it if irritation occurs.</p>
        <a class="text-link" href="#/faq">Common questions</a>
      </section>
      <section class="sci-block" id="refs"><h2>References</h2>
        <p>A reviewed reference list will be published here, separated into general literature and MATORI product data.</p>
        ${flag("To be added")}
      </section>
    </div>
  </div>`;
};

Pages.ourStory = () => `
  <header class="page-head"><div class="wrap">
    <span class="label">Our Story</span>
    <h1 class="display">Built around a better way to approach wellness.</h1>
    <p class="lead">MATORI started with a simple question: could everyday wellness be easier to keep up and more honest about how it works? Transdermal delivery offered a different format, and a reason to design the whole experience with care.</p>
  </div></header>
  <section class="section"><div class="wrap">
    <div class="grid-2" style="align-items:end">
      <h2 class="h2">The founding partners</h2>
      <p class="meta dev-only">${flag("Placeholder profiles")} Names, roles, biographies and headshots will be added from each partner's questionnaire.</p>
    </div>
    ${SITE.publicMode && !FOUNDERS.some((f) => f.name)
      ? `<p class="lead measure" style="margin-top:32px">Founder profiles are on their way. In the meantime, <a href="#/collaborate">get in touch</a>.</p>`
      : `<div class="founder-grid">${FOUNDERS.map(founderCard).join("")}</div>`}
  </div></section>
  <section class="section section--alt"><div class="wrap grid-2">
    <h2 class="h2">A shared vision</h2>
    <div class="serif-body measure">
      <p>We want to build a wellness brand that earns trust slowly: products that are pleasant to use, design that respects the person using it, and science described plainly, including its limits.</p>
      <p class="meta dev-only">${flag("Draft")} Shared founding story and mission to be written with the partners.</p>
    </div>
  </div></section>
  <section class="section final-cta"><div class="wrap">
    ${ICON.mark("final-mark")}
    <h2 class="h2">See what we're making.</h2>
    <div class="btn-row"><a class="btn" href="#/products">Explore MATORI</a><a class="btn btn--ghost" href="#/collaborate">Get in touch</a></div>
  </div></section>`;

Pages.collaborate = () => `
  <header class="page-head"><div class="wrap">
    <span class="label">Collaborate</span>
    <h1 class="display">Collaborate with MATORI</h1>
    <p class="lead">Good things happen when the right people connect. MATORI is building a considered approach to modern wellness. We're interested in connecting with people and organisations who share our commitment to thoughtful design, credible science, and intentional performance.</p>
  </div></header>
  <section class="section"><div class="wrap">
    <div class="pathways">
      <article class="pathway">${ICON.hex("hex-icon")}
        <h2 class="h3">Creator and community</h2>
        <p>For athletes, wellness creators, fitness personalities and community leaders whose audiences align with MATORI.</p>
        <ul><li>Product experiences</li><li>Educational content</li><li>Organic collaborations</li></ul>
      </article>
      <article class="pathway">${ICON.hex("hex-icon")}
        <h2 class="h3">Studio and practitioner</h2>
        <p>For boutique fitness and Pilates studios, recovery facilities, wellness practitioners and similar organisations.</p>
        <ul><li>Studio retail and sampling</li><li>Wholesale conversations</li><li>Shared experiences</li></ul>
      </article>
      <article class="pathway">${ICON.hex("hex-icon")}
        <h2 class="h3">Strategic partnerships</h2>
        <p>For brands, researchers, formulation experts, manufacturers and others who can contribute to MATORI's development.</p>
        <ul><li>Research and formulation</li><li>Manufacturing and testing</li><li>Brand partnerships</li></ul>
      </article>
    </div>
    <p class="meta" style="margin-top:24px">These are areas we're open to exploring. Submitting an inquiry does not create an agreement, compensation, free product or ambassador status.</p>
  </div></section>
  <section class="section section--alt" id="inquiry"><div class="wrap">
    <h2 class="h2">Start a conversation</h2>
    <p class="lead measure" style="margin-top:16px">Tell us a little about you and what you have in mind.</p>
    ${inquiryForm()}
  </div></section>`;

function inquiryForm() {
  const f = (id, label, input, opts = {}) => `
    <div class="field" data-field="${id}">
      <label for="${id}">${label}${opts.optional ? ' <span class="opt">(optional)</span>' : ""}</label>
      ${input}
      ${opts.hint ? `<p class="hint" id="${id}-hint">${opts.hint}</p>` : ""}
      <p class="err" id="${id}-err"></p>
    </div>`;
  return `
    <form class="form" id="inquiry-form" novalidate>
      <div class="form-row">
        ${f("name", "Name", `<input id="name" name="name" autocomplete="name" required aria-describedby="name-err">`)}
        ${f("email", "Email", `<input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-err">`)}
      </div>
      <fieldset class="field" data-field="type">
        <legend>Partnership type</legend>
        <div class="radio-set">
          <label><input type="radio" name="type" value="creator" required> Creator and community</label>
          <label><input type="radio" name="type" value="studio"> Studio and practitioner</label>
          <label><input type="radio" name="type" value="strategic"> Strategic partnership</label>
        </div>
        <p class="err" id="type-err"></p>
      </fieldset>
      <div class="form-row">
        ${f("org", "Organisation or social profile", `<input id="org" name="org" required aria-describedby="org-err">`)}
        ${f("link", "Website or social link", `<input id="link" name="link" type="url" inputmode="url" placeholder="https://" aria-describedby="link-hint link-err">`, { optional: true, hint: "Include https://" })}
      </div>
      ${f("audience", "Your audience or community", `<textarea id="audience" name="audience" required aria-describedby="audience-hint audience-err"></textarea>`, { hint: "Who you work with or speak to, and roughly how many." })}
      ${f("proposal", "What you have in mind", `<textarea id="proposal" name="proposal" required aria-describedby="proposal-err"></textarea>`)}
      ${f("context", "Anything else", `<textarea id="context" name="context" style="min-height:96px"></textarea>`, { optional: true })}
      <div><button type="submit" class="btn">Send inquiry</button></div>
      ${formNote()}
    </form>
    <div class="form-status" id="form-status" hidden tabindex="-1">
      <h3 class="h3" style="margin-bottom:10px" id="form-status-title">Inquiry ready</h3>
      <p id="form-status-text">Everything checks out. This form is not connected to an inbox yet, so <strong>your inquiry has not been sent</strong> and nothing was stored.</p>
      <button type="button" class="btn btn--ghost btn--small" id="form-reset">Start a new inquiry</button>
    </div>`;
}

Pages.assessment = () => `
  <header class="page-head"><div class="wrap">
    <span class="label">Find your routine</span>
    <h1 class="display">Where would you like to start?</h1>
    <p class="lead">Choose the goal closest to yours for a suggested next step. This is a starting point for learning, not a health assessment.</p>
  </div></header>
  <section class="section--tight"><div class="wrap">
    <div class="goal-grid" role="radiogroup" aria-label="Wellness goal">
      ${GOALS.map((g, i) => {
        const p = productBySlug(g.product);
        return `<button type="button" class="goal" role="radio" aria-checked="false" tabindex="${i === 0 ? 0 : -1}" data-goal="${g.id}" style="--cat:${p.cat}">
          <span class="hex-dot" aria-hidden="true"></span><strong>${esc(g.title)}</strong><span>${esc(g.blurb)}</span>
        </button>`;
      }).join("")}
    </div>
    <div class="result" id="goal-result" hidden aria-live="polite"></div>
    <p class="meta" style="margin-top:28px">Your choice stays on this page and is not saved. MATORI cannot diagnose deficiencies or recommend treatment. A fuller routine assessment is planned for a later version.</p>
  </div></section>`;

function goalResult(g) {
  const p = productBySlug(g.product);
  return `
    <span class="label" style="display:flex;align-items:center;gap:10px;--cat:${p.cat}"><span class="hex-dot"></span>${esc(g.title)}</span>
    <h2 class="h3">A good next step</h2>
    <p class="measure-wide" style="color:var(--ink-soft)">${esc(g.next)}</p>
    <div class="btn-row" style="margin-top:20px">
      <a class="btn" href="#/products/${p.slug}">Read about ${esc(p.name)}</a>
      <a class="btn btn--ghost" href="#/science">${esc(g.read)}</a>
    </div>`;
}

Pages.faq = () => `
  <header class="page-head"><div class="wrap">
    <span class="label">FAQ</span>
    <h1 class="display">Questions, answered plainly.</h1>
    <p class="lead">Where something hasn't been confirmed yet, we say so.</p>
  </div></header>
  <section class="section--tight"><div class="wrap measure-wide" style="margin-left:0">
    ${FAQ.map((g) => `<div class="faq-group"><h2>${esc(g.group)}</h2>${g.items.map(qa).join("")}</div>`).join("")}
  </div></section>
  <section class="section section--alt"><div class="wrap grid-2">
    <h2 class="h2">Still curious?</h2>
    <div><p class="lead">The science page goes deeper on how delivery through the skin works.</p><a class="btn btn--ghost" href="#/science">Read the science</a></div>
  </div></section>`;

Pages.legal = (kind) => `
  <header class="page-head"><div class="wrap">
    <span class="label">${kind === "privacy" ? "Privacy" : "Terms"}</span>
    <h1 class="display">${kind === "privacy" ? "Privacy policy" : "Terms of use"}</h1>
    <p class="lead">${SITE.publicMode ? "A full version of this page is being prepared." : flag("Placeholder") + " This page must be written and reviewed before launch."}</p>
  </div></header>
  <section class="section--tight"><div class="wrap measure-wide" style="margin-left:0">
    <p>${kind === "privacy" ? (SITE.formEndpoint || SITE.contactEmail ? "This site does not use analytics or advertising cookies. Information you send through the collaboration form is used only to respond to your inquiry. A full privacy policy will be published before any products are sold." : "This site does not collect, store or transmit personal information. A full privacy policy will be published before any products are sold.") : "Terms of use, shipping, returns and subscription terms will be published before launch."}</p>
  </div></section>`;

Pages.notFound = () => `
  <header class="page-head"><div class="wrap">
    <span class="label">Not found</span>
    <h1 class="display">This page doesn't exist.</h1>
    <p class="lead">The link may be out of date. Head back to the homepage or browse the products.</p>
    <div class="btn-row" style="margin-top:28px"><a class="btn" href="#/">Go to homepage</a><a class="btn btn--ghost" href="#/products">View products</a></div>
  </div></header>`;

/* ---------- ROUTER ---------- */
const ROUTES = [
  { re: /^\/?$/, page: () => Pages.home(), title: "MATORI | Wear your wellness", nav: "" },
  { re: /^\/products\/?$/, page: () => Pages.products(), title: "Products | MATORI", nav: "products" },
  { re: /^\/products\/([\w-]+)\/?$/, page: (m) => Pages.product(m[1]), title: (m) => `${productBySlug(m[1])?.name || "Not found"} | MATORI`, nav: "products" },
  { re: /^\/science\/?$/, page: () => Pages.science(), title: "The Science | MATORI", nav: "science" },
  { re: /^\/our-story\/?$/, page: () => Pages.ourStory(), title: "Our Story | MATORI", nav: "our-story" },
  { re: /^\/collaborate\/?$/, page: () => Pages.collaborate(), title: "Collaborate with MATORI", nav: "collaborate" },
  { re: /^\/assessment\/?$/, page: () => Pages.assessment(), title: "Find Your Routine | MATORI", nav: "assessment" },
  { re: /^\/faq\/?$/, page: () => Pages.faq(), title: "FAQ | MATORI", nav: "faq" },
  { re: /^\/lab\/?$/, page: () => Pages.lab(), title: "Lab | MATORI", nav: "" },
  { re: /^\/(privacy|terms)\/?$/, page: (m) => Pages.legal(m[1]), title: (m) => `${m[1] === "privacy" ? "Privacy" : "Terms"} | MATORI`, nav: "" }
];

let cleanup = [];
let firstRender = true;

function router() {
  const path = (location.hash.replace(/^#/, "") || "/").split("?")[0];
  const main = document.getElementById("main");
  let html = Pages.notFound(), title = "Not found | MATORI", nav = "", matched = null;
  for (const r of ROUTES) {
    const m = path.match(r.re);
    if (m) { matched = r; html = r.page(m); title = typeof r.title === "function" ? r.title(m) : r.title; nav = r.nav; break; }
  }
  cleanup.forEach((fn) => fn()); cleanup = [];
  main.innerHTML = html;
  main.classList.remove("route-enter"); void main.offsetWidth; main.classList.add("route-enter");
  document.title = title;
  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.dataset.nav === nav && nav) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  if (!firstRender) {
    window.scrollTo(0, 0);
    const h1 = main.querySelector("h1");
    if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
  }
  firstRender = false;
  closeMenu(false);
  mountPage();
}

function mountPage() {
  const la = document.getElementById("lab-a");
  if (la) cleanup.push(mountCallouts(la));
  const lb = document.getElementById("lab-b");
  if (lb) cleanup.push(mountExploded(lb));
  const ub = document.getElementById("unbox");
  if (ub) cleanup.push(mountUnbox(ub));
  const pdp = document.getElementById("pdp-stage");
  if (pdp) { const r = mountRotatable(pdp, document.getElementById("pdp-carton"), { rx: -8, ry: -26 }, document.getElementById("pdp-reset")); cleanup.push(() => r.destroy()); }
  const heroP = document.getElementById("hero-products");
  if (heroP) { cleanup.push(mountParallax(heroP.closest(".hero-scene"), heroP)); cleanup.push(mountScrollDepth(heroP.closest(".hero-scene"))); }
  const form = document.getElementById("inquiry-form");
  if (form) mountForm(form);
  if (document.querySelector("[data-goal]")) mountGoals();
  document.querySelectorAll("[data-scroll]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    const t = document.getElementById(a.dataset.scroll);
    if (t) { t.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" }); t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true }); }
  }));
}

/* ---------- Drag / keyboard rotation (shared) ---------- */
function mountRotatable(surface, cartonEl, base, resetBtn, onChange) {
  let rx = base.rx, ry = base.ry, startX = 0, startY = 0, sx = 0, sy = 0, dragging = false, pid = null, moved = false;
  const apply = () => { cartonEl.style.setProperty("--rx", rx + "deg"); cartonEl.style.setProperty("--ry", ry + "deg"); };
  const clampX = (v) => Math.max(-60, Math.min(20, v));
  const down = (e) => {
    if (e.target.closest("button")) return;
    dragging = true; moved = false; pid = e.pointerId;
    startX = e.clientX; startY = e.clientY; sx = rx; sy = ry;
    surface.setPointerCapture?.(pid);
  };
  const move = (e) => {
    if (!dragging || e.pointerId !== pid) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    if (!moved && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
    if (!moved) { moved = true; cartonEl.classList.add("is-dragging"); surface.classList.add("is-dragging"); }
    ry = sy + dx * 0.45; rx = clampX(sx - dy * 0.3); apply(); onChange?.("drag");
  };
  const up = (e) => {
    if (!dragging || e.pointerId !== pid) return;
    dragging = false; cartonEl.classList.remove("is-dragging"); surface.classList.remove("is-dragging");
    surface.releasePointerCapture?.(pid);
  };
  const key = (e) => {
    if (e.target !== surface) return;
    const step = e.shiftKey ? 30 : 10;
    if (e.key === "ArrowLeft") ry -= step; else if (e.key === "ArrowRight") ry += step;
    else if (e.key === "ArrowUp") rx = clampX(rx - step); else if (e.key === "ArrowDown") rx = clampX(rx + step);
    else return;
    e.preventDefault(); apply(); onChange?.("key");
  };
  const reset = () => { rx = base.rx; ry = base.ry; apply(); };
  surface.addEventListener("pointerdown", down);
  surface.addEventListener("pointermove", move);
  surface.addEventListener("pointerup", up);
  surface.addEventListener("pointercancel", up);
  surface.addEventListener("keydown", key);
  resetBtn?.addEventListener("click", reset);
  apply();
  return {
    setBase(b) { base = b; reset(); },
    destroy() {
      surface.removeEventListener("pointerdown", down); surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerup", up); surface.removeEventListener("pointercancel", up);
      surface.removeEventListener("keydown", key); resetBtn?.removeEventListener("click", reset);
    }
  };
}

/* ---------- Lab helpers ---------- */
const ease = (t) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
const lerp = (a, b, t) => a + (b - a) * t;
function anchorPoint(stage, id) {
  const el = stage.querySelector(`[data-anchor="${id}"]`);
  if (!el) return null;
  const s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2 - s.left, y: r.top + r.height / 2 - s.top };
}
function whileVisible(el, frame) {
  let raf = 0, on = false;
  const loop = (now) => { frame(now); if (on) raf = requestAnimationFrame(loop); };
  const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; cancelAnimationFrame(raf); if (on) raf = requestAnimationFrame(loop); });
  io.observe(el);
  return () => { on = false; io.disconnect(); cancelAnimationFrame(raf); };
}

/* Model A: focus and pull */
function mountCallouts(root) {
  const stage = root.querySelector(".lab-stage"), cartonEl = document.getElementById("lab-a-carton");
  const card = document.getElementById("lab-a-card"), line = root.querySelector(".cl-line");
  const ring1 = root.querySelector(".cl-ring1"), ring2 = root.querySelector(".cl-ring2"), dot = root.querySelector(".cl-dot");
  const ticks = [...root.querySelectorAll(".cl-ticks line")], btns = [...root.querySelectorAll("[data-callout]")];
  const tourBtn = document.getElementById("lab-a-tour");
  const instant = reduceMotion();
  const rot = mountRotatable(stage, cartonEl, CALLOUTS[0].pose, null);
  let idx = 0, t0 = 0, tour = 0;

  const select = (i, fromUser = true) => {
    idx = i; const c = CALLOUTS[i];
    rot.setBase({ rx: c.pose.rx, ry: c.pose.ry });
    cartonEl.style.setProperty("--slide", `calc(var(--h) * ${c.pose.slide})`);
    card.querySelector(".label").textContent = `${String(i + 1).padStart(2, "0")} / ${String(CALLOUTS.length).padStart(2, "0")}`;
    card.querySelector("h3").textContent = c.title; card.querySelector("p:last-child").textContent = c.text;
    btns.forEach((b, j) => b.toggleAttribute("aria-current", j === i));
    root.querySelectorAll(".anchor-dot").forEach((d) => d.classList.toggle("is-active", d.dataset.pick === c.id));
    t0 = performance.now() + (instant ? -2000 : 450);   // wait for the turn, then pull
    if (fromUser) stopTour();
  };
  const stopTour = () => { clearInterval(tour); tour = 0; tourBtn.textContent = "Play tour"; };
  const startTour = () => { tourBtn.textContent = "Stop tour"; tour = setInterval(() => select((idx + 1) % CALLOUTS.length, false), 3400); };

  const frame = (now) => {
    const a = anchorPoint(stage, CALLOUTS[idx].id); if (!a) return;
    const W = stage.clientWidth, H = stage.clientHeight, cw = card.offsetWidth, ch = card.offsetHeight;
    const tRing = ease((now - t0 + 250) / 450), tPull = ease((now - t0) / 700);
    const dir = a.x >= W / 2 ? 1 : -1;
    // keep the card inside the arch: clear of the curved top and the edges
    let tx = dir > 0 ? a.x + 120 : a.x - 120 - cw;
    tx = Math.max(28, Math.min(W - cw - 28, tx));
    const ty = Math.max(H * 0.22, Math.min(H - ch - 24, a.y - ch / 2 - 30));
    const docked = W < 560;   // narrow screens: the card docks under the carton instead of beside it
    const fx = docked ? (W - cw) / 2 : tx, fy = docked ? H - ch - 18 : ty;
    const cx = lerp(a.x - cw / 2, fx, tPull), cy = lerp(a.y - ch / 2, fy, tPull);
    card.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px) scale(${(0.8 + 0.2 * tPull).toFixed(3)})`;
    card.style.opacity = tPull.toFixed(3);
    const attachX = docked ? cx + cw / 2 : dir > 0 ? cx : cx + cw, attachY = docked ? cy : cy + 26;
    const ex = docked ? lerp(a.x, a.x + dir * 30, tPull) : lerp(a.x, a.x + dir * 54, tPull);
    const ey = docked ? lerp(a.y, attachY - 24, tPull) : lerp(a.y, attachY, tPull);
    line.setAttribute("points", `${a.x.toFixed(1)},${a.y.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)} ${attachX.toFixed(1)},${attachY.toFixed(1)}`);
    line.style.opacity = tPull > 0.02 ? 1 : 0;
    [ring1, ring2, dot].forEach((c) => { c.setAttribute("cx", a.x.toFixed(1)); c.setAttribute("cy", a.y.toFixed(1)); });
    ring1.setAttribute("r", (13 * tRing).toFixed(2)); ring2.setAttribute("r", (24 * tRing).toFixed(2));
    ring2.style.opacity = tRing * 0.8; dot.style.opacity = tRing;
    ticks.forEach((l, k) => {
      const ang = (Math.PI / 2) * k + Math.PI / 4 + (1 - tRing) * 0.6, r0 = 28 * tRing, r1 = 34 * tRing;
      l.setAttribute("x1", (a.x + r0 * Math.cos(ang)).toFixed(1)); l.setAttribute("y1", (a.y + r0 * Math.sin(ang)).toFixed(1));
      l.setAttribute("x2", (a.x + r1 * Math.cos(ang)).toFixed(1)); l.setAttribute("y2", (a.y + r1 * Math.sin(ang)).toFixed(1));
    });
  };

  const onClick = (e) => {
    const b = e.target.closest("[data-callout]"); if (b) return select(+b.dataset.callout);
    const d = e.target.closest("[data-pick]"); if (d) return select(CALLOUTS.findIndex((c) => c.id === d.dataset.pick));
    if (e.target.closest("#lab-a-tour")) { if (tour) stopTour(); else startTour(); }
  };
  root.addEventListener("click", onClick);
  select(0, false);
  const stop = whileVisible(stage, frame);
  return () => { stop(); stopTour(); rot.destroy(); root.removeEventListener("click", onClick); };
}

/* Model B: exploded view along the depth axis */
function mountExploded(root) {
  const stage = root.querySelector(".lab-stage"), cartonEl = document.getElementById("lab-b-carton");
  const range = document.getElementById("lab-b-range"), play = document.getElementById("lab-b-play");
  const axis = root.querySelector(".ex-axis"), nodes = [...root.querySelectorAll(".ex-node")], labels = [...root.querySelectorAll(".ex-label")];
  const rot = mountRotatable(stage, cartonEl, { rx: -14, ry: -52 }, null);
  let e = 0, anim = 0;
  const apply = () => {
    const st = cartonEl.style;
    st.setProperty("--tz", `calc(var(--u) * ${(135 * e).toFixed(1)})`);
    st.setProperty("--slide", `calc(var(--h) * ${(-0.16 * e).toFixed(4)})`);
    st.setProperty("--sz", `calc(var(--u) * ${(115 * e).toFixed(1)})`);
    st.setProperty("--sy", `calc(var(--h) * ${(-0.1 * e).toFixed(4)})`);
    st.setProperty("--pz", `calc(var(--u) * ${(105 * e).toFixed(1)})`);
    st.setProperty("--py", `calc(var(--u) * ${(-40 * e).toFixed(1)})`);
    root.style.setProperty("--e", e.toFixed(3));
  };
  const frame = () => {
    const W = stage.clientWidth, pts = EXPLODE_PARTS.map((x) => anchorPoint(stage, x.id));
    if (pts.some((p) => !p)) return;
    const show = ease((e - 0.35) / 0.45);
    axis.setAttribute("points", pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" "));
    axis.style.opacity = Math.min(1, e * 2) * 0.9;
    const order = pts.map((p, i) => [p, i]).sort((a, b) => a[0].y - b[0].y);
    const colX = W - (W < 700 ? 148 : 262);
    order.forEach(([p, i], rank) => {
      const g = nodes[i], lab = labels[i];
      const H = stage.clientHeight, ly = H * 0.24 + rank * ((H * 0.62) / Math.max(1, order.length - 1));
      const lx = lerp(p.x, colX, show);
      g.querySelector(".ex-lead").setAttribute("points", `${p.x.toFixed(1)},${p.y.toFixed(1)} ${lerp(p.x, colX - 40, show).toFixed(1)},${lerp(p.y, ly, show).toFixed(1)} ${(lx - 8).toFixed(1)},${lerp(p.y, ly, show).toFixed(1)}`);
      g.querySelector(".ex-lead").style.opacity = show;
      const ring = g.querySelector(".ex-ring"), dt = g.querySelector(".ex-dot");
      [ring, dt].forEach((c) => { c.setAttribute("cx", p.x.toFixed(1)); c.setAttribute("cy", p.y.toFixed(1)); });
      ring.setAttribute("r", (4 + 10 * e).toFixed(1)); ring.style.opacity = Math.min(1, e * 2) * 0.8; dt.style.opacity = Math.min(1, e * 3);
      lab.style.transform = `translate(${lx.toFixed(1)}px, ${(lerp(p.y, ly, show) - 14).toFixed(1)}px)`;
      lab.style.opacity = show;
    });
  };
  const onRange = () => { cancelAnimationFrame(anim); e = range.value / 100; apply(); };
  const onPlay = () => {
    cancelAnimationFrame(anim);
    const from = e, to = e > 0.5 ? 0 : 1, t0 = performance.now(), dur = reduceMotion() ? 1 : 1500;
    const step = (now) => { const t = ease((now - t0) / dur); e = lerp(from, to, t); range.value = Math.round(e * 100); apply(); if (t < 1) anim = requestAnimationFrame(step); };
    anim = requestAnimationFrame(step);
    play.textContent = to ? "Collapse" : "Play";
  };
  range.addEventListener("input", onRange); play.addEventListener("click", onPlay);
  apply();
  const stop = whileVisible(stage, frame);
  return () => { stop(); cancelAnimationFrame(anim); rot.destroy(); range.removeEventListener("input", onRange); play.removeEventListener("click", onPlay); };
}

/* ---------- Scroll-driven unboxing ----------
   Progress (0 to 1) comes from how far the tall section has scrolled past
   the viewport. Every visual value is read from UNBOX_TIMELINE in data.js. */
const smooth = (t) => t * t * (3 - 2 * t);
function sampleTrack(keys, p) {
  if (p <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [p1, v1] = keys[i];
    if (p <= p1) { const [p0, v0] = keys[i - 1]; return v0 + (v1 - v0) * smooth((p - p0) / (p1 - p0 || 1)); }
  }
  return keys[keys.length - 1][1];
}

function mountUnbox(section) {
  const cartonEl = document.getElementById("unbox-carton");
  const rig = section.querySelector(".unbox-rig");
  const stage = document.getElementById("unbox-stage");
  const panels = [...section.querySelectorAll(".unbox-panel")];
  const rail = [...section.querySelectorAll("[data-goto]")];
  const hint = document.getElementById("unbox-hint");
  const staticMode = reduceMotion();
  section.classList.toggle("is-static", staticMode);

  let p = 0, spin = 0, raf = 0, activeStep = -1;
  const T = UNBOX_TIMELINE, v = (k) => sampleTrack(T[k], p);

  const render = () => {
    const ry = v("ry") + spin, rx = v("rx"), face = v("face");
    const st = cartonEl.style;
    st.setProperty("--ry", ry.toFixed(2) + "deg");
    st.setProperty("--rx", rx.toFixed(2) + "deg");
    st.setProperty("--slide", `calc(var(--h) * ${v("slide").toFixed(4)})`);
    st.setProperty("--sy", `calc(var(--h) * ${v("sachetY").toFixed(4)})`);
    st.setProperty("--sz", `calc(var(--u) * ${v("sachetZ").toFixed(1)})`);
    // counter-rotate the sachet so it ends up facing the viewer
    st.setProperty("--sry", (-(ry - spin) * face).toFixed(2) + "deg");
    st.setProperty("--srx", (-rx * face).toFixed(2) + "deg");
    st.setProperty("--boxFade", v("boxFade").toFixed(3));
    st.setProperty("--tear", v("tear").toFixed(3));
    st.setProperty("--py", `calc(var(--u) * ${v("patchY").toFixed(1)})`);
    st.setProperty("--pz", `calc(var(--u) * ${v("patchZ").toFixed(1)})`);
    st.setProperty("--ps", v("patchS").toFixed(3));
    st.setProperty("--pry", v("patchRy").toFixed(1) + "deg");
    st.setProperty("--peel", v("peel").toFixed(3));
    st.setProperty("--sFade", v("sFade").toFixed(3));
    rig.style.transform = `translate3d(0, calc(var(--u) * ${v("rigY").toFixed(1)}), calc(var(--u) * ${v("rigZ").toFixed(1)}))`;
    section.style.setProperty("--p", p.toFixed(4));
    const step = Math.max(0, UNBOX_STEPS.findIndex((s) => p >= s.from && p < s.to));
    if (step !== activeStep) {
      activeStep = step;
      panels.forEach((el, i) => { el.classList.toggle("is-active", i === step); el.toggleAttribute("aria-hidden", i !== step); });
      rail.forEach((b, i) => b.toggleAttribute("aria-current", i === step));
    }
  };
  const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(render); };

  const readScroll = () => {
    if (staticMode) return;
    const r = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    p = Math.min(1, Math.max(0, -r.top / (total || 1)));
    if (p > 0.02) hint.style.opacity = 0;
    schedule();
  };

  const goTo = (i) => {
    const s = UNBOX_STEPS[i], mid = Math.min(0.995, (s.from + Math.min(s.to, 1)) / 2);
    if (staticMode) { p = mid; return schedule(); }
    const total = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY + mid * total;
    window.scrollTo({ top, behavior: "smooth" });
  };
  const onRail = (e) => { const b = e.target.closest("[data-goto]"); if (b) goTo(+b.dataset.goto); };

  // Drag to turn; the carton eases back to the scroll pose on release
  let dragging = false, sx = 0, s0 = 0, pid = null, springRaf = 0;
  const down = (e) => { dragging = true; pid = e.pointerId; sx = e.clientX; s0 = spin; cancelAnimationFrame(springRaf); cartonEl.classList.add("is-dragging"); stage.setPointerCapture?.(pid); };
  const move = (e) => { if (!dragging || e.pointerId !== pid) return; spin = s0 + (e.clientX - sx) * 0.5; hint.style.opacity = 0; schedule(); };
  const spring = () => { spin *= 0.86; if (Math.abs(spin) < 0.3) spin = 0; render(); if (spin) springRaf = requestAnimationFrame(spring); };
  const up = (e) => { if (!dragging || e.pointerId !== pid) return; dragging = false; cartonEl.classList.remove("is-dragging"); stage.releasePointerCapture?.(pid); if (!staticMode) springRaf = requestAnimationFrame(spring); };
  const key = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); spin += e.key === "ArrowLeft" ? -15 : 15; schedule(); }
  };

  stage.addEventListener("pointerdown", down);
  stage.addEventListener("pointermove", move);
  stage.addEventListener("pointerup", up);
  stage.addEventListener("pointercancel", up);
  stage.addEventListener("keydown", key);
  section.addEventListener("click", onRail);
  window.addEventListener("scroll", readScroll, { passive: true });
  window.addEventListener("resize", readScroll);
  readScroll(); render();
  return () => {
    window.removeEventListener("scroll", readScroll); window.removeEventListener("resize", readScroll);
    section.removeEventListener("click", onRail);
    cancelAnimationFrame(raf); cancelAnimationFrame(springRaf);
  };
}

/* ---------- Hero parallax (pointer only, disabled for reduced motion / touch) ---------- */
function mountParallax(niche, scope = niche) {
  if (reduceMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  const stages = [...scope.querySelectorAll("[data-par]")];
  let raf = 0;
  const onMove = (e) => {
    const r = niche.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => stages.forEach((s) => {
      const k = parseFloat(s.dataset.par);
      s.style.setProperty("--mx", (x * 10 * k).toFixed(1) + "px"); s.style.setProperty("--my", (y * 6 * k).toFixed(1) + "px");
    }));
  };
  const onLeave = () => stages.forEach((s) => { s.style.setProperty("--mx", "0px"); s.style.setProperty("--my", "0px"); });
  niche.addEventListener("pointermove", onMove);
  niche.addEventListener("pointerleave", onLeave);
  return () => { niche.removeEventListener("pointermove", onMove); niche.removeEventListener("pointerleave", onLeave); };
}

/* ---------- Scroll depth: layers drift at different rates as you scroll past ---------- */
function mountScrollDepth(scene) {
  if (reduceMotion()) return () => {};
  const layers = [...scene.querySelectorAll("[data-depth]")];
  let raf = 0;
  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const y = Math.min(window.scrollY, scene.offsetHeight);
      layers.forEach((l) => l.style.setProperty("--dy", (-y * parseFloat(l.dataset.depth)).toFixed(1) + "px"));
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
}

/* ---------- Inquiry form ---------- */
/* Delivery, in order of preference:
   1. SITE.formEndpoint: POST JSON (Formspree or any form backend)
   2. SITE.contactEmail: open the visitor's email app with the inquiry filled in
   3. neither: validate only, and say plainly that nothing was sent        */
function formNote() {
  if (SITE.formEndpoint) return "";
  if (SITE.contactEmail) return `<p class="meta">Sending opens your email app with your inquiry ready to go.</p>`;
  return `<p class="meta">This form is not connected to an inbox yet. Inquiries are checked on this page but not sent.</p>`;
}
async function submitInquiry(data) {
  if (SITE.formEndpoint) {
    try {
      const r = await fetch(SITE.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
      return { mode: "endpoint", sent: r.ok };
    } catch { return { mode: "endpoint", sent: false }; }
  }
  if (SITE.contactEmail) {
    const body = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
    location.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Collaboration inquiry: " + (data.org || data.name))}&body=${encodeURIComponent(body)}`;
    return { mode: "email", sent: null };
  }
  return { mode: "none", sent: false };
}

function mountForm(form) {
  const status = document.getElementById("form-status");
  const rules = {
    name: (v) => v.trim() ? "" : "Enter your name.",
    email: (v) => !v.trim() ? "Enter your email address." : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter an email address like name@example.com.",
    org: (v) => v.trim() ? "" : "Enter an organisation or social profile.",
    link: (v) => { if (!v.trim()) return ""; try { const u = new URL(v.trim()); return /^https?:$/.test(u.protocol) ? "" : "Use a link starting with https://"; } catch { return "Enter a full link starting with https://"; } },
    audience: (v) => v.trim().length >= 10 ? "" : "Describe your audience or community in a sentence or two.",
    proposal: (v) => v.trim().length >= 20 ? "" : "Describe the collaboration in at least a couple of sentences."
  };
  const setErr = (name, msg) => {
    const field = form.querySelector(`[data-field="${name}"]`);
    if (!field) return;
    field.dataset.invalid = msg ? "true" : "false";
    const err = field.querySelector(".err"); if (err) err.textContent = msg;
    field.querySelectorAll("input,textarea,select").forEach((el) => el.setAttribute("aria-invalid", msg ? "true" : "false"));
  };
  const validate = (name) => {
    if (name === "type") { const ok = form.querySelector('input[name="type"]:checked'); setErr("type", ok ? "" : "Choose a partnership type."); return !!ok; }
    const el = form.elements[name]; const msg = rules[name](el.value); setErr(name, msg); return !msg;
  };
  Object.keys(rules).forEach((n) => {
    const el = form.elements[n];
    el.addEventListener("blur", () => { if (el.value) validate(n); });
    // clear an error while the person types, so no layout shift happens on blur/submit
    el.addEventListener("input", () => { if (el.closest("[data-field]").dataset.invalid === "true") validate(n); });
  });
  form.addEventListener("change", (e) => { if (e.target.name === "type") validate("type"); });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const names = ["name", "email", "type", "org", "link", "audience", "proposal"];
    const results = names.map((n) => [n, validate(n)]);
    const firstBad = results.find(([, ok]) => !ok);
    if (firstBad) {
      const n = firstBad[0];
      (n === "type" ? form.querySelector('input[name="type"]') : form.elements[n]).focus();
      return;
    }
    const btn = form.querySelector('button[type="submit"]'); btn.disabled = true;
    const res = await submitInquiry(Object.fromEntries(new FormData(form)));
    btn.disabled = false;
    const title = document.getElementById("form-status-title"), text = document.getElementById("form-status-text");
    if (res.mode === "endpoint" && res.sent) { title.textContent = "Inquiry sent"; text.textContent = "Thank you. We've received your inquiry and will be in touch."; }
    else if (res.mode === "endpoint") { title.textContent = "Inquiry not sent"; text.textContent = "Something went wrong sending your inquiry. Please try again in a moment" + (SITE.contactEmail ? ` or email ${SITE.contactEmail}.` : "."); }
    else if (res.mode === "email") { title.textContent = "Finish in your email app"; text.textContent = `Your email app should open with the inquiry filled in. Press send there to reach us at ${SITE.contactEmail}.`; }
    form.hidden = true; status.hidden = false; status.focus();
  });
  document.getElementById("form-reset").addEventListener("click", () => {
    form.reset(); form.querySelectorAll("[data-field]").forEach((f) => (f.dataset.invalid = "false"));
    status.hidden = true; form.hidden = false; form.elements.name.focus();
  });
}

/* ---------- Goal selector (radio group pattern) ---------- */
function mountGoals() {
  const btns = [...document.querySelectorAll("[data-goal]")];
  const out = document.getElementById("goal-result");
  const select = (b, focus) => {
    btns.forEach((x) => { const on = x === b; x.setAttribute("aria-checked", String(on)); x.tabIndex = on ? 0 : -1; });
    if (focus) b.focus();
    out.innerHTML = goalResult(GOALS.find((g) => g.id === b.dataset.goal)); out.hidden = false;
  };
  btns.forEach((b, i) => {
    b.addEventListener("click", () => select(b));
    b.addEventListener("keydown", (e) => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (d) { e.preventDefault(); select(btns[(i + d + btns.length) % btns.length], true); }
    });
  });
}

/* ---------- Header, menu ---------- */
let lastFocus = null;
function openMenu() {
  const m = document.getElementById("mobile-menu");
  lastFocus = document.activeElement;
  m.classList.add("is-open"); m.removeAttribute("inert"); m.setAttribute("aria-hidden", "false");
  document.getElementById("menu-toggle").setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  m.querySelector("#menu-close").focus();
}
function closeMenu(restore = true) {
  const m = document.getElementById("mobile-menu");
  if (!m.classList.contains("is-open")) return;
  m.classList.remove("is-open"); m.setAttribute("inert", ""); m.setAttribute("aria-hidden", "true");
  document.getElementById("menu-toggle").setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  if (restore && lastFocus) lastFocus.focus();
}

function initShell() {
  document.getElementById("menu-toggle").addEventListener("click", openMenu);
  document.getElementById("menu-close").addEventListener("click", () => closeMenu());
  const m = document.getElementById("mobile-menu");
  m.addEventListener("keydown", (e) => {
    if (e.key === "Escape") return closeMenu();
    if (e.key !== "Tab") return;
    const f = [...m.querySelectorAll("a,button")]; const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  document.getElementById("year").textContent = new Date().getFullYear();
  document.body.classList.toggle("is-public", !!SITE.publicMode);
  const contact = document.getElementById("footer-contact");
  if (contact && SITE.contactEmail) contact.innerHTML = `<a href="mailto:${esc(SITE.contactEmail)}">${esc(SITE.contactEmail)}</a>`;
  window.addEventListener("hashchange", router);
  router();
}

document.addEventListener("DOMContentLoaded", initShell);
