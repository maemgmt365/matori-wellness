# MATORI Wellness · Website v1

Static, dependency-free prototype. Hash routes (`#/products/sleep`) so it runs from a single file anywhere.

## Run locally
    python3 build.py                 # builds docs/index.html (single self-contained file)
    cd docs && python3 -m http.server 8000
    # open http://localhost:8000

## Structure
    src/index.html      Shell: header, mobile menu, footer
    src/styles.css      Design tokens (top of file) and all styles
    src/data.js         ALL editable content: products, specs, founders, explorer layers, FAQ, assessment goals
    src/components.js   Carton (3D packaging), product card, founder card, icons, placeholders
    src/app.js          Pages, router, packaging explorer, drag/keyboard rotation, form, goal selector
    build.py            Single-file build into docs/ (what GitHub Pages serves)
    docs/               Build output (created by build.py / the deploy workflow; not committed)

## Unboxing sequence
The homepage "Open the box" section is scroll-driven. Timing and motion live in `UNBOX_STEPS` and `UNBOX_TIMELINE` in data.js:
each track is a list of [scroll progress, value] pairs. Change numbers there to retime it; the engine (`mountUnbox` in app.js) reads them.
Reduced-motion users get the same steps as tap-to-advance, with no scroll scrubbing.

## Common edits
- Add a fourth founder: append an object to FOUNDERS in data.js.
- Fill in a dose or spec: replace `null` in data.js; the "To be confirmed" flag disappears automatically.
- Connect the inquiry form: replace `submitInquiry()` in app.js with a real endpoint/CRM call.
- Replace the logo: swap MARK_SVG in components.js and MARK in build.py (header + footer).
- Images: drop files in src/assets/ and reference them as __ASSET:filename__; build.py inlines them.

## Deploy
Live site: GitHub Pages, built by `.github/workflows/pages.yml` on every push to `main`
(Settings > Pages > Source: GitHub Actions). The workflow runs `build.py` and publishes `docs/`,
so you only edit and commit `src/`. Custom domain: matoriwellness.com.

DNS at Bizee (leave the existing MX, SPF, DKIM and DMARC records untouched):
   - A      @     185.199.108.153
   - A      @     185.199.109.153
   - A      @     185.199.110.153
   - A      @     185.199.111.153
   - CNAME  www   maemgmt365.github.io

## Before collecting inquiries
Set `contactEmail` and/or `formEndpoint` in SITE (data.js). Without either, the form validates but says plainly that nothing was sent.
`publicMode: false` shows internal review labels again.
