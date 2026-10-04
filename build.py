#!/usr/bin/env python3
"""Inline src/ (CSS, JS, logo mark, image assets) into a single self-contained dist/index.html."""
import base64, re
from pathlib import Path
root = Path(__file__).parent
src = root / "src"
MARK = ('<svg viewBox="0 0 64 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" '
        'stroke-linejoin="round" aria-hidden="true"><path d="M3 45 L15.4 25.6 Q18.8 20.6 22.2 25.6 L34 45"/>'
        '<path d="M35 39.4 L42.4 25.6 Q45.8 20.6 49.2 25.6 L61.5 45"/><circle cx="32.2" cy="17.2" r="3.7" fill="currentColor" stroke="none"/>'
        '<path d="M32.2 2.4v5.6M22.6 6.6l4.6 4.8M41.8 6.6l-4.6 4.8M17.6 14l6.4 1.8M46.8 14l-6.4 1.8" stroke-width="2.4"/></svg>')
html = (src / "index.html").read_text()
css = (src / "styles.css").read_text()
js = "\n".join((src / f).read_text() for f in ["data.js", "components.js", "app.js"])
out = html.replace("/*__CSS__*/", css).replace("/*__JS__*/", js).replace("<!--MARK-->", MARK)
def asset(m):
    # Images live in src/assets either as the binary file or as <name>.b64 (base64 text)
    p = src / "assets" / m.group(1)
    mime = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png", "webp": "image/webp", "svg": "image/svg+xml"}[p.suffix[1:].lower()]
    if p.exists():
        data = base64.b64encode(p.read_bytes()).decode()
    else:
        data = "".join(Path(str(p) + ".b64").read_text().split())
    return f"data:{mime};base64,{data}"
out = re.sub(r"__ASSET:([\w.-]+)__", asset, out)
# GitHub Pages serves the /docs folder of the main branch
out_dir = root / "docs"
out_dir.mkdir(exist_ok=True)
(out_dir / "index.html").write_text(out)
(out_dir / "CNAME").write_text("matoriwellness.com\n")
(out_dir / ".nojekyll").write_text("")
print(f"Built docs/index.html ({len(out)/1024:.0f} KB)")
