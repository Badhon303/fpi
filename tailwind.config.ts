import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F1A2B",
        parchment: "#F6F3EC",
        forest: "#1F4D3D",
        "forest-dim": "#16382C",
        brass: "#C08A3E",
        rust: "#C0491F",
        "ink-soft": "#4A5568",
        "parchment-soft": "#EDE8DC",
        line: "#D9D2C2",
        "line-dark": "#26344A",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        hero: ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        h2: ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        h3: ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        body: ["1.0625rem", { lineHeight: "1.7" }],
      },
      maxWidth: {
        content: "1140px",
      },
      letterSpacing: {
        eyebrow: "0.16em",
      },
      transitionTimingFunction: {
        dossier: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
