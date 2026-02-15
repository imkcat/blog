import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-comic)", "Comic Neue", "system-ui", "sans-serif"],
        manga: ["var(--font-bangers)", "Bangers", "cursive"],
        comic: ["var(--font-comic)", "Comic Neue", "cursive"],
      },
      borderWidth: {
        "3": "3px",
        "4": "4px",
      },
      boxShadow: {
        "manga-sm": "2px 2px 0 currentColor",
        "manga": "4px 4px 0 currentColor",
        "manga-lg": "6px 6px 0 currentColor",
        "manga-xl": "8px 8px 0 currentColor",
      },
      animation: {
        "manga-shake": "manga-shake 0.3s ease-in-out",
        "manga-bounce": "manga-bounce 0.5s ease-in-out",
        "manga-pop": "manga-pop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        "manga-shake": {
          "0%, 100%": { transform: "translateX(0) rotate(0)" },
          "20%": { transform: "translateX(-3px) rotate(-1deg)" },
          "40%": { transform: "translateX(3px) rotate(1deg)" },
          "60%": { transform: "translateX(-2px) rotate(-0.5deg)" },
          "80%": { transform: "translateX(2px) rotate(0.5deg)" },
        },
        "manga-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-8px)" },
          "60%": { transform: "translateY(-4px)" },
        },
        "manga-pop": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      transitionTimingFunction: {
        "manga-snap": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "manga-bounce": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [typography],
};
export default config;
