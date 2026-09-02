/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Ported 1:1 from the existing site's :root custom properties
      // (style.css) so the new stack keeps the established brand identity
      // instead of introducing a new palette.
      colors: {
        ink: "#0d1512",
        charcoal: "#1b201d",
        forest: "#173e2e",
        "forest-deep": "#0f2a20",
        green: "#3f7d54",
        "green-deep": "#2c5c40",
        "warm-white": "#f6f3ea",
        paper: "#efeade",
        sand: "#d8bd7c",
        gold: "#e8c563",
        "gold-deep": "#c9a24a"
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        // Modern-skeuomorphic layers: a raised surface reads via a soft
        // ambient shadow below plus a faint highlight along its top edge.
        raised: "0 10px 26px rgba(13,21,18,.18), inset 0 1px 0 rgba(255,255,255,.35)",
        "raised-dark": "0 10px 26px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.08)",
        pressed: "inset 0 2px 6px rgba(13,21,18,.35)",
        "pressed-dark": "inset 0 2px 6px rgba(0,0,0,.5)"
      }
    }
  },
  plugins: []
};
