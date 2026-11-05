import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { PAGES, SITE_NAME, SITE_URL, ORGANIZATION_LD, pageMeta } from "./src/content/seo.js";

// GitHub Pages serves this repo from a subfolder (/SJK-Website/). The deploy
// workflow sets PAGES_BASE to that folder; local dev and other hosts keep "/".
const base = process.env.PAGES_BASE || "/";

// Image paths in the source are written root-relative ("/images/…"), which
// Vite does not rewrite inside JS strings. Under a subfolder base, prefix
// them so they resolve to /SJK-Website/images/… instead of the domain root.
function prefixPublicPaths() {
  return {
    name: "prefix-public-paths",
    apply: "build",
    transform(code, id) {
      if (base === "/" || !/\/src\/.*\.(jsx?|tsx?)$/.test(id.replace(/\\/g, "/"))) return null;
      return { code: code.replace(/(["'`])\/images\//g, `$1${base}images/`), map: null };
    }
  };
}

// Search and sharing tags (src/content/seo.js). The page HTML carries the
// home page's tags; after the build, every other page gets its own copy of
// the HTML with its own title, description and address, so search engines
// and link previews (Facebook, LinkedIn, Viber) see the right ones without
// running JavaScript. Also writes the sitemap and a 404 page that search
// engines are told not to index.
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
function seoHead(p, { noindex = false } = {}) {
  const m = pageMeta(p);
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}">`,
    noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${m.url}">`,
    '<meta property="og:type" content="website">',
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    '<meta property="og:locale" content="en_PH">',
    `<meta property="og:title" content="${esc(m.title)}">`,
    `<meta property="og:description" content="${esc(m.description)}">`,
    `<meta property="og:url" content="${m.url}">`,
    `<meta property="og:image" content="${m.image}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<script type="application/ld+json">${JSON.stringify(ORGANIZATION_LD)}</script>`
  ].join("\n");
}
const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;
function seoPages() {
  let outDir = "dist";
  return {
    name: "seo-pages",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    transformIndexHtml(html) {
      return html.replace(SEO_BLOCK, `<!--seo-->
${seoHead("/")}
<!--/seo-->`);
    },
    closeBundle() {
      const index = path.join(outDir, "index.html");
      if (!fs.existsSync(index)) return;
      const html = fs.readFileSync(index, "utf8");
      const withHead = (p, opts) => html.replace(SEO_BLOCK, `<!--seo-->
${seoHead(p, opts)}
<!--/seo-->`);
      for (const p of Object.keys(PAGES).filter((p) => p !== "/")) {
        fs.mkdirSync(path.join(outDir, p), { recursive: true });
        fs.writeFileSync(path.join(outDir, p, "index.html"), withHead(p));
      }
      fs.writeFileSync(path.join(outDir, "404.html"), withHead("/", { noindex: true }));
      const today = new Date().toISOString().slice(0, 10);
      const urls = Object.keys(PAGES)
        .map((p) => `  <url><loc>${pageMeta(p).url}</loc><lastmod>${today}</lastmod></url>`)
        .join("\n");
      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
      );
      fs.writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);
    }
  };
}

export default defineConfig({
  base,
  plugins: [react(), prefixPublicPaths(), seoPages()],
  server: {
    port: 5173
  }
});
