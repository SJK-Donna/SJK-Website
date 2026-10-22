import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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

export default defineConfig({
  base,
  plugins: [react(), prefixPublicPaths()],
  server: {
    port: 5173
  }
});
