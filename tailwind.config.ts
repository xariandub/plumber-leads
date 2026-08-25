import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark editorial palette
        ink: {
          950: "#070708",
          900: "#0B0B0D",
          800: "#121214",
          700: "#1B1B1F",
          600: "#26262B",
          500: "#3A3A42",
        },
        bone: {
          50: "#FBF9F3",
          100: "#F6F2E8",
          200: "#EFEAD9",
          300: "#E3DCC4",
          400: "#C7BFA3",
        },
        copper: {
          300: "#F0C07A",
          400: "#E8A05A",
          500: "#D7863C",
          600: "#B66A28",
          700: "#8C4E1D",
        },
        teal: {
          400: "#5C9494",
          500: "#3A6B6B",
          600: "#2B5252",
          700: "#1F3D3D",
        },
      },
      fontFamily: {
        // Sans (variable) — Bricolage Grotesque, set in layout.tsx
        sans: ["var(--font-bricolage)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Display italic — Instrument Serif
        serif: ["var(--font-instrument)", "ui-serif", "Georgia", "serif"],
        // Mono — JetBrains Mono
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        "soft-lift": "0 20px 60px -20px rgba(0,0,0,0.5)",
        "copper-glow": "0 0 0 1px rgba(232,160,90,0.25), 0 10px 30px -10px rgba(232,160,90,0.35)",
      },
      keyframes: {
        // Hero mesh gradient — slow ambient drift
        "mesh-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(-3%, 2%, 0) scale(1.05)" },
        },
        "mesh-drift-2": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%, -2%, 0) scale(1.08)" },
        },
        // Marquee
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        "marquee-rev": {
          "0%": { transform: "translate3d(-50%,0,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
        // Ticker rotation
        "fade-swap": {
          "0%, 30%": { opacity: "1", transform: "translateY(0)" },
          "45%, 55%": { opacity: "0", transform: "translateY(-6px)" },
          "70%, 100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Subtle cursor pulse
        "cursor-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.9" },
        },
        // Slow underline sweep for hover links
        "underline-sweep": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        // Floating drop for hero motif
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(0.5deg)" },
        },
      },
      animation: {
        "mesh-drift": "mesh-drift 60s ease-in-out infinite",
        "mesh-drift-2": "mesh-drift-2 75s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-rev": "marquee-rev 50s linear infinite",
        "fade-swap": "fade-swap 4s ease-in-out infinite",
        "cursor-pulse": "cursor-pulse 2.4s ease-in-out infinite",
        "underline-sweep": "underline-sweep 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
        "float-slow": "float-slow 7s ease-in-out infinite",
      },
      letterSpacing: {
        tightest: "-0.04em",
        editorial: "-0.025em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
