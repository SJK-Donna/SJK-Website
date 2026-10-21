/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Brand palette, assigned by component role:
      //   control #4B5938 — input controls: buttons, fields, toggles
      //   nav     #F0F2EC — navigational components: navbar, menus, tabs
      //   info    #97A379 — informational: labels, badges, progress, toasts
      //   surface #FFFFFF — containers & layout: cards, modals, panels
      // ink stays as the near-black for text and dark sections. The older
      // token names are kept pointing at the same palette so existing
      // classes still resolve — "gold" is the sage accent and "gold-deep"
      // the olive used for accent text on light backgrounds (sage alone is
      // too low-contrast there).
      colors: {
        control: "#4b5938",
        nav: "#f0f2ec",
        info: "#97a379",
        surface: "#ffffff",
        ink: "#1f2420",
        charcoal: "#2a302b",
        forest: "#4b5938",
        "forest-deep": "#363f28",
        green: "#97a379",
        "green-deep": "#4b5938",
        "warm-white": "#f0f2ec",
        paper: "#f0f2ec",
        sand: "#97a379",
        gold: "#97a379",
        "gold-deep": "#4b5938"
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        // Tile-layout home page: the platform's own UI face first (San
        // Francisco on Apple devices), Inter everywhere else.
        sans: ["-apple-system", "BlinkMacSystemFont", "Inter", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        // Modern-skeuomorphic layers: a raised surface reads via a soft
        // ambient shadow below plus a faint highlight along its top edge.
        raised: "0 10px 26px rgba(31,36,32,.18), inset 0 1px 0 rgba(255,255,255,.35)",
        "raised-dark": "0 10px 26px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.08)",
        pressed: "inset 0 2px 6px rgba(31,36,32,.35)",
        "pressed-dark": "inset 0 2px 6px rgba(0,0,0,.5)"
      }
    }
  },
  plugins: []
};
