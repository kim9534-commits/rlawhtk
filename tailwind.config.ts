import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#E9EFEA",
        bgDeep: "#DCE5DD",
        paper: "#F3F6F1",
        ink: "#16302C",
        inkSoft: "#3F5652",
        navy: "#17323C",
        navySoft: "#24444F",
        brass: "#A1743E",
        brassSoft: "#C79A5F",
        rust: "#B84632",
        line: "rgba(22,48,44,0.16)",
        lineStrong: "rgba(22,48,44,0.32)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
