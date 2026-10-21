/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Palette taken from the SJK Guahan logo, assigned by component role:
      //   control #0D1C2C — logo navy: buttons, fields, the dark band
      //   info    #F9B200 — logo amber: badges, highlights, active markers
      //   nav     #EEF1F5 — cool off-white: navigation and alternate sections
      //   surface #FFFFFF — containers & layout: cards, modals, panels
      // Text is the logo navy too. Amber is only 1.6:1 on light backgrounds,
      // so it is used as a fill or underline there, never as text.
      // Older token names point at the same palette so existing classes
      // still resolve ("gold" is the amber, "forest"/"gold-deep" the navy).
      colors: {
        control: "#0d1c2c",
        nav: "#eef1f5",
        info: "#f9b200",
        surface: "#ffffff",
        ink: "#0d1c2c",
        slate: "#5a6b80",
        charcoal: "#1b3048",
        forest: "#0d1c2c",
        "forest-deep": "#1b3048",
        green: "#f9b200",
        "green-deep": "#0d1c2c",
        "warm-white": "#eef1f5",
        paper: "#eef1f5",
        sand: "#f9b200",
        gold: "#f9b200",
        "gold-deep": "#0d1c2c"
      },
      fontFamily: {
        // Archivo (set wide) carries headings, navigation and buttons — its
        // broad letterforms echo the decals on the equipment SJK supplies.
        // Source Serif 4 sets the reading copy like a printed company profile.
        sans: ["Archivo", "Segoe UI", "sans-serif"],
        display: ["Archivo", "Segoe UI", "sans-serif"],
        body: ["\"Source Serif 4\"", "Georgia", "serif"],
        mono: ["ui-monospace", "monospace"]
      },
      boxShadow: {
        // Modern-skeuomorphic layers: a raised surface reads via a soft
        // ambient shadow below plus a faint highlight along its top edge.
        raised: "0 10px 26px rgba(13,28,44,.18), inset 0 1px 0 rgba(255,255,255,.35)",
        "raised-dark": "0 10px 26px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.08)",
        pressed: "inset 0 2px 6px rgba(13,28,44,.35)",
        "pressed-dark": "inset 0 2px 6px rgba(0,0,0,.5)"
      }
    }
  },
  plugins: []
};
