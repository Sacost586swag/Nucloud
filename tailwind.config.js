/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0A", // fondo principal (Negro Profundo — NUCLOUD Speech)
          soft: "#0B0B0B", // fondo secundario
          raised: "#111111",
        },
        flame: {
          DEFAULT: "#FF6B00", // Naranja Nuclear — acento primario
          glow: "#FF8A00", // Naranja Brillante — CTAs/hover (NUCLOUD Speech)
          amber: "#FFB347", // ámbar — eyebrows/acentos suaves
        },
        fog: {
          DEFAULT: "#FFFFFF", // texto principal
          muted: "#A1A1AA", // texto secundario
        },
      },
      fontFamily: {
        // Clash Display: display de marca para titulares (BRANDING.md / NUCLOUD Speech).
        display: ['"Clash Display"', "system-ui", "sans-serif"],
        // Satoshi: grotesca de cuerpo/UI de marca.
        sans: ['"Satoshi"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        // JetBrains Mono: solo labels técnicos (la marca ES técnica, no disfraz).
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Escala display fluida (clamp), techo ≤ 6rem y tracking ≥ -0.04em.
        "display-hero": [
          "clamp(2.75rem, 7vw + 1rem, 6rem)",
          { lineHeight: "0.94", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(2.05rem, 3.4vw + 0.8rem, 3.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em" },
        ],
        "display-md": [
          "clamp(1.75rem, 2.2vw + 0.9rem, 2.6rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,107,0,0.12), 0 18px 60px -20px rgba(255,107,0,0.45)",
        "glow-sm": "0 0 30px -8px rgba(255,107,0,0.5)",
        "inner-line": "inset 0 1px 0 0 rgba(255,255,255,0.06)",
        card: "0 8px 40px -12px rgba(0,0,0,0.8)",
        button: "0 8px 30px -8px rgba(255,107,0,0.6)",
      },
      backgroundImage: {
        "flame-gradient": "linear-gradient(135deg, #FF6B00 0%, #FF8A00 50%, #FFB347 100%)",
        "radial-glow": "radial-gradient(circle at center, rgba(255,107,0,0.18), transparent 70%)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "pulse-node": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.25)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-24" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-node": "pulse-node 3s ease-in-out infinite",
        "dash-flow": "dash-flow 1.2s linear infinite",
        float: "float 7s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};
